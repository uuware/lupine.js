/**
 * Converted from PHP classes/CheckRange.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, FieldType } from '../field-objects';

export class CheckRange extends ProcessBase {
  fields: FieldObject | VectorObject | null = null;
  getFieldsInfo() {
    return { multi: true, type: FieldType.String };
  }
  setFields(fields: FieldObject | VectorObject): void {
    this.fields = fields;
  }

  itemfrom: FieldObject | null = null;
  getItemfromInfo() {
    return { multi: false, type: FieldType.String };
  }
  setItemfrom(itemfrom: FieldObject): void {
    this.itemfrom = itemfrom;
  }

  itemto: FieldObject | null = null;
  getItemtoInfo() {
    return { multi: false, type: FieldType.String };
  }
  setItemto(itemto: FieldObject): void {
    this.itemto = itemto;
  }

  private compareValues(left: unknown, right: unknown): number {
    const leftNum = Number(left);
    const rightNum = Number(right);
    if (!Number.isNaN(leftNum) && !Number.isNaN(rightNum)) {
      return leftNum - rightNum;
    }

    return String(left ?? '').localeCompare(String(right ?? ''));
  }

  private checkField(field: FieldObject, itemfrom: string, itemto: string): boolean {
    if (field.isBlank()) {
      return true;
    }

    const val = String(field.getValue() ?? '');
    if (this.compareValues(val, itemfrom) < 0) {
      this.addError(field, 'SE_RANGEFROM::Value:[{%0}] is small than range from:[{%1}].', 'alert', [val, itemfrom]);
      return false;
    }
    if (this.compareValues(val, itemto) > 0) {
      this.addError(field, 'SE_RANGETO::Value:[{%0}] is bigger than range to:[{%1}].', 'alert', [val, itemto]);
      return false;
    }

    return true;
  }

  override execute(): boolean | void {
    this.chkNull('fields');
    this.chkNull('itemfrom');
    this.chkNull('itemto');

    if (!this.chkBlank('itemfrom')) {
      return false;
    }
    if (!this.chkBlank('itemto')) {
      return false;
    }

    const itemfrom = String(this.itemfrom?.getValue() ?? '');
    const itemto = String(this.itemto?.getValue() ?? '');
    if (this.compareValues(itemfrom, itemto) > 0) {
      this.addError(this.itemfrom, 'SE_RANGESELF::Range from:{%0} is bigger than to:{%1}.', 'alert', [
        itemfrom,
        itemto,
      ]);
      return false;
    }

    let ok = true;
    if (this.fields instanceof VectorObject) {
      const cnt = this.fields.itemSize();
      for (let i = 0; i < cnt; i++) {
        const item = this.fields.getItem(i);
        if (item && !this.checkField(item, itemfrom, itemto)) {
          ok = false;
        }
      }
    } else if (this.fields instanceof FieldObject && !this.checkField(this.fields, itemfrom, itemto)) {
      ok = false;
    }

    return ok;
  }
}
