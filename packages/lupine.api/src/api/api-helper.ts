import { ServerResponse } from 'http';
import { ServerRequest } from '../models/locals-props';
import { JsonObject } from '../models/json-object';
import fs from 'fs';

export class ApiHelper {
  static sendJson(
    req: ServerRequest,
    res: ServerResponse,
    json: JsonObject,
    statusCode = 200,
    headers?: { [key: string]: string }
  ) {
    res.writeHead(statusCode, Object.assign({ 'Content-Type': 'application/json' }, headers));
    res.write(JSON.stringify(json));
    res.end();
    return true;
  }

  static sendHtml(
    req: ServerRequest,
    res: ServerResponse,
    html: string,
    statusCode = 200,
    headers?: { [key: string]: string }
  ) {
    res.writeHead(statusCode, Object.assign({ 'Content-Type': 'text/html' }, headers));
    res.write(html);
    res.end();
    return true;
  }

  static sendFile(
    req: ServerRequest,
    res: ServerResponse,
    filepath: string,
    statusCode = 200,
    headers?: { [key: string]: string }
  ) {
    const stream = fs.createReadStream(filepath);
    stream.on('open', () => {
      if (!res.headersSent) {
        res.writeHead(statusCode, Object.assign({ 'Content-Type': 'application/octet-stream' }, headers));
      }
      stream.pipe(res);
    });
    stream.on('error', (err: any) => {
      // File missing or access denied
      if (!res.headersSent) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('File not found or access denied');
      } else {
        res.end(); // Fallback if stream broke mid-transmit
      }
    });
    return true;
  }
}
