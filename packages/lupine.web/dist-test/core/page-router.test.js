"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/core/page-router.test.ts
var import_node_test = require("node:test");
var import_strict = __toESM(require("node:assert/strict"));

// src/lib/is-frontend.ts
var isFrontEnd = () => {
  return typeof window === "object" && typeof document === "object";
};

// src/core/replace-innerhtml.ts
var replaceInnerhtml = async (el, newHtml) => {
  const firstDom = el.firstChild;
  if (firstDom && firstDom.tagName === "STYLE") {
    firstDom.parentNode?.removeChild(firstDom);
  }
  await callUnload(el);
  el.innerHTML = newHtml;
  if (firstDom && firstDom.tagName === "STYLE") {
    el.insertBefore(firstDom, el.firstChild);
  }
};
var callUnload = async (el) => {
  const promises = [];
  el.querySelectorAll("[data-ref]").forEach((child) => {
    if (child._lj && child._lj.onUnload) {
      promises.push(child._lj.onUnload());
    }
  });
  await Promise.all(promises);
};

// src/core/bind-ref.ts
var bindRef = (type, newProps, el, mounters) => {
  const id = newProps._id;
  el._lj = el._lj || {};
  el._lj.ref = newProps["ref"];
  newProps["ref"].current = el;
  if (newProps["ref"].onLoad) {
    const defer = Promise.prototype.then.bind(Promise.resolve());
    defer(() => newProps["ref"].onLoad(el));
  }
  if (newProps["ref"].onUnload) {
    el._lj.onUnload = async () => {
      await newProps["ref"].onUnload(el);
    };
  }
  newProps["ref"].$ = (selector) => {
    if (newProps["ref"].globalCssId) {
      const gId = newProps["ref"].globalCssId;
      if (selector.startsWith("&")) {
        return el.querySelector(`.${gId}${selector.substring(1).replace(/&/g, gId)}`);
      }
      return el.querySelector(`.${gId} ${selector.replace(/&/g, gId)}`);
    }
    if (selector.startsWith("&")) {
      return el.querySelector(`.${id}${selector.substring(1).replace(/&/g, id)}`);
    }
    return el.querySelector(`.${id} ${selector.replace(/&/g, id)}`);
  };
  newProps["ref"].$all = (selector) => {
    if (newProps["ref"].globalCssId) {
      const gId = newProps["ref"].globalCssId;
      if (selector.startsWith("&")) {
        return el.querySelectorAll(`.${gId}${selector.substring(1).replace(/&/g, gId)}`);
      }
      return el.querySelectorAll(`.${gId} ${selector.replace(/&/g, gId)}`);
    }
    if (selector.startsWith("&")) {
      return el.querySelectorAll(`.${id}${selector.substring(1).replace(/&/g, id)}`);
    }
    return el.querySelectorAll(`.${id} ${selector.replace(/&/g, id)}`);
  };
  newProps["ref"].mountInnerComponent = async (content) => {
    if (typeof content === "object" && content.type && content.props) {
      mounters.mountInnerComponent && await mounters.mountInnerComponent(el, content);
    } else {
      await replaceInnerhtml(el, content);
    }
  };
  newProps["ref"].mountOuterComponent = async (content) => {
    mounters.mountOuterComponent && await mounters.mountOuterComponent(el, content);
  };
  if (!newProps["ref"].refresh) {
    newProps["ref"].refresh = async () => {
      console.warn("refresh() not available: This ref is not attached to a functional component root.");
    };
  }
};

// src/core/bind-attributes.ts
var bindAttributesChildren = (topEl, children, mounters) => {
  for (let i = 0; i < children.length; i++) {
    const item = children[i];
    if (item && item.type && item.props) {
      bindAttributes(topEl, item.type, item.props, mounters);
    } else if (item && Array.isArray(item)) {
      bindAttributesChildren(topEl, item, mounters);
    } else if (typeof item !== "undefined" && item !== null && typeof item !== "string" && typeof item !== "number" && typeof item !== "boolean") {
      console.warn(`Unexpected children:`, item);
    }
  }
};
var bindAttributes = (topEl, type, props, mounters) => {
  const newProps = props._result && props._result.props || props;
  if (newProps._id) {
    let el = topEl.querySelector(`[${newProps._id}]`);
    if (!el && topEl.getAttribute(newProps._id) === "") {
      el = topEl;
    }
    if (el) {
      for (let i in newProps) {
        if (i === "ref") {
          bindRef(type, newProps, el, mounters);
        } else if (i[0] === "o" && i[1] === "n") {
          let name = i;
          if (name.toLowerCase() in el) name = name.toLowerCase().slice(2);
          else name = name.slice(2);
          el.addEventListener(name, newProps[i]);
        }
      }
    }
  }
  if (newProps.children && Array.isArray(newProps.children)) {
    bindAttributesChildren(topEl, newProps.children, mounters);
  } else if (newProps._result && newProps._result.type !== "Fragment" && newProps._result.props) {
    bindAttributes(topEl, newProps._result.type, newProps._result.props, mounters);
  } else if (newProps.children && newProps.children.type && newProps.children.props) {
    bindAttributes(topEl, newProps.children.type, newProps.children.props, mounters);
  } else if (!newProps.children || typeof newProps.children === "string" || typeof newProps.children === "number" || typeof newProps.children === "boolean") {
  } else {
    console.warn(`Unexpected children:`, newProps.children, type, props);
  }
};

