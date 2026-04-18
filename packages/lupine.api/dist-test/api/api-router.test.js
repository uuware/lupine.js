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
    var fs3 = require("fs/promises");
    var path2 = require("path");
    exports2.readFile = async (filePath) => {
      try {
        const text = await fs3.readFile(filePath, "utf-8");
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
          const newObj = await exports2.parseEnv(path2.join(path2.dirname(envFile), file));
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

// src/api/api-router.test.ts
var import_node_test = require("node:test");
var import_strict = __toESM(require("node:assert/strict"));

// src/api/async-storage.ts
var import_node_async_hooks = require("node:async_hooks");
var asyncLocalStorage = new import_node_async_hooks.AsyncLocalStorage();

// src/models/logger-props.ts
var LogLevels = /* @__PURE__ */ ((LogLevels2) => {
  LogLevels2["fatal"] = "fatal";
  LogLevels2["error"] = "error";
  LogLevels2["warn"] = "warn";
  LogLevels2["info"] = "info";
  LogLevels2["debug"] = "debug";
  return LogLevels2;
})(LogLevels || {});
var getSizeFromString = (value, defaultValue) => {
  if (typeof value === "undefined" || value === "") return defaultValue;
  const match = value.match(/^(\d+)(kb|mb)?$/i);
  if (match) {
    const number = parseInt(match[1], 10);
    if (match[2]?.toLowerCase() === "kb") {
      return number * 1024;
    } else if (match[2]?.toLowerCase() === "mb") {
      return number * 1024 * 1024;
    }
    return number;
  } else {
    console.error(`Invalid log size: ${value}`);
  }
  return defaultValue;
};
var isStringTrue = (value, defaultValue) => {
  if (typeof value === "undefined" || value === "") return defaultValue;
  value = (value || "").trim().toLocaleLowerCase();
  return value === "true" || value === "1";
};
var getDefaultLogConfig = () => {
  return {
    folder: process.env["LOG_FOLDER"] || "./log/",
    filename: process.env["LOG_FILENAME"] || "log-%index%.log",
    // %index% will be replaced with 0, 1, ..., maxCount-1, default is 0
    maxSize: getSizeFromString(process.env["LOG_MAX_SIZE"], 1024 * 1024 * 1),
    maxCount: Number(process.env["LOG_MAX_COUNT"] || "5"),
    outToFile: isStringTrue(process.env["LOG_OUT_TO_FILE"], true),
    outToConsole: isStringTrue(process.env["LOG_OUT_TO_CONSOLE"], true),
    level: (process.env["LOG_LEVEL"] || "info").trim().toLocaleLowerCase()
  };
};

// src/lib/logger.ts
var fs = require("fs");
var util = require("util");
var cluster = require("cluster");
var path = require("path");
var LogWriterMessageId = "LogWriter";
var LogWriter = class _LogWriter {
  static instance;
  constructor() {
  }
  static getInstance() {
    if (!_LogWriter.instance) {
      _LogWriter.instance = new _LogWriter();
    }
    return _LogWriter.instance;
  }
  _config;
  getConfig = () => {
    return this._config || getDefaultLogConfig();
  };
  savedSize = -1;
  // -1 for needing initialize
  fileHandle = 0;
  level = Object.keys(LogLevels).findIndex((item) => item === this.getConfig().level);
  _init(config) {
    console.debug(`init Log: ${config.level}`);
    if (!cluster.isPrimary) {
      console.error("Logger cannot be initialised in sub process.");
      return;
    }
    this._config = {
      ...getDefaultLogConfig(),
      ...config
    };
    this.level = Object.keys(LogLevels).findIndex((item) => item === this.getConfig().level);
    this.savedSize = 0;
    if (this.fileHandle > 0) {
      fs.closeSync(this.fileHandle);
      this.fileHandle = 0;
    }
    if (this.getConfig().outToFile) {
      if (!fs.existsSync(this.getConfig().folder)) {
        fs.mkdirSync(this.getConfig().folder, { recursive: true });
      }
      const filename = path.join(this.getConfig().folder, this.getConfig().filename.replace("%index%", "0"));
      this.fileHandle = fs.openSync(filename, "a+");
      if (this.fileHandle <= 0) {
        this.savedSize = 0;
        console.error(`Open log error, descriptor: ${this.fileHandle}, file: ${filename}`);
        return;
      }
      this.checkSize();
    }
  }
  checkSize() {
    if (this.fileHandle <= 0) {
      return;
    }
    const stats = fs.fstatSync(this.fileHandle);
    this.savedSize = stats["size"];
    if (this.savedSize >= this.getConfig().maxSize) {
      fs.closeSync(this.fileHandle);
      const filename = this.getConfig().filename;
      if (filename.indexOf("%index%") >= 0) {
        const maxCount = this.getConfig().maxCount || 5;
        for (let i = maxCount - 1; i >= 1; i--) {
          const nameFrom = path.join(this.getConfig().folder, filename.replace("%index%", (i - 1).toString()));
          const nameTo = path.join(this.getConfig().folder, filename.replace("%index%", i.toString()));
          if (fs.existsSync(nameFrom)) {
            try {
              fs.copyFileSync(nameFrom, nameTo);
              fs.unlinkSync(nameFrom);
            } catch (err) {
              console.log("Rename log error: ", err.message);
            }
          }
        }
      } else if (fs.existsSync(filename)) {
        fs.unlinkSync(filename);
      }
      const nameCurrent = path.join(this.getConfig().folder, filename.replace("%index%", "0"));
      this.fileHandle = fs.openSync(nameCurrent, "a+");
      this.savedSize = 0;
      if (this.fileHandle <= 0) {
        console.error(`Open log error, descriptor: ${this.fileHandle}, file: ${nameCurrent}`);
      }
    }
  }
  timestamp(date) {
    return (date || /* @__PURE__ */ new Date()).toJSON();
  }
  /*
  	messageFromSubProcess should be called from worker process.
  
  	// must be let!
  	let worker = cluster.fork();
  
  	worker.on('message', (msgObject) => {
  		if (!msgObject || !msgObject.id) {
  			logger.warn(`Unknown message from work: ${worker.id}`);
  			return;
  		}
  
  		if (msgObject.id == LogWriterMessageId) {
  			logger.messageFromSubProcess(msgObject);
  		}
  		...
  	});
  
  	*/
  // this is primary, msg is from a client. LogWriter only writes to a file in primary
  static messageFromSubProcess(msgObject) {
    if (!cluster.isPrimary || !msgObject.level || !msgObject.messageList) {
      console.error("Logger got wrong message: ", msgObject);
      return;
    }
    _LogWriter.getInstance()._log(
      msgObject.level,
      msgObject.namespace,
      msgObject.color,
      msgObject.messageList,
      msgObject.pid,
      msgObject.uuid
    );
  }
  _log(level, namespace, color, messageList, pid, uuid) {
    const store = asyncLocalStorage.getStore();
    uuid = !uuid && store && store.uuid ? ":" + store.uuid : "";
    if (!cluster.isPrimary) {
      if (process && process.send) {
        const obj = {
          id: LogWriterMessageId,
          pid: pid || process.pid,
          level,
          namespace,
          color,
          messageList,
          uuid
        };
        process.send(obj);
      } else {
        console.error("Logger is not in Master but also not in sub process!");
      }
      return;
    }
    if (!this.getConfig().outToFile && !this.getConfig().outToConsole) {
      return;
    }
    if (this.savedSize == -1) {
      this._init(getDefaultLogConfig());
    }
    const s = util.format(...messageList);
    pid = pid ? pid : process.pid;
    const ns = !namespace ? "" : "[" + namespace + "] ";
    if (s.length > 1024) {
      console.warn("Log string is too long: " + s.length);
    }
    const msg = `${this.timestamp()} ${level} [${pid}${uuid}] ${ns}${s.length > 1024 ? s.substring(0, 1024) : s}`;
    if (this.getConfig().outToFile) {
      if (this.savedSize >= this.getConfig().maxSize) {
        this.checkSize();
      }
      if (this.fileHandle <= 0) {
        console.error(`Log to file error, msg: ${msg}`);
      } else {
        const msgBuf = Buffer.from(msg + "\r\n");
        const options = { flag: "a+", encoding: "utf8", mode: "0777" };
        fs.writeFileSync(this.fileHandle, msgBuf, options);
        this.savedSize += msgBuf.byteLength;
      }
    }
    if (this.getConfig().outToConsole) {
      if (typeof color === "undefined" && level !== "ERROR" && level !== "WARN") {
        console.log(msg);
      } else {
        const printColor = level === "ERROR" ? 196 : level === "WARN" ? 199 : color;
        console.log(`\x1B[38:5:${printColor};1m${msg}\x1B[0m`);
      }
    }
  }
};
var Logger = class {
  namespace = "";
  color = void 0;
  constructor(namespace, color) {
    this.namespace = namespace;
    this.color = color;
  }
  isDebug() {
    return LogWriter.getInstance().level <= 4;
  }
  debug(...message) {
    if (LogWriter.getInstance().level < 4) {
      return;
    }
    LogWriter.getInstance()._log("DEBUG", this.namespace, this.color, message);
  }
  info(...message) {
    if (LogWriter.getInstance().level < 3) {
      return;
    }
    LogWriter.getInstance()._log("INFO", this.namespace, this.color, message);
  }
  warn(...message) {
    if (LogWriter.getInstance().level < 2) {
      return;
    }
    LogWriter.getInstance()._log("WARN", this.namespace, this.color, message);
  }
  error(...message) {
    if (LogWriter.getInstance().level < 1) {
      return;
    }
    LogWriter.getInstance()._log("ERROR", this.namespace, this.color, message);
  }
  fatal(...message) {
    if (LogWriter.getInstance().level < 0) {
      return;
    }
    LogWriter.getInstance()._log("FATAL", this.namespace, this.color, message);
  }
};

// src/lib/db/db.ts
var logger = new Logger("db");

// src/lib/db/db-sqlite.ts
var import_better_sqlite3 = __toESM(require("better-sqlite3"));
var logger2 = new Logger("db-sqlite");

// src/lib/db/db-helper.ts
var logger3 = new Logger("db-helper");

// src/lib/utils/encode-html.ts
var encodeHtml = (str) => {
  if (!str) {
    return str;
  }
  return str.toString().replace(
    /[&<>'"]/g,
    (tag) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;"
    })[tag] || ""
  );
};

// src/lib/utils/file-setting.ts
var logger4 = new Logger("setting-file");

// src/lib/utils/is-type.ts
var IsType = class {
  static getType(obj) {
    var type = typeof obj;
    if (type === "undefined") return "undefined";
    else if (type === "string" || obj instanceof String) return "string";
    else if (type === "number" || obj instanceof Number) return "number";
    else if (type === "function" || obj instanceof Function) return "function";
    else if (!!obj && obj.constructor === Array) return "array";
    else if (obj && obj.nodeType === 1) return "element";
    else if (type === "object") return "object";
    else return "unknown";
  }
  static isArray(input) {
    return input instanceof Array || Object.prototype.toString.call(input) === "[object Array]";
  }
  static isObject(input) {
    return input !== null && Object.prototype.toString.call(input) === "[object Object]";
  }
  static isObjectEmpty(obj) {
    if (Object.getOwnPropertyNames) {
      return Object.getOwnPropertyNames(obj).length === 0;
    } else {
      var k;
      for (k in obj) {
        if (obj.hasOwnProperty(k)) {
          return false;
        }
      }
      return true;
    }
  }
  static isUndefined(input) {
    return input === void 0;
  }
  static isNumber(input) {
    return typeof input === "number" || Object.prototype.toString.call(input) === "[object Number]";
  }
  static isDate(input) {
    return input instanceof Date || Object.prototype.toString.call(input) === "[object Date]";
  }
};

// src/lib/utils/load-env.ts
var webEnv = __toESM(require_web_env());

// src/shared/handle-status.ts
var handler404 = (res, msg, contentType) => {
  handlerResponse(res, 404, "404 Not Found", msg, contentType);
};
var handlerResponse = (res, statusCode, title, msg, contentType) => {
  res.statusCode = statusCode;
  if (res.writable) {
    try {
      res.setHeader("content-type", contentType || "text/html");
    } catch (e) {
    }
  }
  const text = IsType.isObject(msg) ? JSON.stringify(msg) : msg;
  const html = contentType === "application/json" ? msg : generateHtml(title, text || title);
  res.end(html);
};
var generateHtml = (title, message) => {
  return `${[
    "<!doctype html>",
    "<html>",
    "  <head>",
    '    <meta charset="utf-8">',
    `    <title>${title}</title>`,
    "  </head>",
    "  <body>",
    `      <p>${encodeHtml(message)}</p>`,
    "  </body>",
    "</html>"
  ].join("\n")}
`;
};

// src/shared/simple-storage.ts
var fs2 = __toESM(require("fs/promises"));
var SimpleStorage = class {
  settings = {};
  dirty = false;
  constructor(settings) {
    this.settings = settings;
  }
  setContent(settings) {
    this.settings = settings;
    this.dirty = true;
  }
  async saveContent(filePath) {
    await fs2.writeFile(filePath, JSON.stringify(this.settings));
    this.dirty = false;
  }
  set Dirty(dirty) {
    this.dirty = dirty;
  }
  get Dirty() {
    return this.dirty;
  }
  contains(key) {
    return key in this.settings;
  }
  size() {
    return Object.keys(this.settings).length;
  }
  set(key, value) {
    this.dirty = true;
    if (typeof value === "undefined") {
      delete this.settings[key];
    } else {
      this.settings[key] = value;
    }
  }
  getWithPrefix(prefixKey) {
    const result = {};
    for (let key in this.settings) {
      if (key.startsWith(prefixKey)) {
        result[key] = this.settings[key];
      }
    }
    return result;
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

// src/shared/http-exceptions.ts
var HttpException = class extends Error {
  statusCode;
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
};

// src/api/api-router.ts
var logger5 = new Logger("api-router");
function isIApiRouter(handler) {
  return handler.findRoute !== void 0;
}
var ApiRouter = class {
  routerData = [];
  filter;
  setFilter(filter) {
    this.filter = filter;
  }
  // the path should start with / and end without /, and it can be
  //    /aaa/:bbb/ccc/:ddd (ccc is a fixed section)
  //    /aaa/:bbb/ccc/?ddd/?eee (from ddd, all sections are optional)
  storeRouter(path2, handler, method) {
    let fixedPath;
    if (path2 === "*" || path2 === "/" || path2 === "" || path2 === "/*") {
      fixedPath = "*";
    } else {
      fixedPath = path2;
      if (!fixedPath.startsWith("/")) {
        fixedPath = "/" + fixedPath;
      }
      if (fixedPath.endsWith("/")) {
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
      method,
      parameterVariables,
      parameterLength
    });
  }
  get(path2, ...handler) {
    this.storeRouter(path2, handler, "GET" /* GET */);
  }
  post(path2, ...handler) {
    this.storeRouter(path2, handler, "POST" /* POST */);
  }
  use(path2, ...handler) {
    this.storeRouter(path2, handler, "ALL" /* ALL */);
  }
  async callHandle(handle, path2, req, res) {
    try {
      if (await handle(req, res, path2) || res.writableEnded) {
        logger5.debug(`Processed path: ${path2}`);
        return true;
      }
    } catch (e) {
      if (e instanceof HttpException) {
        logger5.debug(`Processed path ${path2} intercepted by API Boundary: [${e.statusCode}] ${e.message}`);
        res.writeHead(e.statusCode, { "Content-Type": "application/json" });
        res.write(
          JSON.stringify({
            status: "error",
            statusCode: e.statusCode,
            message: e.message
          })
        );
      } else {
        logger5.error(`Processed path: ${path2}, error: ${e.message}`);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.write(
          JSON.stringify({
            status: "error",
            statusCode: 500,
            message: `Processed path: ${path2}, error: ${e.message}`
          })
        );
      }
      res.end();
      return true;
    }
    return false;
  }
  async findRoute(url, req, res, handleNotFound) {
    for (let i = 0, routerList; routerList = this.routerData[i]; i++) {
      if ((routerList.method === "ALL" /* ALL */ || routerList.method === req.method) && (routerList.path === "*" || url === routerList.path || url.startsWith(routerList.path + "/"))) {
        const parameters = {};
        let meet = true;
        if (routerList.parameterVariables.length > 0) {
          meet = false;
          const restPath = url.substring(routerList.path.length + 1).split("/").filter(Boolean);
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
            req.locals.urlParameters = new SimpleStorage(parameters);
          }
        }
        if (meet) {
          for (let j = 0, router; router = routerList.handler[j]; j++) {
            if (isIApiRouter(router)) {
              const nextPath = routerList.path === "*" ? url : url.substring(routerList.path.length);
              if (await router.findRoute(nextPath, req, res, handleNotFound) || res.writableEnded) {
                return true;
              }
            } else {
              if (await this.callHandle(router, url, req, res)) {
                return true;
              }
            }
          }
        }
      }
    }
    if (handleNotFound && !res.writableEnded) {
      logger5.debug(`Processed path under 404: ${url}`);
      const html = JSON.stringify({
        status: "error",
        message: `Can't find any matches for path: ${url}.`
      });
      handler404(res, html, "application/json");
      return true;
    }
    return false;
  }
  async handleRequest(url, req, res) {
    if (this.filter && await this.callHandle(this.filter, url, req, res)) {
      return true;
    }
    return await this.findRoute(url, req, res, true);
  }
};

// src/api/api-router.test.ts
(0, import_node_test.describe)("ApiRouter Execution Engine", () => {
  const createMockReq = (method = "GET") => ({
    method,
    locals: {}
  });
  const createMockRes = () => {
    let _writableEnded = false;
    let _status = 200;
    let _data = "";
    return {
      get writableEnded() {
        return _writableEnded;
      },
      set statusCode(val) {
        _status = val;
      },
      get statusCode() {
        return _status;
      },
      writeHead(status) {
        _status = status;
      },
      setHeader() {
      },
      get writable() {
        return true;
      },
      write(chunk) {
        _data += chunk;
      },
      end(chunk) {
        if (chunk) _data += chunk;
        _writableEnded = true;
      },
      _getData: () => _data,
      _getStatus: () => _status
    };
  };
  (0, import_node_test.it)("should route strict paths according to specific HTTP methods requested", async () => {
    const router = new ApiRouter();
    let getHit = false;
    let postHit = false;
    router.get("/data", async () => {
      getHit = true;
      return true;
    });
    router.post("/data", async () => {
      postHit = true;
      return true;
    });
    const reqPost = createMockReq("POST");
    const resPost = createMockRes();
    const result1 = await router.handleRequest("/data", reqPost, resPost);
    import_strict.default.ok(result1);
    import_strict.default.ok(!getHit);
    import_strict.default.ok(postHit);
  });
  (0, import_node_test.it)("should parse URL parameters strictly segregating mandatory vs optional queries natively", async () => {
    const router = new ApiRouter();
    let parameters = null;
    router.use("/record/:id/auth/?user", async (req) => {
      parameters = {
        id: req.locals.urlParameters?.get("id", ""),
        user: req.locals.urlParameters?.get("user", "")
      };
      return true;
    });
    parameters = null;
    await router.handleRequest("/record/44/auth", createMockReq(), createMockRes());
    import_strict.default.ok(parameters);
    import_strict.default.equal(parameters.id, "44");
    import_strict.default.equal(parameters.user, "");
    parameters = null;
    await router.handleRequest("/record/99/auth/admin", createMockReq(), createMockRes());
    import_strict.default.ok(parameters);
    import_strict.default.equal(parameters.id, "99");
    import_strict.default.equal(parameters.user, "admin");
    parameters = null;
    const res404 = createMockRes();
    await router.handleRequest("/record", createMockReq(), res404);
    import_strict.default.equal(parameters, null);
    import_strict.default.equal(res404._getStatus(), 404);
  });
  (0, import_node_test.it)("should execute upstream logic explicitly utilizing setFilter interception", async () => {
    const router = new ApiRouter();
    let filterTriggered = false;
    router.setFilter(async (req, res, path2) => {
      filterTriggered = true;
      if (path2 === "/blocked") {
        res.writeHead(403);
        res.end();
        return true;
      }
      return false;
    });
    router.get("/allowed", async () => {
      return true;
    });
    const resAllowed = createMockRes();
    const resultAllowed = await router.handleRequest("/allowed", createMockReq(), resAllowed);
    import_strict.default.ok(filterTriggered, "Filter must invoke unconditionally");
    import_strict.default.ok(resultAllowed);
    import_strict.default.ok(!resAllowed.writableEnded, "Nothing blocks write streams artificially here unless handled");
    filterTriggered = false;
    const resBlocked = createMockRes();
    const resultBlocked = await router.handleRequest("/blocked", createMockReq(), resBlocked);
    import_strict.default.ok(filterTriggered);
    import_strict.default.ok(resultBlocked);
    import_strict.default.equal(resBlocked._getStatus(), 403);
  });
  (0, import_node_test.it)("should accurately isolate recursively bound nested ApiRouters recursively without parent bleed", async () => {
    const rootRouter = new ApiRouter();
    const nestRouter = new ApiRouter();
    let nestTriggered = false;
    nestRouter.post("/commit", async () => {
      nestTriggered = true;
      return true;
    });
    rootRouter.use("/v1", nestRouter);
    const res = createMockRes();
    await rootRouter.handleRequest("/v1/commit", createMockReq("POST"), res);
    import_strict.default.ok(nestTriggered);
  });
  (0, import_node_test.it)("should format predictable 500 error shells natively upon handler exceptions", async () => {
    const router = new ApiRouter();
    router.get("/crash", async () => {
      throw new Error("Database Error");
    });
    const res = createMockRes();
    console.log("");
    console.log("--- NOTE: Expecting an ERROR log below from [api-router] testing crash handling ---");
    await router.handleRequest("/crash", createMockReq(), res);
    import_strict.default.equal(res._getStatus(), 500);
    const body = res._getData();
    import_strict.default.ok(body.includes('status":"error"'));
    import_strict.default.ok(body.includes("Database Error"));
  });
  (0, import_node_test.it)("should format standardized 404 logic when paths resolve to empty constraints natively", async () => {
    const router = new ApiRouter();
    router.get("/exist/:id", async () => true);
    const res = createMockRes();
    await router.handleRequest("/exist/1/2/3", createMockReq("GET"), res);
    import_strict.default.equal(res._getStatus(), 404);
    import_strict.default.ok(res._getData().includes("matches for path"));
  });
});
