import React, {useEffect, useState} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {
  aAddToBookingCart,
  aRemoveFromBookingCart,
  aResetBookingCart,
} from '../../core/data/redux/action'
import Slider_ from 'react-slick'
import {all_routes} from '../router/AllRoutes'
import {apiService} from '../../services/apiService'
import {
  formatDateToYMD,
  formatTime,
  formatToLongDate,
  getFormattedCurrency,
} from '../../services/commonService'
import {Calendar} from 'primereact/calendar'
import {BookingFlowBreadCrumb} from '../common/BookingFlowBreadcrumb'
import ImageWithBasePath from '../../core/data/img/ImageWithBasePath'
import {useGetCartSummaryQuery} from '../../core/data/redux/cartApi'
import {selectCartByBookingType} from '../../core/data/redux/selectors'
import {Skeleton, Space} from 'antd'
import {Grid, List} from 'antd'
import {Dropdown} from 'primereact/dropdown'
import {AvailabilityResponse} from '../../core/data/interface/model'

const {useBreakpoint} = Grid

const Slider = Slider_ as unknown as React.ComponentType<any>

interface Location {
  id: number
  name: string
  description: string | null
  content: string | null
  thumbnail: string | null
  slug: string
  status: number
  created_at: string
  updated_at: string
  rating: string
  review_count: number
  address: string
  phone_no: string
  latitude: number | null
  longitude: number | null
  embed_url: string
}

interface Lane {
  id: number
  location_id: number
  name: string
  description: string | null
  content: string | null
  thumbnail: string | null
  slug: string
  status: number
  created_at: string
  updated_at: string
  rating: string
  review_count: number
  rate: string
  location: Location
}

interface SlotType {
  start: string
  end: string
  rate: number
}

