export const pathUtils = {
  join(...parts: string[]): string {
    let joined = parts.filter(Boolean).join('/');
    joined = joined.replace(/\/+/g, '/'); // merge duplicate slashes
    const isAbsolute = parts[0]?.startsWith('/');
    return isAbsolute ? '/' + joined.replace(/^\/+/, '') : joined.replace(/^\/+/, '');
  },

  dirname(p: string): string {
    if (!p) return '.';
    p = p.replace(/\/+$/, '');
    const idx = p.lastIndexOf('/');
    if (idx === -1) return '.';
    if (idx === 0) return '/';
    return p.slice(0, idx);
  },

  // get filename, remove ext if exists
  basename(p: string, ext?: string): string {
    if (!p) return '';
    p = p.replace(/\/+$/, '');
    const idx = p.lastIndexOf('/');
    let base = idx === -1 ? p : p.slice(idx + 1);
    if (ext && base.endsWith(ext)) {
      base = base.slice(0, -ext.length);
    }
    return base;
  },

  // .hidden's ext is empty (Node.js behavior)
  extname(p: string): string {
    if (!p) return '';
    const base = pathUtils.basename(p);
    const idx = base.lastIndexOf('.');
    return idx > 0 ? base.slice(idx) : '';
  },
};
