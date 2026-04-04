import test from 'node:test';
import assert from 'node:assert';
import { DbSqlite } from './db-sqlite';
import { getDefaultDbConfig } from '../../models/db-config';


test('Test DbSqlite encapsulation with Real InMemory Sqlite (No Mocks)', async (t) => {
  let db: DbSqlite;

  t.beforeEach(() => {
    // Instantiate actual Better-Sqlite3 driver pointed directly into RAM via :memory:
    db = new DbSqlite({
      ...getDefaultDbConfig(),
      type: 'sqlite',
      filename: ':memory:',
      tablePrefix: 'tbl_',
    });

    // Setup an ephemeral schema inside memory for tests
    db.db.exec(`
      CREATE TABLE tbl_lorem (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        info TEXT, 
        num INTEGER
      );
      CREATE TABLE tbl_dummy (
         val TEXT
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

    const results = await db.select('SELECT id, info, num FROM tbl_lorem ORDER BY id ASC');
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
  });

  await t.test('test ORM structured object querying routines', async () => {
    // Testing `.insertObject`
    await db.insertObject('$__lorem', { info: 'obj_insert', num: 777 });

    // Testing `.selectObject`
    const results = await db.selectObject('$__lorem', ['info', 'num'], { num: 777 });
    assert.strictEqual(results.length, 1);
    assert.strictEqual(results[0].info, 'obj_insert');

    // Testing `.selectOneRow`
    const singleRow = await db.selectOneRow('$__lorem', ['info'], { num: 777 });
    assert.strictEqual(singleRow.info, 'obj_insert');

    // Testing `.selectOneResult`
    const singleField = await db.selectOneResult('$__lorem', 'info', { num: 777 });
    assert.strictEqual(singleField, 'obj_insert');
  });

  await t.test('test ORM structured object UPDATE computations', async () => {
    await db.insertObject('$__lorem', { info: 'to_be_updated', num: 10 });

    // Assert static update values
    await db.updateObject('$__lorem', { info: 'updated_successfully' }, { num: 10 });
    const afterUpdate = await db.selectOneRow('$__lorem', ['info'], { num: 10 });
    assert.strictEqual(afterUpdate.info, 'updated_successfully');

    // Assert computational expressions evaluation!
    await db.updateObject(
      '$__lorem', 
      { num: { exprssion: 'num + ?', params: [5] } }, 
      { info: 'updated_successfully' }
    );
    const afterExprUpdate = await db.selectOneRow('$__lorem', ['num'], { info: 'updated_successfully' });
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
});
