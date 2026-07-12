/**
 * Converted from PHP classes/CheckTime.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, FieldType } from '../field-objects';

export class CheckTime extends ProcessBase {
  fields: FieldObject | VectorObject | null = null;
  getFieldsInfo() {
    return { multi: true, type: FieldType.String };
  }
  setFields(fields: FieldObject | VectorObject): void {
    this.fields = fields;
  }

  private normalizeTimeValue(value: unknown): string {
    return String(value ?? '')
      .trim()
      .replace(/:/g, '');
  }

  private isValidTime(value: string): boolean {
    if (!/^\d{4}(\d{2})?$/.test(value)) {
      return false;
    }

    const hour = Number(value.substring(0, 2));
    const minute = Number(value.substring(2, 4));
    const second = value.length === 6 ? Number(value.substring(4, 6)) : 0;

    return hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59 && second >= 0 && second <= 59;
  }

  private check(field: FieldObject | null): boolean {
    if (!field || field.isBlank()) {
      return true;
    }

    const val = this.normalizeTimeValue(field.getValue());
    if (!this.isValidTime(val)) {
      this.addError(field, 'S_MUSTTIME::{%N} must be valid time.');
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
