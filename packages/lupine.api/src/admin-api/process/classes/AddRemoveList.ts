/**
 * Converted from PHP classes/AddRemoveList.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, EntityObject, ListObject, FieldType } from '../field-objects';

export class AddRemoveList extends ProcessBase {
  action: FieldObject | null = null;
  getActionInfo() { return { multi: false, type: FieldType.String }; }
  setAction(action: FieldObject): void {
    this.action = action;
  }

  addrows: FieldObject | null = null;
  getAddrowsInfo() { return { multi: false, type: FieldType.String }; }
  setAddrows(addrows: FieldObject): void {
    this.addrows = addrows;
  }

  referId: FieldObject | null = null;
  getReferIdInfo() { return { multi: false, type: FieldType.String }; }
  setReferId(referId: FieldObject): void {
    this.referId = referId;
  }

  referValue: FieldObject | null = null;
  getReferValueInfo() { return { multi: false, type: FieldType.String }; }
  setReferValue(referValue: FieldObject): void {
    this.referValue = referValue;
  }

  listname: FieldObject | null = null;
  getListnameInfo() { return { multi: false, type: FieldType.String }; }
  setListname(listname: FieldObject): void {
    this.listname = listname;
  }

  override async execute(): Promise<boolean | void> {

		this.chkNull('action', 'FieldObject');
		this.chkNull('listname', 'FieldObject');
		if(!this.chkBlank('action')) {
			return false;
		}
		if(!this.chkBlank('listname')) {
			return false;
		}

		let name2 = this.listname?.getValue() as string;
        const formData = await this.ctx.getFormData();
        const mergedPost = { ...formData, ...this.ctx.input };

		if(mergedPost['ACTLST']) {
			name2 = mergedPost['ACTLST'] as string;
		}
		let name = name2 + '/';
		let len = name.length;
		let grp: Record<string, Record<string, string>> = {};

        for (const key of Object.keys(mergedPost)) {
            const value = mergedPost[key] as string;
			if(key.substring(0, len) === name) {
				let pos = key.indexOf('#');
				if(pos !== -1) {
					let ind = key.substring(pos+1);
                    const k = key.substring(len, pos);
                    if (!grp[k]) grp[k] = {};
					grp[k][ind] = value;
				}
			}
		}

		if(this.action?.getValue() === 'ADD') {
			this.chkNull('addrows', 'FieldObject');

			let addrowsStr = this.addrows?.getValue() || '0';
            let addrows = parseInt(addrowsStr as string, 10);
            
			if(mergedPost['ACTLIN'] && mergedPost[ mergedPost['ACTLIN'] as string ]) {
				addrows = parseInt(mergedPost[ mergedPost['ACTLIN'] as string ] as string, 10);
			}
			if(Object.keys(grp).length <= 0) {
				this.ctx.input[name2 + '#COUNT'] = String(addrows);
			}
			else {
				let maxcnt = 0;
                for (const key of Object.keys(grp)) {
                    const arrlist = grp[key];
					let cnt = Object.keys(arrlist).length;
					maxcnt = cnt + addrows;
					for(let i = cnt; i < cnt + addrows; i++) {
						this.ctx.input[name + key + '#' + i] = '';
					}
				}
				this.ctx.input[name2 + '#COUNT'] = String(maxcnt);
			}
		}
		else if(this.action?.getValue() === 'REMOVE') {
			this.chkNull('referId', 'FieldObject');
			if(!this.chkBlank('referId')) {
				return false;
			}

			const id = this.referId?.getValue() as string;
			let value = '1';
			if(this.referValue != null) {
				if(!this.chkBlank('referValue')) {
					return false;
				}
				value = String(this.referValue?.getValue());
			}

			if(Object.keys(grp).length > 0) {
				if(grp[id] === undefined) {
					this.addError(this.referId, 'SE_ERRREFERID::referId is not right.');
					return false;
				}
				let maxcnt = 0;
				let cnt = Object.keys(grp[id]).length;
				for (let i = 0; i < cnt; i++) {
					if(grp[id][i] !== value) {
                        for (const key of Object.keys(grp)) {
							this.ctx.input[name + key + '#' + maxcnt] = grp[key][i];
						}
						maxcnt++;
					}
				}
				this.ctx.input[name2 + '#COUNT'] = String(maxcnt);
			}
		}
		else {
			this.addError(this.action, 'SE_ERRACTION::action is not right.');
			return false;
		}
	
  }
}
