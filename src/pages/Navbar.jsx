import React from 'react'

export default function Navbar() {
    
  return (
    <div>

  
      {/* <!--Mobile Menu--> */}
    <div className="th-menu-wrapper onepage-nav">
        <div className="th-menu-area text-center">
            <button className="th-menu-toggle"><i className="fal fa-times"></i></button>
            <div className="mobile-logo">
                <a href="index.html">
                    <img src="assets/img/logo-white.svg" alt="Realar" />
                </a>
            </div>
            <div className="th-mobile-menu">
                <ul>
                    <li className="menu-item-has-children">
                        <a href="index.html">
                            Home
                        </a>
                        <ul className="sub-menu">
                            <li><a href="index.html">Home Luxury Apartment</a></li>
                            <li><a href="home-2.html">Home Real Estate Agency</a></li>
                            <li><a href="home-3.html">Home Commercial Real Estate</a></li>
                        </ul>
                    </li>
                    <li><a href="about.html">
                            About Us
                        </a></li>
                    <li className="menu-item-has-children">
                        <a href="property.html">
                            Properties
                        </a>
                        <ul className="sub-menu">
                            <li><a href="property.html">
                                    Properties
                                </a></li>
                            <li><a href="property-details.html">
                                    Property Details
                                </a></li>
                        </ul>
                    </li>
                    <li className="menu-item-has-children">
                        <a href="agency.html">
                            Agencies
                        </a>
                        <ul className="sub-menu">
                            <li><a href="agency.html">
                                    Agencies
                                </a></li>
                            <li><a href="agency-details.html">
                                    Agencies Details
                                </a></li>
                        </ul>
                    </li>
                    <li className="menu-item-has-children">
                        <a href="#">
                            Pages
                        </a>
                        <ul className="sub-menu">
                            <li><a href="team.html">
                                    Agent Page
                                </a></li>
                            <li><a href="team-details.html">
                                    Agent Details
                                </a></li>
                            <li><a href="pricing.html">
                                    Pricing Page
                                </a></li>
                            <li className="menu-item-has-children"><a href="shop.html">
                                    Shop Page
                                </a>
                                <ul className="sub-menu">
                                    <li><a href="shop.html">
                                            Shop Page
                                        </a></li>
                                    <li><a href="shop-details.html">
                                            Shop Details
                                        </a></li>
                                    <li><a href="cart.html">
                                            Cart Page
                                        </a></li>
                                    <li><a href="checkout.html">
                                            Checkout Page
                                        </a></li>
                                    <li><a href="wishlist.html">
                                            Wistlist Page
                                        </a></li>
                                </ul>
                            </li>
                            <li><a href="error.html">
                                    Error Page
                                </a></li>
                        </ul>
                    </li>
                    <li className="menu-item-has-children">
                        <a href="blog.html">
                            Blog
                        </a>
                        <ul className="sub-menu">
                            <li><a href="blog.html">
                                    Blog Page
                                </a></li>
                            <li><a href="blog-details.html">
                                    Blog Details
                                </a></li>
                        </ul>
                    </li>
                    <li><a href="contact.html">
                            Contact Us
                        </a></li>
                </ul>
            </div>
        </div>
    </div>
    {/* <!-- Sidemenu--> */}
    <div className="sidemenu-wrapper sidemenu-info d-none d-lg-block ">
        <div className="sidemenu-content">
            <button className="closeButton sideMenuCls"><i className="far fa-times"></i></button>
            <div className="widget  ">
                <div className="th-widget-about">
                    <div className="about-logo">
                        <a href="index.html"><img src="assets/img/logo.svg" alt="Realar" /></a>
                    </div>
                    <p className="about-text"> Rapidiously myocardinate cross-platform intellectual capital model. Appropriately create interactive infrastructures</p>
                </div>
            </div>
            <div className="widget  ">
                <h3 className="widget_title">Get In Touch</h3>
                <div className="th-widget-contact">
                    <div className="info-box_text">
                        <div className="icon"><img src="assets/img/icon/location-dot.svg" alt="img" /></div>
                        <div className="details">
                            <p>789 Inner Lane, Holy park,</p>
                            <p>California, USA</p>
                        </div>
                    </div>
                    <div className="info-box_text">
                        <div className="icon">
                            <img src="assets/img/icon/phone.svg" alt="img" />
                        </div>
                        <div className="details">
                            <p><a href="tel:+0123456789" className="info-box_link">+01 234 567 890</a></p>
                            <p><a href="tel:+09876543210" className="info-box_link">+09 876 543 210</a></p>
                        </div>
                    </div>
                    <div className="info-box_text">
                        <div className="icon">
                            <img src="assets/img/icon/envelope.svg" alt="img" />
                        </div>
                        <div className="details">
                            <p><a href="mailto:mailinfo00@realar.com" className="info-box_link">mailinfo00@realar.com</a></p>
                            <p><a href="mailto:support24@realar.com" className="info-box_link">support24@realar.com</a></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="widget newsletter-widget  ">
                <h3 className="widget_title">Subscribe Now</h3>
                <form className="newsletter-form">
                    <div className="form-group">
                        <input className="form-control" type="email" placeholder="Email Address" required="" />
                        <button type="submit" className="th-btn"><i className="far fa-paper-plane text-theme"></i></button>
                    </div>
                </form>
                <div className="th-social style2">
                    <a href="https://www.facebook.com/"><i className="fab fa-facebook-f"></i></a>
                    <a href="https://www.twitter.com/"><i className="fab fa-twitter"></i></a>
                    <a href="https://www.linkedin.com/"><i className="fab fa-linkedin-in"></i></a>
                    <a href="https://www.behance.com/"><i className="fab fa-behance"></i></a>
                    <a href="https://www.vimeo.com/"><i className="fab fa-vimeo-v"></i></a>
                </div>
            </div>
        </div>
    </div>
    {/* <!--Header Area--> */}
    <div className="th-header header-layout1">
        <div className="sticky-wrapper">
            {/* <!-- Main Menu Area --> */}
            <div className="menu-area">
                <div className="container">
                    <div className="row align-items-center justify-content-between">
                        <div className="col-auto">
                            <div className="header-logo">
                                <a href="index.html">
                                    <img src="assets/img/logo-white.svg" alt="Realar" />
                                </a>
                            </div>
                        </div>
                        <div className="col-auto">
                            <nav className="main-menu d-none d-lg-inline-block">
                                <ul>
                                    <li className="menu-item-has-children">
                                        <a href="index.html">
                                            Home
                                        </a>
                                        <ul className="sub-menu">
                                            <li><a href="index.html">Home Luxury Apartment</a></li>
                                            <li><a href="home-2.html">Home Real Estate Agency</a></li>
                                            <li><a href="home-3.html">Home Commercial Real Estate</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="about.html">
                                            About Us
                                        </a></li>
                                    <li className="menu-item-has-children">
                                        <a href="property.html">
                                            Properties
                                        </a>
                                        <ul className="sub-menu">
                                            <li><a href="property.html">
                                                    Properties
                                                </a></li>
                                            <li><a href="property-details.html">
                                                    Property Details
                                                </a></li>
                                        </ul>
                                    </li>
                                    <li className="menu-item-has-children">
                                        <a href="agency.html">
                                            Agencies
                                        </a>
                                        <ul className="sub-menu">
                                            <li><a href="agency.html">
                                                    Agencies
                                                </a></li>
                                            <li><a href="agency-details.html">
                                                    Agencies Details
                                                </a></li>
                                        </ul>
                                    </li>
                                    <li className="menu-item-has-children">
                                        <a href="#">
                                            Pages
                                        </a>
                                        <ul className="sub-menu">
                                            <li><a href="team.html">
                                                    Agent Page
                                                </a></li>
                                            <li><a href="team-details.html">
                                                    Agent Details
                                                </a></li>
                                            <li><a href="pricing.html">
                                                    Pricing Page
                                                </a></li>
                                            <li className="menu-item-has-children"><a href="shop.html">
                                                    Shop Page
                                                </a>
                                                <ul className="sub-menu">
                                                    <li><a href="shop.html">
                                                            Shop Page
                                                        </a></li>
                                                    <li><a href="shop-details.html">
                                                            Shop Details
                                                        </a></li>
                                                    <li><a href="cart.html">
                                                            Cart Page
                                                        </a></li>
                                                    <li><a href="checkout.html">
                                                            Checkout Page
                                                        </a></li>
                                                    <li><a href="wishlist.html">
                                                            Wistlist Page
                                                        </a></li>
                                                </ul>
                                            </li>
                                            <li><a href="error.html">
                                                    Error Page
                                                </a></li>
                                        </ul>
                                    </li>
                                    <li className="menu-item-has-children">
                                        <a href="blog.html">
                                            Blog
                                        </a>
                                        <ul className="sub-menu">
                                            <li><a href="blog.html">
                                                    Blog Page
                                                </a></li>
                                            <li><a href="blog-details.html">
                                                    Blog Details
                                                </a></li>
                                        </ul>
                                    </li>
                                    <li><a href="contact.html">
                                            Contact Us
                                        </a></li>
                                </ul>
                            </nav>
                            <div className="header-button d-flex d-lg-none">
                                <button type="button" className="th-menu-toggle sidebar-btn">
                                    <span className="line"></span>
                                    <span className="line"></span>
                                    <span className="line"></span>
                                </button>
                            </div>
                        </div>
                        <div className="col-auto d-none d-xl-block">
                            <div className="header-button">
                                <a href="contact.html" className="th-btn btn-mask th-btn-icon">Contact Us</a>
                                <button type="button" className="simple-icon sideMenuInfo sidebar-btn">
                                    <span className="line"></span>
                                    <span className="line"></span>
                                    <span className="line"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
    </div>


   </div>
  )
}
