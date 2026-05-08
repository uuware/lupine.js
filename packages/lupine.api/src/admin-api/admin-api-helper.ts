import crypto from 'crypto';
import { ServerResponse } from 'http';
import { ApiHelper, CryptoUtils, Logger, ServerRequest, apiCache, apiStorage } from 'lupine.api';

/*
dev-admin uses different authentication method from frontend.
dev-admin only provides fixed username and password authentication, no user maintenance.
saved cookie name: _token_dev
*/

// DEFAULT_ADMIN_PASS is DEFAULT_ADMIN_NAME + ':' + login password hash.
// Use below command to generate hash:
// node -e "console.log(require('crypto').createHash('md5').update('admin:F4AZ5O@2fPUjw%f$LmhZpJTQ^DoXnWPkH#hqE', 'utf8').digest('hex'))"
export type DevAdminSessionProps = {
  u: string; // username
  t: string; // type: admin, user
  ip: string;
  h: string; // sha256 of login password
  l?: number; // login time
};

export type AdminLoginLevelProps = {
  isLogin: boolean;
  isAppLogin: boolean;
  isDevAdmin: boolean;
  accesslevel: '0' | '2' | '3' | '9';
  devAdminSession?: DevAdminSessionProps;
};

/*
dev admin has more permissions than app admin, and the dashboard also supports for app admin only users.
app admin is supposed to manage the application, not the site, and may have different fields in cookie.
This is a sample how to set login process for app admin.

export const appAdminHookSetCookie: AppAdminHookSetCookieProps = async (
  req: ServerRequest,
  res: ServerResponse,
  username: string
) => {
  const cryptoKey = process.env['CRYPTO_KEY'];
  const u = process.env['ADMIN_USER'];
  const p = process.env['ADMIN_PASS'];
  if (!cryptoKey || !u || !p) {
    return {};
  }

  const specialToken = CryptoUtils.hash((u + ':' + p) as string);
  const loginJson: LoginJsonProps = {
    ip: '',
    id: 0,
    u: u,
    t: 'admin',
    h: specialToken,
  };

  const token = JSON.stringify(loginJson);
  const tokenCookie = CryptoUtils.encrypt(token, cryptoKey);
  const response = {
    status: 'ok',
    message: langHelper.getLang('shared:login_success'),
    result: tokenCookie,
    user: {
      u: loginJson.u,
      t: loginJson.t,
    },
  };

  // sameSite: 'none' needs secure=true
  req.locals.setCookie('_token', tokenCookie, {
    expireDays: 360,
    path: '/',
    httpOnly: false,
    secure: true,
    sameSite: 'none',
  });
  return response;
};

export const appAdminHookCheckLogin: AppAdminHookCheckLoginProps = async (
  req: ServerRequest,
  res: ServerResponse,
  username: string,
  password: string
) => {
  if (process.env['ADMIN_PASS'] && username === process.env['ADMIN_USER'] && CryptoUtils.sha256(password) === process.env['ADMIN_PASS']) {
    const appAdminResponse = await appAdminHookSetCookie(req, res, username);
    ApiHelper.sendJson(req, res, appAdminResponse);
    return true;
  }
  return false;
};

adminHelper.setAppAdminHookSetCookie(appAdminHookSetCookie);
adminHelper.setAppAdminHookCheckLogin(appAdminHookCheckLogin);
*/

// Brute force protection: track failed login attempts per IP
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 10 * 60 * 1000; // 10 minutes
const failedAttempts = new Map<string, { count: number; lockedUntil: number }>();

// Debounced cleanup: triggered on login requests, last one wins
let cleanupTimer: ReturnType<typeof setTimeout> | null = null;
export function scheduleCleanup() {
  if (cleanupTimer) clearTimeout(cleanupTimer);
  cleanupTimer = setTimeout(() => {
    cleanupTimer = null;
    const now = Date.now();
    for (const [ip, record] of failedAttempts) {
      if (record.lockedUntil > 0 && record.lockedUntil <= now) {
        failedAttempts.delete(ip);
      }
    }
  }, LOCKOUT_DURATION_MS * 2);
  cleanupTimer.unref();
}

export function isLockedOut(ip: string): boolean {
  const record = failedAttempts.get(ip);
  if (!record) return false;
  if (record.lockedUntil > Date.now()) return true;
  // Lockout expired, reset
  failedAttempts.delete(ip);
  return false;
}

