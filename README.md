# DevTools – Free Online Developer Tools

A pure front-end (client-side only) collection of developer utilities built with
**Vue 3 + Vite + Vue Router**. Every tool runs entirely in the browser, so there is
no backend, no server cost, and user data never leaves the device. This makes it
ideal for free static hosting (Cloudflare Pages / Netlify / Vercel / GitHub Pages)
and monetization with Google AdSense.

## Tools included

| Tool | Route |
| --- | --- |
| JSON Formatter / Validator / Minifier | `/json-formatter` |
| URL Encode / Decode | `/url-encode-decode` |
| Base64 Encode / Decode (UTF-8 safe) | `/base64-encode-decode` |
| Number Base Converter (2/8/10/16, BigInt) | `/number-base-converter` |
| Unix Timestamp Converter | `/unix-timestamp-converter` |
| Hash Generator (SHA-1/256/384/512) | `/hash-generator` |

Each tool has its **own URL, `<title>`, meta description and FAQ** — the structure
search engines and AdSense reward.

## Develop

Requires Node.js 18+.

```bash
npm install
npm run dev      # start dev server (http://localhost:5173)
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## Add a new tool

1. Add an entry to `src/data/tools.js` (slug, name, description, keywords, icon, component).
2. Create `src/views/tools/YourTool.vue` and wrap its UI in `<ToolLayout slug="your-slug">`.

Routes, the home-page grid, the nav and the "related tools" lists are all generated
automatically from the registry.

## Deploy (free)

**Cloudflare Pages (recommended):**

- Build command: `npm run build`
- Build output directory: `dist`
- `public/_redirects` already contains the SPA fallback (`/* /index.html 200`).

The same `dist/` output works on Netlify and Vercel.

## Before going live

- Set your real domain in `src/utils/head.js` (`SITE_URL`).
- Fill in real contact details on the About and Privacy pages.
- After AdSense approval, paste your AdSense script into `index.html` (placeholder comment included).

## SEO upgrade (optional)

This is a SPA; Google renders JavaScript, but for maximum SEO you can pre-render each
route to static HTML by adding [`vite-ssg`](https://github.com/antfu/vite-ssg). The
registry-driven routing makes that migration straightforward.
