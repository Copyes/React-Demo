import React, { Component } from 'react'
import './header.less'

class Header extends Component {
  render() {
    return (
      <div className="com-logo">
        <img
          src="./src/assets/images/logo.png"
          width="40"
          alt=""
          className="logo"
        />
        <h1 className="caption">Music Player Build By React</h1>
      </div>
    )
  }
}

export default Header
