// esbuild command tools

const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs/promises');
const net = require('net');
const {
  runCmd,
  copyFolder,
  sendRequest,
  loadEnv,
  readJson,
  pathExists,
  cpIndexHtml,
  pluginIfelse,
  markdownProcessOnEnd,
  obfuscatePlugin,
  sha256,
} = require('./index.js');

const isPortInUse = async (port) => {
  if (!port) return false;
  return new Promise((resolve) => {
    const client = new net.Socket();
    client.setTimeout(300);
    client.once('connect', () => {
      client.destroy();
      resolve(true);
    });
    client.once('timeout', () => {
      client.destroy();
      resolve(false);
    });
    client.once('error', () => {
      client.destroy();
      resolve(false);
    });
    client.connect(Number(port), '127.0.0.1');
  });
};

const waitPortClosed = async (httpPort, maxWaitMs = 3000) => {
  if (!httpPort) return true;
  const startTime = Date.now();
  while (Date.now() - startTime < maxWaitMs) {
    const inUse = await isPortInUse(httpPort);
    if (!inUse) return true;
    await new Promise((r) => setTimeout(r, 100));
  }
  return false;
};

const waitServerReady = async (httpPort, maxWaitMs = 15000) => {
  if (!httpPort) return true;
  const startTime = Date.now();
  while (Date.now() - startTime < maxWaitMs) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 1000);
      const res = await fetch(`http://127.0.0.1:${httpPort}/`, { signal: controller.signal });
      clearTimeout(timer);
      if (res) return true;
    } catch (err) {
      // not ready yet
    }
    await new Promise((r) => setTimeout(r, 200));
  }
  return false;
};

class BuildCoordinator {
  constructor() {
    this.activeBuilds = new Set();
    this.serverChanged = false;
    this.clientChanged = false;
    this.settleTimer = null;
    this.isServerRestarting = false;
    this.isDev = false;
    this.npmCmd = '';
    this.httpPort = '';
    this.isInitialized = false;
  }

  init({ isDev, npmCmd, httpPort }) {
    this.isDev = isDev;
    this.npmCmd = npmCmd;
    this.httpPort = httpPort;
  }

  setInitialized(val) {
    this.isInitialized = val;
    if (this.isInitialized && this.activeBuilds.size === 0 && (this.serverChanged || this.clientChanged)) {
      this.scheduleSettle();
    }
  }

  onBuildStart(buildId, type) {
    if (!this.isDev) return;

    this.activeBuilds.add(buildId);

    if (this.isInitialized) {
      if (type === 'server') {
        this.serverChanged = true;
      } else {
        this.clientChanged = true;
      }

      if (this.settleTimer) {
        clearTimeout(this.settleTimer);
        this.settleTimer = null;
      }
    }
  }

  onBuildEnd(buildId, type) {
    if (!this.isDev) return;

    this.activeBuilds.delete(buildId);

    if (!this.isInitialized) return;

    if (this.activeBuilds.size > 0) {
      return;
    }

    this.scheduleSettle();
  }

  scheduleSettle() {
    if (this.settleTimer) {
      clearTimeout(this.settleTimer);
    }
    this.settleTimer = setTimeout(() => {
      this.settleTimer = null;
      this.onAllBuildsSettled();
    }, 400);
  }

  async waitPortClosed(httpPort, maxWaitMs = 3000) {
    return waitPortClosed(httpPort, maxWaitMs);
  }

  async waitServerReady(httpPort, maxWaitMs = 15000) {
    return waitServerReady(httpPort, maxWaitMs);
  }

