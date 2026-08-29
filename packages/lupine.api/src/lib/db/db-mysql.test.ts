import test from 'node:test';
import assert from 'node:assert';
import { DbMysql } from './db-mysql';
import { DbHelper } from './db-helper';
import { getDefaultDbConfig } from './db-helper';

test('Test DbMysql encapsulation with MySQL database', async (t) => {
  let db: DbMysql;

  const testConfig = {
    ...getDefaultDbConfig(),
    type: 'mysql',
    host: process.env['DB_HOST'] || '127.0.0.1',
    port: Number(process.env['DB_PORT']) || 3306,
    user: process.env['DB_USER'] || 'root',
    password: process.env['DB_PASSWORD'] || '123456@app',
    database: process.env['DB_DATABASE'] || 'app',
    tablePrefix: 'tbl_',
  };

  // Pre-check if MySQL instance is reachable
  let isMysqlReachable = false;
  try {
    const probeDb = new DbMysql(testConfig);
    isMysqlReachable = await probeDb.testConnection();
    await probeDb.close();
  } catch {
    isMysqlReachable = false;
  }

  if (!isMysqlReachable) {
    t.diagnostic('MySQL instance not reachable on 127.0.0.1:3306, skipping live MySQL integration tests.');
    return;
  }

  t.beforeEach(async () => {
    db = (await DbHelper.createInstance(testConfig)) as DbMysql;

    // Setup ephemeral tables for tests
    await db.execute(`
      CREATE TABLE IF NOT EXISTS tbl_lorem_test (
        id INT AUTO_INCREMENT PRIMARY KEY,
        info VARCHAR(255),
        num INT,
        state VARCHAR(50),
        active TINYINT DEFAULT 0
      );
    `);
    await db.execute(`
      CREATE TABLE IF NOT EXISTS tbl_dummy_test (
        val VARCHAR(255)
      );
    `);
    await db.execute(`
      CREATE TABLE IF NOT EXISTS tbl_reserved_test (
        id INT AUTO_INCREMENT PRIMARY KEY,
        \`key\` VARCHAR(100),
        \`order\` INT,
        \`group\` VARCHAR(100)
      );
    `);
    await db.truncateTable('tbl_lorem_test');
    await db.truncateTable('tbl_dummy_test');
    await db.truncateTable('tbl_reserved_test');
  });

  t.afterEach(async () => {
    try {
      await db.execute('DROP TABLE IF EXISTS tbl_lorem_test');
      await db.execute('DROP TABLE IF EXISTS tbl_dummy_test');
      await db.execute('DROP TABLE IF EXISTS tbl_reserved_test');
    } catch {
      // ignore cleanup errors
    }
    await db.close();
  });

  await t.test('test raw native connection execution', async () => {
    await db.execute('INSERT INTO tbl_lorem_test (info, num) VALUES (?, ?)', ['Ipsum 0', 100]);
    await db.execute('INSERT INTO tbl_lorem_test (info, num) VALUES (?, ?)', ['Ipsum 1', 101]);

    const results = await db.select<{ id: number; info: string; num: number }>('SELECT id, info, num FROM tbl_lorem_test ORDER BY id ASC');
    assert.strictEqual(results.length, 2);
    assert.strictEqual(results[0].info, 'Ipsum 0');
    assert.strictEqual(results[1].num, 101);
  });

  await t.test('test prefix replacement mechanism ($__ conversion)', async () => {
    const rawSql = 'INSERT INTO $__lorem_test (info, num) VALUES (?, ?)';
    await db.execute(rawSql, ['Test Prefix', 999]);

    const results = await db.select('SELECT * FROM $__lorem_test WHERE num = ?', [999]);
    assert.strictEqual(results.length, 1);
    assert.strictEqual(results[0].info, 'Test Prefix');

    // Test backtick-enclosed table prefix replacement
    const backtickSql = 'SELECT * FROM `$__lorem_test` WHERE info = ?';
    const backtickResults = await db.select(backtickSql, ['Test Prefix']);
    assert.strictEqual(backtickResults.length, 1);
  });

  await t.test('test ORM structured object querying routines', async () => {
    // Testing `.insertObject`
    const insertRes = await db.insertObject('$__lorem_test', { info: 'obj_insert', num: 777 });
    assert.ok(insertRes && insertRes.length > 0);
    assert.ok(insertRes[0].id !== undefined || insertRes[0].insertId !== undefined);

    // Testing `.selectObject`
    const results = await db.selectObject<{ info: string; num: number }>('$__lorem_test', ['info', 'num'], { num: 777 });
    assert.strictEqual(results.length, 1);
    assert.strictEqual(results[0].info, 'obj_insert');

    // Testing `.selectOneRow`
    const singleRow = await db.selectOneRow<{ info: string }>('$__lorem_test', ['info'], { num: 777 });
    assert.ok(singleRow);
    assert.strictEqual(singleRow.info, 'obj_insert');

    // Testing `.selectOneResult`
    const singleField = await db.selectOneResult<string>('$__lorem_test', 'info', { num: 777 });
    assert.strictEqual(singleField, 'obj_insert');
  });

  await t.test('test ORM structured object UPDATE computations', async () => {
    await db.insertObject('$__lorem_test', { info: 'to_be_updated', num: 10 });

    // Assert static update values
    await db.updateObject('$__lorem_test', { info: 'updated_successfully' }, { num: 10 });
    const afterUpdate = await db.selectOneRow<{ info: string }>('$__lorem_test', ['info'], { num: 10 });
    assert.ok(afterUpdate);
    assert.strictEqual(afterUpdate.info, 'updated_successfully');

    // Assert computational expressions evaluation (using new 'expression' prop)!
    await db.updateObject(
      '$__lorem_test',
      { num: { expression: 'num + ?', params: [5] } },
      { info: 'updated_successfully' }
    );
    const afterExprUpdate = await db.selectOneRow<{ num: number }>('$__lorem_test', ['num'], { info: 'updated_successfully' });
    assert.ok(afterExprUpdate);
    assert.strictEqual(afterExprUpdate.num, 15);
  });

  await t.test('test ORM structured object removals', async () => {
    await db.insertObject('$__lorem_test', { info: 'to_be_deleted', num: 99 });

    let count = await db.selectOneResult('$__lorem_test', 'COUNT(*)', { num: 99 });
    assert.strictEqual(Number(count), 1);

    await db.deleteObject('$__lorem_test', { num: 99 });

    count = await db.selectOneResult('$__lorem_test', 'COUNT(*)', { num: 99 });
    assert.strictEqual(Number(count), 0);
  });

  await t.test('test rich WHERE clause (IS NULL, IN array, boolean)', async () => {
    await db.insertObject('$__lorem_test', { info: 'item1', num: 1, state: null, active: true });
    await db.insertObject('$__lorem_test', { info: 'item2', num: 2, state: 'done', active: false });
    await db.insertObject('$__lorem_test', { info: 'item3', num: 3, state: 'done', active: true });

    // Test IS NULL
    const nullRows = await db.selectObject('$__lorem_test', undefined, { state: null });
    assert.strictEqual(nullRows.length, 1);
    assert.strictEqual(nullRows[0].info, 'item1');

    // Test IN array
    const inRows = await db.selectObject('$__lorem_test', undefined, { num: [1, 3] });
    assert.strictEqual(inRows.length, 2);

    // Test boolean conversion
    const activeRows = await db.selectObject('$__lorem_test', undefined, { active: true });
    assert.strictEqual(activeRows.length, 2);
  });

  await t.test('test reserved keywords escaping (key, order, group)', async () => {
    await db.insertObject('$__reserved_test', { key: 'secret_key', order: 1, group: 'admin' });

    const row = await db.selectOneRow<{ key: string; order: number; group: string }>(
      '$__reserved_test',
      ['key', 'order', 'group'],
      { key: 'secret_key', order: 1 }
    );
    assert.ok(row);
    assert.strictEqual(row.key, 'secret_key');
    assert.strictEqual(row.group, 'admin');

    await db.updateObject('$__reserved_test', { group: 'superadmin' }, { key: 'secret_key' });
    const updated = await db.selectOneResult('$__reserved_test', 'group', { key: 'secret_key' });
    assert.strictEqual(updated, 'superadmin');

    await db.deleteObject('$__reserved_test', { key: 'secret_key' });
    const count = await db.getTableCount('$__reserved_test');
    assert.strictEqual(count, 0);
  });

  await t.test('test transaction commit and rollback', async () => {
    // 1. Successful transaction commit
    await db.transaction(async (trx) => {
      await trx.insertObject('$__lorem_test', { info: 'trx_item_1', num: 1001 });
      await trx.insertObject('$__lorem_test', { info: 'trx_item_2', num: 1002 });
    });

    const rowsAfterCommit = await db.selectObject('$__lorem_test', undefined, { num: [1001, 1002] });
    assert.strictEqual(rowsAfterCommit.length, 2);

    // 2. Rollback on transaction error
    await assert.rejects(async () => {
      await db.transaction(async (trx) => {
        await trx.insertObject('$__lorem_test', { info: 'trx_item_3', num: 1003 });
        throw new Error('Simulated failure during MySQL transaction');
      });
    }, /Simulated failure during MySQL transaction/);

    const rowsAfterRollback = await db.selectObject('$__lorem_test', undefined, { num: 1003 });
    assert.strictEqual(rowsAfterRollback.length, 0);
  });

  await t.test('test DbMysql extended table information utilities', async () => {
    await db.insertObject('tbl_lorem_test', { info: 'dummy1', num: 1 });
    await db.insertObject('tbl_lorem_test', { info: 'dummy2', num: 2 });

    // Testing `getTableCount`
    const count = await db.getTableCount('tbl_lorem_test');
    assert.strictEqual(count, 2);

    // Testing `getAllTables`
    const tablesWithoutCount = await db.getAllTables(false);
    assert.ok(Array.isArray(tablesWithoutCount));
    assert.ok(tablesWithoutCount.length > 0);
    assert.strictEqual(typeof tablesWithoutCount[0].count, 'undefined');

    const tablesWithCount = await db.getAllTables(true);
    const targetTableDef = tablesWithCount.find((t: any) => t.name === 'tbl_lorem_test');
    assert.ok(targetTableDef);
    assert.strictEqual(targetTableDef.count, 2);

    // Testing `getTableInfo`
    const schemaParts = await db.getTableInfo('tbl_dummy_test');
    assert.strictEqual(schemaParts.length, 1);
    assert.strictEqual(schemaParts[0].name, 'val');

    // Testing `truncateTable`
    await db.truncateTable('tbl_lorem_test');
    const records = await db.select('SELECT * FROM tbl_lorem_test');
    assert.strictEqual(records.length, 0);
  });

  await t.test('test cross-database helpers (getConcatSql, getCurrentTimestampSql)', async () => {
    const concatExpr = db.getConcatSql("'Hello'", "' '", "'World'");
    const tsExpr = db.getCurrentTimestampSql();

    const rows = await db.select<{ greeting: string; ts: number | string }>(
      `SELECT ${concatExpr} as greeting, ${tsExpr} as ts`
    );
    assert.ok(rows && rows.length > 0);
    assert.strictEqual(rows[0].greeting, 'Hello World');
    assert.ok(Number(rows[0].ts) > 1700000000);
  });
});
