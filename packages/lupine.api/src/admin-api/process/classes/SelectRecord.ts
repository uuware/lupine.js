/**
 * Converted from PHP classes/SelectRecord.php
 */

import { SelectRecordBase } from './SelectRecordBase';
import { FieldObject, EntityObject, ListObject, FieldType } from '../field-objects';
import { apiCache } from 'lupine.api';

export class SelectRecord extends SelectRecordBase {
  keyentity: EntityObject | null = null;
  getKeyentityInfo() { return { entity: true, type: FieldType.String }; }
  setKeyentity(keyentity: EntityObject): void {
    this.keyentity = keyentity;
  }

  showlistsize: FieldObject | null = null;
  getShowlistsizeInfo() { return { multi: false, type: FieldType.String }; }
  setShowlistsize(showlistsize: FieldObject): void {
    this.showlistsize = showlistsize;
  }

  listobject: ListObject | null = null;
  getListobjectInfo() { return { list: true, type: FieldType.String }; }
  setListobject(listobject: ListObject): void {
    this.listobject = listobject;
  }

  override async execute(): Promise<boolean | void> {
    return this.executeSub(0);
  }

  async executeSub(rowcounttype: number): Promise<boolean | void> {
    this.chkNull('keyentity', 'EntityObject');
    this.chkNull('listobject', 'ListObject');

    const fieldArr: Record<string, string> = {};
    const maintblidRef = { value: '' };
    const sql = this.createSql(maintblidRef, this.keyentity!, this.listobject!.cloneEntity(), fieldArr);
    if(sql === false) {
      return false;
    }
    const maintblid = maintblidRef.value;

    let tblnameid = '';
    if(maintblid.toLowerCase().endsWith('master')) {
      tblnameid = maintblid.substring(0, maintblid.length - 6) + 'name';
    }
    else {
      tblnameid = maintblid + 'name';
    }

    const db = apiCache.getDb();
    
    // We will do a generic run. The db doesn't expose loadObjectListLimit easily here,
    // so we'll use select() for everything.
    
    const store = apiCache.getAsyncStore();
    const req = store?.req;
    
    if(rowcounttype === 0 && (req?.query?.st_prn || req?.query?.st_pdf || req?.query?.st_csv)) {
      rowcounttype = -1;
    }

    // TODO: proper limit and paging implementation. For now we fetch all or one.
    // We can simulate paging later.
    let limitSql = '';
    if(rowcounttype > 0) {
      limitSql = ' LIMIT ' + rowcounttype;
    }

    // A hacky way for now since we can't await executeSub easily unless we change its signature
    // Wait, executeSub must be async. Let me check ProcessBase.execute. It returns Promise<boolean | void>.
    // So executeSub CAN be async. Let's return the Promise.
    return (async () => {
      let lst: any[] = [];
      try {
        lst = await db.select(sql + limitSql);
      } catch(e: any) {
        this.addError(this.keyentity!, 'SE_ERRQUERY::Error while query: {%0}.', 'alert', [e.message]);
        return false;
      }

      if(!lst || lst.length === 0) {
        return;
      }

      let isfirst = true;
      const namearr: Record<string, string> = {};
      const optarr: Record<string, string> = {};

      for (const row of lst) {
        const entity = this.listobject!.cloneEntity();
        for (const [key, val] of Object.entries(fieldArr)) {
          let value = val.toLowerCase();
          if(row[value] === undefined) {
            const pos = value.indexOf('.');
            if(pos !== -1) {
              value = value.substring(pos + 1);
            }
          }
          entity.setItemValue(Number(key), row[value]);
        }

        if(isfirst) {
          for (const item of entity.getItems()) {
            const id = item.getFieldId();
            if(id.startsWith('#')) {
              const pos = id.indexOf('#', 3);
              if(pos > 0) {
                const name = id.substring(1, pos);
                if(name === 'NAME') {
                  namearr[id] = id.substring(pos + 1);
                }
                else if(name === 'OPTNAME') {
                  optarr[id] = id.substring(pos + 1);
                }
              }
            }
          }
          isfirst = false;
        }

        for (const [itemk, itemid] of Object.entries(namearr)) {
          // TODO: StBase::getTableItemName(tblnameid, itemid, row)
          const tblitemname = itemid;
          entity.setItemValue(itemk, tblitemname);
        }
        for (const [itemk, itemid] of Object.entries(optarr)) {
          const value2 = String(entity.getItemValue(itemid) || '');
          if(value2 !== '') {
            // TODO: StBase::getItemOptname(itemid, value2)
            const itemoptname = value2;
            entity.setItemValue(itemk, itemoptname);
          }
        }

        this.listobject!.addRecord(entity);
        if(rowcounttype > 0) {
          break;
        }
      }
    })();
  }
}
