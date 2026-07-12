/**
 * Converted from PHP classes/CheckDateExist.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, FieldType } from '../field-objects';

export class CheckDateExist extends ProcessBase {
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

  private isExistingDate(value: string): boolean {
    if (!/^\d{8}$/.test(value)) {
      return false;
    }

    const year = Number(value.substring(0, 4));
    const month = Number(value.substring(4, 6));
    const day = Number(value.substring(6, 8));
    if (month < 1 || month > 12 || day < 1 || day > 31) {
      return false;
    }

    const date = new Date(Date.UTC(year, month - 1, day));
    return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
  }

  private check(field: FieldObject | null): boolean {
    if (!field || field.isBlank()) {
      return true;
    }

    const val = this.normalizeDateValue(field.getValue());
    if (!this.isExistingDate(val)) {
      this.addError(field, 'S_MUSTDATE::{%N} must be valid date.');
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
