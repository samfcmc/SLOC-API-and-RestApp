module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-bower-task');
  require('load-grunt-tasks')(grunt);

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
              keepalive: true,
              open: true
            }
        }
    }
  });

  // Default task(s).
  grunt.registerTask('default', ['bower', 'php']);

};
