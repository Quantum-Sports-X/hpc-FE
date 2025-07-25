import React, {useEffect, useState} from 'react'
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js'
import type {PaymentMethod as StripePaymentMethod} from '@stripe/stripe-js'
import '../../style/css/stripe.css'
import {apiService} from '../../services/apiService'
import {getCardIcon} from '../../services/commonService'
import ImageWithBasePath from '../../core/data/img/ImageWithBasePath'
import {useParams} from 'react-router-dom'

interface CheckoutFormProps {
  onPaymentMethodSelect: (paymentMethodId: string | null) => void
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({onPaymentMethodSelect}) => {
  const stripe = useStripe()
  const elements = useElements()
  const [error, setError] = useState<string | null>(null)
  const [paymentMethods, setPaymentMethods] = useState<any>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const user = JSON.parse(localStorage.getItem('user') ?? '')
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [paymentMethod, setPaymentMethod] = useState<StripePaymentMethod | null>(null)
  const {bookingType} = useParams<{bookingType: string}>()

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    setIsLoading(true)

    if (!stripe || !elements) {
      setError('Stripe has not loaded')
      setIsLoading(false)
      return
    }

    // Retrieve CardElement details
    const cardElement = elements.getElement(CardElement)

    // Create Payment Method
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    })
    if (error) {
      setError(error?.message ?? '')
      setIsLoading(false)
    } else {
      setPaymentMethod(paymentMethod)
      setError(null)
      cardElement?.clear()
      apiService
        .post(
          `/api/v1/payment/payment-methods/attach?account_type=${bookingType == 'coach' ? 'COACH' : 'LANE'}`,
          {
            payment_method: paymentMethod.id,
            customer_id: bookingType == 'coach' ? user.coach_customer_id : user.customer_id,
            account_type: bookingType == 'coach' ? 'COACH' : 'LANE',
          },
          localStorage.getItem('authToken') ?? ''
        )
        .then(() => {
          setError(null)
          getPaymentMethods()
        })
        .catch(err => {
          setError(err.message)
        })
      setIsLoading(false)
    }
  }

  const getPaymentMethods = () => {
    apiService
      .get(
        `/api/v1/payment/payment-methods/customer/${bookingType == 'coach' ? user.coach_customer_id : user.customer_id}?account_type=${bookingType == 'coach' ? 'COACH' : 'LANE'}`,
        localStorage.getItem('authToken') ?? ''
      )
      .then((paymentMethodResponse: any) => {
        setPaymentMethods(paymentMethodResponse.data.data)
        if (paymentMethodResponse.data.data.length > 0) {
          setSelectedPaymentMethod(paymentMethodResponse.data.data[0].id)
        }
      })
      .catch(err => setError(err.message))
  }

  useEffect(() => {
    getPaymentMethods()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<any>(null)
  useEffect(() => {
    onPaymentMethodSelect(selectedPaymentMethod)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPaymentMethod])

  const deletePaymentMethod = async (paymentMethod: string) => {
    await apiService
      .post(
        `/api/v1/payment/payment-methods/detach/${paymentMethod}?account_type=${bookingType == 'coach' ? 'COACH' : 'LANE'}`,
        {account_type: bookingType == 'coach' ? 'COACH' : 'LANE'},
        localStorage.getItem('authToken') ?? ''
      )
      .then(() => {
        setError(null)
        getPaymentMethods()
      })
      .catch(err => {
        setError(err.message)
      })
  }
  return (
    <div>
      {/* Existing cards */}
      <div>
        {paymentMethods.map((method: any) => (
          <label
            key={method.id}
            className={`payment-method ${selectedPaymentMethod === method.id ? 'selected-pm' : ''}`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value={method.id}
              checked={selectedPaymentMethod === method.id}
              onChange={() => setSelectedPaymentMethod(method.id)}
              className="payment-radio"
            />
            <div className="payment-details row">
              <span className="card-brand col-2">
                <ImageWithBasePath
                  src={getCardIcon(method.card.brand)}
                  className="img-fluid"
                  alt={`${method.card.brand} card`}
                />
              </span>
              <span className="card-last4 col text-center">xxxx xxxx xxxx {method.card.last4}</span>
              <span className="card-expiry col text-end">
                Exp: {method.card.exp_month}/{method.card.exp_year}
              </span>
              <span
                onClick={() => deletePaymentMethod(method.id)}
                className="delete-card text-end col fas fa-trash"
              ></span>
            </div>
          </label>
        ))}
      </div>
      {/* New Card */}
      <div>
        <form onSubmit={handleSubmit} className="checkout-form">
          <h5>Add new card</h5>
          <div className="card-element-wrapper">
            <CardElement className="StripeElement" />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" disabled={!stripe || isLoading} className="submit-button">
            {isLoading ? 'Processing...' : 'Add new card'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CheckoutForm