export function recordFailedAttempt(ip: string) {
  const record = failedAttempts.get(ip) || { count: 0, lockedUntil: 0 };
  record.count++;
  if (record.count >= MAX_FAILED_ATTEMPTS) {
    record.lockedUntil = Date.now() + LOCKOUT_DURATION_MS;
    console.warn(`IP ${ip} locked out for 10 minutes after ${record.count} failed attempts`);
  }
  failedAttempts.set(ip, record);
}

export function clearFailedAttempts(ip: string) {
  failedAttempts.delete(ip);
}


// If env not set, send error message to client, and return true
export const checkEnvNotSet = (req: ServerRequest, res: ServerResponse, envName: string) => {
  if (!process.env[envName]) {
    const msg = 'Admin login is not configured';
    ApiHelper.sendJson(req, res, {
      status: 'error',
      message: msg,
    });
    return true;
  }
  return false;
}

export type AppAdminHookSetCookieProps = (req: ServerRequest, res: ServerResponse, username?: string, singleHash?: string) => Promise<any>;
export type AppAdminHookCheckLoginProps = (
  req: ServerRequest,
  res: ServerResponse,
  username: string,
  password: string,
  sendResponseWhenError: boolean,
) => Promise<boolean>;
export type AppAdminHookLogoutProps = (req: ServerRequest, res: ServerResponse) => Promise<void>;

export const DEV_ADMIN_TYPE = 'dev-admin';
export const DEV_ADMIN_USER_KEY_NAME = 'DEV_ADMIN_USER';
export const DEV_ADMIN_PASS_KEY_NAME = 'DEV_ADMIN_PASS';
export const DEV_ADMIN_CRYPTO_KEY_NAME = 'DEV_CRYPTO_KEY';
export const DEV_ADMIN_SESSION_INVALID_BEFORE_KEY_NAME = 'DEV_ADMIN_SESSION_INVALID_BEFORE';
export const DEV_ADMIN_SESSION_NAME = '_token_dev';

export const getDefaultSiteLang = async () => {
  const siteLangs = await apiStorage.getWeb('siteLangs');
  const firstLang = siteLangs
    .split(',')
    .map((lang) => lang.trim())
    .filter(Boolean)[0];
  return firstLang?.split(':')[0] || 'en';
};

export const getDesignLang = (req: ServerRequest) => {
  const data = req.locals.json?.() as { lang?: string } | undefined;
  return (data?.lang || req.locals.query?.get('lang') || '').trim();
};

export const getLangFallbackIds = async (id: string, lang: string) => {
  const defaultLang = await getDefaultSiteLang();
  return [
    lang ? `${lang}:${id}` : '',
    lang && lang !== defaultLang ? `${defaultLang}:${id}` : '',
    id,
  ].filter((fallbackId, index, arr) => fallbackId && arr.indexOf(fallbackId) === index);
};

export const selectLangFallbackRecord = async (table: string, idField: string, id: string, lang: string) => {
  const db = apiCache.getDb();
  const ids = await getLangFallbackIds(id, lang);
  for (const fallbackId of ids) {
    const result = await db.selectObject(table, undefined, {
      [idField]: fallbackId,
    });
    if (result && result.length > 0) {
      return result;
    }
  }
  return [];
};

export class AdminApiHelper {
  private static instance: AdminApiHelper;
  private logger = new Logger('admin-api');

  private constructor() { }

  public static getInstance(): AdminApiHelper {
    if (!AdminApiHelper.instance) {
      AdminApiHelper.instance = new AdminApiHelper();
    }
    return AdminApiHelper.instance;
  }

  private AppAdminHookSetCookie?: AppAdminHookSetCookieProps;
  setAppAdminHookSetCookie(hook: AppAdminHookSetCookieProps) {
    this.AppAdminHookSetCookie = hook;
  }
  getAppAdminHookSetCookie() {
    return this.AppAdminHookSetCookie;
  }

  private AppAdminHookCheckLogin?: AppAdminHookCheckLoginProps;
  setAppAdminHookCheckLogin(hook: AppAdminHookCheckLoginProps) {
    this.AppAdminHookCheckLogin = hook;
  }
  getAppAdminHookCheckLogin() {
    return this.AppAdminHookCheckLogin;
  }

