import {configureStore} from '@reduxjs/toolkit'
import rootReducer from './reducer'
import {cartApi} from './cartApi'

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(cartApi.middleware), // Add RTK Query middleware
})

// subscribe to store changes
store.subscribe(() => {
  try {
    const state = store.getState()
    // save the cart state to localStorage
    localStorage.setItem('cart', JSON.stringify(state?.app?.bookingCart))
  } catch (error) {
    console.error('Error saving cart:', error)
  }
})

export default store
