import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {all_routes} from '../router/AllRoutes'
import {getLocations} from '../../services/requestService'
import ImageWithOutBasePath from '../../core/data/img/ImageWithOutBasePath'
import {constructLocationPath, getImagePath} from '../../services/commonService'

const Locations = () => {
  const routes = all_routes

  const [locations, setLocations] = useState<any | null>(null)
  useEffect(() => {
    getLocations()
      .then((locations: any) => {
        setLocations(locations) // Set coach data
      })
      .catch(err => {
        console.error('Error fetching locations:', err)
      })
  }, []) // Run this effect when `coach` data is updated
  return (
    <div>
      {/* Breadcrumb */}
      <section className="breadcrumb breadcrumb-list mb-0">
        <span className="primary-right-round" />
        <div className="container">
          <h1 className="text-white">Locations</h1>
          <ul>
            <li>
              <Link to={routes.home}>Home</Link>
            </li>
            <li>Locations</li>
          </ul>
        </div>
      </section>
      {/* /Breadcrumb */}
      {/* Page Content */}
      <div className="content">
        <div className="container">
          {/* Listing Content */}
          <div className="row justify-content-center">
            {locations &&
              locations.map((location: any) => (
                <div key={location.id} className="col-lg-4 col-md-6">
                  <div className="wrapper">
                    <div className="listing-item listing-item-grid">
                      <div className="listing-img">
                        <Link to={constructLocationPath(location)}>
                          <ImageWithOutBasePath
                            src={getImagePath(location.thumbnail)}
                            alt={location.slug}
                          />
                        </Link>
                      </div>
                      <div className="listing-content">
                        <div className="list-reviews">
                          {location.review_count ? (
                            <div className="d-flex align-items-center">
                              <span className="rating-bg">
                                {parseFloat(location.rating).toFixed(1)}
                              </span>
                              <span>{location.review_count} Reviews</span>
                            </div>
                          ) : (
                            ''
                          )}
                        </div>
                        <h3 className="listing-title">
                          <Link to={constructLocationPath(location)}>{location.name}</Link>
                        </h3>
                        <div className="listing-details-group">
                          <p className="description-style">{location.description}</p>
                          <ul className="description-style">
                            {location.address ? (
                              <li>
                                <span>
                                  <i className="feather-map-pin" />
                                  {location.address}
                                </span>
                              </li>
                            ) : (
                              ''
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Locations
