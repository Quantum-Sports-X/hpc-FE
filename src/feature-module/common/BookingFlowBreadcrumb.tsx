import React from 'react'
import {useSelector} from 'react-redux'
import {Link, useLocation, useParams} from 'react-router-dom'
import {all_routes} from '../router/AllRoutes'
import {selectCartByBookingType} from '../../core/data/redux/selectors'

export const BookingFlowBreadCrumb = () => {
  const routes = all_routes
  const location = useLocation()
  const {bookingType, locationId, refCode} = useParams<{
    bookingType: string
    locationId: string
    refCode: string
  }>()
  const cartItems = useSelector(state => selectCartByBookingType(state, bookingType))
  const isCartEmpty = cartItems.length === 0

  const links = [
    {
      id: 1,
      path: `${routes.bookingType}/${bookingType}/location/${locationId}/time&date`,
      name: 'Availability',
    },
    {
      id: 2,
      path: `${routes.bookingType}/${bookingType}/location/${locationId}/add-ons`,
      name: 'Add-Ons',
    },
    {
      id: 3,
      path: `${routes.bookingType}/${bookingType}/location/${locationId}/personal-information`,
      name: 'Your Details',
    },
    {
      id: 4,
      path: `${routes.bookingType}/${bookingType}/location/${locationId}/payment`,
      name: 'Payment',
    },
    {id: 5, path: `/booking/summary/${refCode}`, name: 'Summary'},
  ]
  const isLinkClickable = (linkId: number) => {
    if (refCode) {
      // If booking is confirmed, only allow the "Summary" link
      return linkId === 5
    }

    if (isCartEmpty) {
      // If cart is empty, only allow the first link
      return linkId === 1
    }

    if (!localStorage.getItem('authToken')) {
      // if not logged in, allow steps 1 to 3
      return linkId !== 4 && linkId !== 5
    }

    // If the cart is not empty, allow steps 1 to 4
    return linkId !== 5
  }

  return (
    <section className="booking-steps py-30 d-none d-md-block white-bg">
      <span className="primary-right-round" />
      <div className="container">
        <ul className="d-xl-flex justify-content-center align-items-center">
          {links.map(link => {
            const isClickable = isLinkClickable(link.id)
            return (
              <li
                key={link.id}
                className={`${location.pathname == link.path ? 'active' : ''} ${location.pathname == link.path ? 'active' : ''}`}
              >
                <h5>
                  <Link
                    to={link.path}
                    style={{
                      color: isClickable ? 'inherit' : 'gray',
                      pointerEvents: isClickable ? 'auto' : 'none',
                    }}
                  >
                    <span>{link.id}</span>
                    {link.name}
                  </Link>
                </h5>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
