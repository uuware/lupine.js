import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import '../class-registry';
import { getDate } from '../date-utils';
import { ProcessContext } from '../process-context';
import { runProcess, ItemDef, ClassDef } from '../run-process';

describe('StringPlus Process', () => {
  it('runProcess — SetDate + StringPlus chain', async () => {
    const items: ItemDef[] = [
      { name: 'startDate', type: 'FieldObject', flags: 'F,', defaultValue: '', ext: {} },
      { name: 'endDate',   type: 'FieldObject', flags: 'F,', defaultValue: '', ext: {} },
      { name: 'result',    type: 'FieldObject', flags: 'F,', defaultValue: '', ext: {} },
    ];
    const classes: ClassDef[] = [
      {
        name: 'SetDate', group: 'g1',
        fields: [
          { setter: 'setFields', value: ['startDate', 'endDate'] },
        ],
      },
      {
        name: 'StringPlus', group: 'g1',
        fields: [
          { setter: 'setField1', value: 'startDate' },
          { setter: 'setField2', value: 'endDate' },
          { setter: 'setOutField', value: 'result' },
        ],
      },
    ];
    const ctx = new ProcessContext();
    await runProcess(ctx, items, classes);
    const today = getDate();
    assert.equal(ctx.output['result'], today + today, `result = "${ctx.output['result']}" (expected "${today + today}")`);
  });

  it('runProcess — input values from context', async () => {
    const items: ItemDef[] = [
      { name: 'firstName', type: 'FieldObject', flags: 'F,', defaultValue: '', ext: {} },
      { name: 'lastName',  type: 'FieldObject', flags: 'F,', defaultValue: '', ext: {} },
      { name: 'fullName',  type: 'FieldObject', flags: 'F,', defaultValue: '', ext: {} },
    ];
    const classes: ClassDef[] = [
      {
        name: 'StringPlus', group: 'g1',
        fields: [
          { setter: 'setField1', value: 'firstName' },
          { setter: 'setField2', value: 'lastName' },
          { setter: 'setOutField', value: 'fullName' },
        ],
      },
    ];
    const ctx = new ProcessContext({ firstName: 'John', lastName: 'Doe' });
    await runProcess(ctx, items, classes);
    assert.equal(ctx.output['fullName'], 'JohnDoe', `fullName = "${ctx.output['fullName']}"`);
  });

  it('runProcess — fixed value with = prefix', async () => {
    const items: ItemDef[] = [
      { name: 'greeting', type: 'FieldObject', flags: 'F,', defaultValue: '', ext: {} },
      { name: 'output',   type: 'FieldObject', flags: 'F,', defaultValue: '', ext: {} },
    ];
    const classes: ClassDef[] = [
      {
        name: 'StringPlus', group: 'g1',
        fields: [
          { setter: 'setField1', value: '=Hello' },
          { setter: 'setField2', value: '= World' },
          { setter: 'setOutField', value: 'output' },
        ],
      },
    ];
    const ctx = new ProcessContext();
    await runProcess(ctx, items, classes);
    assert.equal(ctx.output['output'], 'Hello World', `output = "${ctx.output['output']}"`);
  });

  it('runProcess — default values', async () => {
    const items: ItemDef[] = [
      { name: 'status', type: 'FieldObject', flags: 'F,', defaultValue: 'active', ext: {} },
    ];
    const classes: ClassDef[] = [];
    const ctx = new ProcessContext(); // no input for 'status'
    await runProcess(ctx, items, classes);
    assert.equal(ctx.output['status'], 'active', `status = "${ctx.output['status']}" (expected "active")`);
  });

  it('runProcess — entity with children', async () => {
    const items: ItemDef[] = [
      {
        name: 'user', type: 'FieldObject', flags: 'E,', defaultValue: '',
        ext: { tableId: 'users' },
        children: [
          { name: 'name', type: 'FieldObject', flags: 'F,', defaultValue: '', ext: {} },
          { name: 'email', type: 'FieldObject', flags: 'F,', defaultValue: '', ext: {} },
        ],
      },
      { name: 'combined', type: 'FieldObject', flags: 'F,', defaultValue: '', ext: {} },
    ];
    const classes: ClassDef[] = [
      {
        name: 'StringPlus', group: 'g1',
        fields: [
          { setter: 'setField1', value: 'user/name' },
          { setter: 'setField2', value: 'user/email' },
          { setter: 'setOutField', value: 'combined' },
        ],
      },
    ];
    const ctx = new ProcessContext({ 'user/name': 'Alice', 'user/email': '@test' });
    await runProcess(ctx, items, classes);
    assert.equal(ctx.output['combined'], 'Alice@test', `combined = "${ctx.output['combined']}"`);
    assert.equal(ctx.output['user/name'], 'Alice', `user/name = "${ctx.output['user/name']}"`);
    assert.equal(ctx.output['user/email'], '@test', `user/email = "${ctx.output['user/email']}"`);
  });
});