// src/lib/unique-id.ts
function uniqueIdGenerator(preKey) {
  let count = 0;
  let baseTime = 0;
  let lastKey = "";
  return function(reset = false) {
    if (reset) {
      count = 0;
      baseTime = 0;
      lastKey = "";
      return "";
    }
    if (baseTime === 0) {
      baseTime = Math.round(Date.now() / 1e3);
    }
    const key = Math.round(Date.now() / 1e3 - baseTime).toString(36);
    if (key !== lastKey) {
      count = 0;
      lastKey = key;
    } else {
      count++;
    }
    return `${preKey}${lastKey}${count.toString(36)}`;
  };
}

// src/lib/cookie.ts
var setCookie = (name, value, expireDays = 365, path, domain, secure) => {
  const expires = new Date((/* @__PURE__ */ new Date()).getTime() + expireDays * 24 * 36e5);
  document.cookie = name + "=" + escape(value) + ";expires=" + expires.toUTCString() + ";path=" + (path ? path : "/") + (domain ? ";domain=" + domain : "") + (secure ? ";secure" : "");
};
var getCookie = (key) => {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const c = cookies[i].trim();
    if (c.substring(0, key.length + 1) == key + "=") {
      return unescape(c.substring(key.length + 1));
    }
  }
  return null;
};

// src/core/server-cookie.ts
var getEitherCookie = (name) => {
  if (!isFrontEnd()) {
    return getServerCookie(name);
  } else {
    return getCookie(name);
  }
};
var _serverCookies;
var getServerCookie = (name) => {
  return _serverCookies && _serverCookies.get(name, "");
};
var initServerCookies = (serverCookies) => {
  return _serverCookies = serverCookies;
};

// src/core/use-request-context.ts
var defaultLang = "en";
var defaultTheme = "light";
var appData = {
  defaultPageTitle: "",
  defaultLang,
  langs: {},
  defaultTheme,
  themes: {},
  appGlobalStyles: /* @__PURE__ */ new Map()
  // setDataEvent: null,
};
var _contextGetter;
var bindRequestContext = (getter) => {
  _contextGetter = getter;
};
var getRequestContext = () => {
  let ctx;
  if (!_contextGetter || !(ctx = _contextGetter())) {
    throw new Error("Request context is not initialized");
  }
  return ctx;
};

// src/core/bind-theme.ts
var themeCookieName = "theme";
var updateThemeEventName = "updateTheme";
var themeAttributeName = "data-theme";
var getCurrentTheme = () => {
  let themeName = getEitherCookie(themeCookieName);
  if (!themeName || !appData.themes[themeName]) {
    themeName = appData.defaultTheme;
    if (isFrontEnd() && getRequestContext().themeName && getRequestContext().themeName !== appData.defaultTheme) {
      setCookie(themeCookieName, getRequestContext().themeName);
    }
  }
  return { themeName, themes: appData.themes };
};
var updateTheme = (themeName) => {
  getRequestContext().themeName = themeName;
  if (!isFrontEnd()) {
    return;
  }
  setCookie(themeCookieName, themeName);
  document.documentElement.setAttribute(themeAttributeName, themeName);
  const allIframe = document.querySelectorAll("iframe");
  for (let i = 0; i < allIframe.length; i++) {
    if (allIframe[i].contentWindow && allIframe[i].contentWindow.top === window) {
      allIframe[i].contentWindow.document.documentElement.setAttribute(themeAttributeName, themeName);
    }
  }
  const event = new CustomEvent(updateThemeEventName, { detail: themeName });
  window.dispatchEvent(event);
};

// src/core/camel-to-hyphens.ts
var camelToHyphens = function(name) {
  return name.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
};

// src/core/page-loaded-event.ts
var _pageLoadedEvents = [];
var callPageLoadedEvent = () => {
  _pageLoadedEvents.forEach((i) => {
    try {
      i();
    } catch (e) {
      console.error(e);
    }
  });
};
var bindPageLoadedEvent = (fn) => {
  if (typeof document === "undefined") {
    throw new Error("bindPageLoadedEvent can only be called in the browser");
  }
  _pageLoadedEvents.push(fn);
};

