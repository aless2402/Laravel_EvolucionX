(function() {
    "use strict";
    var app = {
        init: function() {
            jQuery('.open_popup').popup({
                transition: 'all 0.4s',
                color: '#000000',
                opacity: 0.8
            })
        },
    }
    app.init()
}())
