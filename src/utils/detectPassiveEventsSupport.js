// https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection

const detectPassiveEventsSupport = () => {
  let supportsPassive = false
  try {
    const opts = Object.defineProperty({}, 'passive', {
      get: () => {
        supportsPassive = true
        return false
      },
    })
    window.addEventListener('testPassive', null, opts)
    window.removeEventListener('testPassive', null, opts)
  } catch (e) {
    return false
  }
  return supportsPassive
}

export default detectPassiveEventsSupport
