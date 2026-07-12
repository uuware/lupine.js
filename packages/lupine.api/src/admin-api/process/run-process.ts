/**
 * Process Scheduler — the core engine that runs a process chain.
 *
 * Converted from PHP processbase.php: runProcess(), initItem(), finishItem().
 *
 * Flow:
 *   1. initItems()  — create FieldObject instances from item definitions, load input values
 *   2. run classes   — for each class: create instance, bind fields, execute()
 *   3. finishItems() — collect results into context.output for form rendering
 */

import { FieldObject, VectorObject, EntityObject, ListObject, createFieldObject } from './field-objects';
import { createClass } from './class-registry';
import { ProcessContext } from './process-context';

// ---------------------------------------------------------------------------
// Data type definitions — optimized for Node.js (not 1:1 copy of PHP)
// ---------------------------------------------------------------------------

/** Definition of a form item / variable */
export interface ItemDef {
  /** Field name (id) */
  name: string;
  /** Object type: 'FieldObject', 'NumberObject', 'DateObject', etc. */
  type: string;
  /** Flags: 'F,' (field), 'E,' (entity), 'L,' (list) */
  flags: string;
  /** Default value */
  defaultValue: string;
  /** Extended properties */
  ext?: {
    physicalId?: string;
    tableId?: string;
    filter?: string;
    sessionscope?: string;
  };
  /** Child fields (for entity/list) */
  children?: ItemDef[];
}

/** Definition of a field binding within a class */
export interface ClassFieldDef {
  /** Field binding name from the editor, e.g. 'fields', or actual setter method, e.g. 'setFields' */
  setter: string;
  /** Connected variable(s):
   *   - string: single field name like 'fieldA', or fixed value '=xxx', or list child '*fieldB'
   *   - string[]: multiple field names for VectorObject (multi)
   */
  value: string | string[];
}

/** Definition of a process class to execute */
export interface ClassDef {
  /** Class name: 'SetDate', 'StringPlus', etc. */
  name: string;
  /** Group name — errors break at group boundaries */
  group: string;
  /** Field bindings */
  fields: ClassFieldDef[];
  /** If true, this class operates on a list's records */
  isList?: boolean;
  /** The list variable name this class is bound to */
  listName?: string;
  /** Sub-classes to run per list record */
  listClasses?: ClassDef[];
  /** Run type: PHP uses 1=Check, 2=Logic, 3=View; editor uses names */
  runType?: string | number;
  /** Legacy/compiled alias for runType */
  Mode?: string | number;
}

// ---------------------------------------------------------------------------
// initItems — create and populate field objects from item definitions
// ---------------------------------------------------------------------------

function ensureItemExt(item: ItemDef): NonNullable<ItemDef['ext']> {
  if (!item.ext) item.ext = {};
  return item.ext;
}

function setItemTypeFlag(item: ItemDef, flag: 'F,' | 'E,' | 'L,'): void {
  item.flags = flag + (item.flags || '').replace(/F,|E,|L,/g, '');
}

function findItem(items: ItemDef[], name: string): ItemDef | null {
  for (const item of items) {
    if (item.name === name) return item;
    if (item.children) {
      const found = findItem(item.children, name);
      if (found) return found;
    }
  }
  return null;
}

function normalizeItemDefaults(items: ItemDef[]): void {
  for (const item of items) {
    item.flags = item.flags || '';
    if (item.children && item.children.length > 0) {
      if (!item.flags.includes('E,') && !item.flags.includes('L,')) {
        setItemTypeFlag(item, 'E,');
      }
      normalizeItemDefaults(item.children);
    } else if (!item.flags.includes('F,') && !item.flags.includes('E,') && !item.flags.includes('L,')) {
      setItemTypeFlag(item, 'F,');
    }

    if (!item.children || item.children.length === 0) {
      const ext = ensureItemExt(item);
      if (ext.physicalId == null) ext.physicalId = item.name;
    }
  }
}

