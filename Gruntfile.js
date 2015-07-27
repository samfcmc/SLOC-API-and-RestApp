module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-watch');
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower: {
      install: {
         options: {
           targetDir: 'restApp/bower_components'
         }
      }
    },
    php: {
        dist: {
            options: {
              keepalive: false,
              open: true,
              port: 9000
            }
        },
        watch: {

        }
    },
    copy: {
      bower: {
        src: 'bower_components/',
        dest: 'restApp/bower_components',
      },
    },
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['bower:install']
      },
      bowercomponents: {
        files: ['bower_components/**/*'],
        tasks: ['copy:bower']
      }
    },
    clean: {
      build: ["bower_components", "restApp/bower_components"],
    }
  });

  grunt.registerTask('common', ['bower'])
  grunt.registerTask('default', ['common', 'php:dist', 'php:watch', 'watch']);
  grunt.registerTask('dist', ['common']);

};
