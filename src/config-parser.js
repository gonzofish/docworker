const fs = require('fs-extra');
const path = require('path');

module.exports = (configFile) => {
  const projectDir = process.cwd();
  const file = findConfigFile(configFile, projectDir);
  let config = {
    dest: path.join(projectDir, 'docs'),
    src: path.join(projectDir, 'src'),
  };

  if (file) {
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
    file = configFile;
  } else {
    file = getDotFile(projectDir);
  }

  return file;
};

const getDotFile = (projectDir) => {
  const prefix = path.join(projectDir, '.docworker');
  let dotFile;

  if (fs.existsSync(`${prefix}.js`) ||
      fs.existsSync(`${prefix}.json`)) {
    dotFile = prefix;
  }

  return dotFile;
};
