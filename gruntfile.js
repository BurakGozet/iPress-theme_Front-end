  'use strict';
  module.exports = function (grunt) {
   require('time-grunt')(grunt);
   require('load-grunt-tasks')(grunt);
   grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
      'gruntfile.js',
      '_assets/js/*.js',
      '_assets/js/plugins/*.js',
      '_assets/js/components/*.js',
      '!_assets/js/scripts.js'
      ]
    },
    recess: {
      dist: {
        options: {
          compile: true,
          compress: true
        },
        files: {
          '_assets/css/main.css': [
          '_assets/css/plugins/*.less',
          '_assets/css/plugins/*.css',
          '_assets/css/components/base.less'
          ]
        }
      }
    },
    uglify: {
      dist: {
        files: {
          '_assets/js/scripts.js': [
          '_assets/js/plugins/*.js',
          '_assets/js/components/*.js'
          ]
        }
      }
    },
  sprite: {
    all: {
      src: '_assets/img/components/*.png',
      dest: '_assets/img/sprite.png',
      destCss: '_assets/css/plugins/spriteinfo.css',
      imgPath:'../img/sprite.png'
    }
  },

  watch: {
    less: {
      files: [
      '_assets/css/components/*.less',
      '_assets/css/plugins/*.less',
      '_assets/css/components/*.css',
      '_assets/css/plugins/*.css', 
      ],
      tasks: ['recess']
    },
    js: {
      files: [
      '_assets/js/plugins/*.js',
      '_assets/js/components/*.js'
      ],
      tasks: ['uglify']
    },
    img: {
      files: '_assets/img/components/*.png',
      tasks: ['sprite'],
      options: {
        livereload: true,
      },
    },
  },

  clean: {
    dist: [
    '_assets/css/main.css',
    '_assets/js/scripts.js'
    ]
  }

});

   // Load tasks
   grunt.loadNpmTasks('grunt-contrib-clean');
   grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.loadNpmTasks('grunt-contrib-watch');
   grunt.loadNpmTasks('grunt-recess');
   grunt.loadNpmTasks('grunt-spritesmith');

  // Register tasks
  grunt.registerTask('default', [
    'sprite',
    'recess',
    'uglify'
    ]);
  grunt.registerTask('dev', [
    'watch'
    ]);

};
