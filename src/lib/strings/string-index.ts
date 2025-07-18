/**
 * Intentional Bug: String index errors
 * Accessing string indices without checking bounds
 */

/**
 * Bug: Accessing string character without bounds checking
 */
export function getFirstChar(text: string): string {
  // BUG: Will return undefined if text is empty
  return text[0];
}

/**
 * Bug: Accessing last character incorrectly
 */
export function getLastChar(text: string): string {
  // BUG: Using length instead of length-1
  return text[text.length];
}

/**
 * Bug: Accessing specific indices without validation
 */
export function getCharsAtPositions(text: string, positions: number[]): string[] {
  // BUG: No validation that positions are within bounds
  return positions.map(pos => text[pos]);
}

/**
 * Bug: String slicing without bounds checking
 */
export function getFirstThreeChars(text: string): string {
  // BUG: No check if string has at least 3 characters
  return text[0] + text[1] + text[2];
}

/**
 * Bug: String character access with dynamic indices
 */
export function extractPattern(text: string, pattern: number[]): string {
  // BUG: No bounds checking for pattern indices
  return pattern.map(index => text[index]).join('');
}
