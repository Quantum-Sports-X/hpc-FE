import React, {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import {all_routes} from '../router/AllRoutes'
import {getLocations} from '../../services/requestService'
import {BookingFlowBreadCrumb} from '../common/BookingFlowBreadcrumb'

const Locations = () => {
  const [activeTabIndex, setActiveTabIndex] = useState<string>('#')
  const [path, setPath] = useState<string | null>(null)
  const routes = all_routes
  const {bookingType} = useParams<{bookingType: string}>()

  const activateTab = (index: string) => {
    setActiveTabIndex(index)
    setPath(`${routes.bookingType}/${bookingType}/location/${index}/time&date`)
  }

  const isTabActive = (index: string) => {
    return activeTabIndex === index
  }

  const [locations, setLocations] = useState<any>(null)
  useEffect(() => {
    getLocations()
      .then(location => {
        setLocations(location) // Set coach data
        setPath(`${routes.bookingType}/${bookingType}/location/${location[0]?.slug}/time&date`)
        setActiveTabIndex(location[0]?.slug ?? null)
      })
      .catch(err => {
        console.error('Error fetching locations:', err)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div className="breadcrumb mb-0">
        <span className="primary-right-round" />
        <div className="container">
          <h1 className="text-white">Locations</h1>
          <ul>
            <li>
              <Link to={routes.home}>Home</Link>
            </li>
            <li>
              <Link to={routes.coachDetail}>Booking type</Link>
            </li>
            <li>Locations</li>
          </ul>
        </div>
      </div>
      {/* /Breadcrumb */}
      <BookingFlowBreadCrumb />
      {/* Page Content */}
      <div className="content book-cage">
        <div className="container">
          <section className="text-center coach-types">
            <div className="border-block">
              <div className="text-center mb-40">
                <h3 className="mb-1">Select location</h3>
              </div>
              <p>Please Select the Options below </p>
              <ul className="d-flex justify-content-center align-items-center">
                {locations &&
                  locations.map((location: any) => (
                    <li
                      key={location.id}
                      className={`d-flex justify-content-between align-items-center m-1 ${isTabActive(location.slug) ? 'active' : ''}`}
                      onClick={() => activateTab(location.slug)}
                    >
                      <p className="d-inline-block">{location.name}</p>
                      <i className="fa-solid fa-angle-right" />
                    </li>
                  ))}
              </ul>
            </div>
            <div className="text-center btn-row">
              <Link className="btn btn-primary me-3 btn-icon" to={routes.bookingType}>
                <i className="feather-arrow-left-circle me-1" /> Back
              </Link>
              <Link className="btn btn-secondary btn-icon change-url" to={path as string}>
                Next <i className="feather-arrow-right-circle ms-1" />
              </Link>
            </div>
          </section>
        </div>
        {/* /Container */}
      </div>
      {/* /Page Content */}
    </div>
  )
}

export default Locations
