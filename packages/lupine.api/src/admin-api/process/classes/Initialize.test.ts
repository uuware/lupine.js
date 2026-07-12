import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import '../class-registry';
import { VectorObject } from '../field-objects';
import { ProcessContext } from '../process-context';
import { runProcess, ClassDef, ItemDef } from '../run-process';
import { makeField, makeFieldObject } from '../test-helper';
import { Initialize } from './Initialize';

describe('Initialize Process', () => {
  it('Initialize clears a direct FieldObject value', async () => {
    const field = makeFieldObject('name', 'Alice');
    const proc = new Initialize();
    proc.setFields(field);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(field.getValue(), '');
  });

  it('Initialize clears every field in a VectorObject', async () => {
    const fields = new VectorObject();
    fields.addItem(makeFieldObject('first', 'Alice'));
    fields.addItem(makeFieldObject('last', 'Smith'));
    const proc = new Initialize();
    proc.setFields(fields);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(fields.getItemValue(0), '');
    assert.equal(fields.getItemValue(1), '');
  });

  it('Initialize leaves an empty VectorObject valid', async () => {
    const fields = new VectorObject();
    const proc = new Initialize();
    proc.setFields(fields);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(fields.itemSize(), 0);
  });

  it('chkNull throws when fields is unbound', async () => {
    const proc = new Initialize();
    let threw = false;

    try {
      await proc.execute();
    } catch (e: any) {
      threw = true;
      assert.ok(e.message.includes('need associate object'), `Error: ${e.message}`);
    }

    assert.ok(threw, 'chkNull threw error');
  });

  it('runProcess — clears one input field', async () => {
    const items: ItemDef[] = [makeField('name')];
    const classes: ClassDef[] = [
      {
        name: 'Initialize',
        group: 'g1',
        fields: [{ setter: 'fields', value: 'name' }],
      },
    ];
    const ctx = new ProcessContext({ name: 'Alice' });

    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output.name, '');
  });

  it('runProcess — clears multiple input fields', async () => {
    const items: ItemDef[] = [makeField('first'), makeField('last')];
    const classes: ClassDef[] = [
      {
        name: 'Initialize',
        group: 'g1',
        fields: [{ setter: 'fields', value: ['first', 'last'] }],
      },
    ];
    const ctx = new ProcessContext({ first: 'Alice', last: 'Smith' });

    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output.first, '');
    assert.equal(ctx.output.last, '');
  });
});
