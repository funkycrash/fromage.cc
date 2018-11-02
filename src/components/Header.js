import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Headroom from 'headroom.js'

class Header extends Component {
  async componentDidMount () {
    const header = document.querySelector('.intelligent-header')
    // construct an instance of Headroom, passing the element
    let headRoom = new Headroom(header)
    // initialise
    headRoom.init()
  }

  render () {
    return (
      <div>
        <header>
          <div className='header-area intelligent-header headroom headroom--not-bottom headroom--pinned headroom--top'>
            <div className='container'>
              <div className='row'>
                <div className='col-md-4 col-xs-12'>
                  <div className='logo'>
                    <Link to='/'><span className='text-yellow'>Fromage</span> de saison</Link>
                  </div>
                </div>
                <div className='col-md-8 col-xs-12'>
                  <div className='main-menu text-right'>
                    <nav>
                      <ul className='menu d-none'>
                        <li><Link to='/saisons/pourquoi'><i className='fa fa-question-circle' /></Link></li>
                      </ul>
                    </nav>
                  </div>
                  <div className='mobile-menu' />
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className='header-space' />
      </div>
    )
  }
}

export default Header
