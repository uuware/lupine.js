const fs = require('fs');
const path = require('path');

function copyRecursiveSync(src, dest) {
  const stats = fs.statSync(src);
  const isDirectory = stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    // Ensure parent directory exists for file copy (just in case)
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    fs.copyFileSync(src, dest);
  }
}

function copyFolder(src, dest) {
  if (!src || !dest) {
    console.error('Usage: node dev/cp-folder.js <source> <destination>');
    if (require.main === module) process.exit(1);
    return;
  }

  const srcPath = path.resolve(process.cwd(), src);
  const destPath = path.resolve(process.cwd(), dest);

  if (fs.existsSync(srcPath)) {
    console.log(`Copying from ${src} to ${dest}...`);
    copyRecursiveSync(srcPath, destPath);
    console.log('Copy complete.');
  } else {
    console.log(`Source directory ${src} does not exist. Skipping copy.`);
  }
}

if (require.main === module) {
  const src = process.argv[2];
  const dest = process.argv[3];
  copyFolder(src, dest);
}

module.exports = copyFolder;
