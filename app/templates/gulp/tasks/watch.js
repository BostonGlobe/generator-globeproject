var gulp   = require('gulp');
var config = require('../config');

gulp.task('watch', function() {

	// watch for changes to html
	gulp.watch([
		config.baseDir() + '/**/*.html'
	], ['html']);

	// watch for changes to sass
	gulp.watch([
		'common/assets/css/*',
		config.baseDir() + '/css/*'
	], ['sass']);
});