const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs/promises');

const sourceMappingComment = /\r?\n\/\/#\s*sourceMappingURL=.*$/s;
const base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const base64Values = new Map([...base64Chars].map((char, index) => [char, index]));

const stripSourceMappingComment = (code) => code.replace(sourceMappingComment, '');

const toInlineSourceMap = (sourceMap) => {
  const encoded = Buffer.from(sourceMap, 'utf8').toString('base64');
  return `//# sourceMappingURL=data:application/json;charset=utf-8;base64,${encoded}`;
};

const decodeVlq = (value, start) => {
  let result = 0;
  let shift = 0;
  let index = start;

  while (index < value.length) {
    const digit = base64Values.get(value[index++]);
    if (digit === undefined) throw new Error(`Invalid source map VLQ character: ${value[index - 1]}`);
    result |= (digit & 31) << shift;
    shift += 5;
    if ((digit & 32) === 0) {
      const negative = result & 1;
      return { value: negative ? -(result >> 1) : result >> 1, next: index };
    }
  }

  throw new Error('Invalid unterminated source map VLQ segment');
};

const encodeVlq = (value) => {
  let encoded = '';
  let current = value < 0 ? ((-value) << 1) | 1 : value << 1;
  do {
    let digit = current & 31;
    current >>>= 5;
    if (current > 0) digit |= 32;
    encoded += base64Chars[digit];
  } while (current > 0);
  return encoded;
};

const parseSourceMap = (mapText) => {
  const map = JSON.parse(mapText);
  const mappings = [];
  let sourceIndex = 0;
  let originalLine = 0;
  let originalColumn = 0;
  let nameIndex = 0;

  for (const [lineIndex, lineText] of (map.mappings || '').split(';').entries()) {
    let generatedColumn = 0;
    const lineMappings = [];
    if (lineText) {
      for (const segmentText of lineText.split(',')) {
        let offset = 0;
        const generatedColumnDelta = decodeVlq(segmentText, offset);
        offset = generatedColumnDelta.next;
        generatedColumn += generatedColumnDelta.value;
        const segment = {
          generatedLine: lineIndex + 1,
          generatedColumn,
          source: null,
          originalLine: null,
          originalColumn: null,
          name: null,
        };

        if (offset < segmentText.length) {
          const sourceDelta = decodeVlq(segmentText, offset);
          offset = sourceDelta.next;
          sourceIndex += sourceDelta.value;
          const lineDelta = decodeVlq(segmentText, offset);
          offset = lineDelta.next;
          originalLine += lineDelta.value;
          const columnDelta = decodeVlq(segmentText, offset);
          offset = columnDelta.next;
          originalColumn += columnDelta.value;
          segment.source = map.sources[sourceIndex];
          segment.originalLine = originalLine + 1;
          segment.originalColumn = originalColumn;

          if (offset < segmentText.length) {
            const nameDelta = decodeVlq(segmentText, offset);
            nameIndex += nameDelta.value;
            segment.name = map.names?.[nameIndex] || null;
          }
        }
        lineMappings.push(segment);
      }
    }
    mappings.push(lineMappings);
  }

  return {
    mappings,
    sources: map.sources || [],
    sourcesContent: map.sourcesContent || [],
  };
};

const findOriginalMapping = (map, line, column) => {
  const lineMappings = map.mappings[line - 1] || [];
  let candidate = null;
  for (const mapping of lineMappings) {
    if (mapping.generatedColumn > column) break;
    candidate = mapping;
  }
  return candidate;
};

const sourceMapPathFromLoadDirectory = (source, loadDirectory) => {
  const absoluteSource = path.isAbsolute(source) ? source : path.resolve(process.cwd(), source);
  return path.relative(loadDirectory, absoluteSource).replace(/\\/g, '/');
};

