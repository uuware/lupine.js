/**
 * Converted from PHP classes/AddError.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, EntityObject, ListObject, FieldType } from '../field-objects';

export class AddError extends ProcessBase {
  fields: FieldObject | VectorObject | null = null;
  getFieldsInfo() { return { multi: true, type: FieldType.String }; }
  setFields(fields: FieldObject | VectorObject): void {
    this.fields = fields;
  }

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

  param1: FieldObject | null = null;
  getParam1Info() { return { multi: false, type: FieldType.String }; }
  setParam1(param1: FieldObject): void {
    this.param1 = param1;
  }

  param2: FieldObject | null = null;
  getParam2Info() { return { multi: false, type: FieldType.String }; }
  setParam2(param2: FieldObject): void {
    this.param2 = param2;
  }

  param3: FieldObject | null = null;
  getParam3Info() { return { multi: false, type: FieldType.String }; }
  setParam3(param3: FieldObject): void {
    this.param3 = param3;
  }

  override execute(): boolean | void {
    if(!this.chkNull('fields')) {
      return false;
    }
    if(!this.chkNull('msgid')) {
      return false;
    }
    const msgid = this.msgid?.getValue();
    let type = '';
    if(this.msgtype != null) {
      type = this.msgtype?.getValue() as string;
    }
    if(type != 'notice' && type != 'error' && type != 'message' && type != 'alert') {
      type = 'alert';
    }
    let params: string[] | null = null;
    if(this.param1 != null) {
      params = [];
      params.push(this.param1?.getValue() as string);
      if(this.param2 != null) {
        params.push(this.param2?.getValue() as string);
        if(this.param3 != null) {
          params.push(this.param3?.getValue() as string);
        }
      }
    }

    if(this.fields instanceof VectorObject) {
      const cnt = this.fields.itemSize();
      for (let i = 0; i < cnt; i++) {
        const item = this.fields.getItem(i);
        item?.addError(msgid as string, type, params as any);
      }
    }
    else {
      this.fields!.addError(msgid as string, type, params as any);
    }
  }
}
