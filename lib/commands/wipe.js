module.exports = (db) => () => {
  db.run('MATCH relationships=()-->(), (nodes) DELETE relationships, nodes;')
    .then(console.log('Successfully wiped the database'))
    .catch((error) => {
      console.error('Unexpected error wiping database');
      console.error(error);
    });
};