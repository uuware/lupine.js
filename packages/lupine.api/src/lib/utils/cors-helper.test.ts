import test from 'node:test';
import assert from 'node:assert';
import { ServerResponse } from 'http';
import { IncomingMessage } from 'http';
import {
  extractHostFromOrigin,
  isHostTrusted,
  setSafeCorsHeaders,
} from './cors-helper';
import { ServerRequest } from '../../models/locals-props';

const createMockReq = (origin: string | undefined, hosts: string[]): ServerRequest => {
  return {
    headers: { origin },
    locals: { hostPath: { hosts } },
  } as unknown as ServerRequest;
};

const createMockRes = () => {
  const headers: Record<string, string> = {};
  return {
    setHeader: (name: string, value: string) => {
      headers[name.toLowerCase()] = value;
    },
    _getHeader: (name: string) => headers[name.toLowerCase()],
    _headers: headers,
  } as unknown as ServerResponse & { _getHeader: (n: string) => string | undefined };
};

test('cors-helper', async (t) => {
  await t.test('extractHostFromOrigin parses host and port', () => {
    assert.strictEqual(extractHostFromOrigin('https://example.com'), 'example.com');
    assert.strictEqual(extractHostFromOrigin('http://localhost:8080'), 'localhost:8080');
    assert.strictEqual(extractHostFromOrigin('https://sub.example.com'), 'sub.example.com');
    assert.strictEqual(extractHostFromOrigin('null'), undefined);
    assert.strictEqual(extractHostFromOrigin(undefined), undefined);
    assert.strictEqual(extractHostFromOrigin('not-a-url'), undefined);
  });

  await t.test('isHostTrusted matches exact host and subdomains', () => {
    assert.strictEqual(isHostTrusted('example.com', ['example.com']), true);
    assert.strictEqual(isHostTrusted('sub.example.com', ['example.com']), true);
    assert.strictEqual(isHostTrusted('a.b.example.com', ['example.com']), true);
    assert.strictEqual(isHostTrusted('evil.com', ['example.com']), false);
    assert.strictEqual(isHostTrusted('notexample.com', ['example.com']), false);
    assert.strictEqual(isHostTrusted('example.com.evil.com', ['example.com']), false);
    assert.strictEqual(isHostTrusted('anything', []), false);
    assert.strictEqual(isHostTrusted('anything', ['*']), true);
  });

  await t.test('reflects trusted origin with credentials', () => {
    const req = createMockReq('https://example.com', ['example.com']);
    const res = createMockRes();
    setSafeCorsHeaders(req, res, true);
    assert.strictEqual(res._getHeader('access-control-allow-origin'), 'https://example.com');
    assert.strictEqual(res._getHeader('access-control-allow-credentials'), 'true');
  });

  await t.test('does NOT reflect untrusted origin (security fix)', () => {
    const req = createMockReq('https://evil.com', ['example.com']);
    const res = createMockRes();
    setSafeCorsHeaders(req, res, true);
    assert.strictEqual(res._getHeader('access-control-allow-origin'), undefined);
    assert.strictEqual(res._getHeader('access-control-allow-credentials'), undefined);
  });

  await t.test('allows public wildcard when no Origin header is present', () => {
    const req = createMockReq(undefined, ['example.com']);
    const res = createMockRes();
    setSafeCorsHeaders(req, res, true);
    assert.strictEqual(res._getHeader('access-control-allow-origin'), '*');
    assert.strictEqual(res._getHeader('access-control-allow-credentials'), undefined);
  });

  await t.test('does not set credentials header when allowCredentials is false', () => {
    const req = createMockReq('https://example.com', ['example.com']);
    const res = createMockRes();
    setSafeCorsHeaders(req, res, false);
    assert.strictEqual(res._getHeader('access-control-allow-origin'), 'https://example.com');
    assert.strictEqual(res._getHeader('access-control-allow-credentials'), undefined);
  });

  await t.test('always sets Vary: Origin', () => {
    const req = createMockReq('https://evil.com', ['example.com']);
    const res = createMockRes();
    setSafeCorsHeaders(req, res, true);
    assert.strictEqual(res._getHeader('vary'), 'Origin');
  });
});
