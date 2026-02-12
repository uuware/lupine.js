import { CssProps } from '../jsx';
import { uniqueIdGenerator } from '../lib';
import { getCurrentTheme, themeCookieName } from './bind-theme';
import { camelToHyphens } from './camel-to-hyphens';
// import { bindPageResetEvent } from './page-reset-events';
import { bindPageLoadedEvent } from './page-loaded-event';

const wrapCss = (className: string, cssText: string, mediaQuery?: string) => {
  // if (!className) {
  //   console.warn(`No class name is provided for ${cssText}`);
  // }
  let cssTextWrap = className ? `${className}{${cssText}}` : cssText;
  if (mediaQuery) {
    cssTextWrap = `${mediaQuery}{${cssTextWrap}}`;
  }
  return cssTextWrap;
};

const processStyleValue = (style: CssProps) => {
  return Object.keys(style)
    .map((key) => key.trim())
    .map((key) => {
      const noOutput =
        (style[key] != null && typeof style[key] === 'object') ||
        typeof style[key] === 'undefined' ||
        style[key] === '';
      return noOutput ? '' : `${camelToHyphens(key)}:${style[key]};`;
    })
    .join('');
};

const updateOneBlock = (css: string[], cssTemp: string[], className: string, mediaQuery?: string) => {
  if (cssTemp.length > 0) {
    const cssText = wrapCss(className, cssTemp.join(''), mediaQuery);
    css.push(cssText);
    cssTemp.length = 0;
  }
};

const processStyleSub = (
  topUniqueClassName: string,
  classSelector: string,
  style: CssProps,
  mediaQuery?: string
): string[] => {
  const outClassName = classSelector
    .split(',')
    .map((key0) => key0.trim())
    .map((key0) => {
      return (key0.startsWith('&') ? `${classSelector}${key0.substring(1)}` : key0).replace(/&/g, topUniqueClassName);
    })
    .join(',');
  const css: string[] = [];
  const cssTemp: string[] = [];
  for (let i in style) {
    const value = style[i];
    if (value === null || typeof value !== 'object') {
      if (value !== '' && typeof value !== 'undefined') {
        if (!classSelector) {
          console.warn(`No className is defined for: ${camelToHyphens(i)}:${value};`);
        }
        cssTemp.push(`${camelToHyphens(i)}:${value};`);
      }
    } else {
      updateOneBlock(css, cssTemp, outClassName, mediaQuery);

      if (i.startsWith('@keyframes')) {
        const cssText = Object.keys(value)
          .map((stageKey) => stageKey + '{' + processStyleValue(value[stageKey] as CssProps) + '}')
          .join('');
        css.push(`${i}{${cssText}}`);
      } else if (i.startsWith('@media')) {
        const ret = processStyleSub(topUniqueClassName, classSelector, value, i);
        css.push(...ret);
      } else {
        // '&:hover, &.open': {
        //     '>.d1, .d2': {...},
        // }, ==>
        // &:hover >.d1, &:hover >.d2, &.open >.d1, &.open .d2

        // '.aa': {
        //     '&:hover': {...},
        //     '.bb': {...},
        // }, ==>
        // .aa:hover, .aa .bb
        const newClassSelector = !classSelector
          ? i
          : classSelector
              .split(',')
              .map((key0) => key0.trim())
              .map((key0) => {
                return i
                  .split(',')
                  .map((key) => key.trim())
                  .map((key) => {
                    // not needed to "+" as them share same parents?
                    // return key.split('+').map(key2 => key2.startsWith('&') ? key0 + key2.substring(1) : key0 + ' ' + key2).join('+');
                    // return key.startsWith('&') ? key0 + key.substring(1) : key0 + ' ' + key;
                    const newKey = key.startsWith('&') ? key0 + key.substring(1) : key0 + ' ' + key;
                    return newKey.replace(/&/g, topUniqueClassName);
                  })
                  .join(',');
              })
              .join(',');
        const ret = processStyleSub(topUniqueClassName, newClassSelector, value, mediaQuery);
        css.push(...ret);
      }
    }
  }
  updateOneBlock(css, cssTemp, outClassName, mediaQuery);
  return css;
};
// topUniqueClassName is used to replace '&' in className, and '.' + topUniqueClassName is used as selector in styles ".xxx {}"
export const processStyle = (topUniqueClassName: string, style: CssProps): string[] => {
  return processStyleSub(topUniqueClassName, topUniqueClassName ? `.${topUniqueClassName}` : '', style);
};

// mount-components has the same name `sty-`
export const updateStyles = (topUniqueClassName: string, style: CssProps) => {
  const el = topUniqueClassName && document.querySelector(`.${topUniqueClassName}`);
  if (el) {
    const cssText = processStyle(topUniqueClassName, style).join('');
    // if the first child is style, then update it
    if (el.firstChild && el.firstChild.nodeName === 'STYLE') {
      (el.firstChild as any).innerHTML = cssText;
    } else {
      const style = document.createElement('style');
      style.innerHTML = cssText;
      // style.id = `sty-${selector}`; // sty means style, this is different from mount-components.renderComponent
      el.prepend(style);
    }
  } else {
    console.warn(`Can't find "${topUniqueClassName}" to update styles.`);
  }
};