const composeSourceMaps = (obfuscatedMapText, inputMapText, outputFileName, loadDirectory) => {
  const obfuscatedMap = parseSourceMap(obfuscatedMapText);
  const inputMap = parseSourceMap(inputMapText);
  const mappings = [];
  const sources = [];
  const sourceIndexes = new Map();
  const sourceContents = [];
  const getSourceIndex = (source) => {
    if (!sourceIndexes.has(source)) {
      sourceIndexes.set(source, sources.length);
      sources.push(source);
      sourceContents.push(undefined);
    }
    return sourceIndexes.get(source);
  };

  obfuscatedMap.mappings.forEach((lineMappings, lineIndex) => {
    const composedLine = [];
    for (const mapping of lineMappings) {
      if (mapping.source == null || mapping.originalLine == null || mapping.originalColumn == null) {
        composedLine.push({ generatedColumn: mapping.generatedColumn });
        continue;
      }
      const original = findOriginalMapping(inputMap, mapping.originalLine, mapping.originalColumn);
      if (!original || original.source == null || original.originalLine == null || original.originalColumn == null) {
        composedLine.push({ generatedColumn: mapping.generatedColumn });
        continue;
      }
      const source = sourceMapPathFromLoadDirectory(original.source, loadDirectory);
      const sourceIndex = getSourceIndex(source);
      const inputSourceIndex = inputMap.sources.indexOf(original.source);
      if (sourceContents[sourceIndex] === undefined && inputSourceIndex >= 0) {
        sourceContents[sourceIndex] = inputMap.sourcesContent[inputSourceIndex];
      }
      composedLine.push({
        generatedColumn: mapping.generatedColumn,
        sourceIndex,
        originalLine: original.originalLine,
        originalColumn: original.originalColumn,
        name: original.name || mapping.name,
      });
    }
    mappings[lineIndex] = composedLine;
  });

  const names = [];
  const nameIndexes = new Map();
  const getNameIndex = (name) => {
    if (!nameIndexes.has(name)) nameIndexes.set(name, names.push(name) - 1);
    return nameIndexes.get(name);
  };
  let previousSource = 0;
  let previousOriginalLine = 0;
  let previousOriginalColumn = 0;
  let previousName = 0;
  const encodedLines = mappings.map((lineMappings) => {
    let previousGeneratedColumn = 0;
    return lineMappings
      .map((mapping) => {
        let segment = encodeVlq(mapping.generatedColumn - previousGeneratedColumn);
        previousGeneratedColumn = mapping.generatedColumn;
        if (mapping.sourceIndex === undefined) return segment;
        segment += encodeVlq(mapping.sourceIndex - previousSource);
        previousSource = mapping.sourceIndex;
        segment += encodeVlq(mapping.originalLine - 1 - previousOriginalLine);
        previousOriginalLine = mapping.originalLine - 1;
        segment += encodeVlq(mapping.originalColumn - previousOriginalColumn);
        previousOriginalColumn = mapping.originalColumn;
        if (mapping.name) {
          const nameIndex = getNameIndex(mapping.name);
          segment += encodeVlq(nameIndex - previousName);
          previousName = nameIndex;
        }
        return segment;
      })
      .join(',');
  });

  return JSON.stringify({
    version: 3,
    file: outputFileName,
    sources,
    sourcesContent: sourceContents,
    names,
    mappings: encodedLines.join(';'),
  });
};

const obfuscatePlugin = (isObfuscate, skipPaths = []) => {
  if (!isObfuscate) return { name: 'obfuscatePlugin', setup() {} };

  const javascriptObfuscator = require('javascript-obfuscator');
  const includeSourceMap = process.argv.includes('--jsmap=1');
  const obfuscationSeed = process.env.OBFUSCATION_SEED || 'lupine-build-stable';

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
        const sourceFileName = path.relative(process.cwd(), args.path).replace(/\\/g, '/');
        console.log(`Obfuscate: ${args.path}`);
        let content = await fs.readFile(args.path, 'utf8');
        let inputSourceMap = '';

        // Keep the TS/JSX map so the obfuscation map can be composed back to
        // the original source instead of stopping at generated JavaScript.
        if (['.ts', '.tsx', '.jsx'].includes(ext)) {
          const result = await esbuild.transform(content, {
            loader: ext.substring(1),
            sourcefile: sourceFileName,
            sourcemap: includeSourceMap ? 'external' : false,
            sourcesContent: includeSourceMap,
            jsx: 'automatic',
            jsxImportSource: 'lupine.web',
          });
          content = stripSourceMappingComment(result.code);
          inputSourceMap = result.map || '';
        }

        const obfuscationResult = javascriptObfuscator.obfuscate(content, {
          compact: true,
          // Control-flow flattening is difficult to validate around closures,
          // optional calls, and callback state. Keep safer transforms enabled
          // without rewriting the control-flow graph.
          controlFlowFlattening: false,
          controlFlowFlatteningThreshold: 0,
          deadCodeInjection: false,
          deadCodeInjectionThreshold: 0,
          ...(includeSourceMap
            ? {
                sourceMap: true,
                sourceMapMode: 'separate',
                sourceMapSourcesMode: inputSourceMap ? 'sources' : 'sources-content',
                inputFileName: sourceFileName,
                sourceMapFileName: `${path.basename(sourceFileName)}.map`,
              }
            : {}),
          identifierNamesGenerator: 'hexadecimal',
          seed: obfuscationSeed,
          stringArray: true,
          stringArrayThreshold: 0.75,
          ignoreImports: true,
        });

        let obfuscatedCode = obfuscationResult.getObfuscatedCode();
        if (includeSourceMap) {
          const obfuscatedMap = obfuscationResult.getSourceMap();
          const finalMap = inputSourceMap
            ? composeSourceMaps(obfuscatedMap, inputSourceMap, path.basename(sourceFileName), path.dirname(args.path))
            : obfuscatedMap;
          obfuscatedCode = `${stripSourceMappingComment(obfuscatedCode)}\n${toInlineSourceMap(finalMap)}`;
        }

        return {
          contents: obfuscatedCode,
          loader: 'js',
        };
      });
    },
  };
};

module.exports = {
  obfuscatePlugin,
};
