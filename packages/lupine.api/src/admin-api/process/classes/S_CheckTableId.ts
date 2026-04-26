/**
 * Converted from PHP classes/S_CheckTableId.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, FieldType } from '../field-objects';

export class S_CheckTableId extends ProcessBase {
  tableid: FieldObject | null = null;
  getTableidInfo() { return { multi: false, type: FieldType.String }; }
  setTableid(tableid: FieldObject): void {
    this.tableid = tableid;
  }

  override async execute(): Promise<boolean | void> {
    this.chkNull('tableid', 'FieldObject');

    const isDemoMode = false; // TODO getConfig('siteDemoMode') == '1'
    const hasFullAccess = true; // TODO canFull()
    if(isDemoMode && !hasFullAccess) {
      this.addError(this.tableid!, 'SE_DEMOMODE::Cannot do this in demo mode.');
      return;
    }

    let pre = 'st_'; // TODO db.getPrefix()
    const tableidValue = String(this.tableid?.getValue() || '');
    if(!tableidValue.startsWith(pre)) {
      this.addError(this.tableid!, 'S_TABLEIDERR::Table id must start with:[{%0}].', 'alert', [pre]);
    }
  }
}
