import test from 'node:test';
import assert from 'node:assert';
import { getDefaultDbConfig } from './db-config';

test('db-config test suite', async (t) => {
  const originalEnv = { ...process.env };

  t.afterEach(() => {
    // Reset process.env after each test
    for (const key of Object.keys(process.env)) {
      if (!(key in originalEnv)) {
        delete process.env[key];
      }
    }
    Object.assign(process.env, originalEnv);
  });

  await t.test('getDefaultDbConfig without MYSQL. env vars does not initialize mysqlConfig', () => {
    // Clean any MYSQL. env vars
    for (const key of Object.keys(process.env)) {
      if (key.startsWith('MYSQL.')) {
        delete process.env[key];
      }
    }

    const config = getDefaultDbConfig();
    assert.strictEqual(config.mysqlConfig, undefined);
    assert.strictEqual(config.type, 'sqlite');
  });

  await t.test('getDefaultDbConfig initializes mysqlConfig when MYSQL.XXX env vars are present', () => {
    process.env['MYSQL.WAIT_FOR_CONNECTIONS'] = 'false';
    process.env['MYSQL.QUEUE_LIMIT'] = '10';
    process.env['MYSQL.ENABLE_KEEP_ALIVE'] = 'false';
    process.env['MYSQL.KEEP_ALIVE_INITIAL_DELAY'] = '5000';
    process.env['MYSQL.SUPPORT_BIG_NUMBERS'] = 'false';
    process.env['MYSQL.BIG_NUMBER_STRINGS'] = 'true';
    process.env['MYSQL.DATE_STRINGS'] = 'DATE,DATETIME';

    const config = getDefaultDbConfig();
    assert.ok(config.mysqlConfig);
    assert.strictEqual(config.mysqlConfig.waitForConnections, false);
    assert.strictEqual(config.mysqlConfig.queueLimit, 10);
    assert.strictEqual(config.mysqlConfig.enableKeepAlive, false);
    assert.strictEqual(config.mysqlConfig.keepAliveInitialDelay, 5000);
    assert.strictEqual(config.mysqlConfig.supportBigNumbers, false);
    assert.strictEqual(config.mysqlConfig.bigNumberStrings, true);
    assert.deepStrictEqual(config.mysqlConfig.dateStrings, ['DATE', 'DATETIME']);
  });
});