  async onAllBuildsSettled() {
    if (!this.isDev) return;
    if (this.activeBuilds.size > 0) return;
    if (this.isServerRestarting) return;

    const needRestart = this.serverChanged;
    const needRefresh = this.clientChanged || needRestart;

    if (!needRestart && !needRefresh) return;

    this.serverChanged = false;
    this.clientChanged = false;

    if (needRestart) {
      this.isServerRestarting = true;
      try {
        await this.restartServer();
      } catch (err) {
        console.error('[dev-server] Failed to restart server:', err);
      } finally {
        this.isServerRestarting = false;
        if (this.activeBuilds.size === 0 && (this.serverChanged || this.clientChanged)) {
          this.scheduleSettle();
        }
      }
    }

    // Check if new build started while server was restarting
    if (this.activeBuilds.size > 0 || this.serverChanged) {
      console.log('[dev-build] New build detected during restart, postponing refresh...');
      return;
    }

    // Wait until server is ready to accept requests
    const isReady = await this.waitServerReady(this.httpPort, 15000);
    if (!isReady) {
      console.error(`[dev-server] Server on port ${this.httpPort} failed to respond, skip refresh.`);
      return;
    }

    // Check again if a new build started while waiting for server ready
    if (this.activeBuilds.size > 0 || this.serverChanged) {
      console.log('[dev-build] New build detected while waiting for server ready, postponing refresh...');
      return;
    }

    if (needRefresh) {
      await this.refreshServer();
    }
  }

  async restartServer() {
    if (!this.httpPort) return;
    const token = sha256(process.env['DEV_TOKEN'] || '');
    const url = `http://127.0.0.1:${this.httpPort}/debug/shutdown?t=${token}`;
    console.log('[dev-server] Shutting down old server: ', url);
    await sendRequest(url, this.isDev ? 2 : 0);

    await this.waitPortClosed(this.httpPort, 3000);

    console.log('[dev-server] Starting server: ', this.npmCmd);
    if (this.isDev && this.npmCmd) {
      runCmd(this.npmCmd);
    }
  }

  async refreshServer() {
    if (!this.httpPort) return;
    const token = sha256(process.env['DEV_TOKEN'] || '');
    const url = `http://127.0.0.1:${this.httpPort}/debug/refresh?t=${token}`;
    console.log('[dev-server] Refresh Server: ', url);
    await sendRequest(url, this.isDev ? 2 : 0);
  }

  async startInitialServer() {
    if (!this.isDev || !this.npmCmd) return;
    console.log('[dev-server] Initial build complete. Starting server: ', this.npmCmd);
    runCmd(this.npmCmd);
    const isReady = await this.waitServerReady(this.httpPort, 20000);
    if (isReady) {
      console.log(`[dev-server] Server on port ${this.httpPort} is ready.`);
    } else {
      console.error(`[dev-server] Server on port ${this.httpPort} did not become ready within timeout.`);
    }
  }
}

const coordinator = new BuildCoordinator();

const triggerHandle = {
  restart: null,
  refresh: null,
};

// restart server for server code changes
const triggerReStartServer = async (isDev, npmCmd, httpPort) => {
  coordinator.serverChanged = true;
  coordinator.scheduleSettle();
};

// refresh server for client code changes
const triggerRefreshServer = async (isDev, httpPort) => {
  coordinator.clientChanged = true;
  coordinator.scheduleSettle();
};

// watch server code changes
const watchServerPlugin = (isDev, npmCmd, httpPort, buildId = 'server') => {
  return {
    name: 'watchServerPlugin',
    setup(build) {
      build.onStart(() => {
        coordinator.onBuildStart(buildId, 'server');
      });
      build.onEnd(async (res) => {
        // console.log(`Build meta data: `, res);
        console.log(`[dev-server] Build finished: ${buildId}`);
        coordinator.onBuildEnd(buildId, 'server');
      });
    },
  };
};

