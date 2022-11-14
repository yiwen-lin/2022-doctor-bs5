; (function ($) {
	$.fn.tabs = function (options) {

		var defaults = {
		}

		if (this.length == 0) return this;

		// support mutltiple elements
		if (this.length > 1) {
			this.each(function () { $(this).tabs(options) });
			return this;
		}

		var el = this;

		var tabs = {};

		var init = function () {
			tabs.settings = $.extend({}, defaults, options);
			if ($(el).children('[data-id="js-tab"]').hasClass('active')) {
				var active = $(el).children('.active').data('tab-target-id');
				$('[data-tab-id="' + active + '"]').fadeIn(300).siblings().hide();
			} else {
				$(el).children('[data-id="js-tab"]').eq(0).addClass('active');
				var active = $(el).children('[data-id="js-tab"]').eq(0).data('tab-target-id');
				$('[data-tab-id="' + active + '"]').fadeIn(300).siblings().hide();
			}
		};

		var start = function () {
			init();
			$(el).children('[data-id="js-tab"]').on('click', function (e) {
                e.preventDefault();
				$(this).addClass('active').siblings().removeClass('active');
				var active = $(el).children('.active').data('tab-target-id');
				$('[data-tab-id="' + active + '"]').fadeIn(300).siblings().hide();
			});
		};

		start();
		return this
	};
})(jQuery);