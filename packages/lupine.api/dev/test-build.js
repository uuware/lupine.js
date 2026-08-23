const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

const srcDir = path.join(__dirname, '../src');
const outDir = path.join(__dirname, '../dist-test');

const entryPoints = fs
  .readdirSync(srcDir, { recursive: true })
  .filter((file) => typeof file === 'string' && file.endsWith('.test.ts'))
  .map((file) => path.join(srcDir, file));

esbuild.buildSync({
  entryPoints,
  outdir: outDir,
  platform: 'node',
  bundle: true,
  external: ['better-sqlite3', 'mysql2', 'mysql2/promise', 'mssql', 'oracledb'],
  format: 'cjs',
  jsx: 'automatic',
  jsxImportSource: 'lupine.web',
});
