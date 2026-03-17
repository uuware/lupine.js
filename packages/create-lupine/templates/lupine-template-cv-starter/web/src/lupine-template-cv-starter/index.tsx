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
setDefaultPageTitle('Doc Starter');

bindPressData(markdownConfig);
setPressSubDir('/lupine-template-cv-starter');

const pageRouter = new PageRouter();
pageRouter.setSubDir('/lupine-template-cv-starter');
pageRouter.use('*', PressPage);

bindRouter(pageRouter);
