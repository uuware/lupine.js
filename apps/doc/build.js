import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const { markdownProcessOnEnd, readJson } = require('lupine.api/dev');

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
    console.log('Config loaded:', JSON.stringify(config, null, 2));

    await markdownProcessOnEnd(config.markdownEntryPoints.indir, config.markdownEntryPoints.outdir);
  } else {
    console.error('lupine.json not found at', configPath);
  }
}

build();
