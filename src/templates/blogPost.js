import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

export default function Template({ data }) {
  const blog = data.markdownRemark
  return (
    <Layout>
      <div className="layout-container">
        <h1 className="article__title">{blog.frontmatter.title}</h1>
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
