import React from 'react'
import {Link} from 'react-router-dom'
import ImageWithBasePath from '../../core/data/img/ImageWithBasePath'
import {all_routes} from '../router/AllRoutes'
import {DashboardComponent} from '../common/DashboardComponent'

const UserDashboard = () => {
  const routes = all_routes
  return (
    <div>
      {/* Breadcrumb */}
      <section className="breadcrumb breadcrumb-list mb-0">
        <span className="primary-right-round" />
        <div className="container">
          <h1 className="text-white">User Dashboard</h1>
          <ul>
            <li>
              <Link to={routes.home}>Home</Link>
            </li>
            <li>User Dashboard</li>
          </ul>
        </div>
      </section>
      {/* /Breadcrumb */}
      {/* Dashboard Menu */}
      <DashboardComponent />
      {/* /Dashboard Menu */}
      {/* Page Content */}
      <div className="content">
        <div className="container">
          {/* Statistics Card */}
          <div className="row">
            <div className="col-lg-12">
              <div className="card dashboard-card statistics-card">
                <div className="card-header">
                  <h4>Statistics</h4>
                  <p>Boost your game with stats and goals tailored to you</p>
                </div>
                <div className="row">
                  <div className="col-xl-3 col-lg-6 col-md-6 d-flex">
                    <div className="statistics-grid flex-fill">
                      <div className="statistics-content">
                        <h3>78</h3>
                        <p>Total Court Booked</p>
                      </div>
                      <div className="statistics-icon">
                        <ImageWithBasePath src="assets/img/icons/statistics-01.svg" alt="Icon" />
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-6 col-md-6 d-flex">
                    <div className="statistics-grid flex-fill">
                      <div className="statistics-content">
                        <h3>45</h3>
                        <p>Total Coaches Booked</p>
                      </div>
                      <div className="statistics-icon">
                        <ImageWithBasePath src="assets/img/icons/statistics-02.svg" alt="Icon" />
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-6 col-md-6 d-flex">
                    <div className="statistics-grid flex-fill">
                      <div className="statistics-content">
                        <h3>06</h3>
                        <p>Total Lessons</p>
                      </div>
                      <div className="statistics-icon">
                        <ImageWithBasePath src="assets/img/icons/statistics-03.svg" alt="Icon" />
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-6 col-md-6 d-flex">
                    <div className="statistics-grid flex-fill">
                      <div className="statistics-content">
                        <h3>$45,056</h3>
                        <p>Payments</p>
                      </div>
                      <div className="statistics-icon">
                        <ImageWithBasePath src="assets/img/icons/statistics-04.svg" alt="Icon" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /Statistics Card */}
        </div>
      </div>

      <div></div>
    </div>
  )
}

export default UserDashboard
