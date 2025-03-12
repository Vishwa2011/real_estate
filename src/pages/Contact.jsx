import React from "react";
import Navbar from "./Navbar";
import { useEffect } from "react";
import gsap from "gsap";
import $ from "jquery";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Footer2 from "./Footer2";
gsap.registerPlugin(ScrollToPlugin);
export default function Contact() {
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
        style={{ backgroundImage: `url('/assets/pic/contactmain.jpg')`,backgroundPosition:'center' }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-9">
              <div className="breadcumb-content">
                <h1 className="breadcumb-title">Contact</h1>
                <ul className="breadcumb-menu">
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>Contact</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!--Contact Area--> */}
    <div className="space">
        <div className="container">
            <div className="title-area text-center">
                <span className="sub-title">Get In Touch</span>
                <h2 className="sec-title text-theme">Our Contact Information</h2>
            </div>
            <div className="row gy-4 justify-content-center">
                <div className="col-xl-4 col-lg-6">
                    <div className="about-contact-grid style2">
                        <div className="about-contact-icon">
                            <i className="fal fa-location-dot"></i>
                        </div>
                        <div className="about-contact-details">
                            <h6 className="about-contact-details-title">Our Address</h6>
                            <p className="about-contact-details-text">2690 Hiltona Street Victoria</p>
                            <p className="about-contact-details-text">Road, New York, Canada</p>
                        </div>
                    </div>
                </div>
                <div className="col-xl-4 col-lg-6">
                    <div className="about-contact-grid style2">
                        <div className="about-contact-icon">
                            <i className="fal fa-phone"></i>
                        </div>
                        <div className="about-contact-details">
                            <h6 className="about-contact-details-title">Phone Number</h6>
                            <p className="about-contact-details-text"><a href="tel:01234567890">+01 234 567 890</a></p>
                            <p className="about-contact-details-text"><a href="tel:01234567890">+09 876 543 210</a></p>
                        </div>
                    </div>
                </div>
                <div className="col-xl-4 col-lg-6">
                    <div className="about-contact-grid style2">
                        <div className="about-contact-icon">
                            <i className="fal fa-envelope"></i>
                        </div>
                        <div className="about-contact-details">
                            <h6 className="about-contact-details-title">Email Address</h6>
                            <p className="about-contact-details-text"><a href="mailto:mailinfo00@realar.com">mailinfo00@realar.com</a></p>
                            <p className="about-contact-details-text"><a href="mailto:support24@realar.com">support24@realar.com</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* <!--Contact Area --> */}
    <div className="space contact-area-3 z-index-common" style={{
    backgroundImage: "url('/assets/pic/contact1.webp')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}>
        <div className="contact-bg-shape3-1 spin shape-mockup " data-bottom="5%" data-left="12%">
            <img src="assets/img/shape/section_shape_2_1.jpg" alt="img" />
        </div>
        <div className="container">
            <div className="row gx-35">
                <div className="col-lg-6">
                    <div className="appointment-wrap2 bg-white me-xxl-5">
                        <h2 className="form-title text-theme">Schedule a visit</h2>
                        <form action="mail.php" method="POST" className="appointment-form ajax-contact">
                            <div className="row">
                                <div className="form-group style-border style-radius col-12">
                                    <input type="text" className="form-control" name="name" id="name" placeholder="Your Name*" />
                                    <i className="fal fa-user"></i>
                                </div>
                                <div className="form-group style-border style-radius col-12">
                                    <input type="email" className="form-control" name="email" id="email" placeholder="Your Email*" />
                                    <i className="fal fa-envelope"></i>
                                </div>
                                <div className="form-group style-border style-radius col-md-12">
                                    <select name="subject" id="subject" className="form-select">
                                        <option value="" disabled selected hidden>Select Service Type</option>
                                        <option value="Real Estate">Real Estate</option>
                                        <option value="Apartment">Apartment</option>
                                        <option value="Residencial">Residencial</option>
                                        <option value="Deluxe">Deluxe</option>
                                    </select>
                                    <i className="fal fa-angle-down"></i>
                                </div>
                                <div className="col-12 form-group style-border style-radius">
                                    <i className="far fa-comments"></i>
                                    <textarea placeholder="Type Your Message" className="form-control"></textarea>
                                </div>
                                <div className="col-12 form-btn mt-4">
                                    <button className="th-btn">Submit Message <span className="btn-icon"><img src="assets/img/icon/paper-plane.svg" alt="img" /></span></button>
                                </div>
                            </div>
                            <p className="form-messages mb-0 mt-3"></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div className="location-map contact-sec-map z-index-common">
            <div className="contact-map">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3644.7310056272386!2d89.2286059153658!3d24.00527418490799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fe9b97badc6151%3A0x30b048c9fb2129bc!2sAngfuztheme!5e0!3m2!1sen!2sbd!4v1651028958211!5m2!1sen!2sbd" allowfullscreen="" loading="lazy"></iframe>
            </div>
            <div className="location-map-address bg-theme">
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
  );
}
