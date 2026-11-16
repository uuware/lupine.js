import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { ConformanceTestServer } from '../harness/test-server';
import { ConformanceTestClient } from '../harness/test-client';

describe('RFC 9110 Section 14: Comprehensive Range Request Conformance Suite (inspired by range-parser & send)', () => {
  const server = new ConformanceTestServer();
  let client: ConformanceTestClient;
  const FILE_SIZE = 1000; // 1000 bytes fixture

  before(async () => {
    await server.start();
    client = new ConformanceTestClient(server.baseUrl);

    // Create 1000 bytes file: index 0 to 999
    server.createBinaryFixture('file-1000.bin', FILE_SIZE, '0123456789');
    server.createFixture('empty.bin', '');
  });

  after(async () => {
    await server.stop();
  });

  // Table of 20+ Valid Range Edge Cases
  const validCases = [
    { name: 'First single byte', range: 'bytes=0-0', status: 206, expectedCr: 'bytes 0-0/1000', len: 1 },
    { name: 'Last single byte', range: 'bytes=999-999', status: 206, expectedCr: 'bytes 999-999/1000', len: 1 },
    { name: 'First half', range: 'bytes=0-499', status: 206, expectedCr: 'bytes 0-499/1000', len: 500 },
    { name: 'Second half', range: 'bytes=500-999', status: 206, expectedCr: 'bytes 500-999/1000', len: 500 },
    { name: 'Open ended from start', range: 'bytes=0-', status: 206, expectedCr: 'bytes 0-999/1000', len: 1000 },
    { name: 'Open ended from middle', range: 'bytes=950-', status: 206, expectedCr: 'bytes 950-999/1000', len: 50 },
    { name: 'Open ended from last byte', range: 'bytes=999-', status: 206, expectedCr: 'bytes 999-999/1000', len: 1 },
    { name: 'Suffix single byte', range: 'bytes=-1', status: 206, expectedCr: 'bytes 999-999/1000', len: 1 },
    { name: 'Suffix 10 bytes', range: 'bytes=-10', status: 206, expectedCr: 'bytes 990-999/1000', len: 10 },
    { name: 'Suffix exactly full size', range: 'bytes=-1000', status: 206, expectedCr: 'bytes 0-999/1000', len: 1000 },
    { name: 'Suffix larger than file size', range: 'bytes=-2000', status: 206, expectedCr: 'bytes 0-999/1000', len: 1000 },
    { name: 'Clamp: end exceeds file size slightly', range: 'bytes=995-1005', status: 206, expectedCr: 'bytes 995-999/1000', len: 5 },
    { name: 'Clamp: end far exceeds file size', range: 'bytes=0-999999', status: 206, expectedCr: 'bytes 0-999/1000', len: 1000 },
    { name: 'Whitespace tolerance: after =', range: 'bytes= 0-10', status: 206, expectedCr: 'bytes 0-10/1000', len: 11 },
    { name: 'Whitespace tolerance: around hyphen', range: 'bytes=0 - 10', status: 206, expectedCr: 'bytes 0-10/1000', len: 11 },
    { name: 'Whitespace tolerance: suffix with space', range: 'bytes= - 10', status: 206, expectedCr: 'bytes 990-999/1000', len: 10 },
  ];

  for (const c of validCases) {
    it(`Valid Range: ${c.name} (${c.range})`, async () => {
      await client
        .get('/file-1000.bin')
        .set('Range', c.range)
        .expectStatus(c.status)
        .expectHeader('Content-Range', c.expectedCr)
        .expectHeader('Content-Length', String(c.len));
    });
  }

  // Table of Unsatisfiable Ranges (HTTP 416)
  const unsatisfiableCases = [
    { name: 'Suffix length is 0 (bytes=-0)', range: 'bytes=-0' },
    { name: 'Start equals file size (bytes=1000-)', range: 'bytes=1000-' },
    { name: 'Start exceeds file size (bytes=1001-)', range: 'bytes=1001-' },
    { name: 'Start far exceeds file size (bytes=5000-6000)', range: 'bytes=5000-6000' },
    { name: 'End is less than start (bytes=500-100)', range: 'bytes=500-100' },
    { name: 'End is less than start boundary (bytes=1-0)', range: 'bytes=1-0' },
  ];

  for (const c of unsatisfiableCases) {
    it(`Unsatisfiable Range 416: ${c.name} (${c.range})`, async () => {
      await client
        .get('/file-1000.bin')
        .set('Range', c.range)
        .expectStatus(416)
        .expectHeader('Content-Range', 'bytes */1000');
    });
  }

  // 0-byte file edge cases
  it('0-byte empty file: any range request must return 416 with */0', async () => {
    for (const r of ['bytes=0-0', 'bytes=0-', 'bytes=-1', 'bytes=-10']) {
      await client
        .get('/empty.bin')
        .set('Range', r)
        .expectStatus(416)
        .expectHeader('Content-Range', 'bytes */0');
    }
  });

  // Malformed / Unsupported ranges (Must be ignored, returning HTTP 200 with complete file)
  const ignoredCases = [
    { name: 'Empty range bytes=-', range: 'bytes=-' },
    { name: 'Non-numeric bytes=abc-def', range: 'bytes=abc-def' },
    { name: 'Missing unit syntax', range: '0-500' },
    { name: 'Unsupported unit items=0-10', range: 'items=0-10' },
    { name: 'Malformed multiple hyphens bytes=0-10-20', range: 'bytes=0-10-20' },
  ];

  for (const c of ignoredCases) {
    it(`Ignored Malformed Range: ${c.name} -> 200 OK`, async () => {
      await client
        .get('/file-1000.bin')
        .set('Range', c.range)
        .expectStatus(200)
        .expectHeader('Content-Length', '1000');
    });
  }
});
