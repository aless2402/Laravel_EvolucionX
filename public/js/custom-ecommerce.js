(function() {
    "use strict";
    var app = {
        init: function() {
            this.setUpListeners();
            this.ajaxAddToCart();
            this.ajaxWishlistCount();
            this.wooButtons()
        },
        setUpListeners: function() {
            jQuery(".single-product .entry-summary .woocommerce-review-link").on("click", this.singleProductToReviews);
            jQuery("#ship-to-different-address-checkbox").on("click", this.shipToDifferentAddressToggle);
            jQuery(".st-payment-method input").on("change", this.paymentMethodToggle);
            jQuery(".sidebar-cat-item-has-child > a").on("click", this.sidebarCatItemToggle)
        },
        singleProductToReviews: function(e) {
            e.preventDefault();
            var tabs = jQuery(".single-product .woocommerce-tabs")
              , header = jQuery(".header-fixed");
            if (tabs && header) {
                jQuery("html, body").animate({
                    scrollTop: tabs.offset().top - header.outerHeight() - 20
                }, 600)
            }
        },
        sidebarCatItemToggle: function(e) {
            e.originalEvent.preventDefault();
            var item = jQuery(this).parent()
              , ul = item.find("> ul");
            item.toggleClass("open");
            ul.slideToggle()
        },
        shipToDifferentAddressToggle: function() {
            var sa = jQuery(".shipping_address");
            if (jQuery("#ship-to-different-address-checkbox:checked").length === 1) {
                sa.slideDown()
            } else {
                sa.slideUp()
            }
        },
        paymentMethodToggle: function() {
            var _this = jQuery(this)
              , item = _this.closest("li")
              , desc = item.find(".payment-method-desc")
              , delay = 250;
            item.siblings().find(".payment-method-desc").slideUp(delay);
            desc.slideDown(delay)
        },
        carusels: function() {
            jQuery('.product-carusel-main').flickity({
                pageDots: !1,
                lazyLoad: !0,
                cellSelector: '.pcm-item',
                prevNextButtons: !1
            });
            jQuery('.product-carusel-thumb').flickity({
                asNavFor: '.product-carusel-main',
                lazyLoad: 4,
                prevNextButtons: !1,
                cellAlign: 'left',
                contain: !0,
                pageDots: !1
            })
        },
        ajaxAddToCart: function() {
            var side = jQuery(".side-cart");
            if (!side.length) {
                return
            }
            jQuery('body').on('added_to_cart', function() {
                if (!side.hasClass('open')) {
                    side.addClass('open');
                    jQuery(".mf-bg").addClass("visible side-visible")
                }
            })
        },
        ajaxWishlistCount: function() {
            jQuery(document).on('added_to_wishlist removed_from_wishlist', function() {
                var counter = jQuery('.header-wishlist .count');
                jQuery.ajax({
                    url: yith_wcwl_l10n.ajax_url,
                    data: {
                        action: 'yith_wcwl_update_wishlist_count'
                    },
                    dataType: 'json',
                    success: function(data) {
                        counter.html(data.count)
                    },
                })
            });
            jQuery('body').on('woosw_change_count', function(e, count) {
                var counter = jQuery('.header-wishlist .count');
                counter.html(count)
            })
        },
        wooSelects: function() {
            var select = jQuery(".woocommerce select");
            jQuery.each(select, function() {
                var _this = jQuery(this);
                if (!_this.parent().hasClass("select")) {
                    _this.wrap('<div class="select"></div>')
                }
            });
            app.btnHover()
        },
        wooButtons: function() {
            var btns = jQuery(".woocommerce .button");
            jQuery.each(btns, function() {
                var _this = jQuery(this)
                  , val = _this.text();
                _this.empty().append('<span>' + val + '</span><span class="el-ripple-circle"></span>').removeClass("button").addClass("btn woo-btn ripple")
            });
            app.btnHover()
        },
        btnHover: function() {
            var btns = document.querySelectorAll(".woo-btn")
              , btn = [];
            btns.forEach(function(element, index) {
                if (!btn[index])
                    btn[index] = element.querySelector(".el-ripple-circle");
                element.addEventListener("mouseenter", function(e) {
                    btnHandler(element, index, e)
                });
                element.addEventListener("mouseleave", function(e) {
                    btnHandler(element, index, e)
                })
            });
            const btnHandler = function(element, index, e) {
                let offset = element.getBoundingClientRect()
                  , left = e.pageX - offset.left - window.scrollX
                  , top = e.pageY - offset.top - window.scrollY;
                btn[index].style.left = left + "px";
                btn[index].style.top = top + "px"
            }
        },
    }
    app.init()
}())
