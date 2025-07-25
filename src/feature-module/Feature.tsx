/* eslint-disable */
import React, {useEffect, useState} from 'react'
import AllRoutes from './router/Router'
import useScrollToTopOnRedirect from './hooks/UseScrollToTopOnRedirect'
import {useDispatch} from 'react-redux'
import {aSetCartFromLocalStorage} from '../core/data/redux/action'

const Feature = () => {
  const dispatch = useDispatch()
  const [base, setBase] = useState('')
  const [page, setPage] = useState('')
  const [last, setLast] = useState('')
  const currentPath = window.location.pathname
  // take cart and initialise on the initial page load
  const serializedCart = localStorage.getItem('cart')

  useScrollToTopOnRedirect()

  useEffect(() => {
    setBase(currentPath.split('/')[1])
    setPage(currentPath.split('/')[2])
    setLast(currentPath.split('/')[3])
    if (serializedCart) {
      try {
        const parsedCart = JSON.parse(serializedCart)
        if (Array.isArray(parsedCart)) {
          dispatch(aSetCartFromLocalStorage(parsedCart))
        } else {
          console.error('Invalid cart data in localStorage, resetting cart.')
          localStorage.removeItem('cart')
        }
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error)
        localStorage.removeItem('cart')
      }
    }
  }, [])
  return (
    <>
      <div
        className={`main-wrapper
        ${
          page === 'add-court'
            ? 'add-court venue-coach-details'
            : // (base === "coaches" ) ? "venue-coach-details coach-detail" :
              page === 'lesson-timedate'
              ? 'coach lessons'
              : page === 'lesson-type'
                ? 'coach lessons'
                : // page === "forgot-password" ? "authendication-pages" :
                  page === 'gallery'
                  ? 'gallery-page innerpagebg'
                  : page === 'invoice'
                    ? 'invoice-page innerpagebg'
                    : page === 'venue-details'
                      ? 'venue-coach-details'
                      : ''
        }`}
      >
        <AllRoutes />
      </div>
    </>
  )
}

export default Feature
