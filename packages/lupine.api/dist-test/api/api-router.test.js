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

// ../../node_modules/better-sqlite3/lib/util.js
var require_util = __commonJS({
  "../../node_modules/better-sqlite3/lib/util.js"(exports2) {
    "use strict";
    exports2.getBooleanOption = (options, key) => {
      let value = false;
      if (key in options && typeof (value = options[key]) !== "boolean") {
        throw new TypeError(`Expected the "${key}" option to be a boolean`);
      }
      return value;
    };
    exports2.cppdb = Symbol();
    exports2.inspect = Symbol.for("nodejs.util.inspect.custom");
  }
});

// ../../node_modules/better-sqlite3/lib/sqlite-error.js
var require_sqlite_error = __commonJS({
  "../../node_modules/better-sqlite3/lib/sqlite-error.js"(exports2, module2) {
    "use strict";
    var descriptor = { value: "SqliteError", writable: true, enumerable: false, configurable: true };
    function SqliteError(message, code) {
      if (new.target !== SqliteError) {
        return new SqliteError(message, code);
      }
      if (typeof code !== "string") {
        throw new TypeError("Expected second argument to be a string");
      }
      Error.call(this, message);
      descriptor.value = "" + message;
      Object.defineProperty(this, "message", descriptor);
      Error.captureStackTrace(this, SqliteError);
      this.code = code;
    }
    Object.setPrototypeOf(SqliteError, Error);
    Object.setPrototypeOf(SqliteError.prototype, Error.prototype);
    Object.defineProperty(SqliteError.prototype, "name", descriptor);
    module2.exports = SqliteError;
  }
});

