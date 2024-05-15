import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

const Hero = ({ data }) => {
  return (
    <section className="hero" style={{ textAlign: 'center' }}>
      <div className="content">
        <h1 className="introtext">Hi, I'm</h1>
        <h2 className="introtext1">Nero Adaware</h2>
        <p className="introsubtext">
          I am software engineer with experience building fullstack web and
          mobile using Typescript, Node, React, React Native and Golang.
        </p>
        <p className='introsubtext'>
          At the moment, I am a fullstack engineer and lead the mobile
          development team at{' '}
          <a href="https://halsahemma.se/" className={`inline-link${Math.floor(Math.random() * 3) + 1}`}>
            Hälsa Hemma
          </a>
          . In the past, I have worked with{' '}
          <a href="https://quidax.com/" className={`inline-link${Math.floor(Math.random() * 3) + 1}`}>
            Quidax
          </a>{' '}
          ,{' '}
          <a href="https://almworks.com/" className={`inline-link${Math.floor(Math.random() * 3) + 1}`}>
            Almworks
          </a>{' '}
          and{' '}
          <a href="https://www.hidglobal.com/" className={`inline-link${Math.floor(Math.random() * 3) + 1}`}>
            HID global
          </a>{' '}
          .
        </p>
        <p className="introsubtext">
          Over the years I have been lucky to learn from and lead engineers to
          deliver quality products in distributed and onsite teams.
        </p>
        <p className="introsubtext">
          Outside work you will find me watching videos about how random
          technologies work, daydreaming about automating my day to day
          processes, watching football or listening to podcasts.
        </p>
       
        <p className="introsubtext">
          You can contact me at  <a href="mailto:nero[2][0][0][9](at)rocketmail(dot)com" className={`inline-link${Math.floor(Math.random() * 3) + 1}`}>nero[2][0][0][9](at)rocketmail(dot)com</a>
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
