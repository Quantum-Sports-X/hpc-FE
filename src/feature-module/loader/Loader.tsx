import React, {useState, useEffect} from 'react'
import ImageWithBasePath from '../../core/data/img/ImageWithBasePath'
import {useNavigate, useParams} from 'react-router-dom'

const Loader = () => {
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const {bookingType} = useParams<{bookingType: string; locationId: string}>()

  useEffect(() => {
    const checkCartAndNavigate = async () => {
      // simulate a delay (e.g., for an API call or data check)
      await new Promise(resolve => setTimeout(resolve, 1000))

      // check for cart data in localStorage since
      // redux store looks empty if it reaches here
      const cartData = localStorage.getItem('cart')
        ? JSON.parse(localStorage.getItem('cart') ?? '[]')
        : []

      let filteredCartData = []

      // Filter the cart data based on bookingType
      if (bookingType === 'coach') {
        // Check for items with a coach property
        filteredCartData = cartData.filter((item: any) => item.coach)
      } else if (bookingType === 'lane') {
        // Check for items without a coach property
        filteredCartData = cartData.filter((item: any) => !item.coach)
      }

      if (filteredCartData.length > 0) {
        {
          console.log({filteredCartData})
        }
        // cart exists, allow the user to remain on the current page
        setIsLoading(false) // Hide loader
      } else {
        // No cart data, navigate to home
        navigate('/')
      }
    }

    checkCartAndNavigate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate])

  return (
    <div>
      {isLoading && (
        <div id="global-loader">
          <div className="loader-img">
            <ImageWithBasePath
              src="assets/img/animated-ball.svg"
              className="img-fluid"
              alt="Global"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Loader
