import { describe, it, expect, vi } from 'vitest';
import { AsyncErrorClient } from './async-error.js';

describe('AsyncErrorClient - Intentional Bugs', () => {
  let client: AsyncErrorClient;

  beforeEach(() => {
    client = new AsyncErrorClient();
  });

  it('should return a Promise instead of actual data due to missing await', async () => {
    // BUG: This test expects the bug - the result should be a Promise
    const result = await client.fetchPipeline('gh/test/repo');
    expect(result).toBeInstanceOf(Promise);
  });

  it('should fail when trying to access properties on Promise object', async () => {
    // BUG: This test expects the bug - accessing properties on Promise should fail
    try {
      await client.fetchAndProcessPipeline('gh/test/repo');
      expect(true).toBe(false); // This should not be reached
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
