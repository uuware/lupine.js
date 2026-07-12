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
import { SelectAllRecord } from './SelectAllRecord';

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

describe('SelectAllRecord Process', () => {
  it('SelectAllRecord appends every returned row without adding a SQL limit', async () => {
    const keyentity = makeEntityObject('$__users', [makePhysicalFieldObject('status', 'status', 'active')]);
    const listobject = makeListObject('$__users', [
      makePhysicalFieldObject('id', 'id'),
      makePhysicalFieldObject('name', 'name'),
    ]);
    const db = makeMockDb([
      [
        { __f0: '1', __f1: 'Alice' },
        { __f0: '2', __f1: 'Bob' },
      ],
    ]);
    const proc = new SelectAllRecord();
    proc.setKeyentity(keyentity);
    proc.setListobject(listobject);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, true, 'execute returned true');
    assert.equal(listobject.recordSize(), 2, `recordSize = ${listobject.recordSize()}`);
    assert.equal(listobject.getRecord(0)?.getItemValue('id'), '1');
    assert.equal(listobject.getRecord(0)?.getItemValue('name'), 'Alice');
    assert.equal(listobject.getRecord(1)?.getItemValue('id'), '2');
    assert.equal(listobject.getRecord(1)?.getItemValue('name'), 'Bob');
    assert.equal(db.selects[0].sql.includes(' LIMIT '), false, db.selects[0].sql);
    assert.deepEqual(db.selects[0].params, ['active']);
  });

  it('SelectAllRecord keeps listobject empty when the query returns no rows', async () => {
    const keyentity = makeEntityObject('$__users', [makePhysicalFieldObject('status', 'status', 'missing')]);
    const listobject = makeListObject('$__users', [makePhysicalFieldObject('id', 'id')]);
    const db = makeMockDb([[]]);
    const proc = new SelectAllRecord();
    proc.setKeyentity(keyentity);
    proc.setListobject(listobject);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, true, 'execute returned true');
    assert.equal(listobject.recordSize(), 0, `recordSize = ${listobject.recordSize()}`);
    assert.equal(db.selects[0].sql.includes(' LIMIT '), false, db.selects[0].sql);
  });

  it('chkNull throws when listobject is unbound', async () => {
    const proc = new SelectAllRecord();
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

  it('runProcess — selects all records into list output', async () => {
    const items: ItemDef[] = [
      makeEntity('keyentity', '$__users', [makePhysicalField('status', 'status')]),
      makeList('listobject', '$__users', [makePhysicalField('id', 'id'), makePhysicalField('name', 'name')]),
    ];
    const classes: ClassDef[] = [
      {
        name: 'SelectAllRecord',
        group: 'g1',
        fields: [
          { setter: 'keyentity', value: 'keyentity' },
          { setter: 'listobject', value: 'listobject' },
        ],
      },
    ];
    const db = makeMockDb([
      [
        { __f0: '1', __f1: 'Alice' },
        { __f0: '2', __f1: 'Bob' },
      ],
    ]);
    const ctx = new ProcessContext({ 'keyentity/status': 'active' });

    const ok = await withMockDb(db, () => runProcess(ctx, items, classes));

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output['listobject#COUNT'], '2');
    assert.equal(ctx.output['listobject/id#0'], '1');
    assert.equal(ctx.output['listobject/name#0'], 'Alice');
    assert.equal(ctx.output['listobject/id#1'], '2');
    assert.equal(ctx.output['listobject/name#1'], 'Bob');
    assert.equal(db.selects[0].sql.includes(' LIMIT '), false, db.selects[0].sql);
    assert.deepEqual(db.selects[0].params, ['active']);
  });
});
