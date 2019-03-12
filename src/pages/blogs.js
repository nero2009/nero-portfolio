import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/layout'
import Blog from '../components/blog'

const blogs = ({ data }) => {
  return (
    <Layout>
      <div className="layout-container">
        <p
          style={{
            background: '#B8D8D8',
            padding: '15px',
            fontSize: '.8em',
            color: 'white',
            marginTop: '30px',
          }}
        >
          I cross post some blog post on{' '}
          <a href="http://" target="__blank">
            Dev Community
          </a>
        </p>
        <section className="post-container">
          {data.allMarkdownRemark.edges.map(post => (
            <Blog
              title={post.node.frontmatter.title}
              date={post.node.frontmatter.date}
              path={post.node.frontmatter.path}
              description={post.node.frontmatter.description}
              key={post.node.id}
            />
          ))}
        </section>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogListQuery {
    allMarkdownRemark {
      edges {
        node {
          id
          frontmatter {
            path
            title
            author
            date
            description
          }
        }
      }
    }
  }
`

export default blogs
