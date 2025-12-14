import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import HeaderBorder from '../../assets/header-border.svg'

const _ = require('lodash')

const TagsPage = ({ data }) => {
  const allTags = data.allMarkdownRemark.group

  return (
    <Layout>
      <div className="layout-container">
        <div className="tags-page">
          <p className="tags-page__text">
            all <span>tags</span>
          </p>
          <HeaderBorder style={{ width: 100 }} />
          <div className="tags-container">
            {allTags.map(tag => (
              <Link
                key={tag.fieldValue}
                to={`/tags/${_.kebabCase(tag.fieldValue)}/`}
                className="tag-bubble"
              >
                <span className="tag-name">{tag.fieldValue}</span>
                <span className="tag-count">({tag.totalCount})</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const Head = ({ location }) => (
  <SEO
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

