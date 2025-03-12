import React from "react";
import Navbar from "./Navbar";
import { useEffect } from "react";
import gsap from "gsap";
import $ from "jquery";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Footer2 from "./Footer2";
gsap.registerPlugin(ScrollToPlugin);
export default function Aboutus() {
   // cursor js start
   useEffect(() => {
    const follower = document.querySelector(".cursor-follower");
    let posX = 0,
      posY = 0;
    let mouseX = 0,
      mouseY = 0;

    if (follower) {
      gsap.to(
        {},
        {
          duration: 0.016,
          repeat: -1,
          onRepeat: () => {
            posX += (mouseX - posX) / 9;
            posY += (mouseY - posY) / 9;
            gsap.set(follower, { left: posX - 12, top: posY - 12 });
          },
        }
      );

      const mouseMoveHandler = (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      };

      const sliderArea = document.querySelector(".slider-area");

      document.addEventListener("mousemove", mouseMoveHandler);
      sliderArea?.addEventListener("mouseenter", () =>
        follower.classList.add("d-none")
      );  
      sliderArea?.addEventListener("mouseleave", () =>
        follower.classList.remove("d-none")
      );

      return () => {
        document.removeEventListener("mousemove", mouseMoveHandler);
        sliderArea?.removeEventListener("mouseenter", () =>
          follower.classList.add("d-none")
        );
        sliderArea?.removeEventListener("mouseleave", () =>
          follower.classList.remove("d-none")
        );
      };
    }
  }, []);
  // cursor js end

  // slider-drag-cursor start
  useEffect(() => {
    const cursor = document.querySelector(".slider-drag-cursor");

    if (!cursor) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };
    const speed = 0.15;

    const xSet = gsap.quickSetter(cursor, "x", "px");
    const ySet = gsap.quickSetter(cursor, "y", "px");

    const moveCursor = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    gsap.ticker.add(() => {
      const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;
      xSet(pos.x);
      ySet(pos.y);
    });

    window.addEventListener("pointermove", moveCursor);

    const sliderWrap = document.querySelector(".slider-drag-wrap");
    const sliderLinks = document.querySelectorAll(".slider-drag-wrap a");

    const addActive = () => cursor.classList.add("active");
    const removeActive = () => cursor.classList.remove("active");

    sliderWrap?.addEventListener("mouseenter", addActive);
    sliderWrap?.addEventListener("mouseleave", removeActive);

    sliderLinks.forEach((link) => {
      link.addEventListener("mouseenter", removeActive);
      link.addEventListener("mouseleave", addActive);
    });

    return () => {
      window.removeEventListener("pointermove", moveCursor);
      sliderWrap?.removeEventListener("mouseenter", addActive);
      sliderWrap?.removeEventListener("mouseleave", removeActive);
      sliderLinks.forEach((link) => {
        link.removeEventListener("mouseenter", removeActive);
        link.removeEventListener("mouseleave", addActive);
      });
    };
  }, []);
  // slider-drag-cursor end

//   scroll-top start 
  useEffect(() => {
    const scrollTopBtn = document.querySelector(".scroll-top");
    const progressPath = document.querySelector(".scroll-top path");

    if (!scrollTopBtn || !progressPath) return;

    const pathLength = progressPath.getTotalLength();
    progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
    progressPath.style.strokeDashoffset = pathLength;

    const updateProgress = () => {
      const scroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = pathLength - (scroll * pathLength) / height;
      progressPath.style.strokeDashoffset = progress;

      // Show/hide button based on scroll position
      if (scroll > 50) {
        scrollTopBtn.classList.add("show");
      } else {
        scrollTopBtn.classList.remove("show");
      }
    };

    const scrollToTop = (event) => {
      event.preventDefault();
      gsap.to(window, { scrollTo: 0, duration: 0.75, ease: "power2.out" });
    };

    window.addEventListener("scroll", updateProgress);
    scrollTopBtn.addEventListener("click", scrollToTop);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      scrollTopBtn.removeEventListener("click", scrollToTop);
    };
  }, []);
