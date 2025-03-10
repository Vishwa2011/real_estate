import React from "react";
import Navbar from "./Navbar";
import { useEffect } from "react";
import gsap from "gsap";
import $ from "jquery";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Footer2 from "./Footer2";
gsap.registerPlugin(ScrollToPlugin);

export default function Property() {
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
    
          {/* <!-- Breadcumb --> */}
          <div
            className="breadcumb-wrapper "
            style={{ backgroundImage: `url('assets/img/bg/breadcumb-bg.jpg')`,backgroundPosition:'center' }}
          >
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-xl-9">
                  <div className="breadcumb-content">
                    <h1 className="breadcumb-title">All Property</h1>
                    <ul className="breadcumb-menu">
                      <li>
                        <a href="/">Home</a>
                      </li>
                      <li>Properties</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
    
          {/* <!--Property Page Area--> */}
    <section className="space-top space-extra-bottom">
        <div className="container">
            <ul className="nav nav-tabs property-tab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="rent-tab" data-bs-toggle="tab" data-bs-target="#rent-tab-pane" type="button" role="tab" aria-controls="rent-tab-pane" aria-selected="true">Rent</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="buy-tab" data-bs-toggle="tab" data-bs-target="#buy-tab-pane" type="button" role="tab" aria-controls="buy-tab-pane" aria-selected="false">Buy</button>
                </li>
            </ul>
            <div className="tab-content">
                <div className="tab-pane fade show active" id="rent-tab-pane" role="tabpanel" aria-labelledby="rent-tab" tabindex="0">
                    <form className="property-search-form">
                        <label>Property Search</label>
                        <div className="form-group">
                            <i className="far fa-search"></i>
                            <input className="form-control" type="text" placeholder="Lisiting ID or Location" />
                        </div>
                        <select className="form-select">
                            <option value="category" selected="selected">Category</option>
                            <option value="luxury">Luxury</option>
                            <option value="commercial">Commercial</option>
                        </select>
                        <select className="form-select">
                            <option value="offer_type" selected="selected">Offer Type</option>
                            <option value="popularity">Popularity</option>
                            <option value="rating">Rating</option>
                            <option value="date">Latest</option>
                        </select>
                        <button className="th-btn" type="submit"><i className="far fa-search"></i> Search</button>
                    </form>
                </div>
                <div className="tab-pane fade" id="buy-tab-pane" role="tabpanel" aria-labelledby="buy-tab" tabindex="0">
                    <form className="property-search-form">
                        <label>Property Search</label>
                        <div className="form-group">
                            <i className="far fa-search"></i>
                            <input className="form-control" type="text" placeholder="Lisiting ID or Location" />
                        </div>
                        <select className="form-select">
                            <option value="category" selected="selected">Category</option>
                            <option value="luxury">Luxury</option>
                            <option value="commercial">Commercial</option>
                        </select>
                        <select className="form-select">
                            <option value="offer_type" selected="selected">Offer Type</option>
                            <option value="popularity">Popularity</option>
                            <option value="rating">Rating</option>
                            <option value="date">Latest</option>
                        </select>
                        <button className="th-btn" type="submit"><i className="far fa-search"></i> Search</button>
                    </form>
                </div>
            </div>
            <div className="th-sort-bar">
                <div className="row justify-content-between align-items-center">
                    <div className="col-md">
                        <p className="woocommerce-result-count">Showing 1–9 of 16 results</p>
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
                            <div className="nav" role="tablist" >
                                <a className="active" href="#" id="tab-shop-list" data-bs-toggle="tab" data-bs-target="#tab-list" role="tab" aria-controls="tab-grid" aria-selected="false"><i className="fa-light fa-grid-2"></i></a>
                                <a href="#" id="tab-shop-grid" data-bs-toggle="tab" data-bs-target="#tab-grid" role="tab" aria-controls="tab-grid" aria-selected="true"><i className="fa-solid fa-list"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade active show" id="tab-list" role="tabpanel" aria-labelledby="tab-shop-list">
                    <div className="row gy-40">
                        <div className="col-md-6 col-xl-4">
                            <div className="property-card2">
                                <div className="property-card-thumb img-shine">
                                    <img src="assets/img/property/property-s-1-1.jpg" alt="img" />
                                </div>
                                <div className="property-card-details">
                                    <div className="media-left">
                                        <h4 className="property-card-title"><a href="">Toronto Townhouse</a></h4>
                                        <h5 className="property-card-price">$ 1500.00 USD/night</h5>
                                        <p className="property-card-location">2715 Ash, South Dakota 83475</p>
                                    </div>
                                    <div className="btn-wrap">
                                        <a href="/PropertyDetails" className="th-btn style-border2 th-btn-icon">Details</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-xl-4">
                            <div className="property-card2">
                                <div className="property-card-thumb img-shine">
                                    <img src="assets/img/property/property-s-1-2.jpg" alt="img" />
                                </div>
                                <div className="property-card-details">
                                    <div className="media-left">
                                        <h4 className="property-card-title"><a href="">Serenity Villa</a></h4>
                                        <h5 className="property-card-price">$ 1500.00 USD/night</h5>
                                        <p className="property-card-location">2464 Royal, New Jersey</p>
                                    </div>
                                    <div className="btn-wrap">
                                        <a href="/PropertyDetails" className="th-btn style-border2 th-btn-icon">Details</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-xl-4">
                            <div className="property-card2">
                                <div className="property-card-thumb img-shine">
                                    <img src="assets/img/property/property-s-1-3.jpg" alt="img" />
                                </div>
                                <div className="property-card-details">
                                    <div className="media-left">
                                        <h4 className="property-card-title"><a href="">Loft Pent House</a></h4>
                                        <h5 className="property-card-price">$ 1500.00 USD/night</h5>
                                        <p className="property-card-location">6391 Elgin St. Celina</p>
                                    </div>
                                    <div className="btn-wrap">
                                        <a href="/PropertyDetails" className="th-btn style-border2 th-btn-icon">Details</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-xl-4">
                            <div className="property-card2">
                                <div className="property-card-thumb img-shine">
                                    <img src="assets/img/property/property-s-1-4.jpg" alt="img" />
                                </div>
                                <div className="property-card-details">
                                    <div className="media-left">
                                        <h4 className="property-card-title"><a href="">Villa Qubic</a></h4>
                                        <h5 className="property-card-price">$ 1500.00 USD/night</h5>
                                        <p className="property-card-location">4517 Washington Manchester</p>
                                    </div>
                                    <div className="btn-wrap">
                                        <a href="/PropertyDetails" className="th-btn style-border2 th-btn-icon">Details</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-xl-4">
                            <div className="property-card2">
                                <div className="property-card-thumb img-shine">
                                    <img src="assets/img/property/property-s-1-5.jpg" alt="img" />
                                </div>
                                <div className="property-card-details">
                                    <div className="media-left">
                                        <h4 className="property-card-title"><a href="">Spectral Houses</a></h4>
                                        <h5 className="property-card-price">$ 1500.00 USD/night</h5>
                                        <p className="property-card-location">1901 Thornridge, Hawaii 81063</p>
                                    </div>
                                    <div className="btn-wrap">
                                        <a href="/PropertyDetails" className="th-btn style-border2 th-btn-icon">Details</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-xl-4">
                            <div className="property-card2">
                                <div className="property-card-thumb img-shine">
                                    <img src="assets/img/property/property-s-1-6.jpg" alt="img" />
                                </div>
                                <div className="property-card-details">
                                    <div className="media-left">
                                        <h4 className="property-card-title"><a href="">Modern House</a></h4>
                                        <h5 className="property-card-price">$ 1500.00 USD/night</h5>
                                        <p className="property-card-location">2715 Ash Dr. San Jose</p>
                                    </div>
                                    <div className="btn-wrap">
                                        <a href="/PropertyDetails" className="th-btn style-border2 th-btn-icon">Details</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-xl-4">
                            <div className="property-card2">
                                <div className="property-card-thumb img-shine">
                                    <img src="assets/img/property/property-s-1-7.jpg" alt="img" />
                                </div>
                                <div className="property-card-details">
                                    <div className="media-left">
                                        <h4 className="property-card-title"><a href="">Villa Archetype</a></h4>
                                        <h5 className="property-card-price">$ 1500.00 USD/night</h5>
                                        <p className="property-card-location">3517 W. Gray St. Utica</p>
                                    </div>
                                    <div className="btn-wrap">
                                        <a href="/PropertyDetails" className="th-btn style-border2 th-btn-icon">Details</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-xl-4">
                            <div className="property-card2">
                                <div className="property-card-thumb img-shine">
                                    <img src="assets/img/property/property-s-1-8.jpg" alt="img" />
                                </div>
                                <div className="property-card-details">
                                    <div className="media-left">
                                        <h4 className="property-card-title"><a href="">Alpina house</a></h4>
                                        <h5 className="property-card-price">$ 1500.00 USD/night</h5>
                                        <p className="property-card-location">6391 Elgin St. Celina</p>
                                    </div>
                                    <div className="btn-wrap">
                                        <a href="/PropertyDetails" className="th-btn style-border2 th-btn-icon">Details</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-xl-4">
                            <div className="property-card2">
                                <div className="property-card-thumb img-shine">
                                    <img src="assets/img/property/property-s-1-9.jpg" alt="img" />
                                </div>
                                <div className="property-card-details">
                                    <div className="media-left">
                                        <h4 className="property-card-title"><a href="">Emma House</a></h4>
                                        <h5 className="property-card-price">$ 1500.00 USD/night</h5>
                                        <p className="property-card-location">4517 Washington Manchester</p>
                                    </div>
                                    <div className="btn-wrap">
                                        <a href="/PropertyDetails" className="th-btn style-border2 th-btn-icon">Details</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                <div className="tab-pane fade" id="tab-grid" role="tabpanel" aria-labelledby="tab-shop-grid">
                    <div className="property-card-wrap style-dark">
                        <div className="property-thumb">
                            <img src="assets/img/property/property1-1.png" alt="img" />
                        </div>
                        <div className="property-card style-dark">
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
                                    <span className="divider-line"></span>
                                    <span><img src="assets/img/icon/property-icon1-2.svg" alt="img" />Bath 2</span>
                                    <span className="divider-line"></span>
                                    <span><img src="assets/img/icon/property-icon1-3.svg" alt="img" />1500 sqft</span>
                                </div>
                                <div className="property-btn-wrap">
                                    <div className="property-author-wrap">
                                        <img src="assets/img/property/property-user-1-1.png" alt="img" />
                                        <a href="">Admin</a>
                                    </div>
                                    <a href="/PropertyDetails" className="th-btn style-border2 th-btn-icon">Details</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="property-card-wrap style-dark">
                        <div className="property-thumb">
                            <img src="assets/img/property/property1-2.png" alt="img" />
                        </div>
                        <div className="property-card style-dark">
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
                                    <span className="divider-line"></span>
                                    <span><img src="assets/img/icon/property-icon1-2.svg" alt="img" />Bath 2</span>
                                    <span className="divider-line"></span>
                                    <span><img src="assets/img/icon/property-icon1-3.svg" alt="img" />1500 sqft</span>
                                </div>
                                <div className="property-btn-wrap">
                                    <div className="property-author-wrap">
                                        <img src="assets/img/property/property-user-1-2.png" alt="img" />
                                        <a href="">Admin</a>
                                    </div>
                                    <a href="/PropertyDetails" className="th-btn style-border2 th-btn-icon">Details</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="property-card-wrap style-dark">
                        <div className="property-thumb">
                            <img src="assets/img/property/property1-3.png" alt="img" />
                        </div>
                        <div className="property-card style-dark">
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
                                    <span className="divider-line"></span>
                                    <span><img src="assets/img/icon/property-icon1-2.svg" alt="img" />Bath 2</span>
                                    <span className="divider-line"></span>
                                    <span><img src="assets/img/icon/property-icon1-3.svg" alt="img" />1500 sqft</span>
                                </div>
                                <div className="property-btn-wrap">
                                    <div className="property-author-wrap">
                                        <img src="assets/img/property/property-user-1-3.png" alt="img" />
                                        <a href="">Admin</a>
                                    </div>
                                    <a href="/PropertyDetails" className="th-btn style-border2 th-btn-icon">Details</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="property-card-wrap style-dark">
                        <div className="property-thumb">
                            <img src="assets/img/property/property1-4.png" alt="img" />
                        </div>
                        <div className="property-card style-dark">
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
                                    <span className="divider-line"></span>
                                    <span><img src="assets/img/icon/property-icon1-2.svg" alt="img" />Bath 2</span>
                                    <span className="divider-line"></span>
                                    <span><img src="assets/img/icon/property-icon1-3.svg" alt="img" />1500 sqft</span>
                                </div>
                                <div className="property-btn-wrap">
                                    <div className="property-author-wrap">
                                        <img src="assets/img/property/property-user-1-4.png" alt="img" />
                                        <a href="">Admin</a>
                                    </div>
                                    <a href="/PropertyDetails" className="th-btn style-border2 th-btn-icon">Details</a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>


            <div className="mt-60 text-center">
                <div className="th-pagination ">
                    <ul>
                        {/* <!-- <li><a className="prev-page" href="blog.html"><i className="far fa-arrow-left me-2"></i>Previous</a></li> --> */}
                        <li><a className="active" href="">1</a></li>
                        <li><a href="">2</a></li>
                        <li><a href="">3</a></li>
                        <li><a className="next-page" href="">Next<i className="far fa-arrow-right ms-2"></i></a></li>
                    </ul>
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
