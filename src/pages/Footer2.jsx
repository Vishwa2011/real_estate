import React from 'react'

export default function Footer2() {
  return (
    <div>
       <footer className="footer-wrapper footer-default bg-theme">
        <div className="widget-area">
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-md-6 col-xl-auto">
                        <div className="widget footer-widget">
                            <div className="th-widget-about">
                                <div className="about-logo">
                                    <a href=""><img src="assets/img/logo-white2.svg" alt="Realar" /></a>
                                </div>
                                <p className="about-text"> Rapidiously myocardinate cross-platform intellectual capital model. Appropriately create interactive infrastructures</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-auto">
                        <div className="widget footer-widget">
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
                    </div>
                    <div className="col-md-6 col-xl-auto">
                        <div className="widget widget_nav_menu footer-widget">
                            <h3 className="widget_title">Useful Link</h3>
                            <div className="menu-all-pages-container">
                                <ul className="menu">
                                    <li><a href="/Aboutus">About us</a></li>
                                    <li><a href="/PrivacyPolicy">Privacy Policy</a></li>
                                    <li><a href="/Termsandcondition">Terms & Condition</a></li>
                                    <li><a href="/Faq">FAQ</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-auto">
                        <div className="widget widget_nav_menu footer-widget">
                            <h3 className="widget_title">Explore</h3>
                            <div className="menu-all-pages-container">
                                <ul className="menu">
                                    <li><a href="/Property">All Properties</a></li>
                                    {/* <li><a href="">Our Agents</a></li>
                                    <li><a href="">All Projects</a></li> */}
                                    <li><a href="/Aboutus">Our Process</a></li>
                                    <li><a href="/Contact">Neighborhood</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="newsletter-wrap">
                        <h5 className="newsletter-title" style={{color:'#a4b5ba'}}>Newsletter To Get Updated The Latest News</h5>
                        <form action="#" className="newsletter-form">
                            <div className="form-group" style={{border:'1px solid #a4b5ba'}}>
                                <input type="text" className="form-control" placeholder="Enter Email" />
                            </div>
                            <button className="th-btn btn-mask">Subscribe Now <span className="btn-icon"><img src="assets/img/icon/paper-plane.svg" alt="img" /></span></button>
                        </form>
                    </div>
            </div>
        </div>
        <div className="copyright-wrap bg-light">
            <div className="container">
                <div className="row gy-3 align-items-center">
                    <div className="col-lg-6">
                        <p className="copyright-text">
                            Copyright <i className="fal fa-copyright"></i> 2024 <a href="">Realar</a>, All rights reserved.</p>
                    </div>
                    <div className="col-lg-6">
                        <div className="th-social justify-content-lg-end justify-content-center">
                            <a href="https://www.facebook.com/"><i className="fab fa-facebook-f"></i></a>
                            <a href="https://www.twitter.com/"><i className="fab fa-twitter"></i></a>
                            <a href="https://www.instagram.com/"><i className="fab fa-youtube"></i></a>
                            <a href="https://www.instagram.com/"><i className="fab fa-instagram"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    </div>
  )
}
