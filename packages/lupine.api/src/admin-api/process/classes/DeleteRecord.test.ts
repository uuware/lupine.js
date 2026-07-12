import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import '../class-registry';
import { ProcessContext } from '../process-context';
import { runProcess, ClassDef, ItemDef } from '../run-process';
import { makeEntityObject, makeField, makeMockDb, makePhysicalFieldObject, withMockDb } from '../test-helper';
import { DeleteRecord } from './DeleteRecord';

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

describe('DeleteRecord Process', () => {
  it('DeleteRecord deletes matching records with parameterized SQL', async () => {
    const keyentity = makeEntityObject('$__users', [makePhysicalFieldObject('id', 'id', '42')]);
    const db = makeMockDb();
    const proc = new DeleteRecord();
    proc.setKeyentity(keyentity);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, true, 'execute returned true');
    assert.equal(db.executes.length, 1);
    assert.equal(db.executes[0].sql, 'DELETE FROM "tbl_users" WHERE "id" = ?');
    assert.deepEqual(db.executes[0].params, ['42']);
  });

  it('DeleteRecord supports LIKE filters with escaped parameters', async () => {
    const keyentity = makeEntityObject('$__users', [makePhysicalFieldObject('email', 'email', 'example_', 'c')]);
    const db = makeMockDb();
    const proc = new DeleteRecord();
    proc.setKeyentity(keyentity);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, true, 'execute returned true');
    assert.equal(db.executes[0].sql, 'DELETE FROM "tbl_users" WHERE "email" LIKE ? ESCAPE \'\\\'');
    assert.deepEqual(db.executes[0].params, ['%example\\_%']);
  });

  it('DeleteRecord rejects missing table id on keyentity', async () => {
    const keyentity = makeEntityObject('', [makePhysicalFieldObject('id', 'id', '42')]);
    const db = makeMockDb();
    const proc = new DeleteRecord();
    proc.setKeyentity(keyentity);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, false, 'execute returned false');
    assert.equal(keyentity.hasError(), true);
    assert.match(keyentity.getErrorMsg(), /SE_NOTABLEID/);
    assert.equal(db.executes.length, 0);
  });

  it('DeleteRecord rejects blank filters to avoid whole-table deletes', async () => {
    const keyentity = makeEntityObject('$__users', [makePhysicalFieldObject('id', 'id', '')]);
    const db = makeMockDb();
    const proc = new DeleteRecord();
    proc.setKeyentity(keyentity);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, false, 'execute returned false');
    assert.equal(keyentity.hasError(), true);
    assert.match(keyentity.getErrorMsg(), /SE0007/);
    assert.equal(db.executes.length, 0);
  });

  it('DeleteRecord returns false and reports execute errors', async () => {
    const keyentity = makeEntityObject('$__users', [makePhysicalFieldObject('id', 'id', '42')]);
    const db = makeMockDb();
    db.execute = async function execute(sql: string, params?: unknown[]) {
      this.executes.push({ sql, params });
      throw new Error('delete failed');
    };
    const proc = new DeleteRecord();
    proc.setKeyentity(keyentity);

    const ok = await withMockDb(db, () => proc.execute());

    assert.equal(ok, false, 'execute returned false');
    assert.equal(keyentity.hasError(), true);
    assert.match(keyentity.getErrorMsg(), /SE0003/);
  });

  it('chkNull throws when keyentity is unbound', async () => {
    const proc = new DeleteRecord();
    let threw = false;

    try {
      await withMockDb(makeMockDb(), () => proc.execute());
    } catch (e: any) {
      threw = true;
      assert.ok(e.message.includes('need associate object'), `Error: ${e.message}`);
    }

    assert.ok(threw, 'chkNull threw error');
  });

  it('runProcess — deletes matching records from posted key entity values', async () => {
    const items: ItemDef[] = [makeEntity('keyentity', '$__users', [makePhysicalField('id', 'id')])];
    const classes: ClassDef[] = [
      {
        name: 'DeleteRecord',
        group: 'g1',
        fields: [{ setter: 'keyentity', value: 'keyentity' }],
      },
    ];
    const ctx = new ProcessContext({ 'keyentity/id': '42' });
    const db = makeMockDb();

    const ok = await withMockDb(db, () => runProcess(ctx, items, classes));

    assert.equal(ok, true, 'runProcess returned true');
    assert.equal(db.executes[0].sql, 'DELETE FROM "tbl_users" WHERE "id" = ?');
    assert.deepEqual(db.executes[0].params, ['42']);
    assert.equal(ctx.output['keyentity/id'], '42');
  });
});
