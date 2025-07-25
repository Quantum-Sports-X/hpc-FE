import React from 'react'
import {publicRoutes, withoutHeaderRoutes} from './RouterLink'
import {Outlet, Route, Routes, useLocation, useNavigate} from 'react-router-dom'
import {matchPath} from 'react-router'
import {Helmet as Helmet_} from 'react-helmet'
import Header from '../common/Header'
import Footer from '../common/Footer'
import {CookieBar} from '../common/CookieBar'

const Helmet = Helmet_ as unknown as React.ComponentType<any>

const AllRoutes = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const getPageTitle = (pathname: string) => {
    switch (pathname) {
      case '/':
        return 'High Performance Cricket Centre | State of the art facility for cricket'
      case '/about-us':
        return 'High Performance Cricket Centre | About us'
      case '/services':
        return 'High Performance Cricket Centre | Services'
      case '/gallery':
        return 'High Performance Cricket Centre | Gallery'
      case '/contact-us':
        return 'High Performance Cricket Centre | Contact us'
      default:
        return 'High Performance Cricket Centre | State of the art facility for cricket'
    }
  }

  // Check if the current route is a public route that needs the Header/Footer
  const isPublicRoute = publicRoutes.some(route =>
    matchPath({path: route.path, end: true}, location.pathname)
  )

  if (process.env.REACT_APP_MAINTENANCE_MODE === 'true') {
    navigate('/maintenance')
  }

  return (
    <>
      <Helmet>
        <title>{getPageTitle(location.pathname)}</title>
        <meta
          name="description"
          content="High quality coaching and state of the art facility for the modern day cricketer. HPC consists of HPC Chigwell, HPC Coaching and HPC Active."
        ></meta>
      </Helmet>
      {/* Conditionally render Header and Footer only for public routes */}
      {isPublicRoute && <Header />}

      <Routes>
        {/* Public routes with Outlet for nested content */}
        <Route path="/" element={<Outlet />}>
          {publicRoutes.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
        </Route>

        {/* Routes without Header and Footer */}
        {withoutHeaderRoutes.map((route, idx) => (
          <Route path={route.path} element={route.element} key={idx} />
        ))}
      </Routes>
      <CookieBar />

      {isPublicRoute && <Footer />}
    </>
  )
}

export default AllRoutes