// src/core/bind-styles.ts
var wrapCss = (className, cssText, mediaQuery) => {
  let cssTextWrap = className ? `${className}{${cssText}}` : cssText;
  if (mediaQuery) {
    cssTextWrap = `${mediaQuery}{${cssTextWrap}}`;
  }
  return cssTextWrap;
};
var processStyleValue = (style) => {
  return Object.keys(style).map((key) => key.trim()).map((key) => {
    const noOutput = style[key] === null || typeof style[key] === "undefined" || style[key] === "" || typeof style[key] === "object";
    return noOutput ? "" : `${camelToHyphens(key)}:${style[key]};`;
  }).join("");
};
var updateOneBlock = (css, cssTemp, className, mediaQuery) => {
  if (cssTemp.length > 0) {
    const cssText = wrapCss(className, cssTemp.join(""), mediaQuery);
    css.push(cssText);
    cssTemp.length = 0;
  }
};
var processStyleSub = (topUniqueClassName, classSelector, style, mediaQuery) => {
  const outClassName = classSelector.split(",").map((key0) => key0.trim()).map((key0) => {
    return (key0.startsWith("&") ? `${classSelector}${key0.substring(1)}` : key0).replace(/&/g, topUniqueClassName);
  }).join(",");
  const css = [];
  const cssTemp = [];
  for (let i in style) {
    const value = style[i];
    if (value === null || typeof value !== "object") {
      if (value !== "" && value !== null && typeof value !== "undefined") {
        if (!classSelector) {
          console.warn(`No className is defined for: ${camelToHyphens(i)}:${value};`);
        }
        cssTemp.push(`${camelToHyphens(i)}:${value};`);
      }
    } else {
      updateOneBlock(css, cssTemp, outClassName, mediaQuery);
      if (i.startsWith("@keyframes")) {
        const cssText = Object.keys(value).map((stageKey) => stageKey + "{" + processStyleValue(value[stageKey]) + "}").join("");
        css.push(`${i}{${cssText}}`);
      } else if (i.startsWith("@media")) {
        const ret = processStyleSub(topUniqueClassName, classSelector, value, i);
        css.push(...ret);
      } else {
        const newClassSelector = !classSelector ? i : classSelector.split(",").map((key0) => key0.trim()).map((key0) => {
          return i.split(",").map((key) => key.trim()).map((key) => {
            const newKey = key.startsWith("&") ? key0 + key.substring(1) : key0 + " " + key;
            return newKey.replace(/&/g, topUniqueClassName);
          }).join(",");
        }).join(",");
        const ret = processStyleSub(topUniqueClassName, newClassSelector, value, mediaQuery);
        css.push(...ret);
      }
    }
  }
  updateOneBlock(css, cssTemp, outClassName, mediaQuery);
  return css;
};
var processStyle = (topUniqueClassName, style) => {
  return processStyleSub(topUniqueClassName, topUniqueClassName ? `.${topUniqueClassName}` : "", style);
};
var updateCssDom = (uniqueStyleId, cssText, cssDom) => {
  if (!cssDom) {
    cssDom = document.createElement("style");
    cssDom.id = `sty-${uniqueStyleId}`;
    document.head.appendChild(cssDom);
  }
  cssDom.innerText = cssText;
};
var generateThemeStyles = () => {
  const currentTheme = getCurrentTheme();
  const themeCss = [];
  for (let themeName in currentTheme.themes) {
    themeCss.push(
      ...processStyle("", {
        [`[data-theme="${themeName}" i]`]: currentTheme.themes[themeName]
      })
    );
  }
  return themeCss.join("\n");
};
if (typeof document !== "undefined") {
  bindPageLoadedEvent(() => {
    const uniqueStyleId = themeCookieName;
    let cssDom = document.getElementById(`sty-${uniqueStyleId}`);
    if (!cssDom) {
      updateCssDom(uniqueStyleId, generateThemeStyles(), cssDom);
    }
  });
}
var generateAllGlobalStyles = () => {
  const result = [];
  result.push(`<style id="sty-${themeCookieName}">${generateThemeStyles()}</style>`);
  for (let [uniqueStyleId, { topUniqueClassName, noTopClassName, style }] of appData.appGlobalStyles) {
    const cssText = processStyle(noTopClassName ? "" : topUniqueClassName, style).join("");
    result.push(`<style id="sty-${uniqueStyleId}">${cssText}</style>`);
  }
  for (let [uniqueStyleId, { topUniqueClassName, noTopClassName, style }] of getRequestContext().globalStyles) {
    const cssText = processStyle(noTopClassName ? "" : topUniqueClassName, style).join("");
    result.push(`<style id="sty-${uniqueStyleId}">${cssText}</style>`);
  }
  return result.join("");
};

