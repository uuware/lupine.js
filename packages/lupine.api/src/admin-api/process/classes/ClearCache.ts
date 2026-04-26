/**
 * Converted from PHP classes/ClearCache.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, FieldType } from '../field-objects';

export class ClearCache extends ProcessBase {
  type: FieldObject | null = null;
  getTypeInfo() { return { multi: false, type: FieldType.String }; }
  setType(type: FieldObject): void {
    this.type = type;
  }

  id: FieldObject | null = null;
  getIdInfo() { return { multi: false, type: FieldType.String }; }
  setId(id: FieldObject): void {
    this.id = id;
  }

  doClear(dir: string, prefix: string = '') {
    // TODO clear cache
  }

  doClearOne(dir: string, file: string) {
    // TODO clear cache
  }

  override execute(): boolean | void {
    this.chkNull('type');
    let typeVal = String(this.type?.getValue() || '');
    let idStr = '';
    if(this.id != null) {
      idStr = String(this.id.getValue() || '').trim().toLowerCase();
      idStr = idStr.replace(/[:;"'\\/*?|]/g, '_').replace(/\.\./g, '_');
    }

    const _ST_DIR_C_PROCESS = '/tmp/cache/process';
    const _ST_DIR_C_PAGE = '/tmp/cache/page';
    const _ST_DIR_C_VAR = '/tmp/cache/var';
    const _ST_DIR_LOG = '/tmp/cache/log';
    const _ST_DIR_C_PDF = '/tmp/cache/pdf';
    const _ST_DIR_C_MENU = '/tmp/cache/menu';

    if(typeVal === 'ALL') {
      const caches = [_ST_DIR_C_PROCESS, _ST_DIR_C_PAGE, _ST_DIR_C_VAR, _ST_DIR_LOG, _ST_DIR_C_PDF, _ST_DIR_C_MENU];
      for(const dirone of caches) {
        this.doClear(dirone);
      }
    }
    else if(typeVal === 'PAGE') {
      if(idStr !== '') {
        const compile = { clearCache: (id: string) => {} }; // TODO getCompilePage
        compile.clearCache(idStr);
      }
      else {
        this.doClear(_ST_DIR_C_PAGE);
        this.doClear(_ST_DIR_C_VAR, 'var_page-');
      }
    }
    else if(typeVal === 'PROCESS') {
      if(idStr !== '') {
        const compile = { clearCache: (id: string) => {} }; // TODO getCompileProcess
        compile.clearCache(idStr);
      }
      else {
        this.doClear(_ST_DIR_C_PROCESS);
        this.doClear(_ST_DIR_C_VAR, 'var_process-');
      }
    }
    else if(typeVal === 'LANG') {
      this.doClear(_ST_DIR_C_VAR, 'var_lang-all');
    }
    else if(typeVal === 'MSG') {
      if(idStr !== '') {
        this.doClearOne(_ST_DIR_C_VAR, 'var_msg-' + idStr + '.v.php');
      }
      else {
        this.doClear(_ST_DIR_C_VAR, 'var_msg-');
      }
    }
    else if(typeVal === 'ITEM') {
      if(idStr !== '') {
        this.doClearOne(_ST_DIR_C_VAR, 'var_item-' + idStr + '.v.php');
      }
      else {
        this.doClear(_ST_DIR_C_VAR, 'var_item-');
      }
    }
    else if(typeVal === 'ITEMOPT') {
      if(idStr !== '') {
        this.doClearOne(_ST_DIR_C_VAR, 'var_itemopt-' + idStr + '.v.php');
      }
      else {
        this.doClear(_ST_DIR_C_VAR, 'var_itemopt-');
      }
    }
    else if(typeVal === 'MENU') {
      if(idStr !== '') {
        this.doClearOne(_ST_DIR_C_VAR, 'var_menu-ty-all.v.php');
        const compile = { clearCache: (id: string) => {} }; // TODO getCompileMenu
        compile.clearCache(idStr);
      }
      else {
        this.doClear(_ST_DIR_C_VAR, 'var_menu-');
        this.doClear(_ST_DIR_C_MENU, '');
      }
    }
    else if(typeVal === 'CID') {
      this.doClear(_ST_DIR_C_VAR, 'var_cid-cat-');
    }
    else if(typeVal === 'VAR') {
      this.doClear(_ST_DIR_C_VAR);
    }
    else if(typeVal === 'LOG') {
      this.doClear(_ST_DIR_LOG, 'log');
    }
    else if(typeVal === 'PDF') {
      this.doClear(_ST_DIR_C_PDF, '~p');
    }
    else if(typeVal === 'REDIRECT') {
      this.doClear(_ST_DIR_C_VAR, 'var_redirect-all');
    }
    else if(typeVal === 'POLL') {
      this.doClear(_ST_DIR_C_VAR, 'var_poll-');
    }
  }
}
