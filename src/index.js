import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import { ScrollContext } from 'react-router-scroll-4'

import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <BrowserRouter>
    <ScrollContext>
      <App />
    </ScrollContext>
  </BrowserRouter>,
  document.getElementById('root')
)
registerServiceWorker()
