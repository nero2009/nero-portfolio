import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import HeaderBorder from '../../assets/header-border.svg'
import SEO from '../components/seo'

const about = ({ data }) => {
  return (
    <Layout>
      <SEO title="About" />
      <div className="layout-container">
        <div className="about-page">
          <p className="about-page__text">
            about <span>me</span>
          </p>
          <HeaderBorder style={{ width: 100 }} />
        </div>
        <div className="about-container">
          <div className="about__image">
            <figure>
              <Img fluid={data.aboutImage.fluid} />
            </figure>
          </div>
          <div className="about ">
            <p className="about__title">Hi, I am Oghenero Adaware.</p>
            <p className="about__text">
              I am a <strong>Frontend developer</strong> who specializes in{' '}
              <strong>React, Gatsby and Vue js</strong>. I quite familiar with
              the toolings around the React ecosystem. I also play with Figma
              sometimes hoping that I can up my UI design skillset. I am an
              active open source contributor at{' '}
              <a
                href="http://codingcoach.io"
                target="__blank"
                rel="noopener noreferrer"
                className="inline-link"
              >
                codingcoach.io
              </a>{' '}
              and made several contributions to other open source projects like
              Gatsby, for some reason I am always up for open source work. I
              also like writing technical articles about technologies I have
              used and find interesting. When I am not coding or writing
              technical articles I watch football, play football video games,
              argue about football on twitter, watch basketball and listen to
              awesome podcasts like{' '}
              <a
                href="https://casefilepodcast.com/"
                target="__blank"
                rel="noopener noreferrer"
                className="inline-link"
              >
                Casefile true crime
              </a>
              ,{' '}
              <a
                href="https://syntax.fm/"
                target="__blank"
                rel="noopener noreferrer"
                className="inline-link"
              >
                Syntax
              </a>
              ,{' '}
              <a
                href="https://www.bbc.co.uk/programmes/p06kyljg/episodes/downloads"
                target="__blank"
                rel="noopener noreferrer"
                className="inline-link"
              >
                That Peter Crouch podcast
              </a>{' '}
              e.t.c. Finally I am an advocate for{' '}
              <a
                href="https://dev.to/finallynero/building-accessible-forms--46ke"
                target="__blank"
                rel="noopener noreferrer"
                className="inline-link"
              >
                building accessible
              </a>{' '}
              <a
                href="https://dev.to/finallynero/accessible-emojis--1pjh"
                target="__blank"
                rel="noopener noreferrer"
                className="inline-link"
              >
                web applications
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const aboutQuery = graphql`
  query AboutImageQuery {
    aboutImage: imageSharp(
      fluid: { originalName: { regex: "/chiefThatsit.png/" } }
    ) {
      fluid(maxWidth: 800) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`

export default about