// src/core/use-state.ts
var ComponentStateStore = class {
  constructor(componentFn, componentProps) {
    this.states = [];
    this.hookIndex = 0;
    /** The internal ref that tracks the component's root DOM element */
    this.domRef = {};
    /** Prevent concurrent rerenders from stacking */
    this.isDirty = false;
    /** True after the root element has been mounted for the first time */
    this._mounted = false;
    this.componentFn = componentFn;
    this.componentProps = componentProps;
  }
  async rerender() {
    if (!this.domRef.current) return;
    const el = this.domRef.current;
    const newVNode = await evaluateComponentWithStore(this);
    await mountOuterComponent(el, newVNode);
  }
};
var _currentStore = null;
var setCurrentStore = (store) => {
  _currentStore = store;
};
var clearCurrentStore = () => {
  _currentStore = null;
};
var buildStateRef = (store, existingRef) => {
  const target = existingRef ?? {};
  if (!store._mounted) {
    store._userOnLoad = existingRef?.onLoad ?? null;
    store._userOnUnload = existingRef?.onUnload ?? null;
  }
  if (existingRef?.globalCssId) {
    target.globalCssId = existingRef.globalCssId;
  }
  target.onLoad = async (el) => {
    store.domRef.current = el;
    if (!store._mounted) {
      store._mounted = true;
      if (store._userOnLoad) {
        await store._userOnLoad(el);
      }
    }
  };
  if (store._userOnUnload) {
    target.onUnload = async (el) => {
      await store._userOnUnload(el);
    };
  }
  target.refresh = async () => {
    store.domRef.current = target.current;
    await store.rerender();
  };
  return target;
};
async function evaluateComponentWithStore(store) {
  store.hookIndex = 0;
  setCurrentStore(store);
  const resultMaybePromise = store.componentFn.call(null, store.componentProps);
  clearCurrentStore();
  let dom = null;
  if (resultMaybePromise && typeof resultMaybePromise === "object" && "then" in resultMaybePromise && typeof resultMaybePromise.then === "function") {
    dom = await resultMaybePromise;
  } else {
    dom = resultMaybePromise;
  }
  if (dom && typeof dom === "object" && !Array.isArray(dom)) {
    if (!dom.props) dom.props = {};
    if (store.hookIndex > 0 || dom.props.ref) {
      dom.props.ref = buildStateRef(store, dom.props.ref);
    }
  }
  return dom;
}

// src/core/render-attribute.ts
var domUniqueId = uniqueIdGenerator("l");
var genUniqueId = (props) => {
  if (!props._id) {
    props._id = domUniqueId();
  }
  return props._id;
};
var renderAttribute = (type, props, jsxNodes, uniqueClassName, globalCssId) => {
  const html = [];
  for (let i in props) {
    if (i === "ref") {
      if (props[i]) {
        props[i].id = genUniqueId(props);
        html.push("data-ref");
      }
    } else if (!["children", "key", "_result", "_html", "_id"].includes(i)) {
      if (i === "style") {
        if (typeof props[i] === "object") {
          let attrs = `${i}="`;
          for (let j in props[i]) {
            attrs += `${camelToHyphens(j)}:${props[i][j]};`;
          }
          attrs += `"`;
          html.push(attrs);
        } else {
          html.push(`${i}="${props[i]}"`);
        }
      } else if (i === "css") {
        genUniqueId(props);
      } else if (i[0] === "o" && i[1] === "n") {
        genUniqueId(props);
      } else if (i === "defaultChecked") {
        if (props[i] === true || props[i] === "checked") {
          html.push(`checked="true"`);
        }
      } else if (i === "readonly" || i === "disabled" || i === "selected" || i === "checked") {
        if (props[i] !== void 0 && props[i] !== false && props[i] !== "false") {
          html.push(`${i}="${props[i]}"`);
        }
      } else if (i === "class" || i === "className") {
        let classNameList = props[i].split(" ").filter((item) => item && item !== "");
        if ((props["css"] || props["ref"]) && !classNameList.includes(props._id)) {
          classNameList.unshift(props._id);
        }
        if (props["ref"] && props["ref"].globalCssId && !classNameList.includes(props["ref"].globalCssId)) {
          classNameList.unshift(props["ref"].globalCssId);
        }
        if (globalCssId && uniqueClassName) {
          classNameList = classNameList.flatMap((item) => {
            if (item.includes("&")) {
              return [item.replace(/&/g, globalCssId), item.replace(/&/g, uniqueClassName)];
            }
            return [item];
          });
        } else if (globalCssId) {
          classNameList = classNameList.map((item) => item.replace(/&/g, globalCssId));
        } else if (uniqueClassName) {
          classNameList = classNameList.map((item) => item.replace(/&/g, uniqueClassName));
        }
        html.push(`class="${classNameList.join(" ")}"`);
      } else if (i !== "dangerouslySetInnerHTML") {
        html.push(`${i}="${props[i]}"`);
      }
    }
  }
  if (props._id) {
    html.push(props._id);
  }
  return html.join(" ");
};

