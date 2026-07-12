import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import '../class-registry';
import { VectorObject } from '../field-objects';
import { ProcessContext } from '../process-context';
import { runProcess, ItemDef, ClassDef } from '../run-process';
import { makeField, makeFieldObject } from '../test-helper';
import { NumberPlus } from './NumberPlus';

describe('NumberPlus Process', () => {
  it('NumberPlus with direct FieldObject usage writes the numeric value to output', async () => {
    const field = makeFieldObject('field', '12.5');
    const outfield = makeFieldObject('outfield');

    const proc = new NumberPlus();
    proc.setFields(field);
    proc.setOutfield(outfield);

    await proc.execute();

    assert.equal(outfield.getValue(), 12.5, `outfield = "${outfield.getValue()}"`);
  });

  it('NumberPlus with VectorObject input sums every field', async () => {
    const field1 = makeFieldObject('field1', '10');
    const field2 = makeFieldObject('field2', '2.5');
    const fields = new VectorObject();
    fields.addItem(field1);
    fields.addItem(field2);
    const outfield = makeFieldObject('outfield');

    const proc = new NumberPlus();
    proc.setFields(fields);
    proc.setOutfield(outfield);

    await proc.execute();

    assert.equal(outfield.getValue(), 12.5, `outfield = "${outfield.getValue()}"`);
  });

  it('NumberPlus with VectorObject output writes the sum to every output field', async () => {
    const field1 = makeFieldObject('field1', '1');
    const field2 = makeFieldObject('field2', '2');
    const fields = new VectorObject();
    fields.addItem(field1);
    fields.addItem(field2);
    const out1 = makeFieldObject('out1');
    const out2 = makeFieldObject('out2');
    const outputs = new VectorObject();
    outputs.addItem(out1);
    outputs.addItem(out2);

    const proc = new NumberPlus();
    proc.setFields(fields);
    proc.setOutfield(outputs);

    await proc.execute();

    assert.equal(out1.getValue(), 3, `out1 = "${out1.getValue()}"`);
    assert.equal(out2.getValue(), 3, `out2 = "${out2.getValue()}"`);
  });

  it('NumberPlus treats blank values as zero', async () => {
    const field1 = makeFieldObject('field1', '');
    const field2 = makeFieldObject('field2', '5');
    const fields = new VectorObject();
    fields.addItem(field1);
    fields.addItem(field2);
    const outfield = makeFieldObject('outfield');

    const proc = new NumberPlus();
    proc.setFields(fields);
    proc.setOutfield(outfield);

    await proc.execute();

    assert.equal(outfield.getValue(), 5, `outfield = "${outfield.getValue()}"`);
  });

  it('chkNull throws when fields is unbound', async () => {
    const outfield = makeFieldObject('outfield');
    const proc = new NumberPlus();
    proc.setOutfield(outfield);
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
    const field = makeFieldObject('field', '1');
    const proc = new NumberPlus();
    proc.setFields(field);
    let threw = false;

    try {
      await proc.execute();
    } catch (e: any) {
      threw = true;
      assert.ok(e.message.includes('need associate object'), `Error: ${e.message}`);
    }

    assert.ok(threw, 'chkNull threw error');
  });

  it('runProcess — sums input values from context', async () => {
    const items: ItemDef[] = [makeField('value1'), makeField('value2'), makeField('result')];
    const classes: ClassDef[] = [
      {
        name: 'NumberPlus',
        group: 'g1',
        fields: [
          { setter: 'fields', value: ['value1', 'value2'] },
          { setter: 'outfield', value: 'result' },
        ],
      },
    ];

    const ctx = new ProcessContext({ value1: '4.5', value2: '5.5' });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output['result'], '10', `result = "${ctx.output['result']}"`);
  });

  it('runProcess — supports fixed values and multi-output vector binding', async () => {
    const items: ItemDef[] = [makeField('result1'), makeField('result2')];
    const classes: ClassDef[] = [
      {
        name: 'NumberPlus',
        group: 'g1',
        fields: [
          { setter: 'fields', value: ['=2', '=3.25'] },
          { setter: 'outfield', value: ['result1', 'result2'] },
        ],
      },
    ];

    const ctx = new ProcessContext();
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output['result1'], '5.25', `result1 = "${ctx.output['result1']}"`);
    assert.equal(ctx.output['result2'], '5.25', `result2 = "${ctx.output['result2']}"`);
  });
});
