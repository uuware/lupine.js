import { WebConfig } from '../lib/web-config';
import { LangProps, LangsProps, SiteLangProps } from '../models';
import { appData } from './use-request-context';

// The FE only loads one language for the consideration of the size

export const langSettingKey = 'siteLangs';
// Lang here is for UI multiple lang support
export const bindLang = (langs: LangsProps) => {
  appData.langs = langs;
};

export const getCurrentLang = async (): Promise<LangProps> => {
  const defaultLang = await getDefaultSiteLang();
  return appData.langs[defaultLang] || {};
};

export const getCurrentLangText = async (key: string): Promise<string> => {
  return (await getCurrentLang())[key] || `${key} not found.`;
};

export const getSiteLangs = async (): Promise<SiteLangProps[]> => {
  // en:English,cn:Chinese,ja:Japanese
  if (!appData.siteLangs) {
    const siteLangs = await WebConfig.get(langSettingKey, '');
    if (siteLangs) {
      const langs = siteLangs.split(',');
      appData.siteLangs = langs.map((lang) => {
        const [code, text] = lang.split(':');
        return { code, text };
      });
    } else {
      appData.siteLangs = [{ code: 'en', text: 'English' }];
    }
  }
  return appData.siteLangs;
};

export const getDefaultSiteLang = async (): Promise<string> => {
  const siteLangs = await getSiteLangs();
  return siteLangs?.[0].code || 'en';
};

// // the FE needs to reload the page when the language is changed
// export const updateLang = (langName: string) => {
//   // Lang is only updated in Browser
//   getRequestContext().langName = langName;
//   if (!isFrontEnd()) {
//     return;
//   }

//   setCookie(langCookieName, langName);
//   // document.documentElement.setAttribute(langAttributeName, langName);

//   // // update lang for all iframe
//   // const allIframe = document.querySelectorAll('iframe');
//   // for (let i = 0; i < allIframe.length; i++) {
//   //   if (allIframe[i].contentWindow && allIframe[i].contentWindow!.top === window) {
//   //     allIframe[i].contentWindow!.document.documentElement.setAttribute(langAttributeName, langName);
//   //   }
//   // }

//   const event = new CustomEvent(updateLangEventName, { detail: langName });
//   window.dispatchEvent(event);
// };