// src/core/render-component.ts
var selfClosingTags = [
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
];
var _yieldCounter = 0;
var YIELD_THRESHOLD = 50;
async function renderChildrenAsync(html, children, uniqueClassName, globalCssId) {
  if (typeof children === "string") {
    html.push(children);
  } else if (children === false || children === null || typeof children === "undefined") {
  } else if (typeof children === "number" || typeof children === "boolean") {
    html.push(children.toString());
  } else if (Array.isArray(children)) {
    for (const item of children) {
      await renderChildrenAsync(html, item, uniqueClassName, globalCssId);
    }
  } else if (children.type && children.props) {
    await renderComponentAsync(children.type, children.props, uniqueClassName, globalCssId);
    html.push(...children.props._html);
    children.props._html.length = 0;
  } else {
    console.warn("Unexpected", children);
  }
}
var renderComponentAsync = async (type, props, uniqueClassName, globalCssId) => {
  _yieldCounter++;
  if (_yieldCounter >= YIELD_THRESHOLD) {
    _yieldCounter = 0;
    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });
  }
  if (Array.isArray(props)) {
    const jsxNodes = { type: "Fragment", props: { children: props } };
    await renderComponentAsync(jsxNodes.type, jsxNodes.props, uniqueClassName, globalCssId);
    return;
  }
  props._html = [];
  if (typeof type === "function") {
    const store = new ComponentStateStore(type, props);
    props._result = await evaluateComponentWithStore(store);
    if (props._result === null || props._result === void 0 || props._result === false) {
      props._result = { type: "Fragment", props };
    }
    if (typeof props._result.type === "function") {
      await renderComponentAsync(props._result.type, props._result.props, uniqueClassName, globalCssId);
      if (props._result.props._html) {
        props._html.push(...props._result.props._html);
        props._result.props._html.length = 0;
      }
      return;
    }
  }
  const newType = props._result && props._result.type || type;
  const newProps = props._result && props._result.props || props;
  if (typeof newType === "string") {
    let newUniqueClassName = uniqueClassName;
    if (newProps["css"] || newProps["ref"]) {
      newUniqueClassName = genUniqueId(newProps);
      if (!newProps["class"] && !newProps["className"]) newProps["class"] = newUniqueClassName;
    }
    let newGlobalCssId = globalCssId;
    if (newProps["ref"] && newProps["ref"].globalCssId) newGlobalCssId = newProps["ref"].globalCssId;
    const attrs = renderAttribute(newType, newProps, { type, props }, newUniqueClassName, newGlobalCssId);
    if (selfClosingTags.includes(newType.toLowerCase())) {
      if (newType !== "Fragment" || newProps.ref) {
        props._html.push(`<${newType}${attrs ? " " : ""}${attrs} />`);
      }
    } else {
      if (newType !== "Fragment" || newProps.ref) {
        props._html.push(`<${newType}${attrs ? " " : ""}${attrs}>`);
      }
      if (newProps["css"]) {
        const realCssId = newProps["ref"]?.globalCssId || newUniqueClassName;
        const cssText = processStyle(realCssId, newProps["css"]).join("");
        props._html.push(`<style id="sty-${newUniqueClassName}">${cssText}</style>`);
      }
      if (newProps.children || newProps.children === 0) {
        await renderChildrenAsync(props._html, newProps.children, newUniqueClassName, newGlobalCssId);
      } else if (newProps["dangerouslySetInnerHTML"]) {
        props._html.push(newProps["dangerouslySetInnerHTML"]);
      }
      if (newType !== "Fragment" || newProps.ref) {
        props._html.push(`</${newType}>`);
      }
    }
  } else if (newType.name === "Fragment") {
    await renderChildrenAsync(props._html, newProps.children, uniqueClassName, globalCssId);
  } else {
    console.warn("Unknown type: ", type, props, newType, newProps);
  }
};

// src/core/bind-meta.tsx
var getPageTitle = () => {
  return getRequestContext().pageTitle || appData.defaultPageTitle;
};
var getMetaDataTags = () => {
  return Object.values(getMetaDataObject()).join("\n");
};
var getMetaDataObject = () => {
  return getRequestContext().metaData;
};

// src/lib/web-env.ts
var _webEnv = {};
var _webEnvInitialized = false;
function initWebEnv(webEnv) {
  Object.assign(_webEnv, webEnv);
  _webEnvInitialized = true;
}

// src/lib/web-config.ts
var WebConfig = class _WebConfig {
  static {
    this.webConfigApi = "";
  }
  static {
    this.initialized = false;
  }
  static {
    this.cfg = {};
  }
  // called from generatePage (SSR)
  static initFromData(cfg) {
    this.initialized = true;
    this.cfg = cfg;
  }
  static async init(force) {
    if (this.initialized && !force) {
      return;
    }
    this.initialized = true;
    if (typeof document === "object" && !force) {
      const json = document.querySelector("#web-setting")?.textContent;
      if (json) {
        this.cfg = JSON.parse(json);
        return;
      }
    }
    if (!this.webConfigApi) {
      console.error("WebConfig webConfigApi is not set");
      return;
    }
    const url = getRenderPageProps().renderPageFunctions.baseUrl(this.webConfigApi);
    const data = await getRenderPageProps().renderPageFunctions.fetchData(url);
    if (data && data.json && data.json.status === "ok") {
      this.cfg = data.json.result;
    } else {
      console.error(data?.json?.message || "Failed to get web config");
    }
  }
  static async get(key, defaultValue) {
    await _WebConfig.init();
    const v = _WebConfig.cfg[key];
    if (typeof v === "undefined") {
      return defaultValue;
    }
    if (typeof defaultValue === "number") {
      return Number.parseInt(v);
    }
    if (typeof defaultValue === "boolean") {
      return v.toLocaleLowerCase() === "true" || v === "1";
    }
    if (typeof defaultValue === "object") {
      if (typeof v === "object") {
        return v;
      }
      try {
        return JSON.parse(v);
      } catch (error) {
        console.error(`WebConfig JSON.parse error: `, error);
      }
      return defaultValue;
    }
    return v || defaultValue;
  }
};

