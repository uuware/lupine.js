import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import '../class-registry';
import { EntityObject, ListObject } from '../field-objects';
import { ProcessContext } from '../process-context';
import { runProcess, ItemDef, ClassDef } from '../run-process';
import { makeField, makeFieldObject } from '../test-helper';
import { CopyList } from './CopyList';

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

describe('CopyList Process', () => {
  it('CopyList clones all records from source to empty destination', async () => {
    const listfrom = makeListObject([
      { name: 'Alice', email: 'alice@example.com' },
      { name: 'Bob', email: 'bob@example.com' },
    ]);
    const listto = makeListObject([]);
    const proc = new CopyList();
    proc.setListfrom(listfrom);
    proc.setListto(listto);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(listto.recordSize(), 2, `recordSize = ${listto.recordSize()}`);
    assert.equal(listto.getRecord(0)?.getItemValue('name'), 'Alice');
    assert.equal(listto.getRecord(0)?.getItemValue('email'), 'alice@example.com');
    assert.equal(listto.getRecord(1)?.getItemValue('name'), 'Bob');
    assert.equal(listto.getRecord(1)?.getItemValue('email'), 'bob@example.com');
  });

  it('CopyList appends cloned records to existing destination records', async () => {
    const listfrom = makeListObject([{ name: 'Alice' }]);
    const listto = makeListObject([{ name: 'Existing' }]);
    const proc = new CopyList();
    proc.setListfrom(listfrom);
    proc.setListto(listto);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(listto.recordSize(), 2, `recordSize = ${listto.recordSize()}`);
    assert.equal(listto.getRecord(0)?.getItemValue('name'), 'Existing');
    assert.equal(listto.getRecord(1)?.getItemValue('name'), 'Alice');
  });

  it('CopyList deep clones source records so later source changes do not affect destination', async () => {
    const listfrom = makeListObject([{ name: 'Alice' }]);
    const listto = makeListObject([]);
    const proc = new CopyList();
    proc.setListfrom(listfrom);
    proc.setListto(listto);

    const ok = await proc.execute();
    listfrom.getRecord(0)?.setItemValue('name', 'Changed');

    assert.equal(ok, true, 'execute returned true');
    assert.equal(listfrom.getRecord(0)?.getItemValue('name'), 'Changed');
    assert.equal(listto.getRecord(0)?.getItemValue('name'), 'Alice');
  });

  it('CopyList handles an empty source list', async () => {
    const listfrom = makeListObject([]);
    const listto = makeListObject([{ name: 'Existing' }]);
    const proc = new CopyList();
    proc.setListfrom(listfrom);
    proc.setListto(listto);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(listto.recordSize(), 1, `recordSize = ${listto.recordSize()}`);
    assert.equal(listto.getRecord(0)?.getItemValue('name'), 'Existing');
  });

  it('chkNull throws when listfrom is unbound', async () => {
    const proc = new CopyList();
    proc.setListto(makeListObject([]));
    let threw = false;

    try {
      await proc.execute();
    } catch (e: any) {
      threw = true;
      assert.ok(e.message.includes('need associate object'), `Error: ${e.message}`);
    }

    assert.ok(threw, 'chkNull threw error');
  });

  it('chkNull throws when listto is unbound', async () => {
    const proc = new CopyList();
    proc.setListfrom(makeListObject([]));
    let threw = false;

    try {
      await proc.execute();
    } catch (e: any) {
      threw = true;
      assert.ok(e.message.includes('need associate object'), `Error: ${e.message}`);
    }

    assert.ok(threw, 'chkNull threw error');
  });

  it('runProcess — copies source list records to destination list output', async () => {
    const items: ItemDef[] = [
      makeList('listfrom', [makeField('name'), makeField('email')]),
      makeList('listto', [makeField('name'), makeField('email')]),
    ];
    const classes: ClassDef[] = [
      {
        name: 'CopyList',
        group: 'g1',
        fields: [
          { setter: 'listfrom', value: 'listfrom' },
          { setter: 'listto', value: 'listto' },
        ],
      },
    ];

    const ctx = new ProcessContext({
      'listfrom/name#0': 'Alice',
      'listfrom/email#0': 'alice@example.com',
      'listfrom/name#1': 'Bob',
      'listfrom/email#1': 'bob@example.com',
    });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output['listto/name#0'], 'Alice', `listto/name#0 = "${ctx.output['listto/name#0']}"`);
    assert.equal(
      ctx.output['listto/email#0'],
      'alice@example.com',
      `listto/email#0 = "${ctx.output['listto/email#0']}"`
    );
    assert.equal(ctx.output['listto/name#1'], 'Bob', `listto/name#1 = "${ctx.output['listto/name#1']}"`);
    assert.equal(ctx.output['listto/email#1'], 'bob@example.com', `listto/email#1 = "${ctx.output['listto/email#1']}"`);
    assert.equal(ctx.output['listto#COUNT'], '2');
  });

  it('runProcess — appends copied records after existing destination list records', async () => {
    const items: ItemDef[] = [makeList('listfrom', [makeField('name')]), makeList('listto', [makeField('name')])];
    const classes: ClassDef[] = [
      {
        name: 'CopyList',
        group: 'g1',
        fields: [
          { setter: 'listfrom', value: 'listfrom' },
          { setter: 'listto', value: 'listto' },
        ],
      },
    ];

    const ctx = new ProcessContext({
      'listfrom/name#0': 'Alice',
      'listto/name#0': 'Existing',
    });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output['listto/name#0'], 'Existing', `listto/name#0 = "${ctx.output['listto/name#0']}"`);
    assert.equal(ctx.output['listto/name#1'], 'Alice', `listto/name#1 = "${ctx.output['listto/name#1']}"`);
    assert.equal(ctx.output['listto#COUNT'], '2');
  });
});
