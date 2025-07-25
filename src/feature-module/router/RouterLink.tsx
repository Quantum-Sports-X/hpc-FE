import React from 'react'
import {Navigate, Route} from 'react-router'
import {all_routes} from './AllRoutes'

// auth pages
import Login from '../auth/Login'
import Register from '../auth/Register'
import ChangePassword from '../auth/ChangePassword'
import ForgotPassword from '../auth/ForgotPassword'

// booking pages
import Type from '../booking/Type'
import Availability from '../booking/Availability'
import PersonalInformation from '../booking/Information'
import Payment from '../booking/Payment'
import Summary from '../booking/Summary'
import AddOns from '../booking/AddOns'

// normal pages
import Home from '../home/Home'
import AboutUs from '../pages/AboutUs'
import HpcActive from '../pages/HpcActive'
import ComingSoon from '../pages/_ComingSoon'
import ContactUs from '../contact-us/ContactUs'
import Gallery from '../pages/Gallery'
import LaneRental from '../pages/LaneRental'
import BookACoach from '../pages/BookACoach'
import Services from '../pages/Services'
import TermsCondition from '../pages/TermsCondition'
import CookiePolicy from '../pages/CookiePolicy'
import Faq from '../pages/_Faq'
import Maintenance from '../pages/Maintenance'
import Error404 from '../pages/Error404'

// inactive pages
import BlogGridSidebarRight from '../blog/BlogGridSidebarRight'
import BookingCancelled from '../coaches/BookingCancelled'
import BookingCompleted from '../coaches/BookingCompleted'
import CoachDetail from '../coaches/Coach'
import CoachesGrid from '../coaches/Coaches'
import CoachesList from '../coaches/CoachesList'
import CoachPersonalInfo from '../coaches/CoachPersonalInfo'
import CoachPayment from '../coaches/CoachPayment'
import CoachOrderConfirm from '../coaches/CoachOrderConfirm'
import Locations from '../listing/Locations'
import Location from '../listing/Location'
import Lanes from '../listing/Lanes'
import UserDashboardProfiles from '../user/UserDashboardProfiles'
import UserDashboard from '../user/UserDashboard'
import UserInvoice from '../user/UserInvoice'
import OurTeams from '../pages/_OurTeams'
import MyProfile from '../pages/MyProfile'
import Testimonials from '../pages/Testimonials'
import UserBookings from '../user/UserBookings'
import Invoice from '../coaches/Invoice'
import UserCoaches from '../user/UserCoaches'
import UserWallet from '../user/UserWallet'
import UserProfile from '../user/UserProfile'
import UserSettingPassword from '../user/UserSettingPassword'
import UserProfileOtherSetting from '../user/UserProfileOtherSetting'

const routes = all_routes

