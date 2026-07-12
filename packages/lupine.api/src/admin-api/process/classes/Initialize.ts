/**
 * Converted from PHP classes/Initialize.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, FieldType } from '../field-objects';

export class Initialize extends ProcessBase {
  fields: FieldObject | VectorObject | null = null;
  getFieldsInfo() {
    return { multi: true, type: FieldType.String };
  }
  setFields(fields: FieldObject | VectorObject): void {
    this.fields = fields;
  }

  override execute(): boolean | void {
    this.chkNull('fields');

    if (this.fields instanceof VectorObject) {
      for (let i = 0; i < this.fields.itemSize(); i++) {
        this.fields.setItemValue(i, '');
      }
    } else {
      this.fields!.setValue('');
    }

    return true;
  }
}
