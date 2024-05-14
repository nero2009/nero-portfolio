import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import Menu from '../../assets/icon-menu.svg'
import Close from '../../assets/icon-close.svg'
import HeaderBorder from '../../assets/header-border.svg'
import Logo from '../images/logo.svg'

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
    return (
      <div className="container">
        {/* <Helmet>
          <meta
            charSet="utf-8"
            name="personal site"
            content="personal site"
            description="Portfolio/blog site of finallynero"
          />
          <title>Nero</title>
        </Helmet> */}
        <div className="header__border">
          <HeaderBorder className="header__border__image" />
        </div>
        <header>
          <div className="navbar">
            <Link to="/">
              <img src={Logo} alt="logo" className="logo__image" />
            </Link>
            <nav className="stroke">
              <a
                href="#"
                className="hide-desktop menu-container"
                aria-label="menu icon"
              >
                <Menu className="menu" id="menu" onClick={this.toggleClass} />
              </a>
              <ul className={(active ? 'hide-mobile' : '') + ' show-desktop'}>
                <li id="exit" className="exit-btn hide-desktop">
                  <Close onClick={this.toggleClass} className="close-icon" />
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
