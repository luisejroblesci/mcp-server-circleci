import { describe, it, expect } from 'vitest';
import { getFirstChar, getLastChar, getCharsAtPositions } from './string-index.js';

describe('String Index Bugs - Intentional Errors', () => {
  it('should return undefined when getting first char of empty string', () => {
    // BUG: This test expects the bug - should return undefined
    const result = getFirstChar('');
    expect(result).toBeUndefined();
  });

  it('should return undefined when getting last char incorrectly', () => {
    // BUG: This test expects the bug - using length instead of length-1
    const result = getLastChar('hello');
    expect(result).toBeUndefined();
  });

  it('should return undefined elements for out-of-bounds positions', () => {
    // BUG: This test expects the bug - accessing invalid positions
    const result = getCharsAtPositions('hello', [0, 1, 10]);
    expect(result).toEqual(['h', 'e', undefined]);
  });
});
