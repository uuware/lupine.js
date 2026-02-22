// esbuild command tools

const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs/promises');
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
} = require('lupine.api/dev');

const triggerHandle = {
  restart: null,
  refresh: null,
};

// restart server for server code changes
const triggerReStartServer = async (isDev, npmCmd, httpPort) => {
  if (triggerHandle.restart) {
    clearTimeout(triggerHandle.restart);
  }
  triggerHandle.restart = setTimeout(async () => {
    const token = sha256(process.env['DEV_TOKEN'] || '');
    const url = `http://127.0.0.1:${httpPort}/debug/shutdown?t=${token}`;
    await sendRequest(url, isDev ? 2 : 0);
    console.log('[dev-server] ReStart Server: ', url);
    isDev && runCmd(npmCmd);
  }, 500);
};

// refresh server for client code changes
const triggerRefreshServer = async (isDev, httpPort) => {
  if (triggerHandle.refresh) {
    clearTimeout(triggerHandle.refresh);
  }
  triggerHandle.refresh = setTimeout(async () => {
    const token = sha256(process.env['DEV_TOKEN'] || '');
    const url = `http://127.0.0.1:${httpPort}/debug/refresh?t=${token}`;
    await sendRequest(url, isDev ? 2 : 0);
    console.log('[dev-server] Refresh Server: ', url);
  }, 500);
};

// watch server code changes
const watchServerPlugin = (isDev, npmCmd, httpPort) => {
  return {
    name: 'watchServerPlugin',
    setup(build) {
      build.onEnd(async (res) => {
        // console.log(`Build meta data: `, res);
        console.log(`[dev-server] Build finished`);
        if (isDev) {
          await triggerReStartServer(isDev, npmCmd, httpPort);
        }
      });
    },
  };
};

// watch server code changes
const watchAppLoader = async (isDev, npmCmd, httpPort, serverRootPath) => {
  const cmd = isDev ? esbuild.context : esbuild.build;
  const ctx = await cmd({
    entryPoints: ['apps/server/src/app-loader.ts'],
    // outdir: path.join(serverRootPath, 'server'),
    outfile: path.join(serverRootPath, 'server', 'app-loader.js'),
    platform: 'node',
    sourcemap: !!isDev,
    format: 'cjs',
    bundle: true,
    treeShaking: true,
    metafile: true,
    minify: !isDev,
    plugins: [watchServerPlugin(isDev, npmCmd, httpPort)],
  });

  isDev && (await ctx.watch());
  isDev && console.log('[dev-server] Watching...');
};

// watch server code changes
const watchServer = async (isDev, npmCmd, httpPort, serverRootPath) => {
  const cmd = isDev ? esbuild.context : esbuild.build;
  const ctx = await cmd({
    entryPoints: ['apps/server/src/index.ts'],
    outdir: path.join(serverRootPath, 'server'),
    platform: 'node',
    sourcemap: !!isDev,
    format: 'cjs',
    bundle: true,
    treeShaking: true,
    metafile: true,
    external: ['better-sqlite3', 'nodemailer', 'pdfkit', 'sharp'],
    loader: { '.svg': 'text', '.glsl': 'text', '.png': 'file', '.gif': 'file', '.html': 'text' },
    minify: !isDev,
    plugins: [watchServerPlugin(isDev, npmCmd, httpPort)],
  });

  isDev && (await ctx.watch());
  isDev && console.log('[dev-server] Watching...');
};

// copy files to output directory
const copyCache = new Map();
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
    for (oneDir of assets) {
      await copyFolder(copyCache, oneDir.from, oneDir.to, saved.isDev);
    }
  }

  if (saved.isDev) {
    await triggerRefreshServer(saved.isDev, saved.httpPort);
  }
};

