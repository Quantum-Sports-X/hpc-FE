import React, {useState} from 'react'
import {all_routes} from '../router/AllRoutes'
import {Link} from 'react-router-dom'
import ImageWithBasePath from '../../core/data/img/ImageWithBasePath'
import {apiService} from '../../services/apiService'

const ForgotPassword = () => {
  const routes = all_routes
  const [message, setMessage] = useState<any | null>(null)
  const [formData, setFormData] = useState({
    email: '',
  })

  const handleChange = (e: any) => {
    const {name, value} = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault() // Prevents page reload
    setMessage(null)
    apiService
      .post('/api/v1/auth/forget-password', formData)
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
      <div className="content blur-ellipses">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-6 mx-auto vph-100 d-flex align-items-center">
              <div className="forgot-password w-100">
                <header className="text-center forgot-head-title">
                  <Link to={routes.home}>
                    <ImageWithBasePath
                      src="assets/img/logo-black.svg"
                      className="img-fluid"
                      alt="Logo"
                    />
                  </Link>
                </header>
                <div className="shadow-card">
                  <h2>Forgot Password</h2>
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
                  <p>Enter Registered Email</p>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <div className="group-img">
                        <i className="feather-mail" />
                        <input
                          type="text"
                          name="email"
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Email"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-secondary w-100 d-inline-flex justify-content-center align-items-center"
                    >
                      Send password reset link
                      <i className="feather-arrow-right-circle ms-2" />
                    </button>
                  </form>
                </div>
                <div className="bottom-text text-center">
                  <p>
                    Remember Password? <Link to={routes.login}>Sign In!</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
