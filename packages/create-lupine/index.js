#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';
import { execSync } from 'node:child_process';

function getLatestVersion(pkgName, fallback) {
  try {
    const version = execSync(`npm view ${pkgName} version`, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
      timeout: 3000,
    }).trim();
    return version ? `^${version}` : fallback;
  } catch (e) {
    return fallback;
  }
}

function generateRandomString(length) {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_!@&?-#$';
  return [...crypto.randomBytes(length)].map((x) => chars[x % chars.length]).join('');
}

const red = (str) => `\x1b[31m${str}\x1b[0m`;
const green = (str) => `\x1b[32m${str}\x1b[0m`;
const bold = (str) => `\x1b[1m${str}\x1b[0m`;

const argv = process.argv.slice(2).reduce(
  (acc, arg) => {
    if (arg.startsWith('--template=')) {
      acc.template = arg.split('=')[1];
    } else if (arg.startsWith('--')) {
      acc[arg.slice(2)] = true;
    } else {
      acc._.push(arg);
    }
    return acc;
  },
  { _: [] }
);
// Handle -t alias manually if needed, or just support --template
// The original code supported `argv.t`
const args = process.argv.slice(2);
for (let i = 0; i < args.length; i++) {
  if (args[i] === '-t' && args[i + 1]) {
    argv.template = args[i + 1];
  }
}
const cwd = process.cwd();

const TEMPLATES = [
  {
    name: 'hello-world',
    display: 'Hello World',
    itemType: 'frontend',
    color: green,
  },
  {
    name: 'doc-starter',
    display: 'Documentation Starter',
    itemType: 'frontend',
    color: green,
    needsPress: true,
  },
  {
    name: 'cv-starter',
    display: 'CV Starter',
    itemType: 'frontend',
    color: green,
    needsPress: true,
  },
];

