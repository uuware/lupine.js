/**
 * Converted from PHP classes/StringSubstr.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, FieldType } from '../field-objects';

export class StringSubstr extends ProcessBase {
  fields: FieldObject | VectorObject | null = null;
  getFieldsInfo() { return { multi: true, type: FieldType.String }; }
  setFields(fields: FieldObject | VectorObject): void {
    this.fields = fields;
  }

  start: FieldObject | null = null;
  getStartInfo() { return { multi: false, type: FieldType.String }; }
  setStart(start: FieldObject): void {
    this.start = start;
  }

  length: FieldObject | null = null;
  getLengthInfo() { return { multi: false, type: FieldType.String }; }
  setLength(length: FieldObject): void {
    this.length = length;
  }

  override execute(): boolean | void {
    this.chkNull('fields');
    let start = 0;
    if(this.start != null) {
      start = Number(this.start.getValue() || 0);
    }
    let len: number | null = null;
    if(this.length != null) {
      len = Number(this.length.getValue() || 0);
    }
    
    const mb_substr = (str: string, s: number, l: number | null) => {
      if (!str) return '';
      if (l === null) return str.substring(s);
      return str.substring(s, s + l);
    };

    if(this.fields instanceof VectorObject) {
      const cnt = this.fields.itemSize();
      for (let i = 0; i < cnt; i++) {
        const item = this.fields.getItem(i);
        item?.setValue(mb_substr(String(item?.getValue() || ''), start, len));
      }
    }
    else {
      (this.fields as FieldObject)?.setValue(mb_substr(String((this.fields as FieldObject)?.getValue() || ''), start, len));
    }
  }
}
