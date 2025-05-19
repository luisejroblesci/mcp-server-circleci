import { ToolCallback } from '@modelcontextprotocol/sdk/server/mcp.js';
import { createPromptTemplateInputSchema } from './inputSchema.js';
import { CircletClient } from '../../clients/circlet/index.js';
import { PromptTemplateWorkbenchTool } from '../shared/types.js';

const promptOriginKey = 'promptOrigin';
const promptTemplateKey = 'promptTemplate';
const contextSchemaKey = 'contextSchema';

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
        text: `${promptOriginKey}: ${promptOrigin}

${promptTemplateKey}: ${promptObject.template}

${contextSchemaKey}: ${JSON.stringify(promptObject.contextSchema, null, 2)}

NEXT STEP:
- Immediately call the \`${PromptTemplateWorkbenchTool.recommend_prompt_template_tests}\` tool with:
  - template: the \`${promptTemplateKey}\` above
  - ${contextSchemaKey}: the \`${contextSchemaKey}\` above
  - ${promptOriginKey}: the \`${promptOriginKey}\` above
`,
      },
    ],
  };
};
