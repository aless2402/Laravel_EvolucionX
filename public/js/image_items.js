(function() {
    "use strict";
    var app = {
        init: function() {
            this.isotopeProjects()
        },
        isotopeProjects: function() {
            var items = jQuery(".pitems");
            $.each(items, function() {
                var item = jQuery(this);
                var activeNavClass = item.parent().find('.pitem-nav-list li.active');
                var activeNavClassIndex = activeNavClass.index();
                var activeFilter = '*';
                if (activeNavClassIndex !== 0) {
                    activeFilter = activeNavClass.data('filter')
                }
                item.isotope({
                    itemSelector: '.pitem-col',
                    filter: activeFilter
                });
                item.parent().find('.pitem-nav-list li').on('click', function() {
                    var _this = jQuery(this)
                      , selector = _this.data('filter');
                    _this.addClass("active").siblings().removeClass("active");
                    item.isotope({
                        filter: selector
                    })
                })
            })
        },
    }
    app.init()
}())
