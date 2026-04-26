/**
 * Converted from PHP classes/CheckListDuplicate.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, EntityObject, ListObject, FieldType } from '../field-objects';

export class CheckListDuplicate extends ProcessBase {
  keys: FieldObject | VectorObject | null = null;
  getKeysInfo() { return { multi: true, type: FieldType.String }; }
  setKeys(keys: FieldObject | VectorObject): void {
    this.keys = keys;
  }

  list: ListObject | null = null;
  getListInfo() { return { list: true, type: FieldType.String }; }
  setList(list: ListObject): void {
    this.list = list;
  }

  override execute(): boolean | void {
    this.chkNull('list', 'ListObject');

    let arrKey: string[] = [];
    if(this.keys instanceof VectorObject) {
      const cnt = this.keys.itemSize();
      for (let i = 0; i < cnt; i++) {
        const item = this.keys.getItem(i);
        if(item?.getValue() === '') {
          this.addError(item, 'SE_NOVALUE::No value.');
          return false;
        }
        if (item) arrKey.push(item.getValue() as string);
      }
    }
    else if (this.keys instanceof FieldObject) {
      arrKey.push(this.keys.getValue() as string);
    }

    if(arrKey.length === 0) {
      this.addError(this.list, 'SE_NOKEY::No key.');
      return false;
    }

    const arrFrom = this.list!.getRecords();
    let arrListKey: string[] = [];
    for (const entity of arrFrom) {
      let keynew = '';
      for (const key of arrKey) {
        keynew += String(entity.getItemValue(key)) + '\t';
      }
      if(arrListKey.includes(keynew)) {
        for (const key of arrKey) {
          const item = entity.getItem(key);
          if(!item) {
            this.addError(this.list, 'SE_NOKEY::No key:{%0}.', 'alert', [key]);
            return false;
          }
          this.addError(item, 'SE_DUPKEY::key is duplicate.');
        }
        return false;
      }
      arrListKey.push(keynew);
    }
  }
}
