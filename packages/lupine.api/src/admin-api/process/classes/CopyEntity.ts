/**
 * Converted from PHP classes/CopyEntity.php
 */

import { ProcessBase } from '../process-base';
import { EntityObject, FieldType } from '../field-objects';

export class CopyEntity extends ProcessBase {
  entityfrom: EntityObject | null = null;
  getEntityfromInfo() {
    return { entity: true, type: FieldType.String };
  }
  setEntityfrom(entityfrom: EntityObject): void {
    this.entityfrom = entityfrom;
  }

  entityto: EntityObject | null = null;
  getEntitytoInfo() {
    return { entity: true, type: FieldType.String };
  }
  setEntityto(entityto: EntityObject): void {
    this.entityto = entityto;
  }

  override execute(): boolean | void {
    this.chkNull('entityfrom', 'EntityObject');
    this.chkNull('entityto', 'EntityObject');

    const cnt = this.entityfrom!.itemSize();
    for (let i = 0; i < cnt; i++) {
      const itemfrom = this.entityfrom!.getItem(i);
      if (!itemfrom) {
        continue;
      }

      const itemto = this.entityto!.getItem(itemfrom.getFieldId());
      if (itemto) {
        itemto.setValue(itemfrom.getValue());
      }
    }

    return true;
  }
}
