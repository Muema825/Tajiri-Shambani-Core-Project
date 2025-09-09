// This script simulates the missing package.json scripts
const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Add missing scripts if they don't exist
if (!packageJson.scripts) {
  packageJson.scripts = {};
}

const requiredScripts = {
  "dev": "vite",
  "build": "tsc && vite build", 
  "build:dev": "vite build --mode development",
  "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
  "preview": "vite preview"
};

Object.assign(packageJson.scripts, requiredScripts);

// Add missing project metadata
if (!packageJson.name) packageJson.name = "tajiri-shambani-core-project";
if (!packageJson.version) packageJson.version = "0.0.0";
if (!packageJson.type) packageJson.type = "module";
packageJson.private = true;

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
console.log('Package.json updated with required scripts!');