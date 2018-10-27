import React, {Component} from 'react'
import $ from 'jquery'

class Filter extends Component {
  async componentDidMount () {
    $('.portfolio-menu button').on('click', function (event) {
      $(this).siblings('.active').removeClass('active')
      $(this).addClass('active')
      event.preventDefault()
    })
  }

  render () {
    return (
      <div className='portfolio-menu portfolio-left-menu text-center mb-50'>
        <button className='active' onClick={this.props.milkFromageFilter} data-filter='all'>TOUS</button>
        <button onClick={this.props.milkFromageFilter} data-filter='vache'>Vache </button>
        <button onClick={this.props.milkFromageFilter} data-filter='chèvre'>Chèvre</button>
        <button onClick={this.props.milkFromageFilter} data-filter='brebis'>Brebis </button>
      </div>
    )
  }
}

export default Filter
