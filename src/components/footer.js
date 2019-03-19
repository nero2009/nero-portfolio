import React from 'react'
import Social from './social'

const footer = () => {
  return (
    <div className="footer">
      <div className="footer__icons">
        <Social />
      </div>
      <div className="footer__text">
        <p>
          Designed and Coded with{' '}
          <span role="img" aria-label="love">
            &#10084;&#65039;
          </span>{' '}
          by Finallynero
        </p>
      </div>
    </div>
  )
}

export default footer
