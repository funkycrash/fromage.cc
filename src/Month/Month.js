import React, {Component} from 'react'
import Select from 'react-select'

class Month extends Component {
  render () {
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth()

    const options = [
      { value: 1, label: 'Janvier' },
      { value: 2, label: 'Février' },
      { value: 3, label: 'Mars' },
      { value: 4, label: 'Avril' },
      { value: '5', label: 'Mai' },
      { value: '6', label: 'Juin' },
      { value: '7', label: 'Juillet' },
      { value: '8', label: 'Août' },
      { value: '9', label: 'Septembre' },
      { value: '10', label: 'Octobre' },
      { value: '11', label: 'Novembre' },
      { value: '12', label: 'Décembre' }
    ]

    return (
      <div className='row ptb-90 text-center months'>
        <Select
          defaultValue={options[currentMonth]}
          options={options}
          onChange={this.props.selectOnChange}
          theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              text: 'orangered',
              primary25: '#ffe57c',
              primary: '#666'
            }
          })}
        />
      </div>
    )
  }
}

export default Month
