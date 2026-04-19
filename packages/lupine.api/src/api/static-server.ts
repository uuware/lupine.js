// const request = require('request');
import * as fs from 'fs';
import * as path from 'path';
import { ServerResponse } from 'http';
import { Logger } from '../lib';
import { ServerRequest } from '../models/locals-props';
import { handler200, handler404, handler500 } from '../shared/handle-status';
import { serverSideRenderPage } from './server-render';
import { serverContentType } from './server-content-type';
import { apiCache } from './api-cache';

export interface StaticServerOptions {
  // Can be a global max-age (in seconds), or a map of extensions to max-age.
  maxAge?: number | Record<string, number>;
  etag?: boolean;
  lastModified?: boolean;
  setHeaders?: (res: ServerResponse, path: string, stat: fs.Stats) => void;
}

const defaultSSOptions: StaticServerOptions = {
  maxAge: {
    html: 0,
    htm: 0,
    json: 0,
    js: 31536000, // 365 days (1 year)
    css: 31536000, // 365 days (1 year)
    woff: 31536000, // 365 days (1 year)
    woff2: 31536000, // 365 days (1 year)
    ttf: 31536000, // 365 days (1 year)
    eot: 31536000, // 365 days (1 year)
    default: 604800, // 7 days (1 week)
  },
  etag: true,
  lastModified: true,
};
export const bindStaticServerOptions = (options?: Partial<StaticServerOptions>) => {
  if (options?.maxAge) {
    if (typeof options.maxAge === 'number') {
      defaultSSOptions.maxAge = options.maxAge;
    } else {
      defaultSSOptions.maxAge = {
        ...(typeof defaultSSOptions.maxAge === 'object' ? defaultSSOptions.maxAge : {}),
        ...options.maxAge,
      };
    }
  }
  if (options?.etag !== undefined) {
    defaultSSOptions.etag = options.etag;
  }
  if (options?.lastModified !== undefined) {
    defaultSSOptions.lastModified = options.lastModified;
  }
  if (options?.setHeaders) {
    defaultSSOptions.setHeaders = options.setHeaders;
  }
};

/**
 * A highly reusable core function to serve file streams handling HTTP 206, Cache-Control, ETag and 304 logic.
 * Extracting this allows developers to serve arbitrary files on their own logic with production-ready heuristics.
 */
export async function serveStaticFileStream(
  req: ServerRequest,
  res: ServerResponse,
  realPath: string,
  requestPath: string,
  options: StaticServerOptions = defaultSSOptions,
  logger?: Logger
) {
  try {
    const stat = await fs.promises.stat(realPath);
    // 1. Generate ETag and Last-Modified
    const mtime = stat.mtime;
    const size = stat.size;
    const etag = `W/"${size.toString(16)}-${mtime.getTime().toString(16)}"`;
    const lastModified = mtime.toUTCString();

    // 2. Validate Conditional Requests (304 Not Modified)
    if (options.etag && req.headers['if-none-match'] === etag) {
      res.writeHead(304);
      res.end();
      return true;
    }
    if (options.lastModified && req.headers['if-modified-since'] === lastModified) {
      res.writeHead(304);
      res.end();
      return true;
    }

    // 3. Determine Content-Type and Cache-Control
    let ext = path.extname(realPath);
    ext = ext ? ext.slice(1).toLowerCase() : 'unknown';
    const contentType = serverContentType[ext] || 'application/octet-stream';

    // Evaluate smart max-age
    let computedMaxAge = 31536000;
    if (typeof options.maxAge === 'number') {
      computedMaxAge = options.maxAge;
    } else if (options.maxAge) {
      computedMaxAge = typeof options.maxAge[ext] === 'number' ? options.maxAge[ext] : options.maxAge['default'] ?? 0;
    }

    let cacheControl = '';
    if (computedMaxAge <= 0 || ['html', 'htm', 'json'].includes(ext)) {
      cacheControl = 'no-cache, no-store, must-revalidate';
    } else {
      cacheControl = 'public, max-age=' + computedMaxAge;
    }

    res.setHeader('Content-Type', contentType + '; charset=UTF-8');
    res.setHeader('Cache-Control', cacheControl);
    if (options.etag) res.setHeader('ETag', etag);
    if (options.lastModified) res.setHeader('Last-Modified', lastModified);

    // Let developers easily override these via custom hook
    if (options.setHeaders) {
      options.setHeaders(res, requestPath, stat);
    }

    // 4. Handle HTTP Range Requests (206) for Media Files
    let start = 0;
    let end = size - 1;
    const rangeHeader = req.headers.range;

    if (rangeHeader) {
      const parts = rangeHeader.replace(/bytes=/, '').split('-');
      const parsedStart = parseInt(parts[0], 10);
      const parsedEnd = parts[1] ? parseInt(parts[1], 10) : end;

      if (!isNaN(parsedStart)) {
        start = parsedStart;
      }
      if (!isNaN(parsedEnd)) {
        end = parsedEnd;
      }

      if (start > end || start >= size) {
        res.setHeader('Content-Range', `bytes */${size}`);
        res.statusCode = 416;
        res.end();
        return true;
      }

      const chunksize = end - start + 1;
      res.setHeader('Content-Range', `bytes ${start}-${end}/${size}`);
      res.setHeader('Accept-Ranges', 'bytes');
      res.setHeader('Content-Length', chunksize);
      res.statusCode = 206;
    } else {
      res.setHeader('Content-Length', size);
      res.statusCode = 200;
    }

    const fileStream = fs.createReadStream(realPath, { start, end });
    fileStream.on('error', (error) => {
      logger?.warn(`File stream read error: ${realPath}`);
      handler404(res);
      return true;
    });

    fileStream.pipe(res);

    return true;
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      logger?.warn(`File not found: ${realPath}`);
      handler200(res, `File not found: ${requestPath}`);
    } else {
      logger?.error(`Error for: ${realPath}`, err);
      handler200(res, 'Service failed: ' + err.message);
    }
    return true;
  }
}

