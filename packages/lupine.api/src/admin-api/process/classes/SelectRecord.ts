/**
 * Converted from PHP classes/SelectRecord.php
 */

import { ProcessBase } from '../process-base';
import { EntityObject, FieldObject, ListObject, FieldType } from '../field-objects';
import { apiCache } from 'lupine.api';
import { appendSqlLimit, createSelectRecordSql, getRowValue } from '../db-helper';

export class SelectRecord extends ProcessBase {
  keyentity: EntityObject | null = null;
  getKeyentityInfo() {
    return { entity: true, type: FieldType.String };
  }
  setKeyentity(keyentity: EntityObject): void {
    this.keyentity = keyentity;
  }

  showlistsize: FieldObject | null = null;
  getShowlistsizeInfo() {
    return { multi: false, type: FieldType.String };
  }
  setShowlistsize(showlistsize: FieldObject): void {
    this.showlistsize = showlistsize;
  }

  listobject: ListObject | null = null;
  getListobjectInfo() {
    return { list: true, type: FieldType.String };
  }
  setListobject(listobject: ListObject): void {
    this.listobject = listobject;
  }

  override async execute(): Promise<boolean | void> {
    return this.executeSub(0);
  }

  async executeSub(rowcounttype: number): Promise<boolean | void> {
    this.chkNull('keyentity', 'EntityObject');
    this.chkNull('listobject', 'ListObject');

    const db = apiCache.getDb();
    const sqlResult = createSelectRecordSql(db, this.keyentity!, this.listobject!, this.addError.bind(this));
    if (sqlResult === false) {
      return false;
    }

    let effectiveRowCountType = rowcounttype;
    try {
      const store = apiCache.getAsyncStore();
      const req = store?.req;
      if (effectiveRowCountType === 0 && (req?.query?.st_prn || req?.query?.st_pdf || req?.query?.st_csv)) {
        effectiveRowCountType = -1;
      }
    } catch {
      // Tests and non-request executions do not always run inside asyncLocalStorage.
    }

    let sql = sqlResult.sql;
    if (effectiveRowCountType > 0) {
      sql = appendSqlLimit(db, sql, effectiveRowCountType);
    }

    let rows: Record<string, unknown>[] = [];
    try {
      rows = await db.select(sql, sqlResult.params);
    } catch (e: any) {
      this.addError(this.keyentity, 'SE_ERRQUERY::Error while query: {%0}.', 'alert', [e.message]);
      return false;
    }

    if (!rows || rows.length === 0) {
      return true;
    }

    let isfirst = true;
    const namearr: Record<string, string> = {};
    const optarr: Record<string, string> = {};

    for (const row of rows) {
      const entity = this.listobject!.cloneEntity();
      for (const [key, val] of Object.entries(sqlResult.fieldArr)) {
        entity.setItemValue(Number(key), getRowValue(row, val));
      }

      if (isfirst) {
        for (const item of entity.getItems()) {
          const id = item.getFieldId();
          if (id.startsWith('#')) {
            const pos = id.indexOf('#', 3);
            if (pos > 0) {
              const name = id.substring(1, pos);
              if (name === 'NAME') {
                namearr[id] = id.substring(pos + 1);
              } else if (name === 'OPTNAME') {
                optarr[id] = id.substring(pos + 1);
              }
            }
          }
        }
        isfirst = false;
      }

      for (const [itemk, itemid] of Object.entries(namearr)) {
        // TODO: StBase::getTableItemName(tblnameid, itemid, row)
        entity.setItemValue(itemk, itemid);
      }
      for (const [itemk, itemid] of Object.entries(optarr)) {
        const value2 = String(entity.getItemValue(itemid) || '');
        if (value2 !== '') {
          // TODO: StBase::getItemOptname(itemid, value2)
          entity.setItemValue(itemk, value2);
        }
      }

      this.listobject!.addRecord(entity);
      if (effectiveRowCountType > 0) {
        break;
      }
    }

    return true;
  }
}
