import test from 'node:test';
import assert from 'node:assert/strict';
import { HostToPath } from './host-to-path';
import { HostToPathProps } from '../models';

const createMockProp = (appName: string, hosts: string[], webPath: string = '/web'): HostToPathProps => ({
  appName,
  hosts,
  webPath,
  dataPath: '/data',
  apiPath: '/api',
  dbType: 'sqlite',
  dbConfig: {} as any,
});

test('HostToPath Domain Resolution', async (t) => {
  t.beforeEach(() => {
    HostToPath.setHostToPathList([]); // Reset before each test
  });

  await t.test('Should match exact hosts using Array.includes (Line 16)', () => {
    HostToPath.setHostToPathList([
      createMockProp('doc', ['w1.example.com', 'localhost', '127.0.0.1']),
      createMockProp('demo.app', ['w2.example.com', 'demo.local']),
    ]);

    assert.equal(HostToPath.findHostPath('localhost')?.appName, 'doc');
    assert.equal(HostToPath.findHostPath('127.0.0.1')?.appName, 'doc');
    assert.equal(HostToPath.findHostPath('demo.local')?.appName, 'demo.app');
  });

  await t.test('Should match subdomains using string.endsWith (Line 26)', () => {
    HostToPath.setHostToPathList([
      createMockProp('corp', ['internal.company.com']),
      createMockProp('wildcard', ['demo.com', 'sample-domain.com']),
    ]);

    // exact matches
    assert.equal(HostToPath.findHostPath('demo.com')?.appName, 'wildcard');
    
    // subdomain matches
    assert.equal(HostToPath.findHostPath('api.demo.com')?.appName, 'wildcard');
    assert.equal(HostToPath.findHostPath('w3.sample-domain.com')?.appName, 'wildcard');
    assert.equal(HostToPath.findHostPath('deep.sub.internal.company.com')?.appName, 'corp');
  });

  await t.test('Should fallback to empty hosts app when no match is found (Line 34)', () => {
    HostToPath.setHostToPathList([
      createMockProp('doc', ['w1.example.com']),
      createMockProp('default-app', []),
    ]);

    assert.equal(HostToPath.findHostPath('w1.example.com')?.appName, 'doc');
    
    // Non-existent hosts should fall back to the app with zero hosts
    assert.equal(HostToPath.findHostPath('unknown.com')?.appName, 'default-app');
    assert.equal(HostToPath.findHostPath('random-host.net')?.appName, 'default-app');
  });

  await t.test('Should return undefined when nothing matches and no empty host fallback exists', () => {
    HostToPath.setHostToPathList([
      createMockProp('app1', ['domain1.com']),
      createMockProp('app2', ['domain2.com']),
    ]);

    assert.equal(HostToPath.findHostPath('domain1.com')?.appName, 'app1');
    assert.equal(HostToPath.findHostPath('unknown-domain.com'), undefined);
  });

  await t.test('Should skip items lacking webPath configuration', () => {
    // Both tests includes and endsWith skip if webPath is falsy
    HostToPath.setHostToPathList([
      createMockProp('hidden-app', ['hidden.com'], ''),
      createMockProp('visible-app', ['visible.com']),
      createMockProp('fallback-hidden', [], ''),
    ]);

    assert.equal(HostToPath.findHostPath('hidden.com'), undefined);
    assert.equal(HostToPath.findHostPath('sub.hidden.com'), undefined);
    assert.equal(HostToPath.findHostPath('unknown.com'), undefined); // empty host has no webPath so it fails

    assert.equal(HostToPath.findHostPath('visible.com')?.appName, 'visible-app');
  });
});
