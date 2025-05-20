import { describe, it, expect, vi, beforeEach } from 'vitest';
import { rerunWorkflow } from './handler.js';
import * as client from '../../clients/client.js';

vi.mock('../../clients/client.js');

const failedWorkflowId = '00000000-0000-0000-0000-000000000000';
const successfulWorkflowId = '11111111-1111-1111-1111-111111111111';
const newWorkflowId = '11111111-1111-1111-1111-111111111111';

describe('rerunWorkflow', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('when rerunning a failed workflow', () => {
    it('should return the new workflowId and url to the user', async () => {
      const mockCircleCIClient = {
        workflows: {
          getWorkflow: vi.fn().mockResolvedValue({ status: 'failed' }),
          rerunWorkflow: vi.fn().mockResolvedValue({
            workflow_id: newWorkflowId,
          }),
        },
      };

      vi.spyOn(client, 'getCircleCIClient').mockReturnValue(
        mockCircleCIClient as any,
      );

      const controller = new AbortController();
      const result = await rerunWorkflow(
        {
          params: {
            workflowId: failedWorkflowId,
          },
        },
        {
          signal: controller.signal,
        },
      );

      expect(mockCircleCIClient.workflows.rerunWorkflow).toHaveBeenCalledWith({
        workflowId: failedWorkflowId,
        fromFailed: true,
      });
      expect(result).toEqual({
        content: [
          {
            type: 'text',
            text: `New workflowId is ${newWorkflowId} and [View Workflow in CircleCI](https://app.circleci.com/pipelines/workflows/11111111-1111-1111-1111-111111111111)`,
          },
        ],
      });
    });
  });

  describe('when rerunning a successful workflow', () => {
    it('should return an error if requested to be rerun from failed', async () => {
      const mockCircleCIClient = {
        workflows: {
          getWorkflow: vi.fn().mockResolvedValue({ status: 'success' }),
          rerunWorkflow: vi.fn(),
        },
      };

      vi.spyOn(client, 'getCircleCIClient').mockReturnValue(
        mockCircleCIClient as any,
      );

      const controller = new AbortController();
      const response = await rerunWorkflow(
        {
          params: {
            workflowId: successfulWorkflowId,
            fromFailed: true,
          },
        },
        {
          signal: controller.signal,
        },
      );

      expect(mockCircleCIClient.workflows.rerunWorkflow).not.toHaveBeenCalled();
      expect(response).toEqual({
        isError: true,
        content: [
          {
            type: 'text',
            text: 'Workflow is not failed, cannot rerun from failed',
          },
        ],
      });
    });
  });
});
