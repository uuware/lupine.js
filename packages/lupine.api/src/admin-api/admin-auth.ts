import { ServerResponse } from 'http';
import { Logger, ServerRequest, ApiHelper, CryptoUtils, langHelper } from 'lupine.api';
import { adminApiHelper, DEV_ADMIN_CRYPTO_KEY_NAME, DEV_ADMIN_TYPE, DevAdminSessionProps } from './admin-api-helper';
import crypto from 'crypto';

const logger = new Logger('admin-auth');

// Brute force protection: track failed login attempts per IP
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 10 * 60 * 1000; // 10 minutes
const failedAttempts = new Map<string, { count: number; lockedUntil: number }>();

// Debounced cleanup: triggered on login requests, last one wins
let cleanupTimer: ReturnType<typeof setTimeout> | null = null;
function scheduleCleanup() {
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

function isLockedOut(ip: string): boolean {
  const record = failedAttempts.get(ip);
  if (!record) return false;
  if (record.lockedUntil > Date.now()) return true;
  // Lockout expired, reset
  failedAttempts.delete(ip);
  return false;
}

function recordFailedAttempt(ip: string) {
  const record = failedAttempts.get(ip) || { count: 0, lockedUntil: 0 };
  record.count++;
  if (record.count >= MAX_FAILED_ATTEMPTS) {
    record.lockedUntil = Date.now() + LOCKOUT_DURATION_MS;
    logger.warn(`IP ${ip} locked out for 10 minutes after ${record.count} failed attempts`);
  }
  failedAttempts.set(ip, record);
}

function clearFailedAttempts(ip: string) {
  failedAttempts.delete(ip);
}

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

  const envUser = process.env['DEV_ADMIN_USER'] || '';
  const envPass = process.env['DEV_ADMIN_PASS'] || '';
  if (adminApiHelper.timingSafeEqual(data.u as string, envUser) && adminApiHelper.timingSafeEqual(data.p as string, envPass)) {
    clearFailedAttempts(clientIp);
    logger.info('dev admin logged in');
    const devSession: DevAdminSessionProps = {
      u: envUser,
      t: DEV_ADMIN_TYPE,
      ip: clientIp,
      h: CryptoUtils.hash(data.u + ':' + data.p),
    };
    const token = JSON.stringify(devSession);
    const tokenCookie = CryptoUtils.encrypt(token, cryptoKey);

    // if it's dev admin, then set app admin cookie as well
    let addLoginResponse = {};
    const appAdminHookSetCookie = adminApiHelper.getAppAdminHookSetCookie();
    if (appAdminHookSetCookie) {
      addLoginResponse = await appAdminHookSetCookie(req, res, envUser);
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
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: 'lax',
    // });
    ApiHelper.sendJson(req, res, response);
    return true;
  }

  // check is app admin
  const appAdminHookCheckLogin = adminApiHelper.getAppAdminHookCheckLogin();
  if (appAdminHookCheckLogin) {
    if (await appAdminHookCheckLogin(req, res, data.u as string, data.p as string)) {
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
  req.locals.setCookie('_token_dev', '', {
    expireDays: 0,
    path: '/',
    httpOnly: false,
    secure: true,
    sameSite: 'none',
  });
  await adminApiHelper.getAppAdminHookLogout()?.(req, res);
  ApiHelper.sendJson(req, res, { status: 'ok', message: langHelper.getLang('shared:process_completed') });
  return true;
};
