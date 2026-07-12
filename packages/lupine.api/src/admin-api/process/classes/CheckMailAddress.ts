/**
 * Converted from PHP classes/CheckMailAddress.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, FieldType } from '../field-objects';

export class CheckMailAddress extends ProcessBase {
  fields: FieldObject | VectorObject | null = null;
  getFieldsInfo() {
    return { multi: true, type: FieldType.String };
  }
  setFields(fields: FieldObject | VectorObject): void {
    this.fields = fields;
  }

  private chk(value: unknown): true | string {
    const mail = String(value ?? '').trim();
    if (mail === '') {
      return true;
    }

    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
    return valid ? true : 'S_MUSTMAIL::{%N} must be valid mail address.';
  }

  private check(field: FieldObject | null): boolean {
    if (!field || field.isBlank()) {
      return true;
    }

    const ret = this.chk(field.getValue());
    if (ret !== true) {
      this.addError(field, ret);
      return false;
    }

    field.setValue(String(field.getValue() ?? '').trim());
    return true;
  }

  override execute(): boolean | void {
    this.chkNull('fields');

    let ok = true;
    if (this.fields instanceof VectorObject) {
      const cnt = this.fields.itemSize();
      for (let i = 0; i < cnt; i++) {
        const item = this.fields.getItem(i);
        if (!this.check(item)) {
          ok = false;
        }
      }
    } else if (!this.check(this.fields)) {
      ok = false;
    }

    return ok;
  }
}
