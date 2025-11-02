import { IncomingMessage, ServerResponse } from 'http';
import { Logger } from '../lib/logger';
import crypto from 'crypto';
import { parseCookies } from '../lib/utils/cookie-util';
import { WebProcessor } from './web-processor';
import { handler403, handler404, handler500, handler503, SimpleStorage } from '../api';
import { JsonObject, AsyncStorageProps, ServerRequest, SetCookieProps } from '../models';
import { HostToPath } from './host-to-path';
import { serializeCookie } from '../lib/utils/cookie-util';
const logger = new Logger('listener');

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

let accessControlAllowHosts: string[] = [];
export const setAccessControlAllowHost = (allowHosts: string[]) => {
  accessControlAllowHosts = allowHosts;
};

let SERVER_NAME: string = 'nginx/1.19.2';
export const setServerName = (serverName: string) => {
  SERVER_NAME = serverName;
};

export type RawMiddleware = (req: IncomingMessage, res: ServerResponse, next: () => void) => Promise<void>;

/*
IP limit

let IP_LIMIT_ENABLED = false;
export const setIpLimitEnabled = (enabled: boolean) => {
  IP_LIMIT_ENABLED = enabled;
};

let IP_LIMIT_RATE = 60;
let IP_LIMIT_DURATION = 1000 * 30;
export const setIpLimitRateAndDuration = (rate: number, durationSeconds: number) => {
  IP_LIMIT_RATE = rate;
  IP_LIMIT_DURATION = durationSeconds * 1000;
};


class TTLMap<K, V> extends Map<K, V> {
  set(key: K, value: V): this;
  set(key: K, value: V, ttl: number): this;
  set(key: K, value: V, ttl?: number): this {
    const isNew = !this.has(key);
    super.set(key, value);
    if (isNew && ttl) {
      setTimeout(() => this.delete(key), ttl).unref?.();
    }
    return this;
  }
}
const counts = new TTLMap<string, number>();

function checkFixedWindow(ip: string, limit = IP_LIMIT_RATE) {
  const now = Date.now();
  const key = `${ip}:${Math.floor(now / IP_LIMIT_DURATION)}`;
  const count = (counts.get(key) || 0) + 1;
  counts.set(key, count, IP_LIMIT_DURATION * 2); // key自动过期
  return count > limit;
}

*/

let lastRequestTime = new Date().getTime();

// type ProcessRequest = (req: ServerRequest, res: ServerResponse) => void;
export class WebListener {
  // process requests before business logic, for example IP filter, rate limit, etc.
  rawMiddlewares: RawMiddleware[];
  processor: WebProcessor;

  constructor(processRequest: WebProcessor) {
    this.rawMiddlewares = [];
    this.processor = processRequest;
  }

  addRawMiddlewareChain(middleware: RawMiddleware) {
    this.rawMiddlewares.push(middleware);
  }

  runMiddlewareChain(list: RawMiddleware[], context: { req: IncomingMessage; res: ServerResponse }) {
    const dispatch = async (i: number) => {
      const fn = list[i];
      if (!fn) return;
      await fn(context.req, context.res, () => dispatch(i + 1));
    };
    return dispatch(0);
  }