function getClassFieldInfo(cls: any, fieldDef: ClassFieldDef): Record<string, unknown> | null {
  const setterName = resolveSetterName(cls, fieldDef.setter);
  const names: string[] = [];
  if (fieldDef.setter) {
    names.push('get' + fieldDef.setter.charAt(0).toUpperCase() + fieldDef.setter.slice(1) + 'Info');
  }
  if (setterName.startsWith('set') && setterName.length > 3) {
    names.push('get' + setterName.substring(3) + 'Info');
  }

  for (const name of names) {
    if (typeof cls[name] === 'function') {
      return cls[name]();
    }
  }
  return null;
}

function getDirectItemRef(value: string | string[]): string | null {
  if (Array.isArray(value) || value === '') return null;
  const prefix = value[0];
  if (prefix === '=' || prefix === '@' || prefix === '$' || prefix === '*') return null;
  return value;
}

function normalizeItemsForClassBindings(items: ItemDef[], classes: ClassDef[]): void {
  normalizeItemDefaults(items);

  for (const classDef of classes) {
    const cls = createClass(classDef.name);
    const bindings = classDef.fields
      .map((fieldDef) => {
        const ref = getDirectItemRef(fieldDef.value);
        const item = ref ? findItem(items, ref) : null;
        const info = getClassFieldInfo(cls, fieldDef);
        return { fieldDef, item, info };
      })
      .filter((binding) => binding.item && binding.info);

    for (const binding of bindings) {
      if (binding.info!.list) setItemTypeFlag(binding.item!, 'L,');
      else if (binding.info!.entity) setItemTypeFlag(binding.item!, 'E,');
    }

    const keyItem = bindings.find((binding) => binding.fieldDef.setter.toLowerCase() === 'keyentity')?.item;
    if (
      classDef.name === 'SelectRecord' ||
      classDef.name === 'SelectOneRecord' ||
      classDef.name === 'SelectAllRecord'
    ) {
      const listItem = bindings.find((binding) => binding.fieldDef.setter.toLowerCase() === 'listobject')?.item;
      if (keyItem?.ext?.tableId && listItem && !listItem.ext?.tableId) {
        ensureItemExt(listItem).tableId = keyItem.ext.tableId;
      }
    } else if (classDef.name === 'LoadEntity') {
      const entityItem = bindings.find((binding) => binding.fieldDef.setter.toLowerCase() === 'entity')?.item;
      if (keyItem?.ext?.tableId && entityItem && !entityItem.ext?.tableId) {
        ensureItemExt(entityItem).tableId = keyItem.ext.tableId;
      }
    }

    if (classDef.listClasses) {
      normalizeItemsForClassBindings(items, classDef.listClasses);
    }
  }
}

/**
 * Initialize all field/entity/list objects and populate with input values.
 * Equivalent to PHP initItem() — simplified (session persistence is not implemented).
 */
export function initItems(ctx: ProcessContext, items: ItemDef[]): void {
  for (const item of items) {
    const flags = item.flags;

    // Create the appropriate object
    if (flags.includes('L,')) {
      // List
      const list = new ListObject();
      if (item.ext?.tableId) list.setTableId(item.ext.tableId);
      ctx.vars[item.name] = list;
    } else if (flags.includes('E,')) {
      // Entity
      const entity = new EntityObject();
      if (item.ext?.tableId) entity.setTableId(item.ext.tableId);
      ctx.vars[item.name] = entity;
    } else {
      // Field
      const field = createFieldObject(item.type);
      if (item.ext?.physicalId) field.setPhysicalId(item.ext.physicalId);
      ctx.vars[item.name] = field;
    }

    const obj = ctx.vars[item.name];
    obj.setFieldId(item.name);
    if (item.ext?.filter) obj.setFilter(item.ext.filter);
    if (item.ext?.sessionscope) obj.setSessionScope(item.ext.sessionscope);

    // Set value from input or default
    if (item.name in ctx.input) {
      obj.setShowValue(ctx.input[item.name]);
    } else {
      obj.setValue(item.defaultValue as any);
    }

    // Process children (entity/list members)
    if (item.children && item.children.length > 0) {
      const parentObj = obj as EntityObject | ListObject;

      for (const child of item.children) {
        const childKey = item.name + '/' + child.name;
        const childField = createFieldObject(child.type);
        childField.setFieldId(child.name);

        if (child.ext?.physicalId) childField.setPhysicalId(child.ext.physicalId);
        if (child.ext?.filter) childField.setFilter(child.ext.filter);
        if (child.ext?.sessionscope) childField.setSessionScope(child.ext.sessionscope);

        // Set value from input or default. Entity children are emitted as parent/child,
        // but the test UI and older compiled bindings may still use bare child names.
        if (childKey in ctx.input) {
          childField.setShowValue(ctx.input[childKey]);
        } else if (child.name in ctx.input) {
          childField.setShowValue(ctx.input[child.name]);
        } else {
          childField.setValue(child.defaultValue as any);
        }

        ctx.vars[childKey] = childField;
        parentObj.addItem(childField);
      }

      if (obj instanceof ListObject) {
        setPostToList(ctx, obj);
      }
    }
  }
}

