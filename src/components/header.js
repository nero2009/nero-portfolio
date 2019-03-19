import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'
import React from 'react'
import Menu from '../../assets/icon-menu.svg'
import Close from '../../assets/icon-close.svg'
import HeaderBorder from '../../assets/header-border.svg'

export default class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: true,
    }
  }

  toggleClass = () => {
    const currentState = this.state.active
    this.setState({ active: !currentState })
  }

  menuClick = () => {
    alert('i have been clicked')
  }

  render() {
    const { active } = this.state
    const logo = '<NERO/>'
    return (
      <div className="container">
        <div className="header__border" style={{ marginTop: -10 }}>
          <HeaderBorder style={{ width: '100%' }} />
        </div>
        <header>
          <div className="navbar">
            <div className="logo">
              <p style={{ marginTop: '0px' }}>{logo}</p>
            </div>
            <nav className="stroke st-menu st-effect-1">
              <a
                href="#"
                className="hide-desktop"
                style={{ height: '40px', width: '40px' }}
              >
                <Menu className="menu" id="menu" onClick={this.toggleClass} />
              </a>
              <ul className={(active ? 'hide-mobile' : '') + ' show-desktop'}>
                <li id="exit" className="exit-btn hide-desktop">
                  <Close
                    onClick={this.toggleClass}
                    style={{ color: 'white' }}
                  />
                </li>
                <li>
                  <Link activeClassName="active-nav" to="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link activeClassName="active-nav" to="/about/">
                    About
                  </Link>{' '}
                </li>
                <li>
                  <Link activeClassName="active-nav" to="/work/">
                    Work
                  </Link>
                </li>
                <li>
                  <Link activeClassName="active-nav" to="/blogs/">
                    Blog
                  </Link>
                </li>
              </ul>
            </nav>
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
