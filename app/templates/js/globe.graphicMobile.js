globe.graphicMobile = function(bodyElements, drawerElements) {

	$('#gf').prepend(window.JST['mobile.template']({hed: $('.main-hed').html()}));

	if (drawerElements) {
		$(drawerElements).appendTo('#gf .mobile-drawer');
	} else {
		$('#gf > .subtitle').appendTo('#gf .mobile-drawer');
		$('#gf .source-and-credit').appendTo('#gf .mobile-drawer');
	}

	$(bodyElements).appendTo('#gf .mobile-body');

	$('#gf .mobile-header .navicon').click(function(e) {

		// is the drawer collapsed?
		if (!$(this).hasClass('minus')) {

			// the header has a black bottom border
			// immediately make the border transparent
			$('#gf .mobile-header').addClass('expanded');

		} else {

			// the drawer is expanded
			// the header has a white bottom border
			// wait until the drawer has collapsed,
			// then make the border transparent
			$('#gf .mobile-header .navicon').bind('transitionend oTransitionEnd webkitTransitionEnd', function(e) {

				$('#gf .mobile-header').removeClass('expanded');
				$('#gf .mobile-header .navicon').unbind();

			});

		}

		$('#gf .mobile-drawer').toggleClass('expanded');
		$(this).toggleClass('minus');

	});

};