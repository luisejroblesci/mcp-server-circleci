export const PromptOrigin = {
  codebase: 'codebase',
  requirements: 'requirements',
} as const;

export const promptIterationToolchain = {
  createPromptTemplate: 'create_prompt_template',
  recommendPromptTemplateTests: 'recommend_prompt_template_tests',
} as const;
