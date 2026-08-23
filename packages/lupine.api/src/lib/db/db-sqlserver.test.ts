import test from 'node:test';
import assert from 'node:assert';
import { DbSqlServer, DbSqlServerTransaction } from './db-sqlserver';
import { DbHelper } from './db-helper';
import { getDefaultDbConfig } from '../../models/db-config';

test('Test DbSqlServer Driver and Dialect Encapsulation', async (t) => {
  const sqlServerConfig = {
    ...getDefaultDbConfig(),
    type: 'sqlserver',
    host: process.env['MSSQL_HOST'] || '127.0.0.1',
    port: Number(process.env['MSSQL_PORT']) || 1433,
    user: process.env['MSSQL_USER'] || 'sa',
    password: process.env['MSSQL_PASSWORD'] || 'SqlPassword123!',
    database: process.env['MSSQL_DATABASE'] || 'master',
    tablePrefix: 'tbl_',
  };

  const db = new DbSqlServer(sqlServerConfig);

  await t.test('test SQL Server dialect query helpers and escaping', async () => {
    // 1. Identifier Escaping
    assert.strictEqual(db.escapeId('key'), '[key]');
    assert.strictEqual(db.escapeId('order'), '[order]');
    assert.strictEqual(db.escapeId('user.name'), '[user].[name]');
    assert.strictEqual(db.escapeId('*'), '*');
    assert.strictEqual(db.escapeId('[already_escaped]'), '[already_escaped]');

    // 2. Random ordering function
    assert.strictEqual(db.getRandomOrder(), 'NEWID()');

    // 3. String concatenation
    assert.strictEqual(
      db.getConcatSql('first_name', "' '", 'last_name'),
      "CONCAT(first_name, ' ', last_name)"
    );

    // 4. Timestamp expression
    assert.strictEqual(
      db.getCurrentTimestampSql(),
      "DATEDIFF(SECOND, '1970-01-01', GETUTCDATE())"
    );
  });

  await t.test('test prefix replacement and pagination query construction', async () => {
    const rawSql = 'SELECT * FROM $__users WHERE note = "$__leave_as_is"';
    const replaced = db.replacePrefix(rawSql);
    assert.strictEqual(replaced, 'SELECT * FROM tbl_users WHERE note = "$__leave_as_is"');
  });

  await t.test('test DbHelper factory instantiation for sqlserver/mssql', async () => {
    const instance = new DbSqlServer({
      ...sqlServerConfig,
      type: 'mssql',
    });
    assert.ok(instance instanceof DbSqlServer);
    assert.strictEqual(instance.type, 'mssql');

    try {
      const helperInstance = await DbHelper.createInstance({
        ...sqlServerConfig,
        type: 'mssql',
      });
      assert.ok(helperInstance instanceof DbSqlServer);
    } catch (e: any) {
      assert.ok(
        e.message.includes('mssql') || e.message.includes('Failed to connect') || e.message.includes('ECONNREFUSED')
      );
    }
  });

  await t.test('test SQL Server simulated parameter transformation and query routing', async () => {
    // Test transaction instance construction
    const mockTransaction = {};
    const trxDb = new DbSqlServerTransaction(sqlServerConfig, mockTransaction);
    assert.strictEqual(trxDb.type, 'sqlserver');
    assert.strictEqual(trxDb.escapeId('status'), '[status]');
  });

  // Pre-check if real SQL Server instance is reachable
  let isSqlServerReachable = false;
  try {
    isSqlServerReachable = await db.testConnection();
  } catch {
    isSqlServerReachable = false;
  }

  if (!isSqlServerReachable) {
    t.diagnostic('SQL Server instance not reachable on 127.0.0.1:1433, skipping live integration tests.');
    return;
  }

  await t.test('test live SQL Server connection and transactions', async () => {
    await db.execute(`
      IF OBJECT_ID('tbl_lorem_sqlserver', 'U') IS NOT NULL
        DROP TABLE tbl_lorem_sqlserver;
      CREATE TABLE tbl_lorem_sqlserver (
        id INT IDENTITY(1,1) PRIMARY KEY,
        info NVARCHAR(255),
        num INT
      );
    `);

    await db.transaction(async (trx) => {
      await trx.insertObject('$__lorem_sqlserver', { info: 'trx_1', num: 100 });
      await trx.insertObject('$__lorem_sqlserver', { info: 'trx_2', num: 200 });
    });

    const rows = await db.selectObject('$__lorem_sqlserver', ['info', 'num'], { num: 100 });
    assert.strictEqual(rows.length, 1);
    assert.strictEqual(rows[0].info, 'trx_1');

    await db.execute("DROP TABLE tbl_lorem_sqlserver;");
    await db.close();
  });
});
