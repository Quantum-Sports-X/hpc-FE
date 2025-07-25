import React from 'react'
import ImageWithBasePath from '../../core/data/img/ImageWithBasePath'
import {Link} from 'react-router-dom'
import {all_routes} from '../router/AllRoutes'

const AboutUs = () => {
  const routes = all_routes
  return (
    <div>
      {/* Breadcrumb */}
      <div className="breadcrumb breadcrumb-list mb-0">
        <span className="primary-right-round" />
        <div className="container">
          <h1 className="text-white">About Us</h1>
          <ul>
            <li>
              <Link to={routes.home}>Home</Link>
            </li>
            <li>About Us</li>
          </ul>
        </div>
      </div>
      {/* /Breadcrumb */}
      {/* Page Content */}
      <div className="content hexagon-background">
        {/* About Us Info */}
        <section className="aboutus-info">
          <div className="container">
            {/* Banners */}
            <div className="row d-flex align-items-center aos" data-aos="fade-up">
              <div className=" col-12 col-sm-3 col-md-3 col-lg-3">
                <div className="banner text-center">
                  <ImageWithBasePath
                    src="assets/img/aboutus/abot_us_banner_014.jpg"
                    className="img-fluid corner-radius-10"
                    alt="Banner-01"
                  />
                </div>
              </div>
              <div className=" col-12 col-sm-6 col-md-6 col-lg-6">
                <div className="banner text-center">
                  <ImageWithBasePath
                    src="assets/img/aboutus/about_us_banner_01.jpg"
                    className="img-fluid corner-radius-10"
                    alt="Banner-02"
                  />
                </div>
              </div>
              <div className=" col-12 col-sm-3 col-md-3 col-lg-3">
                <div className="banner text-center">
                  <ImageWithBasePath
                    src="assets/img/aboutus/about_us_banner_02.jpg"
                    className="img-fluid corner-radius-10"
                    alt="Banner-03"
                  />
                </div>
              </div>
            </div>
            {/* /Banners */}
            {/* Vision-Mission */}
            <div className="vision-mission aos" data-aos="fade-up">
              <div className="row">
                <div className=" col-12 col-sm-12 col-md-12 col-lg-8">
                  <h2>Our Vision</h2>
                  <p>
                    We envision a dynamic cricket ecosystem where cutting-edge training, expert
                    coaching, and state-of-the-art facilities converge to inspire and nurture
                    talent. Our platform cultivates a love for the game and empowers individuals to
                    achieve their full potential, fostering excellence at every level of cricket.
                  </p>
                  <p>
                    By shaping future stars and supporting enthusiasts, we aim to be the cornerstone
                    of cricket&apos;s growth and innovation. Our commitment drives us to create an
                    environment where passion meets progress, ensuring the sport thrives for
                    generations to come.
                  </p>
                </div>
                <div className=" col-12 col-sm-12 col-md-12 col-lg-4">
                  <div className="mission-bg">
                    <h2>Our Mission</h2>
                    <p>
                      We deliver personalised coaching and world-class facilities to empower players
                      and coaches. Our platform fosters skill development, community engagement, and
                      continuous learning, creating a thriving cricket environment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* /Vision-Mission */}
          </div>
        </section>
        {/* Group Coaching */}
        <section className="padding-bg">
          <div className="container">
            <div className="section-heading aso" data-aos="fade-up">
              <h2>
                Our <span>Features</span>
              </h2>
              <p className="sub-title">
                Unlock your true potential with our expert coaching, state-of-the-art facilities,
                and tailored training programs. Join us to elevate your cricket journey and achieve
                new heights in your career
              </p>
            </div>
            <div className="row justify-content-center aos" data-aos="fade-up">
              <div className="col-lg-4 col-md-6 d-flex">
                <div className="work-grid coaching-grid w-100">
                  <div className="work-icon hpc-image">
                    <div className="fit-image">
                      <ImageWithBasePath src="assets/img/services/coaching_logo.png" alt="Icon" />
                    </div>
                  </div>
                  <div className="work-content">
                    <h3>Group Coaching</h3>
                    <p>
                      Accelerate your skills with tailored group coaching sessions for cricket
                      players game.
                    </p>
                    <Link to={routes.bookACoach}>Learn More</Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 d-flex">
                <div className="work-grid coaching-grid w-100">
                  <div className="work-icon hpc-image">
                    <div className="fit-image">
                      <ImageWithBasePath src="assets/img/services/coaching_logo.png" alt="Icon" />
                    </div>
                  </div>
                  <div className="work-content">
                    <h3>1-2-1 Coaching</h3>
                    <p>
                      Connect with elite private cricket coaches offering personalised guidance to
                      enhance your skills and elevate your game.
                    </p>
                    <Link to={routes.bookACoach}>Learn More</Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 d-flex">
                <div className="work-grid coaching-grid w-100">
                  <div className="work-icon hpc-image">
                    <div className="fit-image">
                      <ImageWithBasePath src="assets/img/services/net_hire_logo.png" alt="Icon" />
                    </div>
                  </div>
                  <div className="work-content">
                    <h3>Lane Hire</h3>
                    <p>
                      Enjoy uninterrupted cricket sessions at HPC with our premium lane rental
                      services.
                    </p>
                    <Link to={routes.laneRental}>Learn More</Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 d-flex">
                <div className="work-grid coaching-grid w-100">
                  <div className="work-icon hpc-image">
                    <div className="fit-image">
                      <ImageWithBasePath src="assets/img/services/services_logo.jpg" alt="Icon" />
                    </div>
                  </div>
                  <div className="work-content">
                    <h3>Vacancies</h3>
                    <p>
                      We are always on the looking for enthusiastic, passionate cricket coaches and
                      administrative staff to join our team. If you would like to apply, please
                      email your CV and cover letter to info@hpcricket.co.uk. For coaches, we
                      welcome applications from ECB Level 1 and 2 (or above) qualified coaches who
                      preferably have some experience of working in schools. It is also essential
                      that they have played the game to a reasonable standard. HPC is committed to
                      the safeguarding of young people and as such all successful applicants will be
                      expected to either hold or undergo an Enhanced DBS Check, as well as a First
                      Aid certificate/course. Click{' '}
                      <Link to={`${routes.register}?role=coach&referral=about-us-page`}>here</Link>{' '}
                      to register.
                    </p>
                    <Link to={routes.bookACoach}>Learn More</Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 d-flex">
                <div className="work-grid coaching-grid w-100">
                  <div className="work-icon hpc-image">
                    <div className="fit-image">
                      <ImageWithBasePath src="assets/img/services/services_logo.jpg" alt="Icon" />
                    </div>
                  </div>
                  <div className="work-content">
                    <h3>Commitment to Community and Charity</h3>
                    <p>
                      HPC is dedicated to making a positive impact on the community through various
                      charitable initiatives. We focus on youth development, including free coaching
                      sessions and the collection of cricket gear for underprivileged children.
                    </p>
                    <Link to={routes.bookACoach}>Learn More</Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 d-flex">
                <div className="work-grid coaching-grid w-100">
                  <div className="work-content">
                    <div className="work-icon hpc-image">
                      <div className="fit-image">
                        <ImageWithBasePath src="assets/img/services/hpc_active.jpg" alt="Icon" />
                      </div>
                    </div>
                    <h3>HPC Active</h3>
                    <p>
                      HPC Active is our latest clothing and equipment line. We are one stop shop for
                      all your cricketing needs, for individuals and clubs. A limited selection of
                      bats and t-shirts are available on our online store and at HPC Chigwell. We
                      also have a bat repair service for bats of any brand. For any club clothing
                      enquiries, please contact us directly with your requirements and we will be
                      happy to discuss.
                    </p>
                    <Link to={routes.hpcActive}>Learn More</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Group Coaching */}
      </div>
      {/* /Page Content */}
    </div>
  )
}

export default AboutUs
