"use strict";

module.exports = function(grunt) {
  grunt.initConfig({

    connect: {
      server: {
        options: {
          port: 5000,
          base: "build",
          open: true,
          hostname: "*",
          livereload: true
        }
      },
    },

    clean : {
      build: "build"
    },

    jshint: {
      options: {
        jshintrc: true, // search for .jshintrc files relative to the files being linted
        reporter: require("jshint-stylish")
      },
      client: {
        src: ["public/js/**/*.js"]
      },
      build: {
        src: ["Gruntfile.js"]
      }
    },

    copy: {

      favicon: {
        expand: true,
        cwd: "public",
        src: "favicon.ico",
        dest: "build"
      },

      html_debug: {
        expand: true,
        cwd: "public/views",
        src: "**/*.html",
        dest: "build"
      },

      css_debug: {
        expand: true,
        cwd: "public/css",
        src: "**/*.css",
        dest: "build/css"
      },

      js_debug: {
        expand: true,
        cwd: "public/js",
        src: "**/*.js",
        dest: "build/js"
      }
    },

    watch: {
      livereload: {
          options: {
            livereload: "<%= connect.server.options.livereload %>"
          },
          files: [
            "build/**/*.html",
            "build/js/**/*.js",
            "build/css/**/*.css"
          ]
      },

      js: {
        files: ["public/js/**/*.js"],
        tasks: ["jshint:client", "copy:js_debug"]
      },

      html: {
        files: ["public/views/**/*.html"],
        tasks: ["copy:html_debug"]
      },

      css: {
        files: ["public/css/**/*.css"],
        tasks: ["copy:css_debug"]
      },

      rebuild: {
        files: ["Gruntfile.js"],
        tasks: ["jshint:build", "build:debug"]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-watch");


  grunt.registerTask("build:debug", "lint and compile", ["clean", "jshint", "copy:favicon", "copy:html_debug", "copy:js_debug", "copy:css_debug"]);
  grunt.registerTask("dev", "development mode", ["build:debug", "serve"]);
  grunt.registerTask("serve", function() {
    grunt.log.ok("running `serve` task...");
    grunt.task.run(["build:debug", "connect:server", "watch"]);
  });
};
