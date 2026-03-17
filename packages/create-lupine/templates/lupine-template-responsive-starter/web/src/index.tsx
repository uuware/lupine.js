// css order is important
import './styles/global.css';
import './styles/app.css';

import {
  bindRouter,
  bindGlobalStyle,
  debugWatch,
  isFrontEnd,
  PageRouter,
  webEnv,
  bindLang,
  bindTheme,
  setDefaultPageTitle,
} from 'lupine.components';
import { baseCss } from './styles/base-css';
import { themes } from './styles/theme';
import { AppResponsiveFrame } from './frames/app-responsive-frame';
import { HomePage } from './pages/home-page';
import { FinancePage } from './pages/finance-page';
import { AboutPage } from './pages/about-page';
import { MinePage } from './pages/mine-page';
import { ToolsPage } from './pages/tools-page';

bindLang('zh-cn', {});
bindTheme('light', themes);
bindGlobalStyle('comm-css', baseCss, false, true);
setDefaultPageTitle('Lupine.js Note Starter');

if (isFrontEnd() && webEnv('NODE_ENV', '') === 'development') {
  debugWatch(webEnv('API_PORT', 0));
}

const pageRouter = new PageRouter();
pageRouter.setFramePage({ component: AppResponsiveFrame, placeholderClassname: 'user-page-placeholder' });
pageRouter.use('/finance', FinancePage);
pageRouter.use('/about', AboutPage);
pageRouter.use('/mine', MinePage);
pageRouter.use('/tools', ToolsPage);
pageRouter.use('*', HomePage);

bindRouter(pageRouter);
