/**
 * Converted from PHP classes/GetTableItemName.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, FieldType } from '../field-objects';
import { apiCache } from 'lupine.api';

export class GetTableItemName extends ProcessBase {
  langkey1: FieldObject | null = null;
  getLangkey1Info() { return { multi: false, type: FieldType.String }; }
  setLangkey1(langkey1: FieldObject): void {
    this.langkey1 = langkey1;
  }

  langkey2: FieldObject | null = null;
  getLangkey2Info() { return { multi: false, type: FieldType.String }; }
  setLangkey2(langkey2: FieldObject): void {
    this.langkey2 = langkey2;
  }

  langkey3: FieldObject | null = null;
  getLangkey3Info() { return { multi: false, type: FieldType.String }; }
  setLangkey3(langkey3: FieldObject): void {
    this.langkey3 = langkey3;
  }

  tableid: FieldObject | null = null;
  getTableidInfo() { return { multi: false, type: FieldType.String }; }
  setTableid(tableid: FieldObject): void {
    this.tableid = tableid;
  }

  itemname: FieldObject | null = null;
  getItemnameInfo() { return { multi: false, type: FieldType.String }; }
  setItemname(itemname: FieldObject): void {
    this.itemname = itemname;
  }

  langpropertyid: FieldObject | null = null;
  getLangpropertyidInfo() { return { multi: false, type: FieldType.String }; }
  setLangpropertyid(langpropertyid: FieldObject): void {
    this.langpropertyid = langpropertyid;
  }

  override async execute(): Promise<boolean | void> {
    this.chkNull('tableid');
    this.chkNull('itemname');

    let tableidStr = String(this.tableid?.getValue() || '').toUpperCase();
    if(tableidStr === '') {
      this.tableid?.addError('SE_NOTABLEID::Not set table id in list.');
      return false;
    }
    let tableid = tableidStr; // TODO getRealTableId(tableidStr)
    if(tableid === '') {
      this.addError(this.tableid!, 'SE_NOACCESSTBL::Not access table: {%0}.', 'alert', [tableidStr]);
      return false;
    }
    if(tableid.toLowerCase().endsWith('master')) {
      tableid = tableid.substring(0, tableid.length - 6);
    }
    if(!tableid.toLowerCase().endsWith('name')) {
      tableid += 'name';
    }

    const db = apiCache.getDb();
    let sql = '';
    if(this.langkey1 != null && this.langkey1.getFieldId() !== '') {
      sql += ' AND ' + String(this.langkey1.getFieldId()).toLowerCase() + ' = ' + (db as any).escape(String(this.langkey1.getValue() || ''));
    }
    if(this.langkey2 != null && this.langkey2.getFieldId() !== '') {
      sql += ' AND ' + String(this.langkey2.getFieldId()).toLowerCase() + ' = ' + (db as any).escape(String(this.langkey2.getValue() || ''));
    }
    if(this.langkey3 != null && this.langkey3.getFieldId() !== '') {
      sql += ' AND ' + String(this.langkey3.getFieldId()).toLowerCase() + ' = ' + (db as any).escape(String(this.langkey3.getValue() || ''));
    }

    if(sql !== '') {
      let propertyid = '1'; // OFFICIALNAME
      if(this.langpropertyid != null && !this.langpropertyid.isEmpty()) {
        propertyid = String(this.langpropertyid.getValue() || '').trim();
      }

      const store = apiCache.getAsyncStore();
      const _AP_LANG = store?.locals?.lang || 'EN';
      const defl = 'EN'; // TODO getIni('defLang', 'EN')

      let query = 'SELECT value, langid FROM ' + tableid + ' WHERE propertyid = ' + (db as any).escape(propertyid) + sql;
      if(_AP_LANG === defl) {
        query += ' AND langid =' + (db as any).escape(_AP_LANG);
      }
      else {
        query += ' AND ( langid =' + (db as any).escape(_AP_LANG) + ' OR langid =' + (db as any).escape(defl) + ' )';
      }
      
      const row = await db.select(query);
      if(row && row.length > 0) {
        if(row.length === 1 || row[0].langid === _AP_LANG) {
          this.itemname?.setValue(row[0].value);
          return;
        }
        else {
          this.itemname?.setValue(row[1].value);
        }
      }
    }
  }
}
