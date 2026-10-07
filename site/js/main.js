import { html, render, useEffect, useReducer } from '../vendor/preact-htm.js'
import { Icon, PushedLayer, Spinner } from './ui.js'
import { capitalize, loadFromages, thisMonth } from './data.js'
import { FromageScreen, PourquoiView, SaisonView, TousView } from './screens.js'

// The tabs and their URLs. The old site's /saisons/pourquoi and
// /fromage/<nom> links still work.
const TABS = [
  ['saison', '/', 'De saison', 'calendar', SaisonView],
  ['tous', '/tous', 'Tous', 'list', TousView],
  ['pourquoi', '/saisons/pourquoi', 'Pourquoi', 'info', PourquoiView]
]
const PUSH_DURATION = 350

const S = {
  fromages: null,
  error: null,
  tab: 'saison',
  month: thisMonth(),
  milk: 'all',
  /** The cheese's screen: { slug, shown, instant, key }, or null. */
  layer: null
}

let redraw = () => {}
const emit = () => redraw()

const app = {
  set(changes) { Object.assign(S, changes); emit() },
  /** Goes to a path as a link would: a new history entry. */
  go(path, replace = false) {
    if (path === location.pathname) return
    history[replace ? 'replaceState' : 'pushState']({ inApp: true }, '', path)
    route()
  }
}

/** Shows what the URL says: a tab, or a cheese over the current tab. */
function route(initial = false) {
  const path = location.pathname.replace(/\/+$/, '') || '/'
  const match = path.match(/^\/fromage\/([^/]+)$/)
  if (match) {
    const slug = decodeURIComponent(match[1]).toLowerCase()
    if (S.layer && !S.layer.leaving) S.layer = { ...S.layer, slug }
    else {
      S.layer = { slug, shown: initial, instant: initial, key: Date.now() }
      // Next frame: draw it off-screen first so it can slide in.
      if (!initial) requestAnimationFrame(() => requestAnimationFrame(() => { if (S.layer?.slug === slug) { S.layer.shown = true; emit() } }))
    }
  } else {
    S.tab = TABS.find(([, tabPath]) => tabPath === path)?.[0] ?? 'saison'
    if (path !== '/' && !TABS.some(([, tabPath]) => tabPath === path)) history.replaceState(null, '', '/')
    closeLayer()
  }
  emit()
}

function closeLayer() {
  const layer = S.layer
  if (!layer || layer.leaving) return
  layer.shown = false
  layer.instant = false
  layer.leaving = true
  setTimeout(() => { if (S.layer === layer) { S.layer = null; emit() } }, PUSH_DURATION)
}

/** Back from a cheese: the browser's back if we came from a tab here, else that tab. */
function back() {
  if (history.state?.inApp) history.back()
  else app.go(TABS.find(([key]) => key === S.tab)[1], true)
}

function selectTab(key, path) {
  if (S.tab === key && !S.layer) {
    document.getElementById(`scroll-${key}`)?.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  app.go(path)
}

function App() {
  const [, tick] = useReducer((n) => n + 1, 0)
  redraw = tick
  useEffect(() => {
    loadFromages().then((fromages) => app.set({ fromages })).catch((error) => app.set({ error }))
    window.addEventListener('popstate', () => route())
  }, [])

  const fromage = S.layer && S.fromages?.find((f) => f.slug === S.layer.slug)
  useEffect(() => {
    // A cheese that doesn't exist (any more): back to the list.
    if (S.fromages && S.layer && !fromage) app.go('/', true)
    const tab = TABS.find(([key]) => key === S.tab)
    document.title = fromage ? `${capitalize(fromage.nom)} · Fromage de saison` : S.tab === 'saison' ? 'Fromage de saison' : `${tab[2]} · Fromage de saison`
  })

  if (S.error) {
    return html`<div class="empty"><div class="empty-title">Oups</div><div class="empty-detail">Impossible de charger les fromages. Réessayez dans un instant.</div></div>`
  }
  if (!S.fromages) return html`<${Spinner} />`

  const state = { ...app, fromages: S.fromages, month: S.month, milk: S.milk }
  const covered = S.layer?.shown
  const backTitle = TABS.find(([key]) => key === S.tab)[2]
  return html`
    <div class=${`tabs ${covered ? 'covered' : ''}`}>
      ${TABS.map(([key, , , , View]) => html`
        <div key=${key} class="tab-page" hidden=${S.tab !== key} style=${S.tab === key ? '' : 'display:none'}>
          <${View} app=${state} />
        </div>`)}
    </div>
    <nav class=${`tab-bar ${S.layer && !S.layer.leaving ? 'hidden' : ''}`}>
      ${TABS.map(([key, path, title, icon]) => html`
        <a key=${key} href=${path} class=${S.tab === key ? 'active' : ''} aria-current=${S.tab === key ? 'page' : null}
           onClick=${(e) => { if (e.metaKey || e.ctrlKey) return; e.preventDefault(); selectTab(key, path) }}>
          <span class="tab-icon"><${Icon} name=${icon} size=${26} weight=${1.8} /></span>
          <span class="tab-label">${title}</span>
        </a>`)}
    </nav>
    ${S.layer && fromage && html`
      <${PushedLayer} key=${S.layer.key} layer=${S.layer} onBack=${back}>
        <${FromageScreen} key=${fromage.slug} fromage=${fromage} backTitle=${backTitle} onBack=${back} />
      <//>`}`
}

route(true)
render(html`<${App} />`, document.getElementById('root'))
