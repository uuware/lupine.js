/**
 * Field Object hierarchy — data containers used by process classes.
 *
 * Converted from PHP processbase.php:
 *   FieldObject, StringObject, NumberObject, DateObject, TimeObject,
 *   TimestampObject, MoneyObject, VectorObject, EntityObject, ListObject.
 */

// ---------------------------------------------------------------------------
// Field type enum — for design-time type hints
// ---------------------------------------------------------------------------

export enum FieldType {
  String = 'string',
  Number = 'number',
  Boolean = 'boolean',
  Date = 'date',
  Time = 'time',
  Timestamp = 'timestamp',
  Money = 'money',
  List = 'list',
}

// ---------------------------------------------------------------------------
// Error entry type
// ---------------------------------------------------------------------------

export interface FieldError {
  type: string; // 'notice' | 'error' | 'message' | 'alert'
  message: string;
}

// ---------------------------------------------------------------------------
// FieldObject — base field container
// ---------------------------------------------------------------------------

export class FieldObject<T = string> {
  protected _fieldId = '';
  protected _fieldName: string | null = null;
  protected _value: T | null = null;
  protected _format = '';
  protected _physicalId = '';
  protected _filter = '';
  protected _sessionScope = '';
  protected _type: FieldType = FieldType.String;
  protected _errors: Record<string, string[]> = {};

  toString(): string {
    return this.constructor.name;
  }

  clone(): FieldObject<T> {
    const item = new (this.constructor as new () => FieldObject<T>)();
    item._fieldId = this._fieldId;
    item._fieldName = this._fieldName;
    item._value = this._value;
    item._physicalId = this._physicalId;
    item._filter = this._filter;
    item._sessionScope = this._sessionScope;
    item._type = this._type;
    // deep-copy errors
    item._errors = {};
    for (const key of Object.keys(this._errors)) {
      item._errors[key] = [...this._errors[key]];
    }
    return item;
  }

  isEmpty(): boolean {
    return this._value == null || this._value === ('' as unknown as T);
  }

  isBlank(): boolean {
    if (this._value == null) return true;
    if (typeof this._value === 'string') return this._value.trim() === '';
    return false;
  }

  setValue(value: T | null): void {
    this._value = value;
  }

  getValue(): T | null {
    return this._value;
  }

  setShowValue(value: string): void {
    this._value = value as unknown as T;
  }

  getShowValue(): string {
    return this._value == null ? '' : String(this._value);
  }

  // --- format ---
  setFormat(format: string): void {
    this._format = format;
  }
  getFormat(): string {
    return this._format;
  }

  // --- fieldId ---
  setFieldId(fieldId: string): void {
    this._fieldId = fieldId;
  }
  getFieldId(): string {
    return this._fieldId;
  }

  // --- fieldName ---
  getFieldName(): string {
    if (this._fieldName == null) {
      return this._fieldId;
    }
    return this._fieldName;
  }
  setFieldName(name: string): void {
    this._fieldName = name;
  }

  // --- errors ---
  //'notice'; 'error'; 'message'; 'alert';
  addError(msgId: string, type = 'alert', _params?: string | string[]): void {
    const t = type.toLowerCase();
    // simple message — full template system to be added later
    const msg = `${msgId} [${this.getFieldName()}]`;
    if (!this._errors[t]) {
      this._errors[t] = [];
    }
    if (this._errors[t].includes(msg)) return;
    this._errors[t].push(msg);
  }

  getErrorMsg(crlf = '\r\n'): string {
    let msg = '';
    for (const arr of Object.values(this._errors)) {
      for (const e of arr) {
        msg += e + crlf;
      }
    }
    return msg;
  }

  getErrors(): Record<string, string[]> {
    return this._errors;
  }

  hasError(): boolean {
    return (
      (this._errors['error']?.length ?? 0) > 0 ||
      (this._errors['alert']?.length ?? 0) > 0
    );
  }

  // --- physicalId ---
  setPhysicalId(value: string): void {
    this._physicalId = value;
  }
  getPhysicalId(): string {
    return this._physicalId;
  }

  // --- filter ---
  setFilter(filter: string): void {
    this._filter = filter;
  }
  getFilter(): string {
    return this._filter;
  }

  // --- sessionScope ---
  setSessionScope(scope: string): void {
    this._sessionScope = scope;
  }
  getSessionScope(): string {
    return this._sessionScope;
  }

  // --- type ---
  getType(): FieldType {
    return this._type;
  }
}

// ---------------------------------------------------------------------------
// StringObject
// ---------------------------------------------------------------------------

