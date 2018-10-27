import React, {Component} from 'react'

class Info extends Component {
  render () {
    return (
      <div>
        <section className='breadcrumbs-area ptb-100 port bread-card pattern-bread gray-bg border-bread'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-12 text-center'>
                <div className='breadcrumbs breadcrumbs-3'>
                  <h2 className='page-title'>En savoir plus</h2>
                  <ul>
                    <li>Saisonnalité du lait</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 '>
              <h3 className='pt-40'>Saisonnalité</h3>
              <p>Les fromages, fierté française, sont aussi des produits de saison, qui ne sont pas produits ou n'ont pas le même goût toute l'année.             
                Il est ainsi des fromages dont la saisonnalité est tout simplement imposée
                  par les <strong>textes de loi</strong>, c’est le cas par exemple du Salers: 
                  le Salers doit obligatoirement être fabriqué entre le 15 avril et le 15 novembre, avec du lait de vache « mises à l’herbe » dans les prés.
</p><p>Ils sont quelques-uns dans ce cas-là, à ne pas être disponibles à la vente hors saison, mais pour les autres, la <strong>saisonnalité est faite de « beaucoup de paramètres complexes »</strong>. Ainsi le lait d’une vache nourrie au foin et aux compléments, dans une étable, l’hiver n’aura pas la complexité et les saveurs du lait d’une vache paissant en plein champ au printemps ou dans les alpages d’été, ou celles-ci pâturent en plein air et broutent des herbes grasses et variées complétées par des fleurs sauvages.</p>
<p>La brebis montre peu de souplesse sur son cycle de lactation, elle ne fournit du lait qu’entre décembre et juillet. Dans ce cas précis, les fromages de brebis seront meilleurs en été car, là encore, les animaux mangent de l’herbe, produisant un lait plus riche.</p>
<h3 className='pt-20'>Dégustation</h3>
<p>La saison de production ne coïncide pas toujours avec la saison de dégustation : dans l’avancement de fabrication, l’affinage joue un rôle majeur. Alors, sa durée est variable selon les familles de fromages : deux à trois semaines pour les pâtes molles à croûte fleurie et les fromages de chèvre. Comptez un mois pour les pâtes molles à croûte lavée et plusieurs mois voir années pour les pâtes pressées.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Info
