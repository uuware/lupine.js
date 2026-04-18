import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';
import * as tls from 'tls';
import { IncomingMessage, ServerResponse } from 'http';
import { Duplex } from 'stream';
import { ServerOptions } from 'https';
import cluster from 'cluster';
import { Logger } from '../lib/logger';
import { WebListener } from './web-listener';
import { WebProcessor } from './web-processor';
import { helmetMiddleware } from './middlewares/helmet';
import { corsMiddleware } from './middlewares/cors';

const logger = new Logger('web-server');

export class WebServer {
  webListener: WebListener;
  private httpsServer: https.Server | undefined;
  private httpsServerConfig: {
    sslKeyPath?: string;
    sslCrtPath?: string;
    domainCerts?: Record<string, { key: string; cert: string }>;
  } = {};
  private secureContexts: Record<string, tls.SecureContext> = {};
  private upgradeHandlers: { path: string; handler: (req: IncomingMessage, socket: Duplex, head: Buffer) => void }[] =
    [];

  constructor(webListener?: WebListener) {
    this.webListener = webListener || new WebListener(new WebProcessor());
    // Auto-inject default security and CORS gateways for Native Server
    this.webListener.addMiddlewareChain(helmetMiddleware);
    this.webListener.addMiddlewareChain(corsMiddleware);
  }

  onUpgrade(path: string, handler: (req: IncomingMessage, socket: Duplex, head: Buffer) => void) {
    this.upgradeHandlers.push({ path, handler });
  }

  handleUpgrade(req: IncomingMessage, socket: Duplex, head: Buffer) {
    const clientIp = `${(socket as any).remoteAddress}:${(socket as any).remotePort}`;
    let matched = false;
    for (const item of this.upgradeHandlers) {
      if (req.url && (item.path === '*' || req.url === item.path || req.url.startsWith(item.path + '/'))) {
        logger.debug(`Upgrade WebSocket access: ${req.url} from ${clientIp} matched ${item.path}.`);
        item.handler(req, socket, head);
        matched = true;
        break;
      }
    }
    if (!matched) {
      logger.debug(`Unexpected web socket access: ${req.url} from ${clientIp}`);
      if (!socket.destroyed) socket.destroy();
    }
  }

  async listenerWrap(reqOrigin: IncomingMessage, res: ServerResponse) {
    try {
      await this.webListener.listener.bind(this.webListener)(reqOrigin, res);
    } catch (err) {
      console.error('Request error:', err);
      if (!res.headersSent && !res.destroyed && res.writable) {
        res.statusCode = 500;
        res.end('Internal Server Error');
      }
    }
  }

  startHttp(httpPort: number, bindIp?: string, timeout?: number) {
    const httpServer = http.createServer(this.listenerWrap.bind(this));
    if (typeof timeout === 'number') httpServer.setTimeout(timeout);

    httpServer.on('upgrade', this.handleUpgrade.bind(this));

    httpServer.listen(httpPort, bindIp, () => {
      logger.info(`Http Server ${cluster.worker ? cluster.worker.id : -1} is started: http://localhost:${httpPort}`);
    });
    httpServer.on('error', (error: any) => {
      logger.error('Error occurred on http server', error);
    });
    return httpServer;
  }

  // multi domain https hosting
  // https://stackoverflow.com/questions/38162077/expressjs-multi-domain-https-hosting

  // domainCerts = {
  //   'example.com': {
  //     key: fs.readFileSync(sslKeyPath, 'utf8'),
  //     cert: fs.readFileSync(sslCrtPath, 'utf8'),
  //   },
  // };
  reloadCertificates() {
    const { sslKeyPath, sslCrtPath, domainCerts } = this.httpsServerConfig;

    // 1. Reload default context
    if (this.httpsServer && sslKeyPath && fs.existsSync(sslKeyPath) && sslCrtPath && fs.existsSync(sslCrtPath)) {
      try {
        const key = fs.readFileSync(sslKeyPath, 'utf8');
        const cert = fs.readFileSync(sslCrtPath, 'utf8');
        this.httpsServer.setSecureContext({ key, cert });
        logger.info('Reloaded default SSL certificate manually via hot context rendering.');
      } catch (err) {
        logger.error('Failed to reload default certificate', err as any);
      }
    }

    // 2. Reload domain SNI Contexts
    if (domainCerts) {
      const start = Date.now();
      let certCount = 0;
      const fileCache = new Map<string, string>();

      const getFileContent = (path: string) => {
        if (!fileCache.has(path)) {
          fileCache.set(path, fs.readFileSync(path, 'utf8'));
        }
        return fileCache.get(path)!;
      };

      const newSecureContexts: Record<string, tls.SecureContext> = {};
      for (const [domain, paths] of Object.entries(domainCerts)) {
        if (paths.key && paths.cert && fs.existsSync(paths.key) && fs.existsSync(paths.cert)) {
          try {
            const key = getFileContent(paths.key);
            const cert = getFileContent(paths.cert);
            newSecureContexts[domain] = tls.createSecureContext({ key, cert });
            certCount++;
          } catch (err) {
            logger.error(`Failed to load cert for ${domain}`, err as any);
          }
        }
      }
      this.secureContexts = newSecureContexts;
      logger.info(`Loaded ${certCount} domain scopes into thermal TLS cache in ${Date.now() - start}ms`);
    } else {
      this.secureContexts = {};
    }
  }

  startHttps(
    httpsPort: number,
    bindIp?: string,
    sslKeyPath?: string,
    sslCrtPath?: string,
    domainCerts?: Record<string, { key: string; cert: string }>,
    timeout?: number
  ) {
    this.httpsServerConfig = { sslKeyPath, sslCrtPath, domainCerts };
    const httpsOptions: ServerOptions = {};

    if (sslKeyPath && fs.existsSync(sslKeyPath) && sslCrtPath && fs.existsSync(sslCrtPath)) {
      logger.info('Load site ssl certificate.');
      // The options to https.createServer must include key and cert as they are required.
      // Even though that set won't be used if SNI provides a hostname.
      httpsOptions['key'] = fs.readFileSync(sslKeyPath, 'utf8');
      httpsOptions['cert'] = fs.readFileSync(sslCrtPath, 'utf8');

      httpsOptions.SNICallback = (domain, cb) => {
        let ctx: tls.SecureContext | undefined = this.secureContexts[domain];
        if (!ctx) {
          // find the closest domain
          const parts = domain.split('.');
          while (parts.length > 0 && !ctx) {
            parts.shift();
            const parent = parts.join('.');
            if (parent) ctx = this.secureContexts[parent];
          }
        }
        // Fallback or exact
        if (ctx) {
          cb(null, ctx);
        } else {
          // Fallback to default (options.key/cert)
          cb(null, undefined);
        }
      };
    } else {
      logger.warn(
        `Ssl certificate is not defined or doesn't exist, key file: ${sslKeyPath}, certificate file: ${sslCrtPath}`
      );
    }

    const httpsServer = https.createServer(httpsOptions, this.listenerWrap.bind(this));
    this.httpsServer = httpsServer;

    // Auto-populate multidomain SNI certs initially
    this.reloadCertificates();

    httpsServer.on('upgrade', this.handleUpgrade.bind(this));

    if (typeof timeout === 'number') {
      httpsServer.setTimeout(timeout);
    }
    httpsServer.listen(httpsPort, bindIp, () => {
      logger.info(`Https Server ${cluster.worker ? cluster.worker.id : -1} is started: https://localhost:${httpsPort}`);
    });
    httpsServer.on('error', (error: any) => {
      logger.error('Error occurred on https server', error);
    });

    return httpsServer;
  }
}
