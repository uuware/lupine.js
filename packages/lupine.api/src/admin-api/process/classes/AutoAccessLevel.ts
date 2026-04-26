/**
 * Converted from PHP classes/AutoAccessLevel.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, EntityObject, ListObject, FieldType } from '../field-objects';

export class AutoAccessLevel extends ProcessBase {
  accesslevel: FieldObject | VectorObject | null = null;
  getAccesslevelInfo() { return { multi: true, type: FieldType.String }; }
  setAccesslevel(accesslevel: FieldObject | VectorObject): void {
    this.accesslevel = accesslevel;
  }

  override execute(): boolean | void {

		this.chkNull('accesslevel');
		let accesslevel = '0';
		if(/* TODO StBase */canDesign()) {
			//show all
			accesslevel = '2';
		}
		else if(/* TODO StBase */isLogin()) {
			//<= 1
			accesslevel = '1';
		}
		else {
			//<=0
			accesslevel = '0';
		}
		this._setFieldValue('accesslevel', accesslevel);
	
  }
}
