import { ToolCallback } from '@modelcontextprotocol/sdk/server/mcp.js';
import { analyzeDiffInputSchema } from './inputSchema.js';

/**
 * Analyzes a git diff against cursor rules to identify rule violations
 * @param args - Tool arguments containing diff content and rules
 * @returns Analysis result with any rule violations found
 */
export const analyzeDiff: ToolCallback<{
  params: typeof analyzeDiffInputSchema;
}> = async (args) => {
  const { diff, rules } = args.params;
  if (rules) {
    return {
      content: [
        {
          type: 'text',
          text: `Rules from ${rules}:\n${rules}\n\nDiff: ${diff}`,
        },
      ],
    };
  }
  return {
    content: [
      {
        type: 'text',
        text: `No rules found. Please add rules to your repository.`,
      },
    ],
  };
};
