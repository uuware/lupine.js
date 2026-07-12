import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import '../class-registry';
import { VectorObject } from '../field-objects';
import { ProcessContext } from '../process-context';
import { runProcess, ItemDef, ClassDef } from '../run-process';
import { makeField, makeFieldObject } from '../test-helper';
import { StringTrim } from './StringTrim';

describe('StringTrim Process', () => {
  it('StringTrim with direct FieldObject usage trims leading and trailing whitespace', async () => {
    const field = makeFieldObject('field', '  Hello Lupine  ');

    const proc = new StringTrim();
    proc.setFields(field);

    await proc.execute();

    assert.equal(field.getValue(), 'Hello Lupine', `field = "${field.getValue()}"`);
  });

  it('StringTrim with VectorObject trims every field', async () => {
    const field1 = makeFieldObject('field1', '  abc');
    const field2 = makeFieldObject('field2', 'xyz  ');
    const fields = new VectorObject();
    fields.addItem(field1);
    fields.addItem(field2);

    const proc = new StringTrim();
    proc.setFields(fields);

    await proc.execute();

    assert.equal(field1.getValue(), 'abc', `field1 = "${field1.getValue()}"`);
    assert.equal(field2.getValue(), 'xyz', `field2 = "${field2.getValue()}"`);
  });

  it('StringTrim preserves internal whitespace', async () => {
    const field = makeFieldObject('field', '  Hello   Lupine  ');

    const proc = new StringTrim();
    proc.setFields(field);

    await proc.execute();

    assert.equal(field.getValue(), 'Hello   Lupine', `field = "${field.getValue()}"`);
  });

  it('StringTrim converts blank or missing values to blank strings', async () => {
    const field = makeFieldObject('field');

    const proc = new StringTrim();
    proc.setFields(field);

    await proc.execute();

    assert.equal(field.getValue(), '', `field = "${field.getValue()}"`);
  });

  it('chkNull throws when fields is unbound', async () => {
    const proc = new StringTrim();
    let threw = false;

    try {
      await proc.execute();
    } catch (e: any) {
      threw = true;
      assert.ok(e.message.includes('need associate object'), `Error: ${e.message}`);
    }

    assert.ok(threw, 'chkNull threw error');
  });

  it('runProcess — trims input value from context', async () => {
    const items: ItemDef[] = [makeField('text')];
    const classes: ClassDef[] = [
      {
        name: 'StringTrim',
        group: 'g1',
        fields: [{ setter: 'fields', value: 'text' }],
      },
    ];

    const ctx = new ProcessContext({ text: '  Hello World  ' });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output['text'], 'Hello World', `text = "${ctx.output['text']}"`);
  });

  it('runProcess — supports multi-field vector binding', async () => {
    const items: ItemDef[] = [makeField('text1'), makeField('text2')];
    const classes: ClassDef[] = [
      {
        name: 'StringTrim',
        group: 'g1',
        fields: [{ setter: 'fields', value: ['text1', 'text2'] }],
      },
    ];

    const ctx = new ProcessContext({ text1: ' first ', text2: '\tsecond value\n' });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output['text1'], 'first', `text1 = "${ctx.output['text1']}"`);
    assert.equal(ctx.output['text2'], 'second value', `text2 = "${ctx.output['text2']}"`);
  });
});
