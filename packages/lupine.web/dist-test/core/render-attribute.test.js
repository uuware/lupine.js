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

// src/core/render-attribute.test.ts
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

// src/core/camel-to-hyphens.ts
var camelToHyphens = function(name) {
  return name.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
};

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

// src/core/render-attribute.test.ts
(0, import_node_test.describe)("renderAttribute", () => {
  (0, import_node_test.it)("should generate a tag ID if missing and return the same ID subsequently", () => {
    const props = {};
    const id = genUniqueId(props);
    import_strict.default.equal(typeof id, "string");
    import_strict.default.ok(id.length > 0);
    import_strict.default.equal(props._id, id);
    import_strict.default.equal(genUniqueId(props), id, "Should reuse existing _id");
  });
  (0, import_node_test.it)("should filter out internal props like children, key, _result, _html", () => {
    const props = { children: [], key: "123", _result: {}, _html: [], name: "test" };
    const result = renderAttribute("div", props, null);
    import_strict.default.ok(!result.includes("children"));
    import_strict.default.ok(!result.includes("key="));
    import_strict.default.ok(result.includes('name="test"'));
  });
  (0, import_node_test.it)("should render inline style object efficiently via camelToHyphens", () => {
    const props = { style: { backgroundColor: "red", fontSize: "12px" } };
    const result = renderAttribute("div", props, null);
    import_strict.default.ok(result.includes('style="background-color:red;font-size:12px;"'));
  });
  (0, import_node_test.it)("should render style as a string directly if not an object", () => {
    const props = { style: "color: blue;" };
    const result = renderAttribute("div", props, null);
    import_strict.default.ok(result.includes('style="color: blue;"'));
  });
  (0, import_node_test.it)("should generate an ID for css and event handlers (onXXX)", () => {
    const props1 = { css: "body { color: red; }" };
    renderAttribute("div", props1, null);
    import_strict.default.ok(props1._id);
    const props2 = { onClick: () => {
    } };
    renderAttribute("button", props2, null);
    import_strict.default.ok(props2._id);
  });
  (0, import_node_test.it)("should convert boolean attributes correctly", () => {
    const props = { defaultChecked: true, readonly: true, disabled: false, selected: "selected" };
    const result = renderAttribute("input", props, null);
    import_strict.default.ok(result.includes('checked="true"'));
    import_strict.default.ok(result.includes('readonly="true"'));
    import_strict.default.ok(!result.includes("disabled="));
    import_strict.default.ok(result.includes('selected="selected"'));
  });
  (0, import_node_test.it)("should assign a ref ID and inject data-ref marker", () => {
    const fakeRef = { id: "" };
    const props = { ref: fakeRef };
    const result = renderAttribute("div", props, null);
    import_strict.default.ok(result.includes("data-ref"), "Should contain data-ref marker");
    import_strict.default.ok(fakeRef.id, "Should inject _id into ref");
    import_strict.default.equal(fakeRef.id, props._id);
  });
  (0, import_node_test.it)("should handle class and className joining, appending unique and global markers automatically", () => {
    const props = { className: "my-class", css: "body { }" };
    genUniqueId(props);
    const result = renderAttribute("div", props, null);
    import_strict.default.ok(result.includes(`class="${props._id} my-class"`));
  });
  (0, import_node_test.it)("should resolve ampersand & markers in classes with globalCssId and uniqueClassName", () => {
    const props = { class: "btn &-active" };
    const result = renderAttribute("div", props, null, "unique123", "global456");
    import_strict.default.ok(result.includes('class="btn global456-active unique123-active"'));
  });
  (0, import_node_test.it)("should resolve ampersand & markers with only global or only unique prefixes", () => {
    let result = renderAttribute("div", { class: "&-hover" }, null, void 0, "global-only");
    import_strict.default.ok(result.includes('class="global-only-hover"'));
    result = renderAttribute("div", { class: "&-hover" }, null, "unique-only", void 0);
    import_strict.default.ok(result.includes('class="unique-only-hover"'));
  });
});
