import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { PageRouter } from './page-router';
import { PageProps } from '../models/page-props';
import { VNode } from '../jsx';

describe('PageRouter Engine', () => {

  const createDummyProps = (url: string): PageProps => ({
    url,
    query: {},
    urlParameters: {},
    renderPageFunctions: {} as any
  });

  const mockVNode = (type: any, props: any, children: any[] = []): VNode<any> => ({ type, props: { ...props, children }, html: [] });

  it('should correctly register and match exact basic routes', async () => {
    const router = new PageRouter();
    
    // Mocks
    const pageA = async (props: PageProps) => mockVNode('div', { id: 'A' });
    const pageB = async (props: PageProps) => mockVNode('div', { id: 'B' });
    
    router.use('/a', pageA);
    router.use('/b', pageB);

    const matchA = await router.handleRoute('/a', createDummyProps('/a'), false);
    assert.ok(matchA);
    assert.equal(matchA.props.id, 'A');

    const matchB = await router.handleRoute('/b', createDummyProps('/b'), false);
    assert.ok(matchB);
    assert.equal(matchB.props.id, 'B');

    const matchC = await router.handleRoute('/c', createDummyProps('/c'), false);
    assert.equal(matchC, null, 'Should return null for unmatched route');
  });

  it('should accurately parse mandatory and optional dynamic parameters', async () => {
    const router = new PageRouter();
    let parametersExtracted: any = {};
    
    const handler = async (props: PageProps) => {
      parametersExtracted = props.urlParameters;
      return mockVNode('div', {});
    };
    
    // Matches /users/:id/details/?scope
    router.use('/users/:id/details/?scope', handler);

    const props1 = createDummyProps('/users/123/details');
    await router.handleRoute('/users/123/details', props1, false);
    assert.equal(parametersExtracted.id, '123');
    assert.equal(parametersExtracted.scope, undefined);

    const props2 = createDummyProps('/users/999/details/admin');
    await router.handleRoute('/users/999/details/admin', props2, false);
    assert.equal(parametersExtracted.id, '999');
    assert.equal(parametersExtracted.scope, 'admin');

    const props3 = createDummyProps('/users');
    const result = await router.handleRoute('/users', props3, false);
    assert.equal(result, null);
  });

  it('should intercept execution via setFilter middleware', async () => {
    const router = new PageRouter();
    let filterHit = false;

    router.setFilter(async (props) => {
      filterHit = true;
      if (props.url === '/blocked') {
        return mockVNode('div', { id: 'blocked' }); 
      }
      return null; 
    });

    const handler = async (props: PageProps) => mockVNode('div', { id: 'ok' });
    router.use('/*', handler);

    const result1 = await router.handleRoute('/blocked', createDummyProps('/blocked'), false);
    assert.ok(filterHit);
    assert.ok(result1);
    assert.equal(result1.props.id, 'blocked');

    filterHit = false;
    const result2 = await router.handleRoute('/allowed', createDummyProps('/allowed'), false);
    assert.ok(filterHit);
    assert.ok(result2);
    assert.equal(result2.props.id, 'ok');
  });

  it('should wrap outputs correctly using setFramePage', async () => {
    const router = new PageRouter();

    const TopFrame = async (placeholderClassname: string, vnode: VNode<any>) => {
      return mockVNode('div', { class: 'frame' }, [vnode]);
    };

    router.setFramePage({
      component: TopFrame,
      placeholderClassname: 'internal-placeholder'
    });

    const handler = async (props: PageProps) => mockVNode('div', { id: 'inner' });
    router.use('/', handler);

    const result = await router.handleRoute('/', createDummyProps('/'), false);
    
    assert.ok(result);
    assert.equal(result.type, 'div');
    assert.equal(result.props.class, 'frame');
    assert.equal(result.props.children[0].props.id, 'inner');
  });

  it('should traverse recursively into nested sub-routers', async () => {
    const rootRouter = new PageRouter();
    const subRouter = new PageRouter();

    subRouter.use('/profile', async () => mockVNode('div', { id: 'sub-profile' }));
    rootRouter.use('/user', subRouter);

    const match = await rootRouter.handleRoute('/user/profile', createDummyProps('/user/profile'), false);
    assert.ok(match);
    assert.equal(match.props.id, 'sub-profile');

    const miss = await rootRouter.handleRoute('/user/settings', createDummyProps('/user/settings'), false);
    assert.equal(miss, null);
  });
});
