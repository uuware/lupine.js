import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import '../class-registry';
import { ProcessContext } from '../process-context';
import { runProcess, ClassDef, ItemDef } from '../run-process';
import {
  makeEntityObject,
  makeField,
  makeFieldObject,
  makeMockDb,
  makePhysicalFieldObject,
  withMockDb,
} from '../test-helper';
import { CheckRecordExistIfUpdate } from './CheckRecordExistIfUpdate';

const makeEntity = (name: string, tableId: string, children: ItemDef[]): ItemDef => ({
  name,
  type: 'FieldObject',
  flags: 'E,',
  defaultValue: '',
  ext: { tableId },
  children,
});

const makePhysicalField = (name: string, physicalId: string, defaultValue = '', filter = ''): ItemDef => ({
  ...makeField(name, defaultValue),
  ext: { physicalId, filter },
});

describe('CheckRecordExistIfUpdate Process', () => {
  it('CheckRecordExistIfUpdate delegates to must-exist check when mode is M', async () => {
    const mode = makeFieldObject('mode', 'M');
    const keyentity = makeEntityObject('$__users', [makePhysicalFieldObject('email', 'email', 'alice@example.com')]);
    const entity = makeEntityObject('$__users', [makePhysicalFieldObject('email', 'email')]);
    const db = makeMockDb([[{ __f0: 'alice@example.com' }]]);
    const proc = new CheckRecordExistIfUpdate();
    proc.setMode(mode);
    proc.setKeyentity(keyentity);
    proc.setEntity(entity);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, true, 'execute returned true');
    assert.equal(entity.hasError(), false);
    assert.equal(db.selects.length, 1);
    assert.match(db.selects[0].sql, /^SELECT "email" AS "__f0" FROM "tbl_users" WHERE "email" = \? LIMIT 1$/);
    assert.deepEqual(db.selects[0].params, ['alice@example.com']);
  });

  it('CheckRecordExistIfUpdate rejects missing records when mode is M', async () => {
    const mode = makeFieldObject('mode', 'M');
    const keyentity = makeEntityObject('$__users', [makePhysicalFieldObject('email', 'email', 'alice@example.com')]);
    const entity = makeEntityObject('$__users', [makePhysicalFieldObject('email', 'email')]);
    const db = makeMockDb([[]]);
    const proc = new CheckRecordExistIfUpdate();
    proc.setMode(mode);
    proc.setKeyentity(keyentity);
    proc.setEntity(entity);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, false, 'execute returned false');
    assert.equal(entity.hasError(), true);
    assert.match(entity.getErrorMsg(), /SE_NOTEXISTREC/);
    assert.deepEqual(db.selects[0].params, ['alice@example.com']);
  });

  it('CheckRecordExistIfUpdate skips database checks when mode is not M', async () => {
    const mode = makeFieldObject('mode', 'A');
    const keyentity = makeEntityObject('$__users', [makePhysicalFieldObject('email', 'email', 'alice@example.com')]);
    const entity = makeEntityObject('$__users', [makePhysicalFieldObject('email', 'email')]);
    const db = makeMockDb([[]]);
    const proc = new CheckRecordExistIfUpdate();
    proc.setMode(mode);
    proc.setKeyentity(keyentity);
    proc.setEntity(entity);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, true, 'execute returned true');
    assert.equal(entity.hasError(), false);
    assert.equal(db.selects.length, 0);
  });

  it('chkNull throws when mode is unbound', async () => {
    const proc = new CheckRecordExistIfUpdate();
    proc.setKeyentity(makeEntityObject('$__users', []));
    proc.setEntity(makeEntityObject('$__users', []));
    let threw = false;

    try {
      await withMockDb(makeMockDb(), () => proc.execute());
    } catch (e: any) {
      threw = true;
      assert.ok(e.message.includes('need associate object'), `Error: ${e.message}`);
    }

    assert.ok(threw, 'chkNull threw error');
  });

  it('runProcess — delegates when posted mode is M', async () => {
    const items: ItemDef[] = [
      makeField('mode'),
      makeEntity('keyentity', '$__users', [makePhysicalField('email', 'email')]),
      makeEntity('entity', '$__users', [makePhysicalField('email', 'email')]),
    ];
    const classes: ClassDef[] = [
      {
        name: 'CheckRecordExistIfUpdate',
        group: 'g1',
        fields: [
          { setter: 'mode', value: 'mode' },
          { setter: 'keyentity', value: 'keyentity' },
          { setter: 'entity', value: 'entity' },
        ],
      },
    ];
    const ctx = new ProcessContext({
      processmode: '3',
      mode: 'M',
      'keyentity/email': 'alice@example.com',
    });
    const db = makeMockDb([[{ __f0: 'alice@example.com' }]]);

    const ok = await withMockDb(db, () => runProcess(ctx, items, classes));

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output['entity#ERR'], undefined);
    assert.deepEqual(db.selects[0].params, ['alice@example.com']);
  });
});
