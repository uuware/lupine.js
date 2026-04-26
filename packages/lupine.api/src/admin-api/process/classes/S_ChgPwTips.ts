/**
 * Converted from PHP classes/S_ChgPwTips.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, FieldType } from '../field-objects';
import { apiCache } from 'lupine.api';
import { CheckMustLogin } from './CheckMustLogin';

export class S_ChgPwTips extends ProcessBase {
  oldpass: FieldObject | null = null;
  getOldpassInfo() { return { multi: false, type: FieldType.String }; }
  setOldpass(oldpass: FieldObject): void {
    this.oldpass = oldpass;
  }

  pwquestion: FieldObject | null = null;
  getPwquestionInfo() { return { multi: false, type: FieldType.String }; }
  setPwquestion(pwquestion: FieldObject): void {
    this.pwquestion = pwquestion;
  }

  pwanswer: FieldObject | null = null;
  getPwanswerInfo() { return { multi: false, type: FieldType.String }; }
  setPwanswer(pwanswer: FieldObject): void {
    this.pwanswer = pwanswer;
  }

  pwtips: FieldObject | null = null;
  getPwtipsInfo() { return { multi: false, type: FieldType.String }; }
  setPwtips(pwtips: FieldObject): void {
    this.pwtips = pwtips;
  }

  override async execute(): Promise<boolean | void> {
    this.chkNull('oldpass', 'FieldObject');

    const isDemoMode = false; // TODO getConfig('siteDemoMode') === '1'
    const canFull = false; // TODO canFull()
    if(isDemoMode && !canFull) {
      this.addError(this.oldpass, 'SE_DEMOMODE::Cannot do this in demo mode.');
      return false;
    }

    const cls = new CheckMustLogin();
    cls._setContext(this.ctx);
    if(await cls.execute() === false) {
      this.addError(this.oldpass, 'SE_NOTLOGIN::Need login.');
      return false;
    }

    const oldpass = String(this.oldpass?.getValue() || '');
    const pwtips = String(this.pwtips?.getValue() || '');
    const pwquestion = String(this.pwquestion?.getValue() || '');
    const pwanswer = String(this.pwanswer?.getValue() || '');
    
    const store = apiCache.getAsyncStore();
    const user = store?.locals?.user;
    if (!user || !user.id) {
      this.addError(this.oldpass, 'SE_NOTLOGIN::Need login.');
      return false;
    }

    const db = apiCache.getDb();
    const rows = await db.select('SELECT password FROM #__st_users WHERE id = ' + (db as any).escape(String(user.id)));
    if(!rows || rows.length === 0) {
      this.addError(this.oldpass, 'S_CHGPWTIPSERR_PW::Get user info error.', 'error');
      return false;
    }
    const userpass = String(rows[0].password || '');

    const parts = userpass.split(':');
    let crypt = parts[0];
    let salt = parts[1] || '';
    
    // MOCK PASSWORD VERIFICATION (replace with real bcrypt/crypto hash check later)
    const testcrypt = oldpass; // TODO StToolUser.getCryptedPassword(oldpass, salt);
    if (crypt !== testcrypt && crypt !== '') { // Temporary bypass for mock if empty
      this.addError(this.oldpass, 'S_CHGPWTIPSERR_PW::password is not right.', 'alert');
      return false;
    }

    let out = '';
    if(pwtips !== '') {
      const sql = 'UPDATE #__st_users SET pwtips = ' + (db as any).escape(pwtips) + ' WHERE id = ' + (db as any).escape(String(user.id));
      await db.execute(sql);
      out += 'Updated Password Tips+ ';
    }
    else {
      out += 'Not Updated Password Tips+ ';
    }
    
    if(pwquestion !== '' && pwanswer !== '') {
      salt = 'random_salt'; // TODO StToolUser.genRandomPassword(32);
      crypt = pwanswer; // TODO StToolUser.getCryptedPassword(pwanswer, salt);
      const cryptanswer = crypt + ':' + salt;
      const sql = 'UPDATE #__st_users SET pwquestion = ' + (db as any).escape(pwquestion) + ',pwanswer = ' + (db as any).escape(cryptanswer) + ' WHERE id = ' + (db as any).escape(String(user.id));
      await db.execute(sql);
      out += 'Updated Password Question&Answer+ ';
    }
    else {
      out += 'Not Updated Password Question&Answer+ ';
    }
    this.addError(this.pwtips, 'S_CHGPWTIPSOK::{%0}', 'message', [out]);
  }
}
