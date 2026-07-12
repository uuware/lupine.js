import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import '../class-registry';
import { DateUtils } from '../../../lib/utils/date-utils';
import { VectorObject } from '../field-objects';
import { ProcessContext } from '../process-context';
import { runProcess, ItemDef, ClassDef } from '../run-process';
import { makeField, makeFieldObject } from '../test-helper';
import { FormatDate } from './FormatDate';

const assertDateBetween = (actual: unknown, formatStr: string, before: Date, after: Date): string => {
  assert.equal(typeof actual, 'string');
  const value = String(actual);
  const candidates = new Set([DateUtils.format(before, formatStr), DateUtils.format(after, formatStr)]);
  assert.ok(candidates.has(value), `date "${value}" should be one of ${Array.from(candidates).join(', ')}`);
  return value;
};

describe('FormatDate Process', () => {
  it('FormatDate writes the current date using the default YYYY-MM-DD format', async () => {
    const fields = makeFieldObject('fields', 'old');
    const proc = new FormatDate();
    proc.setFields(fields);

    const before = new Date();
    const ok = await proc.execute();
    const after = new Date();

    assert.equal(ok, true, 'execute returned true');
    assertDateBetween(fields.getValue(), 'YYYY-MM-DD', before, after);
    assert.match(String(fields.getValue()), /^\d{4}-\d{2}-\d{2}$/);
  });

  it('FormatDate uses a custom shared date format when provided', async () => {
    const fields = makeFieldObject('fields', 'old');
    const format = makeFieldObject('format', 'YYYYMMDD hhmmss');
    const proc = new FormatDate();
    proc.setFormat(format);
    proc.setFields(fields);

    const before = new Date();
    const ok = await proc.execute();
    const after = new Date();

    assert.equal(ok, true, 'execute returned true');
    assertDateBetween(fields.getValue(), 'YYYYMMDD hhmmss', before, after);
    assert.match(String(fields.getValue()), /^\d{8} \d{6}$/);
  });

  it('FormatDate treats a blank format field as the default format', async () => {
    const fields = makeFieldObject('fields', 'old');
    const format = makeFieldObject('format', '');
    const proc = new FormatDate();
    proc.setFormat(format);
    proc.setFields(fields);

    const before = new Date();
    const ok = await proc.execute();
    const after = new Date();

    assert.equal(ok, true, 'execute returned true');
    assertDateBetween(fields.getValue(), 'YYYY-MM-DD', before, after);
  });

  it('FormatDate replaces repeated format tokens', async () => {
    const fields = makeFieldObject('fields', 'old');
    const format = makeFieldObject('format', 'YYYY/YYYY-MM/MM-DD/DD');
    const proc = new FormatDate();
    proc.setFormat(format);
    proc.setFields(fields);

    const before = new Date();
    const ok = await proc.execute();
    const after = new Date();

    assert.equal(ok, true, 'execute returned true');
    assertDateBetween(fields.getValue(), 'YYYY/YYYY-MM/MM-DD/DD', before, after);
  });

  it('FormatDate writes the same formatted value to every VectorObject item', async () => {
    const field1 = makeFieldObject('field1', 'old1');
    const field2 = makeFieldObject('field2', 'old2');
    const fields = new VectorObject();
    fields.addItem(field1);
    fields.addItem(field2);
    const format = makeFieldObject('format', 'YYYYMMDD');
    const proc = new FormatDate();
    proc.setFormat(format);
    proc.setFields(fields);

    const before = new Date();
    const ok = await proc.execute();
    const after = new Date();

    assert.equal(ok, true, 'execute returned true');
    const value1 = assertDateBetween(field1.getValue(), 'YYYYMMDD', before, after);
    const value2 = assertDateBetween(field2.getValue(), 'YYYYMMDD', before, after);
    assert.equal(value1, value2, 'VectorObject items receive the same formatted value');
  });

  it('chkNull throws when fields is unbound', async () => {
    const proc = new FormatDate();
    let threw = false;

    try {
      await proc.execute();
    } catch (e: any) {
      threw = true;
      assert.ok(e.message.includes('need associate object'), `Error: ${e.message}`);
    }

    assert.ok(threw, 'chkNull threw error');
  });

  it('runProcess — writes a default formatted date to context output', async () => {
    const items: ItemDef[] = [makeField('date')];
    const classes: ClassDef[] = [
      {
        name: 'FormatDate',
        group: 'g1',
        fields: [{ setter: 'fields', value: 'date' }],
      },
    ];

    const ctx = new ProcessContext({ date: 'old' });
    const before = new Date();
    const ok = await runProcess(ctx, items, classes);
    const after = new Date();

    assert.equal(ok, true, 'runProcess returned true');
    assertDateBetween(ctx.output['date'], 'YYYY-MM-DD', before, after);
  });

  it('runProcess — supports a fixed custom format value', async () => {
    const items: ItemDef[] = [makeField('date')];
    const classes: ClassDef[] = [
      {
        name: 'FormatDate',
        group: 'g1',
        fields: [
          { setter: 'format', value: '=YYYYMMDD' },
          { setter: 'fields', value: 'date' },
        ],
      },
    ];

    const ctx = new ProcessContext({ date: 'old' });
    const before = new Date();
    const ok = await runProcess(ctx, items, classes);
    const after = new Date();

    assert.equal(ok, true, 'runProcess returned true');
    assertDateBetween(ctx.output['date'], 'YYYYMMDD', before, after);
    assert.match(String(ctx.output['date']), /^\d{8}$/);
  });

  it('runProcess — supports multi-field vector binding', async () => {
    const items: ItemDef[] = [makeField('date1'), makeField('date2')];
    const classes: ClassDef[] = [
      {
        name: 'FormatDate',
        group: 'g1',
        fields: [
          { setter: 'format', value: '=YYYY-MM-DD' },
          { setter: 'fields', value: ['date1', 'date2'] },
        ],
      },
    ];

    const ctx = new ProcessContext({ date1: 'old1', date2: 'old2' });
    const before = new Date();
    const ok = await runProcess(ctx, items, classes);
    const after = new Date();

    assert.equal(ok, true, 'runProcess returned true');
    const value1 = assertDateBetween(ctx.output['date1'], 'YYYY-MM-DD', before, after);
    const value2 = assertDateBetween(ctx.output['date2'], 'YYYY-MM-DD', before, after);
    assert.equal(value1, value2, 'vector-bound fields receive the same formatted value');
  });
});
