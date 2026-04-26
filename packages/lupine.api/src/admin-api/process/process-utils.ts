/**
 * Process utility functions.
 * Converted from PHP StBase::raiseError(), addMessage() etc.
 */

// ---------------------------------------------------------------------------
// Message store — simple in-memory for now
// ---------------------------------------------------------------------------

const _messages: Record<string, string[]> = {};

/**
 * Raise a fatal error — equivalent to PHP StBase::raiseError().
 * Throws an Error so the process chain stops.
 */
export function raiseError(code: string, message: string): never {
  const full = code ? `[${code}] ${message}` : message;
  throw new Error(full);
}

/**
 * Add a message to the message store.
 * Types: 'notice', 'error', 'message', 'alert'.
 * Equivalent to PHP StBase::addMessage().
 */
export function addMessage(msg: string, type = 'message'): void {
  const t = type.toLowerCase();
  if (!_messages[t]) _messages[t] = [];
  if (_messages[t].includes(msg)) return;
  _messages[t].push(msg);
}

/**
 * Get all messages of a given type (or all types if omitted).
 */
export function getMessages(type?: string): Record<string, string[]> | string[] {
  if (type) return _messages[type.toLowerCase()] ?? [];
  return { ..._messages };
}

/**
 * Clear all messages.
 */
export function clearMessages(): void {
  for (const key of Object.keys(_messages)) {
    delete _messages[key];
  }
}

/**
 * Builds a WHERE clause filter for a FieldObject item.
 */
export function getFilterSql(db: any, item: import('./field-objects').FieldObject, filter: string, customFid?: string): string {
  const pid = item.getPhysicalId();
  if (!pid) return filter;
  
  if (filter !== '') {
    filter += ' AND ';
  }
  
  let realfilter = item.getFilter();
  if (realfilter === '') {
    realfilter = '=';
  }
  
  const val = String(item.getValue() || '');
  const fid = customFid || (db.escapeId ? db.escapeId(pid) : db.escape(pid));
  const esc = db.escape ? (v: string) => db.escape(v) : (v: string) => `'${v.replace(/'/g, "''")}'`;

  if (realfilter === 'l') {
    const s = val.replace(/_/g, '\\_');
    filter += fid + ' LIKE ' + esc('%' + s);
  } else if (realfilter === 'r') {
    const s = val.replace(/_/g, '\\_');
    filter += fid + ' LIKE ' + esc(s + '%');
  } else if (realfilter === 'c') {
    const s = val.replace(/_/g, '\\_');
    filter += fid + ' LIKE ' + esc('%' + s + '%');
  } else {
    filter += fid + ' ' + realfilter + ' ' + esc(val);
  }
  return filter;
}