export class StringObject extends FieldObject<string> {
  protected _type = FieldType.String;
}

// ---------------------------------------------------------------------------
// NumberObject
// ---------------------------------------------------------------------------

export class NumberObject extends FieldObject<number> {
  protected _type = FieldType.Number;
  private _decimals: number | false = false;

  setDecimals(decimals: number): void {
    this._decimals = decimals;
  }

  getDecimals(): number {
    if (this._decimals === false) this._decimals = 0;
    return this._decimals;
  }

  override setShowValue(value: string): void {
    this._value = parseFloat(value.replace(/,/g, '')) || 0;
  }

  override getShowValue(): string {
    const dec = this.getDecimals();
    const num = this._value ?? 0;
    return num.toLocaleString('en-US', {
      minimumFractionDigits: dec,
      maximumFractionDigits: dec,
    });
  }
}

// ---------------------------------------------------------------------------
// MoneyObject
// ---------------------------------------------------------------------------

export class MoneyObject extends NumberObject {
  protected override _type = FieldType.Money;
  private _moneyDecimals: number | false = false;

  override getDecimals(): number {
    if (this._moneyDecimals === false) this._moneyDecimals = 2;
    return this._moneyDecimals;
  }

  override setDecimals(decimals: number): void {
    this._moneyDecimals = decimals;
  }
}

// ---------------------------------------------------------------------------
// TimeObject
// ---------------------------------------------------------------------------

export class TimeObject extends FieldObject<string> {
  protected _type = FieldType.Time;

  override setShowValue(value: string): void {
    this._value = value.replace(/:/g, '');
  }

  override getShowValue(): string {
    const v = this._value ?? '';
    if (v.length === 4 && /^\d{4}$/.test(v)) {
      return v.substring(0, 2) + ':' + v.substring(2, 4);
    }
    if (v.length === 6 && /^\d{6}$/.test(v)) {
      return v.substring(0, 2) + ':' + v.substring(2, 4) + ':' + v.substring(4, 6);
    }
    return v;
  }
}

// ---------------------------------------------------------------------------
// DateObject
// ---------------------------------------------------------------------------

export class DateObject extends FieldObject<string> {
  protected _type = FieldType.Date;

  override setShowValue(value: string): void {
    this._value = value.replace(/[/\-. ]/g, '');
  }

  override getShowValue(): string {
    const v = this._value ?? '';
    if (v.length === 8 && /^\d{8}$/.test(v)) {
      return v.substring(0, 4) + '-' + v.substring(4, 6) + '-' + v.substring(6, 8);
    }
    return v;
  }
}

// ---------------------------------------------------------------------------
// TimestampObject
// ---------------------------------------------------------------------------

export class TimestampObject extends FieldObject<string> {
  protected _type = FieldType.Timestamp;

  override setShowValue(value: string): void {
    // Input format: "2009/11/05 13:37:14.999" or "2009-11-05 13:37:14.999"
    if (value.length >= 20 && value[10] === ' ') {
      const d = value.substring(0, 10);
      const t = value.substring(11);
      this._value = d.replace(/[/\-. ]/g, '') + ' ' + t.replace(/:/g, '');
    } else {
      this._value = value;
    }
  }

  override getShowValue(): string {
    const v = this._value ?? '';
    // Internal format: "20091105 133714.521"
    if (v.length >= 15 && v[8] === ' ' && /^\d{8}$/.test(v.substring(0, 8)) && /^\d{6}/.test(v.substring(9, 15))) {
      return (
        v.substring(0, 4) + '-' + v.substring(4, 6) + '-' + v.substring(6, 8) +
        ' ' +
        v.substring(9, 11) + ':' + v.substring(11, 13) + ':' + v.substring(13)
      );
    }
    return v;
  }
}

// ---------------------------------------------------------------------------
// VectorObject — container for multiple FieldObjects (used for "multi" vars)
// ---------------------------------------------------------------------------

export class VectorObject extends FieldObject {
  private _entity: FieldObject[] = [];

  addItem(field: FieldObject): void {
    if (field == null || !(field instanceof FieldObject)) {
      throw new Error('VectorObject.addItem: need FieldObject instance');
    }
    this._entity.push(field);
  }

  getItems(): FieldObject[] {
    return this._entity;
  }

  getItem(index: number): FieldObject | null {
    if (Number.isInteger(index) && index >= 0 && index < this._entity.length) {
      return this._entity[index];
    }
    return null;
  }

  getItemValue(index: number): unknown {
    const item = this.getItem(index);
    return item ? item.getValue() : null;
  }

  setItemValue(index: number, value: unknown): void {
    const item = this.getItem(index);
    if (item) item.setValue(value as any);
  }

