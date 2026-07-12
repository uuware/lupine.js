/**
 * Converted from PHP classes/CheckId.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, FieldType } from '../field-objects';

export class CheckId extends ProcessBase {
  fields: FieldObject | VectorObject | null = null;

  getFieldsInfo() {
    return { multi: true, type: FieldType.String };
  }

  setFields(fields: FieldObject | VectorObject): void {
    this.fields = fields;
  }

  private checkId(field: FieldObject | null): boolean {
    if (!field) {
      return false;
    }

    const val = String(field.getValue() ?? '')
      .trim()
      .toUpperCase();
    if (val !== '' && !/^[A-Z][A-Z0-9]*$/.test(val)) {
      this.addError(field, 'S_NOTVALIVCHAR::{%N} has not valid chars.');
      return false;
    }

    return true;
  }

  override execute(): boolean | void {
    this.chkNull('fields');
    if (!this.chkBlank('fields')) {
      return false;
    }

    let ret = true;
    if (this.fields instanceof VectorObject) {
      const cnt = this.fields.itemSize();
      for (let i = 0; i < cnt; i++) {
        const item = this.fields.getItem(i);
        if (!this.checkId(item)) {
          ret = false;
        }
      }
    } else {
      if (!this.checkId(this.fields)) {
        ret = false;
      }
    }

    return ret;
  }
}
