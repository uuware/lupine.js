/**
 * Converted from PHP classes/StringToShort.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, EntityObject, ListObject, FieldType } from '../field-objects';

export class StringToShort extends ProcessBase {
  fields: FieldObject | VectorObject | null = null;
  getFieldsInfo() { return { multi: true, type: FieldType.String }; }
  setFields(fields: FieldObject | VectorObject): void {
    this.fields = fields;
  }

  override execute(): boolean | void {
    this.chkNull('fields');
    let len = 300; // TODO getIni lenShortString

    if(this.fields instanceof VectorObject) {
      const cnt = this.fields.itemSize();
      for (let i = 0; i < cnt; i++) {
        const item = this.fields.getItem(i);
        let val = String(item?.getValue() || '');
        // replace imgs
        val = val.replace(/<img[^>]+src[^>]+>/ig, '<img src="images/VwImage.gif" />');
        if(val.length > len) {
          item?.setValue( val.substring(0, len) + '...' );
        }
        else {
          item?.setValue(val);
        }
      }
    }
    else {
      let val = String(this.fields?.getValue() || '');
      // replace imgs
      val = val.replace(/<img[^>]+src[^>]+>/ig, '<img src="images/VwImage.gif" />');
      if(val.length > len) {
        this.fields?.setValue( val.substring(0, len) + '...' );
      }
      else {
        this.fields?.setValue(val);
      }
    }
  }
}
