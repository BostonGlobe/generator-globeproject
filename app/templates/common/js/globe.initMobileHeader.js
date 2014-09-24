globe.initMobileHeader = function(options) {

	var master = $('.igraphic-graphic');

	master.prepend(window.JST['mobile.template']({hed: $('.main-hed').html()}));

	options.drawerElements.appendTo('.mobile-drawer', master);
	options.bodyElements.appendTo('.mobile-body', master);

	master.attr('data-drawer', 'expanded');

	function collapseDrawer() {

		// the header has a white bottom border
		// wait until the drawer has collapsed,
		// then make the border transparent
		$('.mobile-header .navicon', master).bind('transitionend oTransitionEnd webkitTransitionEnd', function(e) {

			$('.mobile-header', master).removeClass('expanded'); // make bottom border black
			$('.mobile-header .navicon', master).unbind();
		});

		$('.mobile-drawer', master).removeClass('expanded'); // translate drawer up
		$('.mobile-header .navicon', master).removeClass('minus'); // animate minus to 3 lines

		master.attr('data-drawer', 'collapsed');
	}

	function expandDrawer() {

		// notice we make border transparent immediately,
		// and after the navicon is done transitioning, again
		// this is to cover the edge case of clicking collapse-expand
		// without waiting for collapse to finish

		// the header has a black bottom border
		// immediately make the border transparent
		$('.mobile-header .navicon', master).bind('transitionend oTransitionEnd webkitTransitionEnd', function(e) {

			$('.mobile-header', master).addClass('expanded'); // make bottom border transparent
			$('.mobile-header .navicon', master).unbind();
		});

		$('.mobile-header', master).addClass('expanded'); // make bottom border transparent
		$('.mobile-drawer', master).addClass('expanded'); // translate drawer down
		$('.mobile-header .navicon', master).addClass('minus'); // animate 3 lines to minus

		master.attr('data-drawer', 'expanded');
	}

	function toggleDrawer() {

		if (master.attr('data-drawer') === 'expanded') {
			collapseDrawer();
		} else {
			expandDrawer();
		}
	}

	$(master).on('click', '.mobile-header .navicon', toggleDrawer);

	if (navigator.userAgent.match(/iPad;.*CPU.*OS 7_\d/i)) {
		$('html').addClass('ipad ios7');
	}

	return {
		expandDrawer: expandDrawer,
		collapseDrawer: collapseDrawer
	};

};