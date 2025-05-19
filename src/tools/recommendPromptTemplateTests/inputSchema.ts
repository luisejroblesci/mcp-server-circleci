import { z } from 'zod';
import { PromptOrigin, promptIterationToolchain } from '../shared/types.js';
export const recommendPromptTemplateTestsInputSchema = z.object({
  template: z
    .string()
    .describe(
      `The prompt template to be tested. Use the \`promptTemplate\` from the latest \`${promptIterationToolchain.createPromptTemplate}\` tool output (if available).`,
    ),
  contextSchema: z
    .record(z.string(), z.string())
    .describe(
      `The context schema that defines the expected input parameters for the prompt template. Use the \`contextSchema\` from the latest \`${promptIterationToolchain.createPromptTemplate}\` tool output.`,
    ),
  promptOrigin: z
    .string()
    .describe(
      `The origin of the prompt template, indicating where it came from (e.g. "${PromptOrigin.codebase}" or "${PromptOrigin.requirements}").`,
    ),
});
