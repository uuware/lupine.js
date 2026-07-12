import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import '../class-registry';
import { EntityObject } from '../field-objects';
import { ProcessContext } from '../process-context';
import { runProcess, ClassDef, ItemDef } from '../run-process';
import { makeField, makeFieldObject } from '../test-helper';
import { InitializeEntity } from './InitializeEntity';

const makeEntity = (name: string, children: ItemDef[]): ItemDef => ({
  name,
  type: 'FieldObject',
  flags: 'E,',
  defaultValue: '',
  ext: { tableId: name },
  children,
});

const makeEntityObject = (): EntityObject => {
  const entity = new EntityObject();
  entity.setFieldId('entity');
  entity.addItem(makeFieldObject('name', 'Alice'));
  entity.addItem(makeFieldObject('email', 'alice@example.com'));
  return entity;
};

describe('InitializeEntity Process', () => {
  it('InitializeEntity clears every child field in direct EntityObject usage', async () => {
    const entity = makeEntityObject();
    const proc = new InitializeEntity();
    proc.setEntity(entity);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(entity.getItemValue('name'), '');
    assert.equal(entity.getItemValue('email'), '');
  });

  it('InitializeEntity leaves an empty EntityObject valid', async () => {
    const entity = new EntityObject();
    entity.setFieldId('entity');
    const proc = new InitializeEntity();
    proc.setEntity(entity);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(entity.itemSize(), 0);
  });

  it('chkNull throws when entity is unbound', async () => {
    const proc = new InitializeEntity();
    let threw = false;

    try {
      await proc.execute();
    } catch (e: any) {
      threw = true;
      assert.ok(e.message.includes('need associate object'), `Error: ${e.message}`);
    }

    assert.ok(threw, 'chkNull threw error');
  });

  it('runProcess — clears entity children from context input', async () => {
    const items: ItemDef[] = [makeEntity('user', [makeField('name'), makeField('email')])];
    const classes: ClassDef[] = [
      {
        name: 'InitializeEntity',
        group: 'g1',
        fields: [{ setter: 'entity', value: 'user' }],
      },
    ];
    const ctx = new ProcessContext({ 'user/name': 'Alice', 'user/email': 'alice@example.com' });

    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output['user/name'], '');
    assert.equal(ctx.output['user/email'], '');
  });

  it('runProcess — resolves bare child input aliases before clearing', async () => {
    const items: ItemDef[] = [makeEntity('user', [makeField('name'), makeField('email')])];
    const classes: ClassDef[] = [
      {
        name: 'InitializeEntity',
        group: 'g1',
        fields: [{ setter: 'entity', value: 'user' }],
      },
    ];
    const ctx = new ProcessContext({ name: 'Bob', email: 'bob@example.com' });

    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output['user/name'], '');
    assert.equal(ctx.output['user/email'], '');
  });
});
