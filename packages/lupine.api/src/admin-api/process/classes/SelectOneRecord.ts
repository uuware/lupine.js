/**
 * Converted from PHP classes/SelectOneRecord.php
 */

import { SelectRecord } from './SelectRecord';

export class SelectOneRecord extends SelectRecord {
  override async execute(): Promise<boolean | void> {
    return this.executeSub(1);
  }
}
