import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {getBaseUrl} from '../../../services/commonService'

interface AddOnAvailability {
  [datetime: string]: {
    [addOnId: string]: number
  }
}

interface CartSummary {
  sub_total: number
  discount: number
  addOn_sum: number
  total: number
  unavailable_slots: any[]
  addOnAvailability: AddOnAvailability
  canProceedOrder: boolean
  internalAddOnAvailability: any[]
}

interface CartSummaryResponse {
  data: CartSummary
}

type SelectedSlots = {
  slotId: string
  quantity: number
}[]

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/v1`,
    prepareHeaders: headers => {
      const token = localStorage.getItem('authToken')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: builder => ({
    getCartSummary: builder.query<CartSummary, SelectedSlots>({
      query: selectedSlots => ({
        url: '/cart/summary',
        method: 'POST', // Set the method to POST
        body: selectedSlots,
      }),
      transformResponse: (response: CartSummaryResponse) => response?.data,
    }),
  }),
})

export const {useGetCartSummaryQuery, useLazyGetCartSummaryQuery} = cartApi
