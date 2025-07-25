import React, {useState} from 'react'
import ImageWithBasePath from '../../core/data/img/ImageWithBasePath'
import Slider_ from 'react-slick'
import {Link} from 'react-router-dom'
import {all_routes} from '../router/AllRoutes'

const Slider = Slider_ as unknown as React.ComponentType<any>

const BlogDetailsSidebarLeft = () => {
  const routes = all_routes
  const [selectedItems, setSelectedItems] = useState(Array(4).fill(false))
  const handleItemClick = (index: number) => {
    setSelectedItems(prevSelectedItems => {
      const updatedSelectedItems = [...prevSelectedItems]
      updatedSelectedItems[index] = !updatedSelectedItems[index]
      return updatedSelectedItems
    })
  }

  const featuredVenuesSlider = {
    dots: false,
    autoplay: false,
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
  return (
    <div>
      {/* Breadcrumb */}
      <div className="breadcrumb breadcrumb-list mb-0">
        <span className="primary-right-round" />
        <div className="container">
          <h1 className="text-white">Blog Details</h1>
          <ul>
            <li>
              <Link to={routes.home}>Home</Link>
            </li>
            <li>Blog Details</li>
          </ul>
        </div>
      </div>
      {/* /Breadcrumb */}
      {/* Page Content */}
      <div className="content blog-details">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-4 col-lg-4 blog-sidebar theiaStickySidebar">
              <div className="stickybar">
                <div className="card">
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
                </div>
                <div className="card">
                  <h4>Latest Posts</h4>
                  <ul className="latest-posts">
                    <li>
                      <div className="post-thumb">
                        <Link to={routes.blogDetails}>
                          <ImageWithBasePath
                            className="img-fluid"
                            src="assets/img/blog/latestpost-01.jpg"
                            alt="Post"
                          />
                        </Link>
                      </div>
                      <div className="post-info">
                        <p>Sarah</p>
                        <h6>
                          <Link to={routes.blogDetails}>
                            These 15 Cabin Wedding Venues Have All the Rustic Vibes
                          </Link>
                        </h6>
                      </div>
                    </li>
                    <li>
                      <div className="post-thumb">
                        <Link to={routes.blogDetails}>
                          <ImageWithBasePath
                            className="img-fluid"
                            src="assets/img/blog/latestpost-02.jpg"
                            alt="Post"
                          />
                        </Link>
                      </div>
                      <div className="post-info">
                        <p>Kim Forrest</p>
                        <h6>
                          <Link to={routes.blogDetails}>
                            23 Super-Chic Blazer Dresses for Your Home Game
                          </Link>
                        </h6>
                      </div>
                    </li>
                    <li>
                      <div className="post-thumb">
                        <Link to={routes.blogDetails}>
                          <ImageWithBasePath
                            className="img-fluid"
                            src="assets/img/blog/latestpost-03.jpg"
                            alt="Post"
                          />
                        </Link>
                      </div>
                      <div className="post-info">
                        <p>Jessica Estrada</p>
                        <h6>
                          <Link to={routes.blogDetails}>
                            The Prettiest Floral Bats for a Rage Look
                          </Link>
                        </h6>
                      </div>
                    </li>
                    <li>
                      <div className="post-thumb">
                        <Link to={routes.blogDetails}>
                          <ImageWithBasePath
                            className="img-fluid"
                            src="assets/img/blog/latestpost-04.jpg"
                            alt="Post"
                          />
                        </Link>
                      </div>
                      <div className="post-info">
                        <p>Naoimh</p>
                        <h6>
                          <Link to={routes.blogDetails}>31 Beautiful Courts Around the World</Link>
                        </h6>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="card">
                  <h4>Categories</h4>
                  <ul className="categories">
                    <li>
                      <h6>
                        <Link to="#">
                          {' '}
                          Rules in Game <span>(100)</span>
                        </Link>
                      </h6>
                    </li>
                    <li>
                      <h6>
                        <Link to="#">
                          {' '}
                          Cricket <span>(10)</span>
                        </Link>
                      </h6>
                    </li>
                    <li>
                      <h6>
                        <Link to="#">
                          {' '}
                          Bats <span>(20)</span>
                        </Link>
                      </h6>
                    </li>
                    <li>
                      <h6>
                        <Link to="#">
                          {' '}
                          New Game <span>(45)</span>
                        </Link>
                      </h6>
                    </li>
                    <li>
                      <h6>
                        <Link to="#">
                          {' '}
                          Event <span>(25)</span>
                        </Link>
                      </h6>
                    </li>
                    <li>
                      <h6>
                        <Link to="#">
                          {' '}
                          Rackets <span>(15)</span>
                        </Link>
                      </h6>
                    </li>
                    <li>
                      <h6>
                        <Link to="#">
                          {' '}
                          New Courts <span>(121)</span>
                        </Link>
                      </h6>
                    </li>
                  </ul>
                </div>
                <div className="card tags-card">
                  <h4>Tags</h4>
                  <ul className="tags clearfix">
                    <li>
                      <Link to="#" className="tag">
                        Rackets
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="tag">
                        New Game
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="tag">
                        Dresses
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-8 col-lg-8">
              {/* Blog */}
              <div className="featured-venues-item">
                <div className="listing-item blog-info">
                  <div className="listing-img">
                    <Link to={routes.blogDetails}>
                      <ImageWithBasePath
                        src="assets/img/blog/blog-04.jpg"
                        className="img-fluid"
                        alt="Venue"
                      />
                    </Link>
                    <div className="fav-item-venues news-sports">
                      <span className="tag tag-blue">Badminton</span>
                    </div>
                  </div>
                  <div className="listing-content news-content">
                    <div className="listing-venue-owner blog-detail-owner d-lg-flex justify-content-between align-items-center">
                      <div className="navigation">
                        <Link to="#">
                          <ImageWithBasePath src="assets/img/profiles/avatar-01.jpg" alt="User" />
                          Orlando Waters
                        </Link>
                        <span>
                          <i className="feather-calendar" />
                          15 May 2023
                        </span>
                        <span>
                          <i className="far fa-comment-alt" />
                          30 Comments
                        </span>
                      </div>
                      <Link to="#" className="btn btn-primary">
                        <ImageWithBasePath
                          src="assets/img/icons/grid.svg"
                          className="img-fluid"
                          alt="Icon"
                        />
                        Rules of Game
                      </Link>
                    </div>
                    <h2 className="listing-title">
                      <Link to="#">Mastering the Cricket Basics: A Guide for Beginners</Link>
                    </h2>
                    <p>
                      There are many variations of passages of at Lorem Ipsum available but the
                      majority suffered that dummy is alteration. There are many variations of
                      passages of Lorem Ipsum available but the or majority have that suffered
                      alteration words which don&apos;t look even slightly believable. There are
                      many available but the majority the have suffered alteration. There are many
                      variations of dummy passages Lorem majority the have the suffered alteration.
                    </p>
                    <p>
                      There are many variations of passages of at Lorem Ipsum available but the
                      majority the have too suffered alteration. There are many variations of
                      passages of Lorem Ipsum available majority have that suffered alteration words
                      which don&apos;t look even slightly believable. There are available but the
                      majority the have suffered alteration.
                    </p>
                    <div className="gradient-bg d-flex justify-content-between align-items-center">
                      <ImageWithBasePath
                        src="assets/img/icons/comment-quotes.svg"
                        className="img-fluid"
                        alt="Icon"
                      />
                      <p className="mb-0">
                        There are many variations of passages of at Lorem Ipsum available but the
                        majority the have too suffered alteration. There are many variations of
                        passages of Lorem Ipsum vailable majority have that suffered alteration
                        words which don&apos;t look even slightly believable.
                      </p>
                    </div>
                    <p>
                      Lorem Ipsum available but the or majority have that suffered alteration words
                      which don&apos;t look even slightly believable. There are many available but
                      the majority the have suffered alteration. There are many variations of dumm
                      passages Lorem majority the have the suffered alteration.
                    </p>
                    <div className="blog-images d-sm-flex align-items-center justify-content-start">
                      <Link to="#">
                        <ImageWithBasePath
                          src="assets/img/blog/blog-05.jpg"
                          className="img-fluid"
                          alt="Venue"
                        />
                      </Link>
                      <Link to="#">
                        <ImageWithBasePath
                          src="assets/img/blog/blog-06.jpg"
                          className="img-fluid"
                          alt="Venue"
                        />
                      </Link>
                      <Link to="#">
                        <ImageWithBasePath
                          src="assets/img/blog/blog-07.jpg"
                          className="img-fluid"
                          alt="Venue"
                        />
                      </Link>
                    </div>
                    <p>
                      Lorem Ipsum available but the or majority have that suffered alteration words
                      which don&apos;t look even slightly believable. There are many available but
                      the majority the have suffered alteration. There are many variations of dummy
                      passages Lorem majority the have the suffered alteration. There are many
                      variations of passages of at Lorem Ipsum available but the majority suffered
                      that dummy is alteration. There are many variations of passages of Lorem Ipsum
                      available but the or majority have that suffered alteration words which
                      don&apos;t look even slightly believable.
                    </p>
                    <ul className="text-list">
                      <li>dummy passages Lorem majority</li>
                      <li> Lorem Ipsum is not simply random text</li>
                      <li>It has roots in a piece of classical Latin literature</li>
                      <li>There are many variations of passages of Lorem Ipsum</li>
                      <li>Various versions have evolved over the years</li>
                    </ul>
                    <p>
                      Lorem Ipsum available but the or majority have that suffered alteration words
                      which don&apos;t look even slightly believable. There are many available but
                      the majority the have suffered alteration. There are many variations of dumm
                      passages Lorem majority the have the suffered alteration.
                    </p>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                    <div className="d-flex align-items-center tags-wrapper">
                      <h6>Tags:</h6>
                      <ul className="tags clearfix">
                        <li>
                          <Link to="#" className="tag">
                            Rackets
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="tag">
                            New Game
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="tag">
                            Dresses
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                    <div className="d-flex justify-content-lg-end align-items-center social-medias-wrapper">
                      <h6>Share on :</h6>
                      <ul className="social-medias d-flex">
                        <li className="facebook">
                          <Link to="#">
                            <i className="fa-brands fa-facebook-f" />
                          </Link>
                        </li>
                        <li className="linkedin">
                          <Link to="#">
                            <i className="fa-brands fa-linkedin" />
                          </Link>
                        </li>
                        <li className="instagram">
                          <Link to="#">
                            <i className="fa-brands fa-instagram" />
                          </Link>
                        </li>
                        <li className="twitter">
                          <Link to="#">
                            <i className="fa-brands fa-twitter" />
                          </Link>
                        </li>
                        <li className="pinterest">
                          <Link to="#">
                            <i className="fa-brands fa-pinterest" />
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Blog */}
              {/* Author Comments */}
              <div className="blog-comments">
                <div className="dull-bg author-widget">
                  <div className="author-group d-md-flex align-items-center justify-content-start">
                    <div className="profile-pic">
                      <Link to="#" className="d-inline-block">
                        <ImageWithBasePath src="assets/img/profiles/avatar-01.jpg" alt="User" />
                      </Link>
                    </div>
                    <div className="info">
                      <span>Author</span>
                      <h5>Antony Hilfn</h5>
                      <p>
                        Lorem Ipsum available but the or majority have that suffered alteration
                        words which don&apos;t look even slightly believable. There are many
                        available but the majority the have suffered alteration. There are many
                        variations of dumm passages Lorem majority the have the suffered alteration.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Author Comments */}
              {/* Comments */}
              <div className="blog-comments">
                <div className="dull-bg">
                  <h4 className="mb-0">Comments (45)</h4>
                  <hr />
                  <ul>
                    <li className="author-group d-md-flex align-items-center justify-content-start">
                      <div className="profile-pic">
                        <Link to="#" className="d-inline-block">
                          <ImageWithBasePath src="assets/img/profiles/avatar-04.jpg" alt="User" />
                        </Link>
                      </div>
                      <div className="info">
                        <div className="head d-flex align-items-center justify-content-start">
                          <h5>Antony Hilfn</h5>
                          <i className="fa-solid fa-circle" />
                          <span>15 Mar 2023</span>
                        </div>
                        <p>
                          Lorem Ipsum available but the or majority have that suffered alteration
                          words which don&apos;t look even slightly believable. There are many
                          available but the majority the have suffered alteration. There are many
                          variations of dumm passages Lorem majority the have the suffered
                          alteration.
                        </p>
                        <Link to="#">Reply</Link>
                      </div>
                    </li>
                    <li className="author-group d-md-flex align-items-center justify-content-start">
                      <div className="profile-pic">
                        <Link to="#" className="d-inline-block">
                          <ImageWithBasePath src="assets/img/profiles/avatar-05.jpg" alt="User" />
                        </Link>
                      </div>
                      <div className="info">
                        <div className="head d-flex align-items-center justify-content-start">
                          <h5>Besant</h5>
                          <i className="fa-solid fa-circle" />
                          <span>15 Mar 2023</span>
                        </div>
                        <p>
                          Lorem Ipsum available but the or majority have that suffered alteration
                          words which don&apos;t look even slightly believable. There are many
                          available but the majority the have suffered alteration. There are many
                          variations of dumm passages Lorem majority the have the suffered
                          alteration.
                        </p>
                        <Link to="#">Reply</Link>
                      </div>
                    </li>
                    <li className="author-group d-md-flex align-items-center justify-content-start">
                      <div className="profile-pic">
                        <Link to="#" className="d-inline-block">
                          <ImageWithBasePath src="assets/img/profiles/avatar-06.jpg" alt="User" />
                        </Link>
                      </div>
                      <div className="info">
                        <div className="head d-flex align-items-center justify-content-start">
                          <h5>Maria Fin</h5>
                          <i className="fa-solid fa-circle" />
                          <span>15 Mar 2023</span>
                        </div>
                        <p>
                          Lorem Ipsum available but the or majority have that suffered alteration
                          words which don&apos;t look even slightly believable. There are many
                          available but the majority the have suffered alteration. There are many
                          variations of dumm passages Lorem majority the have the suffered
                          alteration.
                        </p>
                        <Link to="#">Reply</Link>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              {/* /Comments */}
              <div className="card new-comment">
                <h4>Enter Details</h4>
                <form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter Name"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter Email Address"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="phonenumber"
                      placeholder="Enter Phone Number"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="comments" className="form-label">
                      Details
                    </label>
                    <textarea
                      className="form-control"
                      id="comments"
                      rows={3}
                      placeholder="Enter Comments"
                      defaultValue={''}
                    />
                  </div>
                  <button type="button" className="btn btn-gradient">
                    Write Review
                  </button>
                </form>
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
                    {/* Blog */}
                    <div className="featured-venues-item">
                      <div className="listing-item mb-0">
                        <div className="listing-img">
                          <Link to={routes.blogDetails}>
                            <ImageWithBasePath src="assets/img/venues/venues-07.jpg" alt="Venue" />
                          </Link>
                          <div
                            className="fav-item-venues news-sports"
                            key={1}
                            onClick={() => handleItemClick(1)}
                          >
                            <span className="tag tag-blue">Badminton</span>
                            <div className="list-reviews coche-star">
                              <Link
                                to="#"
                                className={`fav-icon ${selectedItems[1] ? 'selected' : ''}`}
                              >
                                <i className="feather-heart" />
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="listing-content news-content">
                          <div className="listing-venue-owner">
                            <div className="navigation">
                              <Link to="#">
                                <ImageWithBasePath
                                  src="assets/img/profiles/avatar-01.jpg"
                                  alt="User"
                                />
                                Orlando Waters
                              </Link>
                              <span>
                                <i className="feather-calendar" />
                                15 May 2023
                              </span>
                            </div>
                          </div>
                          <h3 className="listing-title">
                            <Link to="#">
                              A Great And Fun Activity For You And Your Entire Family
                            </Link>
                          </h3>
                          <div className="listing-button read-new">
                            <ul className="nav">
                              <li>
                                <i className="feather-heart" />
                                45
                              </li>
                              <li>
                                <i className="feather-message-square" />
                                45
                              </li>
                            </ul>
                            <span>
                              <ImageWithBasePath src="assets/img/icons/clock.svg" alt="Icon" />
                              10 Min To Read
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Blog */}
                    {/* Blog */}
                    <div className="featured-venues-item">
                      <div className="listing-item mb-0">
                        <div className="listing-img">
                          <Link to={routes.blogDetails}>
                            <ImageWithBasePath src="assets/img/venues/venues-08.jpg" alt="Venue" />
                          </Link>
                          <div
                            className="fav-item-venues news-sports"
                            key={2}
                            onClick={() => handleItemClick(2)}
                          >
                            <span className="tag tag-blue">Sports Activites</span>
                            <div className="list-reviews coche-star">
                              <Link
                                to="#"
                                className={`fav-icon ${selectedItems[2] ? 'selected' : ''}`}
                              >
                                <i className="feather-heart" />
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="listing-content news-content">
                          <div className="listing-venue-owner">
                            <div className="navigation">
                              <Link to="#">
                                <ImageWithBasePath
                                  src="assets/img/profiles/avatar-06.jpg"
                                  alt="User"
                                />
                                Claire Nichols
                              </Link>
                              <span>
                                <i className="feather-calendar" />
                                16 Jun 2023
                              </span>
                            </div>
                          </div>
                          <h3 className="listing-title">
                            <Link to="#">
                              Sports Make Us A Lot Stronger And Healthier Than We Think
                            </Link>
                          </h3>
                          <div className="listing-button read-new">
                            <ul className="nav">
                              <li>
                                <i className="feather-heart" />
                                35
                              </li>
                              <li>
                                <i className="feather-message-square" />
                                35
                              </li>
                            </ul>
                            <span>
                              <ImageWithBasePath src="assets/img/icons/clock.svg" alt="Icon" />
                              12 Min To Read
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Blog */}
                    {/* Blog */}
                    <div className="featured-venues-item">
                      <div className="listing-item mb-0">
                        <div className="listing-img">
                          <Link to={routes.blogDetails}>
                            <ImageWithBasePath src="assets/img/venues/venues-09.jpg" alt="Venue" />
                          </Link>
                          <div
                            className="fav-item-venues news-sports"
                            key={3}
                            onClick={() => handleItemClick(3)}
                          >
                            <span className="tag tag-blue">Rules of Game</span>
                            <div className="list-reviews coche-star">
                              <Link
                                to="#"
                                className={`fav-icon ${selectedItems[3] ? 'selected' : ''}`}
                              >
                                <i className="feather-heart" />
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="listing-content news-content">
                          <div className="listing-venue-owner">
                            <div className="navigation">
                              <Link to="#">
                                <ImageWithBasePath
                                  src="assets/img/profiles/avatar-06.jpg"
                                  alt="User"
                                />
                                Joanna Le
                              </Link>
                              <span>
                                <i className="feather-calendar" />
                                11 May 2023
                              </span>
                            </div>
                          </div>
                          <h3 className="listing-title">
                            <Link to="#">We Organize Events &amp; Parties in our Club</Link>
                          </h3>
                          <div className="listing-button read-new">
                            <ul className="nav">
                              <li>
                                <i className="feather-heart" />
                                25
                              </li>
                              <li>
                                <i className="feather-message-square" />
                                25
                              </li>
                            </ul>
                            <span>
                              <ImageWithBasePath src="assets/img/icons/clock.svg" alt="Icon" />
                              14 Min To Read
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Blog */}
                    {/* Blog */}
                    <div className="featured-venues-item">
                      <div className="listing-item mb-0">
                        <div className="listing-img">
                          <Link to={routes.blogDetails}>
                            <ImageWithBasePath src="assets/img/venues/venues-08.jpg" alt="Venue" />
                          </Link>
                          <div
                            className="fav-item-venues news-sports"
                            key={4}
                            onClick={() => handleItemClick(4)}
                          >
                            <span className="tag tag-blue">Sports Activites</span>
                            <div className="list-reviews coche-star">
                              <Link
                                to="#"
                                className={`fav-icon ${selectedItems[4] ? 'selected' : ''}`}
                              >
                                <i className="feather-heart" />
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="listing-content news-content">
                          <div className="listing-venue-owner">
                            <div className="navigation">
                              <Link to="#">
                                <ImageWithBasePath
                                  src="assets/img/profiles/avatar-01.jpg"
                                  alt="User"
                                />
                                Mart Sublin
                              </Link>
                              <span>
                                <i className="feather-calendar" />
                                12 May 2023
                              </span>
                            </div>
                          </div>
                          <h3 className="listing-title">
                            <Link to="#">
                              Sports Make Us A Lot Stronger And Healthier Than We Think
                            </Link>
                          </h3>
                          <div className="listing-button read-new">
                            <ul className="nav">
                              <li>
                                <i className="feather-heart" />
                                35
                              </li>
                              <li>
                                <i className="feather-message-square" />
                                35
                              </li>
                            </ul>
                            <span>
                              <ImageWithBasePath src="assets/img/icons/clock.svg" alt="Icon" />
                              12 Min To Read
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Blog */}
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

export default BlogDetailsSidebarLeft
