import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import '../class-registry';
import { VectorObject } from '../field-objects';
import { ProcessContext } from '../process-context';
import { runProcess, ItemDef, ClassDef } from '../run-process';
import { makeField, makeFieldObject } from '../test-helper';
import { CopyShortStringIfDestBlank } from './CopyShortStringIfDestBlank';

describe('CopyShortStringIfDestBlank Process', () => {
  it('CopyShortStringIfDestBlank strips HTML and copies when destination FieldObject is blank', async () => {
    const itemfrom = makeFieldObject('itemfrom', '<p>Hello <strong>World</strong></p>');
    const itemto = makeFieldObject('itemto', '');
    const proc = new CopyShortStringIfDestBlank();
    proc.setItemfrom(itemfrom);
    proc.setItemto(itemto);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(itemto.getValue(), 'Hello World', `itemto = "${itemto.getValue()}"`);
  });

  it('CopyShortStringIfDestBlank truncates copied text to 300 chars plus ellipsis', async () => {
    const longText = 'x'.repeat(301);
    const itemfrom = makeFieldObject('itemfrom', longText);
    const itemto = makeFieldObject('itemto', '');
    const proc = new CopyShortStringIfDestBlank();
    proc.setItemfrom(itemfrom);
    proc.setItemto(itemto);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(itemto.getValue(), `${'x'.repeat(300)}...`, `itemto length = ${String(itemto.getValue()).length}`);
  });

  it('CopyShortStringIfDestBlank does not overwrite non-blank destination FieldObject values', async () => {
    const itemfrom = makeFieldObject('itemfrom', '<p>source</p>');
    const itemto = makeFieldObject('itemto', 'dest');
    const proc = new CopyShortStringIfDestBlank();
    proc.setItemfrom(itemfrom);
    proc.setItemto(itemto);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(itemto.getValue(), 'dest', `itemto = "${itemto.getValue()}"`);
  });

  it('CopyShortStringIfDestBlank writes only blank VectorObject destination items', async () => {
    const itemfrom = makeFieldObject('itemfrom', '<span>source</span>');
    const itemto1 = makeFieldObject('itemto1', '');
    const itemto2 = makeFieldObject('itemto2', 'dest2');
    const itemto = new VectorObject();
    itemto.addItem(itemto1);
    itemto.addItem(itemto2);
    const proc = new CopyShortStringIfDestBlank();
    proc.setItemfrom(itemfrom);
    proc.setItemto(itemto);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(itemto1.getValue(), 'source', `itemto1 = "${itemto1.getValue()}"`);
    assert.equal(itemto2.getValue(), 'dest2', `itemto2 = "${itemto2.getValue()}"`);
  });

  it('chkNull throws when itemfrom is unbound', async () => {
    const proc = new CopyShortStringIfDestBlank();
    proc.setItemto(makeFieldObject('itemto', ''));
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
    const proc = new CopyShortStringIfDestBlank();
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

  it('runProcess — strips HTML and copies source into blank destination input values from context', async () => {
    const items: ItemDef[] = [makeField('itemfrom'), makeField('itemto')];
    const classes: ClassDef[] = [
      {
        name: 'CopyShortStringIfDestBlank',
        group: 'g1',
        fields: [
          { setter: 'itemfrom', value: 'itemfrom' },
          { setter: 'itemto', value: 'itemto' },
        ],
      },
    ];

    const ctx = new ProcessContext({ itemfrom: '<p>source</p>', itemto: '' });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output['itemto'], 'source', `itemto = "${ctx.output['itemto']}"`);
  });

  it('runProcess — does not overwrite non-blank destination input values from context', async () => {
    const items: ItemDef[] = [makeField('itemfrom'), makeField('itemto')];
    const classes: ClassDef[] = [
      {
        name: 'CopyShortStringIfDestBlank',
        group: 'g1',
        fields: [
          { setter: 'itemfrom', value: 'itemfrom' },
          { setter: 'itemto', value: 'itemto' },
        ],
      },
    ];

    const ctx = new ProcessContext({ itemfrom: '<p>source</p>', itemto: 'dest' });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output['itemto'], 'dest', `itemto = "${ctx.output['itemto']}"`);
  });

  it('runProcess — supports fixed source values with = prefix', async () => {
    const items: ItemDef[] = [makeField('itemto')];
    const classes: ClassDef[] = [
      {
        name: 'CopyShortStringIfDestBlank',
        group: 'g1',
        fields: [
          { setter: 'itemfrom', value: '=<b>fixed</b>' },
          { setter: 'itemto', value: 'itemto' },
        ],
      },
    ];

    const ctx = new ProcessContext({ itemto: '' });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output['itemto'], 'fixed', `itemto = "${ctx.output['itemto']}"`);
  });

  it('runProcess — supports multi-destination vector binding', async () => {
    const items: ItemDef[] = [makeField('itemfrom'), makeField('itemto1'), makeField('itemto2')];
    const classes: ClassDef[] = [
      {
        name: 'CopyShortStringIfDestBlank',
        group: 'g1',
        fields: [
          { setter: 'itemfrom', value: 'itemfrom' },
          { setter: 'itemto', value: ['itemto1', 'itemto2'] },
        ],
      },
    ];

    const ctx = new ProcessContext({ itemfrom: '<p>source</p>', itemto1: '', itemto2: 'dest2' });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output['itemto1'], 'source', `itemto1 = "${ctx.output['itemto1']}"`);
    assert.equal(ctx.output['itemto2'], 'dest2', `itemto2 = "${ctx.output['itemto2']}"`);
  });
});
