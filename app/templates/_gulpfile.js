var express = require('express');
var gulp = require('gulp');
var livereload = require('gulp-livereload');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var fileinclude = require('gulp-file-include');
var rewriteModule = require('http-rewrite-middleware');

var LIVERELOAD_PORT = 35728;
var EXPRESS_PORT = 5000;

var rewriteMiddleware = rewriteModule.getMiddleware([

	{from: '^/css/globe-basic.css', to: '/parts/globe/css/globe-basic.css', redirect: 'permanent'},
	{from: '^/css/globe-trialHeaders.css', to: '/parts/globe/css/globe-trialHeaders.css', redirect: 'permanent'},
	{from: '^/css/globe-print.css', to: '/parts/globe/css/globe-print.css', redirect: 'permanent'},
	{from: '^/css/html5reset.css,globe-globals.css,globe-masthead.css,globe-nav.css,globe-nav-menus.css,globe-saved.css,globe-main.css,globe-footer.css,globe-trialHeaders.css,modal-login.css', to: '/parts/globe/css/html5reset.css,globe-globals.css,globe-masthead.css,globe-nav.css,globe-nav-menus.css,globe-saved.css,globe-main.css,globe-footer.css,globe-trialHeaders.css,modal-login.css', redirect: 'permanent'},
	{from: '^/css/globe-fonts.css', to: '/parts/globe/css/globe-fonts.css', redirect: 'permanent'},

	{from: '^/js/lib/rwd-images.js,lib/respond.min.js,lib/modernizr.custom.min.js,globe-define.js,globe-controller.js', to: '/parts/globe/js/rwd-images.js,respond.min.js,modernizr.custom.min.js,globe-define.js,globe-controller.js', redirect: 'permanent' },
	{from: '^/js/lib/jquery.js,lib/magnific.js,globe-modal-login.js,globe-modal-meter.js', to: '/parts/globe/js/jquery.js,magnific.js,globe-modal-login.js,globe-modal-meter.js', redirect: 'permanent' },
	{from: '^/js/lib/psswrd.js', to: '/parts/globe/js/psswrd.js', redirect: 'permanent' },
	{from: '^/js/lib/jquery.js,globe-analytics.js,lib/jquery.throttledresize.js,lib/jquery.carousel.js,lib/jquery.collapsible.js,lib/jquery.stickyscroll.js,lib/jquery.delayedenter.min.js,lib/jquery-ajax-include.js,globe-statusmsg.js,globe-common.js,globe-masthead.js,lib/picturefill.js,globe-adcatalog.js,globe-adinclude.js,globe-contentinclude.js', to: '/parts/globe/js/1d2f16c5cb4bc0ef6e8c021e859162c9.js', redirect: 'permanent' },

	{from: '^/rw/SysConfig/WebPortal/BostonGlobe/Framework/images/logo-bg.png', to: '/parts/globe/images/logo-bg.png', redirect: 'permanent'},
	{from: '^/rw/SysConfig/WebPortal/BostonGlobe/Framework/images/White-B-Logo-non-transparent.jpg', to: '/parts/globe/images/White-B-Logo-non-transparent.jpg', redirect: 'permanent'},
	{from: '^/rw/SysConfig/WebPortal/BostonGlobe/Framework/images/Device-LockUp-non-transparent.jpg', to: '/parts/globe/images/Device-LockUp-non-transparent.jpg', redirect: 'permanent'},
	{from: '^/rw/SysConfig/WebPortal/BostonGlobe/Framework/images/Globe-Logo-non-transparent.jpg', to: '/parts/globe/images/Globe-Logo-non-transparent.jpg', redirect: 'permanent'},
	{from: '^/rw/SysConfig/WebPortal/BostonGlobe/Framework/images/Device-LockUp-Mobile-non-transparent.jpg', to: '/parts/globe/images/Device-LockUp-Mobile-non-transparent.jpg', redirect: 'permanent'},
	{from: '^/rw/SysConfig/WebPortal/BostonGlobe/Framework/images/logo-bg.png', to: '/parts/globe/images/logo-bg.png', redirect: 'permanent'},
	{from: '^/rw/SysConfig/WebPortal/BostonGlobe/Framework/images/White-B-Logo-non-transparent.jpg', to: '/parts/globe/images/White-B-Logo-non-transparent.jpg', redirect: 'permanent'},
	{from: '^/rw/SysConfig/WebPortal/BostonGlobe/Framework/type/MillerHeadline-Bold/3c91bd2d-bc82-4bba-944e-ab157bcdeae2-3.woff', to: '/parts/globe/fonts/3c91bd2d-bc82-4bba-944e-ab157bcdeae2-3.woff', redirect: 'permanent'},
	{from: '^/rw/SysConfig/WebPortal/BostonGlobe/Framework/type/BentonSans-Bold/79e52a98-c6b6-4ed0-a074-409e1de09fd6-3.woff', to: '/parts/globe/fonts/79e52a98-c6b6-4ed0-a074-409e1de09fd6-3.woff', redirect: 'permanent'},
	{from: '^/rw/SysConfig/WebPortal/BostonGlobe/Framework/type/BentonSans-Black/cd378061-6625-4ff0-8a52-906e943df050-3.woff', to: '/parts/globe/fonts/cd378061-6625-4ff0-8a52-906e943df050-3.woff', redirect: 'permanent'},
	{from: '^/rw/SysConfig/WebPortal/BostonGlobe/Framework/type/BentonSans-Black/cd378061-6625-4ff0-8a52-906e943df050-1.ttf', to: '/parts/globe/fonts/cd378061-6625-4ff0-8a52-906e943df050-1.ttf', redirect: 'permanent'},
	{from: '^/rw/SysConfig/WebPortal/BostonGlobe/Framework/type/BentonSans-Bold/79e52a98-c6b6-4ed0-a074-409e1de09fd6-1.ttf', to: '/parts/globe/fonts/79e52a98-c6b6-4ed0-a074-409e1de09fd6-1.ttf', redirect: 'permanent'},
	{from: '^/rw/SysConfig/WebPortal/BostonGlobe/Framework/type/MillerHeadline-Bold/3c91bd2d-bc82-4bba-944e-ab157bcdeae2-1.ttf', to: '/parts/globe/fonts/3c91bd2d-bc82-4bba-944e-ab157bcdeae2-1.ttf', redirect: 'permanent'},
	{from: '^/rw/SysConfig/WebPortal/BostonGlobe/Framework/type/BentonSans-Black/cd378061-6625-4ff0-8a52-906e943df050-4.svg', to: '/parts/globe/fonts/cd378061-6625-4ff0-8a52-906e943df050-4.svg', redirect: 'permanent'},
	{from: '^/rw/SysConfig/WebPortal/BostonGlobe/Framework/type/BentonSans-Bold/79e52a98-c6b6-4ed0-a074-409e1de09fd6-4.svg', to: '/parts/globe/fonts/79e52a98-c6b6-4ed0-a074-409e1de09fd6-4.svg', redirect: 'permanent'},
	{from: '^/rw/SysConfig/WebPortal/BostonGlobe/Framework/type/MillerHeadline-Bold/3c91bd2d-bc82-4bba-944e-ab157bcdeae2-4.svg', to: '/parts/globe/fonts/3c91bd2d-bc82-4bba-944e-ab157bcdeae2-4.svg', redirect: 'permanent'},
	{from: '^/Fragment/SysConfig/WebPortal/BostonGlobe/Framework/ajaxsamples/global-nav-menus.jpt', to: '/parts/globe/global-nav-menus.jpt', redirect: 'permanent'}

]);

// start server
function server(callback) {
	var app = express();
	app.use(express.static(__dirname));
	app.use(rewriteMiddleware);
	app.listen(EXPRESS_PORT);

	callback && callback();
}

// start livereload
function startLivereload() {
	livereload(LIVERELOAD_PORT);
}

gulp.task('build-html', function() {
	return gulp.src('parts/default.html')
		.pipe(fileinclude())
		.pipe(rename('index.html'))
		.pipe(gulp.dest('.'));
});

gulp.task('start-livereload', function(callback) {
	server(startLivereload);

	callback && callback();
})

gulp.task('default', function() {

	runSequence('build-html', 'start-livereload');

});
