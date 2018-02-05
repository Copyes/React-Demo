import React, { Component } from 'react'
import {
  HashRouter as Router,
  Route,
  Link,
  Switch
  // etc.
} from 'react-router-dom'
import Header from './components/header'
import Pubsub from 'pubsub-js'
import Index from './pages/index'
import List from './pages/list'
import { MUSIC_LIST } from './data/index.js'
import { random } from './utils/index'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      musicList: MUSIC_LIST,
      currentMusitItem: {},
      repeatType: 'cycle',
      showListFlag: false
    }
  }
  componentDidMount() {
    $('#player').jPlayer({
      supplied: 'mp3',
      wmode: 'window',
      useStateClassSkin: true
    })
    this.playMusic(this.state.musicList[0])
    $('#player').bind($.jPlayer.event.ended, e => {
      this.playWhenEnd()
    })
    const STATUS_LIST = ['cycle', 'once', 'random']
    Pubsub.subscribe('PLAY_NEXT', () => {
      this.playNext()
    })
    Pubsub.subscribe('PLAY_PREV', () => {
      this.playNext('prev')
    })
    Pubsub.subscribe('CHANGE_REPEAT', () => {
      let index = STATUS_LIST.indexOf(this.state.repeatType)
      index = (index + 1) % STATUS_LIST.length
      this.setState({
        repeatType: STATUS_LIST[index]
      })
    })
    PubSub.subscribe('PLAY_MUSIC', (msg, item) => {
      this.playMusic(item)
    })
    PubSub.subscribe('DEL_MUSIC', (msg, item) => {
      this.setState({
        musicList: this.state.musicList.filter(music => {
          return music !== item
        })
      })
    })
    Pubsub.subscribe('SHOW_LIST', () => {
      this.setState({
        showListFlag: !this.state.showListFlag
      })
    })
  }
  componentWillUnmount() {
    PubSub.unsubscribe('CHANGE_REPEAT')
    PubSub.unsubscribe('PLAY_NEXT')
    PubSub.unsubscribe('PLAY_PREV')
  }
  playWhenEnd() {
    if (this.state.repeatType === 'random') {
      let index = this.findMusicItem(this.state.currentMusitItem)
      let len = this.state.musicList.length - 1
      let randomNum = random(0, len)
      while (index === randomNum) {
        randomNum = random(0, len)
      }
      this.playMusic(this.state.musicList[randomNum])
    } else if (this.state.repeatType === 'once') {
      this.playMusic(this.state.currentMusitItem)
    } else {
      this.playNext()
    }
  }
  playMusic(item) {
    $('#player')
      .jPlayer('setMedia', {
        mp3: item.file
      })
      .jPlayer('play')
    this.setState({
      currentMusitItem: item
    })
  }
  playNext(type = 'next') {
    let index = this.findMusicItem(this.state.currentMusitItem)
    let len = this.state.musicList.length
    if (type === 'next') {
      index = (index + 1) % len
    } else {
      index = (index + len - 1) % len
    }
    let musicItem = this.state.musicList[index]
    this.playMusic(musicItem)
    this.setState({
      currentMusitItem: musicItem
    })
  }
  findMusicItem(music) {
    return Math.max(0, this.state.musicList.indexOf(music))
  }
  render() {
    let list = null
    if (this.state.showListFlag) {
      list = (
        <List
          currentItem={this.state.currentMusitItem}
          musicList={this.state.musicList}
        />
      )
    }
    return (
      <div className="container">
        <Header />
        <Index
          currentMusitItem={this.state.currentMusitItem}
          repeatType={this.state.repeatType}
        />
        {list}
      </div>
    )
  }
}

// const Root = () => (
//   <Router>
//     <div>
//       <Route exact path="/" component={App} />
//       <Route exact path="/list/:id" component={List} />
//     </div>
//   </Router>
// )

export default App
