import React, { Component } from 'react'
import Header from './components/header'
//import Progress from './components/progress'
import Index from './pages/index'

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Index />
      </div>
    )
  }
}

export default App
