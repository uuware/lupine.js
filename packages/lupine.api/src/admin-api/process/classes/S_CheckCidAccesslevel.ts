/**
 * Converted from PHP classes/S_CheckCidAccesslevel.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, FieldType } from '../field-objects';
import { AutoAccessLevel } from './AutoAccessLevel';

export class S_CheckCidAccesslevel extends ProcessBase {
  cid: FieldObject | null = null;
  getCidInfo() { return { multi: false, type: FieldType.String }; }
  setCid(cid: FieldObject): void {
    this.cid = cid;
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

    const level = new FieldObject();
    const autoAccessLevel = new AutoAccessLevel();
    autoAccessLevel._setContext(this.ctx);
    autoAccessLevel.setAccessLevel(level);
    await autoAccessLevel.execute();
    
    let str = String(this.cid?.getValue() || '');
    if(str.endsWith('.')) {
      str = str.slice(0, -1);
    }
    if(str === '') {
      this.addError(this.cid, 'S_ITEMEMPTY::{%N}[{%V}] is empty.', 'alert');
      return false;
    }
    else if(str.substring(0, strparent.length) !== strparent) {
      this.addError(this.cid, 'S_ITEMNOVALID::{%N}[{%V}] is not valid.', 'alert');
      return false;
    }

    const accessTopCID = '*.'; // TODO getIni('accessTopCID') + '.';
    const canDesign = false; // TODO StBase::canDesign()
    if(accessTopCID !== '*.' && !canDesign && accessTopCID.indexOf(strparent + '.') === -1) {
      this.addError(this.cid, 'S_ITEMNOVALID::{%N}[{%V}] is no accessable.', 'alert');
      return false;
    }

    // let toolCid = new StToolCid();
    // let arr = toolCid.loadCidCache();
    const arr: Record<string, any> = {}; // MOCK

    if(arr[str] === undefined) {
      this.addError(this.cid, 'S_ITEMNOVALID::{%N}[{%V}] is not valid.', 'alert');
      return false;
    }

    const levelVal = String(level.getValue() || '');
    if(levelVal === '') {
      this.addError(this.cid, 'S_EMPTYACCESSLEVEL::AccessLevel is empty.', 'alert');
      return false;
    }
    if(!/^\d+$/.test(levelVal) || !/^\d+$/.test(String(arr[str].accesslevel))) {
      this.addError(this.cid, 'S_NGACCESSLEVEL::AccessLevel NG.', 'alert');
      return false;
    }
    if(arr[str].accesslevel !== '0' && parseInt(levelVal, 10) < parseInt(arr[str].accesslevel, 10)) {
      this.addError(this.cid, 'S_NORIGHTS::You no rights to do this[CID].', 'alert');
      return false;
    }
  }
}
