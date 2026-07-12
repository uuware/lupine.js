/**
 * Converted from PHP classes/RemoveList.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, ListObject, FieldType } from '../field-objects';

export class RemoveList extends ProcessBase {
  referId: FieldObject | null = null;
  getReferIdInfo() {
    return { multi: false, type: FieldType.String };
  }
  setReferId(referId: FieldObject): void {
    this.referId = referId;
  }

  referValue: FieldObject | null = null;
  getReferValueInfo() {
    return { multi: false, type: FieldType.String };
  }
  setReferValue(referValue: FieldObject): void {
    this.referValue = referValue;
  }

  list: ListObject | null = null;
  getListInfo() {
    return { list: true, type: FieldType.String };
  }
  setList(list: ListObject): void {
    this.list = list;
  }

  override execute(): boolean | void {
    this.chkNull('referId', 'FieldObject');
    this.chkNull('list', 'ListObject');

    if (!this.chkBlank('referId')) {
      return false;
    }

    const id = String(this.referId!.getValue() || '');
    const value = this.referValue != null ? this.referValue.getValue() : 1;

    const cnt = this.list!.recordSize();
    for (let i = cnt - 1; i >= 0; i--) {
      const entity = this.list!.getRecord(i);
      if (entity != null && entity.getItemValue(id) == value) {
        this.list!.removeRecord(i);
      }
    }

    return true;
  }
}
