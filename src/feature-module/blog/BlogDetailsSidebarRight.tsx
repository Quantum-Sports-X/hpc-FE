import React, {useEffect, useState} from 'react'
import Slider_ from 'react-slick'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {all_routes} from '../router/AllRoutes'
import {apiService} from '../../services/apiService'
import ImageWithOutBasePath from '../../core/data/img/ImageWithOutBasePath'
import {format} from 'date-fns'
import {getImagePath} from '../../services/commonService'

const Slider = Slider_ as unknown as React.ComponentType<any>

const BlogDetailsSidebarRight = () => {
  const routes = all_routes

  const featuredVenuesSlider = {
    dots: false,
    autoplay: false,
    infinite: false,
    slidesToShow: 3,
    margin: 20,
    speed: 500,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 776,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 567,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }
  const [news, setNews] = useState<any | null>(null)
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [error, setError] = useState<string | null>(null)
  const {slug} = useParams<{slug: string}>()
  const [similarNews, setSimilarNews] = useState<any | null>(null)
  const [latestNews, setLatestNews] = useState<any | null>(null)
  const navigate = useNavigate() // Hook to redirect
  useEffect(() => {
    // Fetch coach data when the component mounts
    apiService
      .get('/api/v1/article/' + slug)
      .then((response: any) => {
        if (!response || response.data === null) {
          navigate('/error-404') // Redirect if coach not found
        } else {
          setNews(response.data) // Set coach data
        }
      })
      .catch(err => setError(err.message))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  const HtmlRenderer = ({htmlContent}: any) => {
    return <span dangerouslySetInnerHTML={{__html: htmlContent}} />
  }
  useEffect(() => {
    // Fetch coach data when the component mounts
    apiService
      .get('/api/v1/article/type/category?id=' + news?.id)
      .then((response: any) => {
        if (!response || response.data === null) {
          setSimilarNews([])
        } else {
          setSimilarNews(response.data) // Set coach data
        }
      })
      .catch(err => setError(err.message))
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])
  if (news) {
    return (
      <div>
        {/* Breadcrumb */}
        <div className="breadcrumb breadcrumb-list mb-0">
          <span className="primary-right-round" />
          <div className="container">
            <h1 className="text-white">{news.title}</h1>
            <ul>
              <li>
                <Link to={routes.home}>Home</Link>
              </li>
              <li>{news.title}</li>
            </ul>
          </div>
        </div>
        {/* /Breadcrumb */}
        {/* Page Content */}
        <div className="content blog-details">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-md-8 col-lg-8">
                {/* Blog */}
                <div className="featured-venues-item">
                  <div className="listing-item blog-info">
                    <div className="listing-img">
                      <Link to={`${routes.blogGridSidebarRight}/${news.slug}`}>
                        <ImageWithOutBasePath
                          src={getImagePath(news.path)}
                          className="img-fluid"
                          alt="Venue"
                        />
                      </Link>
                    </div>
                    <div className="listing-content news-content">
                      <div className="listing-venue-owner blog-detail-owner d-lg-flex justify-content-between align-items-center">
                        <div className="navigation">
                          <Link to="#">
                            <ImageWithOutBasePath src={news.author.full_avatar} alt="User" />
                            {news.author.first_name} {news.author.last_name}
                          </Link>
                          <span>
                            <i className="feather-calendar" />
                            {format(news.created_at, 'MMM d, yyyy')}
                          </span>
                        </div>
                      </div>
                      <h2 className="listing-title">
                        <Link to="#">{news.title}</Link>
                      </h2>
                      <HtmlRenderer htmlContent={news.content} />
                    </div>
                  </div>
                </div>
                {/* /Blog */}
              </div>
              <div className="col-sm-12 col-md-4 col-lg-4 blog-sidebar theiaStickySidebar">
                <div className="stickybar">
                  {/* <div className="card">
                  <h4>Search</h4>
                  <form>
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
                </div>
              </div>
            </div>
          </div>
          <section className="section dull-bg similar-list">
            <div className="container">
              <h2 className="text-center mb-40">Similar Listing</h2>
              <div className="row">
                <div className="featured-slider-group ">
                  <div className="featured-venues-slider owl-theme">
                    <Slider {...featuredVenuesSlider}>
                      {similarNews &&
                        similarNews.map((featuredNewsElement: any) => (
                          <div
                            key={featuredNewsElement.id}
                            className="featured-venues-item aos"
                            data-aos="fade-up"
                          >
                            <div className="listing-item mb-0">
                              <div className="listing-img">
                                <Link
                                  to={`${routes.blogGridSidebarRight}/${featuredNewsElement.slug}`}
                                >
                                  <ImageWithOutBasePath
                                    src={getImagePath(featuredNewsElement.path)}
                                    alt="User"
                                  />
                                </Link>
                              </div>
                              <div className="listing-content news-content">
                                <div className="listing-venue-owner listing-dates">
                                  <Link to="#" className="navigation">
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
                        ))}
                    </Slider>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        {/* /Page Content */}
      </div>
    )
  }
}

export default BlogDetailsSidebarRight
