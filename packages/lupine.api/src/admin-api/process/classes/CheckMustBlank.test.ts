import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import '../class-registry';
import { VectorObject } from '../field-objects';
import { ProcessContext } from '../process-context';
import { runProcess, ItemDef, ClassDef } from '../run-process';
import { makeField, makeFieldObject } from '../test-helper';
import { CheckMustBlank } from './CheckMustBlank';

describe('CheckMustBlank Process', () => {
  it('CheckMustBlank accepts a blank FieldObject', async () => {
    const field = makeFieldObject('field', '');
    const proc = new CheckMustBlank();
    proc.setFields(field);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(field.hasError(), false);
  });

  it('CheckMustBlank rejects a non-blank FieldObject', async () => {
    const field = makeFieldObject('field', 'value');
    const proc = new CheckMustBlank();
    proc.setFields(field);

    const ok = await proc.execute();

    assert.equal(ok, false, 'execute returned false');
    assert.equal(field.hasError(), true);
    assert.match(field.getErrorMsg(), /S_NOTBLANK/);
  });

  it('CheckMustBlank accepts a VectorObject when every item is blank', async () => {
    const field1 = makeFieldObject('field1', '');
    const field2 = makeFieldObject('field2', null as unknown as string);
    const fields = new VectorObject();
    fields.addItem(field1);
    fields.addItem(field2);
    const proc = new CheckMustBlank();
    proc.setFields(fields);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(field1.hasError(), false);
    assert.equal(field2.hasError(), false);
  });

  it('CheckMustBlank reports only non-blank VectorObject items', async () => {
    const field1 = makeFieldObject('field1', '');
    const field2 = makeFieldObject('field2', 'value');
    const fields = new VectorObject();
    fields.addItem(field1);
    fields.addItem(field2);
    const proc = new CheckMustBlank();
    proc.setFields(fields);

    const ok = await proc.execute();

    assert.equal(ok, false, 'execute returned false');
    assert.equal(field1.hasError(), false);
    assert.equal(field2.hasError(), true);
    assert.match(field2.getErrorMsg(), /S_NOTBLANK/);
  });

  it('chkNull throws when fields is unbound', async () => {
    const proc = new CheckMustBlank();
    let threw = false;

    try {
      await proc.execute();
    } catch (e: any) {
      threw = true;
      assert.ok(e.message.includes('need associate object'), `Error: ${e.message}`);
    }

    assert.ok(threw, 'chkNull threw error');
  });

  it('runProcess — accepts blank input values from context', async () => {
    const items: ItemDef[] = [makeField('field')];
    const classes: ClassDef[] = [
      {
        name: 'CheckMustBlank',
        group: 'g1',
        fields: [{ setter: 'fields', value: 'field' }],
      },
    ];

    const ctx = new ProcessContext({ field: '' });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output['field'], '', `field = "${ctx.output['field']}"`);
    assert.equal(ctx.output['field#ERR'], undefined);
  });

  it('runProcess — rejects non-blank input values from context', async () => {
    const items: ItemDef[] = [makeField('field')];
    const classes: ClassDef[] = [
      {
        name: 'CheckMustBlank',
        group: 'g1',
        fields: [{ setter: 'fields', value: 'field' }],
      },
    ];

    const ctx = new ProcessContext({ field: 'value' });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, false, 'runProcess returned false');
    assert.equal(ctx.output['field'], 'value', `field = "${ctx.output['field']}"`);
    assert.equal(ctx.output['field#ERR'], '1');
  });

  it('runProcess — supports multi-field vector validation', async () => {
    const items: ItemDef[] = [makeField('field1'), makeField('field2')];
    const classes: ClassDef[] = [
      {
        name: 'CheckMustBlank',
        group: 'g1',
        fields: [{ setter: 'fields', value: ['field1', 'field2'] }],
      },
    ];

    const ctx = new ProcessContext({ field1: '', field2: 'value' });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, false, 'runProcess returned false');
    assert.equal(ctx.output['field1#ERR'], undefined);
    assert.equal(ctx.output['field2#ERR'], '1');
  });
});
