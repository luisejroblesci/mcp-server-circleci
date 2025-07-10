import { describe, it, expect } from 'vitest';
import { parseApiResponse, parseNumericResponse, parseBooleanResponse } from './json-parser.js';

describe('JSON Parser Bugs - Intentional Errors', () => {
  it('should throw SyntaxError when parsing non-string values', () => {
    // BUG: This test expects the bug - should throw SyntaxError
    expect(() => {
      parseApiResponse(123);
    }).toThrow(SyntaxError);
  });

  it('should throw when parsing numbers as JSON', () => {
    // BUG: This test expects the bug - should throw SyntaxError
    expect(() => {
      parseNumericResponse(42);
    }).toThrow(SyntaxError);
  });

  it('should throw when parsing booleans as JSON', () => {
    // BUG: This test expects the bug - should throw SyntaxError
    expect(() => {
      parseBooleanResponse(true);
    }).toThrow(SyntaxError);
  });
});
