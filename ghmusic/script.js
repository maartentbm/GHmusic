window.onload = function () {

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
	}

	try {
		var storedLang = localStorage.getItem('lang');
	} catch (error) {
		storedLang = null;
	}
	storedLang && ['nl', 'en'].indexOf(storedLang) > -1 && setLanguage(null, storedLang);

	$('.set-page[data-page-id]').click(function (event) {
		var pageId = $(event.target).closest('.set-page').data('pageId') || 'invalid';
		$('.active').removeClass('active');
		$('[data-page-id=' + pageId + ']').addClass('active');
	});
	$('[data-set-lang]').click(setLanguage);

};
