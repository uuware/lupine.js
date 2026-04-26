/**
 * Converted from PHP classes/CheckMustLogin.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, EntityObject, ListObject, FieldType } from '../field-objects';

export class CheckMustLogin extends ProcessBase {
  username: FieldObject | VectorObject | null = null;
  getUsernameInfo() { return { multi: true, type: FieldType.String }; }
  setUsername(username: FieldObject | VectorObject): void {
    this.username = username;
  }

  userid: FieldObject | VectorObject | null = null;
  getUseridInfo() { return { multi: true, type: FieldType.String }; }
  setUserid(userid: FieldObject | VectorObject): void {
    this.userid = userid;
  }

  override execute(): boolean | void {

		let user = /* TODO StBase */getUser();
		if(!user || user.id === false || user.name == '' || user.usertype == '') {
			this.addError(this.username, 'S_NOTLOGIN::Not login.');
			return false;
		}

		if(this.username != null) {
			if(is_a(this.username, 'EntityObject')) {
				cnt = this.username.itemSize();
				for (let i = 0; i < cnt; i++) {
					item = this.username.getItem(i);
					item?.setValue(user.name);
				}
			}
			else {
				this.username?.setValue(user.name);
			}
		}
		if(this.userid != null) {
			if(is_a(this.userid, 'EntityObject')) {
				cnt = this.userid.itemSize();
				for (let i = 0; i < cnt; i++) {
					item = this.userid.getItem(i);
					item?.setValue(user.id);
				}
			}
			else {
				this.userid?.setValue(user.id);
			}
		}
	
  }
}
