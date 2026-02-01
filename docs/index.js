"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
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

  // packages/lupine.web/src/jsx.ts
  var init_jsx = __esm({
    "packages/lupine.web/src/jsx.ts"() {
      "use strict";
    }
  });

  // packages/lupine.web/src/core/export-lupine.ts
  var _lupineJs, bindRenderPageFunctions, setRenderPageProps, getRenderPageProps, bindRouter;
  var init_export_lupine = __esm({
    "packages/lupine.web/src/core/export-lupine.ts"() {
      "use strict";
      _lupineJs = {};
      if (typeof globalThis !== "undefined") {
        const gThis = globalThis;
        if (gThis._lupineJs === null) {
          gThis._lupineJs = () => {
            return _lupineJs;
          };
        }
      }
      bindRenderPageFunctions = (calls) => {
        _lupineJs.renderPageFunctions = calls || {};
      };
      setRenderPageProps = (props) => {
        _lupineJs.renderPageProps = props;
      };
      getRenderPageProps = () => {
        return _lupineJs.renderPageProps;
      };
      bindRouter = (router) => {
        _lupineJs.router = router;
      };
    }
  });

  // packages/lupine.web/src/core/bind-links.ts
  function bindLinks(el) {
    const links = el.getElementsByTagName("a");
    for (var i = 0, l = links.length; i < l; i++) {
      let originalHref = links[i].getAttribute("href");
      if (!originalHref || originalHref.startsWith("javascript:")) continue;
      if (originalHref.startsWith("#")) {
        links[i].onclick = () => {
          var _a;
          const id = decodeURIComponent(originalHref.substring(1));
          (_a = document.getElementById(id)) == null ? void 0 : _a.scrollIntoView(true);
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
  var init_bind_links = __esm({
    "packages/lupine.web/src/core/bind-links.ts"() {
      "use strict";
      init_export_lupine();
    }
  });

  // packages/lupine.web/src/core/replace-innerhtml.ts
  var replaceInnerhtml, callUnload;
  var init_replace_innerhtml = __esm({
    "packages/lupine.web/src/core/replace-innerhtml.ts"() {
      "use strict";
      replaceInnerhtml = async (el, newHtml) => {
        var _a;
        const firstDom = el.firstChild;
        if (firstDom && firstDom.tagName === "STYLE") {
          (_a = firstDom.parentNode) == null ? void 0 : _a.removeChild(firstDom);
        }
        await callUnload(el);
        el.innerHTML = newHtml;
        if (firstDom && firstDom.tagName === "STYLE") {
          el.insertBefore(firstDom, el.firstChild);
        }
      };
      callUnload = async (el) => {
        const promises = [];
        el.querySelectorAll("[data-ref]").forEach((child) => {
          if (child._lj && child._lj.onUnload) {
            promises.push(child._lj.onUnload());
          }
        });
        await Promise.all(promises);
      };
    }
  });

  // packages/lupine.web/src/lib/logger.ts
  var ConsoleColors, _Logger, Logger;
  var init_logger = __esm({
    "packages/lupine.web/src/lib/logger.ts"() {
      "use strict";
      ConsoleColors = {
        Red: "#f44336",
        Pink: "#e81e63",
        Purple: "#9c27b0",
        DeepPurple: "#673ab7",
        Indigo: "#3f51b5",
        Blue: "#2196f3",
        LightBlue: "#03a9f4",
        Cyan: "#00bcd4",
        Teal: "#009688",
        Green: "#4caf50",
        LightGreen: "#8bc34a",
        Lime: "#cddc39",
        DarkYellow: "#bfa40e",
        Amber: "#ffc107",
        Orange: "#ff9800",
        DeepOrange: "#ff5722",
        Silver: "#c0c0c0",
        Gray: "#808080",
        Black: "#000000"
      };
      _Logger = class _Logger {
        constructor(namespace, color) {
          this.namespace = "";
          this.color = "";
          this.namespace = namespace ? `[${namespace}] ` : "";
          if (color) {
            this.color = "color:" + color;
          }
        }
        static setEnabled(enabled) {
          enabled && !_Logger.enabled && console.log(`Logger is enabled.`);
          _Logger.enabled = enabled;
        }
        log(message, ...data) {
          _Logger.enabled && console.log(`%c${this.timestamp()} ${this.namespace}${message}`, this.color, ...data);
        }
        timestamp(date) {
          return (date || /* @__PURE__ */ new Date()).toJSON().substring(11, 23);
        }
        warn(message, ...data) {
          console.warn(`%c${this.timestamp()} ${this.namespace}${message}`, this.color, ...data);
        }
        error(message, ...data) {
          console.error(`%c${this.timestamp()} ${this.namespace}${message}`, this.color, ...data);
        }
      };
      _Logger.enabled = true;
      Logger = _Logger;
    }
  });

  // packages/lupine.web/src/lib/unique-id.ts
  function uniqueIdGenerator(preKey) {
    let count = 0;
    const baseTime = Math.round(Date.now() / 1e3);
    let lastKey = "";
    return function() {
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
  var init_unique_id = __esm({
    "packages/lupine.web/src/lib/unique-id.ts"() {
      "use strict";
    }
  });

  // packages/lupine.web/src/lib/cookie.ts
  var setCookie, getCookie, clearCookie, cookie;
  var init_cookie = __esm({
    "packages/lupine.web/src/lib/cookie.ts"() {
      "use strict";
      setCookie = (name, value, expireDays = 365, path, domain, secure) => {
        const expires = new Date((/* @__PURE__ */ new Date()).getTime() + expireDays * 24 * 36e5);
        document.cookie = name + "=" + escape(value) + ";expires=" + expires.toUTCString() + ";path=" + (path ? path : "/") + (domain ? ";domain=" + domain : "") + (secure ? ";secure" : "");
      };
      getCookie = (key) => {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
          const c = cookies[i].trim();
          if (c.substring(0, key.length + 1) == key + "=") {
            return unescape(c.substring(key.length + 1));
          }
        }
        return null;
      };
      clearCookie = (name, path, domain, secure) => {
        document.cookie = name + "=;expires=Fri, 02-Jan-1970 00:00:00 GMT;path=" + (path ? path : "/") + (domain ? ";domain=" + domain : "") + (secure ? ";secure" : "");
      };
      cookie = { set: setCookie, get: getCookie, clear: clearCookie };
    }
  });

  // packages/lupine.web/src/lib/is-frontend.ts
  var isFrontEnd;
  var init_is_frontend = __esm({
    "packages/lupine.web/src/lib/is-frontend.ts"() {
      "use strict";
      isFrontEnd = () => {
        return typeof window === "object" && typeof document === "object";
      };
    }
  });

  // packages/lupine.web/src/core/server-cookie.ts
  var getEitherCookie, _serverCookies, getServerCookie, initServerCookies;
  var init_server_cookie = __esm({
    "packages/lupine.web/src/core/server-cookie.ts"() {
      "use strict";
      init_cookie();
      init_is_frontend();
      getEitherCookie = (name) => {
        if (!isFrontEnd()) {
          return getServerCookie(name);
        } else {
          return getCookie(name);
        }
      };
      getServerCookie = (name) => {
        return _serverCookies && _serverCookies.get(name, "");
      };
      initServerCookies = (serverCookies) => {
        return _serverCookies = serverCookies;
      };
    }
  });

  // packages/lupine.web/src/core/bind-theme.ts
  var defaultThemeName, themeCookieName, updateThemeEventName, themeAttributeName, _themeCfg, bindTheme, getCurrentTheme, updateTheme;
  var init_bind_theme = __esm({
    "packages/lupine.web/src/core/bind-theme.ts"() {
      "use strict";
      init_cookie();
      init_is_frontend();
      init_server_cookie();
      defaultThemeName = "light";
      themeCookieName = "theme";
      updateThemeEventName = "updateTheme";
      themeAttributeName = "data-theme";
      _themeCfg = { defaultTheme: defaultThemeName, themes: {} };
      bindTheme = (defaultTheme, themes) => {
        _themeCfg.defaultTheme = defaultTheme;
        _themeCfg.themes = themes;
        getCurrentTheme();
      };
      getCurrentTheme = () => {
        let themeName = getEitherCookie(themeCookieName);
        if (!themeName || !_themeCfg.themes[themeName]) {
          themeName = _themeCfg.defaultTheme;
          if (isFrontEnd()) {
            setCookie(themeCookieName, _themeCfg.defaultTheme);
          }
        }
        return { themeName, themes: _themeCfg.themes };
      };
      updateTheme = (themeName) => {
        _themeCfg.defaultTheme = themeName;
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
    }
  });

  // packages/lupine.web/src/core/camel-to-hyphens.ts
  var camelToHyphens;
  var init_camel_to_hyphens = __esm({
    "packages/lupine.web/src/core/camel-to-hyphens.ts"() {
      "use strict";
      camelToHyphens = function(name) {
        return name.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
      };
    }
  });

  // packages/lupine.web/src/core/page-loaded-events.ts
  var _pageLoadedEvents, callPageLoadedEvent, bindPageLoadedEvent;
  var init_page_loaded_events = __esm({
    "packages/lupine.web/src/core/page-loaded-events.ts"() {
      "use strict";
      _pageLoadedEvents = [];
      callPageLoadedEvent = () => {
        _pageLoadedEvents.forEach((i) => {
          try {
            i();
          } catch (e) {
            console.error(e);
          }
        });
      };
      bindPageLoadedEvent = (fn) => {
        _pageLoadedEvents.push(fn);
      };
    }
  });

  // packages/lupine.web/src/core/bind-styles.ts
  var wrapCss, processStyleValue, updateOneBlock, processStyleSub, processStyle, updateStyles, updateCssDom, globalStyleUniqueId, _globalStyleIds, getGlobalStylesId, _globalStyle, bindGlobalStyle, generateThemeStyles, generateAllGlobalStyles;
  var init_bind_styles = __esm({
    "packages/lupine.web/src/core/bind-styles.ts"() {
      "use strict";
      init_src2();
      init_bind_theme();
      init_camel_to_hyphens();
      init_page_loaded_events();
      wrapCss = (className, cssText, mediaQuery) => {
        let cssTextWrap = className ? `${className}{${cssText}}` : cssText;
        if (mediaQuery) {
          cssTextWrap = `${mediaQuery}{${cssTextWrap}}`;
        }
        return cssTextWrap;
      };
      processStyleValue = (style) => {
        return Object.keys(style).map((key) => key.trim()).map((key) => {
          const noOutput = style[key] != null && typeof style[key] === "object" || typeof style[key] === "undefined" || style[key] === "";
          return noOutput ? "" : `${camelToHyphens(key)}:${style[key]};`;
        }).join("");
      };
      updateOneBlock = (css, cssTemp, className, mediaQuery) => {
        if (cssTemp.length > 0) {
          const cssText = wrapCss(className, cssTemp.join(""), mediaQuery);
          css.push(cssText);
          cssTemp.length = 0;
        }
      };
      processStyleSub = (topUniqueClassName, classSelector, style, mediaQuery) => {
        const outClassName = classSelector.split(",").map((key0) => key0.trim()).map((key0) => {
          return (key0.startsWith("&") ? `${classSelector}${key0.substring(1)}` : key0).replace(/&/g, topUniqueClassName);
        }).join(",");
        const css = [];
        const cssTemp = [];
        for (let i in style) {
          const value = style[i];
          if (value === null || typeof value !== "object") {
            if (value !== "" && typeof value !== "undefined") {
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
      processStyle = (topUniqueClassName, style) => {
        return processStyleSub(topUniqueClassName, topUniqueClassName ? `.${topUniqueClassName}` : "", style);
      };
      updateStyles = (topUniqueClassName, style) => {
        const el = topUniqueClassName && document.querySelector(`.${topUniqueClassName}`);
        if (el) {
          const cssText = processStyle(topUniqueClassName, style).join("");
          if (el.firstChild && el.firstChild.nodeName === "STYLE") {
            el.firstChild.innerHTML = cssText;
          } else {
            const style2 = document.createElement("style");
            style2.innerHTML = cssText;
            el.prepend(style2);
          }
        } else {
          console.warn(`Can't find "${topUniqueClassName}" to update styles.`);
        }
      };
      updateCssDom = (uniqueStyleId, cssText, cssDom) => {
        if (!cssDom) {
          cssDom = document.createElement("style");
          cssDom.id = `sty-${uniqueStyleId}`;
          document.head.appendChild(cssDom);
        }
        cssDom.innerText = cssText;
      };
      globalStyleUniqueId = uniqueIdGenerator("g");
      _globalStyleIds = /* @__PURE__ */ new Map();
      getGlobalStylesId = (style) => {
        if (!_globalStyleIds.has(style)) {
          const id = globalStyleUniqueId();
          _globalStyleIds.set(style, id);
        }
        return _globalStyleIds.get(style);
      };
      _globalStyle = /* @__PURE__ */ new Map();
      bindGlobalStyle = (topUniqueClassName, style, forceUpdate = false, noTopClassName = false) => {
        if (typeof document !== "undefined") {
          let cssDom = document.getElementById(`sty-${topUniqueClassName}`);
          if (forceUpdate || !cssDom) {
            updateCssDom(topUniqueClassName, processStyle(noTopClassName ? "" : topUniqueClassName, style).join(""), cssDom);
          }
        } else if (!_globalStyle.has(topUniqueClassName) || forceUpdate) {
          _globalStyle.set(topUniqueClassName, { topUniqueClassName, noTopClassName, style });
        }
      };
      generateThemeStyles = () => {
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
      generateAllGlobalStyles = () => {
        const result = [];
        result.push(`<style id="sty-${themeCookieName}">${generateThemeStyles()}</style>`);
        for (let [uniqueStyleId, { topUniqueClassName, noTopClassName, style }] of _globalStyle) {
          const cssText = processStyle(noTopClassName ? "" : topUniqueClassName, style).join("");
          result.push(`<style id="sty-${uniqueStyleId}">${cssText}</style>`);
        }
        return result.join("");
      };
    }
  });

  // packages/lupine.web/src/core/render-component.ts
  function renderChildren(html2, children, uniqueClassName, globalCssId) {
    if (typeof children === "string") {
      html2.push(children);
    } else if (children === false || children === null || typeof children === "undefined") {
    } else if (typeof children === "number" || typeof children === "boolean") {
      html2.push(children.toString());
    } else if (Array.isArray(children)) {
      for (let i = 0; i < children.length; i++) {
        const item = children[i];
        renderChildren(html2, item, uniqueClassName, globalCssId);
      }
    } else if (children.type && children.props) {
      renderComponent(children.type, children.props, uniqueClassName, globalCssId);
      html2.push(...children.props._html);
      children.props._html.length = 0;
    } else {
      logger.warn("Unexpected", children);
    }
  }
  function renderAttribute(type, props, jsxNodes, uniqueClassName, globalCssId) {
    const html2 = [];
    for (let i in props) {
      if (i === "ref") {
        if (props[i]) {
          props[i].id = genUniqueId(props);
          html2.push("data-ref");
        }
      } else if (!["children", "key", "_result", "_html", "_id"].includes(i)) {
        if (i === "style") {
          if (typeof props[i] === "object") {
            let attrs = `${i}="`;
            for (let j in props[i]) {
              attrs += `${camelToHyphens(j)}:${props[i][j]};`;
            }
            attrs += `"`;
            html2.push(attrs);
          } else {
            html2.push(`${i}="${props[i]}"`);
          }
        } else if (i === "css") {
          genUniqueId(props);
        } else if (i[0] === "o" && i[1] === "n") {
          genUniqueId(props);
        } else if (i === "defaultChecked") {
          if (props[i] === true || props[i] === "checked") {
            html2.push(`checked="true"`);
          }
        } else if (i === "readonly" || i === "disabled" || i === "selected" || i === "checked") {
          if (props[i] !== void 0 && props[i] !== false && props[i] !== "false") {
            html2.push(`${i}="${props[i]}"`);
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
          html2.push(`class="${classNameList.join(" ")}"`);
        } else if (i !== "dangerouslySetInnerHTML") {
          html2.push(`${i}="${props[i]}"`);
        }
      }
    }
    if (props._id) {
      html2.push(props._id);
    }
    return html2.join(" ");
  }
  var logger, domUniqueId, selfClosingTags, genUniqueId, renderComponent;
  var init_render_component = __esm({
    "packages/lupine.web/src/core/render-component.ts"() {
      "use strict";
      init_logger();
      init_unique_id();
      init_bind_styles();
      init_camel_to_hyphens();
      logger = new Logger("render-components");
      domUniqueId = uniqueIdGenerator("l");
      selfClosingTags = [
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
      genUniqueId = (props) => {
        if (!props._id) {
          props._id = domUniqueId();
        }
        return props._id;
      };
      renderComponent = (type, props, uniqueClassName, globalCssId) => {
        if (Array.isArray(props)) {
          const jsxNodes = { type: "Fragment", props: { children: props } };
          renderComponent(jsxNodes.type, jsxNodes.props, uniqueClassName, globalCssId);
          return;
        }
        props._html = [];
        if (typeof type === "function") {
          props._result = type.call(null, props);
          if (props._result === null || props._result === void 0 || props._result === false) {
            props._result = { type: "Fragment", props };
          }
          if (typeof props._result.type === "function") {
            renderComponent(props._result.type, props._result.props, uniqueClassName, globalCssId);
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
          if (newProps._id) {
            console.warn("This component reference is used more than once and will have binding issues: ", newProps);
          }
          let newUniqueClassName = uniqueClassName;
          if (newProps["css"] || newProps["ref"]) {
            newUniqueClassName = genUniqueId(newProps);
            if (!newProps["class"] && !newProps["className"]) {
              newProps["class"] = newUniqueClassName;
            }
          }
          let newGlobalCssId = globalCssId;
          if (newProps["ref"] && newProps["ref"].globalCssId) {
            newGlobalCssId = newProps["ref"].globalCssId;
          }
          const attrs = renderAttribute(newType, newProps, { type, props }, newUniqueClassName, newGlobalCssId);
          if (selfClosingTags.includes(newType.toLowerCase())) {
            if (newType !== "Fragment" || newProps.ref) {
              props._html.push(`<${newType}${attrs ? " " : ""}${attrs} />`);
            }
            if (newProps["css"]) {
              console.warn(`ClosingTag [${newType}] doesn't support 'css', please use 'style' instead.`);
            }
          } else {
            if (newType !== "Fragment" || newProps.ref) {
              props._html.push(`<${newType}${attrs ? " " : ""}${attrs}>`);
            }
            if (newProps["css"]) {
              const cssText = processStyle(newUniqueClassName, newProps["css"]).join("");
              props._html.push(`<style id="sty-${newUniqueClassName}">${cssText}</style>`);
            }
            if (newProps.children || newProps.children === 0) {
              renderChildren(props._html, newProps.children, newUniqueClassName, newGlobalCssId);
            } else if (newProps["dangerouslySetInnerHTML"]) {
              props._html.push(newProps["dangerouslySetInnerHTML"]);
            } else {
            }
            if (newType !== "Fragment" || newProps.ref) {
              props._html.push(`</${newType}>`);
            }
          }
        } else if (newType.name === "Fragment") {
          renderChildren(props._html, newProps.children, uniqueClassName, globalCssId);
        } else {
          logger.warn("Unknown type: ", type, props, newType, newProps);
        }
      };
    }
  });

  // packages/lupine.web/src/core/mount-component.ts
  var mountInnerComponent, mountOuterComponent, mountSiblingComponent;
  var init_mount_component = __esm({
    "packages/lupine.web/src/core/mount-component.ts"() {
      "use strict";
      init_bind_attributes();
      init_bind_links();
      init_replace_innerhtml();
      init_render_component();
      mountInnerComponent = async (selector, jsxNodes) => {
        renderComponent(jsxNodes.type, jsxNodes.props);
        const el = selector && (typeof selector === "string" ? document.querySelector(selector) : selector);
        if (el) {
          await replaceInnerhtml(el, jsxNodes.props._html.join(""));
          bindAttributes(el, jsxNodes.type, jsxNodes.props);
          bindLinks(el);
        }
      };
      mountOuterComponent = async (selector, jsxNodes) => {
        var _a;
        renderComponent(jsxNodes.type, jsxNodes.props);
        let el = selector && (typeof selector === "string" ? document.querySelector(selector) : selector);
        if (el) {
          const template = document.createElement("template");
          await replaceInnerhtml(template, jsxNodes.props._html.join(""));
          template.content.children.length > 1 && console.error("renderComponent should only have one element: ", template.content.children.length);
          const newEl = template.content.firstChild;
          await callUnload(el);
          (_a = el.parentNode) == null ? void 0 : _a.replaceChild(newEl, el);
          bindAttributes(newEl, jsxNodes.type, jsxNodes.props);
          bindLinks(newEl);
        }
      };
      mountSiblingComponent = async (selector, jsxNodes, position = "after") => {
        var _a, _b;
        renderComponent(jsxNodes.type, jsxNodes.props);
        let el = selector && (typeof selector === "string" ? document.querySelector(selector) : selector);
        if (el) {
          const template = document.createElement("template");
          await replaceInnerhtml(template, jsxNodes.props._html.join(""));
          template.content.children.length > 1 && console.error("renderComponent should only have one element: ", template.content.children.length);
          const newEl = template.content.firstChild;
          await callUnload(el);
          if (el.nextSibling || position === "before") {
            (_a = el.parentNode) == null ? void 0 : _a.insertBefore(newEl, position === "after" ? el.nextSibling : el);
          } else {
            (_b = el.parentNode) == null ? void 0 : _b.appendChild(newEl);
          }
          bindAttributes(newEl, jsxNodes.type, jsxNodes.props);
          bindLinks(newEl);
        }
      };
    }
  });

  // packages/lupine.web/src/core/bind-ref.ts
  var bindRef;
  var init_bind_ref = __esm({
    "packages/lupine.web/src/core/bind-ref.ts"() {
      "use strict";
      init_mount_component();
      init_replace_innerhtml();
      bindRef = (type, newProps, el) => {
        const id = newProps._id;
        newProps["ref"].current = el;
        if (newProps["ref"].onLoad) {
          const defer = Promise.prototype.then.bind(Promise.resolve());
          defer(() => newProps["ref"].onLoad(el));
        }
        if (newProps["ref"].onUnload) {
          el._lj = el._lj || {};
          el._lj.onUnload = async () => {
            await newProps["ref"].onUnload(el);
          };
        }
        newProps["ref"].$ = (selector) => {
          if (selector.startsWith("&")) {
            return el.querySelector(`.${id}${selector.substring(1).replace(/&/g, id)}`);
          }
          return el.querySelector(`.${id} ${selector.replace(/&/g, id)}`);
        };
        newProps["ref"].$all = (selector) => {
          if (selector.startsWith("&")) {
            return el.querySelectorAll(`.${id}${selector.substring(1).replace(/&/g, id)}`);
          }
          return el.querySelectorAll(`.${id} ${selector.replace(/&/g, id)}`);
        };
        newProps["ref"].mountInnerComponent = async (content) => {
          if (typeof content === "object" && content.type && content.props) {
            await mountInnerComponent(el, content);
          } else {
            await replaceInnerhtml(el, content);
          }
        };
        newProps["ref"].mountOuterComponent = async (content) => {
          await mountOuterComponent(el, content);
        };
      };
    }
  });

  // packages/lupine.web/src/core/bind-attributes.ts
  var bindAttributesChildren, bindAttributes;
  var init_bind_attributes = __esm({
    "packages/lupine.web/src/core/bind-attributes.ts"() {
      "use strict";
      init_bind_ref();
      bindAttributesChildren = (topEl, children) => {
        for (let i = 0; i < children.length; i++) {
          const item = children[i];
          if (item && item.type && item.props) {
            bindAttributes(topEl, item.type, item.props);
          } else if (item && Array.isArray(item)) {
            bindAttributesChildren(topEl, item);
          } else if (typeof item !== "undefined" && item !== null && typeof item !== "string" && typeof item !== "number" && typeof item !== "boolean") {
            console.warn(`Unexpected children:`, item);
          }
        }
      };
      bindAttributes = (topEl, type, props) => {
        const newProps = props._result && props._result.props || props;
        if (newProps._id) {
          let el = topEl.querySelector(`[${newProps._id}]`);
          if (!el && topEl.getAttribute(newProps._id) === "") {
            el = topEl;
          }
          if (el) {
            for (let i in newProps) {
              if (i === "ref") {
                bindRef(type, newProps, el);
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
          bindAttributesChildren(topEl, newProps.children);
        } else if (newProps._result && newProps._result.type !== "Fragment" && newProps._result.props) {
          bindAttributes(topEl, newProps._result.type, newProps._result.props);
        } else if (newProps.children && newProps.children.type && newProps.children.props) {
          bindAttributes(topEl, newProps.children.type, newProps.children.props);
        } else if (!newProps.children || typeof newProps.children === "string" || typeof newProps.children === "number" || typeof newProps.children === "boolean") {
        } else {
          console.warn(`Unexpected children:`, newProps.children, type, props);
        }
      };
    }
  });

  // packages/lupine.web/src/core/bind-lang.ts
  var defaultLangName, langCookieName, updateLangEventName, _langCfg, bindLang, getCurrentLang, updateLang;
  var init_bind_lang = __esm({
    "packages/lupine.web/src/core/bind-lang.ts"() {
      "use strict";
      init_cookie();
      init_is_frontend();
      init_server_cookie();
      defaultLangName = "en";
      langCookieName = "lang";
      updateLangEventName = "updateLang";
      _langCfg = { defaultLang: defaultLangName, langs: {} };
      bindLang = (defaultLang, langs) => {
        _langCfg.defaultLang = defaultLang;
        _langCfg.langs = langs;
        getCurrentLang();
      };
      getCurrentLang = () => {
        let langName = getEitherCookie(langCookieName);
        if (!langName || !_langCfg.langs[langName]) {
          langName = _langCfg.defaultLang;
          if (isFrontEnd()) {
            setCookie(langCookieName, _langCfg.defaultLang);
          }
        }
        return { langName, langs: _langCfg.langs };
      };
      updateLang = (langName) => {
        _langCfg.defaultLang = langName;
        if (!isFrontEnd()) {
          return;
        }
        setCookie(langCookieName, langName);
        const event = new CustomEvent(updateLangEventName, { detail: langName });
        window.dispatchEvent(event);
      };
    }
  });

  // packages/lupine.web/src/core/bind-meta.tsx
  var _pageTitle, setPageTitle, getPageTitle, setDefaultPageTitle, _description, setMetaDescription, getMetaDescription, setDefaultMetaDescription, _metaData, addMetaDataTags, getMetaDataTags, getMetaDataObject;
  var init_bind_meta = __esm({
    "packages/lupine.web/src/core/bind-meta.tsx"() {
      "use strict";
      _pageTitle = { value: "", defaultValue: "" };
      setPageTitle = (title) => {
        _pageTitle.value = title;
      };
      getPageTitle = () => {
        return _pageTitle.value || _pageTitle.defaultValue;
      };
      setDefaultPageTitle = (title) => {
        _pageTitle.defaultValue = title;
      };
      _description = { value: "", defaultValue: "" };
      setMetaDescription = (description) => {
        _description.value = description;
      };
      getMetaDescription = () => {
        return _description.value || _description.defaultValue;
      };
      setDefaultMetaDescription = (description) => {
        _description.defaultValue = description;
      };
      _metaData = {};
      addMetaDataTags = (key, value) => {
        if (typeof value === "undefined") {
          delete _metaData[key];
        } else {
          _metaData[key] = value;
        }
      };
      getMetaDataTags = () => {
        return Object.values(getMetaDataObject()).join("\n");
      };
      getMetaDataObject = () => {
        const metaDescription = getMetaDescription();
        return metaDescription ? Object.assign(
          {
            "name:description": `<meta name="description" content="${metaDescription}">`
          },
          _metaData
        ) : _metaData;
      };
    }
  });

  // packages/lupine.web/src/core/page-router.ts
  var PageRouter;
  var init_page_router = __esm({
    "packages/lupine.web/src/core/page-router.ts"() {
      "use strict";
      init_is_frontend();
      init_mount_component();
      init_logger();
      PageRouter = class _PageRouter {
        constructor() {
          this.logger = new Logger("page-router");
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
        // the path should start with / and end without /, and it can be
        //    /aaa/:bbb/ccc/:ddd (ccc is a fixed section)
        //    /aaa/:bbb/ccc/?ddd/?eee (from ddd, all sections are optional)
        //    /aaa/:?bbb/ccc/ (from bbb, all sections are optional)
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
            const vNode = await handle(props);
            return vNode;
          } catch (e) {
            this.logger.error(`Processed path: ${path}, error: ${e.message}`);
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
                  if (router instanceof _PageRouter) {
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
    }
  });

  // packages/lupine.web/src/lib/web-env.ts
  function webEnv(key, defaultValue) {
    var _a;
    if (!_webEnvInitialized) {
      const json = (_a = document.querySelector("#web-env")) == null ? void 0 : _a.textContent;
      if (json) {
        _webEnvInitialized = true;
        initWebEnv(JSON.parse(json));
      }
    }
    !_webEnvInitialized && console.warn("webEnv has not been initialized yet!");
    if (typeof _webEnv[key] === "undefined") {
      return defaultValue;
    }
    if (typeof defaultValue === "number") {
      return Number.parseInt(_webEnv[key]);
    }
    if (typeof defaultValue === "boolean") {
      return _webEnv[key].toLocaleLowerCase() === "true" || _webEnv[key] === "1";
    }
    if (typeof defaultValue === "object") {
      if (typeof _webEnv[key] === "object") {
        return _webEnv[key];
      }
      try {
        return JSON.parse(_webEnv[key]);
      } catch (error) {
        console.error(`webEnv JSON.parse error: `, error);
      }
      return defaultValue;
    }
    return _webEnv[key] || defaultValue;
  }
  function initWebEnv(webEnv2) {
    Object.assign(_webEnv, webEnv2);
    _webEnvInitialized = true;
  }
  var _webEnv, _webEnvInitialized;
  var init_web_env = __esm({
    "packages/lupine.web/src/lib/web-env.ts"() {
      "use strict";
      _webEnv = {};
      _webEnvInitialized = false;
    }
  });

  // packages/lupine.web/src/lib/web-config.ts
  var bindWebConfigApi, _WebConfig, WebConfig;
  var init_web_config = __esm({
    "packages/lupine.web/src/lib/web-config.ts"() {
      "use strict";
      init_src();
      bindWebConfigApi = (webConfigApi) => {
        WebConfig.webConfigApi = webConfigApi;
      };
      _WebConfig = class _WebConfig {
        // called from generatePage (SSR)
        static initFromData(cfg) {
          this.initialized = true;
          this.cfg = cfg;
        }
        static async init(force) {
          var _a, _b;
          if (this.initialized && !force) {
            return;
          }
          this.initialized = true;
          if (typeof document === "object" && !force) {
            const json = (_a = document.querySelector("#web-setting")) == null ? void 0 : _a.textContent;
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
            console.error(((_b = data == null ? void 0 : data.json) == null ? void 0 : _b.message) || "Failed to get web config");
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
      _WebConfig.webConfigApi = "";
      _WebConfig.initialized = false;
      _WebConfig.cfg = {};
      WebConfig = _WebConfig;
    }
  });

  // packages/lupine.web/src/core/initialize.ts
  var logger2, renderTargetPage, generatePage, _initSaved, initializePage;
  var init_initialize = __esm({
    "packages/lupine.web/src/core/initialize.ts"() {
      "use strict";
      init_logger();
      init_bind_styles();
      init_bind_theme();
      init_mount_component();
      init_page_router();
      init_page_loaded_events();
      init_server_cookie();
      init_bind_meta();
      init_web_env();
      init_export_lupine();
      init_is_frontend();
      init_web_config();
      logger2 = new Logger("initialize");
      renderTargetPage = async (props, renderPartPage) => {
        if (_lupineJs.router instanceof PageRouter) {
          return _lupineJs.router.handleRoute(props.url, props, renderPartPage);
        }
        return await _lupineJs.router(props);
      };
      generatePage = async (props, toClientDelivery) => {
        setRenderPageProps(props);
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
            themeName: defaultThemeName
          };
        }
        await mountInnerComponent(null, jsxNodes);
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
      _initSaved = {
        pageInitialized: false
      };
      initializePage = async (newUrl) => {
        const currentPageInitialized = _initSaved.pageInitialized;
        _initSaved.pageInitialized = true;
        logger2.log("initializePage: ", newUrl);
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
      if (isFrontEnd()) {
        addEventListener("popstate", (event) => {
          initializePage();
        });
        addEventListener("load", (event) => {
          initializePage();
        });
      }
      _lupineJs.initializePage = initializePage;
    }
  });

  // packages/lupine.web/src/core/index.ts
  var init_core = __esm({
    "packages/lupine.web/src/core/index.ts"() {
      "use strict";
      init_bind_attributes();
      init_bind_lang();
      init_bind_links();
      init_bind_meta();
      init_bind_ref();
      init_bind_styles();
      init_bind_theme();
      init_export_lupine();
      init_camel_to_hyphens();
      init_mount_component();
      init_page_loaded_events();
      init_page_router();
      init_render_component();
      init_replace_innerhtml();
      init_server_cookie();
      init_initialize();
    }
  });

  // packages/lupine.web/src/lib/debug-watch.ts
  var flag, debugWatch;
  var init_debug_watch = __esm({
    "packages/lupine.web/src/lib/debug-watch.ts"() {
      "use strict";
      flag = 0;
      debugWatch = (port) => {
        console.log("Creating debug-watch socket");
        const protocol = location.protocol === "https:" ? "wss:" : "ws:";
        const socket = new WebSocket(`${protocol}//${location.host}/debug/client`);
        window.addEventListener("beforeunload", () => {
          socket.close();
        });
        socket.onopen = () => {
          socket.send(JSON.stringify({ message: "get-flag" }));
        };
        socket.onmessage = (message) => {
          try {
            const jsonData = JSON.parse(message.data);
            console.log("Debug socket message:", jsonData);
            if (jsonData && jsonData.flag) {
              if (!flag) {
                flag = jsonData.flag;
              } else if (flag !== jsonData.flag) {
                document.location.reload();
              }
            }
          } catch {
          }
        };
        socket.onclose = () => {
          console.log("Debug socket close.");
          setTimeout(() => {
            debugWatch(port);
          }, 3e3);
        };
      };
    }
  });

  // packages/lupine.web/src/lib/index.ts
  var init_lib = __esm({
    "packages/lupine.web/src/lib/index.ts"() {
      "use strict";
      init_cookie();
      init_debug_watch();
      init_is_frontend();
      init_logger();
      init_unique_id();
      init_web_config();
      init_web_env();
    }
  });

  // packages/lupine.web/src/models/json-props.ts
  var init_json_props = __esm({
    "packages/lupine.web/src/models/json-props.ts"() {
      "use strict";
    }
  });

  // packages/lupine.web/src/models/simple-storage-props.ts
  var init_simple_storage_props = __esm({
    "packages/lupine.web/src/models/simple-storage-props.ts"() {
      "use strict";
    }
  });

  // packages/lupine.web/src/models/theme-props.ts
  var init_theme_props = __esm({
    "packages/lupine.web/src/models/theme-props.ts"() {
      "use strict";
    }
  });

  // packages/lupine.web/src/models/to-client-delivery-props.ts
  var init_to_client_delivery_props = __esm({
    "packages/lupine.web/src/models/to-client-delivery-props.ts"() {
      "use strict";
    }
  });

  // packages/lupine.web/src/models/index.ts
  var init_models = __esm({
    "packages/lupine.web/src/models/index.ts"() {
      "use strict";
      init_json_props();
      init_simple_storage_props();
      init_theme_props();
      init_to_client_delivery_props();
    }
  });

  // packages/lupine.web/src/styles/css-styles.ts
  var init_css_styles = __esm({
    "packages/lupine.web/src/styles/css-styles.ts"() {
      "use strict";
    }
  });

  // packages/lupine.web/src/styles/index.ts
  var init_styles = __esm({
    "packages/lupine.web/src/styles/index.ts"() {
      "use strict";
      init_css_styles();
    }
  });

  // packages/lupine.web/src/index.ts
  var pageRouter;
  var init_src = __esm({
    "packages/lupine.web/src/index.ts"() {
      "use strict";
      init_src2();
      init_jsx();
      init_core();
      init_lib();
      init_models();
      init_styles();
      pageRouter = new PageRouter();
    }
  });

  // packages/lupine.components/src/lib/back-action-helper.ts
  var backActionUniqueId, BackActionHelper, backActionHelper;
  var init_back_action_helper = __esm({
    "packages/lupine.components/src/lib/back-action-helper.ts"() {
      "use strict";
      init_src();
      backActionUniqueId = uniqueIdGenerator("bb-");
      BackActionHelper = class {
        genBackActionId() {
          return backActionUniqueId();
        }
        getAllBackActionButtons() {
          const nodes = document.querySelectorAll('[data-back-action^="bb-"]');
          const buttons = Array.from(nodes).map((el) => {
            const act = el.getAttribute("data-back-action") || "";
            return { el, ind: act.substring(3) };
          }).filter(Boolean).sort((a, b) => b.ind.localeCompare(a.ind)).map((item) => item.el);
          return buttons;
        }
        clear() {
          this.backFn = void 0;
        }
        attach(back) {
          this.backFn = back;
        }
        async processBackAction() {
          if (this.backFn) {
            try {
              await this.backFn();
              this.clear();
              return true;
            } catch (e) {
              console.error("back button back failed", e);
            }
            return false;
          }
          const buttons = this.getAllBackActionButtons();
          if (buttons.length) {
            const button = buttons[0];
            button.dispatchEvent(new Event("click"));
            return true;
          }
          return false;
        }
      };
      backActionHelper = /* @__PURE__ */ new BackActionHelper();
    }
  });

  // packages/lupine.components/src/lib/base62.ts
  var _Base62, Base62;
  var init_base62 = __esm({
    "packages/lupine.components/src/lib/base62.ts"() {
      "use strict";
      _Base62 = class _Base62 {
        static toString(num) {
          if (num === 0) return _Base62.ALPHABET[0];
          let result = "";
          while (num > 0) {
            const rem = num % _Base62.BASE;
            result = _Base62.ALPHABET[rem] + result;
            num = Math.floor(num / _Base62.BASE);
          }
          return result;
        }
        static fromString(str2) {
          let result = 0;
          for (let i = 0; i < str2.length; i++) {
            result = result * _Base62.BASE + _Base62.ALPHABET.indexOf(str2[i]);
          }
          return result;
        }
      };
      _Base62.ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      _Base62.BASE = 62;
      Base62 = _Base62;
    }
  });

  // packages/lupine.components/src/lib/blob-utils.ts
  var blobToBase64, blobFromBase64, base64ToUrl;
  var init_blob_utils = __esm({
    "packages/lupine.components/src/lib/blob-utils.ts"() {
      "use strict";
      blobToBase64 = (blob, removeMeta) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(removeMeta ? reader.result.split(",")[1] : reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      };
      blobFromBase64 = (base64) => {
        const [header, base64Data] = base64.split(",");
        const mimeMatch = header.match(/data:(.*);base64/);
        const mimeType = mimeMatch ? mimeMatch[1] : "application/octet-stream";
        const byteCharacters = atob(base64Data);
        const byteNumbers = Array.from(byteCharacters).map((c) => c.charCodeAt(0));
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: mimeType });
      };
      base64ToUrl = (base64) => {
        const blob = blobFromBase64(base64);
        return URL.createObjectURL(blob);
      };
    }
  });

  // packages/lupine.components/src/lib/calculate-text-width.ts
  function calculateTextWidth(text, font) {
    let canvas = calculateTextWidthSaved.canvas || (calculateTextWidthSaved.canvas = document.createElement("canvas"));
    let context = canvas.getContext("2d");
    context.font = font;
    let metrics = context.measureText(text);
    return metrics.width;
  }
  var calculateTextWidthSaved;
  var init_calculate_text_width = __esm({
    "packages/lupine.components/src/lib/calculate-text-width.ts"() {
      "use strict";
      calculateTextWidthSaved = { canvas: null };
    }
  });

  // packages/lupine.components/src/lib/date-utils.ts
  var DateUtils, DiffDate;
  var init_date_utils = __esm({
    "packages/lupine.components/src/lib/date-utils.ts"() {
      "use strict";
      DateUtils = class _DateUtils {
        /*
         * returns the number of milliseconds elapsed since January 1, 1970 00:00:00 UTC.
         */
        static now() {
          return Date.now();
        }
        // Date time string format: YYYY-MM-DDTHH:mm:ss.sssZ
        // The string that you want to parse into a Date should match this format or a portion of this format.
        // The “T” character separates the date from the time portion of the string. The “Z” character is the UTC offset representation.
        static toDate(str2) {
          return new Date(Date.parse(str2));
        }
        static clone(dt) {
          return new Date(dt.valueOf());
        }
        static isLeapYear(year) {
          return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
        }
        static daysInMonth(year, month) {
          return month === 1 ? _DateUtils.isLeapYear(year) ? 29 : 28 : 31 - month % 7 % 2;
        }
        static createDate(year, monthIndex, date, hours, minutes, seconds, ms) {
          const dt = new Date(year, monthIndex, date, hours, minutes, seconds, ms);
          return dt;
        }
        // It returns the number of milliseconds since January 1, 1970, 00:00:00 UTC instead of local (regardless of which time zone you are in).
        static createUTCDate(year, monthIndex, date, hours, minutes, seconds, ms) {
          const dt = new Date(Date.UTC.apply(null, [year, monthIndex, date, hours, minutes, seconds, ms]));
          return dt;
        }
        static set(dt, year, monthIndex, date, hours, minutes, seconds, ms) {
          if (!dt) {
            dt = new Date(_DateUtils.now());
          }
          if (typeof year === "number") {
            dt.setFullYear(year);
          }
          if (typeof monthIndex === "number") {
            dt.setMonth(monthIndex);
          }
          if (typeof date === "number") {
            dt.setDate(date);
          }
          if (typeof hours === "number") {
            dt.setHours(hours);
          }
          if (typeof minutes === "number") {
            dt.setMinutes(minutes);
          }
          if (typeof seconds === "number") {
            dt.setSeconds(seconds);
          }
          if (typeof ms === "number") {
            dt.setMilliseconds(ms);
          }
          return dt;
        }
        static add(dt, year, monthCount, date, hours, minutes, seconds, ms) {
          if (!dt) {
            dt = new Date(_DateUtils.now());
          }
          if (typeof year === "number") {
            dt.setFullYear(dt.getFullYear() + year);
          }
          if (typeof monthCount === "number") {
            dt.setMonth(dt.getMonth() + monthCount);
          }
          if (typeof date === "number") {
            dt.setDate(dt.getDate() + date);
          }
          if (typeof hours === "number") {
            dt.setHours(dt.getHours() + hours);
          }
          if (typeof minutes === "number") {
            dt.setMinutes(dt.getMinutes() + minutes);
          }
          if (typeof seconds === "number") {
            dt.setSeconds(dt.getSeconds() + seconds);
          }
          if (typeof ms === "number") {
            dt.setMilliseconds(dt.getMilliseconds() + ms);
          }
          return dt;
        }
        // returns a difference object from two dates
        static diff(endDate, startDate) {
          const startYear = startDate.getFullYear();
          let yearDiff = endDate.getFullYear() - startYear;
          let monthDiff = endDate.getMonth() - startDate.getMonth();
          if (monthDiff < 0) {
            yearDiff--;
            monthDiff += 12;
          }
          let dayDiff = endDate.getDate() - startDate.getDate();
          if (dayDiff < 0) {
            if (monthDiff > 0) {
              monthDiff--;
            } else {
              yearDiff--;
              monthDiff = 11;
            }
            dayDiff += _DateUtils.daysInMonth(startYear, startDate.getMonth());
          }
          const msTotal = endDate.valueOf() - startDate.valueOf();
          const secondTotal = Math.floor(msTotal / 1e3);
          const hourDiff = Math.floor(secondTotal / (60 * 60)) % 24;
          const minuteDiff = Math.floor(secondTotal / 60) % 60;
          const secondDiff = secondTotal % 60;
          const msDiff = msTotal % 1e3;
          return new DiffDate(yearDiff, monthDiff, dayDiff, hourDiff, minuteDiff, secondDiff, msDiff);
        }
        // returns a time difference string from two dates
        static diffString(endDate, startDate, printMS = false) {
          const diff = _DateUtils.diff(endDate, startDate);
          let ret = "";
          if (diff.years !== 0) {
            ret = ret + diff.years + " years(s), ";
          }
          if (diff.years !== 0 || diff.months !== 0) {
            ret = ret + diff.months + " month(s), ";
          }
          if (diff.years !== 0 || diff.months !== 0 || diff.days !== 0) {
            ret = ret + diff.days + " day(s), ";
          }
          if (diff.years !== 0 || diff.months !== 0 || diff.days !== 0 || diff.hours !== 0) {
            ret = ret + diff.hours + " hour(s), ";
          }
          if (diff.years !== 0 || diff.months !== 0 || diff.days !== 0 || diff.hours !== 0 || diff.minutes !== 0) {
            ret = ret + diff.minutes + " minute(s), ";
          }
          if (diff.years !== 0 || diff.months !== 0 || diff.days !== 0 || diff.hours !== 0 || diff.minutes !== 0 || diff.seconds !== 0 || !printMS) {
            ret = ret + diff.seconds + " second(s)";
            if (printMS) {
              ret += ", ";
            }
          }
          if (printMS) {
            ret = ret + diff.milliseconds + " ms";
          }
          return ret;
        }
        // returns a YYYYMMDD format string
        static toYMD(dt, separator) {
          separator = typeof separator === "undefined" ? "-" : separator;
          return dt.getFullYear() + separator + ("0" + (dt.getMonth() + 1)).toString().slice(-2) + separator + ("0" + dt.getDate()).toString().slice(-2);
        }
        static toYmdHms(dt, separator) {
          separator = typeof separator === "undefined" ? "-" : separator;
          return dt.getFullYear() + separator + ("0" + (dt.getMonth() + 1)).toString().slice(-2) + separator + ("0" + dt.getDate()).toString().slice(-2) + " " + ("0" + dt.getHours()).toString().slice(-2) + ":" + ("0" + dt.getMinutes()).toString().slice(-2) + ":" + ("0" + dt.getSeconds()).toString().slice(-2);
        }
        static toJSONString(dt) {
          return dt.toJSON();
        }
        static showJSONString(dt, separator = "-") {
          return _DateUtils.toYmdHms(_DateUtils.toDate(dt), separator);
        }
        static fromJSONString(dt) {
          return _DateUtils.toDate(dt);
        }
        static clearTime(dt) {
          dt.setHours(0);
          dt.setMinutes(0);
          dt.setSeconds(0);
          dt.setMilliseconds(0);
          return dt;
        }
        static clearUTCTime(dt) {
          dt.setUTCHours(0);
          dt.setUTCMinutes(0);
          dt.setUTCSeconds(0);
          dt.setUTCMilliseconds(0);
          return dt;
        }
        static format(dt, fmt) {
          if (!fmt) {
            fmt = "YYYY-MM-DD";
          }
          if (!dt) {
            dt = /* @__PURE__ */ new Date();
          }
          const parts = {
            YYYY: dt.getFullYear().toString(),
            YY: ("00" + (dt.getFullYear() - 100)).toString().slice(-2),
            MM: ("0" + (dt.getMonth() + 1)).toString().slice(-2),
            M: (dt.getMonth() + 1).toString(),
            DD: ("0" + dt.getDate()).toString().slice(-2),
            D: dt.getDate().toString(),
            hh: ("0" + dt.getHours()).toString().slice(-2),
            h: dt.getHours().toString(),
            mm: ("0" + dt.getMinutes()).toString().slice(-2),
            ss: ("0" + dt.getSeconds()).toString().slice(-2),
            SSS: ("00" + dt.getMilliseconds()).toString().slice(-3),
            S: Math.floor(dt.getMilliseconds() / 100).toString().slice(-1)
          };
          const array = fmt.match(/(\[[^\[]*\])|(\\)?(YYYY|YY|MM?|DD?|hh?|mm?|ss?|SSS|S|.)/g);
          for (let i = 0, length = array.length; i < length; i++) {
            if (parts[array[i]]) {
              array[i] = parts[array[i]];
            }
          }
          const ret = array.join("");
          return ret;
        }
      };
      DiffDate = class {
        constructor(years, months, days, hours, minutes, seconds, milliseconds) {
          this.years = years;
          this.months = months;
          this.days = days;
          this.hours = hours;
          this.minutes = minutes;
          this.seconds = seconds;
          this.milliseconds = milliseconds;
        }
      };
    }
  });

  // packages/lupine.components/src/lib/deep-merge.ts
  var needMerge, deepMerge, cloneJson;
  var init_deep_merge = __esm({
    "packages/lupine.components/src/lib/deep-merge.ts"() {
      "use strict";
      needMerge = (item) => {
        return item && typeof item === "object" && !Array.isArray(item);
      };
      deepMerge = (target, ...sources) => {
        if (!sources.length) return target;
        const source = sources.shift();
        if (needMerge(target) && needMerge(source)) {
          for (const key in source) {
            if (needMerge(source[key])) {
              if (!target[key]) Object.assign(target, { [key]: {} });
              deepMerge(target[key], source[key]);
            } else {
              Object.assign(target, { [key]: source[key] });
            }
          }
        }
        return deepMerge(target, ...sources);
      };
      cloneJson = (json) => {
        return JSON.parse(JSON.stringify(json));
      };
    }
  });

  // packages/lupine.components/src/lib/document-ready.ts
  var DocumentReady;
  var init_document_ready = __esm({
    "packages/lupine.components/src/lib/document-ready.ts"() {
      "use strict";
      DocumentReady = class {
        constructor() {
        }
        // code is from https://code.jquery.com/jquery-1.12.4.js
        // for document only (not for elements)
        ready(fn) {
          if (document.readyState === "complete") {
            setTimeout(fn, 0);
          } else {
            const completed = function() {
              if (document.readyState === "complete") {
                document.removeEventListener("DOMContentLoaded", completed);
                window.removeEventListener("load", completed);
                setTimeout(fn, 0);
              }
            };
            document.addEventListener("DOMContentLoaded", completed);
            window.addEventListener("load", completed);
          }
        }
        readyPromise() {
          return new Promise((resolve, reject) => {
            this.ready(() => {
              resolve();
            });
          });
        }
      };
    }
  });

  // packages/lupine.components/src/lib/dom-utils.ts
  var DomUtils;
  var init_dom_utils = __esm({
    "packages/lupine.components/src/lib/dom-utils.ts"() {
      "use strict";
      DomUtils = class {
        static getValue(cssSelector) {
          var _a;
          return (_a = document.querySelector(cssSelector)) == null ? void 0 : _a.value;
        }
        static setValue(cssSelector, value) {
          const dom = document.querySelector(cssSelector);
          if (dom) dom.value = value;
        }
        static getChecked(cssSelector) {
          var _a;
          return (_a = document.querySelector(cssSelector)) == null ? void 0 : _a.checked;
        }
        static setChecked(cssSelector, checked) {
          const dom = document.querySelector(cssSelector);
          if (dom) dom.checked = checked;
        }
        static joinValues(values, joinChar = " ") {
          return values.filter(Boolean).join(joinChar);
        }
        static byId(id) {
          return document.querySelector(`#${id}`);
        }
        static bySelector(selector) {
          return document.querySelector(selector);
        }
      };
    }
  });

  // packages/lupine.components/src/lib/download-file.ts
  var _saveChunkSize, setDownloadChunkSize, getDownloadChunkSize, downloadFileChunk, downloadFile;
  var init_download_file = __esm({
    "packages/lupine.components/src/lib/download-file.ts"() {
      "use strict";
      init_src2();
      init_src();
      _saveChunkSize = {
        downloadSize: 1024 * 200
      };
      setDownloadChunkSize = (chunkSize) => {
        _saveChunkSize.downloadSize = chunkSize;
      };
      getDownloadChunkSize = () => {
        return _saveChunkSize.downloadSize;
      };
      downloadFileChunk = async (downloadUrl, rangeStart, rangeLength, retryCount = 3, retryMessage = "") => {
        let url = downloadUrl + (downloadUrl.indexOf("?") === -1 ? "?" : "");
        url += `&start=${rangeStart.toString()}`;
        url += `&length=${rangeLength.toString()}`;
        let tryCount = 0;
        while (tryCount < retryCount) {
          try {
            const rawData = await getRenderPageProps().renderPageFunctions.fetchData(
              url,
              void 0,
              true,
              true
            );
            const fileSize = rawData.headers.get("file-size");
            const partSize = rawData.headers.get("part-size");
            if (!fileSize || !partSize) {
              console.log(`downloadFileChunk error`, rawData);
              return null;
            }
            return {
              fileSize: parseInt(fileSize, 10),
              partSize: parseInt(partSize, 10),
              arrayBuffer: await rawData.arrayBuffer()
            };
          } catch (error) {
            console.log(`downloadFileChunk error, try: ${tryCount}`, error);
          }
          tryCount++;
          if (retryMessage) {
            NotificationMessage.sendMessage(
              retryMessage.replace("${tryCount}", tryCount.toString()),
              "var(--warning-bg-color)" /* Warning */
            );
          }
        }
        return null;
      };
      downloadFile = async (downloadUrl, processResponse, chunkSize = 0, retryCount = 3, retryMessage = "Downloading failed, try: ${tryCount}") => {
        if (chunkSize < 1) {
          chunkSize = _saveChunkSize.downloadSize;
        }
        let downloadSize = 0;
        let expectedFileSize = null;
        while (true) {
          const start = downloadSize;
          const length = chunkSize;
          const downloadResult = await downloadFileChunk(downloadUrl, start, length, retryCount, retryMessage);
          if (!downloadResult) {
            return false;
          }
          if (expectedFileSize === null) {
            expectedFileSize = downloadResult.fileSize;
          }
          downloadSize += downloadResult.partSize;
          const result = processResponse(downloadResult);
          if (result !== void 0) {
            return result;
          }
          if (downloadSize >= expectedFileSize) {
            break;
          }
        }
        return true;
      };
    }
  });

  // packages/lupine.components/src/lib/download-link.ts
  var downloadLink;
  var init_download_link = __esm({
    "packages/lupine.components/src/lib/download-link.ts"() {
      "use strict";
      downloadLink = (link2, filename) => {
        const dom = document.createElement("a");
        dom.setAttribute("href", link2);
        dom.setAttribute("download", filename || "true");
        dom.style.display = "none";
        document.body.appendChild(dom);
        dom.click();
        setTimeout(() => {
          document.body.removeChild(dom);
        }, 3e3);
        return dom;
      };
    }
  });

  // packages/lupine.components/src/lib/download-stream.ts
  var downloadStream;
  var init_download_stream = __esm({
    "packages/lupine.components/src/lib/download-stream.ts"() {
      "use strict";
      downloadStream = (blob, filename) => {
        const blobUrl = URL.createObjectURL(blob);
        const dom = document.createElement("a");
        dom.setAttribute("href", blobUrl);
        dom.setAttribute("download", filename || "true");
        dom.style.display = "none";
        document.body.appendChild(dom);
        dom.click();
        setTimeout(() => {
          document.body.removeChild(dom);
          URL.revokeObjectURL(blobUrl);
        }, 3e3);
        return dom;
      };
    }
  });

  // packages/lupine.components/src/lib/drag-util.ts
  var createDragUtil;
  var init_drag_util = __esm({
    "packages/lupine.components/src/lib/drag-util.ts"() {
      "use strict";
      createDragUtil = () => {
        let isDragging = false;
        let initialX = 0;
        let initialY = 0;
        let draggingDom = null;
        let onMoveCallback = () => {
        };
        let onScaleCallback = () => {
        };
        let isZooming = false;
        let initialDistance = 0;
        const getDistance = (t1, t2) => {
          const dx = t2.clientX - t1.clientX;
          const dy = t2.clientY - t1.clientY;
          return Math.sqrt(dx * dx + dy * dy);
        };
        return {
          setOnMoveCallback: (callback) => {
            onMoveCallback = callback;
          },
          setOnScaleCallback: (callback) => {
            onScaleCallback = callback;
          },
          getDistance,
          getDraggingDom: () => draggingDom,
          onMouseDown: (event) => {
            event.preventDefault();
            if (event.buttons !== 1) {
              isDragging = false;
              draggingDom = null;
              return;
            }
            isDragging = true;
            draggingDom = event.currentTarget;
            initialX = event.clientX;
            initialY = event.clientY;
          },
          onMouseMove: (event) => {
            if (event.buttons === 0 || !draggingDom) {
              isDragging = false;
              draggingDom = null;
              return;
            }
            onMoveCallback(event.clientX, event.clientY, event.clientX - initialX, event.clientY - initialY);
          },
          onMouseUp: () => {
            isDragging = false;
            isZooming = false;
            draggingDom = null;
          },
          onTouchStart: (event) => {
            if (event.touches.length === 1) {
              isDragging = true;
              draggingDom = event.currentTarget;
              initialX = event.touches[0].clientX;
              initialY = event.touches[0].clientY;
            } else if (event.touches.length === 2) {
              initialDistance = getDistance(event.touches[0], event.touches[1]);
              isZooming = true;
            } else {
              isDragging = false;
              draggingDom = null;
            }
          },
          onTouchMove: (event) => {
            if (isZooming) {
              if (event.touches.length === 2) {
                event.preventDefault();
                const newDistance = getDistance(event.touches[0], event.touches[1]);
                const delta = newDistance / initialDistance;
                onScaleCallback(delta);
                return;
              }
            }
            if (!isDragging || event.touches.length === 0 || !draggingDom) {
              isDragging = false;
              draggingDom = null;
              return;
            }
            onMoveCallback(
              event.touches[0].clientX,
              event.touches[0].clientY,
              event.touches[0].clientX - initialX,
              event.touches[0].clientY - initialY
            );
          },
          onTouchEnd: () => {
            isDragging = false;
            isZooming = false;
            draggingDom = null;
          }
        };
      };
    }
  });

  // packages/lupine.components/src/lib/dynamical-load.ts
  var DynamicalLoad;
  var init_dynamical_load = __esm({
    "packages/lupine.components/src/lib/dynamical-load.ts"() {
      "use strict";
      DynamicalLoad = class {
        static loadScript(url, idForReplace, removeOnLoaded = false) {
          return new Promise((resolve, reject) => {
            if (this.existScript(url, idForReplace)) {
              resolve(url);
              return;
            }
            const scriptDom = document.createElement("script");
            scriptDom.src = url;
            if (idForReplace) {
              scriptDom.id = idForReplace;
            }
            scriptDom.onload = () => {
              resolve(url);
              if (removeOnLoaded) {
                scriptDom.remove();
              }
            };
            scriptDom.onerror = () => {
              reject(new Error("Failed to load module script with URL " + url));
              if (removeOnLoaded) {
                scriptDom.remove();
              }
            };
            const head = document.getElementsByTagName("head")[0];
            head ? head.appendChild(scriptDom) : document.documentElement.appendChild(scriptDom);
          });
        }
        // TODO: more accuracy
        static existScript(url, id) {
          if (id) {
            const scriptDom = document.getElementById(id);
            if (scriptDom && scriptDom.tagName === "SCRIPT") {
              const src = scriptDom.src.split("?")[0];
              if (src.substring(src.length - url.length) === url) {
                return true;
              }
            }
          }
          const scripts = document.scripts;
          for (let i = 0; i < scripts.length; i++) {
            const src = scripts[i].src.split("?")[0];
            if (src.substring(src.length - url.length) === url) {
              return true;
            }
          }
        }
        static loadCss(url, idForReplace) {
          return new Promise((resolve, reject) => {
            if (this.existCss(url, idForReplace)) {
              resolve(url);
              return;
            }
            if (idForReplace) {
              const sheet = document.getElementById(idForReplace);
              if (sheet && sheet.tagName === "LINK") {
                sheet.parentNode.removeChild(sheet);
              }
            }
            const linkDom = document.createElement("link");
            linkDom.rel = "stylesheet";
            linkDom.type = "text/css";
            linkDom.href = url;
            linkDom.media = "all";
            if (idForReplace) {
              linkDom.id = idForReplace;
            }
            linkDom.onload = () => {
              resolve(url);
            };
            linkDom.onerror = () => {
              reject(new Error("Failed to load css with URL " + url));
            };
            document.getElementsByTagName("head")[0].appendChild(linkDom);
          });
        }
        // TODO: more accuracy
        static existCss(url, id) {
          if (id) {
            const linkDom = document.getElementById(id);
            if (linkDom && linkDom.tagName === "LINK") {
              const href = linkDom.href.split("?")[0];
              if (href.substring(href.length - url.length) === url) {
                return true;
              }
            }
          }
          const styles = document.styleSheets;
          for (let i = 0; i < styles.length; i++) {
            const linkDom = styles[i];
            const href = linkDom.href.split("?")[0];
            if (href.substring(href.length - url.length) === url) {
              return true;
            }
          }
        }
        // removeCss(url: string, id?: string) {
        //     if (id) {
        //         const sheet = document.getElementById(id);
        //         if (sheet && sheet instanceof HTMLElement) {
        //             const href = (<any>sheet).href;
        //             if (href.substring(href.length - url.length) === url) {
        //                 (<any>sheet).disabled = true;
        //                 sheet.parentNode.removeChild(sheet);
        //                 return;
        //             }
        //         }
        //     }
        //     const styles = document.styleSheets;
        //     for (const i = 0; i < styles.length; i++) {
        //         const sheet = styles[i] as any;
        //         if (sheet.href.substring(sheet.href.length - url.length) === url) {
        //             sheet.disabled = true;
        //             sheet.ownerNode.parentNode.removeChild(sheet.ownerNode);
        //             return;
        //         }
        //     }
        // }
      };
    }
  });

  // packages/lupine.components/src/lib/encode-html.ts
  var encodeHtml, decodeHtml;
  var init_encode_html = __esm({
    "packages/lupine.components/src/lib/encode-html.ts"() {
      "use strict";
      encodeHtml = (str2) => {
        return str2.replace(
          /[&<>'"]/g,
          (tag2) => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            "'": "&#39;",
            '"': "&quot;"
          })[tag2] || ""
        );
      };
      decodeHtml = (str2) => {
        return str2.replace(
          /&(\D+);/gi,
          (tag2) => ({
            "&amp;": "&",
            "&lt;": "<",
            "&gt;": ">",
            "&#39;": "'",
            "&quot;": '"'
          })[tag2] || ""
        );
      };
    }
  });

  // packages/lupine.components/src/lib/find-parent-tag.ts
  var findParentTag;
  var init_find_parent_tag = __esm({
    "packages/lupine.components/src/lib/find-parent-tag.ts"() {
      "use strict";
      findParentTag = (dom, tag2) => {
        const tagUpper = tag2.toUpperCase();
        let parent = dom.parentElement;
        while (parent && parent.tagName !== tagUpper && parent.tagName !== "BODY") {
          parent = parent.parentElement;
        }
        return parent;
      };
    }
  });

  // packages/lupine.components/src/lib/format-bytes.ts
  var formatBytes;
  var init_format_bytes = __esm({
    "packages/lupine.components/src/lib/format-bytes.ts"() {
      "use strict";
      formatBytes = (bytes, decimals = 2) => {
        if (!+bytes) return "0 Bytes";
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["Bytes", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
      };
    }
  });

  // packages/lupine.components/src/lib/lite-dom.ts
  var LiteDom;
  var init_lite_dom = __esm({
    "packages/lupine.components/src/lib/lite-dom.ts"() {
      "use strict";
      LiteDom = class _LiteDom {
        static queryOne(selector, docRoot) {
          if (!selector) {
            return null;
          }
          if (selector instanceof _LiteDom) {
            return selector;
          }
          if (selector instanceof Element) {
            return new _LiteDom(selector);
          }
          const el = (docRoot || document).querySelector(selector);
          return el ? new _LiteDom(el) : null;
        }
        static queryAll(selector, docRoot) {
          if (!selector) {
            return [];
          }
          if (selector instanceof _LiteDom) {
            return [selector];
          }
          if (selector instanceof Element) {
            return [new _LiteDom(selector)];
          }
          const el = (docRoot || document).querySelectorAll(selector);
          const ret = [];
          for (let i in el) {
            ret.push(new _LiteDom(el[i]));
          }
          return ret;
        }
        static createElement(html2, docRoot) {
          const dom = (docRoot || document).createElement(html2);
          const domLib = new _LiteDom(dom);
          return domLib;
        }
        constructor(selector, docRoot) {
          if (selector instanceof _LiteDom) {
            this.node = selector.node;
          } else if (selector instanceof Element) {
            this.node = selector;
          } else {
            const el = selector && (docRoot || document).querySelector(selector);
            if (el) {
              this.node = el;
            } else {
              throw new TypeError("Element is not defined for a new LibDom");
            }
          }
        }
        getElement() {
          return this.node;
        }
        // query children and set value or innerHTML
        $(selector, value) {
          const dom = _LiteDom.queryOne(selector, this.node);
          if (dom && typeof value !== "undefined") {
            if ("checked" in dom.node) {
              dom.node.checked = !!value;
            } else if ("value" in dom.node) {
              dom.node.value = value;
            } else if ("innerHTML" in dom.node) {
              dom.node.innerHTML = "" + value;
            }
          }
          return dom;
        }
        // query children
        query(selector) {
          return _LiteDom.queryOne(selector, this.node);
        }
        // query children
        queryAll(selector) {
          return _LiteDom.queryAll(selector, this.node);
        }
        on(eventName, eventHandler) {
          this.node.addEventListener(eventName, eventHandler, false);
          return this;
        }
        off(eventName, eventHandler) {
          this.node.removeEventListener(eventName, eventHandler, false);
          return this;
        }
        fire(event) {
          this.node.dispatchEvent(event);
          return this;
        }
        isCheckbox() {
          return this.tagName === "INPUT" && this.node.type === "checkbox";
        }
        isRadio() {
          return this.tagName === "INPUT" && this.node.type === "radio";
        }
        val(value) {
          if (typeof value === "undefined") {
            return this.node.value;
          }
          "value" in this.node && (this.node.value = value);
          return this;
        }
        checked(value) {
          if (typeof value === "undefined") {
            return this.node.checked;
          }
          "checked" in this.node && (this.node.checked = !!value);
          return this;
        }
        selectedIndex(value) {
          if (typeof value === "undefined") {
            return this.node.selectedIndex;
          }
          "selectedIndex" in this.node && (this.node.selectedIndex = value);
          return this;
        }
        html(value) {
          if (typeof value === "undefined") {
            return this.node.innerHTML;
          }
          "innerHTML" in this.node && (this.node.innerHTML = value);
          return this;
        }
        /*
            element.style.backgroundColor = 'blue' // works
            element.style['backgroundColor'] = 'blue' // works
            element.style['background-color'] = 'blue' // does not work
        
            element.style.setProperty('background-color','blue') // works
            element.style.setProperty('backgroundColor','blue') // does not work
          */
        css(propertyName, value) {
          if (typeof value === "undefined") {
            return this.node instanceof HTMLElement && this.node.style.getPropertyValue(propertyName);
          }
          if (this.node instanceof HTMLElement) {
            if (value === null) {
              this.node.style.removeProperty(propertyName);
            } else {
              this.node.style.setProperty(propertyName, value);
            }
          }
          return this;
        }
        attribute(attributeName, value) {
          if (typeof value === "undefined") {
            return this.node.getAttribute(attributeName);
          }
          if (value === null) {
            this.node.removeAttribute(attributeName);
          } else {
            this.node.setAttribute(attributeName, value);
          }
          return this;
        }
        class(addClass, removeClass) {
          if (!addClass && !removeClass) {
            return this.node.className;
          }
          const classList = this.node.classList;
          if (addClass) {
            addClass instanceof Array ? classList.add(...addClass) : classList.add(addClass);
          }
          if (removeClass) {
            removeClass instanceof Array ? classList.remove(...removeClass) : classList.remove(removeClass);
          }
          return this;
        }
        appendChild(child) {
          const dom = child instanceof _LiteDom ? child.getElement() : child;
          dom && this.node.appendChild(dom);
          return this;
        }
        removeChild(child) {
          const dom = child instanceof _LiteDom ? child.getElement() : child;
          dom && this.node.removeChild(dom);
          return this;
        }
        removeSelf() {
          this.node.remove();
          return this;
        }
        get children() {
          if (!this.node.children) {
            return [];
          }
          const ret = [];
          for (let i = 0; i < this.node.children.length; i++) {
            ret.push(new _LiteDom(this.node.children[i]));
          }
          return ret;
        }
        // originally returns the HTML-uppercased qualified name.
        get tagName() {
          return this.node.tagName.toUpperCase();
        }
      };
    }
  });

  // packages/lupine.components/src/lib/message-hub.ts
  var MessageHubData, MessageHub;
  var init_message_hub = __esm({
    "packages/lupine.components/src/lib/message-hub.ts"() {
      "use strict";
      MessageHubData = class {
        constructor(actionId, message, extraData) {
          this.actionId = actionId;
          this.message = message;
          this.extraData = extraData;
        }
      };
      MessageHub = class {
        constructor(passLastMsgWhenSubscribe = false) {
          this.passLastMsgWhenSubscribe = passLastMsgWhenSubscribe;
          this.subscriptions = {};
          this.subscriptionValues = {};
          this.lastId = 0;
        }
        // * for listening to all events
        subscribe(targetType, fn, recessiveLassMsg = true) {
          const id = this.lastId++;
          if (!this.subscriptions[targetType]) {
            this.subscriptions[targetType] = {};
          }
          this.subscriptions[targetType][id] = fn;
          if (recessiveLassMsg && this.passLastMsgWhenSubscribe && this.subscriptionValues[targetType]) {
            this.notify(fn, this.subscriptionValues[targetType]);
          }
          return () => {
            delete this.subscriptions[targetType][id];
            var needDestroy = true;
            for (var key in this.subscriptions[targetType]) {
              needDestroy = false;
              break;
            }
            if (needDestroy) {
              delete this.subscriptions[targetType];
            }
          };
        }
        send(targetType, arg) {
          if (targetType === "*") {
            for (var groupKey in this.subscriptions) {
              for (var key in this.subscriptions[groupKey]) {
                this.notify(this.subscriptions[groupKey][key], arg);
              }
            }
            return;
          }
          if (this.passLastMsgWhenSubscribe) {
            this.subscriptionValues[targetType] = arg;
          }
          if (this.subscriptions[targetType]) {
            for (var key in this.subscriptions[targetType]) {
              this.notify(this.subscriptions[targetType][key], arg);
            }
          }
          if (this.subscriptions["*"]) {
            for (var key in this.subscriptions["*"]) {
              this.notify(this.subscriptions["*"][key], arg);
            }
          }
        }
        hasListener(targetType) {
          if (targetType === "*") {
            for (var groupKey in this.subscriptions) {
              return true;
            }
          } else {
            for (var groupKey in this.subscriptions[targetType]) {
              return true;
            }
          }
          return false;
        }
        notify(fn, arg) {
          setTimeout(() => {
            fn(arg);
          }, 0);
        }
      };
    }
  });

  // packages/lupine.components/src/lib/observable.ts
  var Subscription, Observable, Subject;
  var init_observable = __esm({
    "packages/lupine.components/src/lib/observable.ts"() {
      "use strict";
      Subscription = class {
        constructor(unsubscribe) {
          this._unsubscribe = unsubscribe;
        }
        unsubscribe() {
          if (this._unsubscribe) {
            this._unsubscribe();
          }
        }
      };
      Observable = class {
        constructor() {
        }
        subscribe(next, error, complete) {
          throw new Error("subscribe is not implemented");
        }
      };
      Subject = class extends Observable {
        constructor(passLastMsgWhenSubscribe = false) {
          super();
          this.observers = [];
          this.isStopped = false;
          this._hasError = false;
          this.lastSaved = {};
          this.passLastMsgWhenSubscribe = passLastMsgWhenSubscribe;
        }
        next(value) {
          if (this.isStopped) {
            throw new Error("Subject is closed");
          }
          const len = this.observers.length;
          const copy = this.observers.slice();
          for (let i = 0; i < len; i++) {
            const item = copy[i].next;
            if (typeof item !== "undefined" && typeof value !== "undefined") {
              item(value);
            }
          }
          if (this.passLastMsgWhenSubscribe) {
            if (typeof value !== "undefined") {
              this.lastSaved["value"] = value;
            }
          }
        }
        error(err) {
          if (this.isStopped) {
            throw new Error("Subject is closed");
          }
          this._hasError = true;
          this.isStopped = true;
          const len = this.observers.length;
          const copy = this.observers.slice();
          for (let i = 0; i < len; i++) {
            const item = copy[i].error;
            if (typeof item !== "undefined" && typeof err !== "undefined") {
              item(err);
            }
          }
          this.observers.length = 0;
        }
        complete() {
          if (this.isStopped) {
            throw new Error("Subject is closed");
          }
          this.isStopped = true;
          const copy = this.observers.slice();
          const len = copy.length;
          for (let i = 0; i < len; i++) {
            const item = copy[i].complete;
            if (typeof item !== "undefined") {
              item();
            }
          }
          if (this.observers.length != len) {
            console.warn(`Subscribe count changed from ${len} to ${this.observers.length}`);
          }
          this.observers.length = 0;
        }
        hasError() {
          return this._hasError;
        }
        unsubscribe(observer) {
          const index = this.observers.findIndex((item) => item === observer);
          if (index > -1) {
            this.observers.splice(index, 1);
          }
        }
        subscribe(next, error, complete) {
          if (this.isStopped) {
            throw new Error("Subject is stopped");
          }
          const observer = {
            next,
            error,
            complete
          };
          this.observers.push(observer);
          if (this.passLastMsgWhenSubscribe) {
            if (typeof observer.next !== "undefined" && typeof this.lastSaved["value"] !== "undefined") {
              observer.next(this.lastSaved["value"]);
            }
          }
          const ret = new Subscription(() => {
            this.unsubscribe(observer);
          });
          return ret;
        }
        asObservable() {
          return this;
        }
      };
    }
  });

  // packages/lupine.components/src/lib/path-utils.ts
  var pathUtils;
  var init_path_utils = __esm({
    "packages/lupine.components/src/lib/path-utils.ts"() {
      "use strict";
      pathUtils = {
        join(...parts) {
          var _a;
          let joined = parts.filter(Boolean).join("/");
          joined = joined.replace(/\/+/g, "/");
          const isAbsolute = (_a = parts[0]) == null ? void 0 : _a.startsWith("/");
          return isAbsolute ? "/" + joined.replace(/^\/+/, "") : joined.replace(/^\/+/, "");
        },
        dirname(p) {
          if (!p) return ".";
          p = p.replace(/\/+$/, "");
          const idx = p.lastIndexOf("/");
          if (idx === -1) return ".";
          if (idx === 0) return "/";
          return p.slice(0, idx);
        },
        // get filename, remove ext if exists
        basename(p, ext) {
          if (!p) return "";
          p = p.replace(/\/+$/, "");
          const idx = p.lastIndexOf("/");
          let base = idx === -1 ? p : p.slice(idx + 1);
          if (!ext) {
            const lastPot = p.lastIndexOf(".");
            if (lastPot >= 0) {
              base = base.slice(0, lastPot);
            }
          } else if (ext && base.endsWith(ext)) {
            base = base.slice(0, -ext.length);
          }
          return base;
        },
        // .hidden's ext is empty (Node.js behavior)
        extname(p) {
          if (!p) return "";
          const base = pathUtils.basename(p);
          const idx = base.lastIndexOf(".");
          return idx > 0 ? base.slice(idx) : "";
        }
      };
    }
  });

  // packages/lupine.components/src/lib/promise-timeout.ts
  var promiseTimeout;
  var init_promise_timeout = __esm({
    "packages/lupine.components/src/lib/promise-timeout.ts"() {
      "use strict";
      promiseTimeout = (delayMs) => new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  });

  // packages/lupine.components/src/lib/simple-storage.ts
  var SimpleStorage;
  var init_simple_storage = __esm({
    "packages/lupine.components/src/lib/simple-storage.ts"() {
      "use strict";
      SimpleStorage = class {
        constructor(settings) {
          this.settings = {};
          this.settings = settings;
        }
        contains(key) {
          return key in this.settings;
        }
        set(key, value) {
          return this.settings[key] = value;
        }
        get(key, defaultValue) {
          return key in this.settings ? this.settings[key] : defaultValue;
        }
        getInt(key, defaultValue) {
          if (key in this.settings) {
            const i = parseInt(this.settings[key]);
            if (!isNaN(i)) {
              return i;
            }
          }
          return defaultValue;
        }
        getBoolean(key, defaultValue) {
          return key in this.settings ? this.settings[key] === "1" || this.settings[key].toLowerCase() === "true" : defaultValue;
        }
        getJson(key, defaultValue) {
          if (key in this.settings) {
            try {
              return JSON.parse(this.settings[key]);
            } catch (error) {
            }
          }
          return defaultValue;
        }
      };
    }
  });

  // packages/lupine.components/src/lib/stop-propagation.ts
  var stopPropagation;
  var init_stop_propagation = __esm({
    "packages/lupine.components/src/lib/stop-propagation.ts"() {
      "use strict";
      stopPropagation = (event) => {
        if (!event) return;
        if (event.stopPropagation) event.stopPropagation();
        if (event.preventDefault) event.preventDefault();
        event.cancelBubble = true;
        event.returnValue = false;
      };
    }
  });

  // packages/lupine.web/jsx-runtime/index.js
  function jsx(type, props) {
    return { type, props };
  }
  function Fragment(props) {
    return { type: "Fragment", props };
  }
  var init_jsx_runtime = __esm({
    "packages/lupine.web/jsx-runtime/index.js"() {
      "use strict";
    }
  });

  // packages/lupine.components/src/components/action-sheet.tsx
  var ActionSheet, ActionSheetSelectOptionsProps, ActionSheetSelect, ActionSheetMessage, ActionSheetMessagePromise, ActionSheetInput, ActionSheetInputPromise, ActionSheetSelectPromise;
  var init_action_sheet = __esm({
    "packages/lupine.components/src/components/action-sheet.tsx"() {
      "use strict";
      init_src();
      init_lib2();
      init_jsx_runtime();
      ActionSheet = class {
        static async show({
          title,
          children,
          contentMaxWidth,
          contentMaxHeight,
          closeEvent,
          closeWhenClickOutside = true,
          confirmButtonText = "",
          handleConfirmClicked,
          cancelButtonText = "Cancel",
          zIndex
        }) {
          const onConfirm = () => {
            if (handleConfirmClicked) {
              handleConfirmClicked(handleClose);
            } else {
              handleClose("confirm");
            }
          };
          const onCancel = () => {
            handleClose("cancel");
          };
          const onClickContainer = (event) => {
            if (closeWhenClickOutside !== false && event.target.classList.contains("act-sheet-box")) {
              handleClose("cancel");
            }
          };
          const handleClose = (reason) => {
            closeEvent == null ? void 0 : closeEvent(reason);
            ref.current.classList.remove("animation-open");
            setTimeout(() => {
              base.remove();
            }, 300);
          };
          const base = document.createElement("div");
          const ref = {
            onLoad: async () => {
              setTimeout(() => {
                ref.current.classList.add("animation-open");
              }, 1);
            }
          };
          const cssContainer = {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "var(--cover-mask-bg-color)",
            ".act-sheet-body": {
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              position: "fixed",
              bottom: "0px",
              left: "0px",
              width: "100%",
              maxHeight: contentMaxHeight ? contentMaxHeight : "100%",
              color: "var(--primary-color)",
              padding: "8px",
              transition: "all 0.3s",
              transform: "translateY(100%)",
              "&.animation-open": {
                transform: "translateY(0)"
              },
              ".act-sheet-title": {
                padding: "20px 15px 10px 15px",
                opacity: 0.5
              },
              ".act-sheet-content": {
                display: "flex",
                flexDirection: "column",
                flex: 1,
                overflowY: "auto",
                borderRadius: "8px",
                backgroundColor: "var(--cover-bg-color)",
                //'#fefefe',
                width: "100%",
                maxWidth: contentMaxWidth ? contentMaxWidth : `clamp(200px, 90%, 600px)`,
                margin: "0 auto"
              },
              ".act-sheet-bottom-item, .act-sheet-item": {
                backgroundColor: "var(--cover-bg-color)",
                //'#fefefe',
                padding: "20px 0",
                cursor: "pointer",
                transition: "all 0.3s ease",
                width: "100%",
                maxWidth: contentMaxWidth ? contentMaxWidth : `clamp(200px, 90%, 600px)`,
                borderTop: "1px solid var(--primary-border-color)"
              },
              ".act-sheet-bottom-item": {
                borderRadius: "8px",
                margin: "0 auto",
                marginTop: "4px"
              },
              ".act-sheet-bottom-item:hover, .act-sheet-item:hover": {
                fontWeight: "bold"
              },
              ".act-sheet-confirm, .act-sheet-item": {
                borderRadius: "unset",
                marginTop: "unset",
                maxWidth: "unset"
              }
            }
          };
          const component = /* @__PURE__ */ jsx(
            "div",
            {
              css: cssContainer,
              class: "act-sheet-box",
              onClick: onClickContainer,
              "data-back-action": backActionHelper.genBackActionId(),
              children: /* @__PURE__ */ jsx("div", { ref, class: "act-sheet-body", children: [
                /* @__PURE__ */ jsx("div", { class: "act-sheet-content", children: [
                  /* @__PURE__ */ jsx("div", { class: "act-sheet-title", children: title }),
                  children,
                  confirmButtonText && /* @__PURE__ */ jsx("div", { class: "act-sheet-bottom-item act-sheet-confirm", onClick: onConfirm, children: confirmButtonText })
                ] }),
                cancelButtonText && /* @__PURE__ */ jsx("div", { class: "act-sheet-bottom-item", onClick: onCancel, children: cancelButtonText })
              ] })
            }
          );
          base.style.position = "fixed";
          base.style.zIndex = zIndex || "var(--layer-actionsheet-window)";
          document.body.appendChild(base);
          await mountInnerComponent(base, component);
          return handleClose;
        }
      };
      ActionSheetSelectOptionsProps = {
        YesNo: ["Yes", "No"],
        Ok: ["OK"]
      };
      ActionSheetSelect = class {
        static async show({
          title,
          contentMaxHeight,
          options: options3 = ActionSheetSelectOptionsProps.Ok,
          closeEvent,
          handleClicked,
          closeWhenClickOutside = true,
          confirmButtonText,
          handleConfirmClicked,
          cancelButtonText = "Cancel"
        }) {
          const handleClose = await ActionSheet.show({
            title,
            children: /* @__PURE__ */ jsx("div", { children: options3.map((option, index) => /* @__PURE__ */ jsx("div", { class: "act-sheet-item", onClick: () => handleClicked(index, handleClose), children: option }, index)) }),
            contentMaxHeight,
            confirmButtonText,
            handleConfirmClicked,
            cancelButtonText,
            closeEvent,
            closeWhenClickOutside
          });
          return handleClose;
        }
      };
      ActionSheetMessage = class {
        static async show({
          title,
          message,
          contentMaxWidth,
          contentMaxHeight,
          closeWhenClickOutside = true,
          confirmButtonText,
          handleConfirmClicked,
          cancelButtonText = ""
        }) {
          const handleClose = await ActionSheet.show({
            title,
            children: /* @__PURE__ */ jsx(
              "div",
              {
                css: { padding: "8px", borderTop: "1px solid var(--primary-border-color)" },
                onClick: () => handleClose("select"),
                children: message
              }
            ),
            contentMaxWidth,
            contentMaxHeight,
            confirmButtonText,
            handleConfirmClicked,
            cancelButtonText,
            closeWhenClickOutside
          });
          return handleClose;
        }
      };
      ActionSheetMessagePromise = async ({
        title,
        message,
        contentMaxWidth,
        contentMaxHeight,
        closeWhenClickOutside = true,
        confirmButtonText,
        zIndex
      }) => {
        return new Promise(async (resolve, reject) => {
          const closeEvent = (reason) => {
            resolve();
          };
          await ActionSheet.show({
            title,
            children: /* @__PURE__ */ jsx("div", { css: { padding: "8px", borderTop: "1px solid var(--primary-border-color)" }, children: message }),
            contentMaxWidth,
            contentMaxHeight,
            confirmButtonText,
            closeEvent,
            closeWhenClickOutside,
            zIndex
          });
        });
      };
      ActionSheetInput = class {
        static async show({
          title,
          defaultValue,
          contentMaxHeight,
          closeWhenClickOutside = true,
          confirmButtonText = "OK",
          handleConfirmValue,
          cancelButtonText = "Cancel"
        }) {
          let value = defaultValue || "";
          const handleClose = await ActionSheet.show({
            title,
            children: /* @__PURE__ */ jsx("div", { css: { padding: "8px", borderTop: "1px solid var(--primary-border-color)" }, children: /* @__PURE__ */ jsx(
              "input",
              {
                class: "input-base w-100p",
                type: "text",
                value,
                onInput: (e) => value = e.target.value
              }
            ) }),
            contentMaxHeight,
            confirmButtonText,
            handleConfirmClicked: (close) => {
              handleConfirmValue(value, close);
            },
            cancelButtonText,
            closeWhenClickOutside
          });
          return handleClose;
        }
      };
      ActionSheetInputPromise = async ({
        title,
        defaultValue,
        contentMaxWidth,
        contentMaxHeight,
        closeWhenClickOutside = true,
        confirmButtonText = "OK",
        cancelButtonText = "Cancel",
        zIndex
      }) => {
        return new Promise(async (resolve, reject) => {
          const closeEvent = (reason) => {
            if (reason !== "confirm") {
              resolve(void 0);
            }
          };
          let value = defaultValue || "";
          await ActionSheet.show({
            title,
            children: /* @__PURE__ */ jsx("div", { css: { padding: "8px", borderTop: "1px solid var(--primary-border-color)" }, children: /* @__PURE__ */ jsx(
              "input",
              {
                class: "input-base w-100p",
                type: "text",
                value,
                onInput: (e) => value = e.target.value
              }
            ) }),
            contentMaxWidth,
            contentMaxHeight,
            confirmButtonText,
            handleConfirmClicked: (close) => {
              resolve(value);
              close("confirm");
            },
            closeEvent,
            cancelButtonText,
            closeWhenClickOutside,
            zIndex
          });
        });
      };
      ActionSheetSelectPromise = async ({
        title,
        contentMaxWidth,
        contentMaxHeight,
        options: options3 = ActionSheetSelectOptionsProps.Ok,
        closeWhenClickOutside = true,
        cancelButtonText = "Cancel",
        zIndex
      }) => {
        return new Promise(async (resolve, reject) => {
          const handleClicked = async (index, close) => {
            resolve(index);
            close("select");
          };
          const closeEvent = (reason) => {
            if (reason !== "select") {
              resolve(-1);
            }
          };
          const handleClose = await ActionSheet.show({
            title,
            children: /* @__PURE__ */ jsx("div", { children: options3.map((option, index) => /* @__PURE__ */ jsx("div", { class: "act-sheet-item", onClick: () => handleClicked(index, handleClose), children: option }, index)) }),
            contentMaxWidth,
            contentMaxHeight,
            cancelButtonText,
            closeEvent,
            closeWhenClickOutside,
            zIndex
          });
        });
      };
    }
  });

  // packages/lupine.components/src/components/button-push-animation.tsx
  var ButtonPushAnimationSize, ButtonPushAnimation;
  var init_button_push_animation = __esm({
    "packages/lupine.components/src/components/button-push-animation.tsx"() {
      "use strict";
      init_jsx_runtime();
      ButtonPushAnimationSize = /* @__PURE__ */ ((ButtonPushAnimationSize2) => {
        ButtonPushAnimationSize2["SmallSmall"] = "button-ss";
        ButtonPushAnimationSize2["Small"] = "button-s";
        ButtonPushAnimationSize2["Medium"] = "button-m";
        ButtonPushAnimationSize2["Large"] = "button-l";
        ButtonPushAnimationSize2["LargeLarge"] = "button-ll";
        return ButtonPushAnimationSize2;
      })(ButtonPushAnimationSize || {});
      ButtonPushAnimation = (props) => {
        let disabled = props.disabled || false;
        const onClick = () => {
          if (disabled) {
            return;
          }
          if (props.onClick) {
            props.onClick();
          }
        };
        if (props.hook) {
          props.hook.setEnabled = (enabled) => {
            disabled = !enabled;
            ref.current.disabled = disabled;
          };
          props.hook.getEnabled = () => {
            return !disabled;
          };
        }
        const ref = {};
        const css = {
          all: "unset",
          cursor: "pointer",
          "-webkit-tap-highlight-color": "rgba(0, 0, 0, 0)",
          position: "relative",
          borderRadius: "var(--border-radius-m)",
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          boxShadow: "-0.15em -0.15em 0.15em -0.075em rgba(5, 5, 5, 0.25), 0.0375em 0.0375em 0.0675em 0 rgba(5, 5, 5, 0.1)",
          ".button-outer": {
            position: "relative",
            zIndex: 1,
            borderRadius: "inherit",
            transition: "box-shadow 300ms ease",
            willChange: "box-shadow",
            boxShadow: "0 0.05em 0.05em -0.01em rgba(5, 5, 5, 1), 0 0.01em 0.01em -0.01em rgba(5, 5, 5, 0.5), 0.15em 0.3em 0.1em -0.01em rgba(5, 5, 5, 0.25)"
          },
          ".button-inner": {
            position: "relative",
            zIndex: 2,
            borderRadius: "inherit",
            padding: "var(--button-padding)",
            background: "linear-gradient(135deg, #ffffff, #eeeeee)",
            transition: "box-shadow 300ms ease, background-image 250ms ease, transform 250ms ease;",
            willChange: "box-shadow, background-image, transform",
            overflow: "clip",
            // clipPath: 'inset(0 0 0 0 round 999vw)',
            boxShadow: "0 0 0 0 inset rgba(5, 5, 5, 0.1), -0.05em -0.05em 0.05em 0 inset rgba(5, 5, 5, 0.25), 0 0 0 0 inset rgba(5, 5, 5, 0.1), 0 0 0.05em 0.2em inset rgba(255, 255, 255, 0.25), 0.025em 0.05em 0.1em 0 inset rgba(255, 255, 255, 1), 0.12em 0.12em 0.12em inset rgba(255, 255, 255, 0.25), -0.075em -0.25em 0.25em 0.1em inset rgba(5, 5, 5, 0.25)"
          },
          ".button-inner span": {
            position: "relative",
            zIndex: 4,
            // fontFamily: 'Inter, sans-serif',
            letterSpacing: "-0.05em",
            // fontWeight: 500,
            color: "rgba(0, 0, 0, 0);",
            backgroundImage: "linear-gradient(135deg, rgba(25, 25, 25, 1), rgba(75, 75, 75, 1))",
            backgroundClip: "text",
            transition: "transform 250ms ease",
            display: "block",
            willChange: "transform",
            textShadow: "rgba(0, 0, 0, 0.1) 0 0 0.1em",
            userSelect: "none"
          },
          "&.button-ss": {
            borderRadius: "2px"
          },
          "&.button-s": {
            borderRadius: "3px"
          },
          "&.button-l": {
            borderRadius: "6px"
          },
          "&.button-ll": {
            borderRadius: "10px"
          },
          "&.button-ss .button-inner": {
            padding: "0.1rem 0.3rem",
            fontSize: "0.65rem"
          },
          "&.button-s .button-inner": {
            padding: "0.2rem 0.5rem",
            fontSize: "0.85rem"
          },
          "&.button-l .button-inner": {
            padding: "0.4rem 1.2rem",
            fontSize: "1.5rem"
          },
          "&.button-ll .button-inner": {
            padding: "0.5rem 1.5rem",
            fontSize: "2rem"
          },
          "&:active .button-outer": {
            boxShadow: "0 0 0 0 rgba(5, 5, 5, 1), 0 0 0 0 rgba(5, 5, 5, 0.5), 0 0 0 0 rgba(5, 5, 5, 0.25)"
          },
          "&:active .button-inner": {
            boxShadow: "0.1em 0.15em 0.05em 0 inset rgba(5, 5, 5, 0.75), -0.025em -0.03em 0.05em 0.025em inset rgba(5, 5, 5, 0.5), 0.25em 0.25em 0.2em 0 inset rgba(5, 5, 5, 0.5), 0 0 0.05em 0.5em inset rgba(255, 255, 255, 0.15), 0 0 0 0 inset rgba(255, 255, 255, 1), 0.12em 0.12em 0.12em inset rgba(255, 255, 255, 0.25), -0.075em -0.12em 0.2em 0.1em inset rgba(5, 5, 5, 0.25)"
          },
          "&:hover .button-inner": {
            transform: "scale(0.99)"
          },
          "&:hover .button-inner span": {
            transform: "scale(0.975)"
          },
          ...props.css
        };
        return /* @__PURE__ */ jsx(
          "button",
          {
            ref,
            css,
            class: ["button-push-animation", props.size, props.class].join(" "),
            disabled,
            onClick,
            children: /* @__PURE__ */ jsx("div", { class: "button-outer", children: /* @__PURE__ */ jsx("div", { class: "button-inner", children: /* @__PURE__ */ jsx("span", { children: props.text }) }) })
          }
        );
      };
    }
  });

  // packages/lupine.components/src/components/button.tsx
  var ButtonSize, Button;
  var init_button = __esm({
    "packages/lupine.components/src/components/button.tsx"() {
      "use strict";
      init_jsx_runtime();
      ButtonSize = /* @__PURE__ */ ((ButtonSize2) => {
        ButtonSize2["SmallLarge"] = "button-ss";
        ButtonSize2["Small"] = "button-s";
        ButtonSize2["Medium"] = "button-m";
        ButtonSize2["Large"] = "button-l";
        ButtonSize2["LargeLarge"] = "button-ll";
        return ButtonSize2;
      })(ButtonSize || {});
      Button = (props) => {
        let disabled = props.disabled || false;
        const onClick = () => {
          if (disabled) {
            return;
          }
          if (props.onClick) {
            props.onClick();
          }
        };
        if (props.hook) {
          props.hook.setEnabled = (enabled) => {
            disabled = !enabled;
            ref.current.disabled = disabled;
          };
          props.hook.getEnabled = () => {
            return !disabled;
          };
        }
        const ref = {};
        return /* @__PURE__ */ jsx(
          "button",
          {
            ref,
            class: ["button-base", props.size, props.class].join(" "),
            css: props.css,
            disabled,
            onClick,
            children: props.text
          }
        );
      };
    }
  });

  // packages/lupine.components/src/components/spinner.tsx
  var SpinnerSize, Spinner01, Spinner02, Spinner03;
  var init_spinner = __esm({
    "packages/lupine.components/src/components/spinner.tsx"() {
      "use strict";
      init_jsx_runtime();
      SpinnerSize = /* @__PURE__ */ ((SpinnerSize2) => {
        SpinnerSize2["Small"] = "22px";
        SpinnerSize2["Medium"] = "30px";
        SpinnerSize2["Large"] = "40px";
        SpinnerSize2["LargeLarge"] = "60px";
        return SpinnerSize2;
      })(SpinnerSize || {});
      Spinner01 = ({
        size = "30px" /* Medium */,
        color = "var(--primary-color)"
      }) => {
        const borderWidth = size === "22px" /* Small */ || size === "30px" /* Medium */ ? "4px" : size === "40px" /* Large */ ? "6px" : "9px";
        const css = {
          width: size,
          aspectRatio: 1,
          borderRadius: "50%",
          background: `radial-gradient(farthest-side,${color} 94%,#0000) top/8px 8px no-repeat, conic-gradient(#0000 30%,${color})`,
          "-webkit-mask": `radial-gradient(farthest-side,#0000 calc(100% - ${borderWidth}),#000 0)`,
          animation: "spinner01 1s infinite linear",
          "@keyframes spinner01": {
            "100%": { transform: "rotate(1turn)" }
          }
        };
        return /* @__PURE__ */ jsx("div", { css });
      };
      Spinner02 = ({
        size = "30px" /* Medium */,
        color = "var(--primary-color)"
      }) => {
        const base = parseInt(size.replace("px", ""));
        const ballSize = Array.from({ length: 7 }, (_, i) => `${(i * base / 15 / 7).toFixed(2)}px`);
        const css = {
          width: size,
          height: size,
          display: "flex",
          placeItems: "center",
          justifyContent: "center",
          ".spinner02-box": {
            "--spin02-w": `${base / 2 - 3}px`,
            width: "4px",
            height: "4px",
            borderRadius: "50%",
            color,
            boxShadow: `
    calc(1*var(--spin02-w))      calc(0*var(--spin02-w))      0 0,
    calc(0.707*var(--spin02-w))  calc(0.707*var(--spin02-w))  0 ${ballSize[1]},
    calc(0*var(--spin02-w))      calc(1*var(--spin02-w))      0 ${ballSize[2]},
    calc(-0.707*var(--spin02-w)) calc(0.707*var(--spin02-w))  0 ${ballSize[3]},
    calc(-1*var(--spin02-w))     calc(0*var(--spin02-w))      0 ${ballSize[4]},
    calc(-0.707*var(--spin02-w)) calc(-0.707*var(--spin02-w)) 0 ${ballSize[5]},
    calc(0*var(--spin02-w))      calc(-1*var(--spin02-w))     0 ${ballSize[6]}`,
            animation: "spinner02 1s infinite steps(8)"
          },
          "@keyframes spinner02": {
            "100%": { transform: "rotate(1turn)" }
          }
        };
        return /* @__PURE__ */ jsx("div", { css, children: /* @__PURE__ */ jsx("div", { class: "spinner02-box" }) });
      };
      Spinner03 = ({
        size = "30px" /* Medium */,
        colorRGB = "55 55 55"
      }) => {
        const css = {
          width: size,
          height: size,
          aspectRatio: 1,
          display: "grid",
          borderRadius: "50%",
          background: `linear-gradient(0deg, rgb(${colorRGB} / 50%) 30%, #0000 0 70%, rgb(${colorRGB} / 100%) 0) 50% / 8% 100%, linear-gradient(90deg, rgb(${colorRGB} / 25%) 30%, #0000 0 70%, rgb(${colorRGB} / 75%) 0) 50% / 100% 8%`,
          backgroundRepeat: "no-repeat",
          animation: "spinner03 1s infinite steps(12)",
          "&::before, &::after": {
            content: '""',
            gridArea: "1/1",
            borderRadius: "50%",
            background: "inherit",
            opacity: 0.915,
            transform: "rotate(30deg)"
          },
          "&::after": {
            opacity: 0.83,
            transform: "rotate(60deg)"
          },
          "@keyframes spinner03": {
            "100%": { transform: "rotate(1turn)" }
          }
        };
        return /* @__PURE__ */ jsx("div", { css });
      };
    }
  });

  // packages/lupine.components/src/components/drag-refresh.tsx
  var DragFresh;
  var init_drag_refresh = __esm({
    "packages/lupine.components/src/components/drag-refresh.tsx"() {
      "use strict";
      init_spinner();
      init_jsx_runtime();
      DragFresh = (props) => {
        const css = {
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "0px",
          position: "relative",
          ".drag-spinner": {
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            zIndex: "var(--layer-dragged-item)",
            display: "none",
            justifyContent: "center",
            transition: "opacity 0.5s ease",
            alignItems: "end",
            backgroundImage: "linear-gradient(to bottom, rgba(200,200,200,0.8), rgba(255,255,255,0))"
          },
          "&.show .drag-spinner": {
            display: "flex"
          }
        };
        let isEnabled = true;
        if (props.hook) {
          props.hook.setEnable = (enable) => {
            isEnabled = enable;
          };
          props.hook.updateOnDragRefresh = (onDragRefresh) => {
            props.onDragRefresh = onDragRefresh;
          };
        }
        const closeSpin = () => {
          const spinnerDom = ref.$(".drag-spinner");
          if (!spinnerDom) return;
          spinnerDom.style.opacity = "0";
          setTimeout(() => {
            spinnerDom.style.opacity = "1";
            spinnerDom.parentElement.classList.remove("show");
          }, 300);
        };
        const ref = {
          onLoad: async () => {
            const container = document.querySelector(props.container);
            const pullDom = ref.current;
            const spinnerDom = ref.$(".drag-spinner");
            if (!container || !pullDom || !spinnerDom) return;
            let touchstartY = 0;
            let touchstartX = 0;
            let direction = "";
            let needRefresh = false;
            const maxHeight = 150;
            container.addEventListener("touchstart", (e) => {
              if (!isEnabled) return;
              touchstartY = e.touches[0].clientY;
              touchstartX = e.touches[0].clientX;
              direction = "";
              needRefresh = false;
            });
            container.addEventListener("touchmove", (e) => {
              if (!isEnabled) return;
              const touchY = e.touches[0].clientY;
              const touchX = e.touches[0].clientX;
              const movedY = touchY - touchstartY;
              const movedX = touchX - touchstartX;
              if (direction === "") {
                if (Math.abs(movedY) > Math.abs(movedX)) {
                  direction = "Y";
                } else {
                  direction = "X";
                }
              }
              if (direction !== "Y") {
                return;
              }
              if (container.scrollTop <= 0 && movedY > 5) {
                needRefresh = movedY > 60;
                if (movedY > 5) {
                  pullDom.classList.add("show");
                  spinnerDom.style.height = `${Math.min(maxHeight, movedY)}px`;
                } else {
                  pullDom.classList.remove("show");
                  spinnerDom.style.height = "0";
                }
              } else {
                pullDom.classList.remove("show");
                spinnerDom.style.height = "0";
              }
            });
            container.addEventListener("touchend", (e) => {
              if (!isEnabled) return;
              if (direction === "Y") {
                if (needRefresh) {
                  props.onDragRefresh(closeSpin);
                } else {
                  closeSpin();
                }
              }
              direction = "";
            });
          }
        };
        return /* @__PURE__ */ jsx("div", { css, ref, class: "drag-refresh-box", children: /* @__PURE__ */ jsx("div", { class: "drag-spinner", children: /* @__PURE__ */ jsx(Spinner02, { size: "40px" /* Large */ }) }) });
      };
    }
  });

  // packages/lupine.components/src/components/editable-label.tsx
  var EditableLabel;
  var init_editable_label = __esm({
    "packages/lupine.components/src/components/editable-label.tsx"() {
      "use strict";
      init_jsx_runtime();
      EditableLabel = (props) => {
        let editFlag = false;
        let oldValue = props.text;
        const onDblClick = () => {
          if (editFlag) return;
          editFlag = true;
          const el = ref.$("input.editable-label");
          oldValue = el.value;
          el.removeAttribute("readonly");
          el.classList.remove("not-editable");
          el.setSelectionRange(0, 0);
        };
        const reset = () => {
          const el = ref.$("input.editable-label");
          el.setAttribute("readonly", "readonly");
          el.classList.add("not-editable");
          oldValue = "";
          editFlag = false;
          return el;
        };
        const onKeyDown = (ev) => {
          if (!editFlag) return;
          if (ev.key === "Enter") {
            onBlur();
          } else if (ev.key === "Escape") {
            const el = ref.$("input.editable-label");
            el.value = oldValue;
            reset();
          }
        };
        const onBlur = () => {
          var _a;
          const savedValue = oldValue;
          const el = reset();
          if (savedValue !== el.value) {
            if (props.mandtory === true && !el.value) {
              el.value = savedValue;
            } else {
              (_a = props.save) == null ? void 0 : _a.call(props, el.value);
            }
          }
        };
        if (props.hook) {
          props.hook.updateValue = (value) => {
            const el = ref.$("input.editable-label");
            el.value = value;
          };
        }
        const css = {
          ".not-editable": {
            borderColor: "transparent",
            boxShadow: "unset"
          },
          "input.editable-label": {
            width: "100%"
          }
        };
        const ref = {};
        return /* @__PURE__ */ jsx("div", { css, ref, children: /* @__PURE__ */ jsx(
          "input",
          {
            class: "input-base editable-label not-editable",
            onDblClick,
            onKeyDown,
            value: props.text,
            onBlur,
            readOnly: true
          }
        ) });
      };
    }
  });

  // packages/lupine.components/src/components/float-window.tsx
  var _FloatWindow, FloatWindow;
  var init_float_window = __esm({
    "packages/lupine.components/src/components/float-window.tsx"() {
      "use strict";
      init_src();
      init_lib2();
      init_jsx_runtime();
      _FloatWindow = class _FloatWindow {
        static init() {
          window.addEventListener("mousemove", _FloatWindow.onMousemove.bind(_FloatWindow), false);
          document.documentElement.addEventListener("mouseup", _FloatWindow.onMouseup.bind(_FloatWindow), false);
        }
        static async show({
          title,
          children,
          contentMaxHeight,
          contentMinWidth,
          buttons,
          noMoving = false,
          noModal = false,
          closeEvent,
          handleClicked,
          closeWhenClickOutside = false,
          zIndex,
          contentOverflowY = "auto"
          // set to unset for having popup menu inside
        }) {
          const onClickContainer = (event) => {
            if (closeWhenClickOutside !== false && event.target.classList.contains("fwin-box")) {
              handleClose();
            }
          };
          const handleClose = () => {
            closeEvent == null ? void 0 : closeEvent();
            ref.current.classList.add("transition");
            ref.current.classList.remove("animation");
            setTimeout(() => {
              base.remove();
            }, 300);
          };
          const base = document.createElement("div");
          const onMousedown = (event) => {
            if (noMoving) return;
            if (!this.initialized) {
              this.initialized = true;
              this.init();
            }
            _FloatWindow.hostNode = ref.current;
            _FloatWindow.onMousedown.bind(_FloatWindow)(event);
          };
          const newButtons = !buttons || buttons.length === 0 ? ["OK", "Cancel"] : buttons;
          const onClickButtons = (index) => {
            handleClicked(index, handleClose);
          };
          const ref = {
            onLoad: async () => {
              ref.current.classList.add("transition");
              setTimeout(() => {
                ref.current.classList.add("animation");
              }, 1);
              setTimeout(() => {
                ref.current.classList.remove("transition");
              }, 300);
            }
          };
          const cssContainer = {
            position: noModal ? "" : "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: noModal ? "" : "var(--cover-mask-bg-color)",
            ".fwin-body": {
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) scale(0.1)",
              color: "var(--primary-color)",
              backgroundColor: "var(--cover-bg-color)",
              //'#fefefe',
              border: "var(--primary-border)",
              //'1px solid #888',
              borderRadius: "6px",
              minWidth: contentMinWidth ? contentMinWidth : "",
              maxWidth: "90%",
              boxShadow: "var(--cover-box-shadow)",
              //'#0000004c 0px 19px 38px, #00000038 0px 15px 12px',
              opacity: 0,
              // zIndex: 'var(--layer-float-window)',
              "&.transition": {
                transition: "all 0.3s"
              },
              "&.animation": {
                transform: "translate(-50%, -50%) scale(1)",
                opacity: 1
              },
              "&.animation-close": {
                transition: "all 0.3s",
                transform: "translate(-50%, -50%) scale(0)",
                opacity: 0
              },
              ".fwin-title": {
                padding: "10px 15px 5px",
                borderBottom: "var(--primary-border)",
                //'1px solid #e9ecef',
                ".fwin-close": {
                  color: "#aaaaaa",
                  float: "right",
                  fontSize: "26px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  marginTop: "-8px",
                  marginRight: "-10px"
                },
                ".fwin-close:hover": {
                  transition: "all 300ms ease",
                  color: "#555555"
                }
              },
              ".fwin-content": {
                padding: "15px",
                maxHeight: contentMaxHeight ? `min(${contentMaxHeight}, calc(100% - 100px))` : "calc(100% - 100px)",
                overflowY: contentOverflowY
              },
              ".fwin-bottom": {
                display: "flex",
                padding: "5px 15px",
                borderTop: "var(--primary-border)",
                //'1px solid #e9ecef',
                justifyContent: "end",
                ">div": {
                  marginLeft: "5px"
                }
              }
            }
          };
          const component = /* @__PURE__ */ jsx("div", { css: cssContainer, class: "fwin-box", onClick: onClickContainer, children: /* @__PURE__ */ jsx("div", { ref, class: "fwin-body", onMouseDown: onMousedown, children: [
            /* @__PURE__ */ jsx("div", { class: "fwin-title", children: [
              title,
              /* @__PURE__ */ jsx("span", { class: "fwin-close", onClick: handleClose, children: "\xD7" })
            ] }),
            /* @__PURE__ */ jsx("div", { class: "fwin-content", children }),
            /* @__PURE__ */ jsx("div", { class: "fwin-bottom", children: newButtons.map((i, index) => /* @__PURE__ */ jsx(
              "button",
              {
                class: "button-base button-s mr-m",
                onClick: () => {
                  onClickButtons(index);
                },
                children: i
              }
            )) })
          ] }) });
          base.style.position = "fixed";
          base.style.zIndex = zIndex || "var(--layer-float-window)";
          document.body.appendChild(base);
          await mountInnerComponent(base, component);
          return handleClose;
        }
        static onMousedown(event) {
          if (event.buttons !== 1 || event.button !== 0) return;
          if (event.srcElement.className !== "fwin-title") return;
          this.pressed = true;
          this.startX = event.clientX;
          this.startY = event.clientY;
          const nodeStyle = document.defaultView.getComputedStyle(this.hostNode);
          this.startTop = parseInt(nodeStyle["top"], 10);
          this.startLeft = parseInt(nodeStyle["left"], 10);
        }
        static onMousemove(event) {
          if (!this.pressed || event.buttons !== 1 || event.button !== 0) {
            return;
          }
          stopPropagation(event);
          if (event.clientX < 0 || event.clientY < 0 || event.clientX > window.innerWidth || event.clientY > window.innerHeight) {
            return;
          }
          let movedX = this.startLeft + (event.clientX - this.startX);
          let movedY = this.startTop + (event.clientY - this.startY);
          if (movedY <= 0) movedY = 0;
          if (movedX <= 0) movedX = 0;
          this.hostNode.style.top = movedY + "px";
          this.hostNode.style.left = movedX + "px";
        }
        static onMouseup() {
          if (this.pressed) this.pressed = false;
        }
      };
      _FloatWindow.initialized = false;
      _FloatWindow.pressed = false;
      _FloatWindow.startX = 0;
      _FloatWindow.startY = 0;
      _FloatWindow.startTop = 0;
      _FloatWindow.startLeft = 0;
      FloatWindow = _FloatWindow;
    }
  });

  // packages/lupine.components/src/components/grid.tsx
  var Grid;
  var init_grid = __esm({
    "packages/lupine.components/src/components/grid.tsx"() {
      "use strict";
      init_jsx_runtime();
      Grid = ({ gridOption }) => {
        const cssContainer = {
          display: "grid",
          ...gridOption.options
        };
        const cells = [];
        gridOption.cells.forEach((cell, index) => {
          const name = cell.name || "cell" + index;
          cssContainer[`.${name}`] = cell.option;
          cells.push(/* @__PURE__ */ jsx("div", { class: name, children: cell.component }));
        });
        const className = "grid-box" + (gridOption.className ? ` ${gridOption.className}` : "");
        return /* @__PURE__ */ jsx("div", { css: cssContainer, class: className, children: cells });
      };
    }
  });

  // packages/lupine.components/src/components/html-load.tsx
  var HtmlLoad;
  var init_html_load = __esm({
    "packages/lupine.components/src/components/html-load.tsx"() {
      "use strict";
      HtmlLoad = (props) => {
        const ref = {
          onLoad: async (el) => {
            const dom = await props.html();
            await ref.mountInnerComponent(dom);
          }
        };
        if (props.hook) {
          props.hook.getRef = () => ref;
          props.hook.render = (html2) => {
            ref.mountInnerComponent(html2);
          };
        }
        return {
          type: "Fragment",
          props: {
            ref,
            children: props.initialHtml || ""
          },
          html: []
        };
      };
    }
  });

  // packages/lupine.components/src/components/html-var.tsx
  var HtmlVar;
  var init_html_var = __esm({
    "packages/lupine.components/src/components/html-var.tsx"() {
      "use strict";
      HtmlVar = class {
        constructor(initial) {
          this._dirty = false;
          this.promise = new Promise((res) => {
            this.resolve = res;
          });
          this._value = initial || "";
          this._ref = {
            onLoad: async (el) => {
              const res = this.resolve;
              if (this._dirty) {
                await this.update();
              }
              res();
            }
          };
        }
        async update() {
          const v = typeof this._value === "function" ? await this._value() : this._value;
          await this._ref.mountInnerComponent(v);
          this._dirty = false;
          this._value = "";
        }
        // need to wait before use ref.current
        async waitUpdate() {
          await this.promise;
        }
        set value(value) {
          this._value = value;
          if (this._dirty) {
            return;
          }
          this._dirty = true;
          if (!this._ref.current) {
            return;
          }
          this.promise = new Promise(async (res) => {
            this.resolve = res;
            await this.update();
            this.resolve();
          });
        }
        get value() {
          return this._ref.current ? this._ref.current.innerHTML : this._value;
        }
        get ref() {
          return this._ref;
        }
        get node() {
          const delayLoad = typeof this._value === "function";
          this._dirty = delayLoad ? true : false;
          return {
            type: "Fragment",
            props: {
              ref: this._ref,
              children: delayLoad ? "" : this._value
            },
            html: []
          };
        }
      };
    }
  });

  // packages/lupine.components/src/components/input-with-title.tsx
  var InputWithTitle;
  var init_input_with_title = __esm({
    "packages/lupine.components/src/components/input-with-title.tsx"() {
      "use strict";
      init_jsx_runtime();
      InputWithTitle = (title, defaultValue, onInputChanged, onInputInputed, className = "input-base", width = "100%") => {
        return /* @__PURE__ */ jsx("div", { children: [
          /* @__PURE__ */ jsx("div", { style: { paddingBottom: "4px" }, children: title }),
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
            "input",
            {
              class: className,
              style: { width },
              onChange: (e) => {
                var _a;
                return onInputChanged == null ? void 0 : onInputChanged((_a = e == null ? void 0 : e.target) == null ? void 0 : _a.value);
              },
              onInput: (e) => {
                var _a;
                return onInputInputed == null ? void 0 : onInputInputed((_a = e == null ? void 0 : e.target) == null ? void 0 : _a.value);
              },
              value: defaultValue
            }
          ) })
        ] });
      };
    }
  });

  // packages/lupine.components/src/components/link-item.tsx
  var LinkItem;
  var init_link_item = __esm({
    "packages/lupine.components/src/components/link-item.tsx"() {
      "use strict";
      init_jsx_runtime();
      LinkItem = (props) => {
        return /* @__PURE__ */ jsx("a", { class: ["link-item", props.className].join(" "), href: props.url, alt: props.alt || props.text, children: props.text });
      };
    }
  });

  // packages/lupine.components/src/components/link-list.tsx
  var LinkList;
  var init_link_list = __esm({
    "packages/lupine.components/src/components/link-list.tsx"() {
      "use strict";
      init_link_item();
      init_jsx_runtime();
      LinkList = ({
        title,
        items,
        className,
        textColor = "black",
        backgroundColor = "#d3d3d3",
        titleBackgroundColor = "#b6b6b6"
      }) => {
        const css = {
          width: "100%",
          margin: "auto",
          height: "auto",
          backgroundColor,
          ".link-list-title, .link-list-top": {
            display: "flex",
            width: "100%",
            flexWrap: "wrap",
            padding: "0 16px"
          },
          ".link-list-title": {
            backgroundColor: titleBackgroundColor
          },
          ".link-list-item": {
            display: "inline-block",
            color: textColor,
            padding: "8px 16px 8px 0",
            textDecoration: "none"
          },
          ".link-list-item:last-child": {
            paddingRight: "unset"
          },
          ".link-list-title .link-list-item": {
            fontSize: "18px"
          }
        };
        return /* @__PURE__ */ jsx("div", { css, class: ["link-list-box", className].join(" "), children: [
          title && /* @__PURE__ */ jsx("div", { class: "link-list-title", children: /* @__PURE__ */ jsx("div", { class: "link-list-item", children: title }) }),
          /* @__PURE__ */ jsx("div", { class: "link-list-top", children: items.map((item) => {
            return /* @__PURE__ */ jsx(LinkItem, { className: "link-list-item", url: item.url, alt: item.alt, text: item.text });
          }) })
        ] });
      };
    }
  });

  // packages/lupine.components/src/styles/media-query.ts
  function adjustedMediaQueryRange(direction, mediaQueryWidth, adjustWidth) {
    const adjustedWidth = Number.parseInt(mediaQueryWidth) + adjustWidth;
    if (direction === 0 /* Below */) {
      return `@media only screen and (max-width: ${adjustedWidth}px)`;
    } else {
      return `@media only screen and (min-width: ${adjustedWidth}px)`;
    }
  }
  var _MediaQueryMaxWidth, MediaQueryMaxWidth, MediaQueryRange, MediaQueryDirection;
  var init_media_query = __esm({
    "packages/lupine.components/src/styles/media-query.ts"() {
      "use strict";
      _MediaQueryMaxWidth = class _MediaQueryMaxWidth {
        // Grid: col-1-lg, 12-lg
        static get ExtraSmallMax() {
          return _MediaQueryMaxWidth._ExtraSmall;
        }
        static get MobileMax() {
          return _MediaQueryMaxWidth._Mobile;
        }
        static get TabletMax() {
          return _MediaQueryMaxWidth._Tablet;
        }
        static get DesktopMax() {
          return _MediaQueryMaxWidth._Desktop;
        }
        static set ExtraSmallMax(value) {
          _MediaQueryMaxWidth._ExtraSmall = value;
        }
        static set MobileMax(value) {
          _MediaQueryMaxWidth._Mobile = value;
        }
        static set TabletMax(value) {
          _MediaQueryMaxWidth._Tablet = value;
        }
        static set DesktopMax(value) {
          _MediaQueryMaxWidth._Desktop = value;
        }
      };
      _MediaQueryMaxWidth._ExtraSmall = "480px";
      _MediaQueryMaxWidth._Mobile = "767px";
      // Grid: col-1, 12
      _MediaQueryMaxWidth._Tablet = "991px";
      // Grid: col-1-md, 12-md
      _MediaQueryMaxWidth._Desktop = "1399px";
      MediaQueryMaxWidth = _MediaQueryMaxWidth;
      MediaQueryRange = class {
        static get ExtraSmallBelow() {
          return `@media only screen and (max-width: ${MediaQueryMaxWidth.ExtraSmallMax})`;
        }
        static get ExtraSmallAbove() {
          return `@media only screen and (min-width: ${MediaQueryMaxWidth.ExtraSmallMax})`;
        }
        static get MobileBelow() {
          return `@media only screen and (max-width: ${MediaQueryMaxWidth.MobileMax})`;
        }
        static get MobileAbove() {
          return `@media only screen and (min-width: ${MediaQueryMaxWidth.MobileMax})`;
        }
        static get TabletBelow() {
          return `@media only screen and (max-width: ${MediaQueryMaxWidth.TabletMax})`;
        }
        static get TabletAbove() {
          return `@media only screen and (min-width: ${MediaQueryMaxWidth.TabletMax})`;
        }
        static get DesktopBelow() {
          return `@media only screen and (max-width: ${MediaQueryMaxWidth.DesktopMax})`;
        }
        static get DesktopAbove() {
          return `@media only screen and (min-width: ${MediaQueryMaxWidth.DesktopMax})`;
        }
      };
      MediaQueryDirection = /* @__PURE__ */ ((MediaQueryDirection2) => {
        MediaQueryDirection2[MediaQueryDirection2["Below"] = 0] = "Below";
        MediaQueryDirection2[MediaQueryDirection2["Above"] = 1] = "Above";
        return MediaQueryDirection2;
      })(MediaQueryDirection || {});
    }
  });

  // packages/lupine.components/src/styles/shared-themes.ts
  var sharedThemes;
  var init_shared_themes = __esm({
    "packages/lupine.components/src/styles/shared-themes.ts"() {
      "use strict";
      sharedThemes = {
        // z-index
        "--layer-inside": "100",
        // for inside orders
        "--layer-cover": "200",
        "--layer-header-footer": "300",
        "--layer-sidebar": "400",
        "--layer-sidebar-sub": "410",
        "--layer-slider": "500",
        // screen slider
        "--layer-modal": "600",
        "--layer-modal-over": "610",
        "--layer-float-window": "700",
        "--layer-actionsheet-window": "710",
        "--layer-menu": "800",
        // popup menu
        "--layer-menu-sub": "810",
        "--layer-notice": "900",
        // notice, loading, toast
        "--layer-tooltip": "2000",
        "--layer-dragged-item": "2100",
        "--layer-guide": "2500",
        // learning guide
        "--font-size-base": "16px",
        "--font-weight-base": "",
        //'400',
        "--font-family-base": '"Punctuation SC", "Inter", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        "--line-height-base": "1.1",
        "--font-size-h1-l": "2.5rem",
        //40px
        "--font-size-h1": "2rem",
        //32px
        "--font-size-h2": "1.5rem",
        //24px
        "--font-size-h3": "1.17rem",
        //18.72px
        "--font-size-h3-5": "1.08rem",
        //17.28px
        "--font-size-h4": "1rem",
        //16px
        "--font-size-h4-5": ".91rem",
        //14.56px
        "--font-size-h5": ".83rem",
        //13.28px
        "--font-size-h6": ".67rem",
        //10.72px
        "--font-size-h6-s": ".55rem",
        //9.28px
        "--font-size-title": "var(--font-size-h2)",
        "--font-size-subtitle": "var(--font-size-h3-5)",
        "--font-size-paragraph": "var(--font-size-h4)",
        "--font-size-paragraph-s": "var(--font-size-h5)",
        "--input-height": "2.2rem",
        "--input-padding": ".3rem .6rem",
        "--button-height": "2.1rem",
        "--button-padding": ".3rem .9rem",
        // space for margin, padding
        "--space-ss": ".15rem",
        "--space-s": ".25rem",
        "--space-m": ".5rem",
        "--space-l": "1rem",
        "--space-ll": "2rem",
        "--border-radius-s": "2px",
        "--border-radius-m": "4px",
        "--border-radius-l": "8px"
      };
    }
  });

  // packages/lupine.components/src/styles/dark-themes.ts
  var darkThemes;
  var init_dark_themes = __esm({
    "packages/lupine.components/src/styles/dark-themes.ts"() {
      "use strict";
      init_shared_themes();
      darkThemes = {
        ...sharedThemes,
        "--theme-name": "dark",
        "--scrollbar-bg": "#1c1c1c",
        "--scrollbar-thumb-bg": "#373636",
        "--scrollbar-active-thumb-bg": "#5b5b5b",
        "--primary-color": "#d8d8d8",
        "--primary-color-disabled": "#7d7d7d",
        "--primary-bg-color": "#000000",
        "--primary-border-color": "#aeaeae",
        "--primary-border": "1px solid var(--primary-border-color)",
        "--primary-opacity": "0.5",
        // used for dark theme
        "--primary-disabled-opacity": "0.7",
        // used for dark theme
        "--primary-accent-color": "#1a588a",
        // used for radio and checkbox's background color
        "--secondary-color": "#747474",
        "--secondary-bg-color": "#1c1c1c",
        "--secondary-border-color": "#494949",
        "--secondary-border": "1px solid var(--secondary-border-color)",
        // including menus, tabs
        "--activatable-color-normal": "var(--primary-color)",
        "--activatable-bg-color-normal": "var(--primary-bg-color)",
        "--activatable-color-hover": "#e2e2e2",
        "--activatable-bg-color-hover": "#6d6d6d",
        "--activatable-color-selected": "#c2c2c2",
        "--activatable-bg-color-selected": "#5d5d5d",
        // '--menu-color-hover': '#303030',
        // '--menu-color': 'var(--primary-color)',  //'#2a2a2a',
        // '--menu-bg-color': 'var(--primary-bg-color)',  //'#2a2a2a',
        // '--menu-bg-color-hover': '#a0a0a0',
        "--menu-font-size": "1rem",
        "--menubar-color": "#eeeeee",
        "--menubar-bg-color": "#000000",
        "--menubar-sub-bg-color": "#f9f9f9",
        "--sidebar-color": "var(--primary-color)",
        "--sidebar-bg-color": "#000000",
        // '--sidebar-sub-color': 'var(--sidebar-color)',
        // '--sidebar-sub-bg-color': '#000000',
        "--sidebar-border": "1px solid #303030",
        // '--sidebar-hover-color': 'var(--sidebar-color)',
        // '--sidebar-hover-bg-color': '#000000',
        "--row-1-bg-color": "#212121",
        "--row-2-bg-color": "#303030",
        "--row-hover-bg-color": "#383838",
        "--success-color": "#04AA6D",
        "--info-color": "#2196F3",
        "--warning-color": "#ff9800",
        "--error-color": "#f44336",
        "--success-bg-color": "#10553b",
        "--info-bg-color": "#1a588a",
        "--warning-bg-color": "#a36305",
        "--error-bg-color": "#882c25",
        "--notice-color-with-bg": "#ececec",
        "--cover-mask-bg-color": "#878a9460",
        "--cover-bg-color": "#202020",
        // for dropdown-menu
        "--cover-box-shadow": "1px 1px 4px #c6c6c6",
        // for big block, deeper shadow arround, good for dark theme
        "--cover-box-shadow-around": "#ffffff 0 0 6px 1px",
        "--input-color": "#bdbdbd",
        "--input-bg-color": "#000000",
        "--input-box-shadow": "0px 0px 0px #000000, 1px 1px 0px 0px #50505045",
        "--input-border-focus": "1px solid #0074d9",
        "--button-color": "#bdbdbd",
        "--button-bg": "-webkit-linear-gradient(top, #282828 0%, #212223 74%, #1a1a1a 100%)",
        // darker
        "--button-bg-hover": "-webkit-linear-gradient(top, #282828 0%, #313233 74%, #252525 100%)",
        // darker
        // '--button-bg': '-webkit-linear-gradient(top, #414141 0%, #373e48 74%, #434242 100%)',
        "--button-border": "1px solid #373e48",
        "--button-box-shadow": "unset",
        "--header-color": "#000080",
        "--header-bg-color": "#000000",
        // for setting-section
        "--ss-group-color": "var(--primary-color)",
        "--ss-group-bg-color": "#232323",
        "--ss-row-btn-color": "#eee",
        "--ss-row-btn-bg-color": "#262626",
        "--ss-row-btn-warn-color": "red",
        "--mobile-header-shadow": "0px -1px 4px 1px #848484"
        // '--background-primary': '#353536', //	Primary background
        // '--color-primary': '#e0e0e0', //	Primary text color
        // backgroundPrimary: '', //	Primary background
        // backgroundOnPrimary: '', //	Background for surfaces on top of primary background
        // backgroundSecondary: '#f5f5f6', //	Secondary background
        // backgroundOnSecondary: '#e5e5e6', //	Background for surfaces on top of secondary background
      };
    }
  });

  // packages/lupine.components/src/styles/light-themes.ts
  var lightThemes;
  var init_light_themes = __esm({
    "packages/lupine.components/src/styles/light-themes.ts"() {
      "use strict";
      init_shared_themes();
      lightThemes = {
        ...sharedThemes,
        "--theme-name": "light",
        // scroll bar
        "--scrollbar-bg": "#d5d5d5",
        "--scrollbar-thumb-bg": "#979797",
        "--scrollbar-active-thumb-bg": "#737373",
        "--primary-color": "#303030",
        "--primary-color-disabled": "#a0a0a0",
        "--primary-bg-color": "#ffffff",
        "--primary-border-color": "#858585",
        "--primary-border": "1px solid var(--primary-border-color)",
        "--primary-opacity": "unset",
        // used for dark theme
        "--primary-disabled-opacity": "0.5",
        // used for dark theme
        "--primary-accent-color": "#0a74c9",
        // used for radio and checkbox's background color
        "--secondary-color": "#818181",
        "--secondary-bg-color": "#eeeeee",
        "--secondary-border-color": "#a0a0a0",
        "--secondary-border": "1px solid var(--secondary-border-color)",
        // including menus, tabs, sidebars
        "--activatable-color-normal": "var(--primary-color)",
        "--activatable-bg-color-normal": "var(--primary-bg-color)",
        "--activatable-color-hover": "#1d1d1d",
        "--activatable-bg-color-hover": "#bcbcbc",
        "--activatable-color-selected": "#2d2d2d",
        "--activatable-bg-color-selected": "#dcdcdc",
        // '--menu-color-hover': '#303030',
        // '--menu-bg-color': '#ffffff',
        // '--menu-bg-color-hover': '#a0a0a0',
        "--menu-font-size": "1rem",
        "--menubar-color": "#eeeeee",
        "--menubar-bg-color": "#000000",
        "--menubar-sub-bg-color": "#f9f9f9",
        "--sidebar-color": "var(--primary-color)",
        "--sidebar-bg-color": "#f4f3f4",
        // '--sidebar-sub-color': 'var(--sidebar-color)',
        // '--sidebar-sub-bg-color': '#eaeaea',
        "--sidebar-border": "1px solid #858585",
        // '--sidebar-hover-color': 'var(--sidebar-color)',
        // '--sidebar-hover-bg-color': '#e0e0e0',
        "--row-bg-color1": "#ffffff",
        "--row-bg-color2": "#ffffff",
        "--success-color": "#04AA6D",
        "--info-color": "#2196F3",
        "--warning-color": "#ff9800",
        "--error-color": "#f44336",
        "--success-bg-color": "#04AA6D",
        "--info-bg-color": "#2196F3",
        "--warning-bg-color": "#ff9800",
        "--error-bg-color": "#f44336",
        "--notice-color-with-bg": "#ffffff",
        "--cover-mask-bg-color": "#00000060",
        "--cover-bg-color": "#f5f5f5",
        // for dropdown-menu
        "--cover-box-shadow": "3px 3px 8px #767676",
        // for big block, deeper shadow arround, good for dark theme
        "--cover-box-shadow-around": "#000000 2px 4px 20px 1px",
        // for input, checkbox, radio box, select
        "--input-color": "#4e4e4e",
        "--input-bg-color": "#ffffff",
        "--input-box-shadow": "0px 0px 0px #000000, 1px 1px 0px 0px #50505045",
        "--input-border-focus": "1px solid #0074d9",
        // for button, div
        "--button-color": "#4e4e4e",
        "--button-bg": "-webkit-linear-gradient(top, #ffffff 0%, #f6f6f6 74%, #ededed 100%)",
        "--button-bg-hover": "-webkit-linear-gradient(top, #ffffff 0%, #e6e6e6 74%, #dddddd 100%)",
        "--button-border": "1px solid #f6f6f6",
        "--button-box-shadow": "1px 1px 1px #00000085, 0px 1px 0px 2px #0705053b",
        "--header-color": "#000080",
        "--header-bg-color": "#ffffff",
        // for setting-section
        "--ss-group-color": "var(--primary-color)",
        "--ss-group-bg-color": "var(--activatable-bg-color-selected)",
        "--ss-row-btn-color": "#eee",
        "--ss-row-btn-bg-color": "#333",
        "--ss-row-btn-warn-color": "red",
        "--mobile-header-shadow": "0 4px 4px var(--primary-border-color)"
        // '--po-background': '#e5e5e5', //	Background for surfaces on top of primary background
        // // backgroundSecondary: '#f5f5f5', //	Secondary background
        // // backgroundOnSecondary: '#e5e5e5', //	Background for surfaces on top of secondary background
        // '--background-modifier-hover': '', //	Hovered elements
        // '--background-modifier-active-hover': '', //	Active hovered elements
        // '--background-modifier-border': '', //	Border color
        // '--background-modifier-border-hover': '', //	Border color (hover)
        // '--background-modifier-border-focus': '', //	Border color (focus)
        // '--background-modifier-error': '', //	Error background
        // '--background-modifier-error-hover': '', //	Error background (hover)
        // '--background-modifier-success': '', //	Success background
        // '--background-modifier-message': '', //	Messages background
        // '--background-modifier-form-field': '', //	Form field background
      };
    }
  });

  // packages/lupine.components/src/styles/base-themes.ts
  var baseThemes;
  var init_base_themes = __esm({
    "packages/lupine.components/src/styles/base-themes.ts"() {
      "use strict";
      init_dark_themes();
      init_light_themes();
      baseThemes = {
        light: lightThemes,
        dark: darkThemes,
        lightGreen: {
          ...lightThemes,
          "--background-primary": "#d8ffe3",
          //	Primary background
          "--color-primary": "#303030",
          //	Primary text color
          backgroundPrimary: "",
          //	Primary background
          backgroundOnPrimary: "",
          //	Background for surfaces on top of primary background
          backgroundSecondary: "#f5f5f7",
          //	Secondary background
          backgroundOnSecondary: "#e5e5e7"
          //	Background for surfaces on top of secondary background
        }
      };
    }
  });

  // packages/lupine.components/src/styles/index.ts
  var init_styles2 = __esm({
    "packages/lupine.components/src/styles/index.ts"() {
      "use strict";
      init_media_query();
      init_shared_themes();
      init_dark_themes();
      init_light_themes();
      init_base_themes();
    }
  });

  // packages/lupine.components/src/components/menu-bar.tsx
  var fetchMenu, MenuBar;
  var init_menu_bar = __esm({
    "packages/lupine.components/src/components/menu-bar.tsx"() {
      "use strict";
      init_src();
      init_styles2();
      init_link_item();
      init_jsx_runtime();
      fetchMenu = async (menuId) => {
        const data = await getRenderPageProps().renderPageFunctions.fetchData(`/api/menu/get/${menuId}`);
        return data.json;
      };
      MenuBar = ({
        menuId,
        items,
        className,
        textColor = "var(--menubar-color)",
        backgroundColor = "var(--menubar-bg-color)",
        //'black',
        hoverColor = "var(--activatable-color-hover)",
        //'#ffffff',
        hoverBgColor = "var(--activatable-bg-color-hover)",
        //'#d12121',
        maxWidth = "100%",
        maxWidthMobileMenu = MediaQueryMaxWidth.TabletMax
      }) => {
        const css = {
          width: "100%",
          maxWidth,
          margin: "auto",
          // height: 'auto',
          backgroundColor,
          position: "relative",
          ".menu-bar-top": {
            display: "flex",
            width: "100%",
            justifyContent: "center"
          },
          ".menu-bar-item": {
            display: "inline-block",
            color: textColor,
            padding: "14px 16px",
            textDecoration: "none",
            position: "relative"
          },
          ".menu-bar-item:hover, .menu-bar-sub-box:hover > .menu-bar-item": {
            // for desktop, make parent menu hover when sub menu is hover
            color: hoverColor,
            backgroundColor: hoverBgColor
          },
          ".menu-bar-sub-box .menu-bar-sub": {
            display: "none",
            position: "absolute",
            backgroundColor: "var(--menubar-sub-bg-color)",
            //'#f9f9f9',
            minWidth: "165px",
            boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
            zIndex: "var(--layer-menu-sub)",
            flexDirection: "column"
          },
          ".menu-bar-sub-box > .menu-bar-item": {
            padding: "14px 26px 14px 16px",
            width: "100%"
          },
          ".menu-bar-sub-box > .menu-bar-item::after": {
            content: '""',
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            marginLeft: "6px",
            width: 0,
            height: 0,
            borderLeft: "5px solid transparent",
            borderRight: "5px solid transparent",
            borderTop: "5px solid " + textColor
          },
          ".menu-bar-sub-box .menu-bar-sub > .menu-bar-item": {
            color: "black"
          },
          ".menu-bar-sub-box:hover > .menu-bar-sub": {
            display: "flex"
          },
          ".menu-bar-sub-box .menu-bar-sub .menu-bar-item:hover": {
            // backgroundColor: '#ddd',
            color: hoverColor,
            backgroundColor: hoverBgColor
          },
          ".menu-bar-mobile": {
            display: "none",
            position: "relative",
            backgroundColor,
            padding: "5px 18px 6px",
            ".menu-bar-toggle": {
              cursor: "pointer",
              padding: "14px 0 19px 0",
              "span, span::before, span::after": {
                cursor: "pointer",
                height: "3px",
                width: "25px",
                borderRadius: "1px",
                background: "#ffffff",
                position: "absolute",
                display: "block",
                transition: "all 300ms ease-in-out"
              },
              "span::before, span::after": {
                content: '""'
              },
              "span::before": {
                top: "-10px"
              },
              "span::after": {
                bottom: "-10px"
              }
            },
            ".menu-bar-toggle.active span": {
              backgroundColor: "transparent"
            },
            ".menu-bar-toggle.active span::before": {
              transform: "rotate(45deg)",
              top: 0
            },
            ".menu-bar-toggle.active span::after": {
              transform: "rotate(-45deg)",
              top: 0
            }
          },
          ["@media only screen and (max-width: " + maxWidthMobileMenu + ")"]: {
            ".menu-bar-mobile": {
              display: "block"
            },
            ".menu-bar-top": {
              display: "none"
            },
            ".menu-bar-top.open": {
              display: "flex",
              flexDirection: "column"
            },
            ".menu-bar-top.open .menu-bar-sub-box > .menu-bar-sub": {
              display: "flex",
              position: "unset",
              ".menu-bar-item": {
                paddingLeft: "32px",
                color: textColor,
                backgroundColor
              },
              ".menu-bar-item:hover": {
                color: hoverColor,
                backgroundColor: hoverBgColor
              }
            },
            ".menu-bar-sub-box:hover > .menu-bar-item": {
              // for mobile, no parent menu hover when sub menu is hover
              color: textColor,
              backgroundColor
            },
            ".menu-bar-sub-box:hover > .menu-bar-item:hover": {
              color: hoverColor,
              backgroundColor: hoverBgColor
            }
          }
        };
        const renderItems = (items2, className2) => {
          return /* @__PURE__ */ jsx("div", { class: className2, children: items2.map((item) => {
            return item.items ? /* @__PURE__ */ jsx("div", { class: "menu-bar-sub-box", children: [
              /* @__PURE__ */ jsx("div", { class: "menu-bar-item", children: item.text }),
              renderItems(item.items, "menu-bar-sub")
            ] }) : /* @__PURE__ */ jsx(LinkItem, { className: "menu-bar-item", url: item.url, alt: item.alt, text: item.text });
          }) });
        };
        const ref = {
          onLoad: async () => {
            if (menuId) {
              const menu = await fetchMenu(menuId);
              if (menu.result && menu.result.items.length > 0) {
                const items2 = menu.result.items.map((i) => {
                  const l = i.split("	");
                  return { text: l[5], url: l[4] };
                });
                const newDom = renderItems(items2, "menu-bar-top");
              }
            }
          }
        };
        const onToggleClick = () => {
          const menu = ref.$(".menu-bar-mobile .menu-bar-toggle");
          menu.classList.toggle("active");
          const topMenu = ref.$(".menu-bar-top");
          topMenu.classList.toggle("open");
        };
        return /* @__PURE__ */ jsx("div", { ref, css, class: ["menu-bar-box", className].join(" "), children: [
          /* @__PURE__ */ jsx("div", { class: "menu-bar-mobile", children: /* @__PURE__ */ jsx("div", { class: "menu-bar-toggle", onClick: onToggleClick, children: /* @__PURE__ */ jsx("span", {}) }) }),
          renderItems(items, "menu-bar-top")
        ] });
      };
    }
  });

  // packages/lupine.components/src/components/menu-item-props.tsx
  var init_menu_item_props = __esm({
    "packages/lupine.components/src/components/menu-item-props.tsx"() {
      "use strict";
    }
  });

  // packages/lupine.components/src/components/menu-sidebar.tsx
  var MenuSidebar;
  var init_menu_sidebar = __esm({
    "packages/lupine.components/src/components/menu-sidebar.tsx"() {
      "use strict";
      init_src();
      init_lib2();
      init_styles2();
      init_jsx_runtime();
      MenuSidebar = ({
        mobileMenu,
        desktopMenu,
        menuId,
        items,
        className,
        color = "white",
        backgroundColor = "dark",
        maxWidth = "100%",
        maxWidthMobileMenu = MediaQueryMaxWidth.TabletMax,
        isDevAdmin = false
      }) => {
        const css = {
          // backgroundColor,
          ".menu-sidebar-top": {
            width: "100%",
            backgroundColor: "var(--sidebar-bg-color)",
            maxWidth,
            margin: "auto",
            // height: 'auto',
            position: "relative",
            display: "flex",
            // width: '100%',
            justifyContent: "center",
            flexDirection: "column"
          },
          // '&.mobile .menu-sidebar-top': {
          //   position: 'absolute',
          // },
          ".menu-sidebar-item": {
            display: "inline-block",
            color,
            cursor: "pointer",
            padding: "14px 16px",
            textDecoration: "none",
            position: "relative",
            borderBottom: "var(--sidebar-border)"
          },
          // select parent when hover on a child, .menu-sidebar-sub-box:hover > .menu-sidebar-item
          ".menu-sidebar-item:hover": {
            color: "var(--activatable-color-hover)",
            backgroundColor: "var(--activatable-bg-color-hover)"
          },
          ".menu-sidebar-sub-box .menu-sidebar-sub": {
            display: "none",
            // position: 'absolute',
            // color: 'var(--sidebar-sub-color)',
            // backgroundColor: 'var(--sidebar-sub-bg-color)',
            minWidth: "165px",
            // boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
            zIndex: "var(--layer-sidebar-sub)",
            flexDirection: "column"
          },
          ".menu-sidebar-sub-box > .menu-sidebar-item": {
            padding: "14px 26px 14px 16px",
            width: "100%"
          },
          ".menu-sidebar-sub-box > .menu-sidebar-sub > .menu-sidebar-item": {
            paddingLeft: "32px"
          },
          ".menu-sidebar-sub-box > .menu-sidebar-item::after": {
            content: '""',
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%) rotate(-90deg)",
            marginLeft: "6px",
            width: 0,
            height: 0,
            borderLeft: "5px solid transparent",
            borderRight: "5px solid transparent",
            borderTop: "5px solid " + color,
            right: "10px",
            transition: "all 300ms ease-in-out"
          },
          ".menu-sidebar-sub-box.open > .menu-sidebar-item::after": {
            transform: "rotate(0deg)"
          },
          "&.mobile .menu-sidebar-sub-box > .menu-sidebar-item::after": {
            transform: "rotate(0deg)"
          },
          // '.menu-sidebar-sub-box .menu-sidebar-sub > .menu-sidebar-item': {
          //   color: 'black',
          // },
          ".menu-sidebar-sub-box.open > .menu-sidebar-sub": {
            display: "flex"
          },
          ".menu-sidebar-sub-box .menu-sidebar-sub .menu-sidebar-item:hover": {
            color: "var(--activatable-color-hover)",
            backgroundColor: "var(--activatable-bg-color-hover)"
          },
          ".menu-sidebar-mobile": {
            display: "none",
            position: "relative",
            // backgroundColor: 'var(--primary-bg-color)',
            padding: "5px 4px 6px",
            ".menu-sidebar-toggle": {
              cursor: "pointer",
              padding: "6px 0 8px 0",
              "span, span::before, span::after": {
                cursor: "pointer",
                height: "3px",
                width: "25px",
                borderRadius: "1px",
                background: "var(--primary-color)",
                position: "absolute",
                display: "block",
                transition: "all 300ms ease-in-out"
              },
              "span::before, span::after": {
                content: '""'
              },
              "span::before": {
                top: "-7px"
              },
              "span::after": {
                bottom: "-7px"
              }
            },
            ".menu-sidebar-toggle.active span": {
              backgroundColor: "transparent"
            },
            ".menu-sidebar-toggle.active span::before": {
              transform: "rotate(45deg)",
              top: 0
            },
            ".menu-sidebar-toggle.active span::after": {
              transform: "rotate(-45deg)",
              top: 0
            }
          },
          // hide menu for mobile place
          "&.mobile": {
            display: "none"
            // width: '33px',
          },
          "&.mobile .menu-sidebar-mobile": {
            display: "block",
            width: "33px"
          },
          ["@media only screen and (max-width: " + maxWidthMobileMenu + ")"]: {
            // hide menu for not mobile place
            display: "none",
            // show menu for mobile place
            "&.mobile": {
              display: "block"
            },
            "&.mobile.open": {
              position: "absolute",
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#ccccccc2",
              zIndex: "var(--layer-sidebar)"
            },
            ".menu-sidebar-top": {
              display: "none"
            },
            ".menu-sidebar-top.open": {
              display: "flex",
              flexDirection: "column",
              // left: 0,
              // top: 0,
              flex: 1,
              overflowY: "auto",
              // paddingTop: '200px',
              width: "200px",
              marginLeft: "unset",
              justifyContent: "start"
            },
            ".menu-sidebar-top.open .menu-sidebar-sub-box > .menu-sidebar-sub": {
              display: "flex",
              position: "unset",
              ".menu-sidebar-item": {
                paddingLeft: "32px",
                color,
                backgroundColor
              },
              ".menu-sidebar-item:hover": {
                color: "var(--activatable-color-hover)",
                backgroundColor: "var(--activatable-bg-color-hover)"
              }
            },
            ".menu-sidebar-sub-box:hover > .menu-sidebar-item": {
              backgroundColor: "unset"
            },
            ".menu-sidebar-sub-box:hover > .menu-sidebar-item:hover": {
              color: "var(--activatable-color-hover)",
              backgroundColor: "var(--activatable-bg-color-hover)"
            }
          }
        };
        const renderItems = (items2, className2) => {
          return /* @__PURE__ */ jsx("div", { class: className2, children: items2.filter((item) => isDevAdmin || !item.devAdmin).map((item) => {
            if (item.hide === true) {
              return null;
            }
            let ref2 = {};
            return item.items ? /* @__PURE__ */ jsx("div", { ref: ref2, class: "menu-sidebar-sub-box", onClick: () => onItemToggleClick(ref2), children: [
              /* @__PURE__ */ jsx("div", { class: "menu-sidebar-item", children: item.text }),
              renderItems(item.items, "menu-sidebar-sub")
            ] }) : item.js ? /* @__PURE__ */ jsx(
              "a",
              {
                class: "menu-sidebar-item",
                href: "javascript:void(0)",
                alt: item.alt || item.text,
                onClick: (event) => {
                  stopPropagation(event);
                  onToggleClick(event);
                  item.js && item.js();
                },
                children: item.text
              }
            ) : /* @__PURE__ */ jsx("a", { class: "menu-sidebar-item", href: item.url, alt: item.alt || item.text, target: "_blank", children: item.text });
          }) });
        };
        const ref = {
          // onLoad: async () => {
          //   if (menuId) {
          //     const menu = await fetchMenu(menuId);
          //     if (menu.result.items.length > 0) {
          //       const items = menu.result.items.map((i: any) => {
          //         const l = i.split('\t');
          //         return { text: l[5], url: l[4] };
          //       });
          //       const newDom = renderItems(items, 'menu-sidebar-top');
          //       //mountComponents('.menu-sidebar-top', newDom);
          //     }
          //   }
          // },
        };
        const onToggleClick = (event) => {
          event.stopPropagation();
          const menu = ref.$(".menu-sidebar-mobile .menu-sidebar-toggle");
          menu.classList.toggle("active");
          const topMenu = ref.$(".menu-sidebar-top");
          topMenu.classList.toggle("open");
          ref.current.classList.toggle("open");
        };
        const onItemToggleClick = (ref2) => {
          ref2.current.classList.toggle("open");
        };
        bindGlobalStyle("menu-sidebar-box", css);
        const newCss = !desktopMenu && !mobileMenu || desktopMenu && mobileMenu ? {
          ["@media only screen and (max-width: " + maxWidthMobileMenu + ")"]: {
            display: "block",
            ".menu-sidebar-top": {
              display: "block"
            }
          }
        } : {};
        const onMaskClick = (event) => {
          if (ref.current.classList.contains("open")) {
            onToggleClick(event);
          }
        };
        return /* @__PURE__ */ jsx(
          "div",
          {
            css: newCss,
            ref,
            class: ["menu-sidebar-box", className, mobileMenu ? "mobile" : ""].join(" "),
            onClick: onMaskClick,
            children: [
              /* @__PURE__ */ jsx("div", { class: "menu-sidebar-mobile", children: /* @__PURE__ */ jsx("div", { class: "menu-sidebar-toggle", onClick: onToggleClick, children: /* @__PURE__ */ jsx("span", {}) }) }),
              renderItems(items, "menu-sidebar-top")
            ]
          }
        );
      };
    }
  });

  // packages/lupine.components/src/components/message-box.tsx
  var MessageBoxButtonProps, MessageBox;
  var init_message_box = __esm({
    "packages/lupine.components/src/components/message-box.tsx"() {
      "use strict";
      init_float_window();
      MessageBoxButtonProps = /* @__PURE__ */ ((MessageBoxButtonProps2) => {
        MessageBoxButtonProps2["YesNo"] = "yesno";
        MessageBoxButtonProps2["OkCancel"] = "okcancel";
        MessageBoxButtonProps2["Ok"] = "ok";
        return MessageBoxButtonProps2;
      })(MessageBoxButtonProps || {});
      MessageBox = class {
        static async show({
          title,
          children,
          contentMaxHeight,
          contentMinWidth,
          buttonType = "okcancel" /* OkCancel */,
          noMoving = false,
          noModal = false,
          closeEvent,
          handleClicked,
          closeWhenClickOutside = false
        }) {
          const buttons = buttonType === "okcancel" /* OkCancel */ ? ["OK", "Cancel"] : buttonType === "yesno" /* YesNo */ ? ["Yes", "No"] : ["OK"];
          return FloatWindow.show({
            title,
            children,
            contentMaxHeight,
            contentMinWidth,
            buttons,
            noMoving,
            noModal,
            closeEvent,
            handleClicked,
            closeWhenClickOutside
          });
        }
      };
    }
  });

  // packages/lupine.components/src/components/meta-data.tsx
  function isNameMeta(data) {
    return !!(data.name && data.content);
  }
  function isPropertyMeta(data) {
    return !!(data.property && data.content);
  }
  function isHttpEquivMeta(data) {
    return !!(data.httpEquiv && data.content);
  }
  var MetaData;
  var init_meta_data = __esm({
    "packages/lupine.components/src/components/meta-data.tsx"() {
      "use strict";
      init_src();
      init_jsx_runtime();
      MetaData = (data) => {
        if (isNameMeta(data)) {
          addMetaDataTags(`name:${data.name}`, `<meta name="${data.name}" content="${data.content}">`);
        } else if (isPropertyMeta(data)) {
          addMetaDataTags(`property:${data.property}`, `<meta property="${data.property}" content="${data.content}">`);
        } else if (isHttpEquivMeta(data)) {
          addMetaDataTags(`http-equiv:${data.httpEquiv}`, `<meta http-equiv="${data.httpEquiv}" content="${data.content}">`);
        } else if (data.key && data.string) {
          addMetaDataTags(`${data.key}`, `${data.string}`);
        } else {
          console.warn("Unknown meta data:", data);
        }
        return /* @__PURE__ */ jsx(Fragment, {});
      };
    }
  });

  // packages/lupine.components/src/components/meta-description.tsx
  var MetaDescription;
  var init_meta_description = __esm({
    "packages/lupine.components/src/components/meta-description.tsx"() {
      "use strict";
      init_src();
      init_jsx_runtime();
      MetaDescription = ({ children }) => {
        addMetaDataTags("name:description", `<meta name="description" content="${children}">`);
        return /* @__PURE__ */ jsx(Fragment, {});
      };
    }
  });

  // packages/lupine.components/src/components/modal.tsx
  var ModalWindow;
  var init_modal = __esm({
    "packages/lupine.components/src/components/modal.tsx"() {
      "use strict";
      init_float_window();
      ModalWindow = class {
        static async show({
          title,
          children,
          contentMaxHeight,
          contentMinWidth,
          buttons,
          noMoving = true,
          noModal = false,
          closeEvent,
          handleClicked,
          closeWhenClickOutside = true,
          zIndex,
          contentOverflowY
        }) {
          return FloatWindow.show({
            title,
            children,
            contentMaxHeight,
            contentMinWidth,
            buttons,
            noMoving,
            noModal,
            closeEvent,
            handleClicked,
            closeWhenClickOutside,
            zIndex,
            contentOverflowY
          });
        }
      };
    }
  });

  // packages/lupine.components/src/components/notice-message.tsx
  var NotificationColor, notificationColorFromValue, NotificationMessage;
  var init_notice_message = __esm({
    "packages/lupine.components/src/components/notice-message.tsx"() {
      "use strict";
      init_src();
      NotificationColor = /* @__PURE__ */ ((NotificationColor2) => {
        NotificationColor2["Success"] = "var(--success-bg-color)";
        NotificationColor2["Info"] = "var(--info-bg-color)";
        NotificationColor2["Warning"] = "var(--warning-bg-color)";
        NotificationColor2["Error"] = "var(--error-bg-color)";
        return NotificationColor2;
      })(NotificationColor || {});
      notificationColorFromValue = (value) => {
        switch (value) {
          case "Success":
            return "var(--success-bg-color)" /* Success */;
          case "Info":
            return "var(--info-bg-color)" /* Info */;
          case "Warning":
            return "var(--warning-bg-color)" /* Warning */;
          case "Error":
            return "var(--error-bg-color)" /* Error */;
        }
        return "var(--info-bg-color)" /* Info */;
      };
      NotificationMessage = class {
        static init() {
          const css = {
            position: "fixed",
            top: 0,
            right: 0,
            height: "auto",
            overflowY: "auto",
            maxHeight: "100%",
            width: "100%",
            maxWidth: "400px",
            // cursor: 'pointer',
            // backgroundColor: '#fefefe',
            padding: "0 10px",
            zIndex: "var(--layer-notice)",
            // borderRadius: '6px',
            // boxShadow: '0px 0px 2px #000',
            ">div": {
              color: "var(--notice-color-with-bg)",
              padding: "10px 8px",
              margin: "16px 0",
              borderRadius: "6px",
              boxShadow: "var(--cover-box-shadow)",
              //'3px 3px 8px #767676',
              transition: "all 0.5s",
              transform: "scale(0.1)",
              opacity: 0
            },
            ".close-btn": {
              position: "absolute",
              top: "-2px",
              right: "3px",
              color: "var(--notice-color-with-bg)",
              fontWeight: "bold",
              fontSize: "22px",
              lineHeight: "20px",
              cursor: "pointer",
              transition: "0.3s"
            },
            ".close-btn:hover": {
              color: "black"
            }
          };
          bindGlobalStyle("lj_notification", css);
          let container = document.querySelector(".lj_notification");
          if (!container) {
            container = document.createElement("div");
            container.className = "lj_notification";
            document.body.appendChild(container);
            this.container = container;
          }
        }
        static sendMessage(message, backgroundColor = "var(--info-bg-color)" /* Info */, permanent = false, showTime = 3e3) {
          if (!this.initialized) {
            this.initialized = true;
            this.init();
          }
          this.container.scrollTop = 0;
          const div = document.createElement("div");
          div.innerHTML = message;
          div.style.backgroundColor = backgroundColor;
          this.container.insertBefore(div, this.container.firstChild);
          setTimeout(() => {
            div.style.opacity = "1";
            div.style.transform = "scale(1)";
          }, 0);
          if (permanent) {
            const closeBtn = document.createElement("span");
            closeBtn.innerHTML = "&times;";
            closeBtn.className = "close-btn";
            div.appendChild(closeBtn);
            closeBtn.onclick = () => {
              this.container.removeChild(div);
            };
          } else {
            setTimeout(() => {
              div.style.opacity = "0";
              div.style.transform = "scale(0.1)";
              setTimeout(() => {
                this.container.removeChild(div);
              }, 1e3);
            }, showTime);
          }
        }
      };
      // public static readonly Color = NotificationColor;
      NotificationMessage.initialized = false;
    }
  });

  // packages/lupine.components/src/components/page-title.tsx
  var PageTitle;
  var init_page_title = __esm({
    "packages/lupine.components/src/components/page-title.tsx"() {
      "use strict";
      init_src();
      init_jsx_runtime();
      PageTitle = ({ children }) => {
        setPageTitle(children);
        return /* @__PURE__ */ jsx(Fragment, {});
      };
    }
  });

  // packages/lupine.components/src/components/paging-link.tsx
  var _DEFAULT_PAGE_LIMIT, getDefaultPageLimit, setDefaultPageLimit, pageLinkOptions, PagingLink;
  var init_paging_link = __esm({
    "packages/lupine.components/src/components/paging-link.tsx"() {
      "use strict";
      init_src();
      init_jsx_runtime();
      _DEFAULT_PAGE_LIMIT = 10;
      getDefaultPageLimit = () => {
        return _DEFAULT_PAGE_LIMIT;
      };
      setDefaultPageLimit = (limit) => {
        _DEFAULT_PAGE_LIMIT = limit;
      };
      pageLinkOptions = [10, 20, 50, 100, 200, 500];
      PagingLink = ({
        itemsCount,
        pageLimit = getDefaultPageLimit(),
        pageIndex = 0,
        baseLink,
        onClick,
        textPerpage = "/Page",
        textOk = "Go",
        textTo = "To",
        textPage = "Page",
        showControl
      }) => {
        const css = {
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          textAlign: "right",
          padding: "6px 16px 6px 0",
          fontSize: "14px",
          ".paging-link-index a, .paging-link-index.current": {
            padding: "2px 6px",
            textDecoration: "none"
          },
          ".paging-link-index.current": {
            fontWeight: "bold"
          },
          "span.paging-link-index a:hover, span.paging-link-go a:hover": {
            textDecoration: "underline"
          },
          ".paging-link-ctl-box": {
            display: "flex",
            alignItems: "center"
          },
          ".paging-link-ctl-box .paging-link-jump": {
            width: "50px",
            padding: "1px 3px",
            margin: "0 3px",
            textAlign: "right"
          },
          ".paging-link-ctl-box .paging-link-limit": {
            width: "90px",
            padding: "1px 3px",
            margin: "0 3px"
          },
          ".paging-link-ok": {
            margin: "0 3px"
          }
        };
        bindGlobalStyle("paging-link-box", css);
        pageIndex = pageIndex ?? (Number.parseInt(getRenderPageProps().query["pg_i"] || "") || 0);
        pageLimit = pageLimit || _DEFAULT_PAGE_LIMIT;
        let maxPages = Math.floor(itemsCount / pageLimit);
        if (itemsCount > 0 && pageLimit > 0) {
          if (itemsCount % pageLimit !== 0) {
            maxPages++;
          }
          if (pageIndex > maxPages) {
            pageIndex = maxPages - 1;
          }
        }
        const onPageLimitChange = (e) => {
          const limit = Number(e.target.value || "0");
          if (limit > 0) {
            setDefaultPageLimit(limit);
            onClick && onClick(pageIndex);
          }
        };
        const onOkClick = () => {
          let index = Number(ref.$(".paging-link-jump").value || "0");
          if (index < 1) {
            index = 1;
          }
          if (index > maxPages) {
            index = maxPages;
          }
          onClick && onClick(index - 1);
        };
        const ref = {};
        return /* @__PURE__ */ jsx("div", { ref, class: "paging-link-box", children: [
          pageIndex > 0 ? /* @__PURE__ */ jsx("span", { class: "paging-link-go", children: /* @__PURE__ */ jsx(
            "a",
            {
              href: onClick ? "javascript:void(0)" : baseLink + "?pg_i=" + (pageIndex - 1),
              onClick: () => onClick && onClick(pageIndex - 1),
              children: "<"
            }
          ) }) : /* @__PURE__ */ jsx("span", { class: "paging-link-go disabled", children: "<" }),
          Array.from({ length: maxPages }, (_, i) => i).map((i) => /* @__PURE__ */ jsx(Fragment, { children: i < 2 || i >= maxPages - 2 || i > pageIndex - 3 && i < pageIndex + 3 ? i == pageIndex ? /* @__PURE__ */ jsx("span", { class: "paging-link-index current", children: i + 1 }) : /* @__PURE__ */ jsx("span", { class: "paging-link-index", children: /* @__PURE__ */ jsx(
            "a",
            {
              href: onClick ? "javascript:void(0)" : baseLink + "?pg_i=" + i,
              onClick: () => onClick && onClick(i),
              children: i + 1
            }
          ) }) : (i == pageIndex - 4 || i == pageIndex + 4) && /* @__PURE__ */ jsx("span", { class: "paging-link-skip", children: "..." }) })),
          pageIndex < maxPages - 1 ? /* @__PURE__ */ jsx("span", { class: "paging-link-go", children: /* @__PURE__ */ jsx(
            "a",
            {
              href: onClick ? "javascript:void(0)" : baseLink + "?pg_i=" + (pageIndex + 1),
              onClick: () => onClick && onClick(pageIndex + 1),
              children: ">"
            }
          ) }) : /* @__PURE__ */ jsx("span", { class: "paging-link-go disabled", children: ">" }),
          showControl && /* @__PURE__ */ jsx("div", { class: "paging-link-ctl-box", children: [
            textTo,
            /* @__PURE__ */ jsx("input", { class: "input-base paging-link-jump input-s", type: "number", value: pageIndex + 1 }),
            " / ",
            maxPages,
            " ",
            textPage,
            /* @__PURE__ */ jsx("button", { class: "button-base button-s paging-link-ok", onClick: onOkClick, children: textOk }),
            /* @__PURE__ */ jsx("select", { class: "input-base paging-link-limit input-s", onChange: onPageLimitChange, children: [
              /* @__PURE__ */ jsx("option", { value: "", children: " - " }),
              pageLinkOptions.map((page) => /* @__PURE__ */ jsx("option", { value: page, children: [
                page,
                textPerpage
              ] }))
            ] })
          ] })
        ] });
      };
    }
  });

  // packages/lupine.components/src/components/panel.tsx
  var Panel;
  var init_panel = __esm({
    "packages/lupine.components/src/components/panel.tsx"() {
      "use strict";
      init_jsx_runtime();
      Panel = ({ children, className, css }) => {
        const newCss = {
          display: "flex",
          flexDirection: "column",
          ...css
        };
        return /* @__PURE__ */ jsx("div", { css: newCss, class: ["panel-box", className].join(" "), children });
      };
    }
  });

  // packages/lupine.components/src/components/popup-menu.tsx
  var PopupMenuWithIcon, PopupMenuWithButton, PopupMenuWithLabel, PopupMenu;
  var init_popup_menu = __esm({
    "packages/lupine.components/src/components/popup-menu.tsx"() {
      "use strict";
      init_lib2();
      init_jsx_runtime();
      PopupMenuWithIcon = (props) => {
        const hook = {};
        const css = {
          cursor: "pointer",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          fontSize: "24px"
        };
        return /* @__PURE__ */ jsx(
          "div",
          {
            onClick: () => {
              hook.openMenu && hook.openMenu();
            },
            css,
            children: /* @__PURE__ */ jsx(
              PopupMenu,
              {
                list: props.list,
                defaultValue: props.defaultValue,
                tips: props.tips,
                minWidth: props.minWidth,
                maxWidth: props.maxWidth,
                maxHeight: props.maxHeight,
                handleSelected: props.handleSelected,
                handleOpened: props.handleOpened,
                handleClosed: props.handleClosed,
                noUpdateLabel: props.noUpdateLabel,
                hook,
                noTriangleIcon: props.noTriangleIcon
              }
            )
          }
        );
      };
      PopupMenuWithButton = (props) => {
        const hook = {};
        return /* @__PURE__ */ jsx(
          "button",
          {
            class: "button-base",
            onClick: () => {
              hook.openMenu && hook.openMenu();
            },
            css: { ">div": { float: "right", textAlign: "left" } },
            children: [
              props.label,
              ":",
              " ",
              /* @__PURE__ */ jsx(
                PopupMenu,
                {
                  list: props.list,
                  defaultValue: props.defaultValue,
                  tips: props.tips,
                  minWidth: props.minWidth,
                  maxWidth: props.maxWidth,
                  maxHeight: props.maxHeight,
                  handleSelected: props.handleSelected,
                  handleOpened: props.handleOpened,
                  handleClosed: props.handleClosed,
                  noUpdateLabel: props.noUpdateLabel,
                  hook,
                  noTriangleIcon: props.noTriangleIcon,
                  align: props.align
                }
              )
            ]
          }
        );
      };
      PopupMenuWithLabel = (props) => {
        const hook = {};
        return /* @__PURE__ */ jsx(
          "div",
          {
            onClick: () => {
              hook.openMenu && hook.openMenu();
            },
            css: { cursor: "pointer", ">div": { float: "right", textAlign: "left" } },
            children: [
              props.label,
              ":",
              " ",
              /* @__PURE__ */ jsx(
                PopupMenu,
                {
                  list: props.list,
                  defaultValue: props.defaultValue,
                  tips: props.tips,
                  minWidth: props.minWidth,
                  maxWidth: props.maxWidth,
                  maxHeight: props.maxHeight,
                  handleSelected: props.handleSelected,
                  handleOpened: props.handleOpened,
                  handleClosed: props.handleClosed,
                  noUpdateLabel: props.noUpdateLabel,
                  hook,
                  noTriangleIcon: props.noTriangleIcon,
                  align: props.align
                }
              )
            ]
          }
        );
      };
      PopupMenu = ({
        list: list2,
        defaultValue,
        icon,
        tips = "",
        width,
        minWidth,
        maxWidth,
        maxHeight,
        handleSelected,
        handleOpened,
        handleClosed,
        noUpdateLabel,
        hook,
        align = "right",
        noTriangleIcon
      }) => {
        const css = {
          ".popup-menu-item": {
            padding: "0 0 1px 0",
            display: "inline-block",
            position: "relative",
            ".triangle-icon": {
              display: "inline-block",
              cursor: "pointer",
              whiteSpace: "nowrap",
              marginRight: "15px"
            },
            // cover-box-shadow
            ".triangle-icon::after": {
              content: '""',
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              marginLeft: "3px",
              width: 0,
              height: 0,
              borderLeft: "5px solid transparent",
              borderRight: "5px solid transparent",
              borderTop: "5px solid var(--primary-color)"
            }
          },
          ".popup-menu-item:hover": {
            padding: "1px 0 0 0"
          },
          ".popup-menu-bottom": {
            position: "relative",
            height: "1px",
            ".popup-menu-list": {
              display: "none",
              position: "absolute",
              fontSize: "var(--menu-font-size)",
              top: 0,
              width: width || "100px",
              color: "var(--activatable-color-normal)",
              backgroundColor: "var(--activatable-bg-color-normal)",
              zIndex: "var(--layer-menu)",
              borderRadius: "4px",
              border: "1px solid #ddd",
              padding: "5px 0px",
              overflow: "auto",
              "line-height": "1.2em",
              "min-width": minWidth || "auto",
              "max-width": maxWidth || "200px",
              "max-height": maxHeight || "300px",
              "box-shadow": "var(--cover-box-shadow)",
              //'#0000004c 0px 19px 38px, #00000038 0px 15px 12px',
              ".menu-focus": {
                position: "absolute",
                height: "0px"
              },
              ".item": {
                padding: "2px 12px"
              },
              ".item:hover": {
                padding: "2px 11px 2px 13px",
                color: "var(--activatable-color-hover)",
                backgroundColor: "var(--activatable-bg-color-hover)",
                cursor: "pointer"
              },
              ".item.indent1": {
                paddingLeft: "19px"
              },
              ".item.indent1:hover": {
                paddingLeft: "18px"
              },
              ".item.indent2": {
                paddingLeft: "35px"
              },
              ".item.indent2:hover": {
                paddingLeft: "34px"
              }
            },
            ".popup-menu-list.left-align": {
              left: "2px"
            },
            ".popup-menu-list.right-align": {
              right: "2px"
            },
            ".popup-menu-list.open": {
              display: "inline-block"
            }
          }
        };
        let ref = { id: "" };
        let isShowing = false;
        let selectedValue = defaultValue;
        const openMenu = (event) => {
          stopPropagation(event);
          handleOpened && handleOpened();
          isShowing = !isShowing;
          const listDom = ref.$(".popup-menu-list");
          if (align === "left") {
            listDom.classList.add("left-align");
          } else {
            listDom.classList.add("right-align");
          }
          listDom.classList.toggle("open", isShowing);
          ref.$(".popup-menu-list .menu-focus").focus();
        };
        if (hook) {
          hook.openMenu = openMenu;
          hook.getValue = () => selectedValue;
          hook.setLabel = (label) => {
            if (!icon && noUpdateLabel !== true) {
              ref.$(".popup-menu-item .popup-menu-text").innerText = label;
            }
          };
        }
        const itemClick = (event, item) => {
          stopPropagation(event);
          isShowing = false;
          ref.$(".popup-menu-list").classList.remove("open");
          if (event.target) {
            selectedValue = event.target.innerText;
            if (!icon && noUpdateLabel !== true) {
              ref.$(".popup-menu-item .popup-menu-text").innerText = event.target.innerText;
            }
            if (handleSelected) {
              handleSelected(event.target.innerText, item);
            }
          }
          handleClosed && handleClosed();
        };
        const onBlur = (event) => {
          setTimeout(() => {
            ref.$(".popup-menu-list").classList.remove("open");
            isShowing && handleClosed && handleClosed();
            isShowing = false;
          }, 300);
        };
        return /* @__PURE__ */ jsx("div", { ref, css, onClick: openMenu, title: tips, children: [
          /* @__PURE__ */ jsx("div", { class: "popup-menu-item", children: icon ? icon : /* @__PURE__ */ jsx("span", { class: "popup-menu-text" + (noTriangleIcon !== true ? " triangle-icon" : ""), children: defaultValue || "&nbsp;" }) }),
          /* @__PURE__ */ jsx("div", { class: "popup-menu-bottom", children: /* @__PURE__ */ jsx("div", { class: "popup-menu-list", children: [
            /* @__PURE__ */ jsx("div", { children: list2.map((item) => {
              if (item === "") return /* @__PURE__ */ jsx("hr", {});
              const text = typeof item === "string" ? item : item.text;
              const indent = typeof item === "string" ? 0 : item.indent;
              return /* @__PURE__ */ jsx("div", { class: "item" + (indent ? " indent" + indent : ""), onClick: (e) => itemClick(e, item), children: text });
            }) }),
            /* @__PURE__ */ jsx("div", { class: "menu-focus", onBlur, tabIndex: 0 })
          ] }) })
        ] });
      };
    }
  });

  // packages/lupine.components/src/components/progress.tsx
  var Progress;
  var init_progress = __esm({
    "packages/lupine.components/src/components/progress.tsx"() {
      "use strict";
      init_html_var();
      init_jsx_runtime();
      Progress = (props) => {
        const css = {
          position: "fixed",
          display: "flex",
          bottom: "0",
          left: "0",
          width: "100%",
          zIndex: "var(--layer-modal-over)",
          flexDirection: "column",
          backgroundColor: "#e6e6e6de",
          padding: "16px",
          ".progress-box": {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "auto",
            margin: "auto"
          },
          ".progress-bar": {
            display: "flex",
            width: "100%",
            height: "60px",
            borderRadius: "4px",
            overflow: "hidden"
          },
          ".progress-bar1": {
            height: "100%",
            width: "0%",
            backgroundColor: "#49e57e"
          },
          ".progress-bar2": {
            height: "100%",
            width: "100%",
            backgroundColor: "#2bb8cd"
          },
          ".progress-tips": {
            marginTop: "10px",
            fontSize: "30px",
            color: "#49e57e"
          }
        };
        props.hook.onProgress = (percentage, chunkNumber, totalChunks) => {
          percentage = Math.round(percentage * 100);
          const bar1 = document.querySelector(".progress-bar1");
          const bar2 = document.querySelector(".progress-bar2");
          bar1.style.width = `${percentage}%`;
          bar2.style.width = `${1 - percentage}%`;
          dom.value = `${percentage}%`;
        };
        props.hook.onShow = (show, title) => {
          var _a, _b;
          if (title) {
            domTitle.value = title;
          }
          if (show) {
            (_a = ref.current) == null ? void 0 : _a.classList.remove("d-none");
          } else {
            (_b = ref.current) == null ? void 0 : _b.classList.add("d-none");
          }
        };
        const ref = {};
        const domTitle = new HtmlVar("Progress");
        const dom = new HtmlVar("0 %");
        return /* @__PURE__ */ jsx("div", { ref, css, class: "progress-top d-none", children: /* @__PURE__ */ jsx("div", { class: "progress-box", children: [
          /* @__PURE__ */ jsx("div", { class: "progress-title mb-m align-left w-100p", children: domTitle.node }),
          /* @__PURE__ */ jsx("div", { class: "progress-bar", children: [
            /* @__PURE__ */ jsx("div", { class: "progress-bar1" }),
            /* @__PURE__ */ jsx("div", { class: "progress-bar2" })
          ] }),
          /* @__PURE__ */ jsx("div", { class: "progress-tips", children: dom.node })
        ] }) });
      };
    }
  });

  // packages/lupine.components/src/components/radio-label-component.tsx
  var RadioLabelComponent;
  var init_radio_label_component = __esm({
    "packages/lupine.components/src/components/radio-label-component.tsx"() {
      "use strict";
      init_src2();
      init_jsx_runtime();
      RadioLabelComponent = (props) => {
        const css = {
          display: "flex",
          "& > label": {
            display: "flex",
            alignItems: "center"
          }
        };
        bindGlobalStyle("radio-label-component", css);
        return /* @__PURE__ */ jsx("div", { class: "radio-label-component" + (props.className ? " " + props.className : ""), children: /* @__PURE__ */ jsx("label", { children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "radio",
              name: props.name,
              class: "input-base input-s" + (props.radioClassname ? " " + props.radioClassname : ""),
              checked: props.checked,
              disabled: props.disabled,
              onChange: (event) => {
                var _a;
                return (_a = props.onChange) == null ? void 0 : _a.call(props, event.target.checked);
              }
            }
          ),
          /* @__PURE__ */ jsx("span", { class: "ml-ss", children: props.label })
        ] }) });
      };
    }
  });

  // packages/lupine.components/src/components/redirect.tsx
  var Redirect;
  var init_redirect = __esm({
    "packages/lupine.components/src/components/redirect.tsx"() {
      "use strict";
      init_jsx_runtime();
      Redirect = ({ title = "redirect...", url, delaySeconds = 0 }) => {
        const ref = {
          onLoad: async (el) => {
            setTimeout(() => {
              window.location.href = url;
            }, delaySeconds * 1e3);
          }
        };
        return /* @__PURE__ */ jsx("div", { ref, children: title });
      };
    }
  });

  // packages/lupine.components/src/components/resizable-splitter.tsx
  var _ResizableSplitter, ResizableSplitter;
  var init_resizable_splitter = __esm({
    "packages/lupine.components/src/components/resizable-splitter.tsx"() {
      "use strict";
      init_src();
      init_lib2();
      init_jsx_runtime();
      _ResizableSplitter = class _ResizableSplitter {
        static init() {
          const css = {
            ".resizable-splitter-v-left, .resizable-splitter-v-right": {
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              width: "2px",
              cursor: "col-resize"
            },
            ".resizable-splitter-v-right": {
              left: "unset",
              right: 0
            },
            ".resizable-splitter-v-left:hover, .resizable-splitter-v-right:hover": {
              width: "4px",
              backgroundColor: "#ccc"
            },
            ".resizable-splitter-h-top, .resizable-splitter-h-bottom": {
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "2px",
              cursor: "row-resize"
            },
            ".resizable-splitter-h-bottom": {
              top: "unset",
              bottom: 0
            },
            ".resizable-splitter-h-top:hover, .resizable-splitter-h-bottom:hover": {
              height: "4px",
              backgroundColor: "#ccc"
            }
          };
          bindGlobalStyle("resizable-splitter", css);
          window.addEventListener("mousemove", _ResizableSplitter.onMousemove.bind(_ResizableSplitter), false);
          document.documentElement.addEventListener("mouseup", _ResizableSplitter.onMouseup.bind(_ResizableSplitter), false);
        }
        static getSplitterClassName(isVertical, isRightOrTop) {
          const className = "resizable-splitter-" + (isVertical ? isRightOrTop ? "v-right" : "v-left" : isRightOrTop ? "h-top" : "h-bottom");
          return className;
        }
        static onMousedown(event) {
          if (event.buttons !== 1 || event.button !== 0) return;
          this.pressed = true;
          this.startXorY = this.isVertical ? event.clientX : event.clientY;
          const startPosition = document.defaultView.getComputedStyle(this.hostNode)[this.isVertical ? "width" : "height"];
          this.startWidthOrHeight = parseInt(startPosition, 10);
        }
        static onMousemove(event) {
          if (!this.pressed || event.buttons !== 1 || event.button !== 0) {
            return;
          }
          stopPropagation(event);
          if (this.isVertical) {
            const movedXorY = this.startWidthOrHeight + (event.clientX - this.startXorY) * (this.isRightOrTop ? 1 : -1);
            this.hostNode.style.width = movedXorY + "px";
          } else {
            const movedXorY = this.startWidthOrHeight + (event.clientY - this.startXorY) * (this.isRightOrTop ? -1 : 1);
            this.hostNode.style.height = movedXorY + "px";
          }
        }
        static onMouseup() {
          if (this.pressed) this.pressed = false;
        }
        static getSplitter(selector, isVertical, isRightOrTop) {
          const className = this.getSplitterClassName(isVertical, isRightOrTop);
          const onMousedown = (event) => {
            if (!this.initialized) {
              this.initialized = true;
              this.init();
            }
            _ResizableSplitter.hostNode = document.querySelector(selector);
            if (!_ResizableSplitter.hostNode) {
              console.error(`Can't find element: ${selector}`);
              return;
            }
            _ResizableSplitter.isVertical = isVertical;
            _ResizableSplitter.isRightOrTop = isRightOrTop;
            _ResizableSplitter.onMousedown.bind(_ResizableSplitter)(event);
          };
          return /* @__PURE__ */ jsx("div", { onMouseDown: onMousedown, class: className });
        }
      };
      _ResizableSplitter.isVertical = true;
      _ResizableSplitter.isRightOrTop = true;
      _ResizableSplitter.initialized = false;
      _ResizableSplitter.startXorY = 0;
      _ResizableSplitter.startWidthOrHeight = 0;
      _ResizableSplitter.pressed = false;
      ResizableSplitter = _ResizableSplitter;
    }
  });

  // packages/lupine.components/src/components/select-angle-component.tsx
  var SelectAngleComponent;
  var init_select_angle_component = __esm({
    "packages/lupine.components/src/components/select-angle-component.tsx"() {
      "use strict";
      init_jsx_runtime();
      SelectAngleComponent = (props) => {
        const css = {
          width: props.size || "80px",
          height: props.size || "80px",
          "&circle": {
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            border: "2px solid #aaa",
            position: "relative",
            backgroundColor: "var(--primary-bg-color)",
            cursor: "pointer"
          },
          "&needle": {
            width: "2px",
            height: "50%",
            backgroundColor: "red",
            position: "absolute",
            top: "0",
            left: "50%",
            transformOrigin: "bottom center",
            transform: "rotate(90deg)"
          },
          "&tips": {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "12px",
            color: "var(--primary-color)",
            fontWeight: "600",
            zIndex: "10"
          },
          "&a0, &a90, &a180, &a270": {
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            backgroundColor: "#333",
            position: "absolute",
            top: "0",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "12px",
            color: "#333"
          },
          "&a90": {
            top: "50%",
            left: "100%"
          },
          "&a180": {
            top: "100%",
            left: "50%"
          },
          "&a270": {
            top: "50%",
            left: "0"
          }
        };
        let cx = 0;
        let cy = 0;
        let mv = false;
        if (props.hook) {
          props.hook.setAngle = (angle) => {
            updateAngleSub(angle);
          };
        }
        const updateAngle = (ev) => {
          const dx = ev.clientX - cx;
          const dy = ev.clientY - cy;
          let deg = Math.atan2(dy, dx) * (180 / Math.PI);
          deg = (deg + 450) % 360;
          updateAngleSub(deg);
        };
        const updateAngleSub = (deg) => {
          const needle = ref.$("&needle");
          const text = ref.$("&tips");
          needle.style.transform = `rotate(${deg}deg)`;
          text.textContent = `${deg.toFixed(0)}\xB0`;
          props.onChange(deg);
        };
        const pointerdown = (ev) => {
          const picker = ref.$("&circle");
          const rect = picker.getBoundingClientRect();
          cx = rect.left + rect.width / 2;
          cy = rect.top + rect.height / 2;
          updateAngle(ev);
          mv = true;
        };
        const pointermove = (ev) => {
          if (!mv) {
            return;
          }
          updateAngle(ev);
        };
        const pointerup = () => {
          mv = false;
        };
        const ref = {};
        return /* @__PURE__ */ jsx("div", { ref, css, children: /* @__PURE__ */ jsx("div", { class: "&circle", onPointerDown: pointerdown, onPointerMove: pointermove, onPointerUp: pointerup, children: [
          /* @__PURE__ */ jsx("div", { class: "&needle" }),
          /* @__PURE__ */ jsx("div", { class: "&tips", children: "90\xB0" }),
          /* @__PURE__ */ jsx("div", { class: "&a0", onClick: () => updateAngleSub(0) }),
          /* @__PURE__ */ jsx("div", { class: "&a90", onClick: () => updateAngleSub(90) }),
          /* @__PURE__ */ jsx("div", { class: "&a180", onClick: () => updateAngleSub(180) }),
          /* @__PURE__ */ jsx("div", { class: "&a270", onClick: () => updateAngleSub(270) })
        ] }) });
      };
    }
  });

  // packages/lupine.components/src/components/select-with-title.tsx
  var SelectWithTitle;
  var init_select_with_title = __esm({
    "packages/lupine.components/src/components/select-with-title.tsx"() {
      "use strict";
      init_jsx_runtime();
      SelectWithTitle = (title, options3, onOptionChanged, size, className = "input-base", width = "100%") => {
        const css = {
          select: {
            height: "auto",
            overflowY: "auto",
            width
          }
        };
        return /* @__PURE__ */ jsx("div", { css, children: [
          /* @__PURE__ */ jsx("div", { children: title }),
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("select", { class: className, onChange: (e) => {
            var _a;
            return onOptionChanged((_a = e == null ? void 0 : e.target) == null ? void 0 : _a.value);
          }, size, children: options3.map((option) => /* @__PURE__ */ jsx("option", { value: option.value, selected: option.selected, children: option.option })) }) })
        ] });
      };
    }
  });

  // packages/lupine.components/src/components/slide-tab-component.tsx
  var SlideTabComponent;
  var init_slide_tab_component = __esm({
    "packages/lupine.components/src/components/slide-tab-component.tsx"() {
      "use strict";
      init_src2();
      init_jsx_runtime();
      SlideTabComponent = (props) => {
        const css = {
          display: "flex",
          flexDirection: "column",
          flex: 1,
          fontSize: "12px",
          borderRadius: "6px",
          padding: "0px 8px 4px 8px",
          // marginBottom: '8px',
          height: "100%",
          ".slide-tab-c-list": {
            flex: 1,
            borderRadius: "6px",
            display: "flex",
            overflowX: "auto",
            width: "100%",
            scrollSnapType: "x mandatory",
            gap: "8px",
            paddingBottom: "10px",
            scrollBehavior: "smooth",
            WebkitOverflowScrolling: "touch"
          },
          ".slide-tab-c-slide": {
            width: "100%",
            overflow: "hidden",
            position: "relative",
            minWidth: "100%",
            flexShrink: 0,
            scrollSnapAlign: "start",
            height: "100%",
            overflowY: "auto"
          },
          ".slide-tab-c-nav": {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            backgroundColor: "var(--primary-bg-color)",
            position: "sticky",
            top: 0,
            zIndex: 1
          },
          ".slide-tab-c-nav-wrap": {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            padding: "2px 4px",
            borderRadius: "4px",
            backgroundColor: "var(--secondary-bg-color)"
          },
          ".slide-tab-c-nav-item": {
            cursor: "pointer",
            padding: "4px 8px",
            borderRadius: "4px",
            marginRight: "8px"
          },
          ".slide-tab-c-nav-item.active": {
            backgroundColor: "var(--primary-accent-color)",
            color: "white"
          }
        };
        bindGlobalStyle("slide-tab-c-box", css);
        const ref = {};
        let slideIndex = 0;
        let manualScroll = false;
        let scrollEndTimer = null;
        const drawerScroll = () => {
          if (manualScroll) {
            return;
          }
          if (scrollEndTimer) {
            clearTimeout(scrollEndTimer);
          }
          scrollEndTimer = setTimeout(() => {
            drawerScrollStop();
          }, 100);
        };
        const resetSlides = (index) => {
          const dots = ref.$all(".slide-tab-c-nav-item");
          for (let i = 0; i < dots.length; i++) {
            dots[i].classList.toggle("active", i === index);
          }
        };
        const drawerScrollStop = () => {
          const drawer = ref.$(".slide-tab-c-list");
          const width = drawer.clientWidth;
          const currentScrollIndex = Math.round(drawer.scrollLeft / width);
          slideIndex = currentScrollIndex;
          resetSlides(slideIndex);
        };
        const moveSlide = (slideIndex2) => {
          const drawer = ref.$(".slide-tab-c-list");
          const children = ref.$all(".slide-tab-c-slide");
          if (!drawer || !children || children.length === 0) {
            return;
          }
          const target = children[slideIndex2];
          if (!target) {
            return;
          }
          const offsetLeft = target.offsetLeft;
          manualScroll = true;
          drawer.scrollTo({
            left: offsetLeft,
            behavior: "smooth"
          });
          resetSlides(slideIndex2);
          setTimeout(() => {
            manualScroll = false;
          }, 300);
        };
        return /* @__PURE__ */ jsx("section", { class: "slide-tab-c-box", ref, children: [
          /* @__PURE__ */ jsx("div", { class: "slide-tab-c-nav", children: /* @__PURE__ */ jsx("div", { class: "slide-tab-c-nav-wrap", children: props.pages.map((page, index) => /* @__PURE__ */ jsx(
            "div",
            {
              class: `slide-tab-c-nav-item ${index === 0 ? "active" : ""}`,
              onClick: (event) => {
                event.preventDefault();
                moveSlide(index);
              },
              children: page.title
            }
          )) }) }),
          /* @__PURE__ */ jsx("div", { class: "slide-tab-c-list no-scrollbar-container", onScroll: drawerScroll, children: props.pages.map((page) => /* @__PURE__ */ jsx("div", { class: "slide-tab-c-slide no-scrollbar-container", children: page.content })) })
        ] });
      };
    }
  });

  // packages/lupine.components/src/components/stars-component.tsx
  var StarsComponent;
  var init_stars_component = __esm({
    "packages/lupine.components/src/components/stars-component.tsx"() {
      "use strict";
      init_src2();
      init_jsx_runtime();
      StarsComponent = (props) => {
        const css = {
          display: "flex",
          flexDirection: "row",
          ".stars-label": {
            color: "#9d9d9d",
            cursor: "pointer",
            display: "flex",
            alignItems: "center"
          },
          ".stars-label.active": {
            color: "blue"
          },
          ".stars-label .full, .stars-label.active .outline": {
            display: "none"
          },
          ".stars-label.active .full, .stars-label .outline": {
            display: "inline"
          }
        };
        bindGlobalStyle("stars-box", css);
        const setValue = (value) => {
          props.value = value;
          const stars = ref.$all(".stars-label");
          stars.forEach((star, index) => {
            star.classList.toggle("active", index < value);
          });
        };
        if (props.hook) {
          props.hook.setValue = (value) => {
            setValue(value);
          };
          props.hook.getValue = () => props.value;
        }
        const ref = {};
        return /* @__PURE__ */ jsx("div", { style: { fontSize: props.fontSize || "20px" }, ref, class: "stars-box", children: Array.from({ length: props.maxLength }).map((value, index) => /* @__PURE__ */ jsx(
          "label",
          {
            class: "stars-label" + (index < props.value ? " active" : ""),
            onClick: () => {
              var _a;
              setValue(index + 1);
              (_a = props.onChange) == null ? void 0 : _a.call(props, index + 1);
            },
            children: [
              /* @__PURE__ */ jsx("i", { class: "ifc-icon ma-cards-heart full" }),
              /* @__PURE__ */ jsx("i", { class: "ifc-icon ma-cards-heart-outline outline" })
            ]
          }
        )) });
      };
    }
  });

  // packages/lupine.components/src/components/svg.tsx
  var Svg;
  var init_svg = __esm({
    "packages/lupine.components/src/components/svg.tsx"() {
      "use strict";
      init_jsx_runtime();
      Svg = ({
        children,
        width,
        height,
        color
      }) => {
        let content = children || "";
        if (content.startsWith("data:image/svg+xml,")) {
          content = decodeURIComponent(content.slice("data:image/svg+xml,".length));
        } else if (content.includes("%") && content.includes("<svg")) {
          content = decodeURIComponent(content);
        }
        const css = {
          svg: {
            maxWidth: "100%",
            maxHeight: "100%",
            width,
            height,
            fill: color
          }
        };
        return /* @__PURE__ */ jsx("div", { css, dangerouslySetInnerHTML: content });
      };
    }
  });

  // packages/lupine.components/src/components/switch-option-component.tsx
  var SwitchOptionComponent;
  var init_switch_option_component = __esm({
    "packages/lupine.components/src/components/switch-option-component.tsx"() {
      "use strict";
      init_src2();
      init_jsx_runtime();
      SwitchOptionComponent = (props) => {
        const css = {
          display: "flex",
          flexDirection: "row",
          borderRadius: "9999px",
          padding: "2px 4px",
          fontSize: "0.7rem",
          backgroundColor: "#e7e7e7",
          width: "fit-content",
          ".switch-btn": {
            padding: "4px",
            borderRadius: "50%",
            border: "none",
            background: "transparent",
            color: "inherit",
            cursor: "pointer",
            transition: "all 0.2s"
          },
          ".switch-btn:first-child": {
            marginRight: "4px"
          },
          ".switch-btn.active": {
            backgroundColor: "#fff",
            color: "#000000",
            boxShadow: "2px 1px 2px 1px rgb(189 189 189)"
          }
        };
        bindGlobalStyle("switch-option-box", css);
        const onNotationChange = (value) => {
          var _a;
          props.defaultOption = value;
          const btns = ref.$all(".switch-btn");
          btns[0].classList.toggle("active", value === props.option1);
          btns[1].classList.toggle("active", value === props.option2);
          (_a = props.onChange) == null ? void 0 : _a.call(props, value);
        };
        if (props.hook) {
          props.hook.setValue = (value) => {
            onNotationChange(value);
          };
          props.hook.getValue = () => props.defaultOption;
        }
        const ref = {};
        return /* @__PURE__ */ jsx("div", { style: { fontSize: props.fontSize }, ref, class: "switch-option-box", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => onNotationChange(props.option1),
              className: `switch-btn ${props.defaultOption === props.option1 ? "active" : ""}`,
              children: props.option1
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => onNotationChange(props.option2),
              className: `switch-btn ${props.defaultOption === props.option2 ? "active" : ""}`,
              children: props.option2
            }
          )
        ] });
      };
    }
  });

  // packages/lupine.components/src/components/tabs.tsx
  var Tabs;
  var init_tabs = __esm({
    "packages/lupine.components/src/components/tabs.tsx"() {
      "use strict";
      init_src();
      init_lib2();
      init_jsx_runtime();
      Tabs = ({ pages, defaultIndex, topClassName, pagePadding, hook: refUpdate }) => {
        let newIndex = typeof defaultIndex === "number" ? defaultIndex : 0;
        const clearIndex = () => {
          const header = ref.$(`.&tabs > div > .tab.active`);
          header && header.classList.remove("active");
          const page = ref.$(`.&pages > .page.active`);
          page && page.classList.remove("active");
        };
        const updateIndex = (index) => {
          clearIndex();
          const doms = ref.$all(`.&tabs > div > .tab`);
          if (index >= 0 && index < doms.length) {
            doms[index].classList.add("active");
            const pages2 = ref.$all(`.&pages > .page`);
            pages2[index].classList.add("active");
            (refUpdate == null ? void 0 : refUpdate.indexChanged) && (refUpdate == null ? void 0 : refUpdate.indexChanged(index));
          }
        };
        const removePage = (index) => {
          const doms = ref.$all(`.&tabs > div > .tab`);
          if (index >= 0 && index < doms.length) {
            const newIndex2 = index === doms.length - 1 ? index - 1 : index;
            const isAct = doms[index].classList.contains("active");
            doms[index].parentNode.remove();
            const pages2 = ref.$all(`.&pages > .page`);
            pages2[index].remove();
            if (isAct) {
              updateIndex(newIndex2);
            }
          }
        };
        const removePageFromX = (event) => {
          stopPropagation(event);
          const tab = event.target.parentNode;
          const index = Array.prototype.indexOf.call(tab.parentNode.parentNode.children, tab.parentNode);
          removePage(index);
        };
        const newPage = async (title, page, index) => {
          const allTabs = ref.$all(`.&tabs > div > .tab`);
          let newPageIndex = allTabs.length;
          if (typeof index === "number" && index >= 0 && index < allTabs.length) {
            newPageIndex = index;
          }
          clearIndex();
          const newTab2 = createTabHeader(title, " active");
          const newTab = document.createElement("div");
          const newPage2 = document.createElement("div");
          newPage2.className = "page";
          if (newPageIndex === allTabs.length) {
            ref.$(`.&tabs`).appendChild(newTab);
            ref.$(`.&pages`).appendChild(newPage2);
          } else {
            ref.$(`.&tabs`).insertBefore(newTab, allTabs[newPageIndex]);
            const pages2 = ref.$all(`.&pages > .page`);
            ref.$(`.&pages`).insertBefore(newPage2, pages2[newPageIndex]);
          }
          await mountInnerComponent(newTab, newTab2);
          await mountInnerComponent(newPage2, page);
          updateIndex(newPageIndex);
        };
        const createTabHeader = (title, className) => {
          return /* @__PURE__ */ jsx("div", { onClick: onTabClick, class: "tab" + className, children: [
            title,
            /* @__PURE__ */ jsx("span", { class: "modal-close", onClick: removePageFromX, children: "\xD7" })
          ] });
        };
        const onTabClick = (event) => {
          stopPropagation(event);
          const tab = event.target;
          const index = Array.prototype.indexOf.call(tab.parentNode.parentNode.children, tab.parentNode);
          updateIndex(index);
        };
        const flashTitle = (index) => {
          const doms = ref.$all(`.&tabs > div > .tab`);
          if (index >= 0 && index < doms.length) {
            doms[index].classList.add("flash");
            setTimeout(() => {
              doms[index].classList.remove("flash");
            }, 1e3);
          }
        };
        if (refUpdate) {
          refUpdate.updateTitle = (index, title) => {
            const doms = ref.$all(`.&tabs > div > .tab`);
            if (index >= 0 && index < doms.length) {
              doms[index].innerHTML = title;
            }
          };
          refUpdate.updateIndex = updateIndex;
          refUpdate.removePage = removePage;
          refUpdate.newPage = newPage;
          refUpdate.getIndex = () => {
            const header = ref.$(`.&tabs > div > .tab.active`);
            return header ? Array.prototype.indexOf.call(header.parentNode.parentNode.children, header.parentNode) : -1;
          };
          refUpdate.getCount = () => {
            const doms = ref.$all(`.&tabs > div > .tab`);
            return doms.length;
          };
          refUpdate.findAndActivate = (title) => {
            const doms = ref.$all(`.&tabs > div > .tab`);
            for (let i = 0; i < doms.length; i++) {
              if (doms[i].innerText === title) {
                updateIndex(i);
                flashTitle(i);
                return true;
              }
            }
            return false;
          };
        }
        const css = {
          display: "flex",
          "flex-direction": "column",
          width: "100%",
          height: "100%",
          // border: 'solid 1px grey',
          "&:not(:has(.pages .page))": {
            // hide tabs when there is no tabs (not need to show borders)
            display: "none"
          },
          "> .&tabs": {
            display: "flex",
            height: "auto",
            "border-bottom": "1px solid grey",
            "overflow-x": "auto",
            "overflow-y": "hidden",
            "scrollbar-width": "thin",
            "scrollbar-color": "#ababab4d #d5d5d552",
            "> div > .tab": {
              padding: "2px 3px",
              width: "auto",
              "font-size": "smaller",
              "text-overflow": "ellipsis",
              overflow: "hidden",
              "white-space": "nowrap",
              margin: "1px 1px 0 1px",
              cursor: "pointer",
              position: "relative",
              // transition: 'all 1s',
              "border-top-right-radius": "4px",
              "border-top-left-radius": "4px",
              "border-top": "solid 1px var(--primary-border-color)",
              "border-left": "solid 1px var(--primary-border-color)",
              "border-right": "solid 1px var(--primary-border-color)",
              // 'border-bottom': '2px solid transparent',
              color: "var(--activatable-color-normal)",
              backgroundColor: "var(--activatable-bg-color-normal)"
            },
            "> div > .tab:hover": {
              padding: "3px 3px 1px 3px"
              // color: 'var(--activatable-color-hover)',
              // backgroundColor: 'var(--activatable-bg-color-hover)',
            },
            "> div > .tab.flash": {
              backgroundColor: "red"
            },
            "> div > .active": {
              // 'border-bottom': '2px solid red',
              color: "var(--activatable-color-selected)",
              backgroundColor: "var(--activatable-bg-color-selected)",
              marginBottom: "-1px",
              borderBottom: "1px solid #FFFFFF00"
            },
            "> div > .tab > .modal-close": {
              display: "none",
              float: "right",
              fontSize: "12px",
              fontWeight: "bold",
              cursor: "pointer",
              position: "absolute",
              top: "-4px",
              right: "1px"
            },
            "> div > .tab:hover > .modal-close": {
              display: "inline-block",
              color: "#ff0000"
            }
          },
          "> .&pages": {
            display: "flex",
            flex: "1",
            position: "relative",
            "> .page": {
              display: "none",
              position: "absolute",
              padding: pagePadding || "0px",
              overflow: "auto",
              width: "100%",
              maxWidth: "100%",
              height: "100%",
              overflowX: "auto",
              overflowY: "auto"
            },
            "> .active": {
              display: "inline-block"
            }
          }
        };
        const tabGlobalCssId = getGlobalStylesId(css);
        bindGlobalStyle(tabGlobalCssId, css);
        const ref = {
          globalCssId: tabGlobalCssId
        };
        const cssTab = {
          "&tabs": {
            display: "flex"
          },
          "&pages": {
            display: "flex"
          }
        };
        return /* @__PURE__ */ jsx("div", { ref, css: cssTab, class: topClassName ? " " + topClassName : "", children: [
          /* @__PURE__ */ jsx("div", { class: "&tabs tabs", children: pages.map((i, index) => {
            const className = index === newIndex ? " active" : "";
            return /* @__PURE__ */ jsx("div", { children: createTabHeader(i.title, className) });
          }) }),
          /* @__PURE__ */ jsx("div", { class: "&pages pages", children: pages.map((i, index) => {
            const className = index === newIndex ? " active" : "";
            return /* @__PURE__ */ jsx("div", { class: "page" + className, children: i.page });
          }) })
        ] });
      };
    }
  });

  // packages/lupine.components/src/components/text-glow.tsx
  var TextGlow;
  var init_text_glow = __esm({
    "packages/lupine.components/src/components/text-glow.tsx"() {
      "use strict";
      init_src();
      init_jsx_runtime();
      TextGlow = (props) => {
        const css = {
          width: `100%`,
          height: `100%`,
          textAlign: "center",
          color: props.color || "#22b8ff",
          padding: props.padding || "10px",
          fontSize: props.fontSize || "30px",
          fontWeight: props.fontWeight || "500",
          ".text-glow": {
            animation: "text-glow-a 1.5s infinite alternate"
          },
          "@keyframes text-glow-a": {
            "0%": {
              textShadow: "0 0 5px #ff005e, 0 0 10px #ff005e, 0 0 20px #ff005e, 0 0 40px #ff005e, 0 0 80px #ff005e"
            },
            "100%": {
              textShadow: "0 0 10px #00d4ff, 0 0 20px #00d4ff, 0 0 40px #00d4ff, 0 0 80px #00d4ff, 0 0 160px #00d4ff"
            }
          }
        };
        bindGlobalStyle("text-glow-top", css);
        return /* @__PURE__ */ jsx("div", { class: "text-glow-top", children: /* @__PURE__ */ jsx("div", { class: "text-glow", children: props.text }) });
      };
    }
  });

  // packages/lupine.components/src/components/text-scale.tsx
  var TextScale;
  var init_text_scale = __esm({
    "packages/lupine.components/src/components/text-scale.tsx"() {
      "use strict";
      init_src();
      init_jsx_runtime();
      TextScale = (props) => {
        const css = {
          width: `100%`,
          height: `100%`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: props.color || "#22b8ff",
          fontSize: props.fontSize || "30px",
          fontWeight: props.fontWeight || "500",
          ".text-scale": {
            animation: "text-scale 1.5s infinite alternate",
            backgroundColor: props.backgroundColor || "#a1ffe8",
            padding: props.padding || "10px",
            borderRadius: "5px"
          },
          "@keyframes text-scale": {
            "0%, 100%": {
              transform: "scale(1)"
            },
            "40%": {
              transform: "scale(0.7)"
            }
          }
        };
        bindGlobalStyle("text-scale-top", css);
        return /* @__PURE__ */ jsx("div", { class: "text-scale-top", children: /* @__PURE__ */ jsx("div", { class: "text-scale", children: props.text }) });
      };
    }
  });

  // packages/lupine.components/src/components/text-wave.tsx
  var TextWave;
  var init_text_wave = __esm({
    "packages/lupine.components/src/components/text-wave.tsx"() {
      "use strict";
      init_src();
      init_jsx_runtime();
      TextWave = (props) => {
        const cssMap = {};
        props.text.split("").forEach((char, index) => {
          cssMap[`.span${index}`] = { animationDelay: `${index * 0.1}s` };
        });
        const css = {
          width: `100%`,
          height: `100%`,
          textAlign: "center",
          color: props.color || "#22b8ff",
          padding: props.padding || "10px",
          fontSize: props.fontSize || "20px",
          fontWeight: props.fontWeight,
          textShadow: "1px -1px #ffffff, -2px 2px #999, -6px 7px 3px #131f5be6",
          ".text-wave.wave-animetion span": {
            display: "inline-block",
            padding: "0 4px",
            animation: "wave-text 1s ease-in-out infinite"
          },
          ".text-wave.wave-animetion": {
            marginTop: "0.6em",
            ...cssMap
          },
          "@keyframes wave-text": {
            "0%": {
              transform: "translateY(0em)"
            },
            "60%": {
              transform: "translateY(-0.6em)"
            },
            "100%": {
              transform: "translateY(0em)"
            }
          }
        };
        bindGlobalStyle("text-wave-top", css);
        return /* @__PURE__ */ jsx("div", { class: "text-wave-top", children: /* @__PURE__ */ jsx("div", { class: "text-wave wave-animetion", children: props.text.split("").map((char, index) => /* @__PURE__ */ jsx("span", { class: `span${index}`, children: char })) }) });
      };
    }
  });

  // packages/lupine.components/src/components/theme-selector.tsx
  var ThemeSelector;
  var init_theme_selector = __esm({
    "packages/lupine.components/src/components/theme-selector.tsx"() {
      "use strict";
      init_src();
      init_popup_menu();
      init_jsx_runtime();
      ThemeSelector = ({ className, icon, noUpdateLabel }) => {
        const css = {
          display: "flex",
          flexDirection: "column",
          alignSelf: "end"
        };
        const handleSelected = (themeName) => {
          updateTheme(themeName);
        };
        const currentTheme = getCurrentTheme();
        const list2 = [];
        for (let themeName in currentTheme.themes) {
          list2.push(themeName);
        }
        return /* @__PURE__ */ jsx("div", { css, class: ["theme-switch", className].join(" "), title: "Select theme", children: /* @__PURE__ */ jsx(
          PopupMenu,
          {
            list: list2,
            defaultValue: currentTheme.themeName,
            handleSelected,
            icon,
            noUpdateLabel
          }
        ) });
      };
    }
  });

  // packages/lupine.components/src/components/toggle-base.tsx
  var TogglePlayButtonSize, TogglePlayButton, ToggleButton, ToggleWaveFrame, ToggleBaseSize, ToggleBase;
  var init_toggle_base = __esm({
    "packages/lupine.components/src/components/toggle-base.tsx"() {
      "use strict";
      init_src();
      init_jsx_runtime();
      TogglePlayButtonSize = {
        Small: { w: 50, h: 50 },
        Medium: { w: 70, h: 70 },
        Large: { w: 90, h: 90 }
      };
      TogglePlayButton = (props) => {
        const css = {
          width: `100%`,
          height: `100%`,
          borderRadius: "50%",
          backgroundColor: "#3b29cc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s",
          cursor: "pointer",
          "&:hover": {
            opacity: 0.8
          },
          ".play-icon": {
            width: "50%",
            height: "50%",
            transition: "all 0.2s ease-in-out",
            backgroundColor: "#fff"
          },
          "&.toggle-off .play-icon": {
            clipPath: "polygon(20% 0, 20% 100%, 90% 50%, 90% 50%, 90% 50%, 90% 50%, 90% 50%, 90% 50%, 90% 50%)",
            translate: "6% 0"
          },
          "&.toggle-on .play-icon": {
            clipPath: "polygon(0 0, 0 100%, 33.33% 100%, 33.33% 0, 66.66% 0, 100% 0, 100% 100%, 66.66% 100%, 66.66% 0)",
            translate: "0 0"
          },
          "&.disabled": {
            cursor: "not-allowed",
            backgroundColor: "#5d578b"
          }
        };
        bindGlobalStyle("toggle-play-button-component", css);
        const Btn = () => /* @__PURE__ */ jsx(
          "div",
          {
            class: `toggle-play-button-component toggle-placeholder ${props.checked ? "toggle-on" : "toggle-off"}${props.disabled ? " disabled" : ""}`,
            style: { backgroundColor: props.backgroundColor },
            children: /* @__PURE__ */ jsx("div", { class: "play-icon", style: { backgroundColor: props.textColor } })
          }
        );
        return props.noWave ? /* @__PURE__ */ jsx(ToggleBase, { ...props, children: /* @__PURE__ */ jsx(Btn, {}) }) : /* @__PURE__ */ jsx(ToggleBase, { ...props, children: /* @__PURE__ */ jsx(ToggleWaveFrame, { children: /* @__PURE__ */ jsx(Btn, {}) }) });
      };
      ToggleButton = (props) => {
        const css = {
          // width: `${props.size + 5}px`,
          // height: `${props.size + 5}px`,
          "&.disabled": {
            cursor: "not-allowed"
          },
          "&.toggle-on .on, &.toggle-off .off": {
            display: "block"
          },
          "&.toggle-on .off, &.toggle-off .on": {
            display: "none"
          }
        };
        return /* @__PURE__ */ jsx(ToggleBase, { ...props, size: { w: "auto", h: "auto" }, children: /* @__PURE__ */ jsx(
          "div",
          {
            css,
            class: `toggle-button-component toggle-placeholder ${props.checked ? "toggle-on" : "toggle-off"}${props.disabled ? " disabled" : ""}`,
            children: [
              /* @__PURE__ */ jsx("div", { class: "on", children: props.onText }),
              /* @__PURE__ */ jsx("div", { class: "off", children: props.offText })
            ]
          }
        ) });
      };
      ToggleWaveFrame = (props) => {
        const css = {
          width: `100%`,
          height: `100%`,
          "@keyframes pulse-border": {
            "0%": {
              transform: "scale(0.6)",
              opacity: 1
            },
            "100%": {
              transform: "scale(1)",
              opacity: 0
            }
          },
          ".toggle-waves": {
            position: "absolute",
            width: `100%`,
            height: `100%`,
            top: "0",
            left: "0",
            borderRadius: "50%",
            backgroundColor: "#eb205580",
            opacity: 0,
            animation: "pulse-border 3s ease-in-out infinite"
          },
          ".toggle-waves-1": {
            "-webkit-animation-delay": "0s",
            "animation-delay": "0s"
          },
          ".toggle-waves-2": {
            "-webkit-animation-delay": "1s",
            "animation-delay": "1s"
          },
          ".toggle-waves-3": {
            "-webkit-animation-delay": "2s",
            "animation-delay": "2s"
          },
          ".toggle-waves-box": {
            position: "absolute",
            width: `100%`,
            height: `100%`,
            top: "0",
            left: "0",
            padding: `18%`
          },
          "&.disabled .toggle-waves": {
            backgroundColor: "#5d578b"
          }
        };
        bindGlobalStyle("toggle-waves-box", css);
        return /* @__PURE__ */ jsx("div", { class: "toggle-waves-box toggle-placeholder", children: [
          /* @__PURE__ */ jsx("div", { class: "toggle-waves toggle-waves-1" }),
          /* @__PURE__ */ jsx("div", { class: "toggle-waves toggle-waves-2" }),
          /* @__PURE__ */ jsx("div", { class: "toggle-waves toggle-waves-3" }),
          /* @__PURE__ */ jsx("div", { class: "toggle-waves-box", children: props.children })
        ] });
      };
      ToggleBaseSize = {
        Small: { w: 30, h: 30 },
        Medium: { w: 50, h: 50 },
        Large: { w: 70, h: 70 }
      };
      ToggleBase = (props) => {
        const applyToggle = (checked, disabled2) => {
          const childDom = ref.$all(".toggle-base-container .toggle-placeholder");
          childDom.forEach((dom) => {
            dom.classList.toggle("toggle-on", checked);
            dom.classList.toggle("toggle-off", !checked);
            dom.classList.toggle("disabled", disabled2);
          });
        };
        let disabled = props.disabled || false;
        const ref = {
          onLoad: async (el) => {
            applyToggle(props.checked || false, disabled);
          }
        };
        const onClick = (e) => {
          if (disabled) {
            return;
          }
          const checked = e.target.checked;
          applyToggle(checked, disabled);
          if (props.onClick) {
            props.onClick(checked);
          }
        };
        if (props.hook) {
          props.hook.setChecked = (checked) => {
            ref.$("input.toggle-base-checkbox").checked = checked;
            applyToggle(checked, disabled);
          };
          props.hook.getChecked = () => {
            return ref.$("input.toggle-base-checkbox").checked;
          };
          props.hook.setEnabled = (enabled) => {
            disabled = !enabled;
            const dom = ref.$("input.toggle-base-checkbox");
            dom.disabled = disabled;
            applyToggle(dom.checked, disabled);
          };
          props.hook.getEnabled = () => {
            return !disabled;
          };
        }
        const css = {
          ".toggle-base-box, .toggle-base-container": {
            position: "relative",
            width: `100%`,
            height: `100%`
          },
          ".toggle-base-checkbox": {
            opacity: 0,
            position: "absolute",
            pointerEvents: "none"
          }
        };
        bindGlobalStyle("toggle-base-component", css);
        return /* @__PURE__ */ jsx(
          "div",
          {
            ref,
            css: {
              width: `${typeof props.size.w === "number" ? props.size.w + "px" : props.size.w}`,
              height: `${typeof props.size.h === "number" ? props.size.h + "px" : props.size.h}`
            },
            class: "toggle-base-component",
            children: /* @__PURE__ */ jsx("label", { class: "toggle-base-box", children: [
              /* @__PURE__ */ jsx("div", { class: "toggle-base-container", children: props.children }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  class: "toggle-base-checkbox",
                  checked: props.checked || false,
                  disabled,
                  onClick
                }
              )
            ] })
          }
        );
      };
    }
  });

  // packages/lupine.components/src/components/toggle-switch.tsx
  var ToggleSwitchSize, ToggleSwitch;
  var init_toggle_switch = __esm({
    "packages/lupine.components/src/components/toggle-switch.tsx"() {
      "use strict";
      init_src();
      init_toggle_base();
      init_jsx_runtime();
      ToggleSwitchSize = /* @__PURE__ */ ((ToggleSwitchSize2) => {
        ToggleSwitchSize2["SmallSmall"] = "smallsmall";
        ToggleSwitchSize2["Small"] = "small";
        ToggleSwitchSize2["Medium"] = "medium";
        ToggleSwitchSize2["Large"] = "large";
        return ToggleSwitchSize2;
      })(ToggleSwitchSize || {});
      ToggleSwitch = (props) => {
        var _a, _b;
        const sizeH = props.size === "smallsmall" /* SmallSmall */ ? 16 : props.size === "small" /* Small */ ? 22 : props.size === "large" /* Large */ ? 42 : 34;
        const classSize = props.size === "smallsmall" /* SmallSmall */ ? "smallsmall" : props.size === "small" /* Small */ ? "small" : props.size === "large" /* Large */ ? "large" : "";
        const css = {
          width: `100%`,
          height: `100%`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "& .ts-slider": {
            position: "relative",
            cursor: "pointer",
            backgroundColor: "var(--toggle-background-color, #c7c7c7)",
            transition: ".4s",
            borderRadius: "34px",
            height: "100%",
            display: "flex",
            padding: "0 27px 0 37px",
            alignItems: "center"
          },
          "&.smallsmall .ts-slider": {
            padding: "0 8px 0 22px",
            fontSize: "0.65rem"
          },
          "&.small .ts-slider": {
            padding: "0 17px 0 27px",
            fontSize: "0.85rem"
          },
          "&.large .ts-slider": {
            padding: "0 37px 0 57px"
          },
          "& .ts-slider .ts-circle": {
            position: "absolute",
            content: "",
            height: "26px",
            width: "26px",
            left: "4px",
            bottom: "4px",
            backgroundColor: "var(--toggle-ball-color, #fff)",
            transition: ".4s",
            borderRadius: "50%"
          },
          "&.smallsmall .ts-slider .ts-circle": {
            height: "12px",
            width: "12px",
            left: "2px",
            bottom: "2px"
          },
          "&.small .ts-slider .ts-circle": {
            height: "18px",
            width: "18px",
            left: "3px",
            bottom: "2px"
          },
          "&.large .ts-slider .ts-circle": {
            height: "38px",
            width: "38px",
            left: "4px",
            bottom: "2px"
          },
          "&.toggle-on .ts-on-text": {
            display: "block"
          },
          "&.toggle-off .ts-off-text": {
            display: "block"
          },
          "&.toggle-on .ts-slider": {
            backgroundColor: "var(--primary-accent-color, #0a74c9)",
            padding: "0 47px 0 17px"
          },
          "&.smallsmall.toggle-on .ts-slider": {
            padding: "0 18px 0 12px"
          },
          "&.small.toggle-on .ts-slider": {
            padding: "0 27px 0 17px"
          },
          "&.large.toggle-on .ts-slider": {
            padding: "0 72px 0 22px"
          },
          "&.toggle-on .ts-slider .ts-circle": {
            left: "unset",
            right: "3px"
          },
          "&.disabled .ts-slider": {
            cursor: "not-allowed",
            opacity: "var(--primary-disabled-opacity)"
          }
        };
        const cssTheme = {
          '[data-theme="dark" i]': {
            "--toggle-ball-color": "#000000",
            "--toggle-background-color": "#262626"
          }
        };
        bindGlobalStyle("toggle-switch-theme", cssTheme, false, true);
        bindGlobalStyle("toggle-switch-component", css);
        const cssSize = {
          "& .ts-on-text, & .ts-off-text": {
            display: "none",
            width: props.textWidth
          }
        };
        return /* @__PURE__ */ jsx(ToggleBase, { ...props, size: { w: "auto", h: sizeH }, children: /* @__PURE__ */ jsx(
          "div",
          {
            css: cssSize,
            class: `toggle-switch-component toggle-placeholder ${props.checked ? "toggle-on" : "toggle-off"}${props.disabled ? " disabled" : ""} ${classSize}`,
            children: /* @__PURE__ */ jsx("span", { class: "ts-slider", children: [
              /* @__PURE__ */ jsx("span", { class: "ts-on-text", children: (_a = props.text) == null ? void 0 : _a.on }),
              /* @__PURE__ */ jsx("span", { class: "ts-circle" }),
              /* @__PURE__ */ jsx("span", { class: "ts-off-text", children: (_b = props.text) == null ? void 0 : _b.off })
            ] })
          }
        ) });
      };
    }
  });

  // packages/lupine.components/src/components/mobile-components/icon-menu-item-props.ts
  var init_icon_menu_item_props = __esm({
    "packages/lupine.components/src/components/mobile-components/icon-menu-item-props.ts"() {
      "use strict";
    }
  });

  // packages/lupine.components/src/components/mobile-components/mobile-footer-menu.tsx
  var MobileFooterMenu;
  var init_mobile_footer_menu = __esm({
    "packages/lupine.components/src/components/mobile-components/mobile-footer-menu.tsx"() {
      "use strict";
      init_src2();
      init_jsx_runtime();
      MobileFooterMenu = (props) => {
        const css = {
          ".footer-menu": {
            display: "none",
            // position: 'fixed',
            // left: 0,
            // right: 0,
            // bottom: 0,
            width: "100%",
            background: "var(--sidebar-bg-color)",
            paddingBottom: "env(safe-area-inset-bottom)",
            minHeight: "50px",
            justifyContent: "space-around",
            alignItems: "center",
            borderTop: "var(--primary-border)"
          },
          ".footer-menu, .footer-menu a": {
            textDecoration: "none",
            color: props.color || "var(--primary-color)"
          },
          ".footer-menu .footer-menu-item": {
            padding: "4px 16px 4px 16px",
            fontSize: "11px",
            height: "55px",
            // 和主页保留的底部菜单高度一致
            width: "55px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center"
          },
          ".footer-menu .footer-menu-item i": {
            display: "block",
            fontSize: "22px",
            marginBottom: "4px"
          },
          ".footer-menu .footer-menu-item.footer-menu-topout": {
            marginTop: "-43px",
            borderRadius: "50%",
            backgroundColor: props.topoutBackgroundColor || "#f33939",
            color: props.topoutColor || "var(--primary-color)"
          },
          ".footer-menu .footer-menu-item-a": {
            zIndex: "var(--layer-header-footer)"
          },
          ".footer-menu .footer-menu-item.active": {
            color: props.activeColor || "var(--primary-accent-color)"
          },
          [MediaQueryRange.TabletBelow]: {
            ".footer-menu": {
              display: "flex"
            }
          }
        };
        const onClick = (index, href) => {
          const items = document.querySelector(".footer-menu-item.active");
          items == null ? void 0 : items.classList.remove("active");
          const item = document.querySelector(`a:nth-child(${index + 1}) .footer-menu-item`);
          item == null ? void 0 : item.classList.add("active");
        };
        let curretnUrl = typeof window !== "undefined" ? window.location.pathname : "";
        return /* @__PURE__ */ jsx("div", { css, class: "footer-menu-box", children: /* @__PURE__ */ jsx("div", { class: "footer-menu", children: props.items.map((item, index) => /* @__PURE__ */ jsx("a", { class: "footer-menu-item-a", href: item.href, children: /* @__PURE__ */ jsx(
          "div",
          {
            class: `footer-menu-item ${item.topout ? "footer-menu-topout" : ""} ${curretnUrl === item.href ? "active" : ""}`,
            onClick: () => onClick(index, item.href),
            children: [
              /* @__PURE__ */ jsx("i", { class: `ifc-icon ${item.icon}` }),
              item.text
            ]
          }
        ) }, index)) }) });
      };
    }
  });

  // packages/lupine.components/src/components/mobile-components/mobile-header-title-icon.tsx
  var MobileHeadeIconHeight, MobileHeadeBackIcon, MobileHeadeCloseIcon, MobileHeaderEmptyIcon, MobileHeaderTitleIcon;
  var init_mobile_header_title_icon = __esm({
    "packages/lupine.components/src/components/mobile-components/mobile-header-title-icon.tsx"() {
      "use strict";
      init_src2();
      init_jsx_runtime();
      MobileHeadeIconHeight = "40px";
      MobileHeadeBackIcon = ({ onClick }) => {
        return /* @__PURE__ */ jsx(
          "i",
          {
            class: "ifc-icon mg-arrow_back_ios_new_outlined mhti-back-icon",
            "data-back-action": backActionHelper.genBackActionId(),
            onClick: (event) => onClick(event)
          }
        );
      };
      MobileHeadeCloseIcon = ({ onClick }) => {
        return /* @__PURE__ */ jsx("i", { class: "ifc-icon ma-close mhti-close-icon", onClick: (event) => onClick(event) });
      };
      MobileHeaderEmptyIcon = () => {
        return /* @__PURE__ */ jsx("div", { class: "mhti-empty-icon", style: { width: "28px" } });
      };
      MobileHeaderTitleIcon = ({
        title,
        onBack,
        left,
        right,
        background,
        color,
        noShadow
      }) => {
        const css = {
          display: "flex",
          flexDirection: "row",
          width: "100vw",
          padding: "6px 0",
          // backgroundColor: 'var(--activatable-bg-color-normal)',
          // boxShadow: 'var(--mobile-header-shadow)',
          color: color || "var(--primary-color)",
          background: background || "var(--activatable-bg-color-normal)",
          boxShadow: noShadow ? "unset" : "var(--mobile-header-shadow)",
          zIndex: "var(--layer-inside)",
          // bring boxShadow to front
          ".mhti-title": {
            display: "flex",
            fontSize: "1.3rem",
            flex: "1",
            color: "var(--activatable-text-color-normal)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            alignItems: "center",
            justifyContent: "center"
          },
          ".mhti-title > *": {
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center"
          },
          ".mhti-left, .mhti-right": {
            height: MobileHeadeIconHeight,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: "16px"
          },
          ".mhti-left": {
            paddingLeft: "8px"
          },
          ".mhti-right": {
            paddingRight: "8px"
          },
          ".mhti-left i, .mhti-right i": {
            fontSize: "28px"
          }
        };
        const domLeft = left instanceof HtmlVar ? left : new HtmlVar(left);
        const domCenter = title instanceof HtmlVar ? title : new HtmlVar(title);
        const domRight = right instanceof HtmlVar ? right : new HtmlVar(right);
        return /* @__PURE__ */ jsx("div", { css, class: "mobile-header-title-icon-top", children: [
          /* @__PURE__ */ jsx("div", { class: "mhti-left", children: domLeft.node }),
          /* @__PURE__ */ jsx("div", { class: "mhti-title", children: domCenter.node }),
          /* @__PURE__ */ jsx("div", { class: "mhti-right", children: domRight.node })
        ] });
      };
    }
  });

  // packages/lupine.components/src/components/mobile-components/mobile-header-with-back.tsx
  var HeaderWithBackFrameHeight, HeaderWithBackFrameLeft, HeaderWithBackFrameRight, HeaderWithBackFrameEmpty, HeaderWithBackFrame;
  var init_mobile_header_with_back = __esm({
    "packages/lupine.components/src/components/mobile-components/mobile-header-with-back.tsx"() {
      "use strict";
      init_src2();
      init_mobile_header_title_icon();
      init_jsx_runtime();
      HeaderWithBackFrameHeight = "40px";
      HeaderWithBackFrameLeft = ({ onClick }) => {
        return /* @__PURE__ */ jsx(
          "i",
          {
            class: "ifc-icon mg-arrow_back_ios_new_outlined header-back-left-icon",
            "data-back-action": backActionHelper.genBackActionId(),
            onClick: (event) => onClick(event)
          }
        );
      };
      HeaderWithBackFrameRight = ({ onClick }) => {
        return /* @__PURE__ */ jsx("i", { class: "ifc-icon ma-close header-back-right-icon", onClick: (event) => onClick(event) });
      };
      HeaderWithBackFrameEmpty = () => {
        return /* @__PURE__ */ jsx("div", { class: "header-back-top-empty" });
      };
      HeaderWithBackFrame = ({
        children,
        title,
        onBack,
        left,
        right,
        noHeader = false,
        background,
        color,
        noShadow,
        contentColor,
        contentBackground
      }) => {
        left = left || /* @__PURE__ */ jsx(HeaderWithBackFrameLeft, { onClick: onBack });
        right = right || /* @__PURE__ */ jsx(HeaderWithBackFrameRight, { onClick: onBack });
        const css = {
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          minHeight: "100%",
          background: background || "var(--activatable-bg-color-normal)",
          ".header-back-top": {
            display: "flex",
            flexDirection: "row",
            width: "100vw",
            padding: "6px 0",
            backgroundColor: "var(--activatable-bg-color-normal)",
            boxShadow: "var(--mobile-header-shadow)"
          },
          ".header-back-content": {
            display: "flex",
            flex: "1",
            flexDirection: "column",
            overflowY: "auto",
            scrollbarWidth: "none",
            position: "relative",
            color: contentColor || "var(--primary-color)",
            background: contentBackground || "var(--activatable-bg-color-normal)",
            "&::-webkit-scrollbar": {
              display: "none"
              // height: '0',
            }
          },
          ".header-back-title": {
            fontSize: "15px",
            flex: "1",
            color: "var(--activatable-text-color-normal)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          },
          ".header-back-left, .header-back-right": {
            // width: HeaderWithBackFrameHeight,
            height: HeaderWithBackFrameHeight,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: "16px",
            padding: "0 8px"
          },
          ".header-back-left i, .header-back-right i": {
            fontSize: "28px"
          }
        };
        const domLeft = left instanceof HtmlVar ? left : new HtmlVar(left);
        const domCenter = title instanceof HtmlVar ? title : new HtmlVar(title);
        const domRight = right instanceof HtmlVar ? right : new HtmlVar(right);
        const ref = {};
        return /* @__PURE__ */ jsx("div", { ref, css, class: "header-back-frame", children: [
          !noHeader && /* @__PURE__ */ jsx(
            MobileHeaderTitleIcon,
            {
              onBack,
              left: domLeft,
              title: domCenter,
              right: domRight,
              background,
              color,
              noShadow
            }
          ),
          /* @__PURE__ */ jsx("div", { class: "header-back-content", children })
        ] });
      };
    }
  });

  // packages/lupine.components/src/components/mobile-components/mobile-header-component.tsx
  var MobileHeaderHelper, mobileHeaderHelper, MobileHeaderLeft, MobileHeaderCenter, MobileHeaderRight, MobileHeaderHide, MobileHeaderComponent;
  var init_mobile_header_component = __esm({
    "packages/lupine.components/src/components/mobile-components/mobile-header-component.tsx"() {
      "use strict";
      init_src2();
      init_jsx_runtime();
      MobileHeaderHelper = class _MobileHeaderHelper {
        constructor() {
          this.leftContent = new HtmlVar("");
          this.centerContent = new HtmlVar("");
          this.rightContent = new HtmlVar("");
        }
        static getInstance() {
          if (!_MobileHeaderHelper.instance) {
            _MobileHeaderHelper.instance = new _MobileHeaderHelper();
          }
          return _MobileHeaderHelper.instance;
        }
        setLeftContent(content) {
          this.leftContent.value = content;
        }
        getLeftContent() {
          return this.leftContent;
        }
        setCenterContent(content) {
          this.centerContent.value = content;
        }
        getCenterContent() {
          return this.centerContent;
        }
        setRightContent(content) {
          this.rightContent.value = content;
        }
        getRightContent() {
          return this.rightContent;
        }
        hideHeader() {
          this.leftContent.value = "";
          this.centerContent.value = "";
          this.rightContent.value = "";
        }
      };
      mobileHeaderHelper = MobileHeaderHelper.getInstance();
      MobileHeaderLeft = (props) => {
        mobileHeaderHelper.setLeftContent(props.children);
        return /* @__PURE__ */ jsx(Fragment, {});
      };
      MobileHeaderCenter = (props) => {
        mobileHeaderHelper.setCenterContent(props.children);
        return /* @__PURE__ */ jsx(Fragment, {});
      };
      MobileHeaderRight = (props) => {
        mobileHeaderHelper.setRightContent(props.children);
        return /* @__PURE__ */ jsx(Fragment, {});
      };
      MobileHeaderHide = () => {
        mobileHeaderHelper.hideHeader();
        return /* @__PURE__ */ jsx(Fragment, {});
      };
      MobileHeaderComponent = (props) => {
        const css = {
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "auto",
          // padding: '2px 0',
          // boxShadow: 'var(--mobile-header-shadow)', // 第二项 2px 的话，顶部有阴影（线）
          "& > *": {
            height: "100%"
          },
          ".mobile-header-center": {
            flex: 1
          }
        };
        return /* @__PURE__ */ jsx("div", { css, class: "mobile-header-component", children: [
          /* @__PURE__ */ jsx("div", { class: "mobile-header-left", children: mobileHeaderHelper.getLeftContent().node }),
          /* @__PURE__ */ jsx("div", { class: "mobile-header-center", children: mobileHeaderHelper.getCenterContent().node }),
          /* @__PURE__ */ jsx("div", { class: "mobile-header-right", children: mobileHeaderHelper.getRightContent().node })
        ] });
      };
    }
  });

  // packages/lupine.components/src/components/mobile-components/mobile-side-menu.tsx
  var _MobileSideMenuHelper, MobileSideMenuHelper, MobileSideMenu;
  var init_mobile_side_menu = __esm({
    "packages/lupine.components/src/components/mobile-components/mobile-side-menu.tsx"() {
      "use strict";
      init_src2();
      init_jsx_runtime();
      _MobileSideMenuHelper = class _MobileSideMenuHelper {
        static show() {
          const ref = document.querySelector(".mobile-side-menu-mask");
          ref.classList.add("show");
          setTimeout(() => {
            ref.classList.add("animate-show");
          }, 1);
          const backActionId = backActionHelper.genBackActionId();
          ref.setAttribute("data-back-action", backActionId);
        }
        static hide() {
          const ref = document.querySelector(".mobile-side-menu-mask");
          ref.removeAttribute("data-back-action");
          ref.classList.remove("animate-show");
          setTimeout(() => {
            ref.classList.remove("show");
          }, 300);
        }
        static addTouchEvent() {
          if (this.isTouchEventAdded) {
            return;
          }
          this.isTouchEventAdded = true;
          let touchstartY = 0;
          let touchstartX = 0;
          let direction = "";
          let moveStart = false;
          let isOpen = false;
          const maskDom = document.querySelector(".mobile-side-menu-mask");
          document.addEventListener("touchstart", (e) => {
            touchstartY = e.touches[0].clientY;
            touchstartX = e.touches[0].clientX;
            direction = "";
            moveStart = false;
            isOpen = maskDom == null ? void 0 : maskDom.classList.contains("show");
            if (isOpen) {
              if (touchstartX > 80) {
                moveStart = true;
              }
            } else {
              if (touchstartX < 40) {
                moveStart = true;
              }
            }
          });
          document.addEventListener("touchmove", (e) => {
            if (!moveStart) {
              return;
            }
            if (direction === "") {
              if (e.touches[0].clientX - touchstartX !== 0) {
                direction = "X";
              } else {
                moveStart = false;
                return;
              }
            }
            if (isOpen) {
              if (e.touches[0].clientX - touchstartX < 30) {
                _MobileSideMenuHelper.hide();
                moveStart = false;
                return;
              }
            } else {
              if (e.touches[0].clientX - touchstartX > 80) {
                _MobileSideMenuHelper.show();
                moveStart = false;
                return;
              }
            }
          });
          document.addEventListener("touchend", () => {
            moveStart = false;
            direction = "";
          });
        }
      };
      _MobileSideMenuHelper.isTouchEventAdded = false;
      MobileSideMenuHelper = _MobileSideMenuHelper;
      MobileSideMenu = (props) => {
        const css = {
          ".mobile-side-menu-mask": {
            display: "none",
            flexDirection: "column",
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            zIndex: "var(--layer-menu)",
            backgroundColor: "#000000b0",
            "&.show": {
              display: "flex"
            },
            "&.animate-show .mobile-side-menu": {
              transform: "scaleX(1)"
            }
          },
          ".mobile-side-menu": {
            display: "flex",
            flexDirection: "column",
            padding: "16px",
            transition: "transform 0.3s ease-in-out",
            backgroundColor: "var(--primary-bg-color)",
            width: "70%",
            maxWidth: "300px",
            height: "100%",
            overflowX: "hidden",
            overflowY: "auto",
            transformOrigin: "left",
            transform: "scaleX(0)",
            // boxShadow: 'var(--block-box-shadow)',
            boxShadow: "var(--cover-box-shadow)"
          }
        };
        const onClickContainer = (event) => {
          if (event.target instanceof HTMLDivElement && event.target.classList.contains("mobile-side-menu-mask")) {
            MobileSideMenuHelper.hide();
          }
        };
        const ref = {
          onLoad: async () => {
            MobileSideMenuHelper.addTouchEvent();
          }
        };
        return /* @__PURE__ */ jsx("div", { css, ref, children: /* @__PURE__ */ jsx("div", { class: "mobile-side-menu-mask", onClick: onClickContainer, children: /* @__PURE__ */ jsx("div", { class: "mobile-side-menu", children: props.children }) }) });
      };
    }
  });

  // packages/lupine.components/src/components/mobile-components/mobile-top-sys-icon.tsx
  var MobileTopSysIcon;
  var init_mobile_top_sys_icon = __esm({
    "packages/lupine.components/src/components/mobile-components/mobile-top-sys-icon.tsx"() {
      "use strict";
      init_mobile_side_menu();
      init_jsx_runtime();
      MobileTopSysIcon = () => {
        const css = {
          cursor: "pointer",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          fontSize: "28px"
        };
        return /* @__PURE__ */ jsx("div", { css, onClick: () => MobileSideMenuHelper.show(), children: /* @__PURE__ */ jsx("i", { class: "ifc-icon bs-list" }) });
      };
    }
  });

  // packages/lupine.components/src/components/mobile-components/mobile-top-sys-menu.tsx
  var MobileTopSysMenu;
  var init_mobile_top_sys_menu = __esm({
    "packages/lupine.components/src/components/mobile-components/mobile-top-sys-menu.tsx"() {
      "use strict";
      init_src2();
      init_jsx_runtime();
      MobileTopSysMenu = (props) => {
        return /* @__PURE__ */ jsx(
          PopupMenuWithIcon,
          {
            list: props.menuItems,
            defaultValue: "",
            tips: "",
            minWidth: "auto",
            maxWidth: "200px",
            maxHeight: "300px",
            align: "right",
            noTriangleIcon: true,
            handleSelected: props.handleSelected,
            noUpdateLabel: true
          }
        );
      };
    }
  });

  // packages/lupine.components/src/components/mobile-components/index.ts
  var init_mobile_components = __esm({
    "packages/lupine.components/src/components/mobile-components/index.ts"() {
      "use strict";
      init_icon_menu_item_props();
      init_mobile_footer_menu();
      init_mobile_header_with_back();
      init_mobile_header_component();
      init_mobile_header_title_icon();
      init_mobile_side_menu();
      init_mobile_top_sys_icon();
      init_mobile_top_sys_menu();
    }
  });

  // packages/lupine.components/src/components/index.ts
  var init_components = __esm({
    "packages/lupine.components/src/components/index.ts"() {
      "use strict";
      init_action_sheet();
      init_button_push_animation();
      init_button();
      init_drag_refresh();
      init_editable_label();
      init_float_window();
      init_grid();
      init_html_load();
      init_html_var();
      init_input_with_title();
      init_link_item();
      init_link_list();
      init_menu_bar();
      init_menu_item_props();
      init_menu_sidebar();
      init_message_box();
      init_meta_data();
      init_meta_description();
      init_modal();
      init_notice_message();
      init_page_title();
      init_paging_link();
      init_panel();
      init_popup_menu();
      init_progress();
      init_radio_label_component();
      init_redirect();
      init_resizable_splitter();
      init_select_angle_component();
      init_select_with_title();
      init_slide_tab_component();
      init_spinner();
      init_stars_component();
      init_svg();
      init_switch_option_component();
      init_tabs();
      init_text_glow();
      init_text_scale();
      init_text_wave();
      init_theme_selector();
      init_toggle_base();
      init_toggle_switch();
      init_mobile_components();
    }
  });

  // packages/lupine.components/src/lib/upload-file.ts
  var _saveChunkSize2, setUploadChunkSize, getUploadChunkSize, checkUploadedFileSize, uploadFileChunk, uploadFile;
  var init_upload_file = __esm({
    "packages/lupine.components/src/lib/upload-file.ts"() {
      "use strict";
      init_src();
      init_components();
      _saveChunkSize2 = {
        size: 1024 * 200
      };
      setUploadChunkSize = (chunkSize) => {
        _saveChunkSize2.size = chunkSize;
      };
      getUploadChunkSize = () => {
        return _saveChunkSize2.size;
      };
      checkUploadedFileSize = async (uploadUrl) => {
        let url = uploadUrl + (uploadUrl.indexOf("?") === -1 ? "?" : "") + "&check-size=1";
        const json = await getRenderPageProps().renderPageFunctions.fetchData(url);
        return json && json.json.size ? json.json.size : 0;
      };
      uploadFileChunk = async (chunk, chunkNumber, totalChunks, uploadUrl, key, retryCount = 3, retryMessage = "") => {
        let url = uploadUrl + (uploadUrl.indexOf("?") === -1 ? "?" : "");
        url += `&chunkNumber=${chunkNumber.toString()}`;
        url += `&totalChunks=${totalChunks.toString()}`;
        if (key) {
          url += `&key=${key}`;
        }
        let tryCount = 0;
        let json;
        while (tryCount < retryCount) {
          try {
            json = await getRenderPageProps().renderPageFunctions.fetchData(url, chunk);
            if (json && json.json) {
              json = json.json;
            }
            if (json && json.status) {
              break;
            }
          } catch (error) {
            console.log(`uploadFileChunk error, try: ${tryCount}`, error);
          }
          tryCount++;
          if (retryMessage) {
            NotificationMessage.sendMessage(
              retryMessage.replace("${tryCount}", tryCount.toString()),
              "var(--warning-bg-color)" /* Warning */
            );
          }
        }
        return json;
      };
      uploadFile = async (file, uploadUrl, progressFn, chunkSize = 0, retryCount = 3, retryMessage = "") => {
        let key = "";
        const len = file instanceof File ? file.size : file.length;
        if (!chunkSize) {
          chunkSize = _saveChunkSize2.size;
        }
        if (len <= chunkSize) {
          const result = await uploadFileChunk(file, 0, 1, uploadUrl, key, retryCount, retryMessage);
          if (!result || result.status !== "ok") {
            return result;
          }
          if (progressFn) {
            progressFn(1, 0, len);
          }
          return true;
        }
        const totalChunks = Math.ceil(len / chunkSize);
        for (let i = 0; i < totalChunks; i++) {
          const start = i * chunkSize;
          const end = Math.min((i + 1) * chunkSize, len);
          const chunk = file.slice(start, end);
          const result = await uploadFileChunk(chunk, i, totalChunks, uploadUrl, key, retryCount, retryMessage);
          if (!result || result.status !== "ok") {
            return result;
          }
          key = result.key;
          if (progressFn) {
            progressFn(Math.round((i + 1) / totalChunks * 100) / 100, i, totalChunks);
          }
        }
        return true;
      };
    }
  });

  // packages/lupine.components/src/lib/index.ts
  var init_lib2 = __esm({
    "packages/lupine.components/src/lib/index.ts"() {
      "use strict";
      init_back_action_helper();
      init_base62();
      init_blob_utils();
      init_calculate_text_width();
      init_date_utils();
      init_deep_merge();
      init_document_ready();
      init_dom_utils();
      init_download_file();
      init_download_link();
      init_download_stream();
      init_drag_util();
      init_dynamical_load();
      init_encode_html();
      init_find_parent_tag();
      init_format_bytes();
      init_lite_dom();
      init_message_hub();
      init_observable();
      init_path_utils();
      init_promise_timeout();
      init_simple_storage();
      init_stop_propagation();
      init_upload_file();
    }
  });

  // packages/lupine.components/src/components/desktop-footer.tsx
  var DesktopFooter;
  var init_desktop_footer = __esm({
    "packages/lupine.components/src/components/desktop-footer.tsx"() {
      "use strict";
      init_jsx_runtime();
      DesktopFooter = (props) => {
        const css = {
          display: "flex",
          padding: "0 32px 16px",
          ".d-footer-cp": {
            padding: "1px 15px",
            margin: "auto"
          }
        };
        return /* @__PURE__ */ jsx("div", { css, class: "d-footer-box", children: /* @__PURE__ */ jsx("div", { class: "d-footer-cp", children: props.title }) });
      };
    }
  });

  // packages/lupine.components/src/components/desktop-header.tsx
  var DesktopHeader;
  var init_desktop_header = __esm({
    "packages/lupine.components/src/components/desktop-header.tsx"() {
      "use strict";
      init_jsx_runtime();
      DesktopHeader = (props) => {
        const css = {
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "100%",
          ".d-header-title": {
            display: "flex",
            flex: "1",
            margin: "8px 16px",
            textShadow: "-3px -3px 10px white, 3px 3px 10px black",
            color: "darkblue",
            fontSize: "22px"
          },
          ".desktop-menu-bar": {
            display: "flex",
            flexDirection: "row",
            width: "auto",
            padding: "4px 16px 0",
            ".desktop-menu-item": {
              display: "flex",
              padding: "0 8px",
              height: "fit-content",
              a: {
                textDecoration: "none",
                color: "var(--sidebar-color)",
                i: {
                  paddingRight: "4px"
                }
              }
            }
          }
        };
        return /* @__PURE__ */ jsx("div", { css, class: "desktop-menu-box", children: [
          /* @__PURE__ */ jsx("div", { class: "flex-1 d-header-title", children: props.title }),
          /* @__PURE__ */ jsx("div", { class: "desktop-menu-bar", children: props.items.map((item) => /* @__PURE__ */ jsx("div", { class: "desktop-menu-item", children: /* @__PURE__ */ jsx("a", { href: item.href, children: [
            /* @__PURE__ */ jsx("i", { class: `ifc-icon ${item.icon}` }),
            item.text
          ] }) })) })
        ] });
      };
    }
  });

  // packages/lupine.components/src/frames/responsive-frame.tsx
  var ResponsiveFrame;
  var init_responsive_frame = __esm({
    "packages/lupine.components/src/frames/responsive-frame.tsx"() {
      "use strict";
      init_src2();
      init_mobile_footer_menu();
      init_desktop_footer();
      init_desktop_header();
      init_mobile_header_component();
      init_mobile_side_menu();
      init_jsx_runtime();
      ResponsiveFrame = async (props) => {
        const cssContainer = {
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          minHeight: "100%",
          ".frame-top-menu": {
            display: "flex",
            flexDirection: "column",
            width: "100vw",
            backgroundColor: "var(--activatable-bg-color-normal)"
          },
          ".frame-content": {
            display: "flex",
            flex: "1",
            flexDirection: "column",
            overflowY: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none"
            }
          },
          ".content-block": {
            display: "flex",
            flex: "1",
            flexDirection: "column",
            overflowY: "auto",
            scrollbarWidth: "none"
          },
          ".content-block::-webkit-scrollbar": {
            display: "none"
          },
          ".content-block .padding-block": {
            padding: "0 16px"
          },
          [MediaQueryRange.TabletBelow]: {
            ".frame-footer .d-footer-box, .frame-top-menu .desktop-menu-box": {
              display: "none"
            }
          }
        };
        return /* @__PURE__ */ jsx("div", { css: cssContainer, class: "responsive-frame", children: [
          /* @__PURE__ */ jsx(SliderFrame, { hook: props.sliderFrameHook }),
          /* @__PURE__ */ jsx("div", { class: "frame-top-menu", children: [
            /* @__PURE__ */ jsx(DesktopHeader, { title: props.desktopHeaderTitle, items: props.desktopTopMenu }),
            /* @__PURE__ */ jsx(MobileHeaderComponent, {})
          ] }),
          /* @__PURE__ */ jsx("div", { class: "frame-content", children: [
            /* @__PURE__ */ jsx(MobileSideMenu, { children: props.mobileSideMenuContent }),
            /* @__PURE__ */ jsx("div", { class: "content-block " + props.placeholderClassname, children: props.mainContent }),
            /* @__PURE__ */ jsx("div", { class: "frame-footer", children: [
              props.desktopFooterTitle && /* @__PURE__ */ jsx(DesktopFooter, { title: props.desktopFooterTitle }),
              /* @__PURE__ */ jsx(MobileFooterMenu, { items: props.mobileBottomMenu })
            ] })
          ] })
        ] });
      };
    }
  });

  // packages/lupine.components/src/frames/top-frame.tsx
  var TopFrame;
  var init_top_frame = __esm({
    "packages/lupine.components/src/frames/top-frame.tsx"() {
      "use strict";
      init_jsx_runtime();
      TopFrame = async (placeholderClassname, vnode) => {
        const cssContainer = {
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          position: "relative",
          ".top-frame-box": {
            display: "flex",
            flex: "1",
            flexDirection: "column",
            height: "100%",
            // trick: to put two padding-top properties
            "padding-top ": "constant(safe-area-inset-top)",
            "padding-top": "env(safe-area-inset-top)"
          }
        };
        return /* @__PURE__ */ jsx("div", { css: cssContainer, children: /* @__PURE__ */ jsx("div", { class: "top-frame-box " + placeholderClassname, children: vnode }) });
      };
    }
  });

  // packages/lupine.components/src/frames/slider-frame.tsx
  var SliderFrame;
  var init_slider_frame = __esm({
    "packages/lupine.components/src/frames/slider-frame.tsx"() {
      "use strict";
      init_src2();
      init_jsx_runtime();
      SliderFrame = (props) => {
        if (props.hook) {
          props.hook.load = (children) => {
            var _a;
            dom.value = children;
            (_a = ref.current) == null ? void 0 : _a.classList.remove("d-none");
            setTimeout(() => {
              var _a2;
              (_a2 = ref.current) == null ? void 0 : _a2.classList.add("show");
            }, 100);
          };
          props.hook.close = (event) => {
            var _a;
            stopPropagation(event);
            (_a = ref.current) == null ? void 0 : _a.classList.remove("show");
            setTimeout(async () => {
              var _a2;
              (_a2 = ref.current) == null ? void 0 : _a2.classList.add("d-none");
              dom.value = "";
              if (props.afterClose) {
                await props.afterClose();
              }
            }, 400);
          };
          props.hook.addClass = (className) => {
            var _a;
            (_a = ref.current) == null ? void 0 : _a.classList.add(className);
          };
        }
        const dom = new HtmlVar(/* @__PURE__ */ jsx("div", { class: "slider-frame-default", children: props.defaultContent || "(No Content)" }));
        const ref = {};
        const css = {
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          zIndex: "var(--layer-slider)",
          transform: props.direction === "bottom" ? "translateY(100%)" : "translateX(100%)",
          transition: "transform 0.4s ease-in-out",
          backgroundColor: "var(--primary-bg-color)",
          "&.show": {
            transform: props.direction === "bottom" ? "translateY(0)" : "translateX(0)"
          },
          "& > fragment": {
            height: "100%"
          },
          "&.desktop-slide-left": {
            [MediaQueryRange.TabletAbove]: {
              ".header-back-content": {
                width: "30%"
              }
            }
          },
          "&.desktop-slide-right": {
            [MediaQueryRange.TabletAbove]: {
              top: "59px",
              left: "30%",
              transform: "translateX(0)",
              // notice: here is connected with mobile-header-title-icon.tsx
              ".mobile-header-title-icon-top": {
                width: "100%",
                boxShadow: "unset"
              },
              ".header-back-content": {
                width: "100%"
              },
              ".mhti-title": {
                fontSize: "15px"
              },
              ".mhti-left, .mhti-right": {
                display: "none"
              },
              "&.d-none": {
                display: "unset !important"
              }
            }
          }
        };
        return /* @__PURE__ */ jsx("div", { ref, css, class: "slider-frame d-none", children: dom.node });
      };
    }
  });

  // packages/lupine.components/src/frames/index.ts
  var init_frames = __esm({
    "packages/lupine.components/src/frames/index.ts"() {
      "use strict";
      init_responsive_frame();
      init_top_frame();
      init_slider_frame();
    }
  });

  // packages/lupine.components/src/index.ts
  var src_exports = {};
  __export(src_exports, {
    ActionSheet: () => ActionSheet,
    ActionSheetInput: () => ActionSheetInput,
    ActionSheetInputPromise: () => ActionSheetInputPromise,
    ActionSheetMessage: () => ActionSheetMessage,
    ActionSheetMessagePromise: () => ActionSheetMessagePromise,
    ActionSheetSelect: () => ActionSheetSelect,
    ActionSheetSelectOptionsProps: () => ActionSheetSelectOptionsProps,
    ActionSheetSelectPromise: () => ActionSheetSelectPromise,
    Base62: () => Base62,
    Button: () => Button,
    ButtonPushAnimation: () => ButtonPushAnimation,
    ButtonPushAnimationSize: () => ButtonPushAnimationSize,
    ButtonSize: () => ButtonSize,
    ConsoleColors: () => ConsoleColors,
    DateUtils: () => DateUtils,
    DiffDate: () => DiffDate,
    DocumentReady: () => DocumentReady,
    DomUtils: () => DomUtils,
    DragFresh: () => DragFresh,
    DynamicalLoad: () => DynamicalLoad,
    EditableLabel: () => EditableLabel,
    FloatWindow: () => FloatWindow,
    Grid: () => Grid,
    HeaderWithBackFrame: () => HeaderWithBackFrame,
    HeaderWithBackFrameEmpty: () => HeaderWithBackFrameEmpty,
    HeaderWithBackFrameHeight: () => HeaderWithBackFrameHeight,
    HeaderWithBackFrameLeft: () => HeaderWithBackFrameLeft,
    HeaderWithBackFrameRight: () => HeaderWithBackFrameRight,
    HtmlLoad: () => HtmlLoad,
    HtmlVar: () => HtmlVar,
    InputWithTitle: () => InputWithTitle,
    LinkItem: () => LinkItem,
    LinkList: () => LinkList,
    LiteDom: () => LiteDom,
    Logger: () => Logger,
    MediaQueryDirection: () => MediaQueryDirection,
    MediaQueryMaxWidth: () => MediaQueryMaxWidth,
    MediaQueryRange: () => MediaQueryRange,
    MenuBar: () => MenuBar,
    MenuSidebar: () => MenuSidebar,
    MessageBox: () => MessageBox,
    MessageBoxButtonProps: () => MessageBoxButtonProps,
    MessageHub: () => MessageHub,
    MessageHubData: () => MessageHubData,
    MetaData: () => MetaData,
    MetaDescription: () => MetaDescription,
    MobileFooterMenu: () => MobileFooterMenu,
    MobileHeadeBackIcon: () => MobileHeadeBackIcon,
    MobileHeadeCloseIcon: () => MobileHeadeCloseIcon,
    MobileHeadeIconHeight: () => MobileHeadeIconHeight,
    MobileHeaderCenter: () => MobileHeaderCenter,
    MobileHeaderComponent: () => MobileHeaderComponent,
    MobileHeaderEmptyIcon: () => MobileHeaderEmptyIcon,
    MobileHeaderHelper: () => MobileHeaderHelper,
    MobileHeaderHide: () => MobileHeaderHide,
    MobileHeaderLeft: () => MobileHeaderLeft,
    MobileHeaderRight: () => MobileHeaderRight,
    MobileHeaderTitleIcon: () => MobileHeaderTitleIcon,
    MobileSideMenu: () => MobileSideMenu,
    MobileSideMenuHelper: () => MobileSideMenuHelper,
    MobileTopSysIcon: () => MobileTopSysIcon,
    MobileTopSysMenu: () => MobileTopSysMenu,
    ModalWindow: () => ModalWindow,
    NotificationColor: () => NotificationColor,
    NotificationMessage: () => NotificationMessage,
    Observable: () => Observable,
    PageRouter: () => PageRouter,
    PageTitle: () => PageTitle,
    PagingLink: () => PagingLink,
    Panel: () => Panel,
    PopupMenu: () => PopupMenu,
    PopupMenuWithButton: () => PopupMenuWithButton,
    PopupMenuWithIcon: () => PopupMenuWithIcon,
    PopupMenuWithLabel: () => PopupMenuWithLabel,
    Progress: () => Progress,
    RadioLabelComponent: () => RadioLabelComponent,
    Redirect: () => Redirect,
    ResizableSplitter: () => ResizableSplitter,
    ResponsiveFrame: () => ResponsiveFrame,
    SelectAngleComponent: () => SelectAngleComponent,
    SelectWithTitle: () => SelectWithTitle,
    SimpleStorage: () => SimpleStorage,
    SlideTabComponent: () => SlideTabComponent,
    SliderFrame: () => SliderFrame,
    Spinner01: () => Spinner01,
    Spinner02: () => Spinner02,
    Spinner03: () => Spinner03,
    SpinnerSize: () => SpinnerSize,
    StarsComponent: () => StarsComponent,
    Subject: () => Subject,
    Subscription: () => Subscription,
    Svg: () => Svg,
    SwitchOptionComponent: () => SwitchOptionComponent,
    Tabs: () => Tabs,
    TextGlow: () => TextGlow,
    TextScale: () => TextScale,
    TextWave: () => TextWave,
    ThemeSelector: () => ThemeSelector,
    ToggleBase: () => ToggleBase,
    ToggleBaseSize: () => ToggleBaseSize,
    ToggleButton: () => ToggleButton,
    TogglePlayButton: () => TogglePlayButton,
    TogglePlayButtonSize: () => TogglePlayButtonSize,
    ToggleSwitch: () => ToggleSwitch,
    ToggleSwitchSize: () => ToggleSwitchSize,
    ToggleWaveFrame: () => ToggleWaveFrame,
    TopFrame: () => TopFrame,
    WebConfig: () => WebConfig,
    _lupineJs: () => _lupineJs,
    addMetaDataTags: () => addMetaDataTags,
    adjustedMediaQueryRange: () => adjustedMediaQueryRange,
    backActionHelper: () => backActionHelper,
    backActionUniqueId: () => backActionUniqueId,
    base64ToUrl: () => base64ToUrl,
    baseThemes: () => baseThemes,
    bindAttributes: () => bindAttributes,
    bindAttributesChildren: () => bindAttributesChildren,
    bindGlobalStyle: () => bindGlobalStyle,
    bindLang: () => bindLang,
    bindLinks: () => bindLinks,
    bindPageLoadedEvent: () => bindPageLoadedEvent,
    bindRef: () => bindRef,
    bindRenderPageFunctions: () => bindRenderPageFunctions,
    bindRouter: () => bindRouter,
    bindTheme: () => bindTheme,
    bindWebConfigApi: () => bindWebConfigApi,
    blobFromBase64: () => blobFromBase64,
    blobToBase64: () => blobToBase64,
    calculateTextWidth: () => calculateTextWidth,
    callPageLoadedEvent: () => callPageLoadedEvent,
    callUnload: () => callUnload,
    camelToHyphens: () => camelToHyphens,
    checkUploadedFileSize: () => checkUploadedFileSize,
    clearCookie: () => clearCookie,
    cloneJson: () => cloneJson,
    cookie: () => cookie,
    createDragUtil: () => createDragUtil,
    darkThemes: () => darkThemes,
    debugWatch: () => debugWatch,
    decodeHtml: () => decodeHtml,
    deepMerge: () => deepMerge,
    defaultLangName: () => defaultLangName,
    defaultThemeName: () => defaultThemeName,
    domUniqueId: () => domUniqueId,
    downloadFile: () => downloadFile,
    downloadFileChunk: () => downloadFileChunk,
    downloadLink: () => downloadLink,
    downloadStream: () => downloadStream,
    encodeHtml: () => encodeHtml,
    findParentTag: () => findParentTag,
    formatBytes: () => formatBytes,
    generateAllGlobalStyles: () => generateAllGlobalStyles,
    getCookie: () => getCookie,
    getCurrentLang: () => getCurrentLang,
    getCurrentTheme: () => getCurrentTheme,
    getDefaultPageLimit: () => getDefaultPageLimit,
    getDownloadChunkSize: () => getDownloadChunkSize,
    getEitherCookie: () => getEitherCookie,
    getGlobalStylesId: () => getGlobalStylesId,
    getMetaDataObject: () => getMetaDataObject,
    getMetaDataTags: () => getMetaDataTags,
    getMetaDescription: () => getMetaDescription,
    getPageTitle: () => getPageTitle,
    getRenderPageProps: () => getRenderPageProps,
    getServerCookie: () => getServerCookie,
    getUploadChunkSize: () => getUploadChunkSize,
    globalStyleUniqueId: () => globalStyleUniqueId,
    initServerCookies: () => initServerCookies,
    initWebEnv: () => initWebEnv,
    initializePage: () => initializePage,
    isFrontEnd: () => isFrontEnd,
    langCookieName: () => langCookieName,
    lightThemes: () => lightThemes,
    mobileHeaderHelper: () => mobileHeaderHelper,
    mountInnerComponent: () => mountInnerComponent,
    mountOuterComponent: () => mountOuterComponent,
    mountSiblingComponent: () => mountSiblingComponent,
    notificationColorFromValue: () => notificationColorFromValue,
    pathUtils: () => pathUtils,
    processStyle: () => processStyle,
    promiseTimeout: () => promiseTimeout,
    renderComponent: () => renderComponent,
    replaceInnerhtml: () => replaceInnerhtml,
    setCookie: () => setCookie,
    setDefaultMetaDescription: () => setDefaultMetaDescription,
    setDefaultPageLimit: () => setDefaultPageLimit,
    setDefaultPageTitle: () => setDefaultPageTitle,
    setDownloadChunkSize: () => setDownloadChunkSize,
    setMetaDescription: () => setMetaDescription,
    setPageTitle: () => setPageTitle,
    setRenderPageProps: () => setRenderPageProps,
    setUploadChunkSize: () => setUploadChunkSize,
    sharedThemes: () => sharedThemes,
    stopPropagation: () => stopPropagation,
    themeAttributeName: () => themeAttributeName,
    themeCookieName: () => themeCookieName,
    uniqueIdGenerator: () => uniqueIdGenerator,
    updateLang: () => updateLang,
    updateLangEventName: () => updateLangEventName,
    updateStyles: () => updateStyles,
    updateTheme: () => updateTheme,
    updateThemeEventName: () => updateThemeEventName,
    uploadFile: () => uploadFile,
    uploadFileChunk: () => uploadFileChunk,
    webEnv: () => webEnv
  });
  var init_src2 = __esm({
    "packages/lupine.components/src/index.ts"() {
      "use strict";
      init_src();
      init_lib2();
      init_styles2();
      init_components();
      init_frames();
    }
  });

  // (disabled):fs
  var require_fs = __commonJS({
    "(disabled):fs"() {
    }
  });

  // node_modules/kind-of/index.js
  var require_kind_of = __commonJS({
    "node_modules/kind-of/index.js"(exports2, module2) {
      var toString = Object.prototype.toString;
      module2.exports = function kindOf(val) {
        if (val === void 0) return "undefined";
        if (val === null) return "null";
        var type = typeof val;
        if (type === "boolean") return "boolean";
        if (type === "string") return "string";
        if (type === "number") return "number";
        if (type === "symbol") return "symbol";
        if (type === "function") {
          return isGeneratorFn(val) ? "generatorfunction" : "function";
        }
        if (isArray(val)) return "array";
        if (isBuffer(val)) return "buffer";
        if (isArguments(val)) return "arguments";
        if (isDate(val)) return "date";
        if (isError(val)) return "error";
        if (isRegexp(val)) return "regexp";
        switch (ctorName(val)) {
          case "Symbol":
            return "symbol";
          case "Promise":
            return "promise";
          // Set, Map, WeakSet, WeakMap
          case "WeakMap":
            return "weakmap";
          case "WeakSet":
            return "weakset";
          case "Map":
            return "map";
          case "Set":
            return "set";
          // 8-bit typed arrays
          case "Int8Array":
            return "int8array";
          case "Uint8Array":
            return "uint8array";
          case "Uint8ClampedArray":
            return "uint8clampedarray";
          // 16-bit typed arrays
          case "Int16Array":
            return "int16array";
          case "Uint16Array":
            return "uint16array";
          // 32-bit typed arrays
          case "Int32Array":
            return "int32array";
          case "Uint32Array":
            return "uint32array";
          case "Float32Array":
            return "float32array";
          case "Float64Array":
            return "float64array";
        }
        if (isGeneratorObj(val)) {
          return "generator";
        }
        type = toString.call(val);
        switch (type) {
          case "[object Object]":
            return "object";
          // iterators
          case "[object Map Iterator]":
            return "mapiterator";
          case "[object Set Iterator]":
            return "setiterator";
          case "[object String Iterator]":
            return "stringiterator";
          case "[object Array Iterator]":
            return "arrayiterator";
        }
        return type.slice(8, -1).toLowerCase().replace(/\s/g, "");
      };
      function ctorName(val) {
        return typeof val.constructor === "function" ? val.constructor.name : null;
      }
      function isArray(val) {
        if (Array.isArray) return Array.isArray(val);
        return val instanceof Array;
      }
      function isError(val) {
        return val instanceof Error || typeof val.message === "string" && val.constructor && typeof val.constructor.stackTraceLimit === "number";
      }
      function isDate(val) {
        if (val instanceof Date) return true;
        return typeof val.toDateString === "function" && typeof val.getDate === "function" && typeof val.setDate === "function";
      }
      function isRegexp(val) {
        if (val instanceof RegExp) return true;
        return typeof val.flags === "string" && typeof val.ignoreCase === "boolean" && typeof val.multiline === "boolean" && typeof val.global === "boolean";
      }
      function isGeneratorFn(name, val) {
        return ctorName(name) === "GeneratorFunction";
      }
      function isGeneratorObj(val) {
        return typeof val.throw === "function" && typeof val.return === "function" && typeof val.next === "function";
      }
      function isArguments(val) {
        try {
          if (typeof val.length === "number" && typeof val.callee === "function") {
            return true;
          }
        } catch (err) {
          if (err.message.indexOf("callee") !== -1) {
            return true;
          }
        }
        return false;
      }
      function isBuffer(val) {
        if (val.constructor && typeof val.constructor.isBuffer === "function") {
          return val.constructor.isBuffer(val);
        }
        return false;
      }
    }
  });

  // node_modules/is-extendable/index.js
  var require_is_extendable = __commonJS({
    "node_modules/is-extendable/index.js"(exports2, module2) {
      "use strict";
      module2.exports = function isExtendable(val) {
        return typeof val !== "undefined" && val !== null && (typeof val === "object" || typeof val === "function");
      };
    }
  });

  // node_modules/extend-shallow/index.js
  var require_extend_shallow = __commonJS({
    "node_modules/extend-shallow/index.js"(exports2, module2) {
      "use strict";
      var isObject = require_is_extendable();
      module2.exports = function extend(o) {
        if (!isObject(o)) {
          o = {};
        }
        var len = arguments.length;
        for (var i = 1; i < len; i++) {
          var obj = arguments[i];
          if (isObject(obj)) {
            assign(o, obj);
          }
        }
        return o;
      };
      function assign(a, b) {
        for (var key in b) {
          if (hasOwn(b, key)) {
            a[key] = b[key];
          }
        }
      }
      function hasOwn(obj, key) {
        return Object.prototype.hasOwnProperty.call(obj, key);
      }
    }
  });

  // node_modules/section-matter/index.js
  var require_section_matter = __commonJS({
    "node_modules/section-matter/index.js"(exports2, module2) {
      "use strict";
      var typeOf = require_kind_of();
      var extend = require_extend_shallow();
      module2.exports = function(input, options3) {
        if (typeof options3 === "function") {
          options3 = { parse: options3 };
        }
        var file = toObject(input);
        var defaults = { section_delimiter: "---", parse: identity };
        var opts = extend({}, defaults, options3);
        var delim = opts.section_delimiter;
        var lines = file.content.split(/\r?\n/);
        var sections = null;
        var section = createSection();
        var content = [];
        var stack = [];
        function initSections(val) {
          file.content = val;
          sections = [];
          content = [];
        }
        function closeSection(val) {
          if (stack.length) {
            section.key = getKey(stack[0], delim);
            section.content = val;
            opts.parse(section, sections);
            sections.push(section);
            section = createSection();
            content = [];
            stack = [];
          }
        }
        for (var i = 0; i < lines.length; i++) {
          var line = lines[i];
          var len = stack.length;
          var ln = line.trim();
          if (isDelimiter(ln, delim)) {
            if (ln.length === 3 && i !== 0) {
              if (len === 0 || len === 2) {
                content.push(line);
                continue;
              }
              stack.push(ln);
              section.data = content.join("\n");
              content = [];
              continue;
            }
            if (sections === null) {
              initSections(content.join("\n"));
            }
            if (len === 2) {
              closeSection(content.join("\n"));
            }
            stack.push(ln);
            continue;
          }
          content.push(line);
        }
        if (sections === null) {
          initSections(content.join("\n"));
        } else {
          closeSection(content.join("\n"));
        }
        file.sections = sections;
        return file;
      };
      function isDelimiter(line, delim) {
        if (line.slice(0, delim.length) !== delim) {
          return false;
        }
        if (line.charAt(delim.length + 1) === delim.slice(-1)) {
          return false;
        }
        return true;
      }
      function toObject(input) {
        if (typeOf(input) !== "object") {
          input = { content: input };
        }
        if (typeof input.content !== "string" && !isBuffer(input.content)) {
          throw new TypeError("expected a buffer or string");
        }
        input.content = input.content.toString();
        input.sections = [];
        return input;
      }
      function getKey(val, delim) {
        return val ? val.slice(delim.length).trim() : "";
      }
      function createSection() {
        return { key: "", data: "", content: "" };
      }
      function identity(val) {
        return val;
      }
      function isBuffer(val) {
        if (val && val.constructor && typeof val.constructor.isBuffer === "function") {
          return val.constructor.isBuffer(val);
        }
        return false;
      }
    }
  });

  // node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/common.js
  var require_common = __commonJS({
    "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/common.js"(exports2, module2) {
      "use strict";
      function isNothing(subject) {
        return typeof subject === "undefined" || subject === null;
      }
      function isObject(subject) {
        return typeof subject === "object" && subject !== null;
      }
      function toArray(sequence) {
        if (Array.isArray(sequence)) return sequence;
        else if (isNothing(sequence)) return [];
        return [sequence];
      }
      function extend(target, source) {
        var index, length, key, sourceKeys;
        if (source) {
          sourceKeys = Object.keys(source);
          for (index = 0, length = sourceKeys.length; index < length; index += 1) {
            key = sourceKeys[index];
            target[key] = source[key];
          }
        }
        return target;
      }
      function repeat(string, count) {
        var result = "", cycle;
        for (cycle = 0; cycle < count; cycle += 1) {
          result += string;
        }
        return result;
      }
      function isNegativeZero(number) {
        return number === 0 && Number.NEGATIVE_INFINITY === 1 / number;
      }
      module2.exports.isNothing = isNothing;
      module2.exports.isObject = isObject;
      module2.exports.toArray = toArray;
      module2.exports.repeat = repeat;
      module2.exports.isNegativeZero = isNegativeZero;
      module2.exports.extend = extend;
    }
  });

  // node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/exception.js
  var require_exception = __commonJS({
    "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/exception.js"(exports2, module2) {
      "use strict";
      function YAMLException(reason, mark) {
        Error.call(this);
        this.name = "YAMLException";
        this.reason = reason;
        this.mark = mark;
        this.message = (this.reason || "(unknown reason)") + (this.mark ? " " + this.mark.toString() : "");
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, this.constructor);
        } else {
          this.stack = new Error().stack || "";
        }
      }
      YAMLException.prototype = Object.create(Error.prototype);
      YAMLException.prototype.constructor = YAMLException;
      YAMLException.prototype.toString = function toString(compact) {
        var result = this.name + ": ";
        result += this.reason || "(unknown reason)";
        if (!compact && this.mark) {
          result += " " + this.mark.toString();
        }
        return result;
      };
      module2.exports = YAMLException;
    }
  });

  // node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/mark.js
  var require_mark = __commonJS({
    "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/mark.js"(exports2, module2) {
      "use strict";
      var common = require_common();
      function Mark(name, buffer, position, line, column) {
        this.name = name;
        this.buffer = buffer;
        this.position = position;
        this.line = line;
        this.column = column;
      }
      Mark.prototype.getSnippet = function getSnippet(indent, maxLength) {
        var head, start, tail, end, snippet;
        if (!this.buffer) return null;
        indent = indent || 4;
        maxLength = maxLength || 75;
        head = "";
        start = this.position;
        while (start > 0 && "\0\r\n\x85\u2028\u2029".indexOf(this.buffer.charAt(start - 1)) === -1) {
          start -= 1;
          if (this.position - start > maxLength / 2 - 1) {
            head = " ... ";
            start += 5;
            break;
          }
        }
        tail = "";
        end = this.position;
        while (end < this.buffer.length && "\0\r\n\x85\u2028\u2029".indexOf(this.buffer.charAt(end)) === -1) {
          end += 1;
          if (end - this.position > maxLength / 2 - 1) {
            tail = " ... ";
            end -= 5;
            break;
          }
        }
        snippet = this.buffer.slice(start, end);
        return common.repeat(" ", indent) + head + snippet + tail + "\n" + common.repeat(" ", indent + this.position - start + head.length) + "^";
      };
      Mark.prototype.toString = function toString(compact) {
        var snippet, where = "";
        if (this.name) {
          where += 'in "' + this.name + '" ';
        }
        where += "at line " + (this.line + 1) + ", column " + (this.column + 1);
        if (!compact) {
          snippet = this.getSnippet();
          if (snippet) {
            where += ":\n" + snippet;
          }
        }
        return where;
      };
      module2.exports = Mark;
    }
  });

  // node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type.js
  var require_type = __commonJS({
    "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type.js"(exports2, module2) {
      "use strict";
      var YAMLException = require_exception();
      var TYPE_CONSTRUCTOR_OPTIONS = [
        "kind",
        "resolve",
        "construct",
        "instanceOf",
        "predicate",
        "represent",
        "defaultStyle",
        "styleAliases"
      ];
      var YAML_NODE_KINDS = [
        "scalar",
        "sequence",
        "mapping"
      ];
      function compileStyleAliases(map) {
        var result = {};
        if (map !== null) {
          Object.keys(map).forEach(function(style) {
            map[style].forEach(function(alias) {
              result[String(alias)] = style;
            });
          });
        }
        return result;
      }
      function Type(tag2, options3) {
        options3 = options3 || {};
        Object.keys(options3).forEach(function(name) {
          if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) {
            throw new YAMLException('Unknown option "' + name + '" is met in definition of "' + tag2 + '" YAML type.');
          }
        });
        this.tag = tag2;
        this.kind = options3["kind"] || null;
        this.resolve = options3["resolve"] || function() {
          return true;
        };
        this.construct = options3["construct"] || function(data) {
          return data;
        };
        this.instanceOf = options3["instanceOf"] || null;
        this.predicate = options3["predicate"] || null;
        this.represent = options3["represent"] || null;
        this.defaultStyle = options3["defaultStyle"] || null;
        this.styleAliases = compileStyleAliases(options3["styleAliases"] || null);
        if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
          throw new YAMLException('Unknown kind "' + this.kind + '" is specified for "' + tag2 + '" YAML type.');
        }
      }
      module2.exports = Type;
    }
  });

  // node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema.js
  var require_schema = __commonJS({
    "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema.js"(exports2, module2) {
      "use strict";
      var common = require_common();
      var YAMLException = require_exception();
      var Type = require_type();
      function compileList(schema, name, result) {
        var exclude = [];
        schema.include.forEach(function(includedSchema) {
          result = compileList(includedSchema, name, result);
        });
        schema[name].forEach(function(currentType) {
          result.forEach(function(previousType, previousIndex) {
            if (previousType.tag === currentType.tag && previousType.kind === currentType.kind) {
              exclude.push(previousIndex);
            }
          });
          result.push(currentType);
        });
        return result.filter(function(type, index) {
          return exclude.indexOf(index) === -1;
        });
      }
      function compileMap() {
        var result = {
          scalar: {},
          sequence: {},
          mapping: {},
          fallback: {}
        }, index, length;
        function collectType(type) {
          result[type.kind][type.tag] = result["fallback"][type.tag] = type;
        }
        for (index = 0, length = arguments.length; index < length; index += 1) {
          arguments[index].forEach(collectType);
        }
        return result;
      }
      function Schema(definition) {
        this.include = definition.include || [];
        this.implicit = definition.implicit || [];
        this.explicit = definition.explicit || [];
        this.implicit.forEach(function(type) {
          if (type.loadKind && type.loadKind !== "scalar") {
            throw new YAMLException("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
          }
        });
        this.compiledImplicit = compileList(this, "implicit", []);
        this.compiledExplicit = compileList(this, "explicit", []);
        this.compiledTypeMap = compileMap(this.compiledImplicit, this.compiledExplicit);
      }
      Schema.DEFAULT = null;
      Schema.create = function createSchema() {
        var schemas, types;
        switch (arguments.length) {
          case 1:
            schemas = Schema.DEFAULT;
            types = arguments[0];
            break;
          case 2:
            schemas = arguments[0];
            types = arguments[1];
            break;
          default:
            throw new YAMLException("Wrong number of arguments for Schema.create function");
        }
        schemas = common.toArray(schemas);
        types = common.toArray(types);
        if (!schemas.every(function(schema) {
          return schema instanceof Schema;
        })) {
          throw new YAMLException("Specified list of super schemas (or a single Schema object) contains a non-Schema object.");
        }
        if (!types.every(function(type) {
          return type instanceof Type;
        })) {
          throw new YAMLException("Specified list of YAML types (or a single Type object) contains a non-Type object.");
        }
        return new Schema({
          include: schemas,
          explicit: types
        });
      };
      module2.exports = Schema;
    }
  });

  // node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/str.js
  var require_str = __commonJS({
    "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/str.js"(exports2, module2) {
      "use strict";
      var Type = require_type();
      module2.exports = new Type("tag:yaml.org,2002:str", {
        kind: "scalar",
        construct: function(data) {
          return data !== null ? data : "";
        }
      });
    }
  });

  // node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/seq.js
  var require_seq = __commonJS({
    "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/seq.js"(exports2, module2) {
      "use strict";
      var Type = require_type();
      module2.exports = new Type("tag:yaml.org,2002:seq", {
        kind: "sequence",
        construct: function(data) {
          return data !== null ? data : [];
        }
      });
    }
  });

  // node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/map.js
  var require_map = __commonJS({
    "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/map.js"(exports2, module2) {
      "use strict";
      var Type = require_type();
      module2.exports = new Type("tag:yaml.org,2002:map", {
        kind: "mapping",
        construct: function(data) {
          return data !== null ? data : {};
        }
      });
    }
  });

  // node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/failsafe.js
  var require_failsafe = __commonJS({
    "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/failsafe.js"(exports2, module2) {
      "use strict";
      var Schema = require_schema();
      module2.exports = new Schema({
        explicit: [
          require_str(),
          require_seq(),
          require_map()
        ]
      });
    }
  });

  // node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/null.js
  var require_null = __commonJS({
    "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/null.js"(exports2, module2) {
      "use strict";
      var Type = require_type();
      function resolveYamlNull(data) {
        if (data === null) return true;
        var max = data.length;
        return max === 1 && data === "~" || max === 4 && (data === "null" || data === "Null" || data === "NULL");
      }
      function constructYamlNull() {
        return null;
      }
      function isNull(object) {
        return object === null;
      }
      module2.exports = new Type("tag:yaml.org,2002:null", {
        kind: "scalar",
        resolve: resolveYamlNull,
        construct: constructYamlNull,
        predicate: isNull,
        represent: {
          canonical: function() {
            return "~";
          },
          lowercase: function() {
            return "null";
          },
          uppercase: function() {
            return "NULL";
          },
          camelcase: function() {
            return "Null";
          }
        },
        defaultStyle: "lowercase"
      });
    }
  });

  // node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/bool.js
  var require_bool = __commonJS({
    "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/bool.js"(exports2, module2) {
      "use strict";
      var Type = require_type();
      function resolveYamlBoolean(data) {
        if (data === null) return false;
        var max = data.length;
        return max === 4 && (data === "true" || data === "True" || data === "TRUE") || max === 5 && (data === "false" || data === "False" || data === "FALSE");
      }
      function constructYamlBoolean(data) {
        return data === "true" || data === "True" || data === "TRUE";
      }
      function isBoolean(object) {
        return Object.prototype.toString.call(object) === "[object Boolean]";
      }
      module2.exports = new Type("tag:yaml.org,2002:bool", {
        kind: "scalar",
        resolve: resolveYamlBoolean,
        construct: constructYamlBoolean,
        predicate: isBoolean,
        represent: {
          lowercase: function(object) {
            return object ? "true" : "false";
          },
          uppercase: function(object) {
            return object ? "TRUE" : "FALSE";
          },
          camelcase: function(object) {
            return object ? "True" : "False";
          }
        },
        defaultStyle: "lowercase"
      });
    }
  });

  // node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/int.js
  var require_int = __commonJS({
    "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/int.js"(exports2, module2) {
      "use strict";
      var common = require_common();
      var Type = require_type();
      function isHexCode(c) {
        return 48 <= c && c <= 57 || 65 <= c && c <= 70 || 97 <= c && c <= 102;
      }
      function isOctCode(c) {
        return 48 <= c && c <= 55;
      }
      function isDecCode(c) {
        return 48 <= c && c <= 57;
      }
      function resolveYamlInteger(data) {
        if (data === null) return false;
        var max = data.length, index = 0, hasDigits = false, ch;
        if (!max) return false;
        ch = data[index];
        if (ch === "-" || ch === "+") {
          ch = data[++index];
        }
        if (ch === "0") {
          if (index + 1 === max) return true;
          ch = data[++index];
          if (ch === "b") {
            index++;
            for (; index < max; index++) {
              ch = data[index];
              if (ch === "_") continue;
              if (ch !== "0" && ch !== "1") return false;
              hasDigits = true;
            }
            return hasDigits && ch !== "_";
          }
          if (ch === "x") {
            index++;
            for (; index < max; index++) {
              ch = data[index];
              if (ch === "_") continue;
              if (!isHexCode(data.charCodeAt(index))) return false;
              hasDigits = true;
            }
            return hasDigits && ch !== "_";
          }
          for (; index < max; index++) {
            ch = data[index];
            if (ch === "_") continue;
            if (!isOctCode(data.charCodeAt(index))) return false;
            hasDigits = true;
          }
          return hasDigits && ch !== "_";
        }
        if (ch === "_") return false;
        for (; index < max; index++) {
          ch = data[index];
          if (ch === "_") continue;
          if (ch === ":") break;
          if (!isDecCode(data.charCodeAt(index))) {
            return false;
          }
          hasDigits = true;
        }
        if (!hasDigits || ch === "_") return false;
        if (ch !== ":") return true;
        return /^(:[0-5]?[0-9])+$/.test(data.slice(index));
      }
      function constructYamlInteger(data) {
        var value = data, sign = 1, ch, base, digits = [];
        if (value.indexOf("_") !== -1) {
          value = value.replace(/_/g, "");
        }
        ch = value[0];
        if (ch === "-" || ch === "+") {
          if (ch === "-") sign = -1;
          value = value.slice(1);
          ch = value[0];
        }
        if (value === "0") return 0;
        if (ch === "0") {
          if (value[1] === "b") return sign * parseInt(value.slice(2), 2);
          if (value[1] === "x") return sign * parseInt(value, 16);
          return sign * parseInt(value, 8);
        }
        if (value.indexOf(":") !== -1) {
          value.split(":").forEach(function(v) {
            digits.unshift(parseInt(v, 10));
          });
          value = 0;
          base = 1;
          digits.forEach(function(d) {
            value += d * base;
            base *= 60;
          });
          return sign * value;
        }
        return sign * parseInt(value, 10);
      }
      function isInteger(object) {
        return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 === 0 && !common.isNegativeZero(object));
      }
      module2.exports = new Type("tag:yaml.org,2002:int", {
        kind: "scalar",
        resolve: resolveYamlInteger,
        construct: constructYamlInteger,
        predicate: isInteger,
        represent: {
          binary: function(obj) {
            return obj >= 0 ? "0b" + obj.toString(2) : "-0b" + obj.toString(2).slice(1);
          },
          octal: function(obj) {
            return obj >= 0 ? "0" + obj.toString(8) : "-0" + obj.toString(8).slice(1);
          },
          decimal: function(obj) {
            return obj.toString(10);
          },
          /* eslint-disable max-len */
          hexadecimal: function(obj) {
            return obj >= 0 ? "0x" + obj.toString(16).toUpperCase() : "-0x" + obj.toString(16).toUpperCase().slice(1);
          }
        },
        defaultStyle: "decimal",
        styleAliases: {
          binary: [2, "bin"],
          octal: [8, "oct"],
          decimal: [10, "dec"],
          hexadecimal: [16, "hex"]
        }
      });
    }
  });

  // node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/float.js
  var require_float = __commonJS({
    "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/float.js"(exports2, module2) {
      "use strict";
      var common = require_common();
      var Type = require_type();
      var YAML_FLOAT_PATTERN = new RegExp(
        // 2.5e4, 2.5 and integers
        "^(?:[-+]?(?:0|[1-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
      );
      function resolveYamlFloat(data) {
        if (data === null) return false;
        if (!YAML_FLOAT_PATTERN.test(data) || // Quick hack to not allow integers end with `_`
        // Probably should update regexp & check speed
        data[data.length - 1] === "_") {
          return false;
        }
        return true;
      }
      function constructYamlFloat(data) {
        var value, sign, base, digits;
        value = data.replace(/_/g, "").toLowerCase();
        sign = value[0] === "-" ? -1 : 1;
        digits = [];
        if ("+-".indexOf(value[0]) >= 0) {
          value = value.slice(1);
        }
        if (value === ".inf") {
          return sign === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
        } else if (value === ".nan") {
          return NaN;
        } else if (value.indexOf(":") >= 0) {
          value.split(":").forEach(function(v) {
            digits.unshift(parseFloat(v, 10));
          });
          value = 0;
          base = 1;
          digits.forEach(function(d) {
            value += d * base;
            base *= 60;
          });
          return sign * value;
        }
        return sign * parseFloat(value, 10);
      }
      var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;
      function representYamlFloat(object, style) {
        var res;
        if (isNaN(object)) {
          switch (style) {
            case "lowercase":
              return ".nan";
            case "uppercase":
              return ".NAN";
            case "camelcase":
              return ".NaN";
          }
        } else if (Number.POSITIVE_INFINITY === object) {
          switch (style) {
            case "lowercase":
              return ".inf";
            case "uppercase":
              return ".INF";
            case "camelcase":
              return ".Inf";
          }
        } else if (Number.NEGATIVE_INFINITY === object) {
          switch (style) {
            case "lowercase":
              return "-.inf";
            case "uppercase":
              return "-.INF";
            case "camelcase":
              return "-.Inf";
          }
        } else if (common.isNegativeZero(object)) {
          return "-0.0";
        }
        res = object.toString(10);
        return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace("e", ".e") : res;
      }
      function isFloat(object) {
        return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 !== 0 || common.isNegativeZero(object));
      }
      module2.exports = new Type("tag:yaml.org,2002:float", {
        kind: "scalar",
        resolve: resolveYamlFloat,
        construct: constructYamlFloat,
        predicate: isFloat,
        represent: representYamlFloat,
        defaultStyle: "lowercase"
      });
    }
  });

  // node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/json.js
  var require_json = __commonJS({
    "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/json.js"(exports2, module2) {
      "use strict";
      var Schema = require_schema();
      module2.exports = new Schema({
        include: [
          require_failsafe()
        ],
        implicit: [
          require_null(),
          require_bool(),
          require_int(),
          require_float()
        ]
      });
    }
  });

  // node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/core.js
  var require_core = __commonJS({
    "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/core.js"(exports2, module2) {
      "use strict";
      var Schema = require_schema();
      module2.exports = new Schema({
        include: [
          require_json()
        ]
      });
    }
  });

  // node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/timestamp.js
  var require_timestamp = __commonJS({
    "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/timestamp.js"(exports2, module2) {
      "use strict";
      var Type = require_type();
      var YAML_DATE_REGEXP = new RegExp(
        "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
      );
      var YAML_TIMESTAMP_REGEXP = new RegExp(
        "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
      );
      function resolveYamlTimestamp(data) {
        if (data === null) return false;
        if (YAML_DATE_REGEXP.exec(data) !== null) return true;
        if (YAML_TIMESTAMP_REGEXP.exec(data) !== null) return true;
        return false;
      }
      function constructYamlTimestamp(data) {
        var match, year, month, day, hour, minute, second, fraction = 0, delta = null, tz_hour, tz_minute, date;
        match = YAML_DATE_REGEXP.exec(data);
        if (match === null) match = YAML_TIMESTAMP_REGEXP.exec(data);
        if (match === null) throw new Error("Date resolve error");
        year = +match[1];
        month = +match[2] - 1;
        day = +match[3];
        if (!match[4]) {
          return new Date(Date.UTC(year, month, day));
        }
        hour = +match[4];
        minute = +match[5];
        second = +match[6];
        if (match[7]) {
          fraction = match[7].slice(0, 3);
          while (fraction.length < 3) {
            fraction += "0";
          }
          fraction = +fraction;
        }
        if (match[9]) {
          tz_hour = +match[10];
          tz_minute = +(match[11] || 0);
          delta = (tz_hour * 60 + tz_minute) * 6e4;
          if (match[9] === "-") delta = -delta;
        }
        date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));
        if (delta) date.setTime(date.getTime() - delta);
        return date;
      }
      function representYamlTimestamp(object) {
        return object.toISOString();
      }
      module2.exports = new Type("tag:yaml.org,2002:timestamp", {
        kind: "scalar",
        resolve: resolveYamlTimestamp,
        construct: constructYamlTimestamp,
        instanceOf: Date,
        represent: representYamlTimestamp
      });
    }
  });

  // node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/merge.js
  var require_merge = __commonJS({
    "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/merge.js"(exports2, module2) {
      "use strict";
      var Type = require_type();
      function resolveYamlMerge(data) {
        return data === "<<" || data === null;
      }
      module2.exports = new Type("tag:yaml.org,2002:merge", {
        kind: "scalar",
        resolve: resolveYamlMerge
      });
    }
  });

  // node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/binary.js
  var require_binary = __commonJS({
    "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/binary.js"(exports2, module2) {
      "use strict";
      var NodeBuffer;
      try {
        _require = __require;
        NodeBuffer = _require("buffer").Buffer;
      } catch (__) {
      }
      var _require;
      var Type = require_type();
      var BASE64_MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";
      function resolveYamlBinary(data) {
        if (data === null) return false;
        var code, idx, bitlen = 0, max = data.length, map = BASE64_MAP;
        for (idx = 0; idx < max; idx++) {
          code = map.indexOf(data.charAt(idx));
          if (code > 64) continue;
          if (code < 0) return false;
          bitlen += 6;
        }
        return bitlen % 8 === 0;
      }
      function constructYamlBinary(data) {
        var idx, tailbits, input = data.replace(/[\r\n=]/g, ""), max = input.length, map = BASE64_MAP, bits = 0, result = [];
        for (idx = 0; idx < max; idx++) {
          if (idx % 4 === 0 && idx) {
            result.push(bits >> 16 & 255);
            result.push(bits >> 8 & 255);
            result.push(bits & 255);
          }
          bits = bits << 6 | map.indexOf(input.charAt(idx));
        }
        tailbits = max % 4 * 6;
        if (tailbits === 0) {
          result.push(bits >> 16 & 255);
          result.push(bits >> 8 & 255);
          result.push(bits & 255);
        } else if (tailbits === 18) {
          result.push(bits >> 10 & 255);
          result.push(bits >> 2 & 255);
        } else if (tailbits === 12) {
          result.push(bits >> 4 & 255);
        }
        if (NodeBuffer) {
          return NodeBuffer.from ? NodeBuffer.from(result) : new NodeBuffer(result);
        }
        return result;
      }
      function representYamlBinary(object) {
        var result = "", bits = 0, idx, tail, max = object.length, map = BASE64_MAP;
        for (idx = 0; idx < max; idx++) {
          if (idx % 3 === 0 && idx) {
            result += map[bits >> 18 & 63];
            result += map[bits >> 12 & 63];
            result += map[bits >> 6 & 63];
            result += map[bits & 63];
          }
          bits = (bits << 8) + object[idx];
        }
        tail = max % 3;
        if (tail === 0) {
          result += map[bits >> 18 & 63];
          result += map[bits >> 12 & 63];
          result += map[bits >> 6 & 63];
          result += map[bits & 63];
        } else if (tail === 2) {
          result += map[bits >> 10 & 63];
          result += map[bits >> 4 & 63];
          result += map[bits << 2 & 63];
          result += map[64];
        } else if (tail === 1) {
          result += map[bits >> 2 & 63];
          result += map[bits << 4 & 63];
          result += map[64];
          result += map[64];
        }
        return result;
      }
      function isBinary(object) {
        return NodeBuffer && NodeBuffer.isBuffer(object);
      }
      module2.exports = new Type("tag:yaml.org,2002:binary", {
        kind: "scalar",
        resolve: resolveYamlBinary,
        construct: constructYamlBinary,
        predicate: isBinary,
        represent: representYamlBinary
      });
    }
  });

  // node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/omap.js
  var require_omap = __commonJS({
    "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/omap.js"(exports2, module2) {
      "use strict";
      var Type = require_type();
      var _hasOwnProperty = Object.prototype.hasOwnProperty;
      var _toString = Object.prototype.toString;
      function resolveYamlOmap(data) {
        if (data === null) return true;
        var objectKeys = [], index, length, pair, pairKey, pairHasKey, object = data;
        for (index = 0, length = object.length; index < length; index += 1) {
          pair = object[index];
          pairHasKey = false;
          if (_toString.call(pair) !== "[object Object]") return false;
          for (pairKey in pair) {
            if (_hasOwnProperty.call(pair, pairKey)) {
              if (!pairHasKey) pairHasKey = true;
              else return false;
            }
          }
          if (!pairHasKey) return false;
          if (objectKeys.indexOf(pairKey) === -1) objectKeys.push(pairKey);
          else return false;
        }
        return true;
      }
      function constructYamlOmap(data) {
        return data !== null ? data : [];
      }
      module2.exports = new Type("tag:yaml.org,2002:omap", {
        kind: "sequence",
        resolve: resolveYamlOmap,
        construct: constructYamlOmap
      });
    }
  });

  // node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/pairs.js
  var require_pairs = __commonJS({
    "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/pairs.js"(exports2, module2) {
      "use strict";
      var Type = require_type();
      var _toString = Object.prototype.toString;
      function resolveYamlPairs(data) {
        if (data === null) return true;
        var index, length, pair, keys, result, object = data;
        result = new Array(object.length);
        for (index = 0, length = object.length; index < length; index += 1) {
          pair = object[index];
          if (_toString.call(pair) !== "[object Object]") return false;
          keys = Object.keys(pair);
          if (keys.length !== 1) return false;
          result[index] = [keys[0], pair[keys[0]]];
        }
        return true;
      }
      function constructYamlPairs(data) {
        if (data === null) return [];
        var index, length, pair, keys, result, object = data;
        result = new Array(object.length);
        for (index = 0, length = object.length; index < length; index += 1) {
          pair = object[index];
          keys = Object.keys(pair);
          result[index] = [keys[0], pair[keys[0]]];
        }
        return result;
      }
      module2.exports = new Type("tag:yaml.org,2002:pairs", {
        kind: "sequence",
        resolve: resolveYamlPairs,
        construct: constructYamlPairs
      });
    }
  });

  // node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/set.js
  var require_set = __commonJS({
    "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/set.js"(exports2, module2) {
      "use strict";
      var Type = require_type();
      var _hasOwnProperty = Object.prototype.hasOwnProperty;
      function resolveYamlSet(data) {
        if (data === null) return true;
        var key, object = data;
        for (key in object) {
          if (_hasOwnProperty.call(object, key)) {
            if (object[key] !== null) return false;
          }
        }
        return true;
      }
      function constructYamlSet(data) {
        return data !== null ? data : {};
      }
      module2.exports = new Type("tag:yaml.org,2002:set", {
        kind: "mapping",
        resolve: resolveYamlSet,
        construct: constructYamlSet
      });
    }
  });

  // node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/default_safe.js
  var require_default_safe = __commonJS({
    "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/default_safe.js"(exports2, module2) {
      "use strict";
      var Schema = require_schema();
      module2.exports = new Schema({
        include: [
          require_core()
        ],
        implicit: [
          require_timestamp(),
          require_merge()
        ],
        explicit: [
          require_binary(),
          require_omap(),
          require_pairs(),
          require_set()
        ]
      });
    }
  });

  // node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/js/undefined.js
  var require_undefined = __commonJS({
    "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/js/undefined.js"(exports2, module2) {
      "use strict";
      var Type = require_type();
      function resolveJavascriptUndefined() {
        return true;
      }
      function constructJavascriptUndefined() {
        return void 0;
      }
      function representJavascriptUndefined() {
        return "";
      }
      function isUndefined(object) {
        return typeof object === "undefined";
      }
      module2.exports = new Type("tag:yaml.org,2002:js/undefined", {
        kind: "scalar",
        resolve: resolveJavascriptUndefined,
        construct: constructJavascriptUndefined,
        predicate: isUndefined,
        represent: representJavascriptUndefined
      });
    }
  });

  // node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/js/regexp.js
  var require_regexp = __commonJS({
    "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/js/regexp.js"(exports2, module2) {
      "use strict";
      var Type = require_type();
      function resolveJavascriptRegExp(data) {
        if (data === null) return false;
        if (data.length === 0) return false;
        var regexp = data, tail = /\/([gim]*)$/.exec(data), modifiers = "";
        if (regexp[0] === "/") {
          if (tail) modifiers = tail[1];
          if (modifiers.length > 3) return false;
          if (regexp[regexp.length - modifiers.length - 1] !== "/") return false;
        }
        return true;
      }
      function constructJavascriptRegExp(data) {
        var regexp = data, tail = /\/([gim]*)$/.exec(data), modifiers = "";
        if (regexp[0] === "/") {
          if (tail) modifiers = tail[1];
          regexp = regexp.slice(1, regexp.length - modifiers.length - 1);
        }
        return new RegExp(regexp, modifiers);
      }
      function representJavascriptRegExp(object) {
        var result = "/" + object.source + "/";
        if (object.global) result += "g";
        if (object.multiline) result += "m";
        if (object.ignoreCase) result += "i";
        return result;
      }
      function isRegExp(object) {
        return Object.prototype.toString.call(object) === "[object RegExp]";
      }
      module2.exports = new Type("tag:yaml.org,2002:js/regexp", {
        kind: "scalar",
        resolve: resolveJavascriptRegExp,
        construct: constructJavascriptRegExp,
        predicate: isRegExp,
        represent: representJavascriptRegExp
      });
    }
  });

  // node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/js/function.js
  var require_function = __commonJS({
    "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/js/function.js"(exports2, module2) {
      "use strict";
      var esprima;
      try {
        _require = __require;
        esprima = _require("esprima");
      } catch (_) {
        if (typeof window !== "undefined") esprima = window.esprima;
      }
      var _require;
      var Type = require_type();
      function resolveJavascriptFunction(data) {
        if (data === null) return false;
        try {
          var source = "(" + data + ")", ast = esprima.parse(source, { range: true });
          if (ast.type !== "Program" || ast.body.length !== 1 || ast.body[0].type !== "ExpressionStatement" || ast.body[0].expression.type !== "ArrowFunctionExpression" && ast.body[0].expression.type !== "FunctionExpression") {
            return false;
          }
          return true;
        } catch (err) {
          return false;
        }
      }
      function constructJavascriptFunction(data) {
        var source = "(" + data + ")", ast = esprima.parse(source, { range: true }), params = [], body;
        if (ast.type !== "Program" || ast.body.length !== 1 || ast.body[0].type !== "ExpressionStatement" || ast.body[0].expression.type !== "ArrowFunctionExpression" && ast.body[0].expression.type !== "FunctionExpression") {
          throw new Error("Failed to resolve function");
        }
        ast.body[0].expression.params.forEach(function(param) {
          params.push(param.name);
        });
        body = ast.body[0].expression.body.range;
        if (ast.body[0].expression.body.type === "BlockStatement") {
          return new Function(params, source.slice(body[0] + 1, body[1] - 1));
        }
        return new Function(params, "return " + source.slice(body[0], body[1]));
      }
      function representJavascriptFunction(object) {
        return object.toString();
      }
      function isFunction(object) {
        return Object.prototype.toString.call(object) === "[object Function]";
      }
      module2.exports = new Type("tag:yaml.org,2002:js/function", {
        kind: "scalar",
        resolve: resolveJavascriptFunction,
        construct: constructJavascriptFunction,
        predicate: isFunction,
        represent: representJavascriptFunction
      });
    }
  });

  // node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/default_full.js
  var require_default_full = __commonJS({
    "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/default_full.js"(exports2, module2) {
      "use strict";
      var Schema = require_schema();
      module2.exports = Schema.DEFAULT = new Schema({
        include: [
          require_default_safe()
        ],
        explicit: [
          require_undefined(),
          require_regexp(),
          require_function()
        ]
      });
    }
  });

  // node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/loader.js
  var require_loader = __commonJS({
    "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/loader.js"(exports2, module2) {
      "use strict";
      var common = require_common();
      var YAMLException = require_exception();
      var Mark = require_mark();
      var DEFAULT_SAFE_SCHEMA = require_default_safe();
      var DEFAULT_FULL_SCHEMA = require_default_full();
      var _hasOwnProperty = Object.prototype.hasOwnProperty;
      var CONTEXT_FLOW_IN = 1;
      var CONTEXT_FLOW_OUT = 2;
      var CONTEXT_BLOCK_IN = 3;
      var CONTEXT_BLOCK_OUT = 4;
      var CHOMPING_CLIP = 1;
      var CHOMPING_STRIP = 2;
      var CHOMPING_KEEP = 3;
      var PATTERN_NON_PRINTABLE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
      var PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
      var PATTERN_FLOW_INDICATORS = /[,\[\]\{\}]/;
      var PATTERN_TAG_HANDLE = /^(?:!|!!|![a-z\-]+!)$/i;
      var PATTERN_TAG_URI = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
      function _class(obj) {
        return Object.prototype.toString.call(obj);
      }
      function is_EOL(c) {
        return c === 10 || c === 13;
      }
      function is_WHITE_SPACE(c) {
        return c === 9 || c === 32;
      }
      function is_WS_OR_EOL(c) {
        return c === 9 || c === 32 || c === 10 || c === 13;
      }
      function is_FLOW_INDICATOR(c) {
        return c === 44 || c === 91 || c === 93 || c === 123 || c === 125;
      }
      function fromHexCode(c) {
        var lc;
        if (48 <= c && c <= 57) {
          return c - 48;
        }
        lc = c | 32;
        if (97 <= lc && lc <= 102) {
          return lc - 97 + 10;
        }
        return -1;
      }
      function escapedHexLen(c) {
        if (c === 120) {
          return 2;
        }
        if (c === 117) {
          return 4;
        }
        if (c === 85) {
          return 8;
        }
        return 0;
      }
      function fromDecimalCode(c) {
        if (48 <= c && c <= 57) {
          return c - 48;
        }
        return -1;
      }
      function simpleEscapeSequence(c) {
        return c === 48 ? "\0" : c === 97 ? "\x07" : c === 98 ? "\b" : c === 116 ? "	" : c === 9 ? "	" : c === 110 ? "\n" : c === 118 ? "\v" : c === 102 ? "\f" : c === 114 ? "\r" : c === 101 ? "\x1B" : c === 32 ? " " : c === 34 ? '"' : c === 47 ? "/" : c === 92 ? "\\" : c === 78 ? "\x85" : c === 95 ? "\xA0" : c === 76 ? "\u2028" : c === 80 ? "\u2029" : "";
      }
      function charFromCodepoint(c) {
        if (c <= 65535) {
          return String.fromCharCode(c);
        }
        return String.fromCharCode(
          (c - 65536 >> 10) + 55296,
          (c - 65536 & 1023) + 56320
        );
      }
      function setProperty(object, key, value) {
        if (key === "__proto__") {
          Object.defineProperty(object, key, {
            configurable: true,
            enumerable: true,
            writable: true,
            value
          });
        } else {
          object[key] = value;
        }
      }
      var simpleEscapeCheck = new Array(256);
      var simpleEscapeMap = new Array(256);
      for (i = 0; i < 256; i++) {
        simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
        simpleEscapeMap[i] = simpleEscapeSequence(i);
      }
      var i;
      function State(input, options3) {
        this.input = input;
        this.filename = options3["filename"] || null;
        this.schema = options3["schema"] || DEFAULT_FULL_SCHEMA;
        this.onWarning = options3["onWarning"] || null;
        this.legacy = options3["legacy"] || false;
        this.json = options3["json"] || false;
        this.listener = options3["listener"] || null;
        this.implicitTypes = this.schema.compiledImplicit;
        this.typeMap = this.schema.compiledTypeMap;
        this.length = input.length;
        this.position = 0;
        this.line = 0;
        this.lineStart = 0;
        this.lineIndent = 0;
        this.documents = [];
      }
      function generateError(state, message) {
        return new YAMLException(
          message,
          new Mark(state.filename, state.input, state.position, state.line, state.position - state.lineStart)
        );
      }
      function throwError(state, message) {
        throw generateError(state, message);
      }
      function throwWarning(state, message) {
        if (state.onWarning) {
          state.onWarning.call(null, generateError(state, message));
        }
      }
      var directiveHandlers = {
        YAML: function handleYamlDirective(state, name, args) {
          var match, major, minor;
          if (state.version !== null) {
            throwError(state, "duplication of %YAML directive");
          }
          if (args.length !== 1) {
            throwError(state, "YAML directive accepts exactly one argument");
          }
          match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);
          if (match === null) {
            throwError(state, "ill-formed argument of the YAML directive");
          }
          major = parseInt(match[1], 10);
          minor = parseInt(match[2], 10);
          if (major !== 1) {
            throwError(state, "unacceptable YAML version of the document");
          }
          state.version = args[0];
          state.checkLineBreaks = minor < 2;
          if (minor !== 1 && minor !== 2) {
            throwWarning(state, "unsupported YAML version of the document");
          }
        },
        TAG: function handleTagDirective(state, name, args) {
          var handle, prefix;
          if (args.length !== 2) {
            throwError(state, "TAG directive accepts exactly two arguments");
          }
          handle = args[0];
          prefix = args[1];
          if (!PATTERN_TAG_HANDLE.test(handle)) {
            throwError(state, "ill-formed tag handle (first argument) of the TAG directive");
          }
          if (_hasOwnProperty.call(state.tagMap, handle)) {
            throwError(state, 'there is a previously declared suffix for "' + handle + '" tag handle');
          }
          if (!PATTERN_TAG_URI.test(prefix)) {
            throwError(state, "ill-formed tag prefix (second argument) of the TAG directive");
          }
          state.tagMap[handle] = prefix;
        }
      };
      function captureSegment(state, start, end, checkJson) {
        var _position, _length, _character, _result;
        if (start < end) {
          _result = state.input.slice(start, end);
          if (checkJson) {
            for (_position = 0, _length = _result.length; _position < _length; _position += 1) {
              _character = _result.charCodeAt(_position);
              if (!(_character === 9 || 32 <= _character && _character <= 1114111)) {
                throwError(state, "expected valid JSON character");
              }
            }
          } else if (PATTERN_NON_PRINTABLE.test(_result)) {
            throwError(state, "the stream contains non-printable characters");
          }
          state.result += _result;
        }
      }
      function mergeMappings(state, destination, source, overridableKeys) {
        var sourceKeys, key, index, quantity;
        if (!common.isObject(source)) {
          throwError(state, "cannot merge mappings; the provided source object is unacceptable");
        }
        sourceKeys = Object.keys(source);
        for (index = 0, quantity = sourceKeys.length; index < quantity; index += 1) {
          key = sourceKeys[index];
          if (!_hasOwnProperty.call(destination, key)) {
            setProperty(destination, key, source[key]);
            overridableKeys[key] = true;
          }
        }
      }
      function storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, startLine, startPos) {
        var index, quantity;
        if (Array.isArray(keyNode)) {
          keyNode = Array.prototype.slice.call(keyNode);
          for (index = 0, quantity = keyNode.length; index < quantity; index += 1) {
            if (Array.isArray(keyNode[index])) {
              throwError(state, "nested arrays are not supported inside keys");
            }
            if (typeof keyNode === "object" && _class(keyNode[index]) === "[object Object]") {
              keyNode[index] = "[object Object]";
            }
          }
        }
        if (typeof keyNode === "object" && _class(keyNode) === "[object Object]") {
          keyNode = "[object Object]";
        }
        keyNode = String(keyNode);
        if (_result === null) {
          _result = {};
        }
        if (keyTag === "tag:yaml.org,2002:merge") {
          if (Array.isArray(valueNode)) {
            for (index = 0, quantity = valueNode.length; index < quantity; index += 1) {
              mergeMappings(state, _result, valueNode[index], overridableKeys);
            }
          } else {
            mergeMappings(state, _result, valueNode, overridableKeys);
          }
        } else {
          if (!state.json && !_hasOwnProperty.call(overridableKeys, keyNode) && _hasOwnProperty.call(_result, keyNode)) {
            state.line = startLine || state.line;
            state.position = startPos || state.position;
            throwError(state, "duplicated mapping key");
          }
          setProperty(_result, keyNode, valueNode);
          delete overridableKeys[keyNode];
        }
        return _result;
      }
      function readLineBreak(state) {
        var ch;
        ch = state.input.charCodeAt(state.position);
        if (ch === 10) {
          state.position++;
        } else if (ch === 13) {
          state.position++;
          if (state.input.charCodeAt(state.position) === 10) {
            state.position++;
          }
        } else {
          throwError(state, "a line break is expected");
        }
        state.line += 1;
        state.lineStart = state.position;
      }
      function skipSeparationSpace(state, allowComments, checkIndent) {
        var lineBreaks = 0, ch = state.input.charCodeAt(state.position);
        while (ch !== 0) {
          while (is_WHITE_SPACE(ch)) {
            ch = state.input.charCodeAt(++state.position);
          }
          if (allowComments && ch === 35) {
            do {
              ch = state.input.charCodeAt(++state.position);
            } while (ch !== 10 && ch !== 13 && ch !== 0);
          }
          if (is_EOL(ch)) {
            readLineBreak(state);
            ch = state.input.charCodeAt(state.position);
            lineBreaks++;
            state.lineIndent = 0;
            while (ch === 32) {
              state.lineIndent++;
              ch = state.input.charCodeAt(++state.position);
            }
          } else {
            break;
          }
        }
        if (checkIndent !== -1 && lineBreaks !== 0 && state.lineIndent < checkIndent) {
          throwWarning(state, "deficient indentation");
        }
        return lineBreaks;
      }
      function testDocumentSeparator(state) {
        var _position = state.position, ch;
        ch = state.input.charCodeAt(_position);
        if ((ch === 45 || ch === 46) && ch === state.input.charCodeAt(_position + 1) && ch === state.input.charCodeAt(_position + 2)) {
          _position += 3;
          ch = state.input.charCodeAt(_position);
          if (ch === 0 || is_WS_OR_EOL(ch)) {
            return true;
          }
        }
        return false;
      }
      function writeFoldedLines(state, count) {
        if (count === 1) {
          state.result += " ";
        } else if (count > 1) {
          state.result += common.repeat("\n", count - 1);
        }
      }
      function readPlainScalar(state, nodeIndent, withinFlowCollection) {
        var preceding, following, captureStart, captureEnd, hasPendingContent, _line, _lineStart, _lineIndent, _kind = state.kind, _result = state.result, ch;
        ch = state.input.charCodeAt(state.position);
        if (is_WS_OR_EOL(ch) || is_FLOW_INDICATOR(ch) || ch === 35 || ch === 38 || ch === 42 || ch === 33 || ch === 124 || ch === 62 || ch === 39 || ch === 34 || ch === 37 || ch === 64 || ch === 96) {
          return false;
        }
        if (ch === 63 || ch === 45) {
          following = state.input.charCodeAt(state.position + 1);
          if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
            return false;
          }
        }
        state.kind = "scalar";
        state.result = "";
        captureStart = captureEnd = state.position;
        hasPendingContent = false;
        while (ch !== 0) {
          if (ch === 58) {
            following = state.input.charCodeAt(state.position + 1);
            if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
              break;
            }
          } else if (ch === 35) {
            preceding = state.input.charCodeAt(state.position - 1);
            if (is_WS_OR_EOL(preceding)) {
              break;
            }
          } else if (state.position === state.lineStart && testDocumentSeparator(state) || withinFlowCollection && is_FLOW_INDICATOR(ch)) {
            break;
          } else if (is_EOL(ch)) {
            _line = state.line;
            _lineStart = state.lineStart;
            _lineIndent = state.lineIndent;
            skipSeparationSpace(state, false, -1);
            if (state.lineIndent >= nodeIndent) {
              hasPendingContent = true;
              ch = state.input.charCodeAt(state.position);
              continue;
            } else {
              state.position = captureEnd;
              state.line = _line;
              state.lineStart = _lineStart;
              state.lineIndent = _lineIndent;
              break;
            }
          }
          if (hasPendingContent) {
            captureSegment(state, captureStart, captureEnd, false);
            writeFoldedLines(state, state.line - _line);
            captureStart = captureEnd = state.position;
            hasPendingContent = false;
          }
          if (!is_WHITE_SPACE(ch)) {
            captureEnd = state.position + 1;
          }
          ch = state.input.charCodeAt(++state.position);
        }
        captureSegment(state, captureStart, captureEnd, false);
        if (state.result) {
          return true;
        }
        state.kind = _kind;
        state.result = _result;
        return false;
      }
      function readSingleQuotedScalar(state, nodeIndent) {
        var ch, captureStart, captureEnd;
        ch = state.input.charCodeAt(state.position);
        if (ch !== 39) {
          return false;
        }
        state.kind = "scalar";
        state.result = "";
        state.position++;
        captureStart = captureEnd = state.position;
        while ((ch = state.input.charCodeAt(state.position)) !== 0) {
          if (ch === 39) {
            captureSegment(state, captureStart, state.position, true);
            ch = state.input.charCodeAt(++state.position);
            if (ch === 39) {
              captureStart = state.position;
              state.position++;
              captureEnd = state.position;
            } else {
              return true;
            }
          } else if (is_EOL(ch)) {
            captureSegment(state, captureStart, captureEnd, true);
            writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
            captureStart = captureEnd = state.position;
          } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
            throwError(state, "unexpected end of the document within a single quoted scalar");
          } else {
            state.position++;
            captureEnd = state.position;
          }
        }
        throwError(state, "unexpected end of the stream within a single quoted scalar");
      }
      function readDoubleQuotedScalar(state, nodeIndent) {
        var captureStart, captureEnd, hexLength, hexResult, tmp, ch;
        ch = state.input.charCodeAt(state.position);
        if (ch !== 34) {
          return false;
        }
        state.kind = "scalar";
        state.result = "";
        state.position++;
        captureStart = captureEnd = state.position;
        while ((ch = state.input.charCodeAt(state.position)) !== 0) {
          if (ch === 34) {
            captureSegment(state, captureStart, state.position, true);
            state.position++;
            return true;
          } else if (ch === 92) {
            captureSegment(state, captureStart, state.position, true);
            ch = state.input.charCodeAt(++state.position);
            if (is_EOL(ch)) {
              skipSeparationSpace(state, false, nodeIndent);
            } else if (ch < 256 && simpleEscapeCheck[ch]) {
              state.result += simpleEscapeMap[ch];
              state.position++;
            } else if ((tmp = escapedHexLen(ch)) > 0) {
              hexLength = tmp;
              hexResult = 0;
              for (; hexLength > 0; hexLength--) {
                ch = state.input.charCodeAt(++state.position);
                if ((tmp = fromHexCode(ch)) >= 0) {
                  hexResult = (hexResult << 4) + tmp;
                } else {
                  throwError(state, "expected hexadecimal character");
                }
              }
              state.result += charFromCodepoint(hexResult);
              state.position++;
            } else {
              throwError(state, "unknown escape sequence");
            }
            captureStart = captureEnd = state.position;
          } else if (is_EOL(ch)) {
            captureSegment(state, captureStart, captureEnd, true);
            writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
            captureStart = captureEnd = state.position;
          } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
            throwError(state, "unexpected end of the document within a double quoted scalar");
          } else {
            state.position++;
            captureEnd = state.position;
          }
        }
        throwError(state, "unexpected end of the stream within a double quoted scalar");
      }
      function readFlowCollection(state, nodeIndent) {
        var readNext = true, _line, _tag2 = state.tag, _result, _anchor = state.anchor, following, terminator, isPair, isExplicitPair, isMapping, overridableKeys = {}, keyNode, keyTag, valueNode, ch;
        ch = state.input.charCodeAt(state.position);
        if (ch === 91) {
          terminator = 93;
          isMapping = false;
          _result = [];
        } else if (ch === 123) {
          terminator = 125;
          isMapping = true;
          _result = {};
        } else {
          return false;
        }
        if (state.anchor !== null) {
          state.anchorMap[state.anchor] = _result;
        }
        ch = state.input.charCodeAt(++state.position);
        while (ch !== 0) {
          skipSeparationSpace(state, true, nodeIndent);
          ch = state.input.charCodeAt(state.position);
          if (ch === terminator) {
            state.position++;
            state.tag = _tag2;
            state.anchor = _anchor;
            state.kind = isMapping ? "mapping" : "sequence";
            state.result = _result;
            return true;
          } else if (!readNext) {
            throwError(state, "missed comma between flow collection entries");
          }
          keyTag = keyNode = valueNode = null;
          isPair = isExplicitPair = false;
          if (ch === 63) {
            following = state.input.charCodeAt(state.position + 1);
            if (is_WS_OR_EOL(following)) {
              isPair = isExplicitPair = true;
              state.position++;
              skipSeparationSpace(state, true, nodeIndent);
            }
          }
          _line = state.line;
          composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
          keyTag = state.tag;
          keyNode = state.result;
          skipSeparationSpace(state, true, nodeIndent);
          ch = state.input.charCodeAt(state.position);
          if ((isExplicitPair || state.line === _line) && ch === 58) {
            isPair = true;
            ch = state.input.charCodeAt(++state.position);
            skipSeparationSpace(state, true, nodeIndent);
            composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
            valueNode = state.result;
          }
          if (isMapping) {
            storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode);
          } else if (isPair) {
            _result.push(storeMappingPair(state, null, overridableKeys, keyTag, keyNode, valueNode));
          } else {
            _result.push(keyNode);
          }
          skipSeparationSpace(state, true, nodeIndent);
          ch = state.input.charCodeAt(state.position);
          if (ch === 44) {
            readNext = true;
            ch = state.input.charCodeAt(++state.position);
          } else {
            readNext = false;
          }
        }
        throwError(state, "unexpected end of the stream within a flow collection");
      }
      function readBlockScalar(state, nodeIndent) {
        var captureStart, folding, chomping = CHOMPING_CLIP, didReadContent = false, detectedIndent = false, textIndent = nodeIndent, emptyLines = 0, atMoreIndented = false, tmp, ch;
        ch = state.input.charCodeAt(state.position);
        if (ch === 124) {
          folding = false;
        } else if (ch === 62) {
          folding = true;
        } else {
          return false;
        }
        state.kind = "scalar";
        state.result = "";
        while (ch !== 0) {
          ch = state.input.charCodeAt(++state.position);
          if (ch === 43 || ch === 45) {
            if (CHOMPING_CLIP === chomping) {
              chomping = ch === 43 ? CHOMPING_KEEP : CHOMPING_STRIP;
            } else {
              throwError(state, "repeat of a chomping mode identifier");
            }
          } else if ((tmp = fromDecimalCode(ch)) >= 0) {
            if (tmp === 0) {
              throwError(state, "bad explicit indentation width of a block scalar; it cannot be less than one");
            } else if (!detectedIndent) {
              textIndent = nodeIndent + tmp - 1;
              detectedIndent = true;
            } else {
              throwError(state, "repeat of an indentation width identifier");
            }
          } else {
            break;
          }
        }
        if (is_WHITE_SPACE(ch)) {
          do {
            ch = state.input.charCodeAt(++state.position);
          } while (is_WHITE_SPACE(ch));
          if (ch === 35) {
            do {
              ch = state.input.charCodeAt(++state.position);
            } while (!is_EOL(ch) && ch !== 0);
          }
        }
        while (ch !== 0) {
          readLineBreak(state);
          state.lineIndent = 0;
          ch = state.input.charCodeAt(state.position);
          while ((!detectedIndent || state.lineIndent < textIndent) && ch === 32) {
            state.lineIndent++;
            ch = state.input.charCodeAt(++state.position);
          }
          if (!detectedIndent && state.lineIndent > textIndent) {
            textIndent = state.lineIndent;
          }
          if (is_EOL(ch)) {
            emptyLines++;
            continue;
          }
          if (state.lineIndent < textIndent) {
            if (chomping === CHOMPING_KEEP) {
              state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
            } else if (chomping === CHOMPING_CLIP) {
              if (didReadContent) {
                state.result += "\n";
              }
            }
            break;
          }
          if (folding) {
            if (is_WHITE_SPACE(ch)) {
              atMoreIndented = true;
              state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
            } else if (atMoreIndented) {
              atMoreIndented = false;
              state.result += common.repeat("\n", emptyLines + 1);
            } else if (emptyLines === 0) {
              if (didReadContent) {
                state.result += " ";
              }
            } else {
              state.result += common.repeat("\n", emptyLines);
            }
          } else {
            state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
          }
          didReadContent = true;
          detectedIndent = true;
          emptyLines = 0;
          captureStart = state.position;
          while (!is_EOL(ch) && ch !== 0) {
            ch = state.input.charCodeAt(++state.position);
          }
          captureSegment(state, captureStart, state.position, false);
        }
        return true;
      }
      function readBlockSequence(state, nodeIndent) {
        var _line, _tag2 = state.tag, _anchor = state.anchor, _result = [], following, detected = false, ch;
        if (state.anchor !== null) {
          state.anchorMap[state.anchor] = _result;
        }
        ch = state.input.charCodeAt(state.position);
        while (ch !== 0) {
          if (ch !== 45) {
            break;
          }
          following = state.input.charCodeAt(state.position + 1);
          if (!is_WS_OR_EOL(following)) {
            break;
          }
          detected = true;
          state.position++;
          if (skipSeparationSpace(state, true, -1)) {
            if (state.lineIndent <= nodeIndent) {
              _result.push(null);
              ch = state.input.charCodeAt(state.position);
              continue;
            }
          }
          _line = state.line;
          composeNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
          _result.push(state.result);
          skipSeparationSpace(state, true, -1);
          ch = state.input.charCodeAt(state.position);
          if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) {
            throwError(state, "bad indentation of a sequence entry");
          } else if (state.lineIndent < nodeIndent) {
            break;
          }
        }
        if (detected) {
          state.tag = _tag2;
          state.anchor = _anchor;
          state.kind = "sequence";
          state.result = _result;
          return true;
        }
        return false;
      }
      function readBlockMapping(state, nodeIndent, flowIndent) {
        var following, allowCompact, _line, _pos, _tag2 = state.tag, _anchor = state.anchor, _result = {}, overridableKeys = {}, keyTag = null, keyNode = null, valueNode = null, atExplicitKey = false, detected = false, ch;
        if (state.anchor !== null) {
          state.anchorMap[state.anchor] = _result;
        }
        ch = state.input.charCodeAt(state.position);
        while (ch !== 0) {
          following = state.input.charCodeAt(state.position + 1);
          _line = state.line;
          _pos = state.position;
          if ((ch === 63 || ch === 58) && is_WS_OR_EOL(following)) {
            if (ch === 63) {
              if (atExplicitKey) {
                storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
                keyTag = keyNode = valueNode = null;
              }
              detected = true;
              atExplicitKey = true;
              allowCompact = true;
            } else if (atExplicitKey) {
              atExplicitKey = false;
              allowCompact = true;
            } else {
              throwError(state, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line");
            }
            state.position += 1;
            ch = following;
          } else if (composeNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) {
            if (state.line === _line) {
              ch = state.input.charCodeAt(state.position);
              while (is_WHITE_SPACE(ch)) {
                ch = state.input.charCodeAt(++state.position);
              }
              if (ch === 58) {
                ch = state.input.charCodeAt(++state.position);
                if (!is_WS_OR_EOL(ch)) {
                  throwError(state, "a whitespace character is expected after the key-value separator within a block mapping");
                }
                if (atExplicitKey) {
                  storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
                  keyTag = keyNode = valueNode = null;
                }
                detected = true;
                atExplicitKey = false;
                allowCompact = false;
                keyTag = state.tag;
                keyNode = state.result;
              } else if (detected) {
                throwError(state, "can not read an implicit mapping pair; a colon is missed");
              } else {
                state.tag = _tag2;
                state.anchor = _anchor;
                return true;
              }
            } else if (detected) {
              throwError(state, "can not read a block mapping entry; a multiline key may not be an implicit key");
            } else {
              state.tag = _tag2;
              state.anchor = _anchor;
              return true;
            }
          } else {
            break;
          }
          if (state.line === _line || state.lineIndent > nodeIndent) {
            if (composeNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, allowCompact)) {
              if (atExplicitKey) {
                keyNode = state.result;
              } else {
                valueNode = state.result;
              }
            }
            if (!atExplicitKey) {
              storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _line, _pos);
              keyTag = keyNode = valueNode = null;
            }
            skipSeparationSpace(state, true, -1);
            ch = state.input.charCodeAt(state.position);
          }
          if (state.lineIndent > nodeIndent && ch !== 0) {
            throwError(state, "bad indentation of a mapping entry");
          } else if (state.lineIndent < nodeIndent) {
            break;
          }
        }
        if (atExplicitKey) {
          storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
        }
        if (detected) {
          state.tag = _tag2;
          state.anchor = _anchor;
          state.kind = "mapping";
          state.result = _result;
        }
        return detected;
      }
      function readTagProperty(state) {
        var _position, isVerbatim = false, isNamed = false, tagHandle, tagName, ch;
        ch = state.input.charCodeAt(state.position);
        if (ch !== 33) return false;
        if (state.tag !== null) {
          throwError(state, "duplication of a tag property");
        }
        ch = state.input.charCodeAt(++state.position);
        if (ch === 60) {
          isVerbatim = true;
          ch = state.input.charCodeAt(++state.position);
        } else if (ch === 33) {
          isNamed = true;
          tagHandle = "!!";
          ch = state.input.charCodeAt(++state.position);
        } else {
          tagHandle = "!";
        }
        _position = state.position;
        if (isVerbatim) {
          do {
            ch = state.input.charCodeAt(++state.position);
          } while (ch !== 0 && ch !== 62);
          if (state.position < state.length) {
            tagName = state.input.slice(_position, state.position);
            ch = state.input.charCodeAt(++state.position);
          } else {
            throwError(state, "unexpected end of the stream within a verbatim tag");
          }
        } else {
          while (ch !== 0 && !is_WS_OR_EOL(ch)) {
            if (ch === 33) {
              if (!isNamed) {
                tagHandle = state.input.slice(_position - 1, state.position + 1);
                if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
                  throwError(state, "named tag handle cannot contain such characters");
                }
                isNamed = true;
                _position = state.position + 1;
              } else {
                throwError(state, "tag suffix cannot contain exclamation marks");
              }
            }
            ch = state.input.charCodeAt(++state.position);
          }
          tagName = state.input.slice(_position, state.position);
          if (PATTERN_FLOW_INDICATORS.test(tagName)) {
            throwError(state, "tag suffix cannot contain flow indicator characters");
          }
        }
        if (tagName && !PATTERN_TAG_URI.test(tagName)) {
          throwError(state, "tag name cannot contain such characters: " + tagName);
        }
        if (isVerbatim) {
          state.tag = tagName;
        } else if (_hasOwnProperty.call(state.tagMap, tagHandle)) {
          state.tag = state.tagMap[tagHandle] + tagName;
        } else if (tagHandle === "!") {
          state.tag = "!" + tagName;
        } else if (tagHandle === "!!") {
          state.tag = "tag:yaml.org,2002:" + tagName;
        } else {
          throwError(state, 'undeclared tag handle "' + tagHandle + '"');
        }
        return true;
      }
      function readAnchorProperty(state) {
        var _position, ch;
        ch = state.input.charCodeAt(state.position);
        if (ch !== 38) return false;
        if (state.anchor !== null) {
          throwError(state, "duplication of an anchor property");
        }
        ch = state.input.charCodeAt(++state.position);
        _position = state.position;
        while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }
        if (state.position === _position) {
          throwError(state, "name of an anchor node must contain at least one character");
        }
        state.anchor = state.input.slice(_position, state.position);
        return true;
      }
      function readAlias(state) {
        var _position, alias, ch;
        ch = state.input.charCodeAt(state.position);
        if (ch !== 42) return false;
        ch = state.input.charCodeAt(++state.position);
        _position = state.position;
        while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }
        if (state.position === _position) {
          throwError(state, "name of an alias node must contain at least one character");
        }
        alias = state.input.slice(_position, state.position);
        if (!_hasOwnProperty.call(state.anchorMap, alias)) {
          throwError(state, 'unidentified alias "' + alias + '"');
        }
        state.result = state.anchorMap[alias];
        skipSeparationSpace(state, true, -1);
        return true;
      }
      function composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
        var allowBlockStyles, allowBlockScalars, allowBlockCollections, indentStatus = 1, atNewLine = false, hasContent = false, typeIndex, typeQuantity, type, flowIndent, blockIndent;
        if (state.listener !== null) {
          state.listener("open", state);
        }
        state.tag = null;
        state.anchor = null;
        state.kind = null;
        state.result = null;
        allowBlockStyles = allowBlockScalars = allowBlockCollections = CONTEXT_BLOCK_OUT === nodeContext || CONTEXT_BLOCK_IN === nodeContext;
        if (allowToSeek) {
          if (skipSeparationSpace(state, true, -1)) {
            atNewLine = true;
            if (state.lineIndent > parentIndent) {
              indentStatus = 1;
            } else if (state.lineIndent === parentIndent) {
              indentStatus = 0;
            } else if (state.lineIndent < parentIndent) {
              indentStatus = -1;
            }
          }
        }
        if (indentStatus === 1) {
          while (readTagProperty(state) || readAnchorProperty(state)) {
            if (skipSeparationSpace(state, true, -1)) {
              atNewLine = true;
              allowBlockCollections = allowBlockStyles;
              if (state.lineIndent > parentIndent) {
                indentStatus = 1;
              } else if (state.lineIndent === parentIndent) {
                indentStatus = 0;
              } else if (state.lineIndent < parentIndent) {
                indentStatus = -1;
              }
            } else {
              allowBlockCollections = false;
            }
          }
        }
        if (allowBlockCollections) {
          allowBlockCollections = atNewLine || allowCompact;
        }
        if (indentStatus === 1 || CONTEXT_BLOCK_OUT === nodeContext) {
          if (CONTEXT_FLOW_IN === nodeContext || CONTEXT_FLOW_OUT === nodeContext) {
            flowIndent = parentIndent;
          } else {
            flowIndent = parentIndent + 1;
          }
          blockIndent = state.position - state.lineStart;
          if (indentStatus === 1) {
            if (allowBlockCollections && (readBlockSequence(state, blockIndent) || readBlockMapping(state, blockIndent, flowIndent)) || readFlowCollection(state, flowIndent)) {
              hasContent = true;
            } else {
              if (allowBlockScalars && readBlockScalar(state, flowIndent) || readSingleQuotedScalar(state, flowIndent) || readDoubleQuotedScalar(state, flowIndent)) {
                hasContent = true;
              } else if (readAlias(state)) {
                hasContent = true;
                if (state.tag !== null || state.anchor !== null) {
                  throwError(state, "alias node should not have any properties");
                }
              } else if (readPlainScalar(state, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
                hasContent = true;
                if (state.tag === null) {
                  state.tag = "?";
                }
              }
              if (state.anchor !== null) {
                state.anchorMap[state.anchor] = state.result;
              }
            }
          } else if (indentStatus === 0) {
            hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
          }
        }
        if (state.tag !== null && state.tag !== "!") {
          if (state.tag === "?") {
            if (state.result !== null && state.kind !== "scalar") {
              throwError(state, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + state.kind + '"');
            }
            for (typeIndex = 0, typeQuantity = state.implicitTypes.length; typeIndex < typeQuantity; typeIndex += 1) {
              type = state.implicitTypes[typeIndex];
              if (type.resolve(state.result)) {
                state.result = type.construct(state.result);
                state.tag = type.tag;
                if (state.anchor !== null) {
                  state.anchorMap[state.anchor] = state.result;
                }
                break;
              }
            }
          } else if (_hasOwnProperty.call(state.typeMap[state.kind || "fallback"], state.tag)) {
            type = state.typeMap[state.kind || "fallback"][state.tag];
            if (state.result !== null && type.kind !== state.kind) {
              throwError(state, "unacceptable node kind for !<" + state.tag + '> tag; it should be "' + type.kind + '", not "' + state.kind + '"');
            }
            if (!type.resolve(state.result)) {
              throwError(state, "cannot resolve a node with !<" + state.tag + "> explicit tag");
            } else {
              state.result = type.construct(state.result);
              if (state.anchor !== null) {
                state.anchorMap[state.anchor] = state.result;
              }
            }
          } else {
            throwError(state, "unknown tag !<" + state.tag + ">");
          }
        }
        if (state.listener !== null) {
          state.listener("close", state);
        }
        return state.tag !== null || state.anchor !== null || hasContent;
      }
      function readDocument(state) {
        var documentStart = state.position, _position, directiveName, directiveArgs, hasDirectives = false, ch;
        state.version = null;
        state.checkLineBreaks = state.legacy;
        state.tagMap = {};
        state.anchorMap = {};
        while ((ch = state.input.charCodeAt(state.position)) !== 0) {
          skipSeparationSpace(state, true, -1);
          ch = state.input.charCodeAt(state.position);
          if (state.lineIndent > 0 || ch !== 37) {
            break;
          }
          hasDirectives = true;
          ch = state.input.charCodeAt(++state.position);
          _position = state.position;
          while (ch !== 0 && !is_WS_OR_EOL(ch)) {
            ch = state.input.charCodeAt(++state.position);
          }
          directiveName = state.input.slice(_position, state.position);
          directiveArgs = [];
          if (directiveName.length < 1) {
            throwError(state, "directive name must not be less than one character in length");
          }
          while (ch !== 0) {
            while (is_WHITE_SPACE(ch)) {
              ch = state.input.charCodeAt(++state.position);
            }
            if (ch === 35) {
              do {
                ch = state.input.charCodeAt(++state.position);
              } while (ch !== 0 && !is_EOL(ch));
              break;
            }
            if (is_EOL(ch)) break;
            _position = state.position;
            while (ch !== 0 && !is_WS_OR_EOL(ch)) {
              ch = state.input.charCodeAt(++state.position);
            }
            directiveArgs.push(state.input.slice(_position, state.position));
          }
          if (ch !== 0) readLineBreak(state);
          if (_hasOwnProperty.call(directiveHandlers, directiveName)) {
            directiveHandlers[directiveName](state, directiveName, directiveArgs);
          } else {
            throwWarning(state, 'unknown document directive "' + directiveName + '"');
          }
        }
        skipSeparationSpace(state, true, -1);
        if (state.lineIndent === 0 && state.input.charCodeAt(state.position) === 45 && state.input.charCodeAt(state.position + 1) === 45 && state.input.charCodeAt(state.position + 2) === 45) {
          state.position += 3;
          skipSeparationSpace(state, true, -1);
        } else if (hasDirectives) {
          throwError(state, "directives end mark is expected");
        }
        composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
        skipSeparationSpace(state, true, -1);
        if (state.checkLineBreaks && PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) {
          throwWarning(state, "non-ASCII line breaks are interpreted as content");
        }
        state.documents.push(state.result);
        if (state.position === state.lineStart && testDocumentSeparator(state)) {
          if (state.input.charCodeAt(state.position) === 46) {
            state.position += 3;
            skipSeparationSpace(state, true, -1);
          }
          return;
        }
        if (state.position < state.length - 1) {
          throwError(state, "end of the stream or a document separator is expected");
        } else {
          return;
        }
      }
      function loadDocuments(input, options3) {
        input = String(input);
        options3 = options3 || {};
        if (input.length !== 0) {
          if (input.charCodeAt(input.length - 1) !== 10 && input.charCodeAt(input.length - 1) !== 13) {
            input += "\n";
          }
          if (input.charCodeAt(0) === 65279) {
            input = input.slice(1);
          }
        }
        var state = new State(input, options3);
        var nullpos = input.indexOf("\0");
        if (nullpos !== -1) {
          state.position = nullpos;
          throwError(state, "null byte is not allowed in input");
        }
        state.input += "\0";
        while (state.input.charCodeAt(state.position) === 32) {
          state.lineIndent += 1;
          state.position += 1;
        }
        while (state.position < state.length - 1) {
          readDocument(state);
        }
        return state.documents;
      }
      function loadAll(input, iterator, options3) {
        if (iterator !== null && typeof iterator === "object" && typeof options3 === "undefined") {
          options3 = iterator;
          iterator = null;
        }
        var documents = loadDocuments(input, options3);
        if (typeof iterator !== "function") {
          return documents;
        }
        for (var index = 0, length = documents.length; index < length; index += 1) {
          iterator(documents[index]);
        }
      }
      function load(input, options3) {
        var documents = loadDocuments(input, options3);
        if (documents.length === 0) {
          return void 0;
        } else if (documents.length === 1) {
          return documents[0];
        }
        throw new YAMLException("expected a single document in the stream, but found more");
      }
      function safeLoadAll(input, iterator, options3) {
        if (typeof iterator === "object" && iterator !== null && typeof options3 === "undefined") {
          options3 = iterator;
          iterator = null;
        }
        return loadAll(input, iterator, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options3));
      }
      function safeLoad(input, options3) {
        return load(input, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options3));
      }
      module2.exports.loadAll = loadAll;
      module2.exports.load = load;
      module2.exports.safeLoadAll = safeLoadAll;
      module2.exports.safeLoad = safeLoad;
    }
  });

  // node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/dumper.js
  var require_dumper = __commonJS({
    "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/dumper.js"(exports2, module2) {
      "use strict";
      var common = require_common();
      var YAMLException = require_exception();
      var DEFAULT_FULL_SCHEMA = require_default_full();
      var DEFAULT_SAFE_SCHEMA = require_default_safe();
      var _toString = Object.prototype.toString;
      var _hasOwnProperty = Object.prototype.hasOwnProperty;
      var CHAR_TAB = 9;
      var CHAR_LINE_FEED = 10;
      var CHAR_CARRIAGE_RETURN = 13;
      var CHAR_SPACE = 32;
      var CHAR_EXCLAMATION = 33;
      var CHAR_DOUBLE_QUOTE = 34;
      var CHAR_SHARP = 35;
      var CHAR_PERCENT = 37;
      var CHAR_AMPERSAND = 38;
      var CHAR_SINGLE_QUOTE = 39;
      var CHAR_ASTERISK = 42;
      var CHAR_COMMA = 44;
      var CHAR_MINUS = 45;
      var CHAR_COLON = 58;
      var CHAR_EQUALS = 61;
      var CHAR_GREATER_THAN = 62;
      var CHAR_QUESTION = 63;
      var CHAR_COMMERCIAL_AT = 64;
      var CHAR_LEFT_SQUARE_BRACKET = 91;
      var CHAR_RIGHT_SQUARE_BRACKET = 93;
      var CHAR_GRAVE_ACCENT = 96;
      var CHAR_LEFT_CURLY_BRACKET = 123;
      var CHAR_VERTICAL_LINE = 124;
      var CHAR_RIGHT_CURLY_BRACKET = 125;
      var ESCAPE_SEQUENCES = {};
      ESCAPE_SEQUENCES[0] = "\\0";
      ESCAPE_SEQUENCES[7] = "\\a";
      ESCAPE_SEQUENCES[8] = "\\b";
      ESCAPE_SEQUENCES[9] = "\\t";
      ESCAPE_SEQUENCES[10] = "\\n";
      ESCAPE_SEQUENCES[11] = "\\v";
      ESCAPE_SEQUENCES[12] = "\\f";
      ESCAPE_SEQUENCES[13] = "\\r";
      ESCAPE_SEQUENCES[27] = "\\e";
      ESCAPE_SEQUENCES[34] = '\\"';
      ESCAPE_SEQUENCES[92] = "\\\\";
      ESCAPE_SEQUENCES[133] = "\\N";
      ESCAPE_SEQUENCES[160] = "\\_";
      ESCAPE_SEQUENCES[8232] = "\\L";
      ESCAPE_SEQUENCES[8233] = "\\P";
      var DEPRECATED_BOOLEANS_SYNTAX = [
        "y",
        "Y",
        "yes",
        "Yes",
        "YES",
        "on",
        "On",
        "ON",
        "n",
        "N",
        "no",
        "No",
        "NO",
        "off",
        "Off",
        "OFF"
      ];
      function compileStyleMap(schema, map) {
        var result, keys, index, length, tag2, style, type;
        if (map === null) return {};
        result = {};
        keys = Object.keys(map);
        for (index = 0, length = keys.length; index < length; index += 1) {
          tag2 = keys[index];
          style = String(map[tag2]);
          if (tag2.slice(0, 2) === "!!") {
            tag2 = "tag:yaml.org,2002:" + tag2.slice(2);
          }
          type = schema.compiledTypeMap["fallback"][tag2];
          if (type && _hasOwnProperty.call(type.styleAliases, style)) {
            style = type.styleAliases[style];
          }
          result[tag2] = style;
        }
        return result;
      }
      function encodeHex(character) {
        var string, handle, length;
        string = character.toString(16).toUpperCase();
        if (character <= 255) {
          handle = "x";
          length = 2;
        } else if (character <= 65535) {
          handle = "u";
          length = 4;
        } else if (character <= 4294967295) {
          handle = "U";
          length = 8;
        } else {
          throw new YAMLException("code point within a string may not be greater than 0xFFFFFFFF");
        }
        return "\\" + handle + common.repeat("0", length - string.length) + string;
      }
      function State(options3) {
        this.schema = options3["schema"] || DEFAULT_FULL_SCHEMA;
        this.indent = Math.max(1, options3["indent"] || 2);
        this.noArrayIndent = options3["noArrayIndent"] || false;
        this.skipInvalid = options3["skipInvalid"] || false;
        this.flowLevel = common.isNothing(options3["flowLevel"]) ? -1 : options3["flowLevel"];
        this.styleMap = compileStyleMap(this.schema, options3["styles"] || null);
        this.sortKeys = options3["sortKeys"] || false;
        this.lineWidth = options3["lineWidth"] || 80;
        this.noRefs = options3["noRefs"] || false;
        this.noCompatMode = options3["noCompatMode"] || false;
        this.condenseFlow = options3["condenseFlow"] || false;
        this.implicitTypes = this.schema.compiledImplicit;
        this.explicitTypes = this.schema.compiledExplicit;
        this.tag = null;
        this.result = "";
        this.duplicates = [];
        this.usedDuplicates = null;
      }
      function indentString(string, spaces) {
        var ind = common.repeat(" ", spaces), position = 0, next = -1, result = "", line, length = string.length;
        while (position < length) {
          next = string.indexOf("\n", position);
          if (next === -1) {
            line = string.slice(position);
            position = length;
          } else {
            line = string.slice(position, next + 1);
            position = next + 1;
          }
          if (line.length && line !== "\n") result += ind;
          result += line;
        }
        return result;
      }
      function generateNextLine(state, level) {
        return "\n" + common.repeat(" ", state.indent * level);
      }
      function testImplicitResolving(state, str2) {
        var index, length, type;
        for (index = 0, length = state.implicitTypes.length; index < length; index += 1) {
          type = state.implicitTypes[index];
          if (type.resolve(str2)) {
            return true;
          }
        }
        return false;
      }
      function isWhitespace(c) {
        return c === CHAR_SPACE || c === CHAR_TAB;
      }
      function isPrintable(c) {
        return 32 <= c && c <= 126 || 161 <= c && c <= 55295 && c !== 8232 && c !== 8233 || 57344 <= c && c <= 65533 && c !== 65279 || 65536 <= c && c <= 1114111;
      }
      function isNsChar(c) {
        return isPrintable(c) && !isWhitespace(c) && c !== 65279 && c !== CHAR_CARRIAGE_RETURN && c !== CHAR_LINE_FEED;
      }
      function isPlainSafe(c, prev) {
        return isPrintable(c) && c !== 65279 && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET && c !== CHAR_COLON && (c !== CHAR_SHARP || prev && isNsChar(prev));
      }
      function isPlainSafeFirst(c) {
        return isPrintable(c) && c !== 65279 && !isWhitespace(c) && c !== CHAR_MINUS && c !== CHAR_QUESTION && c !== CHAR_COLON && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET && c !== CHAR_SHARP && c !== CHAR_AMPERSAND && c !== CHAR_ASTERISK && c !== CHAR_EXCLAMATION && c !== CHAR_VERTICAL_LINE && c !== CHAR_EQUALS && c !== CHAR_GREATER_THAN && c !== CHAR_SINGLE_QUOTE && c !== CHAR_DOUBLE_QUOTE && c !== CHAR_PERCENT && c !== CHAR_COMMERCIAL_AT && c !== CHAR_GRAVE_ACCENT;
      }
      function needIndentIndicator(string) {
        var leadingSpaceRe = /^\n* /;
        return leadingSpaceRe.test(string);
      }
      var STYLE_PLAIN = 1;
      var STYLE_SINGLE = 2;
      var STYLE_LITERAL = 3;
      var STYLE_FOLDED = 4;
      var STYLE_DOUBLE = 5;
      function chooseScalarStyle(string, singleLineOnly, indentPerLevel, lineWidth, testAmbiguousType) {
        var i;
        var char, prev_char;
        var hasLineBreak = false;
        var hasFoldableLine = false;
        var shouldTrackWidth = lineWidth !== -1;
        var previousLineBreak = -1;
        var plain = isPlainSafeFirst(string.charCodeAt(0)) && !isWhitespace(string.charCodeAt(string.length - 1));
        if (singleLineOnly) {
          for (i = 0; i < string.length; i++) {
            char = string.charCodeAt(i);
            if (!isPrintable(char)) {
              return STYLE_DOUBLE;
            }
            prev_char = i > 0 ? string.charCodeAt(i - 1) : null;
            plain = plain && isPlainSafe(char, prev_char);
          }
        } else {
          for (i = 0; i < string.length; i++) {
            char = string.charCodeAt(i);
            if (char === CHAR_LINE_FEED) {
              hasLineBreak = true;
              if (shouldTrackWidth) {
                hasFoldableLine = hasFoldableLine || // Foldable line = too long, and not more-indented.
                i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ";
                previousLineBreak = i;
              }
            } else if (!isPrintable(char)) {
              return STYLE_DOUBLE;
            }
            prev_char = i > 0 ? string.charCodeAt(i - 1) : null;
            plain = plain && isPlainSafe(char, prev_char);
          }
          hasFoldableLine = hasFoldableLine || shouldTrackWidth && (i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ");
        }
        if (!hasLineBreak && !hasFoldableLine) {
          return plain && !testAmbiguousType(string) ? STYLE_PLAIN : STYLE_SINGLE;
        }
        if (indentPerLevel > 9 && needIndentIndicator(string)) {
          return STYLE_DOUBLE;
        }
        return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
      }
      function writeScalar(state, string, level, iskey) {
        state.dump = function() {
          if (string.length === 0) {
            return "''";
          }
          if (!state.noCompatMode && DEPRECATED_BOOLEANS_SYNTAX.indexOf(string) !== -1) {
            return "'" + string + "'";
          }
          var indent = state.indent * Math.max(1, level);
          var lineWidth = state.lineWidth === -1 ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);
          var singleLineOnly = iskey || state.flowLevel > -1 && level >= state.flowLevel;
          function testAmbiguity(string2) {
            return testImplicitResolving(state, string2);
          }
          switch (chooseScalarStyle(string, singleLineOnly, state.indent, lineWidth, testAmbiguity)) {
            case STYLE_PLAIN:
              return string;
            case STYLE_SINGLE:
              return "'" + string.replace(/'/g, "''") + "'";
            case STYLE_LITERAL:
              return "|" + blockHeader(string, state.indent) + dropEndingNewline(indentString(string, indent));
            case STYLE_FOLDED:
              return ">" + blockHeader(string, state.indent) + dropEndingNewline(indentString(foldString(string, lineWidth), indent));
            case STYLE_DOUBLE:
              return '"' + escapeString(string, lineWidth) + '"';
            default:
              throw new YAMLException("impossible error: invalid scalar style");
          }
        }();
      }
      function blockHeader(string, indentPerLevel) {
        var indentIndicator = needIndentIndicator(string) ? String(indentPerLevel) : "";
        var clip = string[string.length - 1] === "\n";
        var keep = clip && (string[string.length - 2] === "\n" || string === "\n");
        var chomp = keep ? "+" : clip ? "" : "-";
        return indentIndicator + chomp + "\n";
      }
      function dropEndingNewline(string) {
        return string[string.length - 1] === "\n" ? string.slice(0, -1) : string;
      }
      function foldString(string, width) {
        var lineRe = /(\n+)([^\n]*)/g;
        var result = function() {
          var nextLF = string.indexOf("\n");
          nextLF = nextLF !== -1 ? nextLF : string.length;
          lineRe.lastIndex = nextLF;
          return foldLine(string.slice(0, nextLF), width);
        }();
        var prevMoreIndented = string[0] === "\n" || string[0] === " ";
        var moreIndented;
        var match;
        while (match = lineRe.exec(string)) {
          var prefix = match[1], line = match[2];
          moreIndented = line[0] === " ";
          result += prefix + (!prevMoreIndented && !moreIndented && line !== "" ? "\n" : "") + foldLine(line, width);
          prevMoreIndented = moreIndented;
        }
        return result;
      }
      function foldLine(line, width) {
        if (line === "" || line[0] === " ") return line;
        var breakRe = / [^ ]/g;
        var match;
        var start = 0, end, curr = 0, next = 0;
        var result = "";
        while (match = breakRe.exec(line)) {
          next = match.index;
          if (next - start > width) {
            end = curr > start ? curr : next;
            result += "\n" + line.slice(start, end);
            start = end + 1;
          }
          curr = next;
        }
        result += "\n";
        if (line.length - start > width && curr > start) {
          result += line.slice(start, curr) + "\n" + line.slice(curr + 1);
        } else {
          result += line.slice(start);
        }
        return result.slice(1);
      }
      function escapeString(string) {
        var result = "";
        var char, nextChar;
        var escapeSeq;
        for (var i = 0; i < string.length; i++) {
          char = string.charCodeAt(i);
          if (char >= 55296 && char <= 56319) {
            nextChar = string.charCodeAt(i + 1);
            if (nextChar >= 56320 && nextChar <= 57343) {
              result += encodeHex((char - 55296) * 1024 + nextChar - 56320 + 65536);
              i++;
              continue;
            }
          }
          escapeSeq = ESCAPE_SEQUENCES[char];
          result += !escapeSeq && isPrintable(char) ? string[i] : escapeSeq || encodeHex(char);
        }
        return result;
      }
      function writeFlowSequence(state, level, object) {
        var _result = "", _tag2 = state.tag, index, length;
        for (index = 0, length = object.length; index < length; index += 1) {
          if (writeNode(state, level, object[index], false, false)) {
            if (index !== 0) _result += "," + (!state.condenseFlow ? " " : "");
            _result += state.dump;
          }
        }
        state.tag = _tag2;
        state.dump = "[" + _result + "]";
      }
      function writeBlockSequence(state, level, object, compact) {
        var _result = "", _tag2 = state.tag, index, length;
        for (index = 0, length = object.length; index < length; index += 1) {
          if (writeNode(state, level + 1, object[index], true, true)) {
            if (!compact || index !== 0) {
              _result += generateNextLine(state, level);
            }
            if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
              _result += "-";
            } else {
              _result += "- ";
            }
            _result += state.dump;
          }
        }
        state.tag = _tag2;
        state.dump = _result || "[]";
      }
      function writeFlowMapping(state, level, object) {
        var _result = "", _tag2 = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, pairBuffer;
        for (index = 0, length = objectKeyList.length; index < length; index += 1) {
          pairBuffer = "";
          if (index !== 0) pairBuffer += ", ";
          if (state.condenseFlow) pairBuffer += '"';
          objectKey = objectKeyList[index];
          objectValue = object[objectKey];
          if (!writeNode(state, level, objectKey, false, false)) {
            continue;
          }
          if (state.dump.length > 1024) pairBuffer += "? ";
          pairBuffer += state.dump + (state.condenseFlow ? '"' : "") + ":" + (state.condenseFlow ? "" : " ");
          if (!writeNode(state, level, objectValue, false, false)) {
            continue;
          }
          pairBuffer += state.dump;
          _result += pairBuffer;
        }
        state.tag = _tag2;
        state.dump = "{" + _result + "}";
      }
      function writeBlockMapping(state, level, object, compact) {
        var _result = "", _tag2 = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, explicitPair, pairBuffer;
        if (state.sortKeys === true) {
          objectKeyList.sort();
        } else if (typeof state.sortKeys === "function") {
          objectKeyList.sort(state.sortKeys);
        } else if (state.sortKeys) {
          throw new YAMLException("sortKeys must be a boolean or a function");
        }
        for (index = 0, length = objectKeyList.length; index < length; index += 1) {
          pairBuffer = "";
          if (!compact || index !== 0) {
            pairBuffer += generateNextLine(state, level);
          }
          objectKey = objectKeyList[index];
          objectValue = object[objectKey];
          if (!writeNode(state, level + 1, objectKey, true, true, true)) {
            continue;
          }
          explicitPair = state.tag !== null && state.tag !== "?" || state.dump && state.dump.length > 1024;
          if (explicitPair) {
            if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
              pairBuffer += "?";
            } else {
              pairBuffer += "? ";
            }
          }
          pairBuffer += state.dump;
          if (explicitPair) {
            pairBuffer += generateNextLine(state, level);
          }
          if (!writeNode(state, level + 1, objectValue, true, explicitPair)) {
            continue;
          }
          if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
            pairBuffer += ":";
          } else {
            pairBuffer += ": ";
          }
          pairBuffer += state.dump;
          _result += pairBuffer;
        }
        state.tag = _tag2;
        state.dump = _result || "{}";
      }
      function detectType(state, object, explicit) {
        var _result, typeList, index, length, type, style;
        typeList = explicit ? state.explicitTypes : state.implicitTypes;
        for (index = 0, length = typeList.length; index < length; index += 1) {
          type = typeList[index];
          if ((type.instanceOf || type.predicate) && (!type.instanceOf || typeof object === "object" && object instanceof type.instanceOf) && (!type.predicate || type.predicate(object))) {
            state.tag = explicit ? type.tag : "?";
            if (type.represent) {
              style = state.styleMap[type.tag] || type.defaultStyle;
              if (_toString.call(type.represent) === "[object Function]") {
                _result = type.represent(object, style);
              } else if (_hasOwnProperty.call(type.represent, style)) {
                _result = type.represent[style](object, style);
              } else {
                throw new YAMLException("!<" + type.tag + '> tag resolver accepts not "' + style + '" style');
              }
              state.dump = _result;
            }
            return true;
          }
        }
        return false;
      }
      function writeNode(state, level, object, block2, compact, iskey) {
        state.tag = null;
        state.dump = object;
        if (!detectType(state, object, false)) {
          detectType(state, object, true);
        }
        var type = _toString.call(state.dump);
        if (block2) {
          block2 = state.flowLevel < 0 || state.flowLevel > level;
        }
        var objectOrArray = type === "[object Object]" || type === "[object Array]", duplicateIndex, duplicate;
        if (objectOrArray) {
          duplicateIndex = state.duplicates.indexOf(object);
          duplicate = duplicateIndex !== -1;
        }
        if (state.tag !== null && state.tag !== "?" || duplicate || state.indent !== 2 && level > 0) {
          compact = false;
        }
        if (duplicate && state.usedDuplicates[duplicateIndex]) {
          state.dump = "*ref_" + duplicateIndex;
        } else {
          if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) {
            state.usedDuplicates[duplicateIndex] = true;
          }
          if (type === "[object Object]") {
            if (block2 && Object.keys(state.dump).length !== 0) {
              writeBlockMapping(state, level, state.dump, compact);
              if (duplicate) {
                state.dump = "&ref_" + duplicateIndex + state.dump;
              }
            } else {
              writeFlowMapping(state, level, state.dump);
              if (duplicate) {
                state.dump = "&ref_" + duplicateIndex + " " + state.dump;
              }
            }
          } else if (type === "[object Array]") {
            var arrayLevel = state.noArrayIndent && level > 0 ? level - 1 : level;
            if (block2 && state.dump.length !== 0) {
              writeBlockSequence(state, arrayLevel, state.dump, compact);
              if (duplicate) {
                state.dump = "&ref_" + duplicateIndex + state.dump;
              }
            } else {
              writeFlowSequence(state, arrayLevel, state.dump);
              if (duplicate) {
                state.dump = "&ref_" + duplicateIndex + " " + state.dump;
              }
            }
          } else if (type === "[object String]") {
            if (state.tag !== "?") {
              writeScalar(state, state.dump, level, iskey);
            }
          } else {
            if (state.skipInvalid) return false;
            throw new YAMLException("unacceptable kind of an object to dump " + type);
          }
          if (state.tag !== null && state.tag !== "?") {
            state.dump = "!<" + state.tag + "> " + state.dump;
          }
        }
        return true;
      }
      function getDuplicateReferences(object, state) {
        var objects = [], duplicatesIndexes = [], index, length;
        inspectNode(object, objects, duplicatesIndexes);
        for (index = 0, length = duplicatesIndexes.length; index < length; index += 1) {
          state.duplicates.push(objects[duplicatesIndexes[index]]);
        }
        state.usedDuplicates = new Array(length);
      }
      function inspectNode(object, objects, duplicatesIndexes) {
        var objectKeyList, index, length;
        if (object !== null && typeof object === "object") {
          index = objects.indexOf(object);
          if (index !== -1) {
            if (duplicatesIndexes.indexOf(index) === -1) {
              duplicatesIndexes.push(index);
            }
          } else {
            objects.push(object);
            if (Array.isArray(object)) {
              for (index = 0, length = object.length; index < length; index += 1) {
                inspectNode(object[index], objects, duplicatesIndexes);
              }
            } else {
              objectKeyList = Object.keys(object);
              for (index = 0, length = objectKeyList.length; index < length; index += 1) {
                inspectNode(object[objectKeyList[index]], objects, duplicatesIndexes);
              }
            }
          }
        }
      }
      function dump(input, options3) {
        options3 = options3 || {};
        var state = new State(options3);
        if (!state.noRefs) getDuplicateReferences(input, state);
        if (writeNode(state, 0, input, true, true)) return state.dump + "\n";
        return "";
      }
      function safeDump(input, options3) {
        return dump(input, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options3));
      }
      module2.exports.dump = dump;
      module2.exports.safeDump = safeDump;
    }
  });

  // node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml.js
  var require_js_yaml = __commonJS({
    "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml.js"(exports2, module2) {
      "use strict";
      var loader = require_loader();
      var dumper = require_dumper();
      function deprecated(name) {
        return function() {
          throw new Error("Function " + name + " is deprecated and cannot be used.");
        };
      }
      module2.exports.Type = require_type();
      module2.exports.Schema = require_schema();
      module2.exports.FAILSAFE_SCHEMA = require_failsafe();
      module2.exports.JSON_SCHEMA = require_json();
      module2.exports.CORE_SCHEMA = require_core();
      module2.exports.DEFAULT_SAFE_SCHEMA = require_default_safe();
      module2.exports.DEFAULT_FULL_SCHEMA = require_default_full();
      module2.exports.load = loader.load;
      module2.exports.loadAll = loader.loadAll;
      module2.exports.safeLoad = loader.safeLoad;
      module2.exports.safeLoadAll = loader.safeLoadAll;
      module2.exports.dump = dumper.dump;
      module2.exports.safeDump = dumper.safeDump;
      module2.exports.YAMLException = require_exception();
      module2.exports.MINIMAL_SCHEMA = require_failsafe();
      module2.exports.SAFE_SCHEMA = require_default_safe();
      module2.exports.DEFAULT_SCHEMA = require_default_full();
      module2.exports.scan = deprecated("scan");
      module2.exports.parse = deprecated("parse");
      module2.exports.compose = deprecated("compose");
      module2.exports.addConstructor = deprecated("addConstructor");
    }
  });

  // node_modules/gray-matter/node_modules/js-yaml/index.js
  var require_js_yaml2 = __commonJS({
    "node_modules/gray-matter/node_modules/js-yaml/index.js"(exports2, module2) {
      "use strict";
      var yaml2 = require_js_yaml();
      module2.exports = yaml2;
    }
  });

  // node_modules/gray-matter/lib/engines.js
  var require_engines = __commonJS({
    "node_modules/gray-matter/lib/engines.js"(exports, module) {
      "use strict";
      var yaml = require_js_yaml2();
      var engines = exports = module.exports;
      engines.yaml = {
        parse: yaml.safeLoad.bind(yaml),
        stringify: yaml.safeDump.bind(yaml)
      };
      engines.json = {
        parse: JSON.parse.bind(JSON),
        stringify: function(obj, options3) {
          const opts = Object.assign({ replacer: null, space: 2 }, options3);
          return JSON.stringify(obj, opts.replacer, opts.space);
        }
      };
      engines.javascript = {
        parse: function parse(str, options, wrap) {
          try {
            if (wrap !== false) {
              str = "(function() {\nreturn " + str.trim() + ";\n}());";
            }
            return eval(str) || {};
          } catch (err) {
            if (wrap !== false && /(unexpected|identifier)/i.test(err.message)) {
              return parse(str, options, false);
            }
            throw new SyntaxError(err);
          }
        },
        stringify: function() {
          throw new Error("stringifying JavaScript is not supported");
        }
      };
    }
  });

  // node_modules/strip-bom-string/index.js
  var require_strip_bom_string = __commonJS({
    "node_modules/strip-bom-string/index.js"(exports2, module2) {
      "use strict";
      module2.exports = function(str2) {
        if (typeof str2 === "string" && str2.charAt(0) === "\uFEFF") {
          return str2.slice(1);
        }
        return str2;
      };
    }
  });

  // node_modules/gray-matter/lib/utils.js
  var require_utils = __commonJS({
    "node_modules/gray-matter/lib/utils.js"(exports2) {
      "use strict";
      var stripBom = require_strip_bom_string();
      var typeOf = require_kind_of();
      exports2.define = function(obj, key, val) {
        Reflect.defineProperty(obj, key, {
          enumerable: false,
          configurable: true,
          writable: true,
          value: val
        });
      };
      exports2.isBuffer = function(val) {
        return typeOf(val) === "buffer";
      };
      exports2.isObject = function(val) {
        return typeOf(val) === "object";
      };
      exports2.toBuffer = function(input) {
        return typeof input === "string" ? Buffer.from(input) : input;
      };
      exports2.toString = function(input) {
        if (exports2.isBuffer(input)) return stripBom(String(input));
        if (typeof input !== "string") {
          throw new TypeError("expected input to be a string or buffer");
        }
        return stripBom(input);
      };
      exports2.arrayify = function(val) {
        return val ? Array.isArray(val) ? val : [val] : [];
      };
      exports2.startsWith = function(str2, substr, len) {
        if (typeof len !== "number") len = substr.length;
        return str2.slice(0, len) === substr;
      };
    }
  });

  // node_modules/gray-matter/lib/defaults.js
  var require_defaults = __commonJS({
    "node_modules/gray-matter/lib/defaults.js"(exports2, module2) {
      "use strict";
      var engines2 = require_engines();
      var utils = require_utils();
      module2.exports = function(options3) {
        const opts = Object.assign({}, options3);
        opts.delimiters = utils.arrayify(opts.delims || opts.delimiters || "---");
        if (opts.delimiters.length === 1) {
          opts.delimiters.push(opts.delimiters[0]);
        }
        opts.language = (opts.language || opts.lang || "yaml").toLowerCase();
        opts.engines = Object.assign({}, engines2, opts.parsers, opts.engines);
        return opts;
      };
    }
  });

  // node_modules/gray-matter/lib/engine.js
  var require_engine = __commonJS({
    "node_modules/gray-matter/lib/engine.js"(exports2, module2) {
      "use strict";
      module2.exports = function(name, options3) {
        let engine = options3.engines[name] || options3.engines[aliase(name)];
        if (typeof engine === "undefined") {
          throw new Error('gray-matter engine "' + name + '" is not registered');
        }
        if (typeof engine === "function") {
          engine = { parse: engine };
        }
        return engine;
      };
      function aliase(name) {
        switch (name.toLowerCase()) {
          case "js":
          case "javascript":
            return "javascript";
          case "coffee":
          case "coffeescript":
          case "cson":
            return "coffee";
          case "yaml":
          case "yml":
            return "yaml";
          default: {
            return name;
          }
        }
      }
    }
  });

  // node_modules/gray-matter/lib/stringify.js
  var require_stringify = __commonJS({
    "node_modules/gray-matter/lib/stringify.js"(exports2, module2) {
      "use strict";
      var typeOf = require_kind_of();
      var getEngine = require_engine();
      var defaults = require_defaults();
      module2.exports = function(file, data, options3) {
        if (data == null && options3 == null) {
          switch (typeOf(file)) {
            case "object":
              data = file.data;
              options3 = {};
              break;
            case "string":
              return file;
            default: {
              throw new TypeError("expected file to be a string or object");
            }
          }
        }
        const str2 = file.content;
        const opts = defaults(options3);
        if (data == null) {
          if (!opts.data) return file;
          data = opts.data;
        }
        const language = file.language || opts.language;
        const engine = getEngine(language, opts);
        if (typeof engine.stringify !== "function") {
          throw new TypeError('expected "' + language + '.stringify" to be a function');
        }
        data = Object.assign({}, file.data, data);
        const open = opts.delimiters[0];
        const close = opts.delimiters[1];
        const matter2 = engine.stringify(data, options3).trim();
        let buf = "";
        if (matter2 !== "{}") {
          buf = newline2(open) + newline2(matter2) + newline2(close);
        }
        if (typeof file.excerpt === "string" && file.excerpt !== "") {
          if (str2.indexOf(file.excerpt.trim()) === -1) {
            buf += newline2(file.excerpt) + newline2(close);
          }
        }
        return buf + newline2(str2);
      };
      function newline2(str2) {
        return str2.slice(-1) !== "\n" ? str2 + "\n" : str2;
      }
    }
  });

  // node_modules/gray-matter/lib/excerpt.js
  var require_excerpt = __commonJS({
    "node_modules/gray-matter/lib/excerpt.js"(exports2, module2) {
      "use strict";
      var defaults = require_defaults();
      module2.exports = function(file, options3) {
        const opts = defaults(options3);
        if (file.data == null) {
          file.data = {};
        }
        if (typeof opts.excerpt === "function") {
          return opts.excerpt(file, opts);
        }
        const sep = file.data.excerpt_separator || opts.excerpt_separator;
        if (sep == null && (opts.excerpt === false || opts.excerpt == null)) {
          return file;
        }
        const delimiter = typeof opts.excerpt === "string" ? opts.excerpt : sep || opts.delimiters[0];
        const idx = file.content.indexOf(delimiter);
        if (idx !== -1) {
          file.excerpt = file.content.slice(0, idx);
        }
        return file;
      };
    }
  });

  // node_modules/gray-matter/lib/to-file.js
  var require_to_file = __commonJS({
    "node_modules/gray-matter/lib/to-file.js"(exports2, module2) {
      "use strict";
      var typeOf = require_kind_of();
      var stringify = require_stringify();
      var utils = require_utils();
      module2.exports = function(file) {
        if (typeOf(file) !== "object") {
          file = { content: file };
        }
        if (typeOf(file.data) !== "object") {
          file.data = {};
        }
        if (file.contents && file.content == null) {
          file.content = file.contents;
        }
        utils.define(file, "orig", utils.toBuffer(file.content));
        utils.define(file, "language", file.language || "");
        utils.define(file, "matter", file.matter || "");
        utils.define(file, "stringify", function(data, options3) {
          if (options3 && options3.language) {
            file.language = options3.language;
          }
          return stringify(file, data, options3);
        });
        file.content = utils.toString(file.content);
        file.isEmpty = false;
        file.excerpt = "";
        return file;
      };
    }
  });

  // node_modules/gray-matter/lib/parse.js
  var require_parse = __commonJS({
    "node_modules/gray-matter/lib/parse.js"(exports2, module2) {
      "use strict";
      var getEngine = require_engine();
      var defaults = require_defaults();
      module2.exports = function(language, str2, options3) {
        const opts = defaults(options3);
        const engine = getEngine(language, opts);
        if (typeof engine.parse !== "function") {
          throw new TypeError('expected "' + language + '.parse" to be a function');
        }
        return engine.parse(str2, opts);
      };
    }
  });

  // node_modules/gray-matter/index.js
  var require_gray_matter = __commonJS({
    "node_modules/gray-matter/index.js"(exports2, module2) {
      "use strict";
      var fs = require_fs();
      var sections = require_section_matter();
      var defaults = require_defaults();
      var stringify = require_stringify();
      var excerpt = require_excerpt();
      var engines2 = require_engines();
      var toFile = require_to_file();
      var parse2 = require_parse();
      var utils = require_utils();
      function matter2(input, options3) {
        if (input === "") {
          return { data: {}, content: input, excerpt: "", orig: input };
        }
        let file = toFile(input);
        const cached = matter2.cache[file.content];
        if (!options3) {
          if (cached) {
            file = Object.assign({}, cached);
            file.orig = cached.orig;
            return file;
          }
          matter2.cache[file.content] = file;
        }
        return parseMatter(file, options3);
      }
      function parseMatter(file, options3) {
        const opts = defaults(options3);
        const open = opts.delimiters[0];
        const close = "\n" + opts.delimiters[1];
        let str2 = file.content;
        if (opts.language) {
          file.language = opts.language;
        }
        const openLen = open.length;
        if (!utils.startsWith(str2, open, openLen)) {
          excerpt(file, opts);
          return file;
        }
        if (str2.charAt(openLen) === open.slice(-1)) {
          return file;
        }
        str2 = str2.slice(openLen);
        const len = str2.length;
        const language = matter2.language(str2, opts);
        if (language.name) {
          file.language = language.name;
          str2 = str2.slice(language.raw.length);
        }
        let closeIndex = str2.indexOf(close);
        if (closeIndex === -1) {
          closeIndex = len;
        }
        file.matter = str2.slice(0, closeIndex);
        const block2 = file.matter.replace(/^\s*#[^\n]+/gm, "").trim();
        if (block2 === "") {
          file.isEmpty = true;
          file.empty = file.content;
          file.data = {};
        } else {
          file.data = parse2(file.language, file.matter, opts);
        }
        if (closeIndex === len) {
          file.content = "";
        } else {
          file.content = str2.slice(closeIndex + close.length);
          if (file.content[0] === "\r") {
            file.content = file.content.slice(1);
          }
          if (file.content[0] === "\n") {
            file.content = file.content.slice(1);
          }
        }
        excerpt(file, opts);
        if (opts.sections === true || typeof opts.section === "function") {
          sections(file, opts.section);
        }
        return file;
      }
      matter2.engines = engines2;
      matter2.stringify = function(file, data, options3) {
        if (typeof file === "string") file = matter2(file, options3);
        return stringify(file, data, options3);
      };
      matter2.read = function(filepath, options3) {
        const str2 = fs.readFileSync(filepath, "utf8");
        const file = matter2(str2, options3);
        file.path = filepath;
        return file;
      };
      matter2.test = function(str2, options3) {
        return utils.startsWith(str2, defaults(options3).delimiters[0]);
      };
      matter2.language = function(str2, options3) {
        const opts = defaults(options3);
        const open = opts.delimiters[0];
        if (matter2.test(str2)) {
          str2 = str2.slice(open.length);
        }
        const language = str2.slice(0, str2.search(/\r?\n/));
        return {
          raw: language,
          name: language ? language.trim() : ""
        };
      };
      matter2.cache = {};
      matter2.clearCache = function() {
        matter2.cache = {};
      };
      module2.exports = matter2;
    }
  });

  // apps/doc/web/src/index.tsx
  init_src2();

  // packages/lupine.press/src/components/lang-switcher.tsx
  init_src();
  init_src2();

  // packages/lupine.press/src/styles/lang.svg
  var lang_default = "<svg viewBox='0 0 24 24' width='20' height='20' fill='currentColor'>\r\n    <path d='M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z' />\r\n</svg>\r\n";

  // packages/lupine.press/src/components/lang-switcher.tsx
  init_src2();
  init_jsx_runtime();
  var LangSwitcher = (props) => {
    var _a;
    const langs = props.langs || [];
    const currentLabel = ((_a = langs.find((l) => l.id === props.currentLang)) == null ? void 0 : _a.text) || "Language";
    const handleSelected = (text) => {
      const lang = langs.find((l) => l.text === text);
      if (lang && lang.id !== props.currentLang) {
        let newPath = window.location.pathname;
        const langIds = langs.map((l) => l.id).join("|");
        const langRegex = new RegExp(`^/(${langIds})(\\/|$)`);
        if (langRegex.test(newPath)) {
          newPath = newPath.replace(langRegex, `/${lang.id}$2`);
        } else {
          newPath = `/${lang.id}${newPath === "/" ? "/" : newPath}`;
        }
        initializePage(newPath);
      }
    };
    return /* @__PURE__ */ jsx("div", { class: ["lang-switcher", props.className].join(" "), children: /* @__PURE__ */ jsx(
      PopupMenu,
      {
        list: langs.map((l) => l.text),
        defaultValue: currentLabel,
        icon: /* @__PURE__ */ jsx(Svg, { children: lang_default }),
        handleSelected,
        align: "right"
      }
    ) });
  };

  // packages/lupine.press/src/components/press-header.tsx
  init_src2();

  // packages/lupine.press/src/styles/github.svg
  var github_default = "<svg viewBox='0 0 24 24' width='20' height='20' fill='currentColor'>\r\n    <path d='M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.164 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z' />\r\n</svg>";

  // packages/lupine.press/src/styles/theme.svg
  var theme_default = `<svg viewBox='0 0 24 24' width='20' height='20' fill='currentColor'>\r
    <!-- Sun (Top-Left): Unchanged -->\r
    <path d="M7 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM7 0h1v2.5H7zM7 11.5h1V14H7zM0 7h2.5v1H0zM11.5 7H14v1h-2.5zM2.05 2.05l1.768 1.768.707-.707L2.757 1.343zM10.243 10.243l1.768 1.768.707-.707-1.768-1.768zM2.05 12.95L1.343 12.243l1.768-1.768.707.707zM12.95 2.05l-1.768 1.768-.707-.707 1.768-1.768z" />\r
    \r
    <!-- Moon (Bottom-Right): Rotated ~30 degrees CCW to 'hug' the sun -->\r
    <g transform="rotate(-30, 16, 16)">\r
        <path d="M23 16c0 3.866-3.134 7-7 7-3.866 0-7-3.134-7-7 0-.46.04-.92.1-1.36 1.1 3.2 4.1 5.5 7.4 5.5 1.9 0 3.6-.6 5-1.7 1-.9 1.5-2.1 1.5-3.44 0-1.8-1.1-3.3-2.6-3.9 1.6 1.5 2.6 3.6 2.6 5.9z" />\r
    </g>\r
</svg>\r
`;

  // packages/lupine.press/src/components/press-header.tsx
  init_jsx_runtime();
  var PageHeader = (props) => {
    const css = {
      width: "100%",
      display: "flex",
      alignItems: "center",
      padding: "0.75rem 2rem",
      justifyContent: "space-between",
      ".press-navbar-left": {
        display: "flex",
        alignItems: "center",
        ".title": {
          fontWeight: "bold",
          fontSize: "1.2rem",
          marginRight: "1rem"
        },
        ".nav": {
          display: "flex",
          gap: "1rem"
        }
      },
      ".press-navbar-right": {
        display: "flex",
        alignItems: "center",
        gap: "1.25rem",
        ".navbar-item": {
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
          transition: "color 0.2s",
          "&:hover": { color: "var(--press-brand-color)" }
        }
      }
    };
    return /* @__PURE__ */ jsx("header", { css, class: "press-navbar", children: [
      /* @__PURE__ */ jsx("div", { class: "press-navbar-left", children: [
        /* @__PURE__ */ jsx("div", { class: "title", children: /* @__PURE__ */ jsx("a", { href: "/", children: props.title }) }),
        /* @__PURE__ */ jsx("nav", { class: "nav", children: props.nav.map((item) => /* @__PURE__ */ jsx("a", { href: item.link, children: item.text })) })
      ] }),
      /* @__PURE__ */ jsx("div", { class: "press-navbar-right", children: [
        props.langs.length > 1 && /* @__PURE__ */ jsx(LangSwitcher, { className: "navbar-item", currentLang: props.currentLang, langs: props.langs || [] }),
        /* @__PURE__ */ jsx(ThemeSelector, { className: "navbar-item", icon: /* @__PURE__ */ jsx(Svg, { children: theme_default }), noUpdateLabel: true }),
        props.github && props.github.url && /* @__PURE__ */ jsx(
          "a",
          {
            href: props.github.url,
            target: "_blank",
            rel: "noopener noreferrer",
            class: "navbar-item",
            title: props.github.title,
            children: /* @__PURE__ */ jsx(Svg, { children: github_default })
          }
        )
      ] })
    ] });
  };

  // packages/lupine.press/src/components/press-heading.tsx
  init_jsx_runtime();
  var PageHeading = (props) => {
    if (props.headings.length === 0) return null;
    const css = {
      "&-title": {
        fontWeight: "bold",
        fontSize: "0.8rem",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        color: "var(--primary-color)",
        marginBottom: "0.8rem"
      },
      "&-list": {
        listStyle: "none",
        padding: 0,
        margin: 0,
        borderLeft: "1px solid var(--press-border-color)"
      },
      "&-item": {
        padding: "0.2rem 0 0.2rem 1rem",
        fontSize: "0.85rem",
        "&.level-3": { paddingLeft: "2rem" },
        a: {
          display: "block",
          transition: "color 0.2s",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis"
        }
      }
    };
    return /* @__PURE__ */ jsx("div", { css, children: [
      /* @__PURE__ */ jsx("div", { class: "&-title", children: "On this page" }),
      /* @__PURE__ */ jsx("ul", { class: "&-list", children: props.headings.map((h) => /* @__PURE__ */ jsx("li", { class: `&-item level-${h.level}`, children: /* @__PURE__ */ jsx("a", { href: `#${h.id}`, children: h.text }) })) })
    ] });
  };

  // packages/lupine.press/src/components/press-home.tsx
  init_jsx_runtime();
  var LayoutHome = (props) => {
    var _a;
    const { hero, features } = props.data || {};
    const css = {
      ".&-hero": {
        padding: "64px 32px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      },
      ".&-hero-name": {
        fontSize: "56px",
        lineHeight: "64px",
        fontWeight: "bold",
        background: "linear-gradient(135deg, var(--press-brand-color) 30%, #4facfe 100%)",
        "-webkit-background-clip": "text",
        "-webkit-text-fill-color": "transparent"
      },
      ".&-hero-text": {
        fontSize: "56px",
        lineHeight: "64px",
        fontWeight: "bold",
        marginTop: "8px"
      },
      ".&-hero-tagline": {
        fontSize: "24px",
        lineHeight: "36px",
        color: "var(--secondary-color)",
        marginTop: "24px",
        maxWidth: "576px"
      },
      ".&-hero-actions": {
        display: "flex",
        gap: "12px",
        marginTop: "48px"
      },
      ".&-button": {
        display: "inline-block",
        padding: "0 20px",
        lineHeight: "38px",
        borderRadius: "20px",
        fontWeight: "600",
        textDecoration: "none",
        fontSize: "14px"
      },
      ".&-button.brand": {
        backgroundColor: "var(--press-brand-color)",
        color: "#fff"
      },
      ".&-button.alt": {
        backgroundColor: "var(--secondary-bg-color)",
        color: "var(--primary-color)",
        border: "1px solid var(--press-border-color)"
      },
      ".&-features": {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(256px, 1fr))",
        gap: "24px",
        padding: "48px 32px",
        maxWidth: "1152px",
        margin: "0 auto"
      },
      ".&-feature-card": {
        backgroundColor: "var(--secondary-bg-color)",
        padding: "24px",
        borderRadius: "12px",
        border: "1px solid var(--press-border-color)"
      },
      ".&-feature-title": {
        fontSize: "20px",
        fontWeight: "bold",
        marginBottom: "8px"
      },
      ".&-feature-details": {
        fontSize: "14px",
        color: "var(--secondary-color)",
        lineHeight: "22px"
      }
    };
    return /* @__PURE__ */ jsx("div", { css, children: [
      /* @__PURE__ */ jsx("section", { class: "&-hero", children: [
        /* @__PURE__ */ jsx("h1", { class: "&-hero-name", children: hero.name }),
        /* @__PURE__ */ jsx("p", { class: "&-hero-text", children: hero.text }),
        /* @__PURE__ */ jsx("p", { class: "&-hero-tagline", children: hero.tagline }),
        /* @__PURE__ */ jsx("div", { class: "&-hero-actions", children: (_a = hero.actions) == null ? void 0 : _a.map((action) => /* @__PURE__ */ jsx("a", { href: action.link, class: `&-button ${action.theme}`, children: action.text })) })
      ] }),
      features && /* @__PURE__ */ jsx("section", { class: "&-features", children: features.map((feature) => /* @__PURE__ */ jsx("div", { class: "&-feature-card", children: [
        /* @__PURE__ */ jsx("h2", { class: "&-feature-title", children: feature.title }),
        /* @__PURE__ */ jsx("p", { class: "&-feature-details", children: feature.details })
      ] })) })
    ] });
  };

  // packages/lupine.press/src/components/press-layout.tsx
  init_src();

  // packages/lupine.press/src/frames/press-frame.tsx
  init_src2();

  // packages/lupine.press/src/services/press-load.ts
  init_src2();

  // packages/lupine.press/src/services/cache.ts
  var _cache = {};
  var bindPressData = (pressData) => {
    _cache.data = pressData;
  };
  var getPressData = () => {
    return _cache.data;
  };
  var getSidebarScroll = () => {
    return _cache.sidebarScroll || 0;
  };
  var setSidebarScroll = (val) => {
    _cache.sidebarScroll = val;
  };

  // packages/lupine.press/src/services/press-load.ts
  var pressLoad = (url) => {
    const sidemenu = document.querySelector(".press-frame-sidemenu");
    if (sidemenu) {
      setSidebarScroll(sidemenu.scrollTop);
    }
    let target = url;
    if (target.startsWith("/") && !target.startsWith("/en/") && !target.startsWith("/zh/")) {
      const { langName } = getCurrentLang();
      target = `/${langName}${target}`;
    }
    if (target.endsWith("/") && target.length > 1) target = target.substring(0, target.length - 1);
    initializePage(target || "/");
  };

  // packages/lupine.press/node_modules/marked/lib/marked.esm.js
  function _getDefaults() {
    return {
      async: false,
      breaks: false,
      extensions: null,
      gfm: true,
      hooks: null,
      pedantic: false,
      renderer: null,
      silent: false,
      tokenizer: null,
      walkTokens: null
    };
  }
  var _defaults = _getDefaults();
  function changeDefaults(newDefaults) {
    _defaults = newDefaults;
  }
  var noopTest = { exec: () => null };
  function edit(regex, opt = "") {
    let source = typeof regex === "string" ? regex : regex.source;
    const obj = {
      replace: (name, val) => {
        let valSource = typeof val === "string" ? val : val.source;
        valSource = valSource.replace(other.caret, "$1");
        source = source.replace(name, valSource);
        return obj;
      },
      getRegex: () => {
        return new RegExp(source, opt);
      }
    };
    return obj;
  }
  var other = {
    codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm,
    outputLinkReplace: /\\([\[\]])/g,
    indentCodeCompensation: /^(\s+)(?:```)/,
    beginningSpace: /^\s+/,
    endingHash: /#$/,
    startingSpaceChar: /^ /,
    endingSpaceChar: / $/,
    nonSpaceChar: /[^ ]/,
    newLineCharGlobal: /\n/g,
    tabCharGlobal: /\t/g,
    multipleSpaceGlobal: /\s+/g,
    blankLine: /^[ \t]*$/,
    doubleBlankLine: /\n[ \t]*\n[ \t]*$/,
    blockquoteStart: /^ {0,3}>/,
    blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g,
    blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm,
    listReplaceTabs: /^\t+/,
    listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g,
    listIsTask: /^\[[ xX]\] /,
    listReplaceTask: /^\[[ xX]\] +/,
    anyLine: /\n.*\n/,
    hrefBrackets: /^<(.*)>$/,
    tableDelimiter: /[:|]/,
    tableAlignChars: /^\||\| *$/g,
    tableRowBlankLine: /\n[ \t]*$/,
    tableAlignRight: /^ *-+: *$/,
    tableAlignCenter: /^ *:-+: *$/,
    tableAlignLeft: /^ *:-+ *$/,
    startATag: /^<a /i,
    endATag: /^<\/a>/i,
    startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i,
    endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i,
    startAngleBracket: /^</,
    endAngleBracket: />$/,
    pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/,
    unicodeAlphaNumeric: /[\p{L}\p{N}]/u,
    escapeTest: /[&<>"']/,
    escapeReplace: /[&<>"']/g,
    escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
    escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,
    unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,
    caret: /(^|[^\[])\^/g,
    percentDecode: /%25/g,
    findPipe: /\|/g,
    splitPipe: / \|/,
    slashPipe: /\\\|/g,
    carriageReturn: /\r\n|\r/g,
    spaceLine: /^ +$/gm,
    notSpaceStart: /^\S*/,
    endingNewline: /\n$/,
    listItemRegex: (bull) => new RegExp(`^( {0,3}${bull})((?:[	 ][^\\n]*)?(?:\\n|$))`),
    nextBulletRegex: (indent) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),
    hrRegex: (indent) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),
    fencesBeginRegex: (indent) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:\`\`\`|~~~)`),
    headingBeginRegex: (indent) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}#`),
    htmlBeginRegex: (indent) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}<(?:[a-z].*>|!--)`, "i")
  };
  var newline = /^(?:[ \t]*(?:\n|$))+/;
  var blockCode = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/;
  var fences = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/;
  var hr = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/;
  var heading = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/;
  var bullet = /(?:[*+-]|\d{1,9}[.)])/;
  var lheadingCore = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/;
  var lheading = edit(lheadingCore).replace(/bull/g, bullet).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex();
  var lheadingGfm = edit(lheadingCore).replace(/bull/g, bullet).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex();
  var _paragraph = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/;
  var blockText = /^[^\n]+/;
  var _blockLabel = /(?!\s*\])(?:\\.|[^\[\]\\])+/;
  var def = edit(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", _blockLabel).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex();
  var list = edit(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, bullet).getRegex();
  var _tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
  var _comment = /<!--(?:-?>|[\s\S]*?(?:-->|$))/;
  var html = edit(
    "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))",
    "i"
  ).replace("comment", _comment).replace("tag", _tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
  var paragraph = edit(_paragraph).replace("hr", hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", _tag).getRegex();
  var blockquote = edit(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", paragraph).getRegex();
  var blockNormal = {
    blockquote,
    code: blockCode,
    def,
    fences,
    heading,
    hr,
    html,
    lheading,
    list,
    newline,
    paragraph,
    table: noopTest,
    text: blockText
  };
  var gfmTable = edit(
    "^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
  ).replace("hr", hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", _tag).getRegex();
  var blockGfm = {
    ...blockNormal,
    lheading: lheadingGfm,
    table: gfmTable,
    paragraph: edit(_paragraph).replace("hr", hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", gfmTable).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", _tag).getRegex()
  };
  var blockPedantic = {
    ...blockNormal,
    html: edit(
      `^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`
    ).replace("comment", _comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
    def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
    heading: /^(#{1,6})(.*)(?:\n+|$)/,
    fences: noopTest,
    // fences not supported
    lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
    paragraph: edit(_paragraph).replace("hr", hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", lheading).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
  };
  var escape2 = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/;
  var inlineCode = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/;
  var br = /^( {2,}|\\)\n(?!\s*$)/;
  var inlineText = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/;
  var _punctuation = /[\p{P}\p{S}]/u;
  var _punctuationOrSpace = /[\s\p{P}\p{S}]/u;
  var _notPunctuationOrSpace = /[^\s\p{P}\p{S}]/u;
  var punctuation = edit(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, _punctuationOrSpace).getRegex();
  var _punctuationGfmStrongEm = /(?!~)[\p{P}\p{S}]/u;
  var _punctuationOrSpaceGfmStrongEm = /(?!~)[\s\p{P}\p{S}]/u;
  var _notPunctuationOrSpaceGfmStrongEm = /(?:[^\s\p{P}\p{S}]|~)/u;
  var blockSkip = /\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g;
  var emStrongLDelimCore = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/;
  var emStrongLDelim = edit(emStrongLDelimCore, "u").replace(/punct/g, _punctuation).getRegex();
  var emStrongLDelimGfm = edit(emStrongLDelimCore, "u").replace(/punct/g, _punctuationGfmStrongEm).getRegex();
  var emStrongRDelimAstCore = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)";
  var emStrongRDelimAst = edit(emStrongRDelimAstCore, "gu").replace(/notPunctSpace/g, _notPunctuationOrSpace).replace(/punctSpace/g, _punctuationOrSpace).replace(/punct/g, _punctuation).getRegex();
  var emStrongRDelimAstGfm = edit(emStrongRDelimAstCore, "gu").replace(/notPunctSpace/g, _notPunctuationOrSpaceGfmStrongEm).replace(/punctSpace/g, _punctuationOrSpaceGfmStrongEm).replace(/punct/g, _punctuationGfmStrongEm).getRegex();
  var emStrongRDelimUnd = edit(
    "^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)",
    "gu"
  ).replace(/notPunctSpace/g, _notPunctuationOrSpace).replace(/punctSpace/g, _punctuationOrSpace).replace(/punct/g, _punctuation).getRegex();
  var anyPunctuation = edit(/\\(punct)/, "gu").replace(/punct/g, _punctuation).getRegex();
  var autolink = edit(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex();
  var _inlineComment = edit(_comment).replace("(?:-->|$)", "-->").getRegex();
  var tag = edit(
    "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>"
  ).replace("comment", _inlineComment).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex();
  var _inlineLabel = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
  var link = edit(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", _inlineLabel).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex();
  var reflink = edit(/^!?\[(label)\]\[(ref)\]/).replace("label", _inlineLabel).replace("ref", _blockLabel).getRegex();
  var nolink = edit(/^!?\[(ref)\](?:\[\])?/).replace("ref", _blockLabel).getRegex();
  var reflinkSearch = edit("reflink|nolink(?!\\()", "g").replace("reflink", reflink).replace("nolink", nolink).getRegex();
  var inlineNormal = {
    _backpedal: noopTest,
    // only used for GFM url
    anyPunctuation,
    autolink,
    blockSkip,
    br,
    code: inlineCode,
    del: noopTest,
    emStrongLDelim,
    emStrongRDelimAst,
    emStrongRDelimUnd,
    escape: escape2,
    link,
    nolink,
    punctuation,
    reflink,
    reflinkSearch,
    tag,
    text: inlineText,
    url: noopTest
  };
  var inlinePedantic = {
    ...inlineNormal,
    link: edit(/^!?\[(label)\]\((.*?)\)/).replace("label", _inlineLabel).getRegex(),
    reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", _inlineLabel).getRegex()
  };
  var inlineGfm = {
    ...inlineNormal,
    emStrongRDelimAst: emStrongRDelimAstGfm,
    emStrongLDelim: emStrongLDelimGfm,
    url: edit(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
    _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
    del: /^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,
    text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
  };
  var inlineBreaks = {
    ...inlineGfm,
    br: edit(br).replace("{2,}", "*").getRegex(),
    text: edit(inlineGfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
  };
  var block = {
    normal: blockNormal,
    gfm: blockGfm,
    pedantic: blockPedantic
  };
  var inline = {
    normal: inlineNormal,
    gfm: inlineGfm,
    breaks: inlineBreaks,
    pedantic: inlinePedantic
  };
  var escapeReplacements = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  };
  var getEscapeReplacement = (ch) => escapeReplacements[ch];
  function escape22(html2, encode) {
    if (encode) {
      if (other.escapeTest.test(html2)) {
        return html2.replace(other.escapeReplace, getEscapeReplacement);
      }
    } else {
      if (other.escapeTestNoEncode.test(html2)) {
        return html2.replace(other.escapeReplaceNoEncode, getEscapeReplacement);
      }
    }
    return html2;
  }
  function cleanUrl(href) {
    try {
      href = encodeURI(href).replace(other.percentDecode, "%");
    } catch {
      return null;
    }
    return href;
  }
  function splitCells(tableRow, count) {
    var _a;
    const row = tableRow.replace(other.findPipe, (match, offset, str2) => {
      let escaped = false;
      let curr = offset;
      while (--curr >= 0 && str2[curr] === "\\") escaped = !escaped;
      if (escaped) {
        return "|";
      } else {
        return " |";
      }
    }), cells = row.split(other.splitPipe);
    let i = 0;
    if (!cells[0].trim()) {
      cells.shift();
    }
    if (cells.length > 0 && !((_a = cells.at(-1)) == null ? void 0 : _a.trim())) {
      cells.pop();
    }
    if (count) {
      if (cells.length > count) {
        cells.splice(count);
      } else {
        while (cells.length < count) cells.push("");
      }
    }
    for (; i < cells.length; i++) {
      cells[i] = cells[i].trim().replace(other.slashPipe, "|");
    }
    return cells;
  }
  function rtrim(str2, c, invert) {
    const l = str2.length;
    if (l === 0) {
      return "";
    }
    let suffLen = 0;
    while (suffLen < l) {
      const currChar = str2.charAt(l - suffLen - 1);
      if (currChar === c && !invert) {
        suffLen++;
      } else if (currChar !== c && invert) {
        suffLen++;
      } else {
        break;
      }
    }
    return str2.slice(0, l - suffLen);
  }
  function findClosingBracket(str2, b) {
    if (str2.indexOf(b[1]) === -1) {
      return -1;
    }
    let level = 0;
    for (let i = 0; i < str2.length; i++) {
      if (str2[i] === "\\") {
        i++;
      } else if (str2[i] === b[0]) {
        level++;
      } else if (str2[i] === b[1]) {
        level--;
        if (level < 0) {
          return i;
        }
      }
    }
    if (level > 0) {
      return -2;
    }
    return -1;
  }
  function outputLink(cap, link2, raw, lexer2, rules) {
    const href = link2.href;
    const title = link2.title || null;
    const text = cap[1].replace(rules.other.outputLinkReplace, "$1");
    lexer2.state.inLink = true;
    const token = {
      type: cap[0].charAt(0) === "!" ? "image" : "link",
      raw,
      href,
      title,
      text,
      tokens: lexer2.inlineTokens(text)
    };
    lexer2.state.inLink = false;
    return token;
  }
  function indentCodeCompensation(raw, text, rules) {
    const matchIndentToCode = raw.match(rules.other.indentCodeCompensation);
    if (matchIndentToCode === null) {
      return text;
    }
    const indentToCode = matchIndentToCode[1];
    return text.split("\n").map((node) => {
      const matchIndentInNode = node.match(rules.other.beginningSpace);
      if (matchIndentInNode === null) {
        return node;
      }
      const [indentInNode] = matchIndentInNode;
      if (indentInNode.length >= indentToCode.length) {
        return node.slice(indentToCode.length);
      }
      return node;
    }).join("\n");
  }
  var _Tokenizer = class {
    options;
    rules;
    // set by the lexer
    lexer;
    // set by the lexer
    constructor(options22) {
      this.options = options22 || _defaults;
    }
    space(src) {
      const cap = this.rules.block.newline.exec(src);
      if (cap && cap[0].length > 0) {
        return {
          type: "space",
          raw: cap[0]
        };
      }
    }
    code(src) {
      const cap = this.rules.block.code.exec(src);
      if (cap) {
        const text = cap[0].replace(this.rules.other.codeRemoveIndent, "");
        return {
          type: "code",
          raw: cap[0],
          codeBlockStyle: "indented",
          text: !this.options.pedantic ? rtrim(text, "\n") : text
        };
      }
    }
    fences(src) {
      const cap = this.rules.block.fences.exec(src);
      if (cap) {
        const raw = cap[0];
        const text = indentCodeCompensation(raw, cap[3] || "", this.rules);
        return {
          type: "code",
          raw,
          lang: cap[2] ? cap[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : cap[2],
          text
        };
      }
    }
    heading(src) {
      const cap = this.rules.block.heading.exec(src);
      if (cap) {
        let text = cap[2].trim();
        if (this.rules.other.endingHash.test(text)) {
          const trimmed = rtrim(text, "#");
          if (this.options.pedantic) {
            text = trimmed.trim();
          } else if (!trimmed || this.rules.other.endingSpaceChar.test(trimmed)) {
            text = trimmed.trim();
          }
        }
        return {
          type: "heading",
          raw: cap[0],
          depth: cap[1].length,
          text,
          tokens: this.lexer.inline(text)
        };
      }
    }
    hr(src) {
      const cap = this.rules.block.hr.exec(src);
      if (cap) {
        return {
          type: "hr",
          raw: rtrim(cap[0], "\n")
        };
      }
    }
    blockquote(src) {
      const cap = this.rules.block.blockquote.exec(src);
      if (cap) {
        let lines = rtrim(cap[0], "\n").split("\n");
        let raw = "";
        let text = "";
        const tokens = [];
        while (lines.length > 0) {
          let inBlockquote = false;
          const currentLines = [];
          let i;
          for (i = 0; i < lines.length; i++) {
            if (this.rules.other.blockquoteStart.test(lines[i])) {
              currentLines.push(lines[i]);
              inBlockquote = true;
            } else if (!inBlockquote) {
              currentLines.push(lines[i]);
            } else {
              break;
            }
          }
          lines = lines.slice(i);
          const currentRaw = currentLines.join("\n");
          const currentText = currentRaw.replace(this.rules.other.blockquoteSetextReplace, "\n    $1").replace(this.rules.other.blockquoteSetextReplace2, "");
          raw = raw ? `${raw}
${currentRaw}` : currentRaw;
          text = text ? `${text}
${currentText}` : currentText;
          const top = this.lexer.state.top;
          this.lexer.state.top = true;
          this.lexer.blockTokens(currentText, tokens, true);
          this.lexer.state.top = top;
          if (lines.length === 0) {
            break;
          }
          const lastToken = tokens.at(-1);
          if ((lastToken == null ? void 0 : lastToken.type) === "code") {
            break;
          } else if ((lastToken == null ? void 0 : lastToken.type) === "blockquote") {
            const oldToken = lastToken;
            const newText = oldToken.raw + "\n" + lines.join("\n");
            const newToken = this.blockquote(newText);
            tokens[tokens.length - 1] = newToken;
            raw = raw.substring(0, raw.length - oldToken.raw.length) + newToken.raw;
            text = text.substring(0, text.length - oldToken.text.length) + newToken.text;
            break;
          } else if ((lastToken == null ? void 0 : lastToken.type) === "list") {
            const oldToken = lastToken;
            const newText = oldToken.raw + "\n" + lines.join("\n");
            const newToken = this.list(newText);
            tokens[tokens.length - 1] = newToken;
            raw = raw.substring(0, raw.length - lastToken.raw.length) + newToken.raw;
            text = text.substring(0, text.length - oldToken.raw.length) + newToken.raw;
            lines = newText.substring(tokens.at(-1).raw.length).split("\n");
            continue;
          }
        }
        return {
          type: "blockquote",
          raw,
          tokens,
          text
        };
      }
    }
    list(src) {
      let cap = this.rules.block.list.exec(src);
      if (cap) {
        let bull = cap[1].trim();
        const isordered = bull.length > 1;
        const list2 = {
          type: "list",
          raw: "",
          ordered: isordered,
          start: isordered ? +bull.slice(0, -1) : "",
          loose: false,
          items: []
        };
        bull = isordered ? `\\d{1,9}\\${bull.slice(-1)}` : `\\${bull}`;
        if (this.options.pedantic) {
          bull = isordered ? bull : "[*+-]";
        }
        const itemRegex = this.rules.other.listItemRegex(bull);
        let endsWithBlankLine = false;
        while (src) {
          let endEarly = false;
          let raw = "";
          let itemContents = "";
          if (!(cap = itemRegex.exec(src))) {
            break;
          }
          if (this.rules.block.hr.test(src)) {
            break;
          }
          raw = cap[0];
          src = src.substring(raw.length);
          let line = cap[2].split("\n", 1)[0].replace(this.rules.other.listReplaceTabs, (t) => " ".repeat(3 * t.length));
          let nextLine = src.split("\n", 1)[0];
          let blankLine = !line.trim();
          let indent = 0;
          if (this.options.pedantic) {
            indent = 2;
            itemContents = line.trimStart();
          } else if (blankLine) {
            indent = cap[1].length + 1;
          } else {
            indent = cap[2].search(this.rules.other.nonSpaceChar);
            indent = indent > 4 ? 1 : indent;
            itemContents = line.slice(indent);
            indent += cap[1].length;
          }
          if (blankLine && this.rules.other.blankLine.test(nextLine)) {
            raw += nextLine + "\n";
            src = src.substring(nextLine.length + 1);
            endEarly = true;
          }
          if (!endEarly) {
            const nextBulletRegex = this.rules.other.nextBulletRegex(indent);
            const hrRegex = this.rules.other.hrRegex(indent);
            const fencesBeginRegex = this.rules.other.fencesBeginRegex(indent);
            const headingBeginRegex = this.rules.other.headingBeginRegex(indent);
            const htmlBeginRegex = this.rules.other.htmlBeginRegex(indent);
            while (src) {
              const rawLine = src.split("\n", 1)[0];
              let nextLineWithoutTabs;
              nextLine = rawLine;
              if (this.options.pedantic) {
                nextLine = nextLine.replace(this.rules.other.listReplaceNesting, "  ");
                nextLineWithoutTabs = nextLine;
              } else {
                nextLineWithoutTabs = nextLine.replace(this.rules.other.tabCharGlobal, "    ");
              }
              if (fencesBeginRegex.test(nextLine)) {
                break;
              }
              if (headingBeginRegex.test(nextLine)) {
                break;
              }
              if (htmlBeginRegex.test(nextLine)) {
                break;
              }
              if (nextBulletRegex.test(nextLine)) {
                break;
              }
              if (hrRegex.test(nextLine)) {
                break;
              }
              if (nextLineWithoutTabs.search(this.rules.other.nonSpaceChar) >= indent || !nextLine.trim()) {
                itemContents += "\n" + nextLineWithoutTabs.slice(indent);
              } else {
                if (blankLine) {
                  break;
                }
                if (line.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4) {
                  break;
                }
                if (fencesBeginRegex.test(line)) {
                  break;
                }
                if (headingBeginRegex.test(line)) {
                  break;
                }
                if (hrRegex.test(line)) {
                  break;
                }
                itemContents += "\n" + nextLine;
              }
              if (!blankLine && !nextLine.trim()) {
                blankLine = true;
              }
              raw += rawLine + "\n";
              src = src.substring(rawLine.length + 1);
              line = nextLineWithoutTabs.slice(indent);
            }
          }
          if (!list2.loose) {
            if (endsWithBlankLine) {
              list2.loose = true;
            } else if (this.rules.other.doubleBlankLine.test(raw)) {
              endsWithBlankLine = true;
            }
          }
          let istask = null;
          let ischecked;
          if (this.options.gfm) {
            istask = this.rules.other.listIsTask.exec(itemContents);
            if (istask) {
              ischecked = istask[0] !== "[ ] ";
              itemContents = itemContents.replace(this.rules.other.listReplaceTask, "");
            }
          }
          list2.items.push({
            type: "list_item",
            raw,
            task: !!istask,
            checked: ischecked,
            loose: false,
            text: itemContents,
            tokens: []
          });
          list2.raw += raw;
        }
        const lastItem = list2.items.at(-1);
        if (lastItem) {
          lastItem.raw = lastItem.raw.trimEnd();
          lastItem.text = lastItem.text.trimEnd();
        } else {
          return;
        }
        list2.raw = list2.raw.trimEnd();
        for (let i = 0; i < list2.items.length; i++) {
          this.lexer.state.top = false;
          list2.items[i].tokens = this.lexer.blockTokens(list2.items[i].text, []);
          if (!list2.loose) {
            const spacers = list2.items[i].tokens.filter((t) => t.type === "space");
            const hasMultipleLineBreaks = spacers.length > 0 && spacers.some((t) => this.rules.other.anyLine.test(t.raw));
            list2.loose = hasMultipleLineBreaks;
          }
        }
        if (list2.loose) {
          for (let i = 0; i < list2.items.length; i++) {
            list2.items[i].loose = true;
          }
        }
        return list2;
      }
    }
    html(src) {
      const cap = this.rules.block.html.exec(src);
      if (cap) {
        const token = {
          type: "html",
          block: true,
          raw: cap[0],
          pre: cap[1] === "pre" || cap[1] === "script" || cap[1] === "style",
          text: cap[0]
        };
        return token;
      }
    }
    def(src) {
      const cap = this.rules.block.def.exec(src);
      if (cap) {
        const tag2 = cap[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " ");
        const href = cap[2] ? cap[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "";
        const title = cap[3] ? cap[3].substring(1, cap[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : cap[3];
        return {
          type: "def",
          tag: tag2,
          raw: cap[0],
          href,
          title
        };
      }
    }
    table(src) {
      var _a;
      const cap = this.rules.block.table.exec(src);
      if (!cap) {
        return;
      }
      if (!this.rules.other.tableDelimiter.test(cap[2])) {
        return;
      }
      const headers = splitCells(cap[1]);
      const aligns = cap[2].replace(this.rules.other.tableAlignChars, "").split("|");
      const rows = ((_a = cap[3]) == null ? void 0 : _a.trim()) ? cap[3].replace(this.rules.other.tableRowBlankLine, "").split("\n") : [];
      const item = {
        type: "table",
        raw: cap[0],
        header: [],
        align: [],
        rows: []
      };
      if (headers.length !== aligns.length) {
        return;
      }
      for (const align of aligns) {
        if (this.rules.other.tableAlignRight.test(align)) {
          item.align.push("right");
        } else if (this.rules.other.tableAlignCenter.test(align)) {
          item.align.push("center");
        } else if (this.rules.other.tableAlignLeft.test(align)) {
          item.align.push("left");
        } else {
          item.align.push(null);
        }
      }
      for (let i = 0; i < headers.length; i++) {
        item.header.push({
          text: headers[i],
          tokens: this.lexer.inline(headers[i]),
          header: true,
          align: item.align[i]
        });
      }
      for (const row of rows) {
        item.rows.push(splitCells(row, item.header.length).map((cell, i) => {
          return {
            text: cell,
            tokens: this.lexer.inline(cell),
            header: false,
            align: item.align[i]
          };
        }));
      }
      return item;
    }
    lheading(src) {
      const cap = this.rules.block.lheading.exec(src);
      if (cap) {
        return {
          type: "heading",
          raw: cap[0],
          depth: cap[2].charAt(0) === "=" ? 1 : 2,
          text: cap[1],
          tokens: this.lexer.inline(cap[1])
        };
      }
    }
    paragraph(src) {
      const cap = this.rules.block.paragraph.exec(src);
      if (cap) {
        const text = cap[1].charAt(cap[1].length - 1) === "\n" ? cap[1].slice(0, -1) : cap[1];
        return {
          type: "paragraph",
          raw: cap[0],
          text,
          tokens: this.lexer.inline(text)
        };
      }
    }
    text(src) {
      const cap = this.rules.block.text.exec(src);
      if (cap) {
        return {
          type: "text",
          raw: cap[0],
          text: cap[0],
          tokens: this.lexer.inline(cap[0])
        };
      }
    }
    escape(src) {
      const cap = this.rules.inline.escape.exec(src);
      if (cap) {
        return {
          type: "escape",
          raw: cap[0],
          text: cap[1]
        };
      }
    }
    tag(src) {
      const cap = this.rules.inline.tag.exec(src);
      if (cap) {
        if (!this.lexer.state.inLink && this.rules.other.startATag.test(cap[0])) {
          this.lexer.state.inLink = true;
        } else if (this.lexer.state.inLink && this.rules.other.endATag.test(cap[0])) {
          this.lexer.state.inLink = false;
        }
        if (!this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(cap[0])) {
          this.lexer.state.inRawBlock = true;
        } else if (this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(cap[0])) {
          this.lexer.state.inRawBlock = false;
        }
        return {
          type: "html",
          raw: cap[0],
          inLink: this.lexer.state.inLink,
          inRawBlock: this.lexer.state.inRawBlock,
          block: false,
          text: cap[0]
        };
      }
    }
    link(src) {
      const cap = this.rules.inline.link.exec(src);
      if (cap) {
        const trimmedUrl = cap[2].trim();
        if (!this.options.pedantic && this.rules.other.startAngleBracket.test(trimmedUrl)) {
          if (!this.rules.other.endAngleBracket.test(trimmedUrl)) {
            return;
          }
          const rtrimSlash = rtrim(trimmedUrl.slice(0, -1), "\\");
          if ((trimmedUrl.length - rtrimSlash.length) % 2 === 0) {
            return;
          }
        } else {
          const lastParenIndex = findClosingBracket(cap[2], "()");
          if (lastParenIndex === -2) {
            return;
          }
          if (lastParenIndex > -1) {
            const start = cap[0].indexOf("!") === 0 ? 5 : 4;
            const linkLen = start + cap[1].length + lastParenIndex;
            cap[2] = cap[2].substring(0, lastParenIndex);
            cap[0] = cap[0].substring(0, linkLen).trim();
            cap[3] = "";
          }
        }
        let href = cap[2];
        let title = "";
        if (this.options.pedantic) {
          const link2 = this.rules.other.pedanticHrefTitle.exec(href);
          if (link2) {
            href = link2[1];
            title = link2[3];
          }
        } else {
          title = cap[3] ? cap[3].slice(1, -1) : "";
        }
        href = href.trim();
        if (this.rules.other.startAngleBracket.test(href)) {
          if (this.options.pedantic && !this.rules.other.endAngleBracket.test(trimmedUrl)) {
            href = href.slice(1);
          } else {
            href = href.slice(1, -1);
          }
        }
        return outputLink(cap, {
          href: href ? href.replace(this.rules.inline.anyPunctuation, "$1") : href,
          title: title ? title.replace(this.rules.inline.anyPunctuation, "$1") : title
        }, cap[0], this.lexer, this.rules);
      }
    }
    reflink(src, links) {
      let cap;
      if ((cap = this.rules.inline.reflink.exec(src)) || (cap = this.rules.inline.nolink.exec(src))) {
        const linkString = (cap[2] || cap[1]).replace(this.rules.other.multipleSpaceGlobal, " ");
        const link2 = links[linkString.toLowerCase()];
        if (!link2) {
          const text = cap[0].charAt(0);
          return {
            type: "text",
            raw: text,
            text
          };
        }
        return outputLink(cap, link2, cap[0], this.lexer, this.rules);
      }
    }
    emStrong(src, maskedSrc, prevChar = "") {
      let match = this.rules.inline.emStrongLDelim.exec(src);
      if (!match) return;
      if (match[3] && prevChar.match(this.rules.other.unicodeAlphaNumeric)) return;
      const nextChar = match[1] || match[2] || "";
      if (!nextChar || !prevChar || this.rules.inline.punctuation.exec(prevChar)) {
        const lLength = [...match[0]].length - 1;
        let rDelim, rLength, delimTotal = lLength, midDelimTotal = 0;
        const endReg = match[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
        endReg.lastIndex = 0;
        maskedSrc = maskedSrc.slice(-1 * src.length + lLength);
        while ((match = endReg.exec(maskedSrc)) != null) {
          rDelim = match[1] || match[2] || match[3] || match[4] || match[5] || match[6];
          if (!rDelim) continue;
          rLength = [...rDelim].length;
          if (match[3] || match[4]) {
            delimTotal += rLength;
            continue;
          } else if (match[5] || match[6]) {
            if (lLength % 3 && !((lLength + rLength) % 3)) {
              midDelimTotal += rLength;
              continue;
            }
          }
          delimTotal -= rLength;
          if (delimTotal > 0) continue;
          rLength = Math.min(rLength, rLength + delimTotal + midDelimTotal);
          const lastCharLength = [...match[0]][0].length;
          const raw = src.slice(0, lLength + match.index + lastCharLength + rLength);
          if (Math.min(lLength, rLength) % 2) {
            const text2 = raw.slice(1, -1);
            return {
              type: "em",
              raw,
              text: text2,
              tokens: this.lexer.inlineTokens(text2)
            };
          }
          const text = raw.slice(2, -2);
          return {
            type: "strong",
            raw,
            text,
            tokens: this.lexer.inlineTokens(text)
          };
        }
      }
    }
    codespan(src) {
      const cap = this.rules.inline.code.exec(src);
      if (cap) {
        let text = cap[2].replace(this.rules.other.newLineCharGlobal, " ");
        const hasNonSpaceChars = this.rules.other.nonSpaceChar.test(text);
        const hasSpaceCharsOnBothEnds = this.rules.other.startingSpaceChar.test(text) && this.rules.other.endingSpaceChar.test(text);
        if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) {
          text = text.substring(1, text.length - 1);
        }
        return {
          type: "codespan",
          raw: cap[0],
          text
        };
      }
    }
    br(src) {
      const cap = this.rules.inline.br.exec(src);
      if (cap) {
        return {
          type: "br",
          raw: cap[0]
        };
      }
    }
    del(src) {
      const cap = this.rules.inline.del.exec(src);
      if (cap) {
        return {
          type: "del",
          raw: cap[0],
          text: cap[2],
          tokens: this.lexer.inlineTokens(cap[2])
        };
      }
    }
    autolink(src) {
      const cap = this.rules.inline.autolink.exec(src);
      if (cap) {
        let text, href;
        if (cap[2] === "@") {
          text = cap[1];
          href = "mailto:" + text;
        } else {
          text = cap[1];
          href = text;
        }
        return {
          type: "link",
          raw: cap[0],
          text,
          href,
          tokens: [
            {
              type: "text",
              raw: text,
              text
            }
          ]
        };
      }
    }
    url(src) {
      var _a;
      let cap;
      if (cap = this.rules.inline.url.exec(src)) {
        let text, href;
        if (cap[2] === "@") {
          text = cap[0];
          href = "mailto:" + text;
        } else {
          let prevCapZero;
          do {
            prevCapZero = cap[0];
            cap[0] = ((_a = this.rules.inline._backpedal.exec(cap[0])) == null ? void 0 : _a[0]) ?? "";
          } while (prevCapZero !== cap[0]);
          text = cap[0];
          if (cap[1] === "www.") {
            href = "http://" + cap[0];
          } else {
            href = cap[0];
          }
        }
        return {
          type: "link",
          raw: cap[0],
          text,
          href,
          tokens: [
            {
              type: "text",
              raw: text,
              text
            }
          ]
        };
      }
    }
    inlineText(src) {
      const cap = this.rules.inline.text.exec(src);
      if (cap) {
        const escaped = this.lexer.state.inRawBlock;
        return {
          type: "text",
          raw: cap[0],
          text: cap[0],
          escaped
        };
      }
    }
  };
  var _Lexer = class __Lexer {
    tokens;
    options;
    state;
    tokenizer;
    inlineQueue;
    constructor(options22) {
      this.tokens = [];
      this.tokens.links = /* @__PURE__ */ Object.create(null);
      this.options = options22 || _defaults;
      this.options.tokenizer = this.options.tokenizer || new _Tokenizer();
      this.tokenizer = this.options.tokenizer;
      this.tokenizer.options = this.options;
      this.tokenizer.lexer = this;
      this.inlineQueue = [];
      this.state = {
        inLink: false,
        inRawBlock: false,
        top: true
      };
      const rules = {
        other,
        block: block.normal,
        inline: inline.normal
      };
      if (this.options.pedantic) {
        rules.block = block.pedantic;
        rules.inline = inline.pedantic;
      } else if (this.options.gfm) {
        rules.block = block.gfm;
        if (this.options.breaks) {
          rules.inline = inline.breaks;
        } else {
          rules.inline = inline.gfm;
        }
      }
      this.tokenizer.rules = rules;
    }
    /**
     * Expose Rules
     */
    static get rules() {
      return {
        block,
        inline
      };
    }
    /**
     * Static Lex Method
     */
    static lex(src, options22) {
      const lexer2 = new __Lexer(options22);
      return lexer2.lex(src);
    }
    /**
     * Static Lex Inline Method
     */
    static lexInline(src, options22) {
      const lexer2 = new __Lexer(options22);
      return lexer2.inlineTokens(src);
    }
    /**
     * Preprocessing
     */
    lex(src) {
      src = src.replace(other.carriageReturn, "\n");
      this.blockTokens(src, this.tokens);
      for (let i = 0; i < this.inlineQueue.length; i++) {
        const next = this.inlineQueue[i];
        this.inlineTokens(next.src, next.tokens);
      }
      this.inlineQueue = [];
      return this.tokens;
    }
    blockTokens(src, tokens = [], lastParagraphClipped = false) {
      var _a, _b, _c;
      if (this.options.pedantic) {
        src = src.replace(other.tabCharGlobal, "    ").replace(other.spaceLine, "");
      }
      while (src) {
        let token;
        if ((_b = (_a = this.options.extensions) == null ? void 0 : _a.block) == null ? void 0 : _b.some((extTokenizer) => {
          if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            return true;
          }
          return false;
        })) {
          continue;
        }
        if (token = this.tokenizer.space(src)) {
          src = src.substring(token.raw.length);
          const lastToken = tokens.at(-1);
          if (token.raw.length === 1 && lastToken !== void 0) {
            lastToken.raw += "\n";
          } else {
            tokens.push(token);
          }
          continue;
        }
        if (token = this.tokenizer.code(src)) {
          src = src.substring(token.raw.length);
          const lastToken = tokens.at(-1);
          if ((lastToken == null ? void 0 : lastToken.type) === "paragraph" || (lastToken == null ? void 0 : lastToken.type) === "text") {
            lastToken.raw += "\n" + token.raw;
            lastToken.text += "\n" + token.text;
            this.inlineQueue.at(-1).src = lastToken.text;
          } else {
            tokens.push(token);
          }
          continue;
        }
        if (token = this.tokenizer.fences(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.heading(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.hr(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.blockquote(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.list(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.html(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.def(src)) {
          src = src.substring(token.raw.length);
          const lastToken = tokens.at(-1);
          if ((lastToken == null ? void 0 : lastToken.type) === "paragraph" || (lastToken == null ? void 0 : lastToken.type) === "text") {
            lastToken.raw += "\n" + token.raw;
            lastToken.text += "\n" + token.raw;
            this.inlineQueue.at(-1).src = lastToken.text;
          } else if (!this.tokens.links[token.tag]) {
            this.tokens.links[token.tag] = {
              href: token.href,
              title: token.title
            };
          }
          continue;
        }
        if (token = this.tokenizer.table(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.lheading(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        let cutSrc = src;
        if ((_c = this.options.extensions) == null ? void 0 : _c.startBlock) {
          let startIndex = Infinity;
          const tempSrc = src.slice(1);
          let tempStart;
          this.options.extensions.startBlock.forEach((getStartIndex) => {
            tempStart = getStartIndex.call({ lexer: this }, tempSrc);
            if (typeof tempStart === "number" && tempStart >= 0) {
              startIndex = Math.min(startIndex, tempStart);
            }
          });
          if (startIndex < Infinity && startIndex >= 0) {
            cutSrc = src.substring(0, startIndex + 1);
          }
        }
        if (this.state.top && (token = this.tokenizer.paragraph(cutSrc))) {
          const lastToken = tokens.at(-1);
          if (lastParagraphClipped && (lastToken == null ? void 0 : lastToken.type) === "paragraph") {
            lastToken.raw += "\n" + token.raw;
            lastToken.text += "\n" + token.text;
            this.inlineQueue.pop();
            this.inlineQueue.at(-1).src = lastToken.text;
          } else {
            tokens.push(token);
          }
          lastParagraphClipped = cutSrc.length !== src.length;
          src = src.substring(token.raw.length);
          continue;
        }
        if (token = this.tokenizer.text(src)) {
          src = src.substring(token.raw.length);
          const lastToken = tokens.at(-1);
          if ((lastToken == null ? void 0 : lastToken.type) === "text") {
            lastToken.raw += "\n" + token.raw;
            lastToken.text += "\n" + token.text;
            this.inlineQueue.pop();
            this.inlineQueue.at(-1).src = lastToken.text;
          } else {
            tokens.push(token);
          }
          continue;
        }
        if (src) {
          const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
          if (this.options.silent) {
            console.error(errMsg);
            break;
          } else {
            throw new Error(errMsg);
          }
        }
      }
      this.state.top = true;
      return tokens;
    }
    inline(src, tokens = []) {
      this.inlineQueue.push({ src, tokens });
      return tokens;
    }
    /**
     * Lexing/Compiling
     */
    inlineTokens(src, tokens = []) {
      var _a, _b, _c;
      let maskedSrc = src;
      let match = null;
      if (this.tokens.links) {
        const links = Object.keys(this.tokens.links);
        if (links.length > 0) {
          while ((match = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc)) != null) {
            if (links.includes(match[0].slice(match[0].lastIndexOf("[") + 1, -1))) {
              maskedSrc = maskedSrc.slice(0, match.index) + "[" + "a".repeat(match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex);
            }
          }
        }
      }
      while ((match = this.tokenizer.rules.inline.anyPunctuation.exec(maskedSrc)) != null) {
        maskedSrc = maskedSrc.slice(0, match.index) + "++" + maskedSrc.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
      }
      while ((match = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc)) != null) {
        maskedSrc = maskedSrc.slice(0, match.index) + "[" + "a".repeat(match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
      }
      let keepPrevChar = false;
      let prevChar = "";
      while (src) {
        if (!keepPrevChar) {
          prevChar = "";
        }
        keepPrevChar = false;
        let token;
        if ((_b = (_a = this.options.extensions) == null ? void 0 : _a.inline) == null ? void 0 : _b.some((extTokenizer) => {
          if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            return true;
          }
          return false;
        })) {
          continue;
        }
        if (token = this.tokenizer.escape(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.tag(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.link(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.reflink(src, this.tokens.links)) {
          src = src.substring(token.raw.length);
          const lastToken = tokens.at(-1);
          if (token.type === "text" && (lastToken == null ? void 0 : lastToken.type) === "text") {
            lastToken.raw += token.raw;
            lastToken.text += token.text;
          } else {
            tokens.push(token);
          }
          continue;
        }
        if (token = this.tokenizer.emStrong(src, maskedSrc, prevChar)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.codespan(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.br(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.del(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.autolink(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (!this.state.inLink && (token = this.tokenizer.url(src))) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        let cutSrc = src;
        if ((_c = this.options.extensions) == null ? void 0 : _c.startInline) {
          let startIndex = Infinity;
          const tempSrc = src.slice(1);
          let tempStart;
          this.options.extensions.startInline.forEach((getStartIndex) => {
            tempStart = getStartIndex.call({ lexer: this }, tempSrc);
            if (typeof tempStart === "number" && tempStart >= 0) {
              startIndex = Math.min(startIndex, tempStart);
            }
          });
          if (startIndex < Infinity && startIndex >= 0) {
            cutSrc = src.substring(0, startIndex + 1);
          }
        }
        if (token = this.tokenizer.inlineText(cutSrc)) {
          src = src.substring(token.raw.length);
          if (token.raw.slice(-1) !== "_") {
            prevChar = token.raw.slice(-1);
          }
          keepPrevChar = true;
          const lastToken = tokens.at(-1);
          if ((lastToken == null ? void 0 : lastToken.type) === "text") {
            lastToken.raw += token.raw;
            lastToken.text += token.text;
          } else {
            tokens.push(token);
          }
          continue;
        }
        if (src) {
          const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
          if (this.options.silent) {
            console.error(errMsg);
            break;
          } else {
            throw new Error(errMsg);
          }
        }
      }
      return tokens;
    }
  };
  var _Renderer = class {
    options;
    parser;
    // set by the parser
    constructor(options22) {
      this.options = options22 || _defaults;
    }
    space(token) {
      return "";
    }
    code({ text, lang, escaped }) {
      var _a;
      const langString = (_a = (lang || "").match(other.notSpaceStart)) == null ? void 0 : _a[0];
      const code = text.replace(other.endingNewline, "") + "\n";
      if (!langString) {
        return "<pre><code>" + (escaped ? code : escape22(code, true)) + "</code></pre>\n";
      }
      return '<pre><code class="language-' + escape22(langString) + '">' + (escaped ? code : escape22(code, true)) + "</code></pre>\n";
    }
    blockquote({ tokens }) {
      const body = this.parser.parse(tokens);
      return `<blockquote>
${body}</blockquote>
`;
    }
    html({ text }) {
      return text;
    }
    heading({ tokens, depth }) {
      return `<h${depth}>${this.parser.parseInline(tokens)}</h${depth}>
`;
    }
    hr(token) {
      return "<hr>\n";
    }
    list(token) {
      const ordered = token.ordered;
      const start = token.start;
      let body = "";
      for (let j = 0; j < token.items.length; j++) {
        const item = token.items[j];
        body += this.listitem(item);
      }
      const type = ordered ? "ol" : "ul";
      const startAttr = ordered && start !== 1 ? ' start="' + start + '"' : "";
      return "<" + type + startAttr + ">\n" + body + "</" + type + ">\n";
    }
    listitem(item) {
      var _a;
      let itemBody = "";
      if (item.task) {
        const checkbox = this.checkbox({ checked: !!item.checked });
        if (item.loose) {
          if (((_a = item.tokens[0]) == null ? void 0 : _a.type) === "paragraph") {
            item.tokens[0].text = checkbox + " " + item.tokens[0].text;
            if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === "text") {
              item.tokens[0].tokens[0].text = checkbox + " " + escape22(item.tokens[0].tokens[0].text);
              item.tokens[0].tokens[0].escaped = true;
            }
          } else {
            item.tokens.unshift({
              type: "text",
              raw: checkbox + " ",
              text: checkbox + " ",
              escaped: true
            });
          }
        } else {
          itemBody += checkbox + " ";
        }
      }
      itemBody += this.parser.parse(item.tokens, !!item.loose);
      return `<li>${itemBody}</li>
`;
    }
    checkbox({ checked }) {
      return "<input " + (checked ? 'checked="" ' : "") + 'disabled="" type="checkbox">';
    }
    paragraph({ tokens }) {
      return `<p>${this.parser.parseInline(tokens)}</p>
`;
    }
    table(token) {
      let header = "";
      let cell = "";
      for (let j = 0; j < token.header.length; j++) {
        cell += this.tablecell(token.header[j]);
      }
      header += this.tablerow({ text: cell });
      let body = "";
      for (let j = 0; j < token.rows.length; j++) {
        const row = token.rows[j];
        cell = "";
        for (let k = 0; k < row.length; k++) {
          cell += this.tablecell(row[k]);
        }
        body += this.tablerow({ text: cell });
      }
      if (body) body = `<tbody>${body}</tbody>`;
      return "<table>\n<thead>\n" + header + "</thead>\n" + body + "</table>\n";
    }
    tablerow({ text }) {
      return `<tr>
${text}</tr>
`;
    }
    tablecell(token) {
      const content = this.parser.parseInline(token.tokens);
      const type = token.header ? "th" : "td";
      const tag2 = token.align ? `<${type} align="${token.align}">` : `<${type}>`;
      return tag2 + content + `</${type}>
`;
    }
    /**
     * span level renderer
     */
    strong({ tokens }) {
      return `<strong>${this.parser.parseInline(tokens)}</strong>`;
    }
    em({ tokens }) {
      return `<em>${this.parser.parseInline(tokens)}</em>`;
    }
    codespan({ text }) {
      return `<code>${escape22(text, true)}</code>`;
    }
    br(token) {
      return "<br>";
    }
    del({ tokens }) {
      return `<del>${this.parser.parseInline(tokens)}</del>`;
    }
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens);
      const cleanHref = cleanUrl(href);
      if (cleanHref === null) {
        return text;
      }
      href = cleanHref;
      let out = '<a href="' + href + '"';
      if (title) {
        out += ' title="' + escape22(title) + '"';
      }
      out += ">" + text + "</a>";
      return out;
    }
    image({ href, title, text, tokens }) {
      if (tokens) {
        text = this.parser.parseInline(tokens, this.parser.textRenderer);
      }
      const cleanHref = cleanUrl(href);
      if (cleanHref === null) {
        return escape22(text);
      }
      href = cleanHref;
      let out = `<img src="${href}" alt="${text}"`;
      if (title) {
        out += ` title="${escape22(title)}"`;
      }
      out += ">";
      return out;
    }
    text(token) {
      return "tokens" in token && token.tokens ? this.parser.parseInline(token.tokens) : "escaped" in token && token.escaped ? token.text : escape22(token.text);
    }
  };
  var _TextRenderer = class {
    // no need for block level renderers
    strong({ text }) {
      return text;
    }
    em({ text }) {
      return text;
    }
    codespan({ text }) {
      return text;
    }
    del({ text }) {
      return text;
    }
    html({ text }) {
      return text;
    }
    text({ text }) {
      return text;
    }
    link({ text }) {
      return "" + text;
    }
    image({ text }) {
      return "" + text;
    }
    br() {
      return "";
    }
  };
  var _Parser = class __Parser {
    options;
    renderer;
    textRenderer;
    constructor(options22) {
      this.options = options22 || _defaults;
      this.options.renderer = this.options.renderer || new _Renderer();
      this.renderer = this.options.renderer;
      this.renderer.options = this.options;
      this.renderer.parser = this;
      this.textRenderer = new _TextRenderer();
    }
    /**
     * Static Parse Method
     */
    static parse(tokens, options22) {
      const parser2 = new __Parser(options22);
      return parser2.parse(tokens);
    }
    /**
     * Static Parse Inline Method
     */
    static parseInline(tokens, options22) {
      const parser2 = new __Parser(options22);
      return parser2.parseInline(tokens);
    }
    /**
     * Parse Loop
     */
    parse(tokens, top = true) {
      var _a, _b;
      let out = "";
      for (let i = 0; i < tokens.length; i++) {
        const anyToken = tokens[i];
        if ((_b = (_a = this.options.extensions) == null ? void 0 : _a.renderers) == null ? void 0 : _b[anyToken.type]) {
          const genericToken = anyToken;
          const ret = this.options.extensions.renderers[genericToken.type].call({ parser: this }, genericToken);
          if (ret !== false || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(genericToken.type)) {
            out += ret || "";
            continue;
          }
        }
        const token = anyToken;
        switch (token.type) {
          case "space": {
            out += this.renderer.space(token);
            continue;
          }
          case "hr": {
            out += this.renderer.hr(token);
            continue;
          }
          case "heading": {
            out += this.renderer.heading(token);
            continue;
          }
          case "code": {
            out += this.renderer.code(token);
            continue;
          }
          case "table": {
            out += this.renderer.table(token);
            continue;
          }
          case "blockquote": {
            out += this.renderer.blockquote(token);
            continue;
          }
          case "list": {
            out += this.renderer.list(token);
            continue;
          }
          case "html": {
            out += this.renderer.html(token);
            continue;
          }
          case "paragraph": {
            out += this.renderer.paragraph(token);
            continue;
          }
          case "text": {
            let textToken = token;
            let body = this.renderer.text(textToken);
            while (i + 1 < tokens.length && tokens[i + 1].type === "text") {
              textToken = tokens[++i];
              body += "\n" + this.renderer.text(textToken);
            }
            if (top) {
              out += this.renderer.paragraph({
                type: "paragraph",
                raw: body,
                text: body,
                tokens: [{ type: "text", raw: body, text: body, escaped: true }]
              });
            } else {
              out += body;
            }
            continue;
          }
          default: {
            const errMsg = 'Token with "' + token.type + '" type was not found.';
            if (this.options.silent) {
              console.error(errMsg);
              return "";
            } else {
              throw new Error(errMsg);
            }
          }
        }
      }
      return out;
    }
    /**
     * Parse Inline Tokens
     */
    parseInline(tokens, renderer = this.renderer) {
      var _a, _b;
      let out = "";
      for (let i = 0; i < tokens.length; i++) {
        const anyToken = tokens[i];
        if ((_b = (_a = this.options.extensions) == null ? void 0 : _a.renderers) == null ? void 0 : _b[anyToken.type]) {
          const ret = this.options.extensions.renderers[anyToken.type].call({ parser: this }, anyToken);
          if (ret !== false || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(anyToken.type)) {
            out += ret || "";
            continue;
          }
        }
        const token = anyToken;
        switch (token.type) {
          case "escape": {
            out += renderer.text(token);
            break;
          }
          case "html": {
            out += renderer.html(token);
            break;
          }
          case "link": {
            out += renderer.link(token);
            break;
          }
          case "image": {
            out += renderer.image(token);
            break;
          }
          case "strong": {
            out += renderer.strong(token);
            break;
          }
          case "em": {
            out += renderer.em(token);
            break;
          }
          case "codespan": {
            out += renderer.codespan(token);
            break;
          }
          case "br": {
            out += renderer.br(token);
            break;
          }
          case "del": {
            out += renderer.del(token);
            break;
          }
          case "text": {
            out += renderer.text(token);
            break;
          }
          default: {
            const errMsg = 'Token with "' + token.type + '" type was not found.';
            if (this.options.silent) {
              console.error(errMsg);
              return "";
            } else {
              throw new Error(errMsg);
            }
          }
        }
      }
      return out;
    }
  };
  var _Hooks = class {
    options;
    block;
    constructor(options22) {
      this.options = options22 || _defaults;
    }
    static passThroughHooks = /* @__PURE__ */ new Set([
      "preprocess",
      "postprocess",
      "processAllTokens"
    ]);
    /**
     * Process markdown before marked
     */
    preprocess(markdown) {
      return markdown;
    }
    /**
     * Process HTML after marked is finished
     */
    postprocess(html2) {
      return html2;
    }
    /**
     * Process all tokens before walk tokens
     */
    processAllTokens(tokens) {
      return tokens;
    }
    /**
     * Provide function to tokenize markdown
     */
    provideLexer() {
      return this.block ? _Lexer.lex : _Lexer.lexInline;
    }
    /**
     * Provide function to parse tokens
     */
    provideParser() {
      return this.block ? _Parser.parse : _Parser.parseInline;
    }
  };
  var Marked = class {
    defaults = _getDefaults();
    options = this.setOptions;
    parse = this.parseMarkdown(true);
    parseInline = this.parseMarkdown(false);
    Parser = _Parser;
    Renderer = _Renderer;
    TextRenderer = _TextRenderer;
    Lexer = _Lexer;
    Tokenizer = _Tokenizer;
    Hooks = _Hooks;
    constructor(...args) {
      this.use(...args);
    }
    /**
     * Run callback for every token
     */
    walkTokens(tokens, callback) {
      var _a, _b;
      let values = [];
      for (const token of tokens) {
        values = values.concat(callback.call(this, token));
        switch (token.type) {
          case "table": {
            const tableToken = token;
            for (const cell of tableToken.header) {
              values = values.concat(this.walkTokens(cell.tokens, callback));
            }
            for (const row of tableToken.rows) {
              for (const cell of row) {
                values = values.concat(this.walkTokens(cell.tokens, callback));
              }
            }
            break;
          }
          case "list": {
            const listToken = token;
            values = values.concat(this.walkTokens(listToken.items, callback));
            break;
          }
          default: {
            const genericToken = token;
            if ((_b = (_a = this.defaults.extensions) == null ? void 0 : _a.childTokens) == null ? void 0 : _b[genericToken.type]) {
              this.defaults.extensions.childTokens[genericToken.type].forEach((childTokens) => {
                const tokens2 = genericToken[childTokens].flat(Infinity);
                values = values.concat(this.walkTokens(tokens2, callback));
              });
            } else if (genericToken.tokens) {
              values = values.concat(this.walkTokens(genericToken.tokens, callback));
            }
          }
        }
      }
      return values;
    }
    use(...args) {
      const extensions = this.defaults.extensions || { renderers: {}, childTokens: {} };
      args.forEach((pack) => {
        const opts = { ...pack };
        opts.async = this.defaults.async || opts.async || false;
        if (pack.extensions) {
          pack.extensions.forEach((ext) => {
            if (!ext.name) {
              throw new Error("extension name required");
            }
            if ("renderer" in ext) {
              const prevRenderer = extensions.renderers[ext.name];
              if (prevRenderer) {
                extensions.renderers[ext.name] = function(...args2) {
                  let ret = ext.renderer.apply(this, args2);
                  if (ret === false) {
                    ret = prevRenderer.apply(this, args2);
                  }
                  return ret;
                };
              } else {
                extensions.renderers[ext.name] = ext.renderer;
              }
            }
            if ("tokenizer" in ext) {
              if (!ext.level || ext.level !== "block" && ext.level !== "inline") {
                throw new Error("extension level must be 'block' or 'inline'");
              }
              const extLevel = extensions[ext.level];
              if (extLevel) {
                extLevel.unshift(ext.tokenizer);
              } else {
                extensions[ext.level] = [ext.tokenizer];
              }
              if (ext.start) {
                if (ext.level === "block") {
                  if (extensions.startBlock) {
                    extensions.startBlock.push(ext.start);
                  } else {
                    extensions.startBlock = [ext.start];
                  }
                } else if (ext.level === "inline") {
                  if (extensions.startInline) {
                    extensions.startInline.push(ext.start);
                  } else {
                    extensions.startInline = [ext.start];
                  }
                }
              }
            }
            if ("childTokens" in ext && ext.childTokens) {
              extensions.childTokens[ext.name] = ext.childTokens;
            }
          });
          opts.extensions = extensions;
        }
        if (pack.renderer) {
          const renderer = this.defaults.renderer || new _Renderer(this.defaults);
          for (const prop in pack.renderer) {
            if (!(prop in renderer)) {
              throw new Error(`renderer '${prop}' does not exist`);
            }
            if (["options", "parser"].includes(prop)) {
              continue;
            }
            const rendererProp = prop;
            const rendererFunc = pack.renderer[rendererProp];
            const prevRenderer = renderer[rendererProp];
            renderer[rendererProp] = (...args2) => {
              let ret = rendererFunc.apply(renderer, args2);
              if (ret === false) {
                ret = prevRenderer.apply(renderer, args2);
              }
              return ret || "";
            };
          }
          opts.renderer = renderer;
        }
        if (pack.tokenizer) {
          const tokenizer = this.defaults.tokenizer || new _Tokenizer(this.defaults);
          for (const prop in pack.tokenizer) {
            if (!(prop in tokenizer)) {
              throw new Error(`tokenizer '${prop}' does not exist`);
            }
            if (["options", "rules", "lexer"].includes(prop)) {
              continue;
            }
            const tokenizerProp = prop;
            const tokenizerFunc = pack.tokenizer[tokenizerProp];
            const prevTokenizer = tokenizer[tokenizerProp];
            tokenizer[tokenizerProp] = (...args2) => {
              let ret = tokenizerFunc.apply(tokenizer, args2);
              if (ret === false) {
                ret = prevTokenizer.apply(tokenizer, args2);
              }
              return ret;
            };
          }
          opts.tokenizer = tokenizer;
        }
        if (pack.hooks) {
          const hooks = this.defaults.hooks || new _Hooks();
          for (const prop in pack.hooks) {
            if (!(prop in hooks)) {
              throw new Error(`hook '${prop}' does not exist`);
            }
            if (["options", "block"].includes(prop)) {
              continue;
            }
            const hooksProp = prop;
            const hooksFunc = pack.hooks[hooksProp];
            const prevHook = hooks[hooksProp];
            if (_Hooks.passThroughHooks.has(prop)) {
              hooks[hooksProp] = (arg) => {
                if (this.defaults.async) {
                  return Promise.resolve(hooksFunc.call(hooks, arg)).then((ret2) => {
                    return prevHook.call(hooks, ret2);
                  });
                }
                const ret = hooksFunc.call(hooks, arg);
                return prevHook.call(hooks, ret);
              };
            } else {
              hooks[hooksProp] = (...args2) => {
                let ret = hooksFunc.apply(hooks, args2);
                if (ret === false) {
                  ret = prevHook.apply(hooks, args2);
                }
                return ret;
              };
            }
          }
          opts.hooks = hooks;
        }
        if (pack.walkTokens) {
          const walkTokens2 = this.defaults.walkTokens;
          const packWalktokens = pack.walkTokens;
          opts.walkTokens = function(token) {
            let values = [];
            values.push(packWalktokens.call(this, token));
            if (walkTokens2) {
              values = values.concat(walkTokens2.call(this, token));
            }
            return values;
          };
        }
        this.defaults = { ...this.defaults, ...opts };
      });
      return this;
    }
    setOptions(opt) {
      this.defaults = { ...this.defaults, ...opt };
      return this;
    }
    lexer(src, options22) {
      return _Lexer.lex(src, options22 ?? this.defaults);
    }
    parser(tokens, options22) {
      return _Parser.parse(tokens, options22 ?? this.defaults);
    }
    parseMarkdown(blockType) {
      const parse2 = (src, options22) => {
        const origOpt = { ...options22 };
        const opt = { ...this.defaults, ...origOpt };
        const throwError = this.onError(!!opt.silent, !!opt.async);
        if (this.defaults.async === true && origOpt.async === false) {
          return throwError(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
        }
        if (typeof src === "undefined" || src === null) {
          return throwError(new Error("marked(): input parameter is undefined or null"));
        }
        if (typeof src !== "string") {
          return throwError(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(src) + ", string expected"));
        }
        if (opt.hooks) {
          opt.hooks.options = opt;
          opt.hooks.block = blockType;
        }
        const lexer2 = opt.hooks ? opt.hooks.provideLexer() : blockType ? _Lexer.lex : _Lexer.lexInline;
        const parser2 = opt.hooks ? opt.hooks.provideParser() : blockType ? _Parser.parse : _Parser.parseInline;
        if (opt.async) {
          return Promise.resolve(opt.hooks ? opt.hooks.preprocess(src) : src).then((src2) => lexer2(src2, opt)).then((tokens) => opt.hooks ? opt.hooks.processAllTokens(tokens) : tokens).then((tokens) => opt.walkTokens ? Promise.all(this.walkTokens(tokens, opt.walkTokens)).then(() => tokens) : tokens).then((tokens) => parser2(tokens, opt)).then((html2) => opt.hooks ? opt.hooks.postprocess(html2) : html2).catch(throwError);
        }
        try {
          if (opt.hooks) {
            src = opt.hooks.preprocess(src);
          }
          let tokens = lexer2(src, opt);
          if (opt.hooks) {
            tokens = opt.hooks.processAllTokens(tokens);
          }
          if (opt.walkTokens) {
            this.walkTokens(tokens, opt.walkTokens);
          }
          let html2 = parser2(tokens, opt);
          if (opt.hooks) {
            html2 = opt.hooks.postprocess(html2);
          }
          return html2;
        } catch (e) {
          return throwError(e);
        }
      };
      return parse2;
    }
    onError(silent, async) {
      return (e) => {
        e.message += "\nPlease report this to https://github.com/markedjs/marked.";
        if (silent) {
          const msg = "<p>An error occurred:</p><pre>" + escape22(e.message + "", true) + "</pre>";
          if (async) {
            return Promise.resolve(msg);
          }
          return msg;
        }
        if (async) {
          return Promise.reject(e);
        }
        throw e;
      };
    }
  };
  var markedInstance = new Marked();
  function marked(src, opt) {
    return markedInstance.parse(src, opt);
  }
  marked.options = marked.setOptions = function(options22) {
    markedInstance.setOptions(options22);
    marked.defaults = markedInstance.defaults;
    changeDefaults(marked.defaults);
    return marked;
  };
  marked.getDefaults = _getDefaults;
  marked.defaults = _defaults;
  marked.use = function(...args) {
    markedInstance.use(...args);
    marked.defaults = markedInstance.defaults;
    changeDefaults(marked.defaults);
    return marked;
  };
  marked.walkTokens = function(tokens, callback) {
    return markedInstance.walkTokens(tokens, callback);
  };
  marked.parseInline = markedInstance.parseInline;
  marked.Parser = _Parser;
  marked.parser = _Parser.parse;
  marked.Renderer = _Renderer;
  marked.TextRenderer = _TextRenderer;
  marked.Lexer = _Lexer;
  marked.lexer = _Lexer.lex;
  marked.Tokenizer = _Tokenizer;
  marked.Hooks = _Hooks;
  marked.parse = marked;
  var options2 = marked.options;
  var setOptions = marked.setOptions;
  var use = marked.use;
  var walkTokens = marked.walkTokens;
  var parseInline = marked.parseInline;
  var parser = _Parser.parse;
  var lexer = _Lexer.lex;

  // packages/lupine.press/src/services/markdown.ts
  var import_gray_matter = __toESM(require_gray_matter());

  // packages/lupine.press/src/frames/press-frame.tsx
  init_jsx_runtime();
  var PressFrame = (props) => {
    if (isFrontEnd()) {
      window.lpPressLoad = pressLoad;
    }
    const cssMarkdown = {
      // used in built markdown htmls, put under some element to override global.css
      "h1, h2, h3": {
        borderBottom: "1px solid var(--press-border-color)",
        paddingBottom: "0.3em",
        marginTop: "1.5em",
        position: "relative",
        scrollMarginTop: "80px",
        "&:first-child": { marginTop: 0 },
        "&:hover .header-anchor": { opacity: 1 }
      },
      ".header-anchor": {
        position: "absolute",
        left: "-1.5rem",
        width: "1rem",
        opacity: 0,
        textDecoration: "none",
        color: "var(--press-brand-color)",
        fontSize: "0.8em",
        transition: "opacity 0.2s"
      },
      ol: {
        listStyleType: "decimal"
      },
      "li, p": {
        margin: "0.5em 0"
      },
      pre: {
        backgroundColor: "var(--secondary-bg-color)",
        padding: "1rem",
        borderRadius: "8px",
        overflowX: "auto"
      },
      code: {
        fontFamily: "var(--font-family-mono, monospace)"
      }
    };
    const cssContainer = {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%",
      minHeight: "100%",
      position: "relative",
      ...cssMarkdown,
      ...props.css,
      ".press-frame-box": {
        display: "flex",
        flex: "1",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        maxWidth: MediaQueryMaxWidth.DesktopMax,
        margin: "auto",
        // trick: to put two padding-top properties
        "padding-top ": "constant(safe-area-inset-top)",
        "padding-top": "env(safe-area-inset-top)"
      },
      ".press-frame-header": {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "4px 16px 4px 0px",
        width: "100%"
      },
      ".press-frame-main": {
        display: "flex",
        flex: "1",
        flexDirection: "row",
        overflowY: "auto",
        scrollbarWidth: "none",
        borderTop: "1px solid var(--press-border-color)",
        minHeight: "0",
        scrollBehavior: "smooth",
        "&::-webkit-scrollbar": {
          display: "none"
        }
      },
      ".press-frame-main .padding-block": {
        padding: "0 16px"
      },
      ".press-frame-content": {
        display: "flex",
        flex: "1",
        flexDirection: "column",
        overflowY: "auto",
        scrollbarWidth: "none"
      },
      ".press-frame-sidemenu": {
        width: props.sidemenuWidth || "260px",
        display: "flex",
        borderRight: "1px solid var(--press-border-color)",
        overflowX: "hidden",
        overflowY: "auto",
        color: "var(--sidebar-color)",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none"
        }
        // '&::-webkit-scrollbar': { width: '4px' },
        // '&::-webkit-scrollbar-thumb': { backgroundColor: 'var(--press-border-color)' },
        // backgroundColor: 'var(--sidebar-bg-color)',
      },
      [MediaQueryRange.TabletBelow]: {
        ".press-frame-sidemenu": {
          display: "none"
        }
      }
    };
    const ref = {
      onLoad: async (el) => {
        bindLinks(el);
        const sidemenu = el.querySelector(".press-frame-sidemenu");
        if (sidemenu) {
          sidemenu.scrollTop = getSidebarScroll();
          sidemenu.addEventListener("scroll", () => {
            setSidebarScroll(sidemenu.scrollTop);
          });
        }
      }
    };
    return /* @__PURE__ */ jsx("div", { ref, css: cssContainer, class: "press-frame", children: /* @__PURE__ */ jsx("div", { class: "press-frame-box", children: [
      /* @__PURE__ */ jsx("div", { class: "press-frame-header", children: props.header }),
      /* @__PURE__ */ jsx("div", { class: "press-frame-main", children: [
        !props.hideSidemenu && /* @__PURE__ */ jsx("div", { class: "press-frame-sidemenu", children: props.sidemenu }),
        /* @__PURE__ */ jsx("div", { class: "press-frame-content", children: props.content })
      ] })
    ] }) });
  };

  // packages/lupine.press/src/components/press-sidemenu.tsx
  init_jsx_runtime();
  var PressSidemenu = (props) => {
    const css = {
      width: "100%",
      padding: "0 8px 8px",
      height: "max-content",
      // overflowY: 'auto',
      "&-item": {
        marginBottom: "0.3rem",
        display: "block",
        color: "var(--text-color)",
        textDecoration: "none",
        "&:hover": {
          color: "var(--primary-color)"
        }
      },
      "&-group-title": {
        fontWeight: "bold",
        marginTop: "0.5rem",
        marginBottom: "0.5rem",
        fontSize: "15px",
        // color: 'var(--secondary-color)',
        "&.group-level-0": {
          marginTop: "1.5rem",
          fontSize: "19px"
        },
        "&.group-level-1": {
          marginTop: "0.75rem",
          fontSize: "17px"
        }
      },
      "&-active": {
        color: "var(--primary-color)",
        fontWeight: "bold"
      }
    };
    const flatList = props.sidebar || [];
    const basePadding = 1;
    return /* @__PURE__ */ jsx("aside", { css, children: flatList.map((item, index) => {
      const style = { paddingLeft: `${item.level * basePadding}rem` };
      if (item.type === "group") {
        return /* @__PURE__ */ jsx("div", { class: "&-group-title" + (" group-level-" + item.level), style, children: item.text }, index);
      } else {
        return /* @__PURE__ */ jsx(
          "a",
          {
            class: "&-item",
            style,
            href: "javascript:void(0)",
            onClick: () => {
              pressLoad(item.link);
              return false;
            },
            children: item.text
          },
          index
        );
      }
    }) });
  };

  // packages/lupine.press/src/components/press-content.tsx
  init_src2();

  // packages/lupine.press/src/styles/menu.svg
  var menu_default = `<svg viewBox='0 0 24 24' width='20' height='20' fill='currentColor'>\r
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />\r
</svg>\r
`;

  // packages/lupine.press/src/components/press-content.tsx
  init_jsx_runtime();
  var PressContent = (props) => {
    const css = {
      display: "flex",
      flex: 1,
      maxWidth: "100vw",
      margin: "0 auto",
      width: "100%",
      ".press-content": {
        flex: 1,
        padding: props.isHome ? "0" : "2rem 4rem",
        width: "100%",
        // maxWidth: isHome ? '100%' : '800px',
        margin: props.isHome ? "0" : "0 auto",
        minWidth: 0
      },
      ".page-heading-container": {
        width: "240px",
        minWidth: "240px",
        padding: "2rem 1rem",
        position: "sticky",
        top: "64px",
        maxHeight: "calc(100vh - 64px)",
        overflowY: "auto",
        alignSelf: "flex-start",
        // Prevent stretching to full height
        display: props.isHome || props.headings.length === 0 ? "none" : "block"
      },
      ".markdown-body": {
        lineHeight: 1.6
      },
      ".press-mobile-toc": {
        display: "none",
        // border: '1px solid var(--press-border-color)',
        borderRadius: "6px",
        alignItems: "center",
        padding: "4px",
        position: "fixed",
        top: "74px",
        right: "7px",
        zIndex: 90,
        fontSize: "0.9rem",
        cursor: "pointer",
        textTransform: "uppercase",
        backgroundColor: "var(--primary-bg-color)"
      },
      ".press-mobile-sidebar": {
        display: "none",
        borderRadius: "6px",
        alignItems: "center",
        padding: "4px",
        position: "fixed",
        top: "74px",
        left: "7px",
        zIndex: 90,
        fontSize: "0.9rem",
        cursor: "pointer",
        // can't put up level, otherwise it will override parent's same level selector
        [MediaQueryRange.TabletBelow]: {
          display: "flex"
        }
      },
      [MediaQueryRange.MobileBelow]: {
        ".page-heading-container": {
          display: "none"
        },
        ".press-mobile-toc": { display: "flex" }
      }
    };
    return /* @__PURE__ */ jsx("main", { css, children: [
      !props.isHome && props.sidebar.length > 0 && /* @__PURE__ */ jsx("div", { class: "press-mobile-sidebar", children: /* @__PURE__ */ jsx(
        PopupMenu,
        {
          list: props.sidebar.map(
            (item) => ({
              text: item.text,
              id: item.link || "",
              url: item.link || "",
              indent: item.level,
              visible: item.type ? true : false,
              // Validating it's processed item
              disabled: item.type === "group",
              bold: item.type === "group"
            })
          ),
          defaultValue: "Menu",
          tips: "",
          width: "max-content",
          maxHeight: "400px",
          align: "left",
          handleSelected: (text, item) => {
            if (item && item.url) pressLoad(item.url);
          },
          noUpdateLabel: true,
          icon: /* @__PURE__ */ jsx(Svg, { children: menu_default })
        }
      ) }),
      /* @__PURE__ */ jsx("main", { class: "press-content", children: props.isHome ? /* @__PURE__ */ jsx(LayoutHome, { data: props.data }) : /* @__PURE__ */ jsx("article", { class: "markdown-body", children: props.children }) }),
      /* @__PURE__ */ jsx("aside", { class: "page-heading-container", children: /* @__PURE__ */ jsx(PageHeading, { headings: props.headings }) }),
      !props.isHome && props.headings.length > 0 && /* @__PURE__ */ jsx("div", { class: "press-mobile-toc", children: /* @__PURE__ */ jsx(
        PopupMenu,
        {
          list: props.headings.map(
            (h) => ({
              text: h.text,
              id: h.id,
              indent: h.level - 2
            })
          ),
          defaultValue: "On this page",
          tips: "",
          width: "max-content",
          maxHeight: "300px",
          align: "right",
          handleSelected: (text) => {
            var _a;
            const cleanText = text.trim();
            const heading2 = props.headings.find((h) => h.text === cleanText);
            if (heading2) {
              (_a = document.getElementById(heading2.id)) == null ? void 0 : _a.scrollIntoView(true);
            }
          },
          noUpdateLabel: true
        }
      ) })
    ] });
  };

  // packages/lupine.press/src/components/press-layout.tsx
  init_jsx_runtime();
  var PressLayout = (props) => {
    var _a;
    const isHome = ((_a = props.data) == null ? void 0 : _a.layout) === "home";
    const headings = props.headings || [];
    const currentLang = props.lang || getCurrentLang().langName;
    const sidebar = props.sidebar || [];
    const content = /* @__PURE__ */ jsx(PressContent, { sidebar, isHome, headings, data: props.data, children: props.children });
    return /* @__PURE__ */ jsx(
      PressFrame,
      {
        header: /* @__PURE__ */ jsx(
          PageHeader,
          {
            title: props.title,
            nav: props.nav,
            langs: props.langs || [],
            currentLang,
            github: props.github
          }
        ),
        sidemenu: /* @__PURE__ */ jsx(PressSidemenu, { sidebar }),
        content,
        hideSidemenu: isHome,
        sidemenuWidth: props.sidemenuWidth
      }
    );
  };

  // packages/lupine.press/src/page/press-page.tsx
  init_src2();
  init_jsx_runtime();
  var PressPage = (props) => {
    var _a, _b;
    if (!isFrontEnd()) {
      return /* @__PURE__ */ jsx("div", {});
    }
    const markdownConfig2 = getPressData();
    const pathParts = window.location.pathname.split("/");
    const pathLang = pathParts[1];
    const globalConfig = ((_a = markdownConfig2["/"]) == null ? void 0 : _a.data) || {};
    const supportedLangs = Array.isArray(globalConfig.lang) ? globalConfig.lang.map((l) => l.id) : ["en", "zh"];
    const langName = supportedLangs.includes(pathLang) ? pathLang : supportedLangs[0] || "en";
    Promise.resolve().then(() => (init_src2(), src_exports)).then((m) => {
      if (m.getCurrentLang().langName !== langName) {
        m.updateLang(langName);
      }
    });
    let currentPath = window.location.pathname;
    if (currentPath === "" || currentPath === "/") {
      currentPath = `/${langName}/index`;
    } else {
      if (currentPath.endsWith("/") && currentPath.length > 1)
        currentPath = currentPath.substring(0, currentPath.length - 1);
      if (currentPath === `/${langName}`) currentPath = `/${langName}/index`;
    }
    const config = markdownConfig2[currentPath];
    const content = config ? config.html : `<h1>404 - Page Not Found</h1><p>Path: ${currentPath}</p>`;
    const rootIndex = ((_b = markdownConfig2[`/${langName}/index`]) == null ? void 0 : _b.data) || {};
    const rootNav = rootIndex.nav || [];
    const rootSidebar = rootIndex.sidebar || [];
    const siteTitle = rootIndex.title || "LupineJS";
    const langs = supportedLangs.map((l) => {
      var _a2;
      const data = ((_a2 = markdownConfig2[`/${l}/index`]) == null ? void 0 : _a2.data) || {};
      const langData = Array.isArray(data.lang) ? data.lang[0] : data.lang || {};
      return {
        text: langData.text || langData.title || langData.label || l.toUpperCase(),
        id: l
      };
    });
    return /* @__PURE__ */ jsx(
      PressLayout,
      {
        title: siteTitle,
        nav: rootNav,
        sidebar: rootSidebar,
        lang: langName,
        langs,
        data: config == null ? void 0 : config.data,
        headings: config == null ? void 0 : config.headings,
        sidemenuWidth: rootIndex["sidemenu-width"],
        github: { url: rootIndex["github-link"], title: rootIndex["github-title"] },
        children: content
      }
    );
  };

  // packages/lupine.press/src/styles/press-themes.ts
  init_src2();
  var pressThemes = {
    light: {
      ...baseThemes.light,
      "--press-border-color": "#e2e2e3",
      "--press-brand-color": "#3eaf7c"
    },
    dark: {
      ...baseThemes.dark,
      "--press-border-color": "#2e2e32",
      "--press-brand-color": "#3eaf7c"
    }
  };

  // apps/doc/web/src/markdown-built/index.html
  var markdown_built_default = "";

  // apps/doc/web/src/markdown-built/en/essentials/api.html
  var api_default = '<h1 id="api-reference"><a class="header-anchor" href="#api-reference">#</a>API Reference</h1><p>LupineJS provides a minimalist set of APIs for both web and server development.</p>\n<h2 id="lupine-web-frontend"><a class="header-anchor" href="#lupine-web-frontend">#</a>Lupine.web (Frontend)</h2><h3 id="bindrouter"><a class="header-anchor" href="#bindrouter">#</a>`bindRouter`</h3><p>Binds the page router to the application.</p>\n<pre><code class="language-typescript">import { bindRouter, PageRouter } from &#39;lupine.components&#39;;\nconst pageRouter = new PageRouter();\npageRouter.use(&#39;/&#39;, HomePage);\nbindRouter(pageRouter);\n</code></pre>\n<h3 id="bindtheme"><a class="header-anchor" href="#bindtheme">#</a>`bindTheme`</h3><p>Binds theme configurations.</p>\n<pre><code class="language-typescript">import { bindTheme } from &#39;lupine.components&#39;;\nbindTheme(&#39;light&#39;, themes);\n</code></pre>\n<h3 id="bindlang"><a class="header-anchor" href="#bindlang">#</a>`bindLang`</h3><p>Binds multi-language support.</p>\n<pre><code class="language-typescript">import { bindLang } from &#39;lupine.components&#39;;\nbindLang(&#39;en&#39;, { en, zh });\n</code></pre>\n<h2 id="lupine-api-backend"><a class="header-anchor" href="#lupine-api-backend">#</a>Lupine.api (Backend)</h2><h3 id="apimodule"><a class="header-anchor" href="#apimodule">#</a>`ApiModule`</h3><p>Main module for the backend service.</p>\n<pre><code class="language-typescript">import { ApiModule } from &#39;lupine.api&#39;;\nexport const apiModule = new ApiModule(new RootApi());\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/en/guide/install.html
  var install_default = '<h1 id="installation"><a class="header-anchor" href="#installation">#</a>Installation</h1><p>LupineJS can be installed by cloning the main repository.</p>\n<h2 id="development-environment"><a class="header-anchor" href="#development-environment">#</a>Development Environment</h2><ol>\n<li><p><strong>Clone Repo</strong>:</p>\n<pre><code class="language-bash">git clone https://github.com/uuware/lupine.js.git\n</code></pre>\n</li>\n<li><p><strong>Dependencies</strong>:</p>\n<pre><code class="language-bash">npm install\n</code></pre>\n</li>\n<li><p><strong>Environment Setup</strong>:\nCopy <code>.env.sample</code> to <code>.env</code> and configure accordingly.</p>\n</li>\n</ol>\n<h2 id="production-build"><a class="header-anchor" href="#production-build">#</a>Production Build</h2><p>To build for production:</p>\n<pre><code class="language-bash">npm run build\n</code></pre>\n<p>The build output will be in the <code>dist/server_root</code> directory.</p>\n';

  // apps/doc/web/src/markdown-built/en/guide/started.html
  var started_default = '<h1 id="getting-started"><a class="header-anchor" href="#getting-started">#</a>Getting Started</h1><p>Lupine.js is a full-featured web application that includes both frontend and backend.</p>\n<h2 id="prerequisites"><a class="header-anchor" href="#prerequisites">#</a>Prerequisites</h2><ul>\n<li>Node.js &gt;= 20</li>\n</ul>\n<h2 id="quick-start"><a class="header-anchor" href="#quick-start">#</a>Quick Start</h2><ol>\n<li>Clone the repository locally:</li>\n</ol>\n<pre><code class="language-bash">git clone https://github.com/uuware/lupine.js.git\n</code></pre>\n<ol start="2">\n<li>Install dependencies:</li>\n</ol>\n<pre><code class="language-bash">npm i\n</code></pre>\n<ol start="3">\n<li>Run the development application:</li>\n</ol>\n<pre><code class="language-bash">npm run dev\n</code></pre>\n<ol start="4">\n<li>Open <code>http://localhost:11080</code> to see the development application.</li>\n</ol>\n';

  // apps/doc/web/src/markdown-built/en/index.html
  var en_default = "";

  // apps/doc/web/src/markdown-built/en/lupine.api/api.html
  var api_default2 = '<h1 id="api-module-src-api"><a class="header-anchor" href="#api-module-src-api">#</a>API Module (`src/api`)</h1><p>The API Module provides the framework for writing the business logic of your application. It acts similarly to Express.js but is optimized for the lupine ecosystem.</p>\n<h2 id="key-features"><a class="header-anchor" href="#key-features">#</a>Key Features</h2><ul>\n<li><strong>ApiRouter</strong>: A flexible router supporting GET, POST, and middleware-like filters.</li>\n<li><strong>Context Isolation</strong>: Uses <code>AsyncStorage</code> to safely manage request-scoped data (like sessions or database transactions) across async operations.</li>\n<li><strong>Database Integration</strong>: Built-in helpers for database connections (e.g., SQLite via <code>better-sqlite3</code>).</li>\n</ul>\n<h2 id="usage-example"><a class="header-anchor" href="#usage-example">#</a>Usage Example</h2><p>An application&#39;s API entry point (e.g., <code>apps/demo.app/api/src/index.ts</code>) typically exports an instance of <code>ApiModule</code>.</p>\n<p><strong>1. Entry Point (<code>index.ts</code>):</strong></p>\n<pre><code class="language-typescript">import { ApiModule } from &#39;lupine.api&#39;;\nimport { RootApi } from &#39;./service/root-api&#39;;\n\n// Export apiModule so the server can load it dynamically\nexport const apiModule = new ApiModule(new RootApi());\n</code></pre>\n<p><strong>2. Root API Service (<code>service/root-api.ts</code>):</strong></p>\n<pre><code class="language-typescript">import { ApiRouter, IApiBase, IApiRouter } from &#39;lupine.api&#39;;\n\nexport class RootApi implements IApiBase {\n  getRouter(): IApiRouter {\n    const router = new ApiRouter();\n\n    // Define routes\n    router.get(&#39;/hello&#39;, async (req, res) =&gt; {\n      res.write(JSON.stringify({ message: &#39;Hello World&#39; }));\n      res.end();\n      return true; // Return true to indicate request was handled\n    });\n\n    // Sub-routers can be mounted\n    // router.use(&#39;/users&#39;, new UserApi().getRouter());\n\n    return router;\n  }\n}\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/en/lupine.api/app.html
  var app_default = '<h1 id="server-src-app"><a class="header-anchor" href="#server-src-app">#</a>Server (`src/app`)</h1><p>The server component is responsible for handling incoming network requests, managing SSL certificates, and dispatching requests to the appropriate application based on domain configuration. It supports clustering logic to utilize multi-core CPUs efficiently.</p>\n<h2 id="key-features"><a class="header-anchor" href="#key-features">#</a>Key Features</h2><ul>\n<li><strong>Multi-App &amp; Multi-Domain</strong>: Host multiple independent applications on a single server instance, routing traffic based on domain names.</li>\n<li><strong>Cluster Support</strong>: Automatically forks worker processes to match CPU cores for high performance.</li>\n<li><strong>SSL/TLS</strong>: Built-in support for HTTPS with custom certificate paths.</li>\n<li><strong>Environment Management</strong>: Loads configuration from <code>.env</code> files.</li>\n</ul>\n<h2 id="usage-example"><a class="header-anchor" href="#usage-example">#</a>Usage Example</h2><p>See <code>apps/server/src/index.ts</code> for a complete example.</p>\n<pre><code class="language-typescript">import { appStart, loadEnv, ServerEnvKeys } from &#39;lupine.api&#39;;\nimport * as path from &#39;path&#39;;\n\nconst initAndStartServer = async () =&gt; {\n  // 1. Load Environment Variables\n  await loadEnv(&#39;.env&#39;);\n\n  // 2. Configure Applications\n  const serverRootPath = path.resolve(process.env[ServerEnvKeys.SERVER_ROOT_PATH]!);\n  const webRootMap = [\n    {\n      appName: &#39;demo.app&#39;,\n      hosts: [&#39;localhost&#39;, &#39;example.com&#39;],\n      // Standard directory structure expected by lupine.api\n      webPath: path.join(serverRootPath, &#39;demo.app_web&#39;),\n      dataPath: path.join(serverRootPath, &#39;demo.app_data&#39;),\n      apiPath: path.join(serverRootPath, &#39;demo.app_api&#39;),\n      dbType: &#39;sqlite&#39;,\n      dbConfig: { filename: &#39;sqlite3.db&#39; },\n    },\n  ];\n\n  // 3. Start Server\n  await appStart.start({\n    debug: process.env.NODE_ENV === &#39;development&#39;,\n    apiConfig: {\n      serverRoot: serverRootPath,\n      webHostMap: webRootMap,\n    },\n    serverConfig: {\n      httpPort: 8080,\n      httpsPort: 8443,\n      // sslKeyPath: &#39;...&#39;,\n      // sslCrtPath: &#39;...&#39;,\n    },\n  });\n};\n\ninitAndStartServer();\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/en/lupine.api/dashboard.html
  var dashboard_default = '<h1 id="lupine-api-dashboard"><a class="header-anchor" href="#lupine-api-dashboard">#</a>lupine.api dashboard</h1><p>lupine.api includes a built-in extensible dashboard for managing your API services. The dashboard features a management sidebar on the left and a multi-tab content area on the right.</p>\n<h2 id="features"><a class="header-anchor" href="#features">#</a>Features</h2><p>The dashboard provides comprehensive backend management capabilities, categorized as follows:</p>\n<h3 id="1-database-management-db"><a class="header-anchor" href="#1-database-management-db">#</a>1. Database Management (DB)</h3><p>Tools for direct database manipulation, useful for debugging and maintenance.</p>\n<ul>\n<li><strong>Table List</strong>: Browse database tables and view data.</li>\n<li><strong>Create Tables</strong>: Run preset scripts to initialize or repair database table structures.</li>\n<li><strong>Run SQL</strong>: execute arbitrary SQL statements and view results in JSON format.</li>\n</ul>\n<h3 id="2-operations-server-management-access-server-info"><a class="header-anchor" href="#2-operations-server-management-access-server-info">#</a>2. Operations & Server Management (Access & Server Info)</h3><p>Core operations toolkit for remote management and monitoring.</p>\n<h4 id="release-management"><a class="header-anchor" href="#release-management">#</a>Release Management</h4><p>Powerful tools for multi-node/multi-environment deployment.</p>\n<ul>\n<li><strong>Sync</strong>: Support synchronizing code or resources from a source environment (From) to a target environment (To).</li>\n<li><strong>Full Stack Update</strong>: Selectively update Server (core), Api (logic), Env (variables), etc.</li>\n<li><strong>Web Update</strong>: Independently update frontend resources by sub-folder.</li>\n<li><strong>Controls</strong>:<ul>\n<li><strong>Check</strong>: Verify update status.</li>\n<li><strong>Refresh Cache</strong>: Refresh server cache (Remote/Local).</li>\n<li><strong>Restart App</strong>: Restart the application (Remote/Local).</li>\n<li><strong>Run Cmd</strong>: Execute Shell commands directly on the server.</li>\n</ul>\n</li>\n<li><strong>Logs</strong>: View and download history logs of release operations.</li>\n</ul>\n<h4 id="utilities"><a class="header-anchor" href="#utilities">#</a>Utilities</h4><ul>\n<li><strong>Tokens</strong>: Manage API access tokens.</li>\n<li><strong>Shell</strong>: WebSocket-based online terminal for real-time server interaction.</li>\n<li><strong>Resources</strong>: Browse, upload, and download files from the server filesystem.</li>\n<li><strong>Config</strong>: View and hot-patch system runtime configurations.</li>\n<li><strong>Performance</strong>: Monitor server metrics like CPU and Memory usage.</li>\n</ul>\n<h3 id="3-development-testing-test"><a class="header-anchor" href="#3-development-testing-test">#</a>3. Development & Testing (Test)</h3><p>Tools for debugging components and UI during development.</p>\n<ul>\n<li><strong>Test Themes</strong>: Preview and test different UI theme configurations.</li>\n<li><strong>Test Component</strong>: Test interaction and rendering of generic UI components.</li>\n<li><strong>Test Animations</strong>: Demo and debug CSS/JS animations.</li>\n<li><strong>Test Edit</strong>: Test rich text editor or form editing features.</li>\n</ul>\n<hr>\n<h2 id="extension-development"><a class="header-anchor" href="#extension-development">#</a>Extension Development</h2><p>The Dashboard is highly extensible. Core logic resides in the <code>packages/lupine.api/admin</code> directory.</p>\n<h3 id="menu-configuration"><a class="header-anchor" href="#menu-configuration">#</a>Menu Configuration</h3><p>Menus are configured via the <code>adminTopMenu</code> array in <code>admin-frame-helper.tsx</code>. You can easily add new menu items:</p>\n<pre><code class="language-typescript">const myMenu = {\n  id: &#39;my-feature&#39;,\n  text: &#39;My Feature&#39;,\n  items: [\n    {\n      id: &#39;my-page&#39;,\n      text: &#39;My Page&#39;,\n      js: () =&gt; this.addPanel(&#39;My Page&#39;, &lt;MyComponent /&gt;),\n    },\n  ],\n};\n</code></pre>\n<h3 id="page-development"><a class="header-anchor" href="#page-development">#</a>Page Development</h3><p>Each management page is a standard <code>lupine.components</code> component. Use <code>AdminPanel</code> and <code>Tabs</code> components to manage the multi-tab experience.</p>\n';

  // apps/doc/web/src/markdown-built/en/lupine.components-libs/date-utils.html
  var date_utils_default = '<h1 id="dateutils"><a class="header-anchor" href="#dateutils">#</a>DateUtils</h1><p>Comprehensive date manipulation utilities.</p>\n<p><strong>Usage:</strong></p>\n<pre><code class="language-typescript">import { DateUtils } from &#39;lupine.components&#39;;\n\nconst now = DateUtils.now();\nconst date = DateUtils.toDate(&#39;2023-01-01T12:00:00Z&#39;);\nconst ymd = DateUtils.toYMD(date, &#39;/&#39;); // 2023/01/01\nconst formatted = DateUtils.format(date, &#39;YYYY-MM-DD hh:mm:ss&#39;);\n\n// Difference between two dates\nconst diff = DateUtils.diffString(new Date(), date);\nconsole.log(diff); // e.g., &quot;2 day(s), 4 hour(s)&quot;\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/en/lupine.components-libs/dom-utils.html
  var dom_utils_default = '<h1 id="domutils"><a class="header-anchor" href="#domutils">#</a>DomUtils</h1><p>Helper functions for common DOM operations, mostly shorthand for <code>querySelector</code>.</p>\n<p><strong>Usage Example (from <code>admin-resources.tsx</code>):</strong></p>\n<pre><code class="language-typescript">import { DomUtils } from &#39;lupine.components&#39;;\n\n// Get input value\nconst value = DomUtils.getValue(&#39;#my-input&#39;);\n\n// Trigger click on a hidden file input\nconst fDom = DomUtils.bySelector(&#39;.up-file&#39;) as HTMLInputElement;\nfDom.click();\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/en/lupine.components-libs/download-stream.html
  var download_stream_default = '<h1 id="downloadstream"><a class="header-anchor" href="#downloadstream">#</a>downloadStream</h1><p>Download a <code>Blob</code> as a file by creating a temporary anchor tag.</p>\n<p><strong>Usage Example (from <code>admin-resources.tsx</code>):</strong></p>\n<pre><code class="language-typescript">import { downloadStream } from &#39;lupine.components&#39;;\n\nconst onDownload = async (name: string) =&gt; {\n  const response = await fetch(&#39;/api/download?file=&#39; + name);\n  const blob = await response.blob();\n  downloadStream(blob, name);\n};\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/en/lupine.components-libs/drag-util.html
  var drag_util_default = '<h1 id="dragutil"><a class="header-anchor" href="#dragutil">#</a>DragUtil</h1><p>Helper for implementing drag-and-drop or touch-move functionality.</p>\n<p><strong>Usage:</strong></p>\n<pre><code class="language-typescript">import { createDragUtil } from &#39;lupine.components&#39;;\n\nconst dragUtil = createDragUtil();\ndragUtil.setOnMoveCallback((clientX, clientY, movedX, movedY) =&gt; {\n  console.log(`Moved by ${movedX}, ${movedY}`);\n  // Update element position here\n});\n\n// Bind to events\n&lt;div onMouseDown={dragUtil.onMouseDown} onMouseMove={dragUtil.onMouseMove} onMouseUp={dragUtil.onMouseUp}&gt;\n  Drag Me\n&lt;/div&gt;;\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/en/lupine.components-libs/dynamical-load.html
  var dynamical_load_default = '<h1 id="dynamicalload"><a class="header-anchor" href="#dynamicalload">#</a>DynamicalLoad</h1><p>Dynamically load external Scripts or CSS files. Used for lazy loading third-party SDKs.</p>\n<p><strong>Usage Example (from <code>wx-share.ts</code>):</strong></p>\n<pre><code class="language-typescript">import { DynamicalLoad } from &#39;lupine.components&#39;;\n\n// Load WeChat JS-SDK dynamically\nif (typeof wx === &#39;undefined&#39;) {\n  await DynamicalLoad.loadScript(&#39;//res.wx.qq.com/open/js/jweixin-1.6.0.js&#39;, &#39;jweixin&#39;);\n}\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/en/lupine.components-libs/format-bytes.html
  var format_bytes_default = '<h1 id="formatbytes"><a class="header-anchor" href="#formatbytes">#</a>formatBytes</h1><p>Format file size in bytes into human-readable strings (KB, MB, GB, etc.).</p>\n<p><strong>Usage Example (from <code>admin-resources.tsx</code>):</strong></p>\n<pre><code class="language-typescript">import { formatBytes } from &#39;lupine.components&#39;;\n\nconst sizeStr = formatBytes(1024 * 1024 * 5); // &quot;5 MB&quot;\nconst sizeStr2 = formatBytes(123456); // &quot;120.56 KB&quot;\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/en/lupine.components-libs/lite-dom.html
  var lite_dom_default = '<h1 id="litedom"><a class="header-anchor" href="#litedom">#</a>LiteDom</h1><p>A lightweight, chainable DOM wrapper similar to jQuery.</p>\n<p><strong>Usage:</strong></p>\n<pre><code class="language-typescript">import { LiteDom } from &#39;lupine.components&#39;;\n\nconst el = new LiteDom(&#39;#my-element&#39;);\nel.css(&#39;color&#39;, &#39;red&#39;)\n  .html(&#39;Hello World&#39;)\n  .on(&#39;click&#39;, () =&gt; {\n    console.log(&#39;Clicked!&#39;);\n  });\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/en/lupine.components-libs/message-hub.html
  var message_hub_default = '<h1 id="messagehub"><a class="header-anchor" href="#messagehub">#</a>MessageHub</h1><p>A publish-subscribe event bus for communication between components.</p>\n<p><strong>Usage Example (from <code>admin-test-animations.tsx</code>):</strong></p>\n<pre><code class="language-typescript">import { MessageHub, MessageHubData } from &#39;lupine.components&#39;;\n\nconst hub = new MessageHub();\n\n// Subscribe to messages\nhub.subscribe(&#39;test-event&#39;, (data: any) =&gt; {\n  console.log(&#39;Received:&#39;, data);\n});\n\n// Send message\nhub.send(&#39;test-event&#39;, { text: &#39;Hello&#39; });\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/en/lupine.components-libs/observable.html
  var observable_default = '<h1 id="observable"><a class="header-anchor" href="#observable">#</a>Observable</h1><p>Implementation of the Observable pattern, inspired by RxJS.</p>\n<p><strong>Usage:</strong></p>\n<pre><code class="language-typescript">import { Subject } from &#39;lupine.components&#39;;\n\nconst subject = new Subject&lt;string&gt;();\n\nconst subscription = subject.subscribe((value) =&gt; {\n  console.log(&#39;Observer A received:&#39;, value);\n});\n\nsubject.next(&#39;Hello&#39;);\nsubject.next(&#39;World&#39;);\n\nsubscription.unsubscribe();\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/en/lupine.components-libs/simple-storage.html
  var simple_storage_default = '<h1 id="simplestorage"><a class="header-anchor" href="#simplestorage">#</a>SimpleStorage</h1><p>A wrapper for <code>localStorage</code> (or similar key-value storage) offering typed getters.</p>\n<p><strong>Usage:</strong></p>\n<pre><code class="language-typescript">import { SimpleStorage } from &#39;lupine.components&#39;;\n\n// Assuming initialized with some storage object like localStorage\nconst storage = new SimpleStorage(localStorage as any);\n\nstorage.set(&#39;theme&#39;, &#39;dark&#39;);\nconst theme = storage.get(&#39;theme&#39;, &#39;light&#39;); // returns &#39;dark&#39;\nconst isDebug = storage.getBoolean(&#39;debug&#39;, false);\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/en/lupine.components-libs/upload-file.html
  var upload_file_default = '<h1 id="uploadfile"><a class="header-anchor" href="#uploadfile">#</a>uploadFile</h1><p>Handle file uploads with chunking support, progress tracking, and retries.</p>\n<p><strong>Usage Example (from <code>admin-resources.tsx</code>):</strong></p>\n<pre><code class="language-typescript">import { uploadFile } from &#39;lupine.components&#39;;\n\nconst onUploadProgress = (percentage: number, chunkNumber: number, totalChunks: number) =&gt; {\n  console.log(`Progress: ${percentage * 100}%`);\n};\n\nconst onFileChange = async (e: Event) =&gt; {\n  const target = e.target as HTMLInputElement;\n  const file = target.files?.[0];\n  if (!file) return;\n\n  const result = await uploadFile(file, &#39;/api/upload?name=&#39; + file.name, onUploadProgress);\n\n  if (result === true) {\n    console.log(&#39;Upload success&#39;);\n  }\n};\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/en/lupine.components/action-sheet.html
  var action_sheet_default = '<h1 id="action-sheet"><a class="header-anchor" href="#action-sheet">#</a>Action Sheet</h1><p>A sliding window from the bottom on mobile devices, used for displaying new pages or setting options.</p>\n<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { ActionSheetSelect, NotificationMessage, NotificationColor } from &#39;lupine.components&#39;;\n\nActionSheetSelect.show({\n  title: &#39;Select Action&#39;,\n  options: [&#39;Option A&#39;, &#39;Option B&#39;, &#39;Option C&#39;],\n  handleClicked: (index, close) =&gt; {\n    NotificationMessage.sendMessage(&#39;Selected index: &#39; + index, NotificationColor.Success);\n    close();\n  },\n});\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/en/lupine.components/button.html
  var button_default = '<h1 id="button"><a class="header-anchor" href="#button">#</a>Button</h1><p>Basic buttons with multiple sizes and push animation.</p>\n<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { Button, ButtonSize } from &#39;lupine.components&#39;;\n\n&lt;Button text=&#39;Submit&#39; size={ButtonSize.Large} onClick={() =&gt; {}} /&gt;\n&lt;Button text=&#39;Search&#39; size={ButtonSize.Medium} onClick={() =&gt; {}} /&gt;\n&lt;Button text=&#39;Cancel&#39; size={ButtonSize.Small} onClick={() =&gt; {}} /&gt;\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/en/lupine.components/drag-fresh.html
  var drag_fresh_default = '<h1 id="dragfresh"><a class="header-anchor" href="#dragfresh">#</a>DragFresh</h1><p>Drag-to-refresh component, commonly used at the top of mobile lists.</p>\n<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { DragFresh } from &#39;lupine.components&#39;;\n\n&lt;DragFresh\n  onRefresh={async () =&gt; {\n    // Perform refresh logic\n    await fetchData();\n  }}\n&gt;\n  &lt;ListContent /&gt;\n&lt;/DragFresh&gt;;\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/en/lupine.components/editable-label.html
  var editable_label_default = '<h1 id="editablelabel"><a class="header-anchor" href="#editablelabel">#</a>EditableLabel</h1><p>Label that becomes editable on double-click and triggers a save event on blur.</p>\n<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { EditableLabel } from &#39;lupine.components&#39;;\n\n&lt;EditableLabel\n  value=&#39;Click to edit me&#39;\n  onSave={(newValue) =&gt; {\n    console.log(&#39;Saved new value:&#39;, newValue);\n  }}\n/&gt;;\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/en/lupine.components/float-window.html
  var float_window_default = '<h1 id="floatwindow"><a class="header-anchor" href="#floatwindow">#</a>FloatWindow</h1><p>A draggable popup window. Supports modal and non-modal modes.</p>\n<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { FloatWindow } from &#39;lupine.components&#39;;\n\n// Show a non-modal window\nFloatWindow.show({\n  title: &#39;Toolbox&#39;,\n  buttons: [&#39;OK&#39;],\n  handleClicked: (index, close) =&gt; {\n    close();\n  },\n  children: &lt;div&gt;This is the content of a non-modal float window.&lt;/div&gt;,\n  noModal: true,\n});\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/en/lupine.components/grid.html
  var grid_default = '<h1 id="grid"><a class="header-anchor" href="#grid">#</a>Grid</h1><p>Responsive grid layout for displaying complex layouts.</p>\n<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { Grid } from &#39;lupine.components&#39;;\n\n&lt;Grid columns={3} gap=&#39;10px&#39;&gt;\n  &lt;div&gt;Item 1&lt;/div&gt;\n  &lt;div&gt;Item 2&lt;/div&gt;\n  &lt;div&gt;Item 3&lt;/div&gt;\n&lt;/Grid&gt;;\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/en/lupine.components/html-load.html
  var html_load_default = '<h1 id="htmlload"><a class="header-anchor" href="#htmlload">#</a>HtmlLoad</h1><p>Component for asynchronously loading and displaying remote HTML content.</p>\n<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { HtmlLoad } from &#39;lupine.components&#39;;\n\n&lt;HtmlLoad url=&#39;/api/v1/content/article-1&#39; /&gt;;\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/en/lupine.components/html-var.html
  var html_var_default = '<h1 id="htmlvar"><a class="header-anchor" href="#htmlvar">#</a>HtmlVar</h1><p>A core component used to display or dynamically update HTML content via variables.</p>\n<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { HtmlVar } from &#39;lupine.components&#39;;\n\n// Simple HTML display\n&lt;HtmlVar html=&#39;&lt;p&gt;Hello &lt;b&gt;Lupine!&lt;/b&gt;&lt;/p&gt;&#39; /&gt;;\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/en/lupine.components/input-with-title.html
  var input_with_title_default = '<h1 id="inputwithtitle"><a class="header-anchor" href="#inputwithtitle">#</a>InputWithTitle</h1><p>Input field combined with a title.</p>\n<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { InputWithTitle } from &#39;lupine.components&#39;;\n\nconst input = InputWithTitle(&#39;Username&#39;, &#39;Enter your name&#39;, (value) =&gt; {\n  console.log(&#39;Value entered:&#39;, value);\n});\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/en/lupine.components/menu-bar.html
  var menu_bar_default = '<h1 id="menubar"><a class="header-anchor" href="#menubar">#</a>Menubar</h1><p>Horizontal navigation bar with dropdown support.</p>\n<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { Menubar } from &#39;lupine.components&#39;;\n\nconst menuItems = [\n  { text: &#39;Home&#39;, link: &#39;/&#39; },\n  {\n    text: &#39;Products&#39;,\n    children: [\n      { text: &#39;LupineJS&#39;, link: &#39;/lupine&#39; },\n      { text: &#39;Components&#39;, link: &#39;/components&#39; },\n    ],\n  },\n];\n\n&lt;Menubar items={menuItems} /&gt;;\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/en/lupine.components/menu-sidebar.html
  var menu_sidebar_default = '<h1 id="menusidebar"><a class="header-anchor" href="#menusidebar">#</a>MenuSidebar</h1><p>Vertical sidebar menu with multi-level support, desktop and mobile adaptive.</p>\n<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { MenuSidebar } from &#39;lupine.components&#39;;\n\nconst myMenu = [\n  { text: &#39;Dashboard&#39;, icon: &#39;dashboard&#39;, onClick: () =&gt; navigate(&#39;/admin&#39;) },\n  {\n    text: &#39;Settings&#39;,\n    icon: &#39;settings&#39;,\n    children: [\n      { text: &#39;Profile&#39;, onClick: () =&gt; navigate(&#39;/profile&#39;) },\n      { text: &#39;Security&#39;, onClick: () =&gt; navigate(&#39;/security&#39;) },\n    ],\n  },\n];\n\n&lt;MenuSidebar items={myMenu} desktopMenu={true} /&gt;;\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/en/lupine.components/message-box.html
  var message_box_default = '<h1 id="messagebox"><a class="header-anchor" href="#messagebox">#</a>MessageBox</h1><p>Predefined dialogs (like Yes/No, Ok/Cancel) for quick alerts.</p>\n<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { MessageBox, MessageBoxButtonProps } from &#39;lupine.components&#39;;\n\nMessageBox.show({\n  title: &#39;Delete Confirmation&#39;,\n  buttonType: MessageBoxButtonProps.YesNo,\n  contentMinWidth: &#39;200px&#39;,\n  handleClicked: (index, close) =&gt; {\n    if (index === 0) {\n      // Yes\n      console.log(&#39;User confirmed&#39;);\n    }\n    close();\n  },\n  children: &lt;div&gt;Are you sure you want to delete this item?&lt;/div&gt;,\n});\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/en/lupine.components/modal.html
  var modal_default = '<h1 id="modal"><a class="header-anchor" href="#modal">#</a>Modal</h1><p>A popup window with or without modal effect, used for blocking interactions. It is draggable.</p>\n<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { ModalWindow } from &#39;lupine.components&#39;;\n\nModalWindow.show({\n  title: &#39;Notification&#39;,\n  buttons: [&#39;OK&#39;, &#39;Cancel&#39;],\n  closeWhenClickOutside: true,\n  contentMinWidth: &#39;300px&#39;,\n  handleClicked: (index, close) =&gt; {\n    console.log(&#39;Button index clicked:&#39;, index);\n    close();\n  },\n  children: &lt;div&gt;This is the content of a modal dialog.&lt;/div&gt;,\n});\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/en/lupine.components/notice-message.html
  var notice_message_default = '<h1 id="noticemessage"><a class="header-anchor" href="#noticemessage">#</a>NoticeMessage</h1><p>A core component used to display global notification messages at the top of the page. Supports multiple color levels.</p>\n<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { NotificationMessage, NotificationColor } from &#39;lupine.components&#39;;\n\n// Success notification\nNotificationMessage.sendMessage(&#39;Data saved successfully&#39;, NotificationColor.Success);\n\n// Error notification (Permanent)\nNotificationMessage.sendMessage(&#39;Network error, please check&#39;, NotificationColor.Error, true);\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/en/lupine.components/paging-link.html
  var paging_link_default = '<h1 id="paginglink"><a class="header-anchor" href="#paginglink">#</a>PagingLink</h1><p>Pagination component for displaying and navigating to different page numbers.</p>\n<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { PagingLink } from &#39;lupine.components&#39;;\n\n&lt;PagingLink\n  totalCount={100}\n  pageSize={10}\n  currentPage={1}\n  onPageChange={(page) =&gt; console.log(&#39;Navigate to page:&#39;, page)}\n/&gt;;\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/en/lupine.components/popup-menu.html
  var popup_menu_default = '<h1 id="popupmenu"><a class="header-anchor" href="#popupmenu">#</a>PopupMenu</h1><p>Popup menu triggered by click or hover. Used for displaying options.</p>\n<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { PopupMenuWithButton } from &#39;lupine.components&#39;;\n\nconst options = [&#39;Settings&#39;, &#39;Messages&#39;, &#39;Logout&#39;];\n\n&lt;PopupMenuWithButton label=&#39;My Account&#39; list={options} handleSelected={(value) =&gt; console.log(&#39;Selected:&#39;, value)} /&gt;;\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/en/lupine.components/progress.html
  var progress_default = '<h1 id="progress"><a class="header-anchor" href="#progress">#</a>Progress</h1><p>Used to display the progress of uploads, downloads, or other time-consuming operations.</p>\n<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { Progress } from &#39;lupine.components&#39;;\n\n&lt;Progress value={75} max={100} showText={true} /&gt;;\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/en/lupine.components/radio-label.html
  var radio_label_default = '<h1 id="radiolabel"><a class="header-anchor" href="#radiolabel">#</a>RadioLabel</h1><p>Radio button group labels.</p>\n<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">// Used with input-label class\n&lt;label class=&#39;input-label&#39;&gt;\n  &lt;input class=&#39;input-base&#39; type=&#39;radio&#39; name=&#39;group1&#39; /&gt;\n  Option A\n&lt;/label&gt;\n&lt;label class=&#39;input-label&#39;&gt;\n  &lt;input class=&#39;input-base&#39; type=&#39;radio&#39; name=&#39;group1&#39; checked /&gt;\n  Option B\n&lt;/label&gt;\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/en/lupine.components/redirect.html
  var redirect_default = '<h1 id="redirect"><a class="header-anchor" href="#redirect">#</a>Redirect</h1><p>Redirection component for page navigation.</p>\n<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { Redirect } from &#39;lupine.components&#39;;\n\n&lt;Redirect to=&#39;/login&#39; /&gt;;\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/en/lupine.components/resizable-splitter.html
  var resizable_splitter_default = '<h1 id="resizablesplitter"><a class="header-anchor" href="#resizablesplitter">#</a>ResizableSplitter</h1><p>Splitter that allows dragging to resize two components.</p>\n<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { ResizableSplitter } from &#39;lupine.components&#39;;\n\n&lt;ResizableSplitter left={&lt;div&gt;Left Content&lt;/div&gt;} right={&lt;div&gt;Right Content&lt;/div&gt;} minWidth=&#39;200px&#39; /&gt;;\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/en/lupine.components/select-angle.html
  var select_angle_default = '<h1 id="selectangle"><a class="header-anchor" href="#selectangle">#</a>SelectAngle</h1><p>360-degree angle selector.</p>\n<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { SelectAngle } from &#39;lupine.components&#39;;\n\n&lt;SelectAngle value={90} onChange={(angle) =&gt; console.log(&#39;Selected angle:&#39;, angle)} /&gt;;\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/en/lupine.components/select-with-title.html
  var select_with_title_default = '<h1 id="selectwithtitle"><a class="header-anchor" href="#selectwithtitle">#</a>SelectWithTitle</h1><p>Dropdown select list combined with a title.</p>\n<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { SelectWithTitle } from &#39;lupine.components&#39;;\n\nconst options = [\n  { option: &#39;Option 1&#39;, value: &#39;1&#39; },\n  { option: &#39;Option 2&#39;, value: &#39;2&#39;, selected: true },\n];\n\nconst select = SelectWithTitle(&#39;Select Level&#39;, options, (value) =&gt; {\n  console.log(&#39;Selected value:&#39;, value);\n});\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/en/lupine.components/slide-tab.html
  var slide_tab_default = '<h1 id="slidetab"><a class="header-anchor" href="#slidetab">#</a>SlideTab</h1><p>Auto-switching tab component with sliding support.</p>\n<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { SlideTab } from &#39;lupine.components&#39;;\n\nconst items = [\n  { title: &#39;Slide 1&#39;, children: &lt;div&gt;Content 1&lt;/div&gt; },\n  { title: &#39;Slide 2&#39;, children: &lt;div&gt;Content 2&lt;/div&gt; },\n];\n\n&lt;SlideTab items={items} autoPlay={true} interval={3000} /&gt;;\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/en/lupine.components/spinner.html
  var spinner_default = '<h1 id="spinner"><a class="header-anchor" href="#spinner">#</a>Spinner</h1><p>A spinning loading animation, commonly used while waiting for data to load.</p>\n<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { Spinner } from &#39;lupine.components&#39;;\n\n&lt;Spinner size=&#39;30px&#39; color=&#39;var(--primary-color)&#39; /&gt;;\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/en/lupine.components/stars.html
  var stars_default = '<h1 id="stars"><a class="header-anchor" href="#stars">#</a>Stars</h1><p>Star rating component.</p>\n<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { Stars } from &#39;lupine.components&#39;;\n\n&lt;Stars value={4.5} onChanged={(score) =&gt; console.log(&#39;Score changed to:&#39;, score)} /&gt;;\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/en/lupine.components/svg-icon.html
  var svg_icon_default = '<h1 id="svgicon"><a class="header-anchor" href="#svgicon">#</a>SvgIcon</h1><p>High-performance native SVG icon component, supporting icons via path or name.</p>\n<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { SvgIcon } from &#39;lupine.components&#39;;\n\n&lt;SvgIcon name=&#39;home&#39; size={24} /&gt;\n&lt;SvgIcon name=&#39;settings&#39; color=&#39;red&#39; /&gt;\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/en/lupine.components/switch-option.html
  var switch_option_default = '<h1 id="switchoption"><a class="header-anchor" href="#switchoption">#</a>SwitchOption</h1><p>Switch option component. Allows switching between two text options.</p>\n<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { SwitchOption } from &#39;lupine.components&#39;;\n\n&lt;SwitchOption options={[&#39;Option 1&#39;, &#39;Option 2&#39;]} onChanged={(index) =&gt; console.log(&#39;Current index:&#39;, index)} /&gt;;\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/en/lupine.components/tabs.html
  var tabs_default = '<h1 id="tabs"><a class="header-anchor" href="#tabs">#</a>Tabs</h1><p>Standard tab component for switching between different content in the same area.</p>\n<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { Tabs, TabsPageProps } from &#39;lupine.components&#39;;\n\nconst pages: TabsPageProps[] = [\n  { title: &#39;Overview&#39;, children: &lt;Overview /&gt; },\n  { title: &#39;Details&#39;, children: &lt;Details /&gt; },\n];\n\n&lt;Tabs pages={pages} pagePadding=&#39;16px&#39; /&gt;;\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/en/lupine.components/text-glow.html
  var text_glow_default = '<h1 id="textglow"><a class="header-anchor" href="#textglow">#</a>TextGlow</h1><p>Glowing animation text component.</p>\n<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { TextGlow } from &#39;lupine.components&#39;;\n\n&lt;TextGlow text=&#39;Glowing Text&#39; /&gt;;\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/en/lupine.components/text-scale.html
  var text_scale_default = '<h1 id="textscale"><a class="header-anchor" href="#textscale">#</a>TextScale</h1><p>Text component with scaling animation effect.</p>\n<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { TextScale } from &#39;lupine.components&#39;;\n\n&lt;TextScale text=&#39;Scaling Text&#39; /&gt;;\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/en/lupine.components/text-wave.html
  var text_wave_default = '<h1 id="textwave"><a class="header-anchor" href="#textwave">#</a>TextWave</h1><p>Text component with waving animation effect.</p>\n<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { TextWave } from &#39;lupine.components&#39;;\n\n&lt;TextWave text=&#39;Waving Text&#39; /&gt;;\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/en/lupine.components/toggle-base.html
  var toggle_base_default = '<h1 id="togglebase"><a class="header-anchor" href="#togglebase">#</a>ToggleBase</h1><p>Base class for toggle components, used to implement custom toggle components.</p>\n<h2 id="description"><a class="header-anchor" href="#description">#</a>Description</h2><p>This is an internal base class, generally not used directly in applications unless you want to implement custom toggle interaction logic.</p>\n';

  // apps/doc/web/src/markdown-built/en/lupine.components/toggle-switch.html
  var toggle_switch_default = '<h1 id="toggleswitch"><a class="header-anchor" href="#toggleswitch">#</a>ToggleSwitch</h1><p>Toggle switch, commonly used for settings.</p>\n<h2 id="implementation-example"><a class="header-anchor" href="#implementation-example">#</a>Implementation Example</h2><pre><code class="language-typescript">import { ToggleSwitch, ToggleSwitchSize } from &#39;lupine.components&#39;;\n\n&lt;ToggleSwitch checked={true} size={ToggleSwitchSize.Medium} text={{ on: &#39;On&#39;, off: &#39;Off&#39; }} textWidth=&#39;60px&#39; /&gt;;\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/en/lupine.press/overview.html
  var overview_default = '<h1 id="lupine-press"><a class="header-anchor" href="#lupine-press">#</a>lupine.press</h1><p><code>lupine.press</code> is a lightweight, high-performance documentation site framework built on top of <code>lupine.web</code>. It provides a complete solution for rendering Markdown-based documentation websites with a responsive layout, sidebar navigation, and theming support.</p>\n<p>It is designed to work seamlessly with the <code>lupine</code> ecosystem, powering documentation sites like the official LupineJS documentation.</p>\n<h2 id="features"><a class="header-anchor" href="#features">#</a>Features</h2><ul>\n<li><strong>Responsive Layout</strong>: Built-in <code>PressFrame</code> provides a standard documentation layout with a header, responsive sidebar, and content area.</li>\n<li><strong>Markdown Rendering</strong>: Optimized for rendering content generated from Markdown files, including syntax highlighting and standard typography.</li>\n<li><strong>Sidebar Navigation</strong>: Automatically generates a multi-level sidebar based on your configuration.</li>\n<li><strong>Theming</strong>: Built-in support for multiple themes (e.g., light/dark mode) via <code>lupine.components</code> theme system.</li>\n<li><strong>Routing</strong>: explicit integration with <code>PageRouter</code> for handling client-side navigation.</li>\n<li><strong>Multilingual Support</strong>: Automatically scans markdown files from multilingual directories and supports language switching.</li>\n</ul>\n<h2 id="usage-guide"><a class="header-anchor" href="#usage-guide">#</a>Usage Guide</h2><p>To use <code>lupine.press</code>, you typically set up a <code>lupine.web</code> application and configure it to use <code>PressPage</code> as the main route handler.</p>\n<h3 id="1-prerequisites"><a class="header-anchor" href="#1-prerequisites">#</a>1. Prerequisites</h3><p>Ensure you have <code>lupine.press</code> installed in your project.</p>\n<h3 id="2-basic-setup"><a class="header-anchor" href="#2-basic-setup">#</a>2. Basic Setup</h3><p>In your application entry point (e.g., <code>src/index.tsx</code>), you need to bind the necessary configurations and set up the router.</p>\n<pre><code class="language-typescript">import { bindRouter, PageRouter, bindTheme, bindLang, setDefaultPageTitle } from &#39;lupine.components&#39;;\nimport { bindPressData, PressPage, pressThemes } from &#39;lupine.press&#39;;\nimport { markdownConfig } from &#39;./markdown-config&#39;; // Your generated markdown data\n\n// 1. Initialize core settings\nbindLang(&#39;en&#39;, {}); // Set default language\nbindTheme(&#39;light&#39;, pressThemes); // Bind themes (includes specific styles for press)\nsetDefaultPageTitle(&#39;My Documentation&#39;);\n\n// 2. Bind documentation data\n// markdownConfig is a dictionary containing HTML content and metadata generated from markdown files.\nbindPressData(markdownConfig);\n\n// 3. Configure Router\nconst pageRouter = new PageRouter();\n// Route all requests to PressPage, which handles looking up content in markdownConfig\npageRouter.use(&#39;*&#39;, PressPage);\n\n// 4. Start the application\nbindRouter(pageRouter);\n</code></pre>\n<h3 id="3-data-structure-markdownconfig"><a class="header-anchor" href="#3-data-structure-markdownconfig">#</a>3. Data Structure (`markdownConfig`)</h3><p>The <code>bindPressData</code> function expects a configuration object where keys are route paths (e.g., <code>/guide/started</code>) and values contain the content and metadata.</p>\n<p>Typically, this data is generated at build time from your Markdown files.</p>\n<pre><code class="language-typescript">export const markdownConfig = {\n  &#39;/en/guide/started&#39;: {\n    html: &#39;&lt;h1&gt;Getting Started&lt;/h1&gt;&lt;p&gt;...&lt;/p&gt;&#39;, // Pre-rendered HTML content\n    data: {\n      title: &#39;Getting Started&#39;,\n      sidebar: [\n        // Sidebar configuration for this page context\n        { type: &#39;group&#39;, text: &#39;Guide&#39;, level: 0 },\n        { type: &#39;link&#39;, text: &#39;Installation&#39;, link: &#39;/en/guide/install&#39;, level: 1 },\n      ],\n    },\n    headings: [{ level: 2, text: &#39;Prerequisites&#39;, id: &#39;prerequisites&#39; }],\n  },\n  // ... other pages\n};\n</code></pre>\n<h2 id="markdown-file-structure-association"><a class="header-anchor" href="#markdown-file-structure-association">#</a>Markdown File Structure & Association</h2><h3 id="top-level-configuration"><a class="header-anchor" href="#top-level-configuration">#</a>Top-level Configuration</h3><p>A <code>index.md</code> file must exist in the top-level directory of your Markdown files. This file uses the <code>lang</code> field to specify all supported languages for the site.</p>\n<pre><code class="language-yaml">---\nlang:\n  - title: English\n    id: en\n  - title: \u7B80\u4F53\u4E2D\u6587\n    id: zh\n---\n</code></pre>\n<h3 id="multilingual-configuration"><a class="header-anchor" href="#multilingual-configuration">#</a>Multilingual Configuration</h3><p>Each language ID (e.g., <code>en</code>, <code>zh</code>) corresponds to a subdirectory, which must contain its own <code>index.md</code> file. This file configures global settings for that language version, such as layout, page title, and sidebar width. All Markdown content files for that language should be stored within this directory or its subdirectories.</p>\n<p>The <code>index.md</code> supports defining:</p>\n<ul>\n<li><strong>Hero &amp; Features</strong>: Homepage hero banner and feature introduction.</li>\n<li><strong>Nav</strong>: Top navigation links.</li>\n<li><strong>GitHub</strong>: Repository links.</li>\n<li><strong>Sidebar</strong>: Sidebar menu configuration (Core parameter).</li>\n</ul>\n<h3 id="sidebar-configuration"><a class="header-anchor" href="#sidebar-configuration">#</a>Sidebar Configuration</h3><p>The <code>sidebar</code> parameter is an array that supports three configuration patterns:</p>\n<ol>\n<li><strong>Submenu Pattern (<code>submenu</code>)</strong>:\nPoints to a subdirectory. The system will automatically expand the <code>sidebar</code> configuration defined in that subdirectory&#39;s <code>index.md</code> and merge its content into the current level.</li>\n<li><strong>Group Pattern (<code>text</code> + <code>items</code>)</strong>:\nDefines a menu group. <code>text</code> is the group title, and <code>items</code> is the list of links under this group.</li>\n<li><strong>Flat Pattern (<code>items</code> only)</strong>:\nDefines <code>items</code> without <code>text</code>. In this case, all links in <code>items</code> will be displayed directly at the current level without grouping.</li>\n</ol>\n<h2 id="architecture"><a class="header-anchor" href="#architecture">#</a>Architecture</h2><ul>\n<li><strong><code>PressFrame</code></strong>: The main layout component. It handles the specific CSS and structure for a documentation site, ensuring the sidebar and content area scroll independently.</li>\n<li><strong><code>PressPage</code></strong>: The &quot;controller&quot; component. It looks up the current URL in the bound <code>markdownConfig</code>, retrieves the corresponding HTML and metadata, and renders the <code>PressFrame</code> with the correct sidebar and content.</li>\n<li><strong><code>pressLoad</code></strong>: A navigation utility to handle link clicks within the documentation, ensuring smooth client-side transitions.</li>\n</ul>\n';

  // apps/doc/web/src/markdown-built/en/lupine.web/overview.html
  var overview_default2 = '<h1 id="lupine-web"><a class="header-anchor" href="#lupine-web">#</a>lupine.web</h1><p><strong>lupine.web</strong> is a React-like, extremely fast, small-size, and lightweight frontend framework designed for modern web development. It focuses on performance, simplicity, and a full-stack experience when paired with <code>lupine.api</code>.</p>\n<h2 id="why-lupine-web"><a class="header-anchor" href="#why-lupine-web">#</a>Why lupine.web?</h2><h3 id="zero-dependency-lightweight"><a class="header-anchor" href="#zero-dependency-lightweight">#</a>\u{1F680} Zero-Dependency & Lightweight</h3><p>We believe in keeping things simple. <code>lupine.web</code> has <strong>zero external dependencies</strong>, resulting in a tiny bundle size and lightning-fast load times. It uses TSX syntax, so if you know React, you already feel at home.</p>\n<h3 id="built-in-css-in-js"><a class="header-anchor" href="#built-in-css-in-js">#</a>\u{1F3A8} Built-in CSS-in-JS</h3><p>Forget about setting up complex CSS loaders or external styling libraries. <code>lupine.web</code> comes with a powerful, built-in CSS-in-JS solution.</p>\n<ul>\n<li><strong>Scoped Styles</strong>: Styles are automatically scoped to your components to prevent collisions.</li>\n<li><strong>Nesting Support</strong>: Write cleaner CSS with nested selectors (e.g., <code>&amp;:hover</code>, <code>&amp; &gt; span</code>).</li>\n<li><strong>Theming</strong>: Native support for light/dark modes and custom themes.</li>\n</ul>\n<pre><code class="language-tsx">const MyButton = (props) =&gt; (\n  &lt;button\n    css={{\n      backgroundColor: &#39;blue&#39;,\n      color: &#39;white&#39;,\n      &#39;&amp;:hover&#39;: { backgroundColor: &#39;darkblue&#39; },\n      [MediaQueryRange.Mobile]: { width: &#39;100%&#39; },\n    }}\n  &gt;\n    {props.children}\n  &lt;/button&gt;\n);\n</code></pre>\n<h3 id="powerful-router"><a class="header-anchor" href="#powerful-router">#</a>\u{1F6E3}\uFE0F Powerful Router</h3><p>Our functional router is designed for flexibility and control.</p>\n<ul>\n<li><strong>Route Guards</strong>: Easily implement authentication checks or permissions.</li>\n<li><strong>Nested Routes</strong>: Organize your application with sub-routers for modular architecture.</li>\n<li><strong>SSR Ready</strong>: Routes work seamlessly on both server and client.</li>\n</ul>\n<pre><code class="language-typescript">const pageRouter = new PageRouter();\n// Middleware/Guard example\npageRouter.setFilter(async (props) =&gt; {\n  if (!checkAuth(props)) return &lt;Redirect to=&#39;/login&#39; /&gt;;\n  return null; // Pass\n});\npageRouter.use(&#39;/dashboard/*&#39;, DashboardRouter);\n</code></pre>\n<h3 id="server-side-rendering-ssr-first"><a class="header-anchor" href="#server-side-rendering-ssr-first">#</a>\u26A1 Server-Side Rendering (SSR) First</h3><p>Visual performance is critical. <code>lupine.web</code> is built with SSR in mind from day one.</p>\n<ul>\n<li><strong>No Flashing</strong>: Content is rendered on the server, ensuring users see the page immediately.</li>\n<li><strong>SEO Friendly</strong>: Fully customizable Metadata and Open Graph (OG) tags for social sharing.</li>\n<li><strong>Hydration</strong>: The client takes over smoothly without re-rendering the entire tree.</li>\n</ul>\n<h3 id="internationalization-i18n"><a class="header-anchor" href="#internationalization-i18n">#</a>\u{1F30D} Internationalization (i18n)</h3><p>Go global with ease. Built-in support for multi-language applications allows you to switch languages dynamically without complex configuration.</p>\n<h3 id="environment-configuration"><a class="header-anchor" href="#environment-configuration">#</a>\u{1F6E0}\uFE0F Environment Configuration</h3><p>Manage your application environments efficiently. <code>lupine.web</code> supports loading environment variables (from <code>.env</code> files via <code>lupine.api</code>) and injecting strictly filtered configurations into the frontend.</p>\n';

  // apps/doc/web/src/markdown-built/zh/essentials/api.html
  var api_default3 = '<h1 id="api-\u53C2\u8003"><a class="header-anchor" href="#api-\u53C2\u8003">#</a>API \u53C2\u8003</h1><p>LupineJS \u4E3A Web \u548C\u670D\u52A1\u5668\u5F00\u53D1\u63D0\u4F9B\u4E86\u4E00\u5957\u6781\u7B80\u7684 API\u3002</p>\n<h2 id="lupine-web-\u524D\u7AEF"><a class="header-anchor" href="#lupine-web-\u524D\u7AEF">#</a>Lupine.web (\u524D\u7AEF)</h2><h3 id="bindrouter"><a class="header-anchor" href="#bindrouter">#</a>`bindRouter`</h3><p>\u5C06\u9875\u9762\u8DEF\u7531\u7ED1\u5B9A\u5230\u5E94\u7528\u7A0B\u5E8F\u3002</p>\n<pre><code class="language-typescript">import { bindRouter, PageRouter } from &#39;lupine.components&#39;;\nconst pageRouter = new PageRouter();\npageRouter.use(&#39;/&#39;, HomePage);\nbindRouter(pageRouter);\n</code></pre>\n<h3 id="bindtheme"><a class="header-anchor" href="#bindtheme">#</a>`bindTheme`</h3><p>\u7ED1\u5B9A\u4E3B\u9898\u914D\u7F6E\u3002</p>\n<pre><code class="language-typescript">import { bindTheme } from &#39;lupine.components&#39;;\nbindTheme(&#39;light&#39;, themes);\n</code></pre>\n<h3 id="bindlang"><a class="header-anchor" href="#bindlang">#</a>`bindLang`</h3><p>\u7ED1\u5B9A\u591A\u8BED\u8A00\u652F\u6301\u3002</p>\n<pre><code class="language-typescript">import { bindLang } from &#39;lupine.components&#39;;\nbindLang(&#39;en&#39;, { en, zh });\n</code></pre>\n<h2 id="lupine-api-\u540E\u7AEF"><a class="header-anchor" href="#lupine-api-\u540E\u7AEF">#</a>Lupine.api (\u540E\u7AEF)</h2><h3 id="apimodule"><a class="header-anchor" href="#apimodule">#</a>`ApiModule`</h3><p>\u540E\u7AEF\u670D\u52A1\u7684\u4E3B\u6A21\u5757\u3002</p>\n<pre><code class="language-typescript">import { ApiModule } from &#39;lupine.api&#39;;\nexport const apiModule = new ApiModule(new RootApi());\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/zh/guide/install.html
  var install_default2 = '<h1 id="\u5B89\u88C5\u8BF4\u660E"><a class="header-anchor" href="#\u5B89\u88C5\u8BF4\u660E">#</a>\u5B89\u88C5\u8BF4\u660E</h1><p>\u53EF\u4EE5\u901A\u8FC7\u514B\u9686\u4E3B\u4ED3\u5E93\u6765\u5B89\u88C5 LupineJS\u3002</p>\n<h2 id="\u5F00\u53D1\u73AF\u5883"><a class="header-anchor" href="#\u5F00\u53D1\u73AF\u5883">#</a>\u5F00\u53D1\u73AF\u5883</h2><ol>\n<li><p><strong>\u514B\u9686\u4ED3\u5E93</strong>:</p>\n<pre><code class="language-bash">git clone https://github.com/uuware/lupine.js.git\n</code></pre>\n</li>\n<li><p><strong>\u5B89\u88C5\u4F9D\u8D56</strong>:</p>\n<pre><code class="language-bash">npm install\n</code></pre>\n</li>\n<li><p><strong>\u73AF\u5883\u914D\u7F6E</strong>:\n\u5C06 <code>.env.sample</code> \u590D\u5236\u4E3A <code>.env</code> \u5E76\u6839\u636E\u9700\u8981\u8FDB\u884C\u914D\u7F6E\u3002</p>\n</li>\n</ol>\n<h2 id="\u751F\u4EA7\u73AF\u5883\u6784\u5EFA"><a class="header-anchor" href="#\u751F\u4EA7\u73AF\u5883\u6784\u5EFA">#</a>\u751F\u4EA7\u73AF\u5883\u6784\u5EFA</h2><p>\u6784\u5EFA\u751F\u4EA7\u7248\u672C\uFF1A</p>\n<pre><code class="language-bash">npm run build\n</code></pre>\n<p>\u6784\u5EFA\u7ED3\u679C\u5C06\u751F\u6210\u5728 <code>dist/server_root</code> \u76EE\u5F55\u4E0B\u3002</p>\n';

  // apps/doc/web/src/markdown-built/zh/guide/started.html
  var started_default2 = '<h1 id="\u4E86\u89E3-lupine-js"><a class="header-anchor" href="#\u4E86\u89E3-lupine-js">#</a>\u4E86\u89E3 Lupine.JS</h1><p>lupine.js is a full-featured web application that includes both Front-End and Back-End services. The Front-End, lupine.web, is an extremely lightweight framework using React TSX syntax. The Back-End, lupine.api, is a highly efficient and simplified framework similar to Express. It supports server-side rendering from scratch.\nLupine.js \u662F\u4E00\u4E2A\u5305\u542B\u524D\u540E\u7AEF\u7684\u5168\u529F\u80FD Web \u5E94\u7528\u7A0B\u5E8F\u3002\u901A\u8FC7\u4F7F\u7528 Capacitor \u548C Electron \u4ECE\u800C\u5B9E\u73B0\u4E00\u4EFD\u4EE3\u7801\uFF0C\u5373\u53EF\u5B9E\u73B0 Web\u3001\u79FB\u52A8\u7AEF\u548C\u684C\u9762\u7AEF\u7684\u5E94\u7528\u7A0B\u5E8F\u3002</p>\n<h2 id="\u524D\u63D0\u6761\u4EF6"><a class="header-anchor" href="#\u524D\u63D0\u6761\u4EF6">#</a>\u524D\u63D0\u6761\u4EF6</h2><ul>\n<li>Node.js &gt;= 20</li>\n</ul>\n<h2 id="\u5FEB\u901F\u4E0A\u624B"><a class="header-anchor" href="#\u5FEB\u901F\u4E0A\u624B">#</a>\u5FEB\u901F\u4E0A\u624B</h2><ol>\n<li>\u514B\u9686\u4ED3\u5E93\u5230\u672C\u5730\uFF1A</li>\n</ol>\n<pre><code class="language-bash">git clone https://github.com/uuware/lupine.js.git\n</code></pre>\n<ol start="2">\n<li>\u5B89\u88C5\u4F9D\u8D56\uFF1A</li>\n</ol>\n<pre><code class="language-bash">npm i\n</code></pre>\n<ol start="3">\n<li>\u8FD0\u884C\u5F00\u53D1\u73AF\u5883\uFF1A</li>\n</ol>\n<pre><code class="language-bash">npm run dev\n</code></pre>\n<ol start="4">\n<li>\u6253\u5F00 <code>http://localhost:11080</code> \u5373\u53EF\u67E5\u770B\u5F00\u53D1\u4E2D\u7684\u5E94\u7528\u7A0B\u5E8F\u3002</li>\n</ol>\n';

  // apps/doc/web/src/markdown-built/zh/index.html
  var zh_default = "";

  // apps/doc/web/src/markdown-built/zh/lupine.api/api.html
  var api_default4 = '<h1 id="api-module-src-api"><a class="header-anchor" href="#api-module-src-api">#</a>API Module (`src/api`)</h1><p>API \u6A21\u5757\u63D0\u4F9B\u4E86\u7F16\u5199\u5E94\u7528\u7A0B\u5E8F\u4E1A\u52A1\u903B\u8F91\u7684\u6846\u67B6\u3002\u5B83\u7684\u4F5C\u7528\u7C7B\u4F3C\u4E8E Express.js\uFF0C\u4F46\u9488\u5BF9 lupine \u751F\u6001\u7CFB\u7EDF\u8FDB\u884C\u4E86\u4F18\u5316\u3002</p>\n<h2 id="\u4E3B\u8981\u7279\u6027-key-features"><a class="header-anchor" href="#\u4E3B\u8981\u7279\u6027-key-features">#</a>\u4E3B\u8981\u7279\u6027 (Key Features)</h2><ul>\n<li><strong>ApiRouter</strong>: \u4E00\u4E2A\u7075\u6D3B\u7684\u8DEF\u7531\u5668\uFF0C\u652F\u6301 GET\u3001POST \u8BF7\u6C42\u4EE5\u53CA\u7C7B\u4F3C\u4E2D\u95F4\u4EF6\u7684\u8FC7\u6EE4\u5668\u3002</li>\n<li><strong>\u4E0A\u4E0B\u6587\u9694\u79BB (Context Isolation)</strong>: \u4F7F\u7528 <code>AsyncStorage</code> \u5728\u5F02\u6B65\u64CD\u4F5C\u4E2D\u5B89\u5168\u5730\u7BA1\u7406\u8BF7\u6C42\u8303\u56F4\u7684\u6570\u636E\uFF08\u5982\u4F1A\u8BDD\u6216\u6570\u636E\u5E93\u4E8B\u52A1\uFF09\u3002</li>\n<li><strong>\u6570\u636E\u5E93\u96C6\u6210 (Database Integration)</strong>: \u5185\u7F6E\u7684\u6570\u636E\u5E93\u8FDE\u63A5\u52A9\u624B\uFF08\u4F8B\u5982\uFF0C\u901A\u8FC7 <code>better-sqlite3</code> \u8FDE\u63A5 SQLite\uFF09\u3002</li>\n</ul>\n<h2 id="\u4F7F\u7528\u793A\u4F8B-usage-example"><a class="header-anchor" href="#\u4F7F\u7528\u793A\u4F8B-usage-example">#</a>\u4F7F\u7528\u793A\u4F8B (Usage Example)</h2><p>\u5E94\u7528\u7A0B\u5E8F\u7684 API \u5165\u53E3\u70B9\uFF08\u4F8B\u5982 <code>apps/demo.app/api/src/index.ts</code>\uFF09\u901A\u5E38\u5BFC\u51FA <code>ApiModule</code> \u7684\u4E00\u4E2A\u5B9E\u4F8B\u3002</p>\n<p><strong>1. \u5165\u53E3\u70B9 (<code>index.ts</code>):</strong></p>\n<pre><code class="language-typescript">import { ApiModule } from &#39;lupine.api&#39;;\nimport { RootApi } from &#39;./service/root-api&#39;;\n\n// \u5BFC\u51FA apiModule \u4EE5\u4FBF\u670D\u52A1\u5668\u52A8\u6001\u52A0\u8F7D\nexport const apiModule = new ApiModule(new RootApi());\n</code></pre>\n<p><strong>2. \u6839 API \u670D\u52A1 (<code>service/root-api.ts</code>):</strong></p>\n<pre><code class="language-typescript">import { ApiRouter, IApiBase, IApiRouter } from &#39;lupine.api&#39;;\n\nexport class RootApi implements IApiBase {\n  getRouter(): IApiRouter {\n    const router = new ApiRouter();\n\n    // \u5B9A\u4E49\u8DEF\u7531\n    router.get(&#39;/hello&#39;, async (req, res) =&gt; {\n      res.write(JSON.stringify({ message: &#39;Hello World&#39; }));\n      res.end();\n      return true; // \u8FD4\u56DE true \u8868\u793A\u8BF7\u6C42\u5DF2\u88AB\u5904\u7406\n    });\n\n    // \u53EF\u4EE5\u6302\u8F7D\u5B50\u8DEF\u7531\u5668\n    // router.use(&#39;/users&#39;, new UserApi().getRouter());\n\n    return router;\n  }\n}\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/zh/lupine.api/app.html
  var app_default2 = '<h1 id="server-src-app"><a class="header-anchor" href="#server-src-app">#</a>Server (`src/app`)</h1><p>\u670D\u52A1\u5668\u7EC4\u4EF6\u8D1F\u8D23\u5904\u7406\u4F20\u5165\u7684\u7F51\u7EDC\u8BF7\u6C42\uFF0C\u7BA1\u7406 SSL \u8BC1\u4E66\uFF0C\u5E76\u6839\u636E\u57DF\u540D\u914D\u7F6E\u5C06\u8BF7\u6C42\u5206\u53D1\u5230\u76F8\u5E94\u7684\u5E94\u7528\u7A0B\u5E8F\u3002\u5B83\u652F\u6301\u96C6\u7FA4\u903B\u8F91\uFF0C\u4EE5\u9AD8\u6548\u5229\u7528\u591A\u6838 CPU\u3002</p>\n<h2 id="\u4E3B\u8981\u7279\u6027-key-features"><a class="header-anchor" href="#\u4E3B\u8981\u7279\u6027-key-features">#</a>\u4E3B\u8981\u7279\u6027 (Key Features)</h2><ul>\n<li><strong>\u591A\u5E94\u7528\u548C\u591A\u57DF\u540D</strong>: \u5728\u5355\u4E2A\u670D\u52A1\u5668\u5B9E\u4F8B\u4E0A\u6258\u7BA1\u591A\u4E2A\u72EC\u7ACB\u7684\u5E94\u7528\u7A0B\u5E8F\uFF0C\u6839\u636E\u57DF\u540D\u8DEF\u7531\u6D41\u91CF\u3002</li>\n<li><strong>\u96C6\u7FA4\u652F\u6301</strong>: \u81EA\u52A8 fork \u5DE5\u4F5C\u8FDB\u7A0B\u4EE5\u5339\u914D CPU \u6838\u5FC3\u6570\uFF0C\u5B9E\u73B0\u9AD8\u6027\u80FD\u3002</li>\n<li><strong>SSL/TLS</strong>: \u5185\u7F6E\u652F\u6301\u5E26\u6709\u81EA\u5B9A\u4E49\u8BC1\u4E66\u8DEF\u5F84\u7684 HTTPS\u3002</li>\n<li><strong>\u73AF\u5883\u7BA1\u7406</strong>: \u4ECE <code>.env</code> \u6587\u4EF6\u52A0\u8F7D\u914D\u7F6E\u3002</li>\n</ul>\n<h2 id="\u4F7F\u7528\u793A\u4F8B-usage-example"><a class="header-anchor" href="#\u4F7F\u7528\u793A\u4F8B-usage-example">#</a>\u4F7F\u7528\u793A\u4F8B (Usage Example)</h2><p>\u5B8C\u6574\u793A\u4F8B\u8BF7\u53C2\u89C1 <code>apps/server/src/index.ts</code>\u3002</p>\n<pre><code class="language-typescript">import { appStart, loadEnv, ServerEnvKeys } from &#39;lupine.api&#39;;\nimport * as path from &#39;path&#39;;\n\nconst initAndStartServer = async () =&gt; {\n  // 1. \u52A0\u8F7D\u73AF\u5883\u53D8\u91CF\n  await loadEnv(&#39;.env&#39;);\n\n  // 2. \u914D\u7F6E\u5E94\u7528\u7A0B\u5E8F\n  const serverRootPath = path.resolve(process.env[ServerEnvKeys.SERVER_ROOT_PATH]!);\n  const webRootMap = [\n    {\n      appName: &#39;demo.app&#39;,\n      hosts: [&#39;localhost&#39;, &#39;example.com&#39;],\n      // lupine.api \u671F\u671B\u7684\u6807\u51C6\u76EE\u5F55\u7ED3\u6784\n      webPath: path.join(serverRootPath, &#39;demo.app_web&#39;),\n      dataPath: path.join(serverRootPath, &#39;demo.app_data&#39;),\n      apiPath: path.join(serverRootPath, &#39;demo.app_api&#39;),\n      dbType: &#39;sqlite&#39;,\n      dbConfig: { filename: &#39;sqlite3.db&#39; },\n    },\n  ];\n\n  // 3. \u542F\u52A8\u670D\u52A1\u5668\n  await appStart.start({\n    debug: process.env.NODE_ENV === &#39;development&#39;,\n    apiConfig: {\n      serverRoot: serverRootPath,\n      webHostMap: webRootMap,\n    },\n    serverConfig: {\n      httpPort: 8080,\n      httpsPort: 8443,\n      // sslKeyPath: &#39;...&#39;,\n      // sslCrtPath: &#39;...&#39;,\n    },\n  });\n};\n\ninitAndStartServer();\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/zh/lupine.api/dashboard.html
  var dashboard_default2 = '<h1 id="lupine-api-dashboard"><a class="header-anchor" href="#lupine-api-dashboard">#</a>lupine.api dashboard</h1><p>lupine.api \u81EA\u5E26\u4E00\u4E2A\u53EF\u4EE5\u6269\u5145\u7684 dashboard\uFF0C\u7528\u4E8E\u7BA1\u7406 api \u670D\u52A1\u3002dashboard \u5DE6\u8FB9\u662F\u4F17\u591A\u7BA1\u7406\u83DC\u5355\uFF0C\u53F3\u8FB9\u662F\u591A\u9875\u9762\u7684 tab \u5185\u5BB9\u9875\u9762\u3002</p>\n<h2 id="\u529F\u80FD\u7279\u6027-features"><a class="header-anchor" href="#\u529F\u80FD\u7279\u6027-features">#</a>\u529F\u80FD\u7279\u6027 (Features)</h2><p>Dashboard \u63D0\u4F9B\u4E86\u5168\u9762\u7684\u540E\u53F0\u7BA1\u7406\u529F\u80FD\uFF0C\u6309\u529F\u80FD\u6A21\u5757\u5206\u7C7B\u5982\u4E0B\uFF1A</p>\n<h3 id="1-\u6570\u636E\u5E93\u7BA1\u7406-db"><a class="header-anchor" href="#1-\u6570\u636E\u5E93\u7BA1\u7406-db">#</a>1. \u6570\u636E\u5E93\u7BA1\u7406 (DB)</h3><p>\u63D0\u4F9B\u76F4\u63A5\u64CD\u4F5C\u6570\u636E\u5E93\u7684\u5DE5\u5177\uFF0C\u65B9\u4FBF\u8C03\u8BD5\u548C\u7EF4\u62A4\u3002</p>\n<ul>\n<li><strong>Table List (\u8868\u5217\u8868)</strong>: \u6D4F\u89C8\u6570\u636E\u5E93\u4E2D\u7684\u8868\uFF0C\u652F\u6301\u67E5\u770B\u8868\u6570\u636E\u3002</li>\n<li><strong>Create Tables (\u521B\u5EFA\u8868)</strong>: \u8FD0\u884C\u9884\u8BBE\u811A\u672C\u521D\u59CB\u5316\u6216\u4FEE\u590D\u6570\u636E\u5E93\u8868\u7ED3\u6784\u3002</li>\n<li><strong>Run SQL (\u8FD0\u884C SQL)</strong>: \u63D0\u4F9B\u4E00\u4E2A SQL \u6267\u884C\u7A97\u53E3\uFF0C\u53EF\u4EE5\u8FD0\u884C\u4EFB\u610F SQL \u8BED\u53E5\u5E76\u76F4\u63A5\u67E5\u770B JSON \u683C\u5F0F\u7684\u8FD4\u56DE\u7ED3\u679C\u3002</li>\n</ul>\n<h3 id="2-\u8FD0\u7EF4\u4E0E\u670D\u52A1\u5668\u7BA1\u7406-access-server-info"><a class="header-anchor" href="#2-\u8FD0\u7EF4\u4E0E\u670D\u52A1\u5668\u7BA1\u7406-access-server-info">#</a>2. \u8FD0\u7EF4\u4E0E\u670D\u52A1\u5668\u7BA1\u7406 (Access & Server Info)</h3><p>\u6838\u5FC3\u7684\u8FD0\u7EF4\u5DE5\u5177\u96C6\uFF0C\u652F\u6301\u8FDC\u7A0B\u7BA1\u7406\u548C\u76D1\u63A7\u3002</p>\n<h4 id="release-\u53D1\u5E03\u7BA1\u7406"><a class="header-anchor" href="#release-\u53D1\u5E03\u7BA1\u7406">#</a>Release (\u53D1\u5E03\u7BA1\u7406)</h4><p>\u5F3A\u5927\u7684\u53D1\u5E03\u5DE5\u5177\uFF0C\u652F\u6301\u591A\u8282\u70B9/\u591A\u73AF\u5883\u7BA1\u7406\u3002</p>\n<ul>\n<li><strong>\u7248\u672C\u540C\u6B65</strong>: \u652F\u6301\u5C06\u4EE3\u7801\u6216\u8D44\u6E90\u4ECE\u6E90\u73AF\u5883 (From) \u540C\u6B65\u5230\u76EE\u6807\u73AF\u5883 (To)\u3002</li>\n<li><strong>\u5168\u6808\u66F4\u65B0</strong>: \u53EF\u9009\u62E9\u66F4\u65B0 Server (\u6838\u5FC3\u670D\u52A1), Api (\u4E1A\u52A1\u903B\u8F91), Env (\u73AF\u5883\u53D8\u91CF) \u7B49\u3002</li>\n<li><strong>Web \u66F4\u65B0</strong>: \u652F\u6301\u6309\u5B50\u76EE\u5F55 (Web Sub-folder) \u72EC\u7ACB\u66F4\u65B0\u524D\u7AEF\u8D44\u6E90\u3002</li>\n<li><strong>\u64CD\u4F5C\u63A7\u5236</strong>:<ul>\n<li><strong>Check</strong>: \u68C0\u67E5\u66F4\u65B0\u72B6\u6001\u3002</li>\n<li><strong>Refresh Cache</strong>: \u5237\u65B0\u670D\u52A1\u5668\u7F13\u5B58 (\u652F\u6301\u8FDC\u7A0B/\u672C\u5730)\u3002</li>\n<li><strong>Restart App</strong>: \u91CD\u542F\u5E94\u7528\u7A0B\u5E8F (\u652F\u6301\u8FDC\u7A0B/\u672C\u5730)\u3002</li>\n<li><strong>Run Cmd</strong>: \u76F4\u63A5\u5728\u670D\u52A1\u5668\u6267\u884C Shell \u547D\u4EE4\u3002</li>\n</ul>\n</li>\n<li><strong>\u65E5\u5FD7</strong>: \u67E5\u770B\u548C\u4E0B\u8F7D\u53D1\u5E03\u64CD\u4F5C\u7684\u5386\u53F2\u65E5\u5FD7\u3002</li>\n</ul>\n<h4 id="utilities-\u5DE5\u5177"><a class="header-anchor" href="#utilities-\u5DE5\u5177">#</a>Utilities (\u5DE5\u5177)</h4><ul>\n<li><strong>Tokens (\u4EE4\u724C\u7BA1\u7406)</strong>: \u7BA1\u7406 API \u8BBF\u95EE\u4EE4\u724C\u3002</li>\n<li><strong>Shell (\u5728\u7EBF\u7EC8\u7AEF)</strong>: \u57FA\u4E8E WebSocket \u7684\u5728\u7EBF\u7EC8\u7AEF\uFF0C\u53EF\u5B9E\u65F6\u4E0E\u670D\u52A1\u5668\u4EA4\u4E92\uFF0C\u6267\u884C\u901A\u8FC7\u9A8C\u8BC1\u7684\u547D\u4EE4\u3002</li>\n<li><strong>Resources (\u8D44\u6E90\u7BA1\u7406)</strong>: \u6D4F\u89C8\u3001\u4E0A\u4F20\u3001\u4E0B\u8F7D\u670D\u52A1\u5668\u6587\u4EF6\u7CFB\u7EDF\u4E2D\u7684\u8D44\u6E90\u6587\u4EF6\u3002</li>\n<li><strong>Config (\u914D\u7F6E\u7BA1\u7406)</strong>: \u67E5\u770B\u548C\u70ED\u4FEE\u6539\u7CFB\u7EDF\u8FD0\u884C\u65F6\u914D\u7F6E\u3002</li>\n<li><strong>Performance (\u6027\u80FD\u76D1\u63A7)</strong>: \u76D1\u63A7\u670D\u52A1\u5668\u7684\u5185\u5B58\u3001CPU \u7B49\u6027\u80FD\u6307\u6807\u3002</li>\n</ul>\n<h3 id="3-\u5F00\u53D1\u4E0E\u6D4B\u8BD5-test"><a class="header-anchor" href="#3-\u5F00\u53D1\u4E0E\u6D4B\u8BD5-test">#</a>3. \u5F00\u53D1\u4E0E\u6D4B\u8BD5 (Test)</h3><p>\u7528\u4E8E\u5F00\u53D1\u9636\u6BB5\u8C03\u8BD5\u7EC4\u4EF6\u548C UI\u3002</p>\n<ul>\n<li><strong>Test Themes</strong>: \u9884\u89C8\u548C\u6D4B\u8BD5\u4E0D\u540C\u7684 UI \u4E3B\u9898\u914D\u7F6E\u3002</li>\n<li><strong>Test Component</strong>: \u6D4B\u8BD5\u901A\u7528 UI \u7EC4\u4EF6\u7684\u4EA4\u4E92\u548C\u6E32\u67D3\u3002</li>\n<li><strong>Test Animations</strong>: \u6F14\u793A\u548C\u8C03\u8BD5 CSS/JS \u52A8\u753B\u6548\u679C\u3002</li>\n<li><strong>Test Edit</strong>: \u6D4B\u8BD5\u5BCC\u6587\u672C\u7F16\u8F91\u5668\u6216\u8868\u5355\u7F16\u8F91\u529F\u80FD\u3002</li>\n</ul>\n<hr>\n<h2 id="\u6269\u5C55\u5F00\u53D1"><a class="header-anchor" href="#\u6269\u5C55\u5F00\u53D1">#</a>\u6269\u5C55\u5F00\u53D1</h2><p>Dashboard \u662F\u9AD8\u5EA6\u53EF\u6269\u5C55\u7684\u3002\u6838\u5FC3\u903B\u8F91\u4F4D\u4E8E <code>packages/lupine.api/admin</code> \u76EE\u5F55\u4E0B\u3002</p>\n<h3 id="\u83DC\u5355\u914D\u7F6E"><a class="header-anchor" href="#\u83DC\u5355\u914D\u7F6E">#</a>\u83DC\u5355\u914D\u7F6E</h3><p>\u83DC\u5355\u901A\u8FC7 <code>admin-frame-helper.tsx</code> \u4E2D\u7684 <code>adminTopMenu</code> \u6570\u7EC4\u8FDB\u884C\u914D\u7F6E\u3002\u4F60\u53EF\u4EE5\u8F7B\u677E\u6DFB\u52A0\u65B0\u7684\u83DC\u5355\u9879\uFF1A</p>\n<pre><code class="language-typescript">const myMenu = {\n  id: &#39;my-feature&#39;,\n  text: &#39;My Feature&#39;,\n  items: [\n    {\n      id: &#39;my-page&#39;,\n      text: &#39;My Page&#39;,\n      js: () =&gt; this.addPanel(&#39;My Page&#39;, &lt;MyComponent /&gt;),\n    },\n  ],\n};\n</code></pre>\n<h3 id="\u9875\u9762\u5F00\u53D1"><a class="header-anchor" href="#\u9875\u9762\u5F00\u53D1">#</a>\u9875\u9762\u5F00\u53D1</h3><p>\u6BCF\u4E2A\u7BA1\u7406\u9875\u9762\u90FD\u662F\u4E00\u4E2A\u6807\u51C6\u7684 <code>lupine.components</code> \u7EC4\u4EF6\u3002\u4F7F\u7528 <code>AdminPanel</code> \u548C <code>Tabs</code> \u7EC4\u4EF6\u6765\u7BA1\u7406\u591A\u6807\u7B7E\u9875\u4F53\u9A8C\u3002</p>\n';

  // apps/doc/web/src/markdown-built/zh/lupine.components-libs/date-utils.html
  var date_utils_default2 = '<h1 id="dateutils"><a class="header-anchor" href="#dateutils">#</a>DateUtils</h1><p>Comprehensive date manipulation utilities.</p>\n<p><strong>Usage:</strong></p>\n<pre><code class="language-typescript">import { DateUtils } from &#39;lupine.components&#39;;\n\nconst now = DateUtils.now();\nconst date = DateUtils.toDate(&#39;2023-01-01T12:00:00Z&#39;);\nconst ymd = DateUtils.toYMD(date, &#39;/&#39;); // 2023/01/01\nconst formatted = DateUtils.format(date, &#39;YYYY-MM-DD hh:mm:ss&#39;);\n\n// Difference between two dates\nconst diff = DateUtils.diffString(new Date(), date);\nconsole.log(diff); // e.g., &quot;2 day(s), 4 hour(s)&quot;\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/zh/lupine.components-libs/dom-utils.html
  var dom_utils_default2 = '<h1 id="domutils"><a class="header-anchor" href="#domutils">#</a>DomUtils</h1><p>Helper functions for common DOM operations, mostly shorthand for <code>querySelector</code>.</p>\n<p><strong>Usage Example (from <code>admin-resources.tsx</code>):</strong></p>\n<pre><code class="language-typescript">import { DomUtils } from &#39;lupine.components&#39;;\n\n// Get input value\nconst value = DomUtils.getValue(&#39;#my-input&#39;);\n\n// Trigger click on a hidden file input\nconst fDom = DomUtils.bySelector(&#39;.up-file&#39;) as HTMLInputElement;\nfDom.click();\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/zh/lupine.components-libs/download-stream.html
  var download_stream_default2 = '<h1 id="downloadstream"><a class="header-anchor" href="#downloadstream">#</a>downloadStream</h1><p>Download a <code>Blob</code> as a file by creating a temporary anchor tag.</p>\n<p><strong>Usage Example (from <code>admin-resources.tsx</code>):</strong></p>\n<pre><code class="language-typescript">import { downloadStream } from &#39;lupine.components&#39;;\n\nconst onDownload = async (name: string) =&gt; {\n  const response = await fetch(&#39;/api/download?file=&#39; + name);\n  const blob = await response.blob();\n  downloadStream(blob, name);\n};\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/zh/lupine.components-libs/drag-util.html
  var drag_util_default2 = '<h1 id="dragutil"><a class="header-anchor" href="#dragutil">#</a>DragUtil</h1><p>Helper for implementing drag-and-drop or touch-move functionality.</p>\n<p><strong>Usage:</strong></p>\n<pre><code class="language-typescript">import { createDragUtil } from &#39;lupine.components&#39;;\n\nconst dragUtil = createDragUtil();\ndragUtil.setOnMoveCallback((clientX, clientY, movedX, movedY) =&gt; {\n  console.log(`Moved by ${movedX}, ${movedY}`);\n  // Update element position here\n});\n\n// Bind to events\n&lt;div onMouseDown={dragUtil.onMouseDown} onMouseMove={dragUtil.onMouseMove} onMouseUp={dragUtil.onMouseUp}&gt;\n  Drag Me\n&lt;/div&gt;;\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/zh/lupine.components-libs/dynamical-load.html
  var dynamical_load_default2 = '<h1 id="dynamicalload"><a class="header-anchor" href="#dynamicalload">#</a>DynamicalLoad</h1><p>Dynamically load external Scripts or CSS files. Used for lazy loading third-party SDKs.</p>\n<p><strong>Usage Example (from <code>wx-share.ts</code>):</strong></p>\n<pre><code class="language-typescript">import { DynamicalLoad } from &#39;lupine.components&#39;;\n\n// Load WeChat JS-SDK dynamically\nif (typeof wx === &#39;undefined&#39;) {\n  await DynamicalLoad.loadScript(&#39;//res.wx.qq.com/open/js/jweixin-1.6.0.js&#39;, &#39;jweixin&#39;);\n}\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/zh/lupine.components-libs/format-bytes.html
  var format_bytes_default2 = '<h1 id="formatbytes"><a class="header-anchor" href="#formatbytes">#</a>formatBytes</h1><p>Format file size in bytes into human-readable strings (KB, MB, GB, etc.).</p>\n<p><strong>Usage Example (from <code>admin-resources.tsx</code>):</strong></p>\n<pre><code class="language-typescript">import { formatBytes } from &#39;lupine.components&#39;;\n\nconst sizeStr = formatBytes(1024 * 1024 * 5); // &quot;5 MB&quot;\nconst sizeStr2 = formatBytes(123456); // &quot;120.56 KB&quot;\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/zh/lupine.components-libs/lite-dom.html
  var lite_dom_default2 = '<h1 id="litedom"><a class="header-anchor" href="#litedom">#</a>LiteDom</h1><p>A lightweight, chainable DOM wrapper similar to jQuery.</p>\n<p><strong>Usage:</strong></p>\n<pre><code class="language-typescript">import { LiteDom } from &#39;lupine.components&#39;;\n\nconst el = new LiteDom(&#39;#my-element&#39;);\nel.css(&#39;color&#39;, &#39;red&#39;)\n  .html(&#39;Hello World&#39;)\n  .on(&#39;click&#39;, () =&gt; {\n    console.log(&#39;Clicked!&#39;);\n  });\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/zh/lupine.components-libs/message-hub.html
  var message_hub_default2 = '<h1 id="messagehub"><a class="header-anchor" href="#messagehub">#</a>MessageHub</h1><p>A publish-subscribe event bus for communication between components.</p>\n<p><strong>Usage Example (from <code>admin-test-animations.tsx</code>):</strong></p>\n<pre><code class="language-typescript">import { MessageHub, MessageHubData } from &#39;lupine.components&#39;;\n\nconst hub = new MessageHub();\n\n// Subscribe to messages\nhub.subscribe(&#39;test-event&#39;, (data: any) =&gt; {\n  console.log(&#39;Received:&#39;, data);\n});\n\n// Send message\nhub.send(&#39;test-event&#39;, { text: &#39;Hello&#39; });\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/zh/lupine.components-libs/observable.html
  var observable_default2 = '<h1 id="observable"><a class="header-anchor" href="#observable">#</a>Observable</h1><p>Implementation of the Observable pattern, inspired by RxJS.</p>\n<p><strong>Usage:</strong></p>\n<pre><code class="language-typescript">import { Subject } from &#39;lupine.components&#39;;\n\nconst subject = new Subject&lt;string&gt;();\n\nconst subscription = subject.subscribe((value) =&gt; {\n  console.log(&#39;Observer A received:&#39;, value);\n});\n\nsubject.next(&#39;Hello&#39;);\nsubject.next(&#39;World&#39;);\n\nsubscription.unsubscribe();\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/zh/lupine.components-libs/simple-storage.html
  var simple_storage_default2 = '<h1 id="simplestorage"><a class="header-anchor" href="#simplestorage">#</a>SimpleStorage</h1><p>A wrapper for <code>localStorage</code> (or similar key-value storage) offering typed getters.</p>\n<p><strong>Usage:</strong></p>\n<pre><code class="language-typescript">import { SimpleStorage } from &#39;lupine.components&#39;;\n\n// Assuming initialized with some storage object like localStorage\nconst storage = new SimpleStorage(localStorage as any);\n\nstorage.set(&#39;theme&#39;, &#39;dark&#39;);\nconst theme = storage.get(&#39;theme&#39;, &#39;light&#39;); // returns &#39;dark&#39;\nconst isDebug = storage.getBoolean(&#39;debug&#39;, false);\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/zh/lupine.components-libs/upload-file.html
  var upload_file_default2 = '<h1 id="uploadfile"><a class="header-anchor" href="#uploadfile">#</a>uploadFile</h1><p>Handle file uploads with chunking support, progress tracking, and retries.</p>\n<p><strong>Usage Example (from <code>admin-resources.tsx</code>):</strong></p>\n<pre><code class="language-typescript">import { uploadFile } from &#39;lupine.components&#39;;\n\nconst onUploadProgress = (percentage: number, chunkNumber: number, totalChunks: number) =&gt; {\n  console.log(`Progress: ${percentage * 100}%`);\n};\n\nconst onFileChange = async (e: Event) =&gt; {\n  const target = e.target as HTMLInputElement;\n  const file = target.files?.[0];\n  if (!file) return;\n\n  const result = await uploadFile(file, &#39;/api/upload?name=&#39; + file.name, onUploadProgress);\n\n  if (result === true) {\n    console.log(&#39;Upload success&#39;);\n  }\n};\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/zh/lupine.components/action-sheet.html
  var action_sheet_default2 = '<h1 id="action-sheet-\u52A8\u4F5C\u5217\u8868"><a class="header-anchor" href="#action-sheet-\u52A8\u4F5C\u5217\u8868">#</a>Action Sheet (\u52A8\u4F5C\u5217\u8868)</h1><p>\u624B\u673A\u7AEF\u5F39\u51FA\u7684\u6ED1\u52A8\u7A97\u53E3\uFF0C\u7528\u4E8E\u663E\u793A\u4E00\u4E2A\u65B0\u9875\u6216\u8BBE\u5B9A\u9009\u9879\u7B49\u3002</p>\n<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { ActionSheetSelect, NotificationMessage, NotificationColor } from &#39;lupine.components&#39;;\n\nActionSheetSelect.show({\n  title: &#39;\u9009\u62E9\u64CD\u4F5C&#39;,\n  options: [&#39;\u9009\u9879 A&#39;, &#39;\u9009\u9879 B&#39;, &#39;\u9009\u9879 C&#39;],\n  handleClicked: (index, close) =&gt; {\n    NotificationMessage.sendMessage(&#39;\u60A8\u9009\u62E9\u4E86: &#39; + index, NotificationColor.Success);\n    close();\n  },\n});\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/zh/lupine.components/button.html
  var button_default2 = '<h1 id="button-\u6309\u94AE"><a class="header-anchor" href="#button-\u6309\u94AE">#</a>Button (\u6309\u94AE)</h1><p>\u57FA\u7840\u6309\u94AE\uFF0C\u652F\u6301\u591A\u79CD\u5C3A\u5BF8\u548C <code>button-push</code> \u52A8\u753B\u3002</p>\n<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { Button, ButtonSize } from &#39;lupine.components&#39;;\n\n// \u4E0D\u540C\u5C3A\u5BF8\u7684\u6309\u94AE\n&lt;Button text=&#39;\u63D0\u4EA4&#39; size={ButtonSize.Large} onClick={() =&gt; {}} /&gt;\n&lt;Button text=&#39;\u641C\u7D22&#39; size={ButtonSize.Medium} onClick={() =&gt; {}} /&gt;\n&lt;Button text=&#39;\u53D6\u6D88&#39; size={ButtonSize.Small} onClick={() =&gt; {}} /&gt;\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/zh/lupine.components/drag-fresh.html
  var drag_fresh_default2 = '<h1 id="dragfresh-\u62D6\u52A8\u5237\u65B0"><a class="header-anchor" href="#dragfresh-\u62D6\u52A8\u5237\u65B0">#</a>DragFresh (\u62D6\u52A8\u5237\u65B0)</h1><p>\u62D6\u52A8\u5237\u65B0\u7EC4\u4EF6\uFF0C\u5E38\u7528\u4E8E\u79FB\u52A8\u7AEF\u5217\u8868\u9876\u90E8\u3002</p>\n<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { DragFresh } from &#39;lupine.components&#39;;\n\n&lt;DragFresh\n  onRefresh={async () =&gt; {\n    // \u6267\u884C\u5237\u65B0\u903B\u8F91\n    await fetchData();\n  }}\n&gt;\n  &lt;ListContent /&gt;\n&lt;/DragFresh&gt;;\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/zh/lupine.components/editable-label.html
  var editable_label_default2 = '<h1 id="editablelabel-\u53EF\u7F16\u8F91\u6807\u7B7E"><a class="header-anchor" href="#editablelabel-\u53EF\u7F16\u8F91\u6807\u7B7E">#</a>EditableLabel (\u53EF\u7F16\u8F91\u6807\u7B7E)</h1><p>\u53CC\u51FB\u53EF\u7F16\u8F91\u7684\u6807\u7B7E\uFF0C\u5149\u6807\u79FB\u51FA\uFF08\u5931\u7126\uFF09\u65F6\u89E6\u53D1\u4FDD\u5B58\u4E8B\u4EF6\u3002</p>\n<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { EditableLabel } from &#39;lupine.components&#39;;\n\n&lt;EditableLabel\n  value=&#39;\u70B9\u51FB\u6211\u8BD5\u8BD5&#39;\n  onSave={(newValue) =&gt; {\n    console.log(&#39;\u4FDD\u5B58\u65B0\u5185\u5BB9:&#39;, newValue);\n  }}\n/&gt;;\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/zh/lupine.components/float-window.html
  var float_window_default2 = '<h1 id="floatwindow-\u6D6E\u7A97"><a class="header-anchor" href="#floatwindow-\u6D6E\u7A97">#</a>FloatWindow (\u6D6E\u7A97)</h1><p>\u4E00\u4E2A\u53EF\u4EE5\u62D6\u52A8\u7684\u5F39\u51FA\u7A97\u53E3\u3002\u652F\u6301 Modal \u548C\u975E Modal \u6A21\u5F0F\u3002</p>\n<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { FloatWindow } from &#39;lupine.components&#39;;\n\n// \u663E\u793A\u4E00\u4E2A\u975E Modal \u7A97\u53E3\nFloatWindow.show({\n  title: &#39;\u5DE5\u5177\u7BB1&#39;,\n  buttons: [&#39;OK&#39;],\n  handleClicked: (index, close) =&gt; {\n    close();\n  },\n  children: &lt;div&gt;\u8FD9\u662F\u4E00\u4E2A\u975E Modal \u7684\u6D6E\u52A8\u7A97\u53E3\u5185\u5BB9\u3002&lt;/div&gt;,\n  noModal: true,\n});\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/zh/lupine.components/grid.html
  var grid_default2 = '<h1 id="grid-\u7F51\u683C"><a class="header-anchor" href="#grid-\u7F51\u683C">#</a>Grid (\u7F51\u683C)</h1><p>\u54CD\u5E94\u5F0F\u7F51\u683C\u5E03\u5C40\uFF0C\u7528\u4E8E\u663E\u793A\u590D\u6742\u5E03\u5C40\u3002</p>\n<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { Grid } from &#39;lupine.components&#39;;\n\n&lt;Grid columns={3} gap=&#39;10px&#39;&gt;\n  &lt;div&gt;\u9879 1&lt;/div&gt;\n  &lt;div&gt;\u9879 2&lt;/div&gt;\n  &lt;div&gt;\u9879 3&lt;/div&gt;\n&lt;/Grid&gt;;\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/zh/lupine.components/html-load.html
  var html_load_default2 = '<h1 id="htmlload-html-\u52A0\u8F7D"><a class="header-anchor" href="#htmlload-html-\u52A0\u8F7D">#</a>HtmlLoad (HTML \u52A0\u8F7D)</h1><p>\u7528\u4E8E\u5F02\u6B65\u52A0\u8F7D\u5E76\u663E\u793A\u8FDC\u7A0B HTML \u5185\u5BB9\u7684\u7EC4\u4EF6\u3002</p>\n<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { HtmlLoad } from &#39;lupine.components&#39;;\n\n&lt;HtmlLoad url=&#39;/api/v1/content/article-1&#39; /&gt;;\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/zh/lupine.components/html-var.html
  var html_var_default2 = '<h1 id="htmlvar-html-\u53D8\u91CF"><a class="header-anchor" href="#htmlvar-html-\u53D8\u91CF">#</a>HtmlVar (HTML \u53D8\u91CF)</h1><p>\u4E00\u4E2A\u5E38\u7528\u6838\u5FC3\u7EC4\u4EF6\uFF0C\u7528\u4E8E\u663E\u793A\u6216\u901A\u8FC7\u53D8\u91CF\u52A8\u6001\u66F4\u65B0 HTML \u5185\u5BB9\u3002</p>\n<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { HtmlVar } from &#39;lupine.components&#39;;\n\n// \u7B80\u5355\u663E\u793A HTML\n&lt;HtmlVar html=&#39;&lt;p&gt;Hello &lt;b&gt;Lupine!&lt;/b&gt;&lt;/p&gt;&#39; /&gt;;\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/zh/lupine.components/input-with-title.html
  var input_with_title_default2 = '<h1 id="inputwithtitle-\u5E26\u6807\u9898\u7684\u8F93\u5165\u6846"><a class="header-anchor" href="#inputwithtitle-\u5E26\u6807\u9898\u7684\u8F93\u5165\u6846">#</a>InputWithTitle (\u5E26\u6807\u9898\u7684\u8F93\u5165\u6846)</h1><p>\u5E26\u6807\u9898\u7684\u8F93\u5165\u6846\u7EC4\u5408\u3002</p>\n<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { InputWithTitle } from &#39;lupine.components&#39;;\n\nconst input = InputWithTitle(&#39;\u7528\u6237\u540D&#39;, &#39;\u8BF7\u8F93\u5165\u60A8\u7684\u59D3\u540D&#39;, (value) =&gt; {\n  console.log(&#39;\u8F93\u5165\u5185\u5BB9:&#39;, value);\n});\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/zh/lupine.components/menu-bar.html
  var menu_bar_default2 = '<h1 id="menubar-\u6A2A\u5411\u83DC\u5355\u680F"><a class="header-anchor" href="#menubar-\u6A2A\u5411\u83DC\u5355\u680F">#</a>Menubar (\u6A2A\u5411\u83DC\u5355\u680F)</h1><p>\u6A2A\u5411\u83DC\u5355\u680F\uFF0C\u652F\u6301\u4E8C\u7EA7\u4E0B\u62C9\u3002</p>\n<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { Menubar } from &#39;lupine.components&#39;;\n\nconst menuItems = [\n  { text: &#39;\u9996\u9875&#39;, link: &#39;/&#39; },\n  {\n    text: &#39;\u4EA7\u54C1&#39;,\n    children: [\n      { text: &#39;LupineJS&#39;, link: &#39;/lupine&#39; },\n      { text: &#39;Components&#39;, link: &#39;/components&#39; },\n    ],\n  },\n];\n\n&lt;Menubar items={menuItems} /&gt;;\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/zh/lupine.components/menu-sidebar.html
  var menu_sidebar_default2 = '<h1 id="menusidebar-\u4FA7\u8FB9\u5BFC\u822A\u680F"><a class="header-anchor" href="#menusidebar-\u4FA7\u8FB9\u5BFC\u822A\u680F">#</a>MenuSidebar (\u4FA7\u8FB9\u5BFC\u822A\u680F)</h1><p>\u7EB5\u5411\u5BFC\u822A\u83DC\u5355\uFF0C\u652F\u6301\u591A\u7EA7\u76EE\u5F55\uFF0C\u9002\u914D\u684C\u9762\u4E0E\u79FB\u52A8\u7AEF\u3002</p>\n<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { MenuSidebar } from &#39;lupine.components&#39;;\n\nconst adminMenu = [\n  { text: &#39;\u4EEA\u8868\u76D8&#39;, icon: &#39;dashboard&#39;, onClick: () =&gt; navigate(&#39;/admin&#39;) },\n  { text: &#39;\u5185\u5BB9\u7BA1\u7406&#39;, icon: &#39;content&#39;, children: [\n      { text: &#39;\u6587\u7AE0\u5217\u8868&#39;, onClick: () =&gt; navigate(&#39;/articles&#39;) },\n      { text: &#39;\u5206\u7C7B\u7BA1\u7406&#39;, onClick: () =&gt; navigate(&#39;/categories&#39;) }\n  ]}\n];\n\n// \u79FB\u52A8\u7AEF\u83DC\u5355\n&lt;MenuSidebar items={adminMenu} mobileMenu={true} /&gt;\n\n// \u684C\u9762\u7AEF\u5DE6\u4FA7\u83DC\u5355\n&lt;MenuSidebar items={adminMenu} desktopMenu={true} /&gt;\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/zh/lupine.components/message-box.html
  var message_box_default2 = '<h1 id="messagebox-\u6D88\u606F\u6846"><a class="header-anchor" href="#messagebox-\u6D88\u606F\u6846">#</a>MessageBox (\u6D88\u606F\u6846)</h1><p>\u9884\u5B9A\u4E49\u7684\u5BF9\u8BDD\u6846\uFF08\u5982 Yes/No, Ok/Cancel\uFF09\uFF0C\u7528\u4E8E\u5FEB\u901F\u63D0\u793A\u3002</p>\n<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { MessageBox, MessageBoxButtonProps } from &#39;lupine.components&#39;;\n\nMessageBox.show({\n  title: &#39;\u5220\u9664\u786E\u8BA4&#39;,\n  buttonType: MessageBoxButtonProps.YesNo,\n  contentMinWidth: &#39;200px&#39;,\n  handleClicked: (index, close) =&gt; {\n    if (index === 0) {\n      // Yes\n      console.log(&#39;\u7528\u6237\u9009\u62E9\u4E86\u786E\u8BA4&#39;);\n    }\n    close();\n  },\n  children: &lt;div&gt;\u60A8\u786E\u5B9A\u8981\u5220\u9664\u6B64\u9879\u5417\uFF1F&lt;/div&gt;,\n});\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/zh/lupine.components/modal.html
  var modal_default2 = '<h1 id="modal-\u6A21\u6001\u6846"><a class="header-anchor" href="#modal-\u6A21\u6001\u6846">#</a>Modal (\u6A21\u6001\u6846)</h1><p>\u4E00\u4E2A\u5177\u6709 Modal \u6216\u65E0 Modal \u6548\u679C\u7684\u5F39\u51FA\u7A97\u53E3\uFF0C\u5E38\u7528\u4E8E\u963B\u585E\u5F0F\u4EA4\u4E92\u3002\u53EF\u4EE5\u62D6\u52A8\u3002</p>\n<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { ModalWindow } from &#39;lupine.components&#39;;\n\nModalWindow.show({\n  title: &#39;\u63D0\u793A&#39;,\n  buttons: [&#39;\u597D\u7684&#39;, &#39;\u53D6\u6D88&#39;],\n  closeWhenClickOutside: true,\n  contentMinWidth: &#39;300px&#39;,\n  handleClicked: (index, close) =&gt; {\n    console.log(&#39;\u70B9\u51FB\u4E86\u7D22\u5F15:&#39;, index);\n    close();\n  },\n  children: &lt;div&gt;\u8FD9\u662F\u4E00\u4E2A\u6A21\u6001\u5BF9\u8BDD\u6846\u7684\u5185\u5BB9\u3002&lt;/div&gt;,\n});\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/zh/lupine.components/notice-message.html
  var notice_message_default2 = '<h1 id="noticemessage-\u901A\u77E5\u6D88\u606F"><a class="header-anchor" href="#noticemessage-\u901A\u77E5\u6D88\u606F">#</a>NoticeMessage (\u901A\u77E5\u6D88\u606F)</h1><p>\u4E00\u4E2A\u5F88\u5E38\u7528\u7684\u6838\u5FC3\u7EC4\u4EF6\uFF0C\u7528\u4E8E\u5728\u9875\u9762\u9876\u90E8\u663E\u793A\u5168\u5C40\u901A\u77E5\u6D88\u606F\u3002\u652F\u6301\u591A\u79CD\u989C\u8272\u7B49\u7EA7\u3002</p>\n<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { NotificationMessage, NotificationColor } from &#39;lupine.components&#39;;\n\n// \u6210\u529F\u901A\u77E5\nNotificationMessage.sendMessage(&#39;\u6570\u636E\u5DF2\u4FDD\u5B58&#39;, NotificationColor.Success);\n\n// \u9519\u8BEF\u901A\u77E5 (\u6C38\u4E45\u663E\u793A)\nNotificationMessage.sendMessage(&#39;\u7F51\u7EDC\u5F02\u5E38\uFF0C\u8BF7\u68C0\u67E5&#39;, NotificationColor.Error, true);\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/zh/lupine.components/paging-link.html
  var paging_link_default2 = '<h1 id="paginglink-\u5206\u9875\u94FE\u63A5"><a class="header-anchor" href="#paginglink-\u5206\u9875\u94FE\u63A5">#</a>PagingLink (\u5206\u9875\u94FE\u63A5)</h1><p>\u5206\u9875\u7EC4\u4EF6\uFF0C\u7528\u4E8E\u5C55\u793A\u548C\u8DF3\u8F6C\u5230\u4E0D\u540C\u9875\u7801\u3002</p>\n<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { PagingLink } from &#39;lupine.components&#39;;\n\n&lt;PagingLink totalCount={100} pageSize={10} currentPage={1} onPageChange={(page) =&gt; console.log(&#39;\u8DF3\u8F6C\u5230\u9875\u7801:&#39;, page)} /&gt;;\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/zh/lupine.components/popup-menu.html
  var popup_menu_default2 = '<h1 id="popupmenu-\u5F39\u51FA\u83DC\u5355"><a class="header-anchor" href="#popupmenu-\u5F39\u51FA\u83DC\u5355">#</a>PopupMenu (\u5F39\u51FA\u83DC\u5355)</h1><p>\u5F39\u51FA\u5F0F\u83DC\u5355\uFF0C\u70B9\u51FB\u6216\u60AC\u505C\u89E6\u53D1\u3002\u7528\u4E8E\u663E\u793A\u9009\u9879\u3002</p>\n<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { PopupMenuWithButton } from &#39;lupine.components&#39;;\n\nconst list = [&#39;\u4E2A\u4EBA\u8BBE\u7F6E&#39;, &#39;\u6D88\u606F\u4E2D\u5FC3&#39;, &#39;\u9000\u51FA\u767B\u5F55&#39;];\n\n&lt;PopupMenuWithButton label=&#39;\u6211\u7684\u8D26\u6237&#39; list={list} handleSelected={(value) =&gt; console.log(&#39;\u9009\u62E9\u4E86:&#39;, value)} /&gt;;\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/zh/lupine.components/progress.html
  var progress_default2 = '<h1 id="progress-\u8FDB\u5EA6\u6761"><a class="header-anchor" href="#progress-\u8FDB\u5EA6\u6761">#</a>Progress (\u8FDB\u5EA6\u6761)</h1><p>\u7528\u4E8E\u663E\u793A\u4E0A\u4F20\u3001\u4E0B\u8F7D\u6216\u5176\u4ED6\u8017\u65F6\u64CD\u4F5C\u7684\u8FDB\u5EA6\u3002</p>\n<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { Progress } from &#39;lupine.components&#39;;\n\n&lt;Progress value={75} max={100} showText={true} /&gt;;\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/zh/lupine.components/radio-label.html
  var radio_label_default2 = '<h1 id="radiolabel-\u5355\u9009\u7EC4"><a class="header-anchor" href="#radiolabel-\u5355\u9009\u7EC4">#</a>RadioLabel (\u5355\u9009\u7EC4)</h1><p>\u5355\u9009\u6309\u94AE\u7EC4\u65B9\u6848\u3002</p>\n<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">// \u7ED3\u5408 input-label \u4F7F\u7528\n&lt;label class=&#39;input-label&#39;&gt;\n  &lt;input class=&#39;input-base&#39; type=&#39;radio&#39; name=&#39;group1&#39; /&gt;\n  \u9009\u9879 A\n&lt;/label&gt;\n&lt;label class=&#39;input-label&#39;&gt;\n  &lt;input class=&#39;input-base&#39; type=&#39;radio&#39; name=&#39;group1&#39; checked /&gt;\n  \u9009\u9879 B\n&lt;/label&gt;\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/zh/lupine.components/redirect.html
  var redirect_default2 = '<h1 id="redirect-\u91CD\u5B9A\u5411"><a class="header-anchor" href="#redirect-\u91CD\u5B9A\u5411">#</a>Redirect (\u91CD\u5B9A\u5411)</h1><p>\u91CD\u5B9A\u5411\u7EC4\u4EF6\uFF0C\u7528\u4E8E\u9875\u9762\u8DF3\u8F6C\u3002</p>\n<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { Redirect } from &#39;lupine.components&#39;;\n\n&lt;Redirect to=&#39;/login&#39; /&gt;;\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/zh/lupine.components/resizable-splitter.html
  var resizable_splitter_default2 = '<h1 id="resizablesplitter-\u53EF\u8C03\u5206\u5272\u5668"><a class="header-anchor" href="#resizablesplitter-\u53EF\u8C03\u5206\u5272\u5668">#</a>ResizableSplitter (\u53EF\u8C03\u5206\u5272\u5668)</h1><p>\u53EF\u62D6\u62C9\u8C03\u6574\u4E24\u4E2A\u7EC4\u4EF6\u5927\u5C0F\u7684\u5206\u5272\u5668\u3002</p>\n<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { ResizableSplitter } from &#39;lupine.components&#39;;\n\n&lt;ResizableSplitter left={&lt;div&gt;\u5DE6\u4FA7\u5185\u5BB9&lt;/div&gt;} right={&lt;div&gt;\u53F3\u4FA7\u5185\u5BB9&lt;/div&gt;} minWidth=&#39;200px&#39; /&gt;;\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/zh/lupine.components/select-angle.html
  var select_angle_default2 = '<h1 id="selectangle-\u89D2\u5EA6\u9009\u62E9"><a class="header-anchor" href="#selectangle-\u89D2\u5EA6\u9009\u62E9">#</a>SelectAngle (\u89D2\u5EA6\u9009\u62E9)</h1><p>360 \u5EA6\u89D2\u5EA6\u9009\u62E9\u5668\u3002</p>\n<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { SelectAngle } from &#39;lupine.components&#39;;\n\n&lt;SelectAngle value={90} onChange={(angle) =&gt; console.log(&#39;\u9009\u62E9\u89D2\u5EA6:&#39;, angle)} /&gt;;\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/zh/lupine.components/select-with-title.html
  var select_with_title_default2 = '<h1 id="selectwithtitle-\u5E26\u6807\u9898\u7684\u4E0B\u62C9\u5217\u8868"><a class="header-anchor" href="#selectwithtitle-\u5E26\u6807\u9898\u7684\u4E0B\u62C9\u5217\u8868">#</a>SelectWithTitle (\u5E26\u6807\u9898\u7684\u4E0B\u62C9\u5217\u8868)</h1><p>\u5E26\u6807\u9898\u7684\u4E0B\u62C9\u9009\u62E9\u5217\u8868\u3002</p>\n<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { SelectWithTitle } from &#39;lupine.components&#39;;\n\nconst options = [\n  { option: &#39;\u9009\u9879 1&#39;, value: &#39;1&#39; },\n  { option: &#39;\u9009\u9879 2&#39;, value: &#39;2&#39;, selected: true },\n];\n\nconst select = SelectWithTitle(&#39;\u8BF7\u9009\u62E9\u7B49\u7EA7&#39;, options, (value) =&gt; {\n  console.log(&#39;\u9009\u62E9\u4E86:&#39;, value);\n});\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/zh/lupine.components/slide-tab.html
  var slide_tab_default2 = '<h1 id="slidetab-\u6ED1\u52A8\u9009\u9879\u5361"><a class="header-anchor" href="#slidetab-\u6ED1\u52A8\u9009\u9879\u5361">#</a>SlideTab (\u6ED1\u52A8\u9009\u9879\u5361)</h1><p>\u81EA\u52A8\u5207\u6362\u7684 Tab \u9875\u9762\u7684\u7EC4\u4EF6\uFF0C\u652F\u6301\u6ED1\u52A8\u6548\u679C\u3002</p>\n<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { SlideTab } from &#39;lupine.components&#39;;\n\nconst items = [\n  { title: &#39;Slide 1&#39;, children: &lt;div&gt;\u5185\u5BB9 1&lt;/div&gt; },\n  { title: &#39;Slide 2&#39;, children: &lt;div&gt;\u5185\u5BB9 2&lt;/div&gt; },\n];\n\n&lt;SlideTab items={items} autoPlay={true} interval={3000} /&gt;;\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/zh/lupine.components/spinner.html
  var spinner_default2 = '<h1 id="spinner-\u52A0\u8F7D\u52A8\u753B"><a class="header-anchor" href="#spinner-\u52A0\u8F7D\u52A8\u753B">#</a>Spinner (\u52A0\u8F7D\u52A8\u753B)</h1><p>\u65CB\u8F6C\u7684\u52A0\u8F7D\u52A8\u753B\uFF0C\u5E38\u7528\u4E8E\u6570\u636E\u52A0\u8F7D\u7B49\u5F85\u3002</p>\n<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { Spinner } from &#39;lupine.components&#39;;\n\n&lt;Spinner size=&#39;30px&#39; color=&#39;var(--primary-color)&#39; /&gt;;\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/zh/lupine.components/stars.html
  var stars_default2 = '<h1 id="stars-\u661F\u7EA7\u8BC4\u5206"><a class="header-anchor" href="#stars-\u661F\u7EA7\u8BC4\u5206">#</a>Stars (\u661F\u7EA7\u8BC4\u5206)</h1><p>\u661F\u7EA7\u8BC4\u5206\u7EC4\u4EF6\u3002</p>\n<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { Stars } from &#39;lupine.components&#39;;\n\n&lt;Stars value={4.5} onChanged={(score) =&gt; console.log(&#39;\u8BC4\u5206\u6539\u4E3A:&#39;, score)} /&gt;;\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/zh/lupine.components/svg-icon.html
  var svg_icon_default2 = '<h1 id="svgicon-svg-\u56FE\u6807"><a class="header-anchor" href="#svgicon-svg-\u56FE\u6807">#</a>SvgIcon (SVG \u56FE\u6807)</h1><p>\u9AD8\u6027\u80FD\u539F\u751F SVG \u56FE\u6807\u7EC4\u4EF6\uFF0C\u652F\u6301\u901A\u8FC7\u8DEF\u5F84\u6216\u540D\u79F0\u663E\u793A\u56FE\u6807\u3002</p>\n<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { SvgIcon } from &#39;lupine.components&#39;;\n\n&lt;SvgIcon name=&#39;home&#39; size={24} /&gt;\n&lt;SvgIcon name=&#39;settings&#39; color=&#39;red&#39; /&gt;\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/zh/lupine.components/switch-option.html
  var switch_option_default2 = '<h1 id="switchoption-\u5207\u6362\u9009\u9879"><a class="header-anchor" href="#switchoption-\u5207\u6362\u9009\u9879">#</a>SwitchOption (\u5207\u6362\u9009\u9879)</h1><p>\u5207\u6362\u9009\u9879\u7EC4\u4EF6\u3002\u53EF\u4EE5\u5728\u4E24\u4E2A\u6587\u5B57\u9009\u9879\u4E4B\u95F4\u5207\u6362\u3002</p>\n<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { SwitchOption } from &#39;lupine.components&#39;;\n\n&lt;SwitchOption options={[&#39;\u9009\u9879 1&#39;, &#39;\u9009\u9879 2&#39;]} onChanged={(index) =&gt; console.log(&#39;\u5F53\u524D\u7D22\u5F15:&#39;, index)} /&gt;;\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/zh/lupine.components/tabs.html
  var tabs_default2 = '<h1 id="tabs-\u9009\u9879\u5361"><a class="header-anchor" href="#tabs-\u9009\u9879\u5361">#</a>Tabs (\u9009\u9879\u5361)</h1><p>\u6807\u51C6\u7684\u9009\u9879\u5361\u7EC4\u4EF6\uFF0C\u7528\u4E8E\u5728\u540C\u4E00\u533A\u57DF\u5207\u6362\u4E0D\u540C\u5185\u5BB9\u3002</p>\n<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { Tabs, TabsPageProps } from &#39;lupine.components&#39;;\n\nconst pages: TabsPageProps[] = [\n  { title: &#39;\u6982\u89C8&#39;, children: &lt;Overview /&gt; },\n  { title: &#39;\u8BE6\u60C5&#39;, children: &lt;Details /&gt; },\n];\n\n&lt;Tabs pages={pages} pagePadding=&#39;16px&#39; /&gt;;\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/zh/lupine.components/text-glow.html
  var text_glow_default2 = '<h1 id="\u6587\u672C\u7279\u6548-text-effects"><a class="header-anchor" href="#\u6587\u672C\u7279\u6548-text-effects">#</a>\u6587\u672C\u7279\u6548 (Text Effects)</h1><p>lupine.components \u63D0\u4F9B\u4E86\u4E00\u7CFB\u5217\u70AB\u9177\u7684\u6587\u5B57\u52A8\u753B\u7EC4\u4EF6\u3002</p>\n<ul>\n<li><strong>TextGlow</strong>: \u53D1\u5149\u52A8\u753B\u6587\u5B57\u3002</li>\n<li><strong>TextScale</strong>: \u7F29\u653E\u52A8\u753B\u6587\u5B57\u3002</li>\n<li><strong>TextWave</strong>: \u6CE2\u52A8\u52A8\u753B\u6587\u5B57\u3002</li>\n</ul>\n<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { TextGlow, TextScale, TextWave } from &#39;lupine.components&#39;;\n\n&lt;TextGlow text=&#39;\u53D1\u5149\u7684\u6587\u5B57&#39; /&gt;\n&lt;TextScale text=&#39;\u7F29\u653E\u7684\u6587\u5B57&#39; /&gt;\n&lt;TextWave text=&#39;\u6CE2\u52A8\u7684\u6587\u5B57&#39; /&gt;\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/zh/lupine.components/text-scale.html
  var text_scale_default2 = '<h1 id="textscale-\u7F29\u653E\u6587\u5B57"><a class="header-anchor" href="#textscale-\u7F29\u653E\u6587\u5B57">#</a>TextScale (\u7F29\u653E\u6587\u5B57)</h1><p>\u63D0\u4F9B\u7F29\u653E\u52A8\u753B\u6548\u679C\u7684\u6587\u5B57\u7EC4\u4EF6\u3002</p>\n<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { TextScale } from &#39;lupine.components&#39;;\n\n&lt;TextScale text=&#39;\u7F29\u653E\u52A8\u753B\u6587\u5B57&#39; /&gt;;\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/zh/lupine.components/text-wave.html
  var text_wave_default2 = '<h1 id="textwave-\u6CE2\u52A8\u6587\u5B57"><a class="header-anchor" href="#textwave-\u6CE2\u52A8\u6587\u5B57">#</a>TextWave (\u6CE2\u52A8\u6587\u5B57)</h1><p>\u63D0\u4F9B\u6CE2\u52A8\u52A8\u753B\u6548\u679C\u7684\u6587\u5B57\u7EC4\u4EF6\u3002</p>\n<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { TextWave } from &#39;lupine.components&#39;;\n\n&lt;TextWave text=&#39;\u6CE2\u52A8\u52A8\u753B\u6587\u5B57&#39; /&gt;;\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/zh/lupine.components/toggle-base.html
  var toggle_base_default2 = '<h1 id="togglebase-\u5207\u6362\u57FA\u7C7B"><a class="header-anchor" href="#togglebase-\u5207\u6362\u57FA\u7C7B">#</a>ToggleBase (\u5207\u6362\u57FA\u7C7B)</h1><p>\u5207\u6362\u7EC4\u4EF6\u7684\u57FA\u7840\u7C7B\uFF0C\u53EF\u4EE5\u5728\u8FD9\u4E2A\u57FA\u7840\u4E0A\u5B9E\u73B0\u81EA\u5B9A\u4E49\u5207\u6362\u7EC4\u4EF6\u3002</p>\n<h2 id="\u8BF4\u660E"><a class="header-anchor" href="#\u8BF4\u660E">#</a>\u8BF4\u660E</h2><p>\u8FD9\u662F\u4E00\u4E2A\u5185\u90E8\u4F7F\u7528\u7684\u57FA\u7C7B\uFF0C\u901A\u5E38\u4E0D\u9700\u8981\u76F4\u63A5\u5728\u5E94\u7528\u4E2D\u4F7F\u7528\uFF0C\u9664\u975E\u60A8\u60F3\u5B9E\u73B0\u81EA\u5B9A\u4E49\u7684 Toggle \u4EA4\u4E92\u903B\u8F91\u3002</p>\n';

  // apps/doc/web/src/markdown-built/zh/lupine.components/toggle-switch.html
  var toggle_switch_default2 = '<h1 id="toggleswitch-\u5207\u6362\u5F00\u5173"><a class="header-anchor" href="#toggleswitch-\u5207\u6362\u5F00\u5173">#</a>ToggleSwitch (\u5207\u6362\u5F00\u5173)</h1><p>\u5207\u6362\u5F00\u5173\uFF0C\u5E38\u7528\u4E8E\u8BBE\u7F6E\u3002</p>\n<h2 id="\u5B9E\u88C5\u4F8B\u5B50"><a class="header-anchor" href="#\u5B9E\u88C5\u4F8B\u5B50">#</a>\u5B9E\u88C5\u4F8B\u5B50</h2><pre><code class="language-typescript">import { ToggleSwitch, ToggleSwitchSize } from &#39;lupine.components&#39;;\n\n&lt;ToggleSwitch checked={true} size={ToggleSwitchSize.Medium} text={{ on: &#39;\u5F00\u542F&#39;, off: &#39;\u5173\u95ED&#39; }} textWidth=&#39;60px&#39; /&gt;;\n</code></pre>\n';

  // apps/doc/web/src/markdown-built/zh/lupine.press/overview.html
  var overview_default3 = '<h1 id="lupine-press"><a class="header-anchor" href="#lupine-press">#</a>lupine.press</h1><p><code>lupine.press</code> \u662F\u4E00\u4E2A\u57FA\u4E8E <code>lupine.web</code> \u6784\u5EFA\u7684\u8F7B\u91CF\u7EA7\u3001\u9AD8\u6027\u80FD\u7684\u6587\u6863\u7F51\u7AD9\u6846\u67B6\u3002\u5B83\u63D0\u4F9B\u4E86\u4E00\u5957\u5B8C\u6574\u7684\u89E3\u51B3\u65B9\u6848\uFF0C\u7528\u4E8E\u6E32\u67D3\u57FA\u4E8E Markdown \u7684\u6587\u6863\u7F51\u7AD9\uFF0C\u652F\u6301\u54CD\u5E94\u5F0F\u5E03\u5C40\u3001\u4FA7\u8FB9\u680F\u5BFC\u822A\u548C\u4E3B\u9898\u5207\u6362\u3002</p>\n<p>\u5B83\u65E8\u5728\u4E0E <code>lupine</code> \u751F\u6001\u7CFB\u7EDF\u65E0\u7F1D\u534F\u4F5C\uFF0C\u4E3A\u5982 LupineJS \u5B98\u65B9\u6587\u6863\u7B49\u7AD9\u70B9\u63D0\u4F9B\u652F\u6301\u3002</p>\n<h2 id="\u4E3B\u8981\u7279\u6027-features"><a class="header-anchor" href="#\u4E3B\u8981\u7279\u6027-features">#</a>\u4E3B\u8981\u7279\u6027 (Features)</h2><ul>\n<li><strong>\u54CD\u5E94\u5F0F\u5E03\u5C40 (Responsive Layout)</strong>: \u5185\u7F6E\u7684 <code>PressFrame</code> \u63D0\u4F9B\u4E86\u6807\u51C6\u7684\u6587\u6863\u5E03\u5C40\uFF0C\u5305\u542B\u5934\u90E8\u3001\u54CD\u5E94\u5F0F\u4FA7\u8FB9\u680F\u548C\u5185\u5BB9\u533A\u57DF\u3002</li>\n<li><strong>Markdown \u6E32\u67D3 (Markdown Rendering)</strong>: \u9488\u5BF9 Markdown \u751F\u6210\u7684\u5185\u5BB9\u8FDB\u884C\u4E86\u4F18\u5316\uFF0C\u652F\u6301\u8BED\u6CD5\u9AD8\u4EAE\u548C\u6807\u51C6\u6392\u7248\u3002</li>\n<li><strong>\u4FA7\u8FB9\u680F\u5BFC\u822A (Sidebar Navigation)</strong>: \u6839\u636E\u60A8\u7684\u914D\u7F6E\u81EA\u52A8\u751F\u6210\u591A\u7EA7\u4FA7\u8FB9\u680F\u3002</li>\n<li><strong>\u4E3B\u9898\u652F\u6301 (Theming)</strong>: \u901A\u8FC7 <code>lupine.components</code> \u4E3B\u9898\u7CFB\u7EDF\u5185\u7F6E\u652F\u6301\u591A\u79CD\u4E3B\u9898\uFF08\u5982\u4EAE\u8272/\u6697\u8272\u6A21\u5F0F\uFF09\u3002</li>\n<li><strong>\u8DEF\u7531\u96C6\u6210 (Routing)</strong>: \u4E0E <code>PageRouter</code> \u663E\u5F0F\u96C6\u6210\uFF0C\u7528\u4E8E\u5904\u7406\u5BA2\u6237\u7AEF\u5BFC\u822A\u3002</li>\n<li><strong>\u591A\u8BED\u8A00\u652F\u6301 (Multilingual Support)</strong>: \u81EA\u52A8\u626B\u63CF\u591A\u8BED\u8A00\u76EE\u5F55\u7684 markdown \u6587\u4EF6\uFF0C\u591A\u8BED\u8A00\u663E\u793A\u5207\u6362\u3002</li>\n</ul>\n<h2 id="\u4F7F\u7528\u6307\u5357-usage-guide"><a class="header-anchor" href="#\u4F7F\u7528\u6307\u5357-usage-guide">#</a>\u4F7F\u7528\u6307\u5357 (Usage Guide)</h2><p>\u8981\u4F7F\u7528 <code>lupine.press</code>\uFF0C\u60A8\u901A\u5E38\u9700\u8981\u8BBE\u7F6E\u4E00\u4E2A <code>lupine.web</code> \u5E94\u7528\u7A0B\u5E8F\uFF0C\u5E76\u5C06\u5176\u914D\u7F6E\u4E3A\u4F7F\u7528 <code>PressPage</code> \u4F5C\u4E3A\u4E3B\u8DEF\u7531\u5904\u7406\u7A0B\u5E8F\u3002</p>\n<h3 id="1-\u524D\u63D0\u6761\u4EF6-prerequisites"><a class="header-anchor" href="#1-\u524D\u63D0\u6761\u4EF6-prerequisites">#</a>1. \u524D\u63D0\u6761\u4EF6 (Prerequisites)</h3><p>\u786E\u4FDD\u60A8\u7684\u9879\u76EE\u4E2D\u5DF2\u5B89\u88C5 <code>lupine.press</code>\u3002</p>\n<h3 id="2-\u57FA\u672C\u8BBE\u7F6E-basic-setup"><a class="header-anchor" href="#2-\u57FA\u672C\u8BBE\u7F6E-basic-setup">#</a>2. \u57FA\u672C\u8BBE\u7F6E (Basic Setup)</h3><p>\u5728\u60A8\u7684\u5E94\u7528\u7A0B\u5E8F\u5165\u53E3\u70B9\uFF08\u4F8B\u5982 <code>src/index.tsx</code>\uFF09\u4E2D\uFF0C\u60A8\u9700\u8981\u7ED1\u5B9A\u5FC5\u8981\u7684\u914D\u7F6E\u5E76\u8BBE\u7F6E\u8DEF\u7531\u5668\u3002</p>\n<pre><code class="language-typescript">import { bindRouter, PageRouter, bindTheme, bindLang, setDefaultPageTitle } from &#39;lupine.components&#39;;\nimport { bindPressData, PressPage, pressThemes } from &#39;lupine.press&#39;;\nimport { markdownConfig } from &#39;./markdown-config&#39;; // \u60A8\u751F\u6210\u7684 markdown \u6570\u636E\n\n// 1. \u521D\u59CB\u5316\u6838\u5FC3\u8BBE\u7F6E\nbindLang(&#39;en&#39;, {}); // \u8BBE\u7F6E\u9ED8\u8BA4\u8BED\u8A00\nbindTheme(&#39;light&#39;, pressThemes); // \u7ED1\u5B9A\u4E3B\u9898\uFF08\u5305\u542B press \u7279\u5B9A\u7684\u6837\u5F0F\uFF09\nsetDefaultPageTitle(&#39;My Documentation&#39;);\n\n// 2. \u7ED1\u5B9A\u6587\u6863\u6570\u636E\n// markdownConfig \u662F\u4E00\u4E2A\u5305\u542B\u4ECE markdown \u6587\u4EF6\u751F\u6210\u7684 HTML \u5185\u5BB9\u548C\u5143\u6570\u636E\u7684\u5BF9\u8C61\u3002\nbindPressData(markdownConfig);\n\n// 3. \u914D\u7F6E\u8DEF\u7531\u5668\nconst pageRouter = new PageRouter();\n//\u5C06\u6240\u6709\u8BF7\u6C42\u8DEF\u7531\u5230 PressPage\uFF0CPressPage \u4F1A\u5904\u7406\u5728 markdownConfig \u4E2D\u67E5\u627E\u5185\u5BB9\npageRouter.use(&#39;*&#39;, PressPage);\n\n// 4. \u542F\u52A8\u5E94\u7528\u7A0B\u5E8F\nbindRouter(pageRouter);\n</code></pre>\n<h3 id="3-\u6570\u636E\u7ED3\u6784-markdownconfig"><a class="header-anchor" href="#3-\u6570\u636E\u7ED3\u6784-markdownconfig">#</a>3. \u6570\u636E\u7ED3\u6784 (`markdownConfig`)</h3><p><code>bindPressData</code> \u51FD\u6570\u671F\u671B\u4E00\u4E2A\u914D\u7F6E\u5BF9\u8C61\uFF0C\u5176\u4E2D\u952E\u662F\u8DEF\u7531\u8DEF\u5F84\uFF08\u4F8B\u5982 <code>/guide/started</code>\uFF09\uFF0C\u503C\u5305\u542B\u5185\u5BB9\u548C\u5143\u6570\u636E\u3002</p>\n<p>\u901A\u5E38\uFF0C\u6B64\u6570\u636E\u662F\u5728\u6784\u5EFA\u65F6\u4ECE\u60A8\u7684 Markdown \u6587\u4EF6\u751F\u6210\u7684\u3002</p>\n<pre><code class="language-typescript">export const markdownConfig = {\n  &#39;/en/guide/started&#39;: {\n    html: &#39;&lt;h1&gt;Getting Started&lt;/h1&gt;&lt;p&gt;...&lt;/p&gt;&#39;, // \u9884\u6E32\u67D3\u7684 HTML \u5185\u5BB9\n    data: {\n      title: &#39;Getting Started&#39;,\n      sidebar: [\n        // \u5F53\u524D\u9875\u9762\u4E0A\u4E0B\u6587\u7684\u4FA7\u8FB9\u680F\u914D\u7F6E\n        { type: &#39;group&#39;, text: &#39;Guide&#39;, level: 0 },\n        { type: &#39;link&#39;, text: &#39;Installation&#39;, link: &#39;/en/guide/install&#39;, level: 1 },\n      ],\n    },\n    headings: [{ level: 2, text: &#39;Prerequisites&#39;, id: &#39;prerequisites&#39; }],\n  },\n  // ... \u5176\u4ED6\u9875\u9762\n};\n</code></pre>\n<h2 id="markdown-\u6587\u4EF6\u7ED3\u6784\u4E0E\u5173\u8054-markdown-file-structure-association"><a class="header-anchor" href="#markdown-\u6587\u4EF6\u7ED3\u6784\u4E0E\u5173\u8054-markdown-file-structure-association">#</a>Markdown \u6587\u4EF6\u7ED3\u6784\u4E0E\u5173\u8054 (Markdown File Structure & Association)</h2><h3 id="\u9876\u5C42\u914D\u7F6E-top-level-configuration"><a class="header-anchor" href="#\u9876\u5C42\u914D\u7F6E-top-level-configuration">#</a>\u9876\u5C42\u914D\u7F6E (Top-level Configuration)</h3><p>\u5728 Markdown \u6587\u4EF6\u7684\u9876\u5C42\u76EE\u5F55\uFF08\u6839\u76EE\u5F55\uFF09\uFF0C\u5FC5\u987B\u5B58\u5728\u4E00\u4E2A <code>index.md</code> \u6587\u4EF6\u3002\u8BE5\u6587\u4EF6\u4F7F\u7528 <code>lang</code> \u5B57\u6BB5\u6765\u6307\u5B9A\u7AD9\u70B9\u652F\u6301\u7684\u6240\u6709\u8BED\u8A00\u3002</p>\n<pre><code class="language-yaml">---\nlang:\n  - title: English\n    id: en\n  - title: \u7B80\u4F53\u4E2D\u6587\n    id: zh\n---\n</code></pre>\n<h3 id="\u591A\u8BED\u8A00\u914D\u7F6E-multilingual-configuration"><a class="header-anchor" href="#\u591A\u8BED\u8A00\u914D\u7F6E-multilingual-configuration">#</a>\u591A\u8BED\u8A00\u914D\u7F6E (Multilingual Configuration)</h3><p>\u6BCF\u4E2A\u8BED\u8A00 ID\uFF08\u5982 <code>en</code>, <code>zh</code>\uFF09\u5BF9\u5E94\u4E00\u4E2A\u5B50\u76EE\u5F55\uFF0C\u4E14\u8BE5\u76EE\u5F55\u4E0B\u5FC5\u987B\u6709\u4E00\u4E2A <code>index.md</code> \u6587\u4EF6\u3002\u6B64\u6587\u4EF6\u7528\u4E8E\u914D\u7F6E\u8BE5\u8BED\u8A00\u7248\u672C\u7684\u5E03\u5C40\u3001\u6807\u9898\u3001\u4FA7\u8FB9\u680F\u5BBD\u5EA6\u7B49\u5168\u5C40\u8BBE\u7F6E\u3002\u8BE5\u8BED\u8A00\u7684\u6240\u6709 Markdown \u5185\u5BB9\u6587\u4EF6\u90FD\u5E94\u5B58\u653E\u4E8E\u6B64\u76EE\u5F55\u6216\u5176\u5B50\u76EE\u5F55\u4E2D\u3002</p>\n<p><code>index.md</code> \u652F\u6301\u5B9A\u4E49\u4EE5\u4E0B\u5185\u5BB9\uFF1A</p>\n<ul>\n<li><strong>Hero &amp; Features</strong>: \u9996\u9875\u5927\u56FE\u548C\u7279\u6027\u4ECB\u7ECD\u3002</li>\n<li><strong>Nav</strong>: \u9876\u90E8\u7684\u5BFC\u822A\u94FE\u63A5\u3002</li>\n<li><strong>GitHub</strong>: GitHub \u4ED3\u5E93\u94FE\u63A5\u3002</li>\n<li><strong>Sidebar</strong>: \u4FA7\u8FB9\u680F\u83DC\u5355\u914D\u7F6E\uFF08\u6838\u5FC3\u53C2\u6570\uFF09\u3002</li>\n</ul>\n<h3 id="\u4FA7\u8FB9\u680F\u914D\u7F6E-sidebar-configuration"><a class="header-anchor" href="#\u4FA7\u8FB9\u680F\u914D\u7F6E-sidebar-configuration">#</a>\u4FA7\u8FB9\u680F\u914D\u7F6E (Sidebar Configuration)</h3><p><code>sidebar</code> \u53C2\u6570\u662F\u4E00\u4E2A\u6570\u7EC4\uFF0C\u652F\u6301\u4E09\u79CD\u914D\u7F6E\u6A21\u5F0F\uFF1A</p>\n<ol>\n<li><strong>\u5B50\u83DC\u5355\u6A21\u5F0F (<code>submenu</code>)</strong>:\n\u6307\u5411\u4E00\u4E2A\u5B50\u76EE\u5F55\u3002\u7CFB\u7EDF\u4F1A\u81EA\u52A8\u5C55\u5F00\u8BE5\u5B50\u76EE\u5F55\u4E0B\u7684 <code>index.md</code> \u4E2D\u5B9A\u4E49\u7684 <code>sidebar</code> \u914D\u7F6E\uFF0C\u5E76\u5C06\u5176\u5185\u5BB9\u5408\u5E76\u5230\u5F53\u524D\u7EA7\u522B\u3002</li>\n<li><strong>\u5206\u7EC4\u6A21\u5F0F (<code>text</code> + <code>items</code>)</strong>:\n\u5B9A\u4E49\u4E00\u4E2A\u83DC\u5355\u7EC4\u3002<code>text</code> \u4E3A\u7EC4\u6807\u9898\uFF0C<code>items</code> \u4E3A\u8BE5\u7EC4\u4E0B\u7684\u6240\u6709\u94FE\u63A5\u5217\u8868\u3002</li>\n<li><strong>\u6241\u5E73\u6A21\u5F0F (<code>items</code> only)</strong>:\n\u4EC5\u5B9A\u4E49 <code>items</code> \u800C\u4E0D\u63D0\u4F9B <code>text</code>\u3002\u6B64\u65F6 <code>items</code> \u4E2D\u7684\u6240\u6709\u94FE\u63A5\u5C06\u76F4\u63A5\u663E\u793A\u5728\u5F53\u524D\u7EA7\u522B\uFF0C\u4E0D\u8FDB\u884C\u5206\u7EC4\u3002</li>\n</ol>\n<h2 id="\u67B6\u6784-architecture"><a class="header-anchor" href="#\u67B6\u6784-architecture">#</a>\u67B6\u6784 (Architecture)</h2><ul>\n<li><strong><code>PressFrame</code></strong>: \u4E3B\u8981\u5E03\u5C40\u7EC4\u4EF6\u3002\u5B83\u5904\u7406\u6587\u6863\u7AD9\u70B9\u7684\u7279\u5B9A CSS \u548C\u7ED3\u6784\uFF0C\u786E\u4FDD\u4FA7\u8FB9\u680F\u548C\u5185\u5BB9\u533A\u57DF\u72EC\u7ACB\u6EDA\u52A8\u3002</li>\n<li><strong><code>PressPage</code></strong>: \u201C\u63A7\u5236\u5668\u201D\u7EC4\u4EF6\u3002\u5B83\u5728\u7ED1\u5B9A\u7684 <code>markdownConfig</code> \u4E2D\u67E5\u627E\u5F53\u524D URL\uFF0C\u68C0\u7D22\u76F8\u5E94\u7684 HTML \u548C\u5143\u6570\u636E\uFF0C\u5E76\u4F7F\u7528\u6B63\u786E\u7684\u4FA7\u8FB9\u680F\u548C\u5185\u5BB9\u6E32\u67D3 <code>PressFrame</code>\u3002</li>\n<li><strong><code>pressLoad</code></strong>: \u4E00\u4E2A\u5BFC\u822A\u5B9E\u7528\u7A0B\u5E8F\uFF0C\u7528\u4E8E\u5904\u7406\u6587\u6863\u5185\u7684\u94FE\u63A5\u70B9\u51FB\uFF0C\u786E\u4FDD\u5E73\u6ED1\u7684\u5BA2\u6237\u7AEF\u8F6C\u6362\u3002</li>\n</ul>\n';

  // apps/doc/web/src/markdown-built/zh/lupine.web/overview.html
  var overview_default4 = '<h1 id="lupine-web"><a class="header-anchor" href="#lupine-web">#</a>lupine.web</h1><p><strong>lupine.web</strong> \u662F\u4E00\u4E2A\u7C7B\u4F3C React\u3001\u6781\u5FEB\u3001\u5C0F\u5DE7\u4E14\u8F7B\u91CF\u7EA7\u7684\u524D\u7AEF\u6846\u67B6\uFF0C\u4E13\u4E3A\u73B0\u4EE3 Web \u5F00\u53D1\u800C\u8BBE\u8BA1\u3002\u5B83\u4E13\u6CE8\u4E8E\u6027\u80FD\u3001\u7B80\u5355\u6027\uFF0C\u5E76\u4E0E <code>lupine.api</code> \u642D\u914D\u4F7F\u7528\u65F6\u63D0\u4F9B\u5168\u6808\u4F53\u9A8C\u3002</p>\n<h2 id="\u4E3A\u4EC0\u4E48\u9009\u62E9-lupine-web"><a class="header-anchor" href="#\u4E3A\u4EC0\u4E48\u9009\u62E9-lupine-web">#</a>\u4E3A\u4EC0\u4E48\u9009\u62E9 lupine.web?</h2><h3 id="\u96F6\u4F9D\u8D56\u4E14\u8F7B\u91CF\u7EA7-zero-dependency-lightweight"><a class="header-anchor" href="#\u96F6\u4F9D\u8D56\u4E14\u8F7B\u91CF\u7EA7-zero-dependency-lightweight">#</a>\u{1F680} \u96F6\u4F9D\u8D56\u4E14\u8F7B\u91CF\u7EA7 (Zero-Dependency & Lightweight)</h3><p>\u6211\u4EEC\u76F8\u4FE1\u4FDD\u6301\u7B80\u5355\u3002<code>lupine.web</code> <strong>\u6CA1\u6709\u5916\u90E8\u4F9D\u8D56</strong>\uFF0C\u56E0\u6B64\u5305\u4F53\u79EF\u6781\u5C0F\uFF0C\u52A0\u8F7D\u901F\u5EA6\u6781\u5FEB\u3002\u5B83\u4F7F\u7528 TSX \u8BED\u6CD5\uFF0C\u6240\u4EE5\u5982\u679C\u4F60\u719F\u6089 React\uFF0C\u4F60\u4F1A\u611F\u5230\u975E\u5E38\u4EB2\u5207\u3002</p>\n<h3 id="\u5185\u7F6E-css-in-js-built-in-css-in-js"><a class="header-anchor" href="#\u5185\u7F6E-css-in-js-built-in-css-in-js">#</a>\u{1F3A8} \u5185\u7F6E CSS-in-JS (Built-in CSS-in-JS)</h3><p>\u4E0D\u7528\u518D\u8BBE\u7F6E\u590D\u6742\u7684 CSS \u52A0\u8F7D\u5668\u6216\u5916\u90E8\u6837\u5F0F\u5E93\u4E86\u3002<code>lupine.web</code> \u81EA\u5E26\u4E86\u4E00\u4E2A\u5F3A\u5927\u7684\u5185\u7F6E CSS-in-JS \u89E3\u51B3\u65B9\u6848\u3002</p>\n<ul>\n<li><strong>\u4F5C\u7528\u57DF\u6837\u5F0F (Scoped Styles)</strong>: \u6837\u5F0F\u81EA\u52A8\u9650\u5B9A\u5728\u7EC4\u4EF6\u4F5C\u7528\u57DF\u5185\uFF0C\u4EE5\u9632\u6B62\u51B2\u7A81\u3002</li>\n<li><strong>\u5D4C\u5957\u652F\u6301 (Nesting Support)</strong>: \u4F7F\u7528\u5D4C\u5957\u9009\u62E9\u5668\u7F16\u5199\u66F4\u6E05\u6670\u7684 CSS\uFF08\u4F8B\u5982\uFF0C<code>&amp;:hover</code>\uFF0C<code>&amp; &gt; span</code>\uFF09\u3002</li>\n<li><strong>\u4E3B\u9898\u652F\u6301 (Theming)</strong>: \u539F\u751F\u652F\u6301\u4EAE/\u6697\u6A21\u5F0F\u548C\u81EA\u5B9A\u4E49\u4E3B\u9898\u3002</li>\n</ul>\n<pre><code class="language-tsx">const MyButton = (props) =&gt; (\n  &lt;button\n    css={{\n      backgroundColor: &#39;blue&#39;,\n      color: &#39;white&#39;,\n      &#39;&amp;:hover&#39;: { backgroundColor: &#39;darkblue&#39; },\n      [MediaQueryRange.Mobile]: { width: &#39;100%&#39; },\n    }}\n  &gt;\n    {props.children}\n  &lt;/button&gt;\n);\n</code></pre>\n<h3 id="\u5F3A\u5927\u7684\u8DEF\u7531-powerful-router"><a class="header-anchor" href="#\u5F3A\u5927\u7684\u8DEF\u7531-powerful-router">#</a>\u{1F6E3}\uFE0F \u5F3A\u5927\u7684\u8DEF\u7531 (Powerful Router)</h3><p>\u6211\u4EEC\u7684\u51FD\u6570\u5F0F\u8DEF\u7531\u4E13\u4E3A\u7075\u6D3B\u6027\u548C\u63A7\u5236\u529B\u800C\u8BBE\u8BA1\u3002</p>\n<ul>\n<li><strong>\u8DEF\u7531\u5B88\u536B (Route Guards)</strong>: \u8F7B\u677E\u5B9E\u73B0\u8EAB\u4EFD\u9A8C\u8BC1\u68C0\u67E5\u6216\u6743\u9650\u63A7\u5236\u3002</li>\n<li><strong>\u5D4C\u5957\u8DEF\u7531 (Nested Routes)</strong>: \u4F7F\u7528\u5B50\u8DEF\u7531\u7EC4\u7EC7\u5E94\u7528\u7A0B\u5E8F\uFF0C\u5B9E\u73B0\u6A21\u5757\u5316\u67B6\u6784\u3002</li>\n<li><strong>SSR \u5C31\u7EEA (SSR Ready)</strong>: \u8DEF\u7531\u5728\u670D\u52A1\u5668\u548C\u5BA2\u6237\u7AEF\u4E0A\u90FD\u80FD\u65E0\u7F1D\u5DE5\u4F5C\u3002</li>\n</ul>\n<pre><code class="language-typescript">const pageRouter = new PageRouter();\n// \u4E2D\u95F4\u4EF6/\u5B88\u536B\u793A\u4F8B\npageRouter.setFilter(async (props) =&gt; {\n  if (!checkAuth(props)) return &lt;Redirect to=&#39;/login&#39; /&gt;;\n  return null; // Pass\n});\npageRouter.use(&#39;/dashboard/*&#39;, DashboardRouter);\n</code></pre>\n<h3 id="\u670D\u52A1\u7AEF\u6E32\u67D3-ssr-\u4F18\u5148-server-side-rendering-first"><a class="header-anchor" href="#\u670D\u52A1\u7AEF\u6E32\u67D3-ssr-\u4F18\u5148-server-side-rendering-first">#</a>\u26A1 \u670D\u52A1\u7AEF\u6E32\u67D3 (SSR) \u4F18\u5148 (Server-Side Rendering First)</h3><p>\u89C6\u89C9\u6027\u80FD\u81F3\u5173\u91CD\u8981\u3002<code>lupine.web</code> \u4ECE\u7B2C\u4E00\u5929\u8D77\u5C31\u662F\u4E3A SSR \u6784\u5EFA\u7684\u3002</p>\n<ul>\n<li><strong>\u65E0\u95EA\u70C1 (No Flashing)</strong>: \u5185\u5BB9\u5728\u670D\u52A1\u5668\u4E0A\u6E32\u67D3\uFF0C\u786E\u4FDD\u7528\u6237\u7ACB\u5373\u770B\u5230\u9875\u9762\u3002</li>\n<li><strong>SEO \u53CB\u597D</strong>: \u5B8C\u5168\u53EF\u5B9A\u5236\u7684\u5143\u6570\u636E (Metadata) \u548C Open Graph (OG) \u6807\u7B7E\uFF0C\u7528\u4E8E\u793E\u4EA4\u5206\u4EAB\u3002</li>\n<li><strong>\u6C34\u5408 (Hydration)</strong>: \u5BA2\u6237\u7AEF\u5E73\u6ED1\u63A5\u7BA1\uFF0C\u65E0\u9700\u91CD\u65B0\u6E32\u67D3\u6574\u4E2A\u6811\u3002</li>\n</ul>\n<h3 id="\u56FD\u9645\u5316-i18n"><a class="header-anchor" href="#\u56FD\u9645\u5316-i18n">#</a>\u{1F30D} \u56FD\u9645\u5316 (i18n)</h3><p>\u8F7B\u677E\u8FC8\u5411\u5168\u7403\u3002\u5185\u7F6E\u5BF9\u591A\u8BED\u8A00\u5E94\u7528\u7A0B\u5E8F\u7684\u652F\u6301\uFF0C\u5141\u8BB8\u901A\u8FC7\u4E0A\u4E0B\u6587\u52A8\u6001\u5207\u6362\u8BED\u8A00\uFF0C\u65E0\u9700\u590D\u6742\u914D\u7F6E\u3002</p>\n<h3 id="\u73AF\u5883\u914D\u7F6E-environment-configuration"><a class="header-anchor" href="#\u73AF\u5883\u914D\u7F6E-environment-configuration">#</a>\u{1F6E0}\uFE0F \u73AF\u5883\u914D\u7F6E (Environment Configuration)</h3><p>\u9AD8\u6548\u7BA1\u7406\u60A8\u7684\u5E94\u7528\u7A0B\u5E8F\u73AF\u5883\u3002<code>lupine.web</code> \u652F\u6301\u52A0\u8F7D\u73AF\u5883\u53D8\u91CF\uFF08\u901A\u8FC7 <code>lupine.api</code> \u4ECE <code>.env</code> \u6587\u4EF6\u52A0\u8F7D\uFF09\u5E76\u5C06\u7ECF\u8FC7\u4E25\u683C\u8FC7\u6EE4\u7684\u914D\u7F6E\u6CE8\u5165\u5230\u524D\u7AEF\u3002</p>\n';

  // apps/doc/web/src/markdown-built/markdown-config.ts
  var markdownConfig = {
    "/": { html: markdown_built_default, data: { "lang": [{ "title": "English", "id": "en" }, { "title": "\u7B80\u4F53\u4E2D\u6587", "id": "zh" }] }, headings: [] },
    "/en/essentials/api": { html: api_default, data: { "title": "API Reference" }, headings: [{ "level": 2, "text": "Lupine.web (Frontend)", "id": "lupine-web-frontend" }, { "level": 3, "text": "bindRouter", "id": "bindrouter" }, { "level": 3, "text": "bindTheme", "id": "bindtheme" }, { "level": 3, "text": "bindLang", "id": "bindlang" }, { "level": 2, "text": "Lupine.api (Backend)", "id": "lupine-api-backend" }, { "level": 3, "text": "ApiModule", "id": "apimodule" }] },
    "/en/guide/install": { html: install_default, data: { "title": "Installation" }, headings: [{ "level": 2, "text": "Development Environment", "id": "development-environment" }, { "level": 2, "text": "Production Build", "id": "production-build" }] },
    "/en/guide/started": { html: started_default, data: { "title": "Getting Started" }, headings: [{ "level": 2, "text": "Prerequisites", "id": "prerequisites" }, { "level": 2, "text": "Quick Start", "id": "quick-start" }] },
    "/en/index": { html: en_default, data: { "layout": "home", "title": "LupineJS Doc", "sidemenu-width": "260px", "github-title": "View on GitHub", "github-link": "https://github.com/uuware/lupine.js", "lang": { "title": "English", "id": "en" }, "hero": { "name": "LupineJS", "text": "Approachable, Fast, Full-stack", "tagline": "A full-featured web application framework includes both Front-End and Back-End services.", "actions": [{ "theme": "brand", "text": "Get Started", "link": "/en/guide/started" }, { "theme": "alt", "text": "View on GitHub", "link": "https://github.com/uuware/lupine.js" }] }, "nav": [{ "text": "Guide", "link": "/en/guide/started" }, { "text": "API", "link": "/en/essentials/api" }], "sidebar": [{ "type": "group", "text": "Guide", "level": 0 }, { "type": "link", "text": "Getting Started", "link": "/en/guide/started", "level": 1 }, { "type": "link", "text": "Installation", "link": "/en/guide/install", "level": 1 }, { "type": "group", "text": "Core Essentials", "level": 0 }, { "type": "link", "text": "API Reference", "link": "/en/essentials/api", "level": 1 }, { "type": "group", "text": "Lupine.web", "level": 0 }, { "type": "link", "text": "Overview", "link": "/en/lupine.web/overview", "level": 1 }, { "type": "group", "text": "Lupine.components", "level": 0 }, { "type": "group", "text": "Windows & Dialogs", "level": 1 }, { "type": "link", "text": "FloatWindow", "link": "/en/lupine.components/float-window", "level": 2 }, { "type": "link", "text": "Modal", "link": "/en/lupine.components/modal", "level": 2 }, { "type": "link", "text": "MessageBox", "link": "/en/lupine.components/message-box", "level": 2 }, { "type": "link", "text": "Action Sheet", "link": "/en/lupine.components/action-sheet", "level": 2 }, { "type": "group", "text": "Navigation & Menus", "level": 1 }, { "type": "link", "text": "MenuSidebar", "link": "/en/lupine.components/menu-sidebar", "level": 2 }, { "type": "link", "text": "Menubar", "link": "/en/lupine.components/menu-bar", "level": 2 }, { "type": "link", "text": "PopupMenu", "link": "/en/lupine.components/popup-menu", "level": 2 }, { "type": "link", "text": "Tabs", "link": "/en/lupine.components/tabs", "level": 2 }, { "type": "link", "text": "SlideTab", "link": "/en/lupine.components/slide-tab", "level": 2 }, { "type": "link", "text": "PagingLink", "link": "/en/lupine.components/paging-link", "level": 2 }, { "type": "group", "text": "Form & Inputs", "level": 1 }, { "type": "link", "text": "Button", "link": "/en/lupine.components/button", "level": 2 }, { "type": "link", "text": "ToggleSwitch", "link": "/en/lupine.components/toggle-switch", "level": 2 }, { "type": "link", "text": "InputWithTitle", "link": "/en/lupine.components/input-with-title", "level": 2 }, { "type": "link", "text": "SelectWithTitle", "link": "/en/lupine.components/select-with-title", "level": 2 }, { "type": "link", "text": "RadioLabel", "link": "/en/lupine.components/radio-label", "level": 2 }, { "type": "link", "text": "EditableLabel", "link": "/en/lupine.components/editable-label", "level": 2 }, { "type": "link", "text": "Stars", "link": "/en/lupine.components/stars", "level": 2 }, { "type": "link", "text": "SelectAngle", "link": "/en/lupine.components/select-angle", "level": 2 }, { "type": "group", "text": "Content & Layout", "level": 1 }, { "type": "link", "text": "Grid", "link": "/en/lupine.components/grid", "level": 2 }, { "type": "link", "text": "HtmlVar", "link": "/en/lupine.components/html-var", "level": 2 }, { "type": "link", "text": "HtmlLoad", "link": "/en/lupine.components/html-load", "level": 2 }, { "type": "link", "text": "NoticeMessage", "link": "/en/lupine.components/notice-message", "level": 2 }, { "type": "link", "text": "Progress", "link": "/en/lupine.components/progress", "level": 2 }, { "type": "link", "text": "Spinner", "link": "/en/lupine.components/spinner", "level": 2 }, { "type": "link", "text": "SvgIcon", "link": "/en/lupine.components/svg-icon", "level": 2 }, { "type": "group", "text": "Text Effects", "level": 1 }, { "type": "link", "text": "TextGlow", "link": "/en/lupine.components/text-glow", "level": 2 }, { "type": "link", "text": "TextScale", "link": "/en/lupine.components/text-scale", "level": 2 }, { "type": "link", "text": "TextWave", "link": "/en/lupine.components/text-wave", "level": 2 }, { "type": "group", "text": "Other Components", "level": 1 }, { "type": "link", "text": "DragFresh", "link": "/en/lupine.components/drag-fresh", "level": 2 }, { "type": "link", "text": "Redirect", "link": "/en/lupine.components/redirect", "level": 2 }, { "type": "link", "text": "ResizableSplitter", "link": "/en/lupine.components/resizable-splitter", "level": 2 }, { "type": "link", "text": "SwitchOption", "link": "/en/lupine.components/switch-option", "level": 2 }, { "type": "link", "text": "ToggleBase", "link": "/en/lupine.components/toggle-base", "level": 2 }, { "type": "group", "text": "Lupine.components-libs", "level": 0 }, { "type": "group", "text": "Utilities", "level": 1 }, { "type": "link", "text": "DateUtils", "link": "/en/lupine.components-libs/date-utils", "level": 2 }, { "type": "link", "text": "SimpleStorage", "link": "/en/lupine.components-libs/simple-storage", "level": 2 }, { "type": "link", "text": "DynamicalLoad", "link": "/en/lupine.components-libs/dynamical-load", "level": 2 }, { "type": "link", "text": "formatBytes", "link": "/en/lupine.components-libs/format-bytes", "level": 2 }, { "type": "group", "text": "DOM & UI Helpers", "level": 1 }, { "type": "link", "text": "DomUtils", "link": "/en/lupine.components-libs/dom-utils", "level": 2 }, { "type": "link", "text": "LiteDom", "link": "/en/lupine.components-libs/lite-dom", "level": 2 }, { "type": "link", "text": "DragUtil", "link": "/en/lupine.components-libs/drag-util", "level": 2 }, { "type": "group", "text": "Network & Files", "level": 1 }, { "type": "link", "text": "uploadFile", "link": "/en/lupine.components-libs/upload-file", "level": 2 }, { "type": "link", "text": "downloadStream", "link": "/en/lupine.components-libs/download-stream", "level": 2 }, { "type": "group", "text": "Event & State", "level": 1 }, { "type": "link", "text": "MessageHub", "link": "/en/lupine.components-libs/message-hub", "level": 2 }, { "type": "link", "text": "Observable", "link": "/en/lupine.components-libs/observable", "level": 2 }, { "type": "group", "text": "Lupine.api", "level": 0 }, { "type": "group", "text": "Core Concepts", "level": 1 }, { "type": "link", "text": "Server", "link": "/en/lupine.api/app", "level": 2 }, { "type": "link", "text": "API Module", "link": "/en/lupine.api/api", "level": 2 }, { "type": "group", "text": "Tools", "level": 1 }, { "type": "link", "text": "Dashboard", "link": "/en/lupine.api/dashboard", "level": 2 }, { "type": "group", "text": "Lupine.press", "level": 0 }, { "type": "link", "text": "Press Doc Overview", "link": "/en/lupine.press/overview", "level": 1 }], "features": [{ "title": "Front-End (lupine.web)", "details": "Extremely lightweight framework (approx 10kb) using React TSX syntax. No heavy runtime." }, { "title": "Back-End (lupine.api)", "details": "Efficient and simplified framework similar to Express. Optimized for SSR." }, { "title": "Zero-dependency", "details": "Minimal dependency tree ensuring fast build times and reliable deployments." }] }, headings: [] },
    "/en/lupine.api/api": { html: api_default2, data: { "title": "API Module" }, headings: [{ "level": 2, "text": "Key Features", "id": "key-features" }, { "level": 2, "text": "Usage Example", "id": "usage-example" }] },
    "/en/lupine.api/app": { html: app_default, data: { "title": "Server" }, headings: [{ "level": 2, "text": "Key Features", "id": "key-features" }, { "level": 2, "text": "Usage Example", "id": "usage-example" }] },
    "/en/lupine.api/dashboard": { html: dashboard_default, data: { "title": "Dashboard" }, headings: [{ "level": 2, "text": "Features", "id": "features" }, { "level": 3, "text": "1. Database Management (DB)", "id": "1-database-management-db" }, { "level": 3, "text": "2. Operations & Server Management (Access & Server Info)", "id": "2-operations-server-management-access-server-info" }, { "level": 3, "text": "3. Development & Testing (Test)", "id": "3-development-testing-test" }, { "level": 2, "text": "Extension Development", "id": "extension-development" }, { "level": 3, "text": "Menu Configuration", "id": "menu-configuration" }, { "level": 3, "text": "Page Development", "id": "page-development" }] },
    "/en/lupine.components-libs/date-utils": { html: date_utils_default, data: { "title": "DateUtils" }, headings: [] },
    "/en/lupine.components-libs/dom-utils": { html: dom_utils_default, data: { "title": "DomUtils" }, headings: [] },
    "/en/lupine.components-libs/download-stream": { html: download_stream_default, data: { "title": "downloadStream" }, headings: [] },
    "/en/lupine.components-libs/drag-util": { html: drag_util_default, data: { "title": "DragUtil" }, headings: [] },
    "/en/lupine.components-libs/dynamical-load": { html: dynamical_load_default, data: { "title": "DynamicalLoad" }, headings: [] },
    "/en/lupine.components-libs/format-bytes": { html: format_bytes_default, data: { "title": "formatBytes" }, headings: [] },
    "/en/lupine.components-libs/lite-dom": { html: lite_dom_default, data: { "title": "LiteDom" }, headings: [] },
    "/en/lupine.components-libs/message-hub": { html: message_hub_default, data: { "title": "MessageHub" }, headings: [] },
    "/en/lupine.components-libs/observable": { html: observable_default, data: { "title": "Observable" }, headings: [] },
    "/en/lupine.components-libs/simple-storage": { html: simple_storage_default, data: { "title": "SimpleStorage" }, headings: [] },
    "/en/lupine.components-libs/upload-file": { html: upload_file_default, data: { "title": "uploadFile" }, headings: [] },
    "/en/lupine.components/action-sheet": { html: action_sheet_default, data: { "title": "Action Sheet" }, headings: [{ "level": 2, "text": "Implementation Example", "id": "implementation-example" }] },
    "/en/lupine.components/button": { html: button_default, data: { "title": "Button" }, headings: [{ "level": 2, "text": "Implementation Example", "id": "implementation-example" }] },
    "/en/lupine.components/drag-fresh": { html: drag_fresh_default, data: { "title": "DragFresh" }, headings: [{ "level": 2, "text": "Implementation Example", "id": "implementation-example" }] },
    "/en/lupine.components/editable-label": { html: editable_label_default, data: { "title": "EditableLabel" }, headings: [{ "level": 2, "text": "Implementation Example", "id": "implementation-example" }] },
    "/en/lupine.components/float-window": { html: float_window_default, data: { "title": "FloatWindow" }, headings: [{ "level": 2, "text": "Implementation Example", "id": "implementation-example" }] },
    "/en/lupine.components/grid": { html: grid_default, data: { "title": "Grid" }, headings: [{ "level": 2, "text": "Implementation Example", "id": "implementation-example" }] },
    "/en/lupine.components/html-load": { html: html_load_default, data: { "title": "HtmlLoad" }, headings: [{ "level": 2, "text": "Implementation Example", "id": "implementation-example" }] },
    "/en/lupine.components/html-var": { html: html_var_default, data: { "title": "HtmlVar" }, headings: [{ "level": 2, "text": "Implementation Example", "id": "implementation-example" }] },
    "/en/lupine.components/input-with-title": { html: input_with_title_default, data: { "title": "InputWithTitle" }, headings: [{ "level": 2, "text": "Implementation Example", "id": "implementation-example" }] },
    "/en/lupine.components/menu-bar": { html: menu_bar_default, data: { "title": "Menubar" }, headings: [{ "level": 2, "text": "Implementation Example", "id": "implementation-example" }] },
    "/en/lupine.components/menu-sidebar": { html: menu_sidebar_default, data: { "title": "MenuSidebar" }, headings: [{ "level": 2, "text": "Implementation Example", "id": "implementation-example" }] },
    "/en/lupine.components/message-box": { html: message_box_default, data: { "title": "MessageBox" }, headings: [{ "level": 2, "text": "Implementation Example", "id": "implementation-example" }] },
    "/en/lupine.components/modal": { html: modal_default, data: { "title": "Modal" }, headings: [{ "level": 2, "text": "Implementation Example", "id": "implementation-example" }] },
    "/en/lupine.components/notice-message": { html: notice_message_default, data: { "title": "NoticeMessage" }, headings: [{ "level": 2, "text": "Implementation Example", "id": "implementation-example" }] },
    "/en/lupine.components/paging-link": { html: paging_link_default, data: { "title": "PagingLink" }, headings: [{ "level": 2, "text": "Implementation Example", "id": "implementation-example" }] },
    "/en/lupine.components/popup-menu": { html: popup_menu_default, data: { "title": "PopupMenu" }, headings: [{ "level": 2, "text": "Implementation Example", "id": "implementation-example" }] },
    "/en/lupine.components/progress": { html: progress_default, data: { "title": "Progress" }, headings: [{ "level": 2, "text": "Implementation Example", "id": "implementation-example" }] },
    "/en/lupine.components/radio-label": { html: radio_label_default, data: { "title": "RadioLabel" }, headings: [{ "level": 2, "text": "Implementation Example", "id": "implementation-example" }] },
    "/en/lupine.components/redirect": { html: redirect_default, data: { "title": "Redirect" }, headings: [{ "level": 2, "text": "Implementation Example", "id": "implementation-example" }] },
    "/en/lupine.components/resizable-splitter": { html: resizable_splitter_default, data: { "title": "ResizableSplitter" }, headings: [{ "level": 2, "text": "Implementation Example", "id": "implementation-example" }] },
    "/en/lupine.components/select-angle": { html: select_angle_default, data: { "title": "SelectAngle" }, headings: [{ "level": 2, "text": "Implementation Example", "id": "implementation-example" }] },
    "/en/lupine.components/select-with-title": { html: select_with_title_default, data: { "title": "SelectWithTitle" }, headings: [{ "level": 2, "text": "Implementation Example", "id": "implementation-example" }] },
    "/en/lupine.components/slide-tab": { html: slide_tab_default, data: { "title": "SlideTab" }, headings: [{ "level": 2, "text": "Implementation Example", "id": "implementation-example" }] },
    "/en/lupine.components/spinner": { html: spinner_default, data: { "title": "Spinner" }, headings: [{ "level": 2, "text": "Implementation Example", "id": "implementation-example" }] },
    "/en/lupine.components/stars": { html: stars_default, data: { "title": "Stars" }, headings: [{ "level": 2, "text": "Implementation Example", "id": "implementation-example" }] },
    "/en/lupine.components/svg-icon": { html: svg_icon_default, data: { "title": "SvgIcon" }, headings: [{ "level": 2, "text": "Implementation Example", "id": "implementation-example" }] },
    "/en/lupine.components/switch-option": { html: switch_option_default, data: { "title": "SwitchOption" }, headings: [{ "level": 2, "text": "Implementation Example", "id": "implementation-example" }] },
    "/en/lupine.components/tabs": { html: tabs_default, data: { "title": "Tabs" }, headings: [{ "level": 2, "text": "Implementation Example", "id": "implementation-example" }] },
    "/en/lupine.components/text-glow": { html: text_glow_default, data: { "title": "TextGlow" }, headings: [{ "level": 2, "text": "Implementation Example", "id": "implementation-example" }] },
    "/en/lupine.components/text-scale": { html: text_scale_default, data: { "title": "TextScale" }, headings: [{ "level": 2, "text": "Implementation Example", "id": "implementation-example" }] },
    "/en/lupine.components/text-wave": { html: text_wave_default, data: { "title": "TextWave" }, headings: [{ "level": 2, "text": "Implementation Example", "id": "implementation-example" }] },
    "/en/lupine.components/toggle-base": { html: toggle_base_default, data: { "title": "ToggleBase" }, headings: [{ "level": 2, "text": "Description", "id": "description" }] },
    "/en/lupine.components/toggle-switch": { html: toggle_switch_default, data: { "title": "ToggleSwitch" }, headings: [{ "level": 2, "text": "Implementation Example", "id": "implementation-example" }] },
    "/en/lupine.press/overview": { html: overview_default, data: { "title": "Press Doc Overview" }, headings: [{ "level": 2, "text": "Features", "id": "features" }, { "level": 2, "text": "Usage Guide", "id": "usage-guide" }, { "level": 3, "text": "1. Prerequisites", "id": "1-prerequisites" }, { "level": 3, "text": "2. Basic Setup", "id": "2-basic-setup" }, { "level": 3, "text": "3. Data Structure (markdownConfig)", "id": "3-data-structure-markdownconfig" }, { "level": 2, "text": "Markdown File Structure & Association", "id": "markdown-file-structure-association" }, { "level": 3, "text": "Top-level Configuration", "id": "top-level-configuration" }, { "level": 3, "text": "Multilingual Configuration", "id": "multilingual-configuration" }, { "level": 3, "text": "Sidebar Configuration", "id": "sidebar-configuration" }, { "level": 2, "text": "Architecture", "id": "architecture" }] },
    "/en/lupine.web/overview": { html: overview_default2, data: { "title": "Overview" }, headings: [{ "level": 2, "text": "Why lupine.web", "id": "why-lupine-web" }, { "level": 3, "text": "\u{1F680} Zero-Dependency & Lightweight", "id": "zero-dependency-lightweight" }, { "level": 3, "text": "\u{1F3A8} Built-in CSS-in-JS", "id": "built-in-css-in-js" }, { "level": 3, "text": "\u{1F6E3}\uFE0F Powerful Router", "id": "powerful-router" }, { "level": 3, "text": "\u26A1 Server-Side Rendering (SSR) First", "id": "server-side-rendering-ssr-first" }, { "level": 3, "text": "\u{1F30D} Internationalization (i18n)", "id": "internationalization-i18n" }, { "level": 3, "text": "\u{1F6E0}\uFE0F Environment Configuration", "id": "environment-configuration" }] },
    "/zh/essentials/api": { html: api_default3, data: { "title": "API \u53C2\u8003" }, headings: [{ "level": 2, "text": "Lupine.web (\u524D\u7AEF)", "id": "lupine-web-\u524D\u7AEF" }, { "level": 3, "text": "bindRouter", "id": "bindrouter" }, { "level": 3, "text": "bindTheme", "id": "bindtheme" }, { "level": 3, "text": "bindLang", "id": "bindlang" }, { "level": 2, "text": "Lupine.api (\u540E\u7AEF)", "id": "lupine-api-\u540E\u7AEF" }, { "level": 3, "text": "ApiModule", "id": "apimodule" }] },
    "/zh/guide/install": { html: install_default2, data: { "title": "\u5B89\u88C5\u8BF4\u660E" }, headings: [{ "level": 2, "text": "\u5F00\u53D1\u73AF\u5883", "id": "\u5F00\u53D1\u73AF\u5883" }, { "level": 2, "text": "\u751F\u4EA7\u73AF\u5883\u6784\u5EFA", "id": "\u751F\u4EA7\u73AF\u5883\u6784\u5EFA" }] },
    "/zh/guide/started": { html: started_default2, data: { "title": "\u5FEB\u901F\u5F00\u59CB" }, headings: [{ "level": 2, "text": "\u524D\u63D0\u6761\u4EF6", "id": "\u524D\u63D0\u6761\u4EF6" }, { "level": 2, "text": "\u5FEB\u901F\u4E0A\u624B", "id": "\u5FEB\u901F\u4E0A\u624B" }] },
    "/zh/index": { html: zh_default, data: { "layout": "home", "title": "LupineJS \u6587\u6863", "sidemenu-width": "260px", "github-title": "GitHub \u4ED3\u5E93", "github-link": "https://github.com/uuware/lupine.js", "lang": { "title": "\u7B80\u4F53\u4E2D\u6587", "id": "zh" }, "hero": { "name": "LupineJS", "text": "\u6613\u7528\u3001\u5FEB\u901F\u3001\u5168\u6808", "tagline": "\u5305\u542B\u524D\u540E\u7AEF\u670D\u52A1\u7684\u5168\u529F\u80FD Web \u5E94\u7528\u7A0B\u5E8F\u6846\u67B6\u3002", "actions": [{ "theme": "brand", "text": "\u5FEB\u901F\u5F00\u59CB", "link": "/zh/guide/started" }, { "theme": "alt", "text": "GitHub \u4ED3\u5E93", "link": "https://github.com/uuware/lupine.js" }] }, "nav": [{ "text": "\u6307\u5357", "link": "/zh/guide/started" }, { "text": "API", "link": "/zh/essentials/api" }], "sidebar": [{ "type": "group", "text": "\u6307\u5357", "level": 0 }, { "type": "link", "text": "\u5FEB\u901F\u5F00\u59CB", "link": "/zh/guide/started", "level": 1 }, { "type": "link", "text": "\u5B89\u88C5\u8BF4\u660E", "link": "/zh/guide/install", "level": 1 }, { "type": "group", "text": "\u6838\u5FC3\u8981\u70B9", "level": 0 }, { "type": "link", "text": "API \u53C2\u8003", "link": "/zh/essentials/api", "level": 1 }, { "type": "group", "text": "Lupine.web", "level": 0 }, { "type": "link", "text": "\u6982\u89C8", "link": "/zh/lupine.web/overview", "level": 1 }, { "type": "group", "text": "Lupine.components (\u7EC4\u4EF6)", "level": 0 }, { "type": "group", "text": "\u7A97\u53E3\u4E0E\u5BF9\u8BDD\u6846", "level": 1 }, { "type": "link", "text": "FloatWindow (\u6D6E\u7A97)", "link": "/zh/lupine.components/float-window", "level": 2 }, { "type": "link", "text": "Modal (\u6A21\u6001\u6846)", "link": "/zh/lupine.components/modal", "level": 2 }, { "type": "link", "text": "MessageBox (\u6D88\u606F\u6846)", "link": "/zh/lupine.components/message-box", "level": 2 }, { "type": "link", "text": "Action Sheet (\u52A8\u4F5C\u5217\u8868)", "link": "/zh/lupine.components/action-sheet", "level": 2 }, { "type": "group", "text": "\u5BFC\u822A\u4E0E\u83DC\u5355", "level": 1 }, { "type": "link", "text": "MenuSidebar (\u4FA7\u8FB9\u5BFC\u822A\u680F)", "link": "/zh/lupine.components/menu-sidebar", "level": 2 }, { "type": "link", "text": "Menubar (\u6A2A\u5411\u83DC\u5355\u680F)", "link": "/zh/lupine.components/menu-bar", "level": 2 }, { "type": "link", "text": "PopupMenu (\u5F39\u51FA\u83DC\u5355)", "link": "/zh/lupine.components/popup-menu", "level": 2 }, { "type": "link", "text": "Tabs (\u9009\u9879\u5361)", "link": "/zh/lupine.components/tabs", "level": 2 }, { "type": "link", "text": "SlideTab (\u6ED1\u52A8\u9009\u9879\u5361)", "link": "/zh/lupine.components/slide-tab", "level": 2 }, { "type": "link", "text": "PagingLink (\u5206\u9875\u94FE\u63A5)", "link": "/zh/lupine.components/paging-link", "level": 2 }, { "type": "group", "text": "\u8868\u5355\u4E0E\u8F93\u5165", "level": 1 }, { "type": "link", "text": "Button (\u6309\u94AE)", "link": "/zh/lupine.components/button", "level": 2 }, { "type": "link", "text": "ToggleSwitch (\u5207\u6362\u5F00\u5173)", "link": "/zh/lupine.components/toggle-switch", "level": 2 }, { "type": "link", "text": "InputWithTitle (\u5E26\u6807\u9898\u7684\u8F93\u5165\u6846)", "link": "/zh/lupine.components/input-with-title", "level": 2 }, { "type": "link", "text": "SelectWithTitle (\u5E26\u6807\u9898\u7684\u4E0B\u62C9\u5217\u8868)", "link": "/zh/lupine.components/select-with-title", "level": 2 }, { "type": "link", "text": "RadioLabel (\u5355\u9009\u7EC4)", "link": "/zh/lupine.components/radio-label", "level": 2 }, { "type": "link", "text": "EditableLabel (\u53EF\u7F16\u8F91\u6807\u7B7E)", "link": "/zh/lupine.components/editable-label", "level": 2 }, { "type": "link", "text": "Stars (\u661F\u7EA7\u8BC4\u5206)", "link": "/zh/lupine.components/stars", "level": 2 }, { "type": "link", "text": "SelectAngle (\u89D2\u5EA6\u9009\u62E9)", "link": "/zh/lupine.components/select-angle", "level": 2 }, { "type": "group", "text": "\u5185\u5BB9\u4E0E\u5E03\u5C40", "level": 1 }, { "type": "link", "text": "Grid (\u7F51\u683C)", "link": "/zh/lupine.components/grid", "level": 2 }, { "type": "link", "text": "HtmlVar (HTML \u53D8\u91CF)", "link": "/zh/lupine.components/html-var", "level": 2 }, { "type": "link", "text": "HtmlLoad (HTML \u52A0\u8F7D)", "link": "/zh/lupine.components/html-load", "level": 2 }, { "type": "link", "text": "NoticeMessage (\u901A\u77E5\u6D88\u606F)", "link": "/zh/lupine.components/notice-message", "level": 2 }, { "type": "link", "text": "Progress (\u8FDB\u5EA6\u6761)", "link": "/zh/lupine.components/progress", "level": 2 }, { "type": "link", "text": "Spinner (\u52A0\u8F7D\u52A8\u753B)", "link": "/zh/lupine.components/spinner", "level": 2 }, { "type": "link", "text": "SvgIcon (SVG \u56FE\u6807)", "link": "/zh/lupine.components/svg-icon", "level": 2 }, { "type": "group", "text": "\u6587\u672C\u7279\u6548", "level": 1 }, { "type": "link", "text": "TextGlow (\u53D1\u5149\u6587\u5B57)", "link": "/zh/lupine.components/text-glow", "level": 2 }, { "type": "link", "text": "TextScale (\u7F29\u653E\u6587\u5B57)", "link": "/zh/lupine.components/text-scale", "level": 2 }, { "type": "link", "text": "TextWave (\u6CE2\u52A8\u6587\u5B57)", "link": "/zh/lupine.components/text-wave", "level": 2 }, { "type": "group", "text": "\u5176\u4ED6\u7EC4\u4EF6", "level": 1 }, { "type": "link", "text": "DragFresh (\u62D6\u52A8\u5237\u65B0)", "link": "/zh/lupine.components/drag-fresh", "level": 2 }, { "type": "link", "text": "Redirect (\u91CD\u5B9A\u5411)", "link": "/zh/lupine.components/redirect", "level": 2 }, { "type": "link", "text": "ResizableSplitter (\u53EF\u8C03\u5206\u5272\u5668)", "link": "/zh/lupine.components/resizable-splitter", "level": 2 }, { "type": "link", "text": "SwitchOption (\u5207\u6362\u9009\u9879)", "link": "/zh/lupine.components/switch-option", "level": 2 }, { "type": "link", "text": "ToggleBase (\u5207\u6362\u57FA\u7C7B)", "link": "/zh/lupine.components/toggle-base", "level": 2 }, { "type": "group", "text": "Lupine.components-libs", "level": 0 }, { "type": "group", "text": "Utilities", "level": 1 }, { "type": "link", "text": "DateUtils", "link": "/zh/lupine.components-libs/date-utils", "level": 2 }, { "type": "link", "text": "SimpleStorage", "link": "/zh/lupine.components-libs/simple-storage", "level": 2 }, { "type": "link", "text": "DynamicalLoad", "link": "/zh/lupine.components-libs/dynamical-load", "level": 2 }, { "type": "link", "text": "formatBytes", "link": "/zh/lupine.components-libs/format-bytes", "level": 2 }, { "type": "group", "text": "DOM & UI Helpers", "level": 1 }, { "type": "link", "text": "DomUtils", "link": "/zh/lupine.components-libs/dom-utils", "level": 2 }, { "type": "link", "text": "LiteDom", "link": "/zh/lupine.components-libs/lite-dom", "level": 2 }, { "type": "link", "text": "DragUtil", "link": "/zh/lupine.components-libs/drag-util", "level": 2 }, { "type": "group", "text": "Network & Files", "level": 1 }, { "type": "link", "text": "uploadFile", "link": "/zh/lupine.components-libs/upload-file", "level": 2 }, { "type": "link", "text": "downloadStream", "link": "/zh/lupine.components-libs/download-stream", "level": 2 }, { "type": "group", "text": "Event & State", "level": 1 }, { "type": "link", "text": "MessageHub", "link": "/zh/lupine.components-libs/message-hub", "level": 2 }, { "type": "link", "text": "Observable", "link": "/zh/lupine.components-libs/observable", "level": 2 }, { "type": "group", "text": "Lupine.api", "level": 0 }, { "type": "group", "text": "Core Concepts", "level": 1 }, { "type": "link", "text": "Server (\u670D\u52A1\u5668)", "link": "/zh/lupine.api/app", "level": 2 }, { "type": "link", "text": "API Module (API \u6A21\u5757)", "link": "/zh/lupine.api/api", "level": 2 }, { "type": "group", "text": "Tools", "level": 1 }, { "type": "link", "text": "Dashboard (\u7BA1\u7406\u9762\u677F)", "link": "/zh/lupine.api/dashboard", "level": 2 }, { "type": "group", "text": "Lupine.press", "level": 0 }, { "type": "link", "text": "Press \u6587\u6863\u7CFB\u7EDF\u6982\u89C8", "link": "/zh/lupine.press/overview", "level": 1 }], "features": [{ "title": "\u524D\u7AEF (lupine.web)", "details": "\u6781\u5176\u8F7B\u91CF\u7EA7\uFF08\u7EA6 10kb\uFF09\u7684\u6846\u67B6\uFF0C\u4F7F\u7528 React TSX \u8BED\u6CD5\u3002\u65E0\u81C3\u80BF\u8FD0\u884C\u65F6\u3002" }, { "title": "\u540E\u7AEF (lupine.api)", "details": "\u9AD8\u6548\u4E14\u7B80\u5316\u7684\u6846\u67B6\uFF0C\u7C7B\u4F3C\u4E8E Express\u3002\u4E3A\u670D\u52A1\u7AEF\u6E32\u67D3\u8FDB\u884C\u4E86\u4F18\u5316\u3002" }, { "title": "\u96F6\u4F9D\u8D56", "details": "\u6781\u5C11\u7684\u4F9D\u8D56\u6811\uFF0C\u786E\u4FDD\u5FEB\u901F\u6784\u5EFA\u548C\u53EF\u9760\u90E8\u7F72\u3002" }] }, headings: [] },
    "/zh/lupine.api/api": { html: api_default4, data: { "title": "API Module (API \u6A21\u5757)" }, headings: [{ "level": 2, "text": "\u4E3B\u8981\u7279\u6027 (Key Features)", "id": "\u4E3B\u8981\u7279\u6027-key-features" }, { "level": 2, "text": "\u4F7F\u7528\u793A\u4F8B (Usage Example)", "id": "\u4F7F\u7528\u793A\u4F8B-usage-example" }] },
    "/zh/lupine.api/app": { html: app_default2, data: { "title": "Server (\u670D\u52A1\u5668)" }, headings: [{ "level": 2, "text": "\u4E3B\u8981\u7279\u6027 (Key Features)", "id": "\u4E3B\u8981\u7279\u6027-key-features" }, { "level": 2, "text": "\u4F7F\u7528\u793A\u4F8B (Usage Example)", "id": "\u4F7F\u7528\u793A\u4F8B-usage-example" }] },
    "/zh/lupine.api/dashboard": { html: dashboard_default2, data: { "title": "Dashboard (\u7BA1\u7406\u9762\u677F)" }, headings: [{ "level": 2, "text": "\u529F\u80FD\u7279\u6027 (Features)", "id": "\u529F\u80FD\u7279\u6027-features" }, { "level": 3, "text": "1. \u6570\u636E\u5E93\u7BA1\u7406 (DB)", "id": "1-\u6570\u636E\u5E93\u7BA1\u7406-db" }, { "level": 3, "text": "2. \u8FD0\u7EF4\u4E0E\u670D\u52A1\u5668\u7BA1\u7406 (Access & Server Info)", "id": "2-\u8FD0\u7EF4\u4E0E\u670D\u52A1\u5668\u7BA1\u7406-access-server-info" }, { "level": 3, "text": "3. \u5F00\u53D1\u4E0E\u6D4B\u8BD5 (Test)", "id": "3-\u5F00\u53D1\u4E0E\u6D4B\u8BD5-test" }, { "level": 2, "text": "\u6269\u5C55\u5F00\u53D1", "id": "\u6269\u5C55\u5F00\u53D1" }, { "level": 3, "text": "\u83DC\u5355\u914D\u7F6E", "id": "\u83DC\u5355\u914D\u7F6E" }, { "level": 3, "text": "\u9875\u9762\u5F00\u53D1", "id": "\u9875\u9762\u5F00\u53D1" }] },
    "/zh/lupine.components-libs/date-utils": { html: date_utils_default2, data: { "title": "DateUtils" }, headings: [] },
    "/zh/lupine.components-libs/dom-utils": { html: dom_utils_default2, data: { "title": "DomUtils" }, headings: [] },
    "/zh/lupine.components-libs/download-stream": { html: download_stream_default2, data: { "title": "downloadStream" }, headings: [] },
    "/zh/lupine.components-libs/drag-util": { html: drag_util_default2, data: { "title": "DragUtil" }, headings: [] },
    "/zh/lupine.components-libs/dynamical-load": { html: dynamical_load_default2, data: { "title": "DynamicalLoad" }, headings: [] },
    "/zh/lupine.components-libs/format-bytes": { html: format_bytes_default2, data: { "title": "formatBytes" }, headings: [] },
    "/zh/lupine.components-libs/lite-dom": { html: lite_dom_default2, data: { "title": "LiteDom" }, headings: [] },
    "/zh/lupine.components-libs/message-hub": { html: message_hub_default2, data: { "title": "MessageHub" }, headings: [] },
    "/zh/lupine.components-libs/observable": { html: observable_default2, data: { "title": "Observable" }, headings: [] },
    "/zh/lupine.components-libs/simple-storage": { html: simple_storage_default2, data: { "title": "SimpleStorage" }, headings: [] },
    "/zh/lupine.components-libs/upload-file": { html: upload_file_default2, data: { "title": "uploadFile" }, headings: [] },
    "/zh/lupine.components/action-sheet": { html: action_sheet_default2, data: { "title": "Action Sheet (\u52A8\u4F5C\u5217\u8868)" }, headings: [{ "level": 2, "text": "\u5B9E\u88C5\u4F8B\u5B50", "id": "\u5B9E\u88C5\u4F8B\u5B50" }] },
    "/zh/lupine.components/button": { html: button_default2, data: { "title": "Button (\u6309\u94AE)" }, headings: [{ "level": 2, "text": "\u5B9E\u88C5\u4F8B\u5B50", "id": "\u5B9E\u88C5\u4F8B\u5B50" }] },
    "/zh/lupine.components/drag-fresh": { html: drag_fresh_default2, data: { "title": "DragFresh (\u62D6\u52A8\u5237\u65B0)" }, headings: [{ "level": 2, "text": "\u5B9E\u88C5\u4F8B\u5B50", "id": "\u5B9E\u88C5\u4F8B\u5B50" }] },
    "/zh/lupine.components/editable-label": { html: editable_label_default2, data: { "title": "EditableLabel (\u53EF\u7F16\u8F91\u6807\u7B7E)" }, headings: [{ "level": 2, "text": "\u5B9E\u88C5\u4F8B\u5B50", "id": "\u5B9E\u88C5\u4F8B\u5B50" }] },
    "/zh/lupine.components/float-window": { html: float_window_default2, data: { "title": "FloatWindow (\u6D6E\u7A97)" }, headings: [{ "level": 2, "text": "\u5B9E\u88C5\u4F8B\u5B50", "id": "\u5B9E\u88C5\u4F8B\u5B50" }] },
    "/zh/lupine.components/grid": { html: grid_default2, data: { "title": "Grid (\u7F51\u683C)" }, headings: [{ "level": 2, "text": "\u5B9E\u88C5\u4F8B\u5B50", "id": "\u5B9E\u88C5\u4F8B\u5B50" }] },
    "/zh/lupine.components/html-load": { html: html_load_default2, data: { "title": "HtmlLoad (HTML \u52A0\u8F7D)" }, headings: [{ "level": 2, "text": "\u5B9E\u88C5\u4F8B\u5B50", "id": "\u5B9E\u88C5\u4F8B\u5B50" }] },
    "/zh/lupine.components/html-var": { html: html_var_default2, data: { "title": "HtmlVar (HTML \u53D8\u91CF)" }, headings: [{ "level": 2, "text": "\u5B9E\u88C5\u4F8B\u5B50", "id": "\u5B9E\u88C5\u4F8B\u5B50" }] },
    "/zh/lupine.components/input-with-title": { html: input_with_title_default2, data: { "title": "InputWithTitle (\u5E26\u6807\u9898\u7684\u8F93\u5165\u6846)" }, headings: [{ "level": 2, "text": "\u5B9E\u88C5\u4F8B\u5B50", "id": "\u5B9E\u88C5\u4F8B\u5B50" }] },
    "/zh/lupine.components/menu-bar": { html: menu_bar_default2, data: { "title": "Menubar (\u6A2A\u5411\u83DC\u5355\u680F)" }, headings: [{ "level": 2, "text": "\u5B9E\u88C5\u4F8B\u5B50", "id": "\u5B9E\u88C5\u4F8B\u5B50" }] },
    "/zh/lupine.components/menu-sidebar": { html: menu_sidebar_default2, data: { "title": "MenuSidebar (\u4FA7\u8FB9\u5BFC\u822A\u680F)" }, headings: [{ "level": 2, "text": "\u5B9E\u88C5\u4F8B\u5B50", "id": "\u5B9E\u88C5\u4F8B\u5B50" }] },
    "/zh/lupine.components/message-box": { html: message_box_default2, data: { "title": "MessageBox (\u6D88\u606F\u6846)" }, headings: [{ "level": 2, "text": "\u5B9E\u88C5\u4F8B\u5B50", "id": "\u5B9E\u88C5\u4F8B\u5B50" }] },
    "/zh/lupine.components/modal": { html: modal_default2, data: { "title": "Modal (\u6A21\u6001\u6846)" }, headings: [{ "level": 2, "text": "\u5B9E\u88C5\u4F8B\u5B50", "id": "\u5B9E\u88C5\u4F8B\u5B50" }] },
    "/zh/lupine.components/notice-message": { html: notice_message_default2, data: { "title": "NoticeMessage (\u901A\u77E5\u6D88\u606F)" }, headings: [{ "level": 2, "text": "\u5B9E\u88C5\u4F8B\u5B50", "id": "\u5B9E\u88C5\u4F8B\u5B50" }] },
    "/zh/lupine.components/paging-link": { html: paging_link_default2, data: { "title": "PagingLink (\u5206\u9875\u94FE\u63A5)" }, headings: [{ "level": 2, "text": "\u5B9E\u88C5\u4F8B\u5B50", "id": "\u5B9E\u88C5\u4F8B\u5B50" }] },
    "/zh/lupine.components/popup-menu": { html: popup_menu_default2, data: { "title": "PopupMenu (\u5F39\u51FA\u83DC\u5355)" }, headings: [{ "level": 2, "text": "\u5B9E\u88C5\u4F8B\u5B50", "id": "\u5B9E\u88C5\u4F8B\u5B50" }] },
    "/zh/lupine.components/progress": { html: progress_default2, data: { "title": "Progress (\u8FDB\u5EA6\u6761)" }, headings: [{ "level": 2, "text": "\u5B9E\u88C5\u4F8B\u5B50", "id": "\u5B9E\u88C5\u4F8B\u5B50" }] },
    "/zh/lupine.components/radio-label": { html: radio_label_default2, data: { "title": "RadioLabel (\u5355\u9009\u7EC4)" }, headings: [{ "level": 2, "text": "\u5B9E\u88C5\u4F8B\u5B50", "id": "\u5B9E\u88C5\u4F8B\u5B50" }] },
    "/zh/lupine.components/redirect": { html: redirect_default2, data: { "title": "Redirect (\u91CD\u5B9A\u5411)" }, headings: [{ "level": 2, "text": "\u5B9E\u88C5\u4F8B\u5B50", "id": "\u5B9E\u88C5\u4F8B\u5B50" }] },
    "/zh/lupine.components/resizable-splitter": { html: resizable_splitter_default2, data: { "title": "ResizableSplitter (\u53EF\u8C03\u5206\u5272\u5668)" }, headings: [{ "level": 2, "text": "\u5B9E\u88C5\u4F8B\u5B50", "id": "\u5B9E\u88C5\u4F8B\u5B50" }] },
    "/zh/lupine.components/select-angle": { html: select_angle_default2, data: { "title": "SelectAngle (\u89D2\u5EA6\u9009\u62E9)" }, headings: [{ "level": 2, "text": "\u5B9E\u88C5\u4F8B\u5B50", "id": "\u5B9E\u88C5\u4F8B\u5B50" }] },
    "/zh/lupine.components/select-with-title": { html: select_with_title_default2, data: { "title": "SelectWithTitle (\u5E26\u6807\u9898\u7684\u4E0B\u62C9\u5217\u8868)" }, headings: [{ "level": 2, "text": "\u5B9E\u88C5\u4F8B\u5B50", "id": "\u5B9E\u88C5\u4F8B\u5B50" }] },
    "/zh/lupine.components/slide-tab": { html: slide_tab_default2, data: { "title": "SlideTab (\u6ED1\u52A8\u9009\u9879\u5361)" }, headings: [{ "level": 2, "text": "\u5B9E\u88C5\u4F8B\u5B50", "id": "\u5B9E\u88C5\u4F8B\u5B50" }] },
    "/zh/lupine.components/spinner": { html: spinner_default2, data: { "title": "Spinner (\u52A0\u8F7D\u52A8\u753B)" }, headings: [{ "level": 2, "text": "\u5B9E\u88C5\u4F8B\u5B50", "id": "\u5B9E\u88C5\u4F8B\u5B50" }] },
    "/zh/lupine.components/stars": { html: stars_default2, data: { "title": "Stars (\u661F\u7EA7\u8BC4\u5206)" }, headings: [{ "level": 2, "text": "\u5B9E\u88C5\u4F8B\u5B50", "id": "\u5B9E\u88C5\u4F8B\u5B50" }] },
    "/zh/lupine.components/svg-icon": { html: svg_icon_default2, data: { "title": "SvgIcon (SVG \u56FE\u6807)" }, headings: [{ "level": 2, "text": "\u5B9E\u88C5\u4F8B\u5B50", "id": "\u5B9E\u88C5\u4F8B\u5B50" }] },
    "/zh/lupine.components/switch-option": { html: switch_option_default2, data: { "title": "SwitchOption (\u5207\u6362\u9009\u9879)" }, headings: [{ "level": 2, "text": "\u5B9E\u88C5\u4F8B\u5B50", "id": "\u5B9E\u88C5\u4F8B\u5B50" }] },
    "/zh/lupine.components/tabs": { html: tabs_default2, data: { "title": "Tabs (\u9009\u9879\u5361)" }, headings: [{ "level": 2, "text": "\u5B9E\u88C5\u4F8B\u5B50", "id": "\u5B9E\u88C5\u4F8B\u5B50" }] },
    "/zh/lupine.components/text-glow": { html: text_glow_default2, data: { "title": "TextGlow (\u53D1\u5149\u6587\u5B57)" }, headings: [{ "level": 2, "text": "\u5B9E\u88C5\u4F8B\u5B50", "id": "\u5B9E\u88C5\u4F8B\u5B50" }] },
    "/zh/lupine.components/text-scale": { html: text_scale_default2, data: { "title": "TextScale (\u7F29\u653E\u6587\u5B57)" }, headings: [{ "level": 2, "text": "\u5B9E\u88C5\u4F8B\u5B50", "id": "\u5B9E\u88C5\u4F8B\u5B50" }] },
    "/zh/lupine.components/text-wave": { html: text_wave_default2, data: { "title": "TextWave (\u6CE2\u52A8\u6587\u5B57)" }, headings: [{ "level": 2, "text": "\u5B9E\u88C5\u4F8B\u5B50", "id": "\u5B9E\u88C5\u4F8B\u5B50" }] },
    "/zh/lupine.components/toggle-base": { html: toggle_base_default2, data: { "title": "ToggleBase (\u5207\u6362\u57FA\u7C7B)" }, headings: [{ "level": 2, "text": "\u8BF4\u660E", "id": "\u8BF4\u660E" }] },
    "/zh/lupine.components/toggle-switch": { html: toggle_switch_default2, data: { "title": "ToggleSwitch (\u5207\u6362\u5F00\u5173)" }, headings: [{ "level": 2, "text": "\u5B9E\u88C5\u4F8B\u5B50", "id": "\u5B9E\u88C5\u4F8B\u5B50" }] },
    "/zh/lupine.press/overview": { html: overview_default3, data: { "title": "Press \u6587\u6863\u7CFB\u7EDF\u6982\u89C8" }, headings: [{ "level": 2, "text": "\u4E3B\u8981\u7279\u6027 (Features)", "id": "\u4E3B\u8981\u7279\u6027-features" }, { "level": 2, "text": "\u4F7F\u7528\u6307\u5357 (Usage Guide)", "id": "\u4F7F\u7528\u6307\u5357-usage-guide" }, { "level": 3, "text": "1. \u524D\u63D0\u6761\u4EF6 (Prerequisites)", "id": "1-\u524D\u63D0\u6761\u4EF6-prerequisites" }, { "level": 3, "text": "2. \u57FA\u672C\u8BBE\u7F6E (Basic Setup)", "id": "2-\u57FA\u672C\u8BBE\u7F6E-basic-setup" }, { "level": 3, "text": "3. \u6570\u636E\u7ED3\u6784 (markdownConfig)", "id": "3-\u6570\u636E\u7ED3\u6784-markdownconfig" }, { "level": 2, "text": "Markdown \u6587\u4EF6\u7ED3\u6784\u4E0E\u5173\u8054 (Markdown File Structure & Association)", "id": "markdown-\u6587\u4EF6\u7ED3\u6784\u4E0E\u5173\u8054-markdown-file-structure-association" }, { "level": 3, "text": "\u9876\u5C42\u914D\u7F6E (Top-level Configuration)", "id": "\u9876\u5C42\u914D\u7F6E-top-level-configuration" }, { "level": 3, "text": "\u591A\u8BED\u8A00\u914D\u7F6E (Multilingual Configuration)", "id": "\u591A\u8BED\u8A00\u914D\u7F6E-multilingual-configuration" }, { "level": 3, "text": "\u4FA7\u8FB9\u680F\u914D\u7F6E (Sidebar Configuration)", "id": "\u4FA7\u8FB9\u680F\u914D\u7F6E-sidebar-configuration" }, { "level": 2, "text": "\u67B6\u6784 (Architecture)", "id": "\u67B6\u6784-architecture" }] },
    "/zh/lupine.web/overview": { html: overview_default4, data: { "title": "\u6982\u89C8" }, headings: [{ "level": 2, "text": "\u4E3A\u4EC0\u4E48\u9009\u62E9 lupine.web", "id": "\u4E3A\u4EC0\u4E48\u9009\u62E9-lupine-web" }, { "level": 3, "text": "\u{1F680} \u96F6\u4F9D\u8D56\u4E14\u8F7B\u91CF\u7EA7 (Zero-Dependency & Lightweight)", "id": "\u96F6\u4F9D\u8D56\u4E14\u8F7B\u91CF\u7EA7-zero-dependency-lightweight" }, { "level": 3, "text": "\u{1F3A8} \u5185\u7F6E CSS-in-JS (Built-in CSS-in-JS)", "id": "\u5185\u7F6E-css-in-js-built-in-css-in-js" }, { "level": 3, "text": "\u{1F6E3}\uFE0F \u5F3A\u5927\u7684\u8DEF\u7531 (Powerful Router)", "id": "\u5F3A\u5927\u7684\u8DEF\u7531-powerful-router" }, { "level": 3, "text": "\u26A1 \u670D\u52A1\u7AEF\u6E32\u67D3 (SSR) \u4F18\u5148 (Server-Side Rendering First)", "id": "\u670D\u52A1\u7AEF\u6E32\u67D3-ssr-\u4F18\u5148-server-side-rendering-first" }, { "level": 3, "text": "\u{1F30D} \u56FD\u9645\u5316 (i18n)", "id": "\u56FD\u9645\u5316-i18n" }, { "level": 3, "text": "\u{1F6E0}\uFE0F \u73AF\u5883\u914D\u7F6E (Environment Configuration)", "id": "\u73AF\u5883\u914D\u7F6E-environment-configuration" }] }
  };

  // apps/doc/web/src/styles/base-css.ts
  var baseCss = {
    a: {
      textDecoration: "none",
      color: "inherit",
      "&:hover": { color: "var(--press-brand-color)" }
    },
    body: {
      backgroundColor: "var(--primary-bg-color)",
      color: "var(--primary-color)",
      fontSize: "var(--font-size-base)",
      lineHeight: "var(--line-height-base)",
      fontFamily: 'var(--font-family-base, SimSun, "Microsoft YaHei", Helvetica, Arial, sans-serif)',
      fontWeight: "var(--font-weight-base)"
    }
  };

  // apps/doc/web/src/index.tsx
  if (isFrontEnd() && webEnv("NODE_ENV" /* NODE_ENV */, "") === "development") {
    debugWatch(webEnv("API_PORT" /* API_PORT */, 0));
  }
  bindLang("en", {});
  bindTheme("light", pressThemes);
  bindGlobalStyle("comm-css", baseCss, false, true);
  setDefaultPageTitle("LupineJS Doc");
  setDefaultMetaDescription("LupineJS Doc");
  bindPressData(markdownConfig);
  var pageRouter2 = new PageRouter();
  pageRouter2.use("*", PressPage);
  bindRouter(pageRouter2);
})();
/*! Bundled license information:

is-extendable/index.js:
  (*!
   * is-extendable <https://github.com/jonschlinkert/is-extendable>
   *
   * Copyright (c) 2015, Jon Schlinkert.
   * Licensed under the MIT License.
   *)

strip-bom-string/index.js:
  (*!
   * strip-bom-string <https://github.com/jonschlinkert/strip-bom-string>
   *
   * Copyright (c) 2015, 2017, Jon Schlinkert.
   * Released under the MIT License.
   *)
*/
//# sourceMappingURL=/index.js.map
