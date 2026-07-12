import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import '../class-registry';
import { EntityObject, ListObject } from '../field-objects';
import { ProcessContext } from '../process-context';
import { runProcess, ClassDef, ItemDef } from '../run-process';
import { makeField, makeFieldObject } from '../test-helper';
import { InitializeList } from './InitializeList';

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

describe('InitializeList Process', () => {
  it('InitializeList clears all direct ListObject records', async () => {
    const list = makeListObject([{ name: 'Alice' }, { name: 'Bob' }]);
    const proc = new InitializeList();
    proc.setList(list);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(list.recordSize(), 0);
  });

  it('InitializeList leaves an empty ListObject valid', async () => {
    const list = makeListObject([]);
    const proc = new InitializeList();
    proc.setList(list);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(list.recordSize(), 0);
  });

  it('chkNull throws when list is unbound', async () => {
    const proc = new InitializeList();
    let threw = false;

    try {
      await proc.execute();
    } catch (e: any) {
      threw = true;
      assert.ok(e.message.includes('need associate object'), `Error: ${e.message}`);
    }

    assert.ok(threw, 'chkNull threw error');
  });

  it('runProcess — clears posted list records', async () => {
    const items: ItemDef[] = [makeList('users', [makeField('name'), makeField('email')])];
    const classes: ClassDef[] = [
      {
        name: 'InitializeList',
        group: 'g1',
        fields: [{ setter: 'list', value: 'users' }],
      },
    ];
    const ctx = new ProcessContext({
      'users/name#0': 'Alice',
      'users/email#0': 'alice@example.com',
      'users/name#1': 'Bob',
      'users/email#1': 'bob@example.com',
    });

    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output['users#COUNT'], '0');
    assert.equal(ctx.output['users/name#0'], undefined);
    assert.equal(ctx.output['users/email#0'], undefined);
  });
});
