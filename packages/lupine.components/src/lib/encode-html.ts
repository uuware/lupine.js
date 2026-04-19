const htmlEscapes: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  "'": '&#39;',
  '"': '&quot;',
};

export const encodeHtml = (str: any): string => {
  if (str === null || str === undefined) return '';
  return String(str).replace(/[&<>'"]/g, (tag) => htmlEscapes[tag]);
};

const htmlUnescapes: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&#39;': "'",
  '&quot;': '"',
};

export const decodeHtml = (str: string): string => {
  if (str === null || str === undefined) return '';
  return String(str).replace(/&(?:amp|lt|gt|quot|#39);/g, (tag) => htmlUnescapes[tag]);
};
