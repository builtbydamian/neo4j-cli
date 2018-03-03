#!/usr/bin/env node
const yargs = require('yargs');

// Our custom helpers
const getConfig = require('./getConfig');
const setupConnection = require('./setupConnection');

// Import all the commands
const migrateAll = require('./commands/migrateAll');
const sampleMigrations = require('./commands/sample');
const createMigration = require('./commands/create');
const wipeDatabase = require('./commands/wipe');

// Get the users config and setup our connection
// This will then be passed in to the required commands
getConfig()
  .then(setupConnection)
  .then(({driver, session}) => {
    const addNamedArg = (name) => (yargs) => yargs.positional(name, {});
    
    // Setup our CLI interface
    yargs
      .command('migrate:all', 'Run pending migrations', migrateAll(session))
      .command('migrate:create <name>', 'Create a new migration', addNamedArg('name'), createMigration)
      .command('migrate:sample', 'Create sample migrations', sampleMigrations)
      .command('migrate:wipe', 'Delete all nodes and relationships from the graph', wipeDatabase(session))
      .help()
      .parse();
  })
  .catch((error) => {
    console.error('An unexpected error occurred');
    console.error(error);
  });