var gulp        = require('gulp');
var runSequence = require('run-sequence');
var config      = require('../config');

gulp.task('build', function(done) {

	if (config.getUserChoice('packageToJpt')) {

		runSequence(
			'sass',
			'webpack',
			'html',
			'smoosh'
		);

	} else {

		runSequence(
			'watch',
			'html',
			'browser-sync',
			'sass',
			'webpack'
		);
	}
});