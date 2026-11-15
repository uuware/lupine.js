import test from 'node:test';
import assert from 'node:assert';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { coordinator } = require('./lupine-build.js');

test('BuildCoordinator coordination tests', async (t) => {
  coordinator.waitServerReady = async () => true;
  coordinator.waitPortClosed = async () => true;

  await t.test('1. Multiple client builds batch and send single refresh after all finish', async () => {
    let refreshCount = 0;
    let restartCount = 0;

    // Reset coordinator state
    coordinator.init({ isDev: true, npmCmd: 'test-cmd', httpPort: '9999' });
    coordinator.setInitialized(true);
    coordinator.activeBuilds.clear();
    coordinator.serverChanged = false;
    coordinator.clientChanged = false;
    if (coordinator.settleTimer) clearTimeout(coordinator.settleTimer);

    // Mock methods
    coordinator.refreshServer = async () => {
      refreshCount++;
    };
    coordinator.restartServer = async () => {
      restartCount++;
    };

    // Simulate 3 client builds starting
    coordinator.onBuildStart('client:app1:0', 'client');
    coordinator.onBuildStart('client:app2:0', 'client');
    coordinator.onBuildStart('client:app3:0', 'client');

    assert.strictEqual(coordinator.activeBuilds.size, 3);
    assert.strictEqual(coordinator.clientChanged, true);

    // App 1 finishes
    coordinator.onBuildEnd('client:app1:0', 'client');
    assert.strictEqual(coordinator.activeBuilds.size, 2);
    assert.strictEqual(coordinator.settleTimer, null); // should not settle yet

    // App 2 finishes
    coordinator.onBuildEnd('client:app2:0', 'client');
    assert.strictEqual(coordinator.activeBuilds.size, 1);
    assert.strictEqual(coordinator.settleTimer, null); // still not settle

    // App 3 finishes
    coordinator.onBuildEnd('client:app3:0', 'client');
    assert.strictEqual(coordinator.activeBuilds.size, 0);
    assert.notStrictEqual(coordinator.settleTimer, null); // settle timer started

    // Wait for settle timer (400ms + margin)
    await new Promise((r) => setTimeout(r, 600));

    assert.strictEqual(restartCount, 0, 'Server should not restart');
    assert.strictEqual(refreshCount, 1, 'Should send refresh exactly once');
  });

  await t.test('2. Build re-triggered while compiling postpones refresh', async () => {
    let refreshCount = 0;

    coordinator.init({ isDev: true, npmCmd: 'test-cmd', httpPort: '9999' });
    coordinator.setInitialized(true);
    coordinator.activeBuilds.clear();
    coordinator.serverChanged = false;
    coordinator.clientChanged = false;
    if (coordinator.settleTimer) clearTimeout(coordinator.settleTimer);

    coordinator.refreshServer = async () => {
      refreshCount++;
    };

    // Build starts
    coordinator.onBuildStart('client:app1:0', 'client');
    coordinator.onBuildEnd('client:app1:0', 'client');
    assert.notStrictEqual(coordinator.settleTimer, null);

    // Before 400ms settle timer expires, file changes again and rebuild triggers!
    await new Promise((r) => setTimeout(r, 100));
    coordinator.onBuildStart('client:app1:0', 'client');

    // Settle timer should be cancelled
    assert.strictEqual(coordinator.settleTimer, null);
    assert.strictEqual(coordinator.activeBuilds.size, 1);

    // Wait past original settle time
    await new Promise((r) => setTimeout(r, 350));
    assert.strictEqual(refreshCount, 0, 'Must NOT refresh while re-triggered build is active');

    // Re-triggered build finishes
    coordinator.onBuildEnd('client:app1:0', 'client');
    assert.notStrictEqual(coordinator.settleTimer, null);

    // Wait for settle timer
    await new Promise((r) => setTimeout(r, 600));
    assert.strictEqual(refreshCount, 1, 'Should refresh once after re-triggered build completes');
  });

  await t.test('3. Server and client builds trigger server restart then refresh', async () => {
    let callOrder = [];

    coordinator.init({ isDev: true, npmCmd: 'test-cmd', httpPort: '9999' });
    coordinator.setInitialized(true);
    coordinator.activeBuilds.clear();
    coordinator.serverChanged = false;
    coordinator.clientChanged = false;
    if (coordinator.settleTimer) clearTimeout(coordinator.settleTimer);

    coordinator.restartServer = async () => {
      callOrder.push('restart');
    };
    coordinator.refreshServer = async () => {
      callOrder.push('refresh');
    };

    // Server and client builds start concurrently
    coordinator.onBuildStart('server', 'server');
    coordinator.onBuildStart('client:app1:0', 'client');

    assert.strictEqual(coordinator.serverChanged, true);
    assert.strictEqual(coordinator.clientChanged, true);

    // Client finishes first
    coordinator.onBuildEnd('client:app1:0', 'client');
    assert.strictEqual(coordinator.activeBuilds.size, 1);

    // Server finishes
    coordinator.onBuildEnd('server', 'server');
    assert.strictEqual(coordinator.activeBuilds.size, 0);

    // Wait for settle
    await new Promise((r) => setTimeout(r, 600));

    assert.deepStrictEqual(callOrder, ['restart', 'refresh'], 'Must restart server first, then refresh');
  });

  await t.test('4. Change during server restart postpones refresh', async () => {
    let refreshCount = 0;
    let restartCount = 0;

    coordinator.init({ isDev: true, npmCmd: 'test-cmd', httpPort: '9999' });
    coordinator.setInitialized(true);
    coordinator.activeBuilds.clear();
    coordinator.serverChanged = false;
    coordinator.clientChanged = false;
    if (coordinator.settleTimer) clearTimeout(coordinator.settleTimer);

    coordinator.restartServer = async () => {
      restartCount++;
      // Simulate slow server restart during which a client file changes!
      await new Promise((r) => setTimeout(r, 200));
      coordinator.onBuildStart('client:app2:0', 'client');
    };
    coordinator.refreshServer = async () => {
      refreshCount++;
    };

    coordinator.onBuildStart('server', 'server');
    coordinator.onBuildEnd('server', 'server');

    // Wait for settle timer (400ms) + restartServer (200ms) + margin
    await new Promise((r) => setTimeout(r, 750));

    // At this point restartServer finished, but client:app2:0 was triggered during restart and is compiling!
    assert.strictEqual(restartCount, 1);
    assert.strictEqual(refreshCount, 0, 'Should not refresh because client:app2:0 is compiling');
    assert.strictEqual(coordinator.activeBuilds.size, 1);

    // Now client:app2:0 finishes
    coordinator.onBuildEnd('client:app2:0', 'client');
    assert.strictEqual(coordinator.activeBuilds.size, 0);

    // Wait for second settle (400ms + margin)
    await new Promise((r) => setTimeout(r, 600));

    assert.strictEqual(refreshCount, 1, 'Should refresh after client:app2:0 finishes');
  });
});
