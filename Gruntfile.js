module.exports = function(grunt) {
  "use strict";

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);


  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    express: {
      all: {
        options: {
          port: 9000,
          hostname: "0.0.0.0",
          bases: [__dirname]
        }
      }
    },
    concat: {
      dist :{
        src: [
          'src/*.js',
          'src/libs/*.js'
        ],
        dest: 'js/global.js'
      }
    },
    uglify: {
      build: {
        src: "js/kordano.js",
        dest: "js/kordano.min.js"
      }
    },
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'css/global.css': 'src/global.scss'
        }
      }
    },
     browserify: {
      'js/kordano.js': ['js/global.js']
     },
    watch: {
      scripts: {
        files: ["src/*.js"],
        tasks: ['concat', 'browserify'],
        options: {
          spawn: false,
          livereload: true
        }
      },
      css: {
        files: ['src/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express');
  grunt.registerTask('default', ['concat', 'browserify', 'uglify', 'sass']);
  grunt.registerTask('dev', ['express', 'watch']);
};
