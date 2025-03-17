import React from "react";
import Navbar from "./Navbar";
import { useEffect } from "react";
import gsap from "gsap";
import $ from "jquery";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Footer2 from "./Footer2";
gsap.registerPlugin(ScrollToPlugin);
export default function Faq() {
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
      <div
        className="breadcumb-wrapper "
        style={{ backgroundImage: `url('/assets/pic/faqmain.webp')`,backgroundPosition:'center' }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-9">
              <div className="breadcumb-content">
                <h1 className="breadcumb-title">Our FAQ</h1>
                <ul className="breadcumb-menu">
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>FAQ</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!--Faq Area--> */}
    <div className="space overflow-hidden">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-10">
                    <div className="title-area text-center">
                        <span className="sub-title">FAQ</span>
                        <h2 className="sec-title text-theme">Frequently Asked Questions</h2>
                        <p className="sec-text text-theme">Have questions you want answers to?</p>
                    </div>
                    <div className="accordion" id="faqAccordion">


                        <div className="accordion-card">
                            <div className="accordion-header" id="collapse-item-1">
                                <button className="accordion-button " type="button" data-bs-toggle="collapse" data-bs-target="#collapse-1" aria-expanded="true" aria-controls="collapse-1">1. How do I start the process of buying a home?</button>
                            </div>
                            <div id="collapse-1" className="accordion-collapse collapse show" aria-labelledby="collapse-item-1" data-bs-parent="#faqAccordion">
                                <div className="accordion-body">
                                    <p className="faq-text">The open-concept layout seamlessly connects the living room with the fully equipped kitchen, boasting top-of-the-line appliances and all the essentials for preparing delicious meals.</p>
                                </div>
                            </div>
                        </div>


                        <div className="accordion-card">
                            <div className="accordion-header" id="collapse-item-2">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-2" aria-expanded="false" aria-controls="collapse-2">2. What factors should I consider when choosing a neighborhood?</button>
                            </div>
                            <div id="collapse-2" className="accordion-collapse collapse " aria-labelledby="collapse-item-2" data-bs-parent="#faqAccordion">
                                <div className="accordion-body">
                                    <p className="faq-text">The open-concept layout seamlessly connects the living room with the fully equipped kitchen, boasting top-of-the-line appliances and all the essentials for preparing delicious meals.</p>
                                </div>
                            </div>
                        </div>


                        <div className="accordion-card">
                            <div className="accordion-header" id="collapse-item-3">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-3" aria-expanded="false" aria-controls="collapse-3">3. How can I determine the right price for selling my property?</button>
                            </div>
                            <div id="collapse-3" className="accordion-collapse collapse " aria-labelledby="collapse-item-3" data-bs-parent="#faqAccordion">
                                <div className="accordion-body">
                                    <p className="faq-text">The open-concept layout seamlessly connects the living room with the fully equipped kitchen, boasting top-of-the-line appliances and all the essentials for preparing delicious meals.</p>
                                </div>
                            </div>
                        </div>


                        <div className="accordion-card">
                            <div className="accordion-header" id="collapse-item-4">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-4" aria-expanded="false" aria-controls="collapse-4">4. What are closing costs and who is responsible for paying them?</button>
                            </div>
                            <div id="collapse-4" className="accordion-collapse collapse " aria-labelledby="collapse-item-4" data-bs-parent="#faqAccordion">
                                <div className="accordion-body">
                                    <p className="faq-text">The open-concept layout seamlessly connects the living room with the fully equipped kitchen, boasting top-of-the-line appliances and all the essentials for preparing delicious meals.</p>
                                </div>
                            </div>
                        </div>


                        <div className="accordion-card">
                            <div className="accordion-header" id="collapse-item-5">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-5" aria-expanded="false" aria-controls="collapse-5">5. How can I negotiate the best price when buying a property?</button>
                            </div>
                            <div id="collapse-5" className="accordion-collapse collapse " aria-labelledby="collapse-item-5" data-bs-parent="#faqAccordion">
                                <div className="accordion-body">
                                    <p className="faq-text">The open-concept layout seamlessly connects the living room with the fully equipped kitchen, boasting top-of-the-line appliances and all the essentials for preparing delicious meals.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="btn-wrap justify-content-center mt-60">
                        <a href="/Aboutus" className="th-btn style-border2 th-btn-icon">Read More</a>
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
  );
}
