import React, {useEffect, useState} from 'react'
import ImageWithBasePath from '../../core/data/img/ImageWithBasePath'
import {Link} from 'react-router-dom'
import {all_routes} from '../router/AllRoutes'
import {DashboardComponent} from '../common/DashboardComponent'
import {apiService} from '../../services/apiService'
import {getFormattedCurrency} from '../../services/commonService'

const UserWallet = () => {
  const routes = all_routes
  const [user, setUser] = useState<any>(null)
  const [_error, setError] = useState<string | null>(null)
  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (token) {
      apiService
        .get('/api/v1/auth/me', token)
        .then((authResponse: any) => {
          setUser(authResponse.data)
        })
        .catch(err => {
          setError(err.message)
        })
    }
  }, [])
  return (
    <div>
      {/* Breadcrumb */}
      <section className="breadcrumb breadcrumb-list mb-0">
        <span className="primary-right-round" />
        <div className="container">
          <h1 className="text-white">Wallet</h1>
          <ul>
            <li>
              <Link to={routes.home}>Home</Link>
            </li>
            <li>Wallet</li>
          </ul>
        </div>
      </section>
      {/* /Breadcrumb */}
      {/* Dashboard Menu */}
      <DashboardComponent />
      {/* /Dashboard Menu */}
      {/* Page Content */}
      <div className="content court-bg">
        <div className="container">
          {user ? (
            <div className="row justify-content-center">
              {/* Wallet Balance */}
              <div className="col-md-12 col-lg-5 d-flex">
                <div className="wallet-wrap flex-fill">
                  <div className="wallet-bal">
                    <div className="wallet-img">
                      <div className="wallet-amt">
                        <h5>Your Wallet Balance</h5>
                        <h2>{getFormattedCurrency(user.credit_balance ?? 0)}</h2>
                      </div>
                    </div>
                    {/* <div className="payment-btn">
                      <Link to="#" className="btn balance-add" data-bs-toggle="modal" data-bs-target="#add-payment">Add Payment</Link>
                    </div> */}
                  </div>
                  <ImageWithBasePath
                    src="assets/img/logo.png"
                    className="img-fluid header-logo float-end"
                    alt="Logo"
                  />
                  {/* <ul>
                    <li>
                      <h6>Total Credit</h6>
                      <h3>$350.40</h3>
                    </li>
                    <li>
                      <h6>Total Debit</h6>
                      <h3>$50.40</h3>
                    </li>
                    <li>
                      <h6>Total transaction</h6>
                      <h3>$480.40</h3>
                    </li>
                  </ul> */}
                </div>
              </div>
              {/* /Wallet Balance */}
              {/* Wallet Card */}
              {/* <div className="col-md-12 col-lg-7 d-flex">
                <div className="your-card">
                  <div className="your-card-head">
                    <h3>Your Cards</h3>
                    <Link to="#" className="btn btn-secondary d-inline-flex align-items-center" data-bs-toggle="modal" data-bs-target="#add-new-card">Add New Card</Link>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 col-md-12">
                      <div className="debit-card-blk">
                        <div className="debit-card-balence">
                          <span>Debit card</span>
                          <h5>Balance in card : 1,234</h5>
                          <div className="card-number">
                            <h4>123145546655</h4>
                          </div>
                        </div>
                        <div className="debit-card-img">
                          <ImageWithBasePath src="assets/img/icons/visa-icon.svg" alt="Icon" />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                      <div className="debit-card-blk">
                        <div className="debit-card-balence">
                          <span>Debit card</span>
                          <h5>Balance in card : 1,234</h5>
                          <div className="card-number">
                            <h4>314555884554</h4>
                          </div>
                        </div>
                        <div className="debit-card-img">
                          <ImageWithBasePath src="assets/img/icons/master-card.svg" alt="Icon" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              {/* /Wallet Card */}
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      {/* /Page Content */}
    </div>
  )
}

export default UserWallet
