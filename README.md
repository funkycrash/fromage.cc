# Fromage de saison

Quels fromages déguster ce mois-ci : https://fromage.nicolasfunke.com

A static site with no build step: Preact + htm (`site/vendor/`), styled after
Funky Fork's web app. Netlify serves `site/` (see `netlify.toml`).

| Path | What it is |
| --- | --- |
| `site/` | The site: `index.html`, `app.css`, `js/`. |
| `site/data/fromages.json` | The cheeses. Edit this file to add or change one. |
| `site/photos/` | Their photos, referenced by each cheese's `photo.src`. |

## Working on it

    npx serve -s site               # http://localhost:3000

A cheese's `slug` is its URL (`/fromage/<slug>`); `debut` and `fin` are the
first and last months of its season (1–12), and can run over the new year.
A photo from Wikimedia Commons carries a `credit` (author, licence, source),
shown under the photo as its licence requires.
