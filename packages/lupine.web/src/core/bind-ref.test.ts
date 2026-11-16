import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { bindRef } from './bind-ref';
import { RefProps } from '../models';

describe('bindRef - RefProps and Scoped Query Selector ref.$ / ref.$all', () => {
  let mockEl: any;
  let querySelectorCalls: string[] = [];
  let querySelectorAllCalls: string[] = [];

  beforeEach(() => {
    querySelectorCalls = [];
    querySelectorAllCalls = [];
    mockEl = {
      nodeType: 1, // Element node
      querySelector: (sel: string) => {
        querySelectorCalls.push(sel);
        return { matchedSelector: sel };
      },
      querySelectorAll: (sel: string) => {
        querySelectorAllCalls.push(sel);
        return [{ matchedSelector: sel }];
      },
    };
  });

  it('should return the element itself when selector is empty or &', () => {
    const ref: RefProps = {};
    const newProps = { _id: 'd_12345', ref };
    bindRef('div', newProps, mockEl, {} as any);

    assert.equal(ref.current, mockEl);
    assert.equal(ref.$!(''), mockEl);
    assert.equal(ref.$!('&'), mockEl);
    assert.deepEqual(ref.$all!(''), [mockEl]);
    assert.deepEqual(ref.$all!('&'), [mockEl]);
  });

  it('should translate & to component unique id in scoped querySelector ref.$', () => {
    const ref: RefProps = {};
    const newProps = { _id: 'd_scope99', ref };
    bindRef('div', newProps, mockEl, {} as any);

    ref.$!('.&-btn');
    assert.equal(querySelectorCalls[0], '.d_scope99-btn');

    ref.$!('.&-container .&-item');
    assert.equal(querySelectorCalls[1], '.d_scope99-container .d_scope99-item');
  });

  it('should translate & using referToCssId when available', () => {
    const ref: RefProps = { referToCssId: 'g_global123' };
    const newProps = { _id: 'd_local456', ref };
    bindRef('div', newProps, mockEl, {} as any);

    ref.$!('.&-card');
    assert.equal(querySelectorCalls[0], '.g_global123-card');

    ref.$!('div .&-sub');
    assert.equal(querySelectorCalls[1], 'div .g_global123-sub');
  });

  it('should translate & in ref.$all querySelectorAll', () => {
    const ref: RefProps = {};
    const newProps = { _id: 'd_items', ref };
    bindRef('div', newProps, mockEl, {} as any);

    ref.$all!('.&-list-item');
    assert.equal(querySelectorAllCalls[0], '.d_items-list-item');
  });

  it('should invoke onLoad callback deferred in next tick', async () => {
    let loadedEl: any = null;
    const ref: RefProps = {
      onLoad: (el) => {
        loadedEl = el;
      },
    };
    const newProps = { _id: 'd_test', ref };
    bindRef('div', newProps, mockEl, {} as any);

    assert.equal(loadedEl, null, 'onLoad must not be called synchronously');
    // Wait for microtask queue
    await Promise.resolve();
    await Promise.resolve();
    assert.equal(loadedEl, mockEl, 'onLoad must be called with mounted element');
  });

  it('should safely return null/empty array on Comment nodes (e.g. Fragments)', () => {
    const commentEl: any = { nodeType: 8 };
    const ref: RefProps = {};
    const newProps = { _id: 'd_fragment', ref };
    bindRef('Fragment', newProps, commentEl, {} as any);

    assert.equal(ref.$!('.&-btn'), null);
    assert.deepEqual(ref.$all!('.&-btn'), []);
  });
});
