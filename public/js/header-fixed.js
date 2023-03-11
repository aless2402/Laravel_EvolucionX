(function() {
    "use strict";
    var app = {
        init: function() {
            if (jQuery('.header-fixed').length) {
                $(window).on("load resize scroll", app.handler)
            }
        },
        IS_FIXED: !1,
        handler: function() {
            var header = jQuery('.header-fixed');
            var height = header.outerHeight();
            var offsetTop = header.offset().top;
            var scrollTop = $(this).scrollTop();
            var wpadminbar = jQuery('#wpadminbar');
            var wpadminbarHeight = wpadminbar.outerHeight();
            var headerStatic = jQuery(".header-fixed-static");
            if (headerStatic.length) {
                offsetTop = headerStatic.offset().top;
                headerStatic.css("height", height);
                if (wpadminbar.length) {
                    offsetTop = offsetTop - wpadminbarHeight
                }
            }
            if (scrollTop >= offsetTop) {
                if (!app.IS_FIXED) {
                    header.addClass("fixed");
                    header.after('<div class="header-fixed-static" style="height:' + height + 'px"></div>');
                    if (wpadminbar.length) {
                        header.css('top', wpadminbarHeight)
                    }
                }
                app.IS_FIXED = !0
            } else {
                if (app.IS_FIXED) {
                    header.removeClass("fixed");
                    headerStatic.remove();
                    if (wpadminbar.length) {
                        header.css('top', '0')
                    }
                }
                app.IS_FIXED = !1
            }
        }
    }
    app.init()
}())
