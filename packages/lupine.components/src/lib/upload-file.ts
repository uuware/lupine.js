import { getRenderPageProps } from 'lupine.web';
import { NotificationColor, NotificationMessage } from '../components';

const _saveChunkSize = {
  size: 1024 * 200,
};
export const setUploadChunkSize = (chunkSize: number) => {
  _saveChunkSize.size = chunkSize;
};
export const getUploadChunkSize = () => {
  return _saveChunkSize.size;
};
export const checkUploadedFileSize = async (uploadUrl: string) => {
  let url = uploadUrl + (uploadUrl.indexOf('?') === -1 ? '?' : '') + '&check-size=1';
  const json = await getRenderPageProps().renderPageFunctions.fetchData(url);
  return json && json.json.size ? json.json.size : 0;
};

// should return { chunkNumber: number }
export const uploadFileChunk = async (
  chunk: any,
  chunkNumber: number,
  totalChunks: number,
  uploadUrl: string,
  key: string,
  retryCount = 3,
  retryMessage = '' // can have ${tryCount}
) => {
  let url = uploadUrl + (uploadUrl.indexOf('?') === -1 ? '?' : '');
  url += `&chunkNumber=${chunkNumber.toString()}`;
  url += `&totalChunks=${totalChunks.toString()}`;
  if (key) {
    url += `&key=${key}`;
  }
  let tryCount = 0;
  let json;
  while (tryCount < retryCount) {
    try {
      json = await getRenderPageProps().renderPageFunctions.fetchData(url, chunk);
      if (json && json.json) {
        json = json.json;
      }
      if (json && json.status) {
        // ok or error
        break;
      }
    } catch (error) {
      console.log(`uploadFileChunk error, try: ${tryCount}`, error);
    }
    tryCount++;
    if (retryMessage) {
      NotificationMessage.sendMessage(
        retryMessage.replace('${tryCount}', tryCount.toString()),
        NotificationColor.Warning
      );
    }
  }
  return json;
};

export const uploadFile = async (
  file: File | string,
  uploadUrl: string,
  progressFn?: (percentage: number, chunkNumber: number, totalChunks: number) => void,
  chunkSize = 0,
  retryCount = 3,
  retryMessage = '' // can have ${tryCount}
) => {
  // const uploadedSize = await checkUploadedFileSize(uploadUrl);
  let key = '';
  const len = file instanceof File ? file.size : file.length;
  if (!chunkSize) {
    chunkSize = _saveChunkSize.size;
  }
  if (len <= chunkSize) {
    const result = await uploadFileChunk(file, 0, 1, uploadUrl, key, retryCount, retryMessage);
    if (!result || result.status !== 'ok') {
      return result;
    }
    if (progressFn) {
      progressFn(1, 0, len);
    }
    return true;
  }

  const totalChunks = Math.ceil(len / chunkSize);
  for (let i = 0; i < totalChunks; i++) {
    const start = i * chunkSize;
    const end = Math.min((i + 1) * chunkSize, len);
    const chunk = file.slice(start, end);
    const result = await uploadFileChunk(chunk, i, totalChunks, uploadUrl, key, retryCount, retryMessage);
    if (!result || result.status !== 'ok') {
      return result;
    }
    key = result.key;
    if (progressFn) {
      progressFn(Math.round(((i + 1) / totalChunks) * 100) / 100, i, totalChunks);
    }
  }
  return true;
};
