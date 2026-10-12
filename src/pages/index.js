import React from 'react'
import { graphql, Link } from 'gatsby'
import Seo from '../components/seo'
import Layout from '../components/layout'
import Blog from '../components/blog'
import Hero from '../components/hero'
import kebabCase from '../utils/kebabCase'

const VISIBLE_POSTS = 3
const VISIBLE_TAGS = 6

const blogs = ({ data }) => {
  const allBlogs = data.allMarkdownRemark.edges
  const latestPosts = allBlogs.slice(0, VISIBLE_POSTS)
  const hasMorePosts = allBlogs.length > VISIBLE_POSTS

  const tagCounts = {}
  allBlogs.forEach(({ node }) => {
    if (node.frontmatter.tags) {
      node.frontmatter.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1
      })
    }
  })

  // Prefer popular tags so the short list stays useful
  const sortedTags = Object.keys(tagCounts).sort(
    (a, b) => tagCounts[b] - tagCounts[a] || a.localeCompare(b)
  )
  const visibleTags = sortedTags.slice(0, VISIBLE_TAGS)
  const hasMoreTags = sortedTags.length > VISIBLE_TAGS

  return (
    <Layout className="home">
      <div className="home__shell">
        <Hero />
        <div className="layout-container home__content">
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

            {visibleTags.length > 0 && (
              <div className="all-tags-section">
                <p className="blog-page__text blog-page__text--soft">topics</p>
                <div className="all-tags-container">
                  {visibleTags.map(tag => (
                    <Link
                      key={tag}
                      to={`/tags/${kebabCase(tag)}/`}
                      className="tag-item"
                    >
                      <span className="tag-item__name">{tag}</span>
                      <span className="tag-item__count">({tagCounts[tag]})</span>
                    </Link>
                  ))}
                  {hasMoreTags && (
                    <Link to="/tags" className="tag-item tag-item--more">
                      <span className="tag-item__name">more</span>
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
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
