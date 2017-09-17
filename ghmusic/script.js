$(function () {

	var setLanguage = function (event, langId) {
		var li = event ? $(event.target).closest('[data-set-lang]') : null,
			langId = li ? li.data('set-lang') || 'invalid' : langId;
		$('.selected').removeClass('selected');
		(li || $('[data-set-lang=' + langId + ']')).addClass('selected');
		$('body').attr('data-lang', langId);
		try {
			localStorage.setItem('lang', langId);
		} catch (error) {
		}
	};

	var ignoreHashChange = false;

	var setPage = function (event, pageId) {
		var pageId = pageId || $(event.target).closest('.set-page').data('pageId') || 'invalid',
			headerBtm = $("header").height(),
			currentPos = Math.max($('html').scrollTop(), $('body').scrollTop());

		$('.active').removeClass('active');
		$('[data-page-id=' + pageId + ']').addClass('active');
		ignoreHashChange = true;
		window.location.hash = '#' + pageId;
		setTimeout(function () {
			ignoreHashChange = false;
		}, 200);
		if (currentPos > headerBtm) {
			$("html, body").animate({ scrollTop: headerBtm }, "slow");
		}
	};

	var setPageFromHash = function () {
		if (!ignoreHashChange) {
			var hash = window.location.hash.replace("#", "") || "home";
			hash && $('.page[data-page-id=' + hash + ']').length && setPage(null, hash);
		}
	}

	// Check the initial position of the Sticky Header
	var stickyHeaderTop = $('#menu').offset().top;

	var setStickyMenu = function () {
		if ($(window).scrollTop() > stickyHeaderTop) {
			$('#menu').css({ position: 'fixed', top: '0px' });
			$('#menu-alias').css('display', 'block');
			$('#menu-alias').css('height', $('#menu').height());
		} else {
			$('#menu').css({ position: 'static', top: '0px' });
			$('#menu-alias').css('display', 'none');
		}
	}

	setPageFromHash();
	setStickyMenu();

	try {
		var storedLang = localStorage.getItem('lang');
	} catch (error) {
		storedLang = null;
	}
	storedLang && ['nl', 'en'].indexOf(storedLang) > -1 && setLanguage(null, storedLang);

	$('.set-page[data-page-id]').click(setPage);
	$('[data-set-lang]').click(setLanguage);
	$(window).on('hashchange', setPageFromHash);
	$(window).scroll(setStickyMenu);
});
