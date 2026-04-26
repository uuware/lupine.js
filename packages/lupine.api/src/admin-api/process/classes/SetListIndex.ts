/**
 * Converted from PHP classes/SetListIndex.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, EntityObject, ListObject, FieldType } from '../field-objects';

export class SetListIndex extends ProcessBase {
  itemname: FieldObject | null = null;
  getItemnameInfo() { return { multi: false, type: FieldType.String }; }
  setItemname(itemname: FieldObject): void {
    this.itemname = itemname;
  }

  list: ListObject | null = null;
  getListInfo() { return { list: true, type: FieldType.String }; }
  setList(list: ListObject): void {
    this.list = list;
  }

  override execute(): boolean | void {
    this.chkNull('list', 'ListObject');
    this.chkNull('itemname');
    if(!this.chkBlank('itemname')) {
      return false;
    }

    const key = this.itemname?.getValue() as string;
    const arrFrom = this.list!.getRecords();
    let index = 0;
    for (const entity of arrFrom) {
      index++;
      
      const item = entity.getItem(key);
      if(!item) {
        this.addError(this.list, 'SE_NOITEM::No item:{%0}.', 'alert', [key]);
        return false;
      }
      item.setValue(String(index));
    }
  }
}
