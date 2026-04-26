/**
 * Converted from PHP classes/LoadCurUser.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, EntityObject, ListObject, FieldType } from '../field-objects';
import { apiCache } from 'lupine.api';

export class LoadCurUser extends ProcessBase {
  entity: EntityObject | null = null;
  getEntityInfo() {
    return { entity: true, type: FieldType.String };
  }
  setEntity(entity: EntityObject): void {
    this.entity = entity;
  }

  override async execute(): Promise<boolean | void> {
    this.chkNull('entity', 'EntityObject');

    const store = apiCache.getAsyncStore();
    const user = store?.locals?.user || { id: 0, name: '', usertype: '' };

    if (!user || user.id === 0 || user.name === '' || user.usertype === '') {
      this.entity!.setItemValue('ID', String(user.id));
      this.entity!.setItemValue('NAME', user.name);
      this.entity!.setItemValue('USERTYPE', user.usertype);
    } else {
      const db = apiCache.getDb();
      const rows = await db.selectObject('#__st_users', [], { id: user.id });
      const row = rows && rows.length > 0 ? rows[0] : null;

      if (row) {
        for (const key of Object.keys(row)) {
          const value = row[key];
          const item = this.entity!.getItem(key.toUpperCase());
          if (item != null) {
            item.setValue(String(value));
          }
        }
      }
    }
  }
}
