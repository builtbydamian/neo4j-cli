const r = require('ramda');
const readDir = require('fs').readdirSync;

const basePath = process.cwd();
const migrations = readDir(`${basePath}/migrations`);

module.exports = (db) => () => {
  const updateDatabaseStatus = (filename) => {
    const id = r.head(r.match(/([0-9]+)?/, filename));

    db.run(`MERGE (status:_Neo4jMigration) SET status.id = '${id}' RETURN status`);
  };

  // Run the migrations one after the other
  // This is important, as they might depend on previous migrations
  r.reduce((promise, filename) => {
    if(filename === 'config.js') {
      return Promise.resolve();
    }

    const migration = require(`${basePath}/migrations/${filename}`);

    return promise
      .then(() => {
        return migration.up(db)
          .then(() => {
            updateDatabaseStatus(filename)
          });
      })
      .catch(console.error);
  }, Promise.resolve(), migrations)
    .then(() => console.log('Successfully ran all migrations'))
    .catch((error) => {
      console.error('Unexpected error running migrations');
      console.error(error);
    });
};
