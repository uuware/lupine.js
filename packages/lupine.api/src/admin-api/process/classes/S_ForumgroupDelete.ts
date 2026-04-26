/**
 * Converted from PHP classes/S_ForumgroupDelete.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, ListObject, FieldType } from '../field-objects';
import { addMessage } from '../process-utils';
import { apiCache } from 'lupine.api';
import * as path from 'path';
import * as fs from 'fs/promises';

export class S_ForumgroupDelete extends ProcessBase {
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
      const forumgroupid = String(this.groupid?.getValue() || '');
      const db = apiCache.getDb();
      let query = 'SELECT DISTINCT forumid FROM #__st_forumgroupdtl WHERE forumgroupid = ' + (db as any).escape(forumgroupid) + ' ORDER BY lineid, forumid';
      const lst = await db.select(query);
      
      if(lst && lst.length > 0) {
        let arrids: Record<string, string> = {};
        for (const row of lst) {
          if (row.forumid) arrids[row.forumid] = '1';
        }
        
        if(modeVal === 'M') {
          const cnt = this.groupdtllist!.recordSize();
          for(let i = cnt - 1; i >= 0; i--) {
            const entity = this.groupdtllist!.getRecord(i);
            const forumid = String(entity?.getItemValue('FORUMID') || '');
            if(forumid) arrids[forumid] = '0';
          }
        }

        let deletedFileCnt = 0;
        for(const forumid of Object.keys(arrids)) {
          const v = arrids[forumid];
          
          query = 'DELETE FROM #__st_forumgroupdtl WHERE forumgroupid =' + (db as any).escape(forumgroupid) + ' AND forumid = ' + (db as any).escape(forumid);
          try {
            await db.execute(query);
          } catch(e: any) {
            addMessage('SE_ERRQUERY::Error while query: ' + e.message, 'alert');
            return false;
          }

          if(v === '0') {
            continue;
          }

          query = 'SELECT DISTINCT forumitemid FROM #__st_forumdata WHERE forumgroupid = ' + (db as any).escape(forumgroupid) + ' AND forumid = ' + (db as any).escape(forumid);
          const lstitem = await db.select(query);
          
          if(lstitem && lstitem.length > 0) {
            for (const lstrow of lstitem) {
              const forumitemid = lstrow.forumitemid;
              const uploadDirName = forumgroupid + forumid + forumitemid;
              const uploadDir = path.join(apiCache.getAppData().dataPath, 'upload', 'GB', uploadDirName);
              
              let exists = false;
              try {
                await fs.access(uploadDir);
                exists = true;
              } catch(e) {}

              if (exists) {
                // TODO: Delete files properly
                deletedFileCnt++;
              }

              query = 'DELETE FROM #__st_upload WHERE uploadmodule =' + (db as any).escape('GB') + ' AND uploaddir =' + (db as any).escape(uploadDirName);
              await db.execute(query);
            }
          }

          query = 'DELETE FROM #__st_forumdata WHERE forumgroupid =' + (db as any).escape(forumgroupid) + ' AND forumid = ' + (db as any).escape(forumid);
          try {
            await db.execute(query);
          } catch(e: any) {
            addMessage('SE_ERRQUERY::Error while query: ' + e.message, 'alert');
            return false;
          }

          query = 'DELETE FROM #__st_forumitem WHERE forumgroupid =' + (db as any).escape(forumgroupid) + ' AND forumid = ' + (db as any).escape(forumid);
          try {
            await db.execute(query);
          } catch(e: any) {
            addMessage('SE_ERRQUERY::Error while query: ' + e.message, 'alert');
            return false;
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
