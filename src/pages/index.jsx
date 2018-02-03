import React, { Component } from 'react'
import Progress from '../components/progress'
import Pubsub from 'pubsub-js'

import './index.less'
let duration = null
class Index extends Component {
  constructor() {
    super()
    this.state = {
      progress: 0,
      volume: 0,
      isPlay: true,
      countTime: '',
      totalTime: ''
    }
  }
  componentDidMount() {
    $('#player').bind($.jPlayer.event.timeupdate, e => {
      duration = e.jPlayer.status.duration
      this.setState({
        progress: e.jPlayer.status.currentPercentAbsolute,
        volume: e.jPlayer.options.volume * 100,
        countTime: this.formatTime(
          duration * (e.jPlayer.status.currentPercentAbsolute / 100)
        ),
        totalTime: this.formatTime(duration)
      })
    })
  }
  componentWillUnmount() {
    $('#player').unbind($.jPlayer.event.timeupdate)
  }
  changeVolumeHandler(progress) {
    $('#player').jPlayer('volume', progress)
  }
  changeProgressHandler(progress) {
    $('#player').jPlayer('play', duration * progress)
    this.setState({
      isPlay: true
    })
  }
  play() {
    if (this.state.isPlay) {
      $('#player').jPlayer('pause')
    } else {
      $('#player').jPlayer('play')
    }
    this.setState({
      isPlay: !this.state.isPlay
    })
  }
  next() {
    Pubsub.publish('PLAY_NEXT')
  }
  prev() {
    Pubsub.publish('PLAY_PREV')
  }
  changeRepeat() {
    Pubsub.publish('CHANGE_REPEAT')
  }
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
            <h2 className="music-title">{this.props.currentMusitItem.title}</h2>
            <h3 className="music-artist mt10">
              {this.props.currentMusitItem.artist}
            </h3>
            {/* <div className="row mt20"> */}
            {/* 播放器封面图 */}
            <div className="music-cover">
              <img
                src={this.props.currentMusitItem.cover}
                alt={this.props.currentMusitItem.title}
              />
            </div>
            {/* </div> */}
            <div className="volume-container">
              <i className="icon-volume" />
              <div className="volume-wrapper">
                <Progress
                  progress={this.state.volume}
                  onProgressChange={this.changeVolumeHandler.bind(this)}
                  barColor="#aaa"
                />
              </div>
            </div>
            <div style={{ height: '10px', lineHeight: '10px' }}>
              <span className="time count-time">{this.state.countTime}</span>
              <Progress
                progress={this.state.progress}
                width="70%"
                onProgressChange={this.changeProgressHandler.bind(this)}
              />
              <span className="time total-time">{this.state.totalTime}</span>
            </div>
            <div className="icon-group">
              {/* 播放方式 */}
              <div className="icon-play-type">
                <i
                  className={`icon repeat-${this.props.repeatType}`}
                  onClick={this.changeRepeat.bind(this)}
                />
              </div>
              {/* 操作按钮 */}
              <div className="btns-operate">
                <i className="icon prev" onClick={this.prev.bind(this)} />
                <i
                  className={`icon ml30 ${
                    this.state.isPlay ? 'pause' : 'play'
                  }`}
                  onClick={this.play.bind(this)}
                />
                <i className="icon next ml30" onClick={this.next.bind(this)} />
              </div>
              <div className="icon-show-more" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Index
