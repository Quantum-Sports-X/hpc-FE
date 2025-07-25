export interface allCourt {
  courtName: string
  courtNo: string
  location: string
  amount: string
  maxGuest: string
  additionalGuests: string
  addedOn: string
  details: string
  status: string
  img: string
}
export interface coachRequests {
  courtName: string
  courtNo: string
  location: string
  amount: string
  maxGuest: string
  additionalGuests: string
  addedOn: string
  details: string
  status: string
  img1: string
  img2: string
  playerName: string
  date: string
  time: string
}
export interface activeCourts {
  courtName: string
  courtNo: string
  location: string
  amount: string
  maxGuest: string
  additionalGuests: string
  addedOn: string
  details: string
  status: string
  img: string
  date: string
  time: string
}
export interface coachWallets {
  refID: string
  transactionFor: string
  date: string
  time: string
  payment: string
  status: string
  img: string
}
export interface coachEarning {
  courtName: string
  courtNo: string
  bookingDate: string
  playerName: string
  dateTime: string
  Payment: string
  additionalGuests: string
  paidOn: string
  Download: string
}
export interface inactiveCourts {
  courtName: string
  courtNo: string
  location: string
  amount: string
  maxGuest: string
  additionalGuests: string
  addedOn: string
  details: string
  status: string
  img: string
}
export interface userCoaches {
  courtName: string
  courtNo: string
  location: string
  amount: string
  maxGuest: string
  additionalGuests: string
  addedOn: string
  details: string
  status: string
  img: string
  text: string
  coachName: string
  bookedOn: string
  dateTime: string
  time: string
}
export interface userComplete {
  bookingDate: string
  coachName: string
  courtName: string
  courtNo: string
  date: string
  time: string
  payment: string
  details: string
  status: string
  img: string
}
export interface userInvoice {
  id: string
  courtName: string
  courtNo: string
  date: string
  time: string
  payment: string
  paidOn: string
  status: string
  download: string
  img: string
}
export interface userOngoing {
  courtName: string
  courtNo: string
  location: string
  amount: string
  court: string
  maxGuest: string
  additionalGuests: string
  addedOn: string
  details: string
  status: string
  image: string
  content: string
  date: string
  time: string
  bookingtype: string
  coachName: string
  image2: string
  bookeddata: string
}
export interface userCancelledInterface {
  courtName: string
  courtNo: string
  location: string
  amount: string
  court: string
  maxGuest: string
  additionalGuests: string
  addedOn: string
  details: string
  status: string
  image: string
  content: string
  date: string
  time: string
  bookingtype: string
  coachName: string
  image2: string
  bookeddata: string
}

export interface Location {
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
  embed_url: string | null
}

export interface Addon {
  id: number
  location_id: number
  name: string
  description: string | null
  price: string
  quantity: number
  status: number
  created_at: string
  updated_at: string
  pivot: {
    lane_id: number
    addon_id: number
    created_at: string
    updated_at: string
  }
}

export interface Lane {
  id: number
  location_id: number
  name: string
  description?: string | null
  content?: string | null
  thumbnail: string | null
  slug: string
  status: number
  created_at: string
  updated_at: string
  rating: string
  review_count: number
  rate: string
  coach_rate: string
  is_batting_lane: number
  is_bowling_lane: number
  location: Location
  addons: Addon[]
}

export interface AvailabilitySlot {
  start: string
  end: string
  rate: number
  participants?: string
}

export interface Coach {
  id: number
  first_name: string
  last_name: string
  address: string | null
  city: string | null
  postal_code: string | null
  country: string | null
  dob: string | null
  medical_condition: string | null
  avatar: string | null
  email: string
  location_id: number
  coach_fee: string
  rating: string
  review_count: number
  sessions: number
  verified: number
  featured: number
  credit_balance: string
  mobile_no: string | null
  email_verified_at: string | null
  status: string
  stripe_id: string | null
  coach_stripe_id: string | null
  coach_level: string | null
  user_consent: number
  user_consent_time: string | null
  created_at: string
  updated_at: string
  full_avatar: string
}

export interface LaneWithAvailability {
  lane: Lane
  availableSlots: number
  availability: AvailabilitySlot[]
}

export type AvailabilityResponse =
  | Record<string, LaneWithAvailability>
  | Record<string, {lane: LaneWithAvailability; coach: Coach}>
  | []
