const fs = require('fs-extra');
const { markdown } = require('markdown');
const path = require('path');

const writeFiles = (output) => {
  const flatFiles = flatten(output);

  return Promise.all(flatFiles.map((file) => {
    const { dest, output } = file;

    return new Promise((resolve) => {
      const dir = path.dirname(dest);
      fs.ensureDir(dir, (err) => {
        if (err) reject(createError(dest, err));

        fs.writeFile(dest + '.html', markdown.toHTML(output), 'utf8', (err) => {
          if (err) reject(createError(dest, err));

          resolve({
            dest,
            success: true,
          });
        });
      });
    });
  }));
};

const flatten = (items) => items.reduce((result, item) => {
  if (Array.isArray(item)) {
    return result.concat(flatten(item));
  } else {
    return result.concat(item);
  }
}, []);

const createError = (dest, err) => ({
  dest,
  err,
  success: false,
});

module.exports = writeFiles;
