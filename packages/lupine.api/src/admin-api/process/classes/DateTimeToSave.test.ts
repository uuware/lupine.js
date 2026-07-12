import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import '../class-registry';
import { VectorObject } from '../field-objects';
import { ProcessContext } from '../process-context';
import { runProcess, ItemDef, ClassDef } from '../run-process';
import { makeField, makeFieldObject } from '../test-helper';
import { DateTimeToSave } from './DateTimeToSave';

describe('DateTimeToSave Process', () => {
  it('DateTimeToSave converts display timestamp values to save date, time, and timestamp', async () => {
    const input = makeFieldObject('input', '2009/11/05 13:37:14');
    const fieldsdate = makeFieldObject('fieldsdate', 'old-date');
    const fieldstime = makeFieldObject('fieldstime', 'old-time');
    const fieldstimestamp = makeFieldObject('fieldstimestamp', 'old-ts');
    const proc = new DateTimeToSave();
    proc.setInput(input);
    proc.setFieldsdate(fieldsdate);
    proc.setFieldstime(fieldstime);
    proc.setFieldstimestamp(fieldstimestamp);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(fieldsdate.getValue(), '20091105', `fieldsdate = "${fieldsdate.getValue()}"`);
    assert.equal(fieldstime.getValue(), '133714', `fieldstime = "${fieldstime.getValue()}"`);
    assert.equal(
      fieldstimestamp.getValue(),
      '20091105 133714.000',
      `fieldstimestamp = "${fieldstimestamp.getValue()}"`
    );
  });

  it('DateTimeToSave converts compact timestamp values to save timestamp', async () => {
    const input = makeFieldObject('input', '20091105 133714');
    const fieldsdate = makeFieldObject('fieldsdate', 'old-date');
    const fieldstime = makeFieldObject('fieldstime', 'old-time');
    const fieldstimestamp = makeFieldObject('fieldstimestamp', 'old-ts');
    const proc = new DateTimeToSave();
    proc.setInput(input);
    proc.setFieldsdate(fieldsdate);
    proc.setFieldstime(fieldstime);
    proc.setFieldstimestamp(fieldstimestamp);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(fieldsdate.getValue(), '20091105', `fieldsdate = "${fieldsdate.getValue()}"`);
    assert.equal(fieldstime.getValue(), '133714', `fieldstime = "${fieldstime.getValue()}"`);
    assert.equal(
      fieldstimestamp.getValue(),
      '20091105 133714.000',
      `fieldstimestamp = "${fieldstimestamp.getValue()}"`
    );
  });

  it('DateTimeToSave converts separated date values and clears time output', async () => {
    const input = makeFieldObject('input', '2009-11-05');
    const fieldsdate = makeFieldObject('fieldsdate', 'old-date');
    const fieldstime = makeFieldObject('fieldstime', 'old-time');
    const fieldstimestamp = makeFieldObject('fieldstimestamp', 'old-ts');
    const proc = new DateTimeToSave();
    proc.setInput(input);
    proc.setFieldsdate(fieldsdate);
    proc.setFieldstime(fieldstime);
    proc.setFieldstimestamp(fieldstimestamp);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(fieldsdate.getValue(), '20091105', `fieldsdate = "${fieldsdate.getValue()}"`);
    assert.equal(fieldstime.getValue(), '', `fieldstime = "${fieldstime.getValue()}"`);
    assert.equal(fieldstimestamp.getValue(), '20091105', `fieldstimestamp = "${fieldstimestamp.getValue()}"`);
  });

  it('DateTimeToSave converts compact date values and leaves timestamp blank', async () => {
    const input = makeFieldObject('input', '20091105');
    const fieldsdate = makeFieldObject('fieldsdate', 'old-date');
    const fieldstime = makeFieldObject('fieldstime', 'old-time');
    const fieldstimestamp = makeFieldObject('fieldstimestamp', 'old-ts');
    const proc = new DateTimeToSave();
    proc.setInput(input);
    proc.setFieldsdate(fieldsdate);
    proc.setFieldstime(fieldstime);
    proc.setFieldstimestamp(fieldstimestamp);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(fieldsdate.getValue(), '20091105', `fieldsdate = "${fieldsdate.getValue()}"`);
    assert.equal(fieldstime.getValue(), '', `fieldstime = "${fieldstime.getValue()}"`);
    assert.equal(fieldstimestamp.getValue(), '', `fieldstimestamp = "${fieldstimestamp.getValue()}"`);
  });

  it('DateTimeToSave converts colon time values', async () => {
    const input = makeFieldObject('input', '13:37:14');
    const fieldsdate = makeFieldObject('fieldsdate', 'old-date');
    const fieldstime = makeFieldObject('fieldstime', 'old-time');
    const fieldstimestamp = makeFieldObject('fieldstimestamp', 'old-ts');
    const proc = new DateTimeToSave();
    proc.setInput(input);
    proc.setFieldsdate(fieldsdate);
    proc.setFieldstime(fieldstime);
    proc.setFieldstimestamp(fieldstimestamp);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(fieldsdate.getValue(), '', `fieldsdate = "${fieldsdate.getValue()}"`);
    assert.equal(fieldstime.getValue(), '133714', `fieldstime = "${fieldstime.getValue()}"`);
    assert.equal(fieldstimestamp.getValue(), '', `fieldstimestamp = "${fieldstimestamp.getValue()}"`);
  });

  it('DateTimeToSave converts compact time values', async () => {
    const input = makeFieldObject('input', '133714');
    const fieldstime = makeFieldObject('fieldstime', 'old-time');
    const proc = new DateTimeToSave();
    proc.setInput(input);
    proc.setFieldstime(fieldstime);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(fieldstime.getValue(), '133714', `fieldstime = "${fieldstime.getValue()}"`);
  });

  it('DateTimeToSave clears outputs for unsupported input values', async () => {
    const input = makeFieldObject('input', 'invalid');
    const fieldsdate = makeFieldObject('fieldsdate', 'old-date');
    const fieldstime = makeFieldObject('fieldstime', 'old-time');
    const fieldstimestamp = makeFieldObject('fieldstimestamp', 'old-ts');
    const proc = new DateTimeToSave();
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

  it('DateTimeToSave supports VectorObject date and time outputs', async () => {
    const input = makeFieldObject('input', '2009/11/05 13:37:14');
    const date1 = makeFieldObject('date1', 'old1');
    const date2 = makeFieldObject('date2', 'old2');
    const time1 = makeFieldObject('time1', 'old1');
    const time2 = makeFieldObject('time2', 'old2');
    const fieldsdate = new VectorObject();
    fieldsdate.addItem(date1);
    fieldsdate.addItem(date2);
    const fieldstime = new VectorObject();
    fieldstime.addItem(time1);
    fieldstime.addItem(time2);
    const proc = new DateTimeToSave();
    proc.setInput(input);
    proc.setFieldsdate(fieldsdate);
    proc.setFieldstime(fieldstime);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(date1.getValue(), '20091105', `date1 = "${date1.getValue()}"`);
    assert.equal(date2.getValue(), '20091105', `date2 = "${date2.getValue()}"`);
    assert.equal(time1.getValue(), '133714', `time1 = "${time1.getValue()}"`);
    assert.equal(time2.getValue(), '133714', `time2 = "${time2.getValue()}"`);
  });

  it('chkNull throws when input is unbound', async () => {
    const proc = new DateTimeToSave();
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

  it('runProcess — converts display timestamp values from context', async () => {
    const items: ItemDef[] = [makeField('input'), makeField('date'), makeField('time'), makeField('timestamp')];
    const classes: ClassDef[] = [
      {
        name: 'DateTimeToSave',
        group: 'g1',
        fields: [
          { setter: 'input', value: 'input' },
          { setter: 'fieldsdate', value: 'date' },
          { setter: 'fieldstime', value: 'time' },
          { setter: 'fieldstimestamp', value: 'timestamp' },
        ],
      },
    ];

    const ctx = new ProcessContext({ input: '2009/11/05 13:37:14' });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output['date'], '20091105', `date = "${ctx.output['date']}"`);
    assert.equal(ctx.output['time'], '133714', `time = "${ctx.output['time']}"`);
    assert.equal(ctx.output['timestamp'], '20091105 133714.000', `timestamp = "${ctx.output['timestamp']}"`);
  });

  it('runProcess — supports multi-output vector binding', async () => {
    const items: ItemDef[] = [makeField('input'), makeField('date1'), makeField('date2')];
    const classes: ClassDef[] = [
      {
        name: 'DateTimeToSave',
        group: 'g1',
        fields: [
          { setter: 'input', value: 'input' },
          { setter: 'fieldsdate', value: ['date1', 'date2'] },
        ],
      },
    ];

    const ctx = new ProcessContext({ input: '2009/11/05' });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output['date1'], '20091105', `date1 = "${ctx.output['date1']}"`);
    assert.equal(ctx.output['date2'], '20091105', `date2 = "${ctx.output['date2']}"`);
  });
});
