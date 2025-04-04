(function ($) {
    "use strict";
    /*=================================
        JS Index Here
    ==================================*/
    /*
    01. On Load Function
    02. Preloader
    03. Mobile Menu
    04. Sticky fix
    05. Scroll To Top
    06. Set Background Image Color & Mask
    07. Global Slider
    08. Ajax Contact Form
    09. Search Box Popup
    10. Popup Sidemenu
    11. Magnific Popup
    12. Section Position
    13. Filter
    14. Counter Up
    15. Shape Mockup
    16. Progress Bar Animation
    17. Countdown
    18. Image to SVG Code
    00. Woocommerce Toggle
    00. Color Scheme
    00. Right Click Disable
    */
    /*=================================
        JS Index End
    ==================================*/
    /*

  /*---------- 01. On Load Function ----------*/
    $(window).on("load", function () {
        $(".preloader").fadeOut();
    });

    /*---------- 02. Preloader ----------*/
    if ($(".preloader").length > 0) {
        $(".preloaderCls").each(function () {
            $(this).on("click", function (e) {
                e.preventDefault();
                $(".preloader").css("display", "none");
            });
        });
    }

    /*---------- 03. Mobile Menu ----------*/
    $(document).ready(function () {
        $.fn.thmobilemenu = function (options) {
            var opt = $.extend(
                {
                    menuToggleBtn: ".th-menu-toggle",
                    bodyToggleClass: "th-body-visible",
                    subMenuClass: "sub-menu",
                    subMenuParent: "menu-item-has-children",
                    subMenuParentToggle: "th-active",
                    meanExpandClass: "th-mean-expand",
                    appendElement: '<span class="th-mean-expand"></span>',
                    subMenuToggleClass: "th-open",
                    toggleSpeed: 400,
                },
                options
            );
    
            return this.each(function () {
                var menu = $(this); // Select menu wrapper
    
                // Menu Show & Hide
                function menuToggle() {
                    menu.toggleClass(opt.bodyToggleClass);
                    
                    // Hide all submenus when closing
                    if (!menu.hasClass(opt.bodyToggleClass)) {
                        $("." + opt.subMenuClass).slideUp(opt.toggleSpeed).removeClass(opt.subMenuToggleClass);
                        $("." + opt.subMenuParent).removeClass(opt.subMenuParentToggle);
                    }
                }
    
                // Class Setup for submenus
                menu.find("." + opt.subMenuParent).each(function () {
                    var submenu = $(this).children("ul");
                    submenu.addClass(opt.subMenuClass);
                    submenu.hide();
                    $(this).children("a").append(opt.appendElement);
                });
    
                // Submenu Toggle
                function toggleSubMenu($element) {
                    var submenu = $element.children("ul");
                    if (submenu.length > 0) {
                        $element.toggleClass(opt.subMenuParentToggle);
                        submenu.slideToggle(opt.toggleSpeed);
                        submenu.toggleClass(opt.subMenuToggleClass);
                    }
                }
    
                // Submenu click handler
                menu.find("." + opt.subMenuParent + " > a").on("click", function (e) {
                    e.preventDefault();
                    toggleSubMenu($(this).parent());
                });
    
                // Toggle Menu on Button Click
                $(opt.menuToggleBtn).on("click", function (e) {
                    e.preventDefault();
                    menuToggle();
                });
    
                // Close Menu When Clicking Outside
                $(document).on("click", function (e) {
                    if (!$(e.target).closest(".th-menu-wrapper, " + opt.menuToggleBtn).length) {
                        if (menu.hasClass(opt.bodyToggleClass)) {
                            menuToggle();
                        }
                    }
                });
    
                // Stop propagation when clicking inside menu
                menu.on("click", function (e) {
                    e.stopPropagation();
                });
            });
        };
    
        // Initialize the mobile menu
        $(".th-menu-wrapper").thmobilemenu();
    });
    

    /*----------- 22. One Page Nav ----------*/
    $(document).ready(function () {
        function onePageNav(element) {
            $(element).find('a[href^="#"]').on('click', function (event) {
                var target = $($(this).attr('href')); // Get the target section
    
                if (target.length) {
                    event.preventDefault(); // Prevent default jump
                    $('html, body').animate({
                        scrollTop: target.offset().top - 10
                    }, 1000, 'swing');
                }
            });
        }
    
        onePageNav('.your-navigation-class');
    });
    
    

    /*---------- 04. Sticky fix ----------*/
    $(window).scroll(function () {
        var topPos = $(this).scrollTop();
        if (topPos > 500) {
            $('.sticky-wrapper').addClass('sticky');
            $('.category-menu').addClass('close-category');
        } else {
            $('.sticky-wrapper').removeClass('sticky')
            $('.category-menu').removeClass('close-category');
        }
    })

    $(".menu-expand").each(function () {
        $(this).on("click", function (e) {
            e.preventDefault();
            $('.category-menu').toggleClass('open-category');
        });
    });

    /*---------- 05. Scroll To Top ----------*/
    // if ($('.scroll-top').length > 0) {
        
    //     var scrollTopbtn = document.querySelector('.scroll-top');
    //     var progressPath = document.querySelector('.scroll-top path');
    //     var pathLength = progressPath.getTotalLength();
    //     progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
    //     progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
    //     progressPath.style.strokeDashoffset = pathLength;
    //     progressPath.getBoundingClientRect();
    //     progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';		
    //     var updateProgress = function () {
    //         var scroll = $(window).scrollTop();
    //         var height = $(document).height() - $(window).height();
    //         var progress = pathLength - (scroll * pathLength / height);
    //         progressPath.style.strokeDashoffset = progress;
    //     }
    //     updateProgress();
    //     $(window).scroll(updateProgress);	
    //     var offset = 50;
    //     var duration = 750;
    //     jQuery(window).on('scroll', function() {
    //         if (jQuery(this).scrollTop() > offset) {
    //             jQuery(scrollTopbtn).addClass('show');
    //         } else {
    //             jQuery(scrollTopbtn).removeClass('show');
    //         }
    //     });				
    //     jQuery(scrollTopbtn).on('click', function(event) {
    //         event.preventDefault();
    //         jQuery('html, body').animate({scrollTop: 0}, duration);
    //         return false;
    //     })
    // }

    /*---------- 06. Set Background Image Color & Mask ----------*/
    if ($("[data-bg-src]").length > 0) {
        $("[data-bg-src]").each(function () {
            var src = $(this).attr("data-bg-src");
            $(this).css("background-image", "url(" + src + ")");
            $(this).removeAttr("data-bg-src").addClass("background-image");
        });
    }

    if ($('[data-bg-color]').length > 0) {
        $('[data-bg-color]').each(function () {
          var color = $(this).attr('data-bg-color');
          $(this).css('background-color', color);
          $(this).removeAttr('data-bg-color');
        });
    };

    $('[data-border]').each(function() {
        var borderColor = $(this).data('border');
        $(this).css('--th-border-color', borderColor);
    });
      
    if ($('[data-mask-src]').length > 0) {
        $('[data-mask-src]').each(function () {
          var mask = $(this).attr('data-mask-src');
          $(this).css({
            'mask-image': 'url(' + mask + ')',
            '-webkit-mask-image': 'url(' + mask + ')'
          });
          $(this).addClass('bg-mask');
          $(this).removeAttr('data-mask-src');
        });
    };

    /*----------- 07. Global Slider ----------*/

    $(document).ready(function () {
        $('.th-slider').each(function () {
            var thSlider = $(this);
    
            // Get slider options from data attribute and parse it safely
            var options = thSlider.attr('data-slider-options');
            try {
                options = options ? JSON.parse(options) : {};
            } catch (e) {
                console.error("Error parsing slider options:", e);
                options = {};
            }
    
            // Default slider settings
            var sliderDefault = {
                slidesPerView: 1,
                spaceBetween: options.spaceBetween || 24,
                loop: options.loop !== false, // Defaults to true unless explicitly set to false
                speed: options.speed || 1000,
                effect: options.effect || "slide", // Supports 'fade', 'slide', etc.
                autoHeight: options.autoHeight === "true", // Convert string to boolean
                autoplay: options.autoplay !== false ? { delay: 6000, disableOnInteraction: false } : false,
                navigation: {
                    nextEl: thSlider.find('.slider-next').get(0),
                    prevEl: thSlider.find('.slider-prev').get(0),
                },
                pagination: {
                    el: thSlider.find('.slider-pagination').get(0),
                    clickable: true,
                    renderBullet: function (index, className) {
                        return `<span class="${className}" aria-label="Go to Slide ${index + 1}"></span>`;
                    },
                },
            };
    
            // Merge user options with default settings
            var swiperOptions = $.extend({}, sliderDefault, options);
    
            // Initialize Swiper
            var swiper = new Swiper(thSlider.get(0), swiperOptions);
    
            // Ensure proper styling for navigation wrapper
            if ($('.slider-area').length > 0) {
                $('.slider-area').closest(".container").parent().addClass("arrow-wrap");
            }
        });
    });
    
    // Function to add animation classes
    function animationProperties() {
        $('[data-ani]').each(function () {
            var animationName = $(this).data('ani');
            $(this).addClass(animationName);
        });
    
        $('[data-ani-delay]').each(function () {
            var delayTime = $(this).data('ani-delay');
            $(this).css('animation-delay', delayTime);
        });
    
        $('[data-ani-duration]').each(function () {
            var durationTime = $(this).data('ani-duration');
            $(this).css('animation-duration', durationTime);
        });
    }
    
    $(document).ready(function () {
        animationProperties();
    });
    

    $(document).ready(function () {
        // Add click event handlers for external slider arrows based on data attributes
        $('[data-slider-prev], [data-slider-next]').on('click', function (e) {
            e.preventDefault();
    
            // Get the slider selector from data attribute
            var sliderSelector = $(this).data('slider-prev') || $(this).data('slider-next');
    
            // Ensure the selector exists
            if (!sliderSelector) return;
    
            // Find the slider element
            var $targetSlider = $(sliderSelector);
    
            if ($targetSlider.length) {
                // Access Swiper instance
                var swiperInstance = $targetSlider[0].swiper;
    
                if (swiperInstance) {
                    if ($(this).data('slider-prev') !== undefined) {
                        swiperInstance.slidePrev();
                    } else if ($(this).data('slider-next') !== undefined) {
                        swiperInstance.slideNext();
                    }
                } else {
                    console.warn('Swiper instance not found for', sliderSelector);
                }
            } else {
                console.warn('Target slider not found for selector:', sliderSelector);
            }
        });
    });
    


    /*--------------. Slider Tab -------------*/
    $.fn.activateSliderThumbs = function (options) {
        var opt = $.extend(
            {
                sliderTab: false,
                tabButton: ".tab-btn",
            },
            options
        );
    
        return this.each(function () {
            var $container = $(this);
            var $thumbs = $container.find(opt.tabButton);
            var $line = $('<span class="indicator"></span>').appendTo($container);
    
            var sliderSelector = $container.data("slider-tab");
            if (!sliderSelector) return;
    
            var $slider = $(sliderSelector);
            if (!$slider.length) return;
    
            var swiper = $slider[0].swiper;
            if (!swiper) {
                console.warn("Swiper instance not found for", sliderSelector);
                return;
            }
    
            // Thumb click handler
            $thumbs.on("click", function (e) {
                e.preventDefault();
                var clickedThumb = $(this);
    
                clickedThumb.addClass("active").siblings().removeClass("active");
                updateIndicator(clickedThumb);
    
                if (opt.sliderTab) {
                    var slideIndex = clickedThumb.index();
                    swiper.slideTo(slideIndex);
                }
            });
    
            // Sync on slide change
            if (opt.sliderTab) {
                swiper.on("slideChange", function () {
                    var activeIndex = swiper.realIndex;
                    var $activeThumb = $thumbs.eq(activeIndex);
    
                    $activeThumb.addClass("active").siblings().removeClass("active");
                    updateIndicator($activeThumb);
                });
    
                // Initial setup
                var initialIndex = swiper.realIndex;
                var $initialThumb = $thumbs.eq(initialIndex);
                $initialThumb.addClass("active").siblings().removeClass("active");
                updateIndicator($initialThumb);
            }
    
            // Update line position under active tab
            function updateIndicator($activeThumb) {
                var offset = $activeThumb.position();
    
                var marginTop = parseInt($activeThumb.css("margin-top")) || 0;
                var marginLeft = parseInt($activeThumb.css("margin-left")) || 0;
    
                $line.css({
                    "--height-set": $activeThumb.outerHeight() + "px",
                    "--width-set": $activeThumb.outerWidth() + "px",
                    "--pos-y": offset.top + marginTop + "px",
                    "--pos-x": offset.left + marginLeft + "px",
                });
            }
        });
    };
    
    // Initialize if element exists
    $(document).ready(function () {
        if ($(".project-number-pagination").length) {
            $(".project-number-pagination").activateSliderThumbs({
                sliderTab: true,
                tabButton: ".tab-btn",
            });
        }
    });
     
    

    /*----------- 08. Ajax Contact Form ----------*/
    var form = ".ajax-contact";
    var invalidCls = "is-invalid";
    var $email = '[name="email"]';
    var $validation =
        '[name="name"],[name="email"],[name="subject"],[name="number"],[name="message"]'; // Must be use (,) without any space
    var formMessages = $(".form-messages");

    function sendContact() {
        var formData = $(form).serialize();
        var valid;
        valid = validateContact();
        if (valid) {
            jQuery
                .ajax({
                    url: $(form).attr("action"),
                    data: formData,
                    type: "POST",
                })
                .done(function (response) {
                    // Make sure that the formMessages div has the 'success' class.
                    formMessages.removeClass("error");
                    formMessages.addClass("success");
                    // Set the message text.
                    formMessages.text(response);
                    // Clear the form.
                    $(
                        form +
                            ' input:not([type="submit"]),' +
                            form +
                            " textarea"
                    ).val("");
                })
                .fail(function (data) {
                    // Make sure that the formMessages div has the 'error' class.
                    formMessages.removeClass("success");
                    formMessages.addClass("error");
                    // Set the message text.
                    if (data.responseText !== "") {
                        formMessages.html(data.responseText);
                    } else {
                        formMessages.html(
                            "Oops! An error occured and your message could not be sent."
                        );
                    }
                });
        }
    }

    function validateContact() {
        var valid = true;
        var formInput;

        function unvalid($validation) {
            $validation = $validation.split(",");
            for (var i = 0; i < $validation.length; i++) {
                formInput = form + " " + $validation[i];
                if (!$(formInput).val()) {
                    $(formInput).addClass(invalidCls);
                    valid = false;
                } else {
                    $(formInput).removeClass(invalidCls);
                    valid = true;
                }
            }
        }
        unvalid($validation);

        if (
            !$($email).val() ||
            !$($email)
                .val()
                .match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)
        ) {
            $($email).addClass(invalidCls);
            valid = false;
        } else {
            $($email).removeClass(invalidCls);
            valid = true;
        }
        return valid;
    }

    $(form).on("submit", function (element) {
        element.preventDefault();
        sendContact();
    });

    /*---------- 09. Search Box Popup ----------*/
    function popupSarchBox($searchBox, $searchOpen, $searchCls, $toggleCls) {
        $($searchOpen).on("click", function (e) {
            e.preventDefault();
            $($searchBox).addClass($toggleCls);
        });
        $($searchBox).on("click", function (e) {
            e.stopPropagation();
            $($searchBox).removeClass($toggleCls);
        });
        $($searchBox)
            .find("form")
            .on("click", function (e) {
                e.stopPropagation();
                $($searchBox).addClass($toggleCls);
            });
        $($searchCls).on("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            $($searchBox).removeClass($toggleCls);
        });
    }
    popupSarchBox( ".popup-search-box", ".searchBoxToggler", ".searchClose", "show" );

    /*---------- 10. Popup Sidemenu ----------*/
    $(document).ready(function () {
        function popupSideMenu(sideMenu, sideMenuOpen, sideMenuCls, toggleCls) {
            // Open sidebar when button is clicked
            $(sideMenuOpen).on('click', function (e) {
                e.preventDefault();
                $(sideMenu).addClass(toggleCls);
            });
    
            // Close sidebar when clicking outside the content
            $(sideMenu).on('click', function (e) {
                e.stopPropagation();
                $(sideMenu).removeClass(toggleCls);
            });
    
            // Prevent closing when clicking inside the sidebar content
            $(sideMenu + ' .sidemenu-content').on('click', function (e) {
                e.stopPropagation();
            });
    
            // Close button click event
            $(sideMenuCls).on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                $(sideMenu).removeClass(toggleCls);
            });
        }
    
        // Initialize function for both menus
        popupSideMenu('.sidemenu-cart', '.sideMenuToggler', '.sideMenuCls', 'show');
        popupSideMenu('.sidemenu-info', '.sideMenuInfo', '.sideMenuCls', 'show');
    });

    /*----------- 11. Magnific Popup ----------*/
    /* magnificPopup img view */
    $(".popup-image").magnificPopup({
        type: "image",
        mainClass: 'mfp-zoom-in', 
        removalDelay: 260,
        gallery: {
            enabled: true,
        },
    });

    /* magnificPopup video view */
    $(".popup-video").magnificPopup({
        type: "iframe",
        removalDelay: 260,
        mainClass: 'mfp-zoom-in', 
    });

    /* magnificPopup video view */
    $(".popup-content").magnificPopup({
        type: "inline",
        midClick: true,
    });

    /*---------- 12. Section Position ----------*/
    // Interger Converter
    function convertInteger(str) {
        return parseInt(str, 10);
    }

    $.fn.sectionPosition = function (mainAttr, posAttr) {
        $(this).each(function () {
            var section = $(this);

            function setPosition() {
                var sectionHeight = Math.floor(section.height() / 2), // Main Height of section
                    posData = section.attr(mainAttr), // where to position
                    posFor = section.attr(posAttr), // On Which section is for positioning
                    topMark = "top-half", // Pos top
                    bottomMark = "bottom-half", // Pos Bottom
                    parentPT = convertInteger($(posFor).css("padding-top")), // Default Padding of  parent
                    parentPB = convertInteger($(posFor).css("padding-bottom")); // Default Padding of  parent

                if (posData === topMark) {
                    $(posFor).css(
                        "padding-bottom",
                        parentPB + sectionHeight + "px"
                    );
                    section.css("margin-top", "-" + sectionHeight + "px");
                } else if (posData === bottomMark) {
                    $(posFor).css(
                        "padding-top",
                        parentPT + sectionHeight + "px"
                    );
                    section.css("margin-bottom", "-" + sectionHeight + "px");
                }
            }
            setPosition(); // Set Padding On Load
        });
    };

    var postionHandler = "[data-sec-pos]";
    if ($(postionHandler).length) {
        $(postionHandler).imagesLoaded(function () {
            $(postionHandler).sectionPosition("data-sec-pos", "data-pos-for");
        });
    }

    /*----------- 14. Filter ----------*/
    $(".filter-active").imagesLoaded(function () {
        var $filter = ".filter-active",
            $filterItem = ".filter-item",
            $filterMenu = ".filter-menu-active";

        if ($($filter).length > 0) {
            var $grid = $($filter).isotope({
                itemSelector: $filterItem,
                filter: "*",
                masonry: {
                    // use outer width of grid-sizer for columnWidth
                    // columnWidth: 1,
                },
            });

            // filter items on button click
            $($filterMenu).on("click", "button", function () {
                var filterValue = $(this).attr("data-filter");
                $grid.isotope({
                    filter: filterValue,
                });
            });

            // Menu Active Class
            $($filterMenu).on("click", "button", function (event) {
                event.preventDefault();
                $(this).addClass("active");
                $(this).siblings(".active").removeClass("active");
            });
        }
    });

    $(".masonary-active, .woocommerce-Reviews .comment-list").imagesLoaded(function () {
        var $filter = ".masonary-active, .woocommerce-Reviews .comment-list",
            $filterItem = ".filter-item, .woocommerce-Reviews .comment-list li";

        if ($($filter).length > 0) {
            $($filter).isotope({
                itemSelector: $filterItem,
                filter: "*",
                masonry: {
                    // use outer width of grid-sizer for columnWidth
                    columnWidth: 1,
                },
            });
        }
        $('[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
            $($filter).isotope({
                filter: "*",
            });
        });
    });

    // Active specifix
    $('.filter-active-cat1').imagesLoaded(function () {
        var $filter = '.filter-active-cat1',
        $filterItem = '.filter-item',
        $filterMenu = '.filter-menu-active';

        if ($($filter).length > 0) {
            var $grid = $($filter).isotope({
                itemSelector: $filterItem,
                filter: '.cat1',
                masonry: {
                // use outer width of grid-sizer for columnWidth
                columnWidth: 1
                }
            });

            // filter items on button click
            $($filterMenu).on('click', 'button', function () {
                var filterValue = $(this).attr('data-filter');
                $grid.isotope({
                filter: filterValue
                });
            });

            // Menu Active Class 
            $($filterMenu).on('click', 'button', function (event) {
                event.preventDefault();
                $(this).addClass('active');
                $(this).siblings('.active').removeClass('active');
            });
        };
    });

    /*----------- 14. Counter Up ----------*/
    $(".counter-number").counterUp({
        delay: 10,
        time: 1000,
    });

    /*----------- 15. Shape Mockup ----------*/
    $.fn.shapeMockup = function () {
        var $shape = $(this);
        $shape.each(function () {
            var $currentShape = $(this),
                shapeTop = $currentShape.data("top"),
                shapeRight = $currentShape.data("right"),
                shapeBottom = $currentShape.data("bottom"),
                shapeLeft = $currentShape.data("left");
            $currentShape
                .css({
                    top: shapeTop,
                    right: shapeRight,
                    bottom: shapeBottom,
                    left: shapeLeft,
                })
                .removeAttr("data-top")
                .removeAttr("data-right")
                .removeAttr("data-bottom")
                .removeAttr("data-left")
                .parent()
                .addClass("shape-mockup-wrap");
        });
    };

    if ($(".shape-mockup")) {
        $(".shape-mockup").shapeMockup();
    }

    /*----------- 16. Progress Bar Animation ----------*/
    $('.progress-bar').waypoint(function() {
        $('.progress-bar').css({
        animation: "animate-positive 1.8s",
        opacity: "1"
        });
    }, { offset: '75%' });

    /*----------- 17. Countdown ----------*/

    $.fn.countdown = function () {
        $(this).each(function () {
            var $counter = $(this),
                countDownDate = new Date($counter.data("offer-date")).getTime(), // Set the date we're counting down toz
                exprireCls = "expired";

            // Finding Function
            function s$(element) {
                return $counter.find(element);
            }

            // Update the count down every 1 second
            var counter = setInterval(function () {
                // Get today's date and time
                var now = new Date().getTime();

                // Find the distance between now and the count down date
                var distance = countDownDate - now;

                // Time calculations for days, hours, minutes and seconds
                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor(
                    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                );
                var minutes = Math.floor(
                    (distance % (1000 * 60 * 60)) / (1000 * 60)
                );
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);

                // Check If value is lower than ten, so add zero before number
                days < 10 ? (days = "0" + days) : null;
                hours < 10 ? (hours = "0" + hours) : null;
                minutes < 10 ? (minutes = "0" + minutes) : null;
                seconds < 10 ? (seconds = "0" + seconds) : null;

                // If the count down is over, write some text
                if (distance < 0) {
                    clearInterval(counter);
                    $counter.addClass(exprireCls);
                    $counter.find(".message").css("display", "block");
                } else {
                    // Output the result in elements
                    s$(".day").html(days);
                    s$(".hour").html(hours);
                    s$(".minute").html(minutes);
                    s$(".seconds").html(seconds);
                }
            }, 1000);
        });
    };

    if ($(".counter-list").length) {
        $(".counter-list").countdown();
    }

    /*---------- 18. Image to SVG Code ----------*/
    const cache = {};

    $.fn.inlineSvg = function fnInlineSvg() {
        this.each(imgToSvg);

        return this;
    };

    function imgToSvg() {
        const $img = $(this);
        const src = $img.attr("src");

        // fill cache by src with promise
        if (!cache[src]) {
            const d = $.Deferred();
            $.get(src, (data) => {
                d.resolve($(data).find("svg"));
            });
            cache[src] = d.promise();
        }

        // replace img with svg when cached promise resolves
        cache[src].then((svg) => {
            const $svg = $(svg).clone();

            if ($img.attr("id")) $svg.attr("id", $img.attr("id"));
            if ($img.attr("class")) $svg.attr("class", $img.attr("class"));
            if ($img.attr("style")) $svg.attr("style", $img.attr("style"));

            if ($img.attr("width")) {
                $svg.attr("width", $img.attr("width"));
                if (!$img.attr("height")) $svg.removeAttr("height");
            }
            if ($img.attr("height")) {
                $svg.attr("height", $img.attr("height"));
                if (!$img.attr("width")) $svg.removeAttr("width");
            }

            $svg.insertAfter($img);
            $img.trigger("svgInlined", $svg[0]);
            $img.remove();
        });
    }

    $(".svg-img").inlineSvg();
    

    /*----------- 00. Woocommerce Toggle ----------*/
    // Ship To Different Address
    $("#ship-to-different-address-checkbox").on("change", function () {
        if ($(this).is(":checked")) {
            $("#ship-to-different-address")
                .next(".shipping_address")
                .slideDown();
        } else {
            $("#ship-to-different-address").next(".shipping_address").slideUp();
        }
    });

    // Login Toggle
    $(".woocommerce-form-login-toggle a").on("click", function (e) {
        e.preventDefault();
        $(".woocommerce-form-login").slideToggle();
    });

    // Coupon Toggle
    $(".woocommerce-form-coupon-toggle a").on("click", function (e) {
        e.preventDefault();
        $(".woocommerce-form-coupon").slideToggle();
    });

    // Woocommerce Shipping Method
    $(".shipping-calculator-button").on("click", function (e) {
        e.preventDefault();
        $(this).next(".shipping-calculator-form").slideToggle();
    });

    // Woocommerce Payment Toggle
    $('.wc_payment_methods input[type="radio"]:checked')
        .siblings(".payment_box")
        .show();
    $('.wc_payment_methods input[type="radio"]').each(function () {
        $(this).on("change", function () {
            $(".payment_box").slideUp();
            $(this).siblings(".payment_box").slideDown();
        });
    });

    // Woocommerce Rating Toggle
    $(".rating-select .stars a").each(function () {
        $(this).on("click", function (e) {
            e.preventDefault();
            $(this).siblings().removeClass("active");
            $(this).parent().parent().addClass("selected");
            $(this).addClass("active");
        });
    });

    // Quantity Plus Minus ---------------------------

    $(".quantity-plus").each(function () {
        $(this).on("click", function (e) {
            e.preventDefault();
            var $qty = $(this).siblings(".qty-input");
            var currentVal = parseInt($qty.val(), 10);
            if (!isNaN(currentVal)) {
                $qty.val(currentVal + 1);
            }
        });
    });

    $(".quantity-minus").each(function () {
        $(this).on("click", function (e) {
            e.preventDefault();
            var $qty = $(this).siblings(".qty-input");
            var currentVal = parseInt($qty.val(), 10);
            if (!isNaN(currentVal) && currentVal > 1) {
                $qty.val(currentVal - 1);
            }
        });
    });

    // /*----------- 21.Color Scheme ----------*/
    $('.color-switch-btns button').each(function () {
        // Get color for button
        const button = $(this);
        const color = button.data('color');
        button.css('--theme-color', color);

        // Change theme color on click
        button.on('click', function () {
            const clickedColor = $(this).data('color');
            $(':root').css('--theme-color', clickedColor);
        });
    });

    $(document).on('click','.switchIcon',function() {
        $('.color-scheme-wrap').toggleClass('active');
    });

    /************lettering js***********/
    function injector(t, splitter, klass, after) {
		var a = t.text().split(splitter), inject = '';
		if (a.length) {
			$(a).each(function(i, item) {
				inject += '<span class="'+klass+(i+1)+'">'+item+'</span>'+after;
			});	
			t.empty().append(inject);
		}
	}
	
	var methods = {
		init : function() {

			return this.each(function() {
				injector($(this), '', 'char', '');
			});

		},

		words : function() {

			return this.each(function() {
				injector($(this), ' ', 'word', ' ');
			});

		},
		
		lines : function() {

			return this.each(function() {
				var r = "eefec303079ad17405c889e092e105b0";
				// Because it's hard to split a <br/> tag consistently across browsers,
				// (*ahem* IE *ahem*), we replaces all <br/> instances with an md5 hash 
				// (of the word "split").  If you're trying to use this plugin on that 
				// md5 hash string, it will fail because you're being ridiculous.
				injector($(this).children("br").replaceWith(r).end(), r, 'line', '');
			});

		}
	};

	$.fn.lettering = function( method ) {
		// Method calling logic
		if ( method && methods[method] ) {
			return methods[ method ].apply( this, [].slice.call( arguments, 1 ));
		} else if ( method === 'letters' || ! method ) {
			return methods.init.apply( this, [].slice.call( arguments, 0 ) ); // always pass an array
		}
		$.error( 'Method ' +  method + ' does not exist on jQuery.lettering' );
		return this;
	};


    $(".circle-title-anime").lettering();

    // /*----------- Gsap Animation ----------*/
    // if ($('.cursor-follower').length > 0) {
    //     var follower = $(".cursor-follower");

    //     var posX = 0,
    //         posY = 0;
    
    //     var mouseX = 0,
    //         mouseY = 0;
    
    //     TweenMax.to({}, 0.016, {
    //     repeat: -1,
    //     onRepeat: function() {
    //         posX += (mouseX - posX) / 9;
    //         posY += (mouseY - posY) / 9;
    
    //         TweenMax.set(follower, {
    //             css: {
    //             left: posX - 12,
    //             top: posY - 12
    //             }
    //         });
    //     }
    //     });
    
    //     $(document).on("mousemove", function(e) {
    //         mouseX = e.clientX;
    //         mouseY = e.clientY;
    //     });
    //     //circle
    //     $(".slider-area").on("mouseenter", function() {
    //         follower.addClass("d-none");
    //     });
    //     $(".slider-area").on("mouseleave", function() {
    //         follower.removeClass("d-none");
    //     });  
    // }

    
    const cursor = document.querySelector(".slider-drag-cursor");
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };
    const speed = 1;

    const xSet = gsap.quickSetter(cursor, "x", "px");
    const ySet = gsap.quickSetter(cursor, "y", "px");

    window.addEventListener("pointermove", e => {    
    mouse.x = e.x;
    mouse.y = e.y;  
    });

    gsap.set(".slider-drag-cursor", {xPercent: -50, yPercent: -50});
    gsap.ticker.add(() => {
    const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
    pos.x += (mouse.x - pos.x) * dt;
    pos.y += (mouse.y - pos.y) * dt;
    xSet(pos.x);
    ySet(pos.y);
    });


    $(".slider-drag-wrap").hover(function() {
        $('.slider-drag-cursor').addClass('active');
    }, function() {
        $('.slider-drag-cursor').removeClass('active');
    });

    $(".slider-drag-wrap a").hover(function() {
        $('.slider-drag-cursor').removeClass('active');
    }, function() {
        $('.slider-drag-cursor').addClass('active');
    });

    
    // /*----------- 00. Right Click Disable ----------*/
    //   window.addEventListener('contextmenu', function (e) {
    //     // do something here...
    //     e.preventDefault();
    //   }, false);

    // /*----------- 00. Inspect Element Disable ----------*/
    //   document.onkeydown = function (e) {
    //     if (event.keyCode == 123) {
    //       return false;
    //     }
    //     if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
    //       return false;
    //     }
    //     if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
    //       return false;
    //     }
    //     if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
    //       return false;
    //     }
    //     if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
    //       return false;
    //     }
    //   }
    
})(jQuery);








