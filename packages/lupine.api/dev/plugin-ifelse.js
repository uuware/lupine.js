/*
Esbuild plugin for conditional code logic

A sample:
#if TEST || DEBUG
console.log('test');
#elseif PROD
console.log('prod');
#else
console.log('not test');
#endif


#if DEV
#endif


*/
const fs = require('fs/promises');
const path = require('path');

const _saved = {
  vars: [],
  baseDir: '',
  exclude: [],
};

const LINE_FLAG = {
  code: 0,
  if: 1,
  else: 2,
  endif: 3,
};

const ifRegExp = /^\s*\/\/\s*#if\s*(.*)$/;
const elseifRegExp = /^\s*\/\/\s*#elseif\s*(.*)$/;
const elseRegExp = /^\s*\/\/\s*#else\s*(.*)$/;
const endifRegExp = /^\s*\/\/\s*#endif$/;
const ifdefRegExpMultiLine = new RegExp(`^${ifRegExp.source}`, 'gm');

// If a variable is '', 0, false, undefined, null, NaN, it will be considered as false.
// If a variable is NOT defined in vars, it will be automatically injected and set to false.
// This allows negative conditions (like #if !MOBILE) to evaluate to true when MOBILE is missing.
/*
var vars = {
    TEST1: '', // false
    TEST2: '2',
}
evalExpression(vars, 'TEST1'); // false
evalExpression(vars, 'TEST2'); // true
evalExpression(vars, 'TEST3'); // false (automatically injected as false)
evalExpression(vars, '!TEST3'); // true
evalExpression(vars, "TEST2===`2` && TEST2==='2'"); // true, can't use ["] in the expression
evalExpression(vars, "TEST1 || TEST2"); // true
*/
const JS_KEYWORDS = new Set(['true', 'false', 'null', 'undefined', 'typeof', 'instanceof', 'in', 'void', 'Math', 'JSON', 'Object', 'Number', 'String', 'Boolean', 'Array']);

const evalExpression = (vars, expression) => {
  const variables = { ...vars };
  
  // Extract all potential variable names from the expression
  const variableRegex = /[a-zA-Z_][a-zA-Z0-9_]*/g;
  const words = expression.match(variableRegex) || [];
  
  words.forEach(word => {
    // If it's not a JS keyword and not already defined in vars, set it to false
    if (!JS_KEYWORDS.has(word) && !(word in variables)) {
      variables[word] = false;
    }
  });

  let result = false;
  try {
    const fn = new Function(...Object.keys(variables), 'return eval("' + expression + '")');
    result = !!fn(...Object.values(variables));
  } catch (e) {
    // If there's still an error (e.g. syntax error), default to false
    result = false;
  }
  console.log(`Expression [${expression}], result: ${result}`);
  return result;
};

const processOneFile = async (vars, fpath) => {
  let text = await fs.readFile(fpath, 'utf8');
  ifdefRegExpMultiLine.lastIndex = 0;
  if (!ifdefRegExpMultiLine.test(text)) {
    return null;
  }

  let lines = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
  let line = '';
  let expression = '';
  let keepLine = true;
  let lineType = LINE_FLAG.code;
  const saveLines = [];
  for (let i = 0; i < lines.length; i++) {
    line = lines[i];

    let matchIf = line.match(ifRegExp);
    let matchElseIf = line.match(elseifRegExp);
    if (matchIf) {
      lineType = LINE_FLAG.if;
      expression = matchIf[1].trim();
    } else if (matchElseIf) {
      lineType = LINE_FLAG.if;
      expression = matchElseIf[1].trim();
    } else if (line.match(elseRegExp)) {
      lineType = LINE_FLAG.else;
    } else if (line.match(endifRegExp)) {
      lineType = LINE_FLAG.endif;
    } else {
      lineType = LINE_FLAG.code;
    }

    if (lineType === LINE_FLAG.if) {
      keepLine = true;
      const result = evalExpression(vars, expression);
      if (!result) {
        keepLine = false;
      }
    }
    if (lineType === LINE_FLAG.else) {
      console.log(`Expression else`);
      keepLine = !keepLine;
    }
    if (lineType === LINE_FLAG.code) {
      if (keepLine) {
        saveLines.push(line);
      }
    }
    if (lineType === LINE_FLAG.endif) {
      keepLine = true;
    }
  }

  text = saveLines.join('\n');
  return text;
};

async function pluginOnLoad(args) {
  let fPath = path.relative(_saved.baseDir, args.path);
  let skip = false;

  for (let filter of _saved.exclude) {
    if (fPath.startsWith(filter)) {
      skip = true;
      break;
    }
  }

  if (skip) {
    return null;
  }

  const text = await processOneFile(_saved.vars, args.path);
  if (text) {
    return {
      contents: text,
      loader: path.extname(args.path).substring(1),
    };
  } else {
    return null;
  }
}

const DEFAULT_EXCLUDE_LIST = ['dist', 'node_modules'];
const DEFAULT_EXTENSION_LIST = ['.js', '.jsx', '.ts', '.tsx'];
module.exports = (
  vars,
  baseDir = process.cwd(),
  exclude = DEFAULT_EXCLUDE_LIST,
  extension = DEFAULT_EXTENSION_LIST
) => {
  _saved.vars = vars;
  _saved.baseDir = baseDir;
  _saved.exclude = exclude;
  const filter = {
    filter: new RegExp(`(${extension.join('|')})$`),
  };
  return {
    name: 'plugin-ifdef',
    setup(build) {
      build.onLoad(filter, pluginOnLoad);
    },
  };
};

module.exports._test = { processOneFile, evalExpression };
