import React, {Component} from 'react'
import $ from 'jquery'

class ButtonToTop extends Component {
  async componentDidMount () {
    var totop = $('#toTop')

    $(window).on('scroll', function () {
      if ($(window).scrollTop() > 200) {
        totop.fadeIn()
      } else {
        totop.fadeOut()
      }
    })

    totop.on('click', function () {
      $('html,body').animate({
        scrollTop: 0
      }, 500)
    })
  }

  render () {
    return (
      <div id='toTop'>
        <i className='fa fa-chevron-up' />
      </div>
    )
  }
}

export default ButtonToTop
