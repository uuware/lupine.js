import { ServerResponse } from 'http';
import { ServerRequest } from '../models/locals-props';
import { JsonObject } from '../models/json-object';
import zlib from 'zlib';
import { serveStaticFileStream } from './static-server-helper';

let ENABLE_RESPONSE_GZIP = false;
export const setEnableResponseGzip = (enable: boolean) => {
  ENABLE_RESPONSE_GZIP = enable;
};
export const getEnableResponseGzip = () => {
  return ENABLE_RESPONSE_GZIP;
};

export class ApiHelper {
  private static sendWithGzipFallback(
    req: ServerRequest,
    res: ServerResponse,
    statusCode: number,
    contentType: string,
    payload: string | Buffer,
    headers?: { [key: string]: string }
  ) {
    const enableGzip = getEnableResponseGzip();
    const acceptEncoding = typeof req.headers['accept-encoding'] === 'string' ? req.headers['accept-encoding'] : '';
    const shouldGzip = enableGzip && acceptEncoding.includes('gzip') && payload.length > 512;

    if (shouldGzip) {
      zlib.gzip(payload, (err, buffer) => {
        if (res.headersSent) return;
        if (err || !buffer) {
          res.writeHead(statusCode, Object.assign({ 'Content-Type': contentType }, headers));
          res.write(payload);
          res.end();
        } else {
          res.writeHead(
            statusCode,
            Object.assign({ 'Content-Type': contentType, 'Content-Encoding': 'gzip' }, headers)
          );
          res.write(buffer);
          res.end();
        }
      });
    } else {
      if (res.headersSent) return;
      res.writeHead(statusCode, Object.assign({ 'Content-Type': contentType }, headers));
      res.write(payload);
      res.end();
    }
  }

  static sendJson(
    req: ServerRequest,
    res: ServerResponse,
    json: JsonObject,
    statusCode = 200,
    headers?: { [key: string]: string }
  ) {
    this.sendWithGzipFallback(req, res, statusCode, 'application/json', JSON.stringify(json), headers);
    return true;
  }

  static sendHtml(
    req: ServerRequest,
    res: ServerResponse,
    html: string,
    statusCode = 200,
    headers?: { [key: string]: string }
  ) {
    this.sendWithGzipFallback(req, res, statusCode, 'text/html', html, headers);
    return true;
  }

  static async sendFile(req: ServerRequest, res: ServerResponse, filepath: string, contentType?: string) {
    await serveStaticFileStream(
      req,
      res,
      filepath,
      filepath,
      {
        maxAge: 86400, // 1 day, then revalidate via ETag
        setHeaders: (response, _path, _stat) => {
          response.setHeader('Access-Control-Allow-Origin', '*');
        },
      },
      contentType
    );

    return true;
  }

  static async sendVideo(req: ServerRequest, res: ServerResponse, filepath: string) {
    await serveStaticFileStream(req, res, filepath, filepath, {
      maxAge: 86400, // 1 day, then revalidate via ETag
      setHeaders: (response, _path, _stat) => {
        response.setHeader('Access-Control-Allow-Origin', '*');
      },
    });

    return true;
  }
}
