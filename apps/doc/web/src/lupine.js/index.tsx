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
  bindAppGlobalStyle,
  demoPageRouter,
} from 'lupine.components';
import { bindPressData, PressPage, pressThemes, setPressSubDir } from 'lupine.press';
import { ClientEnvKeys } from '../client-env-keys';
import { baseCss } from '../styles/base-css';
import { markdownConfig } from '../markdown-built/markdown-config';

if (isFrontEnd() && webEnv(ClientEnvKeys.NODE_ENV, '') === 'development') {
  debugWatch(webEnv(ClientEnvKeys.API_PORT, 0));
}

bindLang('en', {});
bindTheme('light', pressThemes);
bindAppGlobalStyle('comm-css', baseCss, false, true);
setDefaultPageTitle('Lupine.js Doc');

bindPressData(markdownConfig);
setPressSubDir('/lupine.js');

const pageRouter = new PageRouter();
pageRouter.setSubDir('/lupine.js');
pageRouter.use('/demo', demoPageRouter);
pageRouter.use('*', PressPage);

bindRouter(pageRouter);
