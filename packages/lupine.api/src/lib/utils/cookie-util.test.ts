import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { parseCookies, serializeCookie } from './cookie-util';
import { applySetCookie } from '../../server/web-listener';
import { ServerResponse } from 'http';
import { ServerRequest } from '../../models';
import { SimpleStorage } from '../../shared';

describe('cookie-util - RFC 6265bis Cookie Suite', () => {
  describe('serializeCookie', () => {
    it('should serialize basic cookie with default path="/" and no NaN expires', () => {
      const res = serializeCookie('token', 'abc123xyz');
      assert.equal(res, 'token=abc123xyz; Path=/');
      assert.ok(!res.includes('Expires'), 'Session cookie must not have Expires attribute');
      assert.ok(!res.includes('NaN'), 'Must never emit NaN');
    });

    it('should calculate valid UTC Expires when expireDays is provided', () => {
      const res = serializeCookie('remember', 'true', { expireDays: 7 });
      assert.ok(res.includes('; Expires='), 'Should include Expires attribute');
      assert.ok(!res.includes('Invalid Date'), 'Should be a valid date');
      const match = res.match(/Expires=([^;]+)/);
      assert.ok(match, 'Expires matched');
      const parsedTime = Date.parse(match[1]);
      assert.ok(!isNaN(parsedTime), 'Parsed time is valid');
      const expectedApprox = Date.now() + 7 * 24 * 3600000;
      assert.ok(Math.abs(parsedTime - expectedApprox) < 5000, 'Expires date is within 5 seconds of expected');
    });

    it('should properly serialize all cookie flags', () => {
      const res = serializeCookie('session', 'secret', {
        path: '/admin',
        domain: 'example.com',
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        Partitioned: true,
      });
      assert.ok(res.startsWith('session=secret; Path=/admin'));
      assert.ok(res.includes('; Domain=example.com'));
      assert.ok(res.includes('; HttpOnly'));
      assert.ok(res.includes('; Secure'));
      assert.ok(res.includes('; SameSite=strict'));
      assert.ok(res.includes('; Partitioned'));
    });

    it('should properly encode special characters in cookie value', () => {
      const res = serializeCookie('user', '张三 =; "foo"');
      assert.ok(!res.includes('张三'), 'Value must be percent encoded');
      assert.ok(res.includes(encodeURIComponent('张三 =; "foo"')));
    });
  });

  describe('parseCookies', () => {
    it('should return empty object for undefined or empty string', () => {
      assert.deepEqual(parseCookies(undefined), {});
      assert.deepEqual(parseCookies(''), {});
    });

    it('should parse single and multiple cookies with whitespace trimming', () => {
      const header = 'theme=dark; lang=zh-CN; user_id=42';
      const parsed = parseCookies(header);
      assert.equal(parsed.theme, 'dark');
      assert.equal(parsed.lang, 'zh-CN');
      assert.equal(parsed.user_id, '42');
    });

    it('should decode percent-encoded values', () => {
      const val = encodeURIComponent('hello world & user');
      const parsed = parseCookies(`greeting=${val}`);
      assert.equal(parsed.greeting, 'hello world & user');
    });

    it('should gracefully fallback when encountering malformed percent-encoding', () => {
      // %zz is invalid percent-encoding that causes decodeURIComponent to throw URIError
      const parsed = parseCookies('bad=%zz; good=ok');
      assert.equal(parsed.bad, '%zz');
      assert.equal(parsed.good, 'ok');
    });
  });

  describe('applySetCookie and clearCookie integration', () => {
    it('should preserve existing Set-Cookie headers in an array when adding a new cookie', () => {
      const res = new ServerResponse({} as any);
      const req = {
        locals: {
          _cookies: new SimpleStorage({}),
          cookies: function () {
            return this._cookies;
          },
        },
      } as any as ServerRequest;

      applySetCookie(req, res, 'cookie1', 'val1');
      applySetCookie(req, res, 'cookie2', 'val2');

      const headers = res.getHeader('Set-Cookie');
      assert.ok(Array.isArray(headers), 'Set-Cookie should be an array of multiple cookies');
      assert.equal((headers as string[]).length, 2);
      assert.ok((headers as string[])[0].startsWith('cookie1=val1'));
      assert.ok((headers as string[])[1].startsWith('cookie2=val2'));
      assert.equal(req.locals.cookies().get('cookie1'), 'val1');
      assert.equal(req.locals.cookies().get('cookie2'), 'val2');
    });

    it('should remove cookie from local cookies and append expired Set-Cookie when expireDays is negative', () => {
      const res = new ServerResponse({} as any);
      const req = {
        locals: {
          _cookies: new SimpleStorage({ token: 'active_token' }),
          cookies: function () {
            return this._cookies;
          },
        },
      } as any as ServerRequest;

      applySetCookie(req, res, 'token', '', { expireDays: -1, path: '/' });

      assert.equal(req.locals.cookies().contains('token'), false);
      const headers = res.getHeader('Set-Cookie') as string[];
      assert.ok(Array.isArray(headers));
      assert.ok(headers[0].startsWith('token=;'));
      assert.ok(headers[0].includes('; Path=/'));
    });
  });
});
