import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import '../class-registry';
import { EntityObject, ListObject } from '../field-objects';
import { ProcessContext } from '../process-context';
import { runProcess, ItemDef, ClassDef } from '../run-process';
import { makeField, makeFieldObject } from '../test-helper';
import { RemoveList } from './RemoveList';

const makeList = (name: string, children: ItemDef[]): ItemDef => ({
  name,
  type: 'FieldObject',
  flags: 'L,',
  defaultValue: '',
  ext: { tableId: name },
  children,
});

const makeRecord = (values: Record<string, string>): EntityObject => {
  const entity = new EntityObject();
  for (const [fieldId, value] of Object.entries(values)) {
    entity.addItem(makeFieldObject(fieldId, value));
  }
  return entity;
};

const makeListObject = (records: Array<Record<string, string>>): ListObject => {
  const list = new ListObject();
  list.setFieldId('list');
  for (const record of records) {
    list.addRecord(makeRecord(record));
  }
  return list;
};

describe('RemoveList Process', () => {
  it('RemoveList removes records whose referId field equals referValue', async () => {
    const list = makeListObject([
      { status: 'keep', name: 'Alice' },
      { status: 'delete', name: 'Bob' },
      { status: 'keep', name: 'Carol' },
      { status: 'delete', name: 'Dave' },
    ]);
    const proc = new RemoveList();
    proc.setReferId(makeFieldObject('referId', 'status'));
    proc.setReferValue(makeFieldObject('referValue', 'delete'));
    proc.setList(list);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(list.recordSize(), 2, `recordSize = ${list.recordSize()}`);
    assert.equal(list.getRecord(0)?.getItemValue('name'), 'Alice');
    assert.equal(list.getRecord(1)?.getItemValue('name'), 'Carol');
  });

  it('RemoveList uses 1 as the default referValue when referValue is unbound', async () => {
    const list = makeListObject([
      { remove: '1', name: 'Delete' },
      { remove: '0', name: 'Keep' },
    ]);
    const proc = new RemoveList();
    proc.setReferId(makeFieldObject('referId', 'remove'));
    proc.setList(list);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(list.recordSize(), 1, `recordSize = ${list.recordSize()}`);
    assert.equal(list.getRecord(0)?.getItemValue('name'), 'Keep');
  });

  it('RemoveList keeps all records when no values match referValue', async () => {
    const list = makeListObject([{ status: 'keep' }, { status: 'pending' }]);
    const proc = new RemoveList();
    proc.setReferId(makeFieldObject('referId', 'status'));
    proc.setReferValue(makeFieldObject('referValue', 'delete'));
    proc.setList(list);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(list.recordSize(), 2, `recordSize = ${list.recordSize()}`);
  });

  it('RemoveList returns false and reports an error when referId is blank', async () => {
    const referId = makeFieldObject('referId', '');
    const list = makeListObject([{ status: 'delete' }]);
    const proc = new RemoveList();
    proc.setReferId(referId);
    proc.setReferValue(makeFieldObject('referValue', 'delete'));
    proc.setList(list);

    const ok = await proc.execute();

    assert.equal(ok, false, 'execute returned false');
    assert.equal(referId.hasError(), true);
    assert.match(referId.getErrorMsg(), /S_BLANK/);
    assert.equal(list.recordSize(), 1, `recordSize = ${list.recordSize()}`);
  });

  it('chkNull throws when referId is unbound', async () => {
    const proc = new RemoveList();
    proc.setList(makeListObject([]));
    let threw = false;

    try {
      await proc.execute();
    } catch (e: any) {
      threw = true;
      assert.ok(e.message.includes('need associate object'), `Error: ${e.message}`);
    }

    assert.ok(threw, 'chkNull threw error');
  });

  it('chkNull throws when list is unbound', async () => {
    const proc = new RemoveList();
    proc.setReferId(makeFieldObject('referId', 'status'));
    let threw = false;

    try {
      await proc.execute();
    } catch (e: any) {
      threw = true;
      assert.ok(e.message.includes('need associate object'), `Error: ${e.message}`);
    }

    assert.ok(threw, 'chkNull threw error');
  });

  it('runProcess — removes matching posted list records', async () => {
    const items: ItemDef[] = [
      makeField('referId'),
      makeField('referValue'),
      makeList('users', [makeField('status'), makeField('name')]),
    ];
    const classes: ClassDef[] = [
      {
        name: 'RemoveList',
        group: 'g1',
        fields: [
          { setter: 'referId', value: 'referId' },
          { setter: 'referValue', value: 'referValue' },
          { setter: 'list', value: 'users' },
        ],
      },
    ];

    const ctx = new ProcessContext({
      referId: 'status',
      referValue: 'delete',
      'users/status#0': 'keep',
      'users/name#0': 'Alice',
      'users/status#1': 'delete',
      'users/name#1': 'Bob',
      'users/status#2': 'keep',
      'users/name#2': 'Carol',
    });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output['users#COUNT'], '2');
    assert.equal(ctx.output['users/name#0'], 'Alice', `users/name#0 = "${ctx.output['users/name#0']}"`);
    assert.equal(ctx.output['users/name#1'], 'Carol', `users/name#1 = "${ctx.output['users/name#1']}"`);
  });

  it('runProcess — supports fixed referId and fixed referValue values', async () => {
    const items: ItemDef[] = [makeList('users', [makeField('status'), makeField('name')])];
    const classes: ClassDef[] = [
      {
        name: 'RemoveList',
        group: 'g1',
        fields: [
          { setter: 'referId', value: '=status' },
          { setter: 'referValue', value: '=delete' },
          { setter: 'list', value: 'users' },
        ],
      },
    ];

    const ctx = new ProcessContext({
      'users/status#0': 'delete',
      'users/name#0': 'Bob',
      'users/status#1': 'keep',
      'users/name#1': 'Alice',
    });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output['users#COUNT'], '1');
    assert.equal(ctx.output['users/name#0'], 'Alice', `users/name#0 = "${ctx.output['users/name#0']}"`);
  });
});
