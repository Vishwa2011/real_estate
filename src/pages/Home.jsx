import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);

export default function Home() {
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
      {/* <!--Hero Area--> */}
      <div className="hero-1" id="hero">
        <div
          className="swiper th-slider hero-slider1"
          id="heroSlide1"
          data-slider-options='{"effect":"fade", "autoHeight": "true"}'
        >
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div
                className="hero-inner"
                data-mask-src="assets/img/hero/hero_1_bg_mask.png"
              >
                <div
                  className="th-hero-bg"
                  data-bg-src="assets/img/hero/hero_bg_1_1.jpg"
                ></div>
                <div className="hero-big-text">REALAR</div>
                <div className="container">
                  <div className="row align-items-center">
                    <div className="col-lg-8">
                      <div className="hero-style1">
                        <h1 className="hero-title text-white">
                          <span
                            className="title1"
                            data-ani="slideindown"
                            data-ani-delay="0.3s"
                          >
                            Top Notch{" "}
                          </span>
                          <span
                            className="title2"
                            data-ani="slideindown"
                            data-ani-delay="0.4s"
                          >
                            Living Space{" "}
                          </span>
                        </h1>
                        <p
                          className="hero-text text-white"
                          data-ani="slideinup"
                          data-ani-delay="0.5s"
                        >
                          Bringing together a team with passion, dedication, and
                          resources to help our clients reach their buying and
                          selling goals. We are with you every step of the way.
                        </p>
                        <a
                          href="property.html"
                          className="th-btn btn-mask th-btn-icon"
                          data-ani="slideinup"
                          data-ani-delay="0.6s"
                        >
                          Explore Properties
                        </a>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div
                        className="hero-video-wrap text-center"
                        data-ani="slideinright"
                        data-ani-delay="0.4s"
                      >
                        <a
                          href="https://www.youtube.com/watch?v=_sI_Ps7JSEk"
                          className="play-btn style2 popup-video"
                        >
                          <i className="fa-sharp fa-solid fa-play"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="swiper-slide">
              <div
                className="hero-inner"
                data-mask-src="assets/img/hero/hero_1_bg_mask.png"
              >
                <div
                  className="th-hero-bg"
                  data-bg-src="assets/img/hero/hero_bg_1_2.jpg"
                ></div>
                <div className="hero-big-text">REALAR</div>
                <div className="container">
                  <div className="row align-items-center">
                    <div className="col-lg-8">
                      <div className="hero-style1">
                        <h1 className="hero-title text-white">
                          <span
                            className="title1"
                            data-ani="slideindown"
                            data-ani-delay="0.3s"
                          >
                            Discover Your{" "}
                          </span>
                          <span
                            className="title2"
                            data-ani="slideindown"
                            data-ani-delay="0.4s"
                          >
                            Flexible Living House{" "}
                          </span>
                        </h1>
                        <p
                          className="hero-text text-white"
                          data-ani="slideinup"
                          data-ani-delay="0.5s"
                        >
                          Bringing together a team with passion, dedication, and
                          resources to help our clients reach their buying and
                          selling goals. We are with you every step of the way.
                        </p>
                        <a
                          href="property.html"
                          className="th-btn btn-mask th-btn-icon"
                          data-ani="slideinup"
                          data-ani-delay="0.6s"
                        >
                          Explore Properties
                        </a>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div
                        className="hero-video-wrap text-center"
                        data-ani="slideinright"
                        data-ani-delay="0.4s"
                      >
                        <a
                          href="https://www.youtube.com/watch?v=_sI_Ps7JSEk"
                          className="play-btn style2 popup-video"
                        >
                          <i className="fa-sharp fa-solid fa-play"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="swiper-slide">
              <div
                className="hero-inner"
                data-mask-src="assets/img/hero/hero_1_bg_mask.png"
              >
                <div
                  className="th-hero-bg"
                  data-bg-src="assets/img/hero/hero_bg_1_3.jpg"
                ></div>
                <div className="hero-big-text">REALAR</div>
                <div className="container">
                  <div className="row align-items-center">
                    <div className="col-lg-8">
                      <div className="hero-style1">
                        <h1 className="hero-title text-white">
                          <span
                            className="title1"
                            data-ani="slideindown"
                            data-ani-delay="0.3s"
                          >
                            Elevate Lifestyle{" "}
                          </span>
                          <span
                            className="title2"
                            data-ani="slideindown"
                            data-ani-delay="0.4s"
                          >
                            Luxury Meets Comfort{" "}
                          </span>
                        </h1>
                        <p
                          className="hero-text text-white"
                          data-ani="slideinup"
                          data-ani-delay="0.5s"
                        >
                          Bringing together a team with passion, dedication, and
                          resources to help our clients reach their buying and
                          selling goals. We are with you every step of the way.
                        </p>
                        <a
                          href="property.html"
                          className="th-btn btn-mask th-btn-icon"
                          data-ani="slideinup"
                          data-ani-delay="0.6s"
                        >
                          Explore Properties
                        </a>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div
                        className="hero-video-wrap text-center"
                        data-ani="slideinright"
                        data-ani-delay="0.4s"
                      >
                        <a
                          href="https://www.youtube.com/watch?v=_sI_Ps7JSEk"
                          className="play-btn style2 popup-video"
                        >
                          <i className="fa-sharp fa-solid fa-play"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="slider-pagination"></div>
        </div>
        <div className="hero-social-link">
          <div className="social-wrap">
            <a href="https://facebook.com/">FACEBOOK</a>
            <a href="https://instagram.com/">INSTAGRAM</a>
            <a href="https://twitter.com/">TWITTER</a>
          </div>
        </div>
        <div className="scroll-down">
          <a href="#about-sec" className="hero-scroll-wrap">
            <i className="fal fa-long-arrow-left"></i>Scroll
          </a>
        </div>
      </div>
      {/* <!--Counter Area --> */}
      <div className="counter-area-1 bg-smoke">
        <div className="container">
          <div className="counter-card-wrap space">
            <div className="counter-card">
              <div className="media-body">
                <h2 className="box-number">
                  <span className="counter-number">850</span>+
                </h2>
                <p className="box-text">ELEGANT APARTMENTS</p>
              </div>
            </div>
            <div className="counter-card">
              <div className="media-body">
                <h2 className="box-number">
                  <span className="counter-number">950</span>+
                </h2>
                <p className="box-text">LUXURY HOUSES</p>
              </div>
            </div>
            <div className="counter-card">
              <div className="media-body">
                <h2 className="box-number">
                  <span className="counter-number">18</span>k+
                </h2>
                <p className="box-text">SATISFIED GUESTS</p>
              </div>
            </div>
            <div className="counter-card">
              <div className="media-body">
                <h2 className="box-number">
                  <span className="counter-number">2</span>k+
                </h2>
                <p className="box-text">HAPPY OWNERS</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* footer start  */}
      <Footer />
      {/* footer end  */}

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
