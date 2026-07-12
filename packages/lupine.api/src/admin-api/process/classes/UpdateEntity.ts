/**
 * Converted from PHP classes/UpdateEntity.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, EntityObject, FieldType } from '../field-objects';
import { apiCache } from 'lupine.api';
import { createEntityFilterSql, escapeSqlIdentifier, escapeSqlTableName } from '../db-helper';

export class UpdateEntity extends ProcessBase {
  keyentity: EntityObject | null = null;
  getKeyentityInfo() {
    return { entity: true, type: FieldType.String };
  }
  setKeyentity(keyentity: EntityObject): void {
    this.keyentity = keyentity;
  }

  entity: EntityObject | null = null;
  getEntityInfo() {
    return { entity: true, type: FieldType.String };
  }
  setEntity(entity: EntityObject): void {
    this.entity = entity;
  }

  async executeSub(
    errorTarget: FieldObject | null = this.entity,
    noFieldMsgId = 'SE_NOFIELD::No field.',
    tableIdOverride?: string
  ): Promise<boolean | void> {
    this.chkNull('keyentity', 'EntityObject');
    this.chkNull('entity', 'EntityObject');

    let tblidStr = tableIdOverride ?? this.entity!.getTableId();
    if (tblidStr === '') {
      this.addError(this.entity, 'SE_NOTABLEID::Not set table id in list.');
      return false;
    }
    const realTblid = tblidStr; // TODO getRealTableId
    if (realTblid === '') {
      this.addError(this.entity, 'SE_NOACCESSTBL::Not access table: {%0}.', 'alert', [tblidStr]);
      return false;
    }

    const db = apiCache.getDb();
    const filterResult = createEntityFilterSql(db, this.keyentity!);
    const arrkey: Record<string, number> = {};
    for (const item of this.keyentity!.getItems()) {
      const pid = item.getPhysicalId();
      if (!pid || item.isBlank()) continue;
      arrkey[pid] = 1;
    }

    if (filterResult.sql === '') {
      this.addError(this.keyentity, 'SE_NOWHERE::No where filter.');
      return false;
    }

    const setParts: string[] = [];
    const params: unknown[] = [];
    for (const item of this.entity!.getItems()) {
      const pid = item.getPhysicalId();
      if (pid !== '' && !arrkey[pid]) {
        setParts.push(escapeSqlIdentifier(db, pid) + ' = ?');
        params.push(item.getValue());
      }
    }

    if (setParts.length === 0) {
      this.addError(errorTarget, noFieldMsgId);
      return false;
    }

    const sql =
      'UPDATE ' + escapeSqlTableName(db, realTblid) + ' SET ' + setParts.join(', ') + ' WHERE ' + filterResult.sql;

    try {
      await db.execute(sql, [...params, ...filterResult.params]);
    } catch (e: any) {
      this.addError(errorTarget, 'SE_ERRQUERY::Error while query: {%0}.', 'alert', [e.message]);
      return false;
    }
    return true;
  }

  override async execute(): Promise<boolean | void> {
    return this.executeSub();
  }
}
