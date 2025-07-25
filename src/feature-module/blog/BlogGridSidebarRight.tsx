import React, {useEffect, useState} from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {all_routes} from '../router/AllRoutes'
import {apiService} from '../../services/apiService'
import ImageWithOutBasePath from '../../core/data/img/ImageWithOutBasePath'
import {format} from 'date-fns'
import {getImagePath} from '../../services/commonService'
import {PaginationComponent} from '../common/Pagination'

const BlogGridSidebarRight = () => {
  const routes = all_routes
  const [featuredNews, setFeaturedNews] = useState<any | null>(null)
  // eslint-disable-next-line no-unused-vars
  const [_error, setError] = useState<string | null>(null)
  const navigate = useNavigate() // Hook to redirect
  const [latestNews, setLatestNews] = useState<any | null>(null)
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  // Get a specific query parameter, e.g., "id"
  const page = parseInt(queryParams.get('page') ?? '1')

  useEffect(() => {
    // Fetch coach data when the component mounts
    apiService
      .get(`/api/v1/article?page=${page}`)
      .then((response: any) => {
        if (!response || response.data === null) {
          navigate('/error-404') // Redirect if coach not found
        } else {
          setFeaturedNews(response.data) // Set coach data
        }
      })
      .catch(err => setError(err.message))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])
  useEffect(() => {
    apiService
      .get('/api/v1/article/type/latest')
      .then((response: any) => {
        if (!response || response.data === null) {
          setLatestNews([])
        } else {
          setLatestNews(response.data) // Set coach data
        }
      })
      .catch(err => setError(err.message))
  }, [])
  return (
    <div>
      <>
        {/* Breadcrumb */}
        <div className="breadcrumb breadcrumb-list mb-0">
          <span className="primary-right-round" />
          <div className="container">
            <h1 className="text-white">Articles</h1>
            <ul>
              <li>
                <Link to={routes.home}>Home</Link>
              </li>
              <li>Articles</li>
            </ul>
          </div>
        </div>
        {/* /Breadcrumb */}
        {/* Page Content */}
        <div className="content blog-grid">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-md-9 col-lg-9">
                <div className="row">
                  {featuredNews &&
                    featuredNews.data.map((featuredNewsElement: any) => (
                      <div
                        key={featuredNewsElement.id}
                        className="col-12 col-sm-12 col-md-12 col-lg-4"
                      >
                        {/* Blog */}
                        <div className="featured-venues-item">
                          <div className="listing-item">
                            <div className="listing-img">
                              <Link
                                to={`${routes.blogGridSidebarRight}/${featuredNewsElement.slug}`}
                              >
                                <ImageWithOutBasePath
                                  src={getImagePath(featuredNewsElement.path)}
                                  className="img-fluid"
                                  alt="Venue"
                                />
                              </Link>
                            </div>
                            <div className="listing-content news-content">
                              <div className="listing-venue-owner">
                                <div className="navigation">
                                  <Link to="#">
                                    <ImageWithOutBasePath
                                      src={featuredNewsElement.author.full_avatar}
                                      alt="User"
                                    />
                                    {featuredNewsElement.author.first_name}{' '}
                                    {featuredNewsElement.author.last_name}
                                  </Link>
                                  <span>
                                    <i className="feather-calendar" />
                                    {format(featuredNewsElement.created_at, 'MMM d, yyyy')}
                                  </span>
                                </div>
                              </div>
                              <h3 className="listing-title">
                                <Link
                                  to={`${routes.blogGridSidebarRight}/${featuredNewsElement.slug}`}
                                >
                                  {featuredNewsElement.title}
                                </Link>
                              </h3>
                            </div>
                          </div>
                        </div>
                        {/* /Blog */}
                      </div>
                    ))}
                  {featuredNews && featuredNews.data.length == 0 ? (
                    <p>No articles found</p>
                  ) : (
                    <p></p>
                  )}
                </div>
                {/*Pagination*/}
                {featuredNews && featuredNews.last_page != 1 && (
                  <PaginationComponent
                    previousPage={page == 1 ? 1 : page - 1}
                    nextPage={
                      featuredNews.current_page == featuredNews.last_page
                        ? featuredNews.current_page
                        : featuredNews.current_page + 1
                    }
                    links={featuredNews.links}
                  />
                )}
                {/*Pagination*/}
              </div>
              <div className="col-sm-12 col-md-3 col-lg-3 blog-sidebar theiaStickySidebar">
                <div className="stickybar">
                  {/* <div className="card">
                  <h4>Search</h4>
                  <form className="">
                    <div className="blog-search">
                      <input
                        type="text"
                        className="form-control"
                        id="search"
                        placeholder="Enter Keyword"
                      />
                      <i className="feather-search" />
                    </div>
                  </form>
                </div> */}
                  <div className="card">
                    <h4>Latest Posts</h4>
                    <ul className="latest-posts">
                      {latestNews &&
                        latestNews.map((latestNewsElement: any) => (
                          <li key={latestNewsElement.id}>
                            <div className="post-thumb">
                              <Link to={`${routes.blogGridSidebarRight}/${latestNewsElement.slug}`}>
                                <ImageWithOutBasePath
                                  className="img-fluid"
                                  src={getImagePath(latestNewsElement.path)}
                                  alt="Post"
                                />
                              </Link>
                            </div>
                            <div className="post-info">
                              <p>
                                {latestNewsElement.author.first_name}{' '}
                                {latestNewsElement.author.last_name}
                              </p>
                              <h6>
                                <Link
                                  to={`${routes.blogGridSidebarRight}/${latestNewsElement.slug}`}
                                >
                                  {latestNewsElement.title}
                                </Link>
                              </h6>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                  {/* <div className="card">
                  <h4>Categories</h4>
                  <ul className="categories">
                    <li>
                      <h6>
                        <Link to="#">
                          {" "}
                          Rules in Game <span>(100)</span>
                        </Link>
                      </h6>
                    </li>
                    <li>
                      <h6>
                        <Link to="#">
                          {" "}
                          Cricket <span>(10)</span>
                        </Link>
                      </h6>
                    </li>
                    <li>
                      <h6>
                        <Link to="#">
                          {" "}
                          Bats <span>(20)</span>
                        </Link>
                      </h6>
                    </li>
                    <li>
                      <h6>
                        <Link to="#">
                          {" "}
                          New Game <span>(45)</span>
                        </Link>
                      </h6>
                    </li>
                    <li>
                      <h6>
                        <Link to="#">
                          {" "}
                          Event <span>(25)</span>
                        </Link>
                      </h6>
                    </li>
                    <li>
                      <h6>
                        <Link to="#">
                          {" "}
                          Rackets <span>(15)</span>
                        </Link>
                      </h6>
                    </li>
                    <li>
                      <h6>
                        <Link to="#">
                          {" "}
                          New Courts <span>(121)</span>
                        </Link>
                      </h6>
                    </li>
                  </ul>
                </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
      </>
    </div>
  )
}

export default BlogGridSidebarRight
