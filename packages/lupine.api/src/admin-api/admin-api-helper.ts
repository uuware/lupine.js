import { ServerResponse } from 'http';
import { ApiHelper } from '../api';
import { CryptoUtils, Logger } from '../lib';
import { ServerRequest } from '../models';

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
  h: string; // md5 of name+pass
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
  if (process.env['ADMIN_PASS'] && username === process.env['ADMIN_USER'] && password === process.env['ADMIN_PASS']) {
    const appAdminResponse = await appAdminHookSetCookie(req, res, username);
    ApiHelper.sendJson(req, res, appAdminResponse);
    return true;
  }
  return false;
};

adminHelper.setAppAdminHookSetCookie(appAdminHookSetCookie);
adminHelper.setAppAdminHookCheckLogin(appAdminHookCheckLogin);
*/
export type AppAdminHookSetCookieProps = (req: ServerRequest, res: ServerResponse, username: string) => Promise<any>;
export type AppAdminHookCheckLoginProps = (
  req: ServerRequest,
  res: ServerResponse,
  username: string,
  password: string
) => Promise<boolean>;
export type AppAdminHookLogoutProps = (req: ServerRequest, res: ServerResponse) => Promise<void>;

export const DEV_ADMIN_TYPE = 'dev-admin';
export const DEV_ADMIN_CRYPTO_KEY_NAME = 'DEV_CRYPTO_KEY';
export const DEV_ADMIN_SESSION_NAME = '_token_dev';
export class AdminApiHelper {
  private static instance: AdminApiHelper;
  private logger = new Logger('admin-api');

  private constructor() {}

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

  decryptJson(text: string) {
    const cryptoKey = process.env[DEV_ADMIN_CRYPTO_KEY_NAME];
    if (cryptoKey && text) {
      try {
        const deCrypto = CryptoUtils.decrypt(text, cryptoKey);
        const json = JSON.parse(deCrypto);
        return json;
      } catch (error: any) {
        this.logger.error(error.message);
      }
    }
    return false;
  }

  encryptJson(jsonOrText: string | object) {
    const cryptoKey = process.env[DEV_ADMIN_CRYPTO_KEY_NAME];
    if (cryptoKey && jsonOrText) {
      try {
        const text = typeof jsonOrText === 'string' ? jsonOrText : JSON.stringify(jsonOrText);
        const encryptText = CryptoUtils.encrypt(text, cryptoKey);
        return encryptText;
      } catch (error: any) {
        this.logger.error(error.message);
      }
    }
    return false;
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
        if (json.h && json.u === process.env['DEV_ADMIN_USER']) {
          const hash = CryptoUtils.hash(process.env['DEV_ADMIN_USER'] + ':' + process.env['DEV_ADMIN_PASS']);
          if (json.h === hash) {
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
}

// add comment for tree shaking
export const adminApiHelper = /* @__PURE__ */ AdminApiHelper.getInstance();
