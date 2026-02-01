const fs = require('fs');
const path = require('path');

const src = process.argv[2];
const dest = process.argv[3];

if (!src || !dest) {
  console.error('Usage: node dev/cp-folder.js <source> <destination>');
  process.exit(1);
}

const srcPath = path.resolve(process.cwd(), src);
const destPath = path.resolve(process.cwd(), dest);

if (fs.existsSync(srcPath)) {
  console.log(`Copying from ${src} to ${dest}...`);
  fs.cpSync(srcPath, destPath, { recursive: true });
  console.log('Copy complete.');
} else {
  console.log(`Source directory ${src} does not exist. Skipping copy.`);
}
