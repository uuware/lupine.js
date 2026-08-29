import test from 'node:test';
import assert from 'node:assert';
import {
  Db,
  isDbFieldExpression,
  isDbFieldExprssion,
  DbFieldValue,
  DbFieldExpression,
} from './db';
import { getDefaultDbConfig } from './db-helper';
import { DbConfig } from '../../models/db-config';

const createTestConfig = (type = 'sqlite', overrides: Partial<DbConfig> = {}): DbConfig => ({
  ...getDefaultDbConfig(),
  type,
  ...overrides,
});

class MockDb extends Db {
  public lastQuery?: { sql: string; params: any[]; isSelect: boolean };
  public queryLog: { sql: string; params: any[]; isSelect: boolean }[] = [];
  public mockResults: any = [];
  public shouldFailQuery = false;

  protected async nativeQuery(sql: string, params?: any, isSelect = false): Promise<any> {
    if (this.shouldFailQuery) {
      throw new Error('Mock query failure');
    }
    const queryEntry = { sql, params: params || [], isSelect };
    this.lastQuery = queryEntry;
    this.queryLog.push(queryEntry);
    return this.mockResults;
  }

  public async getAllTables(addCount = false): Promise<any> {
    return [{ name: 'tbl_users' }, { name: 'tbl_orders' }];
  }

  // Expose protected methods for testing
  public testReplaceQuestionMarkPlaceholders(sql: string, replacer: (index: number) => string): string {
    return this.replaceQuestionMarkPlaceholders(sql, replacer);
  }

  public testBuildWhereClause(whereFieldValues?: DbFieldValue) {
    return this.buildWhereClause(whereFieldValues);
  }

  public testSelectBaseSql(table: string, fields?: string[], whereFieldValues?: DbFieldValue, orderSql?: string) {
    return this.selectBaseSql(table, fields, whereFieldValues, orderSql);
  }
}

