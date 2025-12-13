import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const floatingshare = props => {
  return (
    <aside className={`floating-share` + (props.show ? '' : ' hide')}>
      <a
        href={`https://twitter.com/intent/tweet?text=${props.title} by Oghenero Adaware(@finallynero) ${props.url}`}
        target="_blank"
        rel="noopener noreferrer"
        className="share__container twitter"
      >
        <img
          src="https://icongr.am/fontawesome/twitter.svg?color=ffffff"
          alt="Share on Twitter"
          className="share__icon"
          title="Share on Twitter"
        />
      </a>

      <a
        href={`http://www.linkedin.com/shareArticle?url=${props.url}&isFramed=true&lang=es_ES`}
        target="_blank"
        rel="noopener noreferrer"
        className="share__container linkedin"
      >
        <img
          src="https://icongr.am/fontawesome/linkedin.svg?color=ffffff"
          alt="Share on Linkedin"
          className="share__icon"
          title="Share on Linkedin"
        />
      </a>
    </aside>
  )
}

export default floatingshare