// watch server code changes
const watchServerLoader = async (isDev, npmCmd, httpPort, serverRootPath) => {
  const cmd = isDev ? esbuild.context : esbuild.build;
  const ctx = await cmd({
    entryPoints: ['apps/server/src/server-loader.ts'],
    // outdir: path.join(serverRootPath, 'server'),
    outfile: path.join(serverRootPath, 'server', 'server-loader.js'),
    platform: 'node',
    sourcemap: isDev ? 'inline' : false, // inline
    format: 'cjs',
    bundle: true,
    treeShaking: true,
    metafile: true,
    minify: !isDev,
    plugins: [watchServerPlugin(isDev, npmCmd, httpPort, 'server-loader')],
  });

  isDev && (await ctx.watch());
  isDev && console.log('[dev-server] Watching...');
};

// watch server code changes
const watchServer = async (isDev, npmCmd, httpPort, serverRootPath, extraExternals = []) => {
  const cmd = isDev ? esbuild.context : esbuild.build;
  const ctx = await cmd({
    entryPoints: ['apps/server/src/index.ts'],
    outdir: path.join(serverRootPath, 'server'),
    platform: 'node',
    sourcemap: isDev ? 'inline' : false, // inline
    format: 'cjs',
    bundle: true,
    treeShaking: true,
    metafile: true,
    external: [
      'better-sqlite3',
      'mysql2',
      'mysql2/promise',
      'mssql',
      'oracledb',
      'nodemailer',
      'pdfkit',
      'sharp',
      ...extraExternals,
    ],
    loader: { '.svg': 'text', '.glsl': 'text', '.png': 'file', '.gif': 'file', '.html': 'text' },
    minify: !isDev,
    plugins: [watchServerPlugin(isDev, npmCmd, httpPort, 'server')],
  });

  isDev && (await ctx.watch());
  isDev && console.log('[dev-server] Watching...');
};

// copy files to output directory
const copyCache = new Map();
const writeBuildTimeFiles = async (saved) => {
  if (!saved.webVersionFile) return;
  const versionStr = new Date().toISOString();
  const buildTimeContent = `export const version = "${versionStr}";\n`;
  const sourceBuildTimePath = path.join(saved.appDir, saved.webVersionFile);
  await fs.writeFile(sourceBuildTimePath, buildTimeContent, 'utf8');
};

const clientProcessOnEnd = async (saved) => {
  saved.indexHtml &&
    cpIndexHtml(
      saved.indexHtml,
      path.join(saved.outdir, 'index.html'),
      saved.appName,
      saved.isDev,
      saved.isMobile,
      saved.defaultThemeName,
      saved.outdirData,
      saved.outdirSub
    );

  const assets = saved['copyFiles'];
  if (assets) {
    for (const oneDir of assets) {
      await copyFolder(copyCache, oneDir.from, oneDir.to, saved.isDev, oneDir.ignore);
    }
  }
};

// watch client code changes
const watchClientPlugin = (saved, buildId = 'client') => {
  return {
    name: 'watchClientPlugin',
    setup(build) {
      build.onStart(async () => {
        coordinator.onBuildStart(buildId, 'client');
        await writeBuildTimeFiles(saved);
      });

      build.onEnd(async (res) => {
        // console.log(`Build meta data: `, res);
        console.log(`[dev-client:${saved.appName}] Build finished`);
        try {
          await clientProcessOnEnd(saved);
        } catch (err) {
          console.error(`[dev-client:${saved.appName}] clientProcessOnEnd error:`, err);
        }

        if (!saved.isDev && saved.isJsmap) {
          console.warn(`!!!!!!!!!! [dev-client:${saved.appName}] Souce Map is generated !!!!!!!!!!`);
        }
        coordinator.onBuildEnd(buildId, 'client');
      });
    },
  };
};

