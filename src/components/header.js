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
        <div className="header__border">
          <HeaderBorder className="header__border__image" />
        </div>
        <header>
          <div className="navbar">
            <Link to="/">
              <img src={Logo} alt="Oghenero Adaware Logo" className="logo__image" />
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
