/**
 * Converted from PHP classes/S_SelectUser.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, EntityObject, ListObject, FieldType } from '../field-objects';
import { SelectRecord } from './SelectRecord';

export class S_SelectUser extends SelectRecord {
  override async execute(): Promise<boolean | void> {
    // rowcounttype: 0 for default; 1 for one row; -1 for all
    if (typeof (this as any).executeSub === 'function') {
      await (this as any).executeSub(0);
    }

    // clear password
    if (this.listobject) {
      const records = this.listobject.getRecords();
      for (const entity of records) {
        for (const field of entity.getItems()) {
          if (field.getPhysicalId() === 'password') {
            field.setValue('');
          }
        }
      }
    }
  }
}
