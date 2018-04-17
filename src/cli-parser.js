module.exports = () => {
  return require('commander')
    .version('0.0.1')
    .option('--config <file>', 'The configuration file')
    .option('--src <dir>', 'The source directory to document')
    .option('--dest <dir>', 'The directory to output the generated site')
    .option('--ignore-config', `Don't load configs from any file; mostly used for testing Doc Worker`)
    .parse(process.argv);
};
