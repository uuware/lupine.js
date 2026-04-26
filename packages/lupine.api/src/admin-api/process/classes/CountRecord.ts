/**
 * Converted from PHP classes/CountRecord.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, EntityObject, ListObject, FieldType } from '../field-objects';

export class CountRecord extends ProcessBase {
  list: ListObject | null = null;
  getListInfo() { return { list: true, type: FieldType.String }; }
  setList(list: ListObject): void {
    this.list = list;
  }

  outfield: FieldObject | null = null;
  getOutfieldInfo() { return { multi: false, type: FieldType.String }; }
  setOutfield(outfield: FieldObject): void {
    this.outfield = outfield;
  }

  override execute(): boolean | void {

		this.chkNull('list', 'ListObject');
		this.chkNull('outfield');

		cnt = 0 + this.list.recordSize();
		this.outfield?.setValue(cnt);
	
  }
}
