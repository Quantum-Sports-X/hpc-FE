import {useLayoutEffect} from 'react'
import {useLocation} from 'react-router-dom'

const useScrollToTopOnRedirect = (): void => {
  const location = useLocation()

  useLayoutEffect(() => {
    document.documentElement.scrollTo({top: 0, left: 0, behavior: 'instant'})
  }, [location.pathname])
}

export default useScrollToTopOnRedirect
