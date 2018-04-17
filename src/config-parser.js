const fs = require('fs-extra');
const path = require('path');

module.exports = (configFile, ignoreConfig) => {
  const projectDir = process.cwd();
  const file = findConfigFile(configFile, projectDir);
  let config = {
    dest: path.join(projectDir, 'docs'),
    src: path.join(projectDir, 'src'),
  };

  if (!ignoreConfig && file) {
    config = Object.assign(
      {},
      config,
      require(file),
    );
  }

  return config;
};

const findConfigFile = (configFile, projectDir) => {
  let file;

  if (configFile && fs.existsSync(configFile)) {
    file = path.resolve(projectDir, configFile);
  } else {
    file = getDotFile(projectDir);
  }

  return file;
};

const getDotFile = (projectDir) => {
  const prefix = path.join(projectDir, '.docworker.config');
  let dotFile;

  if (fs.existsSync(`${prefix}.js`) ||
      fs.existsSync(`${prefix}.json`)) {
    dotFile = prefix;
  }

  return dotFile;
};