  private AppAdminHookLogout?: AppAdminHookLogoutProps;
  setAppAdminHookLogout(hook: AppAdminHookLogoutProps) {
    this.AppAdminHookLogout = hook;
  }
  getAppAdminHookLogout() {
    return this.AppAdminHookLogout;
  }

  decryptJson(text: string, cryptoKey?: string) {
    cryptoKey = cryptoKey || process.env[DEV_ADMIN_CRYPTO_KEY_NAME];
    if (cryptoKey && text) {
      try {
        const deCrypto = CryptoUtils.decrypt(text, cryptoKey);
        const json = JSON.parse(deCrypto);
        return json;
      } catch (error: any) {
        this.logger.error(error.message);
      }
    }
    return null;
  }

  encryptJson(jsonOrText: string | object, cryptoKey?: string) {
    cryptoKey = cryptoKey || process.env[DEV_ADMIN_CRYPTO_KEY_NAME];
    if (cryptoKey && jsonOrText) {
      try {
        const text = typeof jsonOrText === 'string' ? jsonOrText : JSON.stringify(jsonOrText);
        const encryptText = CryptoUtils.encrypt(text, cryptoKey);
        return encryptText;
      } catch (error: any) {
        this.logger.error(error.message);
      }
    }
    return null;
  }

  async getDevAdminFromCookie(
    req: ServerRequest,
    res: ServerResponse,
    sendResponseWhenError = true
  ): Promise<DevAdminSessionProps | false> {
    try {
      const cookies = req.locals.cookies();
      const token = cookies.get(DEV_ADMIN_SESSION_NAME, '');
      if (token) {
        const json = this.decryptJson(token) as DevAdminSessionProps;
        if (!json || json.t !== DEV_ADMIN_TYPE) {
          if (sendResponseWhenError) {
            const response = {
              status: 'error',
              message: 'Wrong session data, contact site admin please.',
            };
            ApiHelper.sendJson(req, res, response);
          }
          return false;
        }

        // if it's special admin
        if (json.h && json.u === process.env[DEV_ADMIN_USER_KEY_NAME] && process.env[DEV_ADMIN_PASS_KEY_NAME]) {
          const invalidBefore = Number(process.env[DEV_ADMIN_SESSION_INVALID_BEFORE_KEY_NAME] || 0);
          if (invalidBefore > 0 && (!json.l || json.l < invalidBefore)) {
            return false;
          }

          const doubleHash = CryptoUtils.sha256(json.h);
          if (doubleHash === process.env[DEV_ADMIN_PASS_KEY_NAME]) {
            return json;
          }
        }
        return false;
      }
    } catch (error: any) {
      this.logger.error(error.message);
    }
    if (sendResponseWhenError) {
      const response = {
        status: 'error',
        message: 'Please login to use this system.',
      };
      ApiHelper.sendJson(req, res, response);
    }
    return false;
  }

  async getLoginLevel(req: ServerRequest, res: ServerResponse): Promise<AdminLoginLevelProps> {
    const devAdminSession = await this.getDevAdminFromCookie(req, res, false);
    if (devAdminSession) {
      return {
        isLogin: true,
        isAppLogin: false,
        isDevAdmin: true,
        accesslevel: '9',
        devAdminSession,
      };
    }

    if (this.AppAdminHookCheckLogin && await this.AppAdminHookCheckLogin(req, res, '', '', false)) {
      return {
        isLogin: true,
        isAppLogin: true,
        isDevAdmin: false,
        accesslevel: '3',
      };
    }

    return {
      isLogin: false,
      isAppLogin: false,
      isDevAdmin: false,
      accesslevel: '0',
    };
  }

  /** Timing-safe string comparison to prevent timing attacks */
  timingSafeEqual(a: string, b: string): boolean {
    const bufA = Buffer.from(a);
    const bufB = Buffer.from(b);
    if (bufA.length !== bufB.length) {
      // Compare against self to keep constant time, then return false
      crypto.timingSafeEqual(bufA, bufA);
      return false;
    }
    return crypto.timingSafeEqual(bufA, bufB);
  }
}

// add comment for tree shaking
export const adminApiHelper = /* @__PURE__ */ AdminApiHelper.getInstance();
