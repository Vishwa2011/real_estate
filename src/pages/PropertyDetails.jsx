import React from "react";

import 'magnific-popup';
import 'magnific-popup/dist/magnific-popup.css';
import Navbar from "./Navbar";
import { useEffect } from "react";
import gsap from "gsap";
import $ from "jquery";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Footer2 from "./Footer2";
gsap.registerPlugin(ScrollToPlugin);


export default function PropertyDetails() {
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

// img video start 
  useEffect(() => {
    $(".popup-image").magnificPopup({
        type: "image",
        mainClass: 'mfp-zoom-in', 
        removalDelay: 260,
        gallery: {
            enabled: true,
        },
    });

    $(".popup-video").magnificPopup({
        type: "iframe",
        removalDelay: 260,
        mainClass: 'mfp-zoom-in', 
    });

    $(".popup-content").magnificPopup({
        type: "inline",
        midClick: true,
    });
}, []); 
// img video end 

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
      <div
        className="breadcumb-wrapper "
        style={{ backgroundImage: `url('assets/pic/propertydetailsmain.webp')`,backgroundPosition:'center' }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-9">
              <div className="breadcumb-content">
                <h1 className="breadcumb-title">Toronto Townhouse</h1>
                <ul className="breadcumb-menu">
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>Toronto Townhouse</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!--Property Page Area--> */}
    <section className="space-top space-extra-bottom">
        <div className="container">
            <div className="slider-area property-slider1">
                <div className="swiper th-slider mb-4" id="propertySlider" data-slider-options='{"effect":"fade","loop":true,"thumbs":{"swiper":".property-thumb-slider"},"autoplayDisableOnInteraction":"true"}'>
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">
                            <div className="property-slider-img">
                                <img src="/assets/pic/pd1 (1).webp" alt="img" />
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="property-slider-img">
                                <img src="/assets/pic/pd2.jpg" alt="img" />
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="property-slider-img">
                                <img src="/assets/pic/pd3.jpg" alt="img" />
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="property-slider-img">
                                <img src="/assets/pic/pd4.jpg" alt="img" />
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="property-slider-img">
                                <img src="/assets/pic/pd5.jpg" alt="img" />
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="property-slider-img">
                                <img src="/assets/pic/pd6.jpg" alt="img" />
                            </div>
                        </div>
                        {/* <div className="swiper-slide">
                            <div className="property-slider-img">
                                <img src="assets/img/property/property_inner_2.jpg" alt="img" />
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="property-slider-img">
                                <img src="assets/img/property/property_inner_3.jpg" alt="img" />
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="property-slider-img">
                                <img src="assets/img/property/property_inner_4.jpg" alt="img" />
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="property-slider-img">
                                <img src="assets/img/property/property_inner_5.jpg" alt="img" />
                            </div>
                        </div> */}
                    </div>
                </div>
                <div className="swiper th-slider property-thumb-slider" data-slider-options='{"effect":"slide","loop":true,"breakpoints":{"0":{"slidesPerView":2},"576":{"slidesPerView":"2"},"768":{"slidesPerView":"3"},"992":{"slidesPerView":"3"},"1200":{"slidesPerView":"4"}},"autoplayDisableOnInteraction":"true"}'>
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">
                            <div className="property-slider-img">
                                <img src="/assets/pic/pd1 (1).webp" alt="Image" />
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="property-slider-img">
                                <img src="/assets/pic/pd2.jpg" alt="Image" />
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="property-slider-img">
                                <img src="/assets/pic/pd3.jpg" alt="Image" />
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="property-slider-img">
                                <img src="/assets/pic/pd4.jpg" alt="Image" />
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="property-slider-img">
                                <img src="/assets/pic/pd5.jpg" alt="Image" />
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="property-slider-img">
                                <img src="/assets/pic/pd6.jpg" alt="Image" />
                            </div>
                        </div>
                        {/* <div className="swiper-slide">
                            <div className="property-slider-img">
                                <img src="assets/img/property/property_inner_2.jpg" alt="Image" />
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="property-slider-img">
                                <img src="assets/img/property/property_inner_3.jpg" alt="Image" />
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="property-slider-img">
                                <img src="assets/img/property/property_inner_4.jpg" alt="Image" />
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="property-slider-img">
                                <img src="assets/img/property/property_inner_5.jpg" alt="Image" />
                            </div>
                        </div> */}
                    </div>
                </div>

                <button data-slider-prev="#propertySlider" className="slider-arrow style3 slider-prev"><img src="assets/img/icon/arrow-left.svg" alt="icon" /></button>
                <button data-slider-next="#propertySlider" className="slider-arrow style3 slider-next"><img src="assets/img/icon/arrow-right.svg" alt="icon" /></button>
            </div>
            <div className="row gx-30">
                <div className="col-xxl-8 col-lg-7">
                    <div className="property-page-single">
                        <div className="page-content">
                            <div className="property-meta mb-30">
                                <a className="property-tag" href="">Featured</a>
                                <a href=""><img src="assets/img/icon/calendar.svg" alt="img" />05 Jun, 2024</a>
                                <a href=""><img src="assets/img/icon/comments.svg" alt="img" />32 Comments</a>
                            </div>
                            <h2 className="page-title">About This Property</h2>
                            <p className="mb-30">voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur</p>
                            <p className="mb-30"> Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur</p>
                            <h2 className="page-title mb-20">Property Overview</h2>
                            <ul className="property-grid-list">
                                <li>
                                    <div className="property-grid-list-icon">
                                        <img src="assets/img/icon/property-single-icon1-1.svg" alt="img" />
                                    </div>
                                    <div className="property-grid-list-details">
                                        <h4 className="property-grid-list-title">ID NO.</h4>
                                        <p className="property-grid-list-text">#1234</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="property-grid-list-icon">
                                        <img src="assets/img/icon/property-single-icon1-2.svg" alt="img" />
                                    </div>
                                    <div className="property-grid-list-details">
                                        <h4 className="property-grid-list-title">Type</h4>
                                        <p className="property-grid-list-text">Residencial</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="property-grid-list-icon">
                                        <img src="assets/img/icon/property-single-icon1-3.svg" alt="img" />
                                    </div>
                                    <div className="property-grid-list-details">
                                        <h4 className="property-grid-list-title">Room</h4>
                                        <p className="property-grid-list-text">6</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="property-grid-list-icon">
                                        <img src="assets/img/icon/property-single-icon1-4.svg" alt="img" />
                                    </div>
                                    <div className="property-grid-list-details">
                                        <h4 className="property-grid-list-title">Bedroom</h4>
                                        <p className="property-grid-list-text">4</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="property-grid-list-icon">
                                        <img src="assets/img/icon/property-single-icon1-5.svg" alt="img" />
                                    </div>
                                    <div className="property-grid-list-details">
                                        <h4 className="property-grid-list-title">Bath</h4>
                                        <p className="property-grid-list-text">2</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="property-grid-list-icon">
                                        <img src="assets/img/icon/property-single-icon1-6.svg" alt="img" />
                                    </div>
                                    <div className="property-grid-list-details">
                                        <h4 className="property-grid-list-title">Purpose</h4>
                                        <p className="property-grid-list-text">For Rent</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="property-grid-list-icon">
                                        <img src="assets/img/icon/property-single-icon1-7.svg" alt="img" />
                                    </div>
                                    <div className="property-grid-list-details">
                                        <h4 className="property-grid-list-title">Sqft</h4>
                                        <p className="property-grid-list-text">4000</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="property-grid-list-icon">
                                        <img src="assets/img/icon/property-single-icon1-8.svg" alt="img" />
                                    </div>
                                    <div className="property-grid-list-details">
                                        <h4 className="property-grid-list-title">Parking</h4>
                                        <p className="property-grid-list-text">Yes</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="property-grid-list-icon">
                                        <img src="assets/img/icon/property-single-icon1-9.svg" alt="img" />
                                    </div>
                                    <div className="property-grid-list-details">
                                        <h4 className="property-grid-list-title">Elevator</h4>
                                        <p className="property-grid-list-text">Yes</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="property-grid-list-icon">
                                        <img src="assets/img/icon/property-single-icon1-10.svg" alt="img" />
                                    </div>
                                    <div className="property-grid-list-details">
                                        <h4 className="property-grid-list-title">Wifi</h4>
                                        <p className="property-grid-list-text">Yes</p>
                                    </div>
                                </li>
                            </ul>
                            <h3 className="page-title mt-50 mb-30">From Our Gallery</h3>
                            <div className="row gy-4">
                                <div className="col-xl-5">
                                    <div className="property-gallery-card">
                                        <div className="property-gallery-card-img">
                                            <img className="w-100" src="/assets/pic/propertydetails1.jpg" alt="img" />
                                        </div>
                                        <a className="icon-btn popup-image" href="/assets/pic/propertydetails1.jpg"><i className="fal fa-magnifying-glass-plus"></i></a>
                                    </div>
                                </div>  
                                <div className="col-xl-7">
                                    <div className="property-gallery-card">
                                        <div className="property-gallery-card-img">
                                            <img className="w-100" src="/assets/pic/propertydetails2.jpg" alt="img" />
                                        </div>
                                        <a className="icon-btn popup-image" href="/assets/pic/propertydetails2.jpg"><i className="fal fa-magnifying-glass-plus"></i></a>
                                    </div>
                                </div>
                                <div className="col-xl-7">
                                    <div className="property-gallery-card">
                                        <div className="property-gallery-card-img">
                                            <img className="w-100" src="/assets/pic/propertydetails3.jpg" alt="img" />
                                        </div>
                                        <a className="icon-btn popup-image" href="/assets/pic/propertydetails3.jpg"><i className="fal fa-magnifying-glass-plus"></i></a>
                                    </div>
                                </div>
                                <div className="col-xl-5">
                                    <div className="property-gallery-card">
                                        <div className="property-gallery-card-img">
                                            <img className="w-100" src="/assets/pic/propertydetails4.jpg" alt="img" />
                                        </div>
                                        <a className="icon-btn popup-image" href="/assets/pic/propertydetails4.jpg"><i className="fal fa-magnifying-glass-plus"></i></a>
                                    </div>
                                </div>
                            </div>
                            <h3 className="page-title mt-50 mb-25">Features & amenities</h3>
                            <div className="row gy-3">
                                <div className="col-xxl-3 col-sm-6">
                                    <div className="checklist">
                                        <ul>
                                            <li><i className="far fa-square-check"></i>Airconditioning</li>
                                            <li><i className="far fa-square-check"></i>Balcony</li>
                                            <li><i className="far fa-square-check"></i>Garage</li>
                                            <li><i className="far fa-square-check"></i>Landscaping</li>
                                            <li><i className="far fa-square-check"></i>Outdoor Kitchen</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-xxl-3 col-sm-6">
                                    <div className="checklist">
                                        <ul>
                                            <li><i className="far fa-square-check"></i>Barbeque</li>
                                            <li><i className="far fa-square-check"></i>Recreation</li>
                                            <li><i className="far fa-square-check"></i>Microwave</li>
                                            <li><i className="far fa-square-check"></i>Basketball</li>
                                            <li><i className="far fa-square-check"></i>Fireplace</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-xxl-3 col-sm-6">
                                    <div className="checklist">
                                        <ul>
                                            <li><i className="far fa-square-check"></i>24x7 Seccurity</li>
                                            <li><i className="far fa-square-check"></i>Indoor Game</li>
                                            <li><i className="far fa-square-check"></i>Pool</li>
                                            <li><i className="far fa-square-check"></i>Tanis Courts</li>
                                            <li><i className="far fa-square-check"></i>Internet</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-xxl-3 col-sm-6">
                                    <div className="checklist">
                                        <ul>
                                            <li><i className="far fa-square-check"></i>Jaguzzi</li>
                                            <li><i className="far fa-square-check"></i>Modern Kitchen</li>
                                            <li><i className="far fa-square-check"></i>Refrigerator</li>
                                            <li><i className="far fa-square-check"></i>Window Coverings</li>
                                            <li><i className="far fa-square-check"></i>Washer</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <h3 className="page-title mt-45 mb-30">Location</h3>
                            <div className="location-map">
                                <div className="contact-map">
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3644.7310056272386!2d89.2286059153658!3d24.00527418490799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fe9b97badc6151%3A0x30b048c9fb2129bc!2sAngfuztheme!5e0!3m2!1sen!2sbd!4v1651028958211!5m2!1sen!2sbd" allowfullscreen="" loading="lazy"></iframe>
                                </div>
                                <div className="location-map-address">
                                    <div className="thumb">
                                        <img src="/assets/pic/contactmap.jpg" alt="img" />
                                    </div>
                                    <div className="media-body">
                                        <h4 className="title">Address:</h4>
                                        <p className="text">Brooklyn, New York 11233, United States</p>
                                        <h4 className="title">Post Code:</h4>
                                        <p className="text">12345</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row align-items-center justify-content-between">
                                <div className="col-lg-auto">
                                    <h3 className="page-title mt-50 mb-30">Floor Plan</h3>
                                </div>
                                <div className="col-lg-auto">
                                    <ul className="nav nav-tabs property-tab mt-50" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link active" id="floor-tab1" data-bs-toggle="tab" data-bs-target="#floor-tab1-pane" type="button" role="tab" aria-controls="floor-tab1-pane" aria-selected="true">First Floor</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="floor-tab2" data-bs-toggle="tab" data-bs-target="#floor-tab2-pane" type="button" role="tab" aria-controls="floor-tab2-pane" aria-selected="false">Second Floor</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="floor-tab3" data-bs-toggle="tab" data-bs-target="#floor-tab3-pane" type="button" role="tab" aria-controls="floor-tab3-pane" aria-selected="false">Third Floor</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="floor-tab4" data-bs-toggle="tab" data-bs-target="#floor-tab4-pane" type="button" role="tab" aria-controls="floor-tab4-pane" aria-selected="false">Top Garden </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="tab-content">
                                <div className="tab-pane fade show active" id="floor-tab1-pane" role="tabpanel" aria-labelledby="floor-tab1" tabindex="0">
                                    <div className="property-grid-plan">
                                        <div className="property-grid-thumb">
                                            <img src="/assets/pic/resized_image.png" alt="img" />
                                        </div>
                                        <div className="property-grid-details">
                                            <h4 className="property-grid-title">First Floor </h4>
                                            <p className="property-grid-text">doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="floor-tab2-pane" role="tabpanel" aria-labelledby="floor-tab2" tabindex="0">
                                    <div className="property-grid-plan">
                                        <div className="property-grid-thumb">
                                            <img src="/assets/pic/resized_image.png" alt="img" />
                                        </div>
                                        <div className="property-grid-details">
                                            <h4 className="property-grid-title">Second Floor </h4>
                                            <p className="property-grid-text">doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="floor-tab3-pane" role="tabpanel" aria-labelledby="floor-tab3" tabindex="0">
                                    <div className="property-grid-plan">
                                        <div className="property-grid-thumb">
                                            <img src="/assets/pic/resized_image.png" alt="img" />
                                        </div>
                                        <div className="property-grid-details">
                                            <h4 className="property-grid-title">Third Floor </h4>
                                            <p className="property-grid-text">doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="floor-tab4-pane" role="tabpanel" aria-labelledby="floor-tab4" tabindex="0">
                                    <div className="property-grid-plan">
                                        <div className="property-grid-thumb">
                                            <img src="/assets/pic/resized_image.png" alt="img" />
                                        </div>
                                        <div className="property-grid-details">
                                            <h4 className="property-grid-title">Top Garden </h4>
                                            <p className="property-grid-text">doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h3 className="page-title mt-50 mb-30">Property Video</h3>
                            <div className="video-box2 mb-30">
                                <img src="/assets/pic/propertyvideo.jpg" alt="img" />
                                <a href="https://www.youtube.com/watch?v=_sI_Ps7JSEk" className="play-btn style4 popup-video"><i className="fa-sharp fa-solid fa-play"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xxl-4 col-lg-5">
                    <aside className="sidebar-area">
                        <div className="widget widget-property-contact">
                            <h4 className="widget_subtitle">For Rent</h4>
                            <h4 className="widget_price">$45, 000, 000</h4>
                            <p className="widget_text">I am interested in this property</p>
                            <form action="#" className="widget-property-contact-form">
                                <div className="form-group">
                                    <input type="text" className="form-control style-border" placeholder="Name" />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control style-border" placeholder="Email Address" />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control style-border" placeholder="Phone Number" />
                                </div>
                                <button className="th-btn style-white th-btn-icon mt-15">Request Al Video</button>
                            </form>
                        </div>
                        <div className="widget  ">
                            <h3 className="widget_title">Featured Listing</h3>
                            <div className="recent-post-wrap">
                                <div className="recent-post">
                                    <div className="media-img">
                                        <a href=""><img src="/assets/pic/blog5.avif" alt="Blog Image" /></a>
                                    </div>
                                    <div className="media-body">
                                        <h4 className="post-title"><a className="text-inherit" href="">Exploring The Green Spaces Of Realar Residence</a></h4>
                                        <div className="recent-post-meta">
                                            <a href=""><i className="far fa-calendar"></i>22/6/2024</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="recent-post">
                                    <div className="media-img">
                                        <a href=""><img src="/assets/pic/blog6.webp" alt="Blog Image" /></a>
                                    </div>
                                    <div className="media-body">
                                        <h4 className="post-title"><a className="text-inherit" href="">Harmony With Nature Of Realar Residence</a></h4>
                                        <div className="recent-post-meta">
                                            <a href=""><i className="far fa-calendar"></i>25/6/2024</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="recent-post">
                                    <div className="media-img">
                                        <a href=""><img src="/assets/pic/blog7.png" alt="Blog Image" /></a>
                                    </div>
                                    <div className="media-body">
                                        <h4 className="post-title"><a className="text-inherit" href="">Exploring The Green Spaces Of Realar Residence</a></h4>
                                        <div className="recent-post-meta">
                                            <a href=""><i className="far fa-calendar"></i>27/6/2024</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="widget widget_banner  " 
                        style={{ backgroundImage: `url('/assets/pic/blog8.webp')`,backgroundPosition:'center' }}>
                            <div className="widget-banner text-center">
                                <h3 className="title">Need Help? We Are Here To Help You</h3>
                                <div className="logo"><img src="assets/img/logo.svg" alt="img" /></div>
                                <h4 className="subtitle">You Get Online support</h4>
                                <h5 className="link"><a href="tel:256214203215">+256 214 203 215</a></h5>
                                <a href="" className="th-btn style-border th-btn-icon">Read More</a>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    </section>


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
  );
}
