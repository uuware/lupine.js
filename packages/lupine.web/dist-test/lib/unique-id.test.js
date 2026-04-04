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

// src/lib/unique-id.test.ts
var import_node_test = require("node:test");
var import_strict = __toESM(require("node:assert/strict"));

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

// src/lib/unique-id.test.ts
(0, import_node_test.describe)("uniqueIdGenerator", () => {
  let currentTimeMs;
  (0, import_node_test.beforeEach)(() => {
    currentTimeMs = 1775190809080;
    import_node_test.mock.method(Date, "now", () => currentTimeMs);
  });
  (0, import_node_test.afterEach)(() => {
    import_node_test.mock.restoreAll();
  });
  (0, import_node_test.it)("should increment count within the same second (enters the else branch)", () => {
    const generateId = uniqueIdGenerator("prefix-");
    import_strict.default.equal(generateId(), "prefix-00");
    import_strict.default.equal(generateId(), "prefix-01");
    import_strict.default.equal(generateId(), "prefix-02");
  });
  (0, import_node_test.it)("should reset count when the second changes (enters the key !== lastKey branch)", () => {
    const generateId = uniqueIdGenerator("my-");
    import_strict.default.equal(generateId(), "my-00");
    import_strict.default.equal(generateId(), "my-01");
    currentTimeMs += 2e3;
    import_strict.default.equal(generateId(), "my-20");
    import_strict.default.equal(generateId(), "my-21");
  });
});