// watch client code changes
const watchClientPlugin = (saved) => {
  return {
    name: 'watchClientPlugin',
    setup(build) {
      build.onEnd(async (res) => {
        // console.log(`Build meta data: `, res);
        console.log(`[dev-client:${saved.appName}] Build finished`);
        await clientProcessOnEnd(saved);
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
const watchClient = async (saved, isDev, entryPoints, outbase) => {
  const cmd = isDev ? esbuild.context : esbuild.build;
  const ctx = await cmd({
    entryPoints,
    outdir: saved.outdir,
    outbase,
    // entryNames: '[name]-[hash]',
    platform: 'browser',
    sourcemap: !!isDev, // inline
    format: 'iife',
    bundle: true,
    treeShaking: true,
    external: [],
    metafile: true,
    minify: !isDev,
    loader: { '.svg': 'text', '.glsl': 'text', '.png': 'file', '.gif': 'file', '.html': 'text' },
    assetNames: '/pub_assets/[name]-[hash]',
    publicPath: saved.outdirSub,
    jsxImportSource: 'lupine.web',
    jsx: 'automatic',
    target: ['chrome87'],
    plugins: [watchClientPlugin(saved), pluginIfelse(ifPluginVars), obfuscatePlugin(saved.isObfuscate, [])],
  });

  isDev && (await ctx.watch());
  isDev && console.log(`[dev-client:${saved.appName}] Watching...`);
};

const watchApiPlugin = (isDev, httpPort) => {
  return {
    name: 'watchApiPlugin',
    setup(build) {
      build.onEnd(async (res) => {
        console.log(`[dev-api] Build finished`);

        if (isDev) {
          await triggerRefreshServer(isDev, httpPort);
        }
      });
    },
  };
};

const watchApi = async (saved, isDev, entryPoints) => {
  const cmd = isDev ? esbuild.context : esbuild.build;
  const ctx = await cmd({
    entryPoints,
    outdir: saved.outdirApi,
    // outbase,
    platform: 'node',
    sourcemap: !!isDev, // inline
    format: 'cjs', // iife, cjs
    bundle: true,
    treeShaking: true,
    metafile: true,
    external: ['better-sqlite3', 'nodemailer', 'pdfkit', 'sharp'],
    loader: { '.svg': 'text', '.glsl': 'text', '.png': 'file', '.gif': 'file', '.html': 'text' },
    minify: !isDev,
    plugins: [watchApiPlugin(isDev, saved.httpPort)],
  });

  isDev && (await ctx.watch());
  isDev && console.log(`[dev-api:${saved.appName}] Watching...`);
};

const watchMarkdownPlugin = (saved) => {
  return {
    name: 'watchMarkdownPlugin',
    setup(build) {
      build.onEnd(async (res) => {
        // console.log(`Build meta data: `, res);
        console.log(`[dev-markdown:${saved.appName}] Build finished`);
        await markdownProcessOnEnd(saved.markdownEntryPoints.indir, saved.markdownEntryPoints.outdir);
      });
    },
  };
};

const watchMarkdown = async (saved, entryPoints) => {
  const cmd = saved.isDev ? esbuild.context : esbuild.build;
  const ctx = await cmd({
    entryPoints: [`${entryPoints.indir}/**/*.md`],
    outdir: entryPoints.outdir,
    write: false,
    loader: { '.md': 'empty' },
    plugins: [watchMarkdownPlugin({ ...saved, markdownEntryPoints: entryPoints })],
  });

  saved.isDev && (await ctx.watch());
};

const watchAdditionalFiles = async (saved, entryPoints) => {
  const cmd = saved.isDev ? esbuild.context : esbuild.build;
  const ctx = await cmd({
    entryPoints: entryPoints,
    outdir: 'dist/tmp',
    write: false,
    loader: { '.html': 'empty', '.css': 'empty', '.js': 'empty', '.md': 'empty' },
    plugins: [watchClientPlugin(saved)],
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
  // this is for esbuild conditional compile
  ifPluginVars.DEV = isDev ? '1' : '0';
  ifPluginVars.MOBILE = isMobile ? '1' : '0';

  // All apps should be defined in .env file like this:
  // APPS=domain1.com,domain2.com
  const apps = (process.env['APPS'] || '').split(',');

  const httpPort = process.env['HTTP_PORT'];
  for (const app of apps) {
    const appJson = `apps/${app}/lupine.json`;
    const additionalFiles = [];
    const appCfg = await readJson(appJson);
    const appName = appCfg['name'];
    const appDir = path.dirname(appJson);
    if (appCfg['watchFiles']) {
      appCfg['watchFiles'].forEach((item) => additionalFiles.push(`${appDir}/${item}`));
    }

    // create data folder
    await fs.mkdir(`${serverRootPath}/${appName}_data`, { recursive: true });

    const saved = {
      isDev,
      isMobile,
      isObfuscate,
      defaultThemeName: 'light',
      appName,
      httpPort,
      serverRoot: serverRootPath,
      outdirWeb: `${serverRootPath}/${appName}_web`,
      outdirApi: `${serverRootPath}/${appName}_api`,
      outdirData: `${serverRootPath}/${appName}_data`,
      copyFiles: appCfg['copyFiles'].map((item) => ({
        from: `${appDir}/${item.from}`,
        to:
          item.type == 'data'
            ? `${serverRootPath}/${appName}_data/${item.to}`
            : `${serverRootPath}/${appName}_web/${item.to}`,
      })),
    };

    appCfg['webEntryPoints'].forEach((item, index) => {
      const entryPoint = `${appDir}/${item.index}`;
      const indexHtml = `${appDir}/${item.html}`;
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
        path.dirname(entryPoint)
      );
      additionalFiles.push(indexHtml);
    });

    if (appCfg['apiEntryPoint']) {
      const entryPointApi = `${appDir}/${appCfg['apiEntryPoint']}`;
      watchApi(saved, isDev, [entryPointApi]);
    }
    if (appCfg['markdownEntryPoints']) {
      const markdownEntryPoints = {
        indir: `${appDir}/${appCfg['markdownEntryPoints'].indir}`,
        outdir: `${appDir}/${appCfg['markdownEntryPoints'].outdir}`,
      };
      watchMarkdown(saved, markdownEntryPoints);
    }
    if (additionalFiles.length > 0) {
      // when some resources are changed, need to run command or refresh the server
      watchAdditionalFiles(saved, additionalFiles);
    }
  }

  watchServer(isDev, npmCmd, httpPort, serverRootPath);
  watchAppLoader(isDev, npmCmd, httpPort, serverRootPath);
};
start();
