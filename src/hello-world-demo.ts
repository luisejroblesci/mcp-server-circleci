/**
 * Hello World Demo for Claude Code Analysis
 * This file demonstrates various console.log patterns for testing
 */

// Basic hello world
console.log('🎉 Hello World from Claude Code Demo!');

// Multiple log types
console.log('📝 Info: This is an informational message');
console.warn('⚠️  Warning: This is a warning message');
console.error('❌ Error: This is an error message for testing');

// Formatted logs
const demoData = {
  name: 'Claude Code Demo',
  version: '1.0.0',
  features: ['Code Analysis', 'GitHub Actions', 'PR Comments'],
  timestamp: new Date().toISOString()
};

console.log('📊 Demo Data:', JSON.stringify(demoData, null, 2));

// Function with console logs
function greetUser(username: string = 'Developer'): void {
  console.log(`👋 Hello ${username}! Welcome to the Claude Code demo!`);
  console.log('🔍 This file will be analyzed by Claude Code');
  console.log('📋 Check the GitHub Actions for analysis results');
}

// Class with console logs
class DemoLogger {
  private prefix: string;

  constructor(prefix: string = 'DEMO') {
    this.prefix = prefix;
    console.log(`🏗️  ${this.prefix}: Logger initialized`);
  }

  log(message: string): void {
    console.log(`📢 ${this.prefix}: ${message}`);
  }

  celebrate(): void {
    console.log('🎊 Success! Claude Code analysis completed!');
    console.log('🚀 Ready for pull request review!');
  }
}

// Execute demo functions
greetUser('Claude Code User');

const logger = new DemoLogger('CLAUDE');
logger.log('Demonstrating console.log patterns');
logger.celebrate();

// Export for potential use
export { greetUser, DemoLogger };
export default demoData;
