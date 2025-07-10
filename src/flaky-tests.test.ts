import { describe, it, expect } from 'vitest';

describe('Intentionally Flaky Tests', () => {
  it('should fail randomly based on timing (30% failure rate)', async () => {
    const startTime = Date.now();
    
    // Simulate some async work
    await new Promise(resolve => setTimeout(resolve, Math.random() * 100));
    
    const endTime = Date.now();
    const executionTime = endTime - startTime;
    
    // Fail if execution time is within a specific range (roughly 30% chance)
    if (executionTime >= 25 && executionTime <= 55) {
      throw new Error(`Flaky Test 1: Execution time ${executionTime}ms was in failure range [25-55ms]`);
    }
    
    expect(executionTime).toBeGreaterThan(0);
  });

  it('should fail based on random chance (25% failure rate)', async () => {
    const randomValue = Math.random();
    
    // Simulate some processing
    await new Promise(resolve => setTimeout(resolve, 50));
    
    // Fail 25% of the time
    if (randomValue < 0.25) {
      throw new Error(`Flaky Test 2: Random failure triggered (${randomValue.toFixed(3)} < 0.25)`);
    }
    
    expect(randomValue).toBeGreaterThanOrEqual(0);
  });

  it('should fail due to simulated network timeout (20% failure rate)', async () => {
    const networkDelay = Math.random() * 200; // 0-200ms
    
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Fail if "network" is too slow (20% chance)
          if (networkDelay > 160) {
            reject(new Error(`Flaky Test 3: Simulated network timeout after ${networkDelay.toFixed(1)}ms`));
          } else {
            resolve('success');
          }
        }, networkDelay);
      });
    } catch (error) {
      throw error;
    }
    
    expect(networkDelay).toBeLessThanOrEqual(160);
  });

  it('should fail due to simulated resource contention (35% failure rate)', async () => {
    const memoryUsage = Math.random() * 100; // Simulated memory usage percentage
    const cpuUsage = Math.random() * 100; // Simulated CPU usage percentage
    
    // Simulate resource-intensive operation
    await new Promise(resolve => setTimeout(resolve, 30));
    
    // Fail if both memory and CPU are high, or if memory is very high
    const resourceFailure = (memoryUsage > 70 && cpuUsage > 70) || memoryUsage > 85;
    
    if (resourceFailure) {
      throw new Error(`Flaky Test 4: Resource contention - Memory: ${memoryUsage.toFixed(1)}%, CPU: ${cpuUsage.toFixed(1)}%`);
    }
    
    expect(memoryUsage).toBeLessThan(100);
    expect(cpuUsage).toBeLessThan(100);
  });
});
