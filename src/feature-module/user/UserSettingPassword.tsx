import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {all_routes} from '../router/AllRoutes'
import {DashboardComponent} from '../common/DashboardComponent'
import {apiService} from '../../services/apiService'

const UserSettingPassword = () => {
  const routes = all_routes
  const [message, setMessage] = useState<any | null>(null)

  const [formData, setFormData] = useState({
    old_password: '',
    password: '',
    password_confirmation: '',
  })

  const handleInputChange = (e: any) => {
    const {name, value} = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault() // Prevents page reload
    apiService
      .post('/api/v1/reset-password', formData, localStorage.getItem('authToken') ?? '')
      .then((response: any) => {
        if (!response || response.code !== 200) {
          setMessage({message: "Couldn't reset the password. Try again!", code: 500})
        } else {
          setMessage({message: response.message, code: 200})
        }
      })
      .catch(err => setMessage({message: err.message, code: 500}))
  }
  return (
    <>
      {/* Breadcrumb */}
      <section className="breadcrumb breadcrumb-list mb-0">
        <span className="primary-right-round" />
        <div className="container">
          <h1 className="text-white">Change Password</h1>
          <ul>
            <li>
              <Link to={routes.home}>Home</Link>
            </li>
            <li>Change Password</li>
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
                <Link to={routes.userProfile}>Profile</Link>
              </li>
              <li>
                <Link to={routes.userSettingPassword} className="active">
                  Change Password
                </Link>
              </li>
            </ul>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="profile-detail-group">
                <div className="card ">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-lg-7 col-md-7">
                        <div className="input-space">
                          <label className="form-label">Old Password</label>
                          <input
                            type="password"
                            className="form-control"
                            id="old_password"
                            name="old_password"
                            onChange={handleInputChange}
                            placeholder="Enter Old Password"
                          />
                        </div>
                      </div>
                      <div className="col-lg-7 col-md-7">
                        <div className="input-space">
                          <label className="form-label">New Password</label>
                          <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            onChange={handleInputChange}
                            placeholder="Enter New Password"
                          />
                        </div>
                      </div>
                      <div className="col-lg-7 col-md-7">
                        <div className="input-space mb-0">
                          <label className="form-label">Confirm Password</label>
                          <input
                            type="password"
                            className="form-control"
                            onChange={handleInputChange}
                            id="password_confirmation"
                            name="password_confirmation"
                            placeholder="Enter Confirm Password"
                          />
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
      </div>
      {/* /Page Content */}
    </>
  )
}

export default UserSettingPassword
