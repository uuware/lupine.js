/**
 * Converted from PHP classes/SetSessionId.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, FieldType } from '../field-objects';
import { apiCache } from 'lupine.api';

export class SetSessionId extends ProcessBase {
  fields: FieldObject | VectorObject | null = null;
  getFieldsInfo() { return { multi: true, type: FieldType.String }; }
  setFields(fields: FieldObject | VectorObject): void {
    this.fields = fields;
  }

  override execute(): boolean | void {
    this.chkNull('fields');
    const sessionId = apiCache.getAsyncStore()?.uuid || 'mock-session-id';
    this._setFieldValue('fields', sessionId);
  }
}
