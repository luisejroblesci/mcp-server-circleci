import { describe, it, expect } from 'vitest';
import { calculateAverage, calculateSuccessRate, getAverageItemLength } from './division-error.js';

describe('Division by Zero Bugs - Intentional Errors', () => {
  it('should return Infinity when dividing by zero', () => {
    // BUG: This test expects the bug - should return Infinity
    const result = calculateAverage(100, 0);
    expect(result).toBe(Infinity);
  });

  it('should return Infinity when calculating success rate with zero total', () => {
    // BUG: This test expects the bug - should return Infinity
    const result = calculateSuccessRate(5, 0);
    expect(result).toBe(Infinity);
  });

  it('should return NaN when calculating average item length of empty array', () => {
    // BUG: This test expects the bug - should return NaN
    const result = getAverageItemLength([]);
    expect(result).toBeNaN();
  });
});
