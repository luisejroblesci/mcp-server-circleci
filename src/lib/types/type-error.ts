/**
 * Intentional Bug: Type errors
 * Calling methods on wrong types or assuming incorrect types
 */

/**
 * Bug: Calling string methods on numbers
 */
export function formatNumber(value: unknown): string {
  // BUG: Assuming value is a string, calling string methods on potentially non-string
  return (value as string).toUpperCase().trim();
}

/**
 * Bug: Calling array methods on non-arrays
 */
export function processItems(items: unknown): number {
  // BUG: Assuming items is an array, calling array methods on potentially non-array
  return (items as any[]).length;
}

/**
 * Bug: Calling function methods on non-functions
 */
export function executeCallback(callback: unknown): any {
  // BUG: Assuming callback is a function, calling function methods on potentially non-function
  return (callback as Function).call(null);
}

/**
 * Bug: Calling date methods on non-dates
 */
export function formatDate(date: unknown): string {
  // BUG: Assuming date is a Date, calling Date methods on potentially non-Date
  return (date as Date).toISOString();
}
