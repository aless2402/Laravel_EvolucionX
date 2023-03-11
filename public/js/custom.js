(function() {
    "use strict";
    var app = {
        init: function() {
            app.startPage();
            this.lazyLoading();
            this.setUpListeners();
            this.btnHover();
            this.appendMfBg();
            this.appendBtnTop();
            this.formingHrefTel();
            this.articleTableResponsive();
            this.inputChangeFile()
        },
        setUpListeners: function() {
            jQuery(document).on("click", ".ripple", this.btnRipple);
            jQuery(".header-search-ico-search").on("click", this.headerSearchOpen);
            jQuery(".header-search-ico-close").on("click", this.headerSearchClose);
            jQuery(document).on("click", this.headerSearchCloseNotEl);
            jQuery(".header-lang-current").on("click", this.headerLangOpen);
            jQuery(document).on("click", this.headerLangCloseNotEl);
            jQuery(".header-navbar-btn").on("click", this.headerNavbarToggle);
            jQuery(document).on("click", this.headerNavbarNotEl);
            jQuery(".main-mnu-btn").on("click", this.MainMenuToggle);
            jQuery(".mmm-btn").on("click", this.MainMenuSubmenuToggle);
            jQuery(document).on("click", this.MainMenuCloseNotEl);
            jQuery(document).on("click", ".side-open", this.sideOpen);
            jQuery(document).on("click", ".side-close, .side-visible", this.sideClose);
            jQuery(".form-field").each(this.inputEach);
            jQuery(".form-field-input").on("focus", this.inputFocus).on("keyup change", this.inputKeyup).on("blur", this.inputBlur);
            jQuery(document).on("click", '.btn-top', this.btnTop);
            jQuery(window).on("scroll", this.btnTopScroll)
        },
        startPage: ()=>{
            setTimeout(function() {
                jQuery(".main").addClass("main-visible")
            }, 20);
            const preloader = document.querySelector(".preloader");
            if (preloader !== null) {
                preloader.classList.remove("active")
            }
        }
        ,
        appendMfBg: function() {
            jQuery("body").append('<div class="mf-bg"></div>')
        },
        appendBtnTop: function() {
            jQuery("body").append('<div class="btn-top"><svg viewBox="0 0 13 9"><use xlink:href="' + pathsoft_object.template_directory_uri + '/assets/img/sprite.svg#arrow-right"></use></svg></div>')
        },
        btnTop: function() {
            jQuery('html, body').animate({
                scrollTop: 0
            }, 1000, function() {
                jQuery(this).removeClass("active")
            })
        },
        btnTopScroll: function() {
            var btnTop = jQuery('.btn-top');
            if (jQuery(this).scrollTop() > 700) {
                btnTop.addClass("active")
            } else {
                btnTop.removeClass("active")
            }
        },
        headerSearchOpen: function() {
            var _this = jQuery(this)
              , search = _this.closest(".header-search")
              , position = search.position()
              , form = search.find(".header-search-form");
            search.addClass("open");
            form.css('width', position.left + 6)
        },
        headerSearchClose: function() {
            jQuery(this).closest(".header-search").removeClass("open")
        },
        headerSearchCloseNotEl: function(e) {
            if (jQuery(".header-search").hasClass("open")) {
                if (jQuery(e.originalEvent.target).closest(".header-search").length)
                    return;
                jQuery(".header-search").removeClass("open");
                e.originalEvent.stopPropagation()
            }
        },
        headerLangOpen: function() {
            jQuery(this).parent().toggleClass("open")
        },
        headerLangCloseNotEl: function(e) {
            if (jQuery(".header-lang").hasClass("open")) {
                if (jQuery(e.originalEvent.target).closest(".header-lang").length)
                    return;
                jQuery(".header-lang").removeClass("open");
                e.originalEvent.stopPropagation()
            }
        },
        MainMenuToggle: function() {
            var _this = jQuery(this)
              , _body = jQuery("body")
              , headerH = _this.closest(".header").outerHeight()
              , mnu = jQuery(".mmm")
              , headerFixed = jQuery(".header-fixed")
              , offsetTop = headerFixed.offset().top;
            if (headerFixed.hasClass("fixed")) {
                headerH = headerFixed.outerHeight()
            }
            mnu.css("padding-top", headerH);
            jQuery(this).toggleClass("active");
            _body.toggleClass("mmm-open").scrollTop(offsetTop);
            if (_body.hasClass("mmm-open")) {
                jQuery(".mf-bg").addClass("visible mm")
            } else {
                jQuery(".mf-bg").removeClass("visible mm")
            }
        },
        MainMenuSubmenuToggle: function() {
            var _this = jQuery(this)
              , item = _this.parent()
              , content = item.find(".mmsm");
            item.toggleClass("open");
            content.slideToggle()
        },
        MainMenuCloseNotEl: function(e) {
            if (jQuery("body").hasClass("mmm-open")) {
                if (jQuery(e.originalEvent.target).closest(".mmm, .main-mnu-btn").length)
                    return;
                jQuery("body").removeClass("mmm-open");
                jQuery(".main-mnu-btn").removeClass("active");
                jQuery(".mf-bg").removeClass("visible mm");
                e.originalEvent.stopPropagation()
            }
        },
        headerNavbarToggle: function() {
            jQuery(this).parent().toggleClass("open")
        },
        headerNavbarNotEl: function(e) {
            if (jQuery(".header-navbar").hasClass("open")) {
                if (jQuery(e.originalEvent.target).closest(".header-navbar").length)
                    return;
                jQuery(".header-navbar").removeClass("open");
                e.originalEvent.stopPropagation()
            }
        },
        sideOpen: function(e) {
            if (!jQuery("body").hasClass("woocommerce-cart") && !jQuery("body").hasClass("woocommerce-checkout")) {
                e.originalEvent.preventDefault()
            }
            var side = jQuery(jQuery(this).attr("data-side"));
            if (side.length) {
                side.toggleClass("open");
                if (!e.currentTarget.classList.contains("psnav-item")) {
                    jQuery(".mf-bg").toggleClass("visible side-visible")
                }
            }
        },
        sideClose: function() {
            jQuery(".side, .sidebar-filters").removeClass("open");
            jQuery(".mf-bg").removeClass("visible side-visible")
        },
        inputEach: function() {
            var _this = jQuery(this)
              , val = _this.find(".form-field-input").val();
            if (val === "") {
                _this.removeClass("focus")
            } else {
                _this.addClass("focus")
            }
        },
        inputFocus: function() {
            var _this = jQuery(this)
              , wrappInput = _this.closest('.form-field');
            wrappInput.addClass("focus")
        },
        inputKeyup: function() {
            var _this = jQuery(this)
              , val = _this.val()
              , wrappInput = _this.closest('.form-field');
            if (val === "" && !_this.is(":focus")) {
                wrappInput.removeClass("focus")
            } else {
                wrappInput.addClass("focus")
            }
        },
        inputBlur: function() {
            var _this = jQuery(this)
              , val = _this.val()
              , wrappInput = _this.closest('.form-field');
            if (val === "") {
                wrappInput.removeClass("focus")
            }
        },
        inputChangeFile: function() {
            $('.form-field-file input[type=file]').on("change", function(e) {
                var _this = $(this)
                  , container = _this.closest(".form-field-file")
                  , text = container.find(".form-field-input-file");
                text.text(e.target.files[0].name)
            })
        },
        btnRipple: function(e) {
            var _this = jQuery(this)
              , offset = jQuery(this).offset()
              , positionX = e.originalEvent.pageX - offset.left
              , positionY = e.originalEvent.pageY - offset.top;
            _this.append("<div class='ripple-effect'>");
            _this.find(".ripple-effect").css({
                left: positionX,
                top: positionY
            }).animate({
                opacity: 0
            }, 1500, function() {
                jQuery(this).remove()
            })
        },
        btnHover: function() {
            var btns = document.querySelectorAll(".btn, .el-ripple")
              , btn = [];
            btns.forEach(function(element, index) {
                var span = document.createElement("span");
                span.className = "el-ripple-circle";
                element.appendChild(span);
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
        formingHrefTel: function() {
            var linkAll = jQuery('.formingHrefTel')
              , joinNumbToStringTel = 'tel:';
            jQuery.each(linkAll, function() {
                var _this = jQuery(this)
                  , linkValue = _this.text()
                  , arrayString = linkValue.split("");
                for (var i = 0; i < arrayString.length; i++) {
                    var thisNunb = app.isNumber(arrayString[i]);
                    if (thisNunb === !0 || (arrayString[i] === "+" && i === 0)) {
                        joinNumbToStringTel += arrayString[i]
                    }
                }
                _this.attr("href", function() {
                    return joinNumbToStringTel
                });
                joinNumbToStringTel = 'tel:'
            })
        },
        isNumber: function(n) {
            return !isNaN(parseFloat(n)) && isFinite(n)
        },
        articleTableResponsive: function() {
            var article = jQuery(".article");
            if (article.length) {
                jQuery.each(article.find("table"), function() {
                    jQuery(this).wrap("<div class='table-responsive-outer'></div>").wrap("<div class='table-responsive'></div>")
                })
            }
        },
        lazyLoading: function() {
            var observer = lozad(".lazy", {
                loaded: el=>{
                    if (el.tagName.toLowerCase() === 'img') {
                        el.removeAttribute("data-src");
                        el.removeAttribute("data-srcset");
                        if (el.getAttribute("data-srcset") === null) {
                            el.removeAttribute("sizes")
                        }
                        if (el.getAttribute("data-sizes") !== null) {
                            el.setAttribute("sizes", el.getAttribute("data-sizes"));
                            el.removeAttribute("data-sizes")
                        }
                    }
                    if (el.tagName.toLowerCase() === 'div') {
                        el.removeAttribute("data-background-image");
                        el.removeAttribute("data-background-image-set");
                        if (el.classList.contains('intro-item')) {
                            el.removeAttribute("style")
                        }
                    }
                }
            });
            observer.observe()
        },
    }
    app.init()
}())
