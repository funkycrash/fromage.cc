import React, {Component} from 'react'

class CalendarTiles extends Component {
  render () {
    const debut = this.props.debut
    const fin = this.props.fin
    const dicoMois = [
      'janvier',
      'février',
      'mars',
      'avril',
      'mai',
      'juin',
      'juillet',
      'août',
      'septembre',
      'octobre',
      'novembre',
      'décembre'
    ]
    var calendarHTMLArray = []
    var isSeasonal = false

    if (debut < fin && debut === 1) {
      isSeasonal = false
    }

    if (debut > fin) {
      isSeasonal = true
    }

    // Create seasonnality array
    for (let i = 1; i <= 12; i++) {
      if (i === debut || i === fin + 1) {
        isSeasonal = !isSeasonal
      }
      calendarHTMLArray.push(`${isSeasonal ? 'yes' : 'no'}`)
    }

    let calendarHTML = calendarHTMLArray.map((status, i) => {
      return <div key={i} className={status}>{dicoMois[i]}</div>
    })

    return (
      <div className='row ptb-20 calendar'>
        {calendarHTML}
      </div>
    )
  }
}

export default CalendarTiles
