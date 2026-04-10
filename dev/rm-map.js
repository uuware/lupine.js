const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../dist/server_root');

if (!fs.existsSync(targetDir)) {
  console.log(`Directory not found: ${targetDir}`);
  process.exit(0);
}

const isTargetSubDir = (dirName) => {
  return dirName === 'server' || dirName.endsWith('_api') || dirName.endsWith('_web');
};

const deleteMapFiles = (dir) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      deleteMapFiles(fullPath);
    } else if (stat.isFile() && fullPath.endsWith('.map')) {
      fs.unlinkSync(fullPath);
      console.log(`Deleted: ${fullPath}`);
    }
  }
};

const main = () => {
  const items = fs.readdirSync(targetDir);
  for (const item of items) {
    const fullPath = path.join(targetDir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory() && isTargetSubDir(item)) {
      console.log(`Processing directory: ${item}`);
      deleteMapFiles(fullPath);
    }
  }
  console.log('Cleanup of .map files complete.');
};

main();
