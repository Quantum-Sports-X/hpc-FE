import React, {useEffect, useState, useRef, useCallback} from 'react'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import {all_routes} from '../router/AllRoutes'
import ImageWithBasePath from '../../core/data/img/ImageWithBasePath'
import {apiService} from '../../services/apiService'
import {HtmlRenderer} from '../common/HtmlRenderer'
import {Dropdown} from 'primereact/dropdown'
import {Calendar} from 'primereact/calendar'
import {countries} from '../../utils/countries'

const Register = () => {
  const route = all_routes
  const [passwordVisible, setPasswordVisible] = useState(false)
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const roleType = queryParams.get('role') // retrieves 'coach' if present
  const referral = queryParams.get('referral')
  const [userConsentTime, setUserConsentTime] = useState<any>(null)
  const [isOrderInProgress, setIsOrderInProgress] = useState<any>(false)
  const [formData, setFormData] = useState<Record<string, any>>({
    roleType: 'USER',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
    mobile_no: '',
    address: '',
    city: '',
    post_code: '',
    country: 'United Kingdom',
    dob: '',
    medical_condition: '',
    user_consent_time: userConsentTime,
  })

  const refs = {
    first_name: useRef<HTMLInputElement | null>(null),
    last_name: useRef<HTMLInputElement | null>(null),
    email: useRef<HTMLInputElement | null>(null),
    password: useRef<HTMLInputElement | null>(null),
    password_confirmation: useRef<HTMLInputElement | null>(null),
    mobile_no: useRef<HTMLInputElement | null>(null),
    address: useRef<HTMLInputElement | null>(null),
    city: useRef<HTMLInputElement | null>(null),
    post_code: useRef<HTMLInputElement | null>(null),
    country: useRef<HTMLDivElement | null>(null),
    dob: useRef<HTMLInputElement | null>(null),
    user_consent_time: useRef<HTMLInputElement | null>(null),
  }

  const topRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (roleType && roleType === 'coach') {
      setFormData(prevData => ({
        ...prevData,
        roleType: roleType.toUpperCase(),
      }))
    }
  }, [roleType])

  const togglePasswordVisibility = () => {
    setPasswordVisible(prev => !prev)
  }
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(prev => !prev)
  }

  const handleChange = (e: any) => {
    const {name, value} = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    if (name === 'email' && emailError) {
      setEmailError(null) // Clear email error
    }

    if ((name === 'password' || name === 'password_confirmation') && passwordError) {
      setPasswordError(null) // Clear password mismatch error
    }
    if (name === 'roleType') {
      navigate(`?role=${value.toLowerCase()}`)
    }
  }
  const [message, setMessage] = useState<any | null>(null)
  const navigate = useNavigate() // Hook to redirect
  const [emailError, setEmailError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)

  // Scroll to top when message changes
  useEffect(() => {
    if (message && topRef.current) {
      topRef.current.scrollIntoView({behavior: 'smooth'})
    }
  }, [message])

  const handleConsentClick = (event: any) => {
    setFormData({
      ...formData,
      user_consent_time: event.target.checked ? new Date() : null,
    })
    setUserConsentTime(event.target.checked ? new Date() : null)
  }

  const validationCheck = useCallback(() => {
    let hasError = false

    const requiredFields = [
      'first_name',
      'last_name',
      'email',
      'password',
      'password_confirmation',
      'mobile_no',
      'address',
      'city',
      'post_code',
      'country',
      'dob',
      'user_consent_time',
    ]

    for (const field of requiredFields) {
      if (!formData[field]) {
        // @ts-ignore
        refs[field]?.current?.focus()
        hasError = true
        break
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setEmailError('Invalid email address.')
      refs.email.current?.focus()
      hasError = true
    }

    // Check for password mismatch
    if (formData.password !== formData.password_confirmation) {
      setPasswordError('Passwords do not match.')
      refs.password_confirmation.current?.focus()
      hasError = true
    }

    return !hasError
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData])

  const handleCountryChange = (e: any) => {
    setFormData({
      ...formData,
      country: e.value.name,
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault() // Prevents page reload
    if (!validationCheck()) {
      return
    }

    setIsOrderInProgress(true)
    apiService
      .post('/api/v1/auth/register', formData)
      .then((response: any) => {
        if (!response || response.data === null) {
          setMessage({message: 'Submission Failed.', code: 500})
        } else {
          setMessage({message: response.message, code: 200})
          apiService.get('/api/v1/auth/me', response.data.token).then((authResponse: any) => {
            localStorage.setItem('user', JSON.stringify(authResponse.data))
          })
          localStorage.setItem('authToken', response.data.token)
          if (localStorage.getItem('goBackPath')) {
            navigate(localStorage.getItem('goBackPath') ?? '/', {state: {roleType}})
            localStorage.removeItem('goBackPath')
          } else {
            navigate('/', {state: {roleType}})
          }
        }
        setIsOrderInProgress(false)
      })
      .catch(err => {
        let errorMessages = 'Submission Failed.<br>'
        Object.values(err).map((errorArray: any) => {
          errorArray.map((error: string) => {
            errorMessages += `• ${error}<br>`
          })
        })
        setIsOrderInProgress(false)
        setMessage({message: <HtmlRenderer htmlContent={errorMessages} />, code: 500})
      })
    // You can also handle form submission logic here, like calling an API
  }
  return (
    <div>
      <>
        {/* Main Wrapper */}
        <div className="main-wrapper authendication-pages">
          {/* Page Content */}
          <div className="content">
            <div className="container wrapper no-padding">
              <div className="row no-margin vph-100">
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 no-padding">
                  <div className="banner-bg register">
                    <div className="row no-margin h-100">
                      <div className="col-sm-10 col-md-10 col-lg-10 mx-auto">
                        <div className="h-100 d-flex justify-content-center align-items-center">
                          {/*<div className="text-bg register text-center">*/}
                          {/*  <button*/}
                          {/*    type="button"*/}
                          {/*    className="btn btn-limegreen text-capitalize"*/}
                          {/*  >*/}
                          {/*    <i className="fa-solid fa-thumbs-up me-3" />*/}
                          {/*    register Now*/}
                          {/*  </button>*/}
                          {/*  <p>*/}
                          {/*    Register now for our innovative sports software*/}
                          {/*    solutions, designed to tackle challenges in*/}
                          {/*    everyday sports activities and events.*/}
                          {/*  </p>*/}
                          {/*</div>*/}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 no-padding">
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
                        <div className="shadow-card" ref={topRef}>
                          <h2>Get Started</h2>
                          <p>Kickstart your cricket journey with HPC Cricket – Get started today</p>
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
                          <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                              <button
                                className={`nav-link d-flex align-items-center ${formData.roleType === 'USER' ? 'active' : ''}`}
                                id="user-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#user"
                                type="button"
                                role="tab"
                                aria-controls="user"
                                aria-selected={formData.roleType === 'USER'}
                                name="roleType"
                                value="USER"
                                onClick={handleChange}
                                disabled={referral === 'home-page' || referral === 'about-us-page'}
                              >
                                <span className="d-flex justify-content-center align-items-center" />
                                I am a User
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className={`nav-link d-flex align-items-center ${formData.roleType === 'COACH' ? 'active' : ''}`}
                                id="coach-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#coach"
                                type="button"
                                role="tab"
                                aria-controls="coach"
                                aria-selected={formData.roleType === 'COACH'}
                                name="roleType"
                                value="COACH"
                                onClick={handleChange}
                                disabled={referral === 'create-booking'}
                              >
                                <span className="d-flex justify-content-center align-items-center" />
                                I am a Coach
                              </button>
                            </li>
                          </ul>
                          <div className="tab-content" id="myTabContent">
                            <div
                              className="tab-pane fade show active"
                              id="user"
                              role="tabpanel"
                              aria-labelledby="user-tab"
                            >
                              {/* Register Form */}
                              <form onSubmit={handleSubmit}>
                                <input type="hidden" name="type" value="USER" />
                                <div className="row">
                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <div className="group-img">
                                        <i className="feather-user" />
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="First name"
                                          name="first_name"
                                          onChange={handleChange}
                                          ref={refs.first_name}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <div className="group-img">
                                        <i className="feather-user" />
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="Last name"
                                          name="last_name"
                                          onChange={handleChange}
                                          ref={refs.last_name}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <div className="group-img">
                                    <i className="feather-mail" />
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Email"
                                      name="email"
                                      autoComplete="off"
                                      onChange={handleChange}
                                      ref={refs.email}
                                    />
                                    {emailError && (
                                      <div className="text-danger mt-1">{emailError}</div>
                                    )}
                                  </div>
                                </div>
                                <div className="form-group">
                                  <div className="pass-group group-img">
                                    <i
                                      className={`toggle-password ${passwordVisible ? 'feather-eye' : 'feather-eye-off'}`}
                                      onClick={togglePasswordVisibility}
                                    />
                                    <input
                                      type={passwordVisible ? 'text' : 'password'}
                                      className="form-control pass-input"
                                      placeholder="Password"
                                      autoComplete="new-password"
                                      onChange={handleChange}
                                      name="password"
                                      ref={refs.password}
                                    />
                                  </div>
                                </div>
                                <div className="form-group">
                                  <div className="pass-group group-img">
                                    <i
                                      className={`toggle-password ${confirmPasswordVisible ? 'feather-eye' : 'feather-eye-off'}`}
                                      onClick={toggleConfirmPasswordVisibility}
                                    />
                                    <input
                                      type={confirmPasswordVisible ? 'text' : 'password'}
                                      className="form-control pass-input"
                                      placeholder="Confirm Password"
                                      autoComplete="off"
                                      name="password_confirmation"
                                      onChange={handleChange}
                                      ref={refs.password_confirmation}
                                    />
                                    {passwordError && (
                                      <div className="text-danger mt-1">{passwordError}</div>
                                    )}
                                  </div>
                                </div>
                                <div className="form-group">
                                  <div className="group-img">
                                    <i className="feather-phone" />
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Mobile Number"
                                      name="mobile_no"
                                      onChange={handleChange}
                                      ref={refs.mobile_no}
                                    />
                                  </div>
                                </div>
                                <div className="form-group">
                                  <div className="group-img">
                                    <i className="feather-map-pin" />
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="House Number and Street Name"
                                      name="address"
                                      onChange={handleChange}
                                      ref={refs.address}
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <div className="group-img">
                                        <i className="feather-map-pin" />
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="City"
                                          name="city"
                                          onChange={handleChange}
                                          ref={refs.city}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <div className="group-img">
                                        <i className="feather-map-pin" />
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="Post code"
                                          name="post_code"
                                          onChange={handleChange}
                                          ref={refs.post_code}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <div className="group-img">
                                    <i className="feather-map-pin" />
                                    <Dropdown
                                      value={countries.find(c => c.name === formData.country)}
                                      options={countries}
                                      onChange={handleCountryChange}
                                      optionLabel="name"
                                      placeholder="Select a Country"
                                      className="w-100 country-dropdown"
                                      style={{padding: '5px', borderRadius: '10px'}}
                                    />
                                  </div>
                                </div>
                                <div className="form-group">
                                  <div className="group-img">
                                    <Calendar
                                      value={formData.dob}
                                      onChange={e => setFormData({...formData, dob: e.value})}
                                      placeholder="Date of Birth"
                                      className="w-100 dob-calendar"
                                      showIcon
                                    />
                                  </div>
                                </div>
                                <div className="form-group">
                                  <div className="group-img">
                                    <i className="feather-heart" />
                                    <textarea
                                      className="form-control"
                                      placeholder="Medical Conditions"
                                      name="medical_condition"
                                      onChange={handleChange}
                                    ></textarea>
                                  </div>
                                </div>
                                <div className="form-check d-flex justify-content-start align-items-center policy">
                                  <div className="d-inline-block">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      defaultValue=""
                                      id="policy"
                                      onClick={handleConsentClick}
                                    />
                                  </div>
                                  <label className="form-check-label" htmlFor="policy">
                                    By continuing you indicate that you read and agreed to the{' '}
                                    <Link to={route.termsCondition}>Terms and conditions.</Link>
                                  </label>
                                </div>
                                <button
                                  type="submit"
                                  className="btn btn-secondary register-btn d-inline-flex justify-content-center align-items-center w-100 btn-block"
                                  disabled={
                                    !formData?.first_name ||
                                    !formData?.last_name ||
                                    !formData?.email ||
                                    !formData?.password ||
                                    !formData?.password_confirmation ||
                                    !formData?.user_consent_time ||
                                    !formData?.mobile_no ||
                                    !formData?.address ||
                                    !formData?.city ||
                                    !formData?.post_code ||
                                    !formData?.country ||
                                    !formData?.dob ||
                                    isOrderInProgress
                                  }
                                >
                                  Create Account
                                  <i className="feather-arrow-right-circle ms-2" />
                                </button>
                              </form>
                              {/* /Register Form */}
                            </div>
                            <div
                              className="tab-pane fade"
                              id="coach"
                              role="tabpanel"
                              aria-labelledby="coach-tab"
                            >
                              {/* Register Form */}
                              <form onSubmit={handleSubmit}>
                                <input type="hidden" name="type" value="COACH" />
                                <div className="row">
                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <div className="group-img">
                                        <i className="feather-user" />
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="First name"
                                          name="first_name"
                                          onChange={handleChange}
                                          ref={refs.first_name}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <div className="group-img">
                                        <i className="feather-user" />
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="Last name"
                                          name="last_name"
                                          onChange={handleChange}
                                          ref={refs.last_name}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <div className="group-img">
                                    <i className="feather-mail" />
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Email"
                                      name="email"
                                      autoComplete="off"
                                      onChange={handleChange}
                                      ref={refs.email}
                                    />
                                    {emailError && (
                                      <div className="text-danger mt-1">{emailError}</div>
                                    )}
                                  </div>
                                </div>
                                <div className="form-group">
                                  <div className="pass-group group-img">
                                    <i
                                      className={`toggle-password ${passwordVisible ? 'feather-eye' : 'feather-eye-off'}`}
                                      onClick={togglePasswordVisibility}
                                    />
                                    <input
                                      type={passwordVisible ? 'text' : 'password'}
                                      className="form-control pass-input"
                                      placeholder="Password"
                                      autoComplete="new-password"
                                      onChange={handleChange}
                                      name="password"
                                      ref={refs.password}
                                    />
                                  </div>
                                </div>
                                <div className="form-group">
                                  <div className="pass-group group-img">
                                    <i
                                      className={`toggle-password ${confirmPasswordVisible ? 'feather-eye' : 'feather-eye-off'}`}
                                      onClick={toggleConfirmPasswordVisibility}
                                    />
                                    <input
                                      type={confirmPasswordVisible ? 'text' : 'password'}
                                      className="form-control pass-input"
                                      placeholder="Confirm Password"
                                      autoComplete="off"
                                      name="password_confirmation"
                                      onChange={handleChange}
                                      ref={refs.password_confirmation}
                                    />
                                    {passwordError && (
                                      <div className="text-danger mt-1">{passwordError}</div>
                                    )}
                                  </div>
                                </div>
                                <div className="form-group">
                                  <div className="group-img">
                                    <i className="feather-phone" />
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Mobile Number"
                                      name="mobile_no"
                                      onChange={handleChange}
                                      ref={refs.mobile_no}
                                    />
                                  </div>
                                </div>
                                <div className="form-group">
                                  <div className="group-img">
                                    <i className="feather-map-pin" />
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="House Number and Street Name"
                                      name="address"
                                      onChange={handleChange}
                                      ref={refs.address}
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <div className="group-img">
                                        <i className="feather-map-pin" />
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="City"
                                          name="city"
                                          onChange={handleChange}
                                          ref={refs.city}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <div className="group-img">
                                        <i className="feather-map-pin" />
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="Post code"
                                          name="post_code"
                                          onChange={handleChange}
                                          ref={refs.post_code}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <div className="group-img">
                                    <i className="feather-map-pin" />
                                    <Dropdown
                                      value={countries.find(c => c.name === formData.country)}
                                      options={countries}
                                      onChange={handleCountryChange}
                                      optionLabel="name"
                                      placeholder="Select a Country"
                                      className="w-100 country-dropdown"
                                      style={{padding: '5px', borderRadius: '10px'}}
                                    />
                                  </div>
                                </div>
                                <div className="form-group">
                                  <div className="group-img">
                                    <Calendar
                                      value={formData.dob}
                                      onChange={e => setFormData({...formData, dob: e.value})}
                                      placeholder="Date of Birth"
                                      className="w-100 dob-calendar"
                                      showIcon
                                    />
                                  </div>
                                </div>
                                <div className="form-check d-flex justify-content-start align-items-center policy">
                                  <div className="d-inline-block">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      defaultValue=""
                                      id="policy"
                                      onClick={handleConsentClick}
                                    />
                                  </div>
                                  <label className="form-check-label" htmlFor="policy">
                                    By continuing you indicate that you read and agreed to the{' '}
                                    <Link to={route.termsCondition}>Terms and conditions.</Link>
                                  </label>
                                </div>
                                <button
                                  type="submit"
                                  className="btn btn-secondary register-btn d-inline-flex justify-content-center align-items-center w-100 btn-block"
                                  disabled={
                                    !formData?.first_name ||
                                    !formData?.last_name ||
                                    !formData?.email ||
                                    !formData?.password ||
                                    !formData?.password_confirmation ||
                                    !formData?.user_consent_time ||
                                    !formData?.mobile_no ||
                                    !formData?.address ||
                                    !formData?.city ||
                                    !formData?.post_code ||
                                    !formData?.country ||
                                    !formData?.dob ||
                                    isOrderInProgress
                                  }
                                >
                                  Create Account
                                  <i className="feather-arrow-right-circle ms-2" />
                                </button>
                              </form>
                              {/* /Register Form */}
                            </div>
                          </div>
                        </div>
                        <div className="bottom-text text-center">
                          <p>
                            Have an account? <Link to={route.login}>Sign In!</Link>
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
    </div>
  )
}

export default Register
