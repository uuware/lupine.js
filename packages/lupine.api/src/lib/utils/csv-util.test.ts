import test from 'node:test';
import assert from 'node:assert';
import { exportCSV, exportCSVData, loadCSV } from './csv-util';

const createMockResponse = () => {
  const chunks: string[] = [];
  let head: { statusCode: number; headers: Record<string, string> } | undefined;
  let ended = false;

  return {
    res: {
      write: (chunk: string) => {
        chunks.push(chunk);
      },
      writeHead: (statusCode: number, headers: Record<string, string>) => {
        head = { statusCode, headers };
      },
      end: () => {
        ended = true;
      },
    } as any,
    get body() {
      return chunks.join('');
    },
    get head() {
      return head;
    },
    get ended() {
      return ended;
    },
  };
};

test('csv-util', async (t) => {
  await t.test('exportCSVData exports table rows with multiple data types and escaped CSV values', async () => {
    const selectedSql: string[] = [];
    const db = {
      select: async (sql: string) => {
        selectedSql.push(sql);
        return [
          {
            ID: 1,
            NAME: 'Alice, "Admin"',
            BIO: 'first line\nsecond line\r\nthird line',
            AMOUNT: 12.5,
            ACTIVE: true,
            CREATED_AT: new Date(2024, 0, 2, 3, 4, 5),
            EMPTY_VALUE: null,
            UNDEFINED_VALUE: undefined,
            FORMULA_LIKE: '@SUM(A1:A2)',
            BACKSLASH_VALUE: '\\starts-with-slash',
          },
        ];
      },
    } as any;
    const mock = createMockResponse();

    await exportCSVData(db, 'test_table', mock.res, 'ID > 0', 'ID DESC');

    assert.deepStrictEqual(selectedSql, ['SELECT * FROM test_table WHERE ID > 0 ORDER BY ID DESC']);
    assert.strictEqual(
      mock.body,
      '@TABLE,"test_table"\r\n' +
        '@WHERE,"ID > 0"\r\n' +
        '@FIELD,"id,name,bio,amount,active,created_at,empty_value,undefined_value,formula_like,backslash_value"\r\n' +
        '1,"Alice, ""Admin""","first line\nsecond line\r\nthird line",12.5,true,2024-01-02 03:04:05,\\0,\\0,"@SUM(A1:A2)",\\\\starts-with-slash\r\n'
    );
  });

  await t.test('exportCSVData writes #no data when the mocked db returns no rows', async () => {
    const db = {
      select: async () => [],
    } as any;
    const mock = createMockResponse();

    await exportCSVData(db, 'empty_table', mock.res);

    assert.strictEqual(mock.body, '@TABLE,"empty_table"\r\n#no data\r\n');
  });

  await t.test('exportCSV writes headers, delegates export data, and ends the response', async () => {
    const db = {
      select: async () => [{ id: 1, text: 'hello' }],
    } as any;
    const mock = createMockResponse();

    const result = await exportCSV(db, 'users', mock.res);

    assert.strictEqual(result, true);
    assert.strictEqual(mock.head?.statusCode, 200);
    assert.strictEqual(mock.head?.headers['Content-Type'], 'text/csv');
    assert.match(mock.head?.headers['Content-Disposition'] ?? '', /^attachment; filename=users-.*\.ljcsv$/);
    assert.strictEqual(mock.ended, true);
    assert.strictEqual(mock.body, '@TABLE,"users"\r\n@FIELD,"id,text"\r\n1,hello\r\n');
  });

  await t.test('exportCSV returns an html message when table name is missing', async () => {
    const db = {} as any;
    const mock = createMockResponse();

    const result = await exportCSV(db, '', mock.res);

    assert.strictEqual(result, true);
    assert.deepStrictEqual(mock.head, { statusCode: 200, headers: { 'Content-Type': 'text/html' } });
    assert.strictEqual(mock.body, 'Need a table name.');
    assert.strictEqual(mock.ended, true);
  });

  await t.test('loadCSV imports mocked table fields with nulls, quoted commas, quotes, newlines and backslashes', async () => {
    const executed: Array<{ sql: string; values?: any[] }> = [];
    const db = {
      getTableInfo: async (table: string) => {
        assert.strictEqual(table, 'test_table');
        return [
          { name: 'id', pk: 1 },
          { name: 'name', pk: 0 },
          { name: 'bio', pk: 0 },
          { name: 'amount', pk: 0 },
          { name: 'active', pk: 0 },
          { name: 'empty_value', pk: 0 },
          { name: 'backslash_value', pk: 0 },
        ];
      },
      execute: async (sql: string, values?: any[]) => {
        executed.push({ sql, values });
      },
    } as any;

    const result = await loadCSV(db, [
      '# comments should be ignored',
      '@TABLE,"test_table"',
      '@WHERE,"ignored during import"',
      '@FIELD,"id,name,bio,amount,active,empty_value,backslash_value,missing_field"',
      '1,"Alice, ""Admin""","first line\nsecond line\r\nthird line",12.5,true,\\0,\\\\starts-with-slash,ignored',
    ]);

    assert.deepStrictEqual(result, {
      test_table: { succeeded: 1, failed: 0, errorMessage: [] },
    });
    assert.deepStrictEqual(executed, [
      {
        sql: 'INSERT INTO test_table (id,name,bio,amount,active,empty_value,backslash_value) VALUES (?,?,?,?,?,?,?)',
        values: [
          '1',
          'Alice, "Admin"',
          'first line\nsecond line\r\nthird line',
          '12.5',
          'true',
          null,
          '\\starts-with-slash',
        ],
      },
    ]);
  });

  await t.test('loadCSV overwrites by primary key when insert fails and overwrite is enabled', async () => {
    const executed: Array<{ sql: string; values?: any[] }> = [];
    let insertAttempts = 0;
    const db = {
      getTableInfo: async () => [
        { name: 'id', pk: 1 },
        { name: 'name', pk: 0 },
      ],
      execute: async (sql: string, values?: any[]) => {
        executed.push({ sql, values });
        if (sql.startsWith('INSERT')) {
          insertAttempts++;
          if (insertAttempts === 1) {
            throw new Error('duplicate key');
          }
        }
      },
    } as any;

    const result = await loadCSV(db, ['@TABLE,"users"', '@FIELD,"id,name"', '7,Bob'], true);

    assert.deepStrictEqual(result, {
      users: { succeeded: 1, failed: 0, errorMessage: [] },
    });
    assert.deepStrictEqual(executed, [
      { sql: 'INSERT INTO users (id,name) VALUES (?,?)', values: ['7', 'Bob'] },
      { sql: 'DELETE FROM users WHERE id=?', values: ['7'] },
      { sql: 'INSERT INTO users (id,name) VALUES (?,?)', values: ['7', 'Bob'] },
    ]);
  });
});