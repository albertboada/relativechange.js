'use strict';

module.exports = function (grunt) {
    // configurable paths
    var paths = {
        src:  'src',
        dist: 'dist'
    };

    grunt.initConfig({
        paths: paths,
        pkg: grunt.file.readJSON('package.json'),
        meta: {
          banner: '/* <%= pkg.name %>.js' +
            ' <%= pkg.version %>' +
            ' (<%= pkg.author.url %>) \n' +
            ' * Copyright (c) <%= grunt.template.today("yyyy") %>' +
            ' <%= pkg.author.name %> < <%= pkg.author.email %> >\n' +
            ' * Licensed under <%= pkg.licence %>. */ \n'
        },
        targethtml: {
            dist: {
                files: {
                    '<%= paths.dist %>/demo/index.html': '<%= paths.src %>/demo/index.html'
                }
            }
        },
        clean: {
            dist: {
                files: [{
                    //dot: true,
                    src: [
                        '<%= paths.dist %>/*'
                    ]
                }]
            }
        },
        concat: {
            options: {
                //stripBanners: true,
                banner: "<%= meta.banner %> \n"
            },
            dist: {
                src: [
                    '<%= paths.src %>/relchange.prefix',
                    '<%= paths.src %>/raw.js',
                    '<%= paths.src %>/percentage.js',
                    '<%= paths.src %>/multiplier.js',
                    '<%= paths.src %>/relchange.module',
                    '<%= paths.src %>/relchange.suffix'
                ],
                dest: '<%= paths.dist %>/<%= pkg.name %>.js',
            }
        },
        uglify: {
            options: {
                banner: "<%= meta.banner %>"
            },
            dist: {
                files: {
                    "<%= paths.dist %>/relativechange.min.js": [
                        "<%= paths.dist %>/<%= pkg.name %>.js"
                    ]
                }
            }
        },
        watch: {
            files: ["src/**/*", "test/**/*"],
            tasks: ["build", "karma:background:run"]
        },
        karma: {
            options: {
                configFile: 'karma.conf.js'
            },
            unit: {
                singleRun: true
            },
            background: {
                background: true,
                autoWatch:  false
                //browsers: [ grunt.option('browser') || 'PhantomJS' ]
            }
        }
    });

    grunt.registerTask('build', [
        'clean:dist',
        'concat',
        'uglify'
        //'targethtml'
    ]);

    grunt.registerTask('default', [
        'build',
        'karma:unit'
    ]);

    grunt.registerTask('dev', 'Run dev server and watch for changes', [
        'default',
        'karma:background',
        'watch'
    ]);

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    //grunt.loadNpmTasks('grunt-targethtml');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-watch');
};
