import React from 'react'
import ReactDOM from 'react-dom'
import App from './src/app'
import "regenerator-runtime/runtime" // for async / await

const state = {
  firstName: 'John',
  lastName: 'Doe'
}

ReactDOM.render(<App {...state}></App>, document.getElementById('root'))
