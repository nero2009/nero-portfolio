import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import Progress from '../../assets/progress.svg'
import HeaderBorder from '../../assets/header-border.svg'

const work = ({ data }) => {
  return (
    <Layout>
      <div className="layout-container">
        <div className="about-page">
          <p className="about-page__text">Portfolio</p>
          <HeaderBorder style={{ width: 100 }} />
          <div className="portfolio-container">
            <div className="portfolio">
              <div className="portfolio__work">
                <Img sizes={data.portfolioImage1.sizes} />
              </div>
              <div className="portfolio__text">
                <p>Save and Flex</p>
              </div>
            </div>
            <div className="portfolio__work">
              <Img sizes={data.portfolioImage2.sizes} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const portfolioQuery = graphql`
  query PorfolioImageQuery {
    portfolioImage1: imageSharp(
      fluid: { originalName: { regex: "/savenflex.PNG/" } }
    ) {
      sizes(maxWidth: 512, maxHeight: 300) {
        ...GatsbyImageSharpSizes
      }
    }
    portfolioImage2: imageSharp(
      fluid: { originalName: { regex: "/Nero-site.png/" } }
    ) {
      sizes(maxWidth: 512, maxHeight: 300) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`
export default work
