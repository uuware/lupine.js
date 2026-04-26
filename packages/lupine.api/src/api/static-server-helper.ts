// const request = require('request');
import * as fs from 'fs';
import * as path from 'path';
import { ServerResponse } from 'http';
import { Logger } from '../lib';
import { ServerRequest } from '../models/locals-props';
import { handler200, handler404 } from '../shared/handle-status';
import { serverContentType } from './server-content-type';

export interface StaticServerOptions {
  // Can be a global max-age (in seconds), or a map of extensions to max-age.
  maxAge?: number | Record<string, number>;
  etag?: boolean;
  lastModified?: boolean;
  setHeaders?: (res: ServerResponse, path: string, stat: fs.Stats) => void;
}

export const defaultSSOptions: StaticServerOptions = {
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
  options?: Partial<StaticServerOptions>,
  contentType?: string,
  logger?: Logger
) {
  const opts: StaticServerOptions = { ...defaultSSOptions, ...options };
  // Deep merge maxAge when both are objects, so partial overrides are additive
  if (typeof defaultSSOptions.maxAge === 'object' && typeof options?.maxAge === 'object') {
    opts.maxAge = { ...defaultSSOptions.maxAge, ...options.maxAge };
  }
  try {
    const stat = await fs.promises.stat(realPath);
    // 1. Generate ETag and Last-Modified
    const mtime = stat.mtime;
    const size = stat.size;
    const etag = `W/"${size.toString(16)}-${mtime.getTime().toString(16)}"`;
    const lastModified = mtime.toUTCString();

    // 2. Validate Conditional Requests (304 Not Modified)
    if (opts.etag && req.headers['if-none-match'] === etag) {
      res.writeHead(304);
      res.end();
      return true;
    }
    if (opts.lastModified && req.headers['if-modified-since'] === lastModified) {
      res.writeHead(304);
      res.end();
      return true;
    }

    // 3. Determine Content-Type and Cache-Control
    let ext = path.extname(realPath);
    ext = ext ? ext.slice(1).toLowerCase() : 'unknown';
    const cType = contentType || serverContentType[ext] || 'application/octet-stream';

    // Evaluate smart max-age
    let computedMaxAge = 31536000;
    if (typeof opts.maxAge === 'number') {
      computedMaxAge = opts.maxAge;
    } else if (opts.maxAge) {
      computedMaxAge = typeof opts.maxAge[ext] === 'number' ? opts.maxAge[ext] : opts.maxAge['default'] ?? 0;
    }

    let cacheControl = '';
    if (computedMaxAge <= 0 || ['html', 'htm', 'json'].includes(ext)) {
      cacheControl = 'no-cache, no-store, must-revalidate';
    } else {
      cacheControl = 'public, max-age=' + computedMaxAge;
    }

    res.setHeader('Content-Type', cType + '; charset=UTF-8');
    res.setHeader('Cache-Control', cacheControl);
    if (opts.etag) res.setHeader('ETag', etag);
    if (opts.lastModified) res.setHeader('Last-Modified', lastModified);

    // Let developers easily override these via custom hook
    if (opts.setHeaders) {
      opts.setHeaders(res, requestPath, stat);
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
