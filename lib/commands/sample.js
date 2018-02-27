const path = require('path');
const ncp = require('ncp').ncp;

module.exports = () => {
  const source = path.resolve(__dirname, '../../sample');
  const destination = path.resolve(process.cwd(), 'migrations');

  ncp(source, destination, (error) => {
    if( error ) {
      console.log('Unable to create sample migrations');
    } else {
      console.log('Successfully created sample migrations');
    }
  });
};