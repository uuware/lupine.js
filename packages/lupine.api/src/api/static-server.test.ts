import { describe, it, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import os from 'node:os';
import {
  bindStaticServerOptions,
  bindSkipSsrPaths,
  defaultSSOptions,
  isSkipSsrUrl,
  serveStaticFileStream,
} from './static-server-helper';
import { StaticServer } from './static-server';

describe('StaticServer & Skip SSR Paths', () => {
  beforeEach(() => {
    defaultSSOptions.skipSsrPaths = [];
  });

  describe('isSkipSsrUrl', () => {
    it('should return false when skipPaths is undefined or empty', () => {
      assert.equal(isSkipSsrUrl('/assets/app.js', undefined), false);
      assert.equal(isSkipSsrUrl('/assets/app.js', []), false);
    });

    it('should match exact file paths', () => {
      const paths = ['/favicon.ico', '/robots.txt'];
      assert.equal(isSkipSsrUrl('/favicon.ico', paths), true);
      assert.equal(isSkipSsrUrl('/robots.txt', paths), true);
      assert.equal(isSkipSsrUrl('/favicon.ico/extra', paths), true);
      assert.equal(isSkipSsrUrl('/index.html', paths), false);
    });

    it('should match directory prefixes properly', () => {
      const paths = ['/assets', '/static/'];
      assert.equal(isSkipSsrUrl('/assets/bundle.js', paths), true);
      assert.equal(isSkipSsrUrl('/assets/sub/app.css', paths), true);
      assert.equal(isSkipSsrUrl('/assets', paths), true);
      assert.equal(isSkipSsrUrl('/static/img.png', paths), true);

      // Boundary safety check: should not match partially overlapping names
      assert.equal(isSkipSsrUrl('/assets-old/bundle.js', paths), false);
      assert.equal(isSkipSsrUrl('/static-files/img.png', paths), false);
      assert.equal(isSkipSsrUrl('/other/path', paths), false);
    });

    it('should automatically normalize prefixes without leading slashes', () => {
      const paths = ['assets', 'static/'];
      assert.equal(isSkipSsrUrl('/assets/app.js', paths), true);
      assert.equal(isSkipSsrUrl('/static/style.css', paths), true);
    });

    it('should support single string argument', () => {
      assert.equal(isSkipSsrUrl('/assets/chunk.js', '/assets'), true);
      assert.equal(isSkipSsrUrl('/other/file.js', '/assets'), false);
    });
  });

  describe('bindStaticServerOptions and bindSkipSsrPaths', () => {
    it('should register paths globally via bindStaticServerOptions', () => {
      bindStaticServerOptions({ skipSsrPaths: ['/assets', '/static'] });
      assert.deepEqual(defaultSSOptions.skipSsrPaths, ['/assets', '/static']);

      // Deduplicate when calling again
      bindStaticServerOptions({ skipSsrPaths: ['/static', '/media'] });
      assert.deepEqual(defaultSSOptions.skipSsrPaths, ['/assets', '/static', '/media']);
    });

    it('should register paths via bindSkipSsrPaths helper', () => {
      bindSkipSsrPaths('/assets');
      assert.deepEqual(defaultSSOptions.skipSsrPaths, ['/assets']);

      bindSkipSsrPaths(['/static', '/favicon.ico']);
      assert.deepEqual(defaultSSOptions.skipSsrPaths, ['/assets', '/static', '/favicon.ico']);
    });
  });

  describe('StaticServer isSkipSsr integration', () => {
    it('should use defaultSSOptions.skipSsrPaths directly', () => {
      bindSkipSsrPaths(['/assets']);
      const server = new StaticServer();
      assert.equal((server as any).isSkipSsr('/assets/app.js'), true);
      assert.equal((server as any).isSkipSsr('/page/home'), false);
    });
  });

  describe('serverContentType and bindServerContentType', () => {
    it('should allow registering custom MIME types and keep options in sync', () => {
      const { serverContentType, bindServerContentType } = require('./static-server-helper');
      assert.equal(serverContentType.json, 'application/json');

      bindServerContentType({ customext: 'application/x-custom' });
      assert.equal(serverContentType.customext, 'application/x-custom');
      assert.equal(defaultSSOptions.serverContentType?.customext, 'application/x-custom');

      bindStaticServerOptions({ serverContentType: { another: 'application/x-another' } });
      assert.equal(serverContentType.another, 'application/x-another');
      assert.equal(defaultSSOptions.serverContentType?.another, 'application/x-another');
    });
  });

  describe('serveStaticFileStream HTTP Range Requests (RFC 9110)', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'lupine-static-test-'));
    const testFile = path.join(tmpDir, 'test-1000.bin');
    const emptyFile = path.join(tmpDir, 'test-empty.bin');
    const testContent = 'A'.repeat(990) + '0123456789'; // 1000 bytes

    fs.writeFileSync(testFile, testContent);
    fs.writeFileSync(emptyFile, '');

    let server: http.Server;
    let port = 0;

    beforeEach(async () => {
      if (!server) {
        server = http.createServer((req, res) => {
          const filePath = req.url === '/empty' ? emptyFile : testFile;
          serveStaticFileStream(req as any, res, filePath, req.url || '/');
        });
        await new Promise<void>((resolve) => {
          server.listen(0, () => {
            port = (server.address() as any).port;
            resolve();
          });
        });
      }
    });

    after(async () => {
      if (server) {
        await new Promise<void>((resolve) => server.close(() => resolve()));
      }
      try {
        fs.rmSync(tmpDir, { recursive: true, force: true });
      } catch {}
    });

    function requestFile(filePath: string, range?: string) {
      return new Promise<{ statusCode: number; headers: http.IncomingHttpHeaders; body: string }>((resolve, reject) => {
        const headers: Record<string, string> = {};
        if (range !== undefined) headers.range = range;

        const req = http.get({ port, path: filePath, headers }, (res) => {
          let body = '';
          res.setEncoding('utf8');
          res.on('data', (chunk) => (body += chunk));
          res.on('end', () => {
            resolve({
              statusCode: res.statusCode ?? 0,
              headers: res.headers,
              body,
            });
          });
        });
        req.setTimeout(2000, () => {
          req.destroy();
          reject(new Error('Request timed out waiting for response body'));
        });
        req.on('error', reject);
      });
    }

    it('should return 200 with full file and Accept-Ranges when no Range header', async () => {
      const res = await requestFile('/test-1000.bin');
      assert.equal(res.statusCode, 200);
      assert.equal(res.headers['content-length'], '1000');
      assert.equal(res.headers['accept-ranges'], 'bytes');
      assert.equal(res.body.length, 1000);
      assert.equal(res.body, testContent);
    });

    it('should handle suffix range (e.g. bytes=-10) returning last 10 bytes', async () => {
      const res = await requestFile('/test-1000.bin', 'bytes=-10');
      assert.equal(res.statusCode, 206);
      assert.equal(res.headers['content-range'], 'bytes 990-999/1000');
      assert.equal(res.headers['content-length'], '10');
      assert.equal(res.headers['accept-ranges'], 'bytes');
      assert.equal(res.body, '0123456789');
    });

    it('should handle suffix range larger than file (e.g. bytes=-1500) returning entire file', async () => {
      const res = await requestFile('/test-1000.bin', 'bytes=-1500');
      assert.equal(res.statusCode, 206);
      assert.equal(res.headers['content-range'], 'bytes 0-999/1000');
      assert.equal(res.headers['content-length'], '1000');
      assert.equal(res.body, testContent);
    });

    it('should reject suffix range with 0 length (bytes=-0) with 416', async () => {
      const res = await requestFile('/test-1000.bin', 'bytes=-0');
      assert.equal(res.statusCode, 416);
      assert.equal(res.headers['content-range'], 'bytes */1000');
    });

    it('should clamp end to size - 1 when parsedEnd >= size (e.g. bytes=995-2000) without hanging', async () => {
      const res = await requestFile('/test-1000.bin', 'bytes=995-2000');
      assert.equal(res.statusCode, 206);
      assert.equal(res.headers['content-range'], 'bytes 995-999/1000');
      assert.equal(res.headers['content-length'], '5');
      assert.equal(res.body, '56789');
    });

    it('should handle standard range (e.g. bytes=0-499)', async () => {
      const res = await requestFile('/test-1000.bin', 'bytes=0-499');
      assert.equal(res.statusCode, 206);
      assert.equal(res.headers['content-range'], 'bytes 0-499/1000');
      assert.equal(res.headers['content-length'], '500');
      assert.equal(res.body, testContent.slice(0, 500));
    });

    it('should handle open-ended range (e.g. bytes=990-)', async () => {
      const res = await requestFile('/test-1000.bin', 'bytes=990-');
      assert.equal(res.statusCode, 206);
      assert.equal(res.headers['content-range'], 'bytes 990-999/1000');
      assert.equal(res.headers['content-length'], '10');
      assert.equal(res.body, '0123456789');
    });

    it('should reject range when start >= size with 416', async () => {
      const res = await requestFile('/test-1000.bin', 'bytes=1000-');
      assert.equal(res.statusCode, 416);
      assert.equal(res.headers['content-range'], 'bytes */1000');
    });

    it('should reject range when end < start with 416', async () => {
      const res = await requestFile('/test-1000.bin', 'bytes=500-100');
      assert.equal(res.statusCode, 416);
      assert.equal(res.headers['content-range'], 'bytes */1000');
    });

    it('should serve empty 0-byte file with 200 and Content-Length 0 when no Range requested', async () => {
      const res = await requestFile('/empty');
      assert.equal(res.statusCode, 200);
      assert.equal(res.headers['content-length'], '0');
      assert.equal(res.body, '');
    });

    it('should reject any range on empty 0-byte file with 416', async () => {
      const res = await requestFile('/empty', 'bytes=0-0');
      assert.equal(res.statusCode, 416);
      assert.equal(res.headers['content-range'], 'bytes */0');
    });

    it('should ignore invalid or non-byte range headers and return 200 with full file', async () => {
      const res1 = await requestFile('/test-1000.bin', 'items=0-10');
      assert.equal(res1.statusCode, 200);
      assert.equal(res1.headers['content-length'], '1000');
      assert.equal(res1.body.length, 1000);

      const res2 = await requestFile('/test-1000.bin', 'bytes=-');
      assert.equal(res2.statusCode, 200);
      assert.equal(res2.headers['content-length'], '1000');
    });
  });
});

