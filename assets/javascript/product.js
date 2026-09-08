;(function ($, w) {
	'use strict';
	if (!w.jQuery) {
		throw 'IdeaApp: jQuery not found';
	}
	w.IdeaTheme.product = {

		init: function () {
			this.eventListener();
			this.thumbImagesCarousel();
			this.zoom.init();
			this.afterInit();
		},

		afterInit: function () {
			IdeaApp.product.productTab('.product-detail-tab', function () {
			}, function () {
				if (IdeaApp.helpers.matchMedia('(max-width: 991px)')) {
					$('body, html').scrollTop($(this).offset().top - 10);
				}
			});
			IdeaTheme.productInitSlider('.similar-products .products-content');
			IdeaTheme.productInitSlider('.offered-products .products-content');
			IdeaTheme.initLazyLoad();
		},

		thumbImagesCarousel: function () {
			$('#product-thumb-image').slick({
				vertical: true,
				verticalSwiping: true,
				autoplay: false,
				arrows: false,
				infinite: false,
				speed: 300,
				slidesToShow: 4,
				slidesToScroll: 4,
				prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-angle-up"></i></button>',
				nextArrow: '<button type="button" class="slick-next"><i class="fas fa-angle-down"></i></button>',
				responsive: [
					{
						breakpoint: 767,
						settings: {
							vertical: false,
							verticalSwiping: false,
							arrows: false
						}
					}
				]
			});
		},

		zoom: {
			config: {
				gallery: 'product-thumb-image',
				responsive: true,
				zoomType: "inner",
				borderSize: 0,
				cursor: 'crosshair',
				onZoomedImageLoaded: function () {
					$('#primary-image').unbind('touchmove mousewheel');
					if($('#product-thumb-image .thumb-item a.zoomGalleryActive').length < 1) {
						$('#product-thumb-image .thumb-item:first-child a').addClass('zoomGalleryActive');
					}
				}
			},
			init: function() {
				$('.zoomContainer').remove();
				$('#primary-image').elevateZoom(this.config);
				this.eventListener();
			},
			eventListener: function() {
				var self = this;
				$('#primary-image').on('click tap', function () {
					$.fancybox.open($(this).data('elevateZoom').getGalleryList(), {
						i18n: {
							en: {
								SHARE: "Ürünü Paylaş"
							}
						}
					});
					return false;
				});
				$('#product-thumb-image .thumb-item a').on('click tap', function() {
					var image = $('#primary-image');
					$('.zoomContainer').remove();
					image.removeData('elevateZoom').attr('src', $(this).data('image')).data('zoom-image', $(this).data('zoom-image')).elevateZoom(IdeaTheme.product.zoom.config);
				});
			}
		},

		eventListener: function () {
			var self = this;
		}
	}
})(jQuery, window);