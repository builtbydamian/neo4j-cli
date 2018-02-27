#!/usr/bin/env node
const yargs = require('yargs');

// Import all the commands
const sampleMigrations = require('./commands/sample');

// Setup our CLI interface
yargs
  .command('migrate:all', 'Run pending migrations', () => console.log('[all]'))
  .command('migrate:create', 'Create a new migration', () => console.log('[create]'))
  .command('migrate:sample', 'Create sample migrations', sampleMigrations)
  .help()
  .parse();
