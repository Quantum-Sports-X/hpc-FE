import React from 'react'
import {Link, useLocation} from 'react-router-dom'
import ImageWithBasePath from '../../core/data/img/ImageWithBasePath'
import {all_routes} from '../router/AllRoutes'

export const DashboardComponent = () => {
  const routes = all_routes
  const location = useLocation()
  return (
    <div className="dashboard-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="dashboard-menu">
              <ul>
                <li>
                  <Link
                    to={`${routes.userBookingsPrefix}/active`}
                    className={location.pathname.includes('bookings', 2) ? 'active' : ''}
                  >
                    <ImageWithBasePath src="assets/img/icons/booking-icon.svg" alt="Icon" />
                    <span>My Bookings</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={routes.userWallet}
                    className={location.pathname.includes(routes.userWallet) ? 'active' : ''}
                  >
                    <ImageWithBasePath src="assets/img/icons/wallet-icon.svg" alt="Icon" />
                    <span>Wallet</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={routes.userProfile}
                    className={location.pathname.includes('settings', 2) ? 'active' : ''}
                  >
                    <ImageWithBasePath src="assets/img/icons/profile-icon.svg" alt="Icon" />
                    <span>Profile Setting</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
