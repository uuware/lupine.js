import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { HtmlVar } from './html-var';

describe('HtmlVar - Dynamic Reactive Container Engine', () => {
  it('should initialize with string value and expose Fragment VNode', () => {
    const dom = new HtmlVar('Initial Content');
    assert.equal(dom.value, 'Initial Content');

    const node = dom.node;
    assert.equal(node.type, 'Fragment');
    assert.equal(node.props.children, 'Initial Content');
    assert.ok(node.props.ref, 'Node must expose a RefProps lifecycle bridge');
  });

  it('should support VNode as initial value', () => {
    const initialVNode = { type: 'span', props: { children: ['Hello VNode'] } };
    const dom = new HtmlVar(initialVNode as any);
    assert.deepEqual(dom.value, initialVNode);

    const node = dom.node;
    assert.equal(node.type, 'Fragment');
    assert.deepEqual(node.props.children, initialVNode);
  });

  it('should delay rendering when initial value is an async loader function', () => {
    const loader = async () => ({ type: 'div', props: { children: ['Async Data'] } });
    const dom = new HtmlVar(loader as any);

    const node = dom.node;
    assert.equal(node.type, 'Fragment');
    assert.equal(node.props.children, '', 'SSR must leave children empty for delayed loader');
  });

  it('should read innerHTML from ref.current when mounted in DOM', () => {
    const dom = new HtmlVar('raw initial');
    const mockElement: any = { innerHTML: '<p>Live DOM Element Content</p>' };

    // Simulate runtime element mounting
    dom.ref.current = mockElement;

    assert.equal(dom.value, '<p>Live DOM Element Content</p>');
  });

  it('should trigger mountInnerComponent and resolve waitUpdate when dom.value is updated', async () => {
    const dom = new HtmlVar('initial');
    const mountedValues: any[] = [];

    // Wire up mock element and mounter
    dom.ref.current = { innerHTML: 'initial' } as any;
    dom.ref.mountInnerComponent = async (val: any) => {
      mountedValues.push(val);
      dom.ref.current.innerHTML = typeof val === 'string' ? val : 'vnode';
    };

    dom.value = 'Updated Text';
    await dom.waitUpdate();

    assert.equal(mountedValues.length, 1);
    assert.equal(mountedValues[0], 'Updated Text');
    assert.equal(dom.value, 'Updated Text');
  });

  it('should resolve async function values upon update', async () => {
    const dom = new HtmlVar('start');
    const mountedValues: any[] = [];

    dom.ref.current = { innerHTML: 'start' } as any;
    dom.ref.mountInnerComponent = async (val: any) => {
      mountedValues.push(val);
      dom.ref.current.innerHTML = String(val);
    };

    dom.value = async () => {
      await new Promise((r) => setTimeout(r, 10));
      return 'Async Result Loaded';
    };

    await dom.waitUpdate();
    assert.equal(mountedValues.length, 1);
    assert.equal(mountedValues[0], 'Async Result Loaded');
  });

  it('should handle rapid consecutive updates sequentially without race conditions', async () => {
    const dom = new HtmlVar('v0');
    const mountSequence: any[] = [];

    dom.ref.current = { innerHTML: 'v0' } as any;
    dom.ref.mountInnerComponent = async (val: any) => {
      // Simulate minor async render lag
      await new Promise((r) => setTimeout(r, 5));
      mountSequence.push(val);
      dom.ref.current.innerHTML = String(val);
    };

    // Trigger rapid consecutive updates
    dom.value = 'v1';
    dom.value = 'v2';
    dom.value = 'v3';

    await dom.waitUpdate();

    // Final state must strictly reflect the last assigned value 'v3'
    assert.equal(dom.value, 'v3');
    assert.ok(mountSequence.includes('v3'), 'Must have mounted the final value');
  });
});
