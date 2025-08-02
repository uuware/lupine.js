import { NotificationColor, NotificationMessage } from 'lupine.components';
import { getRenderPageProps } from 'lupine.web';

const _saveChunkSize = {
  downloadSize: 1024 * 200,
};
export const setDownloadChunkSize = (chunkSize: number) => {
  _saveChunkSize.downloadSize = chunkSize;
};
export const getDownloadChunkSize = () => {
  return _saveChunkSize.downloadSize;
};

// should return { chunkNumber: number }
export const downloadFileChunk = async (
  downloadUrl: string,
  rangeStart: number,
  rangeLength: number,
  retryCount = 3,
  retryMessage = '' // can have ${tryCount}
) => {
  let url = downloadUrl + (downloadUrl.indexOf('?') === -1 ? '?' : '');
  url += `&start=${rangeStart.toString()}`;
  url += `&length=${rangeLength.toString()}`;
  let tryCount = 0;
  while (tryCount < retryCount) {
    try {
      const rawData = (await getRenderPageProps().renderPageFunctions.fetchData(
        url,
        undefined,
        true,
        true
      )) as Response;
      // console.log('downloadFileChunk', rawData);
      const fileSize = rawData.headers.get('file-size');
      const partSize = rawData.headers.get('part-size');
      if (!fileSize || !partSize) {
        console.log(`downloadFileChunk error`, rawData);
        return null;
      }
      return {
        fileSize: parseInt(fileSize, 10),
        partSize: parseInt(partSize, 10),
        arrayBuffer: await rawData.arrayBuffer(),
      };
    } catch (error) {
      console.log(`downloadFileChunk error, try: ${tryCount}`, error);
    }
    tryCount++;
    if (retryMessage) {
      NotificationMessage.sendMessage(
        retryMessage.replace('${tryCount}', tryCount.toString()),
        NotificationColor.Warning
      );
    }
  }
  return null;
};

export interface DownloadFileProps {
  fileSize: number;
  partSize: number;
  arrayBuffer: ArrayBuffer;
}

/*
A sample for text result:
const decoder = new TextDecoder('utf-8');
    const chunks: string[] = [];
    let downloadSize = 0;
    const processResponse = (result: DownloadFileProps) => {
      if (!result || result.fileSize <= 0 || result.partSize < 0) {
        NotificationMessage.sendMessage('加载数据失败', NotificationColor.Error);
        return false;
      }
      const fileSize = result.fileSize;
      downloadSize += result.partSize;
      progressUpdate?.onProgress?.(Math.round((downloadSize / fileSize) * 100) / 100, downloadSize, fileSize);
      chunks.push(decoder.decode(result.arrayBuffer));
      return true;
};
*/

export const downloadFile = async (
  downloadUrl: string,
  processResponse: (result: DownloadFileProps) => boolean | undefined, // true: success, false: failed, undefined: continue
  chunkSize = 0,
  retryCount = 3,
  retryMessage = 'Downloading failed, try: ${tryCount}' // can have ${tryCount}
) => {
  if (chunkSize < 1) {
    chunkSize = _saveChunkSize.downloadSize;
  }
  let downloadSize = 0;
  let expectedFileSize: number | null = null;
  while (true) {
    const start = downloadSize;
    const length = chunkSize;
    const downloadResult = await downloadFileChunk(downloadUrl, start, length, retryCount, retryMessage);
    if (!downloadResult) {
      return false;
    }
    if (expectedFileSize === null) {
      expectedFileSize = downloadResult.fileSize;
    }
    downloadSize += downloadResult.partSize;
    // console.log(`downloadSize: ${downloadSize}, downloadFileChunk:`, downloadResult);
    const result = processResponse(downloadResult);
    if (result !== undefined) {
      // success or failed
      return result;
    }
    if (downloadSize >= expectedFileSize) {
      break;
    }
  }
  return true;
};
