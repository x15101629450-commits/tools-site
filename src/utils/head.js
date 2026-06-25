// Client-side head/SEO for SPA routes: title, description, canonical, Open Graph, JSON-LD.

const SITE_NAME = 'DevTools'
const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://x15101629450-commits.github.io/tools-site').replace(/\/$/, '')

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

function upsertLink(rel, href, extra = {}) {
  if (!href) return
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
  for (const [k, v] of Object.entries(extra)) el.setAttribute(k, v)
}

function upsertJsonLd(id, data) {
  let el = document.head.querySelector(`script[data-seo-id="${id}"]`)
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.setAttribute('data-seo-id', id)
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

export function setHead({ title, description, path = '/', keywords, jsonLd } = {}) {
  const fullTitle = title ? `${title} – ${SITE_NAME}` : `${SITE_NAME} – Free Online Developer Tools`
  const url = `${SITE_URL}${path === '/' ? '/' : path}`

  document.title = fullTitle

  upsertMeta('description', description)
  upsertMeta('robots', 'index, follow')
  if (keywords) upsertMeta('keywords', keywords)

  upsertLink('canonical', url)

  upsertMeta('og:title', fullTitle, 'property')
  upsertMeta('og:description', description, 'property')
  upsertMeta('og:type', 'website', 'property')
  upsertMeta('og:url', url, 'property')
  upsertMeta('og:site_name', SITE_NAME, 'property')
  upsertMeta('og:locale', 'en_US', 'property')

  upsertMeta('twitter:card', 'summary')
  upsertMeta('twitter:title', fullTitle)
  upsertMeta('twitter:description', description)

  upsertJsonLd('site', {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    description:
      'Free online developer tools that run entirely in your browser: JSON formatter, encoders, converters and generators.',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  })

  if (jsonLd) {
    upsertJsonLd('page', jsonLd)
  } else if (title && description) {
    upsertJsonLd('page', {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: title,
      description,
      url,
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    })
  } else {
    const el = document.head.querySelector('script[data-seo-id="page"]')
    if (el) el.remove()
  }
}

export { SITE_NAME, SITE_URL }
