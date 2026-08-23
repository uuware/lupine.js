/**
 * Converted from PHP classes/SetDate.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, FieldType } from '../field-objects';
import { getDate } from '../date-utils';

export class SetDate extends ProcessBase {
  fields: FieldObject | VectorObject | null = null;
  getFieldsInfo() { return { multi: true, type: FieldType.String }; }
  setFields(fields: FieldObject | VectorObject): void {
    this.fields = fields;
  }

  override execute(): boolean | void {
    this.chkNull('fields');
    this._setFieldValue('fields', getDate());
  }
}
