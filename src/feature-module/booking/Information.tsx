import React, {useEffect, useState, useRef, useCallback} from 'react'
import {Link, useLocation, useParams} from 'react-router-dom'
import {all_routes} from '../router/AllRoutes'
import {BookingFlowBreadCrumb} from '../common/BookingFlowBreadcrumb'
import {apiService} from '../../services/apiService'
import {formatTime, formatToLongDate, getFormattedCurrency} from '../../services/commonService'
import {useDispatch, useSelector} from 'react-redux'
import {aRemoveFromBookingCart} from '../../core/data/redux/action'
import {selectCartByBookingType} from '../../core/data/redux/selectors'
import {List} from 'antd'
import {useGetCartSummaryQuery} from '../../core/data/redux/cartApi'
import Loader from '../loader/Loader'
import {Dropdown} from 'primereact/dropdown'

type FormDataType = {
  first_name: string
  last_name: string
  contact_no: string
  email: string
  notes: string
}

type AdditionalPlayer = {
  first_name: string
  last_name: string
  medical_condition_details: string
}

type AdditionalPlayers = AdditionalPlayer[]

type ExtendedFormData = FormDataType & {
  participant_count: string
  other_participants?: AdditionalPlayers
}

const Information = () => {
  const {bookingType, locationId} = useParams<{bookingType: string; locationId: string}>()
  const dispatch = useDispatch()
  const selectedSlots = useSelector(state => selectCartByBookingType(state, bookingType))
  const routes = all_routes
  const backPage = `${routes.bookingType}/${bookingType}/location/${locationId}/add-ons`
  const nextPage = `${routes.bookingType}/${bookingType}/location/${locationId}/payment`
  const location = useLocation()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<any>(null)
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [error, setError] = useState<string | null>(null)
  const [isUserLoading, setIsUserLoading] = useState(false)
  const [participants, setParticipants] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState({
    first_name: '',
    last_name: '',
    contact_no: '',
    no_of_participants: '',
    additional_player_first_name: '',
    additional_player_last_name: '',
  }) // Error messages for each field

  const [formData, setFormData] = useState<FormDataType>({
    first_name: '',
    last_name: '',
    contact_no: '',
    email: '',
    notes: '',
  })

  const refs = {
    first_name: useRef<HTMLInputElement | null>(null),
    last_name: useRef<HTMLInputElement | null>(null),
    contact_no: useRef<HTMLInputElement | null>(null),
    no_of_participants: useRef<HTMLInputElement | null>(null),
    additional_players_first_name: useRef<(HTMLInputElement | null)[]>([]),
    additional_players_last_name: useRef<(HTMLInputElement | null)[]>([]),
  } // Refs for focusing fields

  const {data: summary, isLoading} = useGetCartSummaryQuery(selectedSlots, {
    skip: !selectedSlots?.length, // Skip query if no slots are selected
  })

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (token) {
      setIsUserLoading(true)
      apiService
        .get('/api/v1/auth/me', token)
        .then((authResponse: any) => {
          setUser(authResponse.data)
          setIsLoggedIn(true)
          setIsUserLoading(false)
        })
        .catch(err => {
          setError(err.message)
          setIsLoggedIn(false)
          setIsUserLoading(false)
        })
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  const [bookingFor, setBookingFor] = useState<'myself' | 'someoneElse'>('myself')
  const [additionalPlayers, setAdditionalPlayers] = useState([
    {first_name: '', last_name: '', medical_condition_details: ''},
  ])

  // Handle radio button change
  const handleBookingForChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookingFor(e.target.value as 'myself' | 'someoneElse')
  }

  const savedData = localStorage.getItem('personalInformation')
  useEffect(() => {
    if (savedData) {
      setFormData(JSON.parse(savedData))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    if (user && !savedData) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        contact_no: user.contact_no || '',
        email: user.email || '',
        notes: user.notes || '',
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])
  const handleInputChange = (e: any) => {
    const {name, value} = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }))
    // Clear specific error message as the user starts typing
    setErrorMessage(prevErrors => ({
      ...prevErrors,
      [name]: '',
    }))
  }
  const addPersonalDetails = () => {
    const updatedFormData: ExtendedFormData = {
      ...formData,
      participant_count: participants || '',
    }
    // then conditionally add other_participants
    if (bookingFor === 'someoneElse') {
      updatedFormData.other_participants = additionalPlayers
    }
    localStorage.setItem('personalInformation', JSON.stringify(updatedFormData))
  }

  const showAdditionalFields =
    bookingFor === 'someoneElse' ||
    (bookingFor === 'myself' &&
      !selectedSlots?.some((item: any) => Number(item.slot.participants) === 1))

  const validationCheck = useCallback(
    (e: any) => {
      let hasError = false
      console.log({participants})
      // Validation checks
      if (!formData.first_name.trim()) {
        console.log({test: formData.first_name})
        setErrorMessage(prev => ({...prev, first_name: 'First name is required.'}))
        refs.first_name.current?.focus()
        hasError = true
      } else if (!formData.last_name.trim()) {
        setErrorMessage(prev => ({...prev, last_name: 'Last name is required.'}))
        refs.last_name.current?.focus()
        hasError = true
      } else if (!formData.contact_no.trim()) {
        setErrorMessage(prev => ({...prev, contact_no: 'Phone number is required.'}))
        refs.contact_no.current?.focus()
        hasError = true
      } else if (bookingType === 'lane' && (!participants || participants.trim() === '')) {
        // Validation for no_of_participants
        setErrorMessage(prev => ({
          ...prev,
          no_of_participants: 'Number of participants is required.',
        }))
        refs.no_of_participants.current?.focus()
        hasError = true
      }

      // Additional player validation
      if (bookingType === 'coach' && showAdditionalFields) {
        for (let i = 0; i < additionalPlayers.length; i++) {
          if (!additionalPlayers[i].first_name.trim()) {
            setErrorMessage(prev => ({
              ...prev,
              additional_player_first_name: 'First name is required.',
            }))
            refs.additional_players_first_name.current[i]?.focus()
            hasError = true
          }
          if (!additionalPlayers[i].last_name.trim()) {
            setErrorMessage(prev => ({
              ...prev,
              additional_player_last_name: 'Last name is required.',
            }))
            refs.additional_players_last_name.current[i]?.focus()
            hasError = true
          }
        }
      }

      if (hasError) {
        e.preventDefault()
        return
      }

      addPersonalDetails()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formData, participants, additionalPlayers, showAdditionalFields]
  )

  const goBack = () => {
    localStorage.setItem('goBackPath', location.pathname)
  }

  const removeCartItem = (key: string) => {
    dispatch(aRemoveFromBookingCart(key))
  }

  const handleParticipants = (value: any) => {
    console.log({value: value.value})
    setParticipants(value.value) // Ensure the state is being updated correctly
    // Clear specific error message as the user starts typing
    setErrorMessage(prevErrors => ({
      ...prevErrors,
      no_of_participants: '',
    }))
  }

  // Handle input change for additional players
  const handlePlayerChange = (index: number, field: string, value: string) => {
    const updatedPlayers = [...additionalPlayers]
    // @ts-expect-error expect this
    updatedPlayers[index][field] = value
    setAdditionalPlayers(updatedPlayers)
    if (field === 'first_name') {
      setErrorMessage(prevErrors => ({
        ...prevErrors,
        additional_player_first_name: '',
      }))
    } else {
      setErrorMessage(prevErrors => ({
        ...prevErrors,
        additional_player_last_name: '',
      }))
    }
  }

  // Add a new player
  const addPlayer = () => {
    setAdditionalPlayers(prevPlayers => [
      ...prevPlayers,
      {first_name: '', last_name: '', medical_condition_details: ''},
    ])
    refs.additional_players_first_name.current.push(null)
  }

  return (
    <div>
      {!isLoading && selectedSlots.length === 0 && <Loader />}
      <>
        {/* Breadcrumb */}
        <section className="breadcrumb mb-0">
          <span className="primary-right-round" />
          <div className="container">
            <h1 className="text-white">Personal information</h1>
            <ul>
              <li>
                <Link to={routes.home}>Home</Link>
              </li>
              <li>Personal information</li>
            </ul>
          </div>
        </section>
        <BookingFlowBreadCrumb />
        <div className="content hexagon-background">
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-8">
                <section className="mb-40">
                  {!isLoggedIn && !isUserLoading && (
                    <div className="alert alert-info d-flex align-items-center">
                      <i className="fa-regular fa-user me-2" />
                      <p className="mb-0">
                        <Link className="text-primary" to={routes.login} onClick={goBack}>
                          Sign-in
                        </Link>{' '}
                        to book with your saved details or{' '}
                        <Link
                          className="text-primary"
                          to={`${routes.register}?roleType=user&referral=create-booking`}
                          onClick={goBack}
                        >
                          register
                        </Link>{' '}
                        to manage your bookings on the go!
                      </p>
                    </div>
                  )}
                  {isLoggedIn && (
                    <>
                      <div className="text-center mb-40">
                        <h3 className="mb-1">Personal Information</h3>
                        {/*<p className="sub-title">*/}
                        {/*    Ensure accurate and complete information for a smooth booking*/}
                        {/*    process.*/}
                        {/*</p>*/}
                      </div>
                      <div className="card">
                        <h3 className="border-bottom">Enter Details</h3>
                        <form className="row">
                          <div className="mb-3 col-12">
                            <label htmlFor="name" className="form-label">
                              First name
                            </label>
                            <input
                              type="text"
                              value={formData.first_name}
                              className="form-control"
                              id="first_name"
                              name="first_name"
                              placeholder="Enter Name"
                              ref={refs.first_name}
                              onChange={handleInputChange}
                              disabled
                            />
                            {errorMessage.first_name && (
                              <div className="text-danger mt-1">{errorMessage.first_name}</div>
                            )}
                          </div>
                          <div className="mb-3 col-12">
                            <label htmlFor="name" className="form-label">
                              Last Name
                            </label>
                            <input
                              type="text"
                              value={formData.last_name}
                              className="form-control"
                              id="last_name"
                              name="last_name"
                              placeholder="Enter Name"
                              ref={refs.last_name}
                              onChange={handleInputChange}
                              disabled
                            />
                            {errorMessage.last_name && (
                              <div className="text-danger mt-1">{errorMessage.last_name}</div>
                            )}
                          </div>
                          <div className="mb-3 col-12">
                            <label htmlFor="email" className="form-label">
                              Email
                            </label>
                            <input
                              type="email"
                              value={formData.email}
                              className="form-control"
                              id="email"
                              name="email"
                              placeholder="Enter Email Address"
                              onChange={handleInputChange}
                              disabled
                            />
                          </div>
                          <div className="mb-3 col-12 col-md-6">
                            <label htmlFor="name" className="form-label">
                              Phone Number *
                            </label>
                            <input
                              type="text"
                              value={formData.contact_no}
                              className="form-control"
                              id="contact_no"
                              name="contact_no"
                              placeholder="Enter Phone Number"
                              ref={refs.contact_no}
                              onChange={handleInputChange}
                            />
                            {errorMessage.contact_no && (
                              <div className="text-danger mt-1">{errorMessage.contact_no}</div>
                            )}
                          </div>
                          {bookingType === 'lane' && (
                            <div className="mb-1 col-12 col-md-6">
                              <label htmlFor="no_of_participants" className="form-label">
                                No of Players (max 4) **
                              </label>
                              <Dropdown
                                focusInputRef={refs.no_of_participants}
                                id="no_of_participants"
                                value={participants}
                                onChange={handleParticipants}
                                options={[
                                  {value: '1', name: '1'},
                                  {value: '2', name: '2'},
                                  {value: '3', name: '3'},
                                  {value: '4', name: '4'},
                                ]}
                                optionLabel="name"
                                className="coach-type-select w-100"
                                style={{
                                  border: '2px solid #EAEDF0',
                                  padding: '5px',
                                  borderRadius: '10px',
                                }}
                              />
                              {errorMessage.no_of_participants && (
                                <div className="text-danger mt-1">
                                  {errorMessage.no_of_participants}
                                </div>
                              )}
                            </div>
                          )}
                          {bookingType === 'lane' && (
                            <div className="mb-2 col-12">
                              <div className="alert alert-secondary mt-4 text-danger">
                                ** Please note: A maximum of 4 players per one hour session is
                                permitted inside each net. Additional people will NOT be permitted
                                to swap with those in the net, wait in the kit bag or waiting areas.
                                During the current winter season: ONE additional player is allowed
                                per session at the cost of £5 per hour. If required, please select
                                ‘Additional player’ as an Add-On.
                              </div>
                            </div>
                          )}
                          {bookingType === 'coach' && (
                            <>
                              {/* Who are you booking for? */}
                              <div className="mb-3">
                                <label className="form-label">Who are you booking for?</label>
                                <div>
                                  <label className="form-check-label me-3">
                                    <input
                                      type="radio"
                                      name="bookingFor"
                                      value="myself"
                                      checked={bookingFor === 'myself'}
                                      onChange={handleBookingForChange}
                                      className="form-check-input me-2"
                                    />
                                    For myself
                                  </label>
                                  <label className="form-check-label">
                                    <input
                                      type="radio"
                                      name="bookingFor"
                                      value="someoneElse"
                                      checked={bookingFor === 'someoneElse'}
                                      onChange={handleBookingForChange}
                                      className="form-check-input me-2"
                                    />
                                    Booking for someone else
                                  </label>
                                </div>
                              </div>
                              {/* Additional Fields */}
                              {showAdditionalFields && (
                                <div>
                                  <p className="text-dark mt-2">{`Please add information of ${bookingFor === 'myself' ? 'other' : ''} players`}</p>
                                  {additionalPlayers.map((player, index) => (
                                    <div key={index} className="card mb-3 p-3">
                                      {/*<h6>Player {index + 1}</h6>*/}
                                      <div className="row">
                                        <div className="mb-3 col-12 col-md-6">
                                          <label
                                            htmlFor={`player-first-name-${index}`}
                                            className="form-label"
                                          >
                                            First Name *
                                          </label>
                                          <input
                                            type="text"
                                            id={`player-first-name-${index}`}
                                            value={player.first_name}
                                            onChange={e =>
                                              handlePlayerChange(
                                                index,
                                                'first_name',
                                                e.target.value
                                              )
                                            }
                                            ref={el =>
                                              (refs.additional_players_first_name.current[index] =
                                                el)
                                            }
                                            className="form-control"
                                            placeholder="Enter first name"
                                          />
                                          {errorMessage.additional_player_first_name && (
                                            <div className="text-danger mt-1">
                                              {errorMessage.additional_player_first_name}
                                            </div>
                                          )}
                                        </div>
                                        <div className="mb-3 col-12 col-md-6">
                                          <label
                                            htmlFor={`player-last-name-${index}`}
                                            className="form-label"
                                          >
                                            Last Name *
                                          </label>
                                          <input
                                            type="text"
                                            id={`player-last-name-${index}`}
                                            value={player.last_name}
                                            onChange={e =>
                                              handlePlayerChange(index, 'last_name', e.target.value)
                                            }
                                            className="form-control"
                                            placeholder="Enter last name"
                                          />
                                          {errorMessage.additional_player_last_name && (
                                            <div className="text-danger mt-1">
                                              {errorMessage.additional_player_last_name}
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                      <div className="mb-3">
                                        <label
                                          htmlFor={`medical-conditions-${index}`}
                                          className="form-label"
                                        >
                                          Medical History (injuries / allergies)
                                        </label>
                                        <textarea
                                          id={`medical-conditions-${index}`}
                                          value={player.medical_condition_details}
                                          onChange={e =>
                                            handlePlayerChange(
                                              index,
                                              'medical_condition_details',
                                              e.target.value
                                            )
                                          }
                                          className="form-control"
                                          placeholder="Enter any medical conditions"
                                        />
                                      </div>
                                    </div>
                                  ))}
                                  <button
                                    type="button"
                                    onClick={addPlayer}
                                    className="btn btn-outline-secondary mb-3"
                                  >
                                    <i className="fa-solid fa-plus"></i> Add Another Player
                                  </button>
                                </div>
                              )}
                            </>
                          )}

                          <div className="col-12">
                            <label htmlFor="comments" className="form-label">
                              Notes
                            </label>
                            <textarea
                              className="form-control"
                              value={formData.notes}
                              id="notes"
                              name="notes"
                              rows={3}
                              placeholder="Any Notes"
                              defaultValue={''}
                              onChange={handleInputChange}
                            />
                          </div>
                        </form>
                      </div>
                    </>
                  )}
                </section>
              </div>
              <div className="col-12 col-lg-4">
                {selectedSlots?.length > 0 && (
                  <div className="card">
                    <div className="row justify-content-between align-items-start">
                      <div className="col-12 col-lg-auto">
                        <h4 className="mb-10">
                          Booked <span className="slots-counter">{selectedSlots.length}</span>{' '}
                          {`slot${selectedSlots.length === 1 ? '' : 's'} - ${getFormattedCurrency(summary ? summary.total : 0)}`}
                        </h4>
                      </div>
                      {/*{cartData?.length > 0 && (*/}
                      {/*    <div className="col-12 col-lg-auto">*/}
                      {/*        <div className="text-end">*/}
                      {/*            <Link*/}
                      {/*                className="btn btn-outline-secondary btn-icon"*/}
                      {/*                to={backPage}*/}
                      {/*            >*/}
                      {/*                Edit <i className="fas fa-cart-plus m-1" />*/}
                      {/*            </Link>*/}
                      {/*        </div>*/}
                      {/*    </div>*/}
                      {/*)}*/}
                    </div>
                    <List
                      itemLayout="horizontal"
                      dataSource={selectedSlots}
                      pagination={{
                        onChange: page => {
                          console.log(page)
                        },
                        pageSize: 10,
                        hideOnSinglePage: true,
                      }}
                      renderItem={item => (
                        <List.Item
                          actions={[
                            <span
                              key="list-item"
                              onClick={() => removeCartItem(item?.key)}
                              className="btn btn-outline-secondary fas fa-xmark float-right px-2 py-2"
                            ></span>,
                          ]}
                        >
                          <List.Item.Meta
                            title={item?.lane?.name}
                            description={
                              <mark>{`${formatToLongDate(item?.slot.start)} at ${formatTime(item?.slot.start)} - ${formatTime(item?.slot.end)}`}</mark>
                            }
                          />
                        </List.Item>
                      )}
                    />
                    <div className="text-center mt-4">
                      <Link className="btn btn-outline-secondary me-3 btn-icon" to={backPage}>
                        <i className="feather-arrow-left-circle me-1" /> Back
                      </Link>
                      <Link
                        className={`btn btn-secondary btn-icon ${!isLoggedIn ? 'disabled' : ''}`}
                        onClick={validationCheck}
                        to={isLoggedIn ? nextPage : '#'}
                      >
                        Continue <i className="feather-arrow-right-circle ms-1" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* /Container */}
        </div>

        {/* /Page Content */}
      </>
    </div>
  )
}

export default Information
