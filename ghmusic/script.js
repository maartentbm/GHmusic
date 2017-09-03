window.onload = function() {
	$('.set-page[data-page-id]').click(function (event) {
		var pageId = $(event.target).closest('.set-page').data('pageId') || 'invalid';
		$('.active').removeClass('active');
		$('[data-page-id=' + pageId + ']').addClass('active');
	});
	$('[data-set-lang]').click(function (event) {
		var li = $(event.target).closest('[data-set-lang]'),
			langId = li.data('set-lang') || 'invalid';
		$('.selected').removeClass('selected');
		li.addClass('selected');
		$('body').attr('data-lang', langId);
	});
};
