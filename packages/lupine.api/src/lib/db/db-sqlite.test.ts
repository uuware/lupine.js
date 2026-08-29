import test from 'node:test';
import assert from 'node:assert';
import { DbSqlite } from './db-sqlite';
import { getDefaultDbConfig } from './db-helper';

test('Test DbSqlite encapsulation with Real InMemory Sqlite (No Mocks)', async (t) => {
  let db: DbSqlite;

  t.beforeEach(() => {
    // Instantiate actual Better-Sqlite3 driver pointed directly into RAM via :memory:
    db = new DbSqlite({
      ...getDefaultDbConfig(),
      type: 'sqlite',
      sqliteConfig: {
        filename: ':memory:',
      },
      tablePrefix: 'tbl_',
    });

    // Setup an ephemeral schema inside memory for tests
    db.db.exec(`
      CREATE TABLE tbl_lorem (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        info TEXT, 
        num INTEGER,
        state TEXT,
        active INTEGER
      );
      CREATE TABLE tbl_dummy (
         val TEXT
      );
      CREATE TABLE tbl_reserved (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        \`key\` TEXT,
        \`order\` INTEGER,
        \`group\` TEXT
      );
    `);
  });

  t.afterEach(() => {
    // Release native memory handles
    db.close();
  });

  await t.test('test raw native connection execution', async () => {
    await db.execute('INSERT INTO tbl_lorem (info, num) VALUES (?, ?)', ['Ipsum 0', 100]);
    await db.execute('INSERT INTO tbl_lorem (info, num) VALUES (?, ?)', ['Ipsum 1', 101]);

    const results = await db.select<{ id: number; info: string; num: number }>('SELECT id, info, num FROM tbl_lorem ORDER BY id ASC');
    assert.strictEqual(results.length, 2);
    assert.strictEqual(results[0].info, 'Ipsum 0');
    assert.strictEqual(results[1].num, 101);
  });

  await t.test('test prefix replacement mechanism ($__ conversion)', async () => {
    const rawSql = 'INSERT INTO $__lorem (info, num) VALUES (?, ?)';
    await db.execute(rawSql, ['Test Prefix', 999]);

    const results = await db.select('SELECT * FROM $__lorem WHERE num = ?', [999]);
    assert.strictEqual(results.length, 1);
    assert.strictEqual(results[0].info, 'Test Prefix');

    // Test backtick-enclosed table prefix replacement
    const backtickSql = 'SELECT * FROM `$__lorem` WHERE info = ?';
    const backtickResults = await db.select(backtickSql, ['Test Prefix']);
    assert.strictEqual(backtickResults.length, 1);
  });

  await t.test('test ORM structured object querying routines', async () => {
    // Testing `.insertObject`
    await db.insertObject('$__lorem', { info: 'obj_insert', num: 777 });

    // Testing `.selectObject`
    const results = await db.selectObject<{ info: string; num: number }>('$__lorem', ['info', 'num'], { num: 777 });
    assert.strictEqual(results.length, 1);
    assert.strictEqual(results[0].info, 'obj_insert');

    // Testing `.selectOneRow`
    const singleRow = await db.selectOneRow<{ info: string }>('$__lorem', ['info'], { num: 777 });
    assert.ok(singleRow);
    assert.strictEqual(singleRow.info, 'obj_insert');

    // Testing `.selectOneResult`
    const singleField = await db.selectOneResult<string>('$__lorem', 'info', { num: 777 });
    assert.strictEqual(singleField, 'obj_insert');
  });

  await t.test('test ORM structured object UPDATE computations', async () => {
    await db.insertObject('$__lorem', { info: 'to_be_updated', num: 10 });

    // Assert static update values
    await db.updateObject('$__lorem', { info: 'updated_successfully' }, { num: 10 });
    const afterUpdate = await db.selectOneRow<{ info: string }>('$__lorem', ['info'], { num: 10 });
    assert.ok(afterUpdate);
    assert.strictEqual(afterUpdate.info, 'updated_successfully');

    // Assert computational expressions evaluation (using new 'expression' prop)
    await db.updateObject(
      '$__lorem', 
      { num: { expression: 'num + ?', params: [5] } }, 
      { info: 'updated_successfully' }
    );
    const afterExprUpdate = await db.selectOneRow<{ num: number }>('$__lorem', ['num'], { info: 'updated_successfully' });
    assert.ok(afterExprUpdate);
    assert.strictEqual(afterExprUpdate.num, 15);
  });

  await t.test('test ORM structured object removals', async () => {
    await db.insertObject('$__lorem', { info: 'to_be_deleted', num: 99 });
    
    let count = await db.selectOneResult('$__lorem', 'COUNT(*)', { num: 99 });
    assert.strictEqual(count, 1);

    await db.deleteObject('$__lorem', { num: 99 });
    
    count = await db.selectOneResult('$__lorem', 'COUNT(*)', { num: 99 });
    assert.strictEqual(count, 0);
  });

  await t.test('test rich WHERE clause (IS NULL, IN array, boolean)', async () => {
    await db.insertObject('$__lorem', { info: 'item1', num: 1, state: null, active: true });
    await db.insertObject('$__lorem', { info: 'item2', num: 2, state: 'done', active: false });
    await db.insertObject('$__lorem', { info: 'item3', num: 3, state: 'done', active: true });

    // Test IS NULL
    const nullRows = await db.selectObject('$__lorem', undefined, { state: null });
    assert.strictEqual(nullRows.length, 1);
    assert.strictEqual(nullRows[0].info, 'item1');

    // Test IN array
    const inRows = await db.selectObject('$__lorem', undefined, { num: [1, 3] });
    assert.strictEqual(inRows.length, 2);

    // Test boolean conversion
    const activeRows = await db.selectObject('$__lorem', undefined, { active: true });
    assert.strictEqual(activeRows.length, 2);
  });

  await t.test('test reserved keywords escaping (key, order, group)', async () => {
    await db.insertObject('$__reserved', { key: 'secret_key', order: 1, group: 'admin' });

    const row = await db.selectOneRow<{ key: string; order: number; group: string }>(
      '$__reserved',
      ['key', 'order', 'group'],
      { key: 'secret_key', order: 1 }
    );
    assert.ok(row);
    assert.strictEqual(row.key, 'secret_key');
    assert.strictEqual(row.group, 'admin');

    await db.updateObject('$__reserved', { group: 'superadmin' }, { key: 'secret_key' });
    const updated = await db.selectOneResult('$__reserved', 'group', { key: 'secret_key' });
    assert.strictEqual(updated, 'superadmin');

    await db.deleteObject('$__reserved', { key: 'secret_key' });
    const count = await db.getTableCount('$__reserved');
    assert.strictEqual(count, 0);
  });

  await t.test('test transaction commit and rollback', async () => {
    // 1. Successful transaction commit
    await db.transaction(async (trx) => {
      await trx.insertObject('$__lorem', { info: 'trx_item_1', num: 1001 });
      await trx.insertObject('$__lorem', { info: 'trx_item_2', num: 1002 });
    });

    const rowsAfterCommit = await db.selectObject('$__lorem', undefined, { num: [1001, 1002] });
    assert.strictEqual(rowsAfterCommit.length, 2);

    // 2. Rollback on transaction error
    await assert.rejects(async () => {
      await db.transaction(async (trx) => {
        await trx.insertObject('$__lorem', { info: 'trx_item_3', num: 1003 });
        throw new Error('Simulated failure during transaction');
      });
    }, /Simulated failure during transaction/);

    const rowsAfterRollback = await db.selectObject('$__lorem', undefined, { num: 1003 });
    assert.strictEqual(rowsAfterRollback.length, 0);
  });

  await t.test('test DbSqlite extended table information utilities', async () => {
    await db.insertObject('tbl_lorem', { info: 'dummy1', num: 1 });
    await db.insertObject('tbl_lorem', { info: 'dummy2', num: 2 });
    
    // Testing `getTableCount` (specific to sqlite implementation layer)
    const count = await db.getTableCount('tbl_lorem');
    assert.strictEqual(count, 2);

    // Testing `getAllTables` (specific to sqlite implementation layer)
    const tablesWithoutCount = await db.getAllTables(false);
    assert.strictEqual(typeof tablesWithoutCount[0].count, 'undefined');

    const tablesWithCount = await db.getAllTables(true);
    const targetTableDef = tablesWithCount.find((t: any) => t.tbl_name === 'tbl_lorem');
    assert.ok(targetTableDef);
    assert.strictEqual(targetTableDef.count, 2);

    // Testing `getTableInfo` (PRAGMA parsing specific to sqlite)
    const schemaParts = await db.getTableInfo('tbl_dummy');
    assert.strictEqual(schemaParts.length, 1);
    assert.strictEqual(schemaParts[0].name, 'val');

    // Testing `truncateTable` (emulated using DELETE in sqlite)
    await db.truncateTable('tbl_lorem');
    const records = await db.select('SELECT * FROM tbl_lorem');
    assert.strictEqual(records.length, 0);
  });

  await t.test('test cross-database helpers (getConcatSql, getCurrentTimestampSql)', async () => {
    const concatExpr = db.getConcatSql("'Hello'", "' '", "'World'");
    const tsExpr = db.getCurrentTimestampSql();

    const rows = await db.select<{ greeting: string; ts: number }>(
      `SELECT ${concatExpr} as greeting, ${tsExpr} as ts`
    );
    assert.ok(rows && rows.length > 0);
    assert.strictEqual(rows[0].greeting, 'Hello World');
    assert.strictEqual(typeof rows[0].ts, 'number');
    assert.ok(rows[0].ts > 1700000000);
  });
});
