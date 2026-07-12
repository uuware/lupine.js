import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import '../class-registry';
import { ProcessContext } from '../process-context';
import { runProcess, ClassDef, ItemDef } from '../run-process';
import { makeEntityObject, makeField, makeMockDb, makePhysicalFieldObject, withMockDb } from '../test-helper';
import { LoadEntity } from './LoadEntity';

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

describe('LoadEntity Process', () => {
  it('LoadEntity loads matching row values into entity fields', async () => {
    const keyentity = makeEntityObject('$__users', [makePhysicalFieldObject('id', 'id', '42')]);
    const entity = makeEntityObject('$__users', [
      makePhysicalFieldObject('id', 'id'),
      makePhysicalFieldObject('name', 'name'),
    ]);
    const db = makeMockDb([[{ __f0: '42', __f1: 'Alice' }]]);
    const proc = new LoadEntity();
    proc.setKeyentity(keyentity);
    proc.setEntity(entity);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, true, 'execute returned true');
    assert.equal(entity.getItemValue('id'), '42');
    assert.equal(entity.getItemValue('name'), 'Alice');
    assert.match(
      db.selects[0].sql,
      /^SELECT "id" AS "__f0", "name" AS "__f1" FROM "tbl_users" WHERE "id" = \? LIMIT 1$/
    );
    assert.deepEqual(db.selects[0].params, ['42']);
  });

  it('LoadEntity supports LIKE filters with escaped parameters', async () => {
    const keyentity = makeEntityObject('$__users', [makePhysicalFieldObject('email', 'email', 'example_', 'c')]);
    const entity = makeEntityObject('$__users', [makePhysicalFieldObject('email', 'email')]);
    const db = makeMockDb([[{ __f0: 'alice@example.com' }]]);
    const proc = new LoadEntity();
    proc.setKeyentity(keyentity);
    proc.setEntity(entity);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, true, 'execute returned true');
    assert.equal(entity.getItemValue('email'), 'alice@example.com');
    assert.match(db.selects[0].sql, /"email" LIKE \? ESCAPE '\\' LIMIT 1$/);
    assert.deepEqual(db.selects[0].params, ['%example\\_%']);
  });

  it('LoadEntity rejects missing table id from entity', async () => {
    const keyentity = makeEntityObject('$__users', [makePhysicalFieldObject('id', 'id', '42')]);
    const entity = makeEntityObject('', [makePhysicalFieldObject('id', 'id')]);
    const db = makeMockDb();
    const proc = new LoadEntity();
    proc.setKeyentity(keyentity);
    proc.setEntity(entity);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, false, 'execute returned false');
    assert.equal(entity.hasError(), true);
    assert.match(entity.getErrorMsg(), /SE_NOTABLEID/);
    assert.equal(db.selects.length, 0);
  });

  it('LoadEntity rejects blank key filters to avoid unrestricted loads', async () => {
    const keyentity = makeEntityObject('$__users', [makePhysicalFieldObject('id', 'id', '')]);
    const entity = makeEntityObject('$__users', [makePhysicalFieldObject('id', 'id')]);
    const db = makeMockDb();
    const proc = new LoadEntity();
    proc.setKeyentity(keyentity);
    proc.setEntity(entity);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, false, 'execute returned false');
    assert.equal(keyentity.hasError(), true);
    assert.match(keyentity.getErrorMsg(), /SE_NOWHERE/);
    assert.equal(db.selects.length, 0);
  });

  it('LoadEntity returns false when no row is found', async () => {
    const keyentity = makeEntityObject('$__users', [makePhysicalFieldObject('id', 'id', '404')]);
    const entity = makeEntityObject('$__users', [makePhysicalFieldObject('id', 'id')]);
    const db = makeMockDb([[]]);
    const proc = new LoadEntity();
    proc.setKeyentity(keyentity);
    proc.setEntity(entity);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, false, 'execute returned false');
    assert.equal(entity.hasError(), true);
    assert.match(entity.getErrorMsg(), /SE_NODATA/);
    assert.deepEqual(db.selects[0].params, ['404']);
  });

  it('LoadEntity returns false and reports query errors', async () => {
    const keyentity = makeEntityObject('$__users', [makePhysicalFieldObject('id', 'id', '42')]);
    const entity = makeEntityObject('$__users', [makePhysicalFieldObject('id', 'id')]);
    const db = makeMockDb();
    db.select = async function select(sql: string, params?: unknown[]) {
      this.selects.push({ sql, params });
      throw new Error('select failed');
    };
    const proc = new LoadEntity();
    proc.setKeyentity(keyentity);
    proc.setEntity(entity);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, false, 'execute returned false');
    assert.equal(entity.hasError(), true);
    assert.match(entity.getErrorMsg(), /SE_ERRQUERY/);
  });

  it('chkNull throws when keyentity is unbound', async () => {
    const proc = new LoadEntity();
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

  it('runProcess — loads a row into entity output', async () => {
    const items: ItemDef[] = [
      makeEntity('keyentity', '$__users', [makePhysicalField('id', 'id')]),
      makeEntity('entity', '$__users', [makePhysicalField('id', 'id'), makePhysicalField('name', 'name')]),
    ];
    const classes: ClassDef[] = [
      {
        name: 'LoadEntity',
        group: 'g1',
        fields: [
          { setter: 'keyentity', value: 'keyentity' },
          { setter: 'entity', value: 'entity' },
        ],
      },
    ];
    const ctx = new ProcessContext({ 'keyentity/id': '42' });
    const db = makeMockDb([[{ __f0: '42', __f1: 'Alice' }]]);

    const ok = await withMockDb(db, () => runProcess(ctx, items, classes));

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output['entity/id'], '42');
    assert.equal(ctx.output['entity/name'], 'Alice');
    assert.deepEqual(db.selects[0].params, ['42']);
  });

  it('runProcess — infers entity table id from LoadEntity keyentity binding', async () => {
    const items: ItemDef[] = [
      makeEntity('page', 'tbl_s_page', [
        makePhysicalField('name', 'name', 'content2'),
        makePhysicalField('remark', 'remark'),
        makePhysicalField('package', 'package'),
      ]),
      {
        name: 'entity',
        type: '',
        flags: 'E,',
        defaultValue: '',
        children: [
          makePhysicalField('name', 'name'),
          makePhysicalField('remark', 'remark'),
          makePhysicalField('package', 'package'),
        ],
      },
    ];
    const classes: ClassDef[] = [
      {
        name: 'LoadEntity',
        group: '',
        fields: [
          { setter: 'keyentity', value: 'page' },
          { setter: 'entity', value: 'entity' },
        ],
      },
    ];
    const ctx = new ProcessContext({ processmode: '3' });
    const db = makeMockDb([[{ __f0: 'content2', __f1: '', __f2: 'default' }]]);

    const ok = await withMockDb(db, () => runProcess(ctx, items, classes));

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(ctx.output['entity#ERR'], undefined);
    assert.equal(ctx.output['entity/name'], 'content2');
    assert.equal(ctx.output['entity/remark'], '');
    assert.equal(ctx.output['entity/package'], 'default');
    assert.equal(db.selects.length, 1);
    assert.equal(
      db.selects[0].sql,
      'SELECT "name" AS "__f0", "remark" AS "__f1", "package" AS "__f2" FROM "tbl_s_page" WHERE "name" = ? LIMIT 1'
    );
    assert.deepEqual(db.selects[0].params, ['content2']);
  });
});
