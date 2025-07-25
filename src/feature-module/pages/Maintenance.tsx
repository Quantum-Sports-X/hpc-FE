import React from 'react'
import ImageWithBasePath from '../../core/data/img/ImageWithBasePath'

const Maintenance = () => {
  return (
    <div>
      <div className="content ellipses maintenance">
        <div className="container">
          <div className="row vph-100 d-flex align-items-center">
            <div className="col-sm-10 col-md-10 col-lg-10 mx-auto text-center">
              {/* Header */}
              <header className="text-center">
                <ImageWithBasePath
                  src="assets/img/logo-black.svg"
                  className="img-fluid"
                  alt="Logo"
                />
              </header>
              {/* /Header */}
              <div className="text-img">
                <ImageWithBasePath
                  src="assets/img/maintenance.jpg"
                  className="img-fluid"
                  alt="Coming-Soon"
                />
              </div>
              <div className="col-sm-10 col-md-10 col-lg-10 mx-auto text-center">
                <h2 className="mt-3">
                  HPC website is currently <br /> under maintenance
                </h2>
                <p>
                  We apologize for the inconvenience caused We’ve almost done. For your bookings
                  please call{' '}
                  <p>
                    <a href="tel:07368991211">07368991211</a> |{' '}
                    <a href="tel:02035899165">02035899165</a>
                  </p>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Maintenance
