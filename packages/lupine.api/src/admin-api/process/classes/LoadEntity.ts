/**
 * Converted from PHP classes/LoadEntity.php
 */

import { ProcessBase } from '../process-base';
import { EntityObject, FieldType } from '../field-objects';
import { apiCache } from 'lupine.api';
import { appendSqlLimit, createEntityFilterSql, createSelectRecordSql, getRowValue } from '../db-helper';

export class LoadEntity extends ProcessBase {
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

  override async execute(): Promise<boolean | void> {
    this.chkNull('keyentity', 'EntityObject');
    this.chkNull('entity', 'EntityObject');

    const db = apiCache.getDb();
    const filterResult = createEntityFilterSql(db, this.keyentity!);
    if (filterResult.sql === '') {
      this.addError(this.keyentity, 'SE_NOWHERE::No where filter.');
      return false;
    }

    const sqlResult = createSelectRecordSql(db, this.keyentity!, this.entity!, this.addError.bind(this));
    if (sqlResult === false) {
      return false;
    }

    let row: Record<string, unknown> | null = null;
    try {
      const rows = await db.select(appendSqlLimit(db, sqlResult.sql, 1), sqlResult.params);
      row = rows && rows.length > 0 ? rows[0] : null;
    } catch (e: any) {
      this.entity!.addError('SE_ERRQUERY::Error while query: {%0}.', 'alert', [e.message]);
      return false;
    }

    if (!row) {
      this.entity!.addError('SE_NODATA::Load data error.');
      return false;
    }

    for (const [key, val] of Object.entries(sqlResult.fieldArr)) {
      this.entity!.setItemValue(Number(key), getRowValue(row, val));
    }

    // if field is "XXX#OPTNAME", then get optname to it from field "XXX" if exist.
    const items = this.entity!.getItems();
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const id = item.getFieldId();
      if (!id) continue;
      const pos = id.indexOf('#');
      if (pos !== -1) {
        const name2 = id.substring(pos + 1);
        if (name2 === 'OPTNAME') {
          // get orignal item
          const id2 = id.substring(0, pos);
          const value2 = '' + this.entity!.getItemValue(id2);
          if (value2 !== '') {
            // let itemoptname = /* TODO StBase */getItemOptname(id2, value2);
            // this.entity!.setItemValue( id, itemoptname );
          }
        }
      }
    }
    return true;
  }
}
