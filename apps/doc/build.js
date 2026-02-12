import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const { markdownProcessOnEnd } = require('lupine.api/dev');

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function build() {
  console.log('Building markdown...');
  const configPath = path.resolve(__dirname, 'lupine.json');
  console.log('Reading config from:', configPath);

  // readJson might need absolute path if it doesn't handle ./ relative to CWD correctly, or CWD is wrong.
  // Let's try native CommonJS require for json if readJson is finicky, or just use fs.
  const fs = require('fs');
  if (fs.existsSync(configPath)) {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    // console.log('Config loaded:', JSON.stringify(config, null, 2));

    // change to relative path
    const indir = config.markdownEntryPoints.indir.startsWith('web/')
      ? config.markdownEntryPoints.indir.substring(4)
      : config.markdownEntryPoints.indir;
    const outdir = config.markdownEntryPoints.outdir.startsWith('web/')
      ? config.markdownEntryPoints.outdir.substring(4)
      : config.markdownEntryPoints.outdir;
    await markdownProcessOnEnd(indir, outdir);
  } else {
    console.error('lupine.json not found at', configPath);
  }
}

build();
