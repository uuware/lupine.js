import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import '../class-registry';
import { VectorObject } from '../field-objects';
import { ProcessContext } from '../process-context';
import { runProcess, ItemDef, ClassDef } from '../run-process';
import { makeField, makeFieldObject } from '../test-helper';
import { StringToLower } from './StringToLower';

describe('StringToLower Process', () => {
  it('StringToLower with direct FieldObject usage lowercases the value', async () => {
    const field = makeFieldObject('field', 'Hello LUPINE');

    const proc = new StringToLower();
    proc.setFields(field);

    await proc.execute();

    assert.equal(field.getValue(), 'hello lupine', `field = "${field.getValue()}"`);
  });

  it('StringToLower with VectorObject lowercases every field', async () => {
    const field1 = makeFieldObject('field1', 'ABC');
    const field2 = makeFieldObject('field2', 'XyZ');
    const fields = new VectorObject();
    fields.addItem(field1);
    fields.addItem(field2);

    const proc = new StringToLower();
    proc.setFields(fields);

    await proc.execute();

    assert.equal(field1.getValue(), 'abc', `field1 = "${field1.getValue()}"`);
    assert.equal(field2.getValue(), 'xyz', `field2 = "${field2.getValue()}"`);
  });

  it('StringToLower converts blank or missing values to blank strings', async () => {
    const field = makeFieldObject('field');

    const proc = new StringToLower();
    proc.setFields(field);

    await proc.execute();

    assert.equal(field.getValue(), '', `field = "${field.getValue()}"`);
  });

  it('chkNull throws when fields is unbound', async () => {
    const proc = new StringToLower();
    let threw = false;

    try {
      await proc.execute();
    } catch (e: any) {
      threw = true;
      assert.ok(e.message.includes('need associate object'), `Error: ${e.message}`);
    }

    assert.ok(threw, 'chkNull threw error');
  });

  it('runProcess — lowercases input value from context', async () => {
    const items: ItemDef[] = [makeField('text')];
    const classes: ClassDef[] = [
      {
        name: 'StringToLower',
        group: 'g1',
        fields: [{ setter: 'fields', value: 'text' }],
      },
    ];

    const ctx = new ProcessContext({ text: 'Hello WORLD' });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output['text'], 'hello world', `text = "${ctx.output['text']}"`);
  });

  it('runProcess — supports multi-field vector binding', async () => {
    const items: ItemDef[] = [makeField('text1'), makeField('text2')];
    const classes: ClassDef[] = [
      {
        name: 'StringToLower',
        group: 'g1',
        fields: [{ setter: 'fields', value: ['text1', 'text2'] }],
      },
    ];

    const ctx = new ProcessContext({ text1: 'FIRST', text2: 'Second VALUE' });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output['text1'], 'first', `text1 = "${ctx.output['text1']}"`);
    assert.equal(ctx.output['text2'], 'second value', `text2 = "${ctx.output['text2']}"`);
  });
});
