import { html, useState } from '../vendor/preact-htm.js'
import { HeaderBar, Icon, Photo, TabScreen } from './ui.js'
import { INITIALES, LAITS, MOIS, capitalize, fold, inSeason, milkText, seasonBadge, seasonText, shuffledFor, thisMonth } from './data.js'

// The three tabs (De saison, Tous, Pourquoi) and a cheese's own screen.
// `app` is the shared state from main.js: { fromages, month, milk, set, go }.

const link = (app, path) => (e) => {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button > 0) return
  e.preventDefault()
  app.go(path)
}

// MARK: De saison

export function SaisonView({ app }) {
  const { month, milk } = app
  const now = thisMonth()
  const fromages = shuffledFor(month, app.fromages).filter((f) => milk === 'all' || f.lait.includes(milk))
  const title = month === now ? 'De saison' : `En ${MOIS[month - 1]}`
  return html`
    <${TabScreen} id="scroll-saison" title=${title}>
      <h1 class="large-title">${title}</h1>
      <p class="subtitle">${month === now ? `${capitalize(MOIS[month - 1])} · ` : ''}${fromages.length} fromage${fromages.length > 1 ? 's' : ''}</p>

      <div class="chip-label">Mois</div>
      <div class="hscroll chips" ref=${(el) => scrollMonthIntoView(el, month)}>
        ${MOIS.map((m, i) => html`
          <button key=${m} class=${`chip ${month === i + 1 ? 'on' : ''}`} aria-pressed=${month === i + 1}
                  onClick=${() => app.set({ month: i + 1 })}>
            ${now === i + 1 && html`<span class="now" aria-label="ce mois-ci"></span>`}${capitalize(m)}
          </button>`)}
      </div>

      <div class="chip-label">Lait</div>
      <div class="hscroll chips">
        ${[['all', 'Tous'], ...LAITS].map(([key, label]) => html`
          <button key=${key} class=${`chip ${milk === key ? 'on' : ''}`} aria-pressed=${milk === key}
                  onClick=${() => app.set({ milk: key })}>${label}</button>`)}
      </div>

      ${fromages.length === 0
        ? html`
          <div class="empty">
            <div class="empty-title">Aucun fromage</div>
            <div class="empty-detail">Pas de fromage au lait de ${milk} en ${MOIS[month - 1]}.</div>
            <button class="chip on" onClick=${() => app.set({ milk: 'all' })}>Voir tous les laits</button>
          </div>`
        : html`
          <div class="fromage-grid">
            ${fromages.map((f) => html`<${Card} key=${f.slug} app=${app} fromage=${f} month=${month} />`)}
          </div>`}
    <//>`
}

/** Keeps the chosen month's chip on screen. */
function scrollMonthIntoView(el, month) {
  if (!el) return
  const chip = el.children[month - 1]
  if (!chip || el.dataset.month === String(month)) return
  el.dataset.month = month
  requestAnimationFrame(() => {
    el.scrollLeft = Math.max(0, chip.offsetLeft - (el.clientWidth - chip.offsetWidth) / 2)
  })
}

function Card({ app, fromage: f, month }) {
  const badge = seasonBadge(f, month)
  const path = `/fromage/${f.slug}`
  return html`
    <a class="card" href=${path} onClick=${link(app, path)}>
      <div class="card-photo">
        <${Photo} photo=${f.photo} />
        ${badge && html`<span class="card-badge">${badge}</span>`}
      </div>
      <div class="card-name">${f.nom}</div>
      <div class="card-meta">${milkText(f)} · ${f.pays.join(', ')}</div>
    </a>`
}

// MARK: Tous

export function TousView({ app }) {
  const [query, setQuery] = useState('')
  const now = thisMonth()
  const q = fold(query.trim())
  const found = q ? app.fromages.filter((f) => fold(`${f.nom} ${f.region} ${f.pays.join(' ')} ${f.lait.join(' ')}`).includes(q)) : app.fromages
  const groups = []
  for (const f of found) {
    const letter = fold(f.nom.charAt(0)).toUpperCase()
    if (groups.at(-1)?.letter !== letter) groups.push({ letter, list: [] })
    groups.at(-1).list.push(f)
  }
  return html`
    <${TabScreen} id="scroll-tous" title="Tous les fromages">
      <h1 class="large-title">Tous les fromages</h1>
      <div class="search-field-wrap">
        <${Icon} name="search" size=${18} weight=${2.2} />
        <input class="field" type="search" placeholder="Nom, région, pays, lait…" value=${query} enterkeyhint="search"
               autocomplete="off" autocorrect="off" spellcheck="false" aria-label="Rechercher"
               onInput=${(e) => setQuery(e.currentTarget.value)} />
      </div>
      ${q && html`<div class="count">${found.length} résultat${found.length > 1 ? 's' : ''}</div>`}
      ${found.length === 0 && html`
        <div class="empty">
          <div class="empty-title">Aucun résultat</div>
          <div class="empty-detail">Aucun fromage ne correspond à « ${query.trim()} ».</div>
        </div>`}
      ${groups.map((g) => html`
        <section key=${g.letter}>
          ${!q && html`<h2 class="letter">${g.letter}</h2>`}
          ${g.list.map((f) => html`<${Row} key=${f.slug} app=${app} fromage=${f} now=${now} />`)}
        </section>`)}
    <//>`
}

function Row({ app, fromage: f, now }) {
  const path = `/fromage/${f.slug}`
  const current = inSeason(f, now)
  return html`
    <a class="row" href=${path} onClick=${link(app, path)}>
      <${Photo} photo=${f.photo} class="row-photo" />
      <div class="row-text">
        <div class="row-name">${f.nom}</div>
        <div class=${`row-meta ${current ? 'in' : ''}`}>${current ? 'De saison · ' : ''}${seasonText(f)}</div>
      </div>
      <${Icon} name="chevron" size=${18} />
    </a>`
}

