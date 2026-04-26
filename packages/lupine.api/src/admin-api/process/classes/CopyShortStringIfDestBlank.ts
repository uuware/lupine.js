/**
 * Converted from PHP classes/CopyShortStringIfDestBlank.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, EntityObject, ListObject, FieldType } from '../field-objects';

export class CopyShortStringIfDestBlank extends ProcessBase {
  itemfrom: FieldObject | null = null;
  getItemfromInfo() { return { multi: false, type: FieldType.String }; }
  setItemfrom(itemfrom: FieldObject): void {
    this.itemfrom = itemfrom;
  }

  itemto: FieldObject | VectorObject | null = null;
  getItemtoInfo() { return { multi: true, type: FieldType.String }; }
  setItemto(itemto: FieldObject | VectorObject): void {
    this.itemto = itemto;
  }

  stripstring(str: string, len: number): string {
    if (!str) return '';
    // Strip HTML tags and shorten
    let stripted = str.replace(/(<([^>]+)>)/gi, "");
    if (stripted.length > len) {
      stripted = stripted.substring(0, len) + '...';
    }
    return stripted;
  }

  override execute(): boolean | void {
    this.chkNull('itemfrom');
    this.chkNull('itemto');

    const len = 300; // TODO getIni('lenShortString', '300', '300')
    let val: string | false = false;
    
    if(this.itemto instanceof VectorObject) {
      const cnt = this.itemto.itemSize();
      for (let i = 0; i < cnt; i++) {
        const item = this.itemto.getItem(i);
        if(item && item.isBlank()) {
          if(val === false) {
            val = this.stripstring(String(this.itemfrom?.getValue() || ''), len);
          }
          item.setValue(val);
        }
      }
    }
    else {
      if(this.itemto && (this.itemto as FieldObject).isBlank()) {
        val = this.stripstring(String(this.itemfrom?.getValue() || ''), len);
        (this.itemto as FieldObject).setValue(val);
      }
    }
  }
}
