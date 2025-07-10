/**
 * Intentional Bug: JSON Parse errors
 * Calling JSON.parse on non-string values or invalid JSON
 */

/**
 * Bug: No type checking before JSON.parse
 */
export function parseApiResponse(response: unknown): any {
  // BUG: No type checking - will fail if response is not a string
  return JSON.parse(response as string);
}

/**
 * Bug: Parsing number as JSON
 */
export function parseNumericResponse(response: number): any {
  // BUG: Numbers are not valid JSON strings
  return JSON.parse(response as any);
}

/**
 * Bug: Parsing boolean as JSON
 */
export function parseBooleanResponse(response: boolean): any {
  // BUG: Booleans are not valid JSON strings
  return JSON.parse(response as any);
}

/**
 * Bug: Parsing undefined/null as JSON
 */
export function parseEmptyResponse(response: undefined | null): any {
  // BUG: undefined/null are not valid JSON strings
  return JSON.parse(response as any);
}

/**
 * Bug: Parsing object as JSON string
 */
export function reParseObject(obj: object): any {
  // BUG: Objects are not JSON strings, this will fail
  return JSON.parse(obj as any);
}
