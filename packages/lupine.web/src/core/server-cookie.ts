import { getCookie } from '../lib/cookie';
import { isFrontEnd } from '../lib/is-frontend';
import { getRequestContext } from './use-request-context';

// getEitherCookie can be used in both FE and SSR
export const getEitherCookie = (name: string) => {
  if (!isFrontEnd()) {
    // SSR
    return getServerCookie(name);
  } else {
    return getCookie(name);
  }
};

// In SSR (server-side-rendering), some components may need to access cookies
// Reads from per-request context (concurrency safe via ALS)
export const getServerCookie = (name: string) => {
  const cookies = getRequestContext().serverCookies;
  return cookies && cookies.get(name, '');
};
