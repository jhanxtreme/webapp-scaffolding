module.exports = function(grunt){

	var defaultBanner = '/** \n' +
						'Package: <%=pkg.name %>\n' +
						'Version: <%= pkg.version %>\n' + 
						'Author: <%= pkg.author %>\n' +
						'Date Created: <%= grunt.template.today("yyyy-mm-dd") %> \n' +
						'**/\n' +
						'\'use strict\';\n';

	//Grunt configuration
	grunt.initConfig({

		//INITIALIZE PACKAGE INFORMATION
		pkg: grunt.file.readJSON('package.json'),


		//DEFINE SOURCES
		dirs: {
			src: 'src/',
			dest: 'dist/<%= pkg.name %>/'
		},

		//
		//JAVASRIPT TASKS
		//Minify javascript files	
		uglify: {
			options: {
				mangle: false,
				except: ['jQuery', 'Backbone', 'angular'],
				banner: defaultBanner
			},
			my_target: {
				files: {
					'<%= dirs.dest %>/js/scripts.min.js': ['<%= dirs.src %>/scripts/js/*.js', '<%= dirs.src %>/<%= pkg.name %>/**/*.js'],
				}
			}
		},

		// merge javascript files
		concat: {
			options: {
				separator: '\n\n',
				// stripBanners: true,
				banner: defaultBanner,
				process: function(src, filepath) {
		          return '// Source: ' + filepath + '\n' +
		            src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
		        },
			},
			my_target: {
				files: {
					'<%= dirs.dest %>/js/scripts.js': ['<%= dirs.src %>/scripts/js/*.js', '<%= dirs.src %>/<%= pkg.name %>/**/*.js'],
				}
				
			}
		},

		// Validate javascript fies
		jshint: {
			all: ['Gruntfile.js', '<%= dirs.src %>/scripts/js/*.js', '<%= dirs.src %>/<%= pkg.name %>/**/*.js'],
			// Linting before and after concatenating
			// beforeconcat: ['<%= dirs.src %>/scripts/js/*.js', '<%= dirs.src %>/<%= pkg.name %>/**/*.js'],
			// afterconcat: '<%= dirs.dest %>/js/scripts.js'
		},


		//
		//CSS TASKS
		// Minify CSS files
		cssmin: {
			options: {
			    shorthandCompacting: false,
			    roundingPrecision: -1
			},
			my_target: {
				files: {
					'<%= dirs.dest %>/css/styles.min.css': ['<%= dirs.src %>/scripts/css/*.css', '<%= dirs.src %>/<%= pkg.name %>/**/*.css'],
				}
			}
		},

		// Merge CSS files
		concat_css: {
			options: {
				// assetBaseUrl: '<%= dirs.src %>/scripts/css',
    			// baseDir: '<%= dirs.src %>/(styles|assets|css|scripts)'
			},
			my_target: {
				files: {
					'<%= dirs.dest %>/css/styles.css': ['<%= dirs.src %>/scripts/css/*.css', '<%= dirs.src %>/<%= pkg.name %>/**/*.css'],
				}
			}
		},


		//
		//WATCH ALL SOURCES FOR CHANGES
		watch: {
			scripts: {
				files: ['<%= dirs.src %>/scripts/js/*.js', '<%= dirs.src %>/<%= pkg.name %>/**/*.js'],
				tasks: ['jshint'],
				options:{
					// spawn: false, 
					debounceDelay: 3000, //delay tasks after 3secs
					event: ['added', 'deleted', 'changed'], //specify events triggered 
					// reload: true, // reload targeted files for any type of events
					livereload: true, // reload application for any modified files
					dateFormat: function(time) {
				      grunt.log.writeln('The watch finished in ' + time + 'ms at' + (new Date()).toString());
				      grunt.log.writeln('Waiting for more changes...');
				    },
				}
			}
		},


		//
		//UNIT TESTING WITH KARMA
		karma: {
			unit: {
				// options: {
				// 	files: ['tests/*Spec.js', 'tests/**/*Spec.js']
				// },
				// port: 9999,
			    // singleRun: true,
			    // browsers: ['PhantomJS', 'Chrome', 'Firefox'],
			    // logLevel: 'ERROR',
			    // autoWatch: true,
			    // singleRun: true,
				configFile: 'karma.conf.js',

			}
		}


	});

	//LOAD LIBRARIES
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-concat-css');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-karma');


	//DEFINE TASKS
	grunt.registerTask('greet', function(){
		console.log('Hello World!');
	});


	grunt.registerTask('default', ['jshint', 'uglify', 'cssmin', 'watch']); //default tasks
	grunt.registerTask('css-task', ['concat_css', 'cssmin']); //css tasks
	grunt.registerTask('js-task', ['concat', 'uglify']); // js tasks



};