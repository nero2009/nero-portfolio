import React from 'react'
import { Link } from 'gatsby'

const blog = ({ date, title, path }) => {
  let formattedDate = new Date(date).toISOString().slice(0, 10)
  return (
    <article className="post-item">
      <Link to={path} className="post-item__link">
        <span className="post-item__date">{formattedDate}</span>
        <span className="post-item__separator"> - </span>
        <span className="post-item__title">{title}</span>
      </Link>
    </article>
  )
}

export default blog
