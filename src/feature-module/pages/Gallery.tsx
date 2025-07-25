import React, {useEffect, useState} from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {Grid, Skeleton} from 'antd'
import {Gallery as GridGallery} from 'react-grid-gallery'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import {all_routes} from '../router/AllRoutes'
import {apiService} from '../../services/apiService'
import {getImagePath} from '../../services/commonService'
import {PaginationComponent} from '../common/Pagination'

const {useBreakpoint} = Grid

const fetchImageDimensions = (src: string) => {
  return new Promise(resolve => {
    const img = new Image()
    img.src = src
    img.onload = () => resolve({width: img.width, height: img.height})
  })
}

const Gallery = () => {
  const routes = all_routes
  const screens = useBreakpoint()
  const [gallery, setGallery] = useState<any | null>(null)
  const [galleryWithDimensions, setGalleryWithDimensions] = useState<any | null>(null)
  const [_error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate() // Hook to redirect

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const page = parseInt(queryParams.get('page') ?? '1')
  const [key, setKey] = useState(-1)

  const handleClick = (index: number) => setKey(index)

  const scrollToTop = () => {
    // need a timeout for the safari issue
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }, 100) // Adjust delay as needed
  }

  useEffect(() => {
    // Fetch gallery data when the component mounts
    setIsLoading(true)
    apiService
      .get(`/api/v1/gallery?page=${page}`)
      .then((response: any) => {
        if (!response || response.data === null) {
          setIsLoading(false)
          navigate('/error-404') // Redirect if coach not found
        } else {
          setGallery(response.data) // Set gallery data
          // scroll to top
          scrollToTop()
          setIsLoading(false)
        }
      })
      .catch(err => {
        setIsLoading(false)
        setError(err.message)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  useEffect(() => {
    if (gallery && gallery?.data?.length > 0) {
      const fetchData = async () => {
        const imagesWithDimensions = await Promise.all(
          gallery?.data?.map(async (image: any) => {
            // @ts-ignore
            const {width, height} = await fetchImageDimensions(getImagePath(image.path))
            return {
              src: getImagePath(image.path),
              width,
              height,
            }
          })
        )
        setGalleryWithDimensions(imagesWithDimensions)
      }

      fetchData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gallery?.data])

  return (
    <div className="main-wrapper gallery-page innerpagebg">
      {/* Breadcrumb */}
      <div className="breadcrumb breadcrumb-list mb-0">
        <span className="primary-right-round" />
        <div className="container">
          <h1 className="text-white">Gallery</h1>
          <ul>
            <li>
              <Link to={routes.home}>Home</Link>
            </li>
            <li>Gallery</li>
          </ul>
        </div>
      </div>
      {/* /Breadcrumb */}
      {/* Page Content */}
      <div className="content hexagon-background-gallery">
        <div className="container">
          <div className="row mb-3">
            {galleryWithDimensions && galleryWithDimensions?.length > 0 && (
              <div className="w-100">
                <GridGallery
                  rowHeight={screens.md ? 300 : 500} // Larger on bigger screens
                  margin={screens.md ? 15 : 5}
                  images={galleryWithDimensions}
                  onClick={handleClick}
                />
                <Lightbox
                  slides={galleryWithDimensions}
                  open={key >= 0}
                  index={key}
                  close={() => setKey(-1)}
                />
              </div>
            )}
            {isLoading && (
              <div className="row">
                <div className="col-md-4 col-6">
                  <Skeleton.Image
                    active
                    className="w-100"
                    style={{height: '250px', borderRadius: '8px'}}
                  />
                </div>
                <div className="col-md-4 col-6">
                  <Skeleton.Image
                    active
                    className="w-100"
                    style={{height: '250px', borderRadius: '8px'}}
                  />
                </div>
                {screens.lg && (
                  <div className="col-md-4">
                    <Skeleton.Image
                      active
                      className="w-100"
                      style={{height: '250px', borderRadius: '8px'}}
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {gallery && gallery.last_page != 1 ? (
            <PaginationComponent
              previousPage={page == 1 ? 1 : page - 1}
              nextPage={
                gallery.current_page == gallery.last_page
                  ? gallery.current_page
                  : gallery.current_page + 1
              }
              links={gallery.links}
            />
          ) : (
            ''
          )}
        </div>
      </div>
      {/* /Page Content */}
    </div>
  )
}

export default Gallery
