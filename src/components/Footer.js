import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Footer extends Component {
  render () {
    return (
      <footer className='footer-bg bg-opacity footer-border ptb-70 gray-bg'>
        <div className='footer-area-2'>
          <div className='container'>
            <div className='col-md-12 col-sm-12 col-xs-12'>
              <div className='footer-2-logo'>
                <div className='logo-2'>
                  <Link to='/'>Fromage de saison</Link><br />
                </div>
                <div className='footer-2-menu'>
                  <nav>
                    <ul>
                      <li><Link to='/saisons/pourquoi'>En Savoir Plus</Link></li>
                    </ul>
                  </nav>
                </div>
                <p>Developpé par <a href='//www.nicolasfunke.com' target='_blank'>Nicolas F</a> avec <a href='//reactjs.org'>React</a>.<br />
                Publié sous la <a href='//creativecommons.org/licenses/by-sa/3.0/deed.fr' target='_blank'>licence Creative Commons</a></p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
