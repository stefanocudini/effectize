'use strict';

module.exports = function(grunt) {

grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	meta: {
		banner:
		'/* <%= pkg.name %> v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> \n'+
		' * \n'+
		' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> \n'+
		' * <%= pkg.author.email %> \n'+
		' * <%= pkg.author.url %> \n'+
		' * \n'+
		' * Licensed under <%= pkg.license %> license. \n'+
		' * \n'+
		' * Demo: <%= pkg.homepage %> \n'+
		' * Code: <%= pkg.repository.url %> \n'+
		' */\n'
	},	
	clean: {
		dist: {
			src: ['index.html']
		}
	},
	jshint: {
		options: {
			globals: {
				console: true,
				module: true
			},
			"-W099": true,	//ignora tabs e space warning
			"-W033": true,
			"-W044": true	//ignore regexp
		},
		files: ['<%= pkg.main %>']
	},
	markdown: {
		readme: {
			files: {
				'index.html': ['README.md']
			}
		}
	},
	watch: {
		dist: {
			options: { livereload: true },
			files: ['<%= pkg.main %>', 'examples.html'],
			tasks: ['jshint']
		}		
	}
});

grunt.registerTask('default', [
	'clean',
	'jshint',
	'markdown'
]);

grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-markdown');
grunt.loadNpmTasks('grunt-contrib-watch');

};