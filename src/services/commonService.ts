import {all_routes} from '../feature-module/router/AllRoutes'

const routes = all_routes

export const getBaseUrl = () => {
  return process.env.REACT_APP_API_URL
}

export const getImagePath = (path: string | null) => {
  return path ? getBaseUrl() + '/' + path : '/assets/img/logo_500.png'
}

export const getFormattedCurrency = (amount: string | number): string => {
  const numericAmount = typeof amount === 'number' ? amount : parseFloat(amount)

  if (isNaN(numericAmount)) {
    return '£0.00' // fallback for invalid input
  }

  return '£' + numericAmount.toFixed(2)
}

export const constructCoachPath = (coach: any) => {
  return `${routes.locations}/${coach.location.slug}/coaches/${coach.id}/${coach.first_name}-${coach.last_name}`
}

export const constructCoachesPath = (locationSlug: any) => {
  return `${routes.locations}/${locationSlug}/coaches`
}

export const constructLocationPath = (location: any) => {
  return `${routes.locations}/${location.slug}`
}

export const constructLanePath = (locationSlug: any) => {
  return `${routes.locations}/${locationSlug}/lanes`
}

export const renderStars = (rating: number) => {
  let stars = ''
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      // Full star
      stars += '<i key="' + i + '" class="fas fa-star filled"></i>'
    } else if (rating >= i - 0.5) {
      // Half star
      stars += '<i key="' + i + '" class="fas fa-star-half-alt filled"></i>'
    } else {
      // Empty star
      stars += '<i key="' + i + '" class="fas fa-star"></i>'
    }
  }
  return stars
}

export const getServices = () => {
  const services = [
    {
      key: 1,
      name: 'HPC Net Hire',
      description:
        'Rent a premium cricket net for your sports activities. Check availability, reserve easily, and enjoy state-of-the-art facilities at competitive rates.',
      image: 'assets/img/services/HPC_lane_hire.jpg',
      link: routes.laneRental,
      type: 'lanes',
    },
    {
      key: 2,
      name: 'HPC Coaching',
      description:
        '1-2-1 and group coaching to enhance your skills and take your game to the next level.',
      image: 'assets/img/services/HPC_coaching_123.jpg',
      link: routes.bookACoach,
      type: 'coaches',
    },
    {
      key: 3,
      name: 'HPC Active',
      description:
        'HPC Active is our latest clothing and equipment line. We are one stop shop for all your cricketing needs, for individuals and clubs.',
      image: 'assets/img/services/hpc_active.jpg',
      link: routes.hpcActive,
      type: 'coaches',
    },
  ]
  return services
}

export const formatDateToYMD = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // getMonth() is zero-indexed, so we add 1
  const day = String(date.getDate()).padStart(2, '0') // getDate() returns the day of the month
  return `${year}-${month}-${day}`
}

export const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('en-GB') // en-GB for day/month/year format
}

export const formatToLongDate = (date: Date) => {
  return new Date(date).toLocaleDateString('en-GB', {
    weekday: 'short', // "Sun"
    day: '2-digit', // "10"
    month: 'short', // "Nov"
    year: '2-digit', // "24"
    timeZone: 'UTC',
  })
}

export function formatTimeWithAmPm(date: string): string {
  const newDate = new Date(date)
  let hours = newDate.getUTCHours()
  const minutes = newDate.getUTCMinutes()
  const ampm = hours >= 12 ? 'PM' : 'AM'

  // Convert to 12-hour format
  hours = hours % 12
  hours = hours ? hours : 12 // If the hour is 0, make it 12 (12 AM/PM)

  // Pad minutes with a leading zero if needed
  const minutesStr = minutes < 10 ? '0' + minutes : minutes.toString()

  return `${hours}:${minutesStr} ${ampm}`
}

export function formatTime(date: string, hoursToAdd = 0): string {
  const adjustedDate = new Date(date)
  adjustedDate.setHours(adjustedDate.getHours() + hoursToAdd)

  // Extract hours and minutes directly from UTC time
  const hours = adjustedDate.getUTCHours().toString().padStart(2, '0')
  const minutes = adjustedDate.getUTCMinutes().toString().padStart(2, '0')

  return `${hours}:${minutes}`
}

export function formatTimeWithAmPmWithoutTZ(date: string): string {
  const newDate = new Date(date)
  let hours = newDate.getHours()
  const minutes = newDate.getMinutes()
  const ampm = hours >= 12 ? 'PM' : 'AM'

  // Convert to 12-hour format
  hours = hours % 12
  hours = hours ? hours : 12 // If the hour is 0, make it 12 (12 AM/PM)

  // Pad minutes with a leading zero if needed
  const minutesStr = minutes < 10 ? '0' + minutes : minutes.toString()

  return `${hours}:${minutesStr} ${ampm}`
}

export function formatKeywordToText(text: string): string {
  return text
    .toLowerCase()
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function getCardIcon(card: string): string {
  let icon = null
  const availableIcons = ['visa', 'mastercard', 'jcb', 'discover', 'diners', 'amex']
  if (availableIcons.includes(card)) {
    icon = `assets/img/cards/${card}.png`
  } else {
    icon = `assets/img/cards/card.png`
  }
  return icon
}
