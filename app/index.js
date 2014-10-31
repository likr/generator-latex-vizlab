var yeoman = require('yeoman-generator');

var LatexVizlabGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();
    var prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Name',
        default: this.appname.split(' ').join('-')
      },
      {
        type: 'list',
        name: 'style',
        message: 'Template',
        choices:[
          'tvcg',
          'jov',
          'ieice'
        ],
        default:'tvcg'
      },
      {
        type: 'confirm',
        name: 'useJapanese',
        message: 'Use Japanese ?',
        default: false
      }
    ];
    this.prompt(prompts, function (props) {
      this.name = props.name;
      this.style = props.style;
      this.useJapanese = props.useJapanese;
      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.copy('_gitignore', '.gitignore');
      this.copy('package.json', 'package.json');
      if (this.style === 'ieice') {
        this.template('ieice/document.tex', 'document.tex');
      } else if (this.style === 'jov') {
        this.template('jov/document.tex', 'document.tex');
        this.copy('jov/svjour3.cls', 'svjour3.cls');
        this.copy('jov/svglov3.clo', 'svglov3.clo');
        this.copy('jov/spbasic.bst', 'spbasic.bst');
        this.copy('jov/cite.sty', 'cite.sty');
      } else {
        this.template('tvcg/document.tex', 'document.tex');
      }
      if (this.useJapanese) {
        this.copy('bxcjkjatype.sty', 'bxcjkjatype.sty');
      }
      this.template('Gruntfile.js', 'Gruntfile.js');
    }
  },

  end: function () {
    this.installDependencies({
      npm: true,
      bower: false,
      skipInstall: this.options['skip-install']
    });
  }
});

module.exports = LatexVizlabGenerator;
