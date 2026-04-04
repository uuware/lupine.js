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

// src/core/bind-styles.test.ts
var import_node_test = require("node:test");
var import_strict = __toESM(require("node:assert/strict"));

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

// src/lib/is-frontend.ts
var isFrontEnd = () => {
  return typeof window === "object" && typeof document === "object";
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
var getRequestContext = () => {
  let ctx;
  if (!_contextGetter || !(ctx = _contextGetter())) {
    throw new Error("Request context is not initialized");
  }
  return ctx;
};

// src/core/bind-theme.ts
var themeCookieName = "theme";
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

// src/core/camel-to-hyphens.ts
var camelToHyphens = function(name) {
  return name.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
};

// src/core/page-loaded-event.ts
var _pageLoadedEvents = [];
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

// src/core/bind-styles.test.ts
(0, import_node_test.describe)("CSS-in-JS Engine (bind-styles)", () => {
  (0, import_node_test.it)("should compile flat attributes wrapped in the top-level unique class name", () => {
    const cssObj = {
      color: "red",
      backgroundColor: "blue"
    };
    const result = processStyle("top-class", cssObj);
    import_strict.default.deepEqual(result, [".top-class{color:red;background-color:blue;}"]);
  });
  (0, import_node_test.it)("should compile flat attributes when topUniqueClassName is explicitly empty (e.g. themes)", () => {
    const cssObj = {
      '[data-theme="dark" i]': {
        color: "black"
      }
    };
    const result = processStyle("", cssObj);
    import_strict.default.deepEqual(result, ['[data-theme="dark" i]{color:black;}']);
  });
  (0, import_node_test.it)("should correctly replace ampersand & with the topUniqueClassName in pseudo-classes", () => {
    const cssObj = {
      color: "red",
      "&:hover": {
        color: "green"
      }
    };
    const result = processStyle("top-class", cssObj);
    import_strict.default.deepEqual(result, [
      ".top-class{color:red;}",
      ".top-class:hover{color:green;}"
    ]);
  });
  (0, import_node_test.it)('should correctly unfold nested multi-selectors (e.g. "&:hover, &.open" -> ">.d1, .d2")', () => {
    const cssObj = {
      "&:hover, &.open": {
        ">.d1, .d2": {
          color: "purple"
        }
      }
    };
    const result = processStyle("top-class", cssObj);
    import_strict.default.ok(result[0].startsWith(".top-class:hover >.d1,.top-class:hover .d2,.top-class.open >.d1,.top-class.open .d2{"));
    import_strict.default.ok(result[0].includes("color:purple;"));
  });
  (0, import_node_test.it)("should correctly process standalone descendant blocks (lines 148-158 mapping)", () => {
    const cssObj = {
      ".aa": {
        "&:hover": {
          color: "yellow"
        },
        ".bb": {
          fontSize: "12px"
        }
      }
    };
    const result = processStyle("", cssObj);
    import_strict.default.ok(result.includes(".aa:hover{color:yellow;}"));
    import_strict.default.ok(result.includes(".aa .bb{font-size:12px;}"));
  });
  (0, import_node_test.it)("should accurately handle @media querying by wrapping internal rules recursively", () => {
    const cssObj = {
      width: "100%",
      "@media (max-width: 600px)": {
        width: "50%",
        "&:hover": {
          width: "60%"
        }
      }
    };
    const result = processStyle("container", cssObj);
    import_strict.default.ok(result.includes(".container{width:100%;}"));
    import_strict.default.ok(result.includes("@media (max-width: 600px){.container{width:50%;}}"));
    import_strict.default.ok(result.includes("@media (max-width: 600px){.container:hover{width:60%;}}"));
  });
  (0, import_node_test.it)("should properly compile @keyframes specifically retaining the stage identifiers without parent selector prepending", () => {
    const cssObj = {
      "@keyframes fade-in": {
        "0%": { opacity: "0" },
        "100%": { opacity: "1" }
      }
    };
    const result = processStyle("box", cssObj);
    import_strict.default.deepEqual(result, [
      "@keyframes fade-in{0%{opacity:0;}100%{opacity:1;}}"
    ]);
  });
  (0, import_node_test.it)("should strictly ignore null, undefined, or empty string constraint declarations", () => {
    const cssObj = {
      color: "red",
      backgroundColor: void 0,
      width: null,
      height: ""
    };
    const result = processStyle("null-test", cssObj);
    import_strict.default.deepEqual(result, [".null-test{color:red;}"]);
  });
});
