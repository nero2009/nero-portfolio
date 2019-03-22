import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import HeaderBorder from '../../assets/header-border.svg'

const about = ({ data }) => {
  return (
    <Layout>
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
              <Img sizes={data.aboutImage.sizes} />
              {/* <img src="../images/chiefThatsit.png" alt="" /> */}
            </figure>
          </div>
          <div className="about ">
            <p className="about__title">Hi, I am Nero.</p>
            <p className="about__text">
              I am a{' '}
              <span className="about__text-bold">Frontend developer</span> who
              specializes in React, Gatsby, Vue js. I quite familiar with the
              toolings around the react ecosystem. I also play with Figma
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
              and I have made several contributions to other open source
              projects like Gatsby. I also like writing technical articles about
              technologies I have used and find interesting. When I am not
              coding or writing technical articles I watch football, play
              football video games, argue about football on twitter, watch
              basketball and listen to awesome podcasts like Casefile true
              crime, Syntax, That Peter Crouch podcast e.t.c. Finally I am an
              advocate for{' '}
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
      sizes(maxWidth: 800) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`

export default about
