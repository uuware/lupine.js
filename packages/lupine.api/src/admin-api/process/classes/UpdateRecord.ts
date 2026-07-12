/**
 * Converted from PHP classes/UpdateRecord.php
 */

import { ProcessBase } from '../process-base';
import { EntityObject, ListObject, FieldType } from '../field-objects';
import { UpdateEntity } from './UpdateEntity';

export class UpdateRecord extends ProcessBase {
  keyentity: EntityObject | null = null;
  getKeyentityInfo() {
    return { entity: true, type: FieldType.String };
  }
  setKeyentity(keyentity: EntityObject): void {
    this.keyentity = keyentity;
  }

  datalist: ListObject | null = null;
  getDatalistInfo() {
    return { list: true, type: FieldType.String };
  }
  setDatalist(datalist: ListObject): void {
    this.datalist = datalist;
  }

  override async execute(): Promise<boolean | void> {
    this.chkNull('keyentity', 'EntityObject');
    this.chkNull('datalist', 'ListObject');

    let tblidStr = this.datalist!.getTableId();
    if (tblidStr === '') {
      this.datalist!.addError('SE_NOTABLEID::Not set table id in list.');
      return false;
    }
    const realTblid = tblidStr; // TODO getRealTableId
    if (realTblid === '') {
      this.addError(this.datalist, 'SE_NOACCESSTBL::Not access table: {%0}.', 'alert', [tblidStr]);
      return false;
    }

    const arr = this.datalist!.getRecords();
    if (arr.length !== 1) {
      this.datalist!.addError('SE0004');
      return false;
    }
    const entity = arr[0];

    entity.setTableId(realTblid);

    const cls = new UpdateEntity();
    cls._setContext(this.ctx);
    cls.setKeyentity(this.keyentity!);
    cls.setEntity(entity);
    return await cls.executeSub(this.datalist!, 'SE0006', realTblid);
  }
}
