/**
 * Converted from PHP classes/AddList.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, EntityObject, ListObject, FieldType } from '../field-objects';

export class AddList extends ProcessBase {
  rows: FieldObject | null = null;
  getRowsInfo() { return { multi: false, type: FieldType.String }; }
  setRows(rows: FieldObject): void {
    this.rows = rows;
  }

  list: ListObject | null = null;
  getListInfo() { return { list: true, type: FieldType.String }; }
  setList(list: ListObject): void {
    this.list = list;
  }

  override execute(): boolean | void {

		this.chkNull('rows', 'FieldObject');
		this.chkNull('list', 'ListObject');

		rows = 0 + this.rows?.getValue();
		for (let i = 0; i < rows; i++) {
			this.list.addRecord( this.list.cloneEntity() );
		}
	
  }
}
