#!/usr/bin/env node
// Build development script
const { execSync } = require('child_process');

try {
  console.log('Running development build...');
  execSync('npx vite build --mode development', { stdio: 'inherit' });
  console.log('Development build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}