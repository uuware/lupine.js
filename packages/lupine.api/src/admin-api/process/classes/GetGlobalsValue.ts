/**
 * Converted from PHP classes/GetGlobalsValue.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, FieldType } from '../field-objects';
import { apiCache } from 'lupine.api';

export class GetGlobalsValue extends ProcessBase {
  fields: FieldObject | VectorObject | null = null;
  getFieldsInfo() { return { multi: true, type: FieldType.String }; }
  setFields(fields: FieldObject | VectorObject): void {
    this.fields = fields;
  }

  executeOne(field: FieldObject) {
    const id = field.getFieldId();
    const store = apiCache.getAsyncStore();
    if (store && store.locals && store.locals.globals) {
      field.setValue(store.locals.globals[id]);
    }
  }

  override execute(): boolean | void {
    this.chkNull('fields');

    if(this.fields instanceof VectorObject) {
      const cnt = this.fields.itemSize();
      for (let i = 0; i < cnt; i++) {
        const item = this.fields.getItem(i);
        if(item) this.executeOne(item);
      }
    }
    else {
      this.executeOne(this.fields as FieldObject);
    }
  }
}
