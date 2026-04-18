import test from 'node:test';
import assert from 'node:assert';
import type * as FsType from 'fs';
const fs: typeof FsType = require('fs');
import cluster from 'node:cluster';

import { Logger, LogWriter, LogWriterMessageId } from './logger';
import { LogLevels } from '../models/logger-props';

test('Logger Unit Tests (Native Node Runner)', async (t) => {
  // Global Mock States
  let existsResult = false;
  let fstatResult = { size: 1 };
  
  const writeLogs: string[] = [];
  const openCalls: string[] = [];
  const copyFileSyncCalls: {from: string, to: string}[] = [];
  const mkdirCalls: string[] = [];
  const closeCalls: number[] = [];

  // Intercept File System Operations
  t.mock.method(fs, 'openSync', (path: string) => {
    openCalls.push(path.replace(/\\/g, '/'));
    return 1;
  });
  t.mock.method(fs, 'existsSync', () => existsResult);
  t.mock.method(fs, 'fstatSync', () => fstatResult);
  t.mock.method(fs, 'mkdirSync', (dir: string) => {
    mkdirCalls.push(dir.replace(/\\/g, '/'));
  });
  t.mock.method(fs, 'closeSync', (fd: number) => {
    closeCalls.push(fd);
  });
  t.mock.method(fs, 'copyFileSync', (from: string, to: string) => {
    copyFileSyncCalls.push({ 
        from: from.replace(/\\/g, '/'), 
        to: to.replace(/\\/g, '/') 
    });
  });
  t.mock.method(fs, 'unlinkSync', () => {});
  t.mock.method(fs, 'writeFileSync', (fd: number, buf: any) => {
    writeLogs.push(buf.toString());
    fstatResult.size += buf.length;
  });

  // Intercept IPC process messaging out to master
  const processSendCalls: any[] = [];
  if (!process.send) {
    (process as any).send = () => false;
  }
  t.mock.method(process as any, 'send', (msg: any) => {
    processSendCalls.push(msg);
  });

  t.beforeEach(() => {
    // Reset singleton specifically
    LogWriter.instance = undefined;
    
    existsResult = false;
    fstatResult = { size: 1 };
    writeLogs.length = 0;
    openCalls.length = 0;
    copyFileSyncCalls.length = 0;
    mkdirCalls.length = 0;
    closeCalls.length = 0;
    processSendCalls.length = 0;

    // Reset cluster environment simulation
    (cluster as any).isPrimary = true;
  });

  await t.test('test init without recreating a file', () => {
    existsResult = false;

    const logger = new Logger('test1');
    // We intentionally bridge over the _init private hook via our native mocked configurations
    (LogWriter.getInstance() as any)._init({
      folder: './log',
      filename: 'log%index%.log',
      maxSize: 1024,
      maxCount: 5,
      outToFile: true,
      outToConsole: false,
      level: 'debug',
    });

    assert.strictEqual(mkdirCalls.length, 1);
    assert.ok(mkdirCalls[0].includes('log'));
    assert.strictEqual(openCalls.length, 1);
    assert.ok(openCalls[0].includes('log/log0.log'));
  });

  await t.test('test init, with recreating log file (rotation trigger on boot)', () => {
    existsResult = true; 
    // Emulate existing file bloated past the 10b maxSize limit
    fstatResult = { size: 1025 }; 

    const logger = new Logger('test2');
    (LogWriter.getInstance() as any)._init({
      folder: './log',
      filename: 'log%index%.log',
      maxSize: 10,
      maxCount: 5,
      outToFile: true,
      outToConsole: false,
      level: 'debug',
    });

    // Check sizes validation logically kicked rotation routines:
    assert.ok(closeCalls.includes(1));
    assert.ok(copyFileSyncCalls.some(c => c.from.includes('log0.log') && c.to.includes('log1.log')));
    assert.ok(openCalls[openCalls.length - 1].includes('log0.log'));
  });

  await t.test('test init, with recreating log file after sustained logs stream', () => {
    existsResult = true;
    fstatResult = { size: 9 };

    const logger = new Logger('test3');
    (LogWriter.getInstance() as any)._init({
      folder: './log',
      filename: 'log%index%.log',
      maxSize: 10,
      maxCount: 5,
      outToFile: true,
      outToConsole: false,
      level: 'debug',
    });

    // Send 9 bytes footprint
    logger.debug('a'.repeat(9));
    
    // Write out more payload; internally `savedSize` is added together 
    // breaking the 10b limits which subsequently enforces the `copyFileSync` rotation. 
    logger.debug('a'.repeat(2));

    assert.ok(closeCalls.length > 0);
    assert.ok(copyFileSyncCalls.some(c => c.from.includes('log0.log')));
  });

  await t.test('test complex log formats and string replacements', async () => {
    existsResult = true;
    fstatResult = { size: 9 };

    const logger = new Logger('test4');
    (LogWriter.getInstance() as any)._init({
      folder: './log',
      filename: 'log%index%.log',
      maxSize: 1024,
      maxCount: 5,
      outToFile: true,
      outToConsole: false,
      level: 'debug',
    });

    logger.debug(
      'log test. numer: %d, string: %s, json: %j',
      123,
      's456',
      { content_k: 'key', runtime_v: 789 }
    );
    
    const output = writeLogs[0];
    assert.ok(output.includes('test4'), 'Must embed caller namespace');
    assert.ok(output.includes('numer: 123'), 'Must utilize numerical regex');
    assert.ok(output.includes('string: s456'), 'Must compile raw string mapping');
    assert.ok(output.includes('{"content_k":"key","runtime_v":789}'), 'Must stringify JSON maps');
    assert.ok(output.endsWith('\r\n'));
  });

  await t.test('test strict log levels hierarchy (INFO drops DEBUG)', () => {
    existsResult = true;
    fstatResult = { size: 9 };

    const logger = new Logger('test5');
    (LogWriter.getInstance() as any)._init({
      folder: './log',
      filename: 'log%index%.log',
      maxSize: 1024,
      maxCount: 5,
      outToFile: true,
      outToConsole: false,
      level: 'info', 
    });

    logger.debug('unseen_debug_signal');
    logger.info('validated_info_signal');
    logger.warn('validated_warn_signal');
    logger.error('validated_error_signal');
    logger.fatal('validated_fatal_signal');

    const combinedOutput = writeLogs.join('');
    assert.strictEqual(combinedOutput.includes('unseen_debug_signal'), false);
    assert.ok(combinedOutput.includes('validated_info_signal'));
    assert.ok(combinedOutput.includes('validated_warn_signal'));
    assert.ok(combinedOutput.includes('validated_error_signal'));
    assert.ok(combinedOutput.includes('validated_fatal_signal'));
  });

  await t.test('test cluster Worker execution correctly buffers and maps messages to Primary', () => {
    const logger = new Logger('test6');
    (LogWriter.getInstance() as any)._init({
      folder: './log',
      filename: 'log%index%.log',
      maxSize: 1024,
      maxCount: 5,
      outToFile: true,
      outToConsole: false,
      level: 'debug',
    });

    // Mock dropping into a clustered Worker scenario
    (cluster as any).isPrimary = false;

    // Send payload; it should NOT touch JS `fs` APIs and instead utilize `process.send` IPC.
    logger.debug('ipc_payload, %d, %s', 1, '2');

    assert.strictEqual(processSendCalls.length, 1);
    assert.strictEqual(processSendCalls[0].level, 'DEBUG');
    assert.strictEqual(processSendCalls[0].namespace, 'test6');
    assert.strictEqual(processSendCalls[0].id, LogWriterMessageId);
    assert.strictEqual(processSendCalls[0].messageList[0], 'ipc_payload, %d, %s');
  });

  await t.test('test no file output', () => {
    const logger = new Logger('test7');
    (LogWriter.getInstance() as any)._init({
      folder: './log',
      filename: 'log%index%.log',
      maxSize: 1024,
      maxCount: 5,
      outToFile: false,
      outToConsole: true, // we skip console mocking to avoid terminal noise
      level: 'debug',
    });

    logger.debug('debug console output');
    
    // File hooks should remain dead silent.
    console.log('writeLogs contents:', writeLogs); assert.strictEqual(writeLogs.length, 0); 
  });
});
