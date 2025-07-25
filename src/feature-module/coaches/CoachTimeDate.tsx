import React, {useState} from 'react'
import ImageWithBasePath from '../../core/data/img/ImageWithBasePath'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'
import {all_routes} from '../router/AllRoutes'
const CoachBookingAvailability = () => {
  const routes = all_routes
  const [timeSlots, setTimeSlots] = useState([
    {time: '2:00 PM', isActive: false, isChecked: false},
    {time: '2:00 PM', isActive: false, isChecked: false},
    {time: '2:00 PM', isActive: false, isChecked: false},
    {time: '2:00 PM', isActive: false, isChecked: false},
    {time: '3:00 PM', isActive: false, isChecked: false},
    {time: '3:00 PM', isActive: false, isChecked: false},
    {time: '3:00 PM', isActive: false, isChecked: false},
    {time: '3:00 PM', isActive: false, isChecked: false},
    {time: '4:00 PM', isActive: false, isChecked: false},
    {time: '4:00 PM', isActive: false, isChecked: false},
    {time: '4:00 PM', isActive: false, isChecked: false},
    {time: '4:00 PM', isActive: false, isChecked: false},
    {time: '5:00 PM', isActive: false, isChecked: false},
    {time: '5:00 PM', isActive: false, isChecked: false},
    {time: '5:00 PM', isActive: true, isChecked: true},
    {time: '5:00 PM', isActive: false, isChecked: false},
    {time: '6:00 PM', isActive: true, isChecked: false},
    {time: '6:00 PM', isActive: true, isChecked: false},
    {time: '6:00 PM', isActive: true, isChecked: true},
    {time: '6:00 PM', isActive: true, isChecked: false},
    {time: '7:00 PM', isActive: true, isChecked: false},
    {time: '7:00 PM', isActive: true, isChecked: false},
    {time: '7:00 PM', isActive: true, isChecked: true},
    {time: '7:00 PM', isActive: true, isChecked: false},
  ])
  const handleTimeSlotClick = index => {
    const updatedTimeSlots = [...timeSlots]
    if (!updatedTimeSlots[index].isActive) {
      return
    }
    updatedTimeSlots[index].isChecked = !updatedTimeSlots[index].isChecked
    setTimeSlots(updatedTimeSlots)
  }
  const featuredVenuesSlider = {
    dots: false,
    autoplay: false,
    slidesToShow: 4,
    margin: 20,
    speed: 500,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 776,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 567,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }
  return (
    <div>
      <>
        {/* Breadcrumb */}
        <div className="breadcrumb mb-0">
          <span className="primary-right-round" />
          <div className="container">
            <h1 className="text-white">Coach Availability</h1>
            <ul>
              <li>
                <Link to={routes.home}>Home</Link>
              </li>
              <li>Coach Availability</li>
            </ul>
          </div>
        </div>
        {/* /Breadcrumb */}
        <section className="booking-steps py-30">
          <div className="container">
            <ul className="d-xl-flex justify-content-center align-items-center">
              <li>
                <h5>
                  <Link to={routes.bookingType}>
                    <span>1</span>Type of Booking
                  </Link>
                </h5>
              </li>
              <li className="active">
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
              <li>
                <h5>
                  <Link to={routes.coachOrderConfirm}>
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
                <h3 className="mb-1">Coach Availability</h3>
                <p className="sub-title">
                  Book your coach at a time and date that suits your needs.
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
            <div className="row text-center">
              <div className="col-12 col-sm-12 col-md-12 col-lg-8">
                <div className="card time-date-card">
                  <section className="booking-date">
                    <div className="list-unstyled owl-carousel date-slider owl-theme mb-40">
                      <Slider {...featuredVenuesSlider}>
                        <div className="booking-date-item">
                          <h6>Monday</h6>
                          <p>Apr 24</p>
                        </div>
                        <div className="booking-date-item">
                          <h6>Tuesday</h6>
                          <p>Apr 25</p>
                        </div>
                        <div className="booking-date-item">
                          <h6>Wednesday</h6>
                          <p>Apr 26</p>
                        </div>
                        <div className="booking-date-item">
                          <h6>Thursday</h6>
                          <p>Apr 27</p>
                        </div>
                        <div className="booking-date-item">
                          <h6>Friday</h6>
                          <p>Apr 28</p>
                        </div>
                        <div className="booking-date-item">
                          <h6>Saturday</h6>
                          <p>Apr 29</p>
                        </div>
                      </Slider>
                    </div>
                    <div className="row">
                      {timeSlots.map((slot, index) => (
                        <div key={index} className="col-12 col-sm-4 col-md-3">
                          <div
                            className={`time-slot ${slot.isChecked ? 'checked' : ''} ${slot.isActive ? 'active' : ''}`}
                            onClick={() => handleTimeSlotClick(index)}
                          >
                            <span>{slot.time}</span>
                            <i className="fa-regular fa-check-circle" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-4">
                <aside className="card booking-details">
                  <h3 className="border-bottom">Booking Details</h3>
                  <ul>
                    <li>
                      <i className="feather-calendar me-2" />
                      27, April 2023
                    </li>
                    <li>
                      <i className="feather-clock me-2" />
                      05:00 PM to 07:00 PM
                    </li>
                    <li>
                      <i className="feather-clock me-2" />
                      Total Hour : 3 Hrs
                    </li>
                  </ul>
                  <div className="d-grid btn-block">
                    <button type="button" className="btn btn-primary">
                      Subtotal : $200
                    </button>
                  </div>
                </aside>
              </div>
            </div>
            <div className="text-center btn-row">
              <Link className="btn btn-primary me-3 btn-icon" to={routes.bookingType}>
                <i className="feather-arrow-left-circle me-1" /> Back
              </Link>
              <Link className="btn btn-secondary btn-icon" to={routes.coachPersonalInfo}>
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

export default CoachBookingAvailability
