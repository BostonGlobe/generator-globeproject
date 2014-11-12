var gulp        = require('gulp');
var browserSync = require('browser-sync');
var fileinclude = require('gulp-file-include');
var rename      = require('gulp-rename');
var config      = require('../config');
var util        = require('gulp-util');

gulp.task('html', function() {

	var isProd = config.getUserChoice('packageToJpt');
	var filename = isProd ? 'PROD.jpt' : 'index.html';

	return gulp.src(config.html(isProd), {cwd: config.baseDir()})
		.pipe(fileinclude())
		.pipe(rename(filename))
		.pipe(gulp.dest('./', {cwd: config.baseDir()}))
		.pipe(isProd ? util.noop() : browserSync.reload({stream:true}));
});