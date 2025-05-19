// NOTE: We want to be extremely consistent with the tool names and parameters passed through the Prompt Workbench toolchain, since one tool's output may be used as input for another tool.

export enum PromptWorkbenchToolName {
  create_prompt_template = 'create_prompt_template',
  recommend_prompt_template_tests = 'recommend_prompt_template_tests',
}

// What is the origin of the Prompt Workbench toolchain request?
export enum PromptOrigin {
  codebase = 'codebase', // pre-existing prompts in user's codebase
  requirements = 'requirements', // new feature requirements provided by user
}
