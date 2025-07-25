import React from 'react'
import {Link} from 'react-router-dom'
import {all_routes} from '../router/AllRoutes'

const Type = () => {
  const routes = all_routes
  return (
    <div>
      {/* Breadcrumb */}
      <div className="breadcrumb mb-0">
        <span className="primary-right-round" />
        <div className="container">
          <h1 className="text-white">Select booking</h1>
          <ul>
            <li>
              <Link to={routes.home}>Home</Link>
            </li>
            <li>Booking type</li>
          </ul>
        </div>
      </div>
      {/* /Breadcrumb */}
      {/*<BookingFlowBreadCrumb/>*/}
      {/* Page Content */}
      <div className="content book-cage">
        <div className="container">
          <section className="text-center coach-types">
            <div className="border-block">
              <div className="text-center mb-40">
                <h3 className="mb-1">What are you looking for?</h3>
              </div>
              <div className="row justify-content-center ">
                <div className="col-lg-6 col-md-6 d-flex">
                  <div className="work-grid w-100 d-flex flex-column aos" data-aos="fade-up">
                    <div className="work-content flex-grow-1">
                      <h5>
                        {/* @todo location ID needs to be stored in redux store. maybe hard code it for now */}
                        <Link to={`${routes.bookingType}/lane/location/london-chigwell/time&date`}>
                          Booking a lane
                        </Link>
                      </h5>
                      <p>
                        HPC Chigwell is state of the art indoor cricket centre. We have four brand
                        new cricket nets with bespoke training surfaces
                      </p>
                      <Link
                        className="btn mt-auto"
                        to={`${routes.bookingType}/lane/location/london-chigwell/time&date`}
                      >
                        Book Now <i className="feather-arrow-right" />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 d-flex">
                  <div className="work-grid w-100 d-flex flex-column aos" data-aos="fade-up">
                    <div className="work-content flex-grow-1">
                      <h5>
                        <Link to={`${routes.bookingType}/coach/location/london-chigwell/time&date`}>
                          Booking a coach
                        </Link>
                      </h5>
                      <p>
                        HPC Coaching offers high quality, one to one and group coaching sessions
                        across London and Essex. Our coaching sessions include player analysis,
                        customised player training plans, masterclasses and holiday camps.
                      </p>
                      {process.env.REACT_APP_COACHING_DISABLED !== 'false' ? (
                        <a
                          href="https://docs.google.com/forms/d/e/1FAIpQLSfEnWeeCdKzZJHRn0xKUBwmgIoRGEvlHLpc_aFHJ5Lg6W3R4g/viewform"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn mt-auto"
                        >
                          Book now <i className="feather-arrow-right" />
                        </a>
                      ) : (
                        <Link
                          className="btn mt-auto"
                          to={`${routes.bookingType}/coach/location/london-chigwell/time&date`}
                        >
                          Book Now <i className="feather-arrow-right" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*<div className="text-center btn-row">*/}
            {/*  <Link className="btn btn-primary me-3 btn-icon" to={routes.home}>*/}
            {/*    <i className="feather-arrow-left-circle me-1" /> Back*/}
            {/*  </Link>*/}
            {/*  <Link*/}
            {/*    className="btn btn-secondary btn-icon change-url"*/}
            {/*    to={`${routes.bookingType}/${activeTabIndex==0?'lane':'coach'}/location`} */}
            {/*  >*/}
            {/*    Next <i className="feather-arrow-right-circle ms-1" />*/}
            {/*  </Link>*/}
            {/*</div>*/}
          </section>
        </div>
        {/* /Container */}
      </div>
      {/* /Page Content */}
    </div>
  )
}

export default Type
