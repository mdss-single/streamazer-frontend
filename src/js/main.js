(function($){
	"use strict";

	$('.header__lang').click(function(e) {
		e.preventDefault();
		e.stopPropagation();
		$(this).toggleClass('header__lang--active');
		$(this).find('.header__lang-list').toggleClass('header__lang-list--active');
	});
	$('.header__lang-list').click(function(e) {
		e.stopPropagation();
	})

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
			$('.js-pricing-home').flickity({
				cellSelector: '.pricing__item',
				cellAlign: 'left',
				pageDots: false
			});
		} else {
			$('body').swipe('destroy');
			$('.header__stars').addClass('header__stars--animate');
			if ($('.flickity-enabled').length) $('.js-pricing-home').flickity('destroy');
		}
	});

	$('.js-pricing').flickity({
		cellSelector: '.pricing__item',
		cellAlign: 'left',
		pageDots: false
	});

	if ($(window).width() < 768) {
		$('.js-about-us').each(function() {
			var showChar = $(this).data('symbols');
			var content = $(this).html();
			if(content.length > showChar) {
				var c = content.substr(0, showChar);
				var h = content.substr(showChar, content.length - showChar);
	 			var html = c + '<a href="#" class="about-us__more"><span class="about-us__more--underline">Читать полностью</span></a>' + '<div class="about-us__added about-us__hidden">' + h + '</div>';
	 			$(this).html(html);
			}
	 	});
	 	$('.about-us__more').click(function(e){
			e.preventDefault();
			$(this).hide();
			$(this).next().removeClass('about-us__hidden');
		});
	}

	$('.js-scrollto').click(function(e) {
		e.preventDefault();
		var thisHref = $(this).attr('href');
		$('html, body').animate({
			scrollTop: $(thisHref).offset().top
		}, 500);
	});

	$('.js-faq-item').click(function() {
		$(this).closest('.faq__item').toggleClass('faq__item--active').siblings().removeClass('faq__item--active');

	});

	$('.header').dblclick(function() {
		$('.header__stars').addClass('pushing');
		setTimeout(function() {
			$('.header__stars').removeClass('pushing');
		}, 2000);
	});

	function closeAll() {
		$('.header__lang-list--active').removeClass('header__lang-list--active');
	}
	$(document).click(function() {
		closeAll();
	});

})(jQuery);