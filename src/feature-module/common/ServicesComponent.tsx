import React from 'react'
import {Link, useLocation, useParams} from 'react-router-dom'
import ImageWithBasePath from '../../core/data/img/ImageWithBasePath'
import {getServices} from '../../services/commonService'

export const ServicesComponent = () => {
  const services = getServices()
  const currentPath = useLocation().pathname
  const {locationId} = useParams<{locationId: string}>()
  return (
    <section className="section service-section">
      <div className="container">
        <div className="section-heading aos" data-aos="fade-up">
          <h2>
            Explore Our <span>Services</span>
          </h2>
          <p className="sub-title">
            Fostering excellence and empowering sports growth through tailored services for
            athletes, coaches, and enthusiasts.
          </p>
        </div>
        <div className="row justify-content-center">
          {services.map(service => (
            <div key={service.key} className="col-lg-3 col-md-6 d-flex">
              <div className="service-grid w-100 aos" data-aos="fade-up">
                <div className="service-img">
                  <Link to={locationId ? `${currentPath}/${service.type}` : service.link}>
                    <ImageWithBasePath src={service.image} className="img-fluid" alt="Service" />
                  </Link>
                </div>
                <div className="service-content">
                  <h4>
                    <Link to={locationId ? `${currentPath}/${service.type}` : service.link}>
                      {service.name}
                    </Link>
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
