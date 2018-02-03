import React, { Component } from 'react'
import Progress from '../components/progress'
import './index.less'
let duration = null
class Index extends Component {
  constructor() {
    super()
    this.state = {
      progress: 0,
      volume: 0,
      isPlay: true,
      leftTime: ''
    }
  }
  componentDidMount() {
    $('#player').bind($.jPlayer.event.timeupdate, e => {
      duration = e.jPlayer.status.duration
      console.log(e.jPlayer.status.currentPercentAbsolute)
      this.setState({
        progress: e.jPlayer.status.currentPercentAbsolute,
        volume: e.jPlayer.options.volume * 100,
        leftTime: this.formatTime(
          duration * (1 - e.jPlayer.status.currentPercentAbsolute / 100)
        )
      })
    })
  }
  componentWillUnmount() {
    $('#player').unbind($.jPlayer.event.timeupdate)
  }
  changeVolumeHandler() {}
  changeProgressHandler(progress) {
    $('#player').jPlayer('play', duration * progress)
    this.setState({
      isPlay: true
    })
  }
  play() {}
  next() {}
  prev() {}
  changeRepeat() {}
  formatTime(time) {
    time = Math.floor(time)
    let miniute = Math.floor(time / 60)
    let seconds = Math.floor(time % 60)

    return miniute + ':' + (seconds < 10 ? '0' + seconds : seconds)
  }
  render() {
    return (
      <div className="page-index">
        <h1 className="caption">我的私人音乐坊 &gt;</h1>
        <div className="mt20 row">
          <div className="controll-wrapper">
            {/* <h2 className="music-title">11111</h2>
            <h3 className="music-artist mt10">111</h3> */}
            {/* <div className="row mt20">
              <div className="left-time -col-auto">-0</div>
              <div className="volume-container">
                <i className="icon-volume rt" style={{ top: 5, left: -5 }} />
                <div className="volume-wrapper">
                  <Progress
                    progress={this.state.volume}
                    onProgressChange={this.changeVolumeHandler}
                    barColor="#aaa"
                  />
                </div>
              </div>
            </div> */}
            <div style={{ height: '10px', lineHeight: '10px' }}>
              <Progress
                progress={this.state.progress}
                onProgressChange={this.changeProgressHandler.bind(this)}
              />
            </div>
            {/* <div className="mt35 row">
              <div>
                <i className="icon prev" onClick={this.prev} />
                <i
                  className={`icon ml20 ${
                    this.state.isPlay ? 'pause' : 'play'
                  }`}
                  onClick={this.play}
                />
                <i className="icon next ml20" onClick={this.next} />
              </div>
              <div className="-col-auto">
                <i
                  className={`icon repeat-${this.props.repeatType}`}
                  onClick={this.changeRepeat}
                />
              </div>
            </div> */}
          </div>
          {/* <div className="-col-auto cover" /> */}
        </div>
      </div>
    )
  }
}

export default Index
