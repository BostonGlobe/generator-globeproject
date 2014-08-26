var browserSync    = require('browser-sync');
var cheerio        = require('cheerio');
var gulp           = require('gulp');
var concat         = require('gulp-concat');
var csso           = require('gulp-csso');
var fileinclude    = require('gulp-file-include');
var gulpif         = require('gulp-if');
var rename         = require('gulp-rename');
var rimraf         = require('gulp-rimraf');
var sass           = require('gulp-ruby-sass');
var smoosher       = require('gulp-smoosher');
var template       = require('gulp-template-compile');
var uglify         = require('gulp-uglify');
var useref         = require('gulp-useref');
var gutil          = require('gulp-util');
var rewriteModule  = require('http-rewrite-middleware');
var inquirer       = require('inquirer');
var runSequence    = require('run-sequence');
var through        = require('through2');
var argv           = require('yargs').argv;

var fs             = require('fs');
var path           = require('path');

var REWRITE_MIDDLEWARE;
var GRAPHIC;
var PACKAGE_TO_JPT;

function getDirectories(baseDir) {
	return fs.readdirSync(baseDir).filter(function (file) {
		return fs.statSync(baseDir + '/' + file).isDirectory();
	});
}

function initMiddleware() {

	REWRITE_MIDDLEWARE = rewriteModule.getMiddleware(JSON.parse(fs.readFileSync('middleware.json', 'utf8')));
}

gulp.task('clean', function() {
	return gulp.src(['.tmp','PROD.jpt'], {
		read: false,
		cwd: 'graphics/' + GRAPHIC
	}).pipe(rimraf());
});

gulp.task('compile-stylesheets', function() {
	return gulp.src('css/*', {cwd: 'graphics/' + GRAPHIC})
		.pipe(sass({compass: true}))
		.pipe(gulp.dest('.tmp', {cwd: 'graphics/' + GRAPHIC}))
		.pipe(browserSync.reload({stream:true}));
});

gulp.task('compile-templates', function() {
	return gulp.src([
			                  'common/js/templates/*.template',
			'graphics/' + GRAPHIC + '/js/templates/*.template'
		])
		.pipe(template({
			templateSettings: {
				interpolate: /{{([\s\S]+?)}}/g,
				evaluate:    /{=([\s\S]+?)=}/g
			}
		}))
		.pipe(concat('templates.js'))
		.pipe(gulp.dest('.tmp', {cwd: 'graphics/' + GRAPHIC}))
		.pipe(browserSync.reload({stream:true}));
});

gulp.task('build-html', function() {
	return gulp.src('graphics/' + GRAPHIC + '/template.html')
		.pipe(fileinclude())
		.pipe(rename('index.html'))
		.pipe(gulp.dest('graphics/' + GRAPHIC))
		.pipe(browserSync.reload({stream:true}));
});

gulp.task('browser-sync', function() {

	// watch for changes to html
	gulp.watch([
		'graphics/' + GRAPHIC + '/template.html',
		'graphics/' + GRAPHIC + '/html/*'
	], ['build-html']);

	// watch for changes to scss
	gulp.watch([
		                  'common/css/*',
		'graphics/' + GRAPHIC + '/css/*'
	], ['compile-stylesheets']);

	// watch for changes to templates
	gulp.watch([
		                  'common/js/templates/*.template',
		'graphics/' + GRAPHIC + '/js/templates/*.template'
	], ['compile-templates']);

	browserSync({
		server: {
			baseDir: './',
			middleware: REWRITE_MIDDLEWARE
		},
		ghostMode: false,
		startPath: 'graphics/' + GRAPHIC,
		files: [
			'graphics/' + GRAPHIC + '/.tmp/*.js',
			'graphics/' + GRAPHIC + '/js/**/*.js'
		]
	});
});

gulp.task('build-html-prod', function() {
	return gulp.src('template-prod.html', {cwd: 'graphics/' + GRAPHIC})
		.pipe(fileinclude())
		.pipe(rename('PROD.jpt'))
		.pipe(gulp.dest('./', {cwd: 'graphics/' + GRAPHIC}));
});

gulp.task('minify', function() {

	var assets = useref.assets();

	return gulp.src('PROD.jpt', {cwd: 'graphics/' + GRAPHIC})
		.pipe(assets)
		.pipe(gulpif('*.js', uglify()))
		.pipe(gulpif('*.css', csso(true)))
		.pipe(assets.restore())
		.pipe(useref())
		.pipe(gulp.dest('./', {cwd: 'graphics/' + GRAPHIC}));
});

gulp.task('smoosher', function() {

	return gulp.src('PROD.jpt', {cwd: 'graphics/' + GRAPHIC})
		.pipe(smoosher({
			cssTags: {
				begin: '<p:style>',
				end: '</p:style>'
			}
		}))
		.pipe(gulp.dest('./', {cwd: 'graphics/' + GRAPHIC}));
});

function build() {

	if (PACKAGE_TO_JPT) {

		runSequence(
			'clean'
			,'compile-stylesheets'
			,'compile-templates'
			,'build-html-prod'
			,'minify'
			,'smoosher'
		);

	} else {

		initMiddleware();

		runSequence(
			'clean'
			,'compile-stylesheets'
			,'compile-templates'
			,'build-html'
			,'browser-sync'
		);
	}

}

gulp.task('setup', function(done) {

	var graphicChoices = getDirectories('graphics');

	inquirer.prompt([{
		type: 'list',
		name: 'graphicName',
		message: 'Choose a graphic',
		choices: graphicChoices
	},{
		type: 'confirm',
		name: 'packageToJPT',
		message: 'Do you want to package to JPT?',
		default: false
	}], function(answers) {

		GRAPHIC = answers.graphicName;
		PACKAGE_TO_JPT = answers.packageToJPT;

		done();

	});

});

gulp.task('default', ['setup'], function() {

	build();

});
