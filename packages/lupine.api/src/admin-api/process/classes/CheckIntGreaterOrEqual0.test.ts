import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import '../class-registry';
import { VectorObject } from '../field-objects';
import { ProcessContext } from '../process-context';
import { runProcess, ItemDef, ClassDef } from '../run-process';
import { makeField, makeFieldObject } from '../test-helper';
import { CheckIntGreaterOrEqual0 } from './CheckIntGreaterOrEqual0';

describe('CheckIntGreaterOrEqual0 Process', () => {
  it('CheckIntGreaterOrEqual0 accepts zero', async () => {
    const field = makeFieldObject('field', '0');
    const proc = new CheckIntGreaterOrEqual0();
    proc.setFields(field);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(field.getValue(), '0', `field = "${field.getValue()}"`);
    assert.equal(field.hasError(), false);
  });

  it('CheckIntGreaterOrEqual0 accepts positive integers and normalizes leading plus', async () => {
    const field = makeFieldObject('field', '+12');
    const proc = new CheckIntGreaterOrEqual0();
    proc.setFields(field);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(field.getValue(), '12', `field = "${field.getValue()}"`);
    assert.equal(field.hasError(), false);
  });

  it('CheckIntGreaterOrEqual0 rejects negative integers', async () => {
    const field = makeFieldObject('field', '-1');
    const proc = new CheckIntGreaterOrEqual0();
    proc.setFields(field);

    const ok = await proc.execute();

    assert.equal(ok, false, 'execute returned false');
    assert.equal(field.hasError(), true);
  });

  it('CheckIntGreaterOrEqual0 rejects non-numeric values', async () => {
    const field = makeFieldObject('field', '12a');
    const proc = new CheckIntGreaterOrEqual0();
    proc.setFields(field);

    const ok = await proc.execute();

    assert.equal(ok, false, 'execute returned false');
    assert.equal(field.hasError(), true);
  });

  it('CheckIntGreaterOrEqual0 supports VectorObject validation', async () => {
    const field1 = makeFieldObject('field1', '0');
    const field2 = makeFieldObject('field2', '5');
    const fields = new VectorObject();
    fields.addItem(field1);
    fields.addItem(field2);
    const proc = new CheckIntGreaterOrEqual0();
    proc.setFields(fields);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(field1.hasError(), false);
    assert.equal(field2.hasError(), false);
  });

  it('CheckIntGreaterOrEqual0 reports the failing item in VectorObject validation', async () => {
    const field1 = makeFieldObject('field1', '1');
    const field2 = makeFieldObject('field2', '-2');
    const fields = new VectorObject();
    fields.addItem(field1);
    fields.addItem(field2);
    const proc = new CheckIntGreaterOrEqual0();
    proc.setFields(fields);

    const ok = await proc.execute();

    assert.equal(ok, false, 'execute returned false');
    assert.equal(field1.hasError(), false);
    assert.equal(field2.hasError(), true);
  });

  it('chkNull throws when fields is unbound', async () => {
    const proc = new CheckIntGreaterOrEqual0();
    let threw = false;

    try {
      await proc.execute();
    } catch (e: any) {
      threw = true;
      assert.ok(e.message.includes('need associate object'), `Error: ${e.message}`);
    }

    assert.ok(threw, 'chkNull threw error');
  });

  it('runProcess — accepts valid input values from context', async () => {
    const items: ItemDef[] = [makeField('value')];
    const classes: ClassDef[] = [
      {
        name: 'CheckIntGreaterOrEqual0',
        group: 'g1',
        fields: [{ setter: 'fields', value: 'value' }],
      },
    ];

    const ctx = new ProcessContext({ value: '+3' });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output['value'], '3', `value = "${ctx.output['value']}"`);
    assert.equal(ctx.output['value#ERR'], undefined);
  });

  it('runProcess — rejects invalid input values from context', async () => {
    const items: ItemDef[] = [makeField('value')];
    const classes: ClassDef[] = [
      {
        name: 'CheckIntGreaterOrEqual0',
        group: 'g1',
        fields: [{ setter: 'fields', value: 'value' }],
      },
    ];

    const ctx = new ProcessContext({ value: '-3' });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, false, 'runProcess returned false');
    assert.equal(ctx.output['value'], '-3', `value = "${ctx.output['value']}"`);
    assert.equal(ctx.output['value#ERR'], '1');
  });

  it('runProcess — supports multi-field vector binding', async () => {
    const items: ItemDef[] = [makeField('value1'), makeField('value2')];
    const classes: ClassDef[] = [
      {
        name: 'CheckIntGreaterOrEqual0',
        group: 'g1',
        fields: [{ setter: 'fields', value: ['value1', 'value2'] }],
      },
    ];

    const ctx = new ProcessContext({ value1: '1', value2: '0' });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output['value1'], '1', `value1 = "${ctx.output['value1']}"`);
    assert.equal(ctx.output['value2'], '0', `value2 = "${ctx.output['value2']}"`);
    assert.equal(ctx.output['value1#ERR'], undefined);
    assert.equal(ctx.output['value2#ERR'], undefined);
  });
});
