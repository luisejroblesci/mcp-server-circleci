/**
 * Intentional Bug: Accessing properties on potentially null/undefined objects
 * This will cause runtime errors when the objects are null or undefined
 */

export interface Workflow {
  id: string;
  name: string;
  status: string;
  jobs: Job[];
}

export interface Job {
  id: string;
  name: string;
  status: string;
}

export interface Pipeline {
  id: string;
  state: string;
  workflows: Workflow[];
  project: { name: string };
  trigger: { actor: { login: string } };
}

/**
 * Bug: No null check before property access
 */
export function getWorkflowName(pipeline?: Pipeline): string {
  // BUG: No null/undefined check - will throw if pipeline is undefined
  return pipeline!.workflows[0].name;
}

/**
 * Bug: Accessing nested properties without null checks
 */
export function getFirstJobName(pipeline?: Pipeline): string {
  // BUG: Multiple potential null access points
  return pipeline!.workflows[0].jobs[0].name;
}

/**
 * Bug: Assuming array has elements without checking length
 */
export function getWorkflowStatus(workflows?: Workflow[]): string {
  // BUG: No check if workflows array exists or has elements
  return workflows![0].status;
}

/**
 * Bug: Accessing properties on potentially null object from API
 */
export function formatPipelineInfo(pipeline?: Pipeline): string {
  // BUG: No null checks before accessing properties
  const workflowCount = pipeline!.workflows.length;
  const triggerUser = pipeline!.trigger.actor.login;
  
  return `Pipeline ${pipeline!.id} has ${workflowCount} workflows, triggered by ${triggerUser}`;
}

/**
 * Bug: Method chaining without null checks
 */
export function getProjectName(pipeline?: Pipeline): string {
  // BUG: Each property access could be null/undefined
  return pipeline!.project.name.toLowerCase().trim();
}

/**
 * Bug: Destructuring without null checks
 */
export function extractPipelineData(pipeline?: Pipeline): { id: string; state: string } {
  // BUG: Destructuring undefined object will throw
  const { id, state } = pipeline!;
  return { id, state };
}

/**
 * Bug: Array methods on potentially undefined arrays
 */
export function countFailedJobs(pipeline?: Pipeline): number {
  // BUG: No check if workflows exists, and no check if jobs array exists
  return pipeline!.workflows.reduce((count, workflow) => {
    return count + workflow.jobs.filter(job => job.status === 'failed').length;
  }, 0);
}
