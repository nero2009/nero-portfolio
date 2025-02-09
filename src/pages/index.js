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
     
      <div className="layout-container">
        {/* <div className="aboutme-container">
          <p className="aboutme-container__text">
            My Name is Nero, A senior software engineer and mobile engineer, building scalable solutions for the pst 8 years
          </p>
          <p>
            Over the years, I have scaled up mobile applications and web based applications for startups and enterprises.
          </p>
          <p>
            During my career, I have worked in different industries, implementing a multiplatform crypto markets, a Media streaming solution for realtime communication between patients and doctors using WebRTC and a Highly scalable microservices for a healthtech platform.
          </p>
        </div> */}
        <div className="blog-page">
          <p className="blog-page__text">blogs</p>
          <HeaderBorder style={{ width: 100 }} />
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

export const Head = () => (
  <SEO title="Articles" description={'Software engineering articles written by Nero Adaware'} />
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
