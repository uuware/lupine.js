// css order is important
import '../styles/global.css';
import '../styles/app.css';

import { adminFrameHelper, devAdminPageRouter } from 'lupine.api/admin';
import {
  bindGlobalStyle,
  bindLang,
  bindRenderPageFunctions,
  bindRouter,
  bindTheme,
  debugWatch,
  isFrontEnd,
  PageProps,
  PageRouter,
  Redirect,
  setDefaultPageTitle,
  webEnv,
} from 'lupine.components';
import { themes } from '../styles/theme';
import { baseCss } from '../styles/base-css';
import { baseUrl, fetchData } from '../services/fetch-data';
import { patchAdminFrame } from './admin-patch';
import { setCookieUser } from '../services/shared-data';
import { ClientEnvKeys } from '../models/client-env-keys';

if (isFrontEnd() && webEnv(ClientEnvKeys.NODE_ENV, '') === 'development') {
  debugWatch(webEnv(ClientEnvKeys.API_PORT, 0));
}

export const checkDevAndAppAuth = async (props: PageProps) => {
  adminFrameHelper.setIsDevAdmin(false);
  if (typeof document === 'undefined') {
    // no ssr for admin pages
    return <div></div>;
  }

  // check dev admin
  const data = await props.renderPageFunctions.fetchData('/api/admin/auth');
  if (data && data.json && data.json.devLogin) {
    adminFrameHelper.setIsDevAdmin(true);
    return null;
  }
  if (data && data.json && data.json.appLogin && data.json.user) {
    setCookieUser(data.json.user || {});
    return null;
  }
  if (props.url !== '/admin_dev/login') {
    return Redirect({ url: '/admin_dev/login' });
  }
  return null;
};

bindLang('zh-cn', {});
bindTheme('light', themes);
bindGlobalStyle('comm-css', baseCss, false, true);
setDefaultPageTitle('Sample - Page Title');

bindRenderPageFunctions({ fetchData, baseUrl });

patchAdminFrame();
const pageRouter = new PageRouter();
// devadmin and appadmin can access
devAdminPageRouter.setFilter(checkDevAndAppAuth);
pageRouter.use('/admin_dev', devAdminPageRouter);
bindRouter(pageRouter);
