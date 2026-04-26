import { IncomingMessage, ServerResponse } from 'http';
import { Logger } from '../lib/logger';
import crypto from 'crypto';
import { parseCookies } from '../lib/utils/cookie-util';
import { WebProcessor } from './web-processor';
import { handler403, handler404, handler500, handler503, SimpleStorage } from '../shared';
import { JsonObject, AsyncStorageProps, ServerRequest, SetCookieProps } from '../models';
import { HostToPath } from './host-to-path';
import { parseFormData } from '../lib/utils/form-data-parser';
import { serializeCookie } from '../lib/utils/cookie-util';

const logger = new Logger('listener');

export const parseJsonBody = (req: ServerRequest, logWriter: Logger): JsonObject | undefined => {
  if (!req.locals._json && req.locals.body) {
    const sBody = req.locals.body.toString();
    if (!sBody) {
      req.locals._json = undefined;
    } else {
      try {
        req.locals._json = JSON.parse(sBody);
      } catch (err: any) {
        logWriter.warn(`JSON.parse error: ${err.message}`);
      }
    }
  }
  return req.locals._json;
};

export const applySetCookie = (req: ServerRequest, res: ServerResponse, name: string, value: string, options: SetCookieProps): void => {
  const cookies: string[] = [];
  const cookiesOld = res.getHeader('Set-Cookie');
  if (cookiesOld) {
    if (!Array.isArray(cookiesOld)) {
      cookies.push(cookiesOld as any);
    } else {
      cookies.push(...cookiesOld);
    }
  }

  const cookiePair = serializeCookie(name, value, options);
  cookies.push(cookiePair);
  res.setHeader('Set-Cookie', cookies);

  const localCookies = req.locals.cookies();
  localCookies.set(name, value);
};

export const getCookiesStorage = (req: ServerRequest): SimpleStorage => {
  if (!req.locals._cookies) {
    req.locals._cookies = new SimpleStorage(req.headers ? parseCookies(req.headers.cookie) : {});
  }
  return req.locals._cookies;
};

let MAX_REQUEST_SIZE = 1024 * 1024 * 5;
export const setMaxRequestSize = (size: number) => {
  MAX_REQUEST_SIZE = size;
};

// The maximum number of requests being processed. If there are no requests for 10 minutes, this number will be reset to 0.
let MAX_REQUEST_COUNT = 100;
let REQUEST_COUNT = 0;
export const setMaxRequestCount = (count: number) => {
  MAX_REQUEST_COUNT = count;
};
export const getRequestCount = () => {
  return REQUEST_COUNT;
};

let REQUEST_TIMEOUT = 1000 * 30;
export const setRequestTimeout = (timeout: number) => {
  REQUEST_TIMEOUT = timeout;
};



let SERVER_NAME: string = 'nginx/1.19.2';
export const setServerName = (serverName: string) => {
  SERVER_NAME = serverName;
};

export type ServerMiddleware = (req: ServerRequest, res: ServerResponse, next: () => Promise<void>) => Promise<void>;

let lastRequestTime = new Date().getTime();

// type ProcessRequest = (req: ServerRequest, res: ServerResponse) => void;
export class WebListener {
  // process requests before business logic, for example IP filter, rate limit, etc.
  middlewares: ServerMiddleware[];
  processor: WebProcessor;

  constructor(processRequest: WebProcessor) {
    this.middlewares = [];
    this.processor = processRequest;
  }

  addMiddlewareChain(middleware: ServerMiddleware) {
    this.middlewares.push(middleware);
  }

  runMiddlewareChain(list: ServerMiddleware[], context: { req: ServerRequest; res: ServerResponse }) {
    const dispatch = async (i: number) => {
      const fn = list[i];
      if (!fn) return;
      await fn(context.req, context.res, () => dispatch(i + 1));
    };
    return dispatch(0);
  }

  async listener(reqOrigin: IncomingMessage, res: ServerResponse) {
    const now = Date.now();
    // 1. If there is no request in the last 10 minutes, reset the request count back to 0
    if (now - lastRequestTime > 1000 * 60 * 10) {
      if (REQUEST_COUNT !== 0) {
        // in case any errors skipped (--REQUEST_COUNT)
        logger.warn(`!!!!!!!!!! ========== REQUEST_COUNT is not counted properly: ${REQUEST_COUNT}`);
      }
      REQUEST_COUNT = 0;
    }
    // 2. Continually advance the clock marker on hitting activity
    lastRequestTime = now;

    // 3. Imposed back-pressure BEFORE async operations (Middleware Stampede vulnerability Fix)
    REQUEST_COUNT++;
    if (REQUEST_COUNT > MAX_REQUEST_COUNT) {
      REQUEST_COUNT--; // yield back the slot lock
      logger.warn(`Too many requests, count: ${REQUEST_COUNT} > ${MAX_REQUEST_COUNT}`);
      handler503(res, 'Server is busy, please retry later.');
      return;
    }

    // 4. Guarantee Exactly-Once decrement hook 
    let isFinished = false;
    const decrementCount = () => {
      if (!isFinished) {
        isFinished = true;
        REQUEST_COUNT--;
      }
    };
    res.on('finish', decrementCount);
    res.on('close', decrementCount);

    try {
      await this.handleRequestInternal(reqOrigin, res);
    } catch (err: any) {
      logger.error(`Unhandled error inside request initialization: `, err);
      if (!res.headersSent) {
        handler500(res, 'Internal Server Error');
      } else {
        reqOrigin.socket.destroy();
      }
    }
  }

