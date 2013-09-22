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
                    '<%= paths.src %>/<%= pkg.name %>.js'
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
                    "<%= paths.dist %>/math.relativechange.min.js": [
                        "<%= paths.src %>/<%= pkg.name %>.js"
                    ]
                }
            }
        }
    });

    grunt.registerTask('build', [
        'clean:dist',
        'concat',
        'uglify',
        'targethtml'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-targethtml');
};
