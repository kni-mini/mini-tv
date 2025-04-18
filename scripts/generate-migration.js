#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-require-imports */
const { execSync } = require('child_process');
const args = process.argv.slice(2);

function handleError(message, example = null) {
  console.error(`Error: ${message}`);
  if (example) {
    console.error(`Example: ${example}`);
  }
  process.exit(1);
}

// Check if name flag is provided
const nameIndex = args.indexOf('--name');
if (nameIndex === -1) {
  handleError(
    'Migration name is required. Use --name flag with a descriptive name in snake_case format.',
    'pnpm db:generate --name add_start_end_dates_to_content'
  );
}

const name = args[nameIndex + 1];
if (!name) {
  handleError('Migration name cannot be empty.');
}

// Validate name format (snake_case)
if (!/^[a-z][a-z0-9_]*(_[a-z0-9]+)*$/.test(name)) {
  handleError(
    'Migration name must be in snake_case format (lowercase letters, numbers, and underscores).',
    'add_start_end_dates_to_content'
  );
}

// Run drizzle-kit with the provided name and config
try {
  execSync(`drizzle-kit generate --config=drizzle.config.ts --name ${name}`, { stdio: 'inherit' });
} catch {
  handleError('Failed to generate migration. Make sure drizzle-kit is properly configured.');
}
