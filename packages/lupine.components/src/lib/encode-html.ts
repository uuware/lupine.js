const htmlEscapes: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  "'": '&#39;',
  '"': '&quot;',
};

export const encodeHtml = (str: string): string => {
  return str.replace(/[&<>'"]/g, (tag) => htmlEscapes[tag]);
};

const htmlUnescapes: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&#39;': "'",
  '&quot;': '"',
};

export const decodeHtml = (str: string): string => {
  return str.replace(/&(?:amp|lt|gt|quot|#39);/g, (tag) => htmlUnescapes[tag]);
};
