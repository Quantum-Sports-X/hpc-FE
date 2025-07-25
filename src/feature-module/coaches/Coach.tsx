import React, {useState} from 'react'
import ImageWithBasePath from '../../core/data/img/ImageWithBasePath'
import {Grid, List, Tooltip} from 'antd'
import {useParams, Link, useNavigate, useLocation} from 'react-router-dom'
import {all_routes} from '../router/AllRoutes'
import '../../style/scss/pages/venue-details.scss'
import 'yet-another-react-lightbox/styles.css'
import {useEffect} from 'react'
import {apiService} from '../../services/apiService'
import ImageWithOutBasePath from '../../core/data/img/ImageWithOutBasePath'
import {
  constructCoachesPath,
  constructCoachPath,
  getFormattedCurrency,
  getImagePath,
  renderStars,
} from '../../services/commonService'
import {format} from 'date-fns'
import {Skeleton} from 'antd'
import {getCoachByType} from '../../services/requestService'
import {HtmlRenderer} from '../common/HtmlRenderer'
import {Gallery as GridGallery} from 'react-grid-gallery'
import Lightbox from 'yet-another-react-lightbox'

const {useBreakpoint} = Grid

const fetchImageDimensions = (src: string) => {
  return new Promise(resolve => {
    const img = new Image()
    img.src = src
    img.onload = () => resolve({width: img.width, height: img.height})
  })
}

