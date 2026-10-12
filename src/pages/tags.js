import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import Seo from '../components/seo'
import BackArrow from '../components/backArrow'
import kebabCase from '../utils/kebabCase'

const TagsPage = ({ data }) => {
  const allTags = data.allMarkdownRemark.group

  return (
    <Layout>
      <div className="layout-container">
        <div className="tags-page">
          <Link to="/" className="article-back-button" aria-label="Back to home">
            <BackArrow />
          </Link>
          <p className="blog-page__text">topics</p>
          <div className="tags-container">
            {allTags.map(tag => (
              <Link
                key={tag.fieldValue}
                to={`/tags/${kebabCase(tag.fieldValue)}/`}
                className="tag-item"
              >
                <span className="tag-item__name">{tag.fieldValue}</span>
                <span className="tag-item__count">({tag.totalCount})</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const Head = ({ location }) => (
  <Seo
    title="All Tags | Oghenero Adaware"
    description="Browse all tags and topics covered on Oghenero Adaware's technical blog. Explore articles about React, Node.js, Golang, TypeScript, and more."
    pathname={location?.pathname}
  />
)

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      limit: 2000
      filter: { frontmatter: { date: { lte: "now" } } }
    ) {
      group(field: { frontmatter: { tags: SELECT } }) {
        fieldValue
        totalCount
      }
    }
  }
`

export default TagsPage


