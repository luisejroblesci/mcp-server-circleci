import { HTTPClient } from './httpClient.js';

/**
 * Intentional Bug: Missing await keyword for async HTTP calls
 * This will cause the function to return a Promise instead of the actual data
 */
export class AsyncErrorClient {
  private client: HTTPClient;

  constructor() {
    this.client = new HTTPClient('https://circleci.com', '/api/v2', {
      headers: {
        'Circle-Token': 'fake-token',
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Bug: Missing await keyword - will return Promise instead of actual data
   */
  async fetchPipeline(projectSlug: string): Promise<any> {
    // BUG: Missing await keyword here
    return this.client.get(`/project/${projectSlug}/pipeline`);
  }

  /**
   * Bug: Missing await in a chain of operations
   */
  async fetchAndProcessPipeline(projectSlug: string): Promise<string> {
    // BUG: Missing await - this will return a Promise, not the actual pipeline
    const pipeline = this.fetchPipeline(projectSlug);
    
    // This will fail because pipeline is a Promise, not the actual data
    return `Pipeline ${(pipeline as any).id} is ${(pipeline as any).state}`;
  }

  /**
   * Bug: Missing await in error handling
   */
  async fetchPipelineWithErrorHandling(projectSlug: string): Promise<any> {
    try {
      // BUG: Missing await - error handling won't work properly
      const pipeline = this.client.get(`/project/${projectSlug}/pipeline`);
      return pipeline;
    } catch (error) {
      console.error('Error fetching pipeline:', error);
      return null;
    }
  }
}
