/**
 * Converted from PHP classes/InsOrUpdEntityAuto.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, EntityObject, ListObject, FieldType } from '../field-objects';
import { InsertEntity } from './InsertEntity';
import { UpdateEntity } from './UpdateEntity';

export class InsOrUpdEntityAuto extends ProcessBase {
  mode: FieldObject | null = null;
  getModeInfo() { return { multi: false, type: FieldType.String }; }
  setMode(mode: FieldObject): void {
    this.mode = mode;
  }

  keyentity: EntityObject | null = null;
  getKeyentityInfo() { return { entity: true, type: FieldType.String }; }
  setKeyentity(keyentity: EntityObject): void {
    this.keyentity = keyentity;
  }

  entity: EntityObject | null = null;
  getEntityInfo() { return { entity: true, type: FieldType.String }; }
  setEntity(entity: EntityObject): void {
    this.entity = entity;
  }

  override async execute(): Promise<boolean | void> {
    this.chkNull('mode', 'FieldObject');
    this.chkNull('keyentity', 'EntityObject');
    this.chkNull('entity', 'EntityObject');

    const modeValue = this.mode?.getValue();
    if(modeValue === 'N') {
      const cls = new InsertEntity();
      cls._setContext(this.ctx);
      cls.setEntity(this.entity!);
      return await cls.execute();
    }
    else if(modeValue === 'M') {
      const cls = new UpdateEntity();
      cls._setContext(this.ctx);
      cls.setKeyentity(this.keyentity!);
      cls.setEntity(this.entity!);
      return await cls.execute();
    }
    this.addError(this.mode, 'SE_NOMODE::No page mode.');
    return false;
  }
}
