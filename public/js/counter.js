(function() {
    "use strict";
    var app = {
        init: function() {
            jQuery(window).on("scroll load resize", function() {
                app.spincrement()
            })
        },
        spincrement: function() {
            var counters = jQuery(".spincrement-container");
            if (counters.length) {
                jQuery.each(counters, function() {
                    var _this = jQuery(this);
                    if (jQuery(window).scrollTop() > _this.offset().top - (jQuery(window).height() * 0.85) && !_this.hasClass("animated")) {
                        _this.addClass("animated");
                        _this.find('.spincrement').spincrement({
                            duration: 1500,
                            leeway: 10,
                            thousandSeparator: '',
                            decimalPoint: ''
                        })
                    }
                })
            }
        },
    }
    app.init()
}())