const publicRoutes = [
  {
    path: routes.home,
    element: <Home />,
    route: Route,
  },
  {
    path: routes.aboutUs,
    element: <AboutUs />,
    route: Route,
  },
  {
    path: routes.blogGridSidebarRight,
    element: <BlogGridSidebarRight />,
    route: Route,
  },

  {
    path: routes.bookingCancelled,
    element: <BookingCancelled />,
    route: Route,
  },
  {
    path: routes.bookingCompleted,
    element: <BookingCompleted />,
    route: Route,
  },
  {
    path: routes.coachDetail,
    element: <CoachDetail />,
    route: Route,
  },
  {
    path: routes.bookingType,
    element: <Type />,
    route: Route,
  },
  {
    path: routes.bookingAddOns,
    element: <AddOns />,
    route: Route,
  },
  {
    path: routes.coachesGrid,
    element: <CoachesGrid />,
    route: Route,
  },
  {
    path: routes.coachesGrid,
    element: <CoachesList />,
    route: Route,
  },
  {
    path: routes.bookingAvailability,
    element: <Availability />,
    route: Route,
  },
  {
    path: routes.coachPersonalInfo,
    element: <CoachPersonalInfo />,
    route: Route,
  },
  {
    path: routes.bookingPersonalInformation,
    element: <PersonalInformation />,
    route: Route,
  },
  {
    path: routes.coachPayment,
    element: <CoachPayment />,
    route: Route,
  },
  {
    path: routes.coachOrderConfirm,
    element: <CoachOrderConfirm />,
    route: Route,
  },
  {
    path: routes.bookingSummary,
    element: <Summary />,
    route: Route,
  },
  {
    path: routes.bookingPayment,
    element: <Payment />,
    route: Route,
  },
  {
    path: routes.contactUs,
    element: <ContactUs />,
    route: Route,
  },
  {
    path: routes.userDashboardProfiles,
    element: <UserDashboardProfiles />,
    route: Route,
  },
  {
    path: routes.userDashboard,
    element: <UserDashboard />,
    route: Route,
  },
  {
    path: routes.userInvoice,
    element: <UserInvoice />,
    route: Route,
  },
  {
    path: routes.laneRental,
    element: <LaneRental />,
    route: Route,
  },
  {
    path: routes.bookACoach,
    element: <BookACoach />,
    route: Route,
  },
  {
    path: routes.hpcActive,
    element: <HpcActive />,
    route: Route,
  },
  {
    path: routes.services,
    element: <Services />,
    route: Route,
  },
  {
    path: routes.termsCondition,
    element: <TermsCondition />,
    route: Route,
  },
  {
    path: routes.cookiePolicy,
    element: <CookiePolicy />,
    route: Route,
  },
  {
    path: routes.ourTeams,
    element: <OurTeams />,
    route: Route,
  },
  {
    path: routes.myProfile,
    element: <MyProfile />,
    route: Route,
  },
  {
    path: routes.testimonials,
    element: <Testimonials />,
    route: Route,
  },
  {
    path: routes.userBookings,
    element: <UserBookings />,
    route: Route,
  },
  {
    path: routes.faq,
    element: <Faq />,
    route: Route,
  },

  {
    path: routes.gallery,
    element: <Gallery />,
    route: Route,
  },
  {
    path: routes.invoice,
    element: <Invoice />,
    route: Route,
  },
  {
    path: routes.userCoaches,
    element: <UserCoaches />,
    route: Route,
  },
  {
    path: routes.userProfile,
    element: <UserProfile />,
    route: Route,
  },
  {
    path: routes.userSettingPassword,
    element: <UserSettingPassword />,
    route: Route,
  },
  {
    path: routes.userProfileOtherSetting,
    element: <UserProfileOtherSetting />,
    route: Route,
  },
  {
    path: routes.userWallet,
    element: <UserWallet />,
    route: Route,
  },
  {
    path: routes.changePassword,
    element: <ChangePassword />,
    route: Route,
  },
  {
    path: '/',
    name: 'Root',
    element: <Navigate to="/" />,
    route: Route,
  },
  {
    path: '/404',
    name: 'NotFound',
    element: <Navigate to="/" />,
    route: Route,
  },
  {
    path: routes.locations,
    element: <Locations />,
    route: Route,
  },
  {
    path: routes.location,
    element: <Location />,
    route: Route,
  },
  {
    path: routes.lanes,
    element: <Lanes />,
    route: Route,
  },
]

const withoutHeaderRoutes = [
  {
    path: routes.comingSoon,
    element: <ComingSoon />,
    route: Route,
  },
  {
    path: routes.error404,
    element: <Error404 />,
    route: Route,
  },
  {
    path: routes.register,
    element: <Register />,
    route: Route,
  },
  {
    path: routes.login,
    element: <Login />,
    route: Route,
  },
  {
    path: routes.maintenance,
    element: <Maintenance />,
    route: Route,
  },
  {
    path: routes.forgotPassword,
    element: <ForgotPassword />,
    route: Route,
  },
]
export {publicRoutes, withoutHeaderRoutes}
