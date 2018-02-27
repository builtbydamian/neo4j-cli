const r = require('ramda');
const readDir = require('fs').readdirSync;

const basePath = process.cwd();
const migrations = readDir(`${basePath}/migrations`);

module.exports = (db) => () => {
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
  Promise
    .all(r.map((migration) => result = result.then(() => migration.up(db)))(pending))
    .then(() => console.log('Successfully ran all migrations'))
    .catch((error) => {
      console.error('Unexpected error running migrations');
      console.error(error);
    });
};
