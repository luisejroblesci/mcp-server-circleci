import { describe, it, expect } from 'vitest';
import { analyzeDiff } from './handler.js';

describe('analyzeDiff', () => {
  it('should return formatted output when rules are provided', async () => {
    const mockArgs = {
      params: {
        diff: 'diff --git a/test.ts b/test.ts\n+console.log("test");',
        rules: 'Rule 1: No console.log statements\nRule 2: Use proper logging',
      },
    };

    const controller = new AbortController();
    const result = await analyzeDiff(mockArgs, { signal: controller.signal });

    expect(result).toEqual({
      content: [
        {
          type: 'text',
          text: `Rules from ${mockArgs.params.rules}:\n${mockArgs.params.rules}\n\nDiff: ${mockArgs.params.diff}`,
        },
      ],
    });
  });

  it('should return no rules message when rules are not provided', async () => {
    const mockArgs = {
      params: {
        diff: 'diff --git a/test.ts b/test.ts\n+console.log("test");',
        rules: '',
      },
    };

    const controller = new AbortController();
    const result = await analyzeDiff(mockArgs, { signal: controller.signal });

    expect(result).toEqual({
      content: [
        {
          type: 'text',
          text: 'No rules found. Please add rules to your repository.',
        },
      ],
    });
  });

  it('should return no rules message when rules are empty string', async () => {
    const mockArgs = {
      params: {
        diff: 'diff --git a/test.ts b/test.ts\n+console.log("test");',
        rules: '',
      },
    };

    const controller = new AbortController();
    const result = await analyzeDiff(mockArgs, { signal: controller.signal });

    expect(result).toEqual({
      content: [
        {
          type: 'text',
          text: 'No rules found. Please add rules to your repository.',
        },
      ],
    });
  });

  it('should handle empty diff with rules provided', async () => {
    const mockArgs = {
      params: {
        diff: '',
        rules: 'Rule 1: No console.log statements',
      },
    };

    const controller = new AbortController();
    const result = await analyzeDiff(mockArgs, { signal: controller.signal });

    expect(result).toEqual({
      content: [
        {
          type: 'text',
          text: `Rules from ${mockArgs.params.rules}:\n${mockArgs.params.rules}\n\nDiff: `,
        },
      ],
    });
  });

  it('should handle complex diff content with multiple rules', async () => {
    const mockArgs = {
      params: {
        diff: `diff --git a/src/component.ts b/src/component.ts
index 1234567..abcdefg 100644
--- a/src/component.ts
+++ b/src/component.ts
@@ -1,5 +1,8 @@
 export class Component {
+  private data: any = {};
+  
   constructor() {
+    console.log("Component created");
   }
 }`,
        rules: `Rule 1: No console.log statements
Rule 2: Avoid using 'any' type
Rule 3: Use proper TypeScript types
---
Rule 4: All functions must have JSDoc comments`,
      },
    };

    const controller = new AbortController();
    const result = await analyzeDiff(mockArgs, { signal: controller.signal });

    expect(result).toEqual({
      content: [
        {
          type: 'text',
          text: `Rules from ${mockArgs.params.rules}:\n${mockArgs.params.rules}\n\nDiff: ${mockArgs.params.diff}`,
        },
      ],
    });
  });

  it('should handle multiline rules and preserve formatting', async () => {
    const mockArgs = {
      params: {
        diff: '+const x = 5;\n+console.log(x);',
        rules: `# Cursor Rules Example

## Rule: No Console Logs
Description: Remove all console.log statements before committing code.

## Rule: TypeScript Safety
Description: Avoid using 'any' type.`,
      },
    };

    const controller = new AbortController();
    const result = await analyzeDiff(mockArgs, { signal: controller.signal });

    expect(result.content[0].type).toBe('text');
    expect(result.content[0].text).toContain('Rules from');
    expect(result.content[0].text).toContain('No Console Logs');
    expect(result.content[0].text).toContain('TypeScript Safety');
    expect(result.content[0].text).toContain('Diff: +const x = 5;');
  });

  it('should handle whitespace-only rules as truthy', async () => {
    const mockArgs = {
      params: {
        diff: 'diff --git a/test.ts b/test.ts\n+const test = true;',
        rules: '   \n\t  \n   ',
      },
    };

    const controller = new AbortController();
    const result = await analyzeDiff(mockArgs, { signal: controller.signal });

    // Whitespace-only string should be treated as truthy in JavaScript
    expect(result).toEqual({
      content: [
        {
          type: 'text',
          text: `Rules from    \n\t  \n   :\n   \n\t  \n   \n\nDiff: diff --git a/test.ts b/test.ts\n+const test = true;`,
        },
      ],
    });
  });
});
