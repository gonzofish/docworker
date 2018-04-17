module.exports = require('commander')
  .version('0.0.1')
  .option('--config <file>', 'The configuration file')
  .option('--src <dir>', 'The source directory to document')
  .option('--dest <dir>', 'The directory to output the generated site')
  .parse(process.argv);
