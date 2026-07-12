import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import '../class-registry';
import { VectorObject } from '../field-objects';
import { ProcessContext } from '../process-context';
import { runProcess, ItemDef, ClassDef } from '../run-process';
import { makeField, makeFieldObject } from '../test-helper';
import { RandomString } from './RandomString';

const assertRandomString = (value: unknown): string => {
  assert.equal(typeof value, 'string');
  const str = String(value);
  assert.equal(str.length, 32, `random string length = ${str.length}`);
  assert.match(str, /^[A-Za-z][A-Za-z0-9]{31}$/);
  return str;
};

describe('RandomString Process', () => {
  it('RandomString writes a 32-character random string to a FieldObject', async () => {
    const field = makeFieldObject('token', 'old');
    const proc = new RandomString();
    proc.setFields(field);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    const value = assertRandomString(field.getValue());
    assert.notEqual(value, 'old');
  });

  it('RandomString writes the same generated value to every VectorObject item', async () => {
    const field1 = makeFieldObject('token1', 'old1');
    const field2 = makeFieldObject('token2', 'old2');
    const fields = new VectorObject();
    fields.addItem(field1);
    fields.addItem(field2);
    const proc = new RandomString();
    proc.setFields(fields);

    const ok = await proc.execute();

    assert.equal(ok, true, 'execute returned true');
    const value1 = assertRandomString(field1.getValue());
    const value2 = assertRandomString(field2.getValue());
    assert.equal(value1, value2, 'VectorObject items receive the same generated value');
  });

  it('chkNull throws when fields is unbound', async () => {
    const proc = new RandomString();
    let threw = false;

    try {
      await proc.execute();
    } catch (e: any) {
      threw = true;
      assert.ok(e.message.includes('need associate object'), `Error: ${e.message}`);
    }

    assert.ok(threw, 'chkNull threw error');
  });

  it('runProcess — writes a random string to an input field from context', async () => {
    const items: ItemDef[] = [makeField('token')];
    const classes: ClassDef[] = [
      {
        name: 'RandomString',
        group: 'g1',
        fields: [{ setter: 'fields', value: 'token' }],
      },
    ];

    const ctx = new ProcessContext({ token: 'old' });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, true, 'runProcess returned true');
    const value = assertRandomString(ctx.output['token']);
    assert.notEqual(value, 'old');
  });

  it('runProcess — supports multi-field vector binding', async () => {
    const items: ItemDef[] = [makeField('token1'), makeField('token2')];
    const classes: ClassDef[] = [
      {
        name: 'RandomString',
        group: 'g1',
        fields: [{ setter: 'fields', value: ['token1', 'token2'] }],
      },
    ];

    const ctx = new ProcessContext({ token1: '', token2: '' });
    const ok = await runProcess(ctx, items, classes);

    assert.equal(ok, true, 'runProcess returned true');
    const value1 = assertRandomString(ctx.output['token1']);
    const value2 = assertRandomString(ctx.output['token2']);
    assert.equal(value1, value2, 'vector-bound fields receive the same generated value');
  });
});
