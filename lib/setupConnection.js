const neo4j = require('neo4j-driver').v1;

module.exports = (config) => {
  driver = neo4j.driver(config.host, neo4j.auth.basic(config.username, config.password));
  session = driver.session();

  return  {
    driver,
    session,
  };
};