import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import '../class-registry';
import { VectorObject } from '../field-objects';
import { ProcessContext } from '../process-context';
import { runProcess, ItemDef, ClassDef } from '../run-process';
import { makeField, makeFieldObject } from '../test-helper';
import { CopyItemForce } from './CopyItemForce';

describe('CopyItemForce Process', () => {
  it('CopyItemForce overwrites a destination FieldObject', async () => {
    const itemfrom = makeFieldObject('itemfrom', 'source');
    const itemto = makeFieldObject('itemto', 'dest');
    const proc = new CopyItemForce();
    proc.setItemfrom(itemfrom);
    proc.setItemto(itemto);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(itemto.getValue(), 'source', `itemto = "${itemto.getValue()}"`);
  });

  it('CopyItemForce copies blank source values over destination values', async () => {
    const itemfrom = makeFieldObject('itemfrom', '');
    const itemto = makeFieldObject('itemto', 'dest');
    const proc = new CopyItemForce();
    proc.setItemfrom(itemfrom);
    proc.setItemto(itemto);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(itemto.getValue(), '', `itemto = "${itemto.getValue()}"`);
  });

  it('CopyItemForce writes the source value to every VectorObject destination item', async () => {
    const itemfrom = makeFieldObject('itemfrom', 'source');
    const itemto1 = makeFieldObject('itemto1', 'dest1');
    const itemto2 = makeFieldObject('itemto2', 'dest2');
    const itemto = new VectorObject();
    itemto.addItem(itemto1);
    itemto.addItem(itemto2);
    const proc = new CopyItemForce();
    proc.setItemfrom(itemfrom);
    proc.setItemto(itemto);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(itemto1.getValue(), 'source', `itemto1 = "${itemto1.getValue()}"`);
    assert.equal(itemto2.getValue(), 'source', `itemto2 = "${itemto2.getValue()}"`);
  });

  it('chkNull throws when itemfrom is unbound', async () => {
    const proc = new CopyItemForce();
    proc.setItemto(makeFieldObject('itemto', 'dest'));
    let threw = false;

    try {
      await proc.execute();
    } catch (e: any) {
      threw = true;
      assert.ok(e.message.includes('need associate object'), `Error: ${e.message}`);
    }

    assert.ok(threw, 'chkNull threw error');
  });

  it('chkNull throws when itemto is unbound', async () => {
    const proc = new CopyItemForce();
    proc.setItemfrom(makeFieldObject('itemfrom', 'source'));
    let threw = false;

    try {
      await proc.execute();
    } catch (e: any) {
      threw = true;
      assert.ok(e.message.includes('need associate object'), `Error: ${e.message}`);
    }

    assert.ok(threw, 'chkNull threw error');
  });

  it('runProcess — overwrites destination input values from context', async () => {
    const items: ItemDef[] = [makeField('itemfrom'), makeField('itemto')];
    const classes: ClassDef[] = [
      {
        name: 'CopyItemForce',
        group: 'g1',
        fields: [
          { setter: 'itemfrom', value: 'itemfrom' },
          { setter: 'itemto', value: 'itemto' },
        ],
      },
    ];

    const ctx = new ProcessContext({ itemfrom: 'source', itemto: 'dest' });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output['itemto'], 'source', `itemto = "${ctx.output['itemto']}"`);
  });

  it('runProcess — supports fixed source values with = prefix', async () => {
    const items: ItemDef[] = [makeField('itemto')];
    const classes: ClassDef[] = [
      {
        name: 'CopyItemForce',
        group: 'g1',
        fields: [
          { setter: 'itemfrom', value: '=fixed' },
          { setter: 'itemto', value: 'itemto' },
        ],
      },
    ];

    const ctx = new ProcessContext({ itemto: 'dest' });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output['itemto'], 'fixed', `itemto = "${ctx.output['itemto']}"`);
  });

  it('runProcess — supports multi-destination vector binding', async () => {
    const items: ItemDef[] = [makeField('itemfrom'), makeField('itemto1'), makeField('itemto2')];
    const classes: ClassDef[] = [
      {
        name: 'CopyItemForce',
        group: 'g1',
        fields: [
          { setter: 'itemfrom', value: 'itemfrom' },
          { setter: 'itemto', value: ['itemto1', 'itemto2'] },
        ],
      },
    ];

    const ctx = new ProcessContext({ itemfrom: 'source', itemto1: 'dest1', itemto2: 'dest2' });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output['itemto1'], 'source', `itemto1 = "${ctx.output['itemto1']}"`);
    assert.equal(ctx.output['itemto2'], 'source', `itemto2 = "${ctx.output['itemto2']}"`);
  });
});
