import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import '../class-registry';
import { ProcessContext } from '../process-context';
import { runProcess, ClassDef, ItemDef } from '../run-process';
import { makeEntityObject, makeField, makeMockDb, makePhysicalFieldObject, withMockDb } from '../test-helper';
import { UpdateEntity } from './UpdateEntity';

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

describe('UpdateEntity Process', () => {
  it('UpdateEntity updates an entity with parameterized SQL', async () => {
    const keyentity = makeEntityObject('$__users', [makePhysicalFieldObject('id', 'id', '42')]);
    const entity = makeEntityObject('$__users', [
      makePhysicalFieldObject('id', 'id', '42'),
      makePhysicalFieldObject('name', 'name', 'Alice'),
      makePhysicalFieldObject('email', 'email', 'alice@example.com'),
    ]);
    const db = makeMockDb();
    const proc = new UpdateEntity();
    proc.setKeyentity(keyentity);
    proc.setEntity(entity);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, true, 'execute returned true');
    assert.equal(db.executes.length, 1);
    assert.equal(db.executes[0].sql, 'UPDATE "tbl_users" SET "name" = ?, "email" = ? WHERE "id" = ?');
    assert.deepEqual(db.executes[0].params, ['Alice', 'alice@example.com', '42']);
  });

  it('UpdateEntity supports LIKE key filters with escaped parameters', async () => {
    const keyentity = makeEntityObject('$__users', [makePhysicalFieldObject('email', 'email', 'example_', 'c')]);
    const entity = makeEntityObject('$__users', [makePhysicalFieldObject('name', 'name', 'Alice')]);
    const db = makeMockDb();
    const proc = new UpdateEntity();
    proc.setKeyentity(keyentity);
    proc.setEntity(entity);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, true, 'execute returned true');
    assert.equal(db.executes[0].sql, 'UPDATE "tbl_users" SET "name" = ? WHERE "email" LIKE ? ESCAPE \'\\\'');
    assert.deepEqual(db.executes[0].params, ['Alice', '%example\\_%']);
  });

  it('UpdateEntity rejects missing table id', async () => {
    const keyentity = makeEntityObject('$__users', [makePhysicalFieldObject('id', 'id', '42')]);
    const entity = makeEntityObject('', [makePhysicalFieldObject('name', 'name', 'Alice')]);
    const db = makeMockDb();
    const proc = new UpdateEntity();
    proc.setKeyentity(keyentity);
    proc.setEntity(entity);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, false, 'execute returned false');
    assert.equal(entity.hasError(), true);
    assert.match(entity.getErrorMsg(), /SE_NOTABLEID/);
    assert.equal(db.executes.length, 0);
  });

  it('UpdateEntity rejects blank key filters to avoid whole-table updates', async () => {
    const keyentity = makeEntityObject('$__users', [makePhysicalFieldObject('id', 'id', '')]);
    const entity = makeEntityObject('$__users', [makePhysicalFieldObject('name', 'name', 'Alice')]);
    const db = makeMockDb();
    const proc = new UpdateEntity();
    proc.setKeyentity(keyentity);
    proc.setEntity(entity);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, false, 'execute returned false');
    assert.equal(keyentity.hasError(), true);
    assert.match(keyentity.getErrorMsg(), /SE_NOWHERE/);
    assert.equal(db.executes.length, 0);
  });

  it('UpdateEntity rejects entities with no non-key update fields', async () => {
    const keyentity = makeEntityObject('$__users', [makePhysicalFieldObject('id', 'id', '42')]);
    const entity = makeEntityObject('$__users', [makePhysicalFieldObject('id', 'id', '42')]);
    const db = makeMockDb();
    const proc = new UpdateEntity();
    proc.setKeyentity(keyentity);
    proc.setEntity(entity);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, false, 'execute returned false');
    assert.equal(entity.hasError(), true);
    assert.match(entity.getErrorMsg(), /SE_NOFIELD/);
    assert.equal(db.executes.length, 0);
  });

  it('UpdateEntity returns false and reports execute errors', async () => {
    const keyentity = makeEntityObject('$__users', [makePhysicalFieldObject('id', 'id', '42')]);
    const entity = makeEntityObject('$__users', [makePhysicalFieldObject('name', 'name', 'Alice')]);
    const db = makeMockDb();
    db.execute = async function execute(sql: string, params?: unknown[]) {
      this.executes.push({ sql, params });
      throw new Error('update failed');
    };
    const proc = new UpdateEntity();
    proc.setKeyentity(keyentity);
    proc.setEntity(entity);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, false, 'execute returned false');
    assert.equal(entity.hasError(), true);
    assert.match(entity.getErrorMsg(), /SE_ERRQUERY/);
  });

  it('chkNull throws when keyentity is unbound', async () => {
    const proc = new UpdateEntity();
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

  it('runProcess — updates posted entity values', async () => {
    const items: ItemDef[] = [
      makeEntity('keyentity', '$__users', [makePhysicalField('id', 'id')]),
      makeEntity('entity', '$__users', [makePhysicalField('id', 'id'), makePhysicalField('name', 'name')]),
    ];
    const classes: ClassDef[] = [
      {
        name: 'UpdateEntity',
        group: 'g1',
        fields: [
          { setter: 'keyentity', value: 'keyentity' },
          { setter: 'entity', value: 'entity' },
        ],
      },
    ];
    const ctx = new ProcessContext({
      'keyentity/id': '42',
      'entity/id': '42',
      'entity/name': 'Alice',
    });
    const db = makeMockDb();

    const ok = await withMockDb(db, () => runProcess(ctx, items, classes));

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(db.executes[0].sql, 'UPDATE "tbl_users" SET "name" = ? WHERE "id" = ?');
    assert.deepEqual(db.executes[0].params, ['Alice', '42']);
    assert.equal(ctx.output['entity/id'], '42');
    assert.equal(ctx.output['entity/name'], 'Alice');
  });
});