async function init() {
  let targetDir = argv._[0];
  let template = argv.template || argv.t;

  const defaultTargetDir = 'lupine-project';

  function isValidPackageName(projectName) {
    return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(projectName);
  }

  function toValidPackageName(projectName) {
    return projectName
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/^[._]/, '')
      .replace(/[^a-z0-9-~]+/g, '-');
  }

  if (!targetDir) {
    targetDir = (await prompt(`Project name: (${green(defaultTargetDir)}) `)) || defaultTargetDir;
  }

  while (!isValidPackageName(targetDir)) {
    console.log(red(`✖ Invalid project name: "${targetDir}". Name can not contain spaces or sensitive characters.`));
    const suggestion = toValidPackageName(targetDir);
    targetDir = (await prompt(`Project name: (${green(suggestion)}) `)) || suggestion;
  }

  const root = path.join(cwd, targetDir);

  if (fs.existsSync(root) && !isEmpty(root)) {
    const overwrite = await prompt(
      `Target directory "${green(targetDir)}" is not empty. Remove existing files and continue? (y/N) `
    );
    if (overwrite.toLowerCase() !== 'y') {
      throw new Error(red('✖ Operation cancelled'));
    }
    emptyDir(root);
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root, { recursive: true });
  }

  if (!template || !TEMPLATES.find((t) => t.name === template)) {
    if (template && !TEMPLATES.find((t) => t.name === template)) {
      console.log(`"${template}" isn't a valid template. Please choose from below:`);
    } else {
      console.log('Select a template:');
    }

    TEMPLATES.forEach((t, i) => {
      console.log(`  ${t.color(i + 1 + '. ' + (t.display || t.name))}`);
    });

    const templateIdx = await prompt(`Select a template (${green('1-' + TEMPLATES.length)}): `);
    const selected = TEMPLATES[parseInt(templateIdx) - 1];
    if (!selected) {
      throw new Error(red('✖ Invalid template selected'));
    }
    template = selected.name;
  }

  const templateDir = path.resolve(fileURLToPath(import.meta.url), '../templates', template);
  const commonDir = path.resolve(fileURLToPath(import.meta.url), '../templates', 'common');

  // ... (copy logic remains same)

  console.log(`\nScaffolding project in ${root}...`);

  copyDir(commonDir, root);
  fs.renameSync(path.join(root, '_gitignore'), path.join(root, '.gitignore'));
  fs.renameSync(path.join(root, '_env'), path.join(root, '.env'));

  const appsDir = path.join(root, 'apps');
  if (!fs.existsSync(appsDir)) {
    fs.mkdirSync(appsDir);
  }

  const appName = path.basename(root);
  const targetAppDir = path.join(appsDir, appName);

  copyDir(templateDir, targetAppDir);

  changePkgName(path.join(targetAppDir, 'lupine.json'), appName);
  changePkgName(path.join(targetAppDir, 'api', 'package.json'), appName + '-api');
  changePkgName(path.join(targetAppDir, 'web', 'package.json'), appName + '-web');

  const pkg = {
    name: appName,
    version: '0.0.0',
    private: true,
    workspaces: ['apps/*', 'apps/*/*', 'packages/*'],
    scripts: {
      'app1:build-win': `electron-builder --win --config apps/${appName}/electron/builder.json`,
      'app1:build-linux': `electron-builder --linux --config apps/${appName}/electron/builder.json`,
      'app1:build-mac': `export CSC_IDENTITY_AUTO_DISCOVERY=true && electron-builder --mac --x64 --config apps/${appName}/electron/builder.json`,
      'app1:unpack-mac': `npx asar extract dist/build/mac-arm64-unpacked/${appName}.app/Contents/Resources/app.asar dist/build/mac-arm64-unpacked/${appName}.app/Contents/Resources/app.asar-unpack`,
      'app1:unpack-linux': `npx asar extract dist/build/linux-arm64-unpacked/resources/app.asar dist/build/linux-arm64-unpacked/resources/app.asar-unpack`,
      'app1:unpack-win': `npx asar extract dist/build/win-unpacked/resources/app.asar dist/build/win-unpacked/resources/app.asar-unpack`,
      'app1:desktop': `electron apps/${appName}/electron/main.js`,
      'app1:sync': `npm run sync --workspace=${appName}-web`,
      'app1:open-ios': `npm run open-ios --workspace=${appName}-web`,
      'app1:open-android': `npm run open-android --workspace=${appName}-web`,
      dev: 'node ./dev/dev-watch --env=.env.development --dev=1 --cmd=start-dev',
      build: 'node ./dev/dev-watch --env=.env.production --dev=0 --obfuscate=0',
      'build-mobile': 'node ./dev/dev-watch --env=.env.mobile --dev=0 --mobile=1',
      'start-dev': 'node dist/server_root/server/app-loader.js --env=.env.development',
      'start-production': 'node dist/server_root/server/app-loader.js --env=.env.production',
      format: 'prettier --write "**/*.{js,json,css,scss,md,html,yaml,ts,jsx,tsx}"',
    },
    dependencies: {
      'lupine.api': 'file:packages/lupine.api',
    },
    devDependencies: {
      esbuild: '^0.24.2',
      electron: '^35.2.0',
      'electron-builder': '^26.0.12',
      typescript: '^5.7.2',
      '@types/node': '^22.10.5',
      prettier: '^2.7.1',
    },
  };

  console.log('Fetching latest versions...');
  const latestApi = getLatestVersion('lupine.api', '^1.0.1');
  const latestWeb = getLatestVersion('lupine.web', '^1.0.1');
  const latestComponents = getLatestVersion('lupine.components', '^1.0.1');
  const latestPress = getLatestVersion('lupine.press', '^1.0.1');

  pkg.dependencies = {
    'lupine.api': latestApi,
    'lupine.components': latestComponents,
    'lupine.web': latestWeb,
  };

  const templateObj = TEMPLATES.find((t) => t.name === template);
  if (templateObj && templateObj.needsPress) {
    pkg.dependencies['lupine.press'] = latestPress;
    pkg.devDependencies['gray-matter'] = '^4.0.3';
    pkg.devDependencies['marked'] = '^17.0.1';
    pkg.scripts['cp-docs'] = `node dev/cp-folder.js dist/server_root/${appName}_web/github-pj-name docs`;
  }

  fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify(pkg, null, 2));

  if (fs.existsSync(path.join(root, '.env'))) {
    let envContent = fs.readFileSync(path.join(root, '.env'), 'utf-8');

    // Auto-generate passwords
    const keysToUpdate = ['ADMIN_PASS=', 'CRYPTO_KEY=', 'DEV_ADMIN_PASS=', 'DEV_CRYPTO_KEY=', 'DEV_TOKEN='];
    keysToUpdate.forEach((key) => {
      // Replace line starting with key=
      envContent = envContent.replace(new RegExp(`^${key}.*`, 'gm'), `${key}${generateRandomString(32)}`);
    });

    envContent = envContent.replace(/{APP-NAME}/g, appName);
    fs.writeFileSync(path.join(root, '.env'), envContent);
  }

  console.log(`\nDone. Now run:\n`);
  console.log(`  cd ${targetDir}`);
  console.log(`  npm install`);
  console.log(`  npm run dev`);
  console.log(``);
}

import readline from 'node:readline';

function prompt(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

function copy(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    copyDir(src, dest);
  } else {
    fs.copyFileSync(src, dest);
  }
}

function copyDir(srcDir, destDir) {
  fs.mkdirSync(destDir, { recursive: true });
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file);
    const destFile = path.resolve(destDir, file);
    copy(srcFile, destFile);
  }
}

function changePkgName(src, name) {
  if (fs.existsSync(src)) {
    const pkgJson = JSON.parse(fs.readFileSync(src, 'utf-8'));
    pkgJson.name = name;
    fs.writeFileSync(src, JSON.stringify(pkgJson, null, 2));
  }
}

function isEmpty(path) {
  const files = fs.readdirSync(path);
  return files.length === 0 || (files.length === 1 && files[0] === '.git');
}

function emptyDir(dir) {
  if (!fs.existsSync(dir)) {
    return;
  }
  for (const file of fs.readdirSync(dir)) {
    const abs = path.resolve(dir, file);
    if (file === '.git') {
      continue;
    }
    fs.rmSync(abs, { recursive: true, force: true });
  }
}

init().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