  private async handleRequestInternal(reqOrigin: IncomingMessage, res: ServerResponse) {
    if (res.writableEnded || res.headersSent) {
      return;
    }

    // const requestStart = process.hrtime.bigint();
    const uuid = crypto.randomUUID();
    const url = reqOrigin.url || '';
    const requestInfo = `uuid: ${uuid}, Access url: ${url}`;
    const req = reqOrigin as ServerRequest;

    const host = (req.headers.host || '').split(':')[0]; // req.headers.host contains port
    const hostPath = HostToPath.findHostPath(host);
    if (!hostPath || !hostPath.webPath || !hostPath.appName) {
      const msg = `Web root is not defined properly for host: ${host}.`;
      logger.error(msg);
      handler404(res, msg);
      return;
    }

    // REQUEST_COUNT++; // Removed: Now inherently tracked globally upfront
    logger.debug(
      `Request started. Count: ${REQUEST_COUNT}, Log uuid: ${uuid}, access: ${
        req.headers.host
      }, url: ${url}, time: ${new Date().toISOString()}, from: ${req.socket.remoteAddress}`
    );

    const urlSplit = url.split('?');
    req.setTimeout(REQUEST_TIMEOUT);
    req.on('timeout', () => {
      // REQUEST_COUNT decremented safely via res.on('close') cascading when socket destroys
      logger.warn('timeout');
      req.destroy(new Error('timeout handling'));
    });

    req.locals = {
      uuid,
      host,
      url,
      hostPath,
      // urlSections: urlSplit[0].split('/').filter((i) => !!i),
      query: new URLSearchParams(urlSplit[1] || ''),
      urlWithoutQuery: urlSplit[0],
      urlParameters: new SimpleStorage({}),
      body: undefined,
      json: () => parseJsonBody(req, logger),
      text: async () => {
        return (req.locals.body || Buffer.alloc(0)).toString('utf8');
      },
      formData: async () => {
        if (!req.locals._formData) {
          if (!req.locals.body) throw new Error('Request body is empty');
          req.locals._formData = await parseFormData(req, req.locals.body);
        }
        return req.locals._formData;
      },
      cookies: () => getCookiesStorage(req),
      setCookie: (name: string, value: string, options: SetCookieProps) => applySetCookie(req, res, name, value, options),
      clearCookie: (name: string) => {
        res.setHeader('Set-Cookie', `${name}=; max-age=0`);
      },
    };

    let bigRequest = false;
    let totalLength = 0;
    const bodyData: any[] = [];
    req.on('error', (err: any) => {
      // Decremented safely via res.on('close') cascading through socket
      logger.error(`${requestInfo}, count: ${REQUEST_COUNT}, Request Error: `, err);
      if (!res.headersSent) {
        handler500(res, `listener error: ${err && err.message}`);
      }
    });

    req.on('data', (chunk: any) => {
      totalLength += chunk.length;
      logger.debug(`${requestInfo}, Request data length: ${chunk.length}, total: ${totalLength}`);
      // Limit Request Size
      if (!bigRequest && totalLength < MAX_REQUEST_SIZE) {
        bodyData.push(chunk);
      } else {
        if (!bigRequest) {
          bigRequest = true;
          logger.warn(`Warn, request data is too big: ${totalLength} > ${MAX_REQUEST_SIZE}`);
          
          // Pause reading to block kernel memory overflow unconditionally
          req.pause();
          
          // Send polite 403 gracefully if protocol heads aren't frozen
          if (!res.headersSent) {
            // Advise client that socket is closing via header (Wait for finish hook)
            res.setHeader('Connection', 'close');
            handler403(res, `Request data is too big to process: ${totalLength} bytes`);
            
            // As soon as Node successfully pushes the 403 buffer out to the network card, DESTROY instantly
            res.on('finish', () => {
              if (!req.socket.destroyed) req.socket.destroy();
            });
          } else {
             // If headers are already dispatched, protocol is unrecoverable, assassinate the socket.
             req.socket.destroy();
          }
        }
      }
    });

    req.on('end', async () => {
      try {
        if (bigRequest) {
          return;
        }

        const body = Buffer.concat(bodyData);
        const contentType = req.headers['content-type'];
        logger.debug(`url: ${url}, Request body length: ${body.length}, contentType: ${contentType}`);
        req.locals.body = body;

        res.setHeader('Server', SERVER_NAME);

        const store: AsyncStorageProps = {
          uuid: uuid,
          hostPath: hostPath,
          appName: hostPath.appName,
          locals: req.locals,
          lang: req.locals.cookies().get('lang', 'en') || 'en',
          req: req,
        };

        // Run all Server Middlewares
        await this.runMiddlewareChain(this.middlewares, { req, res });
        if (res.writableEnded || res.headersSent) {
          return;
        }

        await this.processor.processRequest(store, req, res);
      } catch (err: any) {
        logger.error(`Error terminating processRequest loop for url ${url}: `, err);
      }
    });
  }
}

import { ServerControlProxyServer } from './server-control-proxy-server';
ServerControlProxyServer.getRequestCount = getRequestCount;
