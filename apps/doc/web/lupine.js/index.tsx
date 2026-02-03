import {
  bindRouter,
  PageRouter,
  bindTheme,
  bindLang,
  setDefaultPageTitle,
  isFrontEnd,
  debugWatch,
  webEnv,
  setDefaultMetaDescription,
  bindGlobalStyle,
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
bindGlobalStyle('comm-css', baseCss, false, true);
setDefaultPageTitle('LupineJS Doc');
setDefaultMetaDescription('LupineJS Doc');

bindPressData(markdownConfig);
setPressSubDir('/lupine.js');

const pageRouter = new PageRouter();
pageRouter.setSubDir('/lupine.js');
pageRouter.use('*', PressPage);

bindRouter(pageRouter);
