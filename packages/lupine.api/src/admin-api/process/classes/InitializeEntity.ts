/**
 * Converted from PHP classes/InitializeEntity.php
 */

import { ProcessBase } from '../process-base';
import { EntityObject, FieldType } from '../field-objects';

export class InitializeEntity extends ProcessBase {
  entity: EntityObject | null = null;
  getEntityInfo() {
    return { entity: true, type: FieldType.String };
  }
  setEntity(entity: EntityObject): void {
    this.entity = entity;
  }

  override execute(): boolean | void {
    this.chkNull('entity', 'EntityObject');

    for (let i = 0; i < this.entity!.itemSize(); i++) {
      this.entity!.setItemValue(i, '');
    }

    return true;
  }
}
