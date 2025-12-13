import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

const Hero = ({ data }) => {
  return (
    <section className="hero" style={{ textAlign: 'center' }} itemScope itemType="https://schema.org/Person">
      <div className="content">
        <p className="introtext">Hi, I'm</p>
        <h1 className="introtext1" itemProp="name">Oghenero Adaware</h1>
        <meta itemProp="alternateName" content="finallynero" />
        <meta itemProp="jobTitle" content="Software Engineer" />
        <meta itemProp="url" content="https://finallynero.dev" />
        
        <p className="introsubtext" itemProp="description">
          I am <span itemProp="jobTitle">software engineer</span> with experience building fullstack web and
          mobile applications using <span itemProp="knowsAbout">Typescript</span>, <span itemProp="knowsAbout">Node</span>, <span itemProp="knowsAbout">React</span>, and <span itemProp="knowsAbout">React Native</span>. I have shipped agentic <span itemProp="knowsAbout">AI</span> media applications using React Native, <span itemProp="knowsAbout">Python</span> and <span itemProp="knowsAbout">WebRTC</span>.
        </p>
      
        <p className="introsubtext">
          Over the years I have been lucky to learn from and lead engineers to
          deliver quality products in distributed teams.
        </p>
        <p className="introsubtext">
          Outside work you will find me watching videos about how random
          technologies work, daydreaming about automating my day to day
          processes, watching football or listening to podcasts.
        </p>
       
        <p className="introsubtext">
          You can contact me at  <a href="mailto:nero[2][0][0][9](at)rocketmail(dot)com" className={`inline-link${Math.floor(Math.random() * 3) + 1}`} itemProp="email">nero[2][0][0][9](at)rocketmail(dot)com</a>
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
