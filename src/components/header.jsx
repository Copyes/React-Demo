import React, { Component } from 'react'
import './header.less'

class Header extends Component {
  render() {
    return (
      <div className="row com-logo">
        <img
          src="./src/assets/images/logo.png"
          width="40"
          alt=""
          className="-col-auto"
        />
        <h1 className="caption">Music Player Build By React</h1>
      </div>
    )
  }
}

export default Header
