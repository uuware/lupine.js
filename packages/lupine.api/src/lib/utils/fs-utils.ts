import { Dirent } from 'fs';
import * as fs from 'fs/promises';
import path from 'path';

const FILE_WRITE_RETRY_COUNT = 5;
const FILE_WRITE_RETRY_DELAY_MS = 120;
const uploadFileLocks = new Map<string, Promise<void>>();

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export type FileInfoProps = {
  size: number;
  mtime: number;
  isFile: boolean;
  isDir: boolean;
};
export class FsUtils {
  private static isRetriableFsError = (error: any) => {
    return !error?.code || ['UNKNOWN', 'EBUSY', 'EPERM', 'EACCES', 'ENOENT'].includes(error.code);
  };

  static retryFsOperation = async <T>(
    operationName: string,
    targetPath: string,
    operation: () => Promise<T>,
    retryCount = FILE_WRITE_RETRY_COUNT,
    retryDelayMs = FILE_WRITE_RETRY_DELAY_MS
  ): Promise<T> => {
    let lastError: any;
    for (let i = 0; i < retryCount; i++) {
      try {
        const result = await operation();
        if (result === false) {
          throw new Error(`${operationName} returned false: ${targetPath}`);
        }
        return result;
      } catch (error: any) {
        lastError = error;
        if (!this.isRetriableFsError(error) || i === retryCount - 1) {
          break;
        }
        console.warn(
          `${operationName} failed, retry ${i + 1}/${retryCount - 1}: ${targetPath}, ${error?.code || ''} ${
            error?.message || error
          }`
        );
        await sleep(retryDelayMs * (i + 1));
      }
    }
    throw lastError;
  };

  private static withFileLock = async <T>(lockKey: string, action: () => Promise<T>): Promise<T> => {
    const previous = uploadFileLocks.get(lockKey) || Promise.resolve();
    let releaseLock: () => void = () => undefined;
    const current = new Promise<void>((resolve) => {
      releaseLock = resolve;
    });
    uploadFileLocks.set(lockKey, previous.then(() => current, () => current));

    try {
      await previous.catch(() => undefined);
      return await action();
    } finally {
      releaseLock();
      if (uploadFileLocks.get(lockKey) === current) {
        uploadFileLocks.delete(lockKey);
      }
    }
  };

  static writeUploadChunk = async (
    fileFullPath: string,
    data: Buffer | string,
    chunkNumber: number,
    totalChunks: number
  ) => {
    const tempPath = `${fileFullPath}.uploading`;
    await this.withFileLock(fileFullPath, async () => {
      if (chunkNumber === 0) {
        await this.retryFsOperation('write upload temp file', tempPath, () => fs.writeFile(tempPath, data, 'binary'));
      } else {
        await this.retryFsOperation('append upload temp file', tempPath, () => fs.appendFile(tempPath, data, 'binary'));
      }

      if (chunkNumber !== totalChunks - 1) {
        return;
      }

      await this.retryFsOperation('remove old upload target', fileFullPath, async () => {
        try {
          await fs.unlink(fileFullPath);
        } catch (error: any) {
          if (error?.code !== 'ENOENT') {
            throw error;
          }
        }
      });
      await this.retryFsOperation('publish upload file', fileFullPath, () => fs.rename(tempPath, fileFullPath));
    });
  };

  static readFile = async (filePath: string): Promise<string | undefined> => {
    try {
      const text = await fs.readFile(filePath, 'utf-8');
      return text;
    } catch (e) {
      console.log('writeFile failed', e);
      return undefined;
    }
  };

  static fileInfo = async (filePath: string): Promise<FileInfoProps | undefined> => {
    try {
      const stats = await fs.stat(filePath);
      return { size: stats.size, mtime: stats.mtime.getTime(), isFile: stats.isFile(), isDir: stats.isDirectory() };
    } catch {
      return undefined;
    }
  };

  static writeFile = async (
    filePath: string,
    content:
      | string
      | NodeJS.ArrayBufferView
      | Iterable<string | NodeJS.ArrayBufferView>
      | AsyncIterable<string | NodeJS.ArrayBufferView>
  ): Promise<boolean> => {
    try {
      await fs.writeFile(filePath, content, 'utf-8');
      return true;
    } catch (e) {
      console.log('writeFile failed', e);
      return false;
    }
  };

  static appendFile = async (filePath: string, content: string | Uint8Array): Promise<boolean> => {
    try {
      await fs.appendFile(filePath, content, 'utf-8');
      return true;
    } catch (e) {
      console.log('appendFile failed', e);
      return false;
    }
  };

  static pathExist = async (filePath: string) => {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  };

  static mkdir = async (dirPath: string) => {
    try {
      await fs.mkdir(dirPath, { recursive: true });
      return true;
    } catch {
      return false;
    }
  };

  static unlinkFile = async (filePath: string) => {
    try {
      await fs.unlink(filePath);
      return true;
    } catch {
      return false;
    }
  };

  static unlinkFolderEmpty = async (filePath: string) => {
    try {
      await fs.rmdir(filePath);
      return true;
    } catch {
      return false;
    }
  };

  static unlinkFolderForce = async (filePath: string, recursive: boolean, force: boolean) => {
    try {
      await fs.rm(filePath, { recursive: recursive, force: force });
      return true;
    } catch {
      return false;
    }
  };

  static rename = async (filePath: string, newPath: string) => {
    try {
      await fs.rename(filePath, newPath);
      return true;
    } catch {
      return false;
    }
  };

  static getDirAndFiles = async (dirPath: string): Promise<string[]> => {
    try {
      const files = await fs.readdir(dirPath, { recursive: false });
      return files;
    } catch {
      return [];
    }
  };

  // return with fullpath list of Dirent
  static getDirentFullpath = async (dirPath: string, maxDepth = 1): Promise<Dirent[]> => {
    return this.getDirentFullpathDepthSub(dirPath, 0, maxDepth);
  };
  private static getDirentFullpathDepthSub = async (dirPath: string, depth = 0, maxDepth = 1): Promise<Dirent[]> => {
    try {
      const ret = [];
      const files = await fs.readdir(dirPath, {
        recursive: false,
        withFileTypes: true,
      });
      ret.push(...files);
      if (depth + 1 < maxDepth) {
        for (const entry of files) {
          if (entry.isDirectory()) {
            const fullPath = path.join(dirPath, entry.name);
            ret.push(...(await this.getDirentFullpathDepthSub(fullPath, depth + 1, maxDepth)));
          }
        }
      }
      return ret;
    } catch {
      return [];
    }
  };

  static async readPartOfFile(path: string, start: number, length: number) {
    try {
      const fileHandle = await fs.open(path, 'r');
      const buffer = Buffer.alloc(length);
      const { bytesRead } = await fileHandle.read(buffer, 0, length, start);
      await fileHandle.close();
      return buffer.slice(0, bytesRead);
    } catch {
      return null;
    }
  }
}
