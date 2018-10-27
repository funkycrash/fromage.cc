import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import Info from './components/Info'
import Header from './components/Header'
import Footer from './components/Footer'
import Slider from './components/Slider'
import Fromage from './Fromage/Fromage'
import Fromages from './Fromages/Fromages'
import ButtonToTop from './components/ButtonToTop'

class App extends Component {
  render () {
    return (
      <div>
        <Header />
        <Route exact path='/' component={Slider} />
        <Route exact path='/' component={Fromages} />
        <Route exact path='/fromage/:nomFromage' component={Fromage} />
        <Route exact path='/saisons/pourquoi' component={Info} />
        <Footer />
        <ButtonToTop />
      </div>
    )
  }
}

export default App