// plugin for conditional code logic
/*
#if MOBILE && DEV
console.log('this is mobile and dev');
#endif
*/
const ifPluginVars = {
  MOBILE: '',
  DEV: '',
};
const watchClient = async (saved, isDev, entryPoints, outbase, buildId = 'client') => {
  const cmd = isDev ? esbuild.context : esbuild.build;
  const ctx = await cmd({
    entryPoints,
    outdir: saved.outdir,
    outbase,
    // entryNames: '[name]-[hash]',
    platform: 'browser',
    sourcemap: isDev ? 'inline' : saved.isJsmap ? 'external' : false, // inline
    format: 'iife',
    bundle: true,
    treeShaking: true,
    external: [...(saved.externals || [])],
    metafile: true,
    minify: !isDev,
    loader: {
      '.svg': 'text',
      '.glsl': 'text',
      '.html': 'text',
      '.png': 'file',
      '.jpg': 'file',
      '.jpeg': 'file',
      '.gif': 'file',
      '.webp': 'file',
      '.ico': 'file',
      '.woff': 'file',
      '.woff2': 'file',
      '.ttf': 'file',
      '.mp3': 'file',
      '.wav': 'file',
      ...(saved.customLoaders || {}),
    },
    assetNames: '/pub_assets/[name]-[hash]',
    publicPath: saved.outdirSub,
    jsxImportSource: 'lupine.web',
    jsx: 'automatic',
    target: ['chrome87'],
    plugins: [
      watchClientPlugin(saved, buildId),
      pluginIfelse(ifPluginVars),
      obfuscatePlugin(saved.isObfuscate, saved.skipObfuscateFiles || []),
    ],
  });

  isDev && (await ctx.watch());
  isDev && console.log(`[dev-client:${saved.appName}] Watching...`);
};

const watchApiPlugin = (saved, isDev, httpPort, buildId = 'api') => {
  return {
    name: 'watchApiPlugin',
    setup(build) {
      build.onStart(() => {
        coordinator.onBuildStart(buildId, 'api');
      });

      build.onEnd(async (res) => {
        console.log(`[dev-api:${saved.appName}] Build finished`);
        coordinator.onBuildEnd(buildId, 'api');
      });
    },
  };
};

const watchApi = async (saved, isDev, entryPoints, buildId = 'api') => {
  const cmd = isDev ? esbuild.context : esbuild.build;
  const ctx = await cmd({
    entryPoints,
    outdir: saved.outdirApi,
    // outbase,
    platform: 'node',
    sourcemap: isDev ? 'inline' : false, // inline
    format: 'cjs', // iife, cjs
    bundle: true,
    treeShaking: true,
    metafile: true,
    external: ['better-sqlite3', 'nodemailer', 'pdfkit', 'sharp', ...(saved.externals || [])],
    loader: {
      '.svg': 'text',
      '.glsl': 'text',
      '.png': 'file',
      '.gif': 'file',
      '.html': 'text',
      ...(saved.customLoaders || {}),
    },
    minify: !isDev,
    plugins: [watchApiPlugin(saved, isDev, saved.httpPort, buildId)],
  });

  isDev && (await ctx.watch());
  isDev && console.log(`[dev-api:${saved.appName}] Watching...`);
};

const watchMarkdownPlugin = (saved, buildId = 'markdown') => {
  return {
    name: 'watchMarkdownPlugin',
    setup(build) {
      build.onStart(() => {
        coordinator.onBuildStart(buildId, 'markdown');
      });

      build.onEnd(async (res) => {
        // console.log(`Build meta data: `, res);
        console.log(`[dev-markdown:${saved.appName}] Build finished`);
        try {
          await markdownProcessOnEnd(saved.markdownEntryPoints.indir, saved.markdownEntryPoints.outdir);
        } catch (err) {
          console.error(`[dev-markdown:${saved.appName}] markdownProcessOnEnd error:`, err);
        }
        coordinator.onBuildEnd(buildId, 'markdown');
      });
    },
  };
};

const watchMarkdown = async (saved, entryPoints, buildId = 'markdown') => {
  const cmd = saved.isDev ? esbuild.context : esbuild.build;
  const ctx = await cmd({
    entryPoints: [`${entryPoints.indir}/**/*.md`],
    outdir: entryPoints.outdir,
    write: false,
    loader: { '.md': 'empty' },
    plugins: [watchMarkdownPlugin({ ...saved, markdownEntryPoints: entryPoints }, buildId)],
  });

  saved.isDev && (await ctx.watch());
};