//   scroll-top end 


useEffect(() => {
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
                  top: shapeTop ? shapeTop : "auto",
                  right: shapeRight ? shapeRight : "auto",
                  bottom: shapeBottom ? shapeBottom : "auto",
                  left: shapeLeft ? shapeLeft : "auto",
                  position: "absolute", // Ensure absolute positioning
              })
              .removeAttr("data-top")
              .removeAttr("data-right")
              .removeAttr("data-bottom")
              .removeAttr("data-left")
              .parent()
              .addClass("shape-mockup-wrap");
      });
  };

  if ($(".shape-mockup").length > 0) {
      $(".shape-mockup").shapeMockup();
  }
}, []);
  return (
      <div className="bg-smoke">
          {/* <!--********************************
          Code Start From Here 
      ******************************** --> */}
          <div className="cursor-follower "></div>
    
          {/* <!-- slider drag cursor --> */}
          <div className="slider-drag-cursor">
            <i className="fas fa-angle-left me-2"></i> DRAG{" "}
            <i className="fas fa-angle-right ms-2"></i>
          </div>
    
          <Navbar />
            
          {/* <!-- Breadcumb --> */}
    <div className="breadcumb-wrapper " style={{ backgroundImage: `url('/assets/pic/aboutmain.png')`}}>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-9">
                    <div className="breadcumb-content">
                        <h1 className="breadcumb-title">About Us</h1>
                        <ul className="breadcumb-menu">
                            <li><a href="/">Home</a></li>
                            <li>About Us</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* <!--About Area--> */}
    <div className="overflow-hidden space position-relative">
            <div className="sec-bg-shape2-1 spin shape-mockup d-xl-block d-none" data-bottom="25%" data-right="12%">
                <img src="assets/img/shape/section_shape_2_1.jpg" alt="img" />
            </div>
            <div className="sec-bg-shape2-1 jump shape-mockup d-xl-block d-none" data-bottom="0%" data-left="5%">
                <img src="assets/img/shape/section_shape_2_3.jpg" alt="img" />
            </div>
            <div className="container">
                <div className="about-page-wrap">
                    <div className="row gy-40 justify-content-between align-items-center">
                        <div className="col-lg-6">
                            <p className="text-theme">
                                That’s why we build every home like it’s our own. Building locally since 1988, we hold
                                ourselves to the highest standards of quality and construction integrity...
                            </p>
                            <div className="about-wrap2 style-theme mt-50">
                                <div className="checklist style4">
                                    <ul>
                                        <li>
                                            <img src="assets/img/icon/checkmark.svg" alt="img" />
                                            Quality real estate services
                                        </li>
                                        <li>
                                            <img src="assets/img/icon/checkmark.svg" alt="img" />
                                            100% Satisfaction guarantee
                                        </li>
                                        <li>
                                            <img src="assets/img/icon/checkmark.svg" alt="img" />
                                            Highly professional team
                                        </li>
                                        <li>
                                            <img src="assets/img/icon/checkmark.svg" alt="img" />
                                            Dealing always on time
                                        </li>
                                    </ul>
                                </div>
                                <div className="call-btn">
                                    <div className="icon-btn bg-theme">
                                        <img src="assets/img/icon/phone.svg" alt="img" />
                                    </div>
                                    <div className="btn-content">
                                        <h6 className="btn-title text-theme">Call Us 24/7</h6>
                                        <span className="btn-text">
                                            <a className="text-theme" href="tel:0123456789">
                                                +01 234 56789
                                            </a>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="img-box3">
                                <div className="img1">
                                    <img src="/assets/pic/people.jpg" alt="About" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
    {/* <!--Why Choose Us Area --> */}
    <div className="why-sec-1 overflow-hidden space bg-theme ">
        <div className="sec-bg-shape2-1 text-white spin shape-mockup d-xl-block d-none" data-bottom="15%" data-left="12%">
            <img src="assets/img/shape/section_shape_2_1.jpg" alt="img" />
        </div>
        <div className="sec-bg-shape2-3 text-white jump shape-mockup d-xl-block d-none" data-bottom="0%" data-right="7%">
            <img src="assets/img/shape/section_shape_2_3.jpg" alt="img" />
        </div>
        <div className="container">
            <div className="row justify-content-lg-between align-items-center">
                <div className="col-lg-6">
                    <div className="title-area">
                        <h2 className="sec-title text-white">Why Choose Us?</h2>
                        <p className="text-light">We are a real estate firm with over 20 years of expertise, and our main goal is to provide amazing locations to our partners and clients. Within the luxury real estate market, our agency offers customized solutions.</p>
                    </div>
                </div>
                <div className="col-auto">
                    <div className="sec-btn">
                        <a href="" className="th-btn style-border th-btn-icon">Contact Us</a>
                    </div>
                </div>
            </div>
            <div className="swiper th-slider" data-slider-options='{"breakpoints":{"0":{"slidesPerView":1},"576":{"slidesPerView":"1"},"768":{"slidesPerView":"2"},"992":{"slidesPerView":"2"},"1200":{"slidesPerView":"3"}}}'>
                <div className="swiper-wrapper">
                    <div className="swiper-slide">
                        <div className="service-card style4">
                            <div className="service-card-icon">
                                <img src="assets/img/icon/service-icon4-1.svg" alt="Icon" />
                            </div>
                            <h3 className="box-title"><a href="">Property Valuation</a></h3>
                            <p className="box-text">Generous amounts of south facing glazing maximize the solar gains for most of the year.</p>
                            <div className="service-img img-shine">
                                <img src="/assets/pic/about1.jpg" alt="img" />
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="service-card style4">
                            <div className="service-card-icon">
                                <img src="assets/img/icon/service-icon4-2.svg" alt="Icon" />
                            </div>
                            <h3 className="box-title"><a href="">Property Management</a></h3>
                            <p className="box-text">All living, dining, kitchen and play areas were devised by attached to the home.</p>
                            <div className="service-img img-shine">
                                <img src="/assets/pic/about2.jpg" alt="img" />
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="service-card style4">
                            <div className="service-card-icon">
                                <img src="assets/img/icon/service-icon4-1.svg" alt="Icon" />
                            </div>
                            <h3 className="box-title"><a href="">Invest Opportunities</a></h3>
                            <p className="box-text">All-inclusive real estate services to facilitate the easy management of your properties.</p>
                            <div className="service-img img-shine">
                                <img src="/assets/pic/about3.jpg" alt="img" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {/* <!--Testimonial Area --> */}
    <section className="overflow-hidden space">
        <div className="sec-bg-shape2-1 spin shape-mockup d-xxl-block d-none" data-bottom="8%" data-left="8%">
            <img src="assets/img/shape/section_shape_2_1.jpg" alt="img" />
        </div>
        <div className="container">
            <div className="row justify-content-lg-between justify-content-center align-items-center">
                <div className="col-xxl-6 col-lg-7">
                    <div className="title-area text-lg-start text-center">
                        <h2 className="sec-title text-theme">What Our Customers Says</h2>
                        <p className="sec-text text-theme">Realar help you easily create a real estate trading website. With the function Register, Login, Post real estate news.</p>
                    </div>
                </div>
                <div className="col-auto">
                    <div className="sec-btn">
                        <div className="icon-box">
                            <button data-slider-prev="#testiSlider2" className="slider-arrow style5 default slider-prev"><img src="assets/img/icon/arrow-left.svg" alt="" /></button>
                            <button data-slider-next="#testiSlider2" className="slider-arrow style5 default slider-next"><img src="assets/img/icon/arrow-right.svg" alt="" /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="container-fluid">
            <div className="testi-wrap2">
                <div className="swiper th-slider testi-slider2" id="testiSlider2" data-slider-options='{"spaceBetween":"48","breakpoints":{"0":{"slidesPerView":1},"576":{"slidesPerView":"1"},"768":{"slidesPerView":"1"},"992":{"slidesPerView":"1"},"1200":{"slidesPerView":"2"}}}'>
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">
                            <div className="testi-grid-wrap2">
                                <div className="testi-grid-thumb">
                                    <img src="/assets/pic/testimonial1.jpg" alt="img" />
                                </div>
                                <div className="testi-card style2">
                                    <div className="testi-grid_review">
                                        <i className="fa-sharp fa-solid fa-star"></i><i className="fa-sharp fa-solid fa-star"></i><i className="fa-sharp fa-solid fa-star"></i><i className="fa-sharp fa-solid fa-star"></i><i className="fa-sharp fa-solid fa-star"></i>
                                    </div>
                                    <p className="testi-card_text">"Home is where love resides, memories are created, and dreams are nurtured. I have found my sanctuary in this beautiful property. Finding the perfect that resonates with your own"</p>
                                    <div className="testi-card_profile">
                                        <div className="quote-icon">
                                            <img src="assets/img/icon/qoute2.svg" alt="icon" />
                                        </div>
                                        <div className="avatar">
                                            <img src="/assets/pic/avatar.jpg" alt="avatar" />
                                        </div>
                                        <div className="testi-card_profile-details">
                                            <h3 className="testi-card_name">Andrew Simon</h3>
                                            <span className="testi-card_desig">Property Expert</span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="testi-grid-wrap2">
                                <div className="testi-grid-thumb">
                                    <img src="/assets/pic/testimonial2.jpg" alt="img" />
                                </div>
                                <div className="testi-card style2">
                                    <div className="testi-grid_review">
                                        <i className="fa-sharp fa-solid fa-star"></i><i className="fa-sharp fa-solid fa-star"></i><i className="fa-sharp fa-solid fa-star"></i><i className="fa-sharp fa-solid fa-star"></i><i className="fa-sharp fa-solid fa-star"></i>
                                    </div>
                                    <p className="testi-card_text">"Home is where love resides, memories are created, and dreams are nurtured. I have found my sanctuary in this beautiful property. Finding the perfect that resonates with your own"</p>
                                    <div className="testi-card_profile">
                                        <div className="quote-icon">
                                            <img src="assets/img/icon/qoute2.svg" alt="icon" />
                                        </div>
                                        <div className="avatar">
                                            <img src="/assets/pic/avatar.jpg" alt="avatar" />
                                        </div>
                                        <div className="testi-card_profile-details">
                                            <h3 className="testi-card_name">Ralph Edwards</h3>
                                            <span className="testi-card_desig">Property Expert</span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="testi-grid-wrap2">
                                <div className="testi-grid-thumb">
                                    <img src="/assets/pic/testimonial3.jpeg" alt="img" />
                                </div>
                                <div className="testi-card style2">
                                    <div className="testi-grid_review">
                                        <i className="fa-sharp fa-solid fa-star"></i><i className="fa-sharp fa-solid fa-star"></i><i className="fa-sharp fa-solid fa-star"></i><i className="fa-sharp fa-solid fa-star"></i><i className="fa-sharp fa-solid fa-star"></i>
                                    </div>
                                    <p className="testi-card_text">"Home is where love resides, memories are created, and dreams are nurtured. I have found my sanctuary in this beautiful property. Finding the perfect that resonates with your own"</p>
                                    <div className="testi-card_profile">
                                        <div className="quote-icon">
                                            <img src="assets/img/icon/qoute2.svg" alt="icon" />
                                        </div>
                                        <div className="avatar">
                                            <img src="/assets/pic/avatar.jpg" alt="avatar" />
                                        </div>
                                        <div className="testi-card_profile-details">
                                            <h3 className="testi-card_name">Andrew Simon</h3>
                                            <span className="testi-card_desig">Property Expert</span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="testi-grid-wrap2">
                                <div className="testi-grid-thumb">
                                    <img src="/assets/pic/testimonial4.jpg" alt="img" />
                                </div>
                                <div className="testi-card style2">
                                    <div className="testi-grid_review">
                                        <i className="fa-sharp fa-solid fa-star"></i><i className="fa-sharp fa-solid fa-star"></i><i className="fa-sharp fa-solid fa-star"></i><i className="fa-sharp fa-solid fa-star"></i><i className="fa-sharp fa-solid fa-star"></i>
                                    </div>
                                    <p className="testi-card_text">"Home is where love resides, memories are created, and dreams are nurtured. I have found my sanctuary in this beautiful property. Finding the perfect that resonates with your own"</p>
                                    <div className="testi-card_profile">
                                        <div className="quote-icon">
                                            <img src="assets/img/icon/qoute2.svg" alt="icon" />
                                        </div>
                                        <div className="avatar">
                                            <img src="/assets/pic/avatar.jpg" alt="avatar" />
                                        </div>
                                        <div className="testi-card_profile-details">
                                            <h3 className="testi-card_name">Ralph Edwards</h3>
                                            <span className="testi-card_desig">Property Expert</span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* <!--Team Area--> */}
    <section className="space bg-theme">
        <div className="sec-bg-shape2-3 jump shape-mockup d-xxl-block d-none text-white" data-bottom="5%" data-right="8%">
            <img src="assets/img/shape/section_shape_2_3.jpg" alt="img" />
        </div>
        <div className="container">
            <div className="row justify-content-lg-between align-items-center">
                <div className="col-lg-6">
                    <div className="title-area">
                        <h2 className="sec-title text-white">Meet The Awesome Team</h2>
                        <p className="text-light">Realar help you easily create a real estate trading website. With the function Register, Login, Post real estate news.</p>
                    </div>
                </div>
                <div className="col-auto">
                    <div className="sec-btn">
                        <a href="" className="th-btn style-border th-btn-icon">View All Team</a>
                    </div>
                </div>
            </div>
            <div className="slider-area team-slider3">
                <div className="swiper th-slider" id="teamSlider3" data-slider-options='{"breakpoints":{"0":{"slidesPerView":1},"576":{"slidesPerView":"1"},"768":{"slidesPerView":"2"},"992":{"slidesPerView":"3"},"1400":{"slidesPerView":"3"}}}'>
                    <div className="swiper-wrapper">
                        {/* <!-- Single Item --> */}
                        <div className="swiper-slide">
                            <div className="th-team team-card style3">
                                <div className="img-wrap">
                                    <div className="team-img">
                                        <img src="/assets/pic/team1.jpg" alt="Team" />
                                    </div>
                                    <div className="th-social-wrap">
                                        <div className="th-social">
                                            <a target="_blank" href="https://facebook.com/"><i className="fab fa-facebook-f"></i></a>
                                            <a target="_blank" href="https://twitter.com/"><i className="fab fa-twitter"></i></a>
                                            <a target="_blank" href="https://linkedin.com/"><i className="fab fa-linkedin-in"></i></a>
                                            <a target="_blank" href="https://youtube.com/"><i className="fab fa-youtube"></i></a>
                                            <a target="_blank" href="https://instagram.com/"><i className="fab fa-instagram"></i></a>
                                        </div>
                                        <a className="icon-btn" href=""><img src="assets/img/icon/arrow-right.svg" alt="img" /></a>
                                    </div>
                                </div>
                                <div className="team-card-content">
                                    <div className="media-left">
                                        <h3 className="box-title"><a href="">Janny Wilson</a></h3>
                                        <span className="team-desig">Property Expert</span>
                                    </div>
                                    <a className="icon-btn" href="tel:09876543210"><img src="assets/img/icon/phone.svg" alt="img" /></a>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Single Item --> */}
                        <div className="swiper-slide">
                            <div className="th-team team-card style3">
                                <div className="img-wrap">
                                    <div className="team-img">
                                        <img src="/assets/pic/team2.jpg" alt="Team" />
                                    </div>
                                    <div className="th-social-wrap">
                                        <div className="th-social">
                                            <a target="_blank" href="https://facebook.com/"><i className="fab fa-facebook-f"></i></a>
                                            <a target="_blank" href="https://twitter.com/"><i className="fab fa-twitter"></i></a>
                                            <a target="_blank" href="https://linkedin.com/"><i className="fab fa-linkedin-in"></i></a>
                                            <a target="_blank" href="https://youtube.com/"><i className="fab fa-youtube"></i></a>
                                            <a target="_blank" href="https://instagram.com/"><i className="fab fa-instagram"></i></a>
                                        </div>
                                        <a className="icon-btn" href=""><img src="assets/img/icon/arrow-right.svg" alt="img" /></a>
                                    </div>
                                </div>
                                <div className="team-card-content">
                                    <div className="media-left">
                                        <h3 className="box-title"><a href="">Andrew Richard</a></h3>
                                        <span className="team-desig">Property Expert</span>
                                    </div>
                                    <a className="icon-btn" href="tel:09876543210"><img src="assets/img/icon/phone.svg" alt="img" /></a>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Single Item --> */}
                        <div className="swiper-slide">
                            <div className="th-team team-card style3">
                                <div className="img-wrap">
                                    <div className="team-img">
                                        <img src="/assets/pic/team3.jpg" alt="Team" />
                                    </div>
                                    <div className="th-social-wrap">
                                        <div className="th-social">
                                            <a target="_blank" href="https://facebook.com/"><i className="fab fa-facebook-f"></i></a>
                                            <a target="_blank" href="https://twitter.com/"><i className="fab fa-twitter"></i></a>
                                            <a target="_blank" href="https://linkedin.com/"><i className="fab fa-linkedin-in"></i></a>
                                            <a target="_blank" href="https://youtube.com/"><i className="fab fa-youtube"></i></a>
                                            <a target="_blank" href="https://instagram.com/"><i className="fab fa-instagram"></i></a>
                                        </div>
                                        <a className="icon-btn" href=""><img src="assets/img/icon/arrow-right.svg" alt="img" /></a>
                                    </div>
                                </div>
                                <div className="team-card-content">
                                    <div className="media-left">
                                        <h3 className="box-title"><a href="">Zarin Wilson</a></h3>
                                        <span className="team-desig">Property Expert</span>
                                    </div>
                                    <a className="icon-btn" href="tel:09876543210"><img src="assets/img/icon/phone.svg" alt="img" /></a>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Single Item --> */}
                        <div className="swiper-slide">
                            <div className="th-team team-card style3">
                                <div className="img-wrap">
                                    <div className="team-img">
                                        <img src="/assets/pic/team4.jpg" alt="Team" />
                                    </div>
                                    <div className="th-social-wrap">
                                        <div className="th-social">
                                            <a target="_blank" href="https://facebook.com/"><i className="fab fa-facebook-f"></i></a>
                                            <a target="_blank" href="https://twitter.com/"><i className="fab fa-twitter"></i></a>
                                            <a target="_blank" href="https://linkedin.com/"><i className="fab fa-linkedin-in"></i></a>
                                            <a target="_blank" href="https://youtube.com/"><i className="fab fa-youtube"></i></a>
                                            <a target="_blank" href="https://instagram.com/"><i className="fab fa-instagram"></i></a>
                                        </div>
                                        <a className="icon-btn" href=""><img src="assets/img/icon/arrow-right.svg" alt="img" /></a>
                                    </div>
                                </div>
                                <div className="team-card-content">
                                    <div className="media-left">
                                        <h3 className="box-title"><a href="">Michel Smith</a></h3>
                                        <span className="team-desig">Property Expert</span>
                                    </div>
                                    <a className="icon-btn" href="tel:09876543210"><img src="assets/img/icon/phone.svg" alt="img" /></a>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
                {/* <button data-slider-prev="#teamSlider3" className="slider-arrow style6 slider-prev"><img src="assets/img/icon/arrow-left.svg" alt="icon" /></button>
                <button data-slider-next="#teamSlider3" className="slider-arrow style6 slider-next"><img src="assets/img/icon/arrow-right.svg" alt="icon" /></button> */}
            </div>
        </div>
    </section>

    {/* <!--Client Area--> */}
    <div className="client-area-1 space">
        <div className="container">
            <div className="slider-area client-slider1">
                <div className="swiper th-slider has-shadow" id="clientSlider1" data-slider-options='{"breakpoints":{"0":{"slidesPerView":2},"576":{"slidesPerView":"3"},"768":{"slidesPerView":"4"},"992":{"slidesPerView":"5"},"1200":{"slidesPerView":"6"}}}'>
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">
                            <a href="#" className="client-card">
                                <img src="assets/img/brand/brand_2_1.svg" alt="Image" />
                            </a>
                        </div>

                        <div className="swiper-slide">
                            <a href="#" className="client-card">
                                <img src="assets/img/brand/brand_2_2.svg" alt="Image" />
                            </a>
                        </div>

                        <div className="swiper-slide">
                            <a href="#" className="client-card">
                                <img src="assets/img/brand/brand_2_3.svg" alt="Image" />
                            </a>
                        </div>

                        <div className="swiper-slide">
                            <a href="#" className="client-card">
                                <img src="assets/img/brand/brand_2_4.svg" alt="Image" />
                            </a>
                        </div>

                        <div className="swiper-slide">
                            <a href="#" className="client-card">
                                <img src="assets/img/brand/brand_2_5.svg" alt="Image" />
                            </a>
                        </div>

                        <div className="swiper-slide">
                            <a href="#" className="client-card">
                                <img src="assets/img/brand/brand_2_6.svg" alt="Image" />
                            </a>
                        </div>

                        <div className="swiper-slide">
                            <a href="#" className="client-card">
                                <img src="assets/img/brand/brand_2_1.svg" alt="Image" />
                            </a>
                        </div>

                        <div className="swiper-slide">
                            <a href="#" className="client-card">
                                <img src="assets/img/brand/brand_2_2.svg" alt="Image" />
                            </a>
                        </div>

                        <div className="swiper-slide">
                            <a href="#" className="client-card">
                                <img src="assets/img/brand/brand_2_3.svg" alt="Image" />
                            </a>
                        </div>

                        <div className="swiper-slide">
                            <a href="#" className="client-card">
                                <img src="assets/img/brand/brand_2_4.svg" alt="Image" />
                            </a>
                        </div>

                        <div className="swiper-slide">
                            <a href="#" className="client-card">
                                <img src="assets/img/brand/brand_2_5.svg" alt="Image" />
                            </a>
                        </div>

                        <div className="swiper-slide">
                            <a href="#" className="client-card">
                                <img src="assets/img/brand/brand_2_6.svg" alt="Image" />
                            </a>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    </div>
          <Footer2 />
         
    
          {/* <!-- Scroll To Top --> */}
          <div className="scroll-top">
            <svg
              className="progress-circle svg-content"
              width="100%"
              height="100%"
              viewBox="-1 -1 102 102"
            >
              <path
                d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
                style={{
                  transition: "stroke-dashoffset 10ms linear 0s",
                  strokeDasharray: "307.919, 307.919",
                  strokeDashoffset: "307.919",
                }}
              ></path>
            </svg>
          </div>
        </div>
  )
}
