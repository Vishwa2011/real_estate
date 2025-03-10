import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect } from "react";
import CountUp from "react-countup";
import gsap from "gsap";
 import $ from "jquery";
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


const counters = [
  { value: 850, label: "ELEGANT APARTMENTS" },
  { value: 950, label: "LUXURY HOUSES" },
  { value: 18000, label: "SATISFIED GUESTS" },
  { value: 2000, label: "HAPPY OWNERS" },
];


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
                style={{ backgroundImage: `url('')`}}
              >
                <div
                  className="th-hero-bg"
                  style={{ backgroundImage: `url('')`}}
                ></div>
                {/* <div className="hero-big-text">REALAR</div> */}
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
                          href=""
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
                style={{ backgroundImage: `url('')`}}
              >
                <div
                  className="th-hero-bg"
                  style={{ backgroundImage: `url('')`}}
                ></div>
                {/* <div className="hero-big-text">REALAR</div> */}
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
                          href=""
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
                style={{ backgroundImage: `url('')`}}
              >
                <div
                  className="th-hero-bg"
                  style={{ backgroundImage: `url('')`}}
                ></div>
                {/* <div className="hero-big-text">REALAR</div> */}
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
                          href=""
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
      <div className="counter-area-1 bg-smoke" >
      <div className="container">
        <div className="counter-card-wrap space">
          {counters.map((item, index) => (
            <div className="counter-card" key={index}>
              <div className="media-body">
                <h2 className="box-number">
                  <CountUp end={item.value} duration={2} separator="," />+
                </h2>
                <p className="box-text">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>


    {/* <!--About Area --> */}
    <div className="overflow-hidden space-top bg-theme" id="about-sec">
        <div className="container">
            <div className="row justify-content-between align-items-center">
                <div className="col-lg-6">
                    <div className="title-area">
                        <span className="shadow-title">About</span>
                        <h2 className="sec-title text-white">About Us</h2>
                        <p className="sec-text text-white">We are a real estate firm with over 20 years of expertise, and our main goal is to provide amazing locations to our partners.</p>
                    </div>
                </div>
                <div className="col-lg-auto">
                    <div className="sec-btn">
                        <a href="" className="th-btn btn-mask th-btn-icon">Learn More</a>
                    </div>
                </div>
            </div>
            <div className="row gy-4">
                <div className="col-lg-6">
                    <div className="img-box1">
                        <div className="img1 img-shine" data-mask-src="assets/img/shape/about-1-mask.png">
                            <img src="assets/img/normal/about_1_1.png" alt="About" />
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="img-box1">
                        <div className="img1 img-shine" data-mask-src="assets/img/shape/about-1-mask.png">
                            <img src="assets/img/normal/about_1_2.png" alt="About" />
                        </div>
                    </div>
                </div>
            </div>
      
            <div className="mt-60">
      <div className="row gy-40 flex-row-reverse">
        {/* Right Section - Circular Text with Image */}
        <div className="col-xl-3 text-xl-end">
          <div className="about-tag">
            {/* Circular Text */}
            <div className="about-experience-tag">
              <svg width="260" height="258" viewBox="0 0 260 258">
                <defs>
                  <path
                    id="circlePath"
                    d="M 130, 129 m -100, 0 a 100,100 0 1,1 200,0 a 100,100 0 1,1 -200,0"
                  />
                </defs>
                <text width="260">
                  <textPath
                    href="#circlePath"
                    startOffset="50%"
                    textAnchor="middle"
                    style={{
                      fontSize: "14px",
                      fill: "#fff",
                      textTransform: "uppercase",
                    }}
                  >
                    Realar Agent ★ Realar Living Solutions
                  </textPath>
                </text>
              </svg>
            </div>
            {/* Circle Image */}
            <div className="about-tag-thumb">
              <img src="assets/img/normal/about_1_3.png" alt="img" />
            </div>
          </div>
        </div>

        {/* Left Section - Text */}
        <div className="col-xl-9">
          <div className="about-wrap1">
            <p className="about-text text-white">
              All-inclusive real estate services to facilitate the easy and
              confident purchase, sale, and management of your properties.
            </p>
          </div>
        </div>
      </div>
    </div>
        </div>
    </div>


    {/* <!--Service Area  --> */}
    <section className="service-area-1 overflow-hidden space-bottom bg-theme pt-80" id="service-sec">
        <div className="container">
            <div className="row gy-40">
                <div className="col-lg-4 col-md-6">
                    <div className="service-card">
                        <div className="service-card-icon">
                            <div className="icon">
                                <img src="assets/img/icon/service-icon1-1.png" alt="Icon" />
                            </div>
                        </div>
                        <div className="box-content">
                            <h3 className="box-title"><a href="">Property Valuation</a></h3>
                            <p className="box-text">All-inclusive real estate services to facilitate the easy and confident purchase, sale, and management of your properties.</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6">
                    <div className="service-card">
                        <div className="service-card-icon">
                            <div className="icon">
                                <img src="assets/img/icon/service-icon1-2.png" alt="Icon" />
                            </div>
                        </div>
                        <div className="box-content">
                            <h3 className="box-title"><a href="">Property Management</a></h3>
                            <p className="box-text">Business consulting involves providing expert advice and services to real estate improve performance services and achieve.</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6">
                    <div className="service-card">
                        <div className="service-card-icon">
                            <div className="icon">
                                <img src="assets/img/icon/service-icon1-3.png" alt="Icon" />
                            </div>
                        </div>
                        <div className="box-content">
                            <h3 className="box-title"><a href="">Invest Opportunities</a></h3>
                            <p className="box-text">Real estate services facilitate the easy and confident purchase, sale, and management of your properties experiencing growth.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>


    {/* <!--Portfolio Area  --> */}
    <section className="project-area-1 space overflow-hidden" data-bg-src="assets/img/bg/project-bg-1-1.png" data-opacity="5" data-overlay="title">
        <div className="container-fluid">
            <div className="project-wrap1">
                <div className="project-number-pagination" data-slider-tab="#projectSlider1">
                    <div className="tab-btn active">
                        <span>01</span>
                    </div>
                    <div className="tab-btn">
                        <span>02</span>
                    </div>
                    <div className="tab-btn">
                        <span>03</span>
                    </div>
                    <div className="tab-btn">
                        <span>04</span>
                    </div>
                </div>
                <div className="row gy-40 justify-content-between align-items-center">
                    <div className="col-xl-4">
                        <div className="project-title-wrap1">
                            <div className="title-area mb-40">
                                <span className="shadow-title">PROJECTS</span>
                                <h2 className="sec-title text-white">Discover Modern Living At Realar Residence.</h2>
                                <p className="sec-text text-white mt-15">Residence takes advantage of abundant sunlight by incorporating solar panels into its architecture.</p>
                            </div>
                            <div className="btn-wrap">
                                <a href="" className="th-btn btn-mask th-btn-icon">Explore More</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-8">
                        <div className="slider-area project-slider1">
                            <div className="swiper th-slider" id="projectSlider1" data-slider-options='{"breakpoints":{"0":{"slidesPerView":1},"576":{"slidesPerView":"1"},"768":{"slidesPerView":"2"},"992":{"slidesPerView":"3"},"1200":{"slidesPerView":"3"}}}'>
                                <div className="swiper-wrapper">
                                    <div className="swiper-slide">
                                        <div className="portfolio-card">
                                            <div className="portfolio-img img-shine" data-mask-src="assets/img/shape/project-card1-img-mask.png" data-bs-toggle="modal" data-bs-target="#portfolioModal">
                                                <img src="assets/img/project/project_1_1.png" alt="project image" />
                                                <div className="portfolio-card-shape" data-mask-src="assets/img/shape/project-card1-img-mask.png">
                                                    <img src="assets/img/project/project_shape1_1.png" alt="img" />
                                                </div>
                                            </div>
                                            <div className="portfolio-content">
                                                <a href="#portfolioModal" data-bs-toggle="modal" data-bs-target="#portfolioModal" className="icon-btn"><img src="assets/img/icon/arrow-right.svg" alt="img" /></a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="swiper-slide">
                                        <div className="portfolio-card">
                                            <div className="portfolio-img img-shine" data-mask-src="assets/img/shape/project-card1-img-mask.png" data-bs-toggle="modal" data-bs-target="#portfolioModal">
                                                <img src="assets/img/project/project_1_2.png" alt="project image" />
                                                <div className="portfolio-card-shape" data-mask-src="assets/img/shape/project-card1-img-mask.png">
                                                    <img src="assets/img/project/project_shape1_1.png" alt="img" />
                                                </div>
                                            </div>
                                            <div className="portfolio-content">
                                                <a href="#portfolioModal" data-bs-toggle="modal" data-bs-target="#portfolioModal" className="icon-btn"><img src="assets/img/icon/arrow-right.svg" alt="img" /></a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="swiper-slide">
                                        <div className="portfolio-card">
                                            <div className="portfolio-img img-shine" data-mask-src="assets/img/shape/project-card1-img-mask.png" data-bs-toggle="modal" data-bs-target="#portfolioModal">
                                                <img src="assets/img/project/project_1_3.png" alt="project image" />
                                                <div className="portfolio-card-shape" data-mask-src="assets/img/shape/project-card1-img-mask.png">
                                                    <img src="assets/img/project/project_shape1_1.png" alt="img" />
                                                </div>
                                            </div>
                                            <div className="portfolio-content">
                                                <a href="#portfolioModal" data-bs-toggle="modal" data-bs-target="#portfolioModal" className="icon-btn"><img src="assets/img/icon/arrow-right.svg" alt="img" /></a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="swiper-slide">
                                        <div className="portfolio-card">
                                            <div className="portfolio-img img-shine" data-mask-src="assets/img/shape/project-card1-img-mask.png" data-bs-toggle="modal" data-bs-target="#portfolioModal">
                                                <img src="assets/img/project/project_1_1.png" alt="project image" />
                                                <div className="portfolio-card-shape" data-mask-src="assets/img/shape/project-card1-img-mask.png">
                                                    <img src="assets/img/project/project_shape1_1.png" alt="img" />
                                                </div>
                                            </div>
                                            <div className="portfolio-content">
                                                <a href="#portfolioModal" data-bs-toggle="modal" data-bs-target="#portfolioModal" className="icon-btn"><img src="assets/img/icon/arrow-right.svg" alt="img" /></a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="swiper-slide">
                                        <div className="portfolio-card">
                                            <div className="portfolio-img img-shine" data-mask-src="assets/img/shape/project-card1-img-mask.png" data-bs-toggle="modal" data-bs-target="#portfolioModal">
                                                <img src="assets/img/project/project_1_2.png" alt="project image" />
                                                <div className="portfolio-card-shape" data-mask-src="assets/img/shape/project-card1-img-mask.png">
                                                    <img src="assets/img/project/project_shape1_1.png" alt="img" />
                                                </div>
                                            </div>
                                            <div className="portfolio-content">
                                                <a href="#portfolioModal" data-bs-toggle="modal" data-bs-target="#portfolioModal" className="icon-btn"><img src="assets/img/icon/arrow-right.svg" alt="img" /></a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="swiper-slide">
                                        <div className="portfolio-card">
                                            <div className="portfolio-img img-shine" data-mask-src="assets/img/shape/project-card1-img-mask.png" data-bs-toggle="modal" data-bs-target="#portfolioModal">
                                                <img src="assets/img/project/project_1_3.png" alt="project image" />
                                                <div className="portfolio-card-shape" data-mask-src="assets/img/shape/project-card1-img-mask.png">
                                                    <img src="assets/img/project/project_shape1_1.png" alt="img" />
                                                </div>
                                            </div>
                                            <div className="portfolio-content">
                                                <a href="#portfolioModal" data-bs-toggle="modal" data-bs-target="#portfolioModal" className="icon-btn"><img src="assets/img/icon/arrow-right.svg" alt="img" /></a>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="slider-pagination d-sm-block d-none"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* <!--Property Area--> */}
    <section className="space bg-theme">
        <div className="container">
            <div className="row justify-content-between align-items-center">
                <div className="col-lg-6">
                    <div className="title-area">
                        <span className="shadow-title">Listing</span>
                        <h2 className="sec-title text-white">Featured Property</h2>
                        <p className="sec-text text-white">We are a real estate firm with over 20 years of expertise, and our main goal is to provide amazing locations to our partners and clients.</p>
                    </div>
                </div>
                <div className="col-auto">
                    <div className="sec-btn">
                        <a href="" className="th-btn btn-mask th-btn-icon">All Properties</a>
                    </div>
                </div>
            </div>
            <div className="property-card-wrap">
                <div className="property-thumb img-shine" data-mask-src="assets/img/shape/property-card1-img-mask.png">
                    <img src="assets/img/property/property1-1.png" alt="img" />
                </div>
                <div className="property-card">
                    <div className="property-card-number">
                        01 </div>
                    <div className="property-card-details">
                        <span className="property-card-subtitle">Apartment</span>
                        <h4 className="property-card-title"><a href="">Villa Berkel-Enschot</a></h4>
                        <p className="property-card-text">Rapidiously myocardinate cross-platform intellectual capital model. Appropriately create interactive infrastructures</p>
                        <div className="property-card-price-meta">
                            <h5 className="property-card-price">$45,000.00</h5>
                            <div className="property-ratting-wrap">
                                <div className="star-ratting">
                                    <i className="fas fa-star"></i>
                                    4.9
                                </div>
                                10 Review
                            </div>
                        </div>
                        <div className="property-card-meta">
                            <span><img src="assets/img/icon/property-icon1-1.svg" alt="img" />Bed 4</span>
                            <span><img src="assets/img/icon/property-icon1-2.svg" alt="img" />Bath 2</span>
                            <span><img src="assets/img/icon/property-icon1-3.svg" alt="img" />1500 sqft</span>
                        </div>
                        <div className="property-btn-wrap">
                            <div className="property-author-wrap">
                                <img src="assets/img/property/property-user-1-1.png" alt="img" />
                                <a href="">Admin</a>
                            </div>
                            <a href="" className="th-btn btn-mask2 th-btn-icon">Details</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="property-card-wrap">
                <div className="property-thumb img-shine" data-mask-src="assets/img/shape/property-card1-img-mask.png">
                    <img src="assets/img/property/property1-2.png" alt="img" />
                </div>
                <div className="property-card">
                    <div className="property-card-number">
                        02 </div>
                    <div className="property-card-details">
                        <span className="property-card-subtitle">Apartment</span>
                        <h4 className="property-card-title"><a href="">Toronto Townhouse</a></h4>
                        <p className="property-card-text">Rapidiously myocardinate cross-platform intellectual capital model. Appropriately create interactive infrastructures</p>
                        <div className="property-card-price-meta">
                            <h5 className="property-card-price">$45,000.00</h5>
                            <div className="property-ratting-wrap">
                                <div className="star-ratting">
                                    <i className="fas fa-star"></i>
                                    4.9
                                </div>
                                10 Review
                            </div>
                        </div>
                        <div className="property-card-meta">
                            <span><img src="assets/img/icon/property-icon1-1.svg" alt="img" />Bed 4</span>
                            <span><img src="assets/img/icon/property-icon1-2.svg" alt="img" />Bath 2</span>
                            <span><img src="assets/img/icon/property-icon1-3.svg" alt="img" />1500 sqft</span>
                        </div>
                        <div className="property-btn-wrap">
                            <div className="property-author-wrap">
                                <img src="assets/img/property/property-user-1-2.png" alt="img" />
                                <a href="">Admin</a>
                            </div>
                            <a href="" className="th-btn btn-mask2 th-btn-icon">Details</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="property-card-wrap">
                <div className="property-thumb img-shine" data-mask-src="assets/img/shape/property-card1-img-mask.png">
                    <img src="assets/img/property/property1-3.png" alt="img" />
                </div>
                <div className="property-card">
                    <div className="property-card-number">
                        03 </div>
                    <div className="property-card-details">
                        <span className="property-card-subtitle">Apartment</span>
                        <h4 className="property-card-title"><a href="">Virgin Vineyard House</a></h4>
                        <p className="property-card-text">Rapidiously myocardinate cross-platform intellectual capital model. Appropriately create interactive infrastructures</p>
                        <div className="property-card-price-meta">
                            <h5 className="property-card-price">$45,000.00</h5>
                            <div className="property-ratting-wrap">
                                <div className="star-ratting">
                                    <i className="fas fa-star"></i>
                                    4.9
                                </div>
                                10 Review
                            </div>
                        </div>
                        <div className="property-card-meta">
                            <span><img src="assets/img/icon/property-icon1-1.svg" alt="img" />Bed 4</span>
                            <span><img src="assets/img/icon/property-icon1-2.svg" alt="img" />Bath 2</span>
                            <span><img src="assets/img/icon/property-icon1-3.svg" alt="img" />1500 sqft</span>
                        </div>
                        <div className="property-btn-wrap">
                            <div className="property-author-wrap">
                                <img src="assets/img/property/property-user-1-3.png" alt="img" />
                                <a href="">Admin</a>
                            </div>
                            <a href="" className="th-btn btn-mask2 th-btn-icon">Details</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="property-card-wrap">
                <div className="property-thumb img-shine" data-mask-src="assets/img/shape/property-card1-img-mask.png">
                    <img src="assets/img/property/property1-4.png" alt="img" />
                </div>
                <div className="property-card">
                    <div className="property-card-number">
                        04 </div>
                    <div className="property-card-details">
                        <span className="property-card-subtitle">Apartment</span>
                        <h4 className="property-card-title"><a href="">Apartments Auckland</a></h4>
                        <p className="property-card-text">Rapidiously myocardinate cross-platform intellectual capital model. Appropriately create interactive infrastructures</p>
                        <div className="property-card-price-meta">
                            <h5 className="property-card-price">$45,000.00</h5>
                            <div className="property-ratting-wrap">
                                <div className="star-ratting">
                                    <i className="fas fa-star"></i>
                                    4.9
                                </div>
                                10 Review
                            </div>
                        </div>
                        <div className="property-card-meta">
                            <span><img src="assets/img/icon/property-icon1-1.svg" alt="img" />Bed 4</span>
                            <span><img src="assets/img/icon/property-icon1-2.svg" alt="img" />Bath 2</span>
                            <span><img src="assets/img/icon/property-icon1-3.svg" alt="img" />1500 sqft</span>
                        </div>
                        <div className="property-btn-wrap">
                            <div className="property-author-wrap">
                                <img src="assets/img/property/property-user-1-4.png" alt="img" />
                                <a href="">Admin</a>
                            </div>
                            <a href="" className="th-btn btn-mask2 th-btn-icon">Details</a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>

    {/* <!--Property Area --> */}
    <section className="space overflow-hidden">
        <div className="container">
            <div className="row justify-content-center align-items-center">
                <div className="col-xl-6 col-lg-8">
                    <div className="title-area text-center">
                        <span className="shadow-title style2">Facilities</span>
                        <h2 className="sec-title">Realar Aminities</h2>
                        <p className="sec-text text-title">We are a real estate firm with over 20 years of expertise, and our main goal is to provide amazing locations to our partners and clients.</p>
                    </div>
                </div>
            </div>
            <div className="swiper th-slider aminities-slider" id="aminitiesSlider1" data-slider-options='{"breakpoints":{"0":{"slidesPerView":1},"375":{"slidesPerView":"2"},"768":{"slidesPerView":"3"},"992":{"slidesPerView":"4"},"1200":{"slidesPerView":"6"}}}'>
                <div className="swiper-wrapper">
                    <div className="swiper-slide">
                        <a href="" className="aminities-card" data-mask-src="assets/img/theme-img/aminities-shape1.png">
                            <div className="aminities-card-img">
                                <img src="assets/img/aminities/aminities1-1.png" alt="aminities image" />
                            </div>
                            <div className="aminities-content">
                                <div className="aminities-card-icon">
                                    <img src="assets/img/icon/aminities-icon1-1.svg" alt="aminities icon" />
                                </div>
                                <h3 className="box-title">Car Parking</h3>
                            </div>
                        </a>
                    </div>

                    <div className="swiper-slide">
                        <a href="" className="aminities-card" data-mask-src="assets/img/theme-img/aminities-shape1.png">
                            <div className="aminities-card-img">
                                <img src="assets/img/aminities/aminities1-2.png" alt="aminities image" />
                            </div>
                            <div className="aminities-content">
                                <div className="aminities-card-icon">
                                    <img src="assets/img/icon/aminities-icon1-2.svg" alt="aminities icon" />
                                </div>
                                <h3 className="box-title">Fitness Center</h3>
                            </div>
                        </a>
                    </div>

                    <div className="swiper-slide">
                        <a href="" className="aminities-card" data-mask-src="assets/img/theme-img/aminities-shape1.png">
                            <div className="aminities-card-img">
                                <img src="assets/img/aminities/aminities1-3.png" alt="aminities image" />
                            </div>
                            <div className="aminities-content">
                                <div className="aminities-card-icon">
                                    <img src="assets/img/icon/aminities-icon1-3.svg" alt="aminities icon" />
                                </div>
                                <h3 className="box-title">Rooftop Garden</h3>
                            </div>
                        </a>
                    </div>

                    <div className="swiper-slide">
                        <a href="" className="aminities-card" data-mask-src="assets/img/theme-img/aminities-shape1.png">
                            <div className="aminities-card-img">
                                <img src="assets/img/aminities/aminities1-4.png" alt="aminities image" />
                            </div>
                            <div className="aminities-content">
                                <div className="aminities-card-icon">
                                    <img src="assets/img/icon/aminities-icon1-4.svg" alt="aminities icon" />
                                </div>
                                <h3 className="box-title">Indoor Pool</h3>
                            </div>
                        </a>
                    </div>

                    <div className="swiper-slide">
                        <a href="" className="aminities-card" data-mask-src="assets/img/theme-img/aminities-shape1.png">
                            <div className="aminities-card-img">
                                <img src="assets/img/aminities/aminities1-5.png" alt="aminities image" />
                            </div>
                            <div className="aminities-content">
                                <div className="aminities-card-icon">
                                    <img src="assets/img/icon/aminities-icon1-5.svg" alt="aminities icon" />
                                </div>
                                <h3 className="box-title">Pet Friendly</h3>
                            </div>
                        </a>
                    </div>

                    <div className="swiper-slide">
                        <a href="" className="aminities-card" data-mask-src="assets/img/theme-img/aminities-shape1.png">
                            <div className="aminities-card-img">
                                <img src="assets/img/aminities/aminities1-6.png" alt="aminities image" />
                            </div>
                            <div className="aminities-content">
                                <div className="aminities-card-icon">
                                    <img src="assets/img/icon/aminities-icon1-6.svg" alt="aminities icon" />
                                </div>
                                <h3 className="box-title">Playground</h3>
                            </div>
                        </a>
                    </div>

                    <div className="swiper-slide">
                        <a href="" className="aminities-card" data-mask-src="assets/img/theme-img/aminities-shape1.png">
                            <div className="aminities-card-img">
                                <img src="assets/img/aminities/aminities1-1.png" alt="aminities image" />
                            </div>
                            <div className="aminities-content">
                                <div className="aminities-card-icon">
                                    <img src="assets/img/icon/aminities-icon1-1.svg" alt="aminities icon" />
                                </div>
                                <h3 className="box-title">Car Parking</h3>
                            </div>
                        </a>
                    </div>

                    <div className="swiper-slide">
                        <a href="" className="aminities-card" data-mask-src="assets/img/theme-img/aminities-shape1.png">
                            <div className="aminities-card-img">
                                <img src="assets/img/aminities/aminities1-2.png" alt="aminities image" />
                            </div>
                            <div className="aminities-content">
                                <div className="aminities-card-icon">
                                    <img src="assets/img/icon/aminities-icon1-2.svg" alt="aminities icon" />
                                </div>
                                <h3 className="box-title">Fitness Center</h3>
                            </div>
                        </a>
                    </div>

                    <div className="swiper-slide">
                        <a href="" className="aminities-card" data-mask-src="assets/img/theme-img/aminities-shape1.png">
                            <div className="aminities-card-img">
                                <img src="assets/img/aminities/aminities1-3.png" alt="aminities image" />
                            </div>
                            <div className="aminities-content">
                                <div className="aminities-card-icon">
                                    <img src="assets/img/icon/aminities-icon1-3.svg" alt="aminities icon" />
                                </div>
                                <h3 className="box-title">Rooftop Garden</h3>
                            </div>
                        </a>
                    </div>

                    <div className="swiper-slide">
                        <a href="" className="aminities-card" data-mask-src="assets/img/theme-img/aminities-shape1.png">
                            <div className="aminities-card-img">
                                <img src="assets/img/aminities/aminities1-4.png" alt="aminities image" />
                            </div>
                            <div className="aminities-content">
                                <div className="aminities-card-icon">
                                    <img src="assets/img/icon/aminities-icon1-4.svg" alt="aminities icon" />
                                </div>
                                <h3 className="box-title">Indoor Pool</h3>
                            </div>
                        </a>
                    </div>

                    <div className="swiper-slide">
                        <a href="" className="aminities-card" data-mask-src="assets/img/theme-img/aminities-shape1.png">
                            <div className="aminities-card-img">
                                <img src="assets/img/aminities/aminities1-5.png" alt="aminities image" />
                            </div>
                            <div className="aminities-content">
                                <div className="aminities-card-icon">
                                    <img src="assets/img/icon/aminities-icon1-5.svg" alt="aminities icon" />
                                </div>
                                <h3 className="box-title">Pet Friendly</h3>
                            </div>
                        </a>
                    </div>

                    <div className="swiper-slide">
                        <a href="" className="aminities-card" data-mask-src="assets/img/theme-img/aminities-shape1.png">
                            <div className="aminities-card-img">
                                <img src="assets/img/aminities/aminities1-6.png" alt="aminities image" />
                            </div>
                            <div className="aminities-content">
                                <div className="aminities-card-icon">
                                    <img src="assets/img/icon/aminities-icon1-6.svg" alt="aminities icon" />
                                </div>
                                <h3 className="box-title">Playground</h3>
                            </div>
                        </a>
                    </div>

                </div>
                <div className="slider-pagination"></div>
                <button data-slider-prev="#aminitiesSlider1" className="slider-arrow slider-prev"><img src="assets/img/icon/arrow-left.svg" alt="icon" /></button>
                <button data-slider-next="#aminitiesSlider1" className="slider-arrow slider-next"><img src="assets/img/icon/arrow-right.svg" alt="icon" /></button>
            </div>

        </div>
    </section>

    {/* <!--Video Area --> */}
    <div className="container">
        <div className="video-area-1 ">
            <div className="video-wrap1">
                <div className="video-box1">
                    <img src="assets/img/normal/video_1_1.png" alt="img" />
                    <a href="https://www.youtube.com/watch?v=_sI_Ps7JSEk" className="play-btn style3 popup-video"><i className="fa-sharp fa-solid fa-play"></i></a>
                </div>
                <div className="video-wrap-details">
                    <div className="title-area mb-45">
                        <h2 className="sec-title">Take a look at our modern apartment</h2>
                        <p className="sec-text text-title">We are a real estate firm with over 20 years of expertise, and our main goal is to provide amazing locations to our partners and clients. Within the luxury real estate market, our agency offers customized solutions.</p>
                    </div>
                    <div className="btn-wrap mb-55">
                        <a href="" className="th-btn style2 btn-mask th-btn-icon">Reques A Visit</a>
                    </div>
                    <div className="author-grid">
                        <div className="author-profile">
                            <div className="avater">
                                <img src="assets/img/normal/author_1_1.png" alt="img" />
                            </div>
                            <div className="media-body">
                                <h5 className="author-profile-name"> Basila Smith </h5>
                                <p className="author-desig">CEO of Realar</p>
                            </div>
                        </div>
                        <div className="author-sign">
                            <img src="assets/img/normal/sign_1_1.png" alt="img" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {/* <!--Team Area --> */}
    <section className="team-area-1 space-bottom bg-theme">
        <div className="container z-index-common">
            <div className="row justify-content-between align-items-center">
                <div className="col-xl-5 col-lg-7">
                    <div className="title-area">
                        <span className="shadow-title">Team</span>
                        <h2 className="sec-title text-white">Our Team Member</h2>
                        <p className="sec-text text-white">We are a real estate firm with over 20 years of expertise, We provide amazing locations to our partners and clients.</p>
                    </div>
                </div>
                <div className="col-auto">
                    <div className="sec-btn">
                        <a href="" className="th-btn btn-mask th-btn-icon">View All Members</a>
                    </div>
                </div>
            </div>
            <div className="swiper th-slider team-slider1" id="teamSlider1" data-slider-options='{"breakpoints":{"0":{"slidesPerView":1},"576":{"slidesPerView":"1"},"768":{"slidesPerView":"2"},"992":{"slidesPerView":"2"},"1200":{"slidesPerView":"3"}}}'>
                <div className="swiper-wrapper">
                    {/* <!-- Single Item --> */}
                    <div className="swiper-slide">
                        <div className="th-team team-card">
                            <div className="img-wrap">
                                <div className="team-img" data-mask-src="assets/img/theme-img/team-shape1.png">
                                    <img src="assets/img/team/team_1_1.png" alt="Team" />
                                </div>
                            </div>
                            <div className="team-card-content">
                                <div className="media">
                                    <div className="media-left">
                                        <h3 className="box-title"><a href="">Michel Smith</a></h3>
                                        <span className="team-desig">Property Expert</span>
                                    </div>
                                    <div className="media-body">
                                        <a className="icon-btn" href="tel:09876543210"><img src="assets/img/icon/phone.svg" alt="img" /></a>
                                    </div>
                                </div>
                                <div className="th-social">
                                    <a target="_blank" href="https://facebook.com/"><i className="fab fa-facebook-f"></i></a>
                                    <a target="_blank" href="https://twitter.com/"><i className="fab fa-twitter"></i></a>
                                    <a target="_blank" href="https://linkedin.com/"><i className="fab fa-linkedin-in"></i></a>
                                    <a target="_blank" href="https://youtube.com/"><i className="fab fa-youtube"></i></a>
                                    <a target="_blank" href="https://instagram.com/"><i className="fab fa-instagram"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Single Item --> */}
                    <div className="swiper-slide">
                        <div className="th-team team-card">
                            <div className="img-wrap">
                                <div className="team-img" data-mask-src="assets/img/theme-img/team-shape1.png">
                                    <img src="assets/img/team/team_1_2.png" alt="Team" />
                                </div>
                            </div>
                            <div className="team-card-content">
                                <div className="media">
                                    <div className="media-left">
                                        <h3 className="box-title"><a href="">Sara Prova</a></h3>
                                        <span className="team-desig">Property Expert</span>
                                    </div>
                                    <div className="media-body">
                                        <a className="icon-btn" href="tel:09876543210"><img src="assets/img/icon/phone.svg" alt="img" /></a>
                                    </div>
                                </div>
                                <div className="th-social">
                                    <a target="_blank" href="https://facebook.com/"><i className="fab fa-facebook-f"></i></a>
                                    <a target="_blank" href="https://twitter.com/"><i className="fab fa-twitter"></i></a>
                                    <a target="_blank" href="https://linkedin.com/"><i className="fab fa-linkedin-in"></i></a>
                                    <a target="_blank" href="https://youtube.com/"><i className="fab fa-youtube"></i></a>
                                    <a target="_blank" href="https://instagram.com/"><i className="fab fa-instagram"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Single Item --> */}
                    <div className="swiper-slide">
                        <div className="th-team team-card">
                            <div className="img-wrap">
                                <div className="team-img" data-mask-src="assets/img/theme-img/team-shape1.png">
                                    <img src="assets/img/team/team_1_3.png" alt="Team" />
                                </div>
                            </div>
                            <div className="team-card-content">
                                <div className="media">
                                    <div className="media-left">
                                        <h3 className="box-title"><a href="">Janny Mari</a></h3>
                                        <span className="team-desig">Property Expert</span>
                                    </div>
                                    <div className="media-body">
                                        <a className="icon-btn" href="tel:09876543210"><img src="assets/img/icon/phone.svg" alt="img" /></a>
                                    </div>
                                </div>
                                <div className="th-social">
                                    <a target="_blank" href="https://facebook.com/"><i className="fab fa-facebook-f"></i></a>
                                    <a target="_blank" href="https://twitter.com/"><i className="fab fa-twitter"></i></a>
                                    <a target="_blank" href="https://linkedin.com/"><i className="fab fa-linkedin-in"></i></a>
                                    <a target="_blank" href="https://youtube.com/"><i className="fab fa-youtube"></i></a>
                                    <a target="_blank" href="https://instagram.com/"><i className="fab fa-instagram"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Single Item --> */}
                    <div className="swiper-slide">
                        <div className="th-team team-card">
                            <div className="img-wrap">
                                <div className="team-img" data-mask-src="assets/img/theme-img/team-shape1.png">
                                    <img src="assets/img/team/team_1_1.png" alt="Team" />
                                </div>
                            </div>
                            <div className="team-card-content">
                                <div className="media">
                                    <div className="media-left">
                                        <h3 className="box-title"><a href="">Michel Smith</a></h3>
                                        <span className="team-desig">Property Expert</span>
                                    </div>
                                    <div className="media-body">
                                        <a className="icon-btn" href="tel:09876543210"><img src="assets/img/icon/phone.svg" alt="img" /></a>
                                    </div>
                                </div>
                                <div className="th-social">
                                    <a target="_blank" href="https://facebook.com/"><i className="fab fa-facebook-f"></i></a>
                                    <a target="_blank" href="https://twitter.com/"><i className="fab fa-twitter"></i></a>
                                    <a target="_blank" href="https://linkedin.com/"><i className="fab fa-linkedin-in"></i></a>
                                    <a target="_blank" href="https://youtube.com/"><i className="fab fa-youtube"></i></a>
                                    <a target="_blank" href="https://instagram.com/"><i className="fab fa-instagram"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Single Item --> */}
                    <div className="swiper-slide">
                        <div className="th-team team-card">
                            <div className="img-wrap">
                                <div className="team-img" data-mask-src="assets/img/theme-img/team-shape1.png">
                                    <img src="assets/img/team/team_1_2.png" alt="Team" />
                                </div>
                            </div>
                            <div className="team-card-content">
                                <div className="media">
                                    <div className="media-left">
                                        <h3 className="box-title"><a href="">Sara Prova</a></h3>
                                        <span className="team-desig">Property Expert</span>
                                    </div>
                                    <div className="media-body">
                                        <a className="icon-btn" href="tel:09876543210"><img src="assets/img/icon/phone.svg" alt="img" /></a>
                                    </div>
                                </div>
                                <div className="th-social">
                                    <a target="_blank" href="https://facebook.com/"><i className="fab fa-facebook-f"></i></a>
                                    <a target="_blank" href="https://twitter.com/"><i className="fab fa-twitter"></i></a>
                                    <a target="_blank" href="https://linkedin.com/"><i className="fab fa-linkedin-in"></i></a>
                                    <a target="_blank" href="https://youtube.com/"><i className="fab fa-youtube"></i></a>
                                    <a target="_blank" href="https://instagram.com/"><i className="fab fa-instagram"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Single Item --> */}
                    <div className="swiper-slide">
                        <div className="th-team team-card">
                            <div className="img-wrap">
                                <div className="team-img" data-mask-src="assets/img/theme-img/team-shape1.png">
                                    <img src="assets/img/team/team_1_3.png" alt="Team" />
                                </div>
                            </div>
                            <div className="team-card-content">
                                <div className="media">
                                    <div className="media-left">
                                        <h3 className="box-title"><a href="">Janny Mari</a></h3>
                                        <span className="team-desig">Property Expert</span>
                                    </div>
                                    <div className="media-body">
                                        <a className="icon-btn" href="tel:09876543210"><img src="assets/img/icon/phone.svg" alt="img" /></a>
                                    </div>
                                </div>
                                <div className="th-social">
                                    <a target="_blank" href="https://facebook.com/"><i className="fab fa-facebook-f"></i></a>
                                    <a target="_blank" href="https://twitter.com/"><i className="fab fa-twitter"></i></a>
                                    <a target="_blank" href="https://linkedin.com/"><i className="fab fa-linkedin-in"></i></a>
                                    <a target="_blank" href="https://youtube.com/"><i className="fab fa-youtube"></i></a>
                                    <a target="_blank" href="https://instagram.com/"><i className="fab fa-instagram"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="slider-pagination"></div>
                <button data-slider-prev="#teamSlider1" className="slider-arrow slider-prev"><img src="assets/img/icon/arrow-left.svg" alt="icon" /></button>
                <button data-slider-next="#teamSlider1" className="slider-arrow slider-next"><img src="assets/img/icon/arrow-right.svg" alt="icon" /></button>
            </div>
        </div>
    </section>

    {/* <!--Cta Area --> */}
    <section className="space-bottom bg-theme overflow-hidden">
        <div className="container">
            <div className="row gy-80 gx-40 align-items-center">
                <div className="col-xl-6">
                    <div className="cta-thumb img-shine" data-mask-src="assets/img/shape/cta_1_1-img-mask.png">
                        <img src="assets/img/normal/cta_1_1.png" alt="img" />
                    </div>
                </div>
                <div className="col-xl-6">
                    <div className="me-xxl-5 pe-xxl-5">
                        <div className="title-area">
                            <span className="shadow-title">CONSULTING</span>
                            <h2 className="sec-title text-white">Buying & Selling We Make It Simple</h2>
                            <p className="sec-text text-white">Rapidiously myocardinate cross-platform intellectual capital model. Appropriately create interactive infrastructures</p>
                        </div>
                        <div className="btn-wrap">
                            <a href="" className="th-btn btn-mask th-btn-icon">Get Started</a>
                            <a href="" className="th-btn btn-mask2 th-btn-icon">Contact Us</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>


    {/* <!-Testimonial Area--> */}
    <section className="testi-sec-1 overflow-hidden space overflow-hidden">
        <div className="container">
            <div className="row gy-80 flex-row-reverse">
                <div className="col-xl-5">
                    <div className="testi-thumb-wrap">
                        <div className="img1">
                            <img src="assets/img/testimonial/testi_thumb_1_1.png" alt="img" />
                        </div>
                        <div className="img2 jump">
                            <img src="assets/img/testimonial/testi_thumb_1_2.png" alt="img" />
                        </div>
                    </div>
                </div>
                <div className="col-xl-7">
                    <div className="title-area">
                        <span className="shadow-title style2">Testimonials</span>
                        <h2 className="sec-title">What Our Clients Say</h2>
                    </div>
                    <div className="swiper th-slider testi-slider1" id="testiSlider1" data-slider-options='{"breakpoints":{"0":{"slidesPerView":1},"576":{"slidesPerView":"1"},"768":{"slidesPerView":"1"},"992":{"slidesPerView":"1"},"1200":{"slidesPerView":"1"}}}'>
                        <div className="swiper-wrapper">
                            <div className="swiper-slide">
                                <div className="testi-card">
                                    <div className="testi-grid_review">
                                        <i className="fa-sharp fa-solid fa-star"></i><i className="fa-sharp fa-solid fa-star"></i><i className="fa-sharp fa-solid fa-star"></i><i className="fa-sharp fa-solid fa-star"></i><i className="fa-sharp fa-solid fa-star"></i>
                                    </div>
                                    <p className="testi-card_text">There are so many wonderful things to say about Quere. Their staff genuinely cares about their clients and is competent and professional. They assisted me in locating the ideal house for my household.</p>
                                    <div className="testi-grid-wrap">
                                        <div className="testi-card_profile">
                                            <div className="avatar" data-mask-src="assets/img/shape/testi_1_1-mask.png">
                                                <img src="assets/img/testimonial/testi_1_1.png" alt="avatar" />
                                            </div>
                                            <div className="testi-card_profile-details">
                                                <h3 className="testi-card_name">Janny Muna</h3>
                                                <span className="testi-card_desig">CEO of Company</span>
                                            </div>
                                        </div>
                                        <div className="quote-icon">
                                            <img src="assets/img/icon/qoute.svg" alt="icon" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="testi-card">
                                    <div className="testi-grid_review">
                                        <i className="fa-sharp fa-solid fa-star"></i><i className="fa-sharp fa-solid fa-star"></i><i className="fa-sharp fa-solid fa-star"></i><i className="fa-sharp fa-solid fa-star"></i><i className="fa-sharp fa-solid fa-star"></i>
                                    </div>
                                    <p className="testi-card_text">Home is where love resides, memories are created, and dreams are nurtured. I've found my sanctuary in this beautiful property. Finding the perfect that resonates with your own coupled with modern.</p>
                                    <div className="testi-grid-wrap">
                                        <div className="testi-card_profile">
                                            <div className="avatar" data-mask-src="assets/img/shape/testi_1_1-mask.png">
                                                <img src="assets/img/testimonial/testi_1_2.png" alt="avatar" />
                                            </div>
                                            <div className="testi-card_profile-details">
                                                <h3 className="testi-card_name">Alexan Micelito</h3>
                                                <span className="testi-card_desig">Senior Manager</span>
                                            </div>
                                        </div>
                                        <div className="quote-icon">
                                            <img src="assets/img/icon/qoute.svg" alt="icon" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="testi-card">
                                    <div className="testi-grid_review">
                                        <i className="fa-sharp fa-solid fa-star"></i><i className="fa-sharp fa-solid fa-star"></i><i className="fa-sharp fa-solid fa-star"></i><i className="fa-sharp fa-solid fa-star"></i><i className="fa-sharp fa-solid fa-star"></i>
                                    </div>
                                    <p className="testi-card_text">A home that perfectly blends sustainability with luxury until I discovered Ecoland Residence. From the moment I stepped into this community, I knew it was where I wanted to live commitment to living.</p>
                                    <div className="testi-grid-wrap">
                                        <div className="testi-card_profile">
                                            <div className="avatar" data-mask-src="assets/img/shape/testi_1_1-mask.png">
                                                <img src="assets/img/testimonial/testi_1_3.png" alt="avatar" />
                                            </div>
                                            <div className="testi-card_profile-details">
                                                <h3 className="testi-card_name">Brooklyn Simmons</h3>
                                                <span className="testi-card_desig">Junior Manager</span>
                                            </div>
                                        </div>
                                        <div className="quote-icon">
                                            <img src="assets/img/icon/qoute.svg" alt="icon" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="slider-pagination style2"></div>
                    </div>
                </div>

            </div>
        </div>
    </section>

    {/* <!--Download Area--> */}
    <section className="download-area-1 space-top overflow-hidden" data-bg-src="assets/img/bg/download-bg-1-1.png" data-opacity="5" data-overlay="title">
        <div className="container">
            <div className="row gx-40">

                <div className="col-xxl-6 col-lg-7 align-self-center">
                    <div className="space-bottom text-lg-start text-center">
                        <div className="title-area mb-30">
                            <span className="shadow-title">Applicaton</span>
                            <h2 className="sec-title text-white">Get A Luxury Home It’s Easy</h2>
                            <p className="sec-text text-white">Rapidiously myocardinate cross-platform intellectual capital model. Appropriately create interactive infrastructures</p>
                        </div>
                        <div className="btn-wrap justify-content-lg-start justify-content-center">
                            <a href="" className="th-btn btn-mask th-btn-icon">Download App</a>
                        </div>
                    </div>
                </div>
                <div className="col-xxl-6 col-lg-5 align-self-end">
                    <div className="download-thumb text-center">
                        <img src="/assets/img/normal/download_1_1.png" alt="img" />
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* <!--Blog Area --> */}
    <section className="space bg-theme" id="blog-sec">
        <div className="container">
            <div className="row justify-content-between align-items-center">
                <div className="col-xl-5 col-lg-7">
                    <div className="title-area">
                        <span className="shadow-title">Blog</span>
                        <h2 className="sec-title text-white">Latest Blog & News</h2>
                    </div>
                </div>
                <div className="col-auto">
                    <div className="sec-btn">
                        <a href="" className="th-btn btn-mask th-btn-icon">Browse All Blog</a>
                    </div>
                </div>
            </div>
            <div className="blog-grid">
                <div className="blog-img img-shine" data-mask-src="assets/img/shape/blog-card1-img-mask.png">
                    <a href="">
                        <img src="assets/img/blog/blog_1_1.jpg" alt="blog image" />
                    </a>
                </div>
                <div className="blog-content">
                    <span className="subtitle">Housing</span>
                    <h3 className="box-title"><a href="">Imaging Trends Will Shape the Future of Architecture Design</a></h3>
                    <p className="blog-text">Rapidiously myocardinate cross-platform intellectual capital model. Appropriately create interactive infrastructures</p>
                    <div className="blog-bottom-wrap">
                        <div className="blog-author-wrap">
                            <div className="avatar">
                                <img src="assets/img/blog/avatar_1.png" alt="" />
                            </div>
                            <a href="">By Admin</a>
                        </div>
                        <div className="blog-date">
                            April 12, 2024 </div>
                        <a href="" className="th-btn btn-mask2 th-btn-icon">Read More</a>
                    </div>
                </div>
            </div>

            <div className="blog-grid">
                <div className="blog-img img-shine" data-mask-src="assets/img/shape/blog-card1-img-mask.png">
                    <a href="">
                        <img src="assets/img/blog/blog_1_2.jpg" alt="blog image"  />
                    </a>
                </div>
                <div className="blog-content">
                    <span className="subtitle">Housing</span>
                    <h3 className="box-title"><a href="">We endowed Villa 1 with interestingly spatial experiences.</a></h3>
                    <p className="blog-text">Rapidiously myocardinate cross-platform intellectual capital model. Appropriately create interactive infrastructures</p>
                    <div className="blog-bottom-wrap">
                        <div className="blog-author-wrap">
                            <div className="avatar">
                                <img src="assets/img/blog/avatar_2.png" alt="" />
                            </div>
                            <a href="">By Admin</a>
                        </div>
                        <div className="blog-date">
                            March 16, 2024 </div>
                        <a href="" className="th-btn btn-mask2 th-btn-icon">Read More</a>
                    </div>
                </div>
            </div>

        </div>
    </section>





    {/* <!-- Popup Modal v1--> */}
    <div className="th-modal modal fade" id="portfolioModal" tabindex="-1" aria-hidden="true">
        <div className="modal-dialog modal-xl">
            <div className="modal-content">
                <div className="container">
                    <button type="button" className="icon-btn btn-close" data-bs-dismiss="modal" aria-label="Close"><i className="fa-regular fa-xmark"></i></button>
                    <div className="page-single bg-theme">
                        <div className="page-img mb-30">
                            <img className="w-100 rounded-20" src="assets/img/project/project_pop1_1.png" alt="portfolio Image" />
                        </div>
                        <div className="page-content">
                            <h2 className="h3 page-title text-white fw-medium">Where Visibility Meets Success</h2>
                            <div className="row gy-30">
                                <div className="col-xl-7">
                                    <p className="mb-20 text-light">The timeline varies depending on the complexity of the project. Simple projects may take a few weeks, while more complex ones could extend to several months. Timelines are influenced by factors like scope, feedback iterations, and client responsiveness.</p>

                                    <p className="mb-xl-4 mb-0 text-light">Project timelines vary based on complexity and scope. Small projects may take a few weeks, while larger ones could span several months. Timelines are established during project kickoff. We use a range of industry-standard tools such as Sketch.</p>
                                </div>
                                <div className="col-xl-5">
                                    <div className="checklist">
                                        <ul>
                                            <li className="text-light"><strong>Service Category:</strong> Rubix Carabil Tower</li>
                                            <li className="text-light"><strong>Clients:</strong> David Malan</li>
                                            <li className="text-light"><strong>Project Date:</strong> 13 June, 2020</li>
                                            <li className="text-light"><strong>Avenue End Date:</strong> 22 July, 2023</li>
                                            <li className="text-light"><strong>Locations:</strong> NewYork - 2546 Firs, USA</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="row gy-30 gx-40 align-items-center">
                                <div className="col-xl-6">
                                    <div className="page-img mb-0">
                                        <img className="w-100" src="assets/img/project/project_1_2.png" alt="portfolio Image" />
                                    </div>
                                </div>
                                <div className="col-xl-6">
                                    <h4 className="box-title text-white fw-medium">Services Benefits:</h4>
                                    <p className="text-light">We can do both. We can adhere to existing brand guidelines, ensuring consistency, or help develop new ones if a client is looking for a fresh identity. Our goal is to align the UI/UX design with the brand's overall strategy product meets the needs.</p>
                                    <div className="checklist style3">
                                        <ul>
                                            <li className="text-light"><i className="far fa-check-circle"></i>We use the latest diagnostic equipment</li>
                                            <li className="text-light"><i className="far fa-check-circle"></i>Automotive service our clients receive</li>
                                            <li className="text-light"><i className="far fa-check-circle"></i>We are a member of Professional Service</li>
                                            <li className="text-light"><i className="far fa-check-circle"></i>Digital how will activities impact traditional</li>
                                            <li className="text-light"><i className="far fa-check-circle"></i>Architect and technical engineer</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
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