const Availability = () => {
  const screens = useBreakpoint()
  const {bookingType, locationId} = useParams<{bookingType: string; locationId: string}>()
  const queryParams = new URLSearchParams(location.search)
  const coachesId = queryParams.get('coaches_id') // retrieves 'coach' if present
  const coachesName = queryParams.get('coaches_name')
  const coachesIdFromQuery = coachesId ? Number(coachesId) : undefined
  const dispatch = useDispatch()
  const selectedSlots = useSelector(state => selectCartByBookingType(state, bookingType))
  const [availability, setData] = useState<AvailabilityResponse>([])
  const navigate = useNavigate() // Hook to redirect
  // eslint-disable-next-line no-unused-vars
  const [_error, setError] = useState<string | null>(null)
  const bookingDate =
    selectedSlots && selectedSlots.length !== 0
      ? new Date(selectedSlots[selectedSlots?.length - 1]?.slot?.start)
      : new Date()
  const [date, setDate] = useState<Date | null>(bookingDate)
  const players =
    selectedSlots && selectedSlots.length !== 0
      ? selectedSlots[selectedSlots?.length - 1]?.slot?.participants
      : '1'
  const [participants, setParticipants] = useState<string | null>(players)
  const coachId =
    selectedSlots && selectedSlots.length !== 0
      ? selectedSlots[selectedSlots?.length - 1]?.coach?.id
      : coachesIdFromQuery
  const coachFirstName =
    selectedSlots && selectedSlots.length !== 0
      ? selectedSlots[selectedSlots?.length - 1]?.coach?.first_name
      : coachesName
  const [selectedCoachId, setSelectedCoachId] = useState<number | null | undefined>(coachId)
  const [selectedCoachName, setSelectedCoachName] = useState<string | null | undefined>(
    coachFirstName
  )
  const today = new Date()
  const [isLoading, setIsLoading] = useState<boolean | null>(false)

  const {data: summary, refetch} = useGetCartSummaryQuery(selectedSlots, {
    skip: !selectedSlots?.length, // Skip query if no slots are selected
  })

  useEffect(() => {
    if (selectedSlots && selectedSlots.length !== 0) {
      refetch()
    }
  }, [refetch, selectedSlots])

  useEffect(() => {
    // set coach dropdown only when coach data loads for the first time
    if (bookingType === 'coach' && availability) {
      const selectCoach = Object.entries(availability).map(
        ([_, availabilityData]) => availabilityData
      )[0]?.coach
      setSelectedCoachId(selectedCoachId ?? selectCoach?.id)
      setSelectedCoachName(selectedCoachName ?? selectCoach?.first_name)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availability, selectedCoachId])

  // Set the max date to three months from now
  const maxDate = new Date()
  maxDate.setMonth(today.getMonth() + 6) // Add 6 months to the current date
  const handleDateChange = (e: any) => {
    setDate(e.value) // Ensure the state is being updated correctly
  }
  const handleParticipants = (value: any) => {
    setParticipants(value.value) // Ensure the state is being updated correctly
  }
  const handleCoaches = (value: any) => {
    const selectedCoachName = Object.entries(availability).find(
      ([, availabilityData]) => availabilityData?.coach?.id === value.value
    )?.[1]?.coach?.first_name
    setSelectedCoachId(value.value) // Ensure the state is being updated correctly
    setSelectedCoachName(selectedCoachName)
  }
  useEffect(() => {
    console.log({selectedSlots: selectedSlots[selectedSlots?.length - 1]?.slot?.start})
    const bookingDate =
      selectedSlots && selectedSlots.length !== 0
        ? new Date(selectedSlots[selectedSlots?.length - 1]?.slot?.start)
        : new Date()
    const dateString = formatDateToYMD(date ?? bookingDate)
    if (bookingType == 'lane') {
      setIsLoading(true)
      apiService
        .get(
          `/api/v1/location/${locationId}/availability?date=${dateString}`,
          localStorage.getItem('authToken') ?? ''
        )
        .then((response: any) => {
          if (!response || response.data === null) {
            navigate('/error-404') // Redirect if coach not found
          } else {
            setIsLoading(false)
            setData(response.data) // Set availability data
          }
        })
        .catch(err => {
          setIsLoading(false)
          setError(err.message)
        })
    } else {
      setIsLoading(true)
      apiService
        .get(
          `/api/v1/location/${locationId}/coach/availability?date=${dateString}&participants=${participants}`,
          localStorage.getItem('authToken') ?? ''
        )
        .then((response: any) => {
          if (!response || response.data === null) {
            navigate('/error-404') // Redirect if coach not found
          } else {
            setIsLoading(false)
            setData(response.data) // Set coach data
            console.log(availability)
          }
        })
        .catch(err => {
          setIsLoading(false)
          setError(err.message)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, date, participants])
  const routes = all_routes
  const handleTimeSlotClick = (slot: SlotType, lane: Lane, coach?: any) => {
    dispatch(aAddToBookingCart({slot, lane, coach}))
  }
  const nextPage = `${routes.bookingType}/${bookingType}/location/${locationId}/add-ons`
  const removeCartItem = (key: string) => {
    dispatch(aRemoveFromBookingCart(key))
  }

  const featuredLanesSlider = {
    dots: false,
    autoplay: false,
    slidesToShow: screens.lg ? 4 : 1,
    margin: 20,
    infinite: false,
    speed: 500,
  }

  const clearCart = () => {
    dispatch(aResetBookingCart())
  }

  return (
    <div>
      <>
        {/* Breadcrumb */}
        <div className="breadcrumb mb-0">
          <span className="primary-right-round" />
          <div className="container">
            <h1 className="text-white">{bookingType === 'coach' ? 'Coaching' : 'Net Hire'}</h1>
            <ul>
              <li>
                <Link to={routes.home}>Home</Link>
              </li>
              <li>{bookingType === 'coach' ? 'coaching' : 'Net Hire'}</li>
            </ul>
          </div>
        </div>
        {/* /Breadcrumb */}
        <BookingFlowBreadCrumb />
        {/* Page Content */}
        <div className="content hexagon-background">
          <div className="container">
            <div className="row">
              {/* calendar and cart column */}
              <div className="col-12 col-sm-12 col-md-12 col-lg-4">
                <aside className="card booking-details">
                  <div className="text-center d-md-none">
                    <h3 className="mb-1">
                      {bookingType === 'coach' ? 'Coach availability' : 'Net Hire'}
                    </h3>
                    {bookingType === 'coach' && (
                      <div className="alert alert-secondary text-left my-4">
                        Please note: One to One sessions are 45 mins
                      </div>
                    )}
                  </div>
                  <div className="card-body-chat datepicker-calendar">
                    <div id="checkBoxes7">
                      <div className="selectBox-cont">
                        <div className="card-body">
                          <div id="calendar-doctor" className="calendar-container">
                            <Calendar
                              value={date}
                              onChange={handleDateChange}
                              minDate={today} // Disable dates before today
                              maxDate={maxDate} // Disable dates after 3 months from today
                              inline
                              showWeek
                              // dateTemplate={dateTemplate}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedSlots?.length > 0 && (
                    <div className="card">
                      <div className="row justify-content-between align-items-start">
                        <div className="col-12 col-lg-auto">
                          <h4 className="mb-40">
                            Booked <span className="slots-counter">{selectedSlots.length}</span>{' '}
                            {`slot${selectedSlots.length === 1 ? '' : 's'}`}
                          </h4>
                        </div>
                        {selectedSlots?.length > 1 && (
                          <div className="col-12 col-lg-auto">
                            <div className="text-end">
                              <div
                                className="btn btn-outline-secondary px-2 py-2"
                                onClick={() => clearCart()}
                              >
                                Reset
                              </div>
                            </div>
                          </div>
                        )}
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
                    </div>
                  )}
                </aside>
              </div>
              {/* availability column */}
              <div className="col-12 col-lg-8">
                <section className="card d-none d-md-block">
                  <div className="text-center">
                    <h3 className="mb-1">{bookingType === 'coach' ? 'Coaching' : 'Net Hire'}</h3>
                    {bookingType === 'coach' && (
                      <div className="alert alert-secondary text-left my-4">
                        Please note: One to One sessions are 45 mins
                      </div>
                    )}
                  </div>
                </section>
                <div className="row">
                  <div className="col-12">
                    <div className="row justify-content-between align-items-center">
                      <div className="col-12 col-lg-auto d-none d-md-block">
                        <div className="text-center m-4">
                          <ImageWithBasePath
                            className="img-fluid batting-icon"
                            src="assets/img/cricket-bat.svg"
                            alt="Batting lane"
                          />{' '}
                          Batting Lane
                          <ImageWithBasePath
                            className="img-fluid bowling-icon ml-20"
                            src="assets/img/cricket-ball.svg"
                            alt="Bowling lane"
                          />{' '}
                          Bowling Lane
                        </div>
                      </div>

                      <div className="col-12 col-lg-auto">
                        <div className="row align-items-center justify-content-end py-2">
                          {selectedSlots?.length > 0 && (
                            <div className="col-auto">
                              <div className="text-center">
                                <h5 className="mb-0">{`Sub total: ${getFormattedCurrency(summary ? summary?.sub_total : 0)}`}</h5>
                              </div>
                            </div>
                          )}
                          <div className="col-auto">
                            <div className="text-center">
                              <Link
                                className={`btn btn-secondary btn-icon ${selectedSlots?.length > 0 ? '' : 'disabled'}`}
                                to={nextPage}
                              >
                                Continue <i className="feather-arrow-right-circle ms-1" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card time-date-card">
                      <section className="booking-date">
                        <div className="list-unstyled owl-carousel date-slider owl-theme mb-40">
                          {!isLoading && bookingType === 'lane' && (
                            <>
                              {screens.lg ? (
                                <Slider {...featuredLanesSlider}>
                                  {availability &&
                                    Object.entries(availability)
                                      .filter(([, lane]) => lane?.availableSlots > 0)
                                      .sort(([, laneA], [, laneB]) =>
                                        laneA?.lane?.name?.localeCompare(
                                          laneB?.lane?.name,
                                          undefined,
                                          {numeric: true}
                                        )
                                      )
                                      .map(([, lane]: any) => (
                                        <div key={lane?.lane?.id}>
                                          <div className="booking-date-item">
                                            <h6>
                                              {lane.lane.name}{' '}
                                              {lane.lane.is_batting_lane ? (
                                                <ImageWithBasePath
                                                  className="img-fluid batting-icon"
                                                  src="assets/img/cricket-bat.svg"
                                                  alt="Batting lane"
                                                />
                                              ) : (
                                                ''
                                              )}
                                              {lane.lane.is_bowling_lane ? (
                                                <ImageWithBasePath
                                                  className="img-fluid bowling-icon"
                                                  src="assets/img/cricket-ball.svg"
                                                  alt="Bowling lane"
                                                />
                                              ) : (
                                                ''
                                              )}
                                            </h6>
                                          </div>
                                          {lane.availability.map((slot: any) => (
                                            <div key={slot.start} className="col-sm-12 p-1">
                                              <div
                                                className={`time-slot display-block ${selectedSlots?.some(item => item.key === lane.lane.slug + '-' + slot.start) ? 'checked' : ''} active`}
                                                onClick={() => handleTimeSlotClick(slot, lane.lane)}
                                              >
                                                <div className="m-2">
                                                  <span>{`${formatTime(slot.start)} - ${formatTime(slot.start, 1)}`}</span>
                                                  <p className="text-sm mb-0">
                                                    {getFormattedCurrency(slot.rate)}
                                                  </p>
                                                  {/*<i className="fa-regular fa-check-circle" />*/}
                                                </div>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      ))}
                                </Slider>
                              ) : (
                                <>
                                  {availability &&
                                    Object.entries(availability)
                                      .filter(([, lane]) => lane?.availableSlots > 0)
                                      .sort(([, laneA], [, laneB]) =>
                                        laneA?.lane?.name?.localeCompare(
                                          laneB?.lane?.name,
                                          undefined,
                                          {numeric: true}
                                        )
                                      )
                                      .map(([, lane]: any) => (
                                        <div key={lane?.lane?.id} className="booking-slots">
                                          <div className="booking-date-item">
                                            <h6>
                                              {lane.lane.name}{' '}
                                              {lane.lane.is_batting_lane ? (
                                                <ImageWithBasePath
                                                  className="img-fluid batting-icon"
                                                  src="assets/img/cricket-bat.svg"
                                                  alt="Batting lane"
                                                />
                                              ) : (
                                                ''
                                              )}
                                              {lane.lane.is_bowling_lane ? (
                                                <ImageWithBasePath
                                                  className="img-fluid bowling-icon"
                                                  src="assets/img/cricket-ball.svg"
                                                  alt="Bowling lane"
                                                />
                                              ) : (
                                                ''
                                              )}
                                            </h6>
                                          </div>
                                          <div className="mobile-slots-list">
                                            {lane.availability.map((slot: any) => (
                                              <div key={slot.start} className="col-sm-12">
                                                <div
                                                  className={`time-slot display-block ${selectedSlots?.some(item => item.key === lane.lane.slug + '-' + slot.start) ? 'checked' : ''} active`}
                                                  onClick={() =>
                                                    handleTimeSlotClick(slot, lane.lane)
                                                  }
                                                >
                                                  <div className="m-2">
                                                    <span>{`${formatTime(slot.start)} - ${formatTime(slot.start, 1)}`}</span>
                                                    <p className="text-sm mb-1">
                                                      {getFormattedCurrency(slot.rate)}
                                                    </p>
                                                    {/*<i className="fa-regular fa-check-circle" />*/}
                                                  </div>
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      ))}
                                </>
                              )}
                            </>
                            // )}
                          )}
                          {!isLoading && bookingType === 'coach' && (
                            <>
                              <div className="row">
                                <div className="col-md-auto col-12 d-flex align-items-center mb-3 mb-md-0">
                                  <label
                                    htmlFor="participants-dropdown"
                                    className="me-2 mb-0 fw-bold"
                                  >
                                    Participants:
                                  </label>
                                  <Dropdown
                                    id="participants-dropdown"
                                    value={participants}
                                    onChange={handleParticipants}
                                    options={[
                                      {value: '1', name: '1 to 1'},
                                      {value: '2', name: '2 People'},
                                      {value: '4', name: 'Group (3+)'},
                                    ]}
                                    optionLabel="name"
                                    className="coach-type-select w-100 h-100"
                                  />
                                </div>
                                <div className="col-md-auto col-12 d-flex align-items-center">
                                  {availability && availability?.length !== 0 && (
                                    <>
                                      <label
                                        htmlFor="coaches-dropdown"
                                        className="me-2 mb-0 fw-bold"
                                      >
                                        Coach:
                                      </label>
                                      <Dropdown
                                        id="coaches-dropdown"
                                        value={selectedCoachId}
                                        onChange={handleCoaches}
                                        options={Object.entries(availability).map(
                                          ([, availabilityData]: any) => ({
                                            value: availabilityData?.coach?.id,
                                            name: `${availabilityData?.coach?.first_name} ${availabilityData?.coach?.last_name}`,
                                          })
                                        )}
                                        optionLabel="name"
                                        className="coach-type-select w-100 h-100"
                                      />
                                    </>
                                  )}
                                </div>
                              </div>
                              {availability &&
                                Object.entries(availability)
                                  .filter(
                                    ([, availabilityData]) =>
                                      availabilityData?.coach?.id === selectedCoachId
                                  )
                                  .map(([, availabilityData]: any) => (
                                    <div key={availabilityData?.coach?.id}>
                                      <div className="row mt-3">
                                        {Object.entries(availabilityData.lane)
                                          .filter(([, lane]: any) => lane?.availableSlots > 0)
                                          .map(([key, lane]: any) => (
                                            <div key={key} className="booking-slots col">
                                              <div className="booking-date-item">
                                                <h6>
                                                  {lane.lane.name}{' '}
                                                  {lane.lane.is_batting_lane ? (
                                                    <ImageWithBasePath
                                                      className="img-fluid batting-icon"
                                                      src="assets/img/cricket-bat.svg"
                                                      alt="Batting lane"
                                                    />
                                                  ) : (
                                                    ''
                                                  )}
                                                  {lane.lane.is_bowling_lane ? (
                                                    <ImageWithBasePath
                                                      className="img-fluid bowling-icon"
                                                      src="assets/img/cricket-ball.svg"
                                                      alt="Bowling lane"
                                                    />
                                                  ) : (
                                                    ''
                                                  )}
                                                </h6>
                                              </div>
                                              {/* for larger screens */}
                                              {screens.lg ? (
                                                <div>
                                                  {lane.availability.map((slot: any) => (
                                                    <div key={slot.start} className="col-sm-12 p-1">
                                                      <div
                                                        className={`time-slot display-block ${selectedSlots?.some(item => item.key === lane.lane.slug + '-' + slot.start + '-' + availabilityData.coach.id) ? '' : selectedSlots?.some(item => item.key.includes(lane.lane.slug + '-' + slot.start + '-')) || selectedSlots?.some(item => item.key.includes('-' + slot.start + '-' + availabilityData.coach.id)) ? 'disabled' : ''} ${selectedSlots?.some(item => item.key === lane.lane.slug + '-' + slot.start + '-' + availabilityData.coach.id) ? 'checked' : ''} active`}
                                                        onClick={() =>
                                                          handleTimeSlotClick(
                                                            slot,
                                                            lane.lane,
                                                            availabilityData.coach
                                                          )
                                                        }
                                                      >
                                                        <div className="m-2">
                                                          <span>{`${formatTime(slot.start)} - ${formatTime(slot.start, 1)}`}</span>
                                                          <p className="text-sm mb-0">
                                                            {getFormattedCurrency(slot.rate)}
                                                          </p>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  ))}
                                                </div>
                                              ) : (
                                                <div className="mobile-slots-list">
                                                  {lane.availability.map((slot: any) => (
                                                    <div key={slot.start} className="col-sm-12">
                                                      <div
                                                        className={`time-slot display-block ${selectedSlots?.some(item => item.key === lane.lane.slug + '-' + slot.start + '-' + availabilityData.coach.id) ? '' : selectedSlots?.some(item => item.key.includes(lane.lane.slug + '-' + slot.start + '-')) || selectedSlots?.some(item => item.key.includes('-' + slot.start + '-' + availabilityData.coach.id)) ? 'disabled' : ''} ${selectedSlots?.some(item => item.key === lane.lane.slug + '-' + slot.start + '-' + availabilityData.coach.id) ? 'checked' : ''} active`}
                                                        onClick={() =>
                                                          handleTimeSlotClick(
                                                            slot,
                                                            lane.lane,
                                                            availabilityData.coach
                                                          )
                                                        }
                                                      >
                                                        <div className="m-2">
                                                          <span>{`${formatTime(slot.start)} - ${formatTime(slot.start, 1)}`}</span>
                                                          <p className="text-sm mb-1">
                                                            {getFormattedCurrency(slot.rate)}
                                                          </p>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  ))}
                                                </div>
                                              )}
                                            </div>
                                          ))}
                                      </div>
                                      {/*  */}
                                    </div>
                                  ))}
                            </>
                          )}
                          {isLoading && (
                            <Space>
                              <Skeleton.Input active />
                              <Skeleton.Input active />
                              {screens.lg && <Skeleton.Input active />}
                            </Space>
                          )}
                          {!isLoading &&
                            availability &&
                            Object.entries(availability).length === 0 && (
                              <div className="alert alert-warning mt-4">
                                {`No ${bookingType === 'coach' ? 'coaches' : 'slots'} available for ${formatToLongDate(date || today)}`}
                              </div>
                            )}
                          {!isLoading &&
                            bookingType === 'lane' &&
                            availability &&
                            Object.entries(availability).length > 0 &&
                            (() => {
                              const selectedLaneAvailability = Object.entries(availability).some(
                                ([, availabilityData]) => availabilityData?.availableSlots > 0
                              )
                              if (!selectedLaneAvailability) {
                                return (
                                  <div className="alert alert-warning mt-4">
                                    {`No remaining slots available for ${formatToLongDate(date || today)}`}
                                  </div>
                                )
                              }
                              return null
                            })()}
                          {!isLoading &&
                            bookingType === 'coach' &&
                            availability &&
                            Object.entries(availability).length > 0 &&
                            (() => {
                              const selectedCoachAvailability = Object.entries(availability).find(
                                ([, availabilityData]) =>
                                  availabilityData?.coach?.id === selectedCoachId
                              )
                              if (!selectedCoachAvailability) {
                                return (
                                  <div className="alert alert-warning mt-4">
                                    {`Coach ${selectedCoachName} is not available for ${formatToLongDate(date || today)}`}
                                  </div>
                                )
                              }
                              return null
                            })()}
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
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

export default Availability
