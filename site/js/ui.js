import { html, useRef, useState } from '../vendor/preact-htm.js'

// The pieces Funky Fork's screens are made of: a header whose title shows
// once the large title has scrolled away, a screen pushed in from the right
// (drag from the left edge to go back), photos that fade in, and icons.

const PATHS = {
  calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  list: '<path d="M9 6.5h11M9 12h11M9 17.5h11"/><circle cx="4.5" cy="6.5" r="1" fill="currentColor"/><circle cx="4.5" cy="12" r="1" fill="currentColor"/><circle cx="4.5" cy="17.5" r="1" fill="currentColor"/>',
  info: '<circle cx="12" cy="12" r="8.75"/><path d="M12 11v5.5"/><circle cx="12" cy="7.75" r="0.6" fill="currentColor"/>',
  back: '<path d="M15 4.5 7.5 12l7.5 7.5"/>',
  chevron: '<path d="m9.5 6 6 6-6 6"/>',
  search: '<circle cx="10.5" cy="10.5" r="6"/><path d="m15 15 5 5"/>',
  external: '<path d="M14 4h6v6M20 4l-9 9M18 14v4.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10"/>'
}

export function Icon({ name, size = 24, weight = 2 }) {
  return html`
    <span class="icon" aria-hidden="true" dangerouslySetInnerHTML=${{ __html:
      `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${weight}" stroke-linecap="round" stroke-linejoin="round">${PATHS[name]}</svg>` }}></span>`
}

export function Photo({ photo, class: cls = '', eager = false }) {
  const [loaded, setLoaded] = useState(false)
  return html`
    <div class=${`photo ${cls}`}>
      ${photo && html`
        <img src=${photo.src} width=${photo.w} height=${photo.h} alt="" decoding="async" loading=${eager ? 'eager' : 'lazy'}
             class=${loaded ? 'loaded' : ''} onLoad=${() => setLoaded(true)}
             ref=${(img) => { if (img?.complete && img.naturalWidth && !loaded) setLoaded(true) }} />`}
    </div>`
}

export function HeaderBar({ title, showsTitle = true, back, onBack }) {
  return html`
    <div class=${`header ${showsTitle ? '' : 'untitled'}`}>
      <div class="header-title" aria-hidden=${!showsTitle}>${title}</div>
      <div class="header-row">
        ${back && html`
          <button class="header-back" onClick=${onBack} aria-label="Retour">
            <${Icon} name="back" size=${22} weight=${2.4} /><span>${back}</span>
          </button>`}
      </div>
    </div>`
}

/** A tab's screen: the header's title shows once the large title scrolls away. */
export function TabScreen({ id, title, children }) {
  const [scrolled, setScrolled] = useState(false)
  return html`
    <div class="tab-screen">
      <${HeaderBar} title=${title} showsTitle=${scrolled} />
      <div class="scroll" id=${id} onScroll=${(e) => setScrolled(e.currentTarget.scrollTop > 42)}>
        ${children}
      </div>
    </div>`
}

/**
 * A screen over the tabs that slides in from the right. `layer` is
 * { shown, instant }: it slides in once shown, and out when not.
 */
export function PushedLayer({ layer, onBack, children }) {
  const start = useRef(null)
  const swipe = {
    onTouchStart(e) {
      const t = e.touches[0]
      start.current = t.clientX < 24 ? { x: t.clientX, y: t.clientY, t: Date.now(), el: e.currentTarget, moving: false } : null
    },
    onTouchMove(e) {
      const s = start.current
      if (!s) return
      const t = e.touches[0]
      const dx = t.clientX - s.x
      if (!s.moving) {
        if (Math.abs(t.clientY - s.y) > Math.abs(dx)) { start.current = null; return }
        s.moving = true
      }
      s.dx = Math.max(0, dx)
      s.el.style.transition = 'none'
      s.el.style.transform = `translateX(${s.dx}px)`
      e.preventDefault()
    },
    onTouchEnd() {
      const s = start.current
      start.current = null
      if (!s?.moving) return
      s.el.style.transition = ''
      s.el.style.transform = ''
      if (s.dx > window.innerWidth / 3 || s.dx / Math.max(Date.now() - s.t, 1) > 0.5) {
        s.el.parentElement.classList.add('swiped')
        onBack()
      }
    }
  }
  return html`
    <div class=${`layer ${layer.shown ? 'shown' : ''} ${layer.instant ? 'instant' : ''}`}>
      <div class="screen" ...${swipe}>${children}</div>
    </div>`
}

export function Spinner() {
  return html`<div class="center-spinner"><div class="spinner"></div></div>`
}
