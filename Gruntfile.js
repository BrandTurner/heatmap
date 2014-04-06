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
					{
						src: 'src/index.html',
						dest: 'dist/',
						flatten: true,
						expand: true,
						filter: 'isFile'
					}
				]
			},
			prod: {
				files: [
					{
						src: 'bower_components/jquery/dist/jquery.min.js',
						dest: 'dist/jquery.js',
						flatten: true,
						expand: false,
						filter: 'isFile'
					},
					{
						src: 'build/costa-sansa.min.js',
						dest: 'dist/costa-sansa.js',
						flatten: true,
						expand: false,
						filter: 'isFile'
					}
				]
			},
			dev: {
				files: [
					{
						src: 'bower_components/jquery/dist/jquery.js',
						dest: 'dist/jquery.js',
						flatten: true,
						expand: false,
						filter: 'isFile'
					},
					{
						src: 'src/costa-sansa.js',
						dest: 'dist/',
						flatten: true,
						expand: true,
						filter: 'isFile'
					},
					{
						src: 'src/index.html',
						dest: 'dist/',
						flatten: true,
						expand: true,
						filter: 'isFile'
					}
				]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('prod',['clean','uglify','copy:main','copy:prod']);
	grunt.registerTask('dev',['clean','copy:main','copy:dev']);
	grunt.registerTask('default',['dev']);
};