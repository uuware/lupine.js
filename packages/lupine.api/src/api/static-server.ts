// const request = require('request');
import * as fs from 'fs';
import * as path from 'path';
import { ServerResponse } from 'http';
import { Logger } from '../lib';
import { ServerRequest } from '../models/locals-props';
import { handler200, handler500 } from '../shared/handle-status';
import { serverSideRenderPage } from './server-render';
import { apiCache } from './api-cache';
import { defaultSSOptions, serveStaticFileStream } from './static-server-helper';

export class StaticServer {
  logger = new Logger('StaticServer');

  private async sendFile(req: ServerRequest, res: ServerResponse, realPath: string, requestPath: string, contentType?: string) {
    return serveStaticFileStream(req, res, realPath, requestPath, defaultSSOptions, contentType, this.logger);
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
