import React, { Component } from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './App'

render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('app')
)

if (module.hot) {
  module.hot.accept('./App', () => {
    const NewRoot = require('./App').default
    render(
      <AppContainer>
        <NewRoot />
      </AppContainer>,
      document.getElementById('app')
    )
  })
}
