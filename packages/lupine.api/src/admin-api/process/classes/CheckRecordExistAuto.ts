/**
 * Converted from PHP classes/CheckRecordExistAuto.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, EntityObject, ListObject, FieldType } from '../field-objects';
import { CheckRecordNotExist } from './CheckRecordNotExist';
import { CheckRecordMustExist } from './CheckRecordMustExist';

export class CheckRecordExistAuto extends ProcessBase {
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

    const modeVal = this.mode?.getValue();
    if(modeVal === 'N') {
      const cls = new CheckRecordNotExist();
      cls._setContext(this.ctx);
      cls.setKeyentity(this.keyentity!);
      cls.setEntity(this.entity!);
      return await cls.execute();
    }
    else if(modeVal === 'M') {
      const cls = new CheckRecordMustExist();
      cls._setContext(this.ctx);
      cls.setKeyentity(this.keyentity!);
      cls.setEntity(this.entity!);
      return await cls.execute();
    }
    this.addError(this.mode, 'SE_NOMODE::No page mode.');
    return false;
  }
}
