/**
 * ProcessContext — replaces PHP's $_POST as the I/O layer for process execution.
 *
 * Each runProcess call gets its own context, so there's no global mutable state.
 *
 * - input:  values from the form (like PHP $_POST before process runs)
 * - output: values to render back to the form (like PHP $_POST after process runs)
 * - vars:   intermediate FieldObject instances created during the process
 */

import { FieldObject } from './field-objects';
import { apiCache } from 'lupine.api';

export class ProcessContext {
  /** Input data — equivalent to PHP $_POST / $_GET before process runs */
  input: Record<string, string>;

  /** Output data — populated by finishItems, for form rendering */
  output: Record<string, string> = {};

  /** Process variables — the FieldObject instances, keyed by field name */
  vars: Record<string, FieldObject> = {};

  /** Error flag — set to true if any class returns false */
  hasError = false;

  constructor(input?: Record<string, string>) {
    this.input = input ?? {};
  }

  /**
   * Retrieves formData from the async local storage.
   * This is equivalent to accessing the raw $_POST array in PHP.
   */
  async getFormData(): Promise<Record<string, any>> {
    const store = apiCache.getAsyncStore();
    if (store && store.locals && store.locals.formData) {
      return await store.locals.formData();
    }
    return {};
  }

  /**
   * Gets a specific input field. If it's not in this.input, tries to load it from formData.
   */
  async getInputValue(key: string): Promise<string | undefined> {
    if (this.input[key] !== undefined) {
      return this.input[key];
    }
    const formData = await this.getFormData();
    if (formData && formData[key] !== undefined) {
      const val = Array.isArray(formData[key]) ? formData[key][0] : formData[key];
      this.input[key] = val as string;
      return this.input[key];
    }
    return undefined;
  }
}
