import React from "react";
import Navbar from "./Navbar";
import { useEffect } from "react";
import gsap from "gsap";
import $ from "jquery";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Footer2 from "./Footer2";
gsap.registerPlugin(ScrollToPlugin);
export default function Termsandcondition() {
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
                style={{ backgroundImage: `url('')` }}
            >
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-9">
                            <div className="breadcumb-content">
                                <h1 className="breadcumb-title">Terms & Condition</h1>
                                <ul className="breadcumb-menu">
                                    <li>
                                        <a href="/">Home</a>
                                    </li>
                                    <li>Terms & Condition</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!--Terms & Condition Area--> */}
            <div className="space overflow-hidden">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-10">
                        <h4>Terms & Condition</h4>
                            <p>Welcome to [Realar]. By accessing or using our website and services, you agree to comply with and be bound by the following terms and conditions. Please read these terms carefully.</p>

                            <h4>1. Acceptance of Terms</h4>
                            <p>By accessing our website or using our services, you agree to these Terms and Conditions. If you do not agree, please do not use our website.</p>

                            <h4>2. Use of Website</h4>
                            <p>You agree to use our website for lawful purposes only. You are prohibited from:</p>
                            <ul>
                                <li>Using the website in any way that violates local, national, or international laws.</li>
                                <li>Engaging in any fraudulent, harmful, or malicious activities.</li>
                                <li>Attempting to gain unauthorized access to our systems or data.</li>
                            </ul>

                            <h4>3. Property Listings and Services</h4>
                            <ul>
                                <li>All property listings are provided for informational purposes only. We do not guarantee the accuracy, completeness, or availability of any listings.</li>
                                <li>Users are responsible for verifying property details before making decisions.</li>
                                <li>We reserve the right to modify, update, or remove property listings at any time without prior notice.</li>
                            </ul>

                            <h4>4. User Accounts</h4>
                            <ul>
                                <li>If you create an account with us:</li>
                                <li>You are responsible for maintaining the confidentiality of your account information.</li>
                                <li>You agree to notify us immediately of any unauthorized use of your account.</li>
                                <li>We reserve the right to suspend or terminate accounts that violate our policies.</li>
                            </ul>

                            <h4>5. Payments and Transactions</h4>
                            <p>All payments for services or property transactions must be made through secure channels. We are not liable for any unauthorized transactions resulting from user negligence.</p>

                            <h4>6. Intellectual Property</h4>
                            <p>All content, logos, designs, and trademarks on our website are the property of [Realar]. You may not copy, modify, or distribute any content without our written consent.</p>

                            <h4>7. Limitation of Liability</h4>
                            <p>We are not liable for:</p>
                            <ul>
                                <li>Any direct, indirect, or consequential damages resulting from the use of our website or services.</li>
                                <li>Loss of data, financial loss, or property disputes arising from third-party interactions.</li>
                            </ul>

                            <h4>8. Changes to Terms</h4>
                            <p>We may update these Terms and Conditions at any time. Continued use of our services after updates constitutes your acceptance of the revised terms.</p>

                            <h4>9. Contact Us</h4>
                            <p>If you have any questions about these Terms and Conditions, please contact us at:</p>
                            <p><strong>[Realar]</strong><br />[mailinfo00@realar.com]<br />[+09 876 543 210]</p> </div>
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
