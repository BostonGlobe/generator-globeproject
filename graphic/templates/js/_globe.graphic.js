globe.graphic = globe.graphic || {};
globe.graphic.<%= graphicName %> = function() {

	var master = $('.gf.<%= graphicName %>');

	$('.blank', master).html(window.JST['blank.template']());
	
};
