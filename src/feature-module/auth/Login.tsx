import React, {useEffect, useState, useRef} from 'react'
import ImageWithBasePath from '../../core/data/img/ImageWithBasePath'
import {Link} from 'react-router-dom'
import {all_routes} from '../router/AllRoutes'
import {apiService} from '../../services/apiService'
import {useNavigate} from 'react-router-dom'

const Login = () => {
  const route = all_routes
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [message, setMessage] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isAutoFill, setIsAutoFill] = useState(false)

  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const togglePasswordVisibility = () => {
    setPasswordVisible(prev => !prev)
  }
  const navigate = useNavigate() // Hook to redirect

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e: any) => {
    const {name, value} = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }
  // eslint-disable-next-line no-unused-vars
  const [_error, setError] = useState<string | null>(null)

  useEffect(() => {
    const emailInput = emailRef.current
    const passwordInput = passwordRef.current

    const handleAnimationStart = (e: any) => {
      switch (e.animationName) {
        case 'onAutoFillStart':
          setIsAutoFill(true)
          break
        case 'onAutoFillCancel':
          setIsAutoFill(false)
          break
        default:
          break
      }
    }

    emailInput?.addEventListener('animationstart', handleAnimationStart)
    passwordInput?.addEventListener('animationstart', handleAnimationStart)

    return () => {
      emailInput?.removeEventListener('animationstart', handleAnimationStart)
      passwordInput?.removeEventListener('animationstart', handleAnimationStart)
    }
  }, [])

  const handleSubmit = (e: any) => {
    setMessage(null)
    setIsLoading(true)
    e.preventDefault() // Prevents page reload
    apiService
      .post('/api/v1/auth/login', formData)
      .then((response: any) => {
        if (!response || response.data === null) {
          setMessage({message: 'Invalid credentials.', code: 500})
          setIsLoading(false)
        } else {
          setMessage({message: response.message, code: 200})
          setIsLoading(false)
          apiService
            .get('/api/v1/auth/me', response.data.token)
            .then((authResponse: any) => {
              // clear personal information saved previously
              localStorage.removeItem('personalInformation')
              localStorage.setItem('user', JSON.stringify(authResponse.data))
            })
            .catch(err => setError(err.message))
          localStorage.setItem('authToken', response.data.token)
          if (localStorage.getItem('goBackPath')) {
            navigate(localStorage.getItem('goBackPath') ?? '/')
            localStorage.removeItem('goBackPath')
          } else {
            navigate('/')
          }
        }
      })
      .catch(err => {
        setMessage({
          message:
            '\n' +
            'Your email and password combination does not match a HPC account, please try again.',
          code: err.code,
        })
        setIsLoading(false)
        setError(err.message)
      })
    console.log('Form data submitted:', formData)
    // You can also handle form submission logic here, like calling an API
  }

  return (
    <>
      {/* Main Wrapper */}
      <div className="main-wrapper authendication-pages">
        {/* Page Content */}
        <div className="content">
          <div className="container wrapper no-padding">
            <div className="row no-margin vph-100">
              <div className="col-12 col-sm-12 col-lg-6 no-padding">
                <div className="banner-bg login"></div>
              </div>
              <div className="col-12 col-sm-12  col-lg-6 no-padding">
                <div className="dull-pg">
                  <div className="row no-margin vph-100 d-flex align-items-center justify-content-center">
                    <div className="col-sm-10 col-md-10 col-lg-10 mx-auto">
                      <header className="text-center">
                        <Link to={route.home}>
                          <ImageWithBasePath
                            src="assets/img/logo-black.svg"
                            className="img-fluid"
                            alt="Logo"
                          />
                        </Link>
                      </header>
                      <div className="shadow-card">
                        <h2>Welcome Back</h2>
                        {message ? (
                          <div
                            className={`alert alert-${message.code == 200 ? 'success' : 'danger'} small`}
                            role="alert"
                          >
                            {message.message}
                          </div>
                        ) : (
                          ''
                        )}
                        <div className="tab-content" id="myTabContent">
                          {/* Login Form */}
                          <form onSubmit={handleSubmit}>
                            <div className="form-group">
                              <div className="group-img">
                                <i className="feather-user" />
                                <input
                                  name="email"
                                  ref={emailRef}
                                  type="text"
                                  className="form-control"
                                  placeholder="Email / Username"
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                            <div className="form-group">
                              <div className="pass-group group-img">
                                <i
                                  className={`toggle-password ${passwordVisible ? 'feather-eye' : 'feather-eye-off'}`}
                                  onClick={togglePasswordVisibility}
                                />
                                <input
                                  name="password"
                                  ref={passwordRef}
                                  type={passwordVisible ? 'text' : 'password'}
                                  className="form-control pass-input"
                                  placeholder="Password"
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                            <div className="form-group d-sm-flex align-items-center justify-content-between">
                              <div className="form-check form-switch d-flex align-items-center justify-content-start">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="user-pass"
                                />
                                <label className="form-check-label" htmlFor="user-pass">
                                  Remember Password
                                </label>
                              </div>
                              <span>
                                <Link to={route.forgotPassword} className="forgot-pass">
                                  Forgot Password
                                </Link>
                              </span>
                            </div>
                            <button
                              type="submit"
                              className="btn btn-secondary register-btn d-inline-flex justify-content-center align-items-center w-100 btn-block"
                              disabled={
                                isLoading ||
                                (!isAutoFill && (!formData.email || !formData.password))
                              }
                            >
                              {isLoading ? (
                                <span
                                  className="spinner-border spinner-border-sm"
                                  role="status"
                                  aria-hidden="true"
                                ></span>
                              ) : (
                                <>
                                  Sign In
                                  <i className="feather-arrow-right-circle ms-2" />
                                </>
                              )}
                            </button>
                          </form>
                          {/* /Login Form */}
                        </div>
                      </div>
                      <div className="bottom-text text-center">
                        <p>
                          Don’t have an account? <Link to={route.register}>Sign up!</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
      </div>
      {/* /Main Wrapper */}
    </>
  )
}

export default Login
