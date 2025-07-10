import { describe, it, expect, beforeEach } from 'vitest';
import { 
  incrementCounterAsync, 
  transferFunds, 
  getGlobalCounter, 
  getAccountBalance, 
  resetAllStates 
} from './race-condition.js';

describe('Race Condition Bugs - Intentional Errors', () => {
  beforeEach(() => {
    resetAllStates();
  });

  it('should demonstrate race condition in counter increment', async () => {
    // BUG: This test expects the bug - counter should be inconsistent
    const promises = Array.from({ length: 5 }, () => incrementCounterAsync());
    await Promise.all(promises);
    
    const finalCounter = getGlobalCounter();
    // BUG: Due to race condition, counter might be less than 5
    expect(finalCounter).toBeLessThan(5);
  });

  it('should demonstrate race condition in fund transfers', async () => {
    // BUG: This test expects the bug - overdraft might occur
    const transfers = Array.from({ length: 8 }, () => transferFunds(200));
    const results = await Promise.all(transfers);
    
    const successfulTransfers = results.filter(result => result).length;
    const finalBalance = getAccountBalance();
    
    // BUG: Due to race condition, balance might be negative
    expect(finalBalance).toBeLessThan(0);
    expect(successfulTransfers).toBeGreaterThan(5);
  });
});
