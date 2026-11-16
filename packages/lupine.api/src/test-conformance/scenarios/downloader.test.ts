import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { ConformanceTestServer } from '../harness/test-server';
import { ConformanceTestClient } from '../harness/test-client';

describe('Scenario 3: Multi-Connection Downloader Simulation (Aria2 / curl / IDM)', () => {
  const server = new ConformanceTestServer();
  let client: ConformanceTestClient;
  const FILE_SIZE = 10000; // 10,000 bytes fixture file
  let originalMd5 = '';

  before(async () => {
    await server.start();
    client = new ConformanceTestClient(server.baseUrl);

    // Create a 10KB binary fixture with unique pseudorandom byte patterns
    const { md5 } = server.createBinaryFixture('archive.bin', FILE_SIZE, 'ARCHIVE_EOF_SIGNATURE');
    originalMd5 = md5;
  });

  after(async () => {
    await server.stop();
  });

  it('Step 1: HEAD probe verifies range support and total file size', async () => {
    await client
      .head('/archive.bin')
      .expectStatus(200)
      .expectHeader('accept-ranges', 'bytes')
      .expectHeader('content-length', String(FILE_SIZE));
  });

  it('Step 2: Concurrent multi-chunk download with final chunk extending past EOF', async () => {
    // 4 concurrent workers with fixed 2500-byte block requests
    // Notice chunk 4 specifies 7500-15000 (overshooting the 10000 byte file)
    const chunkPlans = [
      { start: 0, requestedEnd: 2499, expectedStart: 0, expectedEnd: 2499, expectedLen: 2500 },
      { start: 2500, requestedEnd: 4999, expectedStart: 2500, expectedEnd: 4999, expectedLen: 2500 },
      { start: 5000, requestedEnd: 7499, expectedStart: 5000, expectedEnd: 7499, expectedLen: 2500 },
      { start: 7500, requestedEnd: 15000, expectedStart: 7500, expectedEnd: 9999, expectedLen: 2500 }, // Clamped!
    ];

    // Dispatch all 4 workers in parallel
    const responses = await Promise.all(
      chunkPlans.map((plan) =>
        client
          .get('/archive.bin')
          .set('Range', `bytes=${plan.start}-${plan.requestedEnd}`)
          .expectStatus(206)
          .expectHeader('Content-Range', `bytes ${plan.expectedStart}-${plan.expectedEnd}/${FILE_SIZE}`)
          .expectHeader('Content-Length', String(plan.expectedLen))
      )
    );

    // Step 3: Reassemble downloaded chunks into complete file
    const assembledFile = Buffer.concat(responses.map((r) => r.rawBody));
    assert.equal(assembledFile.length, FILE_SIZE, 'Assembled file size must strictly equal original size');

    // Step 4: Verify cryptographic checksum matches original file 100%
    const assembledMd5 = responses[0].getMd5 ? Buffer.from(assembledFile) : assembledFile;
    const computedMd5 = require('crypto').createHash('md5').update(assembledFile).digest('hex');
    assert.equal(computedMd5, originalMd5, 'Assembled file MD5 checksum must be identical to source file');
  });

  it('Step 5: Resume interrupted download from specific offset (bytes=6000-)', async () => {
    // Simulate resumption after connection drop at byte 6000
    const res = await client
      .get('/archive.bin')
      .set('Range', 'bytes=6000-')
      .expectStatus(206)
      .expectHeader('Content-Range', `bytes 6000-9999/${FILE_SIZE}`)
      .expectHeader('Content-Length', '4000');

    assert.equal(res.rawBody.length, 4000);
  });
});
