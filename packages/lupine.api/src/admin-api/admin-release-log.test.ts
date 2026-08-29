import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'path';
import * as fs from 'fs/promises';
import os from 'os';
import { FsUtils } from '../lib/utils/fs-utils';
import { AdminRelease } from './admin-release';
import { apiCache } from '../api/api-cache';

test('AdminRelease Log Tailing & Rotation Recovery', async (t) => {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'lupine-log-test-'));
  const logDir = path.join(tmpDir, 'log');
  await fs.mkdir(logDir, { recursive: true });

  // Mock appData so apiCache.getAppData().apiPath points to tmpDir/server/server
  const fakeApiPath = path.join(tmpDir, 'server/server');
  apiCache.set(apiCache.KEYS.APP_DATA, {
    apiPath: fakeApiPath,
    webPath: tmpDir,
    dataPath: tmpDir,
    appRoot: tmpDir,
    isDev: true,
  } as any);

  const adminRelease = new AdminRelease();

  await t.test('FsUtils.readByteRange reads exact ranges', async () => {
    const testFile = path.join(logDir, 'test-range.txt');
    await fs.writeFile(testFile, '0123456789ABCDEF');
    const buf = await FsUtils.readByteRange(testFile, 4, 6);
    assert.equal(buf.toString('utf8'), '456789');
  });

  await t.test('Initial Tail Load on Single Active Log', async () => {
    const file0 = path.join(logDir, 'log-0.log');
    await fs.writeFile(file0, 'Line 1\nLine 2\nLine 3\n');

    const result = await adminRelease.readLogTail({ logName: 'log-0.log', initialBytes: 1024 });
    assert.equal(result.status, 'ok');
    assert.equal(result.content, 'Line 1\nLine 2\nLine 3\n');
    assert.equal(result.offset, (await fs.stat(file0)).size);
    assert.equal(result.rotated, false);
  });

  await t.test('Differential Polling without Rotation', async () => {
    const file0 = path.join(logDir, 'log-0.log');
    const stat1 = await fs.stat(file0);
    const initialOffset = stat1.size;

    // 1. Poll with same offset -> empty content
    const res1 = await adminRelease.readLogTail({
      logName: 'log-0.log',
      offset: initialOffset,
    });
    assert.equal(res1.status, 'ok');
    assert.equal(res1.content, '');
    assert.equal(res1.offset, initialOffset);

    // 2. Append new log line
    await fs.appendFile(file0, 'Line 4: newly appended log\n');

    // 3. Poll again -> receives only new line
    const res2 = await adminRelease.readLogTail({
      logName: 'log-0.log',
      offset: initialOffset,
    });
    assert.equal(res2.status, 'ok');
    assert.equal(res2.content, 'Line 4: newly appended log\n');
    assert.equal(res2.offset, (await fs.stat(file0)).size);
    assert.equal(res2.rotated, false);
  });

  await t.test('Differential Polling with Log Rotation Recovery', async () => {
    const file0 = path.join(logDir, 'log-0.log');
    const file1 = path.join(logDir, 'log-1.log');

    // Client is at offset 20 of log-0.log
    await fs.writeFile(file0, 'AAAAA\nBBBBB\nCCCCC\nDDDDD\n'); // 24 bytes
    const statBefore = await fs.stat(file0);
    const clientOffset = 12; // client has read up to "BBBBB\n"
    const clientFileId = `${statBefore.ino}_${statBefore.birthtimeMs || statBefore.ctimeMs || statBefore.mtimeMs}`;

    // Simulate real log rotation: copy to file1, unlink file0, create new file0
    await fs.copyFile(file0, file1);
    await fs.unlink(file0);
    await fs.writeFile(file0, 'EEEEE\nFFFFF\n'); // 12 bytes in new file0

    // Poll with clientOffset 12
    const result = await adminRelease.readLogTail({
      logName: 'log-0.log',
      offset: clientOffset,
      fileId: clientFileId,
    });

    assert.equal(result.status, 'ok');
    assert.equal(result.rotated, true);
    // Should have unread part from file1 ("CCCCC\nDDDDD\n") + new part from file0 ("EEEEE\nFFFFF\n")
    assert.equal(result.content, 'CCCCC\nDDDDD\nEEEEE\nFFFFF\n');
    assert.equal(result.offset, (await fs.stat(file0)).size);
  });

  await t.test('Initial Tail Load Spanning Across log-1.log and log-0.log', async () => {
    const file0 = path.join(logDir, 'log-0.log');
    const file1 = path.join(logDir, 'log-1.log');

    await fs.writeFile(file1, 'Part1_Log1_Content\n'); // 19 bytes
    await fs.writeFile(file0, 'Part2_Log0_Content\n'); // 19 bytes

    // Request initialBytes of 30 bytes -> takes 11 bytes tail of file1 + all 19 bytes of file0
    const result = await adminRelease.readLogTail({ logName: 'log-0.log', initialBytes: 30 });
    assert.equal(result.status, 'ok');
    assert.equal(result.content, 'g1_Content\nPart2_Log0_Content\n');
    assert.equal(result.offset, (await fs.stat(file0)).size);
  });

  // Cleanup tmp dir
  await fs.rm(tmpDir, { recursive: true, force: true }).catch(() => {});
});
