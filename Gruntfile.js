module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    emberTemplates: {
      compile: {
        options: {
          templateName: function(sourceFile) {
            return sourceFile.replace(/assets\/templates\//, '');
          }
        },
        files: {
          "assets/templates/templates.js": "assets/templates/*.handlebars"
        }
      }
    },
    watch: {
      emberTemplates: {
        files: 'assets/templates/*.handlebars',
        tasks: ['emberTemplates', 'livereload']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-ember-templates');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['emberTemplates']);
}
