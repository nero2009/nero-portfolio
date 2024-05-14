import React from 'react'
import Github from '../../assets/github2.svg'
import ExternalLink from '../../assets/external.svg'
import Img from 'gatsby-image'

const portfolioItem = props => {
  return (
    <React.Fragment>
      <div className="portfolio">
        <div className="portfolio__work">
          <div className="tab">
            <div className="tab__button" />
            <div className="tab__button" />
          </div>
          <Img fluid={props.image} />
        </div>
        <div className="portfolio__description">
          <p>{props.title}</p>
          <div className="portfolio__description__links">
            {props.link.github && (
              <a
                href={props.link.github}
                target="__blank"
                rel="noopener noreferrer"
                aria-label="github"
              >
                <Github style={{ width: 20, height: 20 }} />
              </a>
            )}
            {props.link.live && (
              <a
                href={props.link.live}
                target="__blank"
                rel="noopener noreferrer"
                aria-label="live demo"
              >
                <ExternalLink style={{ width: 20, height: 20 }} />
              </a>
            )}
          </div>
        </div>
        <div className="portfolio__stack">
          <p>Tech Used: {props.tech}</p>
        </div>
      </div>
    </React.Fragment>
  )
}

export default portfolioItem
