import { test } from 'node:test';
import * as assert from 'node:assert';
import * as path from 'path';
import { getHtmlTemplateIndices, outputHtmlToResponse } from './server-render';
import { asyncLocalStorage } from './async-storage';
import { RuntimeRequire } from '../lib/runtime-require';
import { AsyncStorageProps } from '../models';

const sampleIndexHtmlContent = `<!DOCTYPE html>
<html data-theme="<!--META-THEME-->">
  <head>
    <meta charset="utf-8" />
    <link rel="manifest" href="/assets/site.webmanifest" />
    <title><!--META-TITLE--></title>
    <link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!--META-ENV-START-->
    <!--META-ENV-END-->
    <link rel="stylesheet" type="text/css" href="/assets/icons-font/style.css?t={hash}" />
    <link rel="stylesheet" type="text/css" href="{SUBDIR}/index.css?t={hash}" />
    <script defer src="{SUBDIR}/index.js?t={hash}"></script>
  </head>
  <body>
    <div class="lupine-root"></div>
  </body>
</html>`;

test('HTML Template Utilities - Index Extraction', () => {
  const indices = getHtmlTemplateIndices(sampleIndexHtmlContent);

  const expectedTitleIndex = sampleIndexHtmlContent.indexOf('<!--META-TITLE-->');
  const expectedMetaStart = sampleIndexHtmlContent.indexOf('<!--META-ENV-START-->');
  const expectedMetaEnd = sampleIndexHtmlContent.indexOf('<!--META-ENV-END-->');
  const expectedContainer = sampleIndexHtmlContent.indexOf('<div class="lupine-root">');

  assert.strictEqual(indices.titleIndex, expectedTitleIndex);
  assert.strictEqual(indices.metaIndexStart, expectedMetaStart);
  assert.strictEqual(indices.metaIndexEnd, expectedMetaEnd);
  assert.strictEqual(indices.containerIndex, expectedContainer);
});

test('HTML Template Utilities - Output Composition Stream', () => {
  const indices = getHtmlTemplateIndices(sampleIndexHtmlContent);

  const currentCache: any = {
    content: sampleIndexHtmlContent,
    webEnv: { envVar1: 'value1' },
    ...indices,
  };

  const page = {
    themeName: 'light-theme',
    title: '<title>Lupine API Test</title>',
    metaData: '<meta name="description" content="test meta" />',
    globalCss: '<style>.test { color: blue; }</style>',
    content: '<div class="lupine-root"><h1>Hello World!</h1></div>'
  };

  const webSetting = { systemConfig: true };

  let chunks: string[] = [];
  const mockRes = {
    writeHead: () => {},
    write: (data: string) => {
      chunks.push(data);
    },
    end: () => {}
  } as any;

  const mockReq = { headers: {} } as any;

  outputHtmlToResponse(mockReq, mockRes, currentCache, page, webSetting);
  const resultStr = chunks.join('');

  // Assert correct theme injection
  assert.strictEqual(resultStr.includes('<html data-theme="light-theme">'), true, 'Missing theme');
  // Assert title injection
  assert.strictEqual(resultStr.includes('<title>Lupine API Test</title>'), true, 'Missing title');
  // Assert metadata and css
  assert.strictEqual(resultStr.includes('<meta name="description" content="test meta" />'), true, 'Missing metaData');
  assert.strictEqual(resultStr.includes('<style>.test { color: blue; }</style>'), true, 'Missing globalCss');
  // Assert JSON environments injected inside the ENV bounds
  assert.strictEqual(resultStr.includes('<script id="web-env" type="application/json">{"envVar1":"value1"}</script>'), true, 'Missing web-env');
  assert.strictEqual(resultStr.includes('<script id="web-setting" type="application/json">{"systemConfig":true}</script>'), true, 'Missing web-setting');
  // Assert root content replaced gracefully
  assert.strictEqual(resultStr.includes('<div class="lupine-root"><h1>Hello World!</h1></div>'), true, 'Missing body content');
  
  // Verify trailing data hasn't been corrupted
  assert.strictEqual(resultStr.includes('</body>'), true, 'Missing /body');
  assert.strictEqual(resultStr.includes('</html>'), true, 'Missing /html');

  // Ensure original markers are not preserved entirely raw (except where structure demands)
  assert.strictEqual(resultStr.includes('<!--META-THEME-->'), false, 'META-THEME tag remained');
});

