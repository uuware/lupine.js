/**
 * Converted from PHP classes/CallProcess.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, EntityObject, ListObject, FieldType } from '../field-objects';

export class CallProcess extends ProcessBase {
  processid: FieldObject | null = null;
  getProcessidInfo() { return { multi: false, type: FieldType.String }; }
  setProcessid(processid: FieldObject): void {
    this.processid = processid;
  }

  processmode: FieldObject | null = null;
  getProcessmodeInfo() { return { multi: false, type: FieldType.String }; }
  setProcessmode(processmode: FieldObject): void {
    this.processmode = processmode;
  }

  override execute(): boolean | void {

		if(!this.chkNull('processid')) {
			return false;
		}
		if(!this.chkNull('processmode')) {
			return false;
		}

		//params
		let params = [];
		processid = this.processid?.getValue();
		processMode = this.processmode?.getValue();
		/* TODO StBase */callProcess(params, processid, processMode, '', '');

		return params['error'];
	
  }
}
