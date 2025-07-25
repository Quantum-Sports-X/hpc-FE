import React from 'react'
import {Link} from 'react-router-dom'
import ImageWithBasePath from '../../core/data/img/ImageWithBasePath'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'

const VenueDetails = () => {
  const images = {
    dots: false,
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  }
  return (
    <div>
      {/*Galler Slider Section*/}
      <div className="bannergallery-section">
        <div className="main-gallery-slider owl-carousel owl-theme">
          <Slider {...images} className="venue-space">
            <div className="gallery-widget-item">
              <Link to="#" data-fancybox="gallery1">
                <ImageWithBasePath
                  className="img-fluid"
                  alt="Image"
                  src="assets/img/gallery/gallery1/gallery-01.png"
                />
              </Link>
            </div>
            <div className="gallery-widget-item">
              <Link to="#" data-fancybox="gallery1">
                <ImageWithBasePath
                  className="img-fluid"
                  alt="Image"
                  src="assets/img/gallery/gallery1/gallery-02.png"
                />
              </Link>
            </div>
            <div className="gallery-widget-item">
              <Link to="#" data-fancybox="gallery1">
                <ImageWithBasePath
                  className="img-fluid"
                  alt="Image"
                  src="assets/img/gallery/gallery1/gallery-03.png"
                />
              </Link>
            </div>
            <div className="gallery-widget-item">
              <Link to="#" data-fancybox="gallery1">
                <ImageWithBasePath
                  className="img-fluid"
                  alt="Image"
                  src="assets/img/gallery/gallery1/gallery-04.png"
                />
              </Link>
            </div>
            <div className="gallery-widget-item">
              <Link to="#" data-fancybox="gallery1">
                <ImageWithBasePath
                  className="img-fluid"
                  alt="Image"
                  src="assets/img/gallery/gallery1/gallery-05.png"
                />
              </Link>
            </div>
            <div className="gallery-widget-item">
              <Link to="#" data-fancybox="gallery1">
                <ImageWithBasePath
                  className="img-fluid"
                  alt="Image"
                  src="assets/img/gallery/gallery1/gallery-01.png"
                />
              </Link>
            </div>
            <div className="gallery-widget-item">
              <Link to="#" data-fancybox="gallery1">
                <ImageWithBasePath
                  className="img-fluid"
                  alt="Image"
                  src="assets/img/gallery/gallery1/gallery-02.png"
                />
              </Link>
            </div>
          </Slider>
        </div>
        <div className="showphotos corner-radius-10">
          <Link to="#" data-fancybox="gallery1">
            <i className="fa-regular fa-images" />
            More Photos
          </Link>
        </div>
      </div>
      <div className="venue-info white-bg d-block">
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-6">
              <h1 className="d-flex align-items-center justify-content-start">
                Badminton Academy
                <span className="d-flex justify-content-center align-items-center">
                  <i className="fas fa-check-double" />
                </span>
              </h1>
              <ul className="d-sm-flex justify-content-start align-items-center">
                <li>
                  <i className="feather-map-pin" />
                  70 Bright St New York, USA
                </li>
                <li>
                  <i className="feather-phone-call" />
                  +3 80992 31212
                </li>
                <li>
                  <i className="feather-mail" />
                  <Link to="mailto:yourmail@example.com"> yourmail@example.com</Link>
                </li>
              </ul>
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-6 text-right">
              <ul className="social-options float-lg-end d-sm-flex justify-content-start align-items-center">
                <li>
                  <Link to="#">
                    <i className="feather-share-2" />
                    Share
                  </Link>
                </li>
                <li>
                  <Link to="#" className="favour-adds">
                    <i className="feather-star" />
                    Add to favourite
                  </Link>
                </li>
                <li className="venue-review-info d-flex justify-content-start align-items-center">
                  <span className="d-flex justify-content-center align-items-center">5.0</span>
                  <div className="review">
                    <div className="rating">
                      <i className="fas fa-star filled" />
                      <i className="fas fa-star filled" />
                      <i className="fas fa-star filled" />
                      <i className="fas fa-star filled" />
                      <i className="fas fa-star filled" />
                    </div>
                    <p className="mb-0">
                      <Link to="#">15 Reviews</Link>
                    </p>
                  </div>
                  <i className="fa-regular fa-comments" />
                </li>
              </ul>
            </div>
          </div>
          <hr />
          <div className="row bottom-row d-flex align-items-center">
            <div className="col-12 col-sm-12 col-md-6 col-lg-6">
              <ul className="d-sm-flex details">
                <li>
                  <div className="profile-pic">
                    <Link to="#" className="venue-type">
                      <ImageWithBasePath
                        className="img-fluid"
                        src="assets/img/icons/venue-type.svg"
                        alt="Icon"
                      />
                    </Link>
                  </div>
                  <div className="ms-2">
                    <p>Venue Type</p>
                    <h6 className="mb-0">Indoor</h6>
                  </div>
                </li>
                <li>
                  <div className="profile-pic">
                    <Link to="#">
                      <ImageWithBasePath
                        className="img-fluid"
                        src="assets/img/profiles/avatar-01.jpg"
                        alt="Icon"
                      />
                    </Link>
                  </div>
                  <div className="ms-2">
                    <p>Added By</p>
                    <h6 className="mb-0">Hendry Williams</h6>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6">
              <div className="d-flex float-sm-end align-items-center">
                <p className="d-inline-block me-2 mb-0">Starts From :</p>
                <h3 className="primary-text mb-0 d-inline-block">
                  $150<span>/ hr</span>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Page Content */}
      <div className="content">
        <div className="container">
          {/* Row */}
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-8">
              <div className="venue-options white-bg mb-4">
                <ul className="clearfix">
                  <li className="active">
                    <Link to="#overview">Overview</Link>
                  </li>
                  <li>
                    <Link to="#includes">Includes</Link>
                  </li>
                  <li>
                    <Link to="#rules">Rules</Link>
                  </li>
                  <li>
                    <Link to="#amenities">Amenities</Link>
                  </li>
                  <li>
                    <Link to="#gallery">Gallery</Link>
                  </li>
                  <li>
                    <Link to="#reviews">Reviews</Link>
                  </li>
                  <li>
                    <Link to="#location">Locations</Link>
                  </li>
                </ul>
              </div>
              {/* Accordian Contents */}
              <div className="accordion" id="accordionPanel">
                <div className="accordion-item mb-4" id="overview">
                  <h4 className="accordion-header" id="panelsStayOpen-overview">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#panelsStayOpen-collapseOne"
                      aria-expanded="true"
                      aria-controls="panelsStayOpen-collapseOne"
                    >
                      Overview
                    </button>
                  </h4>
                  <div
                    id="panelsStayOpen-collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="panelsStayOpen-overview"
                  >
                    <div className="accordion-body">
                      <div className="text show-more-height">
                        <p>
                          Badminton Academy is a renowned sports facility situated in Sacramento,
                          CA. With a commitment to providing high-quality services, we offer a range
                          of amenities and equipment to support athletes in their training and
                          development.
                        </p>
                        <p>
                          Our facility is equipped with state-of-the-art features, ensuring a
                          conducive environment for athletes to excel in their respective sports.
                        </p>
                        <p>
                          Whether you&apos;re a professional athlete or a sports enthusiast, Sarah
                          Sports Academy is the ideal place to enhance your skills and achieve your
                          goals. Contact Mart Dublin for more information and to book your next
                          training session.
                        </p>
                      </div>
                      <div className="show-more d align-items-center primary-text">
                        <i className="feather-plus-circle" />
                        Show More
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item mb-4" id="includes">
                  <h4 className="accordion-header" id="panelsStayOpen-includes">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#panelsStayOpen-collapseTwo"
                      aria-expanded="false"
                      aria-controls="panelsStayOpen-collapseTwo"
                    >
                      Includes
                    </button>
                  </h4>
                  <div
                    id="panelsStayOpen-collapseTwo"
                    className="accordion-collapse collapse show"
                    aria-labelledby="panelsStayOpen-includes"
                  >
                    <div className="accordion-body">
                      <ul className="clearfix">
                        <li>
                          <i className="feather-check-square" />
                          Badminton Racket Unlimited
                        </li>
                        <li>
                          <i className="feather-check-square" />
                          Bats
                        </li>
                        <li>
                          <i className="feather-check-square" />
                          Hitting Machines
                        </li>
                        <li>
                          <i className="feather-check-square" />
                          Multiple Courts
                        </li>
                        <li>
                          <i className="feather-check-square" />
                          Spare Players
                        </li>
                        <li>
                          <i className="feather-check-square" />
                          Instant Racket
                        </li>
                        <li>
                          <i className="feather-check-square" />
                          Green Turfs
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="accordion-item mb-4" id="rules">
                  <h4 className="accordion-header" id="panelsStayOpen-rules">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#panelsStayOpen-collapseThree"
                      aria-expanded="false"
                      aria-controls="panelsStayOpen-collapseThree"
                    >
                      Rules
                    </button>
                  </h4>
                  <div
                    id="panelsStayOpen-collapseThree"
                    className="accordion-collapse collapse show"
                    aria-labelledby="panelsStayOpen-rules"
                  >
                    <div className="accordion-body">
                      <ul>
                        <li>
                          <p>
                            <i className="feather-alert-octagon" />
                            Non Marking Shoes are recommended not mandatory for Cricket.
                          </p>
                        </li>
                        <li>
                          <p>
                            <i className="feather-alert-octagon" />A maximum number of members per
                            booking per cricket court is admissible fixed by Venue Vendors
                          </p>
                        </li>
                        <li>
                          <p>
                            <i className="feather-alert-octagon" />
                            No pets, no seeds, no gum, no glass, no hitting or swinging outside of
                            the cage
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="accordion-item mb-4" id="amenities">
                  <h4 className="accordion-header" id="panelsStayOpen-amenities">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#panelsStayOpen-collapseFour"
                      aria-expanded="false"
                      aria-controls="panelsStayOpen-collapseFour"
                    >
                      Amenities
                    </button>
                  </h4>
                  <div
                    id="panelsStayOpen-collapseFour"
                    className="accordion-collapse collapse show"
                    aria-labelledby="panelsStayOpen-amenities"
                  >
                    <div className="accordion-body">
                      <ul className="d-md-flex justify-content-between align-items-center">
                        <li>
                          <i className="fa fa-check-circle" aria-hidden="true" />
                          Parking
                        </li>
                        <li>
                          <i className="fa fa-check-circle" aria-hidden="true" />
                          Drinking Water
                        </li>
                        <li>
                          <i className="fa fa-check-circle" aria-hidden="true" />
                          First Aid
                        </li>
                        <li>
                          <i className="fa fa-check-circle" aria-hidden="true" />
                          Change Room
                        </li>
                        <li>
                          <i className="fa fa-check-circle" aria-hidden="true" />
                          Shower
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="accordion-item mb-4" id="gallery">
                  <h4 className="accordion-header" id="panelsStayOpen-gallery">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#panelsStayOpen-collapseFive"
                      aria-expanded="false"
                      aria-controls="panelsStayOpen-collapseFive"
                    >
                      Gallery
                    </button>
                  </h4>
                  <div
                    id="panelsStayOpen-collapseFive"
                    className="accordion-collapse collapse show"
                    aria-labelledby="panelsStayOpen-gallery"
                  >
                    <div className="accordion-body">
                      <div className="owl-carousel gallery-slider owl-theme">
                        <Slider {...settings}>
                          <Link className="corner-radius-10" to="#" data-fancybox="gallery3">
                            <ImageWithBasePath
                              className="img-fluid corner-radius-10"
                              alt="Image"
                              src="assets/img/gallery/gallery2/gallery-01.jpg"
                            />
                          </Link>
                          <Link className="corner-radius-10" to="#" data-fancybox="gallery3">
                            <ImageWithBasePath
                              className="img-fluid corner-radius-10"
                              alt="Image"
                              src="assets/img/gallery/gallery2/gallery-02.jpg"
                            />
                          </Link>
                          <Link className="corner-radius-10" to="#" data-fancybox="gallery3">
                            <ImageWithBasePath
                              className="img-fluid corner-radius-10"
                              alt="Image"
                              src="assets/img/gallery/gallery2/gallery-03.jpg"
                            />
                          </Link>
                          <Link className="corner-radius-10" to="#" data-fancybox="gallery3">
                            <ImageWithBasePath
                              className="img-fluid corner-radius-10"
                              alt="Image"
                              src="assets/img/gallery/gallery2/gallery-01.jpg"
                            />
                          </Link>
                          <Link className="corner-radius-10" to="#" data-fancybox="gallery3">
                            <ImageWithBasePath
                              className="img-fluid corner-radius-10"
                              alt="Image"
                              src="assets/img/gallery/gallery2/gallery-02.jpg"
                            />
                          </Link>
                          <Link className="corner-radius-10" to="#" data-fancybox="gallery3">
                            <ImageWithBasePath
                              className="img-fluid corner-radius-10"
                              alt="Image"
                              src="assets/img/gallery/gallery2/gallery-03.jpg"
                            />
                          </Link>
                        </Slider>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item mb-4" id="reviews">
                  <div className="accordion-header" id="panelsStayOpen-reviews">
                    <div
                      className="accordion-button d-flex justify-content-between align-items-center"
                      data-bs-toggle="collapse"
                      data-bs-target="#panelsStayOpen-collapseSix"
                      aria-controls="panelsStayOpen-collapseSix"
                    >
                      <span className="w-75 mb-0">Reviews</span>
                      <Link
                        to="#"
                        className="btn btn-gradient pull-right write-review add-review"
                        data-bs-toggle="modal"
                        data-bs-target="#add-review"
                      >
                        Write a review
                      </Link>
                    </div>
                  </div>
                  <div
                    id="panelsStayOpen-collapseSix"
                    className="accordion-collapse collapse show"
                    aria-labelledby="panelsStayOpen-reviews"
                  >
                    <div className="accordion-body">
                      <div className="row review-wrapper">
                        <div className="col-lg-3">
                          <div className="ratings-info corner-radius-10 text-center">
                            <h3>4.8</h3>
                            <span>out of 5.0</span>
                            <div className="rating">
                              <i className="fas fa-star filled" />
                              <i className="fas fa-star filled" />
                              <i className="fas fa-star filled" />
                              <i className="fas fa-star filled" />
                              <i className="fas fa-star filled" />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-9">
                          <div className="recommended">
                            <h5>Recommended by 97% of Players</h5>
                            <div className="row">
                              <div className="col-12 col-sm-12 col-md-4 col-lg-4 mb-3">
                                <p className="mb-0">Quality of service</p>
                                <ul>
                                  <li>
                                    <i />
                                  </li>
                                  <li>
                                    <i />
                                  </li>
                                  <li>
                                    <i />
                                  </li>
                                  <li>
                                    <i />
                                  </li>
                                  <li>
                                    <i />
                                  </li>
                                  <li>
                                    <span>5.0</span>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-12 col-sm-12 col-md-4 col-lg-4 mb-3">
                                <p className="mb-0">Quality of service</p>
                                <ul>
                                  <li>
                                    <i />
                                  </li>
                                  <li>
                                    <i />
                                  </li>
                                  <li>
                                    <i />
                                  </li>
                                  <li>
                                    <i />
                                  </li>
                                  <li>
                                    <i />
                                  </li>
                                  <li>
                                    <span>5.0</span>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-12 col-sm-12 col-md-4 col-lg-4 mb-3">
                                <p className="mb-0">Quality of service</p>
                                <ul>
                                  <li>
                                    <i />
                                  </li>
                                  <li>
                                    <i />
                                  </li>
                                  <li>
                                    <i />
                                  </li>
                                  <li>
                                    <i />
                                  </li>
                                  <li>
                                    <i />
                                  </li>
                                  <li>
                                    <span>5.0</span>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-12 col-sm-12 col-md-4 col-lg-4">
                                <p className="mb-0">Quality of service</p>
                                <ul>
                                  <li>
                                    <i />
                                  </li>
                                  <li>
                                    <i />
                                  </li>
                                  <li>
                                    <i />
                                  </li>
                                  <li>
                                    <i />
                                  </li>
                                  <li>
                                    <i />
                                  </li>
                                  <li>
                                    <span>5.0</span>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-12 col-sm-12 col-md-4 col-lg-4">
                                <p className="mb-0">Quality of service</p>
                                <ul>
                                  <li>
                                    <i />
                                  </li>
                                  <li>
                                    <i />
                                  </li>
                                  <li>
                                    <i />
                                  </li>
                                  <li>
                                    <i />
                                  </li>
                                  <li>
                                    <i />
                                  </li>
                                  <li>
                                    <span>5.0</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Review Box */}
                      <div className="review-box d-md-flex">
                        <div className="review-profile">
                          <ImageWithBasePath src="assets/img/profiles/avatar-01.jpg" alt="User" />
                        </div>
                        <div className="review-info">
                          <h6 className="mb-2 tittle">Amanda Booked on 06/04/2023</h6>
                          <div className="rating">
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <span>5.0</span>
                          </div>
                          <span className="success-text">
                            <i className="feather-check" />
                            Yes, I would book again.
                          </span>
                          <h6>Absolutely perfect</h6>
                          <p>
                            If you are looking for a perfect place for friendly matches with your
                            friends or a competitive match, It is the best place.
                          </p>
                          <ul className="review-gallery clearfix">
                            <li>
                              <Link
                                to="assets/img/gallery/gallery-thumb-01.jpg"
                                data-fancybox="gallery"
                              >
                                <ImageWithBasePath
                                  className="img-fluid"
                                  alt="Image"
                                  src="assets/img/gallery/gallery-01.jpg"
                                />
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="assets/img/gallery/gallery-thumb-02.jpg"
                                data-fancybox="gallery"
                              >
                                <ImageWithBasePath
                                  className="img-fluid"
                                  alt="Image"
                                  src="assets/img/gallery/gallery-02.jpg"
                                />
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="assets/img/gallery/gallery-thumb-03.jpg"
                                data-fancybox="gallery"
                              >
                                <ImageWithBasePath
                                  className="img-fluid"
                                  alt="Image"
                                  src="assets/img/gallery/gallery-03.jpg"
                                />
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="assets/img/gallery/gallery-thumb-04.jpg"
                                data-fancybox="gallery"
                              >
                                <ImageWithBasePath
                                  className="img-fluid"
                                  alt="Image"
                                  src="assets/img/gallery/gallery-04.jpg"
                                />
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="assets/img/gallery/gallery-thumb-05.jpg"
                                data-fancybox="gallery"
                              >
                                <ImageWithBasePath
                                  className="img-fluid"
                                  alt="Image"
                                  src="assets/img/gallery/gallery-05.jpg"
                                />
                              </Link>
                            </li>
                          </ul>
                          <span className="post-date">Sent on 11/03/2023</span>
                        </div>
                      </div>
                      {/* /Review Box */}
                      {/* Review Box */}
                      <div className="review-box d-md-flex">
                        <div className="review-profile">
                          <ImageWithBasePath src="assets/img/profiles/avatar-06.jpg" alt="User" />
                        </div>
                        <div className="review-info">
                          <h6 className="mb-2 tittle">Amanda Booked on 06/04/2023</h6>
                          <div className="rating">
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <span>5.0</span>
                          </div>
                          <span className="warning-text">
                            <i className="feather-x" />
                            No, I dont want to book again.
                          </span>
                          <h6>Awesome. Its very convenient to play.</h6>
                          <p>
                            If you are looking for a perfect place for friendly matches with your
                            friends or a competitive match, It is the best place.
                          </p>
                          <div className="dull-bg">
                            <p>
                              Experience cricket excellence at Cricket Academy. Top-notch
                              facilities, well-maintained courts, and a friendly atmosphere. Highly
                              recommended for an exceptional playing experience
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* /Review Box */}
                      <div className="d-flex justify-content-center mt-1">
                        <button
                          type="button"
                          className="btn btn-load-more d-flex justify-content-center align-items-center"
                        >
                          Load More
                          <i className="feather-plus-square" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item" id="location">
                  <h4 className="accordion-header" id="panelsStayOpen-location">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#panelsStayOpen-collapseSeven"
                      aria-expanded="false"
                      aria-controls="panelsStayOpen-collapseSeven"
                    >
                      Location
                    </button>
                  </h4>
                  <div
                    id="panelsStayOpen-collapseSeven"
                    className="accordion-collapse collapse show"
                    aria-labelledby="panelsStayOpen-location"
                  >
                    <div className="accordion-body">
                      <div className="google-maps">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2967.8862835683544!2d-73.98256668525309!3d41.93829486962529!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89dd0ee3286615b7%3A0x42bfa96cc2ce4381!2s132%20Kingston%20St%2C%20Kingston%2C%20NY%2012401%2C%20USA!5e0!3m2!1sen!2sin!4v1670922579281!5m2!1sen!2sin"
                          height={445}
                          style={{border: 0}}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                      </div>
                      <div className="dull-bg d-flex justify-content-start align-items-center mt-3">
                        <div className="white-bg me-2">
                          <i className="fas fa-location-arrow" />
                        </div>
                        <div>
                          <h6>Our Venue Location</h6>
                          <p>70 Bright St New York, USA</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Accordian Contents */}
            </div>
            <aside className="col-12 col-sm-12 col-md-12 col-lg-4 theiaStickySidebar">
              <div className="stickybar">
                <div className="white-bg d-flex justify-content-start align-items-center availability">
                  <div>
                    <span className="icon-bg">
                      <ImageWithBasePath
                        className="img-fluid"
                        alt="Icon"
                        src="assets/img/icons/head-calendar.svg"
                      />
                    </span>
                  </div>
                  <div>
                    <h4>Availability</h4>
                    <p className="mb-0">Check availability on your convenient time</p>
                  </div>
                </div>
                <div className="white-bg book-court">
                  <h4 className="border-bottom">Book A Court</h4>
                  <h5 className="d-inline-block">Badminton Academy,</h5>
                  <p className="d-inline-block"> available Now</p>
                  <ul className="d-sm-flex align-items-center justify-content-evenly">
                    <li>
                      <h3 className="d-inline-block primary-text">$150</h3>
                      <span>/hr</span>
                      <p>up to 1 guests</p>
                    </li>
                    <li>
                      <span>
                        <i className="feather-plus" />
                      </span>
                    </li>
                    <li>
                      <h4 className="d-inline-block primary-text">$5</h4>
                      <span>/hr</span>
                      <p>
                        each additional guest <br />
                        up to 4 guests max
                      </p>
                    </li>
                  </ul>
                  <div className="d-grid btn-block mt-3">
                    <Link
                      to="coach-details.html"
                      className="btn btn-secondary d-inline-flex justify-content-center align-items-center"
                    >
                      <i className="feather-calendar" />
                      Book Now
                    </Link>
                  </div>
                </div>
                <div className="white-bg">
                  <h4 className="border-bottom">Request for Availability</h4>
                  <form>
                    <div className="mb-10">
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
                    <div className="mb-10">
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
                    <div className="mb-10">
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
                    <div className="mb-10">
                      <label htmlFor="date" className="form-label">
                        Date
                      </label>
                      <div className="form-icon">
                        <input
                          type="text"
                          className="form-control datetimepicker"
                          placeholder="Select Date"
                          id="date"
                        />
                        <span className="cus-icon">
                          <i className="feather-calendar" />
                        </span>
                      </div>
                    </div>
                    <div className="mb-10">
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
                    <div>
                      <label className="form-label">Number of Guests</label>
                      <div className="input-group">
                        <input type="number" className="form-control" defaultValue={1} readOnly />
                        <input
                          type="number"
                          className="form-control active"
                          defaultValue={2}
                          readOnly
                        />
                        <input type="number" className="form-control" defaultValue={3} readOnly />
                        <input type="number" className="form-control" defaultValue={4} readOnly />
                      </div>
                    </div>
                    <div className="form-check d-flex justify-content-start align-items-center policy">
                      <div className="d-inline-block">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="policy"
                          defaultChecked
                        />
                      </div>
                      <label className="form-check-label" htmlFor="policy">
                        By clicking &apos;Send Request&apos;, I agree to Dreamsport Privacy Policy
                        and Terms of Use
                      </label>
                    </div>
                    <div className="d-grid btn-block">
                      <Link
                        to="#"
                        className="btn btn-secondary d-inline-flex justify-content-center align-items-center"
                      >
                        Send Request
                        <i className="feather-arrow-right-circle ms-1" />
                      </Link>
                    </div>
                  </form>
                </div>
                <div className="white-bg cage-owner-info">
                  <h4 className="border-bottom">Cage Owner Details</h4>
                  <div className="d-flex justify-content-start align-items-center">
                    <div className="profile-pic">
                      <Link to="#">
                        <ImageWithBasePath
                          className="img-fluid"
                          alt="User"
                          src="assets/img/profiles/avatar-05.jpg"
                        />
                      </Link>
                    </div>
                    <div>
                      <h5>Hendry Williams</h5>
                      <div className="rating">
                        <i className="fas fa-star filled" />
                        <i className="fas fa-star filled" />
                        <i className="fas fa-star filled" />
                        <i className="fas fa-star filled" />
                        <i className="fas fa-star filled" />
                        <span>5.0</span>
                        <span>(20 Reviews)</span>
                      </div>
                    </div>
                  </div>
                  <div className="d-grid btn-block text-center mt-3">
                    <Link
                      to="contact-us.html"
                      className="btn btn-secondary d-inline-flex justify-content-center align-items-center"
                    >
                      <i className="feather-phone-call" />
                      Call Owner
                    </Link>
                  </div>
                </div>
                <div className="white-bg listing-owner">
                  <h4 className="border-bottom">Listing By Owner</h4>
                  <ul>
                    <li className="d-flex justify-content-start align-items-center">
                      <div>
                        <Link to="blog-details.html">
                          <ImageWithBasePath
                            className="img-fluid"
                            alt="Venue"
                            src="assets/img/listing-by-owner-01.jpg"
                          />
                        </Link>
                      </div>
                      <div className="owner-info">
                        <h5>
                          <Link to="blog-details.html">Manchester Academy</Link>
                        </h5>
                        <p>
                          <i className="feather-map-pin" />
                          <span>Sacramento, CA</span>
                        </p>
                        <p className="mb-0">
                          <i className="feather-calendar" />
                          <span>Next Availablity : </span>
                          <span className="primary-text">15 May 2023</span>
                        </p>
                      </div>
                    </li>
                    <li className="d-flex justify-content-start align-items-center">
                      <div>
                        <Link to="blog-details.html">
                          <ImageWithBasePath
                            className="img-fluid"
                            alt="Venue"
                            src="assets/img/listing-by-owner-02.jpg"
                          />
                        </Link>
                      </div>
                      <div className="owner-info">
                        <h5>
                          <Link to="blog-details.html">Sarah Sports Academy</Link>
                        </h5>
                        <p>
                          <i className="feather-map-pin" />
                          <span>Sacramento, CA</span>
                        </p>
                        <p className="mb-0">
                          <i className="feather-calendar" />
                          <span>Next Availablity : </span>
                          <span className="primary-text">15 May 2023</span>
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="white-bg">
                  <h4 className="border-bottom">Share Venue</h4>
                  <ul className="social-medias d-flex">
                    <li className="facebook">
                      <Link to="#">
                        <i className="fa-brands fa-facebook-f" />
                      </Link>
                    </li>
                    <li className="instagram">
                      <Link to="#">
                        <i className="fa-brands fa-instagram" />
                      </Link>
                    </li>
                    <li className="behance">
                      <Link to="#">
                        <i className="fa-brands fa-behance" />
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
                    <li className="linkedin">
                      <Link to="#">
                        <i className="fa-brands fa-linkedin" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
          {/* /Row */}
        </div>
        {/* /Container */}
        <section className="section innerpagebg">
          <div className="container">
            <div className="featured-slider-group">
              <h3 className="mb-40">Similar Venues</h3>
              <div className="owl-carousel featured-venues-slider owl-theme">
                <Slider {...settings}>
                  {/* Featured Item */}
                  <div className="featured-venues-item">
                    <div className="listing-item mb-0">
                      <div className="listing-img">
                        <Link to="venue-details.html">
                          <ImageWithBasePath src="assets/img/venues/venues-01.jpg" alt="Venue" />
                        </Link>
                        <div className="fav-item-venues">
                          <span className="tag tag-blue">Featured</span>
                          <h5 className="tag tag-primary">
                            $450<span>/hr</span>
                          </h5>
                        </div>
                      </div>
                      <div className="listing-content">
                        <div className="list-reviews">
                          <div className="d-flex align-items-center">
                            <span className="rating-bg">4.2</span>
                            <span>300 Reviews</span>
                          </div>
                          <Link to="#" className="fav-icon">
                            <i className="feather-heart" />
                          </Link>
                        </div>
                        <h3 className="listing-title">
                          <Link to="venue-details.html">Sarah Sports Academy</Link>
                        </h3>
                        <div className="listing-details-group">
                          <p>
                            Elevate your athletic journey at Sarah Sports Academy, where excellence
                            meets opportunity.
                          </p>
                          <ul>
                            <li>
                              <span>
                                <i className="feather-map-pin" />
                                Port Alsworth, AK
                              </span>
                            </li>
                            <li>
                              <span>
                                <i className="feather-calendar" />
                                Next Availablity : <span className="primary-text">15 May 2023</span>
                              </span>
                            </li>
                          </ul>
                        </div>
                        <div className="listing-button">
                          <div className="listing-venue-owner">
                            <Link className="navigation">
                              <ImageWithBasePath
                                src="assets/img/profiles/avatar-01.jpg"
                                alt="User"
                              />
                              Mart Sublin
                            </Link>
                          </div>
                          <Link to="venue-details.html" className="user-book-now">
                            <span>
                              <i className="feather-calendar me-2" />
                            </span>
                            Book Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /Featured Item */}
                  {/* Featured Item */}
                  <div className="featured-venues-item">
                    <div className="listing-item mb-0">
                      <div className="listing-img">
                        <Link to="venue-details.html">
                          <ImageWithBasePath
                            src="assets/img/venues/venues-02.jpg"
                            className="img-fluid"
                            alt="Venues"
                          />
                        </Link>
                        <div className="fav-item-venues">
                          <span className="tag tag-blue">Top Rated</span>
                          <h5 className="tag tag-primary">
                            $200<span>/hr</span>
                          </h5>
                        </div>
                      </div>
                      <div className="listing-content">
                        <div className="list-reviews">
                          <div className="d-flex align-items-center">
                            <span className="rating-bg">5.0</span>
                            <span>150 Reviews</span>
                          </div>
                          <Link to="#" className="fav-icon">
                            <i className="feather-heart" />
                          </Link>
                        </div>
                        <h3 className="listing-title">
                          <Link to="venue-details.html">Badminton Academy</Link>
                        </h3>
                        <div className="listing-details-group">
                          <p>
                            Unleash your cricket potential at our premier Cricket Academy, where
                            champions are made
                          </p>
                          <ul>
                            <li>
                              <span>
                                <i className="feather-map-pin" />
                                Sacramento, CA
                              </span>
                            </li>
                            <li>
                              <span>
                                <i className="feather-calendar" />
                                Next Availablity : <span className="primary-text">15 May 2023</span>
                              </span>
                            </li>
                          </ul>
                        </div>
                        <div className="listing-button">
                          <div className="listing-venue-owner">
                            <Link className="navigation">
                              <ImageWithBasePath
                                src="assets/img/profiles/avatar-02.jpg"
                                alt="User"
                              />
                              Rebecca
                            </Link>
                          </div>
                          <Link to="venue-details.html" className="user-book-now">
                            <span>
                              <i className="feather-calendar me-2" />
                            </span>
                            Book Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /Featured Item */}
                  {/* Featured Item */}
                  <div className="featured-venues-item">
                    <div className="listing-item mb-0">
                      <div className="listing-img">
                        <Link to="venue-details.html">
                          <ImageWithBasePath
                            src="assets/img/venues/venues-03.jpg"
                            className="img-fluid"
                            alt="Venues"
                          />
                        </Link>
                        <div className="fav-item-venues">
                          <h5 className="tag tag-primary">
                            $350<span>/hr</span>
                          </h5>
                        </div>
                      </div>
                      <div className="listing-content">
                        <div className="list-reviews">
                          <div className="d-flex align-items-center">
                            <span className="rating-bg">4.7</span>
                            <span>120 Reviews</span>
                          </div>
                          <Link to="#" className="fav-icon">
                            <i className="feather-heart" />
                          </Link>
                        </div>
                        <h3 className="listing-title">
                          <Link to="venue-details.html">Manchester Academy</Link>
                        </h3>
                        <div className="listing-details-group">
                          <p>
                            Manchester Academy: Where dreams meet excellence in sports education and
                            training game.
                          </p>
                          <ul>
                            <li>
                              <span>
                                <i className="feather-map-pin" />
                                Guysville, OH
                              </span>
                            </li>
                            <li>
                              <span>
                                <i className="feather-calendar" />
                                Next Availablity : <span className="primary-text">16 May 2023</span>
                              </span>
                            </li>
                          </ul>
                        </div>
                        <div className="listing-button">
                          <div className="listing-venue-owner">
                            <Link className="navigation">
                              <ImageWithBasePath
                                src="assets/img/profiles/avatar-03.jpg"
                                alt="User"
                              />
                              Andrew
                            </Link>
                          </div>
                          <Link to="venue-details.html" className="user-book-now">
                            <span>
                              <i className="feather-calendar me-2" />
                            </span>
                            Book Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /Featured Item */}
                  {/* Featured Item */}
                  <div className="featured-venues-item">
                    <div className="listing-item mb-0">
                      <div className="listing-img">
                        <Link to="venue-details.html">
                          <ImageWithBasePath
                            src="assets/img/venues/venues-02.jpg"
                            className="img-fluid"
                            alt="Venues"
                          />
                        </Link>
                        <div className="fav-item-venues">
                          <span className="tag tag-blue">Featured</span>
                          <h5 className="tag tag-primary">
                            $450<span>/hr</span>
                          </h5>
                        </div>
                      </div>
                      <div className="listing-content">
                        <div className="list-reviews">
                          <div className="d-flex align-items-center">
                            <span className="rating-bg">4.5</span>
                            <span>300 Reviews</span>
                          </div>
                          <Link to="#" className="fav-icon">
                            <i className="feather-heart" />
                          </Link>
                        </div>
                        <h3 className="listing-title">
                          <Link to="venue-details.html">ABC Sports Academy</Link>
                        </h3>
                        <div className="listing-details-group">
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry.industry&apos;s standard
                          </p>
                          <ul>
                            <li>
                              <span>
                                <i className="feather-map-pin" />
                                Little Rock, AR
                              </span>
                            </li>
                            <li>
                              <span>
                                <i className="feather-calendar" />
                                Next Availablity : <span className="primary-text">17 May 2023</span>
                              </span>
                            </li>
                          </ul>
                        </div>
                        <div className="listing-button">
                          <div className="listing-venue-owner">
                            <Link className="navigation">
                              <ImageWithBasePath
                                src="assets/img/profiles/avatar-04.jpg"
                                alt="User"
                              />
                              Mart Sublin
                            </Link>
                          </div>
                          <Link to="venue-details.html" className="user-book-now">
                            <span>
                              <i className="feather-calendar me-2" />
                            </span>
                            Book Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /Featured Item */}
                </Slider>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* /Page Content */}
    </div>
  )
}

export default VenueDetails
