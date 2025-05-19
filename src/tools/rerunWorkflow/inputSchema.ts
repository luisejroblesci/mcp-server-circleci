import { z } from 'zod';
import { workflowUrlDescription } from '../sharedInputSchemas.js';

export const rerunWorkflowInputSchema = z.object({
  workflowId: z
    .string()
    .describe(
      'This should be the workflowId of the workflow that need rerun. The workflowId is an UUID. An example workflowId is a12145c5-90f8-4cc9-98f2-36cb85db9e4b',
    )
    .optional(),
  fromFailed: z
    .boolean()
    .describe(
      'This should be true by default. If the user wants to rerun workflow from start, set this to false',
    )
    .optional(),
  workflowURL: z.string().describe(workflowUrlDescription).optional(),
});
