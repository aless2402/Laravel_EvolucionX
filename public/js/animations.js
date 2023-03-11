(function() {
    "use strict";
    var app = {
        init: ()=>{
            app.animations.init()
        }
        ,
        DELAY: pathsoft_object.animation_delay,
        animations: {
            init: ()=>{
                app.animations.settings();
                app.animations.layouts();
                app.animations.components();
                app.animations.sections();
                app.animations.animateItems();
                app.animations.animateWooItems()
            }
            ,
            settings: ()=>{
                gsap.registerPlugin(ScrollTrigger);
                ScrollTrigger.defaults({
                    start: "top 90%"
                })
            }
            ,
            components: ()=>{
                app.animations.pagination();
                app.animations.breadCrumbs()
            }
            ,
            layouts: ()=>{
                app.animations.header()
            }
            ,
            sections: ()=>{
                app.animations.sectionHeading();
                app.animations.sectionFooter()
            }
            ,
            pagination: ()=>{
                const pagination = document.querySelectorAll(".pagination");
                if (pagination.length) {
                    let tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: pagination
                        }
                    });
                    tl.from(pagination, {
                        y: 30,
                        opacity: 0,
                        delay: app.DELAY
                    })
                }
            }
            ,
            breadCrumbs: ()=>{
                if (document.querySelectorAll(".bread-crumbs").length) {
                    gsap.from(".bread-crumbs-list", {
                        opacity: 0,
                        delay: 0.25
                    })
                }
            }
            ,
            header: ()=>{
                if (document.querySelectorAll(".header-top").length) {
                    gsap.fromTo(".header-top-info, .header-top-links", {
                        opacity: 0
                    }, {
                        opacity: 1,
                        duration: 0.4,
                        delay: 0.2,
                        stagger: 0.1
                    })
                }
                gsap.fromTo(".logo img, .main-mnu, .header-actions", {
                    opacity: 0
                }, {
                    opacity: 1,
                    duration: 0.4,
                    delay: 0.2,
                    stagger: 0.1
                })
            }
            ,
            sectionHeading: ()=>{
                const sectionHeadings = gsap.utils.toArray(".section-heading-animate");
                if (sectionHeadings.length) {
                    sectionHeadings.forEach(heading=>{
                        let tl = gsap.timeline({
                            scrollTrigger: {
                                trigger: heading
                            }
                        });
                        tl.from(heading, {
                            opacity: 0,
                            delay: app.DELAY
                        })
                    }
                    )
                }
            }
            ,
            sectionFooter: ()=>{
                const sectionFooters = gsap.utils.toArray(".section-footer-animate");
                if (sectionFooters.length) {
                    sectionFooters.forEach(footer=>{
                        let tl = gsap.timeline({
                            scrollTrigger: {
                                trigger: footer
                            }
                        });
                        tl.from(footer, {
                            opacity: 0,
                            y: 20,
                            delay: app.DELAY
                        })
                    }
                    )
                }
            }
            ,
            animateItems: ()=>{
                app.animations.itemsAnim(".section-animate-items", ".animate-item")
            }
            ,
            animateWooItems: ()=>{
                app.animations.itemsAnim(".products", ".product")
            }
            ,
            itemsAnim: (sectionClass,itemClass)=>{
                const sections = gsap.utils.toArray(sectionClass);
                if (sections.length) {
                    sections.forEach(section=>{
                        const item = section.querySelectorAll(itemClass);
                        const columns = section.getAttribute('data-body-columns');
                        let staggerGrid = "auto";
                        if (columns !== null) {
                            staggerGrid = [1, parseInt(columns)]
                        }
                        if (item.length) {
                            app.animations.itemsBatch(item, staggerGrid)
                        }
                    }
                    )
                }
            }
            ,
            itemsBatch: (item,staggerGrid)=>{
                gsap.set(item, {
                    y: 30,
                    opacity: 0,
                    ease: "power3.out"
                });
                ScrollTrigger.batch(item, {
                    interval: 0.1,
                    onEnter: function(batch) {
                        gsap.to(batch, {
                            opacity: 1,
                            y: 0,
                            delay: app.DELAY,
                            stagger: {
                                each: 0.1,
                                grid: staggerGrid
                            },
                            overwrite: !0
                        })
                    },
                    onEnterBack: function(batch) {
                        gsap.set(batch, {
                            opacity: 1,
                            y: 0
                        })
                    }
                })
            }
            ,
        },
    }
    app.init()
}())
