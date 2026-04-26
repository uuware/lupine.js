/**
 * Converted from PHP classes/InitializeList.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, EntityObject, ListObject, FieldType } from '../field-objects';

export class InitializeList extends ProcessBase {
  list: ListObject | null = null;
  getListInfo() { return { list: true, type: FieldType.String }; }
  setList(list: ListObject): void {
    this.list = list;
  }

  override execute(): boolean | void {

		if(!this.chkNull('list', 'ListObject')) {
			return false;
		}
		this.list.clearRecords();
	
  }
}
