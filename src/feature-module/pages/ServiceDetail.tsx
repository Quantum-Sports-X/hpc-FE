import React from 'react'
import ImageWithBasePath from '../../core/data/img/ImageWithBasePath'
import {Link} from 'react-router-dom'
import {all_routes as route} from '../router/AllRoutes'

const ServiceDetail = () => (
  <>
    <div className="main-wrapper services-detail-page">
      {/* Breadcrumb */}
      <div className="breadcrumb breadcrumb-list mb-0">
        <span className="primary-right-round" />
        <div className="container">
          <h1 className="text-white">Service Detail</h1>
          <ul>
            <li>
              <Link to={route.home}>Home</Link>
            </li>
            <li>Service Detail</li>
          </ul>
        </div>
      </div>
      {/* /Breadcrumb */}
      {/* Page Content */}
      <div className="content">
        <div className="container">
          <div className="service-detail">
            <div className="banner">
              <ImageWithBasePath
                src="assets/img/services/coaching.jpg"
                className="img-fluid"
                alt="Service"
              />
            </div>
            <h2>Sports Performance Training</h2>
            <p className="mb-0">
              HpcCricket offers tailored sports performance training programs designed to enhance
              your athletic performance in cricket. Improve your physical conditioning, agility,
              speed, and strength through targeted exercises and specialized training
              techniques.{' '}
            </p>
            <div className="dull-bg text-center">
              <p className="mb-0">
                typesetting industry. Lorem Ipsum has been the ndustry standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type and scrambled it to
                make a type specimen book.
              </p>
            </div>
            <div className="our-benefits">
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
                      Our experienced trainers will help you develop the necessary attributes to
                      excel on the cricket court.
                    </p>
                    <ul>
                      <li>
                        <i className="fa-solid fa-bolt" />{' '}
                        <span>
                          Tailored sports performance training enhances endurance, agility, and
                          flexibility.
                        </span>
                      </li>
                      <li>
                        <i className="fa-solid fa-bolt" />{' '}
                        <span>Improve footwork, reaction time, and court maneuverability.</span>
                      </li>
                      <li>
                        <i className="fa-solid fa-bolt" />{' '}
                        <span>Develop strength and power for stronger, precise shots.</span>
                      </li>
                      <li>
                        <i className="fa-solid fa-bolt" />{' '}
                        <span>Knowledgeable trainers guide proper technique and progression.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <p>
              Boost physical capabilities, gain confidence, and a competitive edge through our
              inclusive sports performance training programs. Suitable for all levels, from
              beginners to advanced players seeking peak performance in cricket.
            </p>
          </div>
        </div>
      </div>
      {/* /Page Content */}
    </div>
  </>
)

export default ServiceDetail
