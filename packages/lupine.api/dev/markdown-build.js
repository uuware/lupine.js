const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const matter = require('gray-matter');

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '');

const cleanMarkdown = (text) => text.replace(/[`*?^]/g, '');

marked.use({
  renderer: {
    heading({ text, depth, raw }) {
      const id = slugify(raw);
      return `<h${depth} id="${id}"><a class="header-anchor" href="#${id}">#</a>${text}</h${depth}>`;
    },
  },
});

const builtFiles = new Map(); // path -> { route, importPath, data, headings }

function processFile(filePath, indir, outdir, relativePath) {
  if (builtFiles.has(filePath)) return builtFiles.get(filePath);

  // Mark as processing to handle potential cycles (though minimal risk with hierarchy)
  // We'll update the value later.
  builtFiles.set(filePath, null);

  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    return null;
  }

  const contentRaw = fs.readFileSync(filePath, 'utf8');
  const { data, content: markdown } = matter(contentRaw);

  const stat = fs.statSync(filePath);
  const outHtmlFile = relativePath.replace('.md', '.html');
  const outPathFile = path.join(outdir, outHtmlFile);

  // Ensure dir exists
  const outDirName = path.dirname(outPathFile);
  if (!fs.existsSync(outDirName)) {
    fs.mkdirSync(outDirName, { recursive: true });
  }

  // Build HTML if needed
  if (!fs.existsSync(outPathFile) || stat.mtime > fs.statSync(outPathFile).mtime) {
    let html = marked.parse(markdown);
    // Link transformation
    html = html.replace(/href="([^"]+)"/g, (match, p1) => {
      if (p1.startsWith('http') || p1.startsWith('#') || p1.startsWith('javascript:')) {
        return match;
      }
      let targetUrl = p1;
      if (!targetUrl.startsWith('/')) {
        const currentRouteDir = '/' + path.dirname(relativePath).replace(/\\/g, '/');
        targetUrl = path.posix.join(currentRouteDir, targetUrl);
      }
      return `href="javascript:lpPressLoad('${targetUrl}')"`;
    });
    fs.writeFileSync(outPathFile, html);
  }

  const tokens = marked.lexer(markdown);
  const headings = [];
  tokens.forEach((token) => {
    if (token.type === 'heading' && (token.depth === 2 || token.depth === 3)) {
      const id = slugify(token.raw);
      headings.push({ level: token.depth, text: cleanMarkdown(token.text), id });
    }
  });

  const lang = relativePath.split(/[\\/]/)[0] || 'en';

  const expandSidebar = (items) => {
    const result = [];
    items.forEach((item) => {
      if (typeof item === 'object' && item.submenu) {
        let targetPath = item.submenu;
        if (targetPath.startsWith('/')) targetPath = targetPath.substring(1);

        // submenu points to a directory, look for index.md
        const subRelative = path.join(targetPath, 'index.md');
        const subAbs = path.join(indir, subRelative);

        // Recursively build the submenu index
        const subFileInfo = processFile(subAbs, indir, outdir, subRelative);

        if (subFileInfo && subFileInfo.data && subFileInfo.data.sidebar) {
          if (subFileInfo.data.title) {
            result.push({ text: subFileInfo.data.title, items: subFileInfo.data.sidebar });
          } else {
            result.push(...subFileInfo.data.sidebar);
          }
        } else {
          // Fallback if no sidebar found, maybe just link to it?
          // Or ignoring it as per previous logic "find managed files"
          result.push(item);
        }
      } else if (typeof item === 'string') {
        // Ensure referenced file is built
        let targetPath = item;
        if (targetPath.startsWith('/')) targetPath = targetPath.substring(1);

        // It could be a file or a dir (implying index.md)
        let subAbs = path.join(indir, targetPath);
        let subRelative = targetPath;

        if (fs.existsSync(subAbs) && fs.statSync(subAbs).isDirectory()) {
          subRelative = path.join(targetPath, 'index.md');
          subAbs = path.join(indir, subRelative);
        } else if (!subAbs.endsWith('.md')) {
          subAbs += '.md';
          subRelative += '.md';
        }

        processFile(subAbs, indir, outdir, subRelative);
        result.push(item);
      } else if (typeof item === 'object' && item.items) {
        item.items = expandSidebar(item.items);
        result.push(item);
      } else {
        result.push(item);
      }
    });
    return result;
  };

  if (data.sidebar) {
    data.sidebar = expandSidebar(data.sidebar);
  }

  const prefixLinks = (obj) => {
    if (!obj || typeof obj !== 'object') return obj;
    if (Array.isArray(obj)) return obj.map(prefixLinks);
    const result = {};
    for (const key in obj) {
      let val = obj[key];
      if (key === 'link' && typeof val === 'string' && val.startsWith('/') && !val.startsWith(`/${lang}/`)) {
        val = `/${lang}${val}`;
      }
      result[key] = prefixLinks(val);
    }
    return result;
  };
  const prefixedData = prefixLinks(data);

  const route = '/' + relativePath.replace(/\\/g, '/').replace(/\.md$/, '');
  // const importPath = './' + relativePath.replace(/\\/g, '/').replace(/\.md$/, '.html');
  const importPath = './' + path.relative(outdir, outPathFile).replace(/\\/g, '/');

  const info = { route, importPath, data: prefixedData, headings };
  builtFiles.set(filePath, info);
  return info;
}

