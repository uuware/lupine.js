// css order is important
import '../styles/global.css';
import '../styles/app.css';

import {
  bindRouter,
  PageRouter,
  bindTheme,
  bindLang,
  setDefaultPageTitle,
  isFrontEnd,
  debugWatch,
  webEnv,
  bindGlobalStyle,
} from 'lupine.components';
import { themes } from '../styles/theme';
import { baseCss } from '../styles/base-css';
import { AppResponsiveFrame } from '../frames/app-responsive-frame';
import { HomePage } from '../pages/home-page';

if (isFrontEnd() && webEnv('NODE_ENV', '') === 'development') {
  debugWatch(webEnv('API_PORT', 0));
}

bindLang('zh-cn', {});
bindTheme('light', themes);
bindGlobalStyle('comm-css', baseCss, false, true);
setDefaultPageTitle('Lupine Template Responsive Starter');

const pageRouter = new PageRouter();
pageRouter.setFramePage({ component: AppResponsiveFrame, placeholderClassname: 'user-page-placeholder' });
pageRouter.setSubDir('/lupine-template-responsive-starter');
pageRouter.use('*', HomePage);

bindRouter(pageRouter);
