import React, {useEffect, useState, useMemo, useCallback, ReactElement} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {all_routes} from '../router/AllRoutes'
import {BookingFlowBreadCrumb} from '../common/BookingFlowBreadcrumb'
import {formatToLongDate, getFormattedCurrency, formatTime} from '../../services/commonService'
import {apiService} from '../../services/apiService'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import CheckoutForm from './CheckoutForm'
import {useDispatch, useSelector} from 'react-redux'
import {aAddOnsToBookingCart, aRemoveFromBookingCart} from '../../core/data/redux/action'
import {useLazyGetCartSummaryQuery} from '../../core/data/redux/cartApi'
import {selectCartByBookingType} from '../../core/data/redux/selectors'
import Loader from '../loader/Loader'
import {List} from 'antd'
import ImageWithBasePath from '../../core/data/img/ImageWithBasePath'

const stripePromiseCoach = loadStripe(process.env.REACT_APP_COACH_STRIPE_KEY ?? '')
const stripePromiseDefault = loadStripe(process.env.REACT_APP_STRIPE_KEY ?? '')

const Payment = () => {
  const dispatch = useDispatch()
  const {bookingType, locationId} = useParams<{bookingType: string; locationId: string}>()
  const stripePromise = bookingType === 'coach' ? stripePromiseCoach : stripePromiseDefault
  const selectedSlots = useSelector(state => selectCartByBookingType(state, bookingType))
  const routes = all_routes
  const [error, setError] = useState<string | null>(null)
  const [paymentSource, setPaymentSource] = useState<string>('STRIPE')
  const [user, setUser] = useState<any>(null)
  const [isOrderInProgress, setIsOrderInProgress] = useState<any>(false)
  // @important changed to 0 from null
  const [seconds, setSeconds] = useState<number>(0)
  const [showTimer, setShowTimer] = useState<boolean | null>(null)
  const [unavailableAddonsState, setUnavailableAddonsState] = useState<Record<string, number[]>>({})
  // can be removed. need to test
  const [cartBlockUpdated, setCartBlockUpdated] = useState<boolean | null>(null)

  const navigate = useNavigate() // Hook to redirect

  const [triggerGetCartSummary, {data: summary, isFetching: isLoading}] =
    useLazyGetCartSummaryQuery()

  useEffect(() => {
    if (seconds > 0) {
      const timer = setInterval(() => {
        setSeconds(prev => prev - 1)
      }, 1000)

      // Cleanup on unmount
      return () => clearInterval(timer)
    }
  }, [seconds])

  useEffect(() => {
    apiService
      .get('/api/v1/auth/me', localStorage.getItem('authToken') ?? '')
      .then((authResponse: any) => {
        setUser(authResponse.data)
      })
      .catch(err => setError(err.message))
  }, [])

  useEffect(() => {
    if (selectedSlots.length > 0) {
      // can be removed. need to test
      setCartBlockUpdated(true)
      apiService
        .post('/api/v1/block-slots', selectedSlots, localStorage.getItem('authToken') ?? '')
        .then((authResponse: any) => {
          if (authResponse.data) {
            setSeconds(authResponse.data.timeOut)
            setShowTimer(true)
            triggerGetCartSummary(selectedSlots)
            // Update unavailable addons state
            if (authResponse.data.unavailableAddons) {
              setUnavailableAddonsState(authResponse.data.unavailableAddons)
            } else {
              setUnavailableAddonsState({})
            }
            setCartBlockUpdated(false)
          }
        })
        .catch(err => {
          setError(err.message)
          setShowTimer(false)
          triggerGetCartSummary(selectedSlots)
          setCartBlockUpdated(false)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSlots])

  const formatTimeInSeconds = (secs: number) => {
    const minutes = Math.floor(secs / 60)
    const remainingSeconds = secs % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const removeCartItem = (key: string) => {
    dispatch(aRemoveFromBookingCart(key))
  }

  const updateCartItem = useCallback((key: string, addOnId: string) => {
    dispatch(aAddOnsToBookingCart({key, addOnId}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const changePaymentSource = (event: any) => {
    setPaymentSource(event.target.value)
  }

  const submitBooking = () => {
    setIsOrderInProgress(true)
    const bookingData = {
      cart: selectedSlots,
      personal_information: JSON.parse(localStorage.getItem('personalInformation') ?? ''),
      location: locationId,
      type: bookingType,
      payment_source: paymentSource,
      payment_method: selectedPaymentMethod,
      user_consent_time: userConsentTime,
    }
    apiService
      .post('/api/v1/create-booking', bookingData, localStorage.getItem('authToken') ?? '')
      .then((response: any) => {
        navigate(`/booking/summary/${response.data.ref_code}`) // Redirect if coach not found
        setIsOrderInProgress(false)
      })
      .catch(err => {
        setError(`${err.data || err.message}. Please try again.`)
        window?.scrollTo({
          top: 0,
          behavior: 'smooth', // Smooth scrolling
        })
        if (err.data && err.data == 'Timeout') {
          alert('Request timeout.')
          navigate('/')
        }
        setIsOrderInProgress(false)
      })
  }

  const [userConsentTime, setUserConsentTime] = useState<any>(null)

  const handleConsentClick = (event: any) => {
    setUserConsentTime(event.target.checked ? new Date() : null)
  }

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<any>(null)

  const handlePaymentMethod = (paymentMethod: string | null) => {
    setSelectedPaymentMethod(paymentMethod)
  }

  const selectedAddOnCounts = useMemo(() => {
    const counts: Record<string, number> = {}

    selectedSlots.forEach(item => {
      item?.lane?.addons?.forEach((addOn: any) => {
        const isAddOnSelected = item?.addOns?.includes(addOn.id)
        if (isAddOnSelected) {
          if (!counts[addOn.id]) {
            counts[addOn.id] = 0
          }
          counts[addOn.id]++
        }
      })
    })

    return counts
  }, [selectedSlots])

  // Generate warnings
  const warnings = useMemo(() => {
    const addOnWarnings: Record<string, ReactElement> = {}

    // Generate warnings based on addonAvailabilityState
    selectedSlots.forEach(item => {
      const slotStart = item?.slot?.start

      item?.lane?.addons?.forEach((addOn: any) => {
        const isAddOnSelected = item?.addOns?.includes(addOn.id)
        const currentCount = summary?.addOnAvailability?.[slotStart]?.[addOn.id] ?? 0

        if (isAddOnSelected) {
          if (
            (currentCount > 0 || currentCount < 0) &&
            selectedAddOnCounts[addOn.id] > currentCount &&
            !addOnWarnings[addOn.id]
          ) {
            addOnWarnings[addOn.id] = (
              <span>
                Unfortunately, <strong className="fs-6">{addOn.name}</strong> has a limited
                availability. Please select it only for{' '}
                <strong className="fs-6">
                  {selectedAddOnCounts[addOn.id] - Math.abs(currentCount)}
                </strong>{' '}
                slot(s) and remove the others to proceed with the order.
              </span>
            )
          } else if (
            summary?.addOnAvailability?.[slotStart]?.[addOn.id] === 0 &&
            unavailableAddonsState?.[slotStart]?.includes(addOn.id) &&
            !addOnWarnings[addOn.id]
          ) {
            addOnWarnings[addOn.id] = (
              <span>
                Unfortunately, <strong className="fs-6">{addOn.name}</strong> is sold out. Please
                adjust your selections to proceed the order.
              </span>
            )
          }
        }
      })
    })

    return Object.values(addOnWarnings)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [summary])

  const addOnAvailability = useMemo(() => {
    const availability: Record<string, boolean> = {}

    selectedSlots.forEach(item => {
      const slotStart = item?.slot?.start

      item?.lane?.addons?.forEach((addOn: any) => {
        const addOnCount = summary?.addOnAvailability?.[slotStart]?.[addOn.id] || 0
        const isAddOnSelected = item?.addOns?.includes(addOn.id)
        const addOnLimitExceeded =
          addOnCount === 0 &&
          (!isAddOnSelected || unavailableAddonsState?.[slotStart]?.includes(addOn.id))
        const currentUnavailable =
          (addOnCount > 0 || addOnCount < 0) && selectedAddOnCounts[addOn.id] > addOnCount

        availability[`${item.key}_${addOn.id}`] = addOnLimitExceeded || currentUnavailable
      })
    })

    return availability
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [summary])

  return (
    <div>
      {!isLoading && selectedSlots.length === 0 && <Loader />}
      <>
        {/* Breadcrumb */}
        <div className="breadcrumb mb-0">
          <span className="primary-right-round" />
          <div className="container">
            <h1 className="text-white">Payment</h1>
            <ul>
              <li>
                <Link to={routes.home}>Home</Link>
              </li>
              <li>Payment</li>
            </ul>
          </div>
        </div>
        <BookingFlowBreadCrumb />
        <div className="content hexagon-background">
          <div className="container">
            <section>
              <div className="text-center">
                {error && <div className="alert alert-danger text-left my-4">{error}</div>}
                <h3 className="mb-1">Payment</h3>
                <p className="sub-title">
                  Securely make your payment for the booking. Contact support for assistance.
                </p>
              </div>
              <div className="alert alert-secondary text-left my-4">
                <strong>Cancellations:</strong> Once your booking has been made and you have
                received your confirmation email – no refunds or credits will be given if any
                cancellations take place within 48 hours of the activity commencing. If a
                cancellation is made with more than 48 hours’ notice then you will be given credit
                to use at the Centre, you will not be given a monetary refund.
              </div>
              <div className="row checkout">
                <div className="col-12 col-sm-12 col-md-12 col-lg-7">
                  <div className="card booking-details">
                    <h3 className="border-bottom">Order Summary</h3>
                    {showTimer ? (
                      <div>
                        <h6 className="float-end">Time Left: {formatTimeInSeconds(seconds)}</h6>
                      </div>
                    ) : (
                      ''
                    )}
                    <h4>Booked slots</h4>
                    <div className="row">
                      {(summary?.unavailable_slots?.length ?? 0) > 0 && (
                        <div className="alert alert-danger mt-3">
                          <p className="mb-0">
                            Unfortunately, a selected{' '}
                            {summary?.unavailable_slots?.length === 1 ? 'slot' : 'slots'} has been
                            booked by another user in the meantime. Please remove the{' '}
                            <strong className="fs-6">Not available</strong>{' '}
                            {summary?.unavailable_slots?.length === 1 ? 'slot' : 'slots'} to
                            continue.
                          </p>
                        </div>
                      )}
                      {/* display addon warnings only when no slot warnings */}
                      {summary?.unavailable_slots?.length === 0 &&
                      warnings.length > 0 &&
                      !isLoading &&
                      !cartBlockUpdated ? (
                        <div className="alert alert-danger mt-3">
                          {warnings.map((warning, index) => (
                            <p className="mb-0 text-danger" key={index}>
                              {warning}
                            </p>
                          ))}
                        </div>
                      ) : null}
                      <List
                        itemLayout="horizontal"
                        dataSource={selectedSlots}
                        pagination={{
                          onChange: page => {
                            console.log(page)
                          },
                          pageSize: 5,
                          hideOnSinglePage: true,
                        }}
                        renderItem={item => {
                          const slotStart = item?.slot?.start

                          // Ensure addonAvailabilityState is initialized for this slot
                          if (!summary?.addOnAvailability?.[slotStart]) {
                            return null // Or a placeholder while the state initializes
                          }

                          return (
                            <List.Item
                              actions={[
                                <span
                                  key="list-item"
                                  onClick={() => removeCartItem(item.key)}
                                  className="btn btn-outline-secondary fas fa-xmark float-right px-2 py-2"
                                ></span>,
                              ]}
                            >
                              <div className="payment-pg-booking-slot" key={item?.key}>
                                <p className="fw-semibold text-black px-0">
                                  {item?.coach
                                    ? `${item?.coach.last_name} @${item?.lane?.name}`
                                    : item?.lane?.name}{' '}
                                  : {formatToLongDate(item?.slot?.start)} ,{' '}
                                  {formatTime(item?.slot?.start)} - {formatTime(item?.slot?.end)}{' '}
                                  <span className="badge badge-success">
                                    {getFormattedCurrency(item?.slot?.rate)}
                                  </span>
                                  <span
                                    className={`badge badge-danger ${summary?.unavailable_slots?.includes(item.key) ? '' : 'hidden'}`}
                                  >
                                    Not available
                                  </span>
                                  <span className="badge badge-danger">
                                    {item?.slot?.participants
                                      ? `${item?.slot?.participants == 1 ? '1 to 1' : item?.slot?.participants == 2 ? 'Group (2)' : 'Group (3/4)'}`
                                      : ''}
                                  </span>
                                </p>
                                {item?.lane?.addons?.map((addOn: any) => {
                                  const slotStart = item?.slot?.start
                                  const addOnCount =
                                    summary?.addOnAvailability?.[slotStart]?.[addOn.id] || 0
                                  const isAddOnSelected = item?.addOns?.includes(addOn.id)
                                  console.log({test: addOnCount})
                                  // const isUnavailable = (addOnCount === 0 && (!isAddOnSelected || unavailableAddonsState?.[slotStart]?.includes(addon.id))) || ((addOnCount > 0 || addOnCount < 0) && selectedAddOnCounts[addon.id] > addOnCount);
                                  const isUnavailable =
                                    addOnAvailability[`${item.key}_${addOn.id}`] || false
                                  return (
                                    <div key={addOn.id} className="form-check">
                                      <input
                                        className="form-check-input checkbox-margin"
                                        type="checkbox"
                                        checked={isAddOnSelected}
                                        disabled={!isAddOnSelected ? isUnavailable : false}
                                        onChange={() => updateCartItem(item?.key, addOn?.id)}
                                      />
                                      <label className="form-check-label">
                                        {addOn?.name}{' '}
                                        <span className="text-success">
                                          (+{getFormattedCurrency(addOn?.price)}){' '}
                                        </span>
                                        {isUnavailable && (
                                          <span className="badge badge-danger addon-style">
                                            Not Available
                                          </span>
                                        )}
                                      </label>
                                    </div>
                                  )
                                })}
                              </div>
                            </List.Item>
                          )
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-5">
                  <aside className="card payment-modes">
                    <div className="row border-bottom pb-3 align-items-center">
                      <div className="col-6 col-md-8">
                        <h3 className="mb-0">Checkout</h3>
                      </div>
                      <div className="col-6 col-md-4">
                        <a href="https://stripe.com" target="_blank" rel="noopener noreferrer">
                          <ImageWithBasePath src="assets/img/stripe_logo.jpg" alt="Icon" />
                        </a>
                      </div>
                    </div>
                    <h6 className="mb-3">Select Payment Method</h6>
                    <div className="radio">
                      <div className="form-check form-check-inline mb-3">
                        <input
                          className="form-check-input default-check me-2"
                          type="radio"
                          checked={paymentSource == 'STRIPE'}
                          name="paymentSource"
                          onClick={changePaymentSource}
                          id="paymentSourceStripe"
                          value="STRIPE"
                        />
                        <label className="form-check-label" htmlFor="paymentSourceStripe">
                          Credit Card
                        </label>
                      </div>

                      <div className={`${paymentSource == 'STRIPE' ? '' : 'hidden'}`}>
                        <Elements stripe={stripePromise}>
                          <CheckoutForm onPaymentMethodSelect={handlePaymentMethod} />
                        </Elements>
                        {selectedPaymentMethod?.id && (
                          <p>Selected Payment Method ID: {selectedPaymentMethod.id}</p>
                        )}
                      </div>

                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input default-check me-2"
                          type="radio"
                          checked={paymentSource == 'WALLET'}
                          onClick={changePaymentSource}
                          name="paymentSource"
                          disabled={(user?.credit_balance ?? 0) < (summary?.total ?? 0)}
                          id="paymentSourceWallet"
                          value="WALLET"
                        />
                        <label className="form-check-label" htmlFor="paymentSourceWallet">
                          Wallet{' '}
                          <span className="text-success">
                            ({getFormattedCurrency(user?.credit_balance)})
                          </span>
                        </label>
                      </div>
                    </div>
                    <hr />
                    <ul className="order-sub-total">
                      <li>
                        <p>Sub total</p>
                        <h6>{getFormattedCurrency(summary ? summary.sub_total : 0)}</h6>
                      </li>
                      <li>
                        <p>Add-Ons</p>
                        <h6>{getFormattedCurrency(summary ? summary.addOn_sum : 0)}</h6>
                      </li>
                      <li>
                        <p>Discount</p>
                        <h6>{getFormattedCurrency(summary ? summary.discount : 0)}</h6>
                      </li>
                    </ul>
                    <div className="order-total d-flex justify-content-between align-items-center">
                      <h5>Order Total</h5>
                      <h5>{getFormattedCurrency(summary ? summary?.total : 0)}</h5>
                    </div>
                    <div className="form-check d-flex justify-content-start align-items-center policy">
                      <div className="d-inline-block">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                          id="policy"
                          onClick={handleConsentClick}
                        />
                      </div>
                      <label className="form-check-label pt-3" htmlFor="policy">
                        By clicking <strong>Proceed</strong>, I accept the{' '}
                        <a href={routes.termsCondition} target="_blank" rel="noopener noreferrer">
                          Terms and conditions
                        </a>{' '}
                        of Net Hire.
                      </label>
                    </div>
                    <div className="btn-block">
                      <button
                        type="button"
                        className={`btn btn-primary w-100 ${(summary?.unavailable_slots?.length ?? 0) > 0 || !userConsentTime || isOrderInProgress || !summary?.canProceedOrder || (bookingType === 'coach' && process.env.REACT_APP_COACHING_DISABLED !== 'false') ? 'disabled' : ''}`}
                        onClick={submitBooking}
                      >
                        {isOrderInProgress && (
                          <span
                            className="inline-block spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        )}
                        <span className="inline-block px-2">
                          Proceed {getFormattedCurrency(summary ? summary?.total : 0)}
                        </span>
                      </button>
                    </div>
                  </aside>
                </div>
              </div>
            </section>
          </div>
          {/* Container */}
        </div>
        {/* /Page Content */}
      </>
    </div>
  )
}

export default Payment
