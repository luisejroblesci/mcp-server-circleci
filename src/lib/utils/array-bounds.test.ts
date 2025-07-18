import { describe, it, expect } from 'vitest';
import { getFirstJob, getLastJob, getJobsAtPositions } from './array-bounds.js';

describe('Array Bounds Bugs - Intentional Errors', () => {
  it('should return undefined when accessing first element of empty array', () => {
    // BUG: This test expects the bug - should return undefined
    const result = getFirstJob([]);
    expect(result).toBeUndefined();
  });

  it('should return undefined when accessing last element incorrectly', () => {
    // BUG: This test expects the bug - using length instead of length-1
    const jobs = [{ id: '1', name: 'job1', status: 'success' }];
    const result = getLastJob(jobs);
    expect(result).toBeUndefined();
  });

  it('should return undefined elements for out-of-bounds positions', () => {
    // BUG: This test expects the bug - accessing invalid positions
    const jobs = [{ id: '1', name: 'job1', status: 'success' }];
    const result = getJobsAtPositions(jobs, [0, 1, 2]);
    expect(result).toEqual([jobs[0], undefined, undefined]);
  });
});
