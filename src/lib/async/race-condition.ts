/**
 * Intentional Bug: Race condition errors
 * Concurrent operations without proper synchronization
 */

let globalCounter = 0;
let accountBalance = 1000;

/**
 * Bug: Unsynchronized global counter increment
 */
export async function incrementCounterAsync(): Promise<number> {
  // BUG: Race condition - multiple calls can interfere with each other
  const currentValue = globalCounter;
  await new Promise(resolve => setTimeout(resolve, Math.random() * 10));
  globalCounter = currentValue + 1;
  return globalCounter;
}

/**
 * Bug: Balance transfer without proper locking
 */
export async function transferFunds(amount: number): Promise<boolean> {
  // BUG: Race condition - classic banking problem
  const currentBalance = accountBalance;
  await new Promise(resolve => setTimeout(resolve, Math.random() * 20));
  
  if (currentBalance >= amount) {
    accountBalance = currentBalance - amount;
    return true;
  }
  return false;
}

/**
 * Getters for testing
 */
export function getGlobalCounter(): number {
  return globalCounter;
}

export function getAccountBalance(): number {
  return accountBalance;
}

export function resetAllStates(): void {
  globalCounter = 0;
  accountBalance = 1000;
}
