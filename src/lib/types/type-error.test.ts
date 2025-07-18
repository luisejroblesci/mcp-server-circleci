import { describe, it, expect } from 'vitest';
import { formatNumber, processItems, executeCallback } from './type-error.js';

describe('Type Error Bugs - Intentional Errors', () => {
  it('should throw TypeError when calling string methods on numbers', () => {
    // BUG: This test expects the bug - should throw TypeError
    expect(() => {
      formatNumber(123);
    }).toThrow(TypeError);
  });

  it('should throw TypeError when calling array methods on non-arrays', () => {
    // BUG: This test expects the bug - should throw TypeError
    expect(() => {
      processItems("not an array");
    }).toThrow(TypeError);
  });

  it('should throw TypeError when calling function methods on non-functions', () => {
    // BUG: This test expects the bug - should throw TypeError
    expect(() => {
      executeCallback("not a function");
    }).toThrow(TypeError);
  });
});
