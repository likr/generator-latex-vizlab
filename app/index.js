var yeoman = require('yeoman-generator');

var LatexVizlabGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      this.installDependencies({
        npm: true,
        bower: false,
        skipInstall: this.options['skip-install']
      });
    });
  },

  app: function () {
    this.copy('_gitignore', '.gitignore');
    this.copy('package.json', 'package.json');
    this.copy('document.tex', 'document.tex');
    this.copy('bxcjkjatype.sty', 'bxcjkjatype.sty');
    this.template('Gruntfile.js', 'Gruntfile.js');
  }
});

module.exports = LatexVizlabGenerator;
