import { createPromptTemplateInputSchema } from './inputSchema.js';
import { PromptOrigin, PromptTemplateWorkbenchTool } from '../shared/types.js';

const paramsKey = 'params';
const promptKey = 'prompt';
const promptOriginKey = 'promptOrigin';
const templateVar = '`template`';
const contextSchemaVar = '`contextSchema`';

export const createPromptTemplateTool = {
  name: PromptTemplateWorkbenchTool.create_prompt_template,
  description: `
  About this tool:
  - This tool is part of a tool chain that generates and provides test cases for a prompt template.
  - This tool helps an AI assistant to generate a prompt template based on one of the following:
    1. feature requirements defined by a user - in which case the tool will generate a new prompt template based on the feature requirements.
    2. a pre-existing prompt or prompt template that a user wants to test, evaluate, or modify - in which case the tool will convert it into a more structured and testable prompt template while leaving the original prompt language relatively unchanged.
  - This tool should be triggered whenever the user provides requirements for a new AI-enabled application or a new feature of an existing AI-enabled application (i.e. one that requires a prompt request to an LLM or any AI model).
  - This tool should also be triggered if the user provides a pre-existing prompt or prompt template that they want to test, evaluate, or modify.
  - This tool will return a structured prompt template (e.g. ${templateVar}) along with a context schema (e.g. ${contextSchemaVar}) that defines the expected input parameters for the prompt template.

  Parameters:
  - ${paramsKey}: object
    - ${promptKey}: string (the feature requirements or pre-existing prompt/prompt template that will be used to generate a prompt template)
    - ${promptOriginKey}: "${PromptOrigin.codebase}" | "${PromptOrigin.requirements}" (indicates whether the prompt comes from an existing codebase or from new requirements)

  Example usage (feature requirements):
  {
    "${paramsKey}": {
      "${promptKey}": "Create an app that takes any topic and an age (in years), then renders a 1-minute bedtime story for a person of that age.",
      "${promptOriginKey}": "${PromptOrigin.requirements}"
    }
  }

  Example usage (pre-existing prompt/prompt template from codebase):
  {
    "${paramsKey}": {
      "${promptKey}": "The user wants a bedtime story about {{topic}} for a person of age {{age}} years old. Please craft a captivating tale that captivates their imagination and provides a delightful bedtime experience.",
      "${promptOriginKey}": "${PromptOrigin.codebase}"
    }
  }

  The tool will return a structured prompt template that can be used to guide an AI assistant's response, along with a context schema that defines the expected input parameters.

  Tool output instructions:
  - The tool will return...
    - a ${templateVar} that reformulates the user's prompt into a more structured format.
    - a ${contextSchemaVar} that defines the expected input parameters for the template.
  - The tool output -- both the ${templateVar} and ${contextSchemaVar} -- will also be used as input to the \`${PromptTemplateWorkbenchTool.recommend_prompt_template_tests}\` tool to generate a list of recommended tests that can be used to test the prompt template.
  `,
  inputSchema: createPromptTemplateInputSchema,
};