const markdownProcessOnEnd = async (indir, outdir) => {
  try {
    if (!indir || !outdir) return;

    const langPath = path.join(indir, 'index.md');
    if (!fs.existsSync(langPath)) {
      console.warn(`[dev-markdown] No index.md found in ${indir}`);
      return;
    }

    const langContent = fs.readFileSync(langPath, 'utf8');
    const { data, content: markdown } = matter(langContent);
    const lang = data.lang;
    if (!lang || lang.length < 1 || !lang[0].id) {
      console.warn(`[dev-markdown] No lang found in ${langPath}`);
      return;
    }

    // Ensure outDir exists
    if (!fs.existsSync(outdir)) {
      fs.mkdirSync(outdir, { recursive: true });
    }

    builtFiles.clear();

    // Process root index.md to provide global config (languages) at '/'
    if (fs.existsSync(langPath)) {
      const rootInfo = processFile(langPath, indir, outdir, 'index.md');
      if (rootInfo) {
        rootInfo.route = '/';
        // Re-key as '/' to ensure it's accessible as markdownConfig['/']
        builtFiles.delete(langPath);
        builtFiles.set('/', rootInfo);
      }
    }

    lang.forEach((entry) => {
      const fullPath = path.join(indir, entry.id, 'index.md');
      if (fs.existsSync(fullPath)) {
        const relativePath = path.join(entry.id, 'index.md');
        processFile(fullPath, indir, outdir, relativePath);
      }
    });

    // 1. Build a map of route -> data to look up titles
    const routeMap = new Map();
    for (const info of builtFiles.values()) {
      if (info && info.route) {
        routeMap.set(info.route, info.data);
      }
    }

    // 2. Flatten and enrich sidebars for top-level index pages
    const flattenSidebar = (items, level) => {
      const result = [];
      if (!items || !Array.isArray(items)) return result;

      items.forEach((item) => {
        if (typeof item === 'object' && item.items && Array.isArray(item.items)) {
          // Group
          let newLevel = level;
          if (item.text) {
            result.push({
              type: 'group',
              text: item.text,
              level: level,
            });
            newLevel++;
          }
          result.push(...flattenSidebar(item.items, newLevel));
        } else if (typeof item === 'string') {
          // Link
          let link = item;
          // Ensure link format matches route (usually starts with /)
          // Look up title
          const pageData = routeMap.get(link);
          const text = pageData && pageData.title ? pageData.title : link;

          result.push({
            type: 'link',
            text: text, // Enriched title
            link: link,
            level: level,
          });
        } else if (typeof item === 'object' && item.link) {
          // Link object already
          result.push({
            type: 'link',
            text: item.text,
            link: item.link,
            level: level,
          });
        }
      });
      return result;
    };

    // Apply only to index pages (or all pages? usually only index has sidebar)
    // Actually we should perform this for any file that has a sidebar defined.
    for (const info of builtFiles.values()) {
      if (info && info.data && info.data.sidebar) {
        info.data.sidebar = flattenSidebar(info.data.sidebar, 0);
      }

      // 3. Process nav
      const resolveItem = (item) => {
        let link = typeof item === 'string' ? item : item.link;
        let text = typeof item === 'string' ? item : item.text;

        if (link) {
          // Handle directory links (e.g. /zh/guide/ -> /zh/guide/index)
          // Check if the link exists in routeMap, if not check link + 'index'
          if (!routeMap.has(link) && routeMap.has(link + '/index')) {
            link = link + '/index';
          } else if (!routeMap.has(link) && link.endsWith('/') && routeMap.has(link + 'index')) {
            link = link + 'index';
          }

          const pageData = routeMap.get(link);
          if (!text && pageData && pageData.title) {
            text = pageData.title;
          }
        }

        if (typeof item === 'string') {
          return { text: text || link, link: link };
        }

        return { ...item, text: text || link, link: link };
      };

      for (const info of builtFiles.values()) {
        if (info && info.data && info.data.nav && Array.isArray(info.data.nav)) {
          info.data.nav = info.data.nav.map((resolveNav) => resolveItem(resolveNav));
        }
      }
    }

    const files = Array.from(builtFiles.values())
      .filter((x) => x !== null)
      .sort((a, b) => a.route.localeCompare(b.route));

    // Generate markdown-config.ts
    const configPath = path.join(outdir, 'markdown-config.ts');
    let configContent = files.map((f, i) => `import html${i} from '${f.importPath}';`).join('\n');
    configContent +=
      '\n\nexport const markdownConfig: Record<string, { html: string; data: any; headings: any[] }> = {\n';
    files.forEach((f, i) => {
      configContent += `  '${f.route}': { html: html${i}, data: ${JSON.stringify(f.data)}, headings: ${JSON.stringify(
        f.headings
      )} },\n`;
    });
    configContent += '};\n';

    fs.writeFileSync(configPath, configContent);
    console.log(`[dev-markdown: ${indir}] Successfully built ${files.length} markdown files.`);
  } catch (err) {
    console.log(`[dev-markdown: ${indir}] Error:`, err);
  }
};

module.exports = {
  markdownProcessOnEnd,
};
