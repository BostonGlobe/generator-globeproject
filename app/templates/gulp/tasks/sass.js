var gulp        	= require('gulp');
var sass        	= require('gulp-ruby-sass');
var browserSync 	= require('browser-sync');
var config      	= require('../config');
var csso        	= require('gulp-csso');
var util        	= require('gulp-util');
var rename      	= require('gulp-rename');
var handleErrors	= require('../util/handleErrors');
var ignore          = require('gulp-ignore');

gulp.task('sass', function() {

	var graphic = config.getUserChoice('graphic');
	var isProd = config.getUserChoice('packageToJpt');

	return gulp.src('css/*', {cwd: config.baseDir()})
		.pipe(sass({compass: true}))
		.on('error', handleErrors)
		.pipe(ignore.exclude('**/*.css.map'))
		.pipe(isProd ? csso(true) : util.noop())
		.pipe(gulp.dest('.tmp', {cwd: config.baseDir()}))
		.pipe(!isProd ? browserSync.reload({stream:true}) : util.noop());
});