export class StaticServer {
  logger = new Logger('StaticServer');

  private async sendFile(req: ServerRequest, res: ServerResponse, realPath: string, requestPath: string) {
    return serveStaticFileStream(req, res, realPath, requestPath, defaultSSOptions, this.logger);
  }

  async processRequest(req: ServerRequest, res: ServerResponse, rootUrl?: string) {
    this.logger.info(`StaticServer, url: ${req.locals.url}, host: ${req.locals.host}, rootUrl: ${rootUrl}`);

    const hostPath = apiCache.getAsyncStore().hostPath;
    const urlSplit = (rootUrl || req.locals.urlWithoutQuery).split('?');
    const triggerSSR = () => {
      serverSideRenderPage(hostPath.appName, hostPath.webPath, urlSplit[0], urlSplit[1], req, res);
      return true;
    };

    const isFileSafe = async (p: string) => {
      try {
        return (await fs.promises.lstat(p)).isFile();
      } catch {
        return false;
      }
    };

    const resolveSafePath = async (webPath: string, rawUrl: string) => {
      let decodedPath: string;
      try {
        decodedPath = decodeURIComponent(rawUrl);
      } catch {
        return null; // Malformed URI
      }

      if (decodedPath.includes('\0')) return null;

      const targetPath = path.join(webPath, decodedPath);
      const webPathWithSep = webPath.endsWith(path.sep) ? webPath : webPath + path.sep;

      // 1. FAST MEMORY CHECK: Prevent OOM/DOS by stripping 99.9% of attacks in O(1) time
      if (!targetPath.startsWith(webPathWithSep) && targetPath !== webPath) {
        return null;
      }

      // 2. ABSOLUTE OS CHECK: Prevent Symlink attacks (Zip Slip mapping files to /etc/passwd)
      // We MUST use realpath to evaluate the true inode path. `path.join` alone is computationally
      // blind to symbolic links that malicious users might upload into the web root.
      // NOTE: We do not try/catch realpath here! The outer caller explicitly expects
      // the ENOENT exception to trigger Server Side Rendering logic for missing static files.
      const realTargetPath = await fs.promises.realpath(targetPath);

      if (!realTargetPath.startsWith(webPathWithSep) && realTargetPath !== webPath) {
        return null; // Symlink attack! Deny
      }

      return realTargetPath;
    };

    try {
      if (urlSplit[0] === '/' || urlSplit[0] === '/index.html') {
        return triggerSSR();
      }

      const realPath = await resolveSafePath(hostPath.webPath, urlSplit[0]);
      if (!realPath) {
        this.logger.warn(`ACCESS DENIED or Malformed URI: ${urlSplit[0]}`);
        handler200(res, `ACCESS DENIED: ${urlSplit[0]}`);
        return true;
      }

      // console.log(`${process.pid} - request: ${realPath}`);

      let finalPath = '';
      if ((await fs.promises.lstat(realPath)).isDirectory()) {
        if (await isFileSafe(path.join(realPath, 'index.js'))) {
          // because it's directory, it means index.html, and if it has index.js, it will trigger SSR
          return triggerSSR();
        }
        // if index.js doesn't exist, but user explicitly wants it to go to SSR when it is a directory:
        // (If you ever want to serve index.html statically, uncomment the next line and remove triggerSSR)
        // finalPath = path.join(realPath, 'index.html');
        return triggerSSR();
      } else {
        // it's a file, and if it's index.html and the same directory has index.js, it will trigger SSR
        if (realPath.endsWith('/index.html') && (await isFileSafe(path.join(path.dirname(realPath), 'index.js')))) {
          return triggerSSR();
        }
        finalPath = realPath;
      }

      // now we need to send finalPath file. If finalPath doesn't exist, it will cause error and jump to serverSideRenderPage
      try {
        res.setHeader('Access-Control-Allow-Origin', '*');
        await this.sendFile(req, res, finalPath, urlSplit[0]);
      } catch (err: any) {
        this.logger.warn(`File not found: ${urlSplit[0]}`);
        handler200(res, `File not found: ${urlSplit[0]}`);
      }
      return true;
    } catch (err: any) {
      // file doesn't exist
      if (err.code === 'ENOENT') {
        serverSideRenderPage(hostPath.appName, hostPath.webPath, urlSplit[0], urlSplit[1], req, res);
      } else {
        this.logger.error(`Error for: ${urlSplit[0]}`, err);
        handler500(res, `processRequest error: ${err.message}`);
      }
      return true;
    }
  }
}
