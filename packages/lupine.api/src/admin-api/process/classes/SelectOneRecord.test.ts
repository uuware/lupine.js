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
import { SelectOneRecord } from './SelectOneRecord';

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

describe('SelectOneRecord Process', () => {
  it('SelectOneRecord limits the query to one row and appends only the first record', async () => {
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
    const proc = new SelectOneRecord();
    proc.setKeyentity(keyentity);
    proc.setListobject(listobject);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, true, 'execute returned true');
    assert.equal(listobject.recordSize(), 1, `recordSize = ${listobject.recordSize()}`);
    assert.equal(listobject.getRecord(0)?.getItemValue('id'), '1');
    assert.equal(listobject.getRecord(0)?.getItemValue('name'), 'Alice');
    assert.match(db.selects[0].sql, / LIMIT 1$/);
    assert.deepEqual(db.selects[0].params, ['active']);
  });

  it('SelectOneRecord keeps listobject empty when the query returns no rows', async () => {
    const keyentity = makeEntityObject('$__users', [makePhysicalFieldObject('status', 'status', 'missing')]);
    const listobject = makeListObject('$__users', [makePhysicalFieldObject('id', 'id')]);
    const db = makeMockDb([[]]);
    const proc = new SelectOneRecord();
    proc.setKeyentity(keyentity);
    proc.setListobject(listobject);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, true, 'execute returned true');
    assert.equal(listobject.recordSize(), 0, `recordSize = ${listobject.recordSize()}`);
    assert.match(db.selects[0].sql, / LIMIT 1$/);
  });

  it('chkNull throws when keyentity is unbound', async () => {
    const proc = new SelectOneRecord();
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

  it('runProcess — selects one record into list output', async () => {
    const items: ItemDef[] = [
      makeEntity('keyentity', '$__users', [makePhysicalField('status', 'status')]),
      makeList('listobject', '$__users', [makePhysicalField('id', 'id'), makePhysicalField('name', 'name')]),
    ];
    const classes: ClassDef[] = [
      {
        name: 'SelectOneRecord',
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
    assert.equal(ctx.output['listobject#COUNT'], '1');
    assert.equal(ctx.output['listobject/id#0'], '1');
    assert.equal(ctx.output['listobject/name#0'], 'Alice');
    assert.match(db.selects[0].sql, / LIMIT 1$/);
  });
});
