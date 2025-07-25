import React from 'react'
import {Link} from 'react-router-dom'

interface PaginationLink {
  label: string
  active: boolean
}

interface PaginationProps {
  previousPage: number
  nextPage: number
  links: PaginationLink[]
}

export const PaginationComponent: React.FC<PaginationProps> = ({previousPage, nextPage, links}) => {
  if (previousPage === nextPage) return null

  return (
    <div className="blog-pagination">
      <nav>
        <ul className="pagination justify-content-center pagination-center">
          {links.map(link => {
            if (link.label.includes('Previous')) {
              return (
                <li key={link.label} className="page-item previtem">
                  <Link className="page-link" to={`?page=${previousPage}`}>
                    <i className="feather-chevron-left" />
                  </Link>
                </li>
              )
            } else if (link.label.includes('Next')) {
              return (
                <li key={link.label} className="page-item nextlink">
                  <Link className="page-link" to={`?page=${nextPage}`}>
                    <i className="feather-chevron-right" />
                  </Link>
                </li>
              )
            } else {
              return (
                <li key={link.label} className={`page-item ${link.active ? 'active' : ''}`}>
                  <Link
                    className={`page-link ${link.active ? 'active' : ''}`}
                    to={`?page=${link.label}`}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            }
          })}
        </ul>
      </nav>
    </div>
  )
}
