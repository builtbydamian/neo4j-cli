const neo4j = require('neo4j-driver').v1;
const r = require('ramda');
const readDir = require('fs').readdirSync;

// Get the users configuration
// This can either return an object or a promise
const config = require('../migrations/config');

// Get the users migrations
const migrations = readDir('./migrations');

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
        return require(`../migrations/${filename}`);
      }),
    )(migrations);

    // Run the migrations one after the other
    // This is important, as they might depend on previous migrations
    let result = Promise.resolve();

    // Wait for all the migrations to finish before we shut down
    return Promise.all(r.map((migration) => result = result.then(() => migration.up(session).catch(console.log)))(pending));
  })
  .then(() => console.log('Successfully ran all migrations'))
  .catch(() => console.log('Error running migrations'))
  .finally(() => {
    // Clean up after we're done
    session.close();
    driver.close();
  });