/**
 * Date/time utility functions.
 * Converted from PHP StBase::getDate(), getTime(), getTimestamp().
 */

/** Pad number to 2 digits */
function pad2(n: number): string {
  return n < 10 ? '0' + n : '' + n;
}

/**
 * Returns current date as `YYYYMMDD` string.
 * Equivalent to PHP: date('Ymd')
 */
export function getDate(): string {
  const d = new Date();
  return '' + d.getFullYear() + pad2(d.getMonth() + 1) + pad2(d.getDate());
}

/**
 * Returns current time as `HHmmss` string.
 * Equivalent to PHP: date('His')
 */
export function getTime(): string {
  const d = new Date();
  return pad2(d.getHours()) + pad2(d.getMinutes()) + pad2(d.getSeconds());
}

/**
 * Returns a timestamp string with optional microseconds.
 * Equivalent to PHP: date('Ymd His') . substr(microtime, ...)
 *
 * @param microsecLen Number of decimal digits for sub-second precision (default 3)
 * @param noDay       If true, omit the date portion
 */
export function getTimestamp(microsecLen = 3, noDay = false): string {
  const d = new Date();
  const time = pad2(d.getHours()) + pad2(d.getMinutes()) + pad2(d.getSeconds());

  let sub = '';
  if (microsecLen > 0) {
    const ms = d.getMilliseconds();
    // JS only has ms precision; pad to desired length
    sub = '.' + String(ms).padStart(3, '0').substring(0, microsecLen);
  }

  if (noDay) {
    return time + sub;
  }
  const day = '' + d.getFullYear() + pad2(d.getMonth() + 1) + pad2(d.getDate());
  return day + ' ' + time + sub;
}
