/**
 * Converted from PHP classes/CheckIntGreaterOrEqual0.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, FieldType } from '../field-objects';

export class CheckIntGreaterOrEqual0 extends ProcessBase {
  fields: FieldObject | VectorObject | null = null;
  getFieldsInfo() {
    return { multi: true, type: FieldType.String };
  }
  setFields(fields: FieldObject | VectorObject): void {
    this.fields = fields;
  }

  private check(field: FieldObject | null): boolean {
    if (!field) {
      return false;
    }

    let val = String(field.getValue() ?? '').trim();
    if (val !== '') {
      if (val === '+0' || val === '-0' || val === '-' || val === '+') {
        val = '0';
      }
      if (val.startsWith('+')) {
        val = val.substring(1);
      }
      if (!/^\d+$/.test(val)) {
        this.addError(field, 'S_MUSTNUM::{%N} must be valid numeric value.');
        return false;
      }
      field.setValue(val);
    }

    return true;
  }

  override execute(): boolean | void {
    this.chkNull('fields');

    let ret = true;
    if (this.fields instanceof VectorObject) {
      const cnt = this.fields.itemSize();
      for (let i = 0; i < cnt; i++) {
        const item = this.fields.getItem(i);
        if (!this.check(item)) {
          ret = false;
        }
      }
    } else if (!this.check(this.fields)) {
      ret = false;
    }

    return ret;
  }
}