// src/core/lupine-instance.ts
var _lupineJs = {};

// src/core/initialize.ts
var renderTargetPage = async (props, renderPartPage) => {
  if (typeof _lupineJs.router !== "function") {
    return _lupineJs.router.handleRoute(props.url, props, renderPartPage);
  }
  return await _lupineJs.router(props);
};
var generatePage = async (props, toClientDelivery) => {
  setRenderPageProps(props);
  bindRequestContext(() => toClientDelivery.getRequestContext());
  initWebEnv(toClientDelivery.getWebEnv());
  WebConfig.initFromData(toClientDelivery.getWebSetting());
  initServerCookies(toClientDelivery.getServerCookie());
  callPageLoadedEvent();
  const jsxNodes = await renderTargetPage(props, false);
  if (!jsxNodes || !jsxNodes.props) {
    return {
      content: `Unexpected url: ${props.url}`,
      title: "",
      metaData: "",
      globalCss: "",
      themeName: getCurrentTheme().themeName
    };
  }
  await renderComponentAsync(jsxNodes.type, jsxNodes.props);
  const currentTheme = getCurrentTheme();
  const cssText = generateAllGlobalStyles();
  const content = jsxNodes.props._html.join("");
  return {
    content,
    title: getPageTitle(),
    metaData: getMetaDataTags(),
    globalCss: cssText,
    themeName: currentTheme.themeName
  };
};
_lupineJs.generatePage = generatePage;
var _initSaved = {
  pageInitialized: false,
  appInitialized: false
};
var initializePage = async (newUrl) => {
  const defaultContext = {
    pageTitle: "",
    metaData: {},
    themeName: "",
    langName: "",
    globalStyles: /* @__PURE__ */ new Map(),
    globalStyleIds: /* @__PURE__ */ new Map(),
    coreData: {},
    // for core development
    devData: {}
    // for secondary development
  };
  bindRequestContext(() => defaultContext);
  const currentPageInitialized = _initSaved.pageInitialized;
  _initSaved.pageInitialized = true;
  console.log("initializePage: ", newUrl);
  if (newUrl) {
    window.history.pushState({ urlPath: newUrl }, "", newUrl);
  }
  const splitUrl = newUrl ? newUrl.split("?") : [];
  const url = splitUrl[0] || document.location.pathname;
  const queryString = splitUrl[1] || document.location.search;
  const props = {
    url,
    // urlSections: url.split('/').filter((i) => !!i),
    query: Object.fromEntries(new URLSearchParams(queryString)),
    // new URLSearchParams(queryString),
    urlParameters: {},
    renderPageFunctions: _lupineJs.renderPageFunctions
  };
  setRenderPageProps(props);
  !currentPageInitialized && callPageLoadedEvent();
  const jsxNodes = await renderTargetPage(props, currentPageInitialized);
  if (jsxNodes === null) return;
  if (!jsxNodes || !jsxNodes.props) {
    document.querySelector(".lupine-root").innerHTML = `Error happened or unexpected url: ${url}`;
    return;
  }
  await mountInnerComponent(".lupine-root", jsxNodes);
  updateTheme(getCurrentTheme().themeName);
  document.title = getPageTitle();
  const metaData = getMetaDataObject();
};
_lupineJs.initializePage = initializePage;

// src/core/export-lupine.ts
var setRenderPageProps = (props) => {
  _lupineJs.renderPageProps = props;
};
var getRenderPageProps = () => {
  return _lupineJs.renderPageProps;
};

// src/core/bind-links.ts
function bindLinks(el) {
  const links = el.getElementsByTagName("a");
  for (var i = 0, l = links.length; i < l; i++) {
    let originalHref = links[i].getAttribute("href");
    if (!originalHref || originalHref.startsWith("javascript:")) continue;
    if (originalHref.startsWith("#")) {
      links[i].onclick = () => {
        const id = decodeURIComponent(originalHref.substring(1));
        document.getElementById(id)?.scrollIntoView(true);
        return false;
      };
      continue;
    }
    let href = new URL(links[i].href, document.baseURI).href;
    if (links[i].target !== "_blank" && href.startsWith(document.location.origin)) {
      href = href.substring(document.location.origin.length);
      links[i].onclick = () => {
        _lupineJs.initializePage(href);
        return false;
      };
    }
  }
}

