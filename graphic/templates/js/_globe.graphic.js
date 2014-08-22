(function() { globe.onDefine('window.jQuery && $(".gf.<%= graphicName %>").length', function() {

	var master = $('.gf.<%= graphicName %>');

	$('.blank', master).html(window.JST['blank.template']());

}); }());