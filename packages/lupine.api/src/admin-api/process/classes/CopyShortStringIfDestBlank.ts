/**
 * Converted from PHP classes/CopyShortStringIfDestBlank.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, FieldType } from '../field-objects';

export class CopyShortStringIfDestBlank extends ProcessBase {
  itemfrom: FieldObject | null = null;
  getItemfromInfo() {
    return { multi: false, type: FieldType.String };
  }
  setItemfrom(itemfrom: FieldObject): void {
    this.itemfrom = itemfrom;
  }

  itemto: FieldObject | VectorObject | null = null;
  getItemtoInfo() {
    return { multi: true, type: FieldType.String };
  }
  setItemto(itemto: FieldObject | VectorObject): void {
    this.itemto = itemto;
  }

  stripstring(str: string, len: number): string {
    if (!str) return '';

    let stripped = str.replace(/(<([^>]+)>)/gi, '');
    if (stripped.length > len) {
      stripped = stripped.substring(0, len) + '...';
    }
    return stripped;
  }

  override execute(): boolean | void {
    this.chkNull('itemfrom');
    this.chkNull('itemto');

    const len = 300; // TODO getIni('lenShortString', '300', '300')
    let val: string | null = null;

    if (this.itemto instanceof VectorObject) {
      const cnt = this.itemto.itemSize();
      for (let i = 0; i < cnt; i++) {
        const item = this.itemto.getItem(i);
        if (item && item.isBlank()) {
          if (val == null) {
            val = this.stripstring(String(this.itemfrom!.getValue() || ''), len);
          }
          item.setValue(val);
        }
      }
    } else if (this.itemto && this.itemto.isBlank()) {
      val = this.stripstring(String(this.itemfrom!.getValue() || ''), len);
      this.itemto.setValue(val);
    }

    return true;
  }
}
