var gulp           = require('gulp');
var gulpif         = require('gulp-if');
var rename         = require('gulp-rename');
var runSequence    = require('run-sequence');
var fileinclude    = require('gulp-file-include');
var rewriteModule  = require('http-rewrite-middleware');
var sass           = require('gulp-ruby-sass');
var useref         = require('gulp-useref');
var uglify         = require('gulp-uglify');
var csso           = require('gulp-csso');
var rimraf         = require('gulp-rimraf');
var jshint_stylish = require('jshint-stylish');
var jshint         = require('gulp-jshint');
var smoosher       = require('gulp-smoosher');
var through        = require('through2');
var cheerio        = require('cheerio');
var gutil          = require('gulp-util');
var fs             = require('fs');
var path           = require('path');
var concat         = require('gulp-concat');
var template       = require('gulp-template-compile');
var browserSync    = require('browser-sync');
var argv           = require('yargs').argv;

var REWRITE_MIDDLEWARE;
var GRAPHIC;

function initMiddleware() {

	REWRITE_MIDDLEWARE = rewriteModule.getMiddleware(JSON.parse(fs.readFileSync('middleware.json', 'utf8')));
}

gulp.task('clean', function() {
	return gulp.src([
		'.tmp',
		'PROD.jpt'
	], {read:false}).pipe(rimraf());
});

gulp.task('compile-stylesheets', function() {
	return gulp.src(['graphics/' + GRAPHIC + '/css/*'])
		.pipe(sass({compass: true}))
		.pipe(gulp.dest('.tmp'))
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
		.pipe(gulp.dest('.tmp'))
		.pipe(browserSync.reload({stream:true}));
});

gulp.task('build-html', function() {
	return gulp.src('graphics/' + GRAPHIC + '/template.html')
		.pipe(fileinclude())
		.pipe(rename('index.html'))
		.pipe(gulp.dest('.'))
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
		files: [
			                          '.tmp/*.js',
			'graphics/' + GRAPHIC + '/js/**/*.js'
		],
		port: 5000
	});
});

gulp.task('build-html-prod', function() {
	return gulp.src('graphics/' + GRAPHIC + '/template-prod.html')
		.pipe(fileinclude())
		.pipe(rename('PROD.jpt'))
		.pipe(gulp.dest('.'));
});

gulp.task('jshint', function() {

	return gulp.src('PROD.jpt')
		.pipe(through.obj(function(file, enc, callback) {

			var input = String(file.contents);

			var $ = cheerio.load(input);

			var self = this;
			var files = $('script').map(function(index, element) {
				var src = $(element).attr('src');
				var filepath = path.join(__dirname, src);
				var contents = fs.readFileSync(filepath, 'utf8');
				var file = new gutil.File({
					path: filepath,
					contents: new Buffer(contents)
				});
				self.push(file);
			});

			callback(null);
		}))
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('minify', function() {

	return gulp.src('PROD.jpt')
		.pipe(useref.assets())
		.pipe(gulpif('*.js', uglify()))
		.pipe(gulpif('*.css', csso(true)))
		.pipe(useref.restore())
		.pipe(useref())
		.pipe(gulp.dest('.'));
});

gulp.task('smoosher', function() {

	return gulp.src('PROD.jpt')
		.pipe(smoosher({
			cssTags: {
				begin: '<p:style>',
				end: '</p:style>'
			}
		}))
		.pipe(gulp.dest('.'));
});

function devBuild() {

	initMiddleware();

	runSequence(
		'clean'
		,'compile-stylesheets'
		,'compile-templates'
		,'build-html'
		,'browser-sync'
	);
}

function prodBuild() {
	runSequence(
		'clean'
		,'compile-stylesheets'
		,'compile-templates'
		,'build-html-prod'
		,'jshint'
		,'minify'
		,'smoosher'
	);
}

gulp.task('default', function() {

	GRAPHIC = argv.graphic;

	if (!GRAPHIC) {
		console.log('ERROR: please specify a <graphic> parameter. E.g. gulp --graphic=myGraphic');
		process.exit(1);
	}

	if (argv.env === 'prod') {
		prodBuild();
	} else {
		devBuild();
	}

});
