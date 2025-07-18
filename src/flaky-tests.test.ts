import { describe, it, expect } from 'vitest';

describe('Intentionally Flaky Tests', () => {
  it('should fail randomly based on timing (70% failure rate)', async () => {
    const startTime = Date.now();
    
    // Simulate some async work
    await new Promise(resolve => setTimeout(resolve, Math.random() * 100));
    
    const endTime = Date.now();
    const executionTime = endTime - startTime;
    
    // Fail if execution time is within a specific range (roughly 70% chance)
    // Range covers 70ms out of 100ms possible range
    if (executionTime >= 15 && executionTime <= 85) {
      throw new Error(`Flaky Test 1: Execution time ${executionTime}ms was in failure range [15-85ms]`);
    }
    
    expect(executionTime).toBeGreaterThan(0);
  });

  it('should fail based on random chance (70% failure rate)', async () => {
    const randomValue = Math.random();
    
    // Simulate some processing
    await new Promise(resolve => setTimeout(resolve, 50));
    
    // Fail 70% of the time
    if (randomValue < 0.70) {
      throw new Error(`Flaky Test 2: Random failure triggered (${randomValue.toFixed(3)} < 0.70)`);
    }
    
    expect(randomValue).toBeGreaterThanOrEqual(0);
  });

  it('should fail due to simulated network timeout (70% failure rate)', async () => {
    const networkDelay = Math.random() * 200; // 0-200ms
    
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Fail if "network" is too slow (70% chance)
          // 70% of 200ms = 140ms, so fail if delay > 60ms
          if (networkDelay > 60) {
            reject(new Error(`Flaky Test 3: Simulated network timeout after ${networkDelay.toFixed(1)}ms`));
          } else {
            resolve('success');
          }
        }, networkDelay);
      });
    } catch (error) {
      throw error;
    }
    
    expect(networkDelay).toBeLessThanOrEqual(60);
  });

  it('should fail due to simulated resource contention (70% failure rate)', async () => {
    const resourceCheck = Math.random();
    
    // Simulate resource-intensive operation
    await new Promise(resolve => setTimeout(resolve, 30));
    
    // Fail 70% of the time based on simple random check
    if (resourceCheck < 0.70) {
      const memoryUsage = (Math.random() * 30 + 70).toFixed(1); // 70-100% to make it look realistic
      const cpuUsage = (Math.random() * 30 + 70).toFixed(1); // 70-100% to make it look realistic
      throw new Error(`Flaky Test 4: Resource contention - Memory: ${memoryUsage}%, CPU: ${cpuUsage}%`);
    }
    
    expect(resourceCheck).toBeGreaterThanOrEqual(0);
  });
});
