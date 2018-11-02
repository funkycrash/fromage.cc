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
    const currentDate = new Date()

    this.state = {
      fromages: jsonData.items,
      filteredFromages: jsonData.items,
      currentMonth: currentDate.getMonth() + 1,
      assets: jsonData.includes.Asset,
      milk: 'all'
    }
    this.milkFromageFilter = this.milkFromageFilter.bind(this)
    this.handleSelectMonth = this.handleSelectMonth.bind(this)
  }

  milkFromageFilter (e) {
    let milkType = e.currentTarget.getAttribute('data-filter')
    let fromages = this.state.fromages
    let filteredFromages = this.state.fromages

    if (milkType === 'all') {
      filteredFromages = fromages
    } else {
      filteredFromages = fromages.filter(fromage => fromage.fields.lait.indexOf(milkType) >= 0)
    }
    this.setState({
      filteredFromages: filteredFromages,
      milk: milkType
    })
  }

  handleSelectMonth (e) {
    this.setState({
      currentMonth: e.value
    })
  }

  render () {
    let fromages = this.state.filteredFromages
    let assets = this.state.assets
    let currentMonth = this.state.currentMonth

    const assetsIdsAndPictures = {}
    if (fromages.length > 0 && assets.length > 0) {
      assets.map(asset => (assetsIdsAndPictures[asset.sys.id] = asset.fields.file.url))
      // Date filter
      fromages = fromages.filter(fromage => fromage.fields.debut <= currentMonth && fromage.fields.fin >= currentMonth)
    }

    const fromagesHtml = fromages.map(fromage => (
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

    return (
      <div className='portfolio-area'>
        <Month selectOnChange={this.handleSelectMonth} />
        <div className='container'>
          <Filter milkFromageFilter={this.milkFromageFilter} />
          <div className='row portfolio-style-2'>
            <div className='grid'>
              {fromagesHtml}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Fromages
