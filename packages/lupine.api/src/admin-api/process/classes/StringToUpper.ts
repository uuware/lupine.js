/**
 * Converted from PHP classes/StringToUpper.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, FieldType } from '../field-objects';

export class StringToUpper extends ProcessBase {
  fields: FieldObject | VectorObject | null = null;
  getFieldsInfo() { return { multi: true, type: FieldType.String }; }
  setFields(fields: FieldObject | VectorObject): void {
    this.fields = fields;
  }

  override execute(): boolean | void {
    this.chkNull('fields');
    if(this.fields instanceof VectorObject) {
      const cnt = this.fields.itemSize();
      for (let i = 0; i < cnt; i++) {
        const item = this.fields.getItem(i);
        item?.setValue(String(item.getValue() || '').toUpperCase());
      }
    }
    else {
      const field = this.fields as FieldObject;
      field?.setValue(String(field.getValue() || '').toUpperCase());
    }
  }
}
