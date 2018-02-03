import React, { Component } from 'react'
import './progress.less'

class Progress extends Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.changeProgress = this.changeProgress.bind(this)
  }
  changeProgress(e) {
    let progressBar = this.progressBar
    let progress =
      (e.clientX - progressBar.getBoundingClientRect().left) /
      progressBar.clientWidth
    this.props.onProgressChange && this.props.onProgressChange(progress)
  }
  render() {
    return (
      <div
        className="com-progress"
        ref={progressBar => {
          this.progressBar = progressBar
        }}
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
Progress.defaultProps = {
  barColor: '#2f9842'
}
export default Progress
