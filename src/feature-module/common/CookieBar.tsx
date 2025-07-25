import React, {useEffect, useState, useCallback} from 'react'
import {Link} from 'react-router-dom'
import {getUserConsent, setUserConsent} from '../../utils/consent-cookie'
import {all_routes} from '../router/AllRoutes'

export const CookieBar = () => {
  const routes = all_routes
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const userConsent = getUserConsent()
    const timeout = setTimeout(() => {
      setIsVisible(userConsent === undefined)
    }, 1)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  const decline = useCallback(() => {
    setIsVisible(false)
    setUserConsent(10)
  }, [])

  const accept = useCallback(() => {
    setIsVisible(false)
    setUserConsent(30)
  }, [])

  if (!isVisible) return null

  return (
    <div className="bg-dark text-white p-3 fixed-bottom">
      <div className="container">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start">
          <p className="mb-2 mb-md-0 flex-grow-1">
            We use cookies to analyze user interactions and improve your experience. By clicking{' '}
            <strong>Accept</strong> you consent to the use of these cookies. For more details,
            please review our{' '}
            <Link to={routes.cookiePolicy} className="text-decoration-underline text-white">
              Cookie Policy
            </Link>{' '}
            and{' '}
            <Link to={routes.termsCondition} className="text-decoration-underline text-white">
              Terms & conditions
            </Link>
            .
          </p>
          <div className="d-flex justify-content-center justify-content-md-end mt-2 mt-md-0">
            <button
              className="btn btn-secondary me-2"
              onClick={decline}
              data-target="cookie-accept-10"
              data-track-category="cookie-consent-dialog"
              data-track-click-action="submit-button-clicked"
              data-track-click-label="consent-10"
            >
              Decline
            </button>
            <button
              className="btn btn-primary"
              onClick={accept}
              data-target="cookie-accept-30"
              data-track-category="cookie-consent-dialog"
              data-track-click-action="submit-button-clicked"
              data-track-click-label="consent-30"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
