import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import {
  bindStaticServerOptions,
  bindSkipSsrPaths,
  defaultSSOptions,
  isSkipSsrUrl,
} from './static-server-helper';
import { StaticServer } from './static-server';

describe('StaticServer & Skip SSR Paths', () => {
  beforeEach(() => {
    defaultSSOptions.skipSsrPaths = [];
  });

  describe('isSkipSsrUrl', () => {
    it('should return false when skipPaths is undefined or empty', () => {
      assert.equal(isSkipSsrUrl('/assets/app.js', undefined), false);
      assert.equal(isSkipSsrUrl('/assets/app.js', []), false);
    });

    it('should match exact file paths', () => {
      const paths = ['/favicon.ico', '/robots.txt'];
      assert.equal(isSkipSsrUrl('/favicon.ico', paths), true);
      assert.equal(isSkipSsrUrl('/robots.txt', paths), true);
      assert.equal(isSkipSsrUrl('/favicon.ico/extra', paths), true);
      assert.equal(isSkipSsrUrl('/index.html', paths), false);
    });

    it('should match directory prefixes properly', () => {
      const paths = ['/assets', '/static/'];
      assert.equal(isSkipSsrUrl('/assets/bundle.js', paths), true);
      assert.equal(isSkipSsrUrl('/assets/sub/app.css', paths), true);
      assert.equal(isSkipSsrUrl('/assets', paths), true);
      assert.equal(isSkipSsrUrl('/static/img.png', paths), true);

      // Boundary safety check: should not match partially overlapping names
      assert.equal(isSkipSsrUrl('/assets-old/bundle.js', paths), false);
      assert.equal(isSkipSsrUrl('/static-files/img.png', paths), false);
      assert.equal(isSkipSsrUrl('/other/path', paths), false);
    });

    it('should automatically normalize prefixes without leading slashes', () => {
      const paths = ['assets', 'static/'];
      assert.equal(isSkipSsrUrl('/assets/app.js', paths), true);
      assert.equal(isSkipSsrUrl('/static/style.css', paths), true);
    });

    it('should support single string argument', () => {
      assert.equal(isSkipSsrUrl('/assets/chunk.js', '/assets'), true);
      assert.equal(isSkipSsrUrl('/other/file.js', '/assets'), false);
    });
  });

  describe('bindStaticServerOptions and bindSkipSsrPaths', () => {
    it('should register paths globally via bindStaticServerOptions', () => {
      bindStaticServerOptions({ skipSsrPaths: ['/assets', '/static'] });
      assert.deepEqual(defaultSSOptions.skipSsrPaths, ['/assets', '/static']);

      // Deduplicate when calling again
      bindStaticServerOptions({ skipSsrPaths: ['/static', '/media'] });
      assert.deepEqual(defaultSSOptions.skipSsrPaths, ['/assets', '/static', '/media']);
    });

    it('should register paths via bindSkipSsrPaths helper', () => {
      bindSkipSsrPaths('/assets');
      assert.deepEqual(defaultSSOptions.skipSsrPaths, ['/assets']);

      bindSkipSsrPaths(['/static', '/favicon.ico']);
      assert.deepEqual(defaultSSOptions.skipSsrPaths, ['/assets', '/static', '/favicon.ico']);
    });
  });

  describe('StaticServer isSkipSsr integration', () => {
    it('should use defaultSSOptions.skipSsrPaths directly', () => {
      bindSkipSsrPaths(['/assets']);
      const server = new StaticServer();
      assert.equal((server as any).isSkipSsr('/assets/app.js'), true);
      assert.equal((server as any).isSkipSsr('/page/home'), false);
    });
  });

  describe('serverContentType and bindServerContentType', () => {
    it('should allow registering custom MIME types and keep options in sync', () => {
      const { serverContentType, bindServerContentType } = require('./static-server-helper');
      assert.equal(serverContentType.json, 'application/json');

      bindServerContentType({ customext: 'application/x-custom' });
      assert.equal(serverContentType.customext, 'application/x-custom');
      assert.equal(defaultSSOptions.serverContentType?.customext, 'application/x-custom');

      bindStaticServerOptions({ serverContentType: { another: 'application/x-another' } });
      assert.equal(serverContentType.another, 'application/x-another');
      assert.equal(defaultSSOptions.serverContentType?.another, 'application/x-another');
    });
  });
});

