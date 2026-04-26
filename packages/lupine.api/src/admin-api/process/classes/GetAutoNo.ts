/**
 * Converted from PHP classes/GetAutoNo.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, EntityObject, ListObject, FieldType } from '../field-objects';

export class GetAutoNo extends ProcessBase {
  mode: FieldObject | null = null;
  getModeInfo() { return { multi: false, type: FieldType.String }; }
  setMode(mode: FieldObject): void {
    this.mode = mode;
  }

  autonoid: FieldObject | null = null;
  getAutonoidInfo() { return { multi: false, type: FieldType.String }; }
  setAutonoid(autonoid: FieldObject): void {
    this.autonoid = autonoid;
  }

  autonosubkey: FieldObject | null = null;
  getAutonosubkeyInfo() { return { multi: false, type: FieldType.String }; }
  setAutonosubkey(autonosubkey: FieldObject): void {
    this.autonosubkey = autonosubkey;
  }

  fields: FieldObject | VectorObject | null = null;
  getFieldsInfo() { return { multi: true, type: FieldType.String }; }
  setFields(fields: FieldObject | VectorObject): void {
    this.fields = fields;
  }

  override execute(): boolean | void {

		this.chkNull('mode', 'FieldObject');
		this.chkNull('fields');
		this.chkNull('autonoid');
		if(this.mode?.getValue() != 'N') {
			//page mode is not new, do thing.
			return;
		}
		if(!this.chkBlank('autonoid')) {
			return false;
		}

		let autonosubkey = '';
		if(this.autonosubkey != null) {
			autonosubkey = this.autonosubkey?.getValue();
		}
		no = /* TODO StBase */getAutoNo(this.autonoid?.getValue(), autonosubkey);
		this._setFieldValue('fields', no);
	
  }
}
