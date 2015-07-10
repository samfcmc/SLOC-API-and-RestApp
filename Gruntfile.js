module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-bower-task');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower: {
      install: {
         options: {
           targetDir: 'restApp/bower_components'
         }
      }
    }
  });

  // Default task(s).
  grunt.registerTask('default', ['bower']);

};
