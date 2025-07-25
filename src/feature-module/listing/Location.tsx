import React, {useEffect, useState} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {all_routes} from '../router/AllRoutes'
import {getLocation} from '../../services/requestService'
import {HtmlRenderer} from '../common/HtmlRenderer'
import ImageWithOutBasePath from '../../core/data/img/ImageWithOutBasePath'
import {getImagePath} from '../../services/commonService'
import {ServicesComponent} from '../common/ServicesComponent'

const Location = () => {
  const route = all_routes

  const [location, setLocation] = useState<any | null>(null)
  const {locationId} = useParams<{locationId: string}>()
  const navigate = useNavigate() // Hook to redirect
  useEffect(() => {
    // Fetch coach data when the component mounts
    if (locationId) {
      getLocation(locationId)
        .then((location: any) => {
          setLocation(location) // Set rated coaches
        })
        .catch(err => {
          console.error('Error fetching location:', err)
        })
    }
  }, [locationId, navigate])
  return (
    <>
      {location ? (
        <div className="main-wrapper services-detail-page">
          {/* Breadcrumb */}
          <div className="breadcrumb breadcrumb-list mb-0">
            <span className="primary-right-round" />
            <div className="container">
              <h1 className="text-white">{location.name}</h1>
              <ul>
                <li>
                  <Link to={route.home}>Home</Link>
                </li>
                <li>
                  <Link to={route.locations}>Locations</Link>
                </li>
                <li>{location.name}</li>
              </ul>
            </div>
          </div>
          {/* /Breadcrumb */}
          {/* Page Content */}

          <div className="content">
            <div className="container">
              <div className="service-detail">
                <div className="banner align-center pb-4">
                  <ImageWithOutBasePath
                    src={getImagePath(location.thumbnail)}
                    className="img-fluid"
                    alt="Service"
                  />
                </div>
                <HtmlRenderer htmlContent={location.content} />
              </div>
              <ServicesComponent />
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
          {/* /Page Content */}
        </div>
      ) : (
        ''
      )}
    </>
  )
}

export default Location
