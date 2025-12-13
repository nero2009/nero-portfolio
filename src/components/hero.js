import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

const Hero = ({ data }) => {
  return (
    <section className="hero" itemScope itemType="https://schema.org/Person">
      <div className="content">
        {/* <p className="introtext">Hi, I'm</p> */}
        <h1 className="introtext1" itemProp="name">Oghenero Adaware</h1>
        <meta itemProp="alternateName" content="finallynero" />
        <meta itemProp="jobTitle" content="Software Engineer" />
        <meta itemProp="url" content="https://finallynero.dev" />
        
        <p className="introsubtext" itemProp="description">
          Software Engineer. Building fullstack web and
          mobile applications with <span itemProp="knowsAbout">TypeScript</span>, <span itemProp="knowsAbout">Node</span>, <span itemProp="knowsAbout">React</span>, and <span itemProp="knowsAbout">React Native</span>. 
          Currently shipping AI media applications.
        </p>
      
        <p className="introsubtext">
          I learn from and lead engineers to deliver quality products in distributed teams.
        </p>
        <p className="introsubtext">
          Outside work: Random tech videos, automation daydreams, football, podcasts.
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
