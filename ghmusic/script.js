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

	var setPage = function (event, pageId) {
		var pageId = pageId || $(event.target).closest('.set-page').data('pageId') || 'invalid',
			menuTop = $("#menu").offset().top,
			currentPos = Math.max($('html').scrollTop(), $('body').scrollTop());

		$('.active').removeClass('active');
		$('[data-page-id=' + pageId + ']').addClass('active');
		window.location.hash = '#' + pageId;
		if (currentPos > menuTop) {
			$("html, body").animate({ scrollTop: menuTop }, "slow");
		}
	};

	var hash = window.location.hash.replace("#", "");
	hash && $('.page[data-page-id=' + hash + ']').length && setPage(null, hash);

	try {
		var storedLang = localStorage.getItem('lang');
	} catch (error) {
		storedLang = null;
	}
	storedLang && ['nl', 'en'].indexOf(storedLang) > -1 && setLanguage(null, storedLang);

	$('.set-page[data-page-id]').click(setPage);
	$('[data-set-lang]').click(setLanguage);
});
