import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import '../class-registry';
import { ProcessContext } from '../process-context';
import { runProcess, ClassDef, ItemDef } from '../run-process';
import { makeEntityObject, makeField, makeMockDb, makePhysicalFieldObject, withMockDb } from '../test-helper';
import { CheckRecordMustExist } from './CheckRecordMustExist';

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

describe('CheckRecordMustExist Process', () => {
  it('CheckRecordMustExist accepts when a matching row exists', async () => {
    const keyentity = makeEntityObject('$__users', [makePhysicalFieldObject('email', 'email', 'alice@example.com')]);
    const entity = makeEntityObject('$__users', [makePhysicalFieldObject('email', 'email')]);
    const db = makeMockDb([[{ __f0: 'alice@example.com' }]]);
    const proc = new CheckRecordMustExist();
    proc.setKeyentity(keyentity);
    proc.setEntity(entity);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, true, 'execute returned true');
    assert.equal(entity.hasError(), false);
    assert.equal(db.selects.length, 1);
    assert.match(db.selects[0].sql, /^SELECT "email" AS "__f0" FROM "tbl_users" WHERE "email" = \? LIMIT 1$/);
    assert.deepEqual(db.selects[0].params, ['alice@example.com']);
  });

  it('CheckRecordMustExist rejects when no matching row exists', async () => {
    const keyentity = makeEntityObject('$__users', [makePhysicalFieldObject('email', 'email', 'alice@example.com')]);
    const entity = makeEntityObject('$__users', [makePhysicalFieldObject('email', 'email')]);
    const db = makeMockDb([[]]);
    const proc = new CheckRecordMustExist();
    proc.setKeyentity(keyentity);
    proc.setEntity(entity);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, false, 'execute returned false');
    assert.equal(entity.hasError(), true);
    assert.match(entity.getErrorMsg(), /SE_NOTEXISTREC/);
    assert.deepEqual(db.selects[0].params, ['alice@example.com']);
  });

  it('CheckRecordMustExist supports LIKE key filters with escaped parameters', async () => {
    const keyentity = makeEntityObject('$__users', [makePhysicalFieldObject('email', 'email', 'example_', 'c')]);
    const entity = makeEntityObject('$__users', [makePhysicalFieldObject('email', 'email')]);
    const db = makeMockDb([[{ __f0: 'alice@example.com' }]]);
    const proc = new CheckRecordMustExist();
    proc.setKeyentity(keyentity);
    proc.setEntity(entity);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, true, 'execute returned true');
    assert.match(db.selects[0].sql, /"email" LIKE \? ESCAPE '\\' LIMIT 1$/);
    assert.deepEqual(db.selects[0].params, ['%example\\_%']);
  });

  it('CheckRecordMustExist rejects missing table id from entity', async () => {
    const keyentity = makeEntityObject('$__users', [makePhysicalFieldObject('email', 'email', 'alice@example.com')]);
    const entity = makeEntityObject('', [makePhysicalFieldObject('email', 'email')]);
    const db = makeMockDb();
    const proc = new CheckRecordMustExist();
    proc.setKeyentity(keyentity);
    proc.setEntity(entity);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, false, 'execute returned false');
    assert.equal(entity.hasError(), true);
    assert.match(entity.getErrorMsg(), /SE_NOTABLEID/);
    assert.equal(db.selects.length, 0);
  });

  it('CheckRecordMustExist returns false and reports query errors', async () => {
    const keyentity = makeEntityObject('$__users', [makePhysicalFieldObject('email', 'email', 'alice@example.com')]);
    const entity = makeEntityObject('$__users', [makePhysicalFieldObject('email', 'email')]);
    const db = makeMockDb();
    db.select = async function select(sql: string, params?: unknown[]) {
      this.selects.push({ sql, params });
      throw new Error('select failed');
    };
    const proc = new CheckRecordMustExist();
    proc.setKeyentity(keyentity);
    proc.setEntity(entity);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, false, 'execute returned false');
    assert.equal(entity.hasError(), true);
    assert.match(entity.getErrorMsg(), /SE_ERRQUERY/);
  });

  it('chkNull throws when keyentity is unbound', async () => {
    const proc = new CheckRecordMustExist();
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

  it('runProcess — accepts when a matching row exists', async () => {
    const items: ItemDef[] = [
      makeEntity('keyentity', '$__users', [makePhysicalField('email', 'email')]),
      makeEntity('entity', '$__users', [makePhysicalField('email', 'email')]),
    ];
    const classes: ClassDef[] = [
      {
        name: 'CheckRecordMustExist',
        group: 'g1',
        fields: [
          { setter: 'keyentity', value: 'keyentity' },
          { setter: 'entity', value: 'entity' },
        ],
      },
    ];
    const ctx = new ProcessContext({ 'keyentity/email': 'alice@example.com' });
    const db = makeMockDb([[{ __f0: 'alice@example.com' }]]);

    const ok = await withMockDb(db, () => runProcess(ctx, items, classes));

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output['entity#ERR'], undefined);
    assert.deepEqual(db.selects[0].params, ['alice@example.com']);
  });
});
