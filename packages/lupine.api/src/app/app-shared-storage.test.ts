import test from 'node:test';
import assert from 'node:assert';
import cluster from 'node:cluster';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as os from 'os';
import { appStorage } from './app-shared-storage';
import { StorageMessageFromSubProcess } from '../models';

test('AppSharedStorage - IPC Concurrency & Async Callbacks', async (t) => {
  const originalIsPrimary = cluster.isPrimary;
  const originalProcessSend = process.send;
  const originalWorkers = cluster.workers;
  
  // Storage to capture mock IPC calls
  const mockPrimaryMemory: Record<string, string> = {
    'key-1': 'val1',
    'WEB.key-2': 'web-val2',
    'key-3': 'val3',
  };

  await t.test('Worker concurrent async get() resolution', async () => {
    // 1. Mock as WORKER
    (cluster as any).isPrimary = false;
    (cluster as any).worker = { id: 99 };
    
    let sentToPrimary: StorageMessageFromSubProcess[] = [];
    
    // Mock process.send (Worker sending message to Primary)
    process.send = (msg: any) => {
      sentToPrimary.push(msg);
      return true;
    };

    // 2. Trigger concurrent async gets from the pseudo-worker
    // These promises will block and wait for uniqueKey routing!
    const promise1 = appStorage.get('test_app', 'key-1');
    const promise2 = appStorage.getWithPrefix('test_app', 'WEB.'); // Using getWithPrefix!
    const promise3 = appStorage.get('test_app', 'key-3');

    // 3. Verify that 3 separate IPC requests were queued out to the Primary
    assert.strictEqual(sentToPrimary.length, 3);
    assert.strictEqual(sentToPrimary[0].action, 'get');
    assert.strictEqual(sentToPrimary[1].action, 'getWithPrefix');
    
    // 4. Simulate Primary processing the queue with intentional ASYNC LAG & OUT-OF-ORDER responses
    const respondFromFakePrimary = async (msg: StorageMessageFromSubProcess, delayMs: number) => {
      setTimeout(() => {
        let responseValue: any;
        if (msg.action === 'getWithPrefix') {
          // If expecting prefix, primary physically searches and returns a stringified JSON
          const matchedPairs: any = {};
          for (let k in mockPrimaryMemory) {
            if (k.startsWith(msg.key)) matchedPairs[k] = mockPrimaryMemory[k];
          }
          responseValue = JSON.stringify(matchedPairs);
        } else {
          // Normal get returns single value directly
          responseValue = mockPrimaryMemory[msg.key];
        }

        const returnMsg: StorageMessageFromSubProcess = {
          ...msg,
          value: responseValue
        };
        (appStorage as any).messageFromPrimaryProcess(returnMsg);
      }, delayMs);
    };

    // Simulate returning them out of order
    respondFromFakePrimary(sentToPrimary[0], 50);  // key-1 resolves in 50ms
    respondFromFakePrimary(sentToPrimary[2], 10);  // key-3 resolves fast! 10ms
    respondFromFakePrimary(sentToPrimary[1], 100); // WEB. resolves slow! 100ms

    // 5. Await all pseudo-worker requests.
    // If the uniqueHandles mix up data, or if handleMap overwrites concurrent keys, this will fail!
    const results = await Promise.all([promise1, promise2, promise3]);
    
    assert.strictEqual(results[0], 'val1');
    assert.deepStrictEqual(results[1], { 'WEB.key-2': 'web-val2' });
    assert.strictEqual(results[2], 'val3');
  });

  await t.test('Worker async set() and setWeb() dispatch correctly without hanging', async () => {
    let sentToPrimary: StorageMessageFromSubProcess[] = [];
    process.send = (msg: any) => {
      sentToPrimary.push(msg);
      return true;
    };

    appStorage.set('test_app', 'key-4', 'val4');
    appStorage.setWeb('test_app', 'key-5', 'web-val5');

    assert.strictEqual(sentToPrimary.length, 2);
    
    assert.strictEqual(sentToPrimary[0].action, 'set');
    assert.strictEqual(sentToPrimary[0].appName, 'test_app');
    assert.strictEqual(sentToPrimary[0].key, 'key-4');
    assert.strictEqual(sentToPrimary[0].value, 'val4');

    assert.strictEqual(sentToPrimary[1].action, 'set');
    assert.strictEqual(sentToPrimary[1].key, 'WEB.key-5'); // Ensure setWeb prepends WEB.
    assert.strictEqual(sentToPrimary[1].value, 'web-val5');
  });

  await t.test('Primary file load/save with Mutex concurrency', async () => {
    // 1. Ensure we are in Primary mode for Direct Disk IO testing
    (cluster as any).isPrimary = true;
    
    // 2. Setup a clean Temporary Path
    const tempDirPrefix = path.join(os.tmpdir(), 'lupine-app-storage-test-');
    const tempDir = await fs.mkdtemp(tempDirPrefix);
    const mockAppName = 'demo_mutex_app';

    try {
      // 3. Test Load (should silently fail/fallback to empty memory since config.json not present)
      await appStorage.load(mockAppName, tempDir);
      
      // Inject some dirty data that needs to be saved
      appStorage.set(mockAppName, 'target-1', { safe: true });
      appStorage.set(mockAppName, 'target-2', 'racing test');
      
      // 4. Test Concurrent Mutex Save Racing!
      // We trigger 10 rapid concurrent save requests.
      // If `saveLocks` mutex queue fails, fs.rename / fs.writeFile will collide 
      // on 'config.json.tmp' throwing EBUSY or collapsing the file bytes.
      const savePromises: Promise<void>[] = [];
      for (let i = 0; i < 10; i++) {
        savePromises.push(appStorage.save(mockAppName));
      }
      
      // If the mutex works, they resolve peacefully entirely sequentially
      await Promise.all(savePromises);

      // 5. Verify the generated integrity
      const finalConfigPath = path.join(tempDir, 'config.json');
      const savedStat = await fs.stat(finalConfigPath);
      assert.ok(savedStat.size > 0, 'Config file should have actual bytes written.');

      const fileContent = await fs.readFile(finalConfigPath, 'utf8');
      const parsed = JSON.parse(fileContent);

      assert.deepStrictEqual(parsed['target-1'], { safe: true });
      assert.strictEqual(parsed['target-2'], 'racing test');

    } finally {
      // Cleanup Temp Directory
      await fs.rm(tempDir, { recursive: true, force: true });
    }
  });

  // Restore environment safely
  (cluster as any).isPrimary = originalIsPrimary;
  process.send = originalProcessSend;
  (cluster as any).workers = originalWorkers;
});
