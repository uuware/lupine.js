/**
 * Converted from PHP classes/CSVExport.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, ListObject, FieldType } from '../field-objects';
import { getTimestamp } from '../date-utils';
import { raiseError } from '../process-utils';
import { apiCache } from 'lupine.api';

export class CSVExport extends ProcessBase {
  filename: FieldObject | null = null;
  getFilenameInfo() { return { multi: false, type: FieldType.String }; }
  setFilename(filename: FieldObject): void {
    this.filename = filename;
  }

  langpropertyid: FieldObject | null = null;
  getLangpropertyidInfo() { return { multi: false, type: FieldType.String }; }
  setLangpropertyid(langpropertyid: FieldObject): void {
    this.langpropertyid = langpropertyid;
  }

  listobject: ListObject | null = null;
  getListobjectInfo() { return { list: true, type: FieldType.String }; }
  setListobject(listobject: ListObject): void {
    this.listobject = listobject;
  }

  override execute(): boolean | void {
    this.chkNull('listobject', 'ListObject');

    const store = apiCache.getAsyncStore();
    const formData = (store?.locals?.formData || {}) as any;
    
    if(!formData['st_csv'] || formData['st_csv'] !== '1') {
      return;
    }

    let filename = '';
    if(this.filename != null) {
      filename = String(this.filename.getValue() || '');
    }
    if(filename === '') {
      if(formData['FILENAME']) {
        filename = String(formData['FILENAME']);
      }
      else {
        filename = 'export.csv';
      }
    }
    if(!filename.toLowerCase().endsWith('.csv')) {
      filename += '.csv';
    }

    let propertyid = '1'; // OFFICIALNAME
    if(this.langpropertyid != null && !this.langpropertyid.isEmpty()) {
      propertyid = String(this.langpropertyid.getValue() || '').trim();
    }

    // get all fields
    const entityItems = this.listobject!.getItems();
    let fieldsArr: string[] = [];
    for(const item of entityItems) {
      if(item.getFieldId() !== '') {
        fieldsArr.push(item.getFieldId());
      }
    }
    const cnt = fieldsArr.length;
    if(cnt < 1) {
      raiseError('SE_NoFIELDInCSV', 'Not found any field for csv export.');
    }

    const res = store?.locals?.res;
    if (res && typeof res.setHeader === 'function') {
      res.setHeader('Content-Type', 'text/csv; charset=UTF-16LE');
      res.setHeader('Content-Disposition', 'attachment; filename="' + filename + '"');
      res.write(Buffer.from('\uFEFF', 'utf16le'));
    }

    let firstCol = true;
    let line = '';
    for(let key of fieldsArr) {
      let key2 = '';
      const pos = key.indexOf('#');
      if(pos !== -1) {
        key2 = key.substring(pos);
        key = key.substring(0, pos);
      }
      
      const getItemName = (k: string, k2: string, p: string) => k; // TODO StBase.getItemName
      let value = getItemName(key, key, propertyid) + key2;
      
      if(/["\r\n,]/.test(value)) {
        value = '"' + value.replace(/"/g, '""') + '"';
      }
      if(firstCol) {
        firstCol = false;
      }
      else {
        line += ',';
      }
      line += value;
    }

    if (res && typeof res.write === 'function') {
      res.write(Buffer.from(line + '\r\n', 'utf16le'));
    }

    // print data
    const size = this.listobject!.recordSize();
    for (let i = 0; i < size; i++) {
      const entity = this.listobject!.getRecord(i);
      line = '';
      firstCol = true;
      for(const item of entity!.getItems()) {
        let value = String(item.getValue() || '');
        if(/["\r\n,]/.test(value)) {
          value = '"' + value.replace(/"/g, '""') + '"';
        }
        if(firstCol) {
          firstCol = false;
        }
        else {
          line += ',';
        }
        line += value;
      }
      
      if (res && typeof res.write === 'function') {
        res.write(Buffer.from(line + '\r\n', 'utf16le'));
      }
    }

    if (res && typeof res.end === 'function') {
      res.end();
    }
    throw new Error('CSVExport stop'); // equivalent to die()
  }
}
