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
    var fs5 = require("fs");
    var path2 = require("path");
    var fileURLToPath = require_file_uri_to_path();
    var join = path2.join;
    var dirname = path2.dirname;
    var exists = fs5.accessSync && function(path3) {
      try {
        fs5.accessSync(path3);
      } catch (e) {
        return false;
      }
      return true;
    } || fs5.existsSync || path2.existsSync;
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
    exports2.exec = function exec2(sql) {
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
    var fs5 = require("fs");
    var path2 = require("path");
    var { promisify } = require("util");
    var { cppdb } = require_util();
    var fsAccess = promisify(fs5.access);
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
    var fs5 = require("fs");
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
      if (!anonymous && !fs5.existsSync(path2.dirname(filename))) {
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
    var fs5 = require("fs/promises");
    var path2 = require("path");
    exports2.readFile = async (filePath) => {
      try {
        const text = await fs5.readFile(filePath, "utf-8");
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
    var AppSharedStorageWebPrefix2 = "WEB.";
    exports2.getWebConfig = (allConfig) => {
      const result = {};
      for (const key of Object.keys(allConfig)) {
        if (key.startsWith(AppSharedStorageWebPrefix2)) {
          result[key.substring(AppSharedStorageWebPrefix2.length)] = allConfig[key];
        }
      }
      return result;
    };
  }
});

// src/app/web-server.test.ts
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

// src/app/web-listener.ts
var import_crypto3 = __toESM(require("crypto"));

// src/lib/utils/cookie-util.ts
var parseCookies = (str) => {
  let rx = /([^;=\s]*)=([^;]*)/g;
  let obj = {};
  if (str) {
    for (let m; m = rx.exec(str); ) {
      try {
        obj[m[1]] = decodeURIComponent(m[2]);
      } catch (error) {
        console.error("parseCookies error for: " + m[2], error);
      }
    }
  }
  return obj;
};
var serializeCookie = (name, value, options) => {
  const expires = new Date((/* @__PURE__ */ new Date()).getTime() + options.expireDays * 24 * 36e5);
  const cookiePair = name + "=" + encodeURIComponent(value) + "; Expires=" + expires.toUTCString() + "; Path=" + (options.path ? options.path : "/") + (options.domain ? "; Domain=" + options.domain : "") + (options.httpOnly ? "; HttpOnly" : "") + (options.Partitioned ? "; Partitioned" : "") + (options.sameSite ? "; SameSite=" + options.sameSite : "") + (options.secure ? "; Secure" : "");
  return cookiePair;
};

// src/models/app-cache-props.ts
var _savedCache = {
  appCache: null
};
var getAppCache = () => {
  return _savedCache.appCache;
};

// src/models/app-shared-storage-props.ts
var AppSharedStorageMessageId = "AppSharedStorage";

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

// src/admin-api/admin-csv.ts
var logger5 = new Logger("admin-csv");

// src/admin-api/admin-db.ts
var logger6 = new Logger("admin-db");

// src/admin-api/admin-menu.ts
var logger7 = new Logger("admin-menu");

// src/admin-api/admin-auth.ts
var logger8 = new Logger("admin-auth");

// src/app/web-processor.ts
var logger9 = new Logger("web-processor");
var WebProcessor = class _WebProcessor {
  static debugPath;
  static debugHandler;
  static enableDev(path2, debugHandler) {
    _WebProcessor.debugPath = path2;
    _WebProcessor.debugHandler = debugHandler;
  }
  async processRequest(store, req, res) {
    if (_WebProcessor.debugHandler && _WebProcessor.debugPath && req.locals.urlWithoutQuery.startsWith(_WebProcessor.debugPath)) {
      await _WebProcessor.debugHandler(req, res, req.locals.urlWithoutQuery);
      return true;
    }
    try {
      const _lupineApi = getAppCache().get(store.appName, "API_MODULE" /* API_MODULE */);
      if (_lupineApi && _lupineApi.processApi) {
        const result = await _lupineApi.processApi(store, store.locals.urlWithoutQuery, req, res);
        if (result) {
          return true;
        }
      } else {
        logger9.error(`url: ${store.locals.url}, appName: ${store.appName}, no api module found`);
      }
    } catch (e) {
      logger9.error(`url: ${store.locals.url}, appName: ${store.appName}, process api error: `, e.message);
    }
    handler404(res, `Request is not processed, url: ${req.locals.url}`);
    return true;
  }
};

// src/app/app-shared-storage.ts
var import_cluster = __toESM(require("cluster"));

// src/api/mini-web-socket.ts
var import_crypto2 = __toESM(require("crypto"));
var WEBSOCKET_GUID = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
var MASK_KEY_BYTES_LENGTH = 4;
var OPCODE_CONTINUATION = 0;
var OPCODE_TEXT = 1;
var OPCODE_BINARY = 2;
var OPCODE_CLOSE = 8;
var OPCODE_PING = 9;
var OPCODE_PONG = 10;
var MiniWebSocket = class {
  clientRefreshFlag = Date.now();
  clients = /* @__PURE__ */ new Set();
  _onMessage;
  _onClose;
  constructor(onMessage, onClose) {
    this._onMessage = onMessage;
    this._onClose = onClose;
  }
  handleUpgrade(req, socket, head) {
    const key = req.headers["sec-websocket-key"];
    const upgrade = (req.headers.upgrade || "").toString().toLowerCase();
    const connection = (req.headers.connection || "").toString().toLowerCase();
    if (!key || upgrade !== "websocket" || !connection.includes("upgrade")) {
      socket.write("HTTP/1.1 400 Bad Request\r\n\r\n");
      socket.destroy();
      return;
    }
    const cleanup = (socket2, status) => {
      if (this.clients.has(socket2)) this.clients.delete(socket2);
      if (!socket2.destroyed) socket2.destroy();
      if (this._onClose) this._onClose(socket2, status);
    };
    this.clients.add(socket);
    socket.on("close", () => cleanup(socket, "close"));
    socket.on("error", () => cleanup(socket, "error"));
    socket.on("end", () => cleanup(socket, "end"));
    socket.write(this.handleHeaders(key));
    let buffer = head && head.length ? Buffer.from(head) : Buffer.alloc(0);
    const onData = (chunk) => {
      buffer = Buffer.concat([buffer, chunk]);
      parseFrames();
    };
    const parseFrames = () => {
      while (true) {
        if (buffer.length < 2) return;
        const firstByte = buffer[0];
        const secondByte = buffer[1];
        const fin = (firstByte & 128) !== 0;
        const rsv = firstByte & 112;
        const opcode = firstByte & 15;
        const masked = (secondByte & 128) !== 0;
        let payloadLen = secondByte & 127;
        let offset = 2;
        if (rsv !== 0 || !masked) {
          this.sendClose(socket, 1002);
          cleanup(socket, "protocol error");
          return;
        }
        if (!fin && opcode !== OPCODE_CONTINUATION) {
          this.sendClose(socket, 1003);
          cleanup(socket, "unsupported opcode");
          return;
        }
        if (payloadLen === 126) {
          if (buffer.length < offset + 2) return;
          payloadLen = buffer.readUInt16BE(offset);
          offset += 2;
        } else if (payloadLen === 127) {
          if (buffer.length < offset + 8) return;
          payloadLen = buffer.readUInt32BE(offset + 4);
          offset += 8;
        }
        const needed = offset + MASK_KEY_BYTES_LENGTH + payloadLen;
        if (buffer.length < needed) return;
        const maskKey = buffer.slice(offset, offset + MASK_KEY_BYTES_LENGTH);
        offset += MASK_KEY_BYTES_LENGTH;
        let payload = buffer.slice(offset, offset + payloadLen);
        for (let i = 0; i < payload.length; i++) {
          payload[i] ^= maskKey[i % MASK_KEY_BYTES_LENGTH];
        }
        buffer = buffer.slice(needed);
        switch (opcode) {
          case OPCODE_TEXT: {
            const text = payload.toString("utf8");
            try {
              this._onMessage(text, socket);
            } catch {
            }
            break;
          }
          case OPCODE_BINARY: {
            this.sendClose(socket, 1003);
            cleanup(socket, "unsupported binary");
            return;
          }
          case OPCODE_PING: {
            this.safeWrite(socket, this.encodeFrame(payload, OPCODE_PONG));
            break;
          }
          case OPCODE_PONG: {
            break;
          }
          case OPCODE_CLOSE: {
            let code = 1e3;
            if (payload.length >= 2) {
              code = payload.readUInt16BE(0);
            }
            this.sendClose(socket, code);
            setTimeout(() => {
              try {
                socket.end();
              } catch {
              }
              cleanup(socket, "close");
            }, 20);
            return;
          }
          case OPCODE_CONTINUATION: {
            this.sendClose(socket, 1003);
            cleanup(socket, "unsupported continuation");
            return;
          }
          default: {
            this.sendClose(socket, 1002);
            cleanup(socket, "unknown opcode");
            return;
          }
        }
      }
    };
    socket.on("data", onData);
  }
  handleHeaders(key) {
    const acceptKey = import_crypto2.default.createHash("sha1").update(key + WEBSOCKET_GUID).digest("base64");
    const headers = [
      "HTTP/1.1 101 Switching Protocols",
      // 'Content-Type: text/html',
      "Upgrade: websocket",
      "Connection: Upgrade",
      `Sec-WebSocket-Accept: ${acceptKey}`,
      "\r\n"
    ];
    return headers.join("\r\n");
  }
  broadcast(msg) {
    const payload = Buffer.from(msg);
    const frame = this.encodeFrame(payload, OPCODE_TEXT);
    for (const socket of this.clients) {
      this.safeWrite(socket, frame);
    }
  }
  sendMessage(socket, msg) {
    const payload = Buffer.from(msg);
    this.safeWrite(socket, this.encodeFrame(payload, OPCODE_TEXT));
  }
  encodeFrame(payload, opcode) {
    const len = payload.length;
    if (len <= 125) {
      const header2 = Buffer.from([128 | opcode, len]);
      return Buffer.concat([header2, payload]);
    }
    if (len < 65536) {
      const header2 = Buffer.allocUnsafe(4);
      header2[0] = 128 | opcode;
      header2[1] = 126;
      header2.writeUInt16BE(len, 2);
      return Buffer.concat([header2, payload]);
    }
    const header = Buffer.allocUnsafe(10);
    header[0] = 128 | opcode;
    header[1] = 127;
    header.writeUInt32BE(0, 2);
    header.writeUInt32BE(len, 6);
    return Buffer.concat([header, payload]);
  }
  sendClose(socket, code = 1e3) {
    const payload = Buffer.allocUnsafe(2);
    payload.writeUInt16BE(code, 0);
    this.safeWrite(socket, this.encodeFrame(payload, OPCODE_CLOSE));
  }
  safeWrite(socket, data) {
    try {
      if (!socket.destroyed) socket.write(data);
    } catch {
    }
  }
  close(socket, code = 1e3) {
    this.sendClose(socket, code);
    setTimeout(() => {
      try {
        socket.end();
      } catch {
      }
    }, 20);
  }
  closeAll(code = 1e3) {
    for (const s of this.clients) {
      this.close(s, code);
    }
  }
};

// src/api/shell-service.ts
var import_child_process = require("child_process");
var import_os = __toESM(require("os"));
var ShellService = class _ShellService {
  _shell;
  _socket;
  _miniWebSocket;
  constructor(socket, miniWebSocket) {
    this._socket = socket;
    this._miniWebSocket = miniWebSocket;
    try {
      const shellCmd = _ShellService.getDefaultShell();
      this._shell = (0, import_child_process.spawn)(shellCmd, [], {
        stdio: ["pipe", "pipe", "pipe"]
      });
    } catch (error) {
      console.error(error);
      this._miniWebSocket.sendMessage(this._socket, JSON.stringify({ error }));
      return;
    }
    this._shell.stdout.on("data", (data) => {
      this._miniWebSocket.sendMessage(this._socket, data.toString());
    });
    this._shell.stderr.on("data", (data) => {
      this._miniWebSocket.sendMessage(this._socket, data.toString());
    });
    this._shell.on("exit", (code, signal) => {
      this._miniWebSocket.sendMessage(this._socket, `Shell exited with code ${code}, signal ${signal}`);
      this._shell = void 0;
    });
  }
  static getDefaultShell() {
    const platform = import_os.default.platform();
    if (platform === "win32") {
      return process.env.COMSPEC || "cmd.exe";
    }
    return process.env.SHELL || "bash";
  }
  stop() {
    this._shell?.kill();
    this._shell = void 0;
  }
  isRunning() {
    return this._shell !== void 0;
  }
  getShell() {
    return this._shell;
  }
  cmd(cmd) {
    if (this._shell && this._shell.stdin.writable) {
      this._shell.stdin.write(cmd + "\n");
    } else {
      this._miniWebSocket.sendMessage(this._socket, "Shell is not available.");
    }
  }
  static async directCmd(cmd) {
    return new Promise((resolve) => {
      (0, import_child_process.exec)(cmd, { shell: this.getDefaultShell() }, (error, stdout, stderr) => {
        resolve(stdout + stderr);
      });
    });
  }
};

// src/api/debug-service.ts
var DebugService = class _DebugService {
  static clientRefreshFlag = Date.now();
  static miniWebSocket = new MiniWebSocket(this.onMessage.bind(this));
  static shellMap = /* @__PURE__ */ new Map();
  static onMessage(msg, socket) {
    try {
      const json = JSON.parse(msg);
      if (json.message === "get-flag") {
        this.miniWebSocket.sendMessage(
          socket,
          JSON.stringify({
            message: "flag",
            flag: _DebugService.clientRefreshFlag
          })
        );
      } else if (json.message === "shell") {
        console.log(json);
        let shell;
        if (this.shellMap.has(socket)) {
          shell = this.shellMap.get(socket);
        } else {
          shell = new ShellService(socket, this.miniWebSocket);
          this.shellMap.set(socket, shell);
          socket.on("close", () => {
            shell.stop();
            this.shellMap.delete(socket);
          });
        }
        shell.cmd(json.cmd);
      }
    } catch (error) {
      console.error(error);
    }
  }
  static handleUpgrade(req, socket, head) {
    this.miniWebSocket.handleUpgrade(req, socket, head);
  }
  // broadcast to all frontend clients
  static broadcastRefresh() {
    console.log(`${process.pid} - broadcast refresh request to clients.`);
    this.clientRefreshFlag = Date.now();
    const msg = { message: "Refresh", flag: this.clientRefreshFlag };
    this.miniWebSocket.broadcast(JSON.stringify(msg));
  }
};

// src/app/process-dev-requests.ts
var logger10 = new Logger("process-dev-requests");

// src/app/app-message.ts
var logger11 = new Logger("app-message");

// src/app/app-shared-storage.ts
var AppSharedStorageWorker = class _AppSharedStorageWorker {
  static handleMap = {};
  static logger = new Logger("server-config");
  static messageFromPrimaryProcess(msgObject) {
    if (import_cluster.default.isPrimary || !msgObject.action || !msgObject.key || !msgObject.uniqueKey) {
      console.error("AppSharedStorageWorker got wrong message: ", msgObject);
      return;
    }
    if (msgObject.action === "get") {
      const value = msgObject.value;
      const map = this.handleMap[msgObject.uniqueKey];
      delete this.handleMap[msgObject.uniqueKey];
      if (map) {
        map.resolve(value);
      } else {
        throw new Error(`Unknown uniqueKey: ${msgObject.uniqueKey}`);
      }
    } else if (msgObject.action === "getWithPrefix") {
      console.log(`${process.pid} - AppStorage get value end for key: ${msgObject.key}`);
      const value = JSON.parse(msgObject.value);
      const map = this.handleMap[msgObject.uniqueKey];
      delete this.handleMap[msgObject.uniqueKey];
      if (map) {
        map.resolve(value);
      } else {
        throw new Error(`Unknown uniqueKey: ${msgObject.uniqueKey}`);
      }
    } else {
      this.logger.warn(`Unknown message: ${msgObject.action}`);
    }
  }
  static async load(appName, rootPath) {
    if (import_cluster.default.isPrimary) {
      throw new Error("AppSharedStorageWorker should be only called from workers");
    }
    const obj = {
      id: AppSharedStorageMessageId,
      pid: process.pid,
      workerId: import_cluster.default.worker?.id || 0,
      action: "load",
      appName,
      rootPath,
      key: "load"
    };
    process.send(obj);
  }
  static async save(appName) {
    if (import_cluster.default.isPrimary) {
      throw new Error("AppSharedStorageWorker should be only called from workers");
    }
    const obj = {
      id: AppSharedStorageMessageId,
      pid: process.pid,
      workerId: import_cluster.default.worker?.id || 0,
      action: "save",
      appName: appName || "",
      key: "save"
    };
    process.send(obj);
  }
  static get(appName, key, resolve, reject) {
    if (import_cluster.default.isPrimary) {
      throw new Error("AppSharedStorageWorker should be only called from workers");
    }
    const uniqueKey = key + ":" + crypto.randomUUID();
    _AppSharedStorageWorker.handleMap[uniqueKey] = { resolve, reject };
    const obj = {
      id: AppSharedStorageMessageId,
      pid: process.pid,
      workerId: import_cluster.default.worker?.id || 0,
      action: "get",
      appName,
      uniqueKey,
      key
    };
    process.send(obj);
  }
  static getWithPrefix(appName, prefixKey, resolve, reject) {
    if (import_cluster.default.isPrimary) {
      throw new Error("AppSharedStorageWorker should be only called from workers");
    }
    const uniqueKey = prefixKey + ":" + crypto.randomUUID();
    _AppSharedStorageWorker.handleMap[uniqueKey] = { resolve, reject };
    const obj = {
      id: AppSharedStorageMessageId,
      pid: process.pid,
      workerId: import_cluster.default.worker?.id || 0,
      action: "getWithPrefix",
      appName,
      uniqueKey,
      key: prefixKey
    };
    process.send(obj);
  }
  static set(appName, key, value) {
    if (import_cluster.default.isPrimary) {
      throw new Error("AppSharedStorageWorker should be only called from workers");
    }
    const obj = {
      id: AppSharedStorageMessageId,
      pid: process.pid,
      workerId: import_cluster.default.worker?.id || 0,
      action: "set",
      appName,
      key,
      value
    };
    process.send(obj);
  }
};

// src/app/host-to-path.ts
var logger12 = new Logger("HostToPath");
var HostToPath = class {
  static props = [];
  // this should be initialized before any request
  static setHostToPathList(props) {
    this.props = props;
  }
  static findHostPath(host) {
    for (let key in this.props) {
      if (this.props[key].webPath && this.props[key].hosts.includes(host)) {
        logger12.debug(`Found ${host} in `, this.props[key].hosts);
        return this.props[key];
      }
    }
    for (let key in this.props) {
      for (let domain in this.props[key].hosts) {
        if (this.props[key].webPath && (host === this.props[key].hosts[domain] || host.endsWith("." + this.props[key].hosts[domain]))) {
          logger12.debug(`Found ${host} in `, this.props[key].hosts);
          return this.props[key];
        }
      }
    }
    for (let key in this.props) {
      if (this.props[key].webPath && this.props[key].hosts.length === 0) {
        logger12.debug(`Not found ${host} from any domains and use default app: ${this.props[key].appName}`);
        return this.props[key];
      }
    }
    return;
  }
};

// src/admin-api/web-config-api.ts
var logger13 = new Logger("web-cfg-api");

// src/admin-api/admin-api.ts
var logger14 = new Logger("admin-api");

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
var handler403 = (res, msg, contentType) => {
  handlerResponse(res, 403, "403 Forbidden", msg, contentType);
};
var handler404 = (res, msg, contentType) => {
  handlerResponse(res, 404, "404 Not Found", msg, contentType);
};
var handler500 = (res, msg, contentType) => {
  handlerResponse(res, 500, "500 Internal Server Error", msg, contentType);
};
var handler503 = (res, msg, contentType) => {
  handlerResponse(res, 503, "503 Service Unavailable", msg, contentType);
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
var logger15 = new Logger("api-router");

// src/lib/runtime-require.ts
var fs3 = require("fs/promises");
var vm = require("vm");

// src/api/server-render.ts
var logger16 = new Logger("server-render");

// src/app/web-listener.ts
var logger17 = new Logger("listener");
var MAX_REQUEST_SIZE = 1024 * 1024 * 5;
var MAX_REQUEST_COUNT = 100;
var REQUEST_COUNT = 0;
var REQUEST_TIMEOUT = 1e3 * 30;
var accessControlAllowHosts = [];
var SERVER_NAME = "nginx/1.19.2";
var lastRequestTime = (/* @__PURE__ */ new Date()).getTime();
var WebListener = class {
  // process requests before business logic, for example IP filter, rate limit, etc.
  rawMiddlewares;
  processor;
  constructor(processRequest) {
    this.rawMiddlewares = [];
    this.processor = processRequest;
  }
  addRawMiddlewareChain(middleware) {
    this.rawMiddlewares.push(middleware);
  }
  runMiddlewareChain(list, context) {
    const dispatch = async (i) => {
      const fn = list[i];
      if (!fn) return;
      await fn(context.req, context.res, () => dispatch(i + 1));
    };
    return dispatch(0);
  }
  async listener(reqOrigin, res) {
    if ((/* @__PURE__ */ new Date()).getTime() - lastRequestTime > 1e3 * 60 * 10) {
      if (REQUEST_COUNT != 0) {
        logger17.warn(`!!!!!!!!!! ========== REQUEST_COUNT is not counted properly: ${REQUEST_COUNT}`);
      }
      REQUEST_COUNT = 0;
      lastRequestTime = (/* @__PURE__ */ new Date()).getTime();
    }
    if (REQUEST_COUNT > MAX_REQUEST_COUNT) {
      logger17.warn(`Too many requests, count: ${REQUEST_COUNT} > ${MAX_REQUEST_COUNT}`);
      handler503(res, "Server is busy, please retry later.");
      return;
    }
    await this.runMiddlewareChain(this.rawMiddlewares, { req: reqOrigin, res });
    if (res.writableEnded || res.headersSent) {
      return;
    }
    const uuid = import_crypto3.default.randomUUID();
    const url = reqOrigin.url || "";
    const requestInfo = `uuid: ${uuid}, Access url: ${url}`;
    const req = reqOrigin;
    const host = (req.headers.host || "").split(":")[0];
    const hostPath = HostToPath.findHostPath(host);
    if (!hostPath || !hostPath.webPath || !hostPath.appName) {
      const msg = `Web root is not defined properly for host: ${host}.`;
      logger17.error(msg);
      handler404(res, msg);
      return;
    }
    REQUEST_COUNT++;
    logger17.debug(
      `Request started. Count: ${REQUEST_COUNT}, Log uuid: ${uuid}, access: ${req.headers.host}, url: ${url}, time: ${(/* @__PURE__ */ new Date()).toISOString()}, from: ${req.socket.remoteAddress}`
    );
    const urlSplit = url.split("?");
    req.setTimeout(REQUEST_TIMEOUT);
    req.on("timeout", () => {
      REQUEST_COUNT--;
      logger17.warn("timeout");
      req.destroy(new Error("timeout handling"));
    });
    const jsonFn = () => {
      if (!req.locals._json && req.locals.body) {
        const sBody = req.locals.body.toString();
        if (!sBody) {
          req.locals._json = void 0;
        } else {
          try {
            req.locals._json = JSON.parse(sBody);
          } catch (err) {
            logger17.warn(`JSON.parse error: ${err.message}`);
          }
        }
      }
      return req.locals._json;
    };
    const cookiesFn = () => {
      if (!req.locals._cookies) {
        req.locals._cookies = new SimpleStorage(req.headers ? parseCookies(req.headers.cookie) : {});
      }
      return req.locals._cookies;
    };
    const setCookieFn = (name, value, options) => {
      const cookies = [];
      const cookiesOld = res.getHeader("Set-Cookie");
      if (cookiesOld) {
        if (!Array.isArray(cookiesOld)) {
          cookies.push(cookiesOld);
        } else {
          cookies.push(...cookiesOld);
        }
      }
      const cookiePair = serializeCookie(name, value, options);
      cookies.push(cookiePair);
      res.setHeader("Set-Cookie", cookies);
      const localCookies = req.locals.cookies();
      localCookies.set(name, value);
    };
    req.locals = {
      uuid,
      host,
      url,
      hostPath,
      // urlSections: urlSplit[0].split('/').filter((i) => !!i),
      query: new URLSearchParams(urlSplit[1] || ""),
      urlWithoutQuery: urlSplit[0],
      urlParameters: new SimpleStorage({}),
      body: void 0,
      json: jsonFn,
      cookies: cookiesFn,
      setCookie: setCookieFn,
      clearCookie: (name) => {
        res.setHeader("Set-Cookie", `${name}=; max-age=0`);
      }
    };
    let bigRequest = false;
    let totalLength = 0;
    const bodyData = [];
    req.on("error", (err) => {
      REQUEST_COUNT--;
      logger17.error(`${requestInfo}, count: ${REQUEST_COUNT}, Request Error: `, err);
      handler500(res, `listener error: ${err && err.message}`);
    });
    req.on("data", (chunk) => {
      totalLength += chunk.length;
      logger17.debug(`${requestInfo}, Request data length: ${chunk.length}, total: ${totalLength}`);
      if (!bigRequest && totalLength < MAX_REQUEST_SIZE) {
        bodyData.push(chunk);
      } else {
        if (!bigRequest) {
          bigRequest = true;
          logger17.warn(`Warn, request data is too big: ${totalLength} > ${MAX_REQUEST_SIZE}`);
        }
        req.socket.destroy();
      }
    });
    req.on("end", async () => {
      try {
        if (bigRequest) {
          logger17.warn(`Request data is too big to process, url: ${req.locals.url}`);
          handler403(res, `Request data is too big to process, url: ${req.locals.url}`);
          return;
        }
        const body = Buffer.concat(bodyData);
        const contentType = req.headers["content-type"];
        logger17.debug(`url: ${url}, Request body length: ${body.length}, contentType: ${contentType}`);
        req.locals.body = body;
        res.setHeader("Server", SERVER_NAME);
        if (accessControlAllowHosts.includes(host)) {
          const allowOrigin = req.headers.origin && req.headers.origin !== "null" ? req.headers.origin : "*";
          res.setHeader("Access-Control-Allow-Origin", allowOrigin);
          res.setHeader("Access-Control-Allow-Credentials", "true");
        }
        const store = {
          uuid,
          hostPath,
          appName: hostPath.appName,
          locals: req.locals,
          lang: req.locals.cookies().get("lang", "en") || "en"
        };
        await this.processor.processRequest(store, req, res);
      } finally {
        REQUEST_COUNT--;
      }
    });
  }
};

// src/app/web-server.ts
var fs4 = __toESM(require("fs"));
var http = __toESM(require("http"));
var https = __toESM(require("https"));
var tls = __toESM(require("tls"));
var import_cluster2 = __toESM(require("cluster"));
var logger18 = new Logger("web-server");
var WebServer = class {
  webListener;
  httpsServer;
  httpsServerConfig = {};
  secureContexts = {};
  upgradeHandlers = [];
  constructor(webListener) {
    this.webListener = webListener || new WebListener(new WebProcessor());
  }
  onUpgrade(path2, handler) {
    this.upgradeHandlers.push({ path: path2, handler });
  }
  handleUpgrade(req, socket, head) {
    const clientIp = `${socket.remoteAddress}:${socket.remotePort}`;
    let matched = false;
    for (const item of this.upgradeHandlers) {
      if (req.url && (item.path === "*" || req.url === item.path || req.url.startsWith(item.path + "/"))) {
        logger18.debug(`Upgrade WebSocket access: ${req.url} from ${clientIp} matched ${item.path}.`);
        item.handler(req, socket, head);
        matched = true;
        break;
      }
    }
    if (!matched) {
      logger18.error(`Unexpected web socket access: ${req.url} from ${clientIp}`);
      socket.write("HTTP/1.1 404 Not Found\r\n\r\n");
      socket.destroy();
    }
  }
  async listenerWrap(reqOrigin, res) {
    try {
      await this.webListener.listener.bind(this.webListener)(reqOrigin, res);
    } catch (err) {
      console.error("Request error:", err);
      if (!res.headersSent && !res.destroyed && res.writable) {
        res.statusCode = 500;
        res.end("Internal Server Error");
      }
    }
  }
  startHttp(httpPort, bindIp, timeout) {
    const httpServer = http.createServer(this.listenerWrap.bind(this));
    if (typeof timeout === "number") httpServer.setTimeout(timeout);
    httpServer.on("upgrade", this.handleUpgrade.bind(this));
    httpServer.listen(httpPort, bindIp, () => {
      logger18.info(`Http Server ${import_cluster2.default.worker ? import_cluster2.default.worker.id : -1} is started: http://localhost:${httpPort}`);
    });
    httpServer.on("error", (error) => {
      logger18.error("Error occurred on http server", error);
    });
    return httpServer;
  }
  // multi domain https hosting
  // https://stackoverflow.com/questions/38162077/expressjs-multi-domain-https-hosting
  // domainCerts = {
  //   'example.com': {
  //     key: fs.readFileSync(sslKeyPath, 'utf8'),
  //     cert: fs.readFileSync(sslCrtPath, 'utf8'),
  //   },
  // };
  reloadCertificates() {
    const { sslKeyPath, sslCrtPath, domainCerts } = this.httpsServerConfig;
    if (this.httpsServer && sslKeyPath && fs4.existsSync(sslKeyPath) && sslCrtPath && fs4.existsSync(sslCrtPath)) {
      try {
        const key = fs4.readFileSync(sslKeyPath, "utf8");
        const cert = fs4.readFileSync(sslCrtPath, "utf8");
        this.httpsServer.setSecureContext({ key, cert });
        logger18.info("Reloaded default SSL certificate manually via hot context rendering.");
      } catch (err) {
        logger18.error("Failed to reload default certificate", err);
      }
    }
    if (domainCerts) {
      const start = Date.now();
      let certCount = 0;
      const fileCache = /* @__PURE__ */ new Map();
      const getFileContent = (path2) => {
        if (!fileCache.has(path2)) {
          fileCache.set(path2, fs4.readFileSync(path2, "utf8"));
        }
        return fileCache.get(path2);
      };
      const newSecureContexts = {};
      for (const [domain, paths] of Object.entries(domainCerts)) {
        if (paths.key && paths.cert && fs4.existsSync(paths.key) && fs4.existsSync(paths.cert)) {
          try {
            const key = getFileContent(paths.key);
            const cert = getFileContent(paths.cert);
            newSecureContexts[domain] = tls.createSecureContext({ key, cert });
            certCount++;
          } catch (err) {
            logger18.error(`Failed to load cert for ${domain}`, err);
          }
        }
      }
      this.secureContexts = newSecureContexts;
      logger18.info(`Loaded ${certCount} domain scopes into thermal TLS cache in ${Date.now() - start}ms`);
    } else {
      this.secureContexts = {};
    }
  }
  startHttps(httpsPort, bindIp, sslKeyPath, sslCrtPath, domainCerts, timeout) {
    this.httpsServerConfig = { sslKeyPath, sslCrtPath, domainCerts };
    const httpsOptions = {};
    if (sslKeyPath && fs4.existsSync(sslKeyPath) && sslCrtPath && fs4.existsSync(sslCrtPath)) {
      logger18.info("Load site ssl certificate.");
      httpsOptions["key"] = fs4.readFileSync(sslKeyPath, "utf8");
      httpsOptions["cert"] = fs4.readFileSync(sslCrtPath, "utf8");
      httpsOptions.SNICallback = (domain, cb) => {
        let ctx = this.secureContexts[domain];
        if (!ctx) {
          const parts = domain.split(".");
          while (parts.length > 0 && !ctx) {
            parts.shift();
            const parent = parts.join(".");
            if (parent) ctx = this.secureContexts[parent];
          }
        }
        if (ctx) {
          cb(null, ctx);
        } else {
          cb(null, void 0);
        }
      };
    } else {
      logger18.warn(
        `Ssl certificate is not defined or doesn't exist, key file: ${sslKeyPath}, certificate file: ${sslCrtPath}`
      );
    }
    const httpsServer = https.createServer(httpsOptions, this.listenerWrap.bind(this));
    this.httpsServer = httpsServer;
    this.reloadCertificates();
    httpsServer.on("upgrade", this.handleUpgrade.bind(this));
    if (typeof timeout === "number") {
      httpsServer.setTimeout(timeout);
    }
    httpsServer.listen(httpsPort, bindIp, () => {
      logger18.info(`Https Server ${import_cluster2.default.worker ? import_cluster2.default.worker.id : -1} is started: https://localhost:${httpsPort}`);
    });
    httpsServer.on("error", (error) => {
      logger18.error("Error occurred on https server", error);
    });
    return httpsServer;
  }
};

// src/app/web-server.test.ts
(0, import_node_test.describe)("WebServer Multi-Domain SNI Configuration", () => {
  (0, import_node_test.afterEach)(() => {
    import_node_test.mock.restoreAll();
  });
  (0, import_node_test.it)("should accurately resolve exact and fallback domain certificates without network bindings", (t) => {
    import_node_test.mock.method(require("fs"), "existsSync", () => true);
    import_node_test.mock.method(require("fs"), "readFileSync", (path2) => `MOCK_DATA_${path2}`);
    import_node_test.mock.method(require("tls"), "createSecureContext", (options) => {
      return { _mockId: options.cert };
    });
    let capturedSNICallback = null;
    import_node_test.mock.method(require("https"), "createServer", (options) => {
      capturedSNICallback = options.SNICallback;
      return {
        on: () => {
        },
        listen: () => {
        },
        setTimeout: () => {
        }
        // fake server bindings
      };
    });
    const server = new WebServer();
    server.startHttps(
      443,
      "0.0.0.0",
      "default.key",
      "default.crt",
      {
        "example.com": { key: "ex.key", cert: "ex.crt" },
        "app.org": { key: "app.key", cert: "app.crt" }
      }
    );
    import_strict.default.ok(capturedSNICallback, "SNI callback must be registered to core HTTPS options");
    const verifySNI = (requestDomain) => {
      let resolvedCtx = void 0;
      capturedSNICallback(requestDomain, (err, ctx) => {
        resolvedCtx = ctx;
      });
      return resolvedCtx ? resolvedCtx._mockId : void 0;
    };
    import_strict.default.equal(verifySNI("example.com"), "MOCK_DATA_ex.crt", "Exact domain MUST match its corresponding certificate");
    import_strict.default.equal(verifySNI("app.org"), "MOCK_DATA_app.crt");
    import_strict.default.equal(verifySNI("api.example.com"), "MOCK_DATA_ex.crt", "Subdomains MUST fallback to root site domain certs");
    import_strict.default.equal(verifySNI("www.dev.app.org"), "MOCK_DATA_app.crt", "Deep nested subdomains MUST fallback transitively");
    import_strict.default.equal(verifySNI("stranger.io"), void 0, "Unmatched domains MUST fallback to default server behavior");
  });
});
