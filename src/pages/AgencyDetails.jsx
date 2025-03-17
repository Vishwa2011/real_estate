import React from "react";
import { useEffect } from "react";
import gsap from "gsap";
 import $ from "jquery";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Footer2 from "./Footer2";
import Navbar from "./Navbar";
gsap.registerPlugin(ScrollToPlugin);
export default function AgencyDetails() {
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
        style={{ backgroundImage: `url('/assets/pic/agencydetailsmain.jpg')`,backgroundPosition:'center' }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-9">
              <div className="breadcumb-content">
                <h1 className="breadcumb-title">Agency Details</h1>
                <ul className="breadcumb-menu">
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>Agency Details</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
     

      {/* <!--Property Page Area--> */}
    <section className="space-top space-extra-bottom">
        <div className="container">
            <div className="row gx-30">
                <div className="col-xxl-8 col-lg-7">
                    <div className="agency-page-single">
                        <div className="page-content">
                            <div className="agency-page-img">
                                <div className="thumb">
                                    <img src="/assets/pic/agencydetails2.jpg" alt="Blog Image" />
                                </div>
                                <div className="agency-card-brand">
                                    <img src="assets/img/brand/brand_1_2.svg" alt="img" />
                                </div>
                            </div>
                            <div className="row justify-content-between align-items-center">
                                <div className="col-lg-6">
                                    <h2 className="page-title h4 text-theme mb-0 mt-15">Town House</h2>
                                    <p className="text-theme">Brooklyn, New York 11233, United States</p>
                                </div>
                                <div className="col-lg-auto">
                                    <h4 className="text-theme h5 mb-2">Contact Info</h4>
                                    <p className="mb-0 text-theme"><i className="far fa-phone me-2"></i><strong className="fw-medium">0123456789</strong></p>
                                    <p className="mb-0 text-theme"><i className="far fa-envelope me-2"></i><strong className="fw-medium">exampleinfo@realar.com</strong></p>
                                </div>
                            </div>

                            <p className="mb-30 text-theme mt-40">Welcome to our stylish and spacious property. This gem offers a modern and comfortable retreat for up to four guests. Upon entering, you'll be greeted by a tastefully furnished living room, featuring a cozy sofa, a large TV, and a dining area with seating for four.</p>
                            <p className="mb-30 text-theme">The open-concept layout seamlessly connects the living room with the fully equipped kitchen, boasting top-of-the-line appliances and all the essentials for preparing delicious meals.</p>

                            <h3 className="page-title mt-45 mb-30 h4 text-theme">Location</h3>
                            <div className="location-map mb-60">
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
                                    <ul className="nav nav-tabs property-tab mb-40" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link active" id="rent-tab" data-bs-toggle="tab" data-bs-target="#rent-tab-pane" type="button" role="tab" aria-controls="rent-tab-pane" aria-selected="true">For Rent</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="buy-tab" data-bs-toggle="tab" data-bs-target="#buy-tab-pane" type="button" role="tab" aria-controls="buy-tab-pane" aria-selected="false">For Sale</button>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-lg-auto">
                                    <div className="icon-box mb-40">
                                        <button data-slider-prev=".property-single-slider" className="slider-arrow style5 default slider-prev"><img src="assets/img/icon/arrow-left.svg" alt="" /></button>
                                        <button data-slider-next=".property-single-slider" className="slider-arrow style5 default slider-next"><img src="assets/img/icon/arrow-right.svg" alt="" /></button>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-content property-tab-content mb-60">
                                <div className="tab-pane fade show active" id="rent-tab-pane" role="tabpanel" aria-labelledby="rent-tab" tabindex="0">
                                    <div className="slider-area property-slider2">
                                        <div className="swiper th-slider property-single-slider" data-slider-options='{"breakpoints":{"0":{"slidesPerView":1},"576":{"slidesPerView":"1"},"768":{"slidesPerView":"2"},"992":{"slidesPerView":"1"},"1200":{"slidesPerView":"2"},"1500":{"slidesPerView":"2"}}}'>
                                            <div className="swiper-wrapper">
                                                <div className="swiper-slide">
                                                    <div className="property-card2">
                                                        <div className="property-card-thumb img-shine">
                                                            <img src="/assets/pic/agency1.jpg" alt="img" />
                                                        </div>
                                                        <div className="property-card-details">
                                                            <div className="media-left">
                                                                <h4 className="property-card-title"><a href="">Toronto Townhouse</a></h4>
                                                                <h5 className="property-card-price">$ 1500.00 USD/night</h5>
                                                                <p className="property-card-location">2715 Ash, South Dakota 83475</p>
                                                            </div>
                                                            <div className="btn-wrap">
                                                                <a href="" className="th-btn style-border2 th-btn-icon">Details</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="swiper-slide">
                                                    <div className="property-card2">
                                                        <div className="property-card-thumb img-shine">
                                                            <img src="/assets/pic/agency5.jpg" alt="img" />
                                                        </div>
                                                        <div className="property-card-details">
                                                            <div className="media-left">
                                                                <h4 className="property-card-title"><a href="">Serenity Villa</a></h4>
                                                                <h5 className="property-card-price">$ 1500.00 USD/night</h5>
                                                                <p className="property-card-location">2715 Ash, South Dakota 83475</p>
                                                            </div>
                                                            <div className="btn-wrap">
                                                                <a href="" className="th-btn style-border2 th-btn-icon">Details</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="swiper-slide">
                                                    <div className="property-card2">
                                                        <div className="property-card-thumb img-shine">
                                                            <img src="/assets/pic/agency2.jpg" alt="img" />
                                                        </div>
                                                        <div className="property-card-details">
                                                            <div className="media-left">
                                                                <h4 className="property-card-title"><a href="">House in Broklyn</a></h4>
                                                                <h5 className="property-card-price">$ 1500.00 USD/night</h5>
                                                                <p className="property-card-location">4321 Maple Drive, Autumnville, FL 98765</p>
                                                            </div>
                                                            <div className="btn-wrap">
                                                                <a href="" className="th-btn style-border2 th-btn-icon">Details</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="swiper-slide">
                                                    <div className="property-card2">
                                                        <div className="property-card-thumb img-shine">
                                                            <img src="/assets/pic/agency3.jpg" alt="img" />
                                                        </div>
                                                        <div className="property-card-details">
                                                            <div className="media-left">
                                                                <h4 className="property-card-title"><a href="">House in Brickhall</a></h4>
                                                                <h5 className="property-card-price">$ 1500.00 USD/night</h5>
                                                                <p className="property-card-location">8023 Willow Lane, Whispering Pines, GA 97531</p>
                                                            </div>
                                                            <div className="btn-wrap">
                                                                <a href="" className="th-btn style-border2 th-btn-icon">Details</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="buy-tab-pane" role="tabpanel" aria-labelledby="buy-tab" tabindex="0">
                                    <div className="slider-area property-slider2">
                                        <div className="swiper th-slider property-single-slider" data-slider-options='{"breakpoints":{"0":{"slidesPerView":1},"576":{"slidesPerView":"1"},"768":{"slidesPerView":"2"},"992":{"slidesPerView":"1"},"1200":{"slidesPerView":"2"},"1500":{"slidesPerView":"2"}}}'>
                                            <div className="swiper-wrapper">
                                                <div className="swiper-slide">
                                                    <div className="property-card2">
                                                        <div className="property-card-thumb img-shine">
                                                            <img src="/assets/pic/agency6.jpg" alt="img" />
                                                        </div>
                                                        <div className="property-card-details">
                                                            <div className="media-left">
                                                                <h4 className="property-card-title"><a href="">Emma House</a></h4>
                                                                <h5 className="property-card-price">$ 1500.00 USD/night</h5>
                                                                <p className="property-card-location">8642 Magnolia Drive, Sunsetville, OR 75319</p>
                                                            </div>
                                                            <div className="btn-wrap">
                                                                <a href="" className="th-btn style-border2 th-btn-icon">Details</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="swiper-slide">
                                                    <div className="property-card2">
                                                        <div className="property-card-thumb img-shine">
                                                            <img src="/assets/pic/agency4.jpg" alt="img" />
                                                        </div>
                                                        <div className="property-card-details">
                                                            <div className="media-left">
                                                                <h4 className="property-card-title"><a href="">Town House</a></h4>
                                                                <h5 className="property-card-price">$ 1500.00 USD/night</h5>
                                                                <p className="property-card-location">8642 Magnolia Drive, Sunsetville, OR 75319</p>
                                                            </div>
                                                            <div className="btn-wrap">
                                                                <a href="" className="th-btn style-border2 th-btn-icon">Details</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="swiper-slide">
                                                    <div className="property-card2">
                                                        <div className="property-card-thumb img-shine">
                                                            <img src="/assets/pic/agency3.jpg" alt="img" />
                                                        </div>
                                                        <div className="property-card-details">
                                                            <div className="media-left">
                                                                <h4 className="property-card-title"><a href="">Toronto Townhouse</a></h4>
                                                                <h5 className="property-card-price">$ 1500.00 USD/night</h5>
                                                                <p className="property-card-location">2715 Ash, South Dakota 83475</p>
                                                            </div>
                                                            <div className="btn-wrap">
                                                                <a href="" className="th-btn style-border2 th-btn-icon">Details</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="swiper-slide">
                                                    <div className="property-card2">
                                                        <div className="property-card-thumb img-shine">
                                                            <img src="/assets/pic/agency5.jpg" alt="img" />
                                                        </div>
                                                        <div className="property-card-details">
                                                            <div className="media-left">
                                                                <h4 className="property-card-title"><a href="">Serenity Villa</a></h4>
                                                                <h5 className="property-card-price">$ 1500.00 USD/night</h5>
                                                                <p className="property-card-location">2715 Ash, South Dakota 83475</p>
                                                            </div>
                                                            <div className="btn-wrap">
                                                                <a href="p" className="th-btn style-border2 th-btn-icon">Details</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="row align-items-center justify-content-between">
                                <div className="col-lg-auto">
                                    <h4 className="text-theme mb-40">Agents</h4>
                                </div>
                                <div className="col-lg-auto">
                                    <div className="icon-box mb-40">
                                        <button data-slider-prev=".agent-slider1" className="slider-arrow style5 default slider-prev"><img src="assets/img/icon/arrow-left.svg" alt="" /></button>
                                        <button data-slider-next=".agent-slider1" className="slider-arrow style5 default slider-next"><img src="assets/img/icon/arrow-right.svg" alt="" /></button>
                                    </div>
                                </div>
                            </div>
                            <div className="slider-area mb-30">
                                <div className="swiper th-slider agent-slider1" data-slider-options='{"breakpoints":{"0":{"slidesPerView":1},"576":{"slidesPerView":"1"},"768":{"slidesPerView":"2"},"992":{"slidesPerView":"1"},"1200":{"slidesPerView":"2"}}}'>
                                    <div className="swiper-wrapper">
                                        {/* <!-- Single Item --> */}
                                        <div className="swiper-slide">
                                            <div className="th-team team-card style4">
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
                                            <div className="th-team team-card style4">
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
                                            <div className="th-team team-card style4">
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
                                            <div className="th-team team-card style4">
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
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xxl-4 col-lg-5">
                    <aside className="sidebar-area">
                        <div className="widget widget_search  ">
                            <form className="search-form">
                                <input type="text" placeholder="Search..." />
                                <button type="submit"><i className="far fa-search"></i></button>
                            </form>
                        </div>
                        <div className="widget  ">
                            <h3 className="widget_title">Recent Posts</h3>
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
                        <div className="widget widget_categories  ">
                            <h3 className="widget_title">Post Categories</h3>
                            <ul>
                                <li>
                                    <a href="">Apartment <span>(8)</span></a>

                                </li>
                                <li>
                                    <a href="">Real Estate <span>(10)</span></a>
                                </li>
                                <li>
                                    <a href="">Property <span>(12)</span></a>
                                </li>
                                <li>
                                    <a href="">News & Tips <span>(6)</span></a>
                                </li>
                                <li>
                                    <a href="">Modern Houses <span>(8)</span></a>
                                </li>
                                <li>
                                    <a href="">Banglow <span>(11)</span></a>
                                </li>
                            </ul>
                        </div>
                        <div className="widget widget_tag_cloud  ">
                            <h3 className="widget_title">Popular Tags</h3>
                            <div className="tagcloud">
                                <a href="">Business</a>
                                <a href="">Buyer</a>
                                <a href="">Rent</a>
                                <a href="">Innovate</a>
                                <a href="">Real estate</a>
                                <a href="">Modern</a>
                                <a href="">Luxury</a>
                                <a href="">Sale</a>
                            </div>
                        </div>
                        <div className="widget widget_banner  " 
                        style={{ backgroundImage: `url('assets/pic/blog8.webp')` }}>
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
  )
}
