import React from 'react'
import { graphql } from 'gatsby'
import SEO from '../components/seo'
import Layout from '../components/layout'
import Blog from '../components/blog'
import Hero from '../components/hero'
import HeaderBorder from '../../assets/header-border.svg'

const blogs = ({ data }) => {
  const sortedByDate = data.allMarkdownRemark.edges.sort(
    (a, b) => new Date(a.node.frontmatter.date) - new Date(b.node.frontmatter.date)
  )
  return (
    <Layout>
      <Hero />
      <div className="layout-container">
        <div className="blog-page">
          <p className="blog-page__text">blogs</p>
          <HeaderBorder style={{ width: 100 }} />
          <section className="post-container">
            {sortedByDate.map(post => (
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
  <SEO
    title="Oghenero Adaware - Software Engineer | Full Stack Developer"
    description="Oghenero Adaware (finallynero) is a Software Engineer with expertise in TypeScript, React, Node.js, React Native, Python, and AI. Building fullstack web and mobile applications. Connect with Oghenero Adaware for software engineering opportunities."
    pathname={location?.pathname}
  />
)

export const pageQuery = graphql`
  query BlogListQuery {
    allMarkdownRemark(
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
          }
        }
      }
    }
  }
`

export default blogs

