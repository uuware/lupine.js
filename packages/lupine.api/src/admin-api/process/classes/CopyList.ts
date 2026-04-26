/**
 * Converted from PHP classes/CopyList.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, EntityObject, ListObject, FieldType } from '../field-objects';

export class CopyList extends ProcessBase {
  listfrom: ListObject | null = null;
  getListfromInfo() { return { list: true, type: FieldType.String }; }
  setListfrom(listfrom: ListObject): void {
    this.listfrom = listfrom;
  }

  listto: ListObject | null = null;
  getListtoInfo() { return { list: true, type: FieldType.String }; }
  setListto(listto: ListObject): void {
    this.listto = listto;
  }

  override execute(): boolean | void {
    this.chkNull('listfrom', 'ListObject');
    this.chkNull('listto', 'ListObject');

    const arrFrom = this.listfrom!.getRecords();
    for(const entity of arrFrom) {
      this.listto!.addRecord(entity.cloneEntity());
    }
  }
}