function setPostToList(ctx: ProcessContext, list: ListObject): void {
  list.clearRecords();
  const listId = list.getFieldId();
  const templateItems = list.getItems();
  const postedFieldIds = new Set<string>();

  for (const item of templateItems) {
    const id = item.getFieldId();
    if (Object.prototype.hasOwnProperty.call(ctx.input, listId + '/' + id + '#0')) {
      postedFieldIds.add(id);
    }
  }

  for (let index = 0; ; index++) {
    const entity = new EntityObject();
    let stop = true;

    for (const item of templateItems) {
      const field = item.clone();
      const id = field.getFieldId();
      if (postedFieldIds.has(id)) {
        const inputKey = listId + '/' + id + '#' + index;
        if (Object.prototype.hasOwnProperty.call(ctx.input, inputKey)) {
          field.setShowValue(ctx.input[inputKey]);
          stop = false;
        }
      }
      entity.addItem(field);
    }

    if (stop) {
      return;
    }
    list.addRecord(entity);
  }
}

// ---------------------------------------------------------------------------
// finishItems — collect results into context.output
// ---------------------------------------------------------------------------

/**
 * Write processed values back to context.output for form rendering.
 * Equivalent to PHP finishItem().
 */
export function finishItems(ctx: ProcessContext, items: ItemDef[]): void {
  for (const item of items) {
    const obj = ctx.vars[item.name];
    if (!obj) continue;

    ctx.output[item.name] = obj.getShowValue();
    if (obj.hasError()) {
      ctx.output[item.name + '#ERR'] = '1';
    }

    const flags = item.flags;

    // List: write records as listId/fieldId#rowIndex
    if (flags.includes('L,') && obj instanceof ListObject) {
      const listId = obj.getFieldId();
      const records = obj.getRecords();
      for (let r = 0; r < records.length; r++) {
        const record = records[r];
        const fields = record.getItems();
        for (const field of fields) {
          const nid = listId + '/' + field.getFieldId() + '#' + r;
          ctx.output[nid] = field.getShowValue();
          if (field.hasError()) {
            ctx.output[nid + '#ERR'] = '1';
          }
        }
        ctx.output[listId + '/_INDEX#' + r] = String(r);
      }
      const pageInfo = obj.getPageInfo();
      if (pageInfo['itemstart'] != null) {
        ctx.output[listId + '#ITEMSTART'] = String(pageInfo['itemstart']);
        ctx.output[listId + '#COUNT'] = String(pageInfo['itemcount']);
      } else {
        ctx.output[listId + '#ITEMSTART'] = '0';
        ctx.output[listId + '#COUNT'] = String(records.length);
      }
    }
    // Entity: write each child
    else if (flags.includes('E,') && obj instanceof EntityObject) {
      const grpId = obj.getFieldId();
      const entityItems = obj.getItems();
      for (const eItem of entityItems) {
        const nid = grpId + '/' + eItem.getFieldId();
        ctx.output[nid] = eItem.getShowValue();
        if (eItem.hasError()) {
          ctx.output[nid + '#ERR'] = '1';
        }
      }
    }
  }
}

// ---------------------------------------------------------------------------
// bindClassFields — bind variables to a class instance
// ---------------------------------------------------------------------------

