'use strict';
var LIVERELOAD_PORT = 35729;
var SERVER_PORT = 9000;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

// # Globbing
module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // configurable paths
    var yeomanConfig = {
        app: './app',
        dist: '../app-mobile/www'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,
        watch: {
            options: {
                nospawn: true,
                livereload: LIVERELOAD_PORT
            },
            sass: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['sass:server']
            },
            livereload: {
                options: {
                    livereload: grunt.option('livereloadport') || LIVERELOAD_PORT
                },
                files: [
                    '<%= yeoman.app %>/*.html',
                    '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
                    '{.tmp,<%= yeoman.app %>}/scripts/**/*.js',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                    '<%= yeoman.app %>/scripts/templates/{,*/}*.{ejs,mustache,hbs}'
                ]
            },
            browserify: {
                files: [
                    '<%= yeoman.app %>/scripts/**/*.js',
                    '!<%= yeoman.app %>/scripts/app.js'
                ],
                tasks: ['browserify:dev']
            }
        },
        connect: {
            options: {
                port: grunt.option('port') || SERVER_PORT,
                // change this to '0.0.0.0' to access the server from outside
                hostname: '0.0.0.0'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, yeomanConfig.dist)
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        },
        clean: {
            dist: ['.tmp', '<%= yeoman.dist %>/*'],
            server: '.tmp'
        },
        bower_concat: {
            dev: {
                include: [
                    'framework7'
                ],
                mainFiles: {
                    'framework7': 'dist/css/framework7.ios.css'
                },
                cssDest: '.tmp/styles/bower.css'
            },
            dist: {
                include: [
                    'framework7'
                ],
                mainFiles: {
                    'framework7': 'dist/css/framework7.ios.css'
                },
                cssDest: '<%= yeoman.dist %>/styles/bower.css'
            }
        },
        sass: {
          options: {
              //sourcemap: 'auto',
              loadPath: ['app/bower_components', './node_modules']
            },
          dist: {
            options: {
                style: 'compressed'
            },
            files: [{
              expand: true,
              cwd: '<%= yeoman.app %>/styles',
              src: ['*.{scss,sass}'],
              dest: '<%= yeoman.dist %>/styles',
              ext: '.css'
            }]
          },
          server: {
            files: [{
              expand: true,
              cwd: '<%= yeoman.app %>/styles',
              src: ['*.{scss,sass}'],
              dest: '.tmp/styles',
              ext: '.css'
            }]
          }
        },
        browserify: {
            options: {
                alias: {
                    'App': '<%= yeoman.app %>/scripts/app.js',
                    'Conf': '<%= yeoman.app %>/scripts/conf.js'
                }
            },
            dev: {
                files: {
                    '<%= yeoman.app %>/bundle.js': ['<%= yeoman.app %>/scripts/*.js']
                }
            }
        },
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                dirs: ['<%= yeoman.dist %>']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        htmlmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>',
                    src: '*.html',
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },
        copy: {
            server: {
                expand: true,
                cwd: '<%= yeoman.app %>/bower_components/requirejs/',
                dest: '<%= yeoman.app %>/scripts/vendor/',
                src: ['require.js']
            },
            compile: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/bower_components/requirejs/',
                        dest: '<%= yeoman.dist %>/scripts/vendor/',
                        src: ['require.js']
                    },
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/bower_components/modernizr/',
                        dest: '<%= yeoman.dist %>/scripts/vendor/',
                        src: ['modernizr.js']
                    }
                ]
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/bower_components/requirejs/',
                        dest: '<%= yeoman.dist %>/scripts/vendor/',
                        src: ['require.js']
                    },
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/bower_components/modernizr/',
                        dest: '<%= yeoman.dist %>/scripts/vendor/',
                        src: ['modernizr.js']
                    },
                    {
                        expand: true,
                        src: ['**'],
                        cwd: '<%= yeoman.app %>/fonts/',
                        dest: '<%= yeoman.dist %>/fonts/'
                    },
                    {
                        expand: true,
                        src: ['**.svg'],
                        cwd: '<%= yeoman.app %>/images/',
                        dest: '<%= yeoman.dist %>/images/'
                    }
                ]
            }
        },
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/{,*/!(require)}*.js',
                        '<%= yeoman.dist %>/styles/{,*/}*.css',
                        '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                        '/styles/fonts/{,*/}*.*'
                    ]
                }
            }
        },
        shell: {
            prepare: {
                command: 'cd ../app-mobile/; cordova prepare'
            },
            runAndroid: {
                command: 'cd ../app-mobile/; cordova build android; cordova run android --device'
            },
            runiOS: {
                command: 'cd ../app-mobile/; cordova build ios; cordova run ios --device'
            }
        }
    });

    grunt.registerTask('server', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve' + (target ? ':' + target : '')]);
    });

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open:server', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'browserify:dev',
            'copy:server',
            'bower_concat:dev',
            'sass:server',
            'connect:livereload',
            'open:server',
            'watch'
        ]);
    });

    grunt.registerTask('compile', function(target) {
        grunt.task.run([
            'clean:dist',
            'copy:compile',
            'bower_concat:dist',
            'sass:dist',
            'useminPrepare',
            'imagemin',
            'htmlmin',
            'usemin'
        ]);

        if (target == 'android') {
            grunt.task.run([
                'shell:runAndroid'
            ]);
        }
        else if (target == 'ios') {
            grunt.task.run([
                'shell:runiOS'
            ]);
        }
        else {
            grunt.task.run([
                'shell:prepare'
            ]);
        }
    });

    grunt.registerTask('build', [
        'clean:dist',
        'copy:dist',
        'bower_concat:dist',
        'sass:dist',
        'useminPrepare',
        'imagemin',
        'htmlmin',
        'uglify',
        'rev',
        'usemin'
    ]);

    grunt.registerTask('default', [
        'serve'
    ]);
};