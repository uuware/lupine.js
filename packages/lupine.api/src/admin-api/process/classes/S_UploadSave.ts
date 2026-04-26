/**
 * Converted from PHP classes/S_UploadSave.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, FieldType } from '../field-objects';
import { apiCache, Logger } from 'lupine.api';
import * as path from 'path';
import * as fs from 'fs/promises';

const logger = new Logger('S_UploadSave');

function _safefilename(str: string): string {
  return str.replace(/[^a-zA-Z0-9_\-\.]/g, '');
}

export class S_UploadSave extends ProcessBase {
  uploadcat: FieldObject | null = null;
  getUploadcatInfo() { return { multi: false, type: FieldType.String }; }
  setUploadcat(uploadcat: FieldObject): void {
    this.uploadcat = uploadcat;
  }

  uploadkey: FieldObject | null = null;
  getUploadkeyInfo() { return { multi: false, type: FieldType.String }; }
  setUploadkey(uploadkey: FieldObject): void {
    this.uploadkey = uploadkey;
  }

  accesslevel: FieldObject | null = null;
  getAccesslevelInfo() { return { multi: false, type: FieldType.String }; }
  setAccesslevel(accesslevel: FieldObject): void {
    this.accesslevel = accesslevel;
  }

  override async execute(): Promise<boolean | void> {
    this.chkNull('uploadcat', 'FieldObject');
    this.chkNull('uploadkey', 'FieldObject');
    if(!this.chkBlank('uploadcat')) {
      return false;
    }
    if(!this.chkBlank('uploadkey')) {
      return false;
    }

    let accesslevel = '0';
    if(this.accesslevel != null && !this.accesslevel.isEmpty()) {
      accesslevel = String(this.accesslevel.getValue() || '0');
    }

    let catRaw = String(this.uploadcat?.getValue() || '');
    let cat = _safefilename(catRaw.replace(/;/g, ''));
    let keyRaw = String(this.uploadkey?.getValue() || '');
    let key = _safefilename(keyRaw);

    const sessionId = apiCache.getAsyncStore()?.uuid || 'mock-session-id';
    
    const baseUploadDir = path.join(apiCache.getAppData().dataPath, 'upload');
    const fromDir = path.join(baseUploadDir, 'TEMP_UPLOAD', cat + '_' + sessionId);
    
    let cnt = 0;
    let dirs: string[] = [];
    try {
      const statFrom = await fs.stat(fromDir);
      if (statFrom.isDirectory()) {
        dirs = await fs.readdir(fromDir);
        for (const file of dirs) {
          if(file !== '.htaccess' && file !== 'index.html') {
            cnt++;
          }
        }
      }
    } catch(e) {}

    if(cnt > 0) {
      const toDir = path.join(baseUploadDir, cat, key);
      await fs.mkdir(baseUploadDir, { recursive: true });
      await fs.mkdir(path.join(baseUploadDir, cat), { recursive: true });
      await fs.mkdir(toDir, { recursive: true });
      
      for (const file of dirs) {
        const fulldir = path.join(fromDir, file);
        const stat = await fs.stat(fulldir);
        if(!stat.isDirectory()) {
          if(file !== '.htaccess' && file !== 'index.html') {
            try {
              const destFile = path.join(toDir, file);
              await fs.copyFile(fulldir, destFile);
            } catch(e) {
              this.addError(this.uploadkey!, 'SE_CPERR::Error while copy file.', 'alert');
              return false;
            }
          }
          await fs.unlink(fulldir);
        }
      }

      try {
        await fs.rmdir(fromDir);
      } catch (e) {
        // ignore rmdir error
      }

      const db = apiCache.getDb();
      let query = 'UPDATE #__st_upload SET uploadmodule=' + (db as any).escape(cat) + ', uploaddir=' + (db as any).escape(key) + ', accesslevel=' + (db as any).escape(accesslevel) +
        ' WHERE uploadmodule =' + (db as any).escape('TEMP_UPLOAD') + ' AND uploaddir=' + (db as any).escape(cat + '_' + sessionId);
      
      try {
        await db.execute(query);
      } catch (e) {
        this.addError(this.uploadkey!, 'SE_ERRQUERY::Error while query.', 'alert');
        return false;
      }
    }
  }
}
