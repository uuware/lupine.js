import { setCookie } from '../lib/cookie';
import { isFrontEnd } from '../lib/is-frontend';
import { LangsProps } from '../models';
import { getEitherCookie } from './server-cookie';
import { appData, getRequestContext } from './use-request-context';

// The FE only loads one language for the consideration of the size

export const langCookieName = 'lang';
export const updateLangEventName = 'updateLang';
// const _langCfg: any = { defaultLang: defaultLangName, langs: {} };
// export type OneLangProps = { [key: string]: string };
export const bindLang = (defaultLang: string, langs: LangsProps) => {
  appData.defaultLang = defaultLang;
  appData.langs = langs;
};

export const getCurrentLang = () => {
  let langName = getEitherCookie(langCookieName) as string;
  if (!langName || !appData.langs[langName]) {
    langName = getRequestContext().langName || appData.defaultLang;
    // if getRequestContext().langName is set but hasn't been saved, then put it into cookie
    if (isFrontEnd() && getRequestContext().langName && getRequestContext().langName !== appData.defaultLang) {
      setCookie(langCookieName, getRequestContext().langName);
    }
  }
  return { langName, langs: appData.langs };
};

// the FE needs to reload the page when the language is changed
export const updateLang = (langName: string) => {
  // Lang is only updated in Browser
  getRequestContext().langName = langName;
  if (!isFrontEnd()) {
    return;
  }

  setCookie(langCookieName, langName);
  // document.documentElement.setAttribute(langAttributeName, langName);

  // // update lang for all iframe
  // const allIframe = document.querySelectorAll('iframe');
  // for (let i = 0; i < allIframe.length; i++) {
  //   if (allIframe[i].contentWindow && allIframe[i].contentWindow!.top === window) {
  //     allIframe[i].contentWindow!.document.documentElement.setAttribute(langAttributeName, langName);
  //   }
  // }

  const event = new CustomEvent(updateLangEventName, { detail: langName });
  window.dispatchEvent(event);
};
