const _fs = require('fs');
const _path = require('path');
export const loadSsrRoots = async (dir: string, roots: Set<string>) => {
  try {
    const dirents = await _fs.promises.readdir(dir, { withFileTypes: true });
    let hasHtml = false,
      hasJs = false;
    const subDirs: string[] = [];
    for (const d of dirents) {
      if (d.isDirectory()) subDirs.push(d.name);
      else if (d.isFile()) {
        if (d.name === 'index.html') hasHtml = true;
        if (d.name === 'index.js') hasJs = true;
      }
    }
    if (hasHtml && hasJs) roots.add(dir);
    for (const sub of subDirs) {
      await loadSsrRoots(_path.join(dir, sub), roots);
    }
  } catch (e) {
    // directory might be empty or restricted, gracefully bypass
  }
};
