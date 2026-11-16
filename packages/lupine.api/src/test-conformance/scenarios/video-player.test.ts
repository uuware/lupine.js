import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { ConformanceTestServer } from '../harness/test-server';
import { ConformanceTestClient } from '../harness/test-client';

describe('Scenario 1: HTML5 Video Player Simulation (Chrome/Safari/VLC)', () => {
  const server = new ConformanceTestServer();
  let client: ConformanceTestClient;
  const VIDEO_SIZE = 10 * 1024 * 1024; // 10 MB mock video
  const MOOV_TRAILER = '----MOOV_INDEX_ATOM_DATA----';
  let videoEtag = '';

  before(async () => {
    await server.start();
    client = new ConformanceTestClient(server.baseUrl);

    // Create 10MB simulated video file with trailing MOOV index
    server.createBinaryFixture('stream.mp4', VIDEO_SIZE, MOOV_TRAILER);

    // Initial probe to capture ETag
    const headRes = await client.head('/stream.mp4').expectStatus(200);
    videoEtag = headRes.headers.etag as string;
    assert.ok(videoEtag, 'Video file must have ETag');
  });

  after(async () => {
    await server.stop();
  });

  it('Step 1: Probe metadata trailer at EOF via suffix range (bytes=-32)', async () => {
    // Browsers like Chrome issue a small suffix request to parse container metadata
    const trailerLength = MOOV_TRAILER.length;
    const res = await client
      .get('/stream.mp4')
      .set('Range', `bytes=-${trailerLength}`)
      .expectStatus(206)
      .expectHeader('Content-Range', `bytes ${VIDEO_SIZE - trailerLength}-${VIDEO_SIZE - 1}/${VIDEO_SIZE}`)
      .expectHeader('Content-Length', String(trailerLength));

    assert.equal(res.text, MOOV_TRAILER);
  });

  it('Step 2: Buffer initial video stream segment (bytes=0-131071)', async () => {
    const res = await client
      .get('/stream.mp4')
      .set('Range', 'bytes=0-131071')
      .expectStatus(206)
      .expectHeader('Content-Range', `bytes 0-131071/${VIDEO_SIZE}`)
      .expectHeader('Content-Length', '131072');

    assert.equal(res.rawBody.length, 131072);
  });

  it('Step 3: Scrub/Seek timeline - aborts current download and requests new position', async () => {
    // User drags timeline: client terminates in-flight stream mid-transfer
    const abortedRes = await client
      .get('/stream.mp4')
      .set('Range', 'bytes=131072-1048575')
      .abortAfterBytes(4096);

    assert.equal(abortedRes.abortedEarly, true);
    assert.ok(abortedRes.rawBody.length >= 4096);

    // Immediately request new target seek segment (e.g. at 5MB offset)
    const seekRes = await client
      .get('/stream.mp4')
      .set('Range', 'bytes=5242880-5373951')
      .expectStatus(206)
      .expectHeader('Content-Range', `bytes 5242880-5373951/${VIDEO_SIZE}`)
      .expectHeader('Content-Length', '131072');

    assert.equal(seekRes.rawBody.length, 131072);
  });

  it('Step 4: If-Range conditional request - 206 when matching, 200 when video updated', async () => {
    // Valid If-Range returns requested slice
    await client
      .get('/stream.mp4')
      .set('Range', 'bytes=0-99')
      .set('If-Range', videoEtag)
      .expectStatus(206)
      .expectHeader('Content-Range', `bytes 0-99/${VIDEO_SIZE}`)
      .expectHeader('Content-Length', '100');

    // Mismatched If-Range (video was re-encoded) must fallback to 200 with complete file
    const fallbackRes = await client
      .get('/stream.mp4')
      .set('Range', 'bytes=0-99')
      .set('If-Range', '"stale-etag-from-previous-render"')
      .expectStatus(200)
      .expectHeader('Content-Length', String(VIDEO_SIZE));

    assert.equal(fallbackRes.rawBody.length, VIDEO_SIZE);
  });
});
