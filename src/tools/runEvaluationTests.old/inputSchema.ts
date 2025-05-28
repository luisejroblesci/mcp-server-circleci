import { z } from 'zod';

export const runEvaluationTestsInputSchema = z.object({
  projectSlug: z
    .string()
    .describe(
      'The project slug obtained from listFollowedProjects tool (e.g., "gh/organization/project").',
    ),
  files: z
    .array(z.string())
    .describe('Array of paths to prompt template files'),
});
