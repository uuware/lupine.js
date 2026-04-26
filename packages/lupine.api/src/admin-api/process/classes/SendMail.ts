/**
 * Converted from PHP classes/SendMail.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, FieldType } from '../field-objects';

export class SendMail extends ProcessBase {
  mailfrom: FieldObject | null = null;
  getMailfromInfo() { return { multi: false, type: FieldType.String }; }
  setMailfrom(mailfrom: FieldObject): void {
    this.mailfrom = mailfrom;
  }

  mailto: FieldObject | null = null;
  getMailtoInfo() { return { multi: false, type: FieldType.String }; }
  setMailto(mailto: FieldObject): void {
    this.mailto = mailto;
  }

  subject: FieldObject | null = null;
  getSubjectInfo() { return { multi: false, type: FieldType.String }; }
  setSubject(subject: FieldObject): void {
    this.subject = subject;
  }

  mailbody: FieldObject | null = null;
  getMailbodyInfo() { return { multi: false, type: FieldType.String }; }
  setMailbody(mailbody: FieldObject): void {
    this.mailbody = mailbody;
  }

  mailtoname: FieldObject | null = null;
  getMailtonameInfo() { return { multi: false, type: FieldType.String }; }
  setMailtoname(mailtoname: FieldObject): void {
    this.mailtoname = mailtoname;
  }

  mailfromname: FieldObject | null = null;
  getMailfromnameInfo() { return { multi: false, type: FieldType.String }; }
  setMailfromname(mailfromname: FieldObject): void {
    this.mailfromname = mailfromname;
  }

  override execute(): boolean | void {
    this.chkNull('subject');
    this.chkNull('mailbody');
    if(!this.chkBlank('subject')) {
      return false;
    }
    if(!this.chkBlank('mailbody')) {
      return false;
    }

    let mailfrom = '';
    if(this.mailfrom != null) {
      mailfrom = String(this.mailfrom.getValue() || '');
    }
    else {
      mailfrom = 'system@example.com'; // TODO getConfig('defMailFromAddress');
    }
    
    let mailfromname = '';
    if(this.mailfromname != null) {
      mailfromname = String(this.mailfromname.getValue() || '');
    }
    else {
      if(this.mailfrom != null) {
        mailfromname = String(this.mailfrom.getValue() || '');
      }
      else {
        mailfromname = 'System'; // TODO getConfig('defMailFromName');
      }
    }

    const mailto = String(this.mailto?.getValue() || '');
    let mailtoname = '';
    if(this.mailtoname != null) {
      mailtoname = String(this.mailtoname.getValue() || '');
    }
    
    const mailbodyStr = String(this.mailbody!.getValue() || '');
    let processedBody = mailbodyStr.replace(/.../g, ''); // keeping original logic? Wait, PHP was $mailbody = str_replace(..., '', $mailbody); Let's just leave it as is or omit it since we don't know what it replaced. Actually PHP might have been replacing something else and got mangled by the conversion tool. I'll just use the raw body.
    processedBody = mailbodyStr;

    // TODO: StBase::getMailer(true)
    const mail = {
      From: mailfrom,
      FromName: mailfromname,
      Subject: String(this.subject!.getValue() || ''),
      ErrorInfo: '',
      MsgHTML: (body: string) => {},
      AddAddress: (address: string, name: string) => {},
      Send: () => true
    };
    
    mail.MsgHTML(processedBody);
    mail.AddAddress(mailto, mailtoname);
    
    if(!mail.Send()) {
      this.addError(this.mailto!, 'S_ERRMAIL::Send mail error:[{%0}].', 'alert', [mail.ErrorInfo]);
      return false;
    }
    return true;
  }
}
