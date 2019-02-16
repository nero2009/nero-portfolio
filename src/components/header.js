import { Link, graphql } from 'gatsby'
import Img from "gatsby-image";
import PropTypes from 'prop-types'
import React from 'react'

import Menu from '../../assets/icon-menu.svg'
import Close from '../../assets/icon-close.svg'

export default class Header extends React.Component {

  // constructor(props) {
  //   super(props)
  //   this.state = {
  //      active: false
  //   }
  // }

  //   toggleClass=()=>{
  //     const currentState = this.state.active;
  //     this.setState({active: !currentState})
  //   }
  
  render() {
    return (
      <div className="container">
        <header>
          <div className="navbar">
            <div className="logo">
              <p style={{marginTop: "0px"}}>Nero</p>
            </div>
            <nav>
              <a href="#" className="hide-mobile" style={{height:"40px", width:"40px"}}>
                  <Menu className="menu" id="menu"/>
              </a>
              <ul className="show-desktop hide-mobile">
                <li id="exit" className="exit-btn hide-desktop">
                    <Close/>
                </li>
                <li><a href="">Home</a></li>
                <li><a href="">About</a></li>
                <li><a href="">Work</a></li>
                <li><a href="">Blog</a></li>
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

