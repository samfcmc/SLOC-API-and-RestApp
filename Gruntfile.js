module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-watch');
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-contrib-copy');

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
    }
  });

  // Default task(s).
  grunt.registerTask('default', ['bower', 'php:dist', 'php:watch', 'watch']);
  grunt.registerTask('dist', ['bower']);

};
