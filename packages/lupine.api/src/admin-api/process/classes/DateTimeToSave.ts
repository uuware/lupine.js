/**
 * Converted from PHP classes/DateTimeToSave.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, FieldType } from '../field-objects';

export class DateTimeToSave extends ProcessBase {
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

  fieldstimestamp: FieldObject | null = null;
  getFieldstimestampInfo() { return { multi: false, type: FieldType.String }; }
  setFieldstimestamp(fieldstimestamp: FieldObject): void {
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
    let value = String(this.input?.getValue() || '');
    
    if((value.length === 19 && value.substring(10, 11) === ' ') || (value.length === 15 && value.substring(8, 9) === ' ')) {
      // 2009/11/05 13:37:14 or 20091105 133714
      let d = '';
      let t = '';
      if(value.length === 19) {
        d = value.substring(0, 10);
        t = value.substring(11);
      }
      else {
        d = value.substring(0, 8);
        t = value.substring(9);
      }

      d = d.replace(/[\/\-\. ]/g, '');
      t = t.replace(/:/g, '');
      if(d.length !== 8) {
        d = '';
      }
      if(t.length !== 6) {
        t = '';
      }
      if(this.fieldsdate != null) {
        this._setFieldValue('fieldsdate', d);
      }
      if(this.fieldstime != null) {
        this._setFieldValue('fieldstime', t);
      }
      if(this.fieldstimestamp != null && d !== '') {
        if(t !== '') {
          this._setFieldValue('fieldstimestamp', d + ' ' + t + '.000');
        }
        else {
          this._setFieldValue('fieldstimestamp', d);
        }
      }
    }
    else if(value.length === 10) {
      let d = value.replace(/[\/\-\. ]/g, '');
      if(d.length !== 8) {
        d = '';
      }
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
    else if(value.length === 8) {
      // yyyymmdd or hh:mm:ss
      let t = value.replace(/:/g, '');
      let d = '';
      if(value.indexOf(':') === -1 && value.length === 8) {
        d = value;
        t = '';
      }
      else if(t.length === 6) {
        // it was hh:mm:ss
      }
      else {
        t = '';
      }

      if(this.fieldsdate != null) {
        this._setFieldValue('fieldsdate', d);
      }
      if(this.fieldstime != null) {
        this._setFieldValue('fieldstime', t);
      }
      if(this.fieldstimestamp != null) {
        this._setFieldValue('fieldstimestamp', '');
      }
    }
    else if(value.length === 6) {
      // hhmmss
      if(this.fieldsdate != null) {
        this._setFieldValue('fieldsdate', '');
      }
      if(this.fieldstime != null) {
        this._setFieldValue('fieldstime', value);
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
