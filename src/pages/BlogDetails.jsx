import React from "react";
import Navbar from "./Navbar";
import { useEffect } from "react";
import gsap from "gsap";
import $ from "jquery";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Footer2 from "./Footer2";
gsap.registerPlugin(ScrollToPlugin);
export default function BlogDetails() {
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
        style={{ backgroundImage: `url('/assets/pic/blogdetailsmain.jpeg')`,backgroundPosition:'center',backgroundRepeat:'no-repeat' }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-9">
              <div className="breadcumb-content">
                <h1 className="breadcumb-title">Living sustainability: A day in the life at realar residence</h1>
                <ul className="breadcumb-menu">
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>Blog Details</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!--Blog Area--> */}
    <section className="th-blog-wrapper blog-details overflow-hidden space-top space-extra-bottom">
        <div className="container">
            <div className="row gx-30">
                <div className="col-xxl-8 col-lg-7">
                    <div className="th-blog blog-single mb-0">
                        <div className="blog-img">
                            <img src="/assets/pic/blogdetails1.png" alt="Blog Image" />
                        </div>
                        <div className="blog-content">
                            <div className="blog-meta">
                                <a className="author" href=""><i className="far fa-user"></i>by David Smith</a>
                                <a href=""><i className="far fa-clock"></i>05 June, 2024</a>
                                <a href=""><i className="far fa-house-building"></i>Modern House</a>
                            </div>
                            <h2 className="blog-title">Relar Residence promotes sustainable transportation options, with dedicated spaces.</h2>
                            <p className="blog-text">Welcome to Realar Residence, where sustainability meets comfort in every corner. In this blog post, we'll explore the green innovations seamlessly integrated into the fabric of EcoLand, creating a unique and eco-friendly living experience for its residents.</p>
                            <p className="blog-text">A platform dedicated to exploring the transformative power of education. We believe that education is not only a means to acquire knowledge but also a catalyst for personal growth, societal progress, and global development. In this blog, we aim to inspire, inform, and engage readers in conversations about the latest trends, insights, and innovations in the field of education.</p>

                            <blockquote>
                                <p>Join your neighbors for an eco-friendly social gathering as the day comes to a conclusion. Savor refreshments made with sustainable ingredients and have discussions on sustainable life. By fostering a sense of community.</p>
                                <cite>Michel Clarck</cite>
                            </blockquote>
                            <p className="blog-text">Dinning: Prepare a dinner using fresh ingredients from your own garden or the local CSA program. The energy-efficient appliances in your kitchen make cooking a breeze while minimizing your overall energy consumption. Share a meal with neighbors, The quiet night offers a peaceful ambiance, reinforcing the community's commitment to a sustainable, low-impact lifestyle.</p>
                            <p className="blog-text">Living sustainably at Realar Residence is more than a choice; it's an immersive experience that shapes every moment of your day. From the moment you wake up in your solar-powered home to the evening gatherings with like-minded neighbors</p>
                            <h2 className="blog-title">Residence is not just a place to live it's asustainable way of life.</h2>
                            <p className="blog-text mt-25">Whether you work from home or commute to a nearby office, the energy-efficient features of your home contribute to a productive and eco-conscious workday. Smart home systems allow you to monitor and control energy usage, ensuring that your environmental impact remains minimal.</p>
                            <div className="blog-img mb-40">
                                <img src="/assets/pic/blogdetails5.jpg" alt="img" />
                            </div>
                            <div className="checklist">   
                                <ul>
                                    <li><span>1.</span>Neighborhood: Choosing the ideal neighborhood is an important choice that extends beyond a property's physical characteristics. We'll go over the things to take into account while selecting a neighborhood in this piece, including future growth plans, school districts, and amenities. To make sure that the community you choose fits both your present requirements and your long-term goals, learn how to balance your lifestyle choices and property prices.</li>
                                    <li><span>2.</span>Buying a first home may be an exciting and daunting experience for those who have never done it before. This blog article serves as a thorough guide to help you through the process of buying your first house. We're here to provide you with useful advice and insights to help you navigate every step of the home-buying process, from comprehending the financial elements to luxury about its all realar properties nuances.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="share-links clearfix ">
                        <div className="row justify-content-between">
                            <div className="col-md-auto">
                                <span className="share-links-title">Tags:</span>
                                <div className="tagcloud">
                                    <a href="">Apartment</a>
                                    <a href="">Buyer</a>
                                    <a href="">Modern</a>
                                    <a href="">Luxury</a>
                                </div>
                            </div>
                            <div className="col-md-auto text-xl-end">
                                <span className="share-links-title">Share:</span>
                                <div className="th-social style2 align-items-center">
                                    <a href="https://www.facebook.com/"><i className="fab fa-facebook-f"></i></a>
                                    <a href="https://www.twitter.com/"><i className="fab fa-twitter"></i></a>
                                    <a href="https://www.linkedin.com/"><i className="fab fa-linkedin-in"></i></a>
                                    <a href="https://www.instagram.com/"><i className="fab fa-instagram"></i></a>
                                </div>
                            </div>
                            {/* <!-- Share Links Area end --> */}
                        </div>
                    </div>
                    <div className="th-comments-wrap ">
                        <h3 className="blog-inner-title">Comments (3)</h3>
                        <ul className="comment-list">
                            <li className="th-comment-item">
                                <div className="th-post-comment">
                                    <div className="comment-avater">
                                        <img src="/assets/pic/avatar.jpg" alt="Comment Author" />
                                    </div>
                                    <div className="comment-content">
                                        <h3 className="name">Adam Jhon</h3>
                                        <span className="commented-on">25Jan, 2024 08:56pm</span>
                                        <p className="text">Through this blog, we aim to inspire readers to embrace education as a lifelong journey and to advocate for quality education</p>
                                        <div className="reply_and_edit">
                                            <a href="" className="reply-btn"><i className="fas fa-reply"></i>Reply</a>
                                        </div>
                                    </div>
                                </div>
                                <ul className="children">
                                    <li className="th-comment-item">
                                        <div className="th-post-comment">
                                            <div className="comment-avater">
                                                <img src="/assets/pic/avatar.jpg" alt="Comment Author" />
                                            </div>
                                            <div className="comment-content">
                                                <h3 className="name">Jhon Abraham</h3>
                                                <span className="commented-on">27Jan, 2024 09:00pm</span>
                                                <p className="text">Education News and Trends: We provide updates on the latest developments and trends in the education sector.</p>
                                                <div className="reply_and_edit">
                                                    <a href="" className="reply-btn"><i className="fas fa-reply"></i>Reply</a>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            
                            <li className="th-comment-item">
                                <div className="th-post-comment">
                                    <div className="comment-avater">
                                        <img src="/assets/pic/avatar.jpg" alt="Comment Author" />
                                    </div>
                                    <div className="comment-content">
                                        <h3 className="name">Anadi Juila</h3>
                                        <span className="commented-on">28Jan, 2024 10:15pm</span>
                                        <p className="text">We discuss strategies to help students make informed decisions about their educational and career paths.</p>
                                        <div className="reply_and_edit">
                                            <a href="" className="reply-btn"><i className="fas fa-reply"></i>Reply</a>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div> 
                    {/* <!-- Comment end --> <!-- Comment Form --> */}
                    <div className="th-comment-form ">
                        <div className="form-title">
                            <h3 className="blog-inner-title mb-0">Leave a Reply</h3>
                            <p className="form-text">Your email address will not be published. Required fields are marked</p>
                        </div>
                        <div className="row">
                            <div className="col-md-6 form-group style-border">
                                <i className="far fa-user"></i>
                                <input type="text" placeholder="Full Name*" className="form-control" />
                            </div>
                            <div className="col-md-6 form-group style-border">
                                <i className="far fa-envelope"></i>
                                <input type="text" placeholder="Your Email*" className="form-control" />
                            </div>
                            <div className="col-md-12 form-group style-border">
                                <i className="far fa-globe"></i>
                                <input type="text" placeholder="Website*" className="form-control" />
                            </div>
                            <div className="col-12 form-group style-border">
                                <i className="far fa-pencil"></i>
                                <textarea placeholder="Comment*" className="form-control"></textarea>
                            </div>
                            <div className="col-12 form-group">
                                <input id="reviewcheck" name="reviewcheck" type="checkbox" />
                                <label for="reviewcheck">Save my name, email, and website in this browser for the next time I comment.<span className="checkmark"></span></label>
                            </div>
                            <div className="col-12 form-group mb-0">
                                <button className="th-btn style-border2">Submit Message <span className="btn-icon"><img src="assets/img/icon/paper-plane.svg" alt="img" /></span></button>
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
                                        <a href=""><img src="/assets/pic/blogdetail2.webp" alt="Blog Image" /></a>
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
                                        <a href=""><img src="/assets/pic/blogdetails3.webp" alt="Blog Image" /></a>
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
                                        <a href=""><img src="/assets/pic/blogdetails4.webp" alt="Blog Image" /></a>
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
                        <div className="widget widget_banner  " style={{ backgroundImage: `url('/assets/pic/blog8.webp')` }}>
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
