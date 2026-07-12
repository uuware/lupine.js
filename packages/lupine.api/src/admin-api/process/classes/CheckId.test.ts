import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import '../class-registry';
import { ProcessContext } from '../process-context';
import { runProcess, ItemDef, ClassDef } from '../run-process';

const makeField = (name: string, defaultValue = ''): ItemDef => ({
  name,
  type: 'FieldObject',
  flags: 'F,',
  defaultValue,
  ext: {},
});

describe('CheckId Process', () => {
  it('runProcess — accepts a valid id with editor-style setter name', async () => {
    const items: ItemDef[] = [makeField('id')];
    const classes: ClassDef[] = [
      {
        name: 'CheckId',
        group: 'g1',
        fields: [{ setter: 'fields', value: 'id' }],
      },
    ];

    const ctx = new ProcessContext({ id: 'A123' });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, true);
    assert.equal(ctx.output['id'], 'A123', `id = "${ctx.output['id']}"`);
    assert.equal(ctx.output['id#ERR'], undefined);
  });

  it('runProcess — accepts lowercase first letter like PHP uppercase validation', async () => {
    const items: ItemDef[] = [makeField('id')];
    const classes: ClassDef[] = [
      {
        name: 'CheckId',
        group: 'g1',
        fields: [{ setter: 'setFields', value: 'id' }],
      },
    ];

    const ctx = new ProcessContext({ id: 'a123' });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, true);
    assert.equal(ctx.output['id'], 'a123', `id = "${ctx.output['id']}"`);
    assert.equal(ctx.output['id#ERR'], undefined);
  });

  it('runProcess — accepts alphanumeric chars after first character', async () => {
    const items: ItemDef[] = [makeField('id')];
    const classes: ClassDef[] = [
      {
        name: 'CheckId',
        group: 'g1',
        fields: [{ setter: 'fields', value: 'id' }],
      },
    ];

    const ctx = new ProcessContext({ id: 'A12B' });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, true);
    assert.equal(ctx.output['id'], 'A12B', `id = "${ctx.output['id']}"`);
    assert.equal(ctx.output['id#ERR'], undefined);
  });

  it('runProcess — rejects non-alphanumeric chars', async () => {
    const items: ItemDef[] = [makeField('id')];
    const classes: ClassDef[] = [
      {
        name: 'CheckId',
        group: 'g1',
        fields: [{ setter: 'fields', value: 'id' }],
      },
    ];

    const ctx = new ProcessContext({ id: 'A12_B' });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, false);
    assert.equal(ctx.output['id'], 'A12_B', `id = "${ctx.output['id']}"`);
    assert.equal(ctx.output['id#ERR'], '1');
  });

  it('runProcess — rejects blank values before id format validation', async () => {
    const items: ItemDef[] = [makeField('id')];
    const classes: ClassDef[] = [
      {
        name: 'CheckId',
        group: 'g1',
        fields: [{ setter: 'fields', value: 'id' }],
      },
    ];

    const ctx = new ProcessContext({ id: '' });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, false);
    assert.equal(ctx.output['id#ERR'], '1');
  });

  it('runProcess — supports multi-field vector validation', async () => {
    const items: ItemDef[] = [makeField('id1'), makeField('id2')];
    const classes: ClassDef[] = [
      {
        name: 'CheckId',
        group: 'g1',
        fields: [{ setter: 'fields', value: ['id1', 'id2'] }],
      },
    ];

    const ctx = new ProcessContext({ id1: 'A1', id2: 'B22' });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, true);
    assert.equal(ctx.output['id1'], 'A1', `id1 = "${ctx.output['id1']}"`);
    assert.equal(ctx.output['id2'], 'B22', `id2 = "${ctx.output['id2']}"`);
    assert.equal(ctx.output['id1#ERR'], undefined);
    assert.equal(ctx.output['id2#ERR'], undefined);
  });

  it('runProcess — reports the failing item in a multi-field vector', async () => {
    const items: ItemDef[] = [makeField('id1'), makeField('id2')];
    const classes: ClassDef[] = [
      {
        name: 'CheckId',
        group: 'g1',
        fields: [{ setter: 'fields', value: ['id1', 'id2'] }],
      },
    ];

    const ctx = new ProcessContext({ id1: 'A1', id2: 'B2_C' });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, false);
    assert.equal(ctx.output['id1#ERR'], undefined);
    assert.equal(ctx.output['id2#ERR'], '1');
  });

  it('runProcess — resolves bare entity child references and input aliases', async () => {
    const items: ItemDef[] = [
      {
        name: 'user',
        type: 'FieldObject',
        flags: 'E,',
        defaultValue: '',
        ext: {},
        children: [makeField('id')],
      },
    ];
    const classes: ClassDef[] = [
      {
        name: 'CheckId',
        group: 'g1',
        fields: [{ setter: 'fields', value: 'id' }],
      },
    ];

    const ctx = new ProcessContext({ id: 'C333' });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, true);
    assert.equal(ctx.output['user/id'], 'C333', `user/id = "${ctx.output['user/id']}"`);
    assert.equal(ctx.output['user/id#ERR'], undefined);
  });
});
