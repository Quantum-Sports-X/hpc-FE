import React, {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import {Skeleton, Tooltip} from 'antd'

import {all_routes} from '../router/AllRoutes'
import {apiService} from '../../services/apiService'
import {constructCoachPath, getImagePath} from '../../services/commonService'
import ImageWithOutBasePath from '../../core/data/img/ImageWithOutBasePath'

interface Coach {
  id: number
  avatar: string
  verified: boolean
  rating: string
  review_count: number
  coach_fee: number
  first_name: string
  last_name: string
  description: string
  location?: {
    name: string
  }
  coach_level: number
}

const CoachesGrid = () => {
  const {locationId} = useParams<{locationId: string}>()
  const [coaches, setCoaches] = useState<Coach[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [_error, setError] = useState<string | null>(null)
  const routes = all_routes

  useEffect(() => {
    setIsLoading(true)
    apiService
      .get(`/api/v1/coaches?location=${locationId}`)
      .then((response: any) => {
        setCoaches(response?.data || [])
        setIsLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setIsLoading(false)
      })
  }, [locationId])

  const renderCoachCard = (coach: Coach) => (
    <div key={coach.id} className="col-lg-4 col-md-6">
      <div className="featured-venues-item">
        <div className="listing-item listing-item-grid">
          <div className="listing-img">
            <Link to={constructCoachPath(coach)}>
              <ImageWithOutBasePath src={getImagePath(coach.avatar)} alt="Venue" />
            </Link>
            <div className="fav-item-venues">
              {coach.verified ? (
                <Tooltip
                  placement="right"
                  title="This coach is verified by HPC as part of our Coaching standard guidelines. They are committed to delivering exceptional coaching and great value."
                >
                  <span className="d-flex justify-content-center align-items-center coach-verify">
                    <i className="fas fa-check-double" />
                  </span>
                </Tooltip>
              ) : null}
              <div className="d-flex align-items-center">
                <span className="rating-bg">{parseFloat(coach.rating).toFixed(1)}</span>
                <span className="badge bg-dark text-white">
                  {coach?.review_count} {coach?.review_count === 1 ? 'Review' : 'Reviews'}
                </span>
              </div>
            </div>
            <div className="hour-list">
              <h5 className="tag tag-primary">
                From ${coach.coach_fee} <span>/hr</span>
              </h5>
            </div>
          </div>
          <div className="listing-content">
            <div className="grid-item-content">
              <h3 className="listing-title">
                <Link to={constructCoachPath(coach)}>
                  {coach.first_name} {coach.last_name}
                </Link>
              </h3>
              {coach?.coach_level && (
                <ul className="mb-2">
                  <li>
                    <span>
                      <i className="feather-award me-2" />
                      ECB Level: {coach?.coach_level}
                    </span>
                  </li>
                </ul>
              )}
              <div className="listing-details-group">
                <p>{coach.description}</p>
              </div>
            </div>
            <div className="coach-btn">
              <ul>
                <li>
                  <Link to={constructCoachPath(coach)} className="btn btn-primary w-100">
                    <i className="feather-eye me-2" /> View Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to={`${routes.bookingType}/coach/location/${locationId}/time&date?coaches_id=${coach?.id}&coaches_name=${coach?.first_name}`}
                    className="btn btn-secondary w-100"
                  >
                    <i className="feather-calendar me-2" /> Book Now
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div>
      {/* Breadcrumb */}
      <section className="breadcrumb breadcrumb-list mb-0">
        <span className="primary-right-round" />
        <div className="container">
          <h1 className="text-white">Coaches</h1>
          <ul>
            <li>
              <Link to={routes.home}>Home</Link>
            </li>
            <li>Coaches</li>
          </ul>
        </div>
      </section>

      {/* Page Content */}
      <div className="content">
        <div className="container">
          <div className="row justify-content-center">
            {isLoading && (
              <div className="container mt-4">
                <Skeleton avatar paragraph={{rows: 4}} />
              </div>
            )}
            {!isLoading && coaches.length > 0
              ? coaches.map(renderCoachCard)
              : !isLoading && 'No coaches found for this location.'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoachesGrid
