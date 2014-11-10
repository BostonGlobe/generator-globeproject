var gulp        = require('gulp');
var sass        = require('gulp-ruby-sass');
var browserSync = require('browser-sync');
var config      = require('../config');
var csso        = require('gulp-csso');
var util        = require('gulp-util');
var rename      = require('gulp-rename');

gulp.task('sass', function() {

	var graphic = config.getUserChoice('graphic');
	var isProd = config.getUserChoice('packageToJpt');

	return gulp.src('css/*', {cwd: config.baseDir()})
		.pipe(sass({compass: true}))
		.pipe(isProd ? csso(true) : util.noop())
		.pipe(isProd ? rename(graphic + '.css') : util.noop())
		.pipe(!isProd ? gulp.dest('.tmp', {cwd: config.baseDir()}) : gulp.dest('/Volumes/www_html/multimedia/graphics/projectFiles/2014/11/assets'))
		.pipe(!isProd ? browserSync.reload({stream:true}) : util.noop());
});