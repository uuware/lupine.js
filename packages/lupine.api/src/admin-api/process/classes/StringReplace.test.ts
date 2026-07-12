import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import '../class-registry';
import { VectorObject } from '../field-objects';
import { ProcessContext } from '../process-context';
import { runProcess, ItemDef, ClassDef } from '../run-process';
import { makeField, makeFieldObject } from '../test-helper';
import { StringReplace } from './StringReplace';

describe('StringReplace Process', () => {
  it('StringReplace with direct FieldObject usage replaces all occurrences', async () => {
    const stringfrom = makeFieldObject('stringfrom', 'foo bar foo');
    const replacefrom = makeFieldObject('replacefrom', 'foo');
    const replaceto = makeFieldObject('replaceto', 'baz');
    const outfield = makeFieldObject('outfield');

    const proc = new StringReplace();
    proc.setStringfrom(stringfrom);
    proc.setReplacefrom(replacefrom);
    proc.setReplaceto(replaceto);
    proc.setOutfield(outfield);

    await proc.execute();

    assert.equal(outfield.getValue(), 'baz bar baz', `outfield = "${outfield.getValue()}"`);
  });

  it('StringReplace with VectorObject output writes the same result to each output field', async () => {
    const stringfrom = makeFieldObject('stringfrom', '2026-07-06');
    const replacefrom = makeFieldObject('replacefrom', '-');
    const replaceto = makeFieldObject('replaceto', '/');
    const out1 = makeFieldObject('out1');
    const out2 = makeFieldObject('out2');
    const outputs = new VectorObject();
    outputs.addItem(out1);
    outputs.addItem(out2);

    const proc = new StringReplace();
    proc.setStringfrom(stringfrom);
    proc.setReplacefrom(replacefrom);
    proc.setReplaceto(replaceto);
    proc.setOutfield(outputs);

    await proc.execute();

    assert.equal(out1.getValue(), '2026/07/06', `out1 = "${out1.getValue()}"`);
    assert.equal(out2.getValue(), '2026/07/06', `out2 = "${out2.getValue()}"`);
  });

  it('StringReplace keeps the original string when replacefrom is blank', async () => {
    const stringfrom = makeFieldObject('stringfrom', 'abc');
    const replacefrom = makeFieldObject('replacefrom', '');
    const replaceto = makeFieldObject('replaceto', 'x');
    const outfield = makeFieldObject('outfield');

    const proc = new StringReplace();
    proc.setStringfrom(stringfrom);
    proc.setReplacefrom(replacefrom);
    proc.setReplaceto(replaceto);
    proc.setOutfield(outfield);

    await proc.execute();

    assert.equal(outfield.getValue(), 'abc', `outfield = "${outfield.getValue()}"`);
  });

  it('chkNull throws when a required field is unbound', async () => {
    const proc = new StringReplace();
    let threw = false;

    try {
      await proc.execute();
    } catch (e: any) {
      threw = true;
      assert.ok(e.message.includes('need associate object'), `Error: ${e.message}`);
    }

    assert.ok(threw, 'chkNull threw error');
  });

  it('runProcess — replaces input values from context', async () => {
    const items: ItemDef[] = [
      makeField('source'),
      makeField('replaceFrom'),
      makeField('replaceTo'),
      makeField('result'),
    ];
    const classes: ClassDef[] = [
      {
        name: 'StringReplace',
        group: 'g1',
        fields: [
          { setter: 'setStringfrom', value: 'source' },
          { setter: 'setReplacefrom', value: 'replaceFrom' },
          { setter: 'setReplaceto', value: 'replaceTo' },
          { setter: 'setOutfield', value: 'result' },
        ],
      },
    ];

    const ctx = new ProcessContext({ source: 'Hello World', replaceFrom: 'World', replaceTo: 'Lupine' });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output['result'], 'Hello Lupine', `result = "${ctx.output['result']}"`);
  });

  it('runProcess — supports fixed values with = prefix', async () => {
    const items: ItemDef[] = [makeField('result')];
    const classes: ClassDef[] = [
      {
        name: 'StringReplace',
        group: 'g1',
        fields: [
          { setter: 'stringfrom', value: '=a,b,c' },
          { setter: 'replacefrom', value: '=,' },
          { setter: 'replaceto', value: '=|' },
          { setter: 'outfield', value: 'result' },
        ],
      },
    ];

    const ctx = new ProcessContext();
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output['result'], 'a|b|c', `result = "${ctx.output['result']}"`);
  });

  it('runProcess — supports multi-output vector binding', async () => {
    const items: ItemDef[] = [
      makeField('source'),
      makeField('replaceFrom'),
      makeField('replaceTo'),
      makeField('result1'),
      makeField('result2'),
    ];
    const classes: ClassDef[] = [
      {
        name: 'StringReplace',
        group: 'g1',
        fields: [
          { setter: 'stringfrom', value: 'source' },
          { setter: 'replacefrom', value: 'replaceFrom' },
          { setter: 'replaceto', value: 'replaceTo' },
          { setter: 'outfield', value: ['result1', 'result2'] },
        ],
      },
    ];

    const ctx = new ProcessContext({ source: 'one two one', replaceFrom: 'one', replaceTo: '1' });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output['result1'], '1 two 1', `result1 = "${ctx.output['result1']}"`);
    assert.equal(ctx.output['result2'], '1 two 1', `result2 = "${ctx.output['result2']}"`);
  });
});
