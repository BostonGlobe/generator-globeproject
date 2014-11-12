var gulp     = require('gulp');
var smoosher = require('gulp-smoosher');
var config   = require('../config');

gulp.task('smoosh', function() {

	return gulp.src('PROD.jpt', {cwd: config.baseDir()})
		.pipe(smoosher({
			cssTags: {
				begin: '<p:style>',
				end: '</p:style>'
			}
		}))
		.pipe(gulp.dest('./', {cwd: config.baseDir()}));
});