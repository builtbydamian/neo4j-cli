const neo4j = require('neo4j-driver').v1;

module.exports = (config) => {
  driver = neo4j.driver(config.host, neo4j.auth.basic(config.username, config.password));
  session = driver.session();

  // Ensure we can connect to the database
  session.run('RETURN 1')
    .catch(() => {
      console.log('Unable to connect, please check your credentials.');
      process.exit(0);
    });

  return  {
    driver,
    session,
  };
};