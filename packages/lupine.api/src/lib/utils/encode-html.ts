export const encodeHtml = (str: string): string => {
  if (!str) {
    return str;
  }
  return str.toString().replace(
    /[&<>'"]/g,
    (tag) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;',
      }[tag] || '')
  );
};

export const decodeHtml = (str: string): string => {
  if (!str) {
    return str;
  }
  return str.toString().replace(
    /&(\D+);/gi,
    (tag) =>
      ({
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&#39;': "'",
        '&quot;': '"',
      }[tag] || '')
  );
};