  async listener(reqOrigin: IncomingMessage, res: ServerResponse) {
    // If there is no request in the last 10 minutes, reset the request count.
    if (new Date().getTime() - lastRequestTime > 1000 * 60 * 10) {
      if (REQUEST_COUNT != 0) {
        // in case any errors skipped (--REQUEST_COUNT)
        logger.warn(`!!!!!!!!!! ========== REQUEST_COUNT is not counted properly: ${REQUEST_COUNT}`);
      }
      REQUEST_COUNT = 0;
      lastRequestTime = new Date().getTime();
    }

    // back-pressure
    if (REQUEST_COUNT > MAX_REQUEST_COUNT) {
      logger.warn(`Too many requests, count: ${REQUEST_COUNT} > ${MAX_REQUEST_COUNT}`);
      handler503(res, 'Server is busy, please retry later.');
      return;
    }

    await this.runMiddlewareChain(this.rawMiddlewares, { req: reqOrigin, res });
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

    REQUEST_COUNT++;
    logger.debug(
      `Request started. Count: ${REQUEST_COUNT}, Log uuid: ${uuid}, access: ${
        req.headers.host
      }, url: ${url}, time: ${new Date().toISOString()}, from: ${req.socket.remoteAddress}`
    );

    const urlSplit = url.split('?');
    req.setTimeout(REQUEST_TIMEOUT);
    req.on('timeout', () => {
      REQUEST_COUNT--;
      logger.warn('timeout');
      req.destroy(new Error('timeout handling'));
    });

    const jsonFn = (): JsonObject | undefined => {
      if (!req.locals._json && req.locals.body) {
        const sBody = req.locals.body.toString();
        if (!sBody) {
          req.locals._json = undefined;
        } else {
          try {
            req.locals._json = JSON.parse(sBody);
          } catch (err: any) {
            logger.warn(`JSON.parse error: ${err.message}`);
          }
        }
      }
      return req.locals._json;
    };
    const cookiesFn = (): SimpleStorage => {
      if (!req.locals._cookies) {
        req.locals._cookies = new SimpleStorage(req.headers ? parseCookies(req.headers.cookie) : {});
      }
      return req.locals._cookies;
    };
    const setCookieFn = (name: string, value: string, options: SetCookieProps): void => {
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
      json: jsonFn,
      cookies: cookiesFn,
      setCookie: setCookieFn,
      clearCookie: (name: string) => {
        res.setHeader('Set-Cookie', `${name}=; max-age=0`);
      },
    };

    let bigRequest = false;
    let totalLength = 0;
    const bodyData: any[] = [];
    req.on('error', (err: any) => {
      REQUEST_COUNT--;
      logger.error(`${requestInfo}, count: ${REQUEST_COUNT}, Request Error: `, err);
      handler500(res, `listener error: ${err && err.message}`);
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
        }
        req.socket.destroy();
      }
    });

    req.on('end', async () => {
      try {
        if (bigRequest) {
          logger.warn(`Request data is too big to process, url: ${req.locals.url}`);
          handler403(res, `Request data is too big to process, url: ${req.locals.url}`);
          return;
        }

        const body = Buffer.concat(bodyData);
        const contentType = req.headers['content-type'];
        logger.debug(`url: ${url}, Request body length: ${body.length}, contentType: ${contentType}`);
        req.locals.body = body;

        res.setHeader('Server', SERVER_NAME);
        if (accessControlAllowHosts.includes(host)) {
          const allowOrigin = req.headers.origin && req.headers.origin !== 'null' ? req.headers.origin : '*';
          res.setHeader('Access-Control-Allow-Origin', allowOrigin);
          res.setHeader('Access-Control-Allow-Credentials', 'true');
        }

        const store: AsyncStorageProps = {
          uuid: uuid,
          hostPath: hostPath,
          appName: hostPath.appName,
          locals: req.locals,
          lang: req.locals.cookies().get('lang', 'en') || 'en',
        };
        await this.processor.processRequest(store, req, res);
      } finally {
        REQUEST_COUNT--;
      }
      // await new Promise(resolve => setTimeout(resolve, 3000));

      // asyncLocalStorage.run(store, async () => {
      //   try {
      //     await onEnd();
      //   } catch (error: any) {
      //     logger.error(`url: ${url}, Request end error: `, error.message);
      //   }

      //   lastRequestTime = new Date().getTime();
      //   const requestEnd = process.hrtime.bigint();
      //   REQUEST_COUNT--;
      //   logger.debug(
      //     `Request finished. Count: ${REQUEST_COUNT}, url: ${url}, time: ${new Date().toISOString()}, duration: ${Number(requestEnd - requestStart) / 1000000} ms`
      //   );
      // });
    });
  }
}
