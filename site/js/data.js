// The cheeses (site/data/fromages.json) and
// what the screens say about their seasons.

export const MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
export const INITIALES = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
export const LAITS = [['vache', 'Vache'], ['chèvre', 'Chèvre'], ['brebis', 'Brebis']]

export const thisMonth = () => new Date().getMonth() + 1

export async function loadFromages() {
  const response = await fetch('/data/fromages.json')
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  return response.json()
}

/** Seasons can run over the new year: the comté's is August to March. */
export function inSeason(f, month) {
  return f.debut <= f.fin ? month >= f.debut && month <= f.fin : month >= f.debut || month <= f.fin
}

export const allYear = (f) => f.debut === 1 && f.fin === 12

export const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)

/** "D'août à mars", "De mai à octobre", "Toute l'année". */
export function seasonText(f) {
  if (allYear(f)) return "Toute l'année"
  if (f.debut === f.fin) return `En ${MOIS[f.debut - 1]}`
  const from = MOIS[f.debut - 1]
  return `${/^[aeiouy]/.test(from) ? "D'" : 'De '}${from} à ${MOIS[f.fin - 1]}`
}

/** What the card's badge says this month, if anything. */
export function seasonBadge(f, month) {
  if (allYear(f)) return null
  if (f.fin === month) return 'Dernier mois'
  if (f.debut === month) return 'Nouveau'
  return null
}

export const milkText = (f) => capitalize(f.lait.join(', '))

/** For searching: lowercase, no accents. */
export const fold = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

/** One shuffled order per month, kept while the page is open. */
const orders = new Map()
export function shuffledFor(month, fromages) {
  if (!orders.has(month)) {
    const list = fromages.filter((f) => inSeason(f, month))
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]]
    }
    orders.set(month, list)
  }
  return orders.get(month)
}