const watchAdditionalFiles = async (saved, entryPoints, buildId = 'additional') => {
  const cmd = saved.isDev ? esbuild.context : esbuild.build;
  const ctx = await cmd({
    entryPoints: entryPoints,
    outdir: 'dist/tmp',
    write: false,
    loader: { '.html': 'empty', '.css': 'empty', '.js': 'empty', '.md': 'empty' },
    plugins: [watchClientPlugin(saved, buildId)],
  });

  saved.isDev && (await ctx.watch());
};

// Add Server, API, Client and additional files entry points to esbuild
const start = async () => {
  // Any code accessing process.env should be after loadEnv
  // process env files, "#!import .env" in .env file can be used to include another env file
  let envFile = process.argv.find((i) => i.startsWith('--env='))?.substring(6);
  // load env file, but don't overwrite existing env variables
  await loadEnv(envFile);

  const serverRootPathEnv = process.env['SERVER_ROOT_PATH'];
  if (!serverRootPathEnv) {
    console.error('SERVER_ROOT_PATH is not set');
    return 0;
  }
  const serverRootPath = path.resolve(serverRootPathEnv);
  await fs.mkdir(serverRootPath, { recursive: true });
  if (!(await pathExists(serverRootPath))) {
    console.error(`Can't create server root path: ${serverRootPath}`);
    return 0;
  }

  // command to start the server when source files are changed
  const npmCmd = process.argv.find((i) => i.startsWith('--cmd='))?.substring(6);
  const isDev = process.argv.find((i) => i === '--dev=1');
  const isMobile = process.argv.find((i) => i === '--mobile=1'); // when this changed, need to rebuild index.html
  const isObfuscate = !isDev && process.argv.find((i) => i === '--obfuscate=1');
  const isJsmap = process.argv.find((i) => i === '--jsmap=1');
  // this is for esbuild conditional compile
  ifPluginVars.DEV = isDev ? '1' : '';
  ifPluginVars.MOBILE = isMobile ? '1' : '';
  process.argv
    .filter((i) => i.startsWith('--if-defs='))
    .forEach((arg) => {
      arg
        .substring(10)
        .split(',')
        .forEach((item) => {
          if (!item) return;
          const eqIdx = item.indexOf('=');
          if (eqIdx >= 0) {
            const key = item.substring(0, eqIdx).trim();
            const val = item.substring(eqIdx + 1).trim();
            if (key) ifPluginVars[key] = val;
          } else {
            const key = item.trim();
            if (key) ifPluginVars[key] = '1';
          }
        });
    });

  // All apps should be defined in .env file like this:
  // APPS=domain1.com,domain2.com
  const appsArg = process.argv.find((i) => i.startsWith('--apps='))?.substring(7);
  const apps = (appsArg || process.env['APPS'] || '').split(',');

  const httpPort = process.env['HTTP_PORT'];
  const globalExternals = new Set();

  coordinator.init({ isDev, npmCmd, httpPort });

  const watchTasks = [];

  for (const app of apps) {
    if (!app) continue;
    const appJson = `apps/${app}/lupine.json`;
    const additionalFiles = [];
    const appCfg = await readJson(appJson);
    const appName = appCfg['name'];
    const appDir = path.dirname(appJson);
    if (appCfg['watchFiles']) {
      appCfg['watchFiles'].forEach((item) => additionalFiles.push(`${appDir}/${item}`));
    }
    if (appCfg['externals']) {
      appCfg['externals'].forEach((item) => globalExternals.add(item));
    }

    const outdirWeb = `${serverRootPath}/${appName}_web`;
    const outdirApi = `${serverRootPath}/${appName}_api`;
    const outdirData = `${serverRootPath}/${appName}_data`;
    if (!isDev) {
      console.log(`[dev] Removing old building files:`);
      console.log(`[dev]  ${outdirWeb}`);
      console.log(`[dev]  ${outdirApi}`);
      await fs.rm(outdirWeb, { recursive: true, force: true });
      await fs.rm(outdirApi, { recursive: true, force: true });
    }

    // create data folder
    await fs.mkdir(outdirData, { recursive: true });

    const saved = {
      isDev,
      isMobile,
      isObfuscate,
      isJsmap,
      defaultThemeName: 'light',
      appName,
      appDir,
      webVersionFile: appCfg['webVersionFile'],
      skipObfuscateFiles: (appCfg['skipObfuscateFiles'] || []).map((p) => path.normalize(p)),
      httpPort,
      serverRoot: serverRootPath,
      outdirWeb,
      outdirApi,
      outdirData,
      customLoaders: appCfg['customLoaders'] || {},
      externals: appCfg['externals'] || [],
      copyFiles: (appCfg['copyFiles'] || []).reduce((acc, item) => {
        const env = item.env || 'all'; // default all
        if (env === 'web' && isMobile) return acc;
        if (env === 'mobile' && !isMobile) return acc;

        if (!item.to.startsWith('web/') && !item.to.startsWith('api/') && !item.to.startsWith('data/')) {
          console.warn(
            `[dev] Warning: Skipping copyFiles item. 'to' must start with 'web/', 'api/', or 'data/'. Invalid config: ${item.to}`
          );
          return acc;
        }
        acc.push({
          from: `${appDir}/${item.from}`,
          to: `${serverRootPath}/${appName}_${item.to}`,
          ignore: item.ignore ? (isMobile ? item.ignore.mobile : item.ignore.web) : null,
        });
        return acc;
      }, []),
    };

    appCfg['webEntryPoints'].forEach((item, index) => {
      const env = item.env || 'all';
      if (env === 'web' && isMobile) return;
      if (env === 'mobile' && !isMobile) return;

      const entryPoint = `${appDir}/${item.index}`;
      const indexHtml = item.html ? `${appDir}/${item.html}` : undefined;
      const buildId = `client:${appName}:${item.outdir || index}`;
      watchTasks.push(
        watchClient(
          {
            ...saved,
            outdirSub: item.outdir,
            outdir: `${serverRootPath}/${appName}_web/` + item.outdir,
            indexHtml,
            copyFiles: [],
          },
          isDev,
          [entryPoint],
          path.dirname(entryPoint),
          buildId
        )
      );
      if (indexHtml) additionalFiles.push(indexHtml);
    });

    if (appCfg['apiEntryPoint']) {
      const entryPointApi = `${appDir}/${appCfg['apiEntryPoint']}`;
      watchTasks.push(watchApi(saved, isDev, [entryPointApi], `api:${appName}`));
    }
    if (appCfg['markdownEntryPoints']) {
      const markdownEntryPoints = {
        indir: `${appDir}/${appCfg['markdownEntryPoints'].indir}`,
        outdir: `${appDir}/${appCfg['markdownEntryPoints'].outdir}`,
      };
      watchTasks.push(watchMarkdown(saved, markdownEntryPoints, `markdown:${appName}`));
    }
    if (additionalFiles.length > 0) {
      // when some resources are changed, need to run command or refresh the server
      watchTasks.push(watchAdditionalFiles(saved, additionalFiles, `additional:${appName}`));
    }
  }

  const allExternals = Array.from(globalExternals);
  watchTasks.push(watchServer(isDev, npmCmd, httpPort, serverRootPath, allExternals));
  watchTasks.push(watchServerLoader(isDev, npmCmd, httpPort, serverRootPath));

  await Promise.all(watchTasks);

  if (isDev) {
    await coordinator.startInitialServer();
    coordinator.setInitialized(true);
  }
};
exports.start = start;
exports.coordinator = coordinator;
