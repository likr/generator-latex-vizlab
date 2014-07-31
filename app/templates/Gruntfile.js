module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    latex: {
      pdf: {
        src: 'document.tex',
        options: {
          outputDirectory: 'dist/',
          jobname: '<%= appname %>'
        }
      },
      bib: {
        src: 'dist/<%= appname %>.aux',
        options: {
          engine: 'bibtex',
          interaction: false
        }
      }
    },
    watch: {
      latex: {
        files: '**/*.tex',
        tasks: ['latex', 'latex:pdf']
      },
      bibtex: {
        files: '**/*.bib',
        tasks: ['latex:bib', 'latex:pdf']
      }
    }
  });

  // These plugins provide necessary tasks
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-latex');

  // Default task
  grunt.registerTask('default', ['latex']);
};
