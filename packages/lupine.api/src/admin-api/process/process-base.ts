/**
 * ProcessBase — base class for all process classes.
 * Converted from PHP StProcessBase (processbase.php L493-L598).
 *
 * The scheduler creates an instance, calls setXxx() to bind field references,
 * then calls execute(). Subclasses override execute() to do their work.
 *
 * Variable info convention (per user's preference):
 *   Each variable `fields` has a companion method `getFieldsInfo()` that
 *   returns { multi?: boolean, type?: string } metadata. The scheduler
 *   and design UI read this to know what kind of binding is allowed.
 */

import { FieldObject, VectorObject } from './field-objects';
import { raiseError, addMessage } from './process-utils';

// Allow dynamic property access for chkNull / _setFieldValue / chkBlank
// which use string keys like the PHP `$this->$varname` pattern.
export interface ProcessBase {
  [key: string]: unknown;
}

export class ProcessBase {
  _processId = '';
  ctx: any = null; // Will be set to ProcessContext by scheduler

  _setProcessId(value: string): void {
    this._processId = value;
  }

  _setContext(ctx: any): void {
    this.ctx = ctx;
  }

  // --- conditional execution (used by scheduler) ---
  conditionalField: FieldObject | null = null;
  setConditionalField(field: FieldObject): void {
    this.conditionalField = field;
  }

  conditionalValue: FieldObject | null = null;
  setConditionalValue(value: FieldObject): void {
    this.conditionalValue = value;
  }

  // --- error field redirect ---
  errorField: FieldObject | null = null;
  setErrorField(field: FieldObject): void {
    this.errorField = field;
  }

  /**
   * Subclasses MUST override this method.
   * Return `false` to signal an error to the scheduler.
   */
  execute(): Promise<boolean | void> | boolean | void {
    raiseError('', 'must override ProcessBase.execute()!');
  }

  // -----------------------------------------------------------------------
  // addError — route errors to errorField, field, or global messages
  // -----------------------------------------------------------------------

  addError(
    field: FieldObject | null,
    msgId: string,
    type = 'alert',
    params?: string | string[],
  ): void {
    if (this.errorField != null) {
      this.errorField.addError(msgId, type, params);
    } else if (field != null) {
      field.addError(msgId, type, params);
    } else {
      const t = type.toLowerCase();
      // simple message for now — full template system later
      const msg = Array.isArray(params) ? `${msgId} ${params.join(',')}` : msgId;
      addMessage(msg, t);
    }
  }

  // -----------------------------------------------------------------------
  // chkNull — verify a variable has been bound
  // -----------------------------------------------------------------------

  chkNull(varName: string, type = 'FieldObject'): boolean {
    const obj = this[varName];

    if (obj == null) {
      raiseError(
        '',
        `Error, need associate object for: ${varName}, Class: ${this.constructor.name}, Process: ${this._processId}`,
      );
    }

    if (obj instanceof VectorObject) {
      const cnt = obj.itemSize();
      for (let i = 0; i < cnt; i++) {
        const item = obj.getItem(i);
        if (item == null || (type === 'FieldObject' && !(item instanceof FieldObject))) {
          raiseError(
            '',
            `Error, VectorObject item ${i} is not ${type}. Class: ${this.constructor.name}, Process: ${this._processId}`,
          );
        }
      }
    } else {
      if (type === 'FieldObject' && !(obj instanceof FieldObject)) {
        raiseError(
          '',
          `Error, the associated object is ${typeof obj} but not ${type}. Class: ${this.constructor.name}, Process: ${this._processId}`,
        );
      }
    }

    return true;
  }

  // -----------------------------------------------------------------------
  // _setFieldValue — set a value on a field or all items in a VectorObject
  // -----------------------------------------------------------------------

  _setFieldValue(fieldName: string, value: unknown): void {
    const obj = this[fieldName];

    if (obj instanceof VectorObject) {
      const cnt = obj.itemSize();
      for (let i = 0; i < cnt; i++) {
        obj.setItemValue(i, value);
      }
    } else if (obj instanceof FieldObject) {
      obj.setValue(value as any);
    }
  }

  // -----------------------------------------------------------------------
  // chkBlank — check that a field (or all items in a vector) is not blank
  // -----------------------------------------------------------------------

  chkBlank(varName: string): boolean {
    const obj = this[varName];
    let ret = true;

    if (obj instanceof VectorObject) {
      const cnt = obj.itemSize();
      for (let i = 0; i < cnt; i++) {
        const item = obj.getItem(i);
        if (item && item.isBlank()) {
          this.addError(item, 'S_BLANK::{%N} is empty.');
          ret = false;
        }
      }
    } else if (obj instanceof FieldObject) {
      if (obj.isBlank()) {
        this.addError(obj, 'S_BLANK::{%N} is empty.');
        ret = false;
      }
    }

    return ret;
  }
}