function resolveSetterName(cls: any, setter: string): string {
  if (typeof cls[setter] === 'function') {
    return setter;
  }

  if (setter) {
    const methodName = 'set' + setter.charAt(0).toUpperCase() + setter.slice(1);
    if (typeof cls[methodName] === 'function') {
      return methodName;
    }
  }

  throw new Error(`Class ${cls.constructor.name} has no method "${setter}"`);
}

function bindClassFields(
  cls: any,
  fieldDefs: ClassFieldDef[],
  vars: Record<string, FieldObject>,
  listEntity?: EntityObject
): void {
  for (const fDef of fieldDefs) {
    const setterName = resolveSetterName(cls, fDef.setter);

    if (Array.isArray(fDef.value)) {
      // Multi: create VectorObject with all referenced fields
      if (fDef.value.length > 0) {
        const vec = new VectorObject();
        for (const ref of fDef.value) {
          const item = resolveFieldRef(ref, vars, listEntity);
          if (item) vec.addItem(item);
        }
        cls[setterName](vec);
      }
    } else if (fDef.value !== '') {
      // Single
      const item = resolveFieldRef(fDef.value, vars, listEntity);
      if (item) cls[setterName](item);
    }
  }
}

/**
 * Resolve a field reference string to a FieldObject.
 *
 * - '*fieldName'  → child of current list entity
 * - '=value'      → fixed value (create temp FieldObject)
 * - '@key'        → session value (placeholder — returns empty for now)
 * - '$key'        → globals value (placeholder — returns empty for now)
 * - 'fieldName'   → direct reference from vars
 */
function resolveFieldRef(
  ref: string,
  vars: Record<string, FieldObject>,
  listEntity?: EntityObject
): FieldObject | null {
  if (!ref) return null;

  const prefix = ref[0];

  if (prefix === '*') {
    // List child reference
    if (!listEntity) {
      throw new Error(`List child reference "${ref}" but no list entity in scope`);
    }
    const childName = ref.substring(1);
    const item = listEntity.getItem(childName);
    if (!item) {
      throw new Error(`No item "${childName}" in list entity`);
    }
    return item;
  }

  if (prefix === '=') {
    // Fixed value
    const field = new FieldObject();
    field.setValue(ref.substring(1));
    return field;
  }

  if (prefix === '@' || prefix === '$') {
    // Session or globals value — placeholder for now
    const field = new FieldObject();
    field.setValue('');
    return field;
  }

  // Direct variable reference
  const field = vars[ref];
  if (field) {
    return field;
  }

  // Entity children are stored as parent/child in vars. Older process JSON and the
  // editor can still bind a child as just "child", so accept an unambiguous suffix.
  const suffix = '/' + ref;
  const matchedKeys = Object.keys(vars).filter((key) => key.endsWith(suffix));
  if (matchedKeys.length === 1) {
    return vars[matchedKeys[0]];
  }
  if (matchedKeys.length > 1) {
    throw new Error(`Variable "${ref}" is ambiguous in process vars: ${matchedKeys.join(', ')}`);
  }

  throw new Error(`Variable "${ref}" not found in process vars`);
}

// ---------------------------------------------------------------------------
// checkCondition — evaluate conditional execution
// ---------------------------------------------------------------------------

function checkCondition(cls: any): boolean {
  if (cls.conditionalField == null || cls.conditionalValue == null) {
    return true; // no condition, always run
  }

  const fieldVal = cls.conditionalField.getValue();
  const condVal = cls.conditionalValue.getValue();
  const filter = cls.conditionalValue.getFilter();

  // Special condition checks
  const condId = cls.conditionalValue.getFieldId();
  if (cls.conditionalField.hasError() && condId === '#HASERROR') return true;
  if (!cls.conditionalField.hasError() && condId === '#NOERROR') return true;

  // Comparison-based conditions
  switch (filter) {
    case '':
    case '=':
      return fieldVal == condVal;
    case '<>':
      return fieldVal != condVal;
    case '>':
      return fieldVal > condVal;
    case '>=':
      return fieldVal >= condVal;
    case '<':
      return fieldVal < condVal;
    case '<=':
      return fieldVal <= condVal;
    default:
      return false;
  }
}