test('Sandbox Execution Context Bounding', async () => {
  // Test if native AsyncLocalStorage context leaks gracefully into the v8 sandbox module isolation boundaries (RuntimeRequire.loadModuleIsolated)
  const mockBackendStore: AsyncStorageProps = {
    uuid: 'mock-uuid-test',
    appName: 'test-app',
    hostPath: { appName: '', webPath: '' } as any,
    locals: { cookies: () => ({'foo': 'bar'}) } as any,
    lang: 'en',
    req: {} as any
  };

  // Run the outer API boundary Context lifecycle
  await asyncLocalStorage.run(mockBackendStore, async () => {
    
    // Simulate API Virtual injection in server-render.ts
    const store = asyncLocalStorage.getStore();
    assert.ok(store);
    
    // Augment with frontend Context payload
    store.requestContext = {
      pageTitle: 'Awesome Injected Title',
      themeName: 'awesome-theme',
      serverCookies: { 'foo': 'bar' },
      metaData: {},
      langName: 'en',
      globalStyles: new Map(),
      globalStyleIds: new Map(),
      coreData: {},
      devData: {}
    };

    const mockScriptContent = `
"use strict";
(() => {
  const _lupineJs = {};
  _lupineJs.generatePage = async (props, toClientDelivery) => {
    const gThis = globalThis;
    if (!gThis.__SSR_ALS_PROPS__) throw new Error('__SSR_ALS_PROPS__ missing');
    const store = gThis.__SSR_ALS_PROPS__.getStore();
    if (!store) throw new Error('store missing');
    return {
      title: store.requestContext?.pageTitle || 'No Title',
      metaData: '<meta name="test">',
      themeName: store.requestContext?.themeName || 'dark',
      globalCss: 'body { color: red }',
      content: \`<div>Mock SSR Content! URL from props: \${props.url}</div>\`
    };
  };
  globalThis._lupineJs = () => _lupineJs;
})();
`;
    const mockFrontendMockJSPath = require('path').join(require('os').tmpdir(), 'lupine-mock-frontend.js');
    require('fs').writeFileSync(mockFrontendMockJSPath, mockScriptContent);
    
    try {
      // Native V8 Execution Box
      const gThis = await RuntimeRequire.loadModuleIsolated(mockFrontendMockJSPath, { 
        _lupineJs: null,
        __SSR_ALS_PROPS__: asyncLocalStorage
      });

      assert.ok(gThis);
      assert.ok(gThis._lupineJs);
      
      const frontendJsLoadedFn = gThis._lupineJs();
      assert.strictEqual(typeof frontendJsLoadedFn.generatePage, 'function');

      // Emulate serverSideRenderPage executing the inner sandbox request
      const pageResult = await frontendJsLoadedFn.generatePage({ url: '/test-route' }, { getRequestContext: () => {} });

      // Assert Context Data integrity natively persisted cleanly back and forth across boundaries
      assert.strictEqual(pageResult.title, 'Awesome Injected Title');
      assert.strictEqual(pageResult.themeName, 'awesome-theme');
      assert.strictEqual(pageResult.content, '<div>Mock SSR Content! URL from props: /test-route</div>');
    } finally {
      // Clean up the temporary testing artifact from the OS tmpdir
      try {
        require('fs').unlinkSync(mockFrontendMockJSPath);
      } catch (e) {
        // Ignore unlink errors
      }
    }
  });
});
