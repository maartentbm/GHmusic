window.onload = function() {
	$('#menu li[data-page-id]').click(function (event) {
		var pageId = $(event.target).closest('li').data('pageId') || 'invalid';
		$('.active').removeClass('active');
		$('[data-page-id=' + pageId + ']').addClass('active');
	});
	$('#menu li[data-set-lang]').click(function (event) {
		var li = $(event.target).closest('li'),
			langId = li.data('set-lang') || 'invalid';
		$('.selected').removeClass('selected');
		li.addClass('selected');
		$('body').attr('data-lang', langId);
	});
};
