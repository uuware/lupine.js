import test from 'node:test';
import assert from 'node:assert';
import cluster from 'node:cluster';
import { processMessageFromWorker, processMessageFromPrimary } from './app-message';
import { appHelper } from './app-helper';
import { getAppCache, AppCacheKeys } from '../models';
import { DevServiceProxyServer } from './dev-service-proxy-server';
test('AppMessage IPC Routing - Cache Refresh Broadcast Loop', async (t) => {
  const originalWorkers = cluster.workers;
  const originalGetAppCache = getAppCache;

  // 1. Setup specific test mocks
  let worker1ReceivedMessages: any[] = [];
  let worker2ReceivedMessages: any[] = [];

  const fakeWorker1: any = { id: 1, send: (msg: any) => worker1ReceivedMessages.push(msg) };
  const fakeWorker2: any = { id: 2, send: (msg: any) => worker2ReceivedMessages.push(msg) };

  (cluster as any).workers = { '1': fakeWorker1, '2': fakeWorker2 };

  // Spies to track method executions downstream
  let refreshApiCallCount = 0;
  let broadcastRefreshCallCount = 0;

  t.mock.method(appHelper, 'refreshApi', (config: any) => {
    refreshApiCallCount++;
  });

  DevServiceProxyServer.broadcastRefresh = () => {};
  t.mock.method(DevServiceProxyServer as any, 'broadcastRefresh', () => {
    broadcastRefreshCallCount++;
  });

  // Inject a mock cache mechanism to satisfy getAppCache() inside processDebugMessage constraints
  const fakeAppCache: any = {
    set: () => {},
    get: (context: string, key: string) => {
      if (key === AppCacheKeys.APP_LIST) return ['test_app'];
      if (key === AppCacheKeys.API_CONFIG) return { isFakeConfig: true };
      return null;
    }
  };
  const { setAppCache } = require('../models');
  setAppCache(fakeAppCache);

  try {
    await t.test('Phase 1: Primary receives request and Broadcasts to all Workers', async () => {
      // Worker triggers: process.send({ id: 'debug', message: 'refresh', appName: 'test_app' })
      // Primary receives this via worker.on('message', processMessageFromWorker)
      
      const payload = { id: 'debug', message: 'refresh', appName: 'test_app' };
      
      // Simulate Primary Execution
      processMessageFromWorker(payload);

      // Verify broadcast actually traversed the cluster.workers map and hit both workers
      assert.strictEqual(worker1ReceivedMessages.length, 1);
      assert.deepStrictEqual(worker1ReceivedMessages[0], payload);
      
      assert.strictEqual(worker2ReceivedMessages.length, 1);
      assert.deepStrictEqual(worker2ReceivedMessages[0], payload);
    });

    await t.test('Phase 2: Worker receives broadcast and Triggers App De-cache', async () => {
      // The broadcast triggers worker's: process.on('message', processMessageFromPrimary)
      const payload = { id: 'debug', message: 'refresh', appName: 'test_app' };

      // Simulate Worker Execution
      processMessageFromPrimary(payload);

      // Verify `appHelper.refreshApi` was called to clear the designated App Route Cache
      assert.strictEqual(refreshApiCallCount, 1);

      // Verify `DebugService.broadcastRefresh` was called to notify connected Client Websockets to reload
      assert.strictEqual(broadcastRefreshCallCount, 1);
    });

    await t.test('Phase 3: Worker handles global broadcast correctly (No appName)', async () => {
      // If no appName is specified, processDebugMessage loops through APP_LIST
      const globalPayload = { id: 'debug', message: 'refresh' }; // appName missing!

      // Simulate Worker Execution
      processMessageFromPrimary(globalPayload);

      // Verify appHelper.refreshApi was executed targeting everything in APP_LIST
      assert.strictEqual(refreshApiCallCount, 2); // 1 + 1 (the missing appName loops everything)
      assert.strictEqual(broadcastRefreshCallCount, 2);
    });

  } finally {
    // Restore Node APIs
    (cluster as any).workers = originalWorkers;
  }
});
