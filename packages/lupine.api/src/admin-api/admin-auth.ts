import { ServerResponse } from 'http';
import { Logger, ServerRequest, ApiHelper } from 'lupine.api';
import { CryptoUtils } from '../lib/utils/crypto';
import { adminApiHelper, DEV_ADMIN_CRYPTO_KEY_NAME, DEV_ADMIN_TYPE, DevAdminSessionProps } from './admin-api-helper';
import { langHelper } from '../lang';

const logger = new Logger('admin-auth');

export const needDevAdminSession = async (req: ServerRequest, res: ServerResponse) => {
  const devAdminSession = await adminApiHelper.getDevAdminFromCookie(req, res, true);
  if (!devAdminSession) {
    // return true to skip the rest of the middleware
    const response = {
      status: 'error',
      message: langHelper.getLang('shared:permission_denied'),
    };
    ApiHelper.sendJson(req, res, response);
    return true;
  }
  return false;
};

// dev admin, for development only
export const devAdminAuth = async (req: ServerRequest, res: ServerResponse) => {
  const cryptoKey = process.env[DEV_ADMIN_CRYPTO_KEY_NAME];
  if (!cryptoKey) {
    const msg = langHelper.getLang('shared:name_not_set', {
      name: 'ENV ' + DEV_ADMIN_CRYPTO_KEY_NAME,
    });
    logger.error(msg);
    const response = {
      status: 'error',
      message: msg,
    };
    ApiHelper.sendJson(req, res, response);
    return true;
  }
  if (!process.env['DEV_ADMIN_PASS']) {
    const msg = langHelper.getLang('shared:name_not_set', {
      name: 'ENV DEV_ADMIN_PASS',
    });
    logger.error(msg);
    const response = {
      status: 'error',
      message: msg,
    };
    ApiHelper.sendJson(req, res, response);
    return true;
  }

  // TODO: secure and httpOnly cookies
  const data = req.locals.json();
  if (!data || Array.isArray(data) || !data.u || !data.p) {
    // if session already exists, use session data login
    const devAdminSession = await adminApiHelper.getDevAdminFromCookie(req, res, false);
    if (!devAdminSession) {
      // check is app admin
      const appAdminHookCheckLogin = adminApiHelper.getAppAdminHookCheckLogin();
      if (appAdminHookCheckLogin) {
        if (await appAdminHookCheckLogin(req, res, '', '')) {
          return true;
        }
      }

      const response = {
        status: 'error',
        message: 'Please login to use this system.',
      };
      ApiHelper.sendJson(req, res, response);
      return true;
    }
    // on set app cookie when login, not every time
    // // if it's dev admin, then set app admin cookie as well
    // let addLoginResponse = {};
    // const appAdminHookSetCookie = adminApiHelper.getAppAdminHookSetCookie();
    // if (appAdminHookSetCookie) {
    //   addLoginResponse = await appAdminHookSetCookie(req, res, devAdminSession.u);
    // }
    const response = {
      // ...addLoginResponse,
      status: 'ok',
      message: langHelper.getLang('shared:login_success'),
      devLogin: CryptoUtils.encrypt(JSON.stringify(devAdminSession), cryptoKey),
    };
    ApiHelper.sendJson(req, res, response);
    return true;
  }

  if (data.u === process.env['DEV_ADMIN_USER'] && data.p === process.env['DEV_ADMIN_PASS']) {
    logger.info('dev admin logged in');
    const devSession: DevAdminSessionProps = {
      u: data.u,
      t: DEV_ADMIN_TYPE,
      ip: req.socket.remoteAddress as string,
      h: CryptoUtils.hash(data.u + ':' + data.p),
    };
    const token = JSON.stringify(devSession);
    const tokenCookie = CryptoUtils.encrypt(token, cryptoKey);

    // if it's dev admin, then set app admin cookie as well
    let addLoginResponse = {};
    const appAdminHookSetCookie = adminApiHelper.getAppAdminHookSetCookie();
    if (appAdminHookSetCookie) {
      addLoginResponse = await appAdminHookSetCookie(req, res, data.u);
    }

    const response = {
      ...addLoginResponse,
      status: 'ok',
      message: langHelper.getLang('shared:login_success'),
      devLogin: tokenCookie,
    };
    // req.locals.setCookie('_token', tokenCookie, {
    //   expireDays: 360,
    //   path: '/',
    //   httpOnly: false,
    //   secure: true,
    //   sameSite: 'none',
    // });
    ApiHelper.sendJson(req, res, response);
    return true;
  }

  // check is app admin
  const appAdminHookCheckLogin = adminApiHelper.getAppAdminHookCheckLogin();
  if (appAdminHookCheckLogin) {
    if (await appAdminHookCheckLogin(req, res, data.u as string, data.p as string)) {
      return true;
    }
  }

  logger.info(`dev admin login failed: ${((data.u as string) || '').substring(0, 30)}`);
  const response = {
    status: 'error',
    message: langHelper.getLang('shared:login_failed'),
  };
  ApiHelper.sendJson(req, res, response);
  return true;
};

export const devAdminLogout = async (req: ServerRequest, res: ServerResponse) => {
  req.locals.setCookie('_token_dev', '', { expireDays: 360, path: '/', httpOnly: false, secure: true, sameSite: 'none' });
  await adminApiHelper.getAppAdminHookLogout()?.(req, res);
  ApiHelper.sendJson(req, res, { status: 'ok', message: langHelper.getLang('shared:process_completed') });
  return true;
};
