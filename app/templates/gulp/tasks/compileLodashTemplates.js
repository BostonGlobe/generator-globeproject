var gulp        = require('gulp');
var config      = require('../config');
var shelljs     = require('shelljs/global');

gulp.task('compileLodashTemplates', function(done) {
	exec('lodash template="' + config.baseDir() + '/js/templates/*.template" -d -o ' + config.baseDir() + '/js/templates/templates.js');
	done();
});