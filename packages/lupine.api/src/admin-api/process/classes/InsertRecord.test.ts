import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import '../class-registry';
import { ProcessContext } from '../process-context';
import { runProcess, ClassDef, ItemDef } from '../run-process';
import {
  makeEntityObject,
  makeField,
  makeListObject,
  makeMockDb,
  makePhysicalFieldObject,
  withMockDb,
} from '../test-helper';
import { InsertRecord } from './InsertRecord';

const makeList = (name: string, tableId: string, children: ItemDef[]): ItemDef => ({
  name,
  type: 'FieldObject',
  flags: 'L,',
  defaultValue: '',
  ext: { tableId },
  children,
});

const makePhysicalField = (name: string, physicalId: string, defaultValue = ''): ItemDef => ({
  ...makeField(name, defaultValue),
  ext: { physicalId },
});

describe('InsertRecord Process', () => {
  it('InsertRecord inserts one list record with parameterized SQL', async () => {
    const datalist = makeListObject('$__users', [
      makePhysicalFieldObject('id', 'id'),
      makePhysicalFieldObject('name', 'name'),
    ]);
    datalist.addRecord(
      makeEntityObject('$__users', [
        makePhysicalFieldObject('id', 'id', '42'),
        makePhysicalFieldObject('name', 'name', 'Alice'),
      ])
    );
    const db = makeMockDb();
    const proc = new InsertRecord();
    proc.setDatalist(datalist);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, true, 'execute returned true');
    assert.equal(db.executes.length, 1);
    assert.equal(db.executes[0].sql, 'INSERT INTO "tbl_users" ( "id", "name" ) VALUES ( ?, ? )');
    assert.deepEqual(db.executes[0].params, ['42', 'Alice']);
  });

  it('InsertRecord inserts every record in the list', async () => {
    const datalist = makeListObject('$__users', [
      makePhysicalFieldObject('id', 'id'),
      makePhysicalFieldObject('name', 'name'),
    ]);
    datalist.addRecord(
      makeEntityObject('$__users', [
        makePhysicalFieldObject('id', 'id', '1'),
        makePhysicalFieldObject('name', 'name', 'Alice'),
      ])
    );
    datalist.addRecord(
      makeEntityObject('$__users', [
        makePhysicalFieldObject('id', 'id', '2'),
        makePhysicalFieldObject('name', 'name', 'Bob'),
      ])
    );
    const db = makeMockDb();
    const proc = new InsertRecord();
    proc.setDatalist(datalist);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, true, 'execute returned true');
    assert.equal(db.executes.length, 2);
    assert.deepEqual(db.executes[0].params, ['1', 'Alice']);
    assert.deepEqual(db.executes[1].params, ['2', 'Bob']);
  });

  it('InsertRecord accepts an empty list when fields are configured', async () => {
    const datalist = makeListObject('$__users', [makePhysicalFieldObject('id', 'id')]);
    const db = makeMockDb();
    const proc = new InsertRecord();
    proc.setDatalist(datalist);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, true, 'execute returned true');
    assert.equal(db.executes.length, 0);
  });

  it('InsertRecord rejects missing table id', async () => {
    const datalist = makeListObject('', [makePhysicalFieldObject('id', 'id')]);
    datalist.addRecord(makeEntityObject('', [makePhysicalFieldObject('id', 'id', '42')]));
    const db = makeMockDb();
    const proc = new InsertRecord();
    proc.setDatalist(datalist);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, false, 'execute returned false');
    assert.equal(datalist.hasError(), true);
    assert.match(datalist.getErrorMsg(), /SE_NOTABLEID/);
    assert.equal(db.executes.length, 0);
  });

  it('InsertRecord rejects lists with no physical fields', async () => {
    const datalist = makeListObject('$__users', [makePhysicalFieldObject('id', '', '42')]);
    datalist.addRecord(makeEntityObject('$__users', [makePhysicalFieldObject('id', '', '42')]));
    const db = makeMockDb();
    const proc = new InsertRecord();
    proc.setDatalist(datalist);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, false, 'execute returned false');
    assert.equal(datalist.hasError(), true);
    assert.match(datalist.getErrorMsg(), /SE_NOFIELD/);
    assert.equal(db.executes.length, 0);
  });

  it('InsertRecord returns false and reports execute errors', async () => {
    const datalist = makeListObject('$__users', [makePhysicalFieldObject('id', 'id')]);
    datalist.addRecord(makeEntityObject('$__users', [makePhysicalFieldObject('id', 'id', '42')]));
    const db = makeMockDb();
    db.execute = async function execute(sql: string, params?: unknown[]) {
      this.executes.push({ sql, params });
      throw new Error('insert failed');
    };
    const proc = new InsertRecord();
    proc.setDatalist(datalist);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, false, 'execute returned false');
    assert.equal(datalist.hasError(), true);
    assert.match(datalist.getErrorMsg(), /SE_ERRQUERY/);
  });

  it('chkNull throws when datalist is unbound', async () => {
    const proc = new InsertRecord();
    let threw = false;

    try {
      await withMockDb(makeMockDb(), () => proc.execute());
    } catch (e: any) {
      threw = true;
      assert.ok(e.message.includes('need associate object'), `Error: ${e.message}`);
    }

    assert.ok(threw, 'chkNull threw error');
  });

  it('runProcess — inserts posted list records', async () => {
    const items: ItemDef[] = [
      makeList('datalist', '$__users', [makePhysicalField('id', 'id'), makePhysicalField('name', 'name')]),
    ];
    const classes: ClassDef[] = [
      {
        name: 'InsertRecord',
        group: 'g1',
        fields: [{ setter: 'datalist', value: 'datalist' }],
      },
    ];
    const ctx = new ProcessContext({
      'datalist/id#0': '1',
      'datalist/name#0': 'Alice',
      'datalist/id#1': '2',
      'datalist/name#1': 'Bob',
    });
    const db = makeMockDb();

    const ok = await withMockDb(db, () => runProcess(ctx, items, classes));

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(db.executes.length, 2);
    assert.equal(db.executes[0].sql, 'INSERT INTO "tbl_users" ( "id", "name" ) VALUES ( ?, ? )');
    assert.deepEqual(db.executes[0].params, ['1', 'Alice']);
    assert.deepEqual(db.executes[1].params, ['2', 'Bob']);
    assert.equal(ctx.output['datalist#COUNT'], '2');
  });
});
