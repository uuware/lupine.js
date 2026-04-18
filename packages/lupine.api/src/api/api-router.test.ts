import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { ApiRouter } from './api-router';
import { ServerRequest } from '../models/locals-props';
import { ServerResponse } from 'http';

describe('ApiRouter Execution Engine', () => {
  const createMockReq = (method = 'GET'): ServerRequest =>
    ({
      method,
      locals: {},
    } as any);

  const createMockRes = (): ServerResponse => {
    let _writableEnded = false;
    let _status = 200;
    let _data = '';

    return {
      get writableEnded() {
        return _writableEnded;
      },
      set statusCode(val: number) {
        _status = val;
      },
      get statusCode() {
        return _status;
      },
      writeHead(status: number) {
        _status = status;
      },
      setHeader() {},
      get writable() { return true; },
      write(chunk: any) {
        _data += chunk;
      },
      end(chunk?: any) {
        if (chunk) _data += chunk;
        _writableEnded = true;
      },
      _getData: () => _data,
      _getStatus: () => _status,
    } as any;
  };

  it('should route strict paths according to specific HTTP methods requested', async () => {
    const router = new ApiRouter();
    let getHit = false;
    let postHit = false;

    router.get('/data', async () => {
      getHit = true;
      return true;
    });

    router.post('/data', async () => {
      postHit = true;
      return true;
    });

    const reqPost = createMockReq('POST');
    const resPost = createMockRes();
    const result1 = await router.handleRequest('/data', reqPost, resPost);

    assert.ok(result1);
    assert.ok(!getHit);
    assert.ok(postHit);
  });

  it('should parse URL parameters strictly segregating mandatory vs optional queries natively', async () => {
    const router = new ApiRouter();
    let parameters: any = null;

    router.use('/record/:id/auth/?user', async (req) => {
      parameters = {
        id: req.locals.urlParameters?.get('id', ''),
        user: req.locals.urlParameters?.get('user', '')
      };
      return true; // resolved
    });

    // Test optional omission
    parameters = null;
    await router.handleRequest('/record/44/auth', createMockReq(), createMockRes());
    assert.ok(parameters);
    assert.equal(parameters.id, '44');
    assert.equal(parameters.user, '');

    // Test optional presence
    parameters = null;
    await router.handleRequest('/record/99/auth/admin', createMockReq(), createMockRes());
    assert.ok(parameters);
    assert.equal(parameters.id, '99');
    assert.equal(parameters.user, 'admin');

    // Test missing mandatory parameter fallback (should trigger 404 implicitly)
    parameters = null;
    const res404 = createMockRes();
    await router.handleRequest('/record', createMockReq(), res404);
    assert.equal(parameters, null);
    assert.equal((res404 as any)._getStatus(), 404);
  });

  it('should execute upstream logic explicitly utilizing setFilter interception', async () => {
    const router = new ApiRouter();
    let filterTriggered = false;

    router.setFilter(async (req, res, path) => {
      filterTriggered = true;
      if (path === '/blocked') {
        res.writeHead(403);
        res.end();
        return true; 
      }
      return false; // Yield to standard resolution
    });

    router.get('/allowed', async () => {
      return true; 
    });

    // Valid Request
    const resAllowed = createMockRes();
    const resultAllowed = await router.handleRequest('/allowed', createMockReq(), resAllowed);
    assert.ok(filterTriggered, 'Filter must invoke unconditionally');
    assert.ok(resultAllowed);
    assert.ok(!resAllowed.writableEnded, 'Nothing blocks write streams artificially here unless handled');

    // Blocked Request
    filterTriggered = false;
    const resBlocked = createMockRes();
    const resultBlocked = await router.handleRequest('/blocked', createMockReq(), resBlocked);
    assert.ok(filterTriggered);
    assert.ok(resultBlocked);
    assert.equal((resBlocked as any)._getStatus(), 403);
  });

  it('should accurately isolate recursively bound nested ApiRouters recursively without parent bleed', async () => {
    const rootRouter = new ApiRouter();
    const nestRouter = new ApiRouter();
    let nestTriggered = false;

    nestRouter.post('/commit', async () => {
      nestTriggered = true;
      return true;
    });

    rootRouter.use('/v1', nestRouter);

    const res = createMockRes();
    await rootRouter.handleRequest('/v1/commit', createMockReq('POST'), res);
    
    assert.ok(nestTriggered);
  });

  it('should format predictable 500 error shells natively upon handler exceptions', async () => {
    const router = new ApiRouter();

    router.get('/crash', async () => {
      throw new Error('Database Error');
    });

    const res = createMockRes();
    console.log('');
    console.log('--- NOTE: Expecting an ERROR log below from [api-router] testing crash handling ---');
    await router.handleRequest('/crash', createMockReq(), res);

    assert.equal((res as any)._getStatus(), 500);
    const body = (res as any)._getData();
    assert.ok(body.includes('status":"error"'));
    assert.ok(body.includes('Database Error'));
  });

  it('should format standardized 404 logic when paths resolve to empty constraints natively', async () => {
    const router = new ApiRouter();

    router.get('/exist/:id', async () => true);

    const res = createMockRes();
    // Path matches base logic but exceeds parameter constraints, guaranteeing 'meet = false' and forcing 404 handler
    await router.handleRequest('/exist/1/2/3', createMockReq('GET'), res);

    assert.equal((res as any)._getStatus(), 404);
    assert.ok((res as any)._getData().includes("matches for path"));
  });
});
