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

// src/lib/unique-id.test.ts
(0, import_node_test.describe)("uniqueIdGenerator", () => {
  (0, import_node_test.afterEach)(() => {
    import_node_test.mock.restoreAll();
  });
  (0, import_node_test.it)("should increment count within the same second (enters the else branch)", () => {
    const initialTimeMs = 1e6 * 1e3;
    import_node_test.mock.method(Date, "now", () => initialTimeMs);
    const generateId = uniqueIdGenerator("prefix-");
    const id1 = generateId();
    import_strict.default.equal(id1, "prefix-00");
    const id2 = generateId();
    import_strict.default.equal(id2, "prefix-01");
    const id3 = generateId();
    import_strict.default.equal(id3, "prefix-02");
  });
  (0, import_node_test.it)("should reset count when the second changes (enters the key !== lastKey branch)", () => {
    let currentTimeMs = 1e6 * 1e3;
    import_node_test.mock.method(Date, "now", () => currentTimeMs);
    const generateId = uniqueIdGenerator("my-");
    import_strict.default.equal(generateId(), "my-00");
    import_strict.default.equal(generateId(), "my-01");
    currentTimeMs += 2e3;
    const newId = generateId();
    import_strict.default.equal(newId, "my-20");
    import_strict.default.equal(generateId(), "my-21");
  });
});
