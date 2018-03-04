const fs = require('fs');
const path = require('path');

module.exports = (args) => {
  const timestamp = Math.floor(new Date().getTime() / 1000);
  const source = path.resolve(__dirname, '../../templates/newMigration.js');
  const filename = `${timestamp}-${args.name}.js`;
  const destination = path.resolve(process.cwd(), 'migrations', filename);

  fs.copyFileSync(source, destination);

  console.log(`Created migrations 'migrations/${filename}'`);
  process.exit(0);
};