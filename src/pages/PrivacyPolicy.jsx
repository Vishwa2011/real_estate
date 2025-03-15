import React from "react";
import Navbar from "./Navbar";
import { useEffect } from "react";
import gsap from "gsap";
import $ from "jquery";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Footer2 from "./Footer2";
gsap.registerPlugin(ScrollToPlugin);
export default function PrivacyPolicy() {
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
        style={{ backgroundImage: `url('/assets/pic/privacymain.jpg')` }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-9">
              <div className="breadcumb-content">
                <h1 className="breadcumb-title">Privacy Policy</h1>
                <ul className="breadcumb-menu">
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>Privacy Policy</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!--policy Area--> */}
      <div className="space overflow-hidden">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <h4>Privacy Policy</h4>
             
              <p>
                At [Realar], we are committed to protecting your
                privacy. This Privacy Policy outlines how we collect, use, and
                safeguard your personal information when you visit our website
                or use our services related to property sales and rentals.
              </p>

              <h4>1. Information We Collect</h4>
              <ul>
                <li>
                  <strong>Personal Information:</strong> Name, email address,
                  phone number, and mailing address.
                </li>
                <li>
                  <strong>Property Details:</strong> Information about
                  properties you list or inquire about.
                </li>
                <li>
                  <strong>Payment Information:</strong> For processing
                  transactions securely.
                </li>
                <li>
                  <strong>Usage Data:</strong> IP address, browser type, and
                  browsing behavior on our website.
                </li>
              </ul>

              <h4>2. How We Use Your Information</h4>
              <ul>
                <li>
                  Provide and manage property listings and rental services.
                </li>
                <li>
                  Respond to your inquiries and customer support requests.
                </li>
                <li>Process transactions securely.</li>
                <li>Improve our website and services.</li>
                <li>
                  Send you relevant updates, promotions, or property listings
                  (if you opt-in).
                </li>
              </ul>

              <h4>3. Sharing Your Information</h4>
              <p>We may share your data with:</p>
              <ul>
                <li>
                  <strong>Service Providers:</strong> Trusted third-party
                  services that assist in our operations (e.g., payment
                  processors, marketing tools).
                </li>
                <li>
                  <strong>Legal Obligations:</strong> If required by law or to
                  protect our rights.
                </li>
              </ul>
              <p>
                We do <strong>not</strong> sell or trade your personal
                information to third parties.
              </p>

              <h4>4. Data Security</h4>
              <p>
                We implement security measures such as encryption and secure
                servers to protect your data from unauthorized access,
                disclosure, or alteration.
              </p>

              <h4>5. Cookies and Tracking Technologies</h4>
              <p>
                We use cookies and similar technologies to improve user
                experience and analyze website performance. You can manage your
                cookie preferences through your browser settings.
              </p>

              <h4>6. Third-Party Links</h4>
              <p>
                Our website may contain links to third-party websites. We are
                not responsible for their privacy practices and recommend
                reviewing their policies separately.
              </p>

              <h4>7. Your Rights</h4>
              <ul>
                <li>Access, update, or delete your personal data.</li>
                <li>Opt-out of marketing communications at any time.</li>
                <li>Request a copy of the information we hold about you.</li>
              </ul>

              <h4>8. Changes to This Policy</h4>
              <p>
                We may update this Privacy Policy as needed to reflect changes
                in our services or legal requirements. We encourage you to
                review this policy periodically.
              </p>

              <h4>9. Contact Us</h4>
              <p>
                If you have any questions about this Privacy Policy or how we
                handle your data, please contact us at:
              </p>
              <p>
                <strong>[Realar]</strong>
                <br />
                [mailinfo00@realar.com]
                <br />
                [+09 876 543 210]
              </p>
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
