/* globals prompt */
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

const nickname = prompt('Enter your nickname:')

ReactDOM.render(
  <React.StrictMode>
    <App nick={nickname} />
  </React.StrictMode>,
  document.getElementById('root')
)
