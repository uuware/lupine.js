/**
 * Converted from PHP classes/S_CidGetName.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, FieldType } from '../field-objects';

export class S_CidGetName extends ProcessBase {
  name: FieldObject | null = null;
  getNameInfo() { return { multi: false, type: FieldType.String }; }
  setName(name: FieldObject): void {
    this.name = name;
  }

  cid: FieldObject | null = null;
  getCidInfo() { return { multi: false, type: FieldType.String }; }
  setCid(cid: FieldObject): void {
    this.cid = cid;
  }

  override execute(): boolean | void {
    this.chkNull('cid', 'FieldObject');
    this.chkNull('name', 'FieldObject');
    
    const str = String(this.cid?.getValue() || '');
    if(str === '') {
      this.name?.setValue('');
      return;
    }
    
    // TODO: let toolCid = new StToolCid(); let arr = toolCid.loadCidCache();
    const arr: Record<string, any> = {}; 
    
    if(arr[str] !== undefined) {
      this.name?.setValue(arr[str].value);
    }
    else {
      this.name?.setValue('');
    }
  }
}
