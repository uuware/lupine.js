/**
 * Converted from PHP classes/RandomString.php
 */

import { CryptoUtils } from '../../../lib/utils/crypto';
import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, FieldType } from '../field-objects';

export class RandomString extends ProcessBase {
  fields: FieldObject | VectorObject | null = null;
  getFieldsInfo() {
    return { multi: true, type: FieldType.String };
  }
  setFields(fields: FieldObject | VectorObject): void {
    this.fields = fields;
  }

  override execute(): boolean | void {
    this.chkNull('fields', 'FieldObject');

    const value = CryptoUtils.randomCharNumberString(32);
    this._setFieldValue('fields', value);

    return true;
  }
}
