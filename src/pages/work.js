import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import HeaderBorder from '../../assets/header-border.svg'
import SEO from '../components/seo'
import PortfolioItem from '../components/portfolioItem'

const work = ({ data }) => {
  return (
    <Layout>
      <SEO title="Work" />
      <div className="layout-container">
        <div className="about-page">
          <p className="about-page__text">portfolio</p>
          <HeaderBorder style={{ width: 100 }} />
          <div className="portfolio-container">
            <PortfolioItem
              image={data.portfolioImage1.sizes}
              title="Save and Flex"
              tech="React"
              link={{
                github: false,
                live: 'http://www.savenflex.com/',
              }}
            />
            <PortfolioItem
              image={data.portfolioImage2.sizes}
              title="Personal website"
              tech="Gatsby"
              link={{
                github: 'https://github.com/nero2009/nero-portfolio',
                live: 'http://finallynero.dev/',
              }}
            />
            <PortfolioItem
              image={data.portfolioImage3.sizes}
              title="Expense Manager"
              tech="React, Redux, Firebase"
              link={{
                github: 'https://github.com/nero2009/expense-manager/',
                live: 'http://expenses-managers.herokuapp.com/',
              }}
            />
            <PortfolioItem
              image={data.portfolioImage4.sizes}
              title="Company Portal"
              tech="Figma, Gatsby"
              link={{
                github: false,
                live: false,
              }}
            />
            <PortfolioItem
              image={data.portfolioImage5.sizes}
              title="Coding Coach"
              tech="React, Tailwind Css"
              link={{
                github: 'https://github.com/Coding-Coach/coding-coach/',
                live: 'https://codingcoach.io/',
              }}
            />
          </div>
          <div className="portfolio-container__others">
            <p>
              You can check out some of my other interesting project on{' '}
              <a
                href="https://github.com/nero2009"
                className="inline-link"
                aria-label="github"
                target="__blank"
                rel="noopener noreferrer"
              >
                my github
              </a>{' '}
            </p>
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
    portfolioImage3: imageSharp(
      fluid: { originalName: { regex: "/Expense-Manager.png/" } }
    ) {
      sizes(maxWidth: 512, maxHeight: 300) {
        ...GatsbyImageSharpSizes
      }
    }
    portfolioImage4: imageSharp(
      fluid: { originalName: { regex: "/CSRL-Portal.png/" } }
    ) {
      sizes(maxWidth: 512, maxHeight: 300) {
        ...GatsbyImageSharpSizes
      }
    }
    portfolioImage5: imageSharp(
      fluid: { originalName: { regex: "/Coding-coach.png/" } }
    ) {
      sizes(maxWidth: 512, maxHeight: 300) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`
export default work
