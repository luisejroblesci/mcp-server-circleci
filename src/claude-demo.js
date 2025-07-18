/**
 * Claude Code Demo - JavaScript Edition
 * Simple hello world examples for testing GitHub Actions
 */

// Simple hello world
console.log('🌍 Hello World from JavaScript!');
console.log('🤖 Claude Code will analyze this file');

// Different console methods
console.info('ℹ️  Info: JavaScript demo file created');
console.debug('🐛 Debug: This is for debugging purposes');
console.time('⏱️  Timer');

// Array and object logging
const features = ['AI Analysis', 'Code Review', 'Automated Testing'];
const config = {
  language: 'JavaScript',
  framework: 'Node.js',
  purpose: 'Claude Code Demo',
  created: new Date().toLocaleString()
};

console.log('📝 Features:', features);
console.table(config);

// Simple function
function sayHello(name = 'World') {
  console.log(`👋 Hello, ${name}!`);
  return `Hello, ${name}!`;
}

// Arrow function
const logDemo = () => {
  console.log('🎯 Arrow function executed');
  console.log('✅ Demo complete!');
};

// Execute functions
sayHello('Claude Code');
logDemo();

console.timeEnd('⏱️  Timer');
console.log('🏁 JavaScript demo finished!');

// Export for CommonJS
module.exports = {
  sayHello,
  logDemo,
  features,
  config
};
