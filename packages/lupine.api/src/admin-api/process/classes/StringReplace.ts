/**
 * Converted from PHP classes/StringReplace.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, FieldType } from '../field-objects';

export class StringReplace extends ProcessBase {
  stringfrom: FieldObject | null = null;
  getStringfromInfo() { return { multi: false, type: FieldType.String }; }
  setStringfrom(stringfrom: FieldObject): void {
    this.stringfrom = stringfrom;
  }

  replacefrom: FieldObject | null = null;
  getReplacefromInfo() { return { multi: false, type: FieldType.String }; }
  setReplacefrom(replacefrom: FieldObject): void {
    this.replacefrom = replacefrom;
  }

  replaceto: FieldObject | null = null;
  getReplacetoInfo() { return { multi: false, type: FieldType.String }; }
  setReplaceto(replaceto: FieldObject): void {
    this.replaceto = replaceto;
  }

  outfield: FieldObject | VectorObject | null = null;
  getOutfieldInfo() { return { multi: true, type: FieldType.String }; }
  setOutfield(outfield: FieldObject | VectorObject): void {
    this.outfield = outfield;
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
    this.chkNull('stringfrom');
    this.chkNull('replacefrom');
    this.chkNull('replaceto');
    this.chkNull('outfield');

    const str = String(this.stringfrom?.getValue() || '');
    const repfrom = String(this.replacefrom?.getValue() || '');
    const repto = String(this.replaceto?.getValue() || '');
    
    let result = str;
    if (repfrom !== '') {
      result = str.split(repfrom).join(repto);
    }

    this._setFieldValue('outfield', result);
  }
}
