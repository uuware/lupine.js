import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import '../class-registry';
import { VectorObject } from '../field-objects';
import { ProcessContext } from '../process-context';
import { runProcess, ItemDef, ClassDef } from '../run-process';
import { makeField, makeFieldObject } from '../test-helper';
import { CheckDateFormat } from './CheckDateFormat';

describe('CheckDateFormat Process', () => {
  it('CheckDateFormat accepts YYYYMMDD format', async () => {
    const field = makeFieldObject('field', '20240230');
    const proc = new CheckDateFormat();
    proc.setFields(field);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(field.getValue(), '20240230', `field = "${field.getValue()}"`);
    assert.equal(field.hasError(), false);
  });

  it('CheckDateFormat normalizes common date separators', async () => {
    const field = makeFieldObject('field', '2024-02-30');
    const proc = new CheckDateFormat();
    proc.setFields(field);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(field.getValue(), '20240230', `field = "${field.getValue()}"`);
    assert.equal(field.hasError(), false);
  });

  it('CheckDateFormat rejects malformed values', async () => {
    const field = makeFieldObject('field', '2024AB30');
    const proc = new CheckDateFormat();
    proc.setFields(field);

    const ok = await proc.execute();

    assert.equal(ok, false, 'execute returned false');
    assert.equal(field.hasError(), true);
  });

  it('CheckDateFormat rejects short values', async () => {
    const field = makeFieldObject('field', '2024023');
    const proc = new CheckDateFormat();
    proc.setFields(field);

    const ok = await proc.execute();

    assert.equal(ok, false, 'execute returned false');
    assert.equal(field.hasError(), true);
  });

  it('CheckDateFormat allows blank values', async () => {
    const field = makeFieldObject('field', '');
    const proc = new CheckDateFormat();
    proc.setFields(field);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(field.hasError(), false);
  });

  it('CheckDateFormat supports VectorObject validation', async () => {
    const field1 = makeFieldObject('field1', '20240101');
    const field2 = makeFieldObject('field2', '2024/12/31');
    const fields = new VectorObject();
    fields.addItem(field1);
    fields.addItem(field2);
    const proc = new CheckDateFormat();
    proc.setFields(fields);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(field1.getValue(), '20240101', `field1 = "${field1.getValue()}"`);
    assert.equal(field2.getValue(), '20241231', `field2 = "${field2.getValue()}"`);
    assert.equal(field1.hasError(), false);
    assert.equal(field2.hasError(), false);
  });

  it('CheckDateFormat reports the failing item in VectorObject validation', async () => {
    const field1 = makeFieldObject('field1', '20240101');
    const field2 = makeFieldObject('field2', '2024AB01');
    const fields = new VectorObject();
    fields.addItem(field1);
    fields.addItem(field2);
    const proc = new CheckDateFormat();
    proc.setFields(fields);

    const ok = await proc.execute();

    assert.equal(ok, false, 'execute returned false');
    assert.equal(field1.hasError(), false);
    assert.equal(field2.hasError(), true);
  });

  it('chkNull throws when fields is unbound', async () => {
    const proc = new CheckDateFormat();
    let threw = false;

    try {
      await proc.execute();
    } catch (e: any) {
      threw = true;
      assert.ok(e.message.includes('need associate object'), `Error: ${e.message}`);
    }

    assert.ok(threw, 'chkNull threw error');
  });

  it('runProcess — accepts valid date format input values from context', async () => {
    const items: ItemDef[] = [makeField('date')];
    const classes: ClassDef[] = [
      {
        name: 'CheckDateFormat',
        group: 'g1',
        fields: [{ setter: 'fields', value: 'date' }],
      },
    ];

    const ctx = new ProcessContext({ date: '2024-02-30' });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output['date'], '20240230', `date = "${ctx.output['date']}"`);
    assert.equal(ctx.output['date#ERR'], undefined);
  });

  it('runProcess — rejects invalid date format input values from context', async () => {
    const items: ItemDef[] = [makeField('date')];
    const classes: ClassDef[] = [
      {
        name: 'CheckDateFormat',
        group: 'g1',
        fields: [{ setter: 'fields', value: 'date' }],
      },
    ];

    const ctx = new ProcessContext({ date: '2024AB30' });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, false, 'runProcess returned false');
    assert.equal(ctx.output['date'], '2024AB30', `date = "${ctx.output['date']}"`);
    assert.equal(ctx.output['date#ERR'], '1');
  });
});
