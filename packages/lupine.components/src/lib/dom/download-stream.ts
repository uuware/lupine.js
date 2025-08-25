/*
  const response = await fetch('/api/admin/release/check-log', { ... });
  const blob = await response.blob();
  downloadStream(blob, filename);
*/
export const downloadStream = (blob: Blob, filename?: string) => {
  const blobUrl = URL.createObjectURL(blob);
  const dom = document.createElement('a');
  dom.setAttribute('href', blobUrl);
  dom.setAttribute('download', filename || 'true');
  dom.style.display = 'none';
  document.body.appendChild(dom);
  dom.click();
  setTimeout(() => {
    document.body.removeChild(dom);
    URL.revokeObjectURL(blobUrl);
  }, 3000);
  return dom;
};
