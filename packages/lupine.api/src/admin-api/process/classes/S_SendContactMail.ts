/**
 * Converted from PHP classes/S_SendContactMail.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, FieldType } from '../field-objects';
import { getTimestamp } from '../date-utils';

export class S_SendContactMail extends ProcessBase {
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

  override async execute(): Promise<boolean | void> {
    this.chkNull('subject');
    this.chkNull('mailbody');

    let mailfrom = '';
    if(this.mailfrom != null) {
      mailfrom = String(this.mailfrom.getValue() || '');
    }
    else {
      mailfrom = ''; // TODO getConfig('defMailFromAddress')
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
        mailfromname = ''; // TODO getConfig('defMailFromName')
      }
    }

    const mailto = String(this.mailto?.getValue() || '');
    let mailtoname = '';
    if(this.mailtoname != null) {
      mailtoname = String(this.mailtoname.getValue() || '');
    }

    const bccto = ''; // TODO getIni('defContactMail')
    if(bccto === '') {
      console.log('<span style="color:#ff00;">Cannot copy and send contact for no mail setting, at time:' + getTimestamp(4, true) + '</span>');
      if(mailto === '') {
        return true;
      }
    }

    let mailbodyStr = String(this.mailbody?.getValue() || '');
    mailbodyStr = mailbodyStr.replace(/\\/g, '');
    
    // MOCK Mailer
    const mail = {
      From: '',
      FromName: '',
      Subject: '',
      MsgHTML: (s: string) => {},
      AddAddress: (e: string, n: string) => {},
      AddBCC: (e: string, n: string) => {},
      addReplyTo: (e: string, n: string) => {},
      SMTPAuth: false,
      Username: '',
      Password: '',
      Send: async () => true, // TODO: real mailer
      ErrorInfo: 'Mock mail error'
    };

    mail.From = mailfrom;
    mail.FromName = mailfromname;
    mail.Subject = String(this.subject?.getValue() || '');
    mail.MsgHTML(mailbodyStr);
    
    if(mailto !== '') {
      mail.AddAddress(mailto, mailtoname);
    }

    if(bccto !== '') {
      mail.AddBCC(bccto, bccto);
    }

    mail.addReplyTo(mail.From, mail.FromName);
    mail.SMTPAuth = false; 
    mail.Username = ''; 
    mail.Password = ''; 

    if(!await mail.Send()) {
      console.log('<span style="color:#ff00;">' + mail.ErrorInfo + ', at time:' + getTimestamp(4, true) + '</span>');
      if(mailto !== '') {
        this.addError(this.mailto, 'S_ERRMAIL::Send mail error:[{%0}].', 'alert', [mail.ErrorInfo]);
        return false;
      }
    }
    return true;
  }
}