// src/core/mount-component.ts
var mountInnerComponent = async (selector, jsxNodes) => {
  await renderComponentAsync(jsxNodes.type, jsxNodes.props);
  const el = selector && (typeof selector === "string" ? document.querySelector(selector) : selector);
  if (el) {
    await replaceInnerhtml(el, jsxNodes.props._html.join(""));
    bindAttributes(el, jsxNodes.type, jsxNodes.props, { mountInnerComponent, mountOuterComponent });
    bindLinks(el);
  }
};
var mountOuterComponent = async (selector, jsxNodes) => {
  await renderComponentAsync(jsxNodes.type, jsxNodes.props);
  let el = selector && (typeof selector === "string" ? document.querySelector(selector) : selector);
  if (el) {
    const template = document.createElement("template");
    await replaceInnerhtml(template, jsxNodes.props._html.join(""));
    template.content.children.length > 1 && console.error("renderComponent should only have one element: ", template.content.children.length);
    const newEl = template.content.firstChild;
    await callUnload(el);
    el.parentNode?.replaceChild(newEl, el);
    bindAttributes(newEl, jsxNodes.type, jsxNodes.props, { mountInnerComponent, mountOuterComponent });
    bindLinks(newEl);
  }
};

// src/core/page-router.ts
var PageRouter = class {
  constructor() {
    this.routerData = [];
    this.subDir = "";
  }
  // if the filter returns null (passed filter), the router will continue.
  // it works in the same way as in use method
  setFilter(filter) {
    this.filter = filter;
  }
  // if the script is under a sub-dir (without last /), then findRoute needs to remove it from the url
  setSubDir(subDir) {
    this.subDir = subDir;
  }
  setFramePage(framePage) {
    this.framePage = framePage;
  }
  // The path should start with / and end without /, and it can be
  //    /aaa/:bbb/ccc/:ddd (ccc is a fixed section)
  //    /aaa/:bbb/ccc/?ddd/?eee (from ddd, all sections are optional)
  //    /aaa/?bbb/ccc/ (from bbb, all sections are optional)
  // The value can be accessed in a page as props.urlParameters['bbb']
  storeRouter(path, handler) {
    let fixedPath;
    if (path === "*" || path === "" || path === "/*") {
      fixedPath = "*";
    } else {
      fixedPath = path;
      if (!fixedPath.startsWith("/")) {
        fixedPath = "/" + fixedPath;
      }
      if (fixedPath.endsWith("/") && fixedPath.length > 1) {
        fixedPath = fixedPath.substring(0, fixedPath.length - 1);
      }
    }
    let parameterLength = 0;
    let parameterVariables = [];
    const ind = fixedPath.indexOf("/:");
    if (ind >= 0) {
      parameterVariables = fixedPath.substring(ind + 1).split("/");
      fixedPath = fixedPath.substring(0, ind);
      const optionInd = parameterVariables.findIndex((item) => item.startsWith("?"));
      parameterLength = optionInd >= 0 ? optionInd : parameterVariables.length;
    }
    this.routerData.push({
      path: fixedPath,
      handler,
      parameterVariables,
      parameterLength
    });
  }
  use(path, ...handler) {
    this.storeRouter(path, handler);
  }
  async callHandle(handle, path, props) {
    try {
      const store = new ComponentStateStore(handle, props);
      const dom = await evaluateComponentWithStore(store);
      return dom ? dom : null;
    } catch (e) {
      console.error(`Processed path: ${path}, error: ${e.message}`);
      console.error(e.stack);
    }
    return null;
  }
  async findRoute(url, props, renderPartPage) {
    for (let i = 0, routerList; routerList = this.routerData[i]; i++) {
      if (routerList.path === "*" || url === routerList.path || url.startsWith(routerList.path + "/")) {
        const parameters = {};
        let meet = true;
        if (routerList.parameterVariables.length > 0) {
          meet = false;
          let newUrl = url.substring(routerList.path.length + 1);
          if (newUrl.endsWith("/")) {
            newUrl = newUrl.substring(0, newUrl.length - 1);
          }
          const restPath = newUrl.split("/");
          if (restPath.length >= routerList.parameterLength && restPath.length <= routerList.parameterVariables.length) {
            meet = true;
            for (const [index, item] of routerList.parameterVariables.entries()) {
              if (!item.startsWith(":") && !item.startsWith("?") && item !== restPath[index]) {
                meet = false;
                break;
              } else if ((item.startsWith(":") || item.startsWith("?")) && index < restPath.length) {
                parameters[item.replace(/[:?]/g, "")] = restPath[index];
              }
            }
            props.urlParameters = parameters;
          }
        }
        if (meet) {
          for (let j = 0, router; router = routerList.handler[j]; j++) {
            if (typeof router !== "function") {
              const nextPath = routerList.path === "*" || url === "/" && routerList.path === "/" ? url : url.substring(routerList.path.length);
              const vNode = await router.handleRoute(nextPath, props, renderPartPage);
              if (vNode) {
                return vNode;
              }
            } else {
              const dom = await this.callHandle(router, url, props);
              if (dom) {
                return dom;
              }
            }
          }
          return null;
        }
      }
    }
    return null;
  }
  async handleRoute(url, props, renderPartPage) {
    if (url.startsWith(this.subDir)) {
      url = url.substring(this.subDir.length);
    }
    let vNode = null;
    if (this.filter) {
      vNode = await this.callHandle(this.filter, url, props);
    }
    if (!vNode) {
      vNode = await this.findRoute(url, props, renderPartPage);
    }
    if (vNode && this.framePage) {
      const selector = "." + this.framePage.placeholderClassname;
      if (renderPartPage && isFrontEnd() && document.querySelector(selector)) {
        await mountInnerComponent(selector, vNode);
        return null;
      } else {
        return this.framePage.component(this.framePage.placeholderClassname, vNode);
      }
    }
    return vNode;
  }
};

