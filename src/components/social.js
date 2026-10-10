import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import BrandIcon from './brandIcon'

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
            {item.icon === 'dev' ? (
              <img
                src="https://d2fltix0v2e0sb.cloudfront.net/dev-badge.svg"
                alt=""
              />
            ) : (
              <BrandIcon name={item.icon} />
            )}
          </a>
        ))}
      </div>
    )}
  />
)

export default social
