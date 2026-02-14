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
} from 'lupine.components';
import { bindPressData, PressPage, pressThemes } from 'lupine.press';
import { markdownConfig } from './markdown-built/markdown-config';
import { ClientEnvKeys } from './client-env-keys';
import { baseCss } from './styles/base-css';

if (isFrontEnd() && webEnv(ClientEnvKeys.NODE_ENV, '') === 'development') {
  debugWatch(webEnv(ClientEnvKeys.API_PORT, 0));
}

bindLang('en', {});
bindTheme('light', pressThemes);
bindAppGlobalStyle('comm-css', baseCss, false, true);
setDefaultPageTitle('Lupine.js Doc');

bindPressData(markdownConfig);

const pageRouter = new PageRouter();
pageRouter.use('*', PressPage);

bindRouter(pageRouter);
