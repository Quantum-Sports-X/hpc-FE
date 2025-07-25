import React, {useEffect, useState} from 'react'
import {Link, useLocation, useParams} from 'react-router-dom'
import {Dialog} from 'primereact/dialog'
import {all_routes} from '../router/AllRoutes'
import {DashboardComponent} from '../common/DashboardComponent'
import {apiService} from '../../services/apiService'
import ImageWithOutBasePath from '../../core/data/img/ImageWithOutBasePath'
import {
  formatDate,
  formatKeywordToText,
  formatTimeWithAmPmWithoutTZ,
  getFormattedCurrency,
  getImagePath,
} from '../../services/commonService'
import {HtmlRenderer} from '../common/HtmlRenderer'
import {PaginationComponent} from '../common/Pagination'

const UserBookings = () => {
  const routes = all_routes
  const {status} = useParams<{status: string}>()
  const [bookings, setBookingDetails] = useState<any | null>(null)
  const [location, setLocationsDetails] = useState<any | null>(null)
  const [bookingDetail, setBookingDetail] = useState<any | null>(null)
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [_error, setError] = useState<string | null>(null)
  const [bookingStatus, setBookingStatus] = useState<number>(1)
  const [bookingId, setBookingId] = useState<number | null>(null)
  const routerLocation = useLocation()
  const queryParams = new URLSearchParams(routerLocation.search)
  const page = parseInt(queryParams.get('page') ?? '1')
  const [isLoading, setIsLoading] = useState(false)
  const [isEditDialogVisible, setIsEditDialogVisible] = useState(false)

  useEffect(() => {
    // Fetch coach data when the component mounts
    setIsLoading(true)
    apiService
      .get(`/api/v1/bookings/type/${status}?page=${page}`, localStorage.getItem('authToken') ?? '')
      .then((response: any) => {
        if (!response || response.data === null) {
          setBookingDetails([]) // Redirect if coach not found
          setIsLoading(false)
        } else {
          setBookingDetails(response.data) // Set coach data
          setIsLoading(false)
        }
      })
      .catch(err => {
        setError(err.message)
        setIsLoading(false)
      })
  }, [status, bookingStatus, page])

  useEffect(() => {
    // Fetch coach data when the component mounts
    if (bookingId) {
      apiService
        .get('/api/v1/bookings/' + bookingId, localStorage.getItem('authToken') ?? '')
        .then((response: any) => {
          if (!response || response.data === null) {
            setBookingDetail(null)
          } else {
            setBookingDetail(response.data)
          }
        })
        .catch(err => setError(err.message))
    }
  }, [bookingId, bookingStatus])

  const updateLocationDetails = (location: any) => {
    setLocationsDetails(location)
  }

  const updateBookingDetail = (booking: any) => {
    //setBookingDetail(booking);
    setBookingId(booking.referance_code)
  }
  const handleCancelReservation = (id: number) => {
    const confirmed = window.confirm('Are you sure you want to cancel this reservation?')
    if (confirmed) {
      apiService
        .get(`/api/v1/bookings/reservation/${id}/cancel`, localStorage.getItem('authToken') ?? '')
        .then(() => {
          console.log('cancelled reservation')
          setBookingStatus(bookingStatus + 1)
          //setBookingDetail(response.data.booking);
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      // Action was cancelled
      console.log('Action cancelled')
    }
  }
  const handleCancelBooking = (id: number) => {
    const confirmed = window.confirm('Are you sure you want to cancel this booking?')
    if (confirmed) {
      apiService
        .get(`/api/v1/bookings/${id}/cancel`, localStorage.getItem('authToken') ?? '')
        .then(() => {
          console.log('cancelled booking')
          setBookingStatus(bookingStatus + 1)
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      // Action was cancelled
      console.log('Action cancelled')
    }
  }
  return (
    <>
      {/* Breadcrumb */}
      <section className="breadcrumb breadcrumb-list mb-0">
        <span className="primary-right-round" />
        <div className="container">
          <h1 className="text-white">My Bookings</h1>
          <ul>
            <li>
              <Link to={routes.home}>Home</Link>
            </li>
            <li>My Bookings</li>
          </ul>
        </div>
      </section>
      {/* /Breadcrumb */}
      {/* Dashboard Menu */}
      <DashboardComponent />
      <div className="content court-bg">
        <div className="container">
          {/* Sort By */}
          <div className="row">
            <div className="col-lg-12">
              <div className="sortby-section court-sortby-section">
                <div className="sorting-info">
                  <div className="row d-flex align-items-center">
                    <div className="col-xl-7 col-lg-7 col-sm-12 col-12">
                      <div className="coach-court-list">
                        <ul className="nav">
                          <li>
                            <Link
                              to={`${routes.userBookingsPrefix}/active`}
                              className={status == 'active' ? 'active' : ''}
                            >
                              Active
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={`${routes.userBookingsPrefix}/completed`}
                              className={status == 'completed' ? 'active' : ''}
                            >
                              Completed
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={`${routes.userBookingsPrefix}/cancelled`}
                              className={status == 'cancelled' ? 'active' : ''}
                            >
                              Cancelled
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Sort By */}
          <div className="row">
            <div className="col-sm-12">
              <div className="court-tab-content">
                <div className="card card-tableset">
                  <div className="card-body">
                    <div className="coache-head-blk">
                      <div className="row align-items-center">
                        <div className="col-md-5">
                          <div className="court-table-head">
                            <h4>My Bookings</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    {bookings && bookings?.data?.length === 0 && !isLoading && (
                      <div className="alert alert-primary text-left my-4">No bookings found.</div>
                    )}
                    {bookings && bookings?.data.length > 0 && (
                      <div className="tab-content">
                        <div
                          className="tab-pane fade show active"
                          id="nav-Recent"
                          role="tabpanel"
                          aria-labelledby="nav-Recent-tab"
                          tabIndex={0}
                        >
                          <div className="table-responsive table-datatble">
                            <table className="table  datatable">
                              <thead className="thead-light">
                                <tr>
                                  <th className="text-center">Reference</th>
                                  <th className="text-center">Location</th>
                                  <th className="text-center">Sub total</th>
                                  <th className="text-center">Add-ons</th>
                                  <th className="text-center">Discount</th>
                                  <th className="text-center">Total</th>
                                  <th className="text-center">Status</th>
                                  <th className="text-center">Details</th>
                                  <th />
                                </tr>
                              </thead>
                              <tbody>
                                {bookings &&
                                  bookings.data.map((booking: any) => (
                                    <tr key={booking.id}>
                                      <td>#{booking.referance_code}</td>
                                      <td>
                                        <h2 className="table-avatar">
                                          <Link to="#" className="avatar avatar-sm flex-shrink-0">
                                            <ImageWithOutBasePath
                                              className="avatar-img"
                                              src={getImagePath(booking.location.thumbnail)}
                                              alt="User"
                                            />
                                          </Link>
                                          <span className="table-head-name flex-grow-1">
                                            <Link
                                              to="#"
                                              onClick={() =>
                                                updateLocationDetails(booking.location)
                                              }
                                              data-bs-toggle="modal"
                                              data-bs-target="#location-modal"
                                            >
                                              {booking.location.name}
                                            </Link>
                                            <span className="book-active">
                                              {booking.location.address}
                                            </span>
                                          </span>
                                        </h2>
                                      </td>
                                      <td>
                                        <span className="pay-dark fs-16 float-end">
                                          {getFormattedCurrency(booking.sub_total)}
                                        </span>
                                      </td>
                                      <td>
                                        <span className="pay-dark fs-16 float-end">
                                          {getFormattedCurrency(booking.add_on_rate)}
                                        </span>
                                      </td>
                                      <td>
                                        <span className="pay-dark fs-16 float-end">
                                          {getFormattedCurrency(booking.discount)}
                                        </span>
                                      </td>
                                      <td>
                                        <span className="pay-dark fs-16 float-end">
                                          {getFormattedCurrency(booking.total)}
                                        </span>
                                      </td>
                                      <td>
                                        <span
                                          className={`badge badge-${booking.status == 'CANCELLED' ? 'danger' : booking.status == 'RESERVED' ? 'success' : 'info'}`}
                                        >
                                          {formatKeywordToText(booking.status)}
                                        </span>
                                      </td>
                                      <td className="text-pink view-detail-pink">
                                        <Link
                                          to="#"
                                          onClick={() => updateBookingDetail(booking)}
                                          data-bs-toggle="modal"
                                          data-bs-target="#booking-model"
                                        >
                                          <i className="feather-eye" />
                                          View Details
                                        </Link>
                                      </td>
                                      <td className="text-end">
                                        {booking.can_cancel ? (
                                          <div className="dropdown dropdown-action table-drop-action">
                                            <Link
                                              to="#"
                                              className="action-icon dropdown-toggle"
                                              data-bs-toggle="dropdown"
                                              aria-expanded="false"
                                            >
                                              <i className="fas fa-ellipsis-h" />
                                            </Link>
                                            <div className="dropdown-menu dropdown-menu-end">
                                              <Link
                                                className="dropdown-item"
                                                to="#"
                                                onClick={() => setIsEditDialogVisible(true)}
                                              >
                                                Edit
                                              </Link>
                                              <Link
                                                className="dropdown-item"
                                                to="#"
                                                onClick={() => handleCancelBooking(booking.id)}
                                              >
                                                Cancel
                                              </Link>
                                            </div>
                                            <Dialog
                                              header="Edit my booking"
                                              visible={isEditDialogVisible}
                                              style={{width: '50vw'}}
                                              breakpoints={{'960px': '75vw', '641px': '95vw'}}
                                              onHide={() => {
                                                if (!isEditDialogVisible) return
                                                setIsEditDialogVisible(false)
                                              }}
                                            >
                                              <p className="m-0">
                                                Please contact support for any booking amendments on{' '}
                                                <a href="tel:07368991211">07368991211</a>/
                                                <a href="tel:02035899165">02035899165</a> or email
                                                us at{' '}
                                                <Link to="mailto:info@hpcricket.co.uk">
                                                  info@hpcricket.co.uk
                                                </Link>
                                              </p>
                                            </Dialog>
                                          </div>
                                        ) : (
                                          ''
                                        )}
                                      </td>
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                            {bookings ? (
                              <PaginationComponent
                                previousPage={page == 1 ? 1 : page - 1}
                                nextPage={
                                  bookings.current_page == bookings.last_page
                                    ? bookings.current_page
                                    : bookings.current_page + 1
                                }
                                links={bookings.links}
                              />
                            ) : (
                              ''
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* upcoming Modal */}
      <div className="modal custom-modal fade request-modal" id="booking-model" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content">
            <div className="modal-header justify-content-between">
              <div className="form-header modal-header-title">
                <h4 className="mb-0">Booking Details</h4>
              </div>
              <Link to="#" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span className="align-center" aria-hidden="true">
                  <i className="feather-x" />
                </span>
              </Link>
            </div>
            <div className="modal-body">
              {/* Court Request */}
              {bookingDetail ? (
                <div className="row">
                  <div className="col-lg-12">
                    <span className="float-end">
                      <h4>#{bookingDetail.referance_code}</h4>
                    </span>
                    <div className="card dashboard-card court-information">
                      <div className="card-header">
                        <h4>Session Information</h4>
                      </div>
                      <div className="appointment-info appoin-border">
                        <table className="table table-responsive mb-4 bg-white">
                          <thead>
                            <td>
                              <h6>Location</h6>
                            </td>
                            <td>
                              <h6>Lane</h6>
                            </td>
                            <td>
                              <h6>Coach</h6>
                            </td>
                            <td>
                              <h6>Date</h6>
                            </td>
                            <td>
                              <h6>Duration</h6>
                            </td>
                            <td>
                              <h6>Add-ons</h6>
                            </td>
                            <td>
                              <h6>Charge</h6>
                            </td>
                            <td>
                              <h6>Status</h6>
                            </td>
                            <td>
                              <h6>Action</h6>
                            </td>
                          </thead>
                          <tbody>
                            {bookingDetail.reservations?.map((reservation: any) => (
                              <tr key={reservation.id}>
                                <td>{bookingDetail.location.name}</td>
                                <td>{reservation.lane.name}</td>
                                <td>{reservation.coach?.first_name ?? 'N/A'}</td>
                                <td>{formatDate(reservation.from)}</td>
                                <td>
                                  {formatTimeWithAmPmWithoutTZ(reservation.from)} -{' '}
                                  {formatTimeWithAmPmWithoutTZ(reservation.to)}
                                </td>
                                <td>
                                  <ul className="display-inline-block">
                                    {reservation.add_ons.map((addOn: any) => (
                                      <li className="list-style" key={addOn.id}>
                                        {addOn.addon.name}
                                      </li>
                                    ))}
                                  </ul>
                                </td>
                                <td>{getFormattedCurrency(reservation.total)}</td>
                                <td>
                                  <span
                                    className={`badge badge-${reservation.status == 'CANCELLED' ? 'danger' : reservation.status == 'RESERVED' ? 'success' : 'info'}`}
                                  >
                                    {formatKeywordToText(reservation.status)}
                                  </span>
                                </td>
                                <td>
                                  {reservation.status == 'RESERVED' && reservation.can_cancel ? (
                                    <div className="dropdown dropdown-action table-drop-action">
                                      <Link
                                        to="#"
                                        className="action-icon dropdown-toggle"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                      >
                                        <i className="fas fa-ellipsis-h" />
                                      </Link>
                                      <div className="dropdown-menu dropdown-menu-end">
                                        <Link
                                          className="dropdown-item"
                                          to="#"
                                          onClick={() => setIsEditDialogVisible(true)}
                                        >
                                          <i className="feather-edit" />
                                          Edit
                                        </Link>
                                        <Link
                                          className="dropdown-item"
                                          to="#"
                                          onClick={() => handleCancelReservation(reservation.id)}
                                        >
                                          <i className="feather-x" />
                                          Cancel
                                        </Link>
                                      </div>
                                      <Dialog
                                        header="Edit my booking"
                                        visible={isEditDialogVisible}
                                        style={{width: '50vw'}}
                                        breakpoints={{'960px': '75vw', '641px': '95vw'}}
                                        onHide={() => {
                                          if (!isEditDialogVisible) return
                                          setIsEditDialogVisible(false)
                                        }}
                                      >
                                        <p className="m-0">
                                          Please contact support for any booking amendments on{' '}
                                          <a href="tel:07368991211">07368991211</a>/
                                          <a href="tel:02035899165">02035899165</a> or email us at{' '}
                                          <Link to="mailto:info@hpcricket.co.uk">
                                            info@hpcricket.co.uk
                                          </Link>
                                        </p>
                                      </Dialog>
                                    </div>
                                  ) : (
                                    ''
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="card dashboard-card court-information">
                      <div className="card-header">
                        <h4>Payment Details</h4>
                      </div>
                      <div className="appointment-info appoin-border ">
                        <ul className="appointmentsetview">
                          <li>
                            <h6>Sub Total</h6>
                            <p className="color-green">
                              {getFormattedCurrency(bookingDetail.sub_total)}
                            </p>
                          </li>
                          <li>
                            <h6>Add-ons</h6>
                            <p className="color-green">
                              {getFormattedCurrency(bookingDetail.add_on_rate)}
                            </p>
                          </li>
                          <li>
                            <h6>Discount</h6>
                            <p className="color-green">
                              {getFormattedCurrency(bookingDetail.discount)}
                            </p>
                          </li>
                          <li>
                            <h6>Total</h6>
                            <p className="color-green">
                              {getFormattedCurrency(bookingDetail.total)}
                            </p>
                          </li>
                          <li>
                            <h6>Booked On</h6>
                            <p>{formatDate(bookingDetail.created_at)}</p>
                          </li>
                          <li>
                            <h6>Payment source</h6>
                            <p>{bookingDetail.payment_source}</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ''
              )}

              {/* /Court Request */}
            </div>
            <div className="modal-footer">
              <div className="table-accept-btn">
                <Link to="#" data-bs-dismiss="modal" className="btn cancel-table-btn">
                  Close
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /upcoming Modal */}

      <div className="modal custom-modal fade request-modal" id="location-modal" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <div className="form-header modal-header-title">
                <h4 className="mb-0">Location Details</h4>
              </div>
              <Link to="#" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span className="align-center" aria-hidden="true">
                  <i className="feather-x" />
                </span>
              </Link>
            </div>
            <div className="modal-body">
              {/* Court Request */}
              {location ? (
                <div className="row">
                  <div className="col-lg-12">
                    <div className="card dashboard-card court-information">
                      <div className="profile-set">
                        <div className="profile-set-image">
                          <ImageWithOutBasePath
                            src={getImagePath(location.thumbnail)}
                            alt="Venue"
                          />
                        </div>
                        <div className="profile-set-content">
                          <h3>{location.name}</h3>
                          <div className="rating-city">
                            <div className="profile-set-rating">
                              <span>{parseFloat(location.rating).toFixed(1)}</span>
                              <h6>{location.review_count} Reviews</h6>
                            </div>
                            <div className="profile-set-img">
                              <h6>{location.address}</h6>
                            </div>
                          </div>
                          <p>{location.description}</p>
                          <ul>
                            <li>
                              <span className="fas fa-phone"></span>
                              <h6> {location.phone_no ?? 'N/A'}</h6>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="profile-tab">
                      <div className="tab-content">
                        <div
                          className="tab-pane fade show active"
                          id="profile"
                          role="tabpanel"
                          aria-labelledby="profile-tab"
                        >
                          <div className="profile-card mb-0">
                            <div className="profile-card-title">
                              <h4>Short Bio</h4>
                            </div>
                            <div className="profile-card-content">
                              <HtmlRenderer htmlContent={location.content} />
                            </div>
                          </div>
                        </div>
                        <div>
                          {location.embed_url ? (
                            <div className="row">
                              <div className="col-12">
                                <div className="google-maps">
                                  <iframe
                                    src={location.embed_url}
                                    width="600"
                                    height="450"
                                    // @important change from allowFullScreen=""
                                    allowFullScreen
                                    loading="lazy"
                                  ></iframe>
                                </div>
                              </div>
                            </div>
                          ) : (
                            ''
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ''
              )}

              {/* /Court Request */}
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
    </>
  )
}

export default UserBookings
