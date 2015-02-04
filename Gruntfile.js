module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		concat: {
			options: {
				separator: '\r\n\r\n'
			},
			dist: {
				src: [
                    'src/modules/00-soundmanager2.js', 
                    'src/01-app.js',
                    'src/02-filter-humanTime.js',
                    'src/03-factory-angularPlayer.js',
                    'src/04-directive-soundManager.js',
                    'src/05-directive-musicPlayer.js',
                    'src/06-directive-playFromPlaylist.js',
                    'src/07-directive-removeFromPlaylist.js',
                    'src/08-directive-seekTrack.js',
                    'src/09-directive-playMusic.js',
                    'src/10-directive-pauseMusic.js',
                    'src/11-directive-stopMusic.js',
                    'src/12-directive-nextTrack.js',
                    'src/13-directive-prevTrack.js',
                    'src/14-directive-muteMusic.js',
                    'src/15-directive-repeatMusic.js',
                    'src/16-directive-musicVolume.js',
                    'src/17-directive-clearPlaylist.js',
                    'src/18-directive-playAll.js',
                ],
				dest: 'dist/angular-soundmanager2.js'
			}
		},

		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: {
					'dist/angular-soundmanager2.js': ['<%= concat.dist.dest %>']
				}
			}
		},

		jshint: {
			files: ['gruntfile.js', 'src/*.js', 'src/modules/*.js'],
			options: {
				globals: {
					jQuery: true,
					console: true,
					module: true
				}
			}
		},

		watch: {
			files: ['<%= jshint.files %>'],
			tasks: ['concat', 'uglify', 'jshint']
		}

	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
    
	grunt.registerTask('default', ['concat', 'uglify', 'jshint', 'watch']);
};