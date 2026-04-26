/**
 * Converted from PHP classes/GetItemInfo.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, FieldType } from '../field-objects';
import { apiCache } from 'lupine.api';

export class GetItemInfo extends ProcessBase {
  idfromphysicalid: FieldObject | null = null;
  getIdfromphysicalidInfo() { return { multi: false, type: FieldType.String }; }
  setIdfromphysicalid(idfromphysicalid: FieldObject): void {
    this.idfromphysicalid = idfromphysicalid;
  }

  idfromvalue: FieldObject | null = null;
  getIdfromvalueInfo() { return { multi: false, type: FieldType.String }; }
  setIdfromvalue(idfromvalue: FieldObject): void {
    this.idfromvalue = idfromvalue;
  }

  datatype: FieldObject | null = null;
  getDatatypeInfo() { return { multi: false, type: FieldType.String }; }
  setDatatype(datatype: FieldObject): void {
    this.datatype = datatype;
  }

  digit: FieldObject | null = null;
  getDigitInfo() { return { multi: false, type: FieldType.String }; }
  setDigit(digit: FieldObject): void {
    this.digit = digit;
  }

  decimalplace: FieldObject | null = null;
  getDecimalplaceInfo() { return { multi: false, type: FieldType.String }; }
  setDecimalplace(decimalplace: FieldObject): void {
    this.decimalplace = decimalplace;
  }

  override async execute(): Promise<boolean | void> {
    if(this.idfromvalue == null && this.idfromphysicalid == null) {
      throw new Error("Error, need associate object for:idfromvalue or idfromphysicalid in GetItemInfo");
    }

    let itemid = '';
    if(this.idfromvalue != null) {
      itemid = String(this.idfromvalue.getValue() || '').toUpperCase();
    }
    if(itemid === '' && this.idfromphysicalid != null) {
      itemid = String(this.idfromphysicalid.getPhysicalId() || '').toUpperCase();
    }
    
    if(itemid === '') {
      if(this.idfromvalue != null) {
        this.idfromvalue.addError('SE_NOPHYSICALID::not set value for physicalid.');
      }
      else if(this.idfromphysicalid != null) {
        this.idfromphysicalid.addError('SE_NOPHYSICALID::not set value for physicalid.');
      }
      return false;
    }

    const db = apiCache.getDb();
    const sql = 'SELECT * FROM #__st_itemmaster WHERE itemid = ' + db.escape(itemid);
    const rows = await db.select(sql);
    
    if(rows && rows.length > 0) {
      const row = rows[0];
      if(this.datatype != null) {
        this.datatype.setValue(row.datatype);
      }
      if(this.digit != null) {
        this.digit.setValue(row.digit);
      }
      if(this.decimalplace != null) {
        this.decimalplace.setValue(row.decimalplace);
      }
    }
  }
}
