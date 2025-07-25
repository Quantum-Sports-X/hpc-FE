import React, {useCallback, useEffect, useState} from 'react'
import {Link as CustomLink, useLocation} from 'react-router-dom'
import {all_routes} from '../router/AllRoutes'
import ImageWithBasePath from '../../core/data/img/ImageWithBasePath'
import {apiService} from '../../services/apiService'
import {useNavigate} from 'react-router-dom'
import detectPassiveEventsSupport from '../../utils/detectPassiveEventsSupport'

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string
  children: React.ReactNode
}

const Link: React.FC<LinkProps> = ({to, children, ...props}) => {
  const isExternal = to?.startsWith('http') || to?.startsWith('//')

  if (isExternal) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    )
  }

  return (
    <CustomLink to={to} {...props}>
      {children}
    </CustomLink>
  )
}

interface MenuItem {
  tittle: string
  showAsTab: boolean
  separateRoute: boolean
  routes: string
  hasSubRoute: boolean
  showSubRoute: boolean
  menu?: SubMenuItem[]
}

interface SubMenuItem {
  menuValue: string
  routes: string
  hasSubRoute: boolean
  showSubRoute: boolean
  subMenus: {menuValue: string; routes: string}[]
}

interface LoggedInUser {
  first_name: string
  last_name: string
  r_code: number
  status: string
}

