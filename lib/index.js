#!/usr/bin/env node

const neo4j = require('neo4j-driver').v1;
const r = require('ramda');
const readDir = require('fs').readdirSync;

const basePath = process.cwd();

// Get the users configuration
// This can either return an object or a promise
const config = require(`${basePath}/migrations/config`);

// Get the users migrations
const migrations = readDir(`${basePath}/migrations`);

let driver, session;

Promise
  .resolve(config)
  .then((config) => {
    driver = neo4j.driver(config.host, neo4j.auth.basic(config.username, config.password));
    session = driver.session();

    // Get all the files to run migrations for
    const pending = r.pipe(
      r.filter(r.complement(r.equals('config.js'))),
      r.map((filename) => {
        return require(`${basePath}/migrations/${filename}`);
      }),
    )(migrations);

    // Run the migrations one after the other
    // This is important, as they might depend on previous migrations
    let result = Promise.resolve();

    // Wait for all the migrations to finish before we shut down
    return Promise.all(r.map((migration) => result = result.then(() => migration.up(session)))(pending));
  })
  .then(() => console.log('Successfully ran all migrations'))
  .catch(() => console.log('Error running migrations'))
  .finally(() => {
    // Clean up after we're done
    session.close();
    driver.close();
  });