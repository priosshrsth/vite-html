const path = require('path');

const prettier = require('prettier');
const prettierConfig = require('./prettier.config');

module.exports = (_config) => {
  _config.addFilter('isoString', (date = Date.now()) => new Date(date).toISOString());

  _config.addTransform('prettier', function (content, outputPath) {
    const extname = path.extname(outputPath);
    switch (extname) {
      case '.html':
        const subDirectories = outputPath.split('/');
        const pathPrefix = subDirectories
          .slice(0, subDirectories.length - 2)
          .map((_path) => '../')
          .join('');

        content = content.replace(/\/src\//g, pathPrefix);
        // Strip leading period from extension and use as the Prettier parser.
        const parser = extname.replace(/^./, '');
        return prettier.format(content, { ...prettierConfig, parser });
      default:
        return content;
    }
  });

  return {
    dir: {
      templateFormats: ['html', 'ejs'],
      input: 'views',
      output: 'src/pages',
      includes: '_partials',
      layouts: '_layouts',
    },
  };
};
