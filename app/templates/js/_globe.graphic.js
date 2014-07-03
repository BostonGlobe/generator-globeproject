globe.graphic = function() {
	<% if (includeMobileTemplate) { %>
	// if we're on touch, add the mobile template
	if (Modernizr.touch) {
		globe.graphicMobile($('#gf .content'), $('#gf .subtitle, #gf .source-and-credit'));
	}
	<% } %>
	// place your code here

};
