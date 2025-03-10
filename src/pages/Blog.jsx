import React from "react";
import Navbar from "./Navbar";
import { useEffect } from "react";
import gsap from "gsap";
import $ from "jquery";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Footer2 from "./Footer2";
gsap.registerPlugin(ScrollToPlugin);
export default function Blog() {
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
                <h1 className="breadcumb-title">Blog Post</h1>
                <ul className="breadcumb-menu">
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>Blog</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!--Blog Area--> */}
    <section className="th-blog-wrapper space-top space-extra-bottom">
        <div className="container">
            <div className="row">
                <div className="col-xxl-8 col-lg-7">
                    <div className="th-blog blog-single has-post-thumbnail">
                        <div className="blog-img">
                            <a href=""><img src="assets/img/blog/blog-s-1-1.jpg" alt="Blog Image" /></a>
                        </div>
                        <div className="blog-content">
                            <div className="blog-meta">
                                <a className="author" href=""><i className="far fa-user"></i>by David Smith</a>
                                <a href=""><i className="far fa-clock"></i>05 June, 2024</a>
                                <a href=""><i className="far fa-house-building"></i>Modern House</a>
                            </div>
                            <h2 className="blog-title"><a href="">Living sustainability: A day in the life at realar residences</a></h2>
                            <p className="blog-text">Uniquely pursue emerging experiences before liemerging content. Efficiently underwhelm customer directed total linkage after B2C synergy. Dynamically simplify superior human capital whereas efficient infrastructures generate business web-readiness after wireless outsourcing.</p>
                            <a href="/BlogDetails" className="th-btn style-border2 th-btn-icon">Read More</a>
                        </div>
                    </div>

                    <div className="th-blog blog-single has-post-thumbnail">
                        <div className="blog-img th-slider" data-slider-options='{"effect":"fade"}'>
                            <div className="swiper-wrapper">
                                <div className="swiper-slide">
                                    <a href=""><img src="assets/img/blog/blog-s-1-2.jpg" alt="Blog Image" /></a>
                                </div>
                                <div className="swiper-slide">
                                    <a href=""><img src="assets/img/blog/blog-s-1-3.jpg" alt="Blog Image" /></a>
                                </div>
                            </div>
                            <button className="slider-arrow slider-prev"><i className="far fa-arrow-left"></i></button>
                            <button className="slider-arrow slider-next"><i className="far fa-arrow-right"></i></button>
                        </div>
                        <div className="blog-content">
                            <div className="blog-meta">
                                <a className="author" href=""><i className="far fa-user"></i>by David Smith</a>
                                <a href=""><i className="far fa-clock"></i>10 June, 2024</a>
                                <a href=""><i className="far fa-house-building"></i>Modern House</a>
                            </div>
                            <h2 className="blog-title"><a href="">Exploring The Green Spaces Of Realar Residence Harmony with Nature</a></h2>
                            <p className="blog-text">Uniquely pursue emerging experiences before liemerging content. Efficiently underwhelm customer directed total linkage after B2C synergy. Dynamically simplify superior human capital whereas efficient infrastructures generate business web-readiness after wireless outsourcing.</p>
                            <a href="" className="th-btn style-border2 th-btn-icon">Read More</a>
                        </div>
                    </div>

                    <div className="th-blog blog-single">
                        <div className="blog-content">
                            <div className="blog-meta">
                                <a className="author" href=""><i className="far fa-user"></i>by David Smith</a>
                                <a href=""><i className="far fa-clock"></i>12 June, 2024</a>
                                <a href=""><i className="far fa-house-building"></i>Modern House</a>
                            </div>
                            <h2 className="blog-title"><a href="">Enrich Your Mind Envision Your Future Education for Success</a>
                            </h2>
                            <p className="blog-text">An effective marketing involves market research target audience identification, competitive. providing opportunities for professional growth a maintaining positive work environment. To enhance online presence, consider optimizing your web utilizing social with your channels</p>
                            <a href="" className="th-btn style-border2 th-btn-icon">Read More</a>
                        </div>
                    </div>

                    <div className="th-blog blog-single has-post-thumbnail">
                        <div className="blog-img" data-overlay="black" data-opacity="5">
                            <a href=""><img src="assets/img/blog/blog-s-1-3.jpg" alt="Blog Image" /></a>
                            <a href="https://www.youtube.com/watch?v=_sI_Ps7JSEk" className="play-btn popup-video"><i className="fas fa-play"></i></a>
                        </div>
                        <div className="blog-content">
                            <div className="blog-meta">
                                <a className="author" href=""><i className="far fa-user"></i>by David Smith</a>
                                <a href=""><i className="far fa-clock"></i>12 June, 2024</a>
                                <a href=""><i className="far fa-house-building"></i>Modern House</a>
                            </div>
                            <h2 className="blog-title"><a href="">University class starting soon while the lovely valley team work</a>
                            </h2>
                            <p className="blog-text">From strategic planning to operational optimization, our business consulting team is committed to guiding you through every stage of development, ensuring sustainable growth.Our seasoned consultants bring a wealth of experience to the table.</p>
                            <a href="" className="th-btn style-border2 th-btn-icon">Read More</a>
                        </div>
                    </div>

                    <div className="th-blog blog-single has-post-thumbnail">
                        <div className="blog-audio">
                            <iframe title="Tell Me U Luv Me (with Trippie Redd) by Juice WRLD" src="https://w.soundcloud.com/player/?visual=true&amp;url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F830279092&amp;show_artwork=true&amp;maxwidth=751&amp;maxheight=1000&amp;dnt=1"></iframe>
                        </div>
                        <div className="blog-content">
                            <div className="blog-meta">
                                <a className="author" href=""><i className="far fa-user"></i>by David Smith</a>
                                <a href=""><i className="far fa-clock"></i>12 June, 2024</a>
                                <a href=""><i className="far fa-house-building"></i>Modern House</a>
                            </div>
                            <h2 className="blog-title"><a href="">Discover unparalleled expertise in market</a>
                            </h2>
                            <p className="blog-text">Take the first step towards a brighter business future. Contact us today to explore how our business consulting services can drive innovation, increase efficiency, and position your company for enduring success. At the core of our business consulting philosophy.</p>
                            <a href="" className="th-btn style-border2 th-btn-icon">Read More</a>
                        </div>
                    </div>

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
                <div className="col-xxl-4 col-lg-5">
                    <aside className="sidebar-area">
                        <div className="widget widget_search  ">
                            <form className="search-form">
                                <input type="text" placeholder="Search..." />
                                <button type="submit"><i className="far fa-search"></i></button>
                            </form>
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
                        <div className="widget widget_banner  " style={{ backgroundImage: `url('assets/img/widget/widget-banner.png')` }}>
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
