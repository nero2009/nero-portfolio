import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import Logo from '../images/logo.svg'

export default class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: true,
    }
  }

  render() {
    return (
      <div className="header-container">
        <header>
          <div className="navbar">
            <Link to="/">
              <img src={Logo} alt="Oghenero Adaware Logo" className="logo__image" style={{ width: '120px' }} />
            </Link>
          </div>
        </header>
      </div>
    )
  }
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}
