import React from 'react'

const share = props => {
  return (
    <div className="share">
      <a
        href={`https://twitter.com/intent/tweet?text=${
          props.title
        } by Oghenero Adaware(@finallynero) ${props.url}`}
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
      {/* <a href={``} target="_blank" rel="noopener noreferrer" >
        <img src="https://icongr.am/fontawesome/facebook.svg?color=ffffff" alt="" />
      </a> */}
      <a
        href={`http://www.linkedin.com/shareArticle?url=${
          props.url
        }&isFramed=true&lang=es_ES`}
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
    </div>
  )
}

export default share
