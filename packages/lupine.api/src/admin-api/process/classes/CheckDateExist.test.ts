import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import '../class-registry';
import { VectorObject } from '../field-objects';
import { ProcessContext } from '../process-context';
import { runProcess, ItemDef, ClassDef } from '../run-process';
import { makeField, makeFieldObject } from '../test-helper';
import { CheckDateExist } from './CheckDateExist';

describe('CheckDateExist Process', () => {
  it('CheckDateExist accepts an existing YYYYMMDD date', async () => {
    const field = makeFieldObject('field', '20240229');
    const proc = new CheckDateExist();
    proc.setFields(field);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(field.getValue(), '20240229', `field = "${field.getValue()}"`);
    assert.equal(field.hasError(), false);
  });

  it('CheckDateExist normalizes common date separators', async () => {
    const field = makeFieldObject('field', '2024-02-29');
    const proc = new CheckDateExist();
    proc.setFields(field);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(field.getValue(), '20240229', `field = "${field.getValue()}"`);
    assert.equal(field.hasError(), false);
  });

  it('CheckDateExist rejects impossible dates', async () => {
    const field = makeFieldObject('field', '20230229');
    const proc = new CheckDateExist();
    proc.setFields(field);

    const ok = await proc.execute();

    assert.equal(ok, false, 'execute returned false');
    assert.equal(field.hasError(), true);
  });

  it('CheckDateExist rejects invalid month values', async () => {
    const field = makeFieldObject('field', '20241301');
    const proc = new CheckDateExist();
    proc.setFields(field);

    const ok = await proc.execute();

    assert.equal(ok, false, 'execute returned false');
    assert.equal(field.hasError(), true);
  });

  it('CheckDateExist rejects malformed values', async () => {
    const field = makeFieldObject('field', '2024AB01');
    const proc = new CheckDateExist();
    proc.setFields(field);

    const ok = await proc.execute();

    assert.equal(ok, false, 'execute returned false');
    assert.equal(field.hasError(), true);
  });

  it('CheckDateExist allows blank values', async () => {
    const field = makeFieldObject('field', '');
    const proc = new CheckDateExist();
    proc.setFields(field);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(field.hasError(), false);
  });

  it('CheckDateExist supports VectorObject validation', async () => {
    const field1 = makeFieldObject('field1', '20240101');
    const field2 = makeFieldObject('field2', '20241231');
    const fields = new VectorObject();
    fields.addItem(field1);
    fields.addItem(field2);
    const proc = new CheckDateExist();
    proc.setFields(fields);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(field1.hasError(), false);
    assert.equal(field2.hasError(), false);
  });

  it('CheckDateExist reports the failing item in VectorObject validation', async () => {
    const field1 = makeFieldObject('field1', '20240101');
    const field2 = makeFieldObject('field2', '20240230');
    const fields = new VectorObject();
    fields.addItem(field1);
    fields.addItem(field2);
    const proc = new CheckDateExist();
    proc.setFields(fields);

    const ok = await proc.execute();

    assert.equal(ok, false, 'execute returned false');
    assert.equal(field1.hasError(), false);
    assert.equal(field2.hasError(), true);
  });

  it('chkNull throws when fields is unbound', async () => {
    const proc = new CheckDateExist();
    let threw = false;

    try {
      await proc.execute();
    } catch (e: any) {
      threw = true;
      assert.ok(e.message.includes('need associate object'), `Error: ${e.message}`);
    }

    assert.ok(threw, 'chkNull threw error');
  });

  it('runProcess — accepts valid date input values from context', async () => {
    const items: ItemDef[] = [makeField('date')];
    const classes: ClassDef[] = [
      {
        name: 'CheckDateExist',
        group: 'g1',
        fields: [{ setter: 'fields', value: 'date' }],
      },
    ];

    const ctx = new ProcessContext({ date: '2024-02-29' });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output['date'], '20240229', `date = "${ctx.output['date']}"`);
    assert.equal(ctx.output['date#ERR'], undefined);
  });

  it('runProcess — rejects invalid date input values from context', async () => {
    const items: ItemDef[] = [makeField('date')];
    const classes: ClassDef[] = [
      {
        name: 'CheckDateExist',
        group: 'g1',
        fields: [{ setter: 'fields', value: 'date' }],
      },
    ];

    const ctx = new ProcessContext({ date: '2024-02-30' });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, false, 'runProcess returned false');
    assert.equal(ctx.output['date'], '2024-02-30', `date = "${ctx.output['date']}"`);
    assert.equal(ctx.output['date#ERR'], '1');
  });
});
