import {combineReducers} from 'redux'
import {cartApi} from './cartApi'
import initialState from './initial.values'

interface BookingCartItem {
  key: string
  slot: any
  lane: any
  coach?: any
  addOns?: string[]
}

interface BookingCartState {
  header_data?: any
  bookingLocation?: any
  bookingCart: BookingCartItem[]
}

const bookingCartReducer = (
  state: BookingCartState = initialState,
  action: {type: string; payload?: any}
) => {
  switch (action.type) {
    case 'HEADER_DATA':
      return {...state, header_data: action?.payload}
    case 'BOOKING_LOCATION':
      return {...state, bookingLocation: action.payload}
    case 'SET_CART':
      return {...state, bookingCart: action.payload}
    case 'ADD_TO_CART': {
      const {lane, slot, coach} = action.payload
      const key = lane?.slug + '-' + slot?.start + (coach ? '-' + coach?.id : '') // create the key
      // check if the key is already in the booking cart
      const existingSlot = state?.bookingCart.find(item => item?.key === key)

      return {
        ...state,
        bookingCart: existingSlot
          ? [...state.bookingCart].filter(item => item?.key !== key)
          : [...state.bookingCart, {key, slot, lane, coach}],
      }
    }
    case 'ADD_ONS_TO_CART': {
      const {key, addOnId} = action.payload
      const updatedObject = state?.bookingCart.map((item: any) => {
        if (item.key === key) {
          // Get the addOns array, default to an empty array if not defined
          const addOns = item.addOns ?? []

          // Check if the addOnId already exists in the addOns array
          const addOnExists = addOns.includes(addOnId)

          let updatedAddOns

          if (addOnExists) {
            // Remove addOnId if it exists
            updatedAddOns = addOns.filter((id: string) => id !== addOnId)
          } else {
            // Add addOnId if it doesn't exist
            updatedAddOns = [...addOns, addOnId]
          }

          // Return the updated object with modified addOns
          return {
            ...item,
            addOns: updatedAddOns,
          }
        }
        return item
      })
      return {
        ...state,
        bookingCart: updatedObject,
      }
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        bookingCart: [...state.bookingCart].filter(item => item.key !== action?.payload),
      }
    case 'RESET_CART':
      return {...state, bookingCart: []}
    default:
      return state
  }
}

const rootReducer = combineReducers({
  app: bookingCartReducer,
  [cartApi.reducerPath]: cartApi.reducer, // Add the cartApi reducer
})

export default rootReducer
