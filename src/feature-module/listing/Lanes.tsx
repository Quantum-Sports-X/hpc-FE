import React, {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import {all_routes} from '../router/AllRoutes'
import {apiService} from '../../services/apiService'
import {getFormattedCurrency, getImagePath} from '../../services/commonService'
import ImageWithOutBasePath from '../../core/data/img/ImageWithOutBasePath'

const Lanes = () => {
  const {locationId} = useParams<{locationId: string}>()
  const [_selectedItems, setSelectedItems] = useState(Array(9).fill(false))
  const handleItemClick = (index: number) => {
    setSelectedItems(prevSelectedItems => {
      const updatedSelectedItems = [...prevSelectedItems]
      updatedSelectedItems[index] = !updatedSelectedItems[index]
      return updatedSelectedItems
    })
  }
  const routes = all_routes

  const [data, setData] = useState<any | null>(null)
  const [_error, setError] = useState<string | null>(null)
  useEffect(() => {
    setTimeout(() => {
      apiService
        .get(`/api/v1/location/${locationId}/lane`)
        .then(response => setData(response))
        .catch(err => setError(err.message))
    }, 1000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>
      {/* Breadcrumb */}
      <section className="breadcrumb breadcrumb-list mb-0">
        <span className="primary-right-round" />
        <div className="container">
          <h1 className="text-white">Lanes</h1>
          <ul>
            <li>
              <Link to={routes.home}>Home</Link>
            </li>
            <li>Lanes</li>
          </ul>
        </div>
      </section>
      {/* /Breadcrumb */}
      {/* Page Content */}
      <div className="content">
        <div className="container">
          {/* Listing Content */}
          <div className="row justify-content-center">
            {Array.isArray(data?.data) && data.data.length > 0
              ? data.data.map((lane: any) => (
                  <div key={lane.id} className="col-lg-4 col-md-6">
                    <div className="wrapper">
                      <div className="listing-item listing-item-grid">
                        <div className="listing-img">
                          <Link to={`${routes.bookingType}/lane/location/${locationId}/time&date`}>
                            <ImageWithOutBasePath
                              src={getImagePath(lane.thumbnail)}
                              alt={lane.name}
                            />
                          </Link>
                          <div
                            className="fav-item-venues"
                            key={lane.id}
                            onClick={() => handleItemClick(lane.id)}
                          >
                            <span className="tag tag-blue">Verified</span>
                            <div className="d-flex align-items-center">
                              <span className="rating-bg">
                                {parseFloat(lane.rating).toFixed(1)}
                              </span>
                              <span>{lane.review_count} Reviews</span>
                            </div>
                          </div>
                          <div className="hour-list">
                            <h5 className="tag tag-primary">
                              {getFormattedCurrency(lane.rate)}
                              <span>/hr</span>
                            </h5>
                          </div>
                        </div>
                        <div className="listing-content">
                          <h3 className="listing-title">
                            <Link
                              to={`${routes.bookingType}/lane/location/${locationId}/time&date`}
                            >
                              {lane.name}
                            </Link>
                          </h3>
                          <div className="listing-details-group">
                            <p className="description-style">{lane.description}</p>
                          </div>
                          <div className="listing-button justify-content-center">
                            <Link
                              to={`${routes.bookingType}/lane/location/${locationId}/time&date`}
                              className="btn btn-secondary"
                            >
                              <span>
                                <i className="feather-calendar me-2" />
                              </span>
                              Book Now
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : 'No lanes found for this location'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Lanes
