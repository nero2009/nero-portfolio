import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import Back from '../images/back-arrow.svg'

export default function Template({ data }) {
  const blog = data.markdownRemark
  return (
    <Layout>
      <div className="layout-container">
        <Link to="/blogs" className="article-back-button">
          <img
            src={Back}
            alt="back button"
            className="article-back-button__text"
          />
          Back to articles
        </Link>
        <h1 className="article__title">{blog.frontmatter.title}</h1>
        <div className="divider" />
        <h4 className="article__date">Written by {blog.frontmatter.author}</h4>
        <div
          className="article"
          dangerouslySetInnerHTML={{ __html: blog.html }}
        />
      </div>
    </Layout>
  )
}

export const articleQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
        author
        date
      }
    }
  }
`
