import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {getLocations} from '../../services/requestService'
import ImageWithOutBasePath from '../../core/data/img/ImageWithOutBasePath'
import {constructLanePath, getImagePath} from '../../services/commonService'

export const LaneLocationsComponent = () => {
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
    <div className="row justify-content-center">
      <h2>Our Locations</h2>
      {locations &&
        locations.map((location: any) => (
          <div key={location.id} className="col-lg-4 col-md-6">
            <div className="wrapper">
              <div className="listing-item listing-item-grid">
                <div className="listing-img">
                  <Link to={constructLanePath(location.slug)}>
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
                        <span className="rating-bg">{parseFloat(location.rating).toFixed(1)}</span>
                        <span>{location.review_count} Reviews</span>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                  <h3 className="listing-title">
                    <Link to={constructLanePath(location.slug)}>{location.name}</Link>
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
  )
}
