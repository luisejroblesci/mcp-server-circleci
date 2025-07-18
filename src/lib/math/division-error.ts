/**
 * Intentional Bug: Division by zero errors
 * Performing division without checking for zero divisor
 */

/**
 * Bug: No zero check before division
 */
export function calculateAverage(total: number, count: number): number {
  // BUG: No check if count is zero
  return total / count;
}

/**
 * Bug: Division by potentially zero dynamic values
 */
export function calculateSuccessRate(successful: number, total: number): number {
  // BUG: No check if total is zero
  return (successful / total) * 100;
}

/**
 * Bug: Division in array length calculations
 */
export function getAverageItemLength(items: string[]): number {
  const totalLength = items.reduce((sum, item) => sum + item.length, 0);
  // BUG: No check if items.length is zero
  return totalLength / items.length;
}

/**
 * Bug: Division in ratio calculations
 */
export function calculateRatio(numerator: number, denominator: number): number {
  // BUG: No check if denominator is zero
  return numerator / denominator;
}
