import React from 'react'
import ImageWithBasePath from '../../core/data/img/ImageWithBasePath'
import {Link} from 'react-router-dom'
import {all_routes} from '../router/AllRoutes'

const LaneRental = () => {
  const route = all_routes
  return (
    <>
      <div className="main-wrapper services-detail-page">
        {/* Breadcrumb */}
        <div className="breadcrumb breadcrumb-list mb-0">
          <span className="primary-right-round" />
          <div className="container">
            <h1 className="text-white">Net Hire</h1>
            <ul>
              <li>
                <Link to={route.home}>Home</Link>
              </li>
              <li>Net hire</li>
            </ul>
          </div>
        </div>
        {/* /Breadcrumb */}
        {/* Page Content */}
        <div className="content hexagon-background">
          <div className="container">
            <div className="service-detail">
              <div className="banner aos" data-aos="fade-up">
                <ImageWithBasePath
                  src="assets/img/services/lane-rental.jpg"
                  className="img-fluid"
                  alt="Service"
                />
              </div>
              <div className="aos" data-aos="fade-up">
                <h2>Net Hire</h2>
                <p className="mb-5">
                  Welcome to HPC Chigwell, our cutting-edge indoor cricket facility, strategically
                  situated between London and Essex. Our centre boasts three cricket nets featuring
                  custom-designed training surfaces that closely mimic outdoor pitches. We have
                  meticulously researched and tested the materials used in our construction to
                  ensure the highest quality experience for our users. Each lane is equipped with
                  high-definition cameras, allowing for session playback analysis to enhance your
                  training. Additionally, we offer the option to hire bowling machines and speed
                  guns, suitable for both adults and children. For corporate events or birthday
                  parties, please reach out to us directly for more information.
                </p>
              </div>
              <div className="our-benefits aos" data-aos="fade-up">
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                    <div className="banner">
                      <ImageWithBasePath
                        src="assets/img/services/lane_rental_2.jpg"
                        className="img-fluid"
                        alt="Service"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                    <div className="info">
                      <h3>Our Benefits</h3>
                      <ul>
                        <li>
                          <i className="fa-solid fa-bolt" /> <span>Bespoke playing surface</span>
                        </li>
                        <li>
                          <i className="fa-solid fa-bolt" />{' '}
                          <span>
                            Retractable nets between Lane 1 and 2, should you wish to book a wider
                            playing area.
                          </span>
                        </li>
                        <li>
                          <i className="fa-solid fa-bolt" />{' '}
                          <span>Fixed and height adjustable bowling machines</span>
                        </li>
                        <li>
                          <i className="fa-solid fa-bolt" />{' '}
                          <span>Kids’ Soft Ball Bowling Machine</span>
                        </li>
                        <li>
                          <i className="fa-solid fa-bolt" />{' '}
                          <span>Session Playback Video Recording/Analysis</span>
                        </li>
                        <li>
                          <i className="fa-solid fa-bolt" /> <span>Speed Gun</span>
                        </li>
                        <li>
                          <i className="fa-solid fa-bolt" /> <span>Equipment Hire</span>
                        </li>
                      </ul>
                      <div className="view-all aos mt-4" data-aos="fade-up">
                        <Link
                          to={`${route.bookingType}/lane/location/london-chigwell/time&date`}
                          className="btn btn-primary d-inline-flex align-items-center"
                        >
                          Book now{' '}
                          <span className="lh-1">
                            <i className="feather-arrow-right-circle ms-2" />
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
      </div>
    </>
  )
}

export default LaneRental
