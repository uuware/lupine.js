import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import '../class-registry';
import { VectorObject } from '../field-objects';
import { ProcessContext } from '../process-context';
import { runProcess, ItemDef, ClassDef } from '../run-process';
import { makeField, makeFieldObject } from '../test-helper';
import { CheckTime } from './CheckTime';

describe('CheckTime Process', () => {
  it('CheckTime accepts HHmm format', async () => {
    const field = makeFieldObject('field', '2359');
    const proc = new CheckTime();
    proc.setFields(field);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(field.getValue(), '2359', `field = "${field.getValue()}"`);
    assert.equal(field.hasError(), false);
  });

  it('CheckTime accepts HHmmss format', async () => {
    const field = makeFieldObject('field', '235959');
    const proc = new CheckTime();
    proc.setFields(field);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(field.getValue(), '235959', `field = "${field.getValue()}"`);
    assert.equal(field.hasError(), false);
  });

  it('CheckTime normalizes colon-separated time values', async () => {
    const field = makeFieldObject('field', '23:59:58');
    const proc = new CheckTime();
    proc.setFields(field);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(field.getValue(), '235958', `field = "${field.getValue()}"`);
    assert.equal(field.hasError(), false);
  });

  it('CheckTime rejects invalid hour values', async () => {
    const field = makeFieldObject('field', '2400');
    const proc = new CheckTime();
    proc.setFields(field);

    const ok = await proc.execute();

    assert.equal(ok, false, 'execute returned false');
    assert.equal(field.hasError(), true);
  });

  it('CheckTime rejects invalid minute values', async () => {
    const field = makeFieldObject('field', '2360');
    const proc = new CheckTime();
    proc.setFields(field);

    const ok = await proc.execute();

    assert.equal(ok, false, 'execute returned false');
    assert.equal(field.hasError(), true);
  });

  it('CheckTime rejects malformed values', async () => {
    const field = makeFieldObject('field', '23AB');
    const proc = new CheckTime();
    proc.setFields(field);

    const ok = await proc.execute();

    assert.equal(ok, false, 'execute returned false');
    assert.equal(field.hasError(), true);
  });

  it('CheckTime allows blank values', async () => {
    const field = makeFieldObject('field', '');
    const proc = new CheckTime();
    proc.setFields(field);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(field.hasError(), false);
  });

  it('CheckTime supports VectorObject validation', async () => {
    const field1 = makeFieldObject('field1', '0000');
    const field2 = makeFieldObject('field2', '23:59');
    const fields = new VectorObject();
    fields.addItem(field1);
    fields.addItem(field2);
    const proc = new CheckTime();
    proc.setFields(fields);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(field1.getValue(), '0000', `field1 = "${field1.getValue()}"`);
    assert.equal(field2.getValue(), '2359', `field2 = "${field2.getValue()}"`);
    assert.equal(field1.hasError(), false);
    assert.equal(field2.hasError(), false);
  });

  it('CheckTime reports the failing item in VectorObject validation', async () => {
    const field1 = makeFieldObject('field1', '0000');
    const field2 = makeFieldObject('field2', '2500');
    const fields = new VectorObject();
    fields.addItem(field1);
    fields.addItem(field2);
    const proc = new CheckTime();
    proc.setFields(fields);

    const ok = await proc.execute();

    assert.equal(ok, false, 'execute returned false');
    assert.equal(field1.hasError(), false);
    assert.equal(field2.hasError(), true);
  });

  it('chkNull throws when fields is unbound', async () => {
    const proc = new CheckTime();
    let threw = false;

    try {
      await proc.execute();
    } catch (e: any) {
      threw = true;
      assert.ok(e.message.includes('need associate object'), `Error: ${e.message}`);
    }

    assert.ok(threw, 'chkNull threw error');
  });

  it('runProcess — accepts valid time input values from context', async () => {
    const items: ItemDef[] = [makeField('time')];
    const classes: ClassDef[] = [
      {
        name: 'CheckTime',
        group: 'g1',
        fields: [{ setter: 'fields', value: 'time' }],
      },
    ];

    const ctx = new ProcessContext({ time: '23:59:58' });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output['time'], '235958', `time = "${ctx.output['time']}"`);
    assert.equal(ctx.output['time#ERR'], undefined);
  });

  it('runProcess — rejects invalid time input values from context', async () => {
    const items: ItemDef[] = [makeField('time')];
    const classes: ClassDef[] = [
      {
        name: 'CheckTime',
        group: 'g1',
        fields: [{ setter: 'fields', value: 'time' }],
      },
    ];

    const ctx = new ProcessContext({ time: '24:00' });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, false, 'runProcess returned false');
    assert.equal(ctx.output['time'], '24:00', `time = "${ctx.output['time']}"`);
    assert.equal(ctx.output['time#ERR'], '1');
  });
});
