import React, { Component } from 'react'
import Header from './components/header'
//import Progress from './components/progress'
import Index from './pages/index'
import { MUSIC_LIST } from './data/index.js'
console.log(MUSIC_LIST)
class App extends Component {
  constructor() {
    super()
    this.state = {
      musicList: MUSIC_LIST,
      currentMusitItem: {}
    }
  }
  componentDidMount() {
    $('#player').jPlayer({
      supplied: 'mp3',
      wmode: 'window',
      useStateClassSkin: true
    })
    this.playMusic(this.state.musicList[0])
    console.log($('#player'))
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
  render() {
    return (
      <div className="container">
        <Header />
        <Index />
      </div>
    )
  }
}

export default App
