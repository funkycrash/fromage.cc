const contentful = require('contentful-management')
const fs = require('fs')

var raw = fs.readFileSync('data.json', 'utf8')
var data = JSON.parse(raw)

// get the token in Content Management Token on Contentful
const client = contentful.createClient({
  accessToken: '#########'
})

data.forEach((fromage) => {
  client.getSpace('jzkzwluhcjif')
    .then((space) => space.getEnvironment('master'))
    .then((environment) => environment.createEntry('fromage', {
      fields: {
        nom: {
          'en-US': fromage.nom
        },
        region: {
          'en-US': fromage.region
        },
        pays: {
          'en-US': fromage.pays
        },
        lait: {
          'en-US': fromage.lait
        },
        appellation: {
          'en-US': fromage.appellation
        },
        dateAppellation: {
          'en-US': fromage.appellation_date
        },
        debut: {
          'en-US': fromage.debut
        },
        fin: {
          'en-US': fromage.fin
        },
        lien: {
          'en-US': fromage.lien
        }
      }
    }))
    .then((entry) => console.log(entry))
    .catch(console.error)
})
