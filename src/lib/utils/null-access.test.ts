import { describe, it, expect } from 'vitest';
import { getWorkflowName, getFirstJobName, getWorkflowStatus } from './null-access.js';

describe('Null Access Bugs - Intentional Errors', () => {
  it('should throw when accessing properties on undefined pipeline', () => {
    // BUG: This test expects the bug - should throw TypeError
    expect(() => {
      getWorkflowName(undefined);
    }).toThrow(TypeError);
  });

  it('should throw when accessing nested properties on undefined pipeline', () => {
    // BUG: This test expects the bug - should throw TypeError
    expect(() => {
      getFirstJobName(undefined);
    }).toThrow(TypeError);
  });

  it('should throw when accessing array elements on undefined array', () => {
    // BUG: This test expects the bug - should throw TypeError
    expect(() => {
      getWorkflowStatus(undefined);
    }).toThrow(TypeError);
  });
});
