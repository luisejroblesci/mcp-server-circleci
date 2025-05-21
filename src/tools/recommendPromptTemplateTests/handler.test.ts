import { describe, it, expect, vi, beforeEach } from 'vitest';
import { recommendPromptTemplateTests } from './handler.js';
import { CircletClient } from '../../clients/circlet/index.js';
import { defaultModel, PromptOrigin } from '../shared/types.js';

// Mock dependencies
vi.mock('../../clients/circlet/index.js');

describe('recommendPromptTemplateTests handler', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should return a valid MCP response with recommended tests for requirements-based prompt', async () => {
    const mockRecommendedTests = [
      'Test with variable = "value1"',
      'Test with variable = "value2"',
      'Test with empty variable',
    ];

    const mockRecommendPromptTemplateTests = vi
      .fn()
      .mockResolvedValue(mockRecommendedTests);

    const mockCircletInstance = {
      circlet: {
        recommendPromptTemplateTests: mockRecommendPromptTemplateTests,
      },
    };

    vi.mocked(CircletClient).mockImplementation(
      () => mockCircletInstance as any,
    );

    const template = 'This is a test template with {{variable}}';
    const contextSchema = {
      variable: 'Description of the variable',
    };

    const args = {
      params: {
        template,
        contextSchema,
        promptOrigin: PromptOrigin.requirements,
        model: defaultModel,
      },
    };

    const controller = new AbortController();
    const response = await recommendPromptTemplateTests(args, {
      signal: controller.signal,
    });

    expect(mockRecommendPromptTemplateTests).toHaveBeenCalledWith({
      template,
      contextSchema,
      model: defaultModel,
    });

    expect(response).toHaveProperty('content');
    expect(Array.isArray(response.content)).toBe(true);
    expect(response.content[0]).toHaveProperty('type', 'text');
    expect(typeof response.content[0].text).toBe('string');

    const responseText = response.content[0].text;
    expect(responseText).toContain('recommendedTests:');
    expect(responseText).toContain(
      JSON.stringify(mockRecommendedTests, null, 2),
    );
    expect(responseText).toContain('NEXT STEP:');
    expect(responseText).toContain(
      'save the `promptTemplate`, `contextSchema`, and `recommendedTests`',
    );
    expect(responseText).toContain('RULES FOR SAVING FILES:');
    expect(responseText).toContain('./prompts');
    expect(responseText).toContain('`promptOrigin`: string');
    expect(responseText).toContain('`model`: string');

    // Should not contain integration instructions for requirements-based prompts
    expect(responseText).not.toContain(
      'FINALLY, ONCE ALL THE FILES ARE SAVED:',
    );
  });

  it('should include integration instructions for codebase-based prompts', async () => {
    const mockRecommendedTests = ['Test case 1'];
    const mockRecommendPromptTemplateTests = vi
      .fn()
      .mockResolvedValue(mockRecommendedTests);

    const mockCircletInstance = {
      circlet: {
        recommendPromptTemplateTests: mockRecommendPromptTemplateTests,
      },
    };

    vi.mocked(CircletClient).mockImplementation(
      () => mockCircletInstance as any,
    );

    const args = {
      params: {
        template: 'Test template',
        contextSchema: { variable: 'description' },
        promptOrigin: PromptOrigin.codebase,
        model: defaultModel,
      },
    };

    const controller = new AbortController();
    const response = await recommendPromptTemplateTests(args, {
      signal: controller.signal,
    });

    const responseText = response.content[0].text;
    expect(responseText).toContain('FINALLY, ONCE ALL THE FILES ARE SAVED:');
    expect(responseText).toContain(
      'integrate the newly-generated prompt template files',
    );
    expect(responseText).toContain(
      'A "Yes" or "No" response is perfectly acceptable',
    );
  });

  it('should handle errors from CircletClient', async () => {
    const mockCircletInstance = {
      circlet: {
        recommendPromptTemplateTests: vi
          .fn()
          .mockRejectedValue(new Error('API error')),
      },
    };

    vi.mocked(CircletClient).mockImplementation(
      () => mockCircletInstance as any,
    );

    const args = {
      params: {
        template: 'Test template',
        contextSchema: { variable: 'description' },
        promptOrigin: PromptOrigin.requirements,
        model: defaultModel,
      },
    };

    const controller = new AbortController();

    await expect(
      recommendPromptTemplateTests(args, { signal: controller.signal }),
    ).rejects.toThrow('API error');
  });
});
