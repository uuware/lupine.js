import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import '../class-registry';
import { EntityObject, ListObject } from '../field-objects';
import { ProcessContext } from '../process-context';
import { runProcess, ItemDef, ClassDef } from '../run-process';
import { makeField, makeFieldObject } from '../test-helper';
import { CountRecord } from './CountRecord';

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

describe('CountRecord Process', () => {
  it('CountRecord writes the number of records to outfield', async () => {
    const list = makeListObject([{ name: 'Alice' }, { name: 'Bob' }]);
    const outfield = makeFieldObject('outfield', '');
    const proc = new CountRecord();
    proc.setList(list);
    proc.setOutfield(outfield);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(outfield.getValue(), '2', `outfield = "${outfield.getValue()}"`);
  });

  it('CountRecord writes zero for an empty list', async () => {
    const list = makeListObject([]);
    const outfield = makeFieldObject('outfield', 'old');
    const proc = new CountRecord();
    proc.setList(list);
    proc.setOutfield(outfield);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(outfield.getValue(), '0', `outfield = "${outfield.getValue()}"`);
  });

  it('chkNull throws when list is unbound', async () => {
    const proc = new CountRecord();
    proc.setOutfield(makeFieldObject('outfield', ''));
    let threw = false;

    try {
      await proc.execute();
    } catch (e: any) {
      threw = true;
      assert.ok(e.message.includes('need associate object'), `Error: ${e.message}`);
    }

    assert.ok(threw, 'chkNull threw error');
  });

  it('chkNull throws when outfield is unbound', async () => {
    const proc = new CountRecord();
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

  it('runProcess — counts posted list records into output field', async () => {
    const items: ItemDef[] = [makeList('users', [makeField('name')]), makeField('count')];
    const classes: ClassDef[] = [
      {
        name: 'CountRecord',
        group: 'g1',
        fields: [
          { setter: 'list', value: 'users' },
          { setter: 'outfield', value: 'count' },
        ],
      },
    ];

    const ctx = new ProcessContext({ 'users/name#0': 'Alice', 'users/name#1': 'Bob' });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output['count'], '2', `count = "${ctx.output['count']}"`);
    assert.equal(ctx.output['users#COUNT'], '2');
  });

  it('runProcess — writes zero for a list with no posted records', async () => {
    const items: ItemDef[] = [makeList('users', [makeField('name')]), makeField('count')];
    const classes: ClassDef[] = [
      {
        name: 'CountRecord',
        group: 'g1',
        fields: [
          { setter: 'list', value: 'users' },
          { setter: 'outfield', value: 'count' },
        ],
      },
    ];

    const ctx = new ProcessContext();
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output['count'], '0', `count = "${ctx.output['count']}"`);
    assert.equal(ctx.output['users#COUNT'], '0');
  });
});
