import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import jsonData from '../Data/fromage'
import CalendarTiles from '../components/Calendar'
import countryCodeArray from '../Data/countryCodes'

const urlify = require('urlify').create({spaces: '-', nonPrintable: '-'})

class Fromage extends Component {
  constructor () {
    super()
    this.state = {
      fromage: null,
      dicoMois: null,
      fromageImage: null
    }
  }

  async componentDidMount () {
    const { match: { params } } = this.props
    const fromage = jsonData.items.find(fromage => {
      return urlify(fromage.fields.nom).toLowerCase() === `${params.nomFromage}`
    })
    const assetArray = jsonData.includes.Asset
    const fromageImage = assetArray.find(asset => {
      return asset.sys.id === fromage.fields.photo.sys.id
    })
    const dicoMois = [
      'Janvier',
      'Février',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Août',
      'Septembre',
      'Octobre',
      'Novembre',
      'Décembre'
    ]

    this.setState({
      fromage,
      dicoMois,
      fromageImage
    })
  }

  render () {
    const {fromage, dicoMois, fromageImage} = this.state
    if (!fromage) return <p>Loading ...</p>
    return (
      <div>
        <section className='breadcrumbs-area ptb-70 port bread-card pattern-bread gray-bg border-bread'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-12 text-center'>
                <div className='breadcrumbs breadcrumbs-3'>
                  <h2 className='page-title'>{fromage.fields.nom} <span className={`flag-icon flag-icon-${countryCodeArray[fromage.fields.pays.toLowerCase()]}`} /></h2>
                  <ul>
                    <li>
                      <Link to='/'>Fromages</Link>
                    </li>
                    <li>Details</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='portfolio-details ptb-90'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-12'>
                <div className='portfolio-img' style={{ backgroundImage: 'url(' + (fromageImage.fields.file.url ? fromageImage.fields.file.url : '/img/no-image.jpg') + ')' }} />
              </div>
            </div>
            <div className='row pt-40'>
              <CalendarTiles debut={fromage.fields.debut} fin={fromage.fields.fin} />
              <div className='col-md-8'>
                <div className='project-desc'>
                  <h3 className='desc'>Description du fromage</h3>
                  <p>{fromage.fields.description}</p>
                </div>
                {/* <div className='post-share'>
                  <ul>
                    <li>Partager : </li>
                    <li><a href='#'><i className='fa fa-facebook' /></a></li>
                    <li><a href='#'><i className='fa fa-twitter' /></a></li>
                    <li><a href='#'><i className='fa fa-google-plus' /></a></li>
                    <li><a href='#'><i className='fa fa-instagram' /></a></li>
                    <li><a href='#'><i className='fa fa-vimeo-square' /></a></li>
                  </ul>
                </div> */}
              </div>
              <div className='col-md-4'>
                <div className='portfolio-meta'>
                  <h3 className='desc'>Information du fromage</h3>
                  <ul>
                    {fromage.fields.pays && <li><i className='fa fa-flag' /><span>Pays :</span>{fromage.fields.pays}</li>}
                    {fromage.fields.region && <li><i className='fa fa-map-marker' /><span>Region :</span>{fromage.fields.region}</li>}
                    {fromage.fields.appellation && <li><i className='fa fa-certificate' /><span>Appellation :</span>{fromage.fields.appellation}</li>}
                    {fromage.fields.appellation_date && <li><i className='fa fa-calendar' /><span>Date d'obtention :</span>{fromage.fields.appellation_date}</li>}
                    {fromage.fields.debut && <li><i className='fa fa-calendar-check-o' /><span>A partir de :</span>{dicoMois[fromage.fields.debut - 1]}</li>}
                    {fromage.fields.fin && <li><i className='fa fa-calendar-times-o' /><span>Jusqu'a :</span>{dicoMois[fromage.fields.fin - 1]}</li>}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default Fromage
