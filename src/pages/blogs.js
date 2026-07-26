import React from 'react'
import { graphql } from 'gatsby'
import Seo from '../components/seo'
import Layout from '../components/layout'
import Blog from '../components/blog'

const BlogIndex = ({ data }) => {
  const blogs = data.allMarkdownRemark.edges

  return (
    <Layout>
      <div className="layout-container">
        <div className="blog-page">
          <p className="blog-page__text">blogs</p>
          <section className="post-container">
            {blogs.map(post => (
              <Blog
                title={post.node.frontmatter.title}
                date={post.node.frontmatter.date}
                path={post.node.frontmatter.path}
                key={post.node.id}
              />
            ))}
          </section>
        </div>
      </div>
    </Layout>
  )
}

export const Head = ({ location }) => (
  <Seo
    title="Blogs | Oghenero Adaware"
    description="All technical blogs by Oghenero Adaware (finallynero) on React, Node.js, TypeScript, Golang, AI, and software engineering."
    pathname={location?.pathname}
  />
)

export const pageQuery = graphql`
  query BlogIndexQuery {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { date: { lte: "now" } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            path
            title
            date
          }
        }
      }
    }
  }
`

export default BlogIndex
