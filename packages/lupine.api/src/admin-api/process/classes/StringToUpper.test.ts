import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import '../class-registry';
import { VectorObject } from '../field-objects';
import { ProcessContext } from '../process-context';
import { runProcess, ItemDef, ClassDef } from '../run-process';
import { makeField, makeFieldObject } from '../test-helper';
import { StringToUpper } from './StringToUpper';

describe('StringToUpper Process', () => {
  it('StringToUpper with direct FieldObject usage uppercases the value', async () => {
    const field = makeFieldObject('field', 'Hello lupine');

    const proc = new StringToUpper();
    proc.setFields(field);

    await proc.execute();

    assert.equal(field.getValue(), 'HELLO LUPINE', `field = "${field.getValue()}"`);
  });

  it('StringToUpper with VectorObject uppercases every field', async () => {
    const field1 = makeFieldObject('field1', 'abc');
    const field2 = makeFieldObject('field2', 'xYz');
    const fields = new VectorObject();
    fields.addItem(field1);
    fields.addItem(field2);

    const proc = new StringToUpper();
    proc.setFields(fields);

    await proc.execute();

    assert.equal(field1.getValue(), 'ABC', `field1 = "${field1.getValue()}"`);
    assert.equal(field2.getValue(), 'XYZ', `field2 = "${field2.getValue()}"`);
  });

  it('StringToUpper converts blank or missing values to blank strings', async () => {
    const field = makeFieldObject('field');

    const proc = new StringToUpper();
    proc.setFields(field);

    await proc.execute();

    assert.equal(field.getValue(), '', `field = "${field.getValue()}"`);
  });

  it('chkNull throws when fields is unbound', async () => {
    const proc = new StringToUpper();
    let threw = false;

    try {
      await proc.execute();
    } catch (e: any) {
      threw = true;
      assert.ok(e.message.includes('need associate object'), `Error: ${e.message}`);
    }

    assert.ok(threw, 'chkNull threw error');
  });

  it('runProcess — uppercases input value from context', async () => {
    const items: ItemDef[] = [makeField('text')];
    const classes: ClassDef[] = [
      {
        name: 'StringToUpper',
        group: 'g1',
        fields: [{ setter: 'fields', value: 'text' }],
      },
    ];

    const ctx = new ProcessContext({ text: 'Hello world' });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output['text'], 'HELLO WORLD', `text = "${ctx.output['text']}"`);
  });

  it('runProcess — supports multi-field vector binding', async () => {
    const items: ItemDef[] = [makeField('text1'), makeField('text2')];
    const classes: ClassDef[] = [
      {
        name: 'StringToUpper',
        group: 'g1',
        fields: [{ setter: 'fields', value: ['text1', 'text2'] }],
      },
    ];

    const ctx = new ProcessContext({ text1: 'first', text2: 'Second value' });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output['text1'], 'FIRST', `text1 = "${ctx.output['text1']}"`);
    assert.equal(ctx.output['text2'], 'SECOND VALUE', `text2 = "${ctx.output['text2']}"`);
  });
});