const CoachDetail = () => {
  // _open not been used
  const [_open, _setOpen] = React.useState(false)
  const screens = useBreakpoint()
  const routes = all_routes
  const [coach, setData] = useState<any | null>(null)
  const [ratedCoaches, setRatedCoaches] = useState<any | null>(null)
  const [_topCoaches, setTopCoaches] = useState<any | null>(null)
  // __error not been used
  const [_error, setError] = useState<string | null>(null)
  const {locationId, id} = useParams<{locationId: string; id: string; name: string}>()
  const navigate = useNavigate() // Hook to redirect
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [reviewMessage, setReviewMessage] = useState<string | null>(null)
  const [reviews, setReviews] = useState<any | null>(null)
  const [isCoachLoading, setIsCoachLoading] = useState(false)
  const [galleryWithDimensions, setGalleryWithDimensions] = useState<any | null>(null)
  const [key, setKey] = useState(-1)
  const [activeTab, setActiveTab] = useState<string>('short-bio')
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  const location = useLocation()

  const handleClick = (index: number) => setKey(index)

  useEffect(() => {
    // Fetch coach data when the component mounts
    setIsCoachLoading(true)
    apiService
      .get('/api/v1/coaches/' + id)
      .then((response: any) => {
        if (!response || response.data === null) {
          setIsCoachLoading(false)
          navigate('/error-404') // Redirect if coach not found
        } else {
          setIsCoachLoading(false)
          setData(response.data) // Set coach data
        }
      })
      .catch(err => {
        setIsCoachLoading(false)
        setError(err.message)
      })
  }, [id, navigate])

  const queryParams = new URLSearchParams(location.search)
  const page = parseInt(queryParams.get('page') ?? '1')
  useEffect(() => {
    // Fetch coach data when the component mounts
    apiService
      .get(`/api/v1/coaches/${id}/reviews?page=${page}`)
      .then((response: any) => {
        if (!response || response.data === null) {
          setReviews([])
        } else {
          setReviews(response.data) // Set coach data
        }
      })
      .catch(err => setError(err.message))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, showAlert])

  // Separate useEffect for fetching rated coaches once coach data is available
  useEffect(() => {
    if (coach && coach.location_id && coach.id) {
      // Call the second API only if coach data is available
      getCoachByType('RATING', 5, coach.location_id, coach.id)
        .then((ratedCoaches: any) => {
          if (ratedCoaches) {
            setRatedCoaches(ratedCoaches) // Set rated coaches
          } else {
            console.log('No rated coaches found.')
          }
        })
        .catch(err => {
          console.error('Error fetching rated coaches:', err)
        })
    }
  }, [coach]) // Run this effect when `coach` data is updated

  useEffect(() => {
    if (coach && coach.location_id && coach.id) {
      // Call the second API only if coach data is available
      getCoachByType('SESSIONS', 5, coach.location_id, coach.id)
        .then((topCoaches: any) => {
          if (topCoaches) {
            setTopCoaches(topCoaches) // Set rated coaches
          } else {
            console.log('No rated coaches found.')
          }
        })
        .catch(err => {
          console.error('Error fetching rated coaches:', err)
        })
    }
  }, [coach]) // Run this effect when `coach` data is updated

  useEffect(() => {
    {
      console.log({coach: coach?.gallery})
    }
    if (coach && coach?.gallery && coach?.gallery?.length > 0) {
      const fetchData = async () => {
        const imagesWithDimensions = await Promise.all(
          coach?.gallery?.map(async (image: any) => {
            // @ts-ignore
            const {width, height} = await fetchImageDimensions(getImagePath(image.path))
            return {
              src: getImagePath(image.path),
              width,
              height,
            }
          })
        )
        setGalleryWithDimensions(imagesWithDimensions)
      }

      fetchData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coach?.gallery])

  const goBack = (e: any) => {
    e.preventDefault()
    localStorage.setItem('goBackPath', location.pathname)
    navigate('/auth/login')
  }

  const scrollContent = (id: string) => {
    const element = document.getElementById(id)
    if (!element) return

    const yOffset = 80 // ← how many pixels you want it pushed down
    const y = element.getBoundingClientRect().top + window.pageYOffset - yOffset

    window.scrollTo({top: y, behavior: 'smooth'})
    setActiveTab(id)
  }

  const [formData, setFormData] = useState({
    review: '',
    rating: 0,
    type_id: 0,
    type: 'COACH',
  })

  const handleChange = (e: any) => {
    const {name, value} = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const submitReview = (e: any) => {
    e.preventDefault() // Prevents page reload
    const data = {...formData, type_id: coach.id}
    apiService
      .post('/api/v1/review', data, localStorage.getItem('authToken') ?? '')
      .then((response: any) => {
        setShowAlert(true)
        if (!response || response.code !== 200) {
          setReviewMessage(response?.message ? response.message : 'Something went wrong')
          setIsSuccess(false)
        } else {
          setReviewMessage(response.message)
          setIsSuccess(true)
        }
      })
      .catch(err => {
        setError(err.message)
        setShowAlert(true)
        setReviewMessage(err.message)
        setIsSuccess(false)
      })
    console.log('Review submitted:', data)
  }

  return (
    <div className="venue-coach-details coach-detail">
      {/* Banner */}
      <div className="banner">
        <ImageWithBasePath src="assets/img/bg/breadcrumb_bg.png" alt="Banner" />
      </div>
      {isCoachLoading && (
        <div className="content">
          <div className="container mt-4">
            <Skeleton avatar paragraph={{rows: 4}} />
          </div>
        </div>
      )}
      {/* Page Content */}
      {coach && (
        <>
          <div className="content">
            <div className="container">
              {/* Row */}
              <div className="row move-top">
                {/* Breadcrumb */}
                <section className="container">
                  <span className="primary-right-round" />
                  <div className="coach-steps py-10 d-none d-md-block">
                    {coach.first_name && (
                      <ul className="d-xl-flex justify-content-start align-items-start text-white">
                        <li>
                          <Link className="text-white" to={routes.home}>
                            Home
                          </Link>
                        </li>
                        <li>
                          <Link className="text-white" to={constructCoachesPath('london-chigwell')}>
                            Coaches
                          </Link>
                        </li>
                        <li>
                          {coach.first_name} {coach.last_name}
                        </li>
                      </ul>
                    )}
                  </div>
                </section>
                <div className="col-12 col-sm-12 col-md-12 col-lg-8">
                  <div className="dull-bg corner-radius-10 coach-info d-md-flex justify-content-start align-items-start">
                    <div className="profile-pic">
                      <Link to="#;">
                        <ImageWithOutBasePath
                          alt="User"
                          className="corner-radius-10 coach-detail-profile"
                          src={getImagePath(coach.avatar)}
                        />
                      </Link>
                    </div>
                    <div className="info w-100">
                      <div className="d-sm-flex justify-content-between align-items-start">
                        <h3 className="d-flex align-items-center justify-content-start mb-0">
                          {coach.first_name} {coach.last_name}
                          {coach.verified ? (
                            <Tooltip
                              placement="right"
                              title="This coach is verified by HPC as part of our Coaching standard guidelines. They are committed to delivering exceptional coaching and great value."
                            >
                              <span className="d-flex justify-content-center align-items-center">
                                <i className="fas fa-check-double" />
                              </span>
                            </Tooltip>
                          ) : (
                            ''
                          )}
                        </h3>
                        {/* <Link to="#">
                        <span className="favourite fav-icon">
                          <i className="feather-star" />
                          Favourite
                        </span>
                      </Link> */}
                      </div>
                      <p>{coach.description}</p>
                      <ul className="d-sm-flex align-items-center">
                        <li className="d-flex align-items-center pr-20">
                          <div className="white-bg d-flex align-items-center review">
                            <span className="white-bg dark-yellow-bg d-flex align-items-center">
                              {parseFloat(coach.rating).toFixed(1)}
                            </span>
                            <span>
                              {coach?.review_count}{' '}
                              {coach?.review_count === 1 ? 'Review' : 'Reviews'}
                            </span>
                          </div>
                        </li>
                        <li>
                          <i className="fas fa-map-pin" /> {coach.address}
                        </li>
                      </ul>
                      <hr />
                      <ul className="d-xl-flex">
                        <li className="d-flex align-items-center">
                          <ImageWithBasePath src="assets/img/icons/sessions.svg" alt="Icon" />
                          Sessions Completed : {coach.sessions}
                        </li>
                        <li className="d-flex align-items-center">
                          <ImageWithBasePath src="assets/img/icons/since.svg" alt="Icon" />
                          Joined Since {format(coach.created_at, 'MMM d, yyyy')}
                        </li>
                        <li className="d-flex align-items-center">
                          <ImageWithBasePath
                            src="assets/img/icons/badge.png"
                            className="coach-top-icon"
                            alt="Icon"
                          />
                          ECB Level: {coach.coach_level ?? 'N/A'}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="venue-options white-bg mb-4">
                    <ul className="clearfix">
                      {coach.content ? (
                        <li className={`${activeTab === 'short-bio' ? 'active' : ''}`}>
                          <Link to="#" onClick={() => scrollContent('short-bio')}>
                            Short Bio
                          </Link>
                        </li>
                      ) : (
                        ''
                      )}
                      {coach.gallery.length > 0 ? (
                        <li className={`${activeTab === 'gallery' ? 'active' : ''}`}>
                          <Link to="#" onClick={() => scrollContent('gallery')}>
                            Gallery
                          </Link>
                        </li>
                      ) : (
                        ''
                      )}
                      <li className={`${activeTab === 'reviews' ? 'active' : ''}`}>
                        <Link to="#" onClick={() => scrollContent('reviews')}>
                          Reviews
                        </Link>
                      </li>
                    </ul>
                  </div>
                  {/* Accordian Contents */}
                  <div className="accordion" id="accordionPanel">
                    {coach.content ? (
                      <div className="accordion-item mb-4" id="short-bio">
                        <h4 className="accordion-header" id="panelsStayOpen-short-bio">
                          <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-collapseOne"
                            aria-expanded="true"
                            aria-controls="panelsStayOpen-collapseOne"
                          >
                            Short Bio
                          </button>
                        </h4>
                        <div
                          id="panelsStayOpen-collapseOne"
                          className="accordion-collapse collapse show"
                          aria-labelledby="panelsStayOpen-short-bio"
                        >
                          <div className="accordion-body">
                            <div className="text">
                              <HtmlRenderer htmlContent={coach.content} />
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ''
                    )}
                    {coach.gallery.length > 0 ? (
                      <div className="accordion-item mb-4" id="gallery">
                        <h4 className="accordion-header" id="panelsStayOpen-gallery">
                          <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-collapseFive"
                            aria-expanded="false"
                            aria-controls="panelsStayOpen-collapseFive"
                          >
                            Gallery
                          </button>
                        </h4>
                        <div
                          id="panelsStayOpen-collapseFive"
                          className="accordion-collapse collapse show"
                          aria-labelledby="panelsStayOpen-gallery"
                        >
                          <div className="accordion-body">
                            <div className="gallery-page innerpagebg">
                              {/* Page Content */}
                              <div className="content hexagon-background-gallery">
                                <div className="container">
                                  <div className="row mb-3">
                                    {galleryWithDimensions && galleryWithDimensions?.length > 0 && (
                                      <div className="w-100">
                                        <GridGallery
                                          rowHeight={screens.md ? 300 : 500} // Larger on bigger screens
                                          margin={screens.md ? 15 : 5}
                                          images={galleryWithDimensions}
                                          onClick={handleClick}
                                        />
                                        <Lightbox
                                          slides={galleryWithDimensions}
                                          open={key >= 0}
                                          index={key}
                                          close={() => setKey(-1)}
                                        />
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              {/* /Page Content */}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ''
                    )}

                    <div className="accordion-item mb-4" id="reviews">
                      <div className="accordion-header" id="panelsStayOpen-reviews">
                        <div
                          className="accordion-button d-flex justify-content-between align-items-center"
                          data-bs-toggle="collapse"
                          data-bs-target="#panelsStayOpen-collapseSix"
                          aria-controls="panelsStayOpen-collapseSix"
                        >
                          <span className="w-75 mb-0">Reviews</span>
                        </div>
                        <Link
                          to="#;"
                          className="btn btn-gradient pull-right write-review add-review"
                          data-bs-toggle="modal"
                          data-bs-target="#add-review"
                        >
                          Write a review
                        </Link>
                      </div>
                      <div
                        id="panelsStayOpen-collapseSix"
                        className="accordion-collapse collapse show"
                        aria-labelledby="panelsStayOpen-reviews"
                      >
                        <div className="accordion-body">
                          {reviews && reviews.data.length > 0 && (
                            <List
                              itemLayout="horizontal"
                              dataSource={reviews?.data}
                              pagination={{
                                onChange: page => {
                                  console.log(page)
                                },
                                pageSize: 3,
                                hideOnSinglePage: true,
                              }}
                              renderItem={(review: any) => {
                                return (
                                  <List.Item>
                                    <div key={review?.id} className="review-box d-md-flex w-100">
                                      <div className="review-profile">
                                        <ImageWithOutBasePath
                                          src={getImagePath(review?.reviewer?.avatar)}
                                          className="img-fluid"
                                          alt={review?.name}
                                        />
                                      </div>
                                      <div className="review-info">
                                        <h6 className="mb-2 tittle">{review.name}</h6>
                                        <div className="rating">
                                          <HtmlRenderer
                                            htmlContent={renderStars(parseFloat(review.rating))}
                                          />
                                          <small className="text-muted">
                                            ({parseFloat(review.rating).toFixed(1)})
                                          </small>
                                        </div>

                                        <p>{review.review}</p>

                                        <span className="post-date">
                                          {format(review.created_at, 'MMM d, yyyy')}
                                        </span>
                                      </div>
                                    </div>
                                  </List.Item>
                                )
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Accordian Contents */}
                </div>
                <aside className="col-12 col-sm-12 col-md-12 col-lg-4 theiaStickySidebar">
                  <div className="stickybar">
                    <div className="white-bg book-coach">
                      <h4 className="border-bottom">{`Book coach ${coach?.first_name}`}</h4>
                      <div className="dull-bg text-center">
                        <p className="mb-1">Start’s From</p>
                        <h4 className="d-inline-block primary-text mb-0">
                          {getFormattedCurrency(coach.coach_fee)}
                        </h4>
                        <span>/hr</span>
                      </div>
                      <div className="d-grid btn-block mt-3">
                        <Link
                          to={`${routes.bookingType}/coach/location/${locationId}/time&date?coaches_id=${coach?.id}&coaches_name=${coach?.first_name}`}
                          className="btn btn-secondary d-inline-flex justify-content-center align-items-center"
                        >
                          <i className="feather-calendar" />
                          Book Now
                        </Link>
                      </div>
                    </div>
                    {ratedCoaches && ratedCoaches.length > 0 ? (
                      <div className="white-bg listing-owner">
                        <h4 className="border-bottom">Top Rated Coaches</h4>
                        <ul>
                          {Array.isArray(ratedCoaches) && ratedCoaches.length > 0
                            ? ratedCoaches.map((ratedCoach: any) => (
                                <li
                                  key={ratedCoach.id}
                                  className="d-flex justify-content-start align-items-center"
                                >
                                  <div>
                                    <Link to={constructCoachPath(ratedCoach)}>
                                      <ImageWithOutBasePath
                                        className="img-fluid"
                                        alt="Post"
                                        src={ratedCoach.full_avatar}
                                      />
                                    </Link>
                                  </div>
                                  <div className="owner-info">
                                    <h5>
                                      <Link to={constructCoachPath(ratedCoach)}>
                                        {ratedCoach.first_name} {ratedCoach.last_name}
                                      </Link>
                                    </h5>
                                    <p>
                                      <span>ECB Level: {ratedCoach.coach_level ?? 'N/A'}</span>
                                    </p>
                                  </div>
                                </li>
                              ))
                            : ''}
                        </ul>
                      </div>
                    ) : (
                      ''
                    )}

                    {/*{topCoaches && topCoaches.length > 0 ? (*/}
                    {/*  <div className="white-bg listing-owner">*/}
                    {/*    <h4 className="border-bottom">Popular Coaches</h4>*/}
                    {/*    <ul>*/}
                    {/*      {Array.isArray(topCoaches) && topCoaches.length > 0*/}
                    {/*        ? topCoaches.map((ratedCoach: any) => (*/}
                    {/*            <li*/}
                    {/*              key={ratedCoach.id}*/}
                    {/*              className="d-flex justify-content-start align-items-center"*/}
                    {/*            >*/}
                    {/*              <div>*/}
                    {/*                <Link to={constructCoachPath(ratedCoach)}>*/}
                    {/*                  <ImageWithOutBasePath*/}
                    {/*                    className="img-fluid"*/}
                    {/*                    alt="Post"*/}
                    {/*                    src={ratedCoach.full_avatar}*/}
                    {/*                  />*/}
                    {/*                </Link>*/}
                    {/*              </div>*/}
                    {/*              <div className="owner-info">*/}
                    {/*                <h5>*/}
                    {/*                  <Link to={constructCoachPath(ratedCoach)}>*/}
                    {/*                    {ratedCoach.first_name} {ratedCoach.last_name}*/}
                    {/*                  </Link>*/}
                    {/*                </h5>*/}
                    {/*                <p>*/}
                    {/*                  <i className="feather-map-pin" />*/}
                    {/*                  <span>{ratedCoach.address}</span>*/}
                    {/*                </p>*/}
                    {/*              </div>*/}
                    {/*            </li>*/}
                    {/*          ))*/}
                    {/*        : ''}*/}
                    {/*    </ul>*/}
                    {/*  </div>*/}
                    {/*) : (*/}
                    {/*  ''*/}
                    {/*)}*/}
                  </div>
                </aside>
              </div>
              {/* /Row */}
            </div>
            {/* /container */}
          </div>
          {/* /Page Content */}
          {/* Add Review Modal */}
          <div className="modal custom-modal fade payment-modal" id="add-review" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-md">
              <div className="modal-content">
                <div className="modal-header d-flex justify-content-between align-items-center">
                  <div className="form-header modal-header-title">
                    <h4 className="mb-0">Write a Review</h4>
                  </div>
                  <Link to="#" className="close" data-bs-dismiss="modal" aria-label="Close">
                    <span className="align-self-end" aria-hidden="true">
                      <i className="fa-2x feather-x-square" />
                    </span>
                  </Link>
                </div>
                <form onSubmit={submitReview}>
                  <input type="hidden" name="type_id" value={coach.id} />
                  <div className="modal-body">
                    {!user?.customer_id && (
                      <div className="alert alert-info d-flex align-items-center">
                        <i className="fa-regular fa-user me-2" />
                        <p className="mb-0">
                          Please{' '}
                          <Link
                            className="text-primary"
                            data-bs-dismiss="modal"
                            to="#"
                            onClick={goBack}
                          >
                            Sign-in
                          </Link>{' '}
                          to review this coach.
                        </p>
                      </div>
                    )}
                    {showAlert ? (
                      <div
                        className={`alert alert-${isSuccess ? 'success' : 'danger'}`}
                        role="alert"
                      >
                        {reviewMessage}
                      </div>
                    ) : (
                      ''
                    )}
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="input-space">
                          <label className="form-label">
                            Your Review <span>*</span>
                          </label>
                          <textarea
                            className="form-control"
                            id="review"
                            name="review"
                            rows={3}
                            placeholder="Enter Your Review"
                            defaultValue={''}
                            onChange={handleChange}
                          />
                          <small className="text-muted">
                            <span id="chars">100</span> characters remaining
                          </small>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="input-space review">
                          <label className="form-label">
                            Rating <span>*</span>
                          </label>
                          <div className="star-rating">
                            <input
                              id="star-5"
                              type="radio"
                              name="rating"
                              defaultValue="5"
                              onChange={handleChange}
                            />
                            <label htmlFor="star-5" title="5 stars">
                              <i className="active fa fa-star" />
                            </label>
                            <input
                              id="star-4"
                              type="radio"
                              name="rating"
                              defaultValue="4"
                              onChange={handleChange}
                            />
                            <label htmlFor="star-4" title="4 stars">
                              <i className="active fa fa-star" />
                            </label>
                            <input
                              id="star-3"
                              type="radio"
                              name="rating"
                              defaultValue="3"
                              onChange={handleChange}
                            />
                            <label htmlFor="star-3" title="3 stars">
                              <i className="active fa fa-star" />
                            </label>
                            <input
                              id="star-2"
                              type="radio"
                              name="rating"
                              defaultValue="2"
                              onChange={handleChange}
                            />
                            <label htmlFor="star-2" title="2 stars">
                              <i className="active fa fa-star" />
                            </label>
                            <input
                              id="star-1"
                              type="radio"
                              name="rating"
                              defaultValue="1"
                              onChange={handleChange}
                            />
                            <label htmlFor="star-1" title="1 star">
                              <i className="active fa fa-star" />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <div className="table-accept-btn">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={!user?.customer_id}
                      >
                        Add Review
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
      {/* /Add Review Modal */}
    </div>
  )
}

export default CoachDetail
