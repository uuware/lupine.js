/**
 * Converted from PHP classes/CleanEntity.php
 */

import { ProcessBase } from '../process-base';
import { EntityObject, FieldType } from '../field-objects';

export class CleanEntity extends ProcessBase {
  entity: EntityObject | null = null;
  getEntityInfo() {
    return { entity: true, type: FieldType.String };
  }
  setEntity(entity: EntityObject): void {
    this.entity = entity;
  }

  override execute(): boolean | void {
    this.chkNull('entity', 'EntityObject');

    const cnt = this.entity!.itemSize();
    for (let i = 0; i < cnt; i++) {
      const item = this.entity!.getItem(i);
      if (item) {
        item.setValue('');
      }
    }

    return true;
  }
}
