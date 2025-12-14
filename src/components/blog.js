import React from 'react'
import { Link } from 'gatsby'

const _ = require('lodash')

const blog = ({ date, title, path, tags }) => {
  let formattedDate = new Date(date).toISOString().slice(0, 10)
  return (
    <article className="post-item">
      <Link to={path} className="post-item__link">
        <span className="post-item__date">{formattedDate}</span>
        <span className="post-item__separator"> - </span>
        <span className="post-item__title">{title}</span>
      </Link>
      {tags && tags.length > 0 && (
        <div className="post-item__tags">
          {tags.map(tag => (
            <Link
              key={tag}
              to={`/tags/${_.kebabCase(tag)}/`}
              className="post-item__tag"
            >
              {tag}
            </Link>
          ))}
        </div>
      )}
    </article>
  )
}

export default blog
