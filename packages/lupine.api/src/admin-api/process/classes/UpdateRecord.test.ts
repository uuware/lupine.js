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
import { UpdateRecord } from './UpdateRecord';

const makeEntity = (name: string, tableId: string, children: ItemDef[]): ItemDef => ({
  name,
  type: 'FieldObject',
  flags: 'E,',
  defaultValue: '',
  ext: { tableId },
  children,
});

const makeList = (name: string, tableId: string, children: ItemDef[]): ItemDef => ({
  name,
  type: 'FieldObject',
  flags: 'L,',
  defaultValue: '',
  ext: { tableId },
  children,
});

const makePhysicalField = (name: string, physicalId: string, defaultValue = '', filter = ''): ItemDef => ({
  ...makeField(name, defaultValue),
  ext: { physicalId, filter },
});

describe('UpdateRecord Process', () => {
  it('UpdateRecord updates the single list record with parameterized SQL', async () => {
    const keyentity = makeEntityObject('$__users', [makePhysicalFieldObject('id', 'id', '42')]);
    const datalist = makeListObject('$__users', [
      makePhysicalFieldObject('id', 'id'),
      makePhysicalFieldObject('name', 'name'),
      makePhysicalFieldObject('email', 'email'),
    ]);
    datalist.addRecord(
      makeEntityObject('$__users', [
        makePhysicalFieldObject('id', 'id', '42'),
        makePhysicalFieldObject('name', 'name', 'Alice'),
        makePhysicalFieldObject('email', 'email', 'alice@example.com'),
      ])
    );
    const db = makeMockDb();
    const proc = new UpdateRecord();
    proc.setKeyentity(keyentity);
    proc.setDatalist(datalist);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, true, 'execute returned true');
    assert.equal(db.executes.length, 1);
    assert.equal(db.executes[0].sql, 'UPDATE "tbl_users" SET "name" = ?, "email" = ? WHERE "id" = ?');
    assert.deepEqual(db.executes[0].params, ['Alice', 'alice@example.com', '42']);
  });

  it('UpdateRecord supports LIKE key filters with escaped parameters', async () => {
    const keyentity = makeEntityObject('$__users', [makePhysicalFieldObject('email', 'email', 'example_', 'c')]);
    const datalist = makeListObject('$__users', [makePhysicalFieldObject('name', 'name')]);
    datalist.addRecord(makeEntityObject('$__users', [makePhysicalFieldObject('name', 'name', 'Alice')]));
    const db = makeMockDb();
    const proc = new UpdateRecord();
    proc.setKeyentity(keyentity);
    proc.setDatalist(datalist);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, true, 'execute returned true');
    assert.equal(db.executes[0].sql, 'UPDATE "tbl_users" SET "name" = ? WHERE "email" LIKE ? ESCAPE \'\\\'');
    assert.deepEqual(db.executes[0].params, ['Alice', '%example\\_%']);
  });

  it('UpdateRecord rejects missing table id', async () => {
    const keyentity = makeEntityObject('$__users', [makePhysicalFieldObject('id', 'id', '42')]);
    const datalist = makeListObject('', [makePhysicalFieldObject('name', 'name')]);
    datalist.addRecord(makeEntityObject('', [makePhysicalFieldObject('name', 'name', 'Alice')]));
    const db = makeMockDb();
    const proc = new UpdateRecord();
    proc.setKeyentity(keyentity);
    proc.setDatalist(datalist);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, false, 'execute returned false');
    assert.equal(datalist.hasError(), true);
    assert.match(datalist.getErrorMsg(), /SE_NOTABLEID/);
    assert.equal(db.executes.length, 0);
  });

  it('UpdateRecord rejects datalist sizes other than one record', async () => {
    const keyentity = makeEntityObject('$__users', [makePhysicalFieldObject('id', 'id', '42')]);
    const datalist = makeListObject('$__users', [makePhysicalFieldObject('name', 'name')]);
    const db = makeMockDb();
    const proc = new UpdateRecord();
    proc.setKeyentity(keyentity);
    proc.setDatalist(datalist);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, false, 'execute returned false');
    assert.equal(datalist.hasError(), true);
    assert.match(datalist.getErrorMsg(), /SE0004/);
    assert.equal(db.executes.length, 0);
  });

  it('UpdateRecord rejects blank key filters to avoid whole-table updates', async () => {
    const keyentity = makeEntityObject('$__users', [makePhysicalFieldObject('id', 'id', '')]);
    const datalist = makeListObject('$__users', [makePhysicalFieldObject('name', 'name')]);
    datalist.addRecord(makeEntityObject('$__users', [makePhysicalFieldObject('name', 'name', 'Alice')]));
    const db = makeMockDb();
    const proc = new UpdateRecord();
    proc.setKeyentity(keyentity);
    proc.setDatalist(datalist);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, false, 'execute returned false');
    assert.equal(keyentity.hasError(), true);
    assert.match(keyentity.getErrorMsg(), /SE_NOWHERE/);
    assert.equal(db.executes.length, 0);
  });

  it('UpdateRecord rejects records with no non-key update fields', async () => {
    const keyentity = makeEntityObject('$__users', [makePhysicalFieldObject('id', 'id', '42')]);
    const datalist = makeListObject('$__users', [makePhysicalFieldObject('id', 'id')]);
    datalist.addRecord(makeEntityObject('$__users', [makePhysicalFieldObject('id', 'id', '42')]));
    const db = makeMockDb();
    const proc = new UpdateRecord();
    proc.setKeyentity(keyentity);
    proc.setDatalist(datalist);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, false, 'execute returned false');
    assert.equal(datalist.hasError(), true);
    assert.match(datalist.getErrorMsg(), /SE0006/);
    assert.equal(db.executes.length, 0);
  });

  it('UpdateRecord returns false and reports execute errors', async () => {
    const keyentity = makeEntityObject('$__users', [makePhysicalFieldObject('id', 'id', '42')]);
    const datalist = makeListObject('$__users', [makePhysicalFieldObject('name', 'name')]);
    datalist.addRecord(makeEntityObject('$__users', [makePhysicalFieldObject('name', 'name', 'Alice')]));
    const db = makeMockDb();
    db.execute = async function execute(sql: string, params?: unknown[]) {
      this.executes.push({ sql, params });
      throw new Error('update failed');
    };
    const proc = new UpdateRecord();
    proc.setKeyentity(keyentity);
    proc.setDatalist(datalist);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, false, 'execute returned false');
    assert.equal(datalist.hasError(), true);
    assert.match(datalist.getErrorMsg(), /SE_ERRQUERY/);
  });

  it('chkNull throws when keyentity is unbound', async () => {
    const proc = new UpdateRecord();
    proc.setDatalist(makeListObject('$__users', []));
    let threw = false;

    try {
      await withMockDb(makeMockDb(), () => proc.execute());
    } catch (e: any) {
      threw = true;
      assert.ok(e.message.includes('need associate object'), `Error: ${e.message}`);
    }

    assert.ok(threw, 'chkNull threw error');
  });

  it('runProcess — updates one posted list record', async () => {
    const items: ItemDef[] = [
      makeEntity('keyentity', '$__users', [makePhysicalField('id', 'id')]),
      makeList('datalist', '$__users', [makePhysicalField('id', 'id'), makePhysicalField('name', 'name')]),
    ];
    const classes: ClassDef[] = [
      {
        name: 'UpdateRecord',
        group: 'g1',
        fields: [
          { setter: 'keyentity', value: 'keyentity' },
          { setter: 'datalist', value: 'datalist' },
        ],
      },
    ];
    const ctx = new ProcessContext({
      'keyentity/id': '42',
      'datalist/id#0': '42',
      'datalist/name#0': 'Alice',
    });
    const db = makeMockDb();

    const ok = await withMockDb(db, () => runProcess(ctx, items, classes));

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(db.executes[0].sql, 'UPDATE "tbl_users" SET "name" = ? WHERE "id" = ?');
    assert.deepEqual(db.executes[0].params, ['Alice', '42']);
    assert.equal(ctx.output['datalist#COUNT'], '1');
  });
});
