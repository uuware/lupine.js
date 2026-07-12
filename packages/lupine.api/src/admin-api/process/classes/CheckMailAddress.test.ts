import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import '../class-registry';
import { VectorObject } from '../field-objects';
import { ProcessContext } from '../process-context';
import { runProcess, ItemDef, ClassDef } from '../run-process';
import { makeField, makeFieldObject } from '../test-helper';
import { CheckMailAddress } from './CheckMailAddress';

describe('CheckMailAddress Process', () => {
  it('CheckMailAddress accepts a simple email address', async () => {
    const field = makeFieldObject('field', 'user@example.com');
    const proc = new CheckMailAddress();
    proc.setFields(field);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(field.getValue(), 'user@example.com', `field = "${field.getValue()}"`);
    assert.equal(field.hasError(), false);
  });

  it('CheckMailAddress trims valid email values', async () => {
    const field = makeFieldObject('field', '  user@example.com  ');
    const proc = new CheckMailAddress();
    proc.setFields(field);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(field.getValue(), 'user@example.com', `field = "${field.getValue()}"`);
    assert.equal(field.hasError(), false);
  });

  it('CheckMailAddress rejects missing at-sign', async () => {
    const field = makeFieldObject('field', 'user.example.com');
    const proc = new CheckMailAddress();
    proc.setFields(field);

    const ok = await proc.execute();

    assert.equal(ok, false, 'execute returned false');
    assert.equal(field.hasError(), true);
  });

  it('CheckMailAddress rejects missing domain dot', async () => {
    const field = makeFieldObject('field', 'user@example');
    const proc = new CheckMailAddress();
    proc.setFields(field);

    const ok = await proc.execute();

    assert.equal(ok, false, 'execute returned false');
    assert.equal(field.hasError(), true);
  });

  it('CheckMailAddress rejects whitespace inside email values', async () => {
    const field = makeFieldObject('field', 'user name@example.com');
    const proc = new CheckMailAddress();
    proc.setFields(field);

    const ok = await proc.execute();

    assert.equal(ok, false, 'execute returned false');
    assert.equal(field.hasError(), true);
  });

  it('CheckMailAddress allows blank values', async () => {
    const field = makeFieldObject('field', '');
    const proc = new CheckMailAddress();
    proc.setFields(field);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(field.hasError(), false);
  });

  it('CheckMailAddress supports VectorObject validation', async () => {
    const field1 = makeFieldObject('field1', 'a@example.com');
    const field2 = makeFieldObject('field2', 'b@example.co.nz');
    const fields = new VectorObject();
    fields.addItem(field1);
    fields.addItem(field2);
    const proc = new CheckMailAddress();
    proc.setFields(fields);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    assert.equal(field1.hasError(), false);
    assert.equal(field2.hasError(), false);
  });

  it('CheckMailAddress reports the failing item in VectorObject validation', async () => {
    const field1 = makeFieldObject('field1', 'a@example.com');
    const field2 = makeFieldObject('field2', 'not-an-email');
    const fields = new VectorObject();
    fields.addItem(field1);
    fields.addItem(field2);
    const proc = new CheckMailAddress();
    proc.setFields(fields);

    const ok = await proc.execute();

    assert.equal(ok, false, 'execute returned false');
    assert.equal(field1.hasError(), false);
    assert.equal(field2.hasError(), true);
  });

  it('chkNull throws when fields is unbound', async () => {
    const proc = new CheckMailAddress();
    let threw = false;

    try {
      await proc.execute();
    } catch (e: any) {
      threw = true;
      assert.ok(e.message.includes('need associate object'), `Error: ${e.message}`);
    }

    assert.ok(threw, 'chkNull threw error');
  });

  it('runProcess — accepts valid email input values from context', async () => {
    const items: ItemDef[] = [makeField('email')];
    const classes: ClassDef[] = [
      {
        name: 'CheckMailAddress',
        group: 'g1',
        fields: [{ setter: 'fields', value: 'email' }],
      },
    ];

    const ctx = new ProcessContext({ email: ' user@example.com ' });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output['email'], 'user@example.com', `email = "${ctx.output['email']}"`);
    assert.equal(ctx.output['email#ERR'], undefined);
  });

  it('runProcess — rejects invalid email input values from context', async () => {
    const items: ItemDef[] = [makeField('email')];
    const classes: ClassDef[] = [
      {
        name: 'CheckMailAddress',
        group: 'g1',
        fields: [{ setter: 'fields', value: 'email' }],
      },
    ];

    const ctx = new ProcessContext({ email: 'not-an-email' });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, false, 'runProcess returned false');
    assert.equal(ctx.output['email'], 'not-an-email', `email = "${ctx.output['email']}"`);
    assert.equal(ctx.output['email#ERR'], '1');
  });
});
