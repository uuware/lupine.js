/**
 * Converted from PHP classes/SetMessage.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, FieldType } from '../field-objects';

export class SetMessage extends ProcessBase {
  msgid: FieldObject | null = null;
  getMsgidInfo() { return { multi: false, type: FieldType.String }; }
  setMsgid(msgid: FieldObject): void {
    this.msgid = msgid;
  }

  msgtype: FieldObject | null = null;
  getMsgtypeInfo() { return { multi: false, type: FieldType.String }; }
  setMsgtype(msgtype: FieldObject): void {
    this.msgtype = msgtype;
  }

  fields: FieldObject | null = null;
  getFieldsInfo() { return { multi: false, type: FieldType.String }; }
  setFields(fields: FieldObject): void {
    this.fields = fields;
  }

  override execute(): boolean | void {
    this.chkNull('msgid');
    this.chkNull('fields');
    if(!this.chkBlank('msgid')) {
      return false;
    }
    let type = 'alert';
    if(this.msgtype != null && !this.msgtype.isBlank()) {
      type = String(this.msgtype.getValue() || '');
    }
    this.addError(this.fields!, String(this.msgid!.getValue() || ''), type);
  }
}
