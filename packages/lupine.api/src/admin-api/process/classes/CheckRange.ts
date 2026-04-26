/**
 * Converted from PHP classes/CheckRange.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, EntityObject, ListObject, FieldType } from '../field-objects';

export class CheckRange extends ProcessBase {
  fields: FieldObject | VectorObject | null = null;
  getFieldsInfo() { return { multi: true, type: FieldType.String }; }
  setFields(fields: FieldObject | VectorObject): void {
    this.fields = fields;
  }

  itemfrom: FieldObject | null = null;
  getItemfromInfo() { return { multi: false, type: FieldType.String }; }
  setItemfrom(itemfrom: FieldObject): void {
    this.itemfrom = itemfrom;
  }

  itemto: FieldObject | null = null;
  getItemtoInfo() { return { multi: false, type: FieldType.String }; }
  setItemto(itemto: FieldObject): void {
    this.itemto = itemto;
  }

  override execute(): boolean | void {

		this.chkNull('fields');
		this.chkNull('itemfrom');
		this.chkNull('itemto');
		if(!this.chkBlank('itemfrom')) {
			return false;
		}
		if(!this.chkBlank('itemto')) {
			return false;
		}
		itemfrom = this.itemfrom?.getValue();
		itemto = this.itemto?.getValue();
		if(itemfrom > itemto) {
			this.addError(this.fields, 'SE_RANGESELF::Range from:{%0} is bigger than to:{%0}.', 'alert', array(itemfrom, itemto));
			return false;
		}

		let ok = true;
		if(this.fields instanceof VectorObject) {
			cnt = this.fields.itemSize();
			for (let i = 0; i < cnt; i++) {
				//importent! if no unset(...) then all used of be the same one!!!
				
				item = this.fields.getItem(i);
				let val = item?.getValue();
				if(val < itemfrom) {
					ok = false;
					this.addError(this.fields, 'SE_RANGEFROM::Value:[{%0}] is small than range from:[{%1}].', 'alert', array(val, itemfrom));
				}
				else if(val > itemto) {
					ok = false;
					this.addError(this.fields, 'SE_RANGETO::Value:[{%0}] is bigger than range to:[{%1}].', 'alert', array(val, itemto));
				}
			}
		}
		else {
			if(!this.fields.isBlank()) {
				val = this.fields?.getValue();
				if(val < itemfrom) {
					ok = false;
					this.addError(this.fields, 'SE_RANGEFROM::Value:[{%0}] is small than range from:[{%1}].', 'alert', array(val, itemfrom));
				}
				else if(val > itemto) {
					ok = false;
					this.addError(this.fields, 'SE_RANGETO::Value:[{%0}] is bigger than range to:[{%1}].', 'alert', array(val, itemto));
				}
			}
		}
		return ok;
	
  }
}
