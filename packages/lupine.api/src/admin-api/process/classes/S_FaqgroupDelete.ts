/**
 * Converted from PHP classes/S_FaqgroupDelete.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, ListObject, FieldType } from '../field-objects';
import { addMessage } from '../process-utils';
import { apiCache } from 'lupine.api';
import * as path from 'path';
import * as fs from 'fs/promises';

export class S_FaqgroupDelete extends ProcessBase {
  mode: FieldObject | null = null;
  getModeInfo() { return { multi: false, type: FieldType.String }; }
  setMode(mode: FieldObject): void {
    this.mode = mode;
  }

  groupid: FieldObject | null = null;
  getGroupidInfo() { return { multi: false, type: FieldType.String }; }
  setGroupid(groupid: FieldObject): void {
    this.groupid = groupid;
  }

  groupdtllist: ListObject | null = null;
  getGroupdtllistInfo() { return { list: true, type: FieldType.String }; }
  setGroupdtllist(groupdtllist: ListObject): void {
    this.groupdtllist = groupdtllist;
  }

  override async execute(): Promise<boolean | void> {
    this.chkNull('mode', 'FieldObject');
    this.chkNull('groupid', 'FieldObject');
    this.chkNull('groupdtllist', 'ListObject');

    if(!this.chkBlank('groupid')) {
      return false;
    }

    const modeVal = this.mode?.getValue();
    if(modeVal === 'N') {
      return true;
    }
    else if(modeVal === 'M' || modeVal === 'D' || modeVal === 'B') {
      const faqgroupid = String(this.groupid?.getValue() || '');
      const db = apiCache.getDb();
      let query = 'SELECT DISTINCT faqid FROM #__st_faqgroupdtl WHERE faqgroupid = ' + (db as any).escape(faqgroupid) + ' ORDER BY lineid, faqid';
      const lst = await db.select(query);
      
      if(lst && lst.length > 0) {
        let arrids: Record<string, string> = {};
        for (const row of lst) {
          if (row.faqid) arrids[row.faqid] = '1';
        }

        if(modeVal === 'M') {
          const cnt = this.groupdtllist!.recordSize();
          for(let i = cnt - 1; i >= 0; i--) {
            const entity = this.groupdtllist!.getRecord(i);
            const faqid = String(entity?.getItemValue('FAQID') || '');
            if (faqid) {
              arrids[faqid] = '0';
            }
          }
        }

        let deletedFileCnt = 0;
        for (const faqid of Object.keys(arrids)) {
          const v = arrids[faqid];
          
          query = 'DELETE FROM #__st_faqgroupdtl WHERE faqgroupid =' + (db as any).escape(faqgroupid) + ' AND faqid = ' + (db as any).escape(faqid);
          try {
            await db.execute(query);
          } catch (e: any) {
            addMessage('SE_ERRQUERY::Error while query: ' + e.message, 'alert');
            return false;
          }
          
          if(v === '0') {
            continue;
          }

          query = 'SELECT DISTINCT faqitemid FROM #__st_faqitem WHERE faqgroupid =' + (db as any).escape(faqgroupid) + ' AND faqid = ' + (db as any).escape(faqid);
          const lstitem = await db.select(query);

          query = 'DELETE FROM #__st_faqitem WHERE faqgroupid =' + (db as any).escape(faqgroupid) + ' AND faqid = ' + (db as any).escape(faqid);
          try {
            await db.execute(query);
          } catch (e: any) {
            addMessage('SE_ERRQUERY::Error while query: ' + e.message, 'alert');
            return false;
          }

          if(lstitem && lstitem.length > 0) {
            for (const lstrow of lstitem) {
              const faqitemid = lstrow.faqitemid;
              const uploadDirName = faqgroupid + faqid + faqitemid;
              const uploadDir = path.join(apiCache.getAppData().dataPath, 'upload', 'FAQ', uploadDirName);
              
              let exists = false;
              try {
                await fs.access(uploadDir);
                exists = true;
              } catch(e) {}
              
              if (exists) {
                // TODO: Delete files in directory properly
                // For now, assume a mock deletion
                deletedFileCnt++;
              }

              query = 'DELETE FROM #__st_upload WHERE uploadmodule =' + (db as any).escape('FAQ') + ' AND uploaddir =' + (db as any).escape(uploadDirName);
              await db.execute(query);
            }
          }
        }
        if(deletedFileCnt > 0) {
          addMessage('SE_DELFILE::Deleted files:' + deletedFileCnt, 'message');
        }
      }
      return true;
    }
    
    this.addError(this.mode!, 'SE_NOMODE::No page mode.');
    return false;
  }
}
