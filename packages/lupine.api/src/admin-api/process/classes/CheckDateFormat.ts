/**
 * Converted from PHP classes/CheckDateFormat.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, FieldType } from '../field-objects';

export class CheckDateFormat extends ProcessBase {
  fields: FieldObject | VectorObject | null = null;
  getFieldsInfo() {
    return { multi: true, type: FieldType.String };
  }
  setFields(fields: FieldObject | VectorObject): void {
    this.fields = fields;
  }

  private normalizeDateValue(value: unknown): string {
    return String(value ?? '')
      .trim()
      .replace(/[/\-. ]/g, '');
  }

  private check(field: FieldObject | null): boolean {
    if (!field || field.isBlank()) {
      return true;
    }

    const val = this.normalizeDateValue(field.getValue());
    if (!/^\d{8}$/.test(val)) {
      this.addError(field, 'S_MUSTDATEFMT::{%N} must be date format.');
      return false;
    }

    field.setValue(val);
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
