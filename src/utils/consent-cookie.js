import Cookies from 'js-cookie'
import getDomain from './getDomain'
import getUserConsentKey from './getUserConsentKey'

export const getUserConsent = () => {
  if (typeof window !== 'undefined') {
    return Cookies.get(getUserConsentKey(), {domain: getDomain(), path: '/'})
  }
  return null
}

export const setUserConsent = value => {
  if (typeof window !== 'undefined') {
    Cookies.set(getUserConsentKey(), value, {
      domain: getDomain(),
      path: '/',
      expires: value < 30 ? 7 : 365,
      secure: true, // Only over HTTPS
      sameSite: 'Lax', // Prevent cross-site issues
    })
  }
}

export const removeUserConsentAndReload = () => {
  if (typeof window !== 'undefined') {
    Cookies.remove(getUserConsentKey(), {domain: getDomain(), path: '/'})
    window.location.reload()
  }
}
