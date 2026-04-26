/**
 * Converted from PHP classes/DownloadData.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, FieldType } from '../field-objects';
import { apiCache } from 'lupine.api';
import { getTimestamp } from '../date-utils';

export class DownloadData extends ProcessBase {
  tableid: FieldObject | null = null;
  getTableidInfo() { return { multi: false, type: FieldType.String }; }
  setTableid(tableid: FieldObject): void {
    this.tableid = tableid;
  }

  filename: FieldObject | null = null;
  getFilenameInfo() { return { multi: false, type: FieldType.String }; }
  setFilename(filename: FieldObject): void {
    this.filename = filename;
  }

  listcheckid: FieldObject | null = null;
  getListcheckidInfo() { return { multi: false, type: FieldType.String }; }
  setListcheckid(listcheckid: FieldObject): void {
    this.listcheckid = listcheckid;
  }

  override async execute(): Promise<boolean | void> {
    const store = apiCache.getAsyncStore();
    if(store?.locals) {
      if(!store.locals.globals) store.locals.globals = {};
      store.locals.globals['s_errortitle'] = 'Download data from checks';
      store.locals.globals['s_errorlink'] = '0';
      store.locals.globals['s_errorclose'] = '1';
    }

    this.chkNull('tableid', 'FieldObject');
    this.chkNull('listcheckid', 'FieldObject');
    if(!this.chkBlank('tableid')) {
      return false;
    }
    if(!this.chkBlank('listcheckid')) {
      return false;
    }

    const tableidStr = String(this.tableid?.getValue() || '').trim().replace(/;/g, ',');
    const tableidArr2 = tableidStr.split(',');
    let tableidArr: string[] = [];
    for (let i = 0; i < tableidArr2.length; i++) {
      const tid = tableidArr2[i];
      if(tid !== '' && !tableidArr.includes(tid)) {
        let tblid = tid; // TODO getRealTableId(tid)
        if(tblid === '') {
          this.addError(this.tableid, 'SE_NOACCESSTBL::Not access table: {%0}.', 'error', [tid]);
          return false;
        }
        tableidArr.push(tblid);
      }
    }

    let filename = '';
    if(this.filename != null) {
      filename = String(this.filename.getValue() || '');
    }
    if(!filename) {
      filename = String(this.tableid?.getValue() || '').replace(/,/g, '-');
    }
    if(!filename.toLowerCase().endsWith('.stcsv')) {
      filename += '.stcsv';
    }

    const name = String(this.listcheckid?.getValue() || '');
    const pos = name.indexOf('/');
    if(pos === -1) {
      this.addError(this.listcheckid, 'Must define list checkid like LISTNAME/CHECKNAME', 'error');
      return false;
    }
    
    const chkname = name.substring(pos + 1);
    const listname = name.substring(0, pos + 1);
    const len = listname.length;
    
    const grp: Record<string, Record<string, any>> = {};
    const grpkey: string[] = [];
    let haschecked = false;
    
    const formData = store?.locals?.formData || {};
    for(const key of Object.keys(formData)) {
      const value = formData[key];
      if(key.substring(0, len) === listname) {
        const hashPos = key.indexOf('#');
        if(hashPos !== -1) {
          const ind = key.substring(hashPos + 1);
          const key2 = key.substring(len, hashPos);
          if(!grp[key2]) grp[key2] = {};
          grp[key2][ind] = value;
          
          if(key2 !== chkname && !grpkey.includes(key2)) {
            grpkey.push(key2);
          }
          if(key2 === chkname && value) {
            haschecked = true;
          }
        }
      }
    }

    if(!haschecked) {
      this.addError(this.listcheckid, 'SE_NOCHECKED::No any item be checked.', 'error');
      return false;
    }
    if(grpkey.length < 1) {
      this.addError(this.listcheckid, 'SE_NOKEY::No any key be defined.', 'error');
      return false;
    }

    const res = store?.locals?.res;
    if (res && typeof res.setHeader === 'function') {
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', 'attachment; filename="' + filename + '"');
    }

    const echo = (str: string) => {
      if (res && typeof res.write === 'function') {
        res.write(str);
      }
    };

    echo('@COMMENT,"Auto Created By lupine at:' + getTimestamp(4, true) + "\"\r\n");
    
    const db = apiCache.getDb();
    const arrchecked = grp[chkname] || {};
    let outfield = true;
    
    for(const key of Object.keys(arrchecked)) {
      const value = arrchecked[key];
      if(value) {
        for(const tableid of tableidArr) {
          let where = '';
          for(const fieldid of grpkey) {
            if(where !== '') {
              where += ' AND ';
            }
            where += fieldid + ' = ' + db.escape(grp[fieldid][key]);
          }
          
          // TODO toolcsv.createCSV(tableid, where, outfield);
          
          echo("\r\n");
        }
        outfield = false;
      }
    }

    if (res && typeof res.end === 'function') {
      res.end();
    }
    throw new Error('DownloadData stop'); // die() equivalent
  }
}
