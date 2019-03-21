import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

const social = () => (
  <StaticQuery
    query={graphql`
      query SocialQuery {
        site {
          siteMetadata {
            title
            social {
              title
              icon
              link
            }
          }
        }
      }
    `}
    render={data => (
      <div className="social">
        {data.site.siteMetadata.social.map(item => (
          <a
            href={item.link}
            key={item.title}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.title}
            className={`${item.icon}--hover social__icon`}
          >
            <img
              src={
                item.icon === 'dev'
                  ? 'https://d2fltix0v2e0sb.cloudfront.net/dev-badge.svg'
                  : `https://icongr.am/fontawesome/${
                      item.icon
                    }.svg?color=ffffff`
              }
              alt={item.title}
            />
          </a>
        ))}
      </div>
    )}
  />
)

export default social
