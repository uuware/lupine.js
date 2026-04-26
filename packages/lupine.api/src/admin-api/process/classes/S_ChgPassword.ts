/**
 * Converted from PHP classes/S_ChgPassword.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, FieldType } from '../field-objects';

export class S_ChgPassword extends ProcessBase {
  oldpass: FieldObject | null = null;
  getOldpassInfo() { return { multi: false, type: FieldType.String }; }
  setOldpass(oldpass: FieldObject): void {
    this.oldpass = oldpass;
  }

  newpass: FieldObject | null = null;
  getNewpassInfo() { return { multi: false, type: FieldType.String }; }
  setNewpass(newpass: FieldObject): void {
    this.newpass = newpass;
  }

  newpass2: FieldObject | null = null;
  getNewpass2Info() { return { multi: false, type: FieldType.String }; }
  setNewpass2(newpass2: FieldObject): void {
    this.newpass2 = newpass2;
  }

  override execute(): boolean | void {
    this.chkNull('oldpass', 'FieldObject');
    this.chkNull('newpass', 'FieldObject');
    this.chkNull('newpass2', 'FieldObject');

    const isDemoMode = false; // TODO getConfig('siteDemoMode') == '1'
    const hasFullAccess = true; // TODO canFull()
    if(isDemoMode && !hasFullAccess) {
      this.addError(this.oldpass!, 'SE_DEMOMODE::Cannot do this in demo mode.');
      return;
    }

    const isLoggedIn = true; // TODO: new CheckMustLogin().execute()
    if(!isLoggedIn) {
      throw new Error('Need login.');
    }

    // let toolUser = /* TODO StBase */getToolUser();
    // let user = /* TODO StBase */getUser();
    // let out = toolUser.chgPass(user.id, this.newpass?.getValue(), this.newpass2?.getValue(), this.oldpass?.getValue());
    const out: boolean | string = true; // Mock true for now

    if(out !== true) {
      this.addError(this.oldpass!, 'S_CHGPASSERR::Change password error:[{%0}].', 'alert', [String(out)]);
    }
    else {
      this.addError(this.oldpass!, 'S_CHGPASSOK::Change password ok.', 'message');
    }
  }
}
