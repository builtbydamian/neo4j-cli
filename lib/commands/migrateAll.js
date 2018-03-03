const r = require('ramda');
const readDir = require('fs').readdirSync;

const basePath = process.cwd();
const migrations = readDir(`${basePath}/migrations`);

module.exports = (db) => () => {
  const updateDatabaseStatus = (filename) => {
    const id = r.head(r.match(/([0-9]+)?/, filename));

    db.run(`MERGE (status:_Neo4jMigration) SET status.id = '${id}' RETURN status`);
  };

  // We need to determine the most recent migration
  // And then only run migrations which are more recent
  db.run('MATCH (migration:_Neo4jMigration) RETURN migration')
    .then((result) => {
      const lastMigration = r.isEmpty(result.records) ? 0 : result.records[0].get('migration').properties.id;

      const validMigrations = r.filter((filename) => {
        if(filename === 'config.js') {
          return false;
        }

        return r.head(r.match(/([0-9]+)?/, filename)) > lastMigration;
      })(migrations);

      // Run the migrations one after the other
      // This is important, as they might depend on previous migrations
      r.reduce((promise, filename) => {
        const migration = require(`${basePath}/migrations/${filename}`);

        return promise
          .then(() => {
            return migration.up(db)
              .then(() => {
                updateDatabaseStatus(filename)
              });
          })
          .catch(console.error);
      }, Promise.resolve(), validMigrations)
        .then(() => console.log('Successfully ran all migrations'))
        .catch((error) => {
          console.error('Unexpected error running migrations');
          console.error(error);
        });
    });
};
