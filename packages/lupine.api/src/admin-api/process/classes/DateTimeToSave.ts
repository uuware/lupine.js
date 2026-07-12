/**
 * Converted from PHP classes/DateTimeToSave.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, FieldType } from '../field-objects';

export class DateTimeToSave extends ProcessBase {
  input: FieldObject | null = null;
  getInputInfo() {
    return { multi: false, type: FieldType.String };
  }
  setInput(input: FieldObject): void {
    this.input = input;
  }

  fieldsdate: FieldObject | VectorObject | null = null;
  getFieldsdateInfo() {
    return { multi: true, type: FieldType.String };
  }
  setFieldsdate(fieldsdate: FieldObject | VectorObject): void {
    this.fieldsdate = fieldsdate;
  }

  fieldstime: FieldObject | VectorObject | null = null;
  getFieldstimeInfo() {
    return { multi: true, type: FieldType.String };
  }
  setFieldstime(fieldstime: FieldObject | VectorObject): void {
    this.fieldstime = fieldstime;
  }

  fieldstimestamp: FieldObject | null = null;
  getFieldstimestampInfo() {
    return { multi: false, type: FieldType.String };
  }
  setFieldstimestamp(fieldstimestamp: FieldObject): void {
    this.fieldstimestamp = fieldstimestamp;
  }

  private normalizeDate(value: string): string {
    const date = value.replace(/[\/\-. ]/g, '');
    return date.length === 8 ? date : '';
  }

  private normalizeTime(value: string): string {
    const time = value.replace(/:/g, '');
    return time.length === 6 ? time : '';
  }

  override execute(): boolean | void {
    this.chkNull('input');

    const value = String(this.input!.getValue() || '');
    let d = '';
    let t = '';
    let ts = '';

    if (
      (value.length === 19 && value.substring(10, 11) === ' ') ||
      (value.length === 15 && value.substring(8, 9) === ' ')
    ) {
      // 2009/11/05 13:37:14 or 20091105 133714
      if (value.length === 19) {
        d = this.normalizeDate(value.substring(0, 10));
        t = this.normalizeTime(value.substring(11));
      } else {
        d = this.normalizeDate(value.substring(0, 8));
        t = this.normalizeTime(value.substring(9));
      }

      if (d !== '') {
        ts = t !== '' ? d + ' ' + t + '.000' : d;
      }
    } else if (value.length === 10) {
      // yyyy/mm/dd, yyyy-mm-dd, or yyyy.mm.dd
      d = this.normalizeDate(value);
      ts = d;
    } else if (value.length === 8) {
      // yyyymmdd or hh:mm:ss
      if (value.indexOf(':') === -1) {
        d = value;
      } else {
        t = this.normalizeTime(value);
      }
    } else if (value.length === 6) {
      // hhmmss
      t = value;
    }

    if (this.fieldsdate != null) {
      this._setFieldValue('fieldsdate', d);
    }
    if (this.fieldstime != null) {
      this._setFieldValue('fieldstime', t);
    }
    if (this.fieldstimestamp != null) {
      this._setFieldValue('fieldstimestamp', ts);
    }

    return true;
  }
}