test('db.ts unit test suite', async (t) => {
  await t.test('isDbFieldExpression and isDbFieldExprssion helper tests', () => {
    assert.strictEqual(isDbFieldExpression({ expression: 'count + 1' }), true);
    assert.strictEqual(isDbFieldExpression({ exprssion: 'count + 1' }), true);
    assert.strictEqual(isDbFieldExpression({ expression: '?', params: [1] }), true);

    // Backward compatibility alias
    assert.strictEqual(isDbFieldExprssion({ expression: 'count + 1' }), true);
    assert.strictEqual(isDbFieldExprssion({ exprssion: 'count + 1' }), true);

    // Negative cases
    assert.strictEqual(isDbFieldExpression(null), false);
    assert.strictEqual(isDbFieldExpression(undefined), false);
    assert.strictEqual(isDbFieldExpression('expression'), false);
    assert.strictEqual(isDbFieldExpression(123), false);
    assert.strictEqual(isDbFieldExpression(true), false);
    assert.strictEqual(isDbFieldExpression({}), false);
    assert.strictEqual(isDbFieldExpression({ other: 'val' }), false);
  });

  await t.test('Db constructor validation and default properties', () => {
    // Missing config or missing type throws
    assert.throws(() => new Db(null as any), /Invalid database configuration: type is required/);
    assert.throws(() => new Db(undefined as any), /Invalid database configuration: type is required/);
    assert.throws(() => new Db({} as any), /Invalid database configuration: type is required/);
    assert.throws(() => new Db(createTestConfig('')), /Invalid database configuration: type is required/);

    // Valid constructor with defaults
    const dbDefault = new Db(createTestConfig(' MySQL '));
    assert.strictEqual(dbDefault.type, 'mysql');
    assert.strictEqual(dbDefault.tablePrefix, 'tbl_');
    assert.strictEqual(dbDefault.option.type, ' MySQL ');

    // Custom table prefix
    const dbCustom = new Db(createTestConfig('sqlite', { tablePrefix: 'app_' }));
    assert.strictEqual(dbCustom.type, 'sqlite');
    assert.strictEqual(dbCustom.tablePrefix, 'app_');
  });

  await t.test('Unimplemented base methods throw errors', async () => {
    const rawDb = new Db(createTestConfig('mysql'));

    assert.throws(() => rawDb.close(), /Method not implemented/);
    assert.throws(() => rawDb.connect(), /Method not implemented/);
    await assert.rejects(async () => await rawDb.getAllTables(), /Method not implemented/);
    await assert.rejects(async () => await rawDb.getTableInfo('tbl_users'), /Method not implemented/);
    await assert.rejects(async () => await rawDb.transaction(async () => {}), /Method not implemented/);
    await assert.rejects(async () => await rawDb.truncateTable('tbl_users'), /Method not implemented/);
  });

  await t.test('getAllTableNames maps table names from getAllTables', async () => {
    const db = new MockDb(createTestConfig('mysql'));
    const tableNames = await db.getAllTableNames();
    assert.deepStrictEqual(tableNames, ['tbl_users', 'tbl_orders']);
  });

  await t.test('getRandomOrder returns appropriate SQL across database engines', () => {
    const mysqlDb = new Db(createTestConfig('mysql'));
    assert.strictEqual(mysqlDb.getRandomOrder(), 'RAND()');

    const mariaDb = new Db(createTestConfig('mariadb'));
    assert.strictEqual(mariaDb.getRandomOrder(), 'RAND()');

    const postgresDb = new Db(createTestConfig('postgres'));
    assert.strictEqual(postgresDb.getRandomOrder(), 'RANDOM()');

    const sqliteDb = new Db(createTestConfig('sqlite'));
    assert.strictEqual(sqliteDb.getRandomOrder(), 'RANDOM()');

    const sqlserverDb = new Db(createTestConfig('sqlserver'));
    assert.strictEqual(sqlserverDb.getRandomOrder(), 'NEWID()');

    const mssqlDb = new Db(createTestConfig('mssql'));
    assert.strictEqual(mssqlDb.getRandomOrder(), 'NEWID()');

    const oracleDb = new Db(createTestConfig('oracle'));
    assert.strictEqual(oracleDb.getRandomOrder(), 'DBMS_RANDOM.VALUE');

    const unsupportedDb = new Db(createTestConfig('unknown_db'));
    assert.throws(() => unsupportedDb.getRandomOrder(), /Unsupported database type: unknown_db/);
  });

  await t.test('getConcatSql formats string concatenation across engines and argument counts', () => {
    const mysqlDb = new Db(createTestConfig('mysql'));
    const sqliteDb = new Db(createTestConfig('sqlite'));
    const sqlserverDb = new Db(createTestConfig('sqlserver'));
    const oracleDb = new Db(createTestConfig('oracle'));

    // 0 args
    assert.strictEqual(mysqlDb.getConcatSql(), "''");
    assert.strictEqual(sqliteDb.getConcatSql(), "''");

    // 1 arg
    assert.strictEqual(mysqlDb.getConcatSql('first_name'), 'first_name');
    assert.strictEqual(sqliteDb.getConcatSql('first_name'), 'first_name');

    // Multiple args: MySQL / SQL Server use CONCAT(...)
    assert.strictEqual(mysqlDb.getConcatSql('a', "' '", 'b'), "CONCAT(a, ' ', b)");
    assert.strictEqual(sqlserverDb.getConcatSql('a', "' '", 'b'), "CONCAT(a, ' ', b)");

    // Multiple args: SQLite / Postgres / Oracle use (a || b || c)
    assert.strictEqual(sqliteDb.getConcatSql('a', "' '", 'b'), "(a || ' ' || b)");
    assert.strictEqual(oracleDb.getConcatSql('a', "' '", 'b'), "(a || ' ' || b)");
  });

  await t.test('getCurrentTimestampSql returns valid unix timestamp SQL expression', () => {
    assert.strictEqual(new Db(createTestConfig('mysql')).getCurrentTimestampSql(), 'UNIX_TIMESTAMP()');
    assert.strictEqual(new Db(createTestConfig('mariadb')).getCurrentTimestampSql(), 'UNIX_TIMESTAMP()');
    assert.strictEqual(new Db(createTestConfig('sqlite')).getCurrentTimestampSql(), "CAST(strftime('%s', 'now') AS INTEGER)");
    assert.strictEqual(new Db(createTestConfig('postgres')).getCurrentTimestampSql(), 'EXTRACT(EPOCH FROM NOW())::INTEGER');
    assert.strictEqual(new Db(createTestConfig('sqlserver')).getCurrentTimestampSql(), "DATEDIFF(SECOND, '1970-01-01', GETUTCDATE())");
    assert.strictEqual(new Db(createTestConfig('mssql')).getCurrentTimestampSql(), "DATEDIFF(SECOND, '1970-01-01', GETUTCDATE())");
    assert.strictEqual(
      new Db(createTestConfig('oracle')).getCurrentTimestampSql(),
      "((CAST(SYS_EXTRACT_UTC(SYSTIMESTAMP) AS DATE) - DATE '1970-01-01') * 86400)"
    );
    assert.strictEqual(new Db(createTestConfig('other')).getCurrentTimestampSql(), 'UNIX_TIMESTAMP()');
  });

  await t.test('escapeId quotes identifiers properly per engine and respects expressions/wildcards', () => {
    const mysqlDb = new Db(createTestConfig('mysql'));
    const sqlserverDb = new Db(createTestConfig('sqlserver'));
    const oracleDb = new Db(createTestConfig('oracle'));

    // Empty or wildcard
    assert.strictEqual(mysqlDb.escapeId(''), '');
    assert.strictEqual(mysqlDb.escapeId('*'), '*');

    // Function calls, expressions with parentheses or spaces
    assert.strictEqual(mysqlDb.escapeId('COUNT(*)'), 'COUNT(*)');
    assert.strictEqual(mysqlDb.escapeId('users.id AS user_id'), 'users.id AS user_id');
    assert.strictEqual(mysqlDb.escapeId('a + b'), 'a + b');

    // Already quoted identifiers
    assert.strictEqual(mysqlDb.escapeId('`col`'), '`col`');
    assert.strictEqual(sqlserverDb.escapeId('[col]'), '[col]');
    assert.strictEqual(oracleDb.escapeId('"col"'), '"col"');

    // Dotted identifiers (table.column or schema.table.column)
    assert.strictEqual(mysqlDb.escapeId('tbl.col'), '`tbl`.`col`');
    assert.strictEqual(sqlserverDb.escapeId('dbo.tbl.col'), '[dbo].[tbl].[col]');
    assert.strictEqual(oracleDb.escapeId('schema.tbl.col'), '"schema"."tbl"."col"');

    // Engine-specific escaping
    assert.strictEqual(mysqlDb.escapeId('user'), '`user`');
    assert.strictEqual(mysqlDb.escapeId('user`name'), '`user``name`');

    assert.strictEqual(sqlserverDb.escapeId('user'), '[user]');
    assert.strictEqual(sqlserverDb.escapeId('user]name'), '[user]]name]');

    assert.strictEqual(oracleDb.escapeId('user'), '"user"');
    assert.strictEqual(oracleDb.escapeId('user"name'), '"user""name"');
  });

  await t.test('replaceQuestionMarkPlaceholders rewrites positional params ignoring literals and quotes', () => {
    const db = new MockDb(createTestConfig('mysql'));

    // Simple replacement
    const res1 = db.testReplaceQuestionMarkPlaceholders('SELECT * FROM tbl WHERE a = ? AND b = ?', (i) => `$${i + 1}`);
    assert.strictEqual(res1, 'SELECT * FROM tbl WHERE a = $1 AND b = $2');

    // Ignoring ? inside single quotes, double quotes, and backticks
    const res2 = db.testReplaceQuestionMarkPlaceholders(
      "SELECT 'what?' AS q1, \"how?\" AS q2, `col?name` AS q3 FROM tbl WHERE x = ?",
      (i) => `@p${i}`
    );
    assert.strictEqual(res2, "SELECT 'what?' AS q1, \"how?\" AS q2, `col?name` AS q3 FROM tbl WHERE x = @p0");

    // Ignoring ? inside SQL Server bracketed identifiers
    const res3 = db.testReplaceQuestionMarkPlaceholders('SELECT [col?name] FROM tbl WHERE id = ?', (i) => `@p${i}`);
    assert.strictEqual(res3, 'SELECT [col?name] FROM tbl WHERE id = @p0');

    // Handling escaped quotes inside literals
    const res4 = db.testReplaceQuestionMarkPlaceholders("SELECT 'it\\'s ? time' FROM tbl WHERE a = ?", (i) => `$${i + 1}`);
    assert.strictEqual(res4, "SELECT 'it\\'s ? time' FROM tbl WHERE a = $1");

    const res5 = db.testReplaceQuestionMarkPlaceholders("SELECT 'it''s ? time' FROM tbl WHERE a = ?", (i) => `$${i + 1}`);
    assert.strictEqual(res5, "SELECT 'it''s ? time' FROM tbl WHERE a = $1");
  });

  await t.test('replacePrefix substitutes $__ outside string literals and handles quotes correctly', () => {
    const db = new MockDb(createTestConfig('mysql', { tablePrefix: 'my_app_' }));

    // No prefix in SQL
    assert.strictEqual(db.replacePrefix('SELECT * FROM tbl_user'), 'SELECT * FROM tbl_user');
    assert.strictEqual(db.replacePrefix(''), '');

    // Standard table prefix replacement
    assert.strictEqual(db.replacePrefix('SELECT * FROM $__users'), 'SELECT * FROM my_app_users');
    assert.strictEqual(db.replacePrefix('SELECT * FROM `$__users`'), 'SELECT * FROM `my_app_users`');

    // Inside string literals, $__ must NOT be replaced
    const sqlWithLiterals = "SELECT * FROM $__users WHERE code = '$__secret' AND note = \"hello $__ world\"";
    assert.strictEqual(
      db.replacePrefix(sqlWithLiterals),
      "SELECT * FROM my_app_users WHERE code = '$__secret' AND note = \"hello $__ world\""
    );

    // Escaped quotes inside literals
    const sqlWithEscapes = "SELECT * FROM $__users WHERE name = 'O\\'$__Reilly' AND id = $__users.id";
    assert.strictEqual(
      db.replacePrefix(sqlWithEscapes),
      "SELECT * FROM my_app_users WHERE name = 'O\\'$__Reilly' AND id = my_app_users.id"
    );

    // Custom fromPrefix
    assert.strictEqual(db.replacePrefix('SELECT * FROM #__users', '#__'), 'SELECT * FROM my_app_users');
  });

  await t.test('buildWhereClause constructs parameterized conditions accurately', () => {
    const db = new MockDb(createTestConfig('mysql'));

    // Empty or undefined
    assert.deepStrictEqual(db.testBuildWhereClause(undefined), { whereSql: '', params: [] });
    assert.deepStrictEqual(db.testBuildWhereClause({}), { whereSql: '', params: [] });

    // Undefined fields are skipped
    assert.deepStrictEqual(db.testBuildWhereClause({ name: 'Alice', age: undefined }), {
      whereSql: ' WHERE `name` = ?',
      params: ['Alice'],
    });

    // Null values -> IS NULL
    assert.deepStrictEqual(db.testBuildWhereClause({ deleted_at: null }), {
      whereSql: ' WHERE `deleted_at` IS NULL',
      params: [],
    });

    // Empty array -> 1 = 0
    assert.deepStrictEqual(db.testBuildWhereClause({ id: [] }), {
      whereSql: ' WHERE 1 = 0',
      params: [],
    });

    // Non-empty array -> IN (?, ?)
    assert.deepStrictEqual(db.testBuildWhereClause({ id: [1, 2, 3] }), {
      whereSql: ' WHERE `id` IN (?, ?, ?)',
      params: [1, 2, 3],
    });

    // Boolean values -> = ? with 1 / 0
    assert.deepStrictEqual(db.testBuildWhereClause({ is_active: true, is_admin: false }), {
      whereSql: ' WHERE `is_active` = ? AND `is_admin` = ?',
      params: [1, 0],
    });

    // Combined multi-field conditions
    assert.deepStrictEqual(
      db.testBuildWhereClause({
        category: 'books',
        status: null,
        tags: ['sale', 'new'],
        featured: true,
      }),
      {
        whereSql: ' WHERE `category` = ? AND `status` IS NULL AND `tags` IN (?, ?) AND `featured` = ?',
        params: ['books', 'sale', 'new', 1],
      }
    );
  });

  await t.test('selectBaseSql constructs base query structure', () => {
    const db = new MockDb(createTestConfig('mysql', { tablePrefix: 'tbl_' }));

    // All fields (*)
    const res1 = db.testSelectBaseSql('$__users');
    assert.strictEqual(res1.sql, 'SELECT * FROM tbl_users');
    assert.deepStrictEqual(res1.params, []);

    // Specific fields with orderSql and where clause
    const res2 = db.testSelectBaseSql('$__users', ['id', 'name', 'age'], { status: 'active' }, 'id DESC');
    assert.strictEqual(res2.sql, 'SELECT `id`, `name`, `age` FROM tbl_users WHERE `status` = ? ORDER BY id DESC');
    assert.deepStrictEqual(res2.params, ['active']);
  });

  await t.test('select and execute dispatch with prefix replacement to nativeQuery', async () => {
    const db = new MockDb(createTestConfig('mysql', { tablePrefix: 'tbl_' }));
    db.mockResults = [{ id: 1, name: 'Alice' }];

    const selectRes = await db.select('SELECT * FROM $__users WHERE id = ?', [1]);
    assert.deepStrictEqual(selectRes, [{ id: 1, name: 'Alice' }]);
    assert.deepStrictEqual(db.lastQuery, {
      sql: 'SELECT * FROM tbl_users WHERE id = ?',
      params: [1],
      isSelect: true,
    });

    db.mockResults = { affectedRows: 1 };
    const execRes = await db.execute('UPDATE $__users SET name = ? WHERE id = ?', ['Bob', 1]);
    assert.deepStrictEqual(execRes, { affectedRows: 1 });
    assert.deepStrictEqual(db.lastQuery, {
      sql: 'UPDATE tbl_users SET name = ? WHERE id = ?',
      params: ['Bob', 1],
      isSelect: false,
    });
  });

  await t.test('selectObject handles pagination across MySQL and SQLServer/Oracle', async () => {
    // Standard (MySQL / SQLite / Postgres) pagination
    const mysqlDb = new MockDb(createTestConfig('mysql', { tablePrefix: 'tbl_' }));
    mysqlDb.mockResults = [{ id: 10 }];

    await mysqlDb.selectObject('$__items', ['id', 'title'], { status: 1 }, 'id ASC', 20, 40);
    assert.strictEqual(
      mysqlDb.lastQuery?.sql,
      'SELECT `id`, `title` FROM tbl_items WHERE `status` = ? ORDER BY id ASC LIMIT 20 OFFSET 40'
    );
    assert.deepStrictEqual(mysqlDb.lastQuery?.params, [1]);

    // SQL Server pagination with explicit order
    const sqlserverDb = new MockDb(createTestConfig('sqlserver', { tablePrefix: 'tbl_' }));
    await sqlserverDb.selectObject('$__items', ['id'], undefined, 'id ASC', 10, 5);
    assert.strictEqual(sqlserverDb.lastQuery?.sql, 'SELECT [id] FROM tbl_items ORDER BY id ASC OFFSET 5 ROWS FETCH NEXT 10 ROWS ONLY');

    // SQL Server pagination without orderSql (should inject ORDER BY (SELECT NULL))
    await sqlserverDb.selectObject('$__items', ['id'], undefined, undefined, 10, 0);
    assert.strictEqual(
      sqlserverDb.lastQuery?.sql,
      'SELECT [id] FROM tbl_items ORDER BY (SELECT NULL) OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY'
    );

    // Oracle pagination with offset only
    const oracleDb = new MockDb(createTestConfig('oracle', { tablePrefix: 'tbl_' }));
    await oracleDb.selectObject('$__items', ['id'], undefined, undefined, undefined, 15);
    assert.strictEqual(oracleDb.lastQuery?.sql, 'SELECT "id" FROM tbl_items ORDER BY (SELECT NULL) OFFSET 15 ROWS');
  });

  await t.test('selectOneRow returns first element or undefined', async () => {
    const db = new MockDb(createTestConfig('mysql', { tablePrefix: 'tbl_' }));

    // Found
    db.mockResults = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
    const row = await db.selectOneRow<{ id: number; name: string }>('$__users', ['id', 'name'], { id: 1 });
    assert.deepStrictEqual(row, { id: 1, name: 'Alice' });

    // Not found
    db.mockResults = [];
    const notFound = await db.selectOneRow('$__users', ['id'], { id: 999 });
    assert.strictEqual(notFound, undefined);
  });

  await t.test('selectOneResult returns scalar value of first field or undefined', async () => {
    const db = new MockDb(createTestConfig('mysql', { tablePrefix: 'tbl_' }));

    // Found
    db.mockResults = [{ total: 42 }];
    const result = await db.selectOneResult<number>('$__orders', 'COUNT(*)', { user_id: 1 });
    assert.strictEqual(result, 42);

    // Not found
    db.mockResults = [];
    const emptyRes = await db.selectOneResult('$__orders', 'COUNT(*)', { user_id: 999 });
    assert.strictEqual(emptyRes, undefined);
  });

  await t.test('insertObject builds parameterised insert query and maps booleans', async () => {
    const db = new MockDb(createTestConfig('mysql', { tablePrefix: 'tbl_' }));
    db.mockResults = { insertId: 101 };

    const res = await db.insertObject('$__users', {
      name: 'Charlie',
      age: 25,
      is_active: true,
      is_admin: false,
    });

    assert.deepStrictEqual(res, { insertId: 101 });
    assert.strictEqual(
      db.lastQuery?.sql,
      'INSERT INTO tbl_users (`name`, `age`, `is_active`, `is_admin`) VALUES (?, ?, ?, ?)'
    );
    assert.deepStrictEqual(db.lastQuery?.params, ['Charlie', 25, 1, 0]);
  });

  await t.test('updateObject handles expressions, nulls, booleans, static values, and WHERE', async () => {
    const db = new MockDb(createTestConfig('mysql', { tablePrefix: 'tbl_' }));

    // Complex update with expressions (expression & exprssion), nulls, booleans, and values
    const updateData: DbFieldExpression = {
      name: 'Updated Name',
      score: { expression: 'score + ?', params: [10] },
      views: { exprssion: 'views + 1' },
      avatar: null,
      is_verified: true,
      is_banned: false,
    };

    await db.updateObject('$__users', updateData, { id: 5, status: 'active' });

    assert.strictEqual(
      db.lastQuery?.sql,
      'UPDATE tbl_users SET `name` = ?, `score` = score + ?, `views` = views + 1, `avatar` = NULL, `is_verified` = ?, `is_banned` = ? WHERE `id` = ? AND `status` = ?'
    );
    assert.deepStrictEqual(db.lastQuery?.params, ['Updated Name', 10, 1, 0, 5, 'active']);
  });

  await t.test('deleteObject builds parameterized delete query with WHERE clause', async () => {
    const db = new MockDb(createTestConfig('mysql', { tablePrefix: 'tbl_' }));

    await db.deleteObject('$__users', { id: 10, role: 'guest' });

    assert.strictEqual(db.lastQuery?.sql, 'DELETE FROM tbl_users WHERE `id` = ? AND `role` = ?');
    assert.deepStrictEqual(db.lastQuery?.params, [10, 'guest']);
  });

  await t.test('testConnection returns true on non-empty results and false on empty or error', async () => {
    const db = new MockDb(createTestConfig('mysql'));

    // Success with result
    db.mockResults = [{ result: 1 }];
    const ok = await db.testConnection();
    assert.strictEqual(ok, true);

    // Empty result
    db.mockResults = [];
    const emptyOk = await db.testConnection();
    assert.strictEqual(emptyOk, false);

    // Error thrown
    db.shouldFailQuery = true;
    const failOk = await db.testConnection();
    assert.strictEqual(failOk, false);
  });
});
