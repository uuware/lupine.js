import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import '../class-registry';
import { ProcessContext } from '../process-context';
import { runProcess, ClassDef, ItemDef } from '../run-process';
import { makeEntityObject, makeField, makeMockDb, makePhysicalFieldObject, withMockDb } from '../test-helper';
import { InsertEntity } from './InsertEntity';

const makeEntity = (name: string, tableId: string, children: ItemDef[]): ItemDef => ({
  name,
  type: 'FieldObject',
  flags: 'E,',
  defaultValue: '',
  ext: { tableId },
  children,
});

const makePhysicalField = (name: string, physicalId: string, defaultValue = ''): ItemDef => ({
  ...makeField(name, defaultValue),
  ext: { physicalId },
});

describe('InsertEntity Process', () => {
  it('InsertEntity inserts one entity with parameterized SQL', async () => {
    const entity = makeEntityObject('$__users', [
      makePhysicalFieldObject('id', 'id', '42'),
      makePhysicalFieldObject('name', 'name', 'Alice'),
    ]);
    const db = makeMockDb();
    const proc = new InsertEntity();
    proc.setEntity(entity);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, true, 'execute returned true');
    assert.equal(db.executes.length, 1);
    assert.equal(db.executes[0].sql, 'INSERT INTO "tbl_users" ( "id", "name" ) VALUES ( ?, ? )');
    assert.deepEqual(db.executes[0].params, ['42', 'Alice']);
  });

  it('InsertEntity rejects missing table id', async () => {
    const entity = makeEntityObject('', [makePhysicalFieldObject('id', 'id', '42')]);
    const db = makeMockDb();
    const proc = new InsertEntity();
    proc.setEntity(entity);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, false, 'execute returned false');
    assert.equal(entity.hasError(), true);
    assert.match(entity.getErrorMsg(), /SE_NOTABLEID/);
    assert.equal(db.executes.length, 0);
  });

  it('InsertEntity rejects entities with no physical fields', async () => {
    const entity = makeEntityObject('$__users', [makePhysicalFieldObject('id', '', '42')]);
    const db = makeMockDb();
    const proc = new InsertEntity();
    proc.setEntity(entity);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, false, 'execute returned false');
    assert.equal(entity.hasError(), true);
    assert.match(entity.getErrorMsg(), /SE_NOFIELD/);
    assert.equal(db.executes.length, 0);
  });

  it('InsertEntity returns false and reports execute errors', async () => {
    const entity = makeEntityObject('$__users', [makePhysicalFieldObject('id', 'id', '42')]);
    const db = makeMockDb();
    db.execute = async function execute(sql: string, params?: unknown[]) {
      this.executes.push({ sql, params });
      throw new Error('insert failed');
    };
    const proc = new InsertEntity();
    proc.setEntity(entity);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, false, 'execute returned false');
    assert.equal(entity.hasError(), true);
    assert.match(entity.getErrorMsg(), /SE_ERRQUERY/);
  });

  it('chkNull throws when entity is unbound', async () => {
    const proc = new InsertEntity();
    let threw = false;

    try {
      await withMockDb(makeMockDb(), () => proc.execute());
    } catch (e: any) {
      threw = true;
      assert.ok(e.message.includes('need associate object'), `Error: ${e.message}`);
    }

    assert.ok(threw, 'chkNull threw error');
  });

  it('runProcess — inserts posted entity values', async () => {
    const items: ItemDef[] = [
      makeEntity('entity', '$__users', [makePhysicalField('id', 'id'), makePhysicalField('name', 'name')]),
    ];
    const classes: ClassDef[] = [
      {
        name: 'InsertEntity',
        group: 'g1',
        fields: [{ setter: 'entity', value: 'entity' }],
      },
    ];
    const ctx = new ProcessContext({
      'entity/id': '42',
      'entity/name': 'Alice',
    });
    const db = makeMockDb();

    const ok = await withMockDb(db, () => runProcess(ctx, items, classes));

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(db.executes.length, 1);
    assert.equal(db.executes[0].sql, 'INSERT INTO "tbl_users" ( "id", "name" ) VALUES ( ?, ? )');
    assert.deepEqual(db.executes[0].params, ['42', 'Alice']);
    assert.equal(ctx.output['entity/id'], '42');
    assert.equal(ctx.output['entity/name'], 'Alice');
  });
});
