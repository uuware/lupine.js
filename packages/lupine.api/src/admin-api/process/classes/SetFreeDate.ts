/**
 * Converted from PHP classes/SetFreeDate.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, FieldType } from '../field-objects';

export class SetFreeDate extends ProcessBase {
  format: FieldObject | null = null;
  getFormatInfo() { return { multi: false, type: FieldType.String }; }
  setFormat(format: FieldObject): void {
    this.format = format;
  }

  fields: FieldObject | VectorObject | null = null;
  getFieldsInfo() { return { multi: true, type: FieldType.String }; }
  setFields(fields: FieldObject | VectorObject): void {
    this.fields = fields;
  }

  _setFieldValue(prop: string, val: string) {
    const field = (this as any)[prop];
    if(field instanceof VectorObject) {
      for(let i = 0; i < field.itemSize(); i++) {
        field.getItem(i)?.setValue(val);
      }
    } else if(field instanceof FieldObject) {
      field.setValue(val);
    }
  }

  override execute(): boolean | void {
    this.chkNull('fields');
    let dateStr = '';
    const now = new Date();
    
    // Simplistic PHP date formatter for common cases
    const formatStr = (this.format == null || this.format.isBlank()) ? 'Y-m-d' : String(this.format.getValue() || '');
    
    const yyyy = String(now.getFullYear());
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const mi = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    
    dateStr = formatStr
      .replace('Y', yyyy)
      .replace('m', mm)
      .replace('d', dd)
      .replace('H', hh)
      .replace('i', mi)
      .replace('s', ss);

    this._setFieldValue('fields', dateStr);
  }
}
