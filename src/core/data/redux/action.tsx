export const header_data = () => ({type: 'HEADER_DATA'})
export const set_header_data = (payload: any) => ({
  type: 'HEADER_DATA',
  payload,
})

export const aSetBookingLocation = (payload: any) => ({
  type: 'BOOKING_LOCATION',
  payload,
})

export const aSetCartFromLocalStorage = (payload: any) => ({
  type: 'SET_CART',
  payload,
})

export const aAddToBookingCart = (payload: any) => ({
  type: 'ADD_TO_CART',
  payload,
})

export const aRemoveFromBookingCart = (payload: any) => ({
  type: 'REMOVE_FROM_CART',
  payload,
})

export const aResetBookingCart = () => ({
  type: 'RESET_CART',
})

export const aAddOnsToBookingCart = (payload: any) => ({
  type: 'ADD_ONS_TO_CART',
  payload,
})
