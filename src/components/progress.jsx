import React, { Component } from 'react'
import './progress'

class Progress extends Component {
  getDefaulrProps() {
    return {
      barColor: '#2f9842'
    }
  }
  changeProgress(e) {
    let progressBar = this.refs.progressBar
    let progress =
      (e.clientX - progressBar.getBoundingClientRect().left) /
      progressBar.clientWidth
    console.log(progress)
  }
  render() {
    return (
      <div
        className="com-progress"
        ref="progressBar"
        onClick={this.changeProgress}
      >
        <div
          className="progress"
          style={{
            width: `${this.props.progress}%`,
            background: this.props.barColor
          }}
        />
      </div>
    )
  }
}

export default Progress
