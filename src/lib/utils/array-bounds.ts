/**
 * Intentional Bug: Array index out of bounds errors
 * Accessing array elements without checking length
 */

export interface Job {
  id: string;
  name: string;
  status: string;
}

/**
 * Bug: No length check before array access
 */
export function getFirstJob(jobs: Job[]): Job {
  // BUG: Will return undefined if jobs array is empty
  return jobs[0];
}

/**
 * Bug: Using len(items) instead of len(items)-1
 */
export function getLastJob(jobs: Job[]): Job {
  // BUG: Using length instead of length-1 for last element
  return jobs[jobs.length];
}

/**
 * Bug: Accessing specific indices without validation
 */
export function getJobsAtPositions(jobs: Job[], positions: number[]): Job[] {
  // BUG: No validation that positions are within bounds
  return positions.map(pos => jobs[pos]);
}

/**
 * Bug: Array slicing without bounds checking
 */
export function getFirstThreeJobs(jobs: Job[]): Job[] {
  // BUG: No check if array has at least 3 elements
  return [jobs[0], jobs[1], jobs[2]];
}

/**
 * Bug: Array destructuring without length check
 */
export function extractFirstThreeJobNames(jobs: Job[]): [string, string, string] {
  // BUG: Destructuring assumes array has at least 3 elements
  const [first, second, third] = jobs;
  return [first.name, second.name, third.name];
}
