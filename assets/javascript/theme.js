;(function ($, w) {
	'use strict';
	if (!w.jQuery) {
		throw 'IdeaApp: jQuery not found';
	}
	w.IdeaTheme = {

		init: function () {
			IdeaTheme.navigationMenu.init();
			IdeaTheme.cart.init();
			this.eventListener();
			this.afterInit();
		},

		afterInit: function () {
			this.cart.updateCartContainer();
			this.initLazyLoad();
			if (this[IdeaApp.helpers.getRouteGroup()] !== undefined) {
				this[IdeaApp.helpers.getRouteGroup()].init();
			}
			this.login.init();
			this.bannerTitle();
			//this.countDown.init();
			this.entrySlider('#entry-slider');
			this.initSlider('.featured-products .products-content');
			this.initSlider('.popular-products .products-content');
			this.headerFixed();
			if (IdeaApp.helpers.matchMedia('(min-width: 992px)')) {
				this.showcaseImageSlider('.showcase');
			}
		},
		
		headerFixed: function() {
			var barHeight = $('.idea-promotion-bar.bar-position-top').outerHeight() || 0;
			var headerHeight = $('.header-top').outerHeight() + $('.header-slogan').outerHeight();
			this.stickyOffset = barHeight + headerHeight;
			if($(window).scrollTop() > this.stickyOffset) {
				$('body').addClass('sticked');
			} else {
				$('body').removeClass('sticked');
			}
		},

		showcaseImageSlider: function(element) {
			$(element).each(function(){
				var thumbs = $(this).find('.showcase-thumbs-image a'),
					thumbsLength = thumbs.length,
					thumbsWidth = 100 / thumbsLength;
				$(this).find('.showcase-thumbs-image a').css('width',''+thumbsWidth+'%');
				$('.showcase-image-dots button:first-child').addClass('active');
				thumbs.on('mouseenter',function() {
					var imageData = $(this).data('thumb'),
						thumbsIndex = $(this).index();
					$(this).parents('.showcase-image').find('.showcase-image-dots button').eq(thumbsIndex).addClass('active').siblings().removeClass('active');
					$(this).parents('.showcase-image').find('.showcase-image-item img').attr('src',imageData);
					$(this).parents('.showcase-image').find('.showcase-image-item img').attr('data-src',imageData);
				});
				$(this).on('mouseleave', function(){
					var showcaseImageFirst = thumbs.eq(0).attr('data-thumb');
					$(this).find('.showcase-image-item a img').attr('src', showcaseImageFirst);
				});
			});
		},

		initLazyLoad: function () {
			if (typeof lazyload != 'function') {
				return;
			}
			if ($('.tabbed-midblocks-container').length > 0) {
				$( document ).ajaxComplete(function( event, xhr, settings ) {
					if(settings.url == '/tabli-vitrin'){
						lazyload();
					}
				});
			} else {
				lazyload();
			}
		},

		entrySlider: function (element) {
			if ($(element).length == 0) {
				return;
			}
			$(element).not('.slick-initialized').slick({
				slidesToShow: 1,
				slidesToScroll: 1,
                infinite: false,
                autoplay : false,
                autoplaySpeed : 6000,
                arrows : false,
				dots: true,
				swipe: true,
				customPaging: function(slider, i) {
					var thumb = $(slider.$slides[i]).attr('data-thumb');
					return '<img src="'+thumb+'" >';
				},
                speed : 300,
                fade : true,
                prevArrow : '<button type="button" class="slick-prev" aria-label="Previous"><i class="fas fa-chevron-left"></i></button>',
				nextArrow : '<button type="button" class="slick-next" aria-label="Next"><i class="fas fa-chevron-right"></i></button>',
				responsive: [
					{
						breakpoint: 991,
						settings: {
							dots: true,
							swipe: true
						}
					}
				]
			});
			$(element).on('afterChange', function(event, slick, currentSlide) {
				if((slick.$slides.length - slick.options.slidesToShow) <= currentSlide) {
					$(element).slick('slickGoTo', 0);
				}
			});
		},

		initSlider: function (element) {
			if ($(element).length == 0) {
				return;
			}
			$(element).slick({
				autoplay: false,
				autoplaySpeed: 6000,
				arrows: true,
				infinite: false,
				speed: 300,
				slidesToShow: 5,
				slidesToScroll: 5,
				prevArrow: '<button type="button" class="slick-prev" aria-label="Previous"><i class="fas fa-angle-left"></i></button>',
				nextArrow: '<button type="button" class="slick-next" aria-label="Next"><i class="fas fa-angle-right"></i></button>',
				responsive: [
					{
						breakpoint: 991,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3,
							dots: true,
							arrows: false
						}
					},
					{
						breakpoint: 767,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2,
							dots: true,
							arrows: false
						}
					},
					{
						breakpoint: 575,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2,
							dots: true,
							arrows: false
						}
					}
				]
			});
			$(element).on('afterChange', function(event, slick, currentSlide) {
				if((slick.$slides.length - slick.options.slidesToShow) <= currentSlide) {
					$(element).slick('slickGoTo', 0);
				}
			});
		},

		productInitSlider: function (element) {
			if ($(element).length == 0) {
				return;
			}
			$(element).slick({
				autoplay: false,
				autoplaySpeed: 6000,
				arrows: true,
				infinite: false,
				speed: 300,
				slidesToShow: 4,
				slidesToScroll: 4,
				prevArrow: '<button type="button" class="slick-prev" aria-label="Previous"><i class="fas fa-angle-left"></i></button>',
				nextArrow: '<button type="button" class="slick-next" aria-label="Next"><i class="fas fa-angle-right"></i></button>',
				responsive: [
					{
						breakpoint: 991,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3,
							dots: true,
							arrows: false
						}
					},
					{
						breakpoint: 767,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3,
							dots: true,
							arrows: false
						}
					},
					{
						breakpoint: 575,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2,
							dots: true,
							arrows: false
						}
					}
				]
			});
			$(element).on('afterChange', function(event, slick, currentSlide) {
				if((slick.$slides.length - slick.options.slidesToShow) <= currentSlide) {
					$(element).slick('slickGoTo', 0);
				}
			});
		},
		
		bannerTitle: function() {
			$('[data-selector="banner-title"] .banner').each(function() {
				if($(this).find('.banner-title-img').length > 0) {
					return;
				}
				var elementImg = $(this).find('img');
				elementImg.wrap('<div class="banner-title-img"></div>');
				elementImg.parent().after('<div class="banner-title-text">'+ elementImg.attr('alt') +'</div>');
			});
		},

		scrollTop: function () {
			$("html, body").animate({scrollTop: 0}, 400);
		},

		scrollToggle: function (element) {
			if (element.scrollTop() > 200) {
				$("#scroll-top").stop().fadeIn();
			} else {
				$("#scroll-top").stop().fadeOut();
			}
		},
		
		login: {
			init: function () {
				this.eventListener();
				this.validateLoginForm();
			},

			validateLoginForm: function () {
				var form = '[data-selector="login-panel"]';
				$(form).validate({
					errorElement: "div",
					validClass: 'validate',
					errorClass: 'validate-error',
					rules: {
						email: {
							required: true,
							email: true,
							maxlength: 255
						},
						pass: {
							required: true,
							minlength: 2,
							maxlength: 255
						},
					},
					messages: {
						email: {
							required: "Lüften " + IdeaApp.helpers.getFormValidateMessage(form + ' input[name="email"]', 'placeholder') + " giriniz.",
							email: "" + IdeaApp.helpers.getFormValidateMessage(form + ' input[name="email"]', 'placeholder') + " uygun formatta olmalıdır.",
							maxlength: "" + IdeaApp.helpers.getFormValidateMessage(form + ' input[name="email"]', 'placeholder') + " en fazla 255 karakter olmalıdır."
						},
						pass: {
							required: "Lütfen " + IdeaApp.helpers.getFormValidateMessage(form + ' input[name="pass"]', 'placeholder') + " giriniz.",
							minlength: "" + IdeaApp.helpers.getFormValidateMessage(form + ' input[name="pass"]', 'placeholder') + " en az 2 karakter olmalıdır.",
							maxlength: "" + IdeaApp.helpers.getFormValidateMessage(form + ' input[name="pass"]', 'placeholder') + " en fazla 255 karakter olmalıdır."
						}
					},
					errorPlacement: function (error, element) {
						element.parents('.user-menu-input').append(error);
					}
				});

				$.validator.addMethod('email', function (email) {
					return IdeaApp.helpers.checkEmail(email);
				});
			},

			eventListener: function () {
				$(document).on('click', '[data-selector="login-panel-button"]', function () {
					var memberLoginForm = $('[data-selector="login-panel"]');
					if (memberLoginForm.valid()) {
						$(this).addClass('btn-loading');
					}
				});
			}
		},

		cart: {
			init: function () {
				this.updateCartContainer();
				this.overrideListeners();
			},

			updateCartContainer: function () {
				this.cartContent();
				$('[data-selector="cart-item-count"]').html(IdeaCart.itemCount);
				$('[data-selector="cart-total-price"]').html(IdeaApp.helpers.formatMoney(IdeaCart.totalPrice) + ' ' + mainCurrency);
			},
			
			cartItemDelete: function(element) {
				IdeaCart.deleteItem(element, element.attr('data-id'));
			},
			
			cartContent: function () {
				var items = IdeaCart.items;
				if (items.length > 0) {
					var output = '<div class="cart-content-title">ALIŞVERİŞ SEPETİ</div>';
					output += '<div class="cart-content-subtitle">Sepetinizde ' + IdeaCart.itemCount + ' ürün var.</div>';
					output += '<div class="cart-list">';
					for (var i = 0; i < items.length; i++) {
						output += '<div class="cart-list-item">';
						if (items[i].product.imageUrl == "") {
							output += '<div class="cart-list-item-image"><span class="cart-nopicture"></span></div>';
						} else {
							output += '<div class="cart-list-item-image"><img src="' + items[i].product.imageUrl + '"></div>';
						}
						output += '<div class="cart-list-item-content">';
						output += '<a class="cart-list-item-title" href="' + items[i].product.url + '">' + items[i].product.fullName + '</a>';
						if(items[i].product.brandName !== null) {
							output += '<a class="cart-list-item-brand" href="' + items[i].product.brandUrl + '">' + items[i].product.brandName + '</a>';
						}
						output += '<div class="cart-list-item-price"><span class="cart-list-item-amount">' + items[i].quantity + ' ' + items[i].product.stockType + ' - </span>' + IdeaApp.helpers.formatMoney(items[i].price) + ' ' + mainCurrency + '</div>';
						output += '</div>';
						output += '<a href="javascript:void(0);" class="cart-list-item-delete" data-product-id="' + items[i].product.id + '" data-id="' + items[i].id + '" data-selector="cart-item-delete"><i class="far fa-trash-alt"></i></a>';
						output += '</div>';
					}
					output += '</div>';
					output += '<div class="cart-content-total-price"><span>Sepet Toplamı</span><div>' + IdeaApp.helpers.formatMoney(IdeaCart.totalPrice) + ' ' + mainCurrency + '</div></div>';
					output += '<div class="cart-content-button"><a href="/sepet" class="btn btn-primary btn-block">SATIN AL</a></div>';
					output += '<div class="cart-content-button"><a href="javascript:void(0);" class="btn btn-block btn-secondary" data-selector="openbox-close">ALIŞVERİŞE DEVAM ET</a></div>';
				} else {
					var output = '<div class="cart-content-empty">';
					output += '<div class="cart-content-title">ALIŞVERİŞ SEPETİ</div>';
					output += '<div class="cart-content-subtitle">Sepetiniz boş</div>';
					output += '<div class="cart-content-empty-icon"><img src="{{ themeAsset('images/icon-cart.svg') }}" /></div>';
					output += '<div class="cart-content-button"><a href="javascript:void(0);" class="btn btn-primary btn-block" data-selector="openbox-close">ALIŞVERİŞE BAŞLA</a></div>';
					output += '</div>';
				}
				$('[data-selector="cart-content"]').html(output);
			},
					
			showCartButtons: function (productId) {
				$('[data-selector="add-to-cart"][data-product-id="' + productId + '"]').each(function () {
					var context = $(this).attr('data-context');
					if (context == 'quick') {
						$(this).attr('href', 'javascript:void(0);').removeAttr('data-disabled');
					} else {
						IdeaApp.helpers.enableElement($(this));
						if (context == 'detail') {
							$(this).html('SEPETE EKLE').addClass('add-to-cart-button').removeClass('no-stock-button');
							$('.quick-order-button').parent().show();
						}
					}
				});
			},

			hideCartButtons: function (productId) {
				$('[data-selector="add-to-cart"][data-product-id="' + productId + '"]').each(function () {
					var context = $(this).attr('data-context');
					if (context == 'quick') {
						$(this).attr('href', '/sepet').attr('data-disabled', 'true');
					} else {
						IdeaApp.helpers.disableElement($(this));
						if (context == 'detail') {
							$(this).html('ÜRÜN SEPETİNİZDE').removeClass('add-to-cart-button').addClass('no-stock-button');
							$('.quick-order-button').parent().hide();
						}
					}
				});
			},

			overrideListeners: function () {
				var self = this;
				IdeaCart.listeners.prePersist = function (element) {
					element.addClass('btn-loading');
				};

				IdeaCart.listeners.postPersist = function (element, response) {
					element.removeClass('btn-loading');
					if (!response.success) {
						return;
					}
					self.updateCartContainer();
					if (IdeaCart.validContextList.indexOf(element.attr('data-context')) !== -1) {
						if (response.item.product.stockAmount <= IdeaCart.helpers.getItemTotalQuantity(response.item.product.id)) {
							self.hideCartButtons(response.item.product.id);
						}
						$("body").append('<div class="shopping-information-cart"><div class="shopping-information-cart-inside"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle cx="26" cy="26" r="25" fill="none"/><path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>Sepetinize Eklenmiştir</div></div>');
						setTimeout(function(){
							$('.shopping-information-cart').fadeOut(200).remove();
						},2000);
					}
				};
				IdeaCart.listeners.postUpdate = function (element, response) {
					if (!response.success) {
						return;
					}
					if (response.item.product.stockAmount <= IdeaCart.helpers.getItemTotalQuantity(response.item.product.id)) {
						self.hideCartButtons(response.item.product.id);
					} else {
						self.showCartButtons(response.item.product.id);
					}
					self.updateCartContainer();
				};

				IdeaCart.listeners.preRemove = function (element) {
					element.addClass('btn-loading');
				};

				IdeaCart.listeners.postRemove = function (element, response) {
					element.removeClass('btn-loading');
					if (!response.success) {
						return;
					}
					self.showCartButtons(element.attr('data-product-id'));
					self.updateCartContainer();
				};

IdeaCart.listeners.postFlush = function (element, response) {
                                element.removeClass('btn-loading');
                                if (!response.success) {
                                    return;
                                }
                                self.showCartButtons(element.attr('data-product-id'));
                                self.updateCartContainer();
                                };
			}
		},
		
		footerMenu: function(element) {
			var parentElement = element.parent();
			var containerElement = element.parents('.footer-menu-container');
			if(parentElement.hasClass('active')) {
				containerElement.find('.footer-menu').removeClass('active');
				parentElement.removeClass('active');
			} else {
				containerElement.find('.footer-menu').removeClass('active');
				parentElement.addClass('active');
			}
		},

		eventListener: function () {
			var self = this;
			$(document).on('click', '#scroll-top', function () {
				self.scrollTop();
			});
			$(window).scroll(function () {
				self.scrollToggle($(this));
				self.headerFixed();
			});
			$(document).on('click tap', '[data-selector="cart-item-delete"]', function() {
				self.cart.cartItemDelete($(this))
			});
			$(document).on('click tap', '[data-selector="openbox-close"]', function() {
				openBox.reset();
			});
			$(document).on('click tap', '[data-menu-type="accordion"] .footer-menu-title', function() {
				self.footerMenu($(this));
			});
		}
	}
})(jQuery, window);
$(function () {
	IdeaTheme.init();
});