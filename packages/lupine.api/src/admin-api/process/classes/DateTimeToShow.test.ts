import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import '../class-registry';
import { VectorObject } from '../field-objects';
import { ProcessContext } from '../process-context';
import { runProcess, ItemDef, ClassDef } from '../run-process';
import { makeField, makeFieldObject } from '../test-helper';
import { DateTimeToShow } from './DateTimeToShow';

describe('DateTimeToShow Process', () => {
  it('DateTimeToShow splits compact timestamp values into display date, time, and timestamp', async () => {
    const input = makeFieldObject('input', '20091105 133714.521');
    const fieldsdate = makeFieldObject('fieldsdate', 'old-date');
    const fieldstime = makeFieldObject('fieldstime', 'old-time');
    const fieldstimestamp = makeFieldObject('fieldstimestamp', 'old-ts');
    const proc = new DateTimeToShow();
    proc.setInput(input);
    proc.setFieldsdate(fieldsdate);
    proc.setFieldstime(fieldstime);
    proc.setFieldstimestamp(fieldstimestamp);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(fieldsdate.getValue(), '2009-11-05', `fieldsdate = "${fieldsdate.getValue()}"`);
    assert.equal(fieldstime.getValue(), '13:37:14', `fieldstime = "${fieldstime.getValue()}"`);
    assert.equal(
      fieldstimestamp.getValue(),
      '2009-11-05 13:37:14.521',
      `fieldstimestamp = "${fieldstimestamp.getValue()}"`
    );
  });

  it('DateTimeToShow converts compact date values and clears time output', async () => {
    const input = makeFieldObject('input', '20091105');
    const fieldsdate = makeFieldObject('fieldsdate', 'old-date');
    const fieldstime = makeFieldObject('fieldstime', 'old-time');
    const fieldstimestamp = makeFieldObject('fieldstimestamp', 'old-ts');
    const proc = new DateTimeToShow();
    proc.setInput(input);
    proc.setFieldsdate(fieldsdate);
    proc.setFieldstime(fieldstime);
    proc.setFieldstimestamp(fieldstimestamp);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(fieldsdate.getValue(), '2009-11-05', `fieldsdate = "${fieldsdate.getValue()}"`);
    assert.equal(fieldstime.getValue(), '', `fieldstime = "${fieldstime.getValue()}"`);
    assert.equal(fieldstimestamp.getValue(), '2009-11-05', `fieldstimestamp = "${fieldstimestamp.getValue()}"`);
  });

  it('DateTimeToShow converts compact time values and clears date outputs', async () => {
    const input = makeFieldObject('input', '133714');
    const fieldsdate = makeFieldObject('fieldsdate', 'old-date');
    const fieldstime = makeFieldObject('fieldstime', 'old-time');
    const fieldstimestamp = makeFieldObject('fieldstimestamp', 'old-ts');
    const proc = new DateTimeToShow();
    proc.setInput(input);
    proc.setFieldsdate(fieldsdate);
    proc.setFieldstime(fieldstime);
    proc.setFieldstimestamp(fieldstimestamp);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(fieldsdate.getValue(), '', `fieldsdate = "${fieldsdate.getValue()}"`);
    assert.equal(fieldstime.getValue(), '13:37:14', `fieldstime = "${fieldstime.getValue()}"`);
    assert.equal(fieldstimestamp.getValue(), '', `fieldstimestamp = "${fieldstimestamp.getValue()}"`);
  });

  it('DateTimeToShow clears outputs for unsupported input values', async () => {
    const input = makeFieldObject('input', 'invalid');
    const fieldsdate = makeFieldObject('fieldsdate', 'old-date');
    const fieldstime = makeFieldObject('fieldstime', 'old-time');
    const fieldstimestamp = makeFieldObject('fieldstimestamp', 'old-ts');
    const proc = new DateTimeToShow();
    proc.setInput(input);
    proc.setFieldsdate(fieldsdate);
    proc.setFieldstime(fieldstime);
    proc.setFieldstimestamp(fieldstimestamp);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(fieldsdate.getValue(), '', `fieldsdate = "${fieldsdate.getValue()}"`);
    assert.equal(fieldstime.getValue(), '', `fieldstime = "${fieldstime.getValue()}"`);
    assert.equal(fieldstimestamp.getValue(), '', `fieldstimestamp = "${fieldstimestamp.getValue()}"`);
  });

  it('DateTimeToShow supports VectorObject outputs', async () => {
    const input = makeFieldObject('input', '20091105');
    const date1 = makeFieldObject('date1', 'old1');
    const date2 = makeFieldObject('date2', 'old2');
    const fieldsdate = new VectorObject();
    fieldsdate.addItem(date1);
    fieldsdate.addItem(date2);
    const proc = new DateTimeToShow();
    proc.setInput(input);
    proc.setFieldsdate(fieldsdate);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(date1.getValue(), '2009-11-05', `date1 = "${date1.getValue()}"`);
    assert.equal(date2.getValue(), '2009-11-05', `date2 = "${date2.getValue()}"`);
  });

  it('DateTimeToShow can run with only one optional output bound', async () => {
    const input = makeFieldObject('input', '133714');
    const fieldstime = makeFieldObject('fieldstime', 'old-time');
    const proc = new DateTimeToShow();
    proc.setInput(input);
    proc.setFieldstime(fieldstime);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(fieldstime.getValue(), '13:37:14', `fieldstime = "${fieldstime.getValue()}"`);
  });

  it('chkNull throws when input is unbound', async () => {
    const proc = new DateTimeToShow();
    proc.setFieldsdate(makeFieldObject('fieldsdate', ''));
    let threw = false;

    try {
      await proc.execute();
    } catch (e: any) {
      threw = true;
      assert.ok(e.message.includes('need associate object'), `Error: ${e.message}`);
    }

    assert.ok(threw, 'chkNull threw error');
  });

  it('runProcess — converts compact timestamp values from context', async () => {
    const items: ItemDef[] = [makeField('input'), makeField('date'), makeField('time'), makeField('timestamp')];
    const classes: ClassDef[] = [
      {
        name: 'DateTimeToShow',
        group: 'g1',
        fields: [
          { setter: 'input', value: 'input' },
          { setter: 'fieldsdate', value: 'date' },
          { setter: 'fieldstime', value: 'time' },
          { setter: 'fieldstimestamp', value: 'timestamp' },
        ],
      },
    ];

    const ctx = new ProcessContext({ input: '20091105 133714.521' });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output['date'], '2009-11-05', `date = "${ctx.output['date']}"`);
    assert.equal(ctx.output['time'], '13:37:14', `time = "${ctx.output['time']}"`);
    assert.equal(ctx.output['timestamp'], '2009-11-05 13:37:14.521', `timestamp = "${ctx.output['timestamp']}"`);
  });

  it('runProcess — supports multi-output vector binding', async () => {
    const items: ItemDef[] = [makeField('input'), makeField('date1'), makeField('date2')];
    const classes: ClassDef[] = [
      {
        name: 'DateTimeToShow',
        group: 'g1',
        fields: [
          { setter: 'input', value: 'input' },
          { setter: 'fieldsdate', value: ['date1', 'date2'] },
        ],
      },
    ];

    const ctx = new ProcessContext({ input: '20091105' });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output['date1'], '2009-11-05', `date1 = "${ctx.output['date1']}"`);
    assert.equal(ctx.output['date2'], '2009-11-05', `date2 = "${ctx.output['date2']}"`);
  });
});
