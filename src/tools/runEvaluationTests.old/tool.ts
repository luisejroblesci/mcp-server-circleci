import { runEvaluationTestsInputSchema } from './inputSchema.js';

export const runEvaluationTestsTool = {
  name: 'run_evaluation_tests' as const,
  description: `
  This tool allows the users to run evaluation tests on a circleci pipeline.
  They can be referred to as "Prompt Tests" or "Evaluation Tests".
  
  About this tool:
  - This tool is part of a tool chain that runs evaluation tests on a circleci pipeline.
  - The tool will generate an appropriate circleci configuration file and trigger a pipeline using this temporary configuration.
  - The tool will return the project slug.

  Parameters:
  - projectSlug: string - The project slug obtained from listFollowedProjects tool (e.g., "gh/organization/project")
  - files: Array of strings - The array of paths to prompt template files to be used in the pipeline

  Example usage:
  {
    "params": {
      "projectSlug": "gh/organization/project",
      "files": [
        "path/to/prompt/template/file1.txt",
        "path/to/prompt/template/file2.txt"
      ]
    }
  }

  Returns:
  - the project slug
  `,
  inputSchema: runEvaluationTestsInputSchema,
};
