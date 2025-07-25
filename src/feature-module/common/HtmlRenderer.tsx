import React from 'react'

export const HtmlRenderer = ({htmlContent}: any) => {
  return <span dangerouslySetInnerHTML={{__html: htmlContent}} />
}
