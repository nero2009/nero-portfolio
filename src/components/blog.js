import React from 'react'
import { Link } from 'gatsby'

const blog = ({ date, title, description, path }) => {
  let formattedDate = new Date(date).toISOString().slice(0, 10)
  return (
    <>
      <section className="post">
        <Link to={path} style={{ textDecoration: 'none', color: '#333' }}>
          <h2 className="post__title">{title}</h2>
          <p className="post__description">{description}</p>
          <p className="post__date">{formattedDate}</p>
          <p className="post__readMore">Read more</p>
        </Link>
      </section>
    </>
  )
}

export default blog
