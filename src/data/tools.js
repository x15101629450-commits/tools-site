// Central registry of all tools. Adding a new tool = add one entry here
// plus a matching component under src/views/tools/. Routes, the home page
// grid and the "related tools" lists are all generated from this list.

export const tools = [
  {
    slug: 'json-formatter',
    name: 'JSON Formatter',
    short: 'Format, validate and minify JSON.',
    category: 'Formatters',
    icon: '{ }',
    description:
      'Free online JSON formatter, validator and beautifier. Paste your JSON to pretty-print it with custom indentation, minify it to a single line, or validate it and get a clear error message. Everything runs locally in your browser, so your data never leaves your device.',
    keywords: 'json formatter, json validator, json beautifier, minify json, pretty print json',
    component: () => import('../views/tools/JsonFormatter.vue'),
  },
  {
    slug: 'url-encode-decode',
    name: 'URL Encode / Decode',
    short: 'Percent-encode or decode URL components.',
    category: 'Encoders',
    icon: '%',
    description:
      'Encode or decode URL strings online. Convert text to a percent-encoded (URL-safe) form with encodeURIComponent, or decode an encoded string back to plain text. Useful for query strings, redirect parameters and API debugging. Runs entirely in your browser.',
    keywords: 'url encode, url decode, urlencode, urldecode, percent encoding, encodeuricomponent',
    component: () => import('../views/tools/UrlEncoder.vue'),
  },
  {
    slug: 'base64-encode-decode',
    name: 'Base64 Encode / Decode',
    short: 'Convert text to and from Base64.',
    category: 'Encoders',
    icon: 'b64',
    description:
      'Online Base64 encoder and decoder with full UTF-8 / Unicode support. Convert any text to Base64 or decode a Base64 string back to readable text. All processing happens client-side in your browser for privacy.',
    keywords: 'base64 encode, base64 decode, base64 converter, utf-8 base64, online base64',
    component: () => import('../views/tools/Base64.vue'),
  },
  {
    slug: 'html-encode-decode',
    name: 'HTML Encode / Decode',
    short: 'Escape or unescape HTML entities.',
    category: 'Encoders',
    icon: '&lt;',
    description:
      'Encode special characters to HTML entities (&lt;, &gt;, &amp;, quotes) or decode entities back to plain text. Handy when embedding text in HTML, XML or templates. Runs entirely in your browser.',
    keywords: 'html encode, html decode, html escape, html entities, htmlspecialchars online',
    component: () => import('../views/tools/HtmlEncoder.vue'),
  },
  {
    slug: 'jwt-decoder',
    name: 'JWT Decoder',
    short: 'Inspect JWT header and payload.',
    category: 'Encoders',
    icon: 'JWT',
    description:
      'Decode JSON Web Tokens (JWT) online. View the header and payload as formatted JSON. Signature is not verified — for debugging and inspection only. All decoding happens locally in your browser.',
    keywords: 'jwt decode, jwt decoder, json web token, jwt parser, jwt debugger',
    component: () => import('../views/tools/JwtDecoder.vue'),
  },
  {
    slug: 'number-base-converter',
    name: 'Number Base Converter',
    short: 'Convert binary, decimal and hex (2/10/16).',
    category: 'Converters',
    icon: '0b',
    description:
      'Convert numbers between binary (base 2), octal (base 8), decimal (base 10) and hexadecimal (base 16). Enter a value in any base and instantly see 2/8/10/16 results. Powered by BigInt for large integers without precision loss.',
    keywords: 'binary to decimal, hex to decimal, decimal to hex, base 2 10 16 converter, radix converter',
    component: () => import('../views/tools/BaseConverter.vue'),
  },
  {
    slug: 'unix-timestamp-converter',
    name: 'Unix Timestamp Converter',
    short: 'Convert Unix time to a date and back.',
    category: 'Converters',
    icon: '⏱',
    description:
      'Convert a Unix timestamp (seconds or milliseconds) to a human-readable date in both UTC and your local time zone, and convert a date back to a Unix timestamp. Includes a live current timestamp.',
    keywords: 'unix timestamp, epoch converter, timestamp to date, date to timestamp, epoch time',
    component: () => import('../views/tools/TimestampConverter.vue'),
  },
  {
    slug: 'color-converter',
    name: 'Color HEX ↔ RGB',
    short: 'Convert between HEX and RGB colors.',
    category: 'Converters',
    icon: '◼',
    description:
      'Convert colors between HEX (#RRGGBB) and RGB (r, g, b) formats with a live color preview. Supports three-digit shorthand hex. Useful for CSS, design tokens and front-end development.',
    keywords: 'hex to rgb, rgb to hex, color converter, css color, hex rgb converter',
    component: () => import('../views/tools/ColorConverter.vue'),
  },
  {
    slug: 'case-converter',
    name: 'Case Converter',
    short: 'camelCase, snake case, kebab-case and more.',
    category: 'Text',
    icon: 'Aa',
    description:
      'Convert text between common developer naming conventions: camelCase, PascalCase, snake case, kebab-case, CONSTANT_CASE, Title Case, uppercase and lowercase — all at once.',
    keywords: 'camelcase converter, snake case, kebab case, case converter, naming convention',
    component: () => import('../views/tools/CaseConverter.vue'),
  },
  {
    slug: 'md5-generator',
    name: 'MD5 Generator',
    short: 'Generate MD5 hash from text.',
    category: 'Crypto',
    icon: 'md5',
    description:
      'Generate an MD5 hash (32-character hex) from any text instantly in your browser. Useful for file checksums and legacy API compatibility. Not suitable for password storage or security.',
    keywords: 'md5 generator, md5 hash, md5 online, md5 encrypt, md5 checksum',
    component: () => import('../views/tools/Md5Generator.vue'),
  },
  {
    slug: 'hash-generator',
    name: 'Hash Generator',
    short: 'Generate SHA-1/256/384/512 hashes.',
    category: 'Crypto',
    icon: '#',
    description:
      'Generate cryptographic hashes (SHA-1, SHA-256, SHA-384, SHA-512) from any text using the browser native Web Crypto API. Fast, private and offline-capable.',
    keywords: 'sha256 generator, sha1 hash, sha512, hash generator, checksum, web crypto',
    component: () => import('../views/tools/HashGenerator.vue'),
  },
  {
    slug: 'uuid-generator',
    name: 'UUID Generator',
    short: 'Generate random UUID v4 or v7.',
    category: 'Generators',
    icon: 'id',
    description:
      'Generate UUIDs (Universally Unique Identifiers) online. Supports UUID v4 (random) and UUID v7 (time-ordered). Generate one or many at once. Uses crypto.randomUUID() — nothing leaves your browser.',
    keywords: 'uuid generator, guid generator, uuid v4, uuid v7, random uuid online',
    component: () => import('../views/tools/UuidGenerator.vue'),
  },
  {
    slug: 'password-generator',
    name: 'Password Generator',
    short: 'Strong random passwords.',
    category: 'Generators',
    icon: '***',
    description:
      'Generate strong random passwords with customizable length and character sets (uppercase, lowercase, digits, symbols). Uses crypto.getRandomValues() for secure randomness. Runs entirely in your browser.',
    keywords: 'password generator, random password, strong password, secure password online',
    component: () => import('../views/tools/PasswordGenerator.vue'),
  },
]

export const toolsBySlug = Object.fromEntries(tools.map((t) => [t.slug, t]))

export function getTool(slug) {
  return toolsBySlug[slug]
}

export function relatedTools(slug, count = 4) {
  return tools.filter((t) => t.slug !== slug).slice(0, count)
}

export const categories = [...new Set(tools.map((t) => t.category))]

export function categorySlug(cat) {
  return 'cat-' + cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')
}

const CATEGORY_ICONS = {
  Formatters: '{}',
  Encoders: '%',
  Converters: '⇄',
  Text: 'Aa',
  Crypto: '#',
  Generators: '⚡',
}

export function categoryIcon(cat) {
  return CATEGORY_ICONS[cat] || '•'
}

export function toolsInCategory(cat) {
  return tools.filter((t) => t.category === cat)
}
