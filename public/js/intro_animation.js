(function() {
    "use strict";
    var app = {
        DELAY: pathsoft_object.animation_delay,
        init: function() {
            const intro = gsap.utils.toArray(".intro");
            if (intro.length) {
                intro.forEach(item=>{
                    let tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: item
                        }
                    });
                    tl.from(item.querySelectorAll(".section-subheading, h1, h2, h3, .section-desc, .btn-group"), {
                        opacity: 0,
                        y: 15,
                        stagger: 0.1,
                        delay: app.DELAY
                    })
                }
                )
            }
        },
    }
    app.init()
}())
