import React, {useState} from 'react'
import {all_routes} from '../router/AllRoutes'
import {Link, useLocation} from 'react-router-dom'
import ImageWithBasePath from '../../core/data/img/ImageWithBasePath'
import {apiService} from '../../services/apiService'

const ChangePassword = () => {
  const routes = all_routes
  const [message, setMessage] = useState<any | null>(null)
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const token = queryParams.get('token')
  const [formData, setFormData] = useState({
    token: token,
    email: '',
    password: '',
    password_confirmation: '',
  })

  const handleChange = (e: any) => {
    const {name, value} = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    console.log(formData)
  }

  const handleSubmit = (e: any) => {
    setMessage(null)
    e.preventDefault() // Prevents page reload
    apiService
      .post('/api/v1/auth/change-password', formData)
      .then((response: any) => {
        if (!response || response.code === 500 || response.code === 404) {
          setMessage({message: response?.message ?? 'Invalid details.', code: 500})
        } else {
          setMessage({message: response.message, code: 200})
        }
      })
      .catch(err => {
        setMessage({message: err?.message ?? 'Invalid details.', code: 500})
      })
  }
  return (
    <div className="main-wrapper authendication-pages">
      {/* Page Content */}
      <div className="content blur-ellipses login-password">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-7 mx-auto vph-100 d-flex align-items-center">
              <div className="change-password w-100">
                <header className="text-center">
                  <Link to={routes.home}>
                    <ImageWithBasePath
                      src="assets/img/logo-black.svg"
                      className="img-fluid"
                      alt="Logo"
                    />
                  </Link>
                </header>
                <div className="shadow-card">
                  <h2>Change Password</h2>
                  {message ? (
                    <div
                      className={`alert alert-${message.code == 200 ? 'success' : 'danger'}`}
                      role="alert"
                    >
                      {message.message}
                    </div>
                  ) : (
                    ''
                  )}
                  <p>
                    Your New Password must be different from
                    <br />
                    Previous used Password
                  </p>
                  {/* Login Form */}
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <input
                        type="text"
                        name="email"
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter email address"
                      />
                    </div>
                    <div className="form-group">
                      <div className="pass-group group-img">
                        <i className="toggle-password feather-eye" />
                        <input
                          type="password"
                          name="password"
                          onChange={handleChange}
                          className="form-control pass-input"
                          placeholder="New Password"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="pass-group group-img">
                        <i className="toggle-password-confirm feather-eye" />
                        <input
                          type="password"
                          name="password_confirmation"
                          onChange={handleChange}
                          className="form-control pass-confirm"
                          placeholder="Confirm Password"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-secondary w-100 d-inline-flex justify-content-center align-items-center"
                    >
                      Change Password
                      <i className="feather-arrow-right-circle ms-2" />
                    </button>
                  </form>
                  {/* /Login Form */}
                </div>
                <div className="bottom-text text-center">
                  <p>
                    Have an account? <Link to={routes.login}>Sign In!</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
    </div>
  )
}

export default ChangePassword
