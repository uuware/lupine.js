/**
 * Converted from PHP classes/NumberPlus.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, EntityObject, ListObject, FieldType } from '../field-objects';

export class NumberPlus extends ProcessBase {
  fields: FieldObject | VectorObject | null = null;
  getFieldsInfo() {
    return { multi: true, type: FieldType.String };
  }
  setFields(fields: FieldObject | VectorObject): void {
    this.fields = fields;
  }

  outfield: FieldObject | VectorObject | null = null;
  getOutfieldInfo() {
    return { multi: true, type: FieldType.String };
  }
  setOutfield(outfield: FieldObject | VectorObject): void {
    this.outfield = outfield;
  }

  override execute(): boolean | void {
    if (!this.chkNull('fields')) {
      return false;
    }
    if (!this.chkNull('outfield')) {
      return false;
    }

    let out = 0;
    if (this.fields instanceof VectorObject) {
      const cnt = this.fields.itemSize();
      for (let i = 0; i < cnt; i++) {
        const item = this.fields.getItem(i);
        out += Number(item?.getValue() || 0);
      }
    } else {
      out += Number(this.fields?.getValue() || 0);
    }

    this._setFieldValue('outfield', out);
  }
}
