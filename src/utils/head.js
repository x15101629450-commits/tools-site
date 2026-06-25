// Minimal client-side head/SEO management for an SPA.
// For maximum SEO you can later upgrade to static pre-rendering (vite-ssg),
// but this already sets a correct per-route title, description and canonical.

const SITE_NAME = 'DevTools'
// TODO: change this to your real domain once you buy it.
const SITE_URL = 'https://yourdomain.com'

function upsertMeta(key, content, attr = 'name') {
  if (content == null) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function setHead({ title, description, path = '/', keywords } = {}) {
  const fullTitle = title ? `${title} – ${SITE_NAME}` : `${SITE_NAME} – Free Online Developer Tools`
  document.title = fullTitle

  upsertMeta('description', description)
  if (keywords) upsertMeta('keywords', keywords)
  upsertCanonical(SITE_URL + path)

  upsertMeta('og:title', fullTitle, 'property')
  upsertMeta('og:description', description, 'property')
  upsertMeta('og:type', 'website', 'property')
  upsertMeta('og:url', SITE_URL + path, 'property')
  upsertMeta('twitter:card', 'summary')
}

export { SITE_NAME, SITE_URL }
