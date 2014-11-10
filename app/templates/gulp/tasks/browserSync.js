var gulp          = require('gulp');
var rewriteModule = require('http-rewrite-middleware');
var fs            = require('fs');
var browserSync   = require('browser-sync');
var config        = require('../config');

gulp.task('browser-sync', function() {

	REWRITE_MIDDLEWARE = rewriteModule.getMiddleware(JSON.parse(fs.readFileSync('middleware.json', 'utf8')));

	browserSync({
		server: {
			baseDir: './',
			middleware: REWRITE_MIDDLEWARE
		},
		ghostMode: false,
		startPath: config.baseDir()
	});
});