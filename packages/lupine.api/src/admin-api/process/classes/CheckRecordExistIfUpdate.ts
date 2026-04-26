/**
 * Converted from PHP classes/CheckRecordExistIfUpdate.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, FieldType, EntityObject } from '../field-objects';
import { CheckRecordMustExist } from './CheckRecordMustExist';

export class CheckRecordExistIfUpdate extends ProcessBase {
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

    if(this.mode?.getValue() === 'M') {
      const cls = new CheckRecordMustExist();
      cls._setContext(this.ctx);
      cls.setKeyentity(this.keyentity!);
      cls.setEntity(this.entity!);
      return await cls.execute();
    }
    return true;
  }
}
