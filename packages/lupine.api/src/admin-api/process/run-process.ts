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

import {
  FieldObject,
  VectorObject,
  EntityObject,
  ListObject,
  createFieldObject,
} from './field-objects';
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
  };
  /** Child fields (for entity/list) */
  children?: ItemDef[];
}

/** Definition of a field binding within a class */
export interface ClassFieldDef {
  /** Setter method name, e.g. 'setFields', 'setOutField' */
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
}

// ---------------------------------------------------------------------------
// initItems — create and populate field objects from item definitions
// ---------------------------------------------------------------------------

/**
 * Initialize all field/entity/list objects and populate with input values.
 * Equivalent to PHP initItem() — simplified (no session scope).
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

        // Set value from input or default
        if (childKey in ctx.input) {
          childField.setShowValue(ctx.input[childKey]);
        } else {
          childField.setValue(child.defaultValue as any);
        }

        ctx.vars[childKey] = childField;
        parentObj.addItem(childField);
      }
    }
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

function bindClassFields(
  cls: any,
  fieldDefs: ClassFieldDef[],
  vars: Record<string, FieldObject>,
  listEntity?: EntityObject,
): void {
  for (const fDef of fieldDefs) {
    const setterName = fDef.setter;

    if (typeof cls[setterName] !== 'function') {
      throw new Error(
        `Class ${cls.constructor.name} has no method "${setterName}"`,
      );
    }

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
  listEntity?: EntityObject,
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
  if (!field) {
    throw new Error(`Variable "${ref}" not found in process vars`);
  }
  return field;
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
    case '=':  return fieldVal == condVal;
    case '<>': return fieldVal != condVal;
    case '>':  return fieldVal > condVal;
    case '>=': return fieldVal >= condVal;
    case '<':  return fieldVal < condVal;
    case '<=': return fieldVal <= condVal;
    default:   return false;
  }
}

// ---------------------------------------------------------------------------
// executeClassChain — run a sequence of class definitions
// ---------------------------------------------------------------------------

async function executeClassChain(
  ctx: ProcessContext,
  classDefs: ClassDef[],
  vars: Record<string, FieldObject>,
  listEntity?: EntityObject,
): Promise<boolean> {
  let grpLast = '';
  let result = true;

  for (const cDef of classDefs) {
    // If error and next group is different, break
    if (!result && cDef.group !== grpLast) {
      break;
    }

    // Create class instance
    const cls = createClass(cDef.name);
    cls._setProcessId(cDef.name);
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
export async function runProcess(
  ctx: ProcessContext,
  items: ItemDef[],
  classes: ClassDef[],
): Promise<boolean> {
  // 1. Initialize all items
  initItems(ctx, items);

  // 2. Execute class chain
  let grpLast = '';
  let result = true;

  for (const cDef of classes) {
    // If error and next group is different, break
    if (!result && cDef.group !== grpLast) {
      break;
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
    cls._setProcessId(cDef.name);
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
