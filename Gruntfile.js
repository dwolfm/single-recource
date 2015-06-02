'use strict';

var workingFiles = ['lib/**/*.js', 'test/**/*.js', './*.js'];


module.exports = function(grunt){
	// load grunt-npm plugins
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-simple-mocha');
	grunt.loadNpmTasks('grunt-nodemon');
	
	// configure grunt tasks
	grunt.initConfig({
		jshint: {
			dev: {
				src: workingFiles
			},
			options: {
				jshintrc: true
			}
		},
		simplemocha: {
			options: {
				globals: ['should'],
				timeout: 3000,
				ignoreLeaks: false,
				ul: 'bdd',
				reporter: 'tap'
			},
			dev: {
				src:['test/**/*_test.js']
			}
		},
		watch: {
			lint: {
				files: workingFiles,
				tasks: ['jshint:dev'],
				options: {
					spawn: false,
				}
			}
		}, 
		nodemon: {
			dev: {
				script: 'server.js'
			}
		}

	});	  
	// register grunt tasks
	grunt.registerTask('test', ['simplemocha:dev']);
	grunt.registerTask('default', ['jshint:dev','simplemocha:dev']);

};
