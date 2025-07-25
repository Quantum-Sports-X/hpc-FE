import {createSelector} from 'reselect'

export const selectBookingLocation = (state: any) => state?.bookingLocation
export const selectBookingCart = (state: any) => state?.bookingCart

export const selectCartByBookingType = createSelector(
  state => state?.app?.bookingCart,
  (_, bookingType) => bookingType,
  (bookingCart, bookingType) => {
    // Return the whole bookingCart if bookingType is 'coach' and it has a coach property
    // Ensure bookingCart is always an array
    const cart = Array.isArray(bookingCart) ? bookingCart : []

    if (bookingType === 'coach') {
      return cart?.filter(item => item?.coach)
    }

    // Return items without a 'coach' property if bookingType is 'lane'
    if (bookingType === 'lane') {
      return cart?.filter(item => !item?.coach)
    }

    return []
  }
)
