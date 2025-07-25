import React from 'react'
import ImageWithBasePath from '../../core/data/img/ImageWithBasePath'
import {Link} from 'react-router-dom'
import {all_routes} from '../router/AllRoutes'

const HpcActive = () => {
  const route = all_routes
  return (
    <>
      <div className="main-wrapper services-detail-page">
        {/* Breadcrumb */}
        <div className="breadcrumb breadcrumb-list mb-0">
          <span className="primary-right-round" />
          <div className="container">
            <h1 className="text-white">HPC Active</h1>
            <ul>
              <li>
                <Link to={route.home}>Home</Link>
              </li>
              <li>HPC Active</li>
            </ul>
          </div>
        </div>
        {/* /Breadcrumb */}
        {/* Page Content */}
        <div className="content hexagon-background">
          <div className="container">
            <div className="service-detail">
              <div className="our-benefits aos" data-aos="fade-up">
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-4">
                    <div className="banner">
                      <ImageWithBasePath
                        src="assets/img/services/hpc_active.png"
                        className="img-fluid"
                        alt="Service"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-12 col-lg-8">
                    <div className="info">
                      <h2 className="mt-0">HPC Active</h2>
                      <p className="mb-3">HPC Active is our latest clothing and equipment line.</p>
                      <p className="mb-3">
                        We are one stop shop for all your cricketing needs, for individuals and
                        clubs. A limited selection of branded bats, equipment and t-shirts are
                        available on site at HPC Chigwell.
                      </p>
                      <p className="mb-3">
                        For any club clothing enquiries, please contact us directly with your
                        requirements and we will be happy to discuss.
                      </p>
                      <p className="mb-5">
                        We also have a bat repair service for bats of any brand. Please see price
                        list below. Drop off and collection is from HPC Chigwell (Unit D, 43 to 49
                        Fowler Road, Essex IG6 3FF). All payments must be paid in advance at the
                        time of drop off.
                      </p>
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th scope="col">Service</th>
                            <th scope="col">Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Bat Grip fitting</td>
                            <td>£6</td>
                          </tr>
                          <tr>
                            <td>Bat Grip fitting with own grip</td>
                            <td>£4</td>
                          </tr>
                          <tr>
                            <td>Knocking in</td>
                            <td>£40</td>
                          </tr>
                        </tbody>
                      </table>
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

export default HpcActive
