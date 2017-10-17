(function($){
	"use strict";

	$('.header__lang').click(function() {
		$(this).find('.header__lang-list').toggleClass('header__lang-list--active');
	});

	// mobile menu
	$(window).on('load resize', function() {
		if ($(window).width() < 1200) {
			var menu = $('.menu');
			$('.js-menu-link').click(function(e) {
				$(menu).addClass('menu--active');
				if (!$('.menu__cover').length) $('body').prepend('<div class="menu__cover"></div>');
				$('html').css('overflow','hidden');
				e.preventDefault();
			});
			$('body').on('click', '.menu__cover, .menu__close', function(e) {
				e.preventDefault();
				$(menu).removeClass('menu--active');
				$('.menu__cover').remove();
				$('html').css('overflow','auto');
			});
			$('body').swipe({
				swipeLeft:function() {
					$(menu).addClass('menu--active');
					if (!$('.menu__cover').length) $('body').prepend('<div class="menu__cover"></div>');
					$('html').css('overflow','hidden');
				},
				threshold:40,
				excludedElements:$.fn.swipe.defaults.excludedElements+', .js-pricing',
				preventDefaultEvents: false,
			});
			$('.menu').swipe({
				swipeRight:function() {
					$(menu).removeClass('menu--active');
					$('.menu__cover').remove();
					$('html').css('overflow','auto');
				},
				threshold:40,
			});
			$('.header__stars--animate').removeClass('header__stars--animate');
		} else {
			$('body').swipe('destroy');
			$('.header__stars').addClass('header__stars--animate');
		}
	});

	$('.js-pricing').flickity({
		cellSelector: '.pricing__item',
		pageDots: false
	});

	$('.js-about-us').each(function() {
		var showChar = 310;
		var content = $(this).html();
		if(content.length > showChar) {
			var c = content.substr(0, showChar);
			var h = content.substr(showChar, content.length - showChar);
 			var html = c + '<a href="#" class="about-us__more"><span class="about-us__more--underline">Читать полностью</span></a>' + '<div class="about-us__hidden">' + h + '</div>';
 			$(this).html(html);
		}
 	});
 	$('.about-us__more').click(function(e){
 		e.preventDefault();
		$(this).hide();
		$(this).next().removeClass('about-us__hidden');
	});

	$('.rocket').click(function(e) {
		e.preventDefault();
		$('.header__stars').addClass('pushing');
		setTimeout(function() {
			$('.header__stars').removeClass('pushing');
		}, 2000);
	});

	console.log('%c Верстка: mdss@makexhtml.ru ', 'color:#fff;font-size:1.2rem;background-color:#3469c6;')

})(jQuery);