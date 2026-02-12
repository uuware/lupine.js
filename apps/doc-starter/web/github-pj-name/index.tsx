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
import { ClientEnvKeys } from '../src/client-env-keys';
import { baseCss } from '../src/styles/base-css';
import { markdownConfig } from '../src/markdown-built/markdown-config';

if (isFrontEnd() && webEnv(ClientEnvKeys.NODE_ENV, '') === 'development') {
  debugWatch(webEnv(ClientEnvKeys.API_PORT, 0));
}

bindLang('en', {});
bindTheme('light', pressThemes);
bindAppGlobalStyle('comm-css', baseCss, false, true);
setDefaultPageTitle('Doc Starter');

bindPressData(markdownConfig);
setPressSubDir('/github-pj-name');

const pageRouter = new PageRouter();
pageRouter.setSubDir('/github-pj-name');
pageRouter.use('*', PressPage);

bindRouter(pageRouter);
