const fs = require('fs/promises');
const path = require('path');
const esbuild = require('esbuild');

exports.copyFolder = async (copyCache, src, dest, isDev) => {
  const stat = await fs.stat(src);
  if (stat.isDirectory()) {
    await fs.mkdir(dest, { recursive: true });
    const children = await fs.readdir(src);
    for (const childItemName of children) {
      await exports.copyFolder(copyCache, path.join(src, childItemName), path.join(dest, childItemName), isDev);
    }
  } else if (stat.isFile()) {
    let statDest = copyCache.get(src);
    let isDestMissing = false;

    if (!statDest) {
      try {
        await fs.access(dest);
        copyCache.set(src, stat);
        statDest = stat;
      } catch (err) {
        isDestMissing = true;
      }
    }

    if (isDestMissing || stat.size !== statDest.size || stat.mtime.getTime() !== statDest.mtime.getTime()) {
      try {
        const destDir = path.dirname(dest);
        await fs.mkdir(destDir, { recursive: true });

        if (isDev && src.endsWith('.css')) {
          const css = await fs.readFile(src, 'utf-8');
          const newCss = (await esbuild.transform(css, { loader: 'css', minify: true })).code;
          await fs.writeFile(dest, newCss, 'utf-8');
        } else {
          await fs.copyFile(src, dest);
        }
        copyCache.set(src, stat);
        // utimes is not accurate
        // await fs.utimes(dest, stat.atime, stat.mtime);
        console.log(`copy from [${src}] to  [${dest}]`);
      } catch (err) {
        console.log(`error when copy from ${src} to ${dest}`, err);
      }
    }
  }
};
