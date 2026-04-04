"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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

// src/common-js/web-env.js
var require_web_env = __commonJS({
  "src/common-js/web-env.js"(exports2) {
    "use strict";
    var fs = require("fs/promises");
    var path = require("path");
    exports2.readFile = async (filePath) => {
      try {
        const text = await fs.readFile(filePath, "utf-8");
        return text;
      } catch {
        return void 0;
      }
    };
    exports2.parseEnv = async (envFile) => {
      let obj = {};
      const text = await exports2.readFile(envFile);
      if (!text) {
        return obj;
      }
      let lines = text.replace(/\r\n?/gm, "\n").split("\n");
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].split(/=(.*)/s);
        const key = line[0].trim();
        if (key && !key.startsWith("#")) {
          if (key.endsWith("+")) {
            obj[key.substring(0, key.length - 1)] += line[1] || "";
          } else if (key.endsWith("*")) {
            const LINE_MARKER = line[1].trim();
            const blockLines = [];
            for (i++; i < lines.length; i++) {
              if (lines[i].trim() === LINE_MARKER) {
                break;
              }
              blockLines.push(lines[i]);
            }
            obj[key.substring(0, key.length - 1)] = blockLines.join("\n");
          } else {
            obj[key] = line[1] || "";
          }
        } else if (key.startsWith("#!import ")) {
          const file = key.substring(9).trim();
          const newObj = await exports2.parseEnv(path.join(path.dirname(envFile), file));
          obj = Object.assign(obj, newObj);
        }
      }
      return obj;
    };
    exports2.copyToProcessEnv = (envObject, overrideEnv) => {
      for (const key of Object.keys(envObject)) {
        if (overrideEnv || typeof process.env[key] === "undefined") {
          process.env[key] = envObject[key];
        }
      }
    };
    exports2.loadEnv = async (envFile, overrideEnv = false) => {
      console.log(`Load env from: ${envFile}`);
      const envObject = await exports2.parseEnv(envFile);
      exports2.copyToProcessEnv(envObject, overrideEnv);
    };
    exports2.getWebEnv = (appName) => {
      const envWeb = {};
      for (const envName of Object.keys(process.env)) {
        if (envName.startsWith(`WEB.`)) {
          envWeb[envName.substring(4)] = process.env[envName];
        } else if (envName.startsWith(`${appName}.WEB.`)) {
          envWeb[envName.substring(appName.length + 5)] = process.env[envName];
        }
      }
      return envWeb;
    };
    var AppSharedStorageWebPrefix = "WEB.";
    exports2.getWebConfig = (allConfig) => {
      const result = {};
      for (const key of Object.keys(allConfig)) {
        if (key.startsWith(AppSharedStorageWebPrefix)) {
          result[key.substring(AppSharedStorageWebPrefix.length)] = allConfig[key];
        }
      }
      return result;
    };
  }
});

// src/common-js/web-env.test.ts
var import_node_test = require("node:test");
var import_strict = __toESM(require("node:assert/strict"));
var webEnv = require_web_env();
(0, import_node_test.describe)("web-env utilities", () => {
  let originalReadFile;
  let originalProcessEnv;
  (0, import_node_test.beforeEach)(() => {
    originalReadFile = webEnv.readFile;
    originalProcessEnv = { ...process.env };
  });
  (0, import_node_test.afterEach)(() => {
    webEnv.readFile = originalReadFile;
    process.env = originalProcessEnv;
  });
  (0, import_node_test.it)("should parse simple env lines and ignore comments", async () => {
    webEnv.readFile = async (file) => {
      return `
# This is a comment
APP_NAME=lupine
DEBUG=true
      `.trim();
    };
    const obj = await webEnv.parseEnv("fake.env");
    import_strict.default.equal(obj["APP_NAME"], "lupine");
    import_strict.default.equal(obj["DEBUG"], "true");
    import_strict.default.equal(Object.keys(obj).length, 2);
  });
  (0, import_node_test.it)("should handle += for appending text to same key", async () => {
    webEnv.readFile = async () => "LIST=Item1\nLIST+=Item2\nLIST+=Item3";
    const obj = await webEnv.parseEnv("fake.env");
    import_strict.default.equal(obj["LIST"], "Item1Item2Item3");
  });
  (0, import_node_test.it)("should handle *= for multiline values", async () => {
    webEnv.readFile = async () => `
KEY*=EOS
Line 1
Line 2
EOS
OTHER=val
`.trim();
    const obj = await webEnv.parseEnv("fake.env");
    import_strict.default.equal(obj["KEY"], "Line 1\nLine 2");
    import_strict.default.equal(obj["OTHER"], "val");
  });
  (0, import_node_test.it)("should resolve #!import lines recursively", async () => {
    webEnv.readFile = async (file) => {
      if (file.includes("base.env")) {
        return "BASE_URL=http://localhost\n# comment";
      }
      return "APP=demo\n#!import base.env";
    };
    const obj = await webEnv.parseEnv("/mock/path/main.env");
    import_strict.default.equal(obj["APP"], "demo");
    import_strict.default.equal(obj["BASE_URL"], "http://localhost");
  });
  (0, import_node_test.it)("should strictly copy values to process.env and respect overrides", async () => {
    process.env["STATIC_VAR"] = "original";
    webEnv.copyToProcessEnv({ "STATIC_VAR": "new", "NEW_VAR": "added" }, false);
    import_strict.default.equal(process.env["STATIC_VAR"], "original", "Should not override if overrideEnv is false");
    import_strict.default.equal(process.env["NEW_VAR"], "added");
    webEnv.copyToProcessEnv({ "STATIC_VAR": "forced" }, true);
    import_strict.default.equal(process.env["STATIC_VAR"], "forced", "Should override if overrideEnv is true");
  });
  (0, import_node_test.it)("should properly extract WEB.* namespace prefixes into WebEnv structure", () => {
    process.env["WEB.THEME"] = "dark";
    process.env["MyApp.WEB.API_KEY"] = "1234";
    process.env["NOT_WEB"] = "hidden";
    const webEnvData = webEnv.getWebEnv("MyApp");
    import_strict.default.equal(webEnvData["THEME"], "dark");
    import_strict.default.equal(webEnvData["API_KEY"], "1234");
    import_strict.default.equal(webEnvData["NOT_WEB"], void 0);
  });
  (0, import_node_test.it)("should extract config prefix using AppSharedStorageWebPrefix appropriately", () => {
    const fakeConfig = {
      "WEB.COLOR": "blue",
      "WEB.TITLE": "Demo",
      "SERVER.PORT": 8080
    };
    const result = webEnv.getWebConfig(fakeConfig);
    import_strict.default.equal(result["COLOR"], "blue");
    import_strict.default.equal(result["TITLE"], "Demo");
    import_strict.default.equal(result["PORT"], void 0);
  });
});
