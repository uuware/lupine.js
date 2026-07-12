import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import '../class-registry';
import { VectorObject } from '../field-objects';
import { ProcessContext } from '../process-context';
import { runProcess, ItemDef, ClassDef } from '../run-process';
import { makeField, makeFieldObject } from '../test-helper';
import { Set01Blank } from './Set01Blank';

describe('Set01Blank Process', () => {
  it('Set01Blank writes blank, 0, and 1 to the configured FieldObjects', async () => {
    const fieldsblank = makeFieldObject('fieldsblank', 'old-blank');
    const fields0 = makeFieldObject('fields0', 'old-0');
    const fields1 = makeFieldObject('fields1', 'old-1');
    const proc = new Set01Blank();
    proc.setFieldsblank(fieldsblank);
    proc.setFields0(fields0);
    proc.setFields1(fields1);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(fieldsblank.getValue(), '', `fieldsblank = "${fieldsblank.getValue()}"`);
    assert.equal(fields0.getValue(), '0', `fields0 = "${fields0.getValue()}"`);
    assert.equal(fields1.getValue(), '1', `fields1 = "${fields1.getValue()}"`);
  });

  it('Set01Blank writes to every item in configured VectorObject targets', async () => {
    const blank1 = makeFieldObject('blank1', 'old');
    const blank2 = makeFieldObject('blank2', 'old');
    const zero1 = makeFieldObject('zero1', 'old');
    const zero2 = makeFieldObject('zero2', 'old');
    const one1 = makeFieldObject('one1', 'old');
    const one2 = makeFieldObject('one2', 'old');

    const fieldsblank = new VectorObject();
    fieldsblank.addItem(blank1);
    fieldsblank.addItem(blank2);
    const fields0 = new VectorObject();
    fields0.addItem(zero1);
    fields0.addItem(zero2);
    const fields1 = new VectorObject();
    fields1.addItem(one1);
    fields1.addItem(one2);

    const proc = new Set01Blank();
    proc.setFieldsblank(fieldsblank);
    proc.setFields0(fields0);
    proc.setFields1(fields1);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(blank1.getValue(), '');
    assert.equal(blank2.getValue(), '');
    assert.equal(zero1.getValue(), '0');
    assert.equal(zero2.getValue(), '0');
    assert.equal(one1.getValue(), '1');
    assert.equal(one2.getValue(), '1');
  });

  it('Set01Blank succeeds when only one optional target group is configured', async () => {
    const fields1 = makeFieldObject('fields1', 'old');
    const proc = new Set01Blank();
    proc.setFields1(fields1);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(fields1.getValue(), '1', `fields1 = "${fields1.getValue()}"`);
  });

  it('Set01Blank succeeds when no optional target groups are configured', async () => {
    const proc = new Set01Blank();

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
  });

  it('runProcess — writes blank, 0, and 1 to context fields', async () => {
    const items: ItemDef[] = [makeField('blank'), makeField('zero'), makeField('one')];
    const classes: ClassDef[] = [
      {
        name: 'Set01Blank',
        group: 'g1',
        fields: [
          { setter: 'fieldsblank', value: 'blank' },
          { setter: 'fields0', value: 'zero' },
          { setter: 'fields1', value: 'one' },
        ],
      },
    ];

    const ctx = new ProcessContext({ blank: 'old-blank', zero: 'old-0', one: 'old-1' });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output['blank'], '', `blank = "${ctx.output['blank']}"`);
    assert.equal(ctx.output['zero'], '0', `zero = "${ctx.output['zero']}"`);
    assert.equal(ctx.output['one'], '1', `one = "${ctx.output['one']}"`);
  });

  it('runProcess — supports vector bindings for each target group', async () => {
    const items: ItemDef[] = [
      makeField('blank1'),
      makeField('blank2'),
      makeField('zero1'),
      makeField('zero2'),
      makeField('one1'),
      makeField('one2'),
    ];
    const classes: ClassDef[] = [
      {
        name: 'Set01Blank',
        group: 'g1',
        fields: [
          { setter: 'fieldsblank', value: ['blank1', 'blank2'] },
          { setter: 'fields0', value: ['zero1', 'zero2'] },
          { setter: 'fields1', value: ['one1', 'one2'] },
        ],
      },
    ];

    const ctx = new ProcessContext({
      blank1: 'old',
      blank2: 'old',
      zero1: 'old',
      zero2: 'old',
      one1: 'old',
      one2: 'old',
    });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output['blank1'], '');
    assert.equal(ctx.output['blank2'], '');
    assert.equal(ctx.output['zero1'], '0');
    assert.equal(ctx.output['zero2'], '0');
    assert.equal(ctx.output['one1'], '1');
    assert.equal(ctx.output['one2'], '1');
  });
});
