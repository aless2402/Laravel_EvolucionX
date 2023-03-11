(function() {
    "use strict";
    var app = {
        init: function() {
            this.lightGallery()
        },
        lightGallery: function() {
            var btns = document.querySelectorAll('.intro-play-btn');
            if (btns.length) {
                btns.forEach(btn=>{
                    lightGallery(btn, {
                        selector: 'this',
                        plugins: [lgVideo],
                        zoomFromOrigin: !1,
                        licenseKey: pathsoft_object.light_gallery_license_key,
                        speed: 500,
                    })
                }
                )
            }
        },
    }
    app.init()
}())
