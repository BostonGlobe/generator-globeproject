(function() { globe.onDefine('window.jQuery && $(".<%= graphicType %>-graphic.<%= graphicName %>").length', function() {

	var masterSelector = '.<%= graphicType %>-graphic.<%= graphicName %>';
	var master = $(masterSelector);
<% if (graphicType === 'igraphic') { %>
	var hed = $('.hed', master);
	if (hed.length) {
		$('.header .main-hed').html(hed.html());
	}

	var subhed = $('.subhed', master);
	if (subhed.length) {
		$('.header .subhed').html(subhed.html());
	}

	$('.header').addClass('visible');
<% } %><% if (fullScreenOnMobile) { %>
	var mobileHeader = require('../../../common/js/GlobeMobileHeader.js');

	if (Modernizr.touch) {
		mobileHeader({
			bodyElements: $('.content', master),
			drawerElements: $('.<%= graphicType %>-graphic.<%= graphicName %> .source-and-credit, .header .subhed')
		});
	}
<% } %>

	require('./main.js');

}); }());