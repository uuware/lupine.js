const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs/promises');
// javascript-obfuscator is needed
const obfuscatePlugin = (isObfuscate, skipPaths = []) => {
  if (!isObfuscate) return { name: 'obfuscatePlugin', setup() {} };

  const javascriptObfuscator = require('javascript-obfuscator');
  return {
    name: 'obfuscatePlugin',
    setup(build) {
      build.onLoad({ filter: /\.(js|ts|tsx|jsx)$/ }, async (args) => {
        if (args.path.includes('node_modules')) return null;
        if (skipPaths.some((skipPath) => args.path.includes(skipPath))) {
          console.log(`Skip obfuscate: ${args.path}`);
          return null;
        }

        const ext = path.extname(args.path);
        console.log(`Obfuscate: ${args.path}`);
        let content = await fs.readFile(args.path, 'utf8');

        // Transpile TS/JSX to JS first because obfuscator works on JS
        if (['.ts', '.tsx', '.jsx'].includes(ext)) {
          const result = await esbuild.transform(content, {
            loader: ext.substring(1),
            sourcefile: args.path,
            jsx: 'automatic',
            jsxImportSource: 'lupine.web',
          });
          content = result.code;
        }

        const obfuscationResult = javascriptObfuscator.obfuscate(content, {
          compact: true,
          controlFlowFlattening: true,
          controlFlowFlatteningThreshold: 0.75,
          deadCodeInjection: false,
          deadCodeInjectionThreshold: 0,
          // debugProtection: isEntryPoint, // this should be done in code: disableDebug('xxx');
          // debugProtectionInterval: 2000,
          // disableConsoleOutput: isEntryPoint, // this should be done in code: disableConsole();
          identifierNamesGenerator: 'hexadecimal',
          stringArray: true,
          stringArrayThreshold: 0.75,
          ignoreImports: true,
        });

        return {
          contents: obfuscationResult.getObfuscatedCode(),
          loader: 'js',
        };
      });
    },
  };
};
module.exports = {
  obfuscatePlugin,
};
