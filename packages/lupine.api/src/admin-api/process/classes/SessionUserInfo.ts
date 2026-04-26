/**
 * Converted from PHP classes/SessionUserInfo.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, FieldType } from '../field-objects';
import { apiCache } from 'lupine.api';

export class SessionUserInfo extends ProcessBase {
  userid: FieldObject | VectorObject | null = null;
  getUseridInfo() { return { multi: true, type: FieldType.String }; }
  setUserid(userid: FieldObject | VectorObject): void {
    this.userid = userid;
  }

  username: FieldObject | VectorObject | null = null;
  getUsernameInfo() { return { multi: true, type: FieldType.String }; }
  setUsername(username: FieldObject | VectorObject): void {
    this.username = username;
  }

  email: FieldObject | VectorObject | null = null;
  getEmailInfo() { return { multi: true, type: FieldType.String }; }
  setEmail(email: FieldObject | VectorObject): void {
    this.email = email;
  }

  override async execute(): Promise<boolean | void> {
    const store = apiCache.getAsyncStore();
    const user = store?.locals?.user; // Mock or actual session user

    if(this.userid != null) {
      let id = '0';
      if(user && user.id != null && user.name != null && user.usertype != null) {
        id = String(user.id);
      }

      if(this.userid instanceof VectorObject) {
        const cnt = this.userid.itemSize();
        for (let i = 0; i < cnt; i++) {
          this.userid.setItemValue(i, id);
        }
      }
      else {
        (this.userid as FieldObject).setValue(id);
      }
    }

    if(this.username != null) {
      let name = '';
      if(user && user.id != null && user.name != null && user.usertype != null) {
        name = String(user.name);
      }

      if(this.username instanceof VectorObject) {
        const cnt = this.username.itemSize();
        for (let i = 0; i < cnt; i++) {
          this.username.setItemValue(i, name);
        }
      }
      else {
        (this.username as FieldObject).setValue(name);
      }
    }

    if(this.email != null) {
      let email = '';
      if(user && user.id != null && user.name != null && user.usertype != null) {
        const db = apiCache.getDb();
        const sql = 'SELECT email FROM #__st_users WHERE id = ' + (db as any).escape(user.id);
        const rows = await db.select(sql);
        if (rows && rows.length > 0) {
          email = rows[0].email;
        }
      }

      if(this.email instanceof VectorObject) {
        const cnt = this.email.itemSize();
        for (let i = 0; i < cnt; i++) {
          this.email.setItemValue(i, email);
        }
      }
      else {
        (this.email as FieldObject).setValue(email);
      }
    }
  }
}
