import React, {useEffect, useState, useRef} from 'react'
import ImageWithBasePath from '../../core/data/img/ImageWithBasePath'
import AOS from 'aos'
import 'aos/dist/aos.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import {Carousel, Tooltip} from 'antd'
import Slider_ from 'react-slick'
import {Link, useLocation} from 'react-router-dom'
import {all_routes} from '../router/AllRoutes'
import {getCoachByType} from '../../services/requestService'
import {
  constructCoachesPath,
  constructCoachPath,
  getFormattedCurrency,
} from '../../services/commonService'
import ImageWithOutBasePath from '../../core/data/img/ImageWithOutBasePath'
import {ServicesComponent} from '../common/ServicesComponent'
import {Dialog} from 'primereact/dialog'

const Slider = Slider_ as unknown as React.ComponentType<any>

const Home = () => {
  const location = useLocation()
  const [isDialogVisible, setIsDialogVisible] = useState(false)
  const {roleType} = location.state || {}
  const carouselRef = useRef(null)

  const routes = all_routes

  useEffect(() => {
    if (carouselRef.current) {
      // Force reinitialization
      // @ts-ignore
      carouselRef.current?.goTo(0, true)
    }
  }, [])

  useEffect(() => {
    if (roleType && roleType === 'coach') {
      setIsDialogVisible(true)
    }
  }, [roleType])

  useEffect(() => {
    AOS.init({duration: 1200, once: true})
  }, [])
  const [featuredCoaches, setFeaturedCoaches] = useState<any | null>(null)
  useEffect(() => {
    // Call the second API only if coach data is available
    getCoachByType('FEATURED', 12)
      .then((featuredCoaches: any) => {
        if (featuredCoaches) {
          // @todo filtering out only london-chigwell ones
          setFeaturedCoaches(
            featuredCoaches.filter((item: any) => item.location?.name === 'London Chigwell')
          ) // Set rated coaches
        } else {
          console.log('No rated coaches found.')
        }
      })
      .catch(err => {
        console.error('Error fetching rated coaches:', err)
      })
  }, []) // Run this effect when `coach` data is updated

  const options = {
    autoplay: true,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768, // Mobile breakpoint
        settings: {
          slidesToShow: 1, // Show 1 slide for mobile
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024, // Tablet breakpoint
        settings: {
          slidesToShow: 2, // Show 2 slides for tablet
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <>
      <section className="hero-section mb-5">
        <div className="background-gradient"></div>
        <div className="background-video">
          <video
            poster="assets/img/hpc_background.jpg"
            autoPlay
            loop
            playsInline
            muted
            width="100%"
          >
            <source src="assets/video/hpc_background_full.mp4" type="video/mp4" />
          </video>
        </div>
        <Carousel
          ref={carouselRef}
          autoplay
          autoplaySpeed={5000}
          dotPosition="right"
          infinite
          effect="scrollx"
          pauseOnHover={false}
        >
          <div>
            <div className="container">
              <div className="home-banner">
                <div className="row align-items-center w-100">
                  <div className="col-12 text-center mb-4"></div>
                  <div className="col-lg-8 col-md-10">
                    <div className="section-search">
                      <h4>Fun, interactive day sessions, come rain or shine</h4>
                      <h1 className="text-white">HPC Summer Camp 2025</h1>
                      <p className="sub-info">
                        Get your game on, with professional coaching at our indoor cricket facility.
                      </p>
                    </div>
                    <div className="view-all mt-4">
                      <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLSfyRAVgv9P1wOjEk_Uy4K7n3XwOcD3SrKAY7vJsKXBiOCOAsA/viewform"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary d-inline-flex align-items-center"
                      >
                        <span className="lh-1">
                          <i className="feather-user-plus me-2" />
                        </span>
                        Register
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="container">
              <div className="home-banner">
                <div className="row align-items-center w-100">
                  <div className="col-12 text-center mb-4">
                    <Dialog
                      header="Successfully registered as a coach at HPC"
                      visible={isDialogVisible}
                      style={{width: '50vw'}}
                      breakpoints={{'960px': '75vw', '641px': '95vw'}}
                      onHide={() => {
                        if (!isDialogVisible) return
                        setIsDialogVisible(false)
                      }}
                      draggable={false}
                      resizable={false}
                    >
                      <p className="m-0">
                        Your account is still pending. We will review your profile and get back to
                        you soon. Meanwhile you can use the <strong>Coach Portal</strong> at the top
                        to login to your coach profile and update your details. Thank you.
                      </p>
                    </Dialog>
                  </div>
                  <div className="col-lg-8 col-md-10 aos" data-aos="fade-up">
                    <div className="section-search">
                      <h4>High quality coaching and state of the art facility</h4>
                      <h1>Start your training now</h1>
                      <p className="sub-info">
                        Unleash Your Athletic Potential with Expert Coaching, State-of-the-Art
                        Facilities, and Personalised Training Programs.
                      </p>
                    </div>
                    <div className="view-all mt-4">
                      <Link
                        to={routes.bookingType}
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
        </Carousel>
      </section>
      <section className="section work-section">
        <div className="container">
          <div className="section-heading aos" data-aos="fade-up">
            <h2>
              How It <span>Works</span>
            </h2>
            <p className="sub-title">Simplifying the booking process for coaches and cricketers.</p>
          </div>
          <div className="row justify-content-center ">
            <div className="col-lg-6 col-md-6 d-flex">
              <div className="work-grid w-100 d-flex flex-column aos" data-aos="fade-up">
                <div className="work-icon">
                  <div className="work-icon-inner">
                    <ImageWithBasePath src="assets/img/icons/work-icon3.svg" alt="Icon" />
                  </div>
                </div>
                <div className="work-content flex-grow-1">
                  <h5 className="pb-3">
                    {/* @todo location ID needs to be stored in redux store. maybe hard code it for now */}
                    <Link to={`${routes.bookingType}/lane/location/london-chigwell/time&date`}>
                      Booking a lane
                    </Link>
                  </h5>
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
                <div className="work-icon">
                  <div className="work-icon-inner">
                    <ImageWithBasePath src="assets/img/icons/work-icon3.svg" alt="Icon" />
                  </div>
                </div>
                <div className="work-content flex-grow-1">
                  {process.env.REACT_APP_COACHING_DISABLED !== 'false' ? (
                    <>
                      <h5 className="pb-3">
                        <a
                          href="https://docs.google.com/forms/d/e/1FAIpQLSfEnWeeCdKzZJHRn0xKUBwmgIoRGEvlHLpc_aFHJ5Lg6W3R4g/viewform"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Booking a coach
                        </a>
                      </h5>
                      <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLSfEnWeeCdKzZJHRn0xKUBwmgIoRGEvlHLpc_aFHJ5Lg6W3R4g/viewform"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn mt-auto"
                      >
                        Book now <i className="feather-arrow-right" />
                      </a>
                    </>
                  ) : (
                    <>
                      <h5 className="pb-3">
                        <Link to={`${routes.bookingType}/coach/location/london-chigwell/time&date`}>
                          Booking a coach
                        </Link>
                      </h5>
                      <Link
                        className="btn mt-auto"
                        to={`${routes.bookingType}/coach/location/london-chigwell/time&date`}
                      >
                        Book Now <i className="feather-arrow-right" />
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServicesComponent />

      {/* Featured Coaches -  uncomment when coach feature going live */}
      {process.env.REACT_APP_COACHING_DISABLED === 'false' &&
        featuredCoaches &&
        featuredCoaches.length > 0 && (
          <section className="section featured-section">
            <div className="">
              <div className="section-heading aos" data-aos="fade-up">
                <h2>
                  Featured <span>Coaches</span>
                </h2>
                <p className="sub-title">
                  Uplift your cricket game with our featured coaches, personalized instruction, and
                  expertise to achieve your goals.
                </p>
              </div>
              <div className="row justify-content-center">
                <div className="col-lg-8 col-10">
                  <div className="featured-slider-group aos" data-aos="fade-up">
                    <div className="owl-carousel featured-coache-slider owl-theme">
                      {/* Featured Item */}
                      <div className="featured-coaches">
                        <Slider {...options}>
                          {featuredCoaches.map((featuredCoach: any) => (
                            <div key={featuredCoach.id} className="featured-venues-item">
                              <div className="listing-item mb-0">
                                <div className="listing-img">
                                  <Link to={constructCoachPath(featuredCoach)}>
                                    <ImageWithOutBasePath
                                      src={featuredCoach.full_avatar}
                                      alt="User"
                                    />
                                  </Link>
                                  <div className="fav-item-venues">
                                    {featuredCoach.verified ? (
                                      <Tooltip
                                        placement="right"
                                        title="This coach is verified by HPC as part of our Coaching standard guidelines. They are committed to delivering exceptional coaching and great value."
                                      >
                                        <span className="d-flex justify-content-center align-items-center coach-verify">
                                          <i className="fas fa-check-double" />
                                        </span>
                                      </Tooltip>
                                    ) : (
                                      ''
                                    )}
                                  </div>
                                  <div className="hour-list">
                                    <h5 className="tag tag-primary">
                                      From {getFormattedCurrency(featuredCoach.coach_fee)}{' '}
                                      <span>/hr</span>
                                    </h5>
                                  </div>
                                </div>
                                <div className="listing-content list-coche-content">
                                  <span>{featuredCoach.sessions} Sessions</span>
                                  <h3>
                                    <Link to={constructCoachPath(featuredCoach)}>
                                      {featuredCoach.first_name} {featuredCoach.last_name}
                                    </Link>
                                  </h3>
                                  <Link to={constructCoachPath(featuredCoach)}>
                                    <i className="feather-arrow-right" />
                                  </Link>
                                  <Link
                                    to={constructCoachPath(featuredCoach)}
                                    className="icon-hover"
                                  >
                                    <i className="feather-calendar" />
                                  </Link>
                                </div>
                              </div>
                            </div>
                          ))}
                        </Slider>
                      </div>
                      {/* /Featured Item */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="view-all text-center aos" data-aos="fade-up">
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
            </div>
          </section>
        )}
      {/* /Featured Coaches */}
      {/*<section className="mb-5">*/}
      {/*  <div className="container">*/}
      {/*    <div className="row ">*/}
      {/*      <iframe width="560" height="615" src="https://www.youtube.com/embed/FaIPX9AyzMU?si=VmEifgqHMijCIJ3S" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</section>*/}

      {/* Earn Money */}
      <section className="section earn-money">
        <div className="cock-img cock-position">
          <div className="cock-img-one ">
            <ImageWithBasePath src="assets/img/redball.png" alt="Icon" />
          </div>
          <div className="cock-img-two">
            <ImageWithBasePath src="assets/img/green-ball.png" alt="Icon" />
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-6 order-2 order-md-1">
              <div className="private-venue aos" data-aos="fade-up">
                <div className="tab-content">
                  <div>
                    <h4 className="text-white">Become a coach</h4>
                    <h2>
                      We are always looking for enthusiastic, passionate cricket coaches to join our
                      team
                    </h2>
                    <p>
                      We welcome applications from ECB Level 1 and 2 (or above) cricket coaches who
                      preferably have some experience of working in schools. It is also essential
                      that they have played the game to a reasonable standard.
                    </p>
                    <p>
                      HPC is committed to the safeguarding of young people and as such all
                      successful applicants will be expected to either hold or undergo an Enhanced
                      DBS Check, as well as a First Aid certificate/course.
                    </p>
                    <div className="convenient-btns">
                      <Link
                        to={`${routes.register}?role=coach&referral=home-page`}
                        className="btn btn-secondary d-inline-flex align-items-center"
                      >
                        <span className="lh-1">
                          <i className="feather-user-plus me-2" />
                        </span>
                        Apply
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 order-1 order-md-2 mt-4 mt-md-0">
              <div className="price-wrap">
                <div className="price-card flex-fill ">
                  <div className="price-head expert-price">
                    <ImageWithBasePath src="assets/img/icons/price-02.svg" alt="Price" />
                    <h3>HPC Summer Camp 2025</h3>
                    <span>***** New *****</span>
                  </div>
                  <div className="price-body text-dark">
                    <div className="features-price-list">
                      <ul>
                        <div className="row justify-content-center">
                          <div className="col-auto winter-banner m-1">
                            <p>
                              Get your game on, with professional coaching at our indoor cricket
                              facility!
                            </p>
                            <div className="row">
                              <div className="col-12 col-md-6">
                                <ul>
                                  <li className="active mb-0">
                                    <h5>BLOCK 1:</h5>
                                  </li>
                                  <li className="active mb-1">
                                    <i className="fa-solid fa-calendar-alt" />
                                    05,06,07,08th August 2025
                                  </li>
                                  <li className="active mb-1">
                                    <i className="feather-users" />
                                    Age Group: 09 to 15 years
                                  </li>
                                  <li className="active mb-1">
                                    <i className="feather-clock" />
                                    Time: 10:00 am to 02:00 pm
                                  </li>
                                </ul>
                              </div>
                              <div className="col-12 col-md-6">
                                <ul>
                                  <li className="active mb-0">
                                    <h5>BLOCK 2:</h5>
                                  </li>
                                  <li className="active mb-1">
                                    <i className="fa-solid fa-calendar-alt" />
                                    12,13,14,15th August 2025
                                  </li>
                                  <li className="active mb-1">
                                    <i className="feather-check-circle" />
                                    <span>£35 per day / £120 for 4 days</span>
                                  </li>
                                  <li className="active">
                                    <i className="feather-star" />
                                    5% Siblings discounts
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <p className="sub-info">
                              Players will be put into groups of similar age and ability.
                            </p>
                          </div>
                        </div>
                      </ul>
                    </div>
                    <div className="price-choose">
                      <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLSfyRAVgv9P1wOjEk_Uy4K7n3XwOcD3SrKAY7vJsKXBiOCOAsA/viewform"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn viewdetails-btn"
                      >
                        <span className="lh-1">
                          <i className="feather-user-plus me-2" />
                        </span>
                        Book now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
