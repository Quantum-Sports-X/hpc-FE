import React, {useEffect, useState} from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {all_routes as routes} from '../router/AllRoutes'
import {apiService} from '../../services/apiService'
import {Skeleton} from 'antd'

const CookiePolicy = () => {
  const [featuredNews, setFeaturedNews] = useState<any | null>(null)
  const [_error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const navigate = useNavigate() // Hook to redirect
  // Get a specific query parameter, e.g., "id"
  const page = parseInt(queryParams.get('page') ?? '1')
  useEffect(() => {
    // Fetch coach data when the component mounts
    setIsLoading(true)
    apiService
      .get(`/api/v1/article/cookie-policy`)
      .then((response: any) => {
        if (!response || response.data === null) {
          setIsLoading(false)
          navigate('/error-404') // Redirect if coach not found
        } else {
          setIsLoading(false)
          setFeaturedNews(response.data) // Set coach data
        }
      })
      .catch(err => {
        setIsLoading(false)
        setError(err.message)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])
  return (
    <div>
      <>
        {/* Breadcrumb */}
        <div className="breadcrumb breadcrumb-list mb-0">
          <span className="primary-right-round" />
          <div className="container">
            <h1 className="text-white">Cookie Policy</h1>
            <ul>
              <li>
                <Link to={routes.home}>Home</Link>
              </li>
              <li>{featuredNews?.title}</li>
            </ul>
          </div>
        </div>
        {/* /Breadcrumb */}
        {/* Page Content */}
        <div className="content hexagon-background-static">
          <div className="container">
            {isLoading && <Skeleton active paragraph={{rows: 10}} />}
            <h3>{featuredNews?.title}</h3>
            <div dangerouslySetInnerHTML={{__html: featuredNews?.content}} />
          </div>
        </div>
        {/* /Page Content */}
      </>
    </div>
  )
}

export default CookiePolicy