// ../../node_modules/file-uri-to-path/index.js
var require_file_uri_to_path = __commonJS({
  "../../node_modules/file-uri-to-path/index.js"(exports2, module2) {
    var sep = require("path").sep || "/";
    module2.exports = fileUriToPath;
    function fileUriToPath(uri) {
      if ("string" != typeof uri || uri.length <= 7 || "file://" != uri.substring(0, 7)) {
        throw new TypeError("must pass in a file:// URI to convert to a file path");
      }
      var rest = decodeURI(uri.substring(7));
      var firstSlash = rest.indexOf("/");
      var host = rest.substring(0, firstSlash);
      var path2 = rest.substring(firstSlash + 1);
      if ("localhost" == host) host = "";
      if (host) {
        host = sep + sep + host;
      }
      path2 = path2.replace(/^(.+)\|/, "$1:");
      if (sep == "\\") {
        path2 = path2.replace(/\//g, "\\");
      }
      if (/^.+\:/.test(path2)) {
      } else {
        path2 = sep + path2;
      }
      return host + path2;
    }
  }
});

// ../../node_modules/bindings/bindings.js
var require_bindings = __commonJS({
  "../../node_modules/bindings/bindings.js"(exports2, module2) {
    var fs3 = require("fs");
    var path2 = require("path");
    var fileURLToPath = require_file_uri_to_path();
    var join = path2.join;
    var dirname = path2.dirname;
    var exists = fs3.accessSync && function(path3) {
      try {
        fs3.accessSync(path3);
      } catch (e) {
        return false;
      }
      return true;
    } || fs3.existsSync || path2.existsSync;
    var defaults = {
      arrow: process.env.NODE_BINDINGS_ARROW || " \u2192 ",
      compiled: process.env.NODE_BINDINGS_COMPILED_DIR || "compiled",
      platform: process.platform,
      arch: process.arch,
      nodePreGyp: "node-v" + process.versions.modules + "-" + process.platform + "-" + process.arch,
      version: process.versions.node,
      bindings: "bindings.node",
      try: [
        // node-gyp's linked version in the "build" dir
        ["module_root", "build", "bindings"],
        // node-waf and gyp_addon (a.k.a node-gyp)
        ["module_root", "build", "Debug", "bindings"],
        ["module_root", "build", "Release", "bindings"],
        // Debug files, for development (legacy behavior, remove for node v0.9)
        ["module_root", "out", "Debug", "bindings"],
        ["module_root", "Debug", "bindings"],
        // Release files, but manually compiled (legacy behavior, remove for node v0.9)
        ["module_root", "out", "Release", "bindings"],
        ["module_root", "Release", "bindings"],
        // Legacy from node-waf, node <= 0.4.x
        ["module_root", "build", "default", "bindings"],
        // Production "Release" buildtype binary (meh...)
        ["module_root", "compiled", "version", "platform", "arch", "bindings"],
        // node-qbs builds
        ["module_root", "addon-build", "release", "install-root", "bindings"],
        ["module_root", "addon-build", "debug", "install-root", "bindings"],
        ["module_root", "addon-build", "default", "install-root", "bindings"],
        // node-pre-gyp path ./lib/binding/{node_abi}-{platform}-{arch}
        ["module_root", "lib", "binding", "nodePreGyp", "bindings"]
      ]
    };
    function bindings(opts) {
      if (typeof opts == "string") {
        opts = { bindings: opts };
      } else if (!opts) {
        opts = {};
      }
      Object.keys(defaults).map(function(i2) {
        if (!(i2 in opts)) opts[i2] = defaults[i2];
      });
      if (!opts.module_root) {
        opts.module_root = exports2.getRoot(exports2.getFileName());
      }
      if (path2.extname(opts.bindings) != ".node") {
        opts.bindings += ".node";
      }
      var requireFunc = typeof __webpack_require__ === "function" ? __non_webpack_require__ : require;
      var tries = [], i = 0, l = opts.try.length, n, b, err;
      for (; i < l; i++) {
        n = join.apply(
          null,
          opts.try[i].map(function(p) {
            return opts[p] || p;
          })
        );
        tries.push(n);
        try {
          b = opts.path ? requireFunc.resolve(n) : requireFunc(n);
          if (!opts.path) {
            b.path = n;
          }
          return b;
        } catch (e) {
          if (e.code !== "MODULE_NOT_FOUND" && e.code !== "QUALIFIED_PATH_RESOLUTION_FAILED" && !/not find/i.test(e.message)) {
            throw e;
          }
        }
      }
      err = new Error(
        "Could not locate the bindings file. Tried:\n" + tries.map(function(a) {
          return opts.arrow + a;
        }).join("\n")
      );
      err.tries = tries;
      throw err;
    }
    module2.exports = exports2 = bindings;
    exports2.getFileName = function getFileName(calling_file) {
      var origPST = Error.prepareStackTrace, origSTL = Error.stackTraceLimit, dummy = {}, fileName;
      Error.stackTraceLimit = 10;
      Error.prepareStackTrace = function(e, st) {
        for (var i = 0, l = st.length; i < l; i++) {
          fileName = st[i].getFileName();
          if (fileName !== __filename) {
            if (calling_file) {
              if (fileName !== calling_file) {
                return;
              }
            } else {
              return;
            }
          }
        }
      };
      Error.captureStackTrace(dummy);
      dummy.stack;
      Error.prepareStackTrace = origPST;
      Error.stackTraceLimit = origSTL;
      var fileSchema = "file://";
      if (fileName.indexOf(fileSchema) === 0) {
        fileName = fileURLToPath(fileName);
      }
      return fileName;
    };
    exports2.getRoot = function getRoot(file) {
      var dir = dirname(file), prev;
      while (true) {
        if (dir === ".") {
          dir = process.cwd();
        }
        if (exists(join(dir, "package.json")) || exists(join(dir, "node_modules"))) {
          return dir;
        }
        if (prev === dir) {
          throw new Error(
            'Could not find module root given file: "' + file + '". Do you have a `package.json` file? '
          );
        }
        prev = dir;
        dir = join(dir, "..");
      }
    };
  }
});

// ../../node_modules/better-sqlite3/lib/methods/wrappers.js
var require_wrappers = __commonJS({
  "../../node_modules/better-sqlite3/lib/methods/wrappers.js"(exports2) {
    "use strict";
    var { cppdb } = require_util();
    exports2.prepare = function prepare(sql) {
      return this[cppdb].prepare(sql, this, false);
    };
    exports2.exec = function exec(sql) {
      this[cppdb].exec(sql);
      return this;
    };
    exports2.close = function close() {
      this[cppdb].close();
      return this;
    };
    exports2.loadExtension = function loadExtension(...args) {
      this[cppdb].loadExtension(...args);
      return this;
    };
    exports2.defaultSafeIntegers = function defaultSafeIntegers(...args) {
      this[cppdb].defaultSafeIntegers(...args);
      return this;
    };
    exports2.unsafeMode = function unsafeMode(...args) {
      this[cppdb].unsafeMode(...args);
      return this;
    };
    exports2.getters = {
      name: {
        get: function name() {
          return this[cppdb].name;
        },
        enumerable: true
      },
      open: {
        get: function open() {
          return this[cppdb].open;
        },
        enumerable: true
      },
      inTransaction: {
        get: function inTransaction() {
          return this[cppdb].inTransaction;
        },
        enumerable: true
      },
      readonly: {
        get: function readonly() {
          return this[cppdb].readonly;
        },
        enumerable: true
      },
      memory: {
        get: function memory() {
          return this[cppdb].memory;
        },
        enumerable: true
      }
    };
  }
});

// ../../node_modules/better-sqlite3/lib/methods/transaction.js
var require_transaction = __commonJS({
  "../../node_modules/better-sqlite3/lib/methods/transaction.js"(exports2, module2) {
    "use strict";
    var { cppdb } = require_util();
    var controllers = /* @__PURE__ */ new WeakMap();
    module2.exports = function transaction(fn) {
      if (typeof fn !== "function") throw new TypeError("Expected first argument to be a function");
      const db = this[cppdb];
      const controller = getController(db, this);
      const { apply } = Function.prototype;
      const properties = {
        default: { value: wrapTransaction(apply, fn, db, controller.default) },
        deferred: { value: wrapTransaction(apply, fn, db, controller.deferred) },
        immediate: { value: wrapTransaction(apply, fn, db, controller.immediate) },
        exclusive: { value: wrapTransaction(apply, fn, db, controller.exclusive) },
        database: { value: this, enumerable: true }
      };
      Object.defineProperties(properties.default.value, properties);
      Object.defineProperties(properties.deferred.value, properties);
      Object.defineProperties(properties.immediate.value, properties);
      Object.defineProperties(properties.exclusive.value, properties);
      return properties.default.value;
    };
    var getController = (db, self) => {
      let controller = controllers.get(db);
      if (!controller) {
        const shared = {
          commit: db.prepare("COMMIT", self, false),
          rollback: db.prepare("ROLLBACK", self, false),
          savepoint: db.prepare("SAVEPOINT `	_bs3.	`", self, false),
          release: db.prepare("RELEASE `	_bs3.	`", self, false),
          rollbackTo: db.prepare("ROLLBACK TO `	_bs3.	`", self, false)
        };
        controllers.set(db, controller = {
          default: Object.assign({ begin: db.prepare("BEGIN", self, false) }, shared),
          deferred: Object.assign({ begin: db.prepare("BEGIN DEFERRED", self, false) }, shared),
          immediate: Object.assign({ begin: db.prepare("BEGIN IMMEDIATE", self, false) }, shared),
          exclusive: Object.assign({ begin: db.prepare("BEGIN EXCLUSIVE", self, false) }, shared)
        });
      }
      return controller;
    };
    var wrapTransaction = (apply, fn, db, { begin, commit, rollback, savepoint, release, rollbackTo }) => function sqliteTransaction() {
      let before, after, undo;
      if (db.inTransaction) {
        before = savepoint;
        after = release;
        undo = rollbackTo;
      } else {
        before = begin;
        after = commit;
        undo = rollback;
      }
      before.run();
      try {
        const result = apply.call(fn, this, arguments);
        if (result && typeof result.then === "function") {
          throw new TypeError("Transaction function cannot return a promise");
        }
        after.run();
        return result;
      } catch (ex) {
        if (db.inTransaction) {
          undo.run();
          if (undo !== rollback) after.run();
        }
        throw ex;
      }
    };
  }
});

// ../../node_modules/better-sqlite3/lib/methods/pragma.js
var require_pragma = __commonJS({
  "../../node_modules/better-sqlite3/lib/methods/pragma.js"(exports2, module2) {
    "use strict";
    var { getBooleanOption, cppdb } = require_util();
    module2.exports = function pragma(source, options) {
      if (options == null) options = {};
      if (typeof source !== "string") throw new TypeError("Expected first argument to be a string");
      if (typeof options !== "object") throw new TypeError("Expected second argument to be an options object");
      const simple = getBooleanOption(options, "simple");
      const stmt = this[cppdb].prepare(`PRAGMA ${source}`, this, true);
      return simple ? stmt.pluck().get() : stmt.all();
    };
  }
});

// ../../node_modules/better-sqlite3/lib/methods/backup.js
var require_backup = __commonJS({
  "../../node_modules/better-sqlite3/lib/methods/backup.js"(exports2, module2) {
    "use strict";
    var fs3 = require("fs");
    var path2 = require("path");
    var { promisify } = require("util");
    var { cppdb } = require_util();
    var fsAccess = promisify(fs3.access);
    module2.exports = async function backup(filename, options) {
      if (options == null) options = {};
      if (typeof filename !== "string") throw new TypeError("Expected first argument to be a string");
      if (typeof options !== "object") throw new TypeError("Expected second argument to be an options object");
      filename = filename.trim();
      const attachedName = "attached" in options ? options.attached : "main";
      const handler = "progress" in options ? options.progress : null;
      if (!filename) throw new TypeError("Backup filename cannot be an empty string");
      if (filename === ":memory:") throw new TypeError('Invalid backup filename ":memory:"');
      if (typeof attachedName !== "string") throw new TypeError('Expected the "attached" option to be a string');
      if (!attachedName) throw new TypeError('The "attached" option cannot be an empty string');
      if (handler != null && typeof handler !== "function") throw new TypeError('Expected the "progress" option to be a function');
      await fsAccess(path2.dirname(filename)).catch(() => {
        throw new TypeError("Cannot save backup because the directory does not exist");
      });
      const isNewFile = await fsAccess(filename).then(() => false, () => true);
      return runBackup(this[cppdb].backup(this, attachedName, filename, isNewFile), handler || null);
    };
    var runBackup = (backup, handler) => {
      let rate = 0;
      let useDefault = true;
      return new Promise((resolve, reject) => {
        setImmediate(function step() {
          try {
            const progress = backup.transfer(rate);
            if (!progress.remainingPages) {
              backup.close();
              resolve(progress);
              return;
            }
            if (useDefault) {
              useDefault = false;
              rate = 100;
            }
            if (handler) {
              const ret = handler(progress);
              if (ret !== void 0) {
                if (typeof ret === "number" && ret === ret) rate = Math.max(0, Math.min(2147483647, Math.round(ret)));
                else throw new TypeError("Expected progress callback to return a number or undefined");
              }
            }
            setImmediate(step);
          } catch (err) {
            backup.close();
            reject(err);
          }
        });
      });
    };
  }
});

// ../../node_modules/better-sqlite3/lib/methods/serialize.js
var require_serialize = __commonJS({
  "../../node_modules/better-sqlite3/lib/methods/serialize.js"(exports2, module2) {
    "use strict";
    var { cppdb } = require_util();
    module2.exports = function serialize(options) {
      if (options == null) options = {};
      if (typeof options !== "object") throw new TypeError("Expected first argument to be an options object");
      const attachedName = "attached" in options ? options.attached : "main";
      if (typeof attachedName !== "string") throw new TypeError('Expected the "attached" option to be a string');
      if (!attachedName) throw new TypeError('The "attached" option cannot be an empty string');
      return this[cppdb].serialize(attachedName);
    };
  }
});

// ../../node_modules/better-sqlite3/lib/methods/function.js
var require_function = __commonJS({
  "../../node_modules/better-sqlite3/lib/methods/function.js"(exports2, module2) {
    "use strict";
    var { getBooleanOption, cppdb } = require_util();
    module2.exports = function defineFunction(name, options, fn) {
      if (options == null) options = {};
      if (typeof options === "function") {
        fn = options;
        options = {};
      }
      if (typeof name !== "string") throw new TypeError("Expected first argument to be a string");
      if (typeof fn !== "function") throw new TypeError("Expected last argument to be a function");
      if (typeof options !== "object") throw new TypeError("Expected second argument to be an options object");
      if (!name) throw new TypeError("User-defined function name cannot be an empty string");
      const safeIntegers = "safeIntegers" in options ? +getBooleanOption(options, "safeIntegers") : 2;
      const deterministic = getBooleanOption(options, "deterministic");
      const directOnly = getBooleanOption(options, "directOnly");
      const varargs = getBooleanOption(options, "varargs");
      let argCount = -1;
      if (!varargs) {
        argCount = fn.length;
        if (!Number.isInteger(argCount) || argCount < 0) throw new TypeError("Expected function.length to be a positive integer");
        if (argCount > 100) throw new RangeError("User-defined functions cannot have more than 100 arguments");
      }
      this[cppdb].function(fn, name, argCount, safeIntegers, deterministic, directOnly);
      return this;
    };
  }
});

// ../../node_modules/better-sqlite3/lib/methods/aggregate.js
var require_aggregate = __commonJS({
  "../../node_modules/better-sqlite3/lib/methods/aggregate.js"(exports2, module2) {
    "use strict";
    var { getBooleanOption, cppdb } = require_util();
    module2.exports = function defineAggregate(name, options) {
      if (typeof name !== "string") throw new TypeError("Expected first argument to be a string");
      if (typeof options !== "object" || options === null) throw new TypeError("Expected second argument to be an options object");
      if (!name) throw new TypeError("User-defined function name cannot be an empty string");
      const start = "start" in options ? options.start : null;
      const step = getFunctionOption(options, "step", true);
      const inverse = getFunctionOption(options, "inverse", false);
      const result = getFunctionOption(options, "result", false);
      const safeIntegers = "safeIntegers" in options ? +getBooleanOption(options, "safeIntegers") : 2;
      const deterministic = getBooleanOption(options, "deterministic");
      const directOnly = getBooleanOption(options, "directOnly");
      const varargs = getBooleanOption(options, "varargs");
      let argCount = -1;
      if (!varargs) {
        argCount = Math.max(getLength(step), inverse ? getLength(inverse) : 0);
        if (argCount > 0) argCount -= 1;
        if (argCount > 100) throw new RangeError("User-defined functions cannot have more than 100 arguments");
      }
      this[cppdb].aggregate(start, step, inverse, result, name, argCount, safeIntegers, deterministic, directOnly);
      return this;
    };
    var getFunctionOption = (options, key, required) => {
      const value = key in options ? options[key] : null;
      if (typeof value === "function") return value;
      if (value != null) throw new TypeError(`Expected the "${key}" option to be a function`);
      if (required) throw new TypeError(`Missing required option "${key}"`);
      return null;
    };
    var getLength = ({ length }) => {
      if (Number.isInteger(length) && length >= 0) return length;
      throw new TypeError("Expected function.length to be a positive integer");
    };
  }
});

// ../../node_modules/better-sqlite3/lib/methods/table.js
var require_table = __commonJS({
  "../../node_modules/better-sqlite3/lib/methods/table.js"(exports2, module2) {
    "use strict";
    var { cppdb } = require_util();
    module2.exports = function defineTable(name, factory) {
      if (typeof name !== "string") throw new TypeError("Expected first argument to be a string");
      if (!name) throw new TypeError("Virtual table module name cannot be an empty string");
      let eponymous = false;
      if (typeof factory === "object" && factory !== null) {
        eponymous = true;
        factory = defer(parseTableDefinition(factory, "used", name));
      } else {
        if (typeof factory !== "function") throw new TypeError("Expected second argument to be a function or a table definition object");
        factory = wrapFactory(factory);
      }
      this[cppdb].table(factory, name, eponymous);
      return this;
    };
    function wrapFactory(factory) {
      return function virtualTableFactory(moduleName, databaseName, tableName, ...args) {
        const thisObject = {
          module: moduleName,
          database: databaseName,
          table: tableName
        };
        const def = apply.call(factory, thisObject, args);
        if (typeof def !== "object" || def === null) {
          throw new TypeError(`Virtual table module "${moduleName}" did not return a table definition object`);
        }
        return parseTableDefinition(def, "returned", moduleName);
      };
    }
    function parseTableDefinition(def, verb, moduleName) {
      if (!hasOwnProperty.call(def, "rows")) {
        throw new TypeError(`Virtual table module "${moduleName}" ${verb} a table definition without a "rows" property`);
      }
      if (!hasOwnProperty.call(def, "columns")) {
        throw new TypeError(`Virtual table module "${moduleName}" ${verb} a table definition without a "columns" property`);
      }
      const rows = def.rows;
      if (typeof rows !== "function" || Object.getPrototypeOf(rows) !== GeneratorFunctionPrototype) {
        throw new TypeError(`Virtual table module "${moduleName}" ${verb} a table definition with an invalid "rows" property (should be a generator function)`);
      }
      let columns = def.columns;
      if (!Array.isArray(columns) || !(columns = [...columns]).every((x) => typeof x === "string")) {
        throw new TypeError(`Virtual table module "${moduleName}" ${verb} a table definition with an invalid "columns" property (should be an array of strings)`);
      }
      if (columns.length !== new Set(columns).size) {
        throw new TypeError(`Virtual table module "${moduleName}" ${verb} a table definition with duplicate column names`);
      }
      if (!columns.length) {
        throw new RangeError(`Virtual table module "${moduleName}" ${verb} a table definition with zero columns`);
      }
      let parameters;
      if (hasOwnProperty.call(def, "parameters")) {
        parameters = def.parameters;
        if (!Array.isArray(parameters) || !(parameters = [...parameters]).every((x) => typeof x === "string")) {
          throw new TypeError(`Virtual table module "${moduleName}" ${verb} a table definition with an invalid "parameters" property (should be an array of strings)`);
        }
      } else {
        parameters = inferParameters(rows);
      }
      if (parameters.length !== new Set(parameters).size) {
        throw new TypeError(`Virtual table module "${moduleName}" ${verb} a table definition with duplicate parameter names`);
      }
      if (parameters.length > 32) {
        throw new RangeError(`Virtual table module "${moduleName}" ${verb} a table definition with more than the maximum number of 32 parameters`);
      }
      for (const parameter of parameters) {
        if (columns.includes(parameter)) {
          throw new TypeError(`Virtual table module "${moduleName}" ${verb} a table definition with column "${parameter}" which was ambiguously defined as both a column and parameter`);
        }
      }
      let safeIntegers = 2;
      if (hasOwnProperty.call(def, "safeIntegers")) {
        const bool = def.safeIntegers;
        if (typeof bool !== "boolean") {
          throw new TypeError(`Virtual table module "${moduleName}" ${verb} a table definition with an invalid "safeIntegers" property (should be a boolean)`);
        }
        safeIntegers = +bool;
      }
      let directOnly = false;
      if (hasOwnProperty.call(def, "directOnly")) {
        directOnly = def.directOnly;
        if (typeof directOnly !== "boolean") {
          throw new TypeError(`Virtual table module "${moduleName}" ${verb} a table definition with an invalid "directOnly" property (should be a boolean)`);
        }
      }
      const columnDefinitions = [
        ...parameters.map(identifier).map((str) => `${str} HIDDEN`),
        ...columns.map(identifier)
      ];
      return [
        `CREATE TABLE x(${columnDefinitions.join(", ")});`,
        wrapGenerator(rows, new Map(columns.map((x, i) => [x, parameters.length + i])), moduleName),
        parameters,
        safeIntegers,
        directOnly
      ];
    }
    function wrapGenerator(generator, columnMap, moduleName) {
      return function* virtualTable(...args) {
        const output = args.map((x) => Buffer.isBuffer(x) ? Buffer.from(x) : x);
        for (let i = 0; i < columnMap.size; ++i) {
          output.push(null);
        }
        for (const row of generator(...args)) {
          if (Array.isArray(row)) {
            extractRowArray(row, output, columnMap.size, moduleName);
            yield output;
          } else if (typeof row === "object" && row !== null) {
            extractRowObject(row, output, columnMap, moduleName);
            yield output;
          } else {
            throw new TypeError(`Virtual table module "${moduleName}" yielded something that isn't a valid row object`);
          }
        }
      };
    }
    function extractRowArray(row, output, columnCount, moduleName) {
      if (row.length !== columnCount) {
        throw new TypeError(`Virtual table module "${moduleName}" yielded a row with an incorrect number of columns`);
      }
      const offset = output.length - columnCount;
      for (let i = 0; i < columnCount; ++i) {
        output[i + offset] = row[i];
      }
    }
    function extractRowObject(row, output, columnMap, moduleName) {
      let count = 0;
      for (const key of Object.keys(row)) {
        const index = columnMap.get(key);
        if (index === void 0) {
          throw new TypeError(`Virtual table module "${moduleName}" yielded a row with an undeclared column "${key}"`);
        }
        output[index] = row[key];
        count += 1;
      }
      if (count !== columnMap.size) {
        throw new TypeError(`Virtual table module "${moduleName}" yielded a row with missing columns`);
      }
    }
    function inferParameters({ length }) {
      if (!Number.isInteger(length) || length < 0) {
        throw new TypeError("Expected function.length to be a positive integer");
      }
      const params = [];
      for (let i = 0; i < length; ++i) {
        params.push(`$${i + 1}`);
      }
      return params;
    }
    var { hasOwnProperty } = Object.prototype;
    var { apply } = Function.prototype;
    var GeneratorFunctionPrototype = Object.getPrototypeOf(function* () {
    });
    var identifier = (str) => `"${str.replace(/"/g, '""')}"`;
    var defer = (x) => () => x;
  }
});

// ../../node_modules/better-sqlite3/lib/methods/inspect.js
var require_inspect = __commonJS({
  "../../node_modules/better-sqlite3/lib/methods/inspect.js"(exports2, module2) {
    "use strict";
    var DatabaseInspection = function Database2() {
    };
    module2.exports = function inspect(depth, opts) {
      return Object.assign(new DatabaseInspection(), this);
    };
  }
});

// ../../node_modules/better-sqlite3/lib/database.js
var require_database = __commonJS({
  "../../node_modules/better-sqlite3/lib/database.js"(exports2, module2) {
    "use strict";
    var fs3 = require("fs");
    var path2 = require("path");
    var util2 = require_util();
    var SqliteError = require_sqlite_error();
    var DEFAULT_ADDON;
    function Database2(filenameGiven, options) {
      if (new.target == null) {
        return new Database2(filenameGiven, options);
      }
      let buffer;
      if (Buffer.isBuffer(filenameGiven)) {
        buffer = filenameGiven;
        filenameGiven = ":memory:";
      }
      if (filenameGiven == null) filenameGiven = "";
      if (options == null) options = {};
      if (typeof filenameGiven !== "string") throw new TypeError("Expected first argument to be a string");
      if (typeof options !== "object") throw new TypeError("Expected second argument to be an options object");
      if ("readOnly" in options) throw new TypeError('Misspelled option "readOnly" should be "readonly"');
      if ("memory" in options) throw new TypeError('Option "memory" was removed in v7.0.0 (use ":memory:" filename instead)');
      const filename = filenameGiven.trim();
      const anonymous = filename === "" || filename === ":memory:";
      const readonly = util2.getBooleanOption(options, "readonly");
      const fileMustExist = util2.getBooleanOption(options, "fileMustExist");
      const timeout = "timeout" in options ? options.timeout : 5e3;
      const verbose = "verbose" in options ? options.verbose : null;
      const nativeBinding = "nativeBinding" in options ? options.nativeBinding : null;
      if (readonly && anonymous && !buffer) throw new TypeError("In-memory/temporary databases cannot be readonly");
      if (!Number.isInteger(timeout) || timeout < 0) throw new TypeError('Expected the "timeout" option to be a positive integer');
      if (timeout > 2147483647) throw new RangeError('Option "timeout" cannot be greater than 2147483647');
      if (verbose != null && typeof verbose !== "function") throw new TypeError('Expected the "verbose" option to be a function');
      if (nativeBinding != null && typeof nativeBinding !== "string" && typeof nativeBinding !== "object") throw new TypeError('Expected the "nativeBinding" option to be a string or addon object');
      let addon;
      if (nativeBinding == null) {
        addon = DEFAULT_ADDON || (DEFAULT_ADDON = require_bindings()("better_sqlite3.node"));
      } else if (typeof nativeBinding === "string") {
        const requireFunc = typeof __non_webpack_require__ === "function" ? __non_webpack_require__ : require;
        addon = requireFunc(path2.resolve(nativeBinding).replace(/(\.node)?$/, ".node"));
      } else {
        addon = nativeBinding;
      }
      if (!addon.isInitialized) {
        addon.setErrorConstructor(SqliteError);
        addon.isInitialized = true;
      }
      if (!anonymous && !fs3.existsSync(path2.dirname(filename))) {
        throw new TypeError("Cannot open database because the directory does not exist");
      }
      Object.defineProperties(this, {
        [util2.cppdb]: { value: new addon.Database(filename, filenameGiven, anonymous, readonly, fileMustExist, timeout, verbose || null, buffer || null) },
        ...wrappers.getters
      });
    }
    var wrappers = require_wrappers();
    Database2.prototype.prepare = wrappers.prepare;
    Database2.prototype.transaction = require_transaction();
    Database2.prototype.pragma = require_pragma();
    Database2.prototype.backup = require_backup();
    Database2.prototype.serialize = require_serialize();
    Database2.prototype.function = require_function();
    Database2.prototype.aggregate = require_aggregate();
    Database2.prototype.table = require_table();
    Database2.prototype.loadExtension = wrappers.loadExtension;
    Database2.prototype.exec = wrappers.exec;
    Database2.prototype.close = wrappers.close;
    Database2.prototype.defaultSafeIntegers = wrappers.defaultSafeIntegers;
    Database2.prototype.unsafeMode = wrappers.unsafeMode;
    Database2.prototype[util2.inspect] = require_inspect();
    module2.exports = Database2;
  }
});

// ../../node_modules/better-sqlite3/lib/index.js
var require_lib = __commonJS({
  "../../node_modules/better-sqlite3/lib/index.js"(exports2, module2) {
    "use strict";
    module2.exports = require_database();
    module2.exports.SqliteError = require_sqlite_error();
  }
});

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
var import_better_sqlite3 = __toESM(require_lib());
var logger2 = new Logger("db-sqlite");

// src/lib/db/db-helper.ts
var logger3 = new Logger("db-helper");

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

// src/api/encode-html.ts
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

// src/api/handle-status.ts
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

// src/api/simple-storage.ts
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
      logger5.error(`Processed path: ${path2}, error: ${e.message}`);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.write(
        JSON.stringify({
          status: "error",
          message: `Processed path: ${path2}, error: ${e.message}`
        })
      );
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
