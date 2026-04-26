/**
 * Converted from PHP classes/GetItemName.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, FieldType } from '../field-objects';

export class GetItemName extends ProcessBase {
  idfromphysicalid: FieldObject | null = null;
  getIdfromphysicalidInfo() { return { multi: false, type: FieldType.String }; }
  setIdfromphysicalid(idfromphysicalid: FieldObject): void {
    this.idfromphysicalid = idfromphysicalid;
  }

  idfromvalue: FieldObject | null = null;
  getIdfromvalueInfo() { return { multi: false, type: FieldType.String }; }
  setIdfromvalue(idfromvalue: FieldObject): void {
    this.idfromvalue = idfromvalue;
  }

  itemname: FieldObject | null = null;
  getItemnameInfo() { return { multi: false, type: FieldType.String }; }
  setItemname(itemname: FieldObject): void {
    this.itemname = itemname;
  }

  langpropertyid: FieldObject | null = null;
  getLangpropertyidInfo() { return { multi: false, type: FieldType.String }; }
  setLangpropertyid(langpropertyid: FieldObject): void {
    this.langpropertyid = langpropertyid;
  }

  override execute(): boolean | void {
    this.chkNull('itemname');
    if(this.idfromvalue == null && this.idfromphysicalid == null) {
      throw new Error("Error, need associate object for:idfromvalue or idfromphysicalid in GetItemName");
    }

    let itemid = '';
    if(this.idfromvalue != null) {
      itemid = String(this.idfromvalue.getValue() || '').toUpperCase();
    }
    if(itemid === '' && this.idfromphysicalid != null) {
      itemid = String(this.idfromphysicalid.getPhysicalId() || '').toUpperCase();
    }
    if(itemid === '') {
      if(this.idfromvalue != null) {
        this.idfromvalue.addError('SE_NOPHYSICALID::not set value for physicalid.');
      }
      else if(this.idfromphysicalid != null) {
        this.idfromphysicalid.addError('SE_NOPHYSICALID::not set value for physicalid.');
      }
      return false;
    }

    let propertyid = '1'; // OFFICIALNAME
    if(this.langpropertyid != null && !this.langpropertyid.isEmpty()) {
      propertyid = String(this.langpropertyid.getValue() || '').trim();
    }
    
    // TODO StBase::getItemName
    let itemname = itemid; // mock
    this.itemname?.setValue(itemname);
  }
}
