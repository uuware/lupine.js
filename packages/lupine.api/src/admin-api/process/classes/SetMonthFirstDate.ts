/**
 * Converted from PHP classes/SetMonthFirstDate.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, EntityObject, ListObject, FieldType } from '../field-objects';

export class SetMonthFirstDate extends ProcessBase {
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

  override execute(): boolean | void {
    this.chkNull('yyyymm');
    this.chkNull('fields');
    
    const ym = String(this.yyyymm?.getValue() || '');
    if(ym !== '') {
      if(!/^\d+$/.test(ym) || (ym.length !== 6 && ym.length !== 8)) {
        this.addError(this.yyyymm, 'S_NOTYYYYMM::{%N} must be YYYYMM or YYYYMMDD.');
        return false;
      }
      const mm = parseInt(ym.substring(4, 6), 10);
      if(mm < 1 || mm > 12) {
        this.addError(this.yyyymm, 'S_NOTTIMEMM::{%N} Month must be 1-12.');
        return false;
      }
      this._setFieldValue('fields', ym.substring(0, 6) + '01');
    }
    else {
      this._setFieldValue('fields', '');
    }
  }
}
