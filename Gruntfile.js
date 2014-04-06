module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: [
			'dist'
		],
		uglify: {
			build: {
				src: 'src/<%= pkg.name %>.js',
				dest: 'build/<%= pkg.name %>.min.js'
			}
		},
		copy: {
			main: {
				files: [
					{src: 'bower_components/jquery/jquery.js',dest: 'dist/jquery.js',flatten: true,expand: false,filter: 'isFile'},
					{src: 'bower_components/jquery-ui/ui/jquery-ui.js',dest: 'dist/',flatten: true,expand: true,filter: 'isFile'},
					{src: 'bower_components/jquery-mockjax/jquery.mockjax.js',dest: 'dist',flatten: true,expand: true,filter: 'isFile'},
					{src: 'bower_components/jquery-mockjson/js/jquery.mockjson.js',dest: 'dist',flatten: true,expand: true,filter: 'isFile'},
					{src: 'bower_components/jquery.event.drag-drop/event.drag/jquery.event.drag.js',dest: 'dist/',flatten: true,expand: true,filter: 'isFile'},
					{src: 'bower_components/jquery.event.drag-drop/event.drop/jquery.event.drop.js',dest: 'dist/',flatten: true,expand: true,filter: 'isFile'},
					{src: 'bower_components/slickgrid/slick.core.js',dest: 'dist/',flatten: true,expand: true,filter: 'isFile'},
					{src: 'bower_components/slickgrid/slick.grid.js',dest: 'dist/',flatten: true,expand: true,filter: 'isFile'},
					{src: 'bower_components/slickgrid/slick.grid.css',dest: 'dist/',flatten: true,expand: true,filter: 'isFile'},
					{src: 'src/index.html',dest: 'dist/',flatten: true,expand: true,filter: 'isFile'}
				]
			},
			prod: {
				files: [
					{src: 'build/costa-sansa.min.js',dest: 'dist/costa-sansa.js',flatten: true,expand: false,filter: 'isFile'}
				]
			},
			dev: {
				files: [
					{src: 'src/costa-sansa.js',dest: 'dist/',flatten: true,expand: true,filter: 'isFile'}
				]
			}
		},
		watch: {
			scripts: {
				files: ['**/*.js'],
				tasks: ['dev'],
				options: {
					spawn: false
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('prod',['clean','uglify','copy:main','copy:prod']);
	grunt.registerTask('dev',['clean','copy:main','copy:dev']);
	grunt.registerTask('default',['dev']);
};