const updateCssDom = (uniqueStyleId: string, cssText: string, cssDom: HTMLElement | null) => {
  if (!cssDom) {
    cssDom = document.createElement('style');
    cssDom.id = `sty-${uniqueStyleId}`;
    document.head.appendChild(cssDom);
  }
  cssDom.innerText = cssText;
};

/*
If selectors in GlobalStyles have '&' at top level, then classSelector is needed, otherwise classSelector can be ''
This is ok:
{
  '.aa':{
    '&:hover': {...}
  }
}
This needs classSelector:
{
  'color': 'red', // will need and be put under .topUniqueClassName
  '&:hover': {...} // & will be replaced by .topUniqueClassName
}
Global styles including theme will not be updated once it's created.
topUniqueClassName is a className or a tag name.
classSelector is a selector used in styles ".xxx {}"
For example, it can be like this for all elements:
  html { ... } or :root { ... }

For themes like [data-theme="dark" i], the topUniqueClassName should be empty
*/
export const globalStyleUniqueId = /* @__PURE__ */ uniqueIdGenerator('g'); // g means global style
// const _globalStyleIds = new Map<CssProps, string>();
export const getGlobalStylesId = (style: CssProps): string => {
  if (!getRequestContext().globalStyleIds.has(style)) {
    const id = globalStyleUniqueId();
    getRequestContext().globalStyleIds.set(style, id);
  }
  return getRequestContext().globalStyleIds.get(style)!;
};

import { appData, getRequestContext } from './use-request-context';

// this is app common styles, for all sessions
export const bindAppGlobalStyle = (
  topUniqueClassName: string,
  style: CssProps,
  forceUpdate = false,
  noTopClassName = false
) => {
  if (typeof document !== 'undefined') {
    let cssDom = document.getElementById(`sty-${topUniqueClassName}`);
    if (forceUpdate || !cssDom) {
      updateCssDom(topUniqueClassName, processStyle(noTopClassName ? '' : topUniqueClassName, style).join(''), cssDom);
    }
  } else {
    const _globalStyle = appData.appGlobalStyles;
    if (!_globalStyle.has(topUniqueClassName) || forceUpdate) {
      // don't overwrite it to have the same behavior as in the Browser
      _globalStyle.set(topUniqueClassName, { topUniqueClassName, noTopClassName, style });
    }
  }
};

// this is for per session
export const bindGlobalStyle = (
  topUniqueClassName: string,
  style: CssProps,
  forceUpdate = false,
  noTopClassName = false
) => {
  if (typeof document !== 'undefined') {
    let cssDom = document.getElementById(`sty-${topUniqueClassName}`);
    if (forceUpdate || !cssDom) {
      updateCssDom(topUniqueClassName, processStyle(noTopClassName ? '' : topUniqueClassName, style).join(''), cssDom);
    }
  } else {
    const _globalStyle = getRequestContext().globalStyles;
    if (!_globalStyle.has(topUniqueClassName) || forceUpdate) {
      // don't overwrite it to have the same behavior as in the Browser
      _globalStyle.set(topUniqueClassName, { topUniqueClassName, noTopClassName, style });
    }
  }
};

const generateThemeStyles = () => {
  const currentTheme = getCurrentTheme();
  const themeCss = [];
  for (let themeName in currentTheme.themes) {
    // i is for case-insensitive
    themeCss.push(
      ...processStyle('', {
        [`[data-theme="${themeName}" i]`]: currentTheme.themes[themeName],
      })
    );
  }
  return themeCss.join('\n');
};

if (typeof document !== 'undefined') {
  // Update theme in Browser when no SSR
  bindPageLoadedEvent(() => {
    const uniqueStyleId = themeCookieName;
    let cssDom = document.getElementById(`sty-${uniqueStyleId}`);
    if (!cssDom) {
      updateCssDom(uniqueStyleId, generateThemeStyles(), cssDom);
    }
  });
}

// can't clear global styles，because in index.tsx it is only loaded once, clear it it will be gone
// const clearGlobalStyles = () => {
//   // reset unique id
//   getRequestContext().globalStyles.clear();
// };
// bindPageResetEvent(clearGlobalStyles);

export const generateAllGlobalStyles = () => {
  const result = [];

  result.push(`<style id="sty-${themeCookieName}">${generateThemeStyles()}</style>`);
  // app common styles first
  for (let [uniqueStyleId, { topUniqueClassName, noTopClassName, style }] of appData.appGlobalStyles) {
    const cssText = processStyle(noTopClassName ? '' : topUniqueClassName, style).join('');
    result.push(`<style id="sty-${uniqueStyleId}">${cssText}</style>`);
  }
  // per session styles
  for (let [uniqueStyleId, { topUniqueClassName, noTopClassName, style }] of getRequestContext().globalStyles) {
    const cssText = processStyle(noTopClassName ? '' : topUniqueClassName, style).join('');
    result.push(`<style id="sty-${uniqueStyleId}">${cssText}</style>`);
  }

  // clearGlobalStyles();
  return result.join('');
};
