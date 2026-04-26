/**
 * Converted from PHP classes/S_CheckNewCid.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, FieldType } from '../field-objects';
import { apiCache } from 'lupine.api';

export class S_CheckNewCid extends ProcessBase {
  cid: FieldObject | null = null;
  getCidInfo() { return { multi: false, type: FieldType.String }; }
  setCid(cid: FieldObject): void {
    this.cid = cid;
  }

  cidparent: FieldObject | null = null;
  getCidparentInfo() { return { multi: false, type: FieldType.String }; }
  setCidparent(cidparent: FieldObject): void {
    this.cidparent = cidparent;
  }

  override async execute(): Promise<boolean | void> {
    this.chkNull('cid', 'FieldObject');
    this.chkNull('cidparent', 'FieldObject');
    if(!this.chkBlank('cid')) {
      return false;
    }

    const strself = String(this.cid?.getValue() || '').toUpperCase();
    let strself_real = strself;
    this.cid?.setValue(strself);

    if(!/^[A-Z0-9.]+$/i.test(strself)) {
      this.addError(this.cid, 'S_CIDFMT::Cid[{%0}] can be only alphabetic or numeric and dot behind of parent.', 'alert', [strself]);
      return false;
    }

    const strp = String(this.cidparent?.getValue() || '').trim();
    if(strp === strself) {
      this.addError(this.cidparent, 'S_CIDSELF::Parent Cid[{%0}] cannot be self.', 'alert', [strp]);
      return false;
    }

    if(strp !== '') {
      const len = strp.length;
      if(strself.substring(0, len) !== strp) {
        const pos = strself.lastIndexOf('.');
        if(pos !== -1) {
          this.cid?.setValue(strp + strself.substring(pos));
        }
        else {
          this.cid?.setValue(strp + '.' + strself);
        }
        this.addError(this.cid, 'S_CIDMUSTPARENTPRE::Cid[{%0}] need with parent cid ahead.', 'alert', [strself]);
        return false;
      }
      const strself2 = strself.substring(len);
      if(strself2.substring(0, 1) !== '.') {
        this.addError(this.cid, 'S_CIDMUSTPARENTDOT::Cid[{%0}] need with "parent.self" format.', 'alert', [strself]);
        return false;
      }
      strself_real = strself.substring(len + 1);

      const db = apiCache.getDb();
      let query = 'SELECT cid FROM #__st_cat WHERE cid =' + (db as any).escape(strp);
      const rows = await db.select(query);
      if(!rows || rows.length === 0) {
        this.addError(this.cidparent, 'S_CIDNOPARENT::Parent Cid[{%0}] is not exist.', 'alert', [strp]);
        return false;
      }
    }

    if(strself_real.indexOf('.') !== -1) {
      this.addError(this.cid, 'S_CIDERRDOT::Self part of cid[{%0}] cannot include "." format.', 'alert', [strself_real]);
      return false;
    }
  }
}
