import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import '../class-registry';
import { VectorObject } from '../field-objects';
import { ProcessContext } from '../process-context';
import { runProcess, ItemDef, ClassDef } from '../run-process';
import { makeField, makeFieldObject } from '../test-helper';
import { CheckRange } from './CheckRange';

describe('CheckRange Process', () => {
  it('CheckRange accepts a value inside numeric range', async () => {
    const field = makeFieldObject('field', '5');
    const itemfrom = makeFieldObject('itemfrom', '1');
    const itemto = makeFieldObject('itemto', '10');
    const proc = new CheckRange();
    proc.setFields(field);
    proc.setItemfrom(itemfrom);
    proc.setItemto(itemto);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(field.hasError(), false);
  });

  it('CheckRange accepts boundary values', async () => {
    const field = makeFieldObject('field', '10');
    const itemfrom = makeFieldObject('itemfrom', '1');
    const itemto = makeFieldObject('itemto', '10');
    const proc = new CheckRange();
    proc.setFields(field);
    proc.setItemfrom(itemfrom);
    proc.setItemto(itemto);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(field.hasError(), false);
  });

  it('CheckRange rejects a value below numeric range', async () => {
    const field = makeFieldObject('field', '0');
    const itemfrom = makeFieldObject('itemfrom', '1');
    const itemto = makeFieldObject('itemto', '10');
    const proc = new CheckRange();
    proc.setFields(field);
    proc.setItemfrom(itemfrom);
    proc.setItemto(itemto);

    const ok = await proc.execute();

    assert.equal(ok, false, 'execute returned false');
    assert.equal(field.hasError(), true);
  });

  it('CheckRange rejects a value above numeric range', async () => {
    const field = makeFieldObject('field', '11');
    const itemfrom = makeFieldObject('itemfrom', '1');
    const itemto = makeFieldObject('itemto', '10');
    const proc = new CheckRange();
    proc.setFields(field);
    proc.setItemfrom(itemfrom);
    proc.setItemto(itemto);

    const ok = await proc.execute();

    assert.equal(ok, false, 'execute returned false');
    assert.equal(field.hasError(), true);
  });

  it('CheckRange allows blank target field values', async () => {
    const field = makeFieldObject('field', '');
    const itemfrom = makeFieldObject('itemfrom', '1');
    const itemto = makeFieldObject('itemto', '10');
    const proc = new CheckRange();
    proc.setFields(field);
    proc.setItemfrom(itemfrom);
    proc.setItemto(itemto);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(field.hasError(), false);
  });

  it('CheckRange rejects self range when itemfrom is bigger than itemto', async () => {
    const field = makeFieldObject('field', '5');
    const itemfrom = makeFieldObject('itemfrom', '10');
    const itemto = makeFieldObject('itemto', '1');
    const proc = new CheckRange();
    proc.setFields(field);
    proc.setItemfrom(itemfrom);
    proc.setItemto(itemto);

    const ok = await proc.execute();

    assert.equal(ok, false, 'execute returned false');
    assert.equal(itemfrom.hasError(), true);
    assert.equal(field.hasError(), false);
  });

  it('CheckRange rejects blank itemfrom before range checks', async () => {
    const field = makeFieldObject('field', '5');
    const itemfrom = makeFieldObject('itemfrom', '');
    const itemto = makeFieldObject('itemto', '10');
    const proc = new CheckRange();
    proc.setFields(field);
    proc.setItemfrom(itemfrom);
    proc.setItemto(itemto);

    const ok = await proc.execute();

    assert.equal(ok, false, 'execute returned false');
    assert.equal(itemfrom.hasError(), true);
  });

  it('CheckRange supports VectorObject validation', async () => {
    const field1 = makeFieldObject('field1', '3');
    const field2 = makeFieldObject('field2', '7');
    const fields = new VectorObject();
    fields.addItem(field1);
    fields.addItem(field2);
    const itemfrom = makeFieldObject('itemfrom', '1');
    const itemto = makeFieldObject('itemto', '10');
    const proc = new CheckRange();
    proc.setFields(fields);
    proc.setItemfrom(itemfrom);
    proc.setItemto(itemto);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(field1.hasError(), false);
    assert.equal(field2.hasError(), false);
  });

  it('CheckRange reports the failing item in VectorObject validation', async () => {
    const field1 = makeFieldObject('field1', '3');
    const field2 = makeFieldObject('field2', '12');
    const fields = new VectorObject();
    fields.addItem(field1);
    fields.addItem(field2);
    const itemfrom = makeFieldObject('itemfrom', '1');
    const itemto = makeFieldObject('itemto', '10');
    const proc = new CheckRange();
    proc.setFields(fields);
    proc.setItemfrom(itemfrom);
    proc.setItemto(itemto);

    const ok = await proc.execute();

    assert.equal(ok, false, 'execute returned false');
    assert.equal(field1.hasError(), false);
    assert.equal(field2.hasError(), true);
  });

  it('chkNull throws when fields is unbound', async () => {
    const proc = new CheckRange();
    proc.setItemfrom(makeFieldObject('itemfrom', '1'));
    proc.setItemto(makeFieldObject('itemto', '10'));
    let threw = false;

    try {
      await proc.execute();
    } catch (e: any) {
      threw = true;
      assert.ok(e.message.includes('need associate object'), `Error: ${e.message}`);
    }

    assert.ok(threw, 'chkNull threw error');
  });

  it('runProcess — accepts values inside range from context', async () => {
    const items: ItemDef[] = [makeField('value'), makeField('from'), makeField('to')];
    const classes: ClassDef[] = [
      {
        name: 'CheckRange',
        group: 'g1',
        fields: [
          { setter: 'fields', value: 'value' },
          { setter: 'itemfrom', value: 'from' },
          { setter: 'itemto', value: 'to' },
        ],
      },
    ];

    const ctx = new ProcessContext({ value: '5', from: '1', to: '10' });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output['value'], '5', `value = "${ctx.output['value']}"`);
    assert.equal(ctx.output['value#ERR'], undefined);
  });

  it('runProcess — rejects values outside range from context', async () => {
    const items: ItemDef[] = [makeField('value'), makeField('from'), makeField('to')];
    const classes: ClassDef[] = [
      {
        name: 'CheckRange',
        group: 'g1',
        fields: [
          { setter: 'fields', value: 'value' },
          { setter: 'itemfrom', value: 'from' },
          { setter: 'itemto', value: 'to' },
        ],
      },
    ];

    const ctx = new ProcessContext({ value: '11', from: '1', to: '10' });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, false, 'runProcess returned false');
    assert.equal(ctx.output['value'], '11', `value = "${ctx.output['value']}"`);
    assert.equal(ctx.output['value#ERR'], '1');
  });
});