// MARK: Pourquoi

export function PourquoiView() {
  return html`
    <${TabScreen} id="scroll-pourquoi" title=${"Pourquoi des saisons\u00A0?"}>
      <h1 class="large-title">Pourquoi des saisons${"\u00A0"}?</h1>
      <article class="article">
        <p class="lead">Les fromages sont aussi des produits de saison : ils ne sont pas produits, ou n'ont pas le même goût, toute l'année.</p>

        <h2>Saisonnalité</h2>
        <p>Certains fromages ont une saison imposée par les <strong>textes de loi</strong>. C'est le cas du salers : il doit obligatoirement être fabriqué entre le 15 avril et le 15 novembre, avec le lait de vaches « mises à l'herbe » dans les prés.</p>
        <p>Ils sont quelques-uns dans ce cas, à ne pas être vendus hors saison. Pour les autres, la <strong>saisonnalité est faite de beaucoup de paramètres complexes</strong>. Le lait d'une vache nourrie au foin et aux compléments, à l'étable, l'hiver, n'aura pas la complexité ni les saveurs du lait d'une vache qui paît en plein champ au printemps, ou dans les alpages l'été, où elle broute des herbes grasses et variées et des fleurs sauvages.</p>
        <p>La brebis montre peu de souplesse dans son cycle de lactation : elle ne donne du lait qu'entre décembre et juillet. Ses fromages sont meilleurs en été car, là encore, les animaux mangent de l'herbe et produisent un lait plus riche.</p>

        <h2>Dégustation</h2>
        <p>La saison de production ne coïncide pas toujours avec la saison de dégustation : l'affinage joue un rôle majeur, et sa durée varie selon les familles de fromages.</p>
        <div class="note-card">
          <strong>Durée d'affinage</strong>
          Deux à trois semaines pour les pâtes molles à croûte fleurie et les fromages de chèvre, un mois pour les pâtes molles à croûte lavée, plusieurs mois, voire des années, pour les pâtes pressées.
        </div>

        <footer class="footer">
          Développé par <a href="https://www.nicolasfunke.com" target="_blank" rel="noopener noreferrer">Nicolas F</a>.
          Publié sous <a href="https://creativecommons.org/licenses/by-sa/3.0/deed.fr" target="_blank" rel="noopener noreferrer">licence Creative Commons BY-SA</a>.
        </footer>
      </article>
    <//>`
}

// MARK: Fromage

/** Who took the photo and under which licence, as Wikimedia Commons' licences require. */
function PhotoCredit({ credit }) {
  if (!credit) return null
  const ext = { target: '_blank', rel: 'noopener noreferrer' }
  return html`
    <p class="credit">
      Photo : <a href=${credit.source} ...${ext}>${credit.auteur}</a>,
      ${' '}${credit.licenceUrl ? html`<a href=${credit.licenceUrl} ...${ext}>${credit.licence}</a>` : credit.licence}, via Wikimedia Commons
    </p>`
}

export function FromageScreen({ fromage: f, backTitle, onBack }) {
  const [scrolled, setScrolled] = useState(false)
  const now = thisMonth()
  const facts = [
    ['Lait', milkText(f)],
    ['Pays', f.pays.join(', ')],
    ['Région', f.region],
    ['Appellation', f.appellation && (f.annee ? `${f.appellation} depuis ${f.annee}` : f.appellation)],
    ['Saison', seasonText(f)]
  ].filter(([, value]) => value)
  return html`
    <div class="pushed">
      <${HeaderBar} title=${capitalize(f.nom)} showsTitle=${scrolled} back=${backTitle} onBack=${onBack} />
      <div class="scroll" onScroll=${(e) => setScrolled(e.currentTarget.scrollTop > 280)}>
        <${Photo} photo=${f.photo} class="hero" eager=${true} />
        <${PhotoCredit} credit=${f.photo?.credit} />
        <div class="reading">
          <h1 class="fromage-title">${f.nom}<span class="dot">.</span></h1>
          <div class="flow tags">
            ${inSeason(f, now) && html`<span class="tag season">De saison</span>`}
            ${f.appellation && html`<span class="tag accent">${f.appellation}</span>`}
            ${f.lait.map((l) => html`<span class="tag">${capitalize(l)}</span>`)}
            ${f.region && html`<span class="tag">${f.region}</span>`}
          </div>

          <h2 class="section-title">Saison</h2>
          <p class="season-text">${seasonText(f)}</p>
          <div class="months" role="img" aria-label=${`Saison : ${seasonText(f)}`}>
            ${INITIALES.map((letter, i) => html`
              <div class=${`month ${inSeason(f, i + 1) ? 'in' : ''} ${now === i + 1 ? 'now' : ''}`}><i></i>${letter}</div>`)}
          </div>

          ${f.description && html`
            <h2 class="section-title">Description</h2>
            <div class="description">${f.description.split(/\n\s*\n/).map((p) => html`<p>${p}</p>`)}</div>`}

          ${f.faits?.length > 0 && html`
            <h2 class="section-title">Le saviez-vous${' '}?</h2>
            <ul class="anecdotes">${f.faits.map((fait) => html`<li>${fait}</li>`)}</ul>`}

          <h2 class="section-title">Informations</h2>
          <div class="facts">
            ${facts.map(([label, value]) => html`<div class="fact"><span>${label}</span><span>${value}</span></div>`)}
          </div>

          ${f.lien && html`
            <a class="primary-button" href=${f.lien} target="_blank" rel="noopener noreferrer">
              En savoir plus <${Icon} name="external" size=${18} />
            </a>`}
        </div>
      </div>
    </div>`
}
