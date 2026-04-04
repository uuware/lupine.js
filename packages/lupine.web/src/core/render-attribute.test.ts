import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { renderAttribute, genUniqueId } from './render-attribute';
import { uniqueIdGenerator } from '../lib/unique-id';

describe('renderAttribute', () => {
  it('should generate a tag ID if missing and return the same ID subsequently', () => {
    const props: any = {};
    const id = genUniqueId(props);
    assert.equal(typeof id, 'string');
    assert.ok(id.length > 0);
    assert.equal(props._id, id);
    assert.equal(genUniqueId(props), id, 'Should reuse existing _id');
  });

  it('should filter out internal props like children, key, _result, _html', () => {
    const props = { children: [], key: '123', _result: {}, _html: [], name: 'test' };
    const result = renderAttribute('div', props, null);
    assert.ok(!result.includes('children'));
    assert.ok(!result.includes('key='));
    assert.ok(result.includes('name="test"'));
  });

  it('should render inline style object efficiently via camelToHyphens', () => {
    const props = { style: { backgroundColor: 'red', fontSize: '12px' } };
    const result = renderAttribute('div', props, null);
    assert.ok(result.includes('style="background-color:red;font-size:12px;"'));
  });

  it('should render style as a string directly if not an object', () => {
    const props = { style: 'color: blue;' };
    const result = renderAttribute('div', props, null);
    assert.ok(result.includes('style="color: blue;"'));
  });

  it('should generate an ID for css and event handlers (onXXX)', () => {
    const props1: any = { css: 'body { color: red; }' };
    renderAttribute('div', props1, null);
    assert.ok(props1._id);

    const props2: any = { onClick: () => {} };
    renderAttribute('button', props2, null);
    assert.ok(props2._id);
  });

  it('should convert boolean attributes correctly', () => {
    const props: any = { defaultChecked: true, readonly: true, disabled: false, selected: 'selected' };
    const result = renderAttribute('input', props, null);
    assert.ok(result.includes('checked="true"'));
    assert.ok(result.includes('readonly="true"'));
    assert.ok(!result.includes('disabled='));
    assert.ok(result.includes('selected="selected"'));
  });

  it('should assign a ref ID and inject data-ref marker', () => {
    const fakeRef: any = { id: '' };
    const props: any = { ref: fakeRef };
    const result = renderAttribute('div', props, null);
    assert.ok(result.includes('data-ref'), 'Should contain data-ref marker');
    assert.ok(fakeRef.id, 'Should inject _id into ref');
    assert.equal(fakeRef.id, props._id);
  });

  it('should handle class and className joining, appending unique and global markers automatically', () => {
    const props: any = { className: 'my-class', css: 'body { }' };
    genUniqueId(props);
    const result = renderAttribute('div', props, null);
    // Because css is present, props._id should be injected as the first class
    assert.ok(result.includes(`class="${props._id} my-class"`));
  });

  it('should resolve ampersand & markers in classes with globalCssId and uniqueClassName', () => {
    const props = { class: 'btn &-active' };
    // Just testing string replacement logic for global CSS
    const result = renderAttribute('div', props, null, 'unique123', 'global456');
    // & resolves to both global and unique if both present
    assert.ok(result.includes('class="btn global456-active unique123-active"'));
  });

  it('should resolve ampersand & markers with only global or only unique prefixes', () => {
    let result = renderAttribute('div', { class: '&-hover' }, null, undefined, 'global-only');
    assert.ok(result.includes('class="global-only-hover"'));
    
    result = renderAttribute('div', { class: '&-hover' }, null, 'unique-only', undefined);
    assert.ok(result.includes('class="unique-only-hover"'));
  });
});
