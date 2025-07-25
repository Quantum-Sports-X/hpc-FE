import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {all_routes} from '../router/AllRoutes'
import {removeUserConsentAndReload} from '../../utils/consent-cookie'

const Footer = () => {
  const routes = all_routes
  useEffect(() => {
    AOS.init({duration: 1000, once: true})
  }, [])
  return (
    <footer className="footer">
      <div className="container">
        {/* Footer Top */}
        <div className="footer-top">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              {/* Footer Widget */}
              <div className="footer-widget footer-menu">
                <h4 className="footer-title">Contact us</h4>
                <div className="footer-address-blk">
                  <div className="footer-call">
                    <span>Contact number</span>
                    <p className="mb-1">07368991211</p>
                    <p className="mb-2">02035899165</p>
                  </div>
                  <div className="footer-call">
                    <span>Need Live Suppot</span>
                    <p>
                      <Link to="mailto:info@hpcricket.co.uk" className="text-white">
                        info@hpcricket.co.uk
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="social-icon">
                  <ul>
                    <li>
                      <Link
                        to="https://web.facebook.com/Highperformancecricket/?_rdc=1&_rdr"
                        target="_"
                        className="facebook"
                      >
                        <i className="fab fa-facebook-f" />{' '}
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.instagram.com/hpcchigwell/" className="instagram">
                        <i className="fab fa-instagram" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              {/* /Footer Widget */}
            </div>
            <div className="col-lg-4 col-md-6">
              {/* Footer Widget */}
              <div className="footer-widget footer-menu">
                <h4 className="footer-title">Quick Links</h4>
                <ul>
                  <li>
                    <Link to={routes.home}>Home</Link>
                  </li>
                  <li>
                    <Link to={routes.aboutUs}>About us</Link>
                  </li>
                  <li>
                    <Link to={routes.services}>Services</Link>
                  </li>
                  <li>
                    <Link to={routes.gallery}>Gallery</Link>
                  </li>
                </ul>
              </div>
              {/* /Footer Widget */}
            </div>
            <div className="col-lg-4 col-md-6">
              {/* Footer Widget */}
              <div className="footer-widget footer-menu">
                <h4 className="footer-title">Support</h4>
                <ul>
                  <li>
                    <Link to={routes.contactUs}>Contact Us</Link>
                  </li>
                  {/*<li>*/}
                  {/*  <Link to={routes.faq}>Faq</Link>*/}
                  {/*</li>*/}
                  <li>
                    <Link to={routes.cookiePolicy}>Cookie Policy</Link>
                  </li>
                  <li>
                    <Link to={routes.termsCondition}>Terms &amp; Conditions</Link>
                  </li>
                  <li>
                    <span role="button" onClick={() => removeUserConsentAndReload()}>
                      Cookie settings
                    </span>
                  </li>
                </ul>
              </div>
              {/* /Footer Widget */}
            </div>
          </div>
        </div>
        {/* /Footer Top */}
      </div>
      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          {/* Copyright */}
          <div className="copyright">
            <div className="row align-items-center">
              <div className="copyright-text">
                <div className="col">
                  <p className="mb-0 text-white">
                    © {new Date().getFullYear()} High Performance Cricket Centre - All rights
                    reserved.
                  </p>
                </div>
                <div className="col footerCompanyLogoDiv text-white">
                  Developed by{' '}
                  <a
                    className="btn btn-link p-0 text-decoration-none"
                    href="https://quantumsports.ai/"
                    target="_"
                  >
                    quantumsports.ai
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* /Copyright */}
        </div>
      </div>
      {/* /Footer Bottom */}
    </footer>
  )
}

export default Footer
