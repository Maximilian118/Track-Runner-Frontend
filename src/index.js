import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import axios from 'axios'

// URL for all graphql requests.
axios.defaults.baseURL = "http://localhost:3001/graphql"

ReactDOM.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>, 
document.getElementById('root'))