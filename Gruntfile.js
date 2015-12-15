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
      build: ["build", ".tmp"],
      tmp: ".tmp"
    },

    jshint: {
      options: {
        jshintrc: true, // search for .jshintrc files relative to the files being linted
        reporter: require("jshint-stylish")
      },
      client: {
        src: ["public/js/**/*.js"]
      },
      server: {
        src: ["app.js"]
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

      html: {
        expand: true,
        cwd: "public",
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
      },

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
        files: ["public/**/*.html"],
        tasks: ["copy:html"]
      },

      css: {
        files: ["public/css/**/*.css"],
        tasks: ["copy:css_debug"]
      },

      rebuild: {
        files: ["Gruntfile.js"],
        tasks: ["jshint:build", "build:debug"]
      }
    },

    useminPrepare: {
      html: "public/index.html",
      options: {
        dest: "build"
      }
    },

    filerev: {
      options: {
        algorithm: "md5",
        length: 8
      },
      release: {
        src: [
          "build/js/**/*.js",
          "build/css/*.css",
          "build/*.ico"
        ]
      }
    },

    usemin: {
      html: ["build/**/*.html"],
      css: ["build/css/*.css"],
      options: {
        assetsDir: ["build"]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-filerev");
  grunt.loadNpmTasks("grunt-usemin");


  /* debug tasks */
  grunt.registerTask("build:debug", "Prepares a `debug` build in `/build`", ["clean", "jshint", "copy:favicon", "copy:html", "copy:js_debug", "copy:css_debug"]);
  grunt.registerTask("dev", "Continuous development mode", ["build:debug", "serve:debug"]);
  grunt.registerTask("serve:debug", "Set up a static HTTP server for continuous development", function() {
    grunt.log.ok("running `serve` task...");
    grunt.task.run(["build:debug", "connect:server", "watch"]);
  });

  /* release tasks */
  grunt.registerTask("build:release", "Prepares a `release` build in `/build`", ["clean", "jshint", "useminPrepare", "concat:generated", "cssmin:generated", "uglify:generated", "copy:html", "filerev", "usemin", "clean:tmp"]);
  grunt.registerTask("heroku", ["build:release"]);

  /* continuous integration tasks */
  grunt.registerTask("ci", "Continuous integration tasks", ["jshint"]);
};
