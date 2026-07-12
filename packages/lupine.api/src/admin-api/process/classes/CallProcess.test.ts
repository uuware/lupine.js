import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import '../class-registry';
import { ProcessContext } from '../process-context';
import { runProcess, ClassDef, ItemDef } from '../run-process';
import { makeField, makeFieldObject, makeMockDb, withMockDb } from '../test-helper';
import { CallProcess } from './CallProcess';

const makeProcessJson = (items: ItemDef[], classes: ClassDef[]) => JSON.stringify({ items, classes });

const makeStoredProcessDb = (processJson: string) => makeMockDb([[{ json: processJson }]]);

describe('CallProcess Process', () => {
  it('CallProcess runs a stored process and copies nested output to the caller context', async () => {
    const processid = makeFieldObject('processid', 'child_process');
    const processmode = makeFieldObject('processmode', '3');
    const db = makeStoredProcessDb(
      makeProcessJson(
        [makeField('target')],
        [
          {
            name: 'CopyItemForce',
            group: 'g1',
            fields: [
              { setter: 'itemfrom', value: '=child-value' },
              { setter: 'itemto', value: 'target' },
            ],
          },
        ]
      )
    );
    const ctx = new ProcessContext({ target: 'old' }, 'parent_process');
    const proc = new CallProcess();
    proc._setContext(ctx);
    proc.setProcessid(processid);
    proc.setProcessmode(processmode);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, true, 'execute returned true');
    assert.equal(db.selects.length, 1);
    assert.equal(db.selects[0].sql, 'SELECT json FROM $__s_process WHERE processid = ?');
    assert.deepEqual(db.selects[0].params, ['child_process']);
    assert.equal(ctx.output.target, 'child-value');
    assert.equal(ctx.input.target, 'child-value');
  });

  it('CallProcess defaults blank processmode to view mode', async () => {
    const processid = makeFieldObject('processid', 'child_process');
    const processmode = makeFieldObject('processmode', '');
    const db = makeStoredProcessDb(
      makeProcessJson(
        [makeField('target', 'initial')],
        [
          {
            name: 'CopyItemForce',
            group: 'g1',
            runType: '3',
            fields: [
              { setter: 'itemfrom', value: '=view-mode' },
              { setter: 'itemto', value: 'target' },
            ],
          },
        ]
      )
    );
    const ctx = new ProcessContext({}, 'parent_process');
    const proc = new CallProcess();
    proc._setContext(ctx);
    proc.setProcessid(processid);
    proc.setProcessmode(processmode);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, true, 'execute returned true');
    assert.equal(ctx.output.target, 'view-mode');
  });

  it('CallProcess propagates nested process failure', async () => {
    const processid = makeFieldObject('processid', 'child_process');
    const processmode = makeFieldObject('processmode', '3');
    const db = makeStoredProcessDb(
      makeProcessJson(
        [makeField('required')],
        [
          {
            name: 'MandatoryCheck',
            group: 'g1',
            fields: [{ setter: 'fields', value: 'required' }],
          },
        ]
      )
    );
    const ctx = new ProcessContext({ required: '' }, 'parent_process');
    const proc = new CallProcess();
    proc._setContext(ctx);
    proc.setProcessid(processid);
    proc.setProcessmode(processmode);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, false, 'execute returned false');
    assert.equal(ctx.output.required, '');
    assert.equal(ctx.output['required#ERR'], '1');
  });

  it('CallProcess reports missing stored process rows on processid', async () => {
    const processid = makeFieldObject('processid', 'missing_process');
    const processmode = makeFieldObject('processmode', '3');
    const db = makeMockDb([[]]);
    const proc = new CallProcess();
    proc.setProcessid(processid);
    proc.setProcessmode(processmode);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, false, 'execute returned false');
    assert.equal(processid.hasError(), true);
    assert.match(processid.getErrorMsg(), /SE_PROCESS_NOT_FOUND/);
  });

  it('CallProcess reports invalid stored process JSON on processid', async () => {
    const processid = makeFieldObject('processid', 'broken_process');
    const processmode = makeFieldObject('processmode', '3');
    const db = makeStoredProcessDb('{bad json');
    const proc = new CallProcess();
    proc.setProcessid(processid);
    proc.setProcessmode(processmode);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, false, 'execute returned false');
    assert.equal(processid.hasError(), true);
    assert.match(processid.getErrorMsg(), /SE_PROCESS_JSON/);
  });

  it('CallProcess accepts blank process ids as no-op', async () => {
    const processid = makeFieldObject('processid', '_blank_');
    const processmode = makeFieldObject('processmode', '3');
    const db = makeMockDb();
    const proc = new CallProcess();
    proc.setProcessid(processid);
    proc.setProcessmode(processmode);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, true, 'execute returned true');
    assert.equal(db.selects.length, 0);
  });

  it('chkNull throws when processid is unbound', async () => {
    const proc = new CallProcess();
    proc.setProcessmode(makeFieldObject('processmode', '3'));
    let threw = false;

    try {
      await withMockDb(makeMockDb(), () => proc.execute());
    } catch (e: any) {
      threw = true;
      assert.ok(e.message.includes('need associate object'), `Error: ${e.message}`);
    }

    assert.ok(threw, 'chkNull threw error');
  });

  it('runProcess — calls a stored process and preserves its output', async () => {
    const items: ItemDef[] = [makeField('processid'), makeField('processmode'), makeField('target', 'old')];
    const classes: ClassDef[] = [
      {
        name: 'CallProcess',
        group: 'g1',
        fields: [
          { setter: 'processid', value: 'processid' },
          { setter: 'processmode', value: 'processmode' },
        ],
      },
    ];
    const db = makeStoredProcessDb(
      makeProcessJson(
        [makeField('target')],
        [
          {
            name: 'CopyItemForce',
            group: 'g1',
            fields: [
              { setter: 'itemfrom', value: '=nested' },
              { setter: 'itemto', value: 'target' },
            ],
          },
        ]
      )
    );
    const ctx = new ProcessContext({ processid: 'child_process', processmode: '3', target: 'old' });

    const ok = await withMockDb(db, () => runProcess(ctx, items, classes));

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output.target, 'nested');
  });

  it('runProcess — supports legacy process id setter casing', async () => {
    const items: ItemDef[] = [makeField('processid'), makeField('processmode'), makeField('target', 'old')];
    const classes: ClassDef[] = [
      {
        name: 'CallProcess',
        group: 'g1',
        fields: [
          { setter: 'setProcessId', value: 'processid' },
          { setter: 'setProcessMode', value: 'processmode' },
        ],
      },
    ];
    const db = makeStoredProcessDb(
      makeProcessJson(
        [makeField('target')],
        [
          {
            name: 'CopyItemForce',
            group: 'g1',
            fields: [
              { setter: 'itemfrom', value: '=legacy' },
              { setter: 'itemto', value: 'target' },
            ],
          },
        ]
      )
    );
    const ctx = new ProcessContext({ processid: 'child_process', processmode: '3', target: 'old' });

    const ok = await withMockDb(db, () => runProcess(ctx, items, classes));

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output.target, 'legacy');
  });
});
