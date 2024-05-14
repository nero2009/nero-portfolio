import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Typist from 'react-typist'
import HeroImage from '../../assets/coding1.svg'
import BgHero from '../../assets/hero-header.svg'

const Hero = ({ data }) => {
  return (
    <section className="hero" style={{ textAlign: 'center' }}>
      <div className="hero__image-mobile">
        <HeroImage className="hero__image" />
      </div>
      <div className="hero__image-desktop">
        <BgHero className="hero__image-desktop__image" />
      </div>
      <div className="hero__image-text">
        <h1 className="hero__text">
          Hi, I'm Nero, I'm a
          <Typist
            cursor={{
              show: false,
            }}
          >
            <span style={{ color: '#FE5F55' }}>Dog Lover</span>
            <Typist.Backspace count={9} delay={300} />
            <span style={{ color: '#4F6367' }}>Man Utd fan</span>
            <Typist.Backspace count={11} delay={300} />
            <span style={{ color: '#4F86C6' }}>Frontend Developer</span>
          </Typist>
        </h1>
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
