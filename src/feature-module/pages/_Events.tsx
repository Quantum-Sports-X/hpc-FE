import React from 'react'
import {Link} from 'react-router-dom'
import {all_routes} from '../router/AllRoutes'
import ImageWithBasePath from '../../core/data/img/ImageWithBasePath'

const Events = () => {
  const route = all_routes
  return (
    <>
      <div className="main-wrapper events-page innerpagebg">
        {/* Breadcrumb */}
        <div className="breadcrumb breadcrumb-list mb-0">
          <span className="primary-right-round" />
          <div className="container">
            <h1 className="text-white">Events</h1>
            <ul>
              <li>
                <Link to={route.home}>Home</Link>
              </li>
              <li>Events</li>
            </ul>
          </div>
        </div>
        {/* /Breadcrumb */}
        {/* Page Content */}
        <div className="content">
          <div className="container">
            <section className="services">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                  <div className="listing-item">
                    <div className="listing-img">
                      <Link to={route.eventDetails}>
                        <ImageWithBasePath
                          src="assets/img/events/event-01.jpg"
                          className="img-fluid"
                          alt="Event"
                        />
                      </Link>
                      <div className="date-info text-center">
                        <h2>20</h2>
                        <h6>Sep, 2023</h6>
                      </div>
                    </div>
                    <div className="listing-content">
                      <ul className="d-flex justify-content-start align-items-center">
                        <li>
                          <i className="feather-clock" />
                          06:20 AM
                        </li>
                        <li>
                          <i className="feather-map-pin" />
                          152, 1st Street New York
                        </li>
                      </ul>
                      <h4 className="listing-title">
                        <Link to={route.eventDetails}>Smash Masters</Link>
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                  <div className="listing-item">
                    <div className="listing-img">
                      <Link to={route.eventDetails}>
                        <ImageWithBasePath
                          src="assets/img/events/event-02.jpg"
                          className="img-fluid"
                          alt="Event"
                        />
                      </Link>
                      <div className="date-info text-center">
                        <h2>19</h2>
                        <h6>Sep, 2023</h6>
                      </div>
                    </div>
                    <div className="listing-content">
                      <ul className="d-flex justify-content-start align-items-center">
                        <li>
                          <i className="feather-clock me-1" />
                          06:20 AM
                        </li>
                        <li>
                          <i className="feather-map-pin me-1" />
                          152, 1st Street New York
                        </li>
                      </ul>
                      <h4 className="listing-title">
                        <Link to={route.eventDetails}>Rise to Victory</Link>
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                  <div className="listing-item">
                    <div className="listing-img">
                      <Link to={route.eventDetails}>
                        <ImageWithBasePath
                          src="assets/img/events/event-03.jpg"
                          className="img-fluid"
                          alt="Event"
                        />
                      </Link>
                      <div className="date-info text-center">
                        <h2>18</h2>
                        <h6>Sep, 2023</h6>
                      </div>
                    </div>
                    <div className="listing-content">
                      <ul className="d-flex justify-content-start align-items-center">
                        <li>
                          <i className="feather-clock" />
                          06:20 AM
                        </li>
                        <li>
                          <i className="feather-map-pin" />
                          152, 1st Street New York
                        </li>
                      </ul>
                      <h4 className="listing-title">
                        <Link to={route.eventDetails}>Shuttle Storm</Link>
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                  <div className="listing-item">
                    <div className="listing-img">
                      <Link to={route.eventDetails}>
                        <ImageWithBasePath
                          src="assets/img/events/event-04.jpg"
                          className="img-fluid"
                          alt="Event"
                        />
                      </Link>
                      <div className="date-info text-center">
                        <h2>17</h2>
                        <h6>Sep, 2023</h6>
                      </div>
                    </div>
                    <div className="listing-content">
                      <ul className="d-flex justify-content-start align-items-center">
                        <li>
                          <i className="feather-clock" />
                          06:20 AM
                        </li>
                        <li>
                          <i className="feather-map-pin" />
                          152, 1st Street New York
                        </li>
                      </ul>
                      <h4 className="listing-title">
                        <Link to={route.eventDetails}>Flight of the Feathers</Link>
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                  <div className="listing-item">
                    <div className="listing-img">
                      <Link to={route.eventDetails}>
                        <ImageWithBasePath
                          src="assets/img/events/event-05.jpg"
                          className="img-fluid"
                          alt="Event"
                        />
                      </Link>
                      <div className="date-info text-center">
                        <h2>16</h2>
                        <h6>Sep, 2023</h6>
                      </div>
                    </div>
                    <div className="listing-content">
                      <ul className="d-flex justify-content-start align-items-center">
                        <li>
                          <i className="feather-clock" />
                          06:20 AM
                        </li>
                        <li>
                          <i className="feather-map-pin" />
                          152, 1st Street New York
                        </li>
                      </ul>
                      <h4 className="listing-title">
                        <Link to={route.eventDetails}>Battle at the Net</Link>
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                  <div className="listing-item">
                    <div className="listing-img">
                      <Link to={route.eventDetails}>
                        <ImageWithBasePath
                          src="assets/img/events/event-06.jpg"
                          className="img-fluid"
                          alt="Event"
                        />
                      </Link>
                      <div className="date-info text-center">
                        <h2>15</h2>
                        <h6>Sep, 2023</h6>
                      </div>
                    </div>
                    <div className="listing-content">
                      <ul className="d-flex justify-content-start align-items-center">
                        <li>
                          <i className="feather-clock" />
                          06:20 AM
                        </li>
                        <li>
                          <i className="feather-map-pin" />
                          152, 1st Street New York
                        </li>
                      </ul>
                      <h4 className="listing-title">
                        <Link to={route.eventDetails}>Badminton Fusion</Link>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        {/* /Page Content */}
      </div>
    </>
  )
}

export default Events
