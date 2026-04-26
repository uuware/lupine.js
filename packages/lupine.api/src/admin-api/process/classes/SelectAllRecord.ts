/**
 * Converted from PHP classes/SelectAllRecord.php
 */

import { SelectRecord } from './SelectRecord';

export class SelectAllRecord extends SelectRecord {
  override async execute(): Promise<boolean | void> {
    return this.executeSub(-1);
  }
}
