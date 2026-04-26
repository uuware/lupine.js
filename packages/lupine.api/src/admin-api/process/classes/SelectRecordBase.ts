/**
 * Converted from PHP classes/SelectRecordBase.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, EntityObject, FieldType } from '../field-objects';
import { getFilterSql } from '../process-utils';
import { apiCache } from 'lupine.api';

export class SelectRecordBase extends ProcessBase {
  createSql(maintblidRef: { value: string }, keyentity: EntityObject, entity: EntityObject, fieldArr: Record<string, string>): string | false {
    let tblidStr = entity.getTableId();
    if(tblidStr === '') {
      this.addError(entity, 'SE_NOTABLEID::Not set table id in list.');
      return false;
    }

    let maintblalias = '';
    const tblidArr: Record<string, string> = {};
    const sqlArr: Record<string, string> = {};
    const tblidArrTmp = tblidStr.toLowerCase().split(',');
    
    for (let item of tblidArrTmp) {
      item = item.trim();
      if(item !== '') {
        let alias = 'a';
        const pos = item.indexOf(' ');
        if(pos !== -1) {
          alias = item.substring(pos + 1).trim();
          item = item.substring(0, pos).trim();
        }
        if(maintblalias === '') {
          maintblidRef.value = item;
          maintblalias = alias;
        }
        item = item; // TODO: StBase::getRealTableId(item)
        if(item === '') {
          this.addError(entity, 'SE_NOACCESSTBL::Not access table: {%0}.', 'alert', [item]);
          return false;
        }
        if(tblidArr[alias] !== undefined) {
          throw new Error('Alias:' + alias + ' has been used for tableid:' + item);
        }
        tblidArr[alias] = item;
        sqlArr[alias] = '';
      }
    }

    const db = apiCache.getDb();
    let order = '';
    let where = '';
    const items = keyentity.getItems();
    
    for (const item of items) {
      let fid = item.getFieldId();
      if(fid.startsWith('#')) {
        if(fid === '#ORDER') {
          if(item.getValue() !== '') {
            if(order !== '') order += ',';
            order += item.getValue();
          }
        }
        else if(fid === '#WHERE' && item.getValue() !== '') {
          if(where !== '') where += ' AND ';
          where += item.getValue();
        }
        else if(fid.startsWith('#ON#') && item.getValue() !== '') {
          const alias = fid.substring(4).trim().toLowerCase();
          if(sqlArr[alias] === undefined) {
            throw new Error('Unknow alias:' + alias + ' at item:' + fid);
          }
          if(sqlArr[alias] !== '') {
            sqlArr[alias] += ' AND ';
          }
          sqlArr[alias] += String(item.getValue() || '');
        }
      }
      else if(item.getPhysicalId() !== '' && !item.isBlank()) {
        fid = item.getPhysicalId();
        const pos = fid.indexOf('#');
        let alias = maintblalias;
        
        if(pos > 0) {
          alias = fid.substring(0, pos).trim();
          fid = alias + '.' + fid.substring(pos + 1).trim();
        }
        else {
          if(Object.keys(tblidArr).length > 1) {
            fid = alias + '.' + fid;
          }
          else {
            fid = (db as any).escapeId(fid);
          }
        }
        if(sqlArr[alias] === undefined) {
          throw new Error('Field:' + fid + ' of unknow table:' + alias);
        }

        if(entity.getItemIndex(item.getFieldId()) >= 0) {
          where = getFilterSql(db, item, where, fid);
        }
        else {
          sqlArr[alias] = getFilterSql(db, item, sqlArr[alias], fid);
        }
      }
    }

    if(keyentity.getItemIndex('@SEARCH') >= 0) {
      const search = String(keyentity.getItemValue('@SEARCH') || '').trim();
      if(search !== '') {
        const searcharr = search.split(' ');
        let searchquery = '';
        for (const searchitem of searcharr) {
          let query = '';
          for (const item of keyentity.getItems()) {
            if(!item.getFieldId().startsWith('#') && item.getPhysicalId() !== '') {
              let fid = item.getPhysicalId();
              const pos = fid.indexOf('#');
              let alias = maintblalias;
              
              if(pos > 0) {
                alias = fid.substring(0, pos).trim();
                fid = alias + '.' + fid.substring(pos + 1).trim();
              }
              else {
                if(Object.keys(tblidArr).length > 1) {
                  fid = alias + '.' + fid;
                }
                else {
                  fid = (db as any).escapeId(fid);
                }
              }
              if(query !== '') {
                query += ' OR ';
              }
              const s = searchitem.replace(/_/g, '\\_');
              query += fid + ' LIKE ' + (db as any).escape('%' + s + '%');
            }
          }
          if(searchquery !== '') {
            searchquery += ' AND ';
          }
          searchquery += ' ( ' + query + ' ) ';
        }
        if(searchquery !== '') {
          if(where !== '') {
            where += ' AND ';
          }
          where += ' ( ' + searchquery + ' ) ';
        }
      }
    }

    let i = -1;
    let select = '';
    const entItems = entity.getItems();
    for (const item of entItems) {
      i++;
      let fid = item.getFieldId();
      if(fid.startsWith('#')) {
        if(fid === '#ORDER') {
          if(item.getValue() !== '') {
            if(order !== '') order += ',';
            order += item.getValue();
          }
        }
        else if(fid === '#WHERE' && item.getValue() !== '') {
          if(where !== '') where += ' AND ';
          where += item.getValue();
        }
        else if(fid.startsWith('#ON#') && item.getValue() !== '') {
          const alias = fid.substring(4).trim().toLowerCase();
          if(sqlArr[alias] !== '') {
            sqlArr[alias] += ' AND ';
          }
          sqlArr[alias] += item.getValue();
        }
      }
      else if(item.getPhysicalId() !== '') {
        fid = item.getPhysicalId();
        let alias = maintblalias;
        const pos = fid.indexOf('#');
        if(pos > 0) {
          alias = fid.substring(0, pos).trim();
          fid = alias + '.' + fid.substring(pos + 1).trim();
          fieldArr[i.toString()] = fid;
        }
        else {
          if(Object.keys(tblidArr).length > 1) {
            fid = alias + '.' + fid;
            fieldArr[i.toString()] = fid;
          }
          else {
            fieldArr[i.toString()] = fid;
            fid = (db as any).escapeId(fid);
          }
        }
        if(sqlArr[alias] === undefined) {
          throw new Error('Field:' + fid + ' of Unknow table:' + alias);
        }

        if(select !== '') {
          select += ',';
        }
        select += fid;
      }
    }

    let from = '';
    for (const [alias, item] of Object.entries(tblidArr)) {
      if(from === '') {
        if(Object.keys(tblidArr).length > 1) {
          from = item + ' ' + alias;
        }
        else {
          from = item;
        }
      }
      else {
        from += ' LEFT OUTER JOIN ' + item + ' ' + alias;
        if(sqlArr[alias] !== '') {
          from += ' ON ' + sqlArr[alias];
        }
      }
    }

    select = 'SELECT ' + select + ' FROM ' + from;
    if(sqlArr[maintblalias] !== '') {
      if(where !== '') {
        where = sqlArr[maintblalias] + ' AND ' + where;
      }
      else {
        where = sqlArr[maintblalias];
      }
    }
    if(where !== '') {
      select += ' WHERE ' + where;
    }
    if(order !== '') {
      select += ' ORDER BY ' + order;
    }
    return select;
  }

  override async execute(): Promise<boolean | void> {
  }
}
