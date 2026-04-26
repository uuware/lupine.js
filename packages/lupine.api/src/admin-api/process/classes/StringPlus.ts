/**
 * StringPlus — concatenates up to 8 input field values into the output field(s).
 * Converted from PHP classes/StringPlus.php.
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, FieldType } from '../field-objects';

export class StringPlus extends ProcessBase {
  field1: FieldObject | null = null;
  getField1Info() { return { multi: false, type: FieldType.String }; }
  setField1(field: FieldObject): void { this.field1 = field; }

  field2: FieldObject | null = null;
  getField2Info() { return { multi: false, type: FieldType.String }; }
  setField2(field: FieldObject): void { this.field2 = field; }

  field3: FieldObject | null = null;
  getField3Info() { return { multi: false, type: FieldType.String }; }
  setField3(field: FieldObject): void { this.field3 = field; }

  field4: FieldObject | null = null;
  getField4Info() { return { multi: false, type: FieldType.String }; }
  setField4(field: FieldObject): void { this.field4 = field; }

  field5: FieldObject | null = null;
  getField5Info() { return { multi: false, type: FieldType.String }; }
  setField5(field: FieldObject): void { this.field5 = field; }

  field6: FieldObject | null = null;
  getField6Info() { return { multi: false, type: FieldType.String }; }
  setField6(field: FieldObject): void { this.field6 = field; }

  field7: FieldObject | null = null;
  getField7Info() { return { multi: false, type: FieldType.String }; }
  setField7(field: FieldObject): void { this.field7 = field; }

  field8: FieldObject | null = null;
  getField8Info() { return { multi: false, type: FieldType.String }; }
  setField8(field: FieldObject): void { this.field8 = field; }

  outfield: FieldObject | VectorObject | null = null;
  getOutFieldInfo() { return { multi: true, type: FieldType.String }; }
  setOutField(outfield: FieldObject | VectorObject): void { this.outfield = outfield; }

  override execute(): void {
    this.chkNull('outfield');

    let out = '';
    if (this.field1 != null) out += this.field1.getValue() ?? '';
    if (this.field2 != null) out += this.field2.getValue() ?? '';
    if (this.field3 != null) out += this.field3.getValue() ?? '';
    if (this.field4 != null) out += this.field4.getValue() ?? '';
    if (this.field5 != null) out += this.field5.getValue() ?? '';
    if (this.field6 != null) out += this.field6.getValue() ?? '';
    if (this.field7 != null) out += this.field7.getValue() ?? '';
    if (this.field8 != null) out += this.field8.getValue() ?? '';

    this._setFieldValue('outfield', out);
  }
}
