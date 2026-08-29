import test from 'node:test';
import assert from 'node:assert';
import { DbOracle, DbOracleTransaction } from './db-oracle';
import { DbHelper } from './db-helper';
import { getDefaultDbConfig } from './db-helper';

test('Test DbOracle Driver and Dialect Encapsulation', async (t) => {
  const oracleConfig = {
    ...getDefaultDbConfig(),
    type: 'oracle',
    host: process.env['ORACLE_HOST'] || '127.0.0.1',
    port: Number(process.env['ORACLE_PORT']) || 1521,
    user: process.env['ORACLE_USER'] || 'system',
    password: process.env['ORACLE_PASSWORD'] || 'OraclePassword123!',
    database: process.env['ORACLE_DATABASE'] || 'XE',
    tablePrefix: 'tbl_',
  };

  const db = new DbOracle(oracleConfig);

  await t.test('test Oracle dialect query helpers and escaping', async () => {
    // 1. Identifier Escaping (Double quotes)
    assert.strictEqual(db.escapeId('key'), '"key"');
    assert.strictEqual(db.escapeId('order'), '"order"');
    assert.strictEqual(db.escapeId('user.name'), '"user"."name"');
    assert.strictEqual(db.escapeId('*'), '*');
    assert.strictEqual(db.escapeId('"already_escaped"'), '"already_escaped"');

    // 2. Random ordering function
    assert.strictEqual(db.getRandomOrder(), 'DBMS_RANDOM.VALUE');

    // 3. String concatenation
    assert.strictEqual(
      db.getConcatSql('first_name', "' '", 'last_name'),
      "(first_name || ' ' || last_name)"
    );

    // 4. Timestamp expression
    assert.strictEqual(
      db.getCurrentTimestampSql(),
      "((CAST(SYS_EXTRACT_UTC(SYSTIMESTAMP) AS DATE) - DATE '1970-01-01') * 86400)"
    );
  });

  await t.test('test prefix replacement and table formatting', async () => {
    const rawSql = 'SELECT * FROM $__users WHERE note = "$__leave_as_is"';
    const replaced = db.replacePrefix(rawSql);
    assert.strictEqual(replaced, 'SELECT * FROM tbl_users WHERE note = "$__leave_as_is"');
  });

  await t.test('test DbHelper factory instantiation for oracle', async () => {
    const instance = new DbOracle(oracleConfig);
    assert.ok(instance instanceof DbOracle);
    assert.strictEqual(instance.type, 'oracle');

    try {
      const helperInstance = await DbHelper.createInstance(oracleConfig);
      assert.ok(helperInstance instanceof DbOracle);
    } catch (e: any) {
      assert.ok(
        e.message.includes('oracledb') || e.message.includes('Failed to connect') || e.message.includes('NJS-')
      );
    }
  });

  await t.test('test Oracle transaction wrapper and dialect bindings', async () => {
    const mockConnection = {};
    const trxDb = new DbOracleTransaction(oracleConfig, mockConnection);
    assert.strictEqual(trxDb.type, 'oracle');
    assert.strictEqual(trxDb.escapeId('status'), '"status"');
  });

  // Pre-check if real Oracle instance is reachable
  let isOracleReachable = false;
  try {
    isOracleReachable = await db.testConnection();
  } catch {
    isOracleReachable = false;
  }

  if (!isOracleReachable) {
    t.diagnostic('Oracle instance not reachable on 127.0.0.1:1521, skipping live integration tests.');
    return;
  }

  await t.test('test live Oracle connection and transactions', async () => {
    try {
      await db.execute('DROP TABLE tbl_lorem_oracle');
    } catch {
      // ignore
    }

    await db.execute(`
      CREATE TABLE tbl_lorem_oracle (
        id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        info VARCHAR2(255),
        num NUMBER
      )
    `);

    await db.transaction(async (trx) => {
      await trx.insertObject('$__lorem_oracle', { info: 'trx_1', num: 100 });
      await trx.insertObject('$__lorem_oracle', { info: 'trx_2', num: 200 });
    });

    const rows = await db.selectObject('$__lorem_oracle', ['info', 'num'], { num: 100 });
    assert.strictEqual(rows.length, 1);

    await db.execute('DROP TABLE tbl_lorem_oracle');
    await db.close();
  });
});
