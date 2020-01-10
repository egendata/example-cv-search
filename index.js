import React from 'react'
import ReactDOM from 'react-dom'
import App from './src/app'

const state = {
  firstName: 'John',
  lastName: 'Doe'
}

ReactDOM.render(<App {...state}></App>, document.getElementById('root'))
