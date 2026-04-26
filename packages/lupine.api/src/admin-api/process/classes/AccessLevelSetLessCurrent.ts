/**
 * Converted from PHP classes/AccessLevelSetLessCurrent.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, EntityObject, ListObject, FieldType } from '../field-objects';

export class AccessLevelSetLessCurrent extends ProcessBase {
  accesslevel: FieldObject | VectorObject | null = null;
  getAccesslevelInfo() { return { multi: true, type: FieldType.String }; }
  setAccesslevel(accesslevel: FieldObject | VectorObject): void {
    this.accesslevel = accesslevel;
  }

  override execute(): boolean | void {

		this.chkNull('accesslevel');

		level = this.accesslevel?.getValue();
		if(level == '' || !ctype_digit(level)) {
			let level = '0';
		}
		if(/* TODO StBase */canDesign()) {
			//show all
			//<= 2
			if(level > 2) {
				level = '2';
			}
		}
		else if(/* TODO StBase */isLogin()) {
			//<= 1
			if(level > 1) {
				level = '1';
			}
		}
		else {
			//<=0
			if(level > 0) {
				level = '0';
			}
		}
		this._setFieldValue('accesslevel', level);
	
  }
}
