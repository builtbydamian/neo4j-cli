const fs = require('fs');
const path = require('path');

module.exports = (args) => {
  const timestamp = Math.floor(new Date().getTime() / 1000);
  const source = path.resolve(__dirname, '../../templates/newMigration.js');
  const destination = path.resolve(process.cwd(), 'migrations', `${timestamp}-${args.name}.js`);

  fs.copyFileSync(source, destination);
};