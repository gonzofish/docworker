const fs = require('fs-extra');
const jsdoc2md = require('jsdoc-to-markdown');
const path = require('path');

const parseDocs = (config) =>
  checkIsDirectory(config.src)
    .then((isDirectory) => {
      if (isDirectory) {
        // loop through contents
        // calling parseDocs
        return parseChildren(config);
      } else {
        // parse file
        return parse(config);
      }
    });

const checkIsDirectory = (location) =>
  new Promise((resolve, reject) => {
    fs.lstat(location, (error, stats) => {
      if (error) reject(error);

      resolve(stats.isDirectory());
    })
  });

const parseChildren = (config) => {
  const children = fs.readdirSync(config.src);

  return Promise.all(children.map((child) => {
    return parseDocs({
      dest: path.join(config.dest, child),
      src: path.join(config.src, child),
    });
  }));
};

const parse = ({ dest, src }) => {
  if (path.extname(src) === '.js') {
    return jsdoc2md.render({
      files: src,
    }).then((output) => ({
      dest,
      output,
    }));
  } else {
    return Promise.resolve({
      dest,
      output: '',
    });
  }
}

module.exports = parseDocs;