// ---------------------------------------------------------------------------
// shouldRunClass — evaluate PHP process run modes
// ---------------------------------------------------------------------------

function getProcessMode(ctx: ProcessContext): string {
  const mode = ctx.input.processmode ?? ctx.input.PROCESSMODE ?? ctx.input.mode ?? '3';
  return normalizeRunType(mode);
}

function normalizeRunType(runType: string | number | undefined): string {
  const value = String(runType ?? '').trim();
  switch (value.toLowerCase()) {
    case '1':
    case 'check':
      return '1';
    case '2':
    case 'logic':
      return '2';
    case '3':
    case 'view':
      return '3';
    default:
      return value;
  }
}

function shouldRunClass(ctx: ProcessContext, classDef: ClassDef): boolean {
  const mode = getProcessMode(ctx);
  const classMode = normalizeRunType(classDef.runType ?? classDef.Mode ?? '2');
  return mode === classMode || (mode === '3' && classMode === '2');
}

// ---------------------------------------------------------------------------
// executeClassChain — run a sequence of class definitions
// ---------------------------------------------------------------------------

async function executeClassChain(
  ctx: ProcessContext,
  classDefs: ClassDef[],
  vars: Record<string, FieldObject>,
  listEntity?: EntityObject
): Promise<boolean> {
  let grpLast = '';
  let result = true;

  for (const cDef of classDefs) {
    // If error and next group is different, break
    if (!result && cDef.group !== grpLast) {
      break;
    }

    if (!shouldRunClass(ctx, cDef)) {
      continue;
    }

    // Create class instance
    const cls = createClass(cDef.name);
    cls._setProcessId(ctx.processId);
    cls._setContext(ctx);

    // Bind fields
    bindClassFields(cls, cDef.fields, vars, listEntity);

    // Check conditional execution
    if (checkCondition(cls)) {
      const ret = await cls.execute();
      if (ret === false) {
        result = false;
      }
    }

    grpLast = cDef.group;
  }

  return result;
}

// ---------------------------------------------------------------------------
// runProcess — the main scheduler
// ---------------------------------------------------------------------------

/**
 * Run a complete process chain.
 *
 * @param ctx          The process context (input/output/vars)
 * @param items        Item definitions (compiled from editor)
 * @param classes      Class definitions (compiled from editor)
 * @returns            true if all classes succeeded, false if any returned false
 */
export async function runProcess(ctx: ProcessContext, items: ItemDef[], classes: ClassDef[]): Promise<boolean> {
  // 1. Initialize all items
  normalizeItemsForClassBindings(items, classes);
  initItems(ctx, items);

  // 2. Execute class chain
  let grpLast = '';
  let result = true;

  for (const cDef of classes) {
    // If error and next group is different, break
    if (!result && cDef.group !== grpLast) {
      break;
    }

    if (!shouldRunClass(ctx, cDef)) {
      continue;
    }

    // List-bound class: loop over each record in the list
    if (cDef.isList && cDef.listName && cDef.listClasses) {
      const list = ctx.vars[cDef.listName] as ListObject;
      if (list && list instanceof ListObject) {
        const listSize = list.recordSize();
        for (let i = 0; i < listSize; i++) {
          const entity = list.getRecord(i);
          if (entity) {
            const ok = await executeClassChain(ctx, cDef.listClasses, ctx.vars, entity);
            if (!ok) result = false;
          }
        }
      }
      grpLast = cDef.group;
      continue;
    }

    // Normal class
    const cls = createClass(cDef.name);
    cls._setProcessId(ctx.processId);
    cls._setContext(ctx);

    // Bind fields
    bindClassFields(cls, cDef.fields, ctx.vars);

    // Check conditional execution
    if (checkCondition(cls)) {
      const ret = await cls.execute();
      if (ret === false) {
        result = false;
      }
    }

    grpLast = cDef.group;
  }

  // 3. Finish: collect results
  ctx.hasError = !result;
  finishItems(ctx, items);

  return result;
}
