<script setup>
import { onMounted } from 'vue'
import { setHead } from '../utils/head'

onMounted(() => {
  setHead({
    title: 'About',
    description: 'About DevTools — a free, privacy-friendly collection of online developer tools that run entirely in your browser.',
    path: '/about',
  })
})
</script>

<template>
  <article class="prose">
    <h1>About DevTools</h1>
    <p>
      DevTools is a free collection of everyday utilities for developers, built to be fast,
      reliable and respectful of your privacy.
    </p>
    <h2>Privacy by design</h2>
    <p>
      Every tool on this site runs entirely in your browser using client-side JavaScript. The
      text you paste — JSON, URLs, tokens, anything — is processed locally on your own device and
      is never uploaded to or stored on any server.
    </p>
    <h2>Why we built it</h2>
    <p>
      Most developers reach for the same small set of utilities every day: formatting JSON,
      encoding a URL, decoding Base64, converting numbers between bases. We wanted a single, clean,
      ad-light home for those tools that loads instantly and just works.
    </p>
    <h2>Contact</h2>
    <p>
      Suggestions for new tools are welcome. Replace this paragraph with your preferred contact
      method (email or a contact form) before going live.
    </p>
  </article>
</template>
