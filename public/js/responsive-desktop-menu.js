(function() {
    "use strict";
    var app = {
        init: function() {
            app.menu();
            $(window).resize(app.debounce(app.menu))
        },
        menu: function() {
            if ($(window).width() >= 1200) {
                var container = $(".main-mnu")
                  , list = container.find(".main-mnu-list");
                app.restore(list);
                container.addClass('main-mnu-js-init');
                var listWidth = list.width();
                list.addClass('hide');
                var containerWidth = container.width();
                if (listWidth > containerWidth) {
                    var moreButton = list.find('.menu-item-more');
                    if (!moreButton.length) {
                        var moreButton = $('<li class="menu-item menu-item-has-children menu-item-more"><div><i class="material-icons md-24">more_horiz</i></div><ul class="sub-menu"></ul></li>')
                    }
                    while (listWidth > containerWidth) {
                        var itemLastChild = list.find(">li").last();
                        moreButton.find('>ul').prepend(itemLastChild.clone());
                        itemLastChild.remove();
                        list.removeClass('hide');
                        listWidth = list.width();
                        list.addClass('hide')
                    }
                    list.append(moreButton)
                }
                list.removeClass('hide')
            }
        },
        restore: function(list) {
            var menuItemMore = $('.menu-item-more');
            if (menuItemMore.length) {
                $.each(menuItemMore.find('>ul>li'), function() {
                    list.append($(this).clone())
                });
                menuItemMore.remove()
            }
        },
        debounce: function(func) {
            var timer;
            return function(event) {
                if (timer)
                    clearTimeout(timer);
                timer = setTimeout(func, 100, event)
            }
        }
    }
    app.init()
}())
