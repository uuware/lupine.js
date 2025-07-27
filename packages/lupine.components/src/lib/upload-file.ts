import { getRenderPageProps } from "lupine.web";

const _saveChunkSize = {
  size: 1024 * 500,
};
export const setChunkSize = (chunkSize: number) => {
  _saveChunkSize.size = chunkSize;
};
export const getChunkSize = () => {
  return _saveChunkSize.size;
};
export const checkUploadedFileSize = async (uploadUrl: string) => {
  // const response = await fetch(uploadUrl + '?check-size=1', {
  //   method: 'POST',
  // });
  // const json = await response.json();
  const json = await getRenderPageProps().renderPageFunctions.fetchData(uploadUrl + '?check-size=1');
  return json && json.size ? json.size : 0;
};

// should return { chunkNumber: number }
export const uploadFileChunk = async (
  chunk: any,
  chunkNumber: number,
  totalChunks: number,
  uploadUrl: string,
  key: string
) => {
  // this must be the FE so we can use fetch
  let url = uploadUrl + (uploadUrl.indexOf('?') === -1 ? '?' : '');
  url += `&chunkNumber=${chunkNumber.toString()}`;
  url += `&totalChunks=${totalChunks.toString()}`;
  if (key) {
    url += `&key=${key}`;
  }
  // const response = await fetch(url, {
  //   method: 'POST',
  //   body: chunk,
  // });
  // const json = await response.json();
  console.log(`uploadFileChunk, ${uploadUrl}, index: ${chunkNumber}, total: ${totalChunks}, len: ${chunk.length}`);
  const json = await getRenderPageProps().renderPageFunctions.fetchData(url, chunk);
  return json;
};

export const uploadFile = async (
  file: File | string,
  uploadUrl: string,
  progressFn?: (percentage: number, chunkNumber: number, totalChunks: number) => void,
  chunkSize = _saveChunkSize.size
) => {
  // const uploadedSize = await checkUploadedFileSize(uploadUrl);
  let key = '';
  const len = file instanceof File ? file.size : file.length;
  if (len <= chunkSize) {
    return await uploadFileChunk(file, 0, 1, uploadUrl, key);
  }

  const totalChunks = Math.ceil(len / chunkSize);
  for (let i = 0; i < totalChunks; i++) {
    const start = i * chunkSize;
    const end = Math.min((i + 1) * chunkSize, len);
    const chunk = file.slice(start, end);
    const uploaded = await uploadFileChunk(chunk, i, totalChunks, uploadUrl, key);
    if (!uploaded || uploaded.chunkNumber === i.toString() || !uploaded.key) {
      return false;
    }
    key = uploaded.key;
    if (progressFn) {
      progressFn(Math.round(((i + 1) / totalChunks) * 100) / 100, i, totalChunks);
    }
  }
  return true;
};
