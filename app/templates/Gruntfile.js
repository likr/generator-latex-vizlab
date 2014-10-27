module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    latex: {
      pdf: {
        src: 'document.tex',
        options: {
          outputDirectory: '.',
          jobname: '<%= appname %>'
        }
      },
      bib: {
        src: '<%= appname %>.aux',
        options: {
          engine: 'bibtex',
          interaction: false
        }
      }
    },
    watch: {
      latex: {
        files: '**/*.tex',
        tasks: ['build']
      },
      bibtex: {
        files: '**/*.bib',
        tasks: ['latex:bib', 'latex:pdf', 'latex:pdf']
      }
    }
  });

  // These plugins provide necessary tasks
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-latex');

  // Default task
  grunt.registerTask('default', ['build']);
  grunt.registerTask('build', ['latex:pdf', 'latex:bib', 'latex:pdf', 'latex:pdf']);
};
