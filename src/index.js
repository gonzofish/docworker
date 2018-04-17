const cliArgs = require('./cli-parser')();
const config = {
  dest: cliArgs.dest,
  src: cliArgs.src,
};

if (!cliArgs.dest || !cliArgs.src) {
  const parsedConfig = require('./config-parser')(cliArgs.config);

  config.dest = config.dest || parsedConfig.dest;
  config.src = config.src || parsedConfig.src;
}

console.info('CONFIG:', config);
