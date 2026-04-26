/**
 * Converted from PHP classes/SetMonthLastDate.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, FieldType } from '../field-objects';

export class SetMonthLastDate extends ProcessBase {
  yyyymm: FieldObject | null = null;
  getYyyymmInfo() { return { multi: false, type: FieldType.String }; }
  setYyyymm(yyyymm: FieldObject): void {
    this.yyyymm = yyyymm;
  }

  fields: FieldObject | VectorObject | null = null;
  getFieldsInfo() { return { multi: true, type: FieldType.String }; }
  setFields(fields: FieldObject | VectorObject): void {
    this.fields = fields;
  }

  _setFieldValue(prop: string, val: string) {
    const field = (this as any)[prop];
    if(field instanceof VectorObject) {
      for(let i = 0; i < field.itemSize(); i++) {
        field.getItem(i)?.setValue(val);
      }
    } else if(field instanceof FieldObject) {
      field.setValue(val);
    }
  }

  override execute(): boolean | void {
    this.chkNull('yyyymm');
    this.chkNull('fields');
    let ym = String(this.yyyymm?.getValue() || '').trim();
    
    if(ym !== '') {
      if(!/^\d+$/.test(ym) || (ym.length !== 6 && ym.length !== 8)) {
        this.addError(this.yyyymm!, 'S_NOTYYYYMM::{%N} must be YYYYMM or YYYYMMDD.');
        return false;
      }
      let mm = parseInt(ym.substring(4, 6), 10);
      if(mm < 1 || mm > 12) {
        this.addError(this.yyyymm!, 'S_NOTTIMEMM::{%N} Month must be 1-12.');
        return false;
      }
      
      let year = parseInt(ym.substring(0, 4), 10);
      let dateObj = new Date(year, mm, 0); // Day 0 of next month is the last day of this month
      
      let lastYear = dateObj.getFullYear();
      let lastMonth = String(dateObj.getMonth() + 1).padStart(2, '0');
      let lastDay = String(dateObj.getDate()).padStart(2, '0');
      
      this._setFieldValue('fields', `${lastYear}${lastMonth}${lastDay}`);
    }
    else {
      this._setFieldValue('fields', '');
    }
  }
}
