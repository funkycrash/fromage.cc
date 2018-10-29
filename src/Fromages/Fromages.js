import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import jsonData from '../Data/fromage'
import Filter from '../components/Filter'
import Month from '../Month/Month'
import countryCodeArray from '../Data/countryCodes'
const urlify = require('urlify').create({spaces: '-', nonPrintable: '-'})

class Fromages extends Component {
  constructor (props) {
    super(props)

    this.state = {
      fromages: null,
      currentMonth: null,
      assets: null,
      milk: 'all'
    }
    this.milkFromageFilter = this.milkFromageFilter.bind(this)
    this.handleSelectMonth = this.handleSelectMonth.bind(this)
  }

  milkFromageFilter (e) {
    e.preventDefault()
    let milkType = e.currentTarget.getAttribute('data-filter')
    this.setState({
      milk: milkType
    })
  }

  handleSelectMonth (e) {
    this.setState({
      currentMonth: e.value
    })
  }

  async componentDidMount () {
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth()
    const fromages = jsonData.items
    const assets = jsonData.includes.Asset
    const milk = ''

    this.setState({
      fromages,
      currentMonth,
      assets,
      milk
    })
  }

  render () {
    console.log(this.state.fromages)
    console.log(this.state.assets)
    console.log(this.state.milk)
    let filteredFromages = null
    const assetsIdsAndPictures = {}
    if (this.state.fromages && this.state.assets) {
      this.state.assets.map(asset => (assetsIdsAndPictures[asset.sys.id] = asset.fields.file.url))
      // Date filter
      filteredFromages = this.state.fromages.filter(fromage => fromage.fields.debut <= this.state.currentMonth && fromage.fields.fin >= this.state.currentMonth)

      // Milk filter
      if (this.state.milk !== 'all') {
        filteredFromages = filteredFromages.filter(fromage => fromage.fields.lait === this.state.milk)
      }
    }
    return (
      <div className='portfolio-area'>
        <Month selectOnChange={this.handleSelectMonth} />
        <div className='container'>
          <Filter milkFromageFilter={this.milkFromageFilter} />
          <div className='row portfolio-style-2'>
            <div className='grid'>
              {filteredFromages === null && assetsIdsAndPictures === null && <p>Chargement des fromages...</p>}
              {
                filteredFromages && filteredFromages.map(fromage => (
                  <div key={urlify(fromage.fields.nom)} className={`col-md-4 col-sm-6 col-xs-12 grid-item ${fromage.fields.lait} mb-30`}>
                    <Link to={`/fromage/${urlify(fromage.fields.nom).toLowerCase()}`}>
                      <div className='portfolio hover-style1'>
                        <div className='portfolio-img' style={{ backgroundImage: 'url(' + (fromage.fields.photo ? assetsIdsAndPictures[fromage.fields.photo.sys.id] : '/img/no-image.jpg') + ')' }} >
                          <div className='portfolio-view'>
                            <span className='img-popup' href='/img/portfolio/equal/1.jpg'>
                              <i className='icon-focus' />
                            </span>
                          </div>
                        </div>
                        <div className='portfolio-title-2 text-center title-color-2'>
                          <h3>{fromage.fields.nom}</h3>
                          <span className={`flag-icon flag-icon-${countryCodeArray[fromage.fields.pays.toLowerCase()]}`} />
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Fromages
