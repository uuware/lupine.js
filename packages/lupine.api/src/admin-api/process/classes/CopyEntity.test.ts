import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import '../class-registry';
import { EntityObject } from '../field-objects';
import { ProcessContext } from '../process-context';
import { runProcess, ItemDef, ClassDef } from '../run-process';
import { makeField, makeFieldObject } from '../test-helper';
import { CopyEntity } from './CopyEntity';

const makeEntity = (name: string, children: ItemDef[]): ItemDef => ({
  name,
  type: 'FieldObject',
  flags: 'E,',
  defaultValue: '',
  ext: { tableId: name },
  children,
});

const makeEntityObject = (fieldValues: Record<string, string>): EntityObject => {
  const entity = new EntityObject();
  entity.setFieldId('entity');
  for (const [fieldId, value] of Object.entries(fieldValues)) {
    entity.addItem(makeFieldObject(fieldId, value));
  }
  return entity;
};

describe('CopyEntity Process', () => {
  it('CopyEntity copies matching child fields in direct EntityObject usage', async () => {
    const entityfrom = makeEntityObject({ name: 'Alice', email: 'alice@example.com', extra: 'ignored' });
    const entityto = makeEntityObject({ name: 'Old Name', email: 'old@example.com', status: 'active' });
    const proc = new CopyEntity();
    proc.setEntityfrom(entityfrom);
    proc.setEntityto(entityto);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(entityto.getItemValue('name'), 'Alice', `name = "${entityto.getItemValue('name')}"`);
    assert.equal(entityto.getItemValue('email'), 'alice@example.com', `email = "${entityto.getItemValue('email')}"`);
    assert.equal(entityto.getItemValue('status'), 'active', `status = "${entityto.getItemValue('status')}"`);
    assert.equal(entityto.getItem('extra'), null, 'extra field was not added to destination');
  });

  it('CopyEntity leaves the destination unchanged when source has no matching fields', async () => {
    const entityfrom = makeEntityObject({ other: 'value' });
    const entityto = makeEntityObject({ name: 'Old Name' });
    const proc = new CopyEntity();
    proc.setEntityfrom(entityfrom);
    proc.setEntityto(entityto);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(entityto.getItemValue('name'), 'Old Name', `name = "${entityto.getItemValue('name')}"`);
    assert.equal(entityto.getItem('other'), null, 'other field was not added to destination');
  });

  it('chkNull throws when entityfrom is unbound', async () => {
    const proc = new CopyEntity();
    proc.setEntityto(makeEntityObject({ name: 'Old Name' }));
    let threw = false;

    try {
      await proc.execute();
    } catch (e: any) {
      threw = true;
      assert.ok(e.message.includes('need associate object'), `Error: ${e.message}`);
    }

    assert.ok(threw, 'chkNull threw error');
  });

  it('chkNull throws when entityto is unbound', async () => {
    const proc = new CopyEntity();
    proc.setEntityfrom(makeEntityObject({ name: 'Alice' }));
    let threw = false;

    try {
      await proc.execute();
    } catch (e: any) {
      threw = true;
      assert.ok(e.message.includes('need associate object'), `Error: ${e.message}`);
    }

    assert.ok(threw, 'chkNull threw error');
  });

  it('runProcess — copies matching entity children from source to destination', async () => {
    const items: ItemDef[] = [
      makeEntity('from', [makeField('name'), makeField('email'), makeField('extra')]),
      makeEntity('to', [
        makeField('name', 'Old Name'),
        makeField('email', 'old@example.com'),
        makeField('status', 'active'),
      ]),
    ];
    const classes: ClassDef[] = [
      {
        name: 'CopyEntity',
        group: 'g1',
        fields: [
          { setter: 'entityfrom', value: 'from' },
          { setter: 'entityto', value: 'to' },
        ],
      },
    ];

    const ctx = new ProcessContext({
      'from/name': 'Alice',
      'from/email': 'alice@example.com',
      'from/extra': 'ignored',
    });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output['to/name'], 'Alice', `to/name = "${ctx.output['to/name']}"`);
    assert.equal(ctx.output['to/email'], 'alice@example.com', `to/email = "${ctx.output['to/email']}"`);
    assert.equal(ctx.output['to/status'], 'active', `to/status = "${ctx.output['to/status']}"`);
    assert.equal(ctx.output['to/extra'], undefined);
  });

  it('runProcess — resolves bare child input aliases before copying', async () => {
    const items: ItemDef[] = [
      makeEntity('from', [makeField('name'), makeField('email')]),
      makeEntity('to', [makeField('name'), makeField('email')]),
    ];
    const classes: ClassDef[] = [
      {
        name: 'CopyEntity',
        group: 'g1',
        fields: [
          { setter: 'entityfrom', value: 'from' },
          { setter: 'entityto', value: 'to' },
        ],
      },
    ];

    const ctx = new ProcessContext({ name: 'Bob', email: 'bob@example.com' });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output['to/name'], 'Bob', `to/name = "${ctx.output['to/name']}"`);
    assert.equal(ctx.output['to/email'], 'bob@example.com', `to/email = "${ctx.output['to/email']}"`);
  });
});