const Header = () => {
  const routes = all_routes
  const location = useLocation()
  const {roleType} = location.state || {}

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showAsTab, setShowAsTab] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(null)
  //const loggedInUser = localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')??''):'';
  const navigate = useNavigate() // Hook to redirect
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [_error, setError] = useState<string | null>(null)
  const [isTransparent, setIsTransparent] = useState(true)

  const handleLogOut = (e: React.UIEvent) => {
    e.preventDefault() // Prevents page reload
    apiService
      .get('/api/v1/auth/logout', localStorage.getItem('authToken') ?? '')
      .then(() => {
        localStorage.removeItem('authToken')
        localStorage.removeItem('user')
        setIsLoggedIn(false)
        navigate('/')
      })
      .catch(err => {
        setError(err.message)
        localStorage.removeItem('authToken')
        localStorage.removeItem('user')
        setIsLoggedIn(false)
        navigate('/')
      })
    // close mobile menu if already open
    setIsMobileMenuOpen(false)

    // You can also handle form submission logic here, like calling an API
  }

  const checkWindowScroll = useCallback(() => {
    const scrollTop = window.scrollY
    setIsTransparent(scrollTop > -30 && scrollTop <= 0)
  }, [])
  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    checkWindowScroll()
    if (detectPassiveEventsSupport()) {
      window.addEventListener('scroll', checkWindowScroll, {passive: true})
    } else {
      window.addEventListener('scroll', checkWindowScroll)
    }

    return () => {
      window.removeEventListener('scroll', checkWindowScroll)
    }
  }, [checkWindowScroll])

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (token) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      const user = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user') ?? '')
        : ''
      if (user) {
        setLoggedInUser(user)
      } else {
        setLoggedInUser(null)
      }
    }, 800)
    return () => {
      clearTimeout(timeout)
    }
  }, [isLoggedIn, loggedInUser])

  const header: MenuItem[] = [
    {
      tittle: 'Home',
      showAsTab: false,
      separateRoute: true,
      routes: routes.home,
      hasSubRoute: false,
      showSubRoute: false,
    },
    {
      tittle: 'About Us',
      showAsTab: false,
      separateRoute: true,
      routes: routes.aboutUs,
      hasSubRoute: false,
      showSubRoute: false,
    },
    {
      tittle: 'Net Hire',
      showAsTab: false,
      separateRoute: true,
      routes: routes.laneRental,
      hasSubRoute: false,
      showSubRoute: false,
    },
    {
      tittle: 'Coaching',
      showAsTab: false,
      separateRoute: true,
      routes: routes.bookACoach,
      hasSubRoute: false,
      showSubRoute: false,
    },
    {
      tittle: 'HPC Active',
      showAsTab: false,
      separateRoute: true,
      routes: routes.hpcActive,
      hasSubRoute: false,
      showSubRoute: false,
    },
    {
      tittle: 'HiTZ@HPC',
      showAsTab: true,
      separateRoute: true,
      routes: 'https://hitzcricket.com/location/hpc-chigwell/',
      hasSubRoute: false,
      showSubRoute: false,
    },
    {
      tittle: 'Gallery',
      showAsTab: false,
      separateRoute: true,
      routes: routes.gallery,
      hasSubRoute: false,
      showSubRoute: false,
    },
    {
      tittle: 'Contact Us',
      showAsTab: false,
      separateRoute: true,
      routes: routes.contactUs,
      hasSubRoute: false,
      showSubRoute: false,
    },
  ]

  const authComponent = {
    tittle:
      isLoggedIn && loggedInUser ? `${loggedInUser?.first_name} ${loggedInUser?.last_name}` : '',
    showAsTab,
    separateRoute: false,
    menu: [
      {
        menuValue: 'Bookings',
        routes: `${routes.userBookingsPrefix}/active`,
        hasSubRoute: false,
        showSubRoute: false,
        subMenus: [],
      },
      {
        menuValue: 'Wallet',
        routes: routes.userWallet,
        hasSubRoute: false,
        showSubRoute: false,
        subMenus: [],
      },
      {
        menuValue: 'Profile',
        routes: routes.userProfile,
        hasSubRoute: false,
        showSubRoute: false,
        subMenus: [],
      },
    ],
  }

  const normalizePath = (path: string) => {
    return path === '/' ? path : path.replace(/\/+$/, '')
  }

  const isHome = normalizePath(location.pathname) === normalizePath(routes.home)

  const customStyle = {
    background: isHome ? (isTransparent ? 'transparent' : '#000000') : '#000000',
  }

  return (
    <header
      className={location.pathname == '/' ? 'header header-trans' : 'header header-sticky'}
      style={customStyle}
    >
      <div className={`container-fluid ${isMobileMenuOpen ? 'menu-opened' : ''}`}>
        <nav className="navbar navbar-expand-lg header-nav">
          <div className="navbar-header">
            <Link id="mobile_btn" to="#" onClick={() => setIsMobileMenuOpen(true)}>
              <span className="bar-icon">
                <span />
                <span />
                <span />
              </span>
            </Link>
            <Link to="/" className="navbar-brand logo">
              {/* <ImageWithBasePath src="assets/img/logo.svg" className="img-fluid" alt="Logo" /> */}

              {location.pathname.includes(routes.home) ? (
                <ImageWithBasePath
                  src="assets/img/logo.png"
                  className="img-fluid header-logo"
                  alt="Logo"
                />
              ) : (
                <ImageWithBasePath
                  src="assets/img/logo-black.svg"
                  className="img-fluid header-logo"
                  alt="Another Image"
                />
              )}
            </Link>
            {!isLoggedIn && (
              <Link
                to={routes.login}
                className="d-block d-sm-none nav-link btn btn-white mx-3 log-register"
              >
                <span>
                  <i className="fas fa-circle-user fa-xl" />{' '}
                </span>
                Login / Register
              </Link>
              // <Link to={routes.login} className="mobile-login"><i className="fas fa-circle-user fa-2xl"></i>{' '} Login / Register</Link>
            )}
            {isLoggedIn && (roleType === 'COACH' || loggedInUser?.r_code === 3) && (
              <a
                href={`${process.env.REACT_APP_API_URL}/login`}
                target="_blank"
                rel="noopener noreferrer"
                className="d-block d-md-none nav-link btn btn-white mx-3 log-register coach-login"
              >
                <span>
                  <i className="feather-users" />{' '}
                </span>
                Coach Portal
              </a>
            )}
          </div>
          <div className="main-menu-wrapper">
            <div className="menu-header">
              <Link to="/" className="menu-logo">
                <ImageWithBasePath
                  src="assets/img/logo-black.svg"
                  className="img-fluid"
                  alt="Logo"
                />
              </Link>
              <Link
                id="menu_close"
                className="menu-close"
                to="#"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {' '}
                <i className="fas fa-times" />
              </Link>
            </div>
            <ul className="main-nav">
              {header.map((mainMenus, mainIndex) => (
                <React.Fragment key={mainIndex}>
                  {mainMenus.separateRoute ? (
                    <li
                      key={mainIndex}
                      className={location.pathname === mainMenus.routes ? 'active' : ''}
                    >
                      <Link to={mainMenus.routes} onClick={() => setIsMobileMenuOpen(false)}>
                        {mainMenus.tittle}
                      </Link>
                    </li>
                  ) : (
                    <li
                      className={`has-submenu ${mainMenus?.menu?.map(item => item?.routes).includes(location.pathname) ? 'active' : ''}`}
                    >
                      <Link to="#">
                        {mainMenus.tittle} <i className="fas fa-chevron-down"></i>
                      </Link>
                      <ul className={`submenu ${mainMenus.showAsTab ? 'd-block' : ''}`}>
                        {mainMenus.menu?.map((menu, menuIndex) => (
                          <li
                            key={menuIndex}
                            className={`${menu.hasSubRoute ? 'has-submenu' : ''} ${menu?.subMenus?.map(item => item?.routes).includes(location.pathname) ? 'active' : ''}`}
                          >
                            {menu.hasSubRoute ? (
                              <React.Fragment>
                                <Link to="#">{menu.menuValue}</Link>
                                <ul className={`submenu ${menu.showSubRoute ? 'd-block' : ''}`}>
                                  {menu.subMenus?.map((subMenu, subMenuIndex) => (
                                    <li key={subMenuIndex}>
                                      <Link to={subMenu.routes}>{subMenu.menuValue}</Link>
                                    </li>
                                  ))}
                                </ul>
                              </React.Fragment>
                            ) : (
                              <li
                                className={location.pathname.includes(menu.routes) ? 'active' : ''}
                              >
                                <Link to={menu.routes}>{menu.menuValue}</Link>
                              </li>
                            )}
                          </li>
                        ))}
                      </ul>
                    </li>
                  )}
                </React.Fragment>
              ))}
            </ul>
            {isLoggedIn && (
              // shown in mobile
              <div className="mobile-profile">
                <ul className="main-nav">
                  <React.Fragment>
                    <li className={`has-submenu`}>
                      <Link to="#" onClick={() => setShowAsTab(!showAsTab)}>
                        Dashboard
                        <i className="fas fa-chevron-down"></i>
                      </Link>
                      <ul className={`submenu ${authComponent.showAsTab ? 'd-block' : ''}`}>
                        {authComponent.menu?.map((menu, menuIndex) =>
                          loggedInUser?.status == 'inactive' ? (
                            <li
                              key={menuIndex}
                              className={`${menu.hasSubRoute ? 'has-submenu' : ''} ${menu?.subMenus?.map((item: any) => item?.routes).includes(location.pathname) ? 'active' : ''}`}
                            >
                              <Link to={menu.routes} onClick={() => setIsMobileMenuOpen(false)}>
                                {menu.menuValue}
                              </Link>
                            </li>
                          ) : (
                            ''
                          )
                        )}
                        <li className="">
                          <Link to="#" onClick={handleLogOut}>
                            <i className="fa-solid fa-right-from-bracket"></i> Log out
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </React.Fragment>
                </ul>
              </div>
            )}
          </div>
          {isLoggedIn ? (
            //  hidden in mobile screen
            <div className="main-menu-wrapper margin-profile">
              <ul className="main-nav align-items-center">
                {roleType === 'COACH' ||
                  (loggedInUser?.r_code === 3 && (
                    <React.Fragment>
                      <li className="nav-item">
                        <a
                          href={`${process.env.REACT_APP_API_URL}/login`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="nav-link btn btn-white mx-3 log-register coach-login"
                        >
                          <span>
                            <i className="feather-users" />{' '}
                          </span>
                          Coach Portal
                        </a>
                      </li>
                    </React.Fragment>
                  ))}
                <React.Fragment>
                  <li className={`has-submenu`}>
                    <Link to="#" className="profile-icon">
                      <i className="fas fa-circle-user fa-xl"></i> {authComponent?.tittle}{' '}
                    </Link>
                    <ul className={`submenu ${authComponent.showAsTab ? 'd-block' : ''}`}>
                      {authComponent.menu?.map((menu, menuIndex) =>
                        loggedInUser?.status !== 'inactive' ? (
                          <li
                            key={menuIndex}
                            className={`${menu.hasSubRoute ? 'has-submenu' : ''} ${menu?.subMenus?.map((item: any) => item?.routes).includes(location.pathname) ? 'active' : ''}`}
                          >
                            <Link to={menu.routes}>{menu.menuValue}</Link>
                          </li>
                        ) : (
                          ''
                        )
                      )}
                      <li className="">
                        <Link to="#" onClick={handleLogOut}>
                          <i className="fa-solid fa-right-from-bracket"></i> Log out
                        </Link>
                      </li>
                    </ul>
                  </li>
                </React.Fragment>
              </ul>
            </div>
          ) : (
            <ul className="nav header-navbar-rht">
              <li className="nav-item">
                <Link to={routes.login} className="nav-link btn btn-white mx-3 log-register">
                  <span>
                    <i className="feather-users" />
                  </span>
                  Login
                </Link>
                <Link to={routes.register} className="nav-link btn btn-white log-register">
                  Register
                </Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
