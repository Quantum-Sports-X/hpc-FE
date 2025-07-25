import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {all_routes} from '../router/AllRoutes'
import {BookingFlowBreadCrumb} from '../common/BookingFlowBreadcrumb'
import {apiService} from '../../services/apiService'
import {
  formatDate,
  formatTimeWithAmPmWithoutTZ,
  getFormattedCurrency,
} from '../../services/commonService'
import {aResetBookingCart} from '../../core/data/redux/action'

const Summary = () => {
  const dispatch = useDispatch()
  const routes = all_routes
  const [_error, setError] = useState<string | null>(null)
  const navigate = useNavigate() // Hook to redirect
  const [booking, setBookingDetails] = useState<any | null>(null)
  const {refCode} = useParams<{refCode: string}>()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (token) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  useEffect(() => {
    // reset cart if booking is successful
    dispatch(aResetBookingCart())
    // Fetch coach data when the component mounts
    apiService
      .get('/api/v1/bookings/' + refCode)
      .then((response: any) => {
        if (!response || response.data === null) {
          navigate('/error-404') // Redirect if coach not found
        } else {
          setBookingDetails(response.data) // Set coach data
        }
      })
      .catch(err => setError(err.message))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refCode, navigate])
  return (
    <div>
      <>
        {/* Breadcrumb */}
        <div className="breadcrumb mb-0">
          <span className="primary-right-round" />
          <div className="container">
            <h1 className="text-white">Order Summary</h1>
            <ul>
              <li>
                <Link to={routes.home}>Home</Link>
              </li>
              <li>Order Summary</li>
            </ul>
          </div>
        </div>
        <BookingFlowBreadCrumb />
        {booking ? (
          <div className="content hexagon-background">
            <div className="container">
              <section className="card mb-40">
                <div className="text-center mb-10">
                  <h3 className="mb-1">Order Summary</h3>
                  <div className="alert alert-success">
                    Booking is confirmed. Contact support for any inquiries. Your Booking
                    confirmation <span className="fw-bold">{refCode}</span>
                  </div>
                </div>
              </section>

              <section className="card booking-order-confirmation">
                <div className="d-flex flex-column flex-md-row justify-content-between">
                  <h4 className="mb-3 mb-md-0">Reference: #{booking.referance_code}</h4>
                  <div className="d-flex flex-row justify-content-start align-items-center">
                    <Link className="btn btn-primary me-3 btn-icon" to={routes.home}>
                      <i className="feather-arrow-left-circle me-1" /> Home
                    </Link>
                    {isLoggedIn && (
                      <Link
                        className="btn btn-secondary btn-icon"
                        to={`${routes.userBookingsPrefix}/active`}
                      >
                        My Bookings <i className="feather-arrow-right-circle ms-1" />
                      </Link>
                    )}
                  </div>
                </div>
                <h5 className="my-3">Booking Information</h5>
                <ul className="contact-info d-lg-flex justify-content-start align-items-center">
                  <li>
                    <h6>Name</h6>
                    <p>
                      {booking.first_name} {booking.last_name}
                    </p>
                  </li>
                  <li>
                    <h6>Email Address</h6>
                    <p>{booking.email}</p>
                  </li>
                  <li>
                    <h6>Phone Number</h6>
                    <p>{booking.contact_no || '-'}</p>
                  </li>
                </ul>
                <div>
                  <h5 className="mb-3">Booking Details</h5>
                  <div className="table-responsive">
                    <table className="table mb-4">
                      <thead>
                        <th>
                          <h6>Location</h6>
                        </th>
                        <th>
                          <h6>Lane</h6>
                        </th>
                        <th>
                          <h6>Coach</h6>
                        </th>
                        <th>
                          <h6>Date</h6>
                        </th>
                        <th>
                          <h6>Duration</h6>
                        </th>
                      </thead>
                      <tbody>
                        {booking.reservations.map((reservation: any) => (
                          <tr key={reservation.id}>
                            <td>{booking.location.name}</td>
                            <td>{reservation.lane.name}</td>
                            <td>{reservation.coach?.first_name ?? 'N/A'}</td>
                            <td>{formatDate(reservation.from)}</td>
                            <td>
                              {formatTimeWithAmPmWithoutTZ(reservation.from)} -{' '}
                              {formatTimeWithAmPmWithoutTZ(reservation.to)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <h5 className="mb-3">Payment Information</h5>

                <ul className="payment-info d-lg-flex justify-content-start align-items-center">
                  <li>
                    <h6>Subtotal</h6>
                    <p className="primary-text">{getFormattedCurrency(booking.sub_total)}</p>
                  </li>
                  <li>
                    <h6>Add-ons</h6>
                    <p className="primary-text">{getFormattedCurrency(booking.add_on_rate)}</p>
                  </li>
                  <li>
                    <h6>Discount</h6>
                    <p className="primary-text">{getFormattedCurrency(booking.discount)}</p>
                  </li>
                  <li>
                    <h6>Total</h6>
                    <p className="primary-text">{getFormattedCurrency(booking.total)}</p>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        ) : (
          ''
        )}
      </>
    </div>
  )
}

export default Summary
