module.exports = (db) => () => {
  db.run('MATCH (n) DETACH DELETE n')
    .then(() => console.log('Successfully wiped the database'))
    .catch((error) => {
      console.error('Unexpected error wiping database');
      console.error(error);
    })
    .finally(() => {
      process.exit(0);
    });
};