  itemSize(): number {
    return this._entity.length;
  }

  removeItem(index: number): void {
    if (Number.isInteger(index) && index >= 0 && index < this._entity.length) {
      this._entity.splice(index, 1);
    }
  }

  clearItems(): void {
    this._entity = [];
  }
}

// ---------------------------------------------------------------------------
// EntityObject — a single row, holding named fields
// ---------------------------------------------------------------------------

export class EntityObject extends FieldObject {
  protected _tableId = '';
  protected _entityItems: FieldObject[] = [];

  cloneEntity(): EntityObject {
    const entity = new EntityObject();
    entity._tableId = this._tableId;
    entity._entityItems = this._entityItems.map((item) => item.clone());
    return entity;
  }

  setTableId(tableId: string): void {
    this._tableId = tableId;
  }
  getTableId(): string {
    return this._tableId;
  }

  addItem(field: FieldObject): void {
    if (field == null || !(field instanceof FieldObject)) {
      throw new Error('EntityObject.addItem: need FieldObject instance');
    }
    // prevent duplicate by fieldId
    if (this.getItemIndex(field.getFieldId()) >= 0) return;
    this._entityItems.push(field);
  }

  getItems(): FieldObject[] {
    return this._entityItems;
  }

  getItemIndex(id: string): number {
    for (let i = 0; i < this._entityItems.length; i++) {
      if (this._entityItems[i].getFieldId() === id) return i;
    }
    return -1;
  }

  getItem(indexOrId: number | string): FieldObject | null {
    if (typeof indexOrId === 'string') {
      for (let i = this._entityItems.length - 1; i >= 0; i--) {
        if (this._entityItems[i].getFieldId() === indexOrId) return this._entityItems[i];
      }
    } else if (Number.isInteger(indexOrId) && indexOrId >= 0 && indexOrId < this._entityItems.length) {
      return this._entityItems[indexOrId];
    }
    return null;
  }

  getItemValue(indexOrId: number | string): unknown {
    const item = this.getItem(indexOrId);
    return item ? item.getValue() : null;
  }

  setItemValue(indexOrId: number | string, value: unknown): void {
    const item = this.getItem(indexOrId);
    if (item) item.setValue(value as any);
  }

  itemSize(): number {
    return this._entityItems.length;
  }

  removeItem(indexOrId: number | string): void {
    if (typeof indexOrId === 'string') {
      for (let i = this._entityItems.length - 1; i >= 0; i--) {
        if (this._entityItems[i].getFieldId() === indexOrId) {
          this._entityItems.splice(i, 1);
          break;
        }
      }
    } else if (Number.isInteger(indexOrId) && indexOrId >= 0 && indexOrId < this._entityItems.length) {
      this._entityItems.splice(indexOrId, 1);
    }
  }

  clearItems(): void {
    this._entityItems = [];
  }
}

// ---------------------------------------------------------------------------
// ListObject — a table, holding multiple EntityObject rows
// ---------------------------------------------------------------------------

export class ListObject extends EntityObject {
  private _lists: EntityObject[] = [];
  private _pageInfo: Record<string, unknown> = {};

  addRecord(entity: EntityObject): EntityObject {
    this._lists.push(entity);
    return entity;
  }

  getRecords(): EntityObject[] {
    return this._lists;
  }

  getRecord(index: number): EntityObject | null {
    if (Number.isInteger(index) && index >= 0 && index < this._lists.length) {
      return this._lists[index];
    }
    return null;
  }

  recordSize(): number {
    return this._lists.length;
  }

  removeRecord(index: number): void {
    if (Number.isInteger(index) && index >= 0 && index < this._lists.length) {
      this._lists.splice(index, 1);
    }
  }

  clearRecords(): void {
    this._lists = [];
  }

  setPageInfo(pageInfo: Record<string, unknown>): void {
    this._pageInfo = pageInfo;
  }

  getPageInfo(): Record<string, unknown> {
    return this._pageInfo;
  }
}

// ---------------------------------------------------------------------------
// Factory — create FieldObject by type name string
// ---------------------------------------------------------------------------

export function createFieldObject(typeName: string): FieldObject<any> {
  switch (typeName) {
    case 'NumberObject':    return new NumberObject();
    case 'DateObject':      return new DateObject();
    case 'TimeObject':      return new TimeObject();
    case 'TimestampObject': return new TimestampObject();
    case 'MoneyObject':     return new MoneyObject();
    case 'StringObject':    return new StringObject();
    case 'FieldObject':
    default:                return new FieldObject();
  }
}
