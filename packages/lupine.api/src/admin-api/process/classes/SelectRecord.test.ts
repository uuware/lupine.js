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
import { SelectRecord } from './SelectRecord';

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

describe('SelectRecord Process', () => {
  it('SelectRecord queries matching records into listobject', async () => {
    const keyentity = makeEntityObject('$__users', [makePhysicalFieldObject('id', 'id', '42')]);
    const listobject = makeListObject('$__users', [
      makePhysicalFieldObject('id', 'id'),
      makePhysicalFieldObject('name', 'name'),
    ]);
    const db = makeMockDb([[{ __f0: '42', __f1: 'Alice' }]]);
    const proc = new SelectRecord();
    proc.setKeyentity(keyentity);
    proc.setListobject(listobject);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, true, 'execute returned true');
    assert.equal(listobject.recordSize(), 1, `recordSize = ${listobject.recordSize()}`);
    assert.equal(listobject.getRecord(0)?.getItemValue('id'), '42');
    assert.equal(listobject.getRecord(0)?.getItemValue('name'), 'Alice');
    assert.equal(db.selects.length, 1);
    assert.match(db.selects[0].sql, /SELECT "id" AS "__f0", "name" AS "__f1" FROM "tbl_users" WHERE "id" = \?/);
    assert.deepEqual(db.selects[0].params, ['42']);
  });

  it('SelectRecord applies LIKE filters with parameters', async () => {
    const keyentity = makeEntityObject('$__users', [makePhysicalFieldObject('name', 'name', 'Ali', 'c')]);
    const listobject = makeListObject('$__users', [makePhysicalFieldObject('name', 'name')]);
    const db = makeMockDb([[{ __f0: 'Alice' }]]);
    const proc = new SelectRecord();
    proc.setKeyentity(keyentity);
    proc.setListobject(listobject);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, true, 'execute returned true');
    assert.equal(listobject.getRecord(0)?.getItemValue('name'), 'Alice');
    assert.match(db.selects[0].sql, /"name" LIKE \? ESCAPE '\\'/);
    assert.deepEqual(db.selects[0].params, ['%Ali%']);
  });

  it('SelectRecord returns true and keeps listobject empty when no rows match', async () => {
    const keyentity = makeEntityObject('$__users', [makePhysicalFieldObject('id', 'id', '404')]);
    const listobject = makeListObject('$__users', [makePhysicalFieldObject('id', 'id')]);
    const db = makeMockDb([[]]);
    const proc = new SelectRecord();
    proc.setKeyentity(keyentity);
    proc.setListobject(listobject);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, true, 'execute returned true');
    assert.equal(listobject.recordSize(), 0, `recordSize = ${listobject.recordSize()}`);
  });

  it('SelectRecord reports missing table id from listobject', async () => {
    const keyentity = makeEntityObject('$__users', [makePhysicalFieldObject('id', 'id', '42')]);
    const listobject = makeListObject('', [makePhysicalFieldObject('id', 'id')]);
    const db = makeMockDb();
    const proc = new SelectRecord();
    proc.setKeyentity(keyentity);
    proc.setListobject(listobject);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, false, 'execute returned false');
    assert.equal(listobject.hasError(), true);
    assert.match(listobject.getErrorMsg(), /SE_NOTABLEID/);
    assert.equal(db.selects.length, 0);
  });

  it('SelectRecord returns false and reports query errors', async () => {
    const keyentity = makeEntityObject('$__users', [makePhysicalFieldObject('id', 'id', '42')]);
    const listobject = makeListObject('$__users', [makePhysicalFieldObject('id', 'id')]);
    const db = makeMockDb();
    db.select = async function select(sql: string, params?: unknown[]) {
      this.selects.push({ sql, params });
      throw new Error('database failed');
    };
    const proc = new SelectRecord();
    proc.setKeyentity(keyentity);
    proc.setListobject(listobject);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, false, 'execute returned false');
    assert.equal(keyentity.hasError(), true);
    assert.match(keyentity.getErrorMsg(), /SE_ERRQUERY/);
  });

  it('chkNull throws when keyentity is unbound', async () => {
    const proc = new SelectRecord();
    proc.setListobject(makeListObject('$__users', []));
    let threw = false;

    try {
      await withMockDb(makeMockDb(), () => proc.execute());
    } catch (e: any) {
      threw = true;
      assert.ok(e.message.includes('need associate object'), `Error: ${e.message}`);
    }

    assert.ok(threw, 'chkNull threw error');
  });

  it('chkNull throws when listobject is unbound', async () => {
    const proc = new SelectRecord();
    proc.setKeyentity(makeEntityObject('$__users', []));
    let threw = false;

    try {
      await withMockDb(makeMockDb(), () => proc.execute());
    } catch (e: any) {
      threw = true;
      assert.ok(e.message.includes('need associate object'), `Error: ${e.message}`);
    }

    assert.ok(threw, 'chkNull threw error');
  });

  it('runProcess — selects records into list output', async () => {
    const items: ItemDef[] = [
      makeEntity('keyentity', '$__users', [makePhysicalField('id', 'id')]),
      makeList('listobject', '$__users', [makePhysicalField('id', 'id'), makePhysicalField('name', 'name')]),
    ];
    const classes: ClassDef[] = [
      {
        name: 'SelectRecord',
        group: 'g1',
        fields: [
          { setter: 'keyentity', value: 'keyentity' },
          { setter: 'listobject', value: 'listobject' },
        ],
      },
    ];
    const db = makeMockDb([[{ __f0: '42', __f1: 'Alice' }]]);
    const ctx = new ProcessContext({ 'keyentity/id': '42' });

    const ok = await withMockDb(db, () => runProcess(ctx, items, classes));

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output['listobject#COUNT'], '1');
    assert.equal(ctx.output['listobject/id#0'], '42');
    assert.equal(ctx.output['listobject/name#0'], 'Alice');
    assert.deepEqual(db.selects[0].params, ['42']);
  });

  it('runProcess — infers list output metadata from SelectRecord bindings', async () => {
    const items: ItemDef[] = [
      {
        name: 'page',
        type: '',
        flags: 'E,',
        defaultValue: '',
        ext: { tableId: 'tbl_s_page' },
        children: [makeField('name'), makeField('remark'), makeField('package')],
      },
      {
        name: 'out',
        type: '',
        flags: '',
        defaultValue: '',
        children: [makeField('name'), makeField('remark'), makeField('package')],
      },
    ];
    const classes: ClassDef[] = [
      {
        name: 'SelectRecord',
        group: '',
        fields: [
          { setter: 'keyentity', value: 'page' },
          { setter: 'showlistsize', value: '' },
          { setter: 'listobject', value: 'out' },
        ],
      },
    ];
    const db = makeMockDb([[{ __f0: 'Home', __f1: 'Top page', __f2: 'default' }]]);
    const ctx = new ProcessContext({ processmode: '3' });

    const ok = await withMockDb(db, () => runProcess(ctx, items, classes));

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output['out#COUNT'], '1');
    assert.equal(ctx.output['out/name#0'], 'Home');
    assert.equal(ctx.output['out/remark#0'], 'Top page');
    assert.equal(ctx.output['out/package#0'], 'default');
    assert.equal(
      db.selects[0].sql,
      'SELECT "name" AS "__f0", "remark" AS "__f1", "package" AS "__f2" FROM "tbl_s_page"'
    );
  });
});
