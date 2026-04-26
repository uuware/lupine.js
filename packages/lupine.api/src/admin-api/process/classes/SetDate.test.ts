import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import '../class-registry';
import { FieldObject, VectorObject } from '../field-objects';
import { getDate } from '../date-utils';
import { SetDate } from './SetDate';
import { ProcessContext } from '../process-context';
import { runProcess, ItemDef, ClassDef } from '../run-process';

describe('SetDate', () => {
  it('SetDate with single FieldObject', async () => {
    const field = new FieldObject();
    field.setFieldId('date1');
    const proc = new SetDate();
    proc.setFields(field);
    await proc.execute();
    const today = getDate();
    assert.equal(field.getValue(), today, `Single field value = ${field.getValue()} (expected ${today})`);
  });

  it('SetDate with VectorObject (multi)', async () => {
    const f1 = new FieldObject();
    f1.setFieldId('startDate');
    const f2 = new FieldObject();
    f2.setFieldId('endDate');
    const vec = new VectorObject();
    vec.addItem(f1);
    vec.addItem(f2);
    const proc = new SetDate();
    proc.setFields(vec);
    await proc.execute();
    const today = getDate();
    assert.equal(f1.getValue(), today, `f1 value = ${f1.getValue()}`);
    assert.equal(f2.getValue(), today, `f2 value = ${f2.getValue()}`);
  });

  it('chkNull throws on unbound field', async () => {
    const proc = new SetDate();
    let threw = false;
    try { 
      await proc.execute(); 
    } catch (e: any) {
      threw = true;
      assert.ok(e.message.includes('need associate object'), `Error: ${e.message}`);
    }
    assert.ok(threw, 'chkNull threw error');
  });

  it('runProcess — SetDate sets two fields', async () => {
    const items: ItemDef[] = [
      { name: 'startDate', type: 'FieldObject', flags: 'F,', defaultValue: '', ext: {} },
      { name: 'endDate',   type: 'FieldObject', flags: 'F,', defaultValue: '', ext: {} },
    ];
    const classes: ClassDef[] = [
      {
        name: 'SetDate', group: 'g1',
        fields: [
          { setter: 'setFields', value: ['startDate', 'endDate'] }
        ],
      },
    ];
    const ctx = new ProcessContext();
    const ok = await runProcess(ctx, items, classes);
    const today = getDate();
    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output['startDate'], today, `output startDate = ${ctx.output['startDate']}`);
    assert.equal(ctx.output['endDate'], today, `output endDate = ${ctx.output['endDate']}`);
  });
});
