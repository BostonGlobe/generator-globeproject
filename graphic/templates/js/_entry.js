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
<% } %>

	require('./main.js');

}); }());