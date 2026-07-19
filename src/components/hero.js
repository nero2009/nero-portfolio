import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

const Hero = () => {
  return (
    <section className="hero" itemScope itemType="https://schema.org/Person">
      <div className="content">
        {/* <p className="introtext">Hi, I'm</p> */}
        <h1 className="introtext1" itemProp="name">Oghenero Adaware</h1>
        <meta itemProp="alternateName" content="finallynero" />
        <meta itemProp="jobTitle" content="Software Engineer" />
        <meta itemProp="url" content="https://finallynero.dev" />
        
        <p className="introsubtext" itemProp="description">
          Software Engineer with over 9 years experience building fullstack web,
          mobile applications and AI applications.
        </p>
        <p className="introsubtext">
          <a href="mailto:nero2009@rocketmail.com" className="simple-link" itemProp="email">nero2009@rocketmail.com</a>
        </p>
      </div>
    </section>
  )
}

export default props => (
  <StaticQuery
    query={graphql`
      query HeroImageQuery {
        heroImage: imageSharp(
          fluid: { originalName: { regex: "/hero-header.png/" } }
        ) {
          fluid(maxWidth: 800) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    `}
    render={data => <Hero data={data} {...props} />}
  />
)
