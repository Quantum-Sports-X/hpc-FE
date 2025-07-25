import React, {useEffect, useMemo, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import {all_routes} from '../router/AllRoutes'
import {BookingFlowBreadCrumb} from '../common/BookingFlowBreadcrumb'
import {getFormattedCurrency, formatTime, formatToLongDate} from '../../services/commonService'
import {apiService} from '../../services/apiService'
import {useDispatch, useSelector} from 'react-redux'
import {aAddOnsToBookingCart, aRemoveFromBookingCart} from '../../core/data/redux/action'
import {useGetCartSummaryQuery} from '../../core/data/redux/cartApi'
import {selectCartByBookingType} from '../../core/data/redux/selectors'
import Loader from '../loader/Loader'
import {List} from 'antd'

const AddOns = () => {
  const {bookingType, locationId} = useParams<{bookingType: string; locationId: string}>()
  const dispatch = useDispatch()
  const selectedSlots = useSelector(state => selectCartByBookingType(state, bookingType))
  const routes = all_routes
  const backPage = `${routes.bookingType}/${bookingType}/location/${locationId}/time&date`
  const nextPage = `${routes.bookingType}/${bookingType}/location/${locationId}/personal-information`
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [_error, setError] = useState<string | null>(null)
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [_user, setUser] = useState<any>(null)

  const {data: summary, isLoading, refetch} = useGetCartSummaryQuery(selectedSlots)

  useEffect(() => {
    if (selectedSlots.length > 0) {
      refetch()
    }
  }, [selectedSlots, refetch])

  const [addonAvailabilityState, setAddonAvailabilityState] = useState<
    Record<string, Record<string, number>>
  >({})

  useEffect(() => {
    if (summary?.addOnAvailability && Object.keys(addonAvailabilityState).length === 0) {
      const counts: Record<string, number> = {}

      // Count the selected add-ons
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

      // Update state with API response and selected counts
      const updatedAddonAvailabilityState: Record<string, Record<string, number>> = {}

      Object.entries(summary.addOnAvailability).forEach(([slotStart, addonData]) => {
        updatedAddonAvailabilityState[slotStart] = {}
        Object.entries(addonData).forEach(([addOnId, availableCount]) => {
          const selectedCount = counts[addOnId] || 0
          updatedAddonAvailabilityState[slotStart][addOnId] = availableCount - selectedCount
        })
      })

      setAddonAvailabilityState(updatedAddonAvailabilityState)
    }
  }, [summary, selectedSlots, addonAvailabilityState])

  useEffect(() => {
    apiService
      .get('/api/v1/auth/me', localStorage.getItem('authToken') ?? '')
      .then((authResponse: any) => {
        setUser(authResponse.data)
      })
      .catch(err => setError(err.message))
  }, [])

  const removeCartItem = (key: string) => {
    dispatch(aRemoveFromBookingCart(key))
  }

  const updateCartItem = (key: string, addOnId: string) => {
    dispatch(aAddOnsToBookingCart({key, addOnId}))
    const updatedSlots = selectedSlots.map(slot => {
      if (slot.key === key) {
        const isSelected = slot.addOns?.includes(addOnId)
        const updatedAddOns = isSelected
          ? slot.addOns.filter((id: string) => id !== addOnId)
          : [...(slot.addOns || []), addOnId]

        return {...slot, addOns: updatedAddOns}
      }
      return slot
    })
    setAddonAvailabilityState(prevState => {
      const slotStart = updatedSlots.find(slot => slot.key === key)?.slot.start
      if (!slotStart) return prevState

      const currentCount = prevState[slotStart]?.[addOnId] || 0
      const isSelected = updatedSlots.find(slot => slot.key === key)?.addOns?.includes(addOnId)
      const newCount = isSelected ? currentCount - 1 : currentCount + 1

      return {
        ...prevState,
        [slotStart]: {
          ...prevState[slotStart],
          [addOnId]: newCount,
        },
      }
    })
  }

  const addOnAvailability = useMemo(() => {
    const availability: Record<string, boolean> = {}

    selectedSlots.forEach(item => {
      const slotStart = item?.slot?.start

      item?.lane?.addons?.forEach((addOn: any) => {
        const addOnCount = addonAvailabilityState?.[slotStart]?.[addOn.id] || 0
        const isAddOnSelected = item?.addOns?.includes(addOn.id)

        availability[`${item.key}_${addOn.id}`] = addOnCount <= 0 && !isAddOnSelected
      })
    })

    return availability
  }, [addonAvailabilityState, selectedSlots])

  return (
    <div>
      {!isLoading && selectedSlots.length === 0 && <Loader />}
      <>
        {/* Breadcrumb */}
        <div className="breadcrumb mb-0">
          <span className="primary-right-round" />
          <div className="container">
            <h1 className="text-white">Choose Add-Ons</h1>
            <ul>
              <li>
                <Link to={routes.home}>Home</Link>
              </li>
              <li>Add-Ons</li>
            </ul>
          </div>
        </div>
        <BookingFlowBreadCrumb />
        <div className="content hexagon-background">
          <div className="container">
            <section>
              <div className="text-center mb-40">
                <h3 className="mb-1">Do you need add-ons?</h3>
                <p>The maximum lane capacity in each lane is 4 people.</p>
                <p>
                  During the current winter season: ONE additional player is allowed per session at
                  the cost of £5 per hour. If required, please select ‘Additional player’ checkbox
                  below for each lane/time slot.
                </p>
              </div>
              <div className="row checkout">
                <div className="col-12 col-sm-12 col-md-12 col-lg-7">
                  <div className="card booking-details">
                    <h3>Choose Add-Ons</h3>
                    <div className="row">
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
                          if (!addonAvailabilityState[slotStart]) {
                            return <Loader /> // Or a placeholder while the state initializes
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
                                </p>
                                {item?.lane?.addons?.map((addOn: any) => {
                                  const isAddOnSelected = item?.addOns?.includes(addOn.id)

                                  const isUnavailable =
                                    addOnAvailability[`${item.key}_${addOn.id}`] || false

                                  return (
                                    <div key={addOn.id} className="form-check">
                                      <input
                                        className="form-check-input checkbox-margin"
                                        type="checkbox"
                                        checked={isAddOnSelected}
                                        disabled={isUnavailable}
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
                    <h3 className="border-bottom">Checkout</h3>
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
                      <h5>{getFormattedCurrency(summary ? summary.total : 0)}</h5>
                    </div>
                    <div className="text-center mt-4">
                      <Link className="btn btn-outline-secondary me-3 btn-icon" to={backPage}>
                        <i className="feather-arrow-left-circle me-1" /> Back
                      </Link>
                      <Link className="btn btn-secondary btn-icon" to={nextPage}>
                        Continue <i className="feather-arrow-right-circle ms-1" />
                      </Link>
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

export default AddOns
