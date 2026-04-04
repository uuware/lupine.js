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

// src/core/camel-to-hyphens.test.ts
var import_node_test = require("node:test");
var import_strict = __toESM(require("node:assert/strict"));

// src/core/camel-to-hyphens.ts
var camelToHyphens = function(name) {
  return name.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
};

// src/core/camel-to-hyphens.test.ts
(0, import_node_test.describe)("camelToHyphens", () => {
  (0, import_node_test.it)("should convert standard camelCase to hyphens", () => {
    import_strict.default.equal(camelToHyphens("backgroundColor"), "background-color");
    import_strict.default.equal(camelToHyphens("fontSize"), "font-size");
  });
  (0, import_node_test.it)("should handle single lowercase word unchanged", () => {
    import_strict.default.equal(camelToHyphens("color"), "color");
    import_strict.default.equal(camelToHyphens("padding"), "padding");
  });
  (0, import_node_test.it)("should work with multiple uppercase letters consecutively (but note native conversion behavior vs standard)", () => {
    import_strict.default.equal(camelToHyphens("webkitTransition"), "webkit-transition");
    import_strict.default.equal(camelToHyphens("borderBottomWidth"), "border-bottom-width");
  });
  (0, import_node_test.it)("should convert PascalCase starting with uppercase", () => {
    import_strict.default.equal(camelToHyphens("WebkitTransition"), "-webkit-transition");
  });
});
