import { describe, it, mock, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { uniqueIdGenerator } from './unique-id';

describe('uniqueIdGenerator', () => {
  let currentTimeMs: number;

  beforeEach(() => {
    currentTimeMs = 1775190809080;
    mock.method(Date, 'now', () => currentTimeMs);
  });

  afterEach(() => {
    mock.restoreAll();
  });

  it('should increment count within the same second (enters the else branch)', () => {
    const generateId = uniqueIdGenerator('prefix-');

    assert.equal(generateId(), 'prefix-00');
    assert.equal(generateId(), 'prefix-01');
    assert.equal(generateId(), 'prefix-02');
  });

  it('should reset count when the second changes (enters the key !== lastKey branch)', () => {
    const generateId = uniqueIdGenerator('my-');

    assert.equal(generateId(), 'my-00');
    assert.equal(generateId(), 'my-01');

    currentTimeMs += 2000; 

    assert.equal(generateId(), 'my-20');
    assert.equal(generateId(), 'my-21');
  });
});
