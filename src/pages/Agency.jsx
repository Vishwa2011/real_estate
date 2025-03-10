import React from "react";
import { useEffect } from "react";
import gsap from "gsap";
 import $ from "jquery";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Footer2 from "./Footer2";
import Navbar from "./Navbar";
gsap.registerPlugin(ScrollToPlugin);
export default function Agency() {
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
        style={{ backgroundImage: `url('assets/img/bg/breadcumb-bg.jpg')`,backgroundPosition:'center' }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-9">
              <div className="breadcumb-content">
                <h1 className="breadcumb-title">Agencies</h1>
                <ul className="breadcumb-menu">
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>Agencies</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!--Property Page Area--> */}
    <section className="space-top space-extra-bottom">
        <div className="container">
            <div className="th-sort-bar">
                <div className="row justify-content-between align-items-center">
                    <div className="col-md">
                        <h2 className="fw-medium">All Agencies</h2>
                    </div>

                    <div className="col-md-auto">
                        <div className="sorting-filter-wrap">
                            <form className="woocommerce-ordering" method="get">
                                <select name="orderby" className="orderby" aria-label="Shop order">
                                    <option value="menu_order" selected="selected">Default Sorting</option>
                                    <option value="popularity">Sort by popularity</option>
                                    <option value="rating">Sort by average rating</option>
                                    <option value="date">Sort by latest</option>
                                    <option value="price">Sort by price: low to high</option>
                                    <option value="price-desc">Sort by price: high to low</option>
                                </select>
                            </form>
                            <div className="nav" role="tablist">
                                <a className="active" href="#" id="tab-shop-list" data-bs-toggle="tab" data-bs-target="#tab-list" role="tab" aria-controls="tab-grid" aria-selected="false"><i className="fa-light fa-grid-2"></i></a>
                                <a href="#" id="tab-shop-grid" data-bs-toggle="tab" data-bs-target="#tab-grid" role="tab" aria-controls="tab-grid" aria-selected="true"><i className="fa-solid fa-list"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xxl-8 col-lg-7">
                    <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane fade active show" id="tab-list" role="tabpanel" aria-labelledby="tab-shop-list">
                            <div className="row gy-40">
                                <div className="col-md-6">
                                    <div className="agency-card">
                                        <div className="agency-card-img">
                                            <img src="assets/img/agency/1-1.png" alt="img" />
                                            <div className="agency-card-brand">
                                                <img src="assets/img/brand/brand_1_1.svg" alt="" />
                                            </div>
                                        </div>
                                        <div className="agency-card-details">
                                            <h4 className="agency-card-title"><a href="">House in NY</a></h4>
                                            <p className="agency-card-text">Brooklyn, New York 11233, United States</p>
                                            <div className="agency-card-meta">
                                                <div className="media-left">
                                                    <p className="agency-card-text"><i className="far fa-phone"></i><strong>0123456789</strong></p>
                                                    <p className="agency-card-text"><i className="far fa-envelope"></i><strong>exampleinfo@realar.com</strong></p>
                                                </div>
                                                <div className="btn-wrap">
                                                    <a href="/AgencyDetails" className="th-btn style-border2 th-btn-icon">Details</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="agency-card">
                                        <div className="agency-card-img">
                                            <img src="assets/img/agency/1-2.png" alt="img" />
                                            <div className="agency-card-brand">
                                                <img src="assets/img/brand/brand_1_2.svg" alt="" />
                                            </div>
                                        </div>
                                        <div className="agency-card-details">
                                            <h4 className="agency-card-title"><a href="">House in Broklyn</a></h4>
                                            <p className="agency-card-text">4321 Maple Drive, Autumnville, FL 98765</p>
                                            <div className="agency-card-meta">
                                                <div className="media-left">
                                                    <p className="agency-card-text"><i className="far fa-phone"></i><strong>0123456789</strong></p>
                                                    <p className="agency-card-text"><i className="far fa-envelope"></i><strong>exampleinfo@realar.com</strong></p>
                                                </div>
                                                <div className="btn-wrap">
                                                    <a href="/AgencyDetails" className="th-btn style-border2 th-btn-icon">Details</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="agency-card">
                                        <div className="agency-card-img">
                                            <img src="assets/img/agency/1-3.png" alt="img" />
                                            <div className="agency-card-brand">
                                                <img src="assets/img/brand/brand_1_3.svg" alt="" />
                                            </div>
                                        </div>
                                        <div className="agency-card-details">
                                            <h4 className="agency-card-title"><a href="">House in Brickhall</a></h4>
                                            <p className="agency-card-text">8023 Willow Lane, Whispering Pines, GA 97531</p>
                                            <div className="agency-card-meta">
                                                <div className="media-left">
                                                    <p className="agency-card-text"><i className="far fa-phone"></i><strong>0123456789</strong></p>
                                                    <p className="agency-card-text"><i className="far fa-envelope"></i><strong>exampleinfo@realar.com</strong></p>
                                                </div>
                                                <div className="btn-wrap">
                                                    <a href="/AgencyDetails" className="th-btn style-border2 th-btn-icon">Details</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="agency-card">
                                        <div className="agency-card-img">
                                            <img src="assets/img/agency/1-4.png" alt="img" />
                                            <div className="agency-card-brand">
                                                <img src="assets/img/brand/brand_1_4.svg" alt="" />
                                            </div>
                                        </div>
                                        <div className="agency-card-details">
                                            <h4 className="agency-card-title"><a href="">Town House</a></h4>
                                            <p className="agency-card-text">7531 Elm Court, Serenityville, AZ 86420</p>
                                            <div className="agency-card-meta">
                                                <div className="media-left">
                                                    <p className="agency-card-text"><i className="far fa-phone"></i><strong>0123456789</strong></p>
                                                    <p className="agency-card-text"><i className="far fa-envelope"></i><strong>exampleinfo@realar.com</strong></p>
                                                </div>
                                                <div className="btn-wrap">
                                                    <a href="/AgencyDetails" className="th-btn style-border2 th-btn-icon">Details</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="agency-card">
                                        <div className="agency-card-img">
                                            <img src="assets/img/agency/1-5.png" alt="img" />
                                            <div className="agency-card-brand">
                                                <img src="assets/img/brand/brand_1_5.svg" alt="" />
                                            </div>
                                        </div>
                                        <div className="agency-card-details">
                                            <h4 className="agency-card-title"><a href="">Serenity Villa</a></h4>
                                            <p className="agency-card-text">1357 Rose Avenue, Tranquility, NC 86420</p>
                                            <div className="agency-card-meta">
                                                <div className="media-left">
                                                    <p className="agency-card-text"><i className="far fa-phone"></i><strong>0123456789</strong></p>
                                                    <p className="agency-card-text"><i className="far fa-envelope"></i><strong>exampleinfo@realar.com</strong></p>
                                                </div>
                                                <div className="btn-wrap">
                                                    <a href="/AgencyDetails" className="th-btn style-border2 th-btn-icon">Details</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="agency-card">
                                        <div className="agency-card-img">
                                            <img src="assets/img/agency/1-6.png" alt="img" />
                                            <div className="agency-card-brand">
                                                <img src="assets/img/brand/brand_1_6.svg" alt="" />
                                            </div>
                                        </div>
                                        <div className="agency-card-details">
                                            <h4 className="agency-card-title"><a href="">Emma House</a></h4>
                                            <p className="agency-card-text">8642 Magnolia Drive, Sunsetville, OR 75319</p>
                                            <div className="agency-card-meta">
                                                <div className="media-left">
                                                    <p className="agency-card-text"><i className="far fa-phone"></i><strong>0123456789</strong></p>
                                                    <p className="agency-card-text"><i className="far fa-envelope"></i><strong>exampleinfo@realar.com</strong></p>
                                                </div>
                                                <div className="btn-wrap">
                                                    <a href="/AgencyDetails" className="th-btn style-border2 th-btn-icon">Details</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="mt-60">
                                <div className="th-pagination ">
                                    <ul>
                                        {/* <!-- <li><a className="prev-page" href=""><i className="far fa-arrow-left me-2"></i>Previous</a></li> --> */}
                                        <li><a className="active" href="">1</a></li>
                                        <li><a href="">2</a></li>
                                        <li><a href="">3</a></li>
                                        <li><a className="next-page" href="">Next<i className="far fa-arrow-right ms-2"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="tab-grid" role="tabpanel" aria-labelledby="tab-shop-grid">
                            <div className="row gy-30">
                                <div className="">
                                    <div className="agency-card style-flex">
                                        <div className="agency-card-img">
                                            <img src="assets/img/agency/1-1.png" alt="img" />
                                            <div className="agency-card-brand">
                                                <img src="assets/img/brand/brand_1_1.svg" alt="" />
                                            </div>
                                        </div>
                                        <div className="agency-card-details">
                                            <h4 className="agency-card-title"><a href="">House in NY</a></h4>
                                            <p className="agency-card-text">Welcome to our stylish and spacious property. This gem offers a modern and comfortable retreat for up to four guests. Upon entering, you'll be greeted by a tastefully furnished living room, featuring a cozy sofa, a large TV, and a dining area with seating for four.</p>
                                            <div className="agency-card-meta">
                                                <div className="media-left">
                                                    <p className="agency-card-text"><i className="far fa-phone"></i><strong>0123456789</strong></p>
                                                    <p className="agency-card-text"><i className="far fa-envelope"></i><strong>exampleinfo@realar.com</strong></p>
                                                </div>
                                                <div className="btn-wrap">
                                                    <a href="/AgencyDetails" className="th-btn style-border2 th-btn-icon">Details</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="">
                                    <div className="agency-card style-flex">
                                        <div className="agency-card-img">
                                            <img src="assets/img/agency/1-2.png" alt="img" />
                                            <div className="agency-card-brand">
                                                <img src="assets/img/brand/brand_1_2.svg" alt="" />
                                            </div>
                                        </div>
                                        <div className="agency-card-details">
                                            <h4 className="agency-card-title"><a href="">House in Broklyn</a></h4>
                                            <p className="agency-card-text">Welcome to our stylish and spacious property. This gem offers a modern and comfortable retreat for up to four guests. Upon entering, you'll be greeted by a tastefully furnished living room, featuring a cozy sofa, a large TV, and a dining area with seating for four.</p>
                                            <div className="agency-card-meta">
                                                <div className="media-left">
                                                    <p className="agency-card-text"><i className="far fa-phone"></i><strong>0123456789</strong></p>
                                                    <p className="agency-card-text"><i className="far fa-envelope"></i><strong>exampleinfo@realar.com</strong></p>
                                                </div>
                                                <div className="btn-wrap">
                                                    <a href="/AgencyDetails" className="th-btn style-border2 th-btn-icon">Details</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="">
                                    <div className="agency-card style-flex">
                                        <div className="agency-card-img">
                                            <img src="assets/img/agency/1-3.png" alt="img" />
                                            <div className="agency-card-brand">
                                                <img src="assets/img/brand/brand_1_3.svg" alt="" />
                                            </div>
                                        </div>
                                        <div className="agency-card-details">
                                            <h4 className="agency-card-title"><a href="">House in Brickhall</a></h4>
                                            <p className="agency-card-text">Welcome to our stylish and spacious property. This gem offers a modern and comfortable retreat for up to four guests. Upon entering, you'll be greeted by a tastefully furnished living room, featuring a cozy sofa, a large TV, and a dining area with seating for four.</p>
                                            <div className="agency-card-meta">
                                                <div className="media-left">
                                                    <p className="agency-card-text"><i className="far fa-phone"></i><strong>0123456789</strong></p>
                                                    <p className="agency-card-text"><i className="far fa-envelope"></i><strong>exampleinfo@realar.com</strong></p>
                                                </div>
                                                <div className="btn-wrap">
                                                    <a href="/AgencyDetails" className="th-btn style-border2 th-btn-icon">Details</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="">
                                    <div className="agency-card style-flex">
                                        <div className="agency-card-img">
                                            <img src="assets/img/agency/1-4.png" alt="img" />
                                            <div className="agency-card-brand">
                                                <img src="assets/img/brand/brand_1_4.svg" alt="" />
                                            </div>
                                        </div>
                                        <div className="agency-card-details">
                                            <h4 className="agency-card-title"><a href="">Town House</a></h4>
                                            <p className="agency-card-text">Welcome to our stylish and spacious property. This gem offers a modern and comfortable retreat for up to four guests. Upon entering, you'll be greeted by a tastefully furnished living room, featuring a cozy sofa, a large TV, and a dining area with seating for four.</p>
                                            <div className="agency-card-meta">
                                                <div className="media-left">
                                                    <p className="agency-card-text"><i className="far fa-phone"></i><strong>0123456789</strong></p>
                                                    <p className="agency-card-text"><i className="far fa-envelope"></i><strong>exampleinfo@realar.com</strong></p>
                                                </div>
                                                <div className="btn-wrap">
                                                    <a href="/AgencyDetails" className="th-btn style-border2 th-btn-icon">Details</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="mt-60">
                                <div className="th-pagination ">
                                    <ul>
                                     {/* <li><a className="prev-page" href=""><i className="far fa-arrow-left me-2"></i>Previous</a></li>  */}
                                        <li><a className="active" href="">1</a></li>
                                        <li><a href="">2</a></li>
                                        <li><a href="">3</a></li>
                                        <li><a className="next-page" href="">Next<i className="far fa-arrow-right ms-2"></i></a></li>
                                    </ul>
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
                                        <a href=""><img src="assets/img/blog/recent-post-1-1.jpg" alt="Blog Image" /></a>
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
                                        <a href=""><img src="assets/img/blog/recent-post-1-2.jpg" alt="Blog Image" /></a>
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
                                        <a href=""><img src="assets/img/blog/recent-post-1-3.jpg" alt="Blog Image" /></a>
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
                                <a href="l">Innovate</a>
                                <a href="">Real estate</a>
                                <a href="">Modern</a>
                                <a href="l">Luxury</a>
                                <a href="">Sale</a>
                            </div>
                        </div>
                        <div className="widget widget_banner  " data-bg-src="assets/img/widget/widget-banner.png">
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
