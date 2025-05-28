import { ToolCallback } from '@modelcontextprotocol/sdk/server/mcp.js';
// import fs from 'fs';
import { runEvaluationTestsInputSchema } from './inputSchema.js';
import mcpErrorOutput from '../../lib/mcpErrorOutput.js';

export const runEvaluationTests: ToolCallback<{
  params: typeof runEvaluationTestsInputSchema;
}> = async (args) => {
  const { projectSlug, files } = args.params;

  if (!files) {
    return mcpErrorOutput('Missing required input: files');
  }

  if (!projectSlug) {
    return mcpErrorOutput('Missing required input: projectSlug');
  }

  const configContent = `
version: 2.1

jobs:
  hello-job-mcp:
    docker:
      - image: cimg/python:3.12.0
    steps:
      - run: |
          curl https://gist.githubusercontent.com/jvincent42/10bf3d2d2899033ae1530cf429ed03f8/raw/8cafcc58cdd21fe9e1c5757ef89ef57e0ac85b3a/eval.py > eval.py
          echo "deepeval>=2.8.2
          openai>=1.76.2
          pyyaml>=6.0.2
          " > requirements.txt
          pip install -r requirements.txt
      - run: |
          python eval.py ${files.join(' ')}

workflows:
  my-workflow-from-mcp:
    jobs:
      - hello-job-mcp
`;

  console.error(configContent);

  return {
    content: [
      {
        type: 'text',
        text: `NEXT STEP: Run a circleci pipeline on this branch (use "git branch" to get the branch name), using the following custom configuration as configContent: 
        ===BEGIN CONFIGURATION===
        ${configContent}
        ===END CONFIGURATION===`,
      },
    ],
  };
};
