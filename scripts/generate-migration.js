#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-require-imports */
const { execSync } = require('child_process');
const args = process.argv.slice(2);

// Check if name flag is provided
const nameIndex = args.indexOf('--name');
if (nameIndex === -1) {
  console.error(
    'Error: Migration name is required. Use --name flag with a descriptive name in snake_case format.'
  );
  console.error('Example: pnpm db:generate --name add_start_end_dates_to_content');
  process.exit(1);
}

const name = args[nameIndex + 1];
if (!name) {
  console.error('Error: Migration name cannot be empty.');
  process.exit(1);
}

// Validate name format (snake_case)
if (!/^[a-z][a-z0-9_]*(_[a-z0-9]+)*$/.test(name)) {
  console.error(
    'Error: Migration name must be in snake_case format (lowercase letters, numbers, and underscores).'
  );
  console.error('Example: add_start_end_dates_to_content');
  process.exit(1);
}

// Run drizzle-kit with the provided name and config
try {
  execSync(`drizzle-kit generate --config=drizzle.config.ts --name ${name}`, { stdio: 'inherit' });
} catch {
  process.exit(1);
}
