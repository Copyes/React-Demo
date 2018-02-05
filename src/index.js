import React, { Component } from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Root from './App'

render(
  <AppContainer>
    <Root />
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
