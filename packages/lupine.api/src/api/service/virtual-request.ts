import { IncomingMessage, ServerResponse } from 'http';
import { Socket } from 'net';
import { ServerRequest, AsyncStorageProps, AppCacheKeys, getAppCache, JsonObject } from '../../models';
import { apiCache } from '../api-cache';

export class MockServerResponse extends ServerResponse {
  public _buffer: string = '';
  public _resolve: (val: string) => void;
  public _reject: (val: any) => void;

  constructor(req: IncomingMessage, resolve: (v: string) => void, reject: (v: any) => void) {
    super(req);
    this._resolve = resolve;
    this._reject = reject;
  }

  // Intercept the stream writes!
  write(chunk: any, encoding?: any, cb?: any): boolean {
    if (chunk) {
      this._buffer += chunk.toString();
    }
    if (typeof cb === 'function') cb();
    else if (typeof encoding === 'function') encoding();
    return true;
  }

  end(chunk?: any, encoding?: any, cb?: any): this {
    if (chunk) {
      this._buffer += chunk.toString();
    }
    this._resolve(this._buffer);
    if (typeof cb === 'function') cb();
    else if (typeof encoding === 'function') encoding();
    return this;
  }

  // Polyfill setHeader to swallow network overrides seamlessly
  setHeader(name: string, value: string | number | readonly string[]): this {
    super.setHeader(name, value);
    return this;
  }
}

export class MockServerRequest extends IncomingMessage implements ServerRequest {
  locals: any; // We type loosely here to bridge ServerRequest effortlessly

  constructor(parentReq: ServerRequest, targetUrl: string, postData?: any) {
    // Provide an empty socket boundary ensuring robust HTTP standard execution
    super(parentReq.socket || new Socket());

    // Copy essential native request properties
    this.url = targetUrl;
    this.method = postData ? 'POST' : 'GET';
    this.headers = Object.assign({}, parentReq.headers);
    this.connection = parentReq.connection;

    // Parse URL sections
    const urlParts = targetUrl.split('?');
    const urlWithoutQuery = urlParts[0];
    const query = new URLSearchParams(urlParts[1] || '');

    // Clone parent's locals structure, replacing only the active routing boundaries
    this.locals = Object.assign({}, parentReq.locals, {
      url: targetUrl,
      urlWithoutQuery,
      query,
      urlParameters: {},
      body: postData
        ? Buffer.isBuffer(postData) || postData instanceof Uint8Array || postData instanceof ArrayBuffer
          ? Buffer.from(postData as any)
          : Buffer.from(typeof postData === 'string' ? postData : JSON.stringify(postData))
        : undefined,
      json: () => (postData ? (typeof postData === 'string' ? JSON.parse(postData) : postData) : undefined),
    });
  }
}

export const triggerVirtualFetch = async (
  store: AsyncStorageProps,
  req: ServerRequest,
  targetUrl: string,
  postData?: any
): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    const mockReq = new MockServerRequest(req, targetUrl, postData);
    const mockRes = new MockServerResponse(mockReq, resolve, reject);

    try {
      const _lupineApi = getAppCache().get(store.appName, AppCacheKeys.API_MODULE);
      if (_lupineApi && _lupineApi.processApi) {
        // Re-inject the Native Execution Context (Extremely Fast, ~0.0001ms pointer push)
        const result = await _lupineApi.processApi(
          store,
          mockReq.locals.urlWithoutQuery,
          mockReq as ServerRequest,
          mockRes
        );
        if (!result) {
          // Unhandled Route (404 Fallback)
          if (!mockRes.headersSent && !mockRes.writableEnded) {
            resolve(JSON.stringify({ status: 'error', error: '404 API Not Found' }));
          }
        }
      } else {
        resolve(JSON.stringify({ status: 'error', error: 'API Module Offline' }));
      }
    } catch (e: any) {
      resolve(JSON.stringify({ status: 'error', error: e.message }));
    }
  });
};

export const localFetch = async (urlWithoutHost: string, postData?: string | JsonObject): Promise<string> => {
  const store = apiCache.getAsyncStore();
  if (!store || !store.req) {
    throw new Error('localFetch lacks backend SSR execution context bounding.');
  }

  const responseStr = await triggerVirtualFetch(store, store.req, urlWithoutHost, postData);
  return responseStr;
};
