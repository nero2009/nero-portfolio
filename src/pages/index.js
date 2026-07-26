import React from 'react'
import { graphql, Link } from 'gatsby'
import Seo from '../components/seo'
import Layout from '../components/layout'
import Blog from '../components/blog'
import Hero from '../components/hero'
import kebabCase from '../utils/kebabCase'

const blogs = ({ data }) => {
  const allBlogs = data.allMarkdownRemark.edges
  const latestPosts = allBlogs.slice(0, 4)
  const hasMorePosts = allBlogs.length > 4

  // Collect all unique tags with their counts
  const tagCounts = {}
  allBlogs.forEach(({ node }) => {
    if (node.frontmatter.tags) {
      node.frontmatter.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1
      })
    }
  })

  // Sort tags alphabetically
  const sortedTags = Object.keys(tagCounts).sort()

  return (
    <Layout>
      <Hero />
      <div className="layout-container">
        <div className="blog-page">
          <p className="blog-page__text">blogs</p>
          <section className="post-container">
            {latestPosts.map(post => (
              <Blog
                title={post.node.frontmatter.title}
                date={post.node.frontmatter.date}
                path={post.node.frontmatter.path}
                key={post.node.id}
              />
            ))}
          </section>

          {hasMorePosts && (
            <Link to="/blogs" className="blog-page__more">
              view more
            </Link>
          )}

          {/* All Tags Section */}
          <p className="blog-page__text">feeling lucky? try a random post</p>
          {sortedTags.length > 0 && (
            <div className="all-tags-section">
              <div className="all-tags-container">
                {sortedTags.map(tag => (
                  <Link
                    key={tag}
                    to={`/tags/${kebabCase(tag)}/`}
                    className="tag-item"
                  >
                    <span className="tag-item__name">{tag}</span>
                    <span className="tag-item__count">({tagCounts[tag]})</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export const Head = ({ location }) => (
  <Seo
    title="Oghenero Adaware - Software Engineer | Full Stack Developer"
    description="Oghenero Adaware (finallynero) is a Software Engineer with expertise in TypeScript, React, Node.js, React Native, Python, and AI. Building fullstack web and mobile applications. Connect with Oghenero Adaware for software engineering opportunities."
    pathname={location?.pathname}
  />
)

export const pageQuery = graphql`
  query BlogListQuery {
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
            author
            date
            description
            tags
          }
        }
      }
    }
  }
`

export default blogs

