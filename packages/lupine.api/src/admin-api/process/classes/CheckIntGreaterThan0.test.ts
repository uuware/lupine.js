import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import '../class-registry';
import { VectorObject } from '../field-objects';
import { ProcessContext } from '../process-context';
import { runProcess, ItemDef, ClassDef } from '../run-process';
import { makeField, makeFieldObject } from '../test-helper';
import { CheckIntGreaterThan0 } from './CheckIntGreaterThan0';

describe('CheckIntGreaterThan0 Process', () => {
  it('CheckIntGreaterThan0 accepts positive integers', async () => {
    const field = makeFieldObject('field', '12');
    const proc = new CheckIntGreaterThan0();
    proc.setFields(field);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(field.getValue(), '12', `field = "${field.getValue()}"`);
    assert.equal(field.hasError(), false);
  });

  it('CheckIntGreaterThan0 normalizes leading plus for positive integers', async () => {
    const field = makeFieldObject('field', '+12');
    const proc = new CheckIntGreaterThan0();
    proc.setFields(field);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(field.getValue(), '12', `field = "${field.getValue()}"`);
    assert.equal(field.hasError(), false);
  });

  it('CheckIntGreaterThan0 rejects zero', async () => {
    const field = makeFieldObject('field', '0');
    const proc = new CheckIntGreaterThan0();
    proc.setFields(field);

    const ok = await proc.execute();

    assert.equal(ok, false, 'execute returned false');
    assert.equal(field.hasError(), true);
  });

  it('CheckIntGreaterThan0 rejects negative integers', async () => {
    const field = makeFieldObject('field', '-1');
    const proc = new CheckIntGreaterThan0();
    proc.setFields(field);

    const ok = await proc.execute();

    assert.equal(ok, false, 'execute returned false');
    assert.equal(field.hasError(), true);
  });

  it('CheckIntGreaterThan0 rejects non-numeric values', async () => {
    const field = makeFieldObject('field', '12a');
    const proc = new CheckIntGreaterThan0();
    proc.setFields(field);

    const ok = await proc.execute();

    assert.equal(ok, false, 'execute returned false');
    assert.equal(field.hasError(), true);
  });

  it('CheckIntGreaterThan0 supports VectorObject validation', async () => {
    const field1 = makeFieldObject('field1', '1');
    const field2 = makeFieldObject('field2', '5');
    const fields = new VectorObject();
    fields.addItem(field1);
    fields.addItem(field2);
    const proc = new CheckIntGreaterThan0();
    proc.setFields(fields);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(field1.hasError(), false);
    assert.equal(field2.hasError(), false);
  });

  it('CheckIntGreaterThan0 reports the failing item in VectorObject validation', async () => {
    const field1 = makeFieldObject('field1', '1');
    const field2 = makeFieldObject('field2', '0');
    const fields = new VectorObject();
    fields.addItem(field1);
    fields.addItem(field2);
    const proc = new CheckIntGreaterThan0();
    proc.setFields(fields);

    const ok = await proc.execute();

    assert.equal(ok, false, 'execute returned false');
    assert.equal(field1.hasError(), false);
    assert.equal(field2.hasError(), true);
  });

  it('chkNull throws when fields is unbound', async () => {
    const proc = new CheckIntGreaterThan0();
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
        name: 'CheckIntGreaterThan0',
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

  it('runProcess — rejects zero input values from context', async () => {
    const items: ItemDef[] = [makeField('value')];
    const classes: ClassDef[] = [
      {
        name: 'CheckIntGreaterThan0',
        group: 'g1',
        fields: [{ setter: 'fields', value: 'value' }],
      },
    ];

    const ctx = new ProcessContext({ value: '0' });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, false, 'runProcess returned false');
    assert.equal(ctx.output['value'], '0', `value = "${ctx.output['value']}"`);
    assert.equal(ctx.output['value#ERR'], '1');
  });

  it('runProcess — supports multi-field vector binding', async () => {
    const items: ItemDef[] = [makeField('value1'), makeField('value2')];
    const classes: ClassDef[] = [
      {
        name: 'CheckIntGreaterThan0',
        group: 'g1',
        fields: [{ setter: 'fields', value: ['value1', 'value2'] }],
      },
    ];

    const ctx = new ProcessContext({ value1: '1', value2: '2' });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output['value1'], '1', `value1 = "${ctx.output['value1']}"`);
    assert.equal(ctx.output['value2'], '2', `value2 = "${ctx.output['value2']}"`);
    assert.equal(ctx.output['value1#ERR'], undefined);
    assert.equal(ctx.output['value2#ERR'], undefined);
  });
});
