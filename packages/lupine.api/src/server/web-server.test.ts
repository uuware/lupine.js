import { describe, it, mock, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { WebServer } from './web-server';
import * as tls from 'tls';

describe('WebServer Multi-Domain SNI Configuration', () => {
  afterEach(() => {
    mock.restoreAll();
  });

  it('should accurately resolve exact and fallback domain certificates without network bindings', (t) => {
    // 1. Mocking native FS to bypass real file checks
    mock.method(require('fs'), 'existsSync', () => true);
    mock.method(require('fs'), 'readFileSync', (path: string) => `MOCK_DATA_${path}`);
    
    // 2. Mock TLS context generation so it doesn't parse real certs
    mock.method(require('tls'), 'createSecureContext', (options: any) => {
      // Just intercept it and return a tracking object
      return { _mockId: options.cert };
    });

    // 3. Prevent the HTTPS server from actually opening ports on the OS
    let capturedSNICallback: ((domain: string, cb: (err: Error | null, ctx?: tls.SecureContext) => void) => void) | null = null;
    mock.method(require('https'), 'createServer', (options: any) => {
      capturedSNICallback = options.SNICallback;
      return {
        on: () => {},
        listen: () => {},
        setTimeout: () => {},
        setSecureContext: () => {} // fake server bindings
      } as any;
    });

    // Invoke WebServer targeting mock cert paths
    const server = new WebServer();
    server.startHttps(
      443, 
      '0.0.0.0', 
      'default.key', 
      'default.crt', 
      {
        'example.com': { key: 'ex.key', cert: 'ex.crt' },
        'app.org': { key: 'app.key', cert: 'app.crt' }
      }
    );

    // Extraction assertion to ensure callback was mounted
    assert.ok(capturedSNICallback, 'SNI callback must be registered to core HTTPS options');

    // Helper wrapper for SNI assertions
    const verifySNI = (requestDomain: string): string | undefined => {
      let resolvedCtx: any = undefined;
      capturedSNICallback!(requestDomain, (err, ctx) => {
        resolvedCtx = ctx;
      });
      return resolvedCtx ? resolvedCtx._mockId : undefined;
    };

    // A. Exact Domain Match
    assert.equal(verifySNI('example.com'), 'MOCK_DATA_ex.crt', 'Exact domain MUST match its corresponding certificate');
    assert.equal(verifySNI('app.org'), 'MOCK_DATA_app.crt');

    // B. Subdomain Fallback (Magic Logic)
    // A request for `api.example.com` should degrade to `example.com`
    assert.equal(verifySNI('api.example.com'), 'MOCK_DATA_ex.crt', 'Subdomains MUST fallback to root site domain certs');
    assert.equal(verifySNI('www.dev.app.org'), 'MOCK_DATA_app.crt', 'Deep nested subdomains MUST fallback transitively');

    // C. No Match Fallback
    // Sites falling totally out of bounds fallback to undefined, triggering core default certification
    assert.equal(verifySNI('stranger.io'), undefined, 'Unmatched domains MUST fallback to default server behavior');
  });
});
