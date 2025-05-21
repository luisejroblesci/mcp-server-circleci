import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  contextSchemaKey,
  createPromptTemplate,
  promptOriginKey,
  promptTemplateKey,
} from './handler.js';
import { CircletClient } from '../../clients/circlet/index.js';
import {
  defaultModel,
  PromptOrigin,
  PromptWorkbenchToolName,
} from '../shared/types.js';

// Mock dependencies
vi.mock('../../clients/circlet/index.js');

describe('createPromptTemplate handler', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should return a valid MCP response with template, context schema, and prompt origin', async () => {
    const mockCreatePromptTemplate = vi.fn().mockResolvedValue({
      template: 'This is a test template with {{variable}}',
      contextSchema: {
        variable: 'Description of the variable',
      },
    });

    const mockCircletInstance = {
      circlet: {
        createPromptTemplate: mockCreatePromptTemplate,
      },
    };

    vi.mocked(CircletClient).mockImplementation(
      () => mockCircletInstance as any,
    );

    const args = {
      params: {
        prompt: 'Create a test prompt template',
        promptOrigin: PromptOrigin.requirements,
        model: defaultModel,
      },
    };

    const controller = new AbortController();
    const response = await createPromptTemplate(args, {
      signal: controller.signal,
    });

    expect(mockCreatePromptTemplate).toHaveBeenCalledWith(
      'Create a test prompt template',
      defaultModel,
    );

    expect(response).toHaveProperty('content');
    expect(Array.isArray(response.content)).toBe(true);
    expect(response.content[0]).toHaveProperty('type', 'text');
    expect(typeof response.content[0].text).toBe('string');

    // Verify promptOrigin is included
    expect(response.content[0].text).toContain(
      `${promptOriginKey}: ${PromptOrigin.requirements}`,
    );

    // Verify model is included
    expect(response.content[0].text).toContain(`model: ${defaultModel}`);

    // Verify template and schema are still present
    expect(response.content[0].text).toContain(
      `${promptTemplateKey}: This is a test template with {{variable}}`,
    );
    expect(response.content[0].text).toContain(`${contextSchemaKey}: {`);
    expect(response.content[0].text).toContain(
      '"variable": "Description of the variable"',
    );

    // Verify updated next steps format
    expect(response.content[0].text).toContain(`NEXT STEP:`);
    expect(response.content[0].text).toContain(
      `${PromptWorkbenchToolName.recommend_prompt_template_tests}`,
    );
    expect(response.content[0].text).toContain(
      `template: the \`${promptTemplateKey}\` above`,
    );
    expect(response.content[0].text).toContain(
      `${contextSchemaKey}: the \`${contextSchemaKey}\` above`,
    );
    expect(response.content[0].text).toContain(
      `${promptOriginKey}: the \`${promptOriginKey}\` above`,
    );
    expect(response.content[0].text).toContain(`model: the \`model\` above`);
  });

  it('should handle errors from CircletClient', async () => {
    const mockCircletInstance = {
      circlet: {
        createPromptTemplate: vi.fn().mockRejectedValue(new Error('API error')),
      },
    };

    vi.mocked(CircletClient).mockImplementation(
      () => mockCircletInstance as any,
    );

    const args = {
      params: {
        prompt: 'Create a test prompt template',
        promptOrigin: PromptOrigin.requirements,
        model: defaultModel,
      },
    };

    const controller = new AbortController();

    await expect(
      createPromptTemplate(args, { signal: controller.signal }),
    ).rejects.toThrow('API error');
  });
});
