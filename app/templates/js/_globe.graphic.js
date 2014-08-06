globe.graphic = function() {
	<% if (includeMobileTemplate) { %>
	// if we're on touch, add the mobile template
	if (Modernizr.touch) {
		globe.graphicMobile($('#gf .content'), $('#gf .subtitle, #gf .source-and-credit'));

		if (navigator.userAgent.match(/iPad;.*CPU.*OS 7_\d/i)) {
			$('html').addClass('ipad ios7');
		}
	}
	<% } %>
	// place your code here

};
