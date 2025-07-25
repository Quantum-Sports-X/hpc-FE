import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {all_routes} from '../router/AllRoutes'
import {DashboardComponent} from '../common/DashboardComponent'
import {apiService} from '../../services/apiService'
import ImageWithOutBasePath from '../../core/data/img/ImageWithOutBasePath'

const UserProfile = () => {
  const routes = all_routes
  const [user, setUser] = useState<any>(null)
  const [profilePath, setProfilePath] = useState<any>(null)
  const [message, setMessage] = useState<any | null>(null)
  const [dataUpdated, setDataUpdated] = useState<boolean>(false)
  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (token) {
      apiService
        .get('/api/v1/auth/me', token)
        .then((authResponse: any) => {
          setUser(authResponse.data)
        })
        .catch(err => {
          setMessage({message: err.message, code: 500})
        })
    }
  }, [])
  const imageFormData = new FormData()
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    contact_no: '',
    email: '',
    description: '',
  })
  useEffect(() => {
    if (user && !dataUpdated) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        contact_no: user.mobile_no || '',
        email: user.email || '',
        description: user.description || '',
      })
      setDataUpdated(true)
      setProfilePath(user.avatar)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const handleInputChange = (e: any) => {
    const {name, value} = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }))
  }
  const handleImageChange = (e: any) => {
    imageFormData.append('avatar', e.target.files[0])
    apiService
      .post('/api/v1/update-profile', imageFormData, localStorage.getItem('authToken') ?? '', {
        Authorization: `Bearer ${localStorage.getItem('authToken') ?? ''}`,
      })
      .then((response: any) => {
        if (!response || response.code !== 200) {
          setMessage({message: "Couldn't update the profile picture. Try again!", code: 500})
        } else {
          setMessage({message: response.message, code: 200})
          apiService
            .get('/api/v1/auth/me', localStorage.getItem('authToken') ?? '')
            .then((authResponse: any) => {
              localStorage.setItem('user', JSON.stringify(authResponse.data))
              setProfilePath(authResponse.data.avatar)
            })
            .catch(err => setMessage({message: err.message, code: 500}))
        }
      })
      .catch(err => setMessage({message: err.message, code: 500}))
  }
  const handleSubmit = (e: any) => {
    e.preventDefault() // Prevents page reload
    apiService
      .post('/api/v1/update-profile', formData, localStorage.getItem('authToken') ?? '')
      .then((response: any) => {
        if (!response || response.code !== 200) {
          setMessage({message: "Couldn't update the profile. Try again!", code: 500})
        } else {
          setMessage({message: response.message, code: 200})
          apiService
            .get('/api/v1/auth/me', localStorage.getItem('authToken') ?? '')
            .then((authResponse: any) => {
              localStorage.setItem('user', JSON.stringify(authResponse.data))
            })
            .catch(err => setMessage({message: err.message, code: 500}))
        }
      })
      .catch(err => setMessage({message: err.message, code: 500}))
  }
  return (
    <div>
      <>
        {/* Breadcrumb */}
        <section className="breadcrumb breadcrumb-list mb-0">
          <span className="primary-right-round" />
          <div className="container">
            <h1 className="text-white">User Profile</h1>
            <ul>
              <li>
                <Link to={routes.home}>Home</Link>
              </li>
              <li>User Profile</li>
            </ul>
          </div>
        </section>
        {/* /Breadcrumb */}
        {/* Dashboard Menu */}
        <DashboardComponent />
        {/* /Dashboard Menu */}
        {/* Page Content */}
        <div className="content court-bg">
          {user ? (
            <div className="container">
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
              <div className="coach-court-list profile-court-list">
                <ul className="nav">
                  <li>
                    <Link className="active" to={routes.userProfile}>
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to={routes.userSettingPassword}>Change Password</Link>
                  </li>
                </ul>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="profile-detail-group">
                    <div className="card ">
                      <form onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="file-upload-text">
                              <div className="file-upload">
                                <ImageWithOutBasePath
                                  src={profilePath}
                                  className="img-fluid"
                                  alt="Upload"
                                />
                                <h5>Upload Photo</h5>
                                <span>
                                  <i className="feather-edit-3" />

                                  <input
                                    type="file"
                                    id="avatar"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                  />
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="input-space">
                              <label className="form-label">First name</label>
                              <input
                                type="text"
                                className="form-control"
                                id="first_name"
                                onChange={handleInputChange}
                                name="first_name"
                                value={formData.first_name}
                                placeholder="Enter First Name"
                              />
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="input-space">
                              <label className="form-label">Last Name</label>
                              <input
                                type="text"
                                className="form-control"
                                onChange={handleInputChange}
                                id="last_name"
                                name="last_name"
                                value={formData.last_name}
                                placeholder="Enter Last Name"
                              />
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="input-space">
                              <label className="form-label">Email</label>
                              <input
                                type="email"
                                onChange={handleInputChange}
                                className="form-control"
                                value={formData.email}
                                id="email"
                                name="email"
                                placeholder="Enter Email Address"
                              />
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="input-space">
                              <label className="form-label">Phone Number</label>
                              <input
                                type="text"
                                onChange={handleInputChange}
                                value={formData.contact_no}
                                className="form-control"
                                id="contact_no"
                                name="contact_no"
                                placeholder="Enter Phone Number"
                              />
                            </div>
                          </div>
                          <div className="col-lg-12 col-md-12">
                            <div className="info-about">
                              <label htmlFor="comments" className="form-label">
                                Information about You
                              </label>
                              <textarea
                                className="form-control"
                                onChange={handleInputChange}
                                id="description"
                                name="description"
                                value={formData.description}
                                rows={3}
                                placeholder="About"
                              ></textarea>
                            </div>
                          </div>
                        </div>
                        <div className="save-changes text-end">
                          <button type="submit" className="btn btn-secondary save-profile">
                            Submit
                            <i className="feather-arrow-right-circle ms-2" />
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
        {/* /Page Content */}
      </>
    </div>
  )
}

export default UserProfile
