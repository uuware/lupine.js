/**
 * Converted from PHP classes/DateTimeToShow.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, FieldType } from '../field-objects';

export class DateTimeToShow extends ProcessBase {
  input: FieldObject | null = null;
  getInputInfo() { return { multi: false, type: FieldType.String }; }
  setInput(input: FieldObject): void {
    this.input = input;
  }

  fieldsdate: FieldObject | VectorObject | null = null;
  getFieldsdateInfo() { return { multi: true, type: FieldType.String }; }
  setFieldsdate(fieldsdate: FieldObject | VectorObject): void {
    this.fieldsdate = fieldsdate;
  }

  fieldstime: FieldObject | VectorObject | null = null;
  getFieldstimeInfo() { return { multi: true, type: FieldType.String }; }
  setFieldstime(fieldstime: FieldObject | VectorObject): void {
    this.fieldstime = fieldstime;
  }

  fieldstimestamp: FieldObject | VectorObject | null = null;
  getFieldstimestampInfo() { return { multi: true, type: FieldType.String }; }
  setFieldstimestamp(fieldstimestamp: FieldObject | VectorObject): void {
    this.fieldstimestamp = fieldstimestamp;
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
    this.chkNull('input');
    const value = String(this.input?.getValue() || '');
    
    if(value.length === 19 && value.substring(8, 9) === ' ') {
      // 20091105 133714.521
      let d = value.substring(0, 4) + '-' + value.substring(4, 6) + '-' + value.substring(6, 8);
      let t = value.substring(9, 11) + ':' + value.substring(11, 13) + ':' + value.substring(13, 15);
      if(this.fieldsdate != null) {
        this._setFieldValue('fieldsdate', d);
      }
      if(this.fieldstime != null) {
        this._setFieldValue('fieldstime', t);
      }
      if(this.fieldstimestamp != null) {
        this._setFieldValue('fieldstimestamp', d + ' ' + t + value.substring(15));
      }
    }
    else if(value.length === 8) {
      let d = value.substring(0, 4) + '-' + value.substring(4, 6) + '-' + value.substring(6, 8);
      if(this.fieldsdate != null) {
        this._setFieldValue('fieldsdate', d);
      }
      if(this.fieldstime != null) {
        this._setFieldValue('fieldstime', '');
      }
      if(this.fieldstimestamp != null) {
        this._setFieldValue('fieldstimestamp', d);
      }
    }
    else if(value.length === 6) {
      let t = value.substring(0, 2) + ':' + value.substring(2, 4) + ':' + value.substring(4, 6);
      if(this.fieldsdate != null) {
        this._setFieldValue('fieldsdate', '');
      }
      if(this.fieldstime != null) {
        this._setFieldValue('fieldstime', t);
      }
      if(this.fieldstimestamp != null) {
        this._setFieldValue('fieldstimestamp', '');
      }
    }
    else {
      if(this.fieldsdate != null) {
        this._setFieldValue('fieldsdate', '');
      }
      if(this.fieldstime != null) {
        this._setFieldValue('fieldstime', '');
      }
      if(this.fieldstimestamp != null) {
        this._setFieldValue('fieldstimestamp', '');
      }
    }
  }
}
