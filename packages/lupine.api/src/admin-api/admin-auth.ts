import { ServerResponse } from 'http';
import { Logger, ServerRequest, ApiHelper, CryptoUtils, langHelper } from 'lupine.api';
import {
  adminApiHelper,
  checkEnvNotSet,
  clearFailedAttempts,
  DEV_ADMIN_CRYPTO_KEY_NAME,
  DEV_ADMIN_PASS_KEY_NAME,
  DEV_ADMIN_SESSION_NAME,
  DEV_ADMIN_TYPE,
  DEV_ADMIN_USER_KEY_NAME,
  DevAdminSessionProps,
  isLockedOut,
  recordFailedAttempt,
  scheduleCleanup,
} from './admin-api-helper';

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
  scheduleCleanup();
  const clientIp = (req.socket.remoteAddress || 'unknown') as string;

  // Check brute force lockout
  if (isLockedOut(clientIp)) {
    const response = {
      status: 'error',
      message: langHelper.getLang('shared:too_many_attempts') || 'Too many failed attempts. Please try again later.',
    };
    ApiHelper.sendJson(req, res, response);
    return true;
  }

  if (checkEnvNotSet(req, res, DEV_ADMIN_PASS_KEY_NAME)) {
    return true;
  }
  if (checkEnvNotSet(req, res, DEV_ADMIN_CRYPTO_KEY_NAME)) {
    return true;
  }

  // TODO: secure and httpOnly cookies
  const cryptoKey = process.env[DEV_ADMIN_CRYPTO_KEY_NAME] as string;
  const data = req.locals.json();
  if (!data || Array.isArray(data) || !data.u || !data.p) {
    // if session already exists, use session data login
    const loginLevel = await adminApiHelper.getLoginLevel(req, res);
    if (!loginLevel.isLogin) {
      const response = {
        status: 'error',
        message: 'Please login to use this system.',
      };
      ApiHelper.sendJson(req, res, response);
      return true;
    }

    let addLoginResponse = {};
    if (loginLevel.isDevAdmin && loginLevel.devAdminSession) {
      const appAdminHookSetCookie = adminApiHelper.getAppAdminHookSetCookie();
      if (appAdminHookSetCookie) {
        addLoginResponse = await appAdminHookSetCookie(req, res);
      }
    }

    const response = {
      ...addLoginResponse,
      status: 'ok',
      message: langHelper.getLang('shared:login_success'),
      result: true,
      devLogin: loginLevel.isDevAdmin ? 1 : 0,
      appLogin: loginLevel.isAppLogin ? 1 : (addLoginResponse as any).appLogin,
      // devLogin: CryptoUtils.encrypt(JSON.stringify(loginLevel.devAdminSession), cryptoKey),
    };
    ApiHelper.sendJson(req, res, response);
    return true;
  }

  const envUser = process.env[DEV_ADMIN_USER_KEY_NAME] || '';
  const envPass = process.env[DEV_ADMIN_PASS_KEY_NAME] || '';
  const singleHash = CryptoUtils.sha256(data.p as string);
  const doubleHash = CryptoUtils.sha256(singleHash);
  if (
    adminApiHelper.timingSafeEqual(data.u as string, envUser) &&
    adminApiHelper.timingSafeEqual(doubleHash, envPass)
  ) {
    clearFailedAttempts(clientIp);
    logger.info('dev admin logged in');
    const devSession: DevAdminSessionProps = {
      u: envUser,
      t: DEV_ADMIN_TYPE,
      ip: clientIp,
      h: singleHash,
      l: Date.now(),
    };
    const token = JSON.stringify(devSession);
    const tokenCookie = CryptoUtils.encrypt(token, cryptoKey);
    // if it's dev admin, then set app admin cookie as well
    let addLoginResponse = {};
    const appAdminHookSetCookie = adminApiHelper.getAppAdminHookSetCookie();
    if (appAdminHookSetCookie) {
      addLoginResponse = await appAdminHookSetCookie(req, res);
    }
    const response = {
      ...addLoginResponse,
      status: 'ok',
      message: langHelper.getLang('shared:login_success'),
      result: true,
      devLogin: 1,
      // devLogin: tokenCookie,
    };
    req.locals.setCookie(DEV_ADMIN_SESSION_NAME, tokenCookie, {
      expireDays: 360,
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    });
    ApiHelper.sendJson(req, res, response);
    return true;
  }

  // check is app admin
  const appAdminHookCheckLogin = adminApiHelper.getAppAdminHookCheckLogin();
  if (appAdminHookCheckLogin) {
    if (await appAdminHookCheckLogin(req, res, data.u as string, data.p as string, true)) {
      clearFailedAttempts(clientIp);
      return true;
    }
  }

  recordFailedAttempt(clientIp);
  logger.info(`dev admin login failed: ${((data.u as string) || '').substring(0, 30)}`);
  const response = {
    status: 'error',
    message: langHelper.getLang('shared:login_failed'),
  };
  ApiHelper.sendJson(req, res, response);
  return true;
};

export const devAdminLogout = async (req: ServerRequest, res: ServerResponse) => {
  req.locals.setCookie(DEV_ADMIN_SESSION_NAME, '', {
    expireDays: 0,
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
  });
  await adminApiHelper.getAppAdminHookLogout()?.(req, res);
  ApiHelper.sendJson(req, res, { status: 'ok', message: langHelper.getLang('shared:process_completed') });
  return true;
};
