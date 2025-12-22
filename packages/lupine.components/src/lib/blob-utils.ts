export const blobToBase64 = (blob: Blob, removeMeta?: boolean): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(removeMeta ? (reader.result as string).split(',')[1] : reader.result as string); // data:audio/mpeg;base64,...
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const blobFromBase64 = (base64: string) => {
  const [header, base64Data] = base64.split(','); // remove data:... prefix
  const mimeMatch = header.match(/data:(.*);base64/);
  const mimeType = mimeMatch ? mimeMatch[1] : 'application/octet-stream';
  const byteCharacters = atob(base64Data);
  const byteNumbers = Array.from(byteCharacters).map((c) => c.charCodeAt(0));
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
};

export const base64ToUrl = (base64: string) => {
  const blob = blobFromBase64(base64);
  return URL.createObjectURL(blob);
};
