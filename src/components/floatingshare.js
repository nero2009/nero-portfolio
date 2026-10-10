import React from 'react'
import BrandIcon from './brandIcon'

const floatingshare = props => {
  return (
    <aside className={`floating-share` + (props.show ? '' : ' hide')}>
      <a
        href={`https://twitter.com/intent/tweet?text=${props.title} by Oghenero Adaware(@finallynero) ${props.url}`}
        target="_blank"
        rel="noopener noreferrer"
        className="share__container twitter"
        aria-label="Share on Twitter"
      >
        <BrandIcon name="twitter" className="share__icon" />
      </a>

      <a
        href={`http://www.linkedin.com/shareArticle?url=${props.url}&isFramed=true&lang=es_ES`}
        target="_blank"
        rel="noopener noreferrer"
        className="share__container linkedin"
        aria-label="Share on Linkedin"
      >
        <BrandIcon name="linkedin" className="share__icon" />
      </a>
    </aside>
  )
}

export default floatingshare
