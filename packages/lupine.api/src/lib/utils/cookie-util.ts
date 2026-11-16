import { SetCookieProps } from '../../models';

export const parseCookies = (str: string | undefined) => {
  let rx = /([^;=\s]*)=([^;]*)/g;
  let obj: { [key: string]: string } = {};
  if (str) {
    for (let m; (m = rx.exec(str)); ) {
      try {
        obj[m[1]] = decodeURIComponent(m[2].trim());
      } catch (error) {
        // Graceful fallback to raw value when percent-decoding fails
        obj[m[1]] = m[2].trim();
      }
    }
  }
  return obj;
};

export const serializeCookie = (name: string, value: string, options?: Partial<SetCookieProps>) => {
  let expiresStr = '';
  if (options && typeof options.expireDays === 'number') {
    const expires = new Date(Date.now() + options.expireDays * 24 * 3600000);
    expiresStr = '; Expires=' + expires.toUTCString();
  }
  const path = options?.path ? options.path : '/';
  const cookiePair =
    name +
    '=' +
    encodeURIComponent(value) +
    expiresStr +
    '; Path=' +
    path +
    (options?.domain ? '; Domain=' + options.domain : '') +
    (options?.httpOnly ? '; HttpOnly' : '') +
    (options?.Partitioned ? '; Partitioned' : '') +
    (options?.sameSite ? '; SameSite=' + options.sameSite : '') +
    (options?.secure ? '; Secure' : '');
  return cookiePair;
};
