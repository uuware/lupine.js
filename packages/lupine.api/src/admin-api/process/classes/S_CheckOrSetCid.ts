/**
 * Converted from PHP classes/S_CheckOrSetCid.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, FieldType } from '../field-objects';

export class S_CheckOrSetCid extends ProcessBase {
  cid: FieldObject | null = null;
  getCidInfo() { return { multi: false, type: FieldType.String }; }
  setCid(cid: FieldObject): void {
    this.cid = cid;
  }

  async chkAccessLevel(str: string): Promise<boolean> {
    // TODO implement real access level check
    return true; 
  }

  override async execute(): Promise<boolean | void> {
    this.chkNull('cid', 'FieldObject');

    let strparent = '*'; // TODO _escapeParentCid();
    if(strparent === '*') {
      return true;
    }
    if(strparent === '') {
      this.addError(this.cid, 'S_NOPCID::no defined PARENTCID.', 'alert');
      return false;
    }

    let str = String(this.cid?.getValue() || '');
    if(str.endsWith('.')) {
      str = str.slice(0, -1);
    }

    if(str === '') {
      str = strparent;
    }
    else if(str.substring(0, strparent.length) !== strparent) {
      str = strparent;
    }

    let accessTopCID: string = '*.'; // TODO getIni('accessTopCID') + '.';
    const canDesign = false; // TODO StBase::canDesign()
    if(accessTopCID !== '*.' && !canDesign && accessTopCID.indexOf(strparent + '.') === -1) {
      this.addError(this.cid, 'S_ITEMNOVALID::{%N}[{%V}] is no accessable.', 'alert');
      return false;
    }

    if(await this.chkAccessLevel(str)) {
      this.cid?.setValue(str);
      return true;
    }
    return false;
  }
}
