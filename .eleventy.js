module.exports = function (_eleventy) {
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
