import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { camelToHyphens } from './camel-to-hyphens';

describe('camelToHyphens', () => {
  it('should convert standard camelCase to hyphens', () => {
    assert.equal(camelToHyphens('backgroundColor'), 'background-color');
    assert.equal(camelToHyphens('fontSize'), 'font-size');
  });

  it('should handle single lowercase word unchanged', () => {
    assert.equal(camelToHyphens('color'), 'color');
    assert.equal(camelToHyphens('padding'), 'padding');
  });

  it('should work with multiple uppercase letters consecutively (but note native conversion behavior vs standard)', () => {
    // If strict camel case logic is intended: webkitTransition -> webkit-transition
    assert.equal(camelToHyphens('webkitTransition'), 'webkit-transition');
    assert.equal(camelToHyphens('borderBottomWidth'), 'border-bottom-width');
  });

  it('should convert PascalCase starting with uppercase', () => {
    // Current native logic blindly replaces uppercase, meaning WebkitTransition -> -webkit-transition
    assert.equal(camelToHyphens('WebkitTransition'), '-webkit-transition');
  });
});
