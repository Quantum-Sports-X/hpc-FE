import React from 'react'
import ImageWithBasePath from '../../core/data/img/ImageWithBasePath'
import {Link} from 'react-router-dom'
import {all_routes as route} from '../router/AllRoutes'
import {getServices} from '../../services/commonService'

const Services = () => {
  const services = getServices()
  return (
    <>
      <div className="main-wrapper services-page innerpagebg">
        {/* Breadcrumb */}
        <div className="breadcrumb breadcrumb-list mb-0">
          <span className="primary-right-round" />
          <div className="container">
            <h1 className="text-white">Services</h1>
            <ul>
              <li>
                <Link to={route.home}>Home</Link>
              </li>
              <li>Services</li>
            </ul>
          </div>
        </div>
        {/* /Breadcrumb */}
        {/* Page Content */}
        <div className="content">
          <div className="container">
            <section className="services">
              <div className="row justify-content-center">
                {services.map(service => (
                  <div
                    key={service.key}
                    className="col-12 col-sm-12 col-md-6 col-lg-4 d-flex aos"
                    data-aos="fade-up"
                  >
                    <div className="listing-item d-flex flex-column mt-4 mt-md-0">
                      <div className="listing-img">
                        <Link to={service.link}>
                          <ImageWithBasePath
                            src={service.image}
                            className="img-fluid"
                            alt="Service"
                          />
                        </Link>
                      </div>
                      <div className="listing-content text-center d-flex flex-column flex-grow-1">
                        <h3 className="listing-title">
                          <Link to={service.link}>{service.name}</Link>
                        </h3>
                        <p>{service.description}</p>
                        <Link to={service.link} className="btn btn-secondary mt-auto">
                          Read More
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
        {/* /Page Content */}
      </div>
    </>
  )
}

export default Services
