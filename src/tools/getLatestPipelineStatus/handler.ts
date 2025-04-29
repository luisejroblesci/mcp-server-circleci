import { ToolCallback } from '@modelcontextprotocol/sdk/server/mcp.js';
import { getLatestPipelineStatusInputSchema } from './inputSchema.js';
import { getProjectSlugFromURL } from '../../lib/project-detection/index.js';
import mcpErrorOutput from '../../lib/mcpErrorOutput.js';
import { identifyProjectSlug } from '../../lib/project-detection/index.js';
import { getLatestPipelineWorkflows } from '../../lib/latest-pipeline/getLatestPipelineWorkflows.js';
import { formatLatestPipelineStatus } from '../../lib/latest-pipeline/formatLatestPipelineStatus.js';

export const getLatestPipelineStatus: ToolCallback<{
  params: typeof getLatestPipelineStatusInputSchema;
}> = async (args) => {
  const { workspaceRoot, gitRemoteURL, branch, projectURL } = args.params;

  let projectSlug: string | null | undefined;

  if (projectURL) {
    projectSlug = getProjectSlugFromURL(projectURL);
  } else if (workspaceRoot && gitRemoteURL) {
    projectSlug = await identifyProjectSlug({
      gitRemoteURL,
    });
  } else {
    return mcpErrorOutput(
      'No inputs provided. Ask the user to provide the inputs user can provide based on the tool description.',
    );
  }

  if (!projectSlug) {
    return mcpErrorOutput(`
          Project not found. Ask the user to provide the inputs user can provide based on the tool description.

          Project slug: ${projectSlug}
          Git remote URL: ${gitRemoteURL}
          Branch: ${branch}
          `);
  }

  const latestPipelineWorkflows = await getLatestPipelineWorkflows({
    projectSlug,
    branch,
  });

  return formatLatestPipelineStatus(latestPipelineWorkflows);
};
