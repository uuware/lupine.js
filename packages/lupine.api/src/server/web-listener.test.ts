import test from 'node:test';
import assert from 'node:assert/strict';
import { EventEmitter } from 'events';
import { Logger } from '../lib/logger';
import { ServerRequest, SetCookieProps } from '../models';
import { SimpleStorage } from '../shared';
import {
  WebListener,
  getRequestCount,
  setMaxRequestCount,
  setMaxRequestSize,
  parseJsonBody,
  applySetCookie
} from './web-listener';

const createMockReq = (): any => {
  const req = new EventEmitter();
  Object.assign(req, {
    method: 'POST',
    url: '/test',
    headers: { host: 'example.com' },
    socket: {
      remoteAddress: '127.0.0.1',
      destroy: () => {},
      destroyed: false,
    },
    setTimeout: () => {},
    pause: () => {},
    locals: { cookies: () => new SimpleStorage({}) } as any,
  });
  return req as any as ServerRequest;
};

const createMockRes = (): any => {
  const res = new EventEmitter();
  const headers: Record<string, string[]> = {};
  
  Object.assign(res, {
    writable: true,
    writableEnded: false,
    headersSent: false,
    statusCode: 200,
    setHeader: (k: string, v: string | string[]) => {
      headers[k] = Array.isArray(v) ? v : [v];
    },
    getHeader: (k: string) => headers[k] || undefined,
    writeHead: function(s: number) { this.statusCode = s; this.headersSent = true; },
    write: () => {},
    end: function() { 
      this.writableEnded = true; 
      process.nextTick(() => res.emit('finish')); 
    },
    _getStatus: function() { return this.statusCode; },
    _getHeaders: () => headers,
  });
  return res;
};

test('WebListener Extracted Pure Functions', async (t) => {
  await t.test('parseJsonBody safely parses valid JSON and caches it', () => {
    const req = createMockReq();
    const logger = new Logger('test');
    
    // Valid JSON
    req.locals.body = Buffer.from('{"key":"value"}');
    assert.deepEqual(parseJsonBody(req, logger), { key: 'value' });
    
    // Cached JSON returns identically without re-reading
    req.locals._json = { key: 'cached' };
    assert.deepEqual(parseJsonBody(req, logger), { key: 'cached' });
  });

  await t.test('parseJsonBody handles invalid JSON gracefully', () => {
    const req = createMockReq();
    const logger = new Logger('test');
    
    req.locals.body = Buffer.from('{invalid-json}');
    assert.equal(parseJsonBody(req, logger), undefined);
  });

  await t.test('applySetCookie merges cookies accurately without memory bloat', () => {
    const req = createMockReq();
    const res = createMockRes();
    const store = new SimpleStorage({});
    req.locals = { cookies: () => store } as any;

    applySetCookie(req, res, 'cookie1', 'val1', { expireDays: 1, path: '/' });
    applySetCookie(req, res, 'cookie2', 'val2', { expireDays: 0, httpOnly: true });

    const headers = res._getHeaders()['Set-Cookie'];
    assert.ok(headers.length === 2);
    // Be robust to lowercase or uppercase path/httpOnly attributes
    assert.ok(headers[0].includes('cookie1=val1'));
    assert.ok(headers[1].includes('cookie2=val2'));
    assert.ok(/Path=\//i.test(headers[0]));
    assert.ok(/HttpOnly/i.test(headers[1]));
    
    assert.equal(store.get('cookie1', ''), 'val1');
    assert.equal(store.get('cookie2', ''), 'val2');
  });
});

test('WebListener Traffic Flow Constraints', async (t) => {
  const dummyProcessor = { processRequest: async () => {} } as any;

  // Make sure host config exists to bypass 404 block logic!
  const { HostToPath } = require('./host-to-path');
  HostToPath.setHostToPathList([{ hosts: ['example.com'], webPath: '/w', appName: 'app' }]);

  await t.test('Tracks REQUEST_COUNT through full lifecycle accurately', async () => {
    const listener = new WebListener(dummyProcessor);
    const originalCount = getRequestCount();
    
    const req = createMockReq();
    const res = createMockRes();

    await listener.listener(req, res);
    
    const countAfterInit = getRequestCount();
    // It should increment when request binds hook tracking
    assert.equal(countAfterInit, originalCount + 1);

    // Concluding response triggers exact-once decrement
    res.emit('finish');
    assert.equal(getRequestCount(), originalCount);

    // Emitting redundant closer should not sub-zero the count (duplicate decrement validation)
    res.emit('close');
    assert.equal(getRequestCount(), originalCount);
  });

  await t.test('Applies Backpressure when MAX_REQUEST_COUNT is exceeded', async () => {
    setMaxRequestCount(0); // Trigger immediate backpressure
    const originalCount = getRequestCount();
    
    const listener = new WebListener(dummyProcessor);
    const req = createMockReq();
    const res = createMockRes();

    await listener.listener(req, res);
    
    // Assert request count yielded slot lock and server blocked execution
    assert.equal(getRequestCount(), originalCount);
    // Request returns 503 HTTP
    assert.equal(res._getStatus(), 503);
    
    setMaxRequestCount(100); // restore default
  });

  await t.test('Intercepts payload exceeding MAX_REQUEST_SIZE and triggers socket 403 destruction', async () => {
    setMaxRequestSize(100); // Only allow 100 bytes
    
    let destoryed = false;
    const req = createMockReq();
    req.socket.destroy = () => { destoryed = true; };

    const res = createMockRes();

    const listener = new WebListener(dummyProcessor);
    await listener.listener(req, res);
    
    // Stream 150 bytes to trip circuit breaker
    req.emit('data', Buffer.alloc(150));
    
    // Process async tasks
    await new Promise(r => setTimeout(r, 10));

    // Force call it so the mock emits correctly
    res.emit('finish');

    assert.equal(res._getStatus(), 403);
    assert.ok(destoryed, 'Socket must be destroyed on big payload');
  });
});
