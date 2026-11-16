import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { ConformanceTestServer } from '../harness/test-server';
import { ConformanceTestClient } from '../harness/test-client';

describe('Scenario 2: PDF Viewer Simulation (PDF.js / Adobe Acrobat)', () => {
  const server = new ConformanceTestServer();
  let client: ConformanceTestClient;
  const PDF_SIZE = 2 * 1024 * 1024; // 2 MB mock PDF
  const PDF_TRAILER = 'startxref\n1048576\n%%EOF';

  before(async () => {
    await server.start();
    client = new ConformanceTestClient(server.baseUrl);

    // Create 2MB simulated PDF file with standard trailing xref marker
    server.createBinaryFixture('manual.pdf', PDF_SIZE, PDF_TRAILER);
  });

  after(async () => {
    await server.stop();
  });

  it('Step 1: Read trailer table via suffix range (bytes=-1024)', async () => {
    // PDF.js initially fetches the last 1024 bytes to locate the cross-reference offset
    const res = await client
      .get('/manual.pdf')
      .set('Range', 'bytes=-1024')
      .expectStatus(206)
      .expectHeader('Content-Range', `bytes ${PDF_SIZE - 1024}-${PDF_SIZE - 1}/${PDF_SIZE}`)
      .expectHeader('Content-Length', '1024');

    assert.ok(res.text.includes(PDF_TRAILER), 'Response must contain PDF trailer data');
  });

  it('Step 2: Read PDF magic header bytes at the start (bytes=0-1023)', async () => {
    const res = await client
      .get('/manual.pdf')
      .set('Range', 'bytes=0-1023')
      .expectStatus(206)
      .expectHeader('Content-Range', `bytes 0-1023/${PDF_SIZE}`)
      .expectHeader('Content-Length', '1024');

    assert.equal(res.rawBody.length, 1024);
  });

  it('Step 3: Random page navigation fetching discrete page object ranges', async () => {
    // PDF.js fetches page objects on demand as user navigates
    const pageRanges = [
      { start: 2048, end: 4095, expectedLen: 2048 },
      { start: 81920, end: 98303, expectedLen: 16384 },
      { start: 524288, end: 557055, expectedLen: 32768 },
    ];

    for (const p of pageRanges) {
      const res = await client
        .get('/manual.pdf')
        .set('Range', `bytes=${p.start}-${p.end}`)
        .expectStatus(206)
        .expectHeader('Content-Range', `bytes ${p.start}-${p.end}/${PDF_SIZE}`)
        .expectHeader('Content-Length', String(p.expectedLen));

      assert.equal(res.rawBody.length, p.expectedLen);
    }
  });
});
