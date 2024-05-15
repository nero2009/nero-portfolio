import React from 'react'
import { graphql } from 'gatsby'
import SEO from '../components/seo'
import Layout from '../components/layout'
import Blog from '../components/blog'
import HeaderBorder from '../../assets/header-border.svg'

const blogs = ({ data }) => {
  const sortedByDate = data.allMarkdownRemark.edges.sort(
    (a, b) => new Date(a.node.frontmatter.date) - new Date(b.node.frontmatter.date)
  )
  return (
    <Layout>
      <SEO title="Blog" />
      <div className="layout-container">
        <div className="blog-page">
          <p className="blog-page__text">blog</p>
          <HeaderBorder style={{ width: 100 }} />
          <p
            style={{
              background: '#B8D8D8',
              padding: '15px',
              fontSize: '.8em',
              color: '#666',
              marginTop: '30px',
            }}
          >
            I cross post some blog post on{' '}
            <a
              href="https://dev.to/finallynero"
              target="__blank"
              rel="noopener noreferrer"
              style={{ color: 'gray', textDecoration: 'none' }}
            >
              Dev Community
            </a>
          </p>
          <section className="post-container">
            {sortedByDate.map(post => (
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
