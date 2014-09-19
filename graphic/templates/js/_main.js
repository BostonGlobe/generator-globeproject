(function() { globe.onDefine('window.jQuery && $(".<%= graphicType %>-graphic.<%= graphicName %>").length', function() {
<% if (fullScreenOnMobile) { %>
	var masterSelector = '.<%= graphicType %>-graphic.<%= graphicName %>';
	var master = $(masterSelector);

	if (Modernizr.touch) {
		globe.initMobileHeader({
			bodyElements: $('.content', master),
			drawerElements: $('.<%= graphicType %>-graphic.<%= graphicName %> .source-and-credit, .header .subhed')
		});
	}
<% } else { %>
	var master = $('.<%= graphicType %>-graphic.<%= graphicName %>');
<% } %>
}); }());