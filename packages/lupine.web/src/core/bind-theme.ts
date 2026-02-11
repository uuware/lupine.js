import { setCookie } from '../lib/cookie';
import { ThemesProps } from '../models';
import { isFrontEnd } from '../lib/is-frontend';
import { getEitherCookie } from './server-cookie';
import { appData, getRequestContext } from './use-request-context';

// theme name is stored per session, themes & defaultTheme are global to all sessions

export const themeCookieName = 'theme';
export const updateThemeEventName = 'updateTheme';
export const themeAttributeName = 'data-theme';
export const bindTheme = (defaultTheme: string, themes: ThemesProps) => {
  appData.defaultTheme = defaultTheme;
  appData.themes = themes;
};

export const getCurrentTheme = () => {
  let themeName = getEitherCookie(themeCookieName) as string;
  if (!themeName || !appData.themes[themeName]) {
    themeName = appData.defaultTheme;
    // if getRequestContext().themeName is set but hasn't been saved, then put it into cookie
    if (isFrontEnd() && getRequestContext().themeName && getRequestContext().themeName !== appData.defaultTheme) {
      setCookie(themeCookieName, getRequestContext().themeName);
    }
  }
  return { themeName, themes: appData.themes };
};

export const updateTheme = (themeName: string) => {
  getRequestContext().themeName = themeName;
  if (!isFrontEnd()) {
    return;
  }

  setCookie(themeCookieName, themeName);
  document.documentElement.setAttribute(themeAttributeName, themeName);

  // update theme for all iframe
  // TODO: third-party domains?
  const allIframe = document.querySelectorAll('iframe');
  for (let i = 0; i < allIframe.length; i++) {
    if (allIframe[i].contentWindow && allIframe[i].contentWindow!.top === window) {
      allIframe[i].contentWindow!.document.documentElement.setAttribute(themeAttributeName, themeName);
    }
  }

  const event = new CustomEvent(updateThemeEventName, { detail: themeName });
  window.dispatchEvent(event);
};
