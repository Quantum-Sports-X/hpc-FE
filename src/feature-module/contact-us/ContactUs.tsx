import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {all_routes} from '../router/AllRoutes'
import {apiService} from '../../services/apiService'
import {HtmlRenderer} from '../common/HtmlRenderer'

const ContactUs = () => {
  const route = all_routes
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    contact_no: '',
    subject: '',
    message: '',
  })

  const handleChange = (e: any) => {
    const {name, value} = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }
  const [message, setMessage] = useState<any | null>(null)

  const handleSubmit = (e: any) => {
    e.preventDefault() // Prevents page reload
    apiService
      .post('/api/v1/contact-us', formData)
      .then((response: any) => {
        if (!response || response.code !== 200) {
          setMessage({message: 'Submission Failed.', code: 500})
        } else {
          setMessage({message: response.message, code: 200})
        }
      })
      .catch(err => {
        let errorMessages = 'Submission Failed.<br>'
        if (Array.isArray(err)) {
          Object.values(err).map((errorArray: any) => {
            errorArray.map((error: string) => {
              errorMessages += `• ${error}<br>`
            })
          })
        }
        setMessage({message: <HtmlRenderer htmlContent={errorMessages} />, code: 500})
      })
    // You can also handle form submission logic here, like calling an API
  }
  /**/
  return (
    <div>
      <div className="main-wrapper contact-us-page">
        {/* Breadcrumb */}
        <div className="breadcrumb breadcrumb-list mb-0">
          <span className="primary-right-round" />
          <div className="container">
            <h1 className="text-white">Contact Us</h1>
            <ul>
              <li>
                <Link to={route.home}>Home</Link>
              </li>
              <li>Contact Us</li>
            </ul>
          </div>
        </div>
        {/* /Breadcrumb */}
        {/* Page Content */}
        <div className="content hexagon-background blog-details contact-group">
          <div className="container aos" data-aos="fade-up">
            <h2 className="text-center mb-40">Contact Information</h2>
            <div className="row mb-40">
              <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                <div className="d-flex justify-content-start align-items-center details dull-bg">
                  <i className="feather-mail d-flex justify-content-center align-items-center" />
                  <div className="info">
                    <h4>Email / Phone</h4>
                    <p>
                      <Link to="mailto:info@hpcricket.co.uk">info@hpcricket.co.uk</Link>
                    </p>
                    <p>
                      <a href="tel:07368991211">07368991211</a> |{' '}
                      <a href="tel:02035899165">02035899165</a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                <div className="d-flex justify-content-start align-items-center details dull-bg">
                  <i className="feather-map-pin d-flex justify-content-center align-items-center" />
                  <div className="info">
                    <h4>Location</h4>
                    <p>Unit D, 43 to 49 Fowler Road, Essex IG6 3FF</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                <div className="d-flex justify-content-start align-items-center details dull-bg">
                  <i className="feather-clock d-flex justify-content-center align-items-center" />
                  <div className="info">
                    <h4>Opening Times</h4>
                    <p>We are open 9am-10pm</p>
                    <p>7 Days Per Week</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="google-maps">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1238.8734490435004!2d0.12514!3d51.609526!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a3428345d427%3A0x2017bb31e627a46!2sHPC%20Chigwell!5e0!3m2!1sen!2suk!4v1728924306270!5m2!1sen!2suk"
                    height={445}
                    style={{border: 0}}
                    // @important change from allowFullScreen=""
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
          <section className="section dull-bg">
            <div className="container">
              <h2 className="text-center mb-40">
                Get in touch with us by completing the form below
              </h2>
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
              <form onSubmit={handleSubmit} className="contact-us">
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-6 mb-3">
                    <label htmlFor="first-name" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="first_name"
                      name="first_name"
                      onChange={handleChange}
                      placeholder="Enter First Name"
                    />
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 mb-3">
                    <label htmlFor="last-name" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="last-name"
                      name="last_name"
                      onChange={handleChange}
                      placeholder="Enter Last Name"
                    />
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 mb-3">
                    <label htmlFor="e-mail" className="form-label">
                      Email
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="e-mail"
                      name="email"
                      onChange={handleChange}
                      placeholder="Enter Email Address"
                    />
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 mb-3">
                    <label htmlFor="phone" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      name="contact_no"
                      onChange={handleChange}
                      placeholder="Enter Phone Number"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col mb-3">
                    <label htmlFor="subject" className="form-label">
                      Subject
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="subject"
                      name="subject"
                      onChange={handleChange}
                      placeholder="Enter Subject"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="comments" className="form-label">
                    Message
                  </label>
                  <textarea
                    className="form-control"
                    id="comments"
                    name="message"
                    rows={3}
                    onChange={handleChange}
                    placeholder="Enter your message"
                  />
                </div>
                <button type="submit" className="btn btn-secondary d-flex align-items-center">
                  Submit
                  <i className="feather-arrow-right-circle ms-2" />
                </button>
              </form>
            </div>
          </section>
        </div>
        {/* /Page Content */}
      </div>
    </div>
  )
}

export default ContactUs
