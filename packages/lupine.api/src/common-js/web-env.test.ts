import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';

// Required via relative path to test CommonJS behaviors uniformly
const webEnv = require('./web-env');

describe('web-env utilities', () => {
  let originalReadFile: any;
  let originalProcessEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalReadFile = webEnv.readFile;
    // backup process.env comprehensively
    originalProcessEnv = { ...process.env };
  });

  afterEach(() => {
    webEnv.readFile = originalReadFile;
    // restore process.env
    process.env = originalProcessEnv;
  });

  it('should parse simple env lines and ignore comments', async () => {
    webEnv.readFile = async (file: string) => {
      return `
# This is a comment
APP_NAME=lupine
DEBUG=true
      `.trim();
    };

    const obj = await webEnv.parseEnv('fake.env');
    assert.equal(obj['APP_NAME'], 'lupine');
    assert.equal(obj['DEBUG'], 'true');
    assert.equal(Object.keys(obj).length, 2);
  });

  it('should handle += for appending text to same key', async () => {
    webEnv.readFile = async () => 'LIST=Item1\nLIST+=Item2\nLIST+=Item3';
    const obj = await webEnv.parseEnv('fake.env');
    assert.equal(obj['LIST'], 'Item1Item2Item3');
  });

  it('should handle *= for multiline values', async () => {
    webEnv.readFile = async () => `
KEY*=EOS
Line 1
Line 2
EOS
OTHER=val
`.trim();
    const obj = await webEnv.parseEnv('fake.env');
    assert.equal(obj['KEY'], 'Line 1\nLine 2');
    assert.equal(obj['OTHER'], 'val');
  });

  it('should resolve #!import lines recursively', async () => {
    webEnv.readFile = async (file: string) => {
      if (file.includes('base.env')) {
        return 'BASE_URL=http://localhost\n# comment';
      }
      return 'APP=demo\n#!import base.env';
    };

    const obj = await webEnv.parseEnv('/mock/path/main.env');
    assert.equal(obj['APP'], 'demo');
    assert.equal(obj['BASE_URL'], 'http://localhost');
  });

  it('should strictly copy values to process.env and respect overrides', async () => {
    process.env['STATIC_VAR'] = 'original';
    
    webEnv.copyToProcessEnv({ 'STATIC_VAR': 'new', 'NEW_VAR': 'added' }, false);
    assert.equal(process.env['STATIC_VAR'], 'original', 'Should not override if overrideEnv is false');
    assert.equal(process.env['NEW_VAR'], 'added');

    webEnv.copyToProcessEnv({ 'STATIC_VAR': 'forced' }, true);
    assert.equal(process.env['STATIC_VAR'], 'forced', 'Should override if overrideEnv is true');
  });

  it('should properly extract WEB.* namespace prefixes into WebEnv structure', () => {
    process.env['WEB.THEME'] = 'dark';
    process.env['MyApp.WEB.API_KEY'] = '1234';
    process.env['NOT_WEB'] = 'hidden';

    const webEnvData = webEnv.getWebEnv('MyApp');
    assert.equal(webEnvData['THEME'], 'dark');
    assert.equal(webEnvData['API_KEY'], '1234');
    assert.equal(webEnvData['NOT_WEB'], undefined);
  });

  it('should extract config prefix using AppSharedStorageWebPrefix appropriately', () => {
    const fakeConfig = {
      'WEB.COLOR': 'blue',
      'WEB.TITLE': 'Demo',
      'SERVER.PORT': 8080
    };

    const result = webEnv.getWebConfig(fakeConfig);
    assert.equal(result['COLOR'], 'blue');
    assert.equal(result['TITLE'], 'Demo');
    assert.equal(result['PORT'], undefined);
  });
});
