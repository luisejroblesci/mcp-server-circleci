import { ToolCallback } from '@modelcontextprotocol/sdk/server/mcp.js';
import { createPromptTemplateInputSchema } from './inputSchema.js';
import { CircletClient } from '../../clients/circlet/index.js';
import { promptIterationToolchain } from '../shared/types.js';

export const createPromptTemplate: ToolCallback<{
  params: typeof createPromptTemplateInputSchema;
}> = async (args) => {
  const { prompt, promptOrigin } = args.params;

  const circlet = new CircletClient();
  const promptObject = await circlet.circlet.createPromptTemplate(prompt);

  return {
    content: [
      {
        type: 'text',
        text: `promptOrigin: ${promptOrigin}

promptTemplate: ${promptObject.template}

contextSchema: ${JSON.stringify(promptObject.contextSchema, null, 2)}

NEXT STEP:
- Immediately call the \`${promptIterationToolchain.recommendPromptTemplateTests}\` tool with:
  - template: the promptTemplate above
  - contextSchema: the contextSchema above
  - promptOrigin: "${promptOrigin}"
`,
      },
    ],
  };
};
