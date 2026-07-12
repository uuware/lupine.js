/**
 * Converted from PHP classes/SetFreeDate.php
 */

import { DateUtils } from '../../../lib/utils/date-utils';
import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, FieldType } from '../field-objects';

export class FormatDate extends ProcessBase {
  format: FieldObject | null = null;
  getFormatInfo() {
    return { multi: false, type: FieldType.String };
  }
  setFormat(format: FieldObject): void {
    this.format = format;
  }

  fields: FieldObject | VectorObject | null = null;
  getFieldsInfo() {
    return { multi: true, type: FieldType.String };
  }
  setFields(fields: FieldObject | VectorObject): void {
    this.fields = fields;
  }

  override execute(): boolean | void {
    this.chkNull('fields');

    const formatStr =
      this.format == null || this.format.isBlank() ? 'YYYY-MM-DD' : String(this.format.getValue() || '');
    const dateStr = DateUtils.format(new Date(), formatStr);
    this._setFieldValue('fields', dateStr);

    return true;
  }
}
