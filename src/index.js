const fs = require('fs-extra');

const cliArgs = require('./cli-parser')();
const configParser = require('./config-parser');
const docsParser = require('./docs-parser');
const docsWriter = require('./docs-writer');

/**
 * Steps to generate docs:
 * 1. Parse CLI arguments
 * 2. Parse config file (if CLI args don't specify)
 * 3. Recursively iterate through config.src
 *    a. Convert Markdown -> HTML
 *    b. Convert JSDoc -> HTML
 *    c. Combine Markdown + JSDoc outputs
 *    d. Push combined file to config.dest
 */

const config = {
  dest: cliArgs.dest,
  src: cliArgs.src,
};

if (!cliArgs.dest || !cliArgs.src) {
  const parsedConfig = configParser(cliArgs.config, cliArgs.ignoreConfig);

  config.dest = config.dest || parsedConfig.dest;
  config.src = config.src || parsedConfig.src;
}

fs.rmdir(config.dest, (error) => {
  docsParser(config)
    .then(docsWriter)
    .then((results) => console.info(JSON.stringify(results, null, 4)))
    .catch(console.error);
});
