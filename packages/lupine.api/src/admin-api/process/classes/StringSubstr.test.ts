import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import '../class-registry';
import { VectorObject } from '../field-objects';
import { ProcessContext } from '../process-context';
import { runProcess, ItemDef, ClassDef } from '../run-process';
import { makeField, makeFieldObject } from '../test-helper';
import { StringSubstr } from './StringSubstr';

describe('StringSubstr Process', () => {
  it('StringSubstr with direct FieldObject usage uses start and length', async () => {
    const field = makeFieldObject('field', 'abcdef');
    const start = makeFieldObject('start', '2');
    const length = makeFieldObject('length', '3');

    const proc = new StringSubstr();
    proc.setFields(field);
    proc.setStart(start);
    proc.setLength(length);

    await proc.execute();

    assert.equal(field.getValue(), 'cde', `field = "${field.getValue()}"`);
  });

  it('StringSubstr without length keeps text from start to end', async () => {
    const field = makeFieldObject('field', 'abcdef');
    const start = makeFieldObject('start', '3');

    const proc = new StringSubstr();
    proc.setFields(field);
    proc.setStart(start);

    await proc.execute();

    assert.equal(field.getValue(), 'def', `field = "${field.getValue()}"`);
  });

  it('StringSubstr without start or length keeps the full string', async () => {
    const field = makeFieldObject('field', 'abcdef');

    const proc = new StringSubstr();
    proc.setFields(field);

    await proc.execute();

    assert.equal(field.getValue(), 'abcdef', `field = "${field.getValue()}"`);
  });

  it('StringSubstr with VectorObject applies substring to every field', async () => {
    const field1 = makeFieldObject('field1', 'abcdef');
    const field2 = makeFieldObject('field2', '123456');
    const start = makeFieldObject('start', '1');
    const length = makeFieldObject('length', '4');
    const fields = new VectorObject();
    fields.addItem(field1);
    fields.addItem(field2);

    const proc = new StringSubstr();
    proc.setFields(fields);
    proc.setStart(start);
    proc.setLength(length);

    await proc.execute();

    assert.equal(field1.getValue(), 'bcde', `field1 = "${field1.getValue()}"`);
    assert.equal(field2.getValue(), '2345', `field2 = "${field2.getValue()}"`);
  });

  it('chkNull throws when fields is unbound', async () => {
    const proc = new StringSubstr();
    let threw = false;

    try {
      await proc.execute();
    } catch (e: any) {
      threw = true;
      assert.ok(e.message.includes('need associate object'), `Error: ${e.message}`);
    }

    assert.ok(threw, 'chkNull threw error');
  });

  it('runProcess — applies start and length from context values', async () => {
    const items: ItemDef[] = [makeField('text'), makeField('start'), makeField('length')];
    const classes: ClassDef[] = [
      {
        name: 'StringSubstr',
        group: 'g1',
        fields: [
          { setter: 'fields', value: 'text' },
          { setter: 'start', value: 'start' },
          { setter: 'length', value: 'length' },
        ],
      },
    ];

    const ctx = new ProcessContext({ text: 'Hello Lupine', start: '6', length: '6' });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output['text'], 'Lupine', `text = "${ctx.output['text']}"`);
  });

  it('runProcess — supports fixed start and length values with multi-field binding', async () => {
    const items: ItemDef[] = [makeField('text1'), makeField('text2')];
    const classes: ClassDef[] = [
      {
        name: 'StringSubstr',
        group: 'g1',
        fields: [
          { setter: 'fields', value: ['text1', 'text2'] },
          { setter: 'start', value: '=1' },
          { setter: 'length', value: '=3' },
        ],
      },
    ];

    const ctx = new ProcessContext({ text1: 'abcdef', text2: '123456' });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output['text1'], 'bcd', `text1 = "${ctx.output['text1']}"`);
    assert.equal(ctx.output['text2'], '234', `text2 = "${ctx.output['text2']}"`);
  });
});
