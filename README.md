# Neo4j CLI
CLI for the most common tasks when using neo4j and cypher.

## Installation
```
npm install --save-dev neo4j-cli
# Or
yarn add -D neo4j-cli
```

To run any of the commands, you will need to provide the connection details for neo4j. To do this, create a `migrations` folder in the root of your project, and add a file called `config.js` which exports an object or a promise with the following structure:

```js
module.exports = {
  host: 'bolt://localhost',
  username: 'neo4j',
  password: 'neo4j',
};
```

If you need to make any async requests to get the connection details, then return a promise that resolves with the config object.