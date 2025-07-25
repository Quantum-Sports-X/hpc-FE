import React, {useState} from 'react'

interface Image {
  className?: string
  src: string
  alt?: string
  height?: number
  width?: number
  id?: string
}

const ImageWithBasePath = (props: Image) => {
  const [imageLoaded, setImageLoaded] = useState(true)

  const handleError = () => {
    setImageLoaded(false)
  }
  // Combine the base path and the provided src to create the full image source URL
  const fullSrc = `${process.env.REACT_APP_BASE_PATH}${props.src}`

  if (!imageLoaded) {
    return null
  }

  return (
    <img
      className={props.className}
      src={fullSrc}
      height={props.height}
      alt={props.alt}
      width={props.width}
      id={props.id}
      onError={handleError}
    />
  )
}

export default ImageWithBasePath
