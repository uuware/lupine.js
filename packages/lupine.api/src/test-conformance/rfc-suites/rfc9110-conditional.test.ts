import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { ConformanceTestServer } from '../harness/test-server';
import { ConformanceTestClient } from '../harness/test-client';

describe('RFC 9110 Section 13: Conditional Requests Conformance Suite (inspired by fresh)', () => {
  const server = new ConformanceTestServer();
  let client: ConformanceTestClient;
  let fileEtag = '';
  let fileLastModified = '';
  let mtimeSec = 0;

  before(async () => {
    await server.start();
    client = new ConformanceTestClient(server.baseUrl);

    const { fullPath } = server.createBinaryFixture('cached.txt', 500, 'SAMPLE_DATA');
    const stat = require('fs').statSync(fullPath);
    mtimeSec = Math.floor(stat.mtime.getTime() / 1000) * 1000;

    const res = await client.head('/cached.txt').expectStatus(200);
    fileEtag = res.headers.etag as string;
    fileLastModified = res.headers['last-modified'] as string;
    assert.ok(fileEtag, 'Fixture must have ETag');
    assert.ok(fileLastModified, 'Fixture must have Last-Modified');
  });

  after(async () => {
    await server.stop();
  });

  describe('If-None-Match evaluation', () => {
    it('should return 304 when If-None-Match is wildcard *', async () => {
      await client.get('/cached.txt').set('If-None-Match', '*').expectStatus(304);
    });

    it('should return 304 when If-None-Match exact string matches', async () => {
      await client.get('/cached.txt').set('If-None-Match', fileEtag).expectStatus(304);
    });

    it('should return 304 when weak prefix W/ is omitted or present', async () => {
      const bareEtag = fileEtag.replace(/^W\//, '');
      await client.get('/cached.txt').set('If-None-Match', bareEtag).expectStatus(304);
      await client.get('/cached.txt').set('If-None-Match', `W/${bareEtag}`).expectStatus(304);
    });

    it('should return 304 when matching ETag is in a comma-separated list', async () => {
      await client
        .get('/cached.txt')
        .set('If-None-Match', `"other-tag-1", "other-tag-2", ${fileEtag}`)
        .expectStatus(304);
    });

    it('should return 200 with full content when no ETag matches', async () => {
      await client
        .get('/cached.txt')
        .set('If-None-Match', '"random-stale-tag-999"')
        .expectStatus(200)
        .expectHeader('Content-Length', '500');
    });
  });

  describe('If-Modified-Since evaluation', () => {
    it('should return 304 when date string matches Last-Modified exactly', async () => {
      await client.get('/cached.txt').set('If-Modified-Since', fileLastModified).expectStatus(304);
    });

    it('should return 304 when date is in the future', async () => {
      const tomorrow = new Date(Date.now() + 86400000).toUTCString();
      await client.get('/cached.txt').set('If-Modified-Since', tomorrow).expectStatus(304);
    });

    it('should return 200 when date is in the past', async () => {
      const yesterday = new Date(mtimeSec - 86400000).toUTCString();
      await client.get('/cached.txt').set('If-Modified-Since', yesterday).expectStatus(200);
    });

    it('should ignore invalid date formats and return 200 OK', async () => {
      await client.get('/cached.txt').set('If-Modified-Since', 'not-a-valid-http-date').expectStatus(200);
    });

    it('RFC Precedence: If-None-Match takes precedence over If-Modified-Since', async () => {
      // If-None-Match matches (304), but If-Modified-Since is in the past (which would be 200 if evaluated alone)
      const pastDate = new Date(mtimeSec - 86400000).toUTCString();
      await client
        .get('/cached.txt')
        .set('If-None-Match', fileEtag)
        .set('If-Modified-Since', pastDate)
        .expectStatus(304);
    });
  });

  describe('If-Range header evaluation (RFC 9110 Section 13.1.5)', () => {
    it('should return 206 partial content when If-Range matches ETag', async () => {
      await client
        .get('/cached.txt')
        .set('Range', 'bytes=0-9')
        .set('If-Range', fileEtag)
        .expectStatus(206)
        .expectHeader('Content-Range', 'bytes 0-9/500')
        .expectHeader('Content-Length', '10');
    });

    it('should fallback to 200 full content when If-Range ETag mismatches', async () => {
      await client
        .get('/cached.txt')
        .set('Range', 'bytes=0-9')
        .set('If-Range', '"mismatched-etag"')
        .expectStatus(200)
        .expectHeader('Content-Length', '500');
    });

    it('should return 206 partial content when If-Range matches Last-Modified date', async () => {
      await client
        .get('/cached.txt')
        .set('Range', 'bytes=0-9')
        .set('If-Range', fileLastModified)
        .expectStatus(206)
        .expectHeader('Content-Range', 'bytes 0-9/500');
    });

    it('should fallback to 200 full content when If-Range date mismatches', async () => {
      const oldDate = new Date(mtimeSec - 86400000).toUTCString();
      await client
        .get('/cached.txt')
        .set('Range', 'bytes=0-9')
        .set('If-Range', oldDate)
        .expectStatus(200)
        .expectHeader('Content-Length', '500');
    });
  });
});
