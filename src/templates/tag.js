import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import Blog from '../components/blog'
import SEO from '../components/seo'

const TagTemplate = ({ data, pageContext }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with "${tag}"`

  return (
    <Layout>
      <div className="layout-container">
        <div className="blog-page">
          <div className="tag-page-header">
            <Link to="/tags" className="tag-back-link">
              ← All Tags
            </Link>
            <h1 className="tag-page-title">{tagHeader}</h1>
          </div>
          <section className="post-container">
            {edges.map(({ node }) => (
              <Blog
                key={node.id}
                title={node.frontmatter.title}
                date={node.frontmatter.date}
                path={node.frontmatter.path}
              />
            ))}
          </section>
        </div>
      </div>
    </Layout>
  )
}

export const Head = ({ pageContext, location }) => {
  const { tag } = pageContext
  return (
    <SEO
      title={`Posts tagged with "${tag}" | Oghenero Adaware`}
      description={`Browse all articles tagged with ${tag} by Oghenero Adaware (finallynero). Technical blog posts about ${tag} and software engineering.`}
      pathname={location?.pathname}
    />
  )
}

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { tags: { in: [$tag] }, date: { lte: "now" } } }
    ) {
      totalCount
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

export default TagTemplate

