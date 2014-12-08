var gulp        = require('gulp');
var runSequence = require('run-sequence');
var config      = require('../config');

gulp.task('build', function(done) {

	if (config.getUserChoice('packageToJpt')) {

		runSequence(
			'compileLodashTemplates',
			'sass',
			'webpack',
			'html',
			'smoosh'
		);

	} else {

		runSequence(
			'compileLodashTemplates',
			'watch',
			'html',
			'browser-sync',
			'sass',
			'webpack'
		);
	}
});