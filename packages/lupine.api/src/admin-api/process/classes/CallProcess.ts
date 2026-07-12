/**
 * Converted from PHP classes/CallProcess.php
 */

import { apiCache } from 'lupine.api';
import { EntityObject, FieldObject, FieldType, ListObject } from '../field-objects';
import { ProcessBase } from '../process-base';
import { ProcessContext } from '../process-context';
import type { ClassDef, ItemDef } from '../run-process';

function syncOutputToVars(ctx: ProcessContext, output: Record<string, string>): void {
  for (const [key, value] of Object.entries(output)) {
    if (key.endsWith('#ERR') || key.endsWith('#COUNT') || key.endsWith('#ITEMSTART') || key.includes('/_INDEX#')) {
      continue;
    }

    const direct = ctx.vars[key];
    if (direct instanceof FieldObject) {
      direct.setShowValue(value);
      continue;
    }

    const entityMatch = key.match(/^([^/#]+)\/([^#]+)$/);
    if (entityMatch) {
      const entity = ctx.vars[entityMatch[1]];
      if (entity instanceof EntityObject) {
        entity.setItemValue(entityMatch[2], value);
      }
      continue;
    }

    const listMatch = key.match(/^([^/#]+)\/([^#]+)#(\d+)$/);
    if (listMatch) {
      const list = ctx.vars[listMatch[1]];
      if (list instanceof ListObject) {
        const record = list.getRecord(Number(listMatch[3]));
        record?.setItemValue(listMatch[2], value);
      }
    }
  }
}

export class CallProcess extends ProcessBase {
  processid: FieldObject | null = null;
  getProcessidInfo() {
    return { multi: false, type: FieldType.String };
  }
  setProcessid(processid: FieldObject): void {
    this.processid = processid;
  }
  setProcessId(processid: FieldObject): void {
    this.processid = processid;
  }

  processmode: FieldObject | null = null;
  getProcessmodeInfo() {
    return { multi: false, type: FieldType.String };
  }
  setProcessmode(processmode: FieldObject): void {
    this.processmode = processmode;
  }
  setProcessMode(processmode: FieldObject): void {
    this.processmode = processmode;
  }

  override async execute(): Promise<boolean | void> {
    this.chkNull('processid');
    this.chkNull('processmode');

    const processId = String(this.processid!.getValue() ?? '')
      .trim()
      .toLowerCase();
    const processMode = String(this.processmode!.getValue() ?? '') || '3';
    if (processId === '' || processId === '_blank_') {
      return true;
    }

    const db = apiCache.getDb();
    let rows: Array<{ json?: string }> = [];
    try {
      rows = await db.select('SELECT json FROM $__s_process WHERE processid = ?', [processId]);
    } catch (e: any) {
      this.addError(this.processid, 'SE0003::Error while query:{%1}', 'alert', [e.message]);
      return false;
    }

    if (!rows || rows.length === 0) {
      this.addError(this.processid, 'SE_PROCESS_NOT_FOUND::Process id does not exist:{%1}', 'alert', [processId]);
      return false;
    }

    let parsedJson: { items?: ItemDef[]; classes?: ClassDef[] };
    try {
      parsedJson = JSON.parse(rows[0].json || '{}');
    } catch (e: any) {
      this.addError(this.processid, 'SE_PROCESS_JSON::Invalid process json:{%1}', 'alert', [e.message]);
      return false;
    }

    const nestedInput = { ...(this.ctx?.input || {}), processmode: processMode };
    const nestedCtx = new ProcessContext(nestedInput, processId);
    const { runProcess } = await import('../run-process');
    const ok = await runProcess(nestedCtx, parsedJson.items || [], parsedJson.classes || []);

    if (this.ctx) {
      syncOutputToVars(this.ctx, nestedCtx.output);
      this.ctx.input = { ...this.ctx.input, ...nestedCtx.output };
      this.ctx.output = { ...this.ctx.output, ...nestedCtx.output };
    }

    return ok;
  }
}
