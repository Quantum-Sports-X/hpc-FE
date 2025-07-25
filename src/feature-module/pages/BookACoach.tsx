import React from 'react'
import ImageWithBasePath from '../../core/data/img/ImageWithBasePath'
import {Link} from 'react-router-dom'
import {all_routes} from '../router/AllRoutes'
import {constructCoachesPath} from '../../services/commonService'

const BookACoach = () => {
  const route = all_routes
  return (
    <>
      <div className="main-wrapper services-detail-page">
        {/* Breadcrumb */}
        <div className="breadcrumb breadcrumb-list mb-0">
          <span className="primary-right-round" />
          <div className="container">
            <h1 className="text-white">Book a coach</h1>
            <ul>
              <li>
                <Link to={route.home}>Home</Link>
              </li>
              <li>Book a coach</li>
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
                  src="assets/img/services/coaching.jpg"
                  className="img-fluid"
                  alt="Service"
                />
              </div>
              <div className="aos" data-aos="fade-up">
                <h2>Book a Coach</h2>
                <p className="mb-3">
                  HPC Coaching offers high quality, one to one and group coaching sessions across
                  London and Essex. Our coaching sessions include player analysis, customised player
                  training plans, masterclasses and holiday camps.
                </p>
                <p className="mb-3">
                  All our coaches are ECB qualified and have excelled at playing at a national and
                  international level, which we believe is key to taking players to the next level.
                  Our aim is to develop cricketers to compete and excel at the highest national and
                  international standard.
                </p>
                <p className="mb-3">
                  As a coaching unit we are different because we try to fix problems for players
                  quickly so that they don’t need to keep coming back for sessions.
                </p>
              </div>
              {process.env.REACT_APP_COACHING_DISABLED === 'false' && (
                <div className="view-all aos mb-4" data-aos="fade-up">
                  <Link
                    to={constructCoachesPath('london-chigwell')}
                    className="btn btn-secondary d-inline-flex align-items-center"
                  >
                    View All Coaches{' '}
                    <span className="lh-1">
                      <i className="feather-arrow-right-circle ms-2" />
                    </span>
                  </Link>
                </div>
              )}

              <div className="our-benefits aos" data-aos="fade-up">
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                    <div className="banner">
                      <ImageWithBasePath
                        src="assets/img/services/coaching2.jpg"
                        className="img-fluid"
                        alt="Service"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                    <div className="info">
                      <h3>Our Benefits</h3>
                      <p>
                        Personalised training to enhance your fitness, agility, and overall
                        performance.
                      </p>
                      <ul>
                        <li>
                          <i className="fa-solid fa-bolt" />{' '}
                          <span>
                            Improve footwork, timing, and positioning for better batting, bowling,
                            and fielding.
                          </span>
                        </li>
                        <li>
                          <i className="fa-solid fa-bolt" />{' '}
                          <span>
                            Build strength and power to deliver more accurate shots and effective
                            deliveries.
                          </span>
                        </li>
                        <li>
                          <i className="fa-solid fa-bolt" />{' '}
                          <span>
                            Gain valuable insights on technique, strategy, and consistent
                            progression from experienced coaches.
                          </span>
                        </li>
                        <li>
                          <i className="fa-solid fa-bolt" />{' '}
                          <span>
                            Our coaching program is designed to unlock your full potential, taking
                            your cricket skills to the next level.
                          </span>
                        </li>
                      </ul>
                      <div className="view-all aos mt-4" data-aos="fade-up">
                        {process.env.REACT_APP_COACHING_DISABLED !== 'false' ? (
                          <a
                            href="https://docs.google.com/forms/d/e/1FAIpQLSfEnWeeCdKzZJHRn0xKUBwmgIoRGEvlHLpc_aFHJ5Lg6W3R4g/viewform"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary d-inline-flex align-items-center"
                          >
                            Book now{' '}
                            <span className="lh-1">
                              <i className="feather-arrow-right-circle ms-2" />
                            </span>
                          </a>
                        ) : (
                          <Link
                            to={`${route.bookingType}/coach/location/london-chigwell/time&date`}
                            className="btn btn-primary d-inline-flex align-items-center"
                          >
                            Book now{' '}
                            <span className="lh-1">
                              <i className="feather-arrow-right-circle ms-2" />
                            </span>
                          </Link>
                        )}
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

export default BookACoach