// src/core/page-router.test.ts
(0, import_node_test.describe)("PageRouter Engine", () => {
  const createDummyProps = (url) => ({
    url,
    query: {},
    urlParameters: {},
    renderPageFunctions: {}
  });
  const mockVNode = (type, props, children = []) => ({ type, props: { ...props, children }, html: [] });
  (0, import_node_test.it)("should correctly register and match exact basic routes", async () => {
    const router = new PageRouter();
    const pageA = async (props) => mockVNode("div", { id: "A" });
    const pageB = async (props) => mockVNode("div", { id: "B" });
    router.use("/a", pageA);
    router.use("/b", pageB);
    const matchA = await router.handleRoute("/a", createDummyProps("/a"), false);
    import_strict.default.ok(matchA);
    import_strict.default.equal(matchA.props.id, "A");
    const matchB = await router.handleRoute("/b", createDummyProps("/b"), false);
    import_strict.default.ok(matchB);
    import_strict.default.equal(matchB.props.id, "B");
    const matchC = await router.handleRoute("/c", createDummyProps("/c"), false);
    import_strict.default.equal(matchC, null, "Should return null for unmatched route");
  });
  (0, import_node_test.it)("should accurately parse mandatory and optional dynamic parameters", async () => {
    const router = new PageRouter();
    let parametersExtracted = {};
    const handler = async (props) => {
      parametersExtracted = props.urlParameters;
      return mockVNode("div", {});
    };
    router.use("/users/:id/details/?scope", handler);
    const props1 = createDummyProps("/users/123/details");
    await router.handleRoute("/users/123/details", props1, false);
    import_strict.default.equal(parametersExtracted.id, "123");
    import_strict.default.equal(parametersExtracted.scope, void 0);
    const props2 = createDummyProps("/users/999/details/admin");
    await router.handleRoute("/users/999/details/admin", props2, false);
    import_strict.default.equal(parametersExtracted.id, "999");
    import_strict.default.equal(parametersExtracted.scope, "admin");
    const props3 = createDummyProps("/users");
    const result = await router.handleRoute("/users", props3, false);
    import_strict.default.equal(result, null);
  });
  (0, import_node_test.it)("should intercept execution via setFilter middleware", async () => {
    const router = new PageRouter();
    let filterHit = false;
    router.setFilter(async (props) => {
      filterHit = true;
      if (props.url === "/blocked") {
        return mockVNode("div", { id: "blocked" });
      }
      return null;
    });
    const handler = async (props) => mockVNode("div", { id: "ok" });
    router.use("/*", handler);
    const result1 = await router.handleRoute("/blocked", createDummyProps("/blocked"), false);
    import_strict.default.ok(filterHit);
    import_strict.default.ok(result1);
    import_strict.default.equal(result1.props.id, "blocked");
    filterHit = false;
    const result2 = await router.handleRoute("/allowed", createDummyProps("/allowed"), false);
    import_strict.default.ok(filterHit);
    import_strict.default.ok(result2);
    import_strict.default.equal(result2.props.id, "ok");
  });
  (0, import_node_test.it)("should wrap outputs correctly using setFramePage", async () => {
    const router = new PageRouter();
    const TopFrame = async (placeholderClassname, vnode) => {
      return mockVNode("div", { class: "frame" }, [vnode]);
    };
    router.setFramePage({
      component: TopFrame,
      placeholderClassname: "internal-placeholder"
    });
    const handler = async (props) => mockVNode("div", { id: "inner" });
    router.use("/", handler);
    const result = await router.handleRoute("/", createDummyProps("/"), false);
    import_strict.default.ok(result);
    import_strict.default.equal(result.type, "div");
    import_strict.default.equal(result.props.class, "frame");
    import_strict.default.equal(result.props.children[0].props.id, "inner");
  });
  (0, import_node_test.it)("should traverse recursively into nested sub-routers", async () => {
    const rootRouter = new PageRouter();
    const subRouter = new PageRouter();
    subRouter.use("/profile", async () => mockVNode("div", { id: "sub-profile" }));
    rootRouter.use("/user", subRouter);
    const match = await rootRouter.handleRoute("/user/profile", createDummyProps("/user/profile"), false);
    import_strict.default.ok(match);
    import_strict.default.equal(match.props.id, "sub-profile");
    const miss = await rootRouter.handleRoute("/user/settings", createDummyProps("/user/settings"), false);
    import_strict.default.equal(miss, null);
  });
});
