import React from 'react'
import {Link} from 'react-router-dom'
import ImageWithBasePath from '../../core/data/img/ImageWithBasePath'
import {all_routes} from '../router/AllRoutes'

const CoachOrederConfirm = () => {
  const routes = all_routes
  return (
    <div>
      <>
        {/* Breadcrumb */}
        <div className="breadcrumb mb-0">
          <span className="primary-right-round" />
          <div className="container">
            <h1 className="text-white">Book A Coach</h1>
            <ul>
              <li>
                <Link to={routes.home}>Home</Link>
              </li>
              <li>Book A Coach</li>
            </ul>
          </div>
        </div>
        {/* /Breadcrumb */}
        <section className="booking-steps py-30">
          <div className="container">
            <ul className="d-xl-flex justify-content-center align-items-center">
              <li>
                <h5>
                  <Link to={routes.coachDetail}>
                    <span>1</span>Type of Booking
                  </Link>
                </h5>
              </li>
              <li>
                <h5>
                  <Link to={routes.coachBookingAvailability}>
                    <span>2</span>Time &amp; Date
                  </Link>
                </h5>
              </li>
              <li>
                <h5>
                  <Link to={routes.coachPersonalInfo}>
                    <span>3</span>Personal Information
                  </Link>
                </h5>
              </li>
              <li className="active">
                <h5>
                  <Link to={routes.coachOrederConfirm}>
                    <span>4</span>Order Confirmation
                  </Link>
                </h5>
              </li>
              <li>
                <h5>
                  <Link to={routes.coachPayment}>
                    <span>5</span>Payment
                  </Link>
                </h5>
              </li>
            </ul>
          </div>
        </section>
        {/* Page Content */}
        <div className="content">
          <div className="container">
            <section className="card mb-40">
              <div className="text-center mb-40">
                <h3 className="mb-1">Order Confirmation</h3>
                <p className="sub-title">
                  Booking confirmed. Contact support for changes/inquiries. Enjoy your coaching
                  experience with us.
                </p>
              </div>
              <div className="master-academy dull-whitesmoke-bg card">
                <div className="d-sm-flex justify-content-between align-items-center">
                  <div className="d-sm-flex justify-content-start align-items-center">
                    <Link to="#">
                      <ImageWithBasePath
                        className="corner-radius-10"
                        src="assets/img/profiles/avatar-02.png"
                        alt="User"
                      />
                    </Link>
                    <div className="info">
                      <div className="d-flex justify-content-start align-items-center mb-3">
                        <span className="text-white dark-yellow-bg color-white me-2 d-flex justify-content-center align-items-center">
                          4.5
                        </span>
                        <span>300 Reviews</span>
                      </div>
                      <h3 className="mb-2">Kevin Anderson</h3>
                      <p>
                        Certified Cricket Coach with a deep understanding of the sport&apos;s
                        strategies.
                      </p>
                    </div>
                  </div>
                  <div className="white-bg">
                    <p className="mb-1">Starts From</p>
                    <h3 className="d-inline-block primary-text mb-0">$150</h3>
                    <span>/hr</span>
                  </div>
                </div>
              </div>
            </section>
            <section className="card booking-order-confirmation">
              <h5 className="mb-3">Booking Details</h5>
              <ul className="booking-info d-lg-flex justify-content-start align-items-center">
                <li>
                  <h6>Coach Name</h6>
                  <p>Kevin Anderson</p>
                </li>
                <li>
                  <h6>Appointment Date</h6>
                  <p>Mon, Apr 27</p>
                </li>
                <li>
                  <h6>Appointment Start time</h6>
                  <p>05:25 AM</p>
                </li>
                <li>
                  <h6>Appointment End time</h6>
                  <p>06:25 AM</p>
                </li>
              </ul>
              <h5 className="mb-3">Contact Information</h5>
              <ul className="contact-info d-lg-flex justify-content-start align-items-center">
                <li>
                  <h6>Name</h6>
                  <p>Rodick Tramliar</p>
                </li>
                <li>
                  <h6>Contact Email Address</h6>
                  <p>contact@example.com</p>
                </li>
                <li>
                  <h6>Phone Number</h6>
                  <p>+1 56565 556558</p>
                </li>
              </ul>
              <h5 className="mb-3">Payment Information</h5>
              <ul className="payment-info d-lg-flex justify-content-start align-items-center">
                <li>
                  <h6>Coach Price</h6>
                  <p className="primary-text">($150 * 3 hours)</p>
                </li>
                <li>
                  <h6>Subtotal</h6>
                  <p className="primary-text">$350.00</p>
                </li>
              </ul>
            </section>
            <div className="text-center btn-row">
              <Link className="btn btn-primary me-3 btn-icon" to={routes.coachPersonalInfo}>
                <i className="feather-arrow-left-circle me-1" /> Back
              </Link>
              <Link className="btn btn-secondary btn-icon" to={routes.coachPayment}>
                Next <i className="feather-arrow-right-circle ms-1" />
              </Link>
            </div>
          </div>
          {/* /Container */}
        </div>
        {/* /Page Content */}
      </>
    </div>
  )
}

export default CoachOrederConfirm
