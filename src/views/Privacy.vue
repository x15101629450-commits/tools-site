<script setup>
import { onMounted } from 'vue'
import { setHead } from '../utils/head'

onMounted(() => {
  setHead({
    title: 'Privacy Policy',
    description: 'Privacy policy for DevTools. Tools run locally in your browser; learn how data, cookies and advertising are handled.',
    path: '/privacy',
  })
})
</script>

<template>
  <article class="prose">
    <h1>Privacy Policy</h1>
    <p>Last updated: replace with your launch date.</p>

    <h2>Tool data</h2>
    <p>
      All tools on this website run entirely in your browser. Any content you enter is processed
      locally on your device and is never transmitted to, or stored on, our servers.
    </p>

    <h2>Cookies and advertising</h2>
    <p>
      This site may display ads served by third-party vendors, including Google. Third-party
      vendors, including Google, use cookies to serve ads based on a user's prior visits to this
      and other websites. Google's use of advertising cookies enables it and its partners to serve
      ads to your users based on their visit to your sites and/or other sites on the Internet.
    </p>
    <p>
      Users may opt out of personalized advertising by visiting
      <a href="https://www.google.com/settings/ads" rel="nofollow noopener" target="_blank">Google Ads Settings</a>.
    </p>

    <h2>Analytics</h2>
    <p>
      If analytics are enabled, aggregated, non-personally-identifiable usage data may be collected
      to help improve the site. Update this section to reflect the analytics provider you actually use.
    </p>

    <h2>Contact</h2>
    <p>For privacy questions, add your contact email here before publishing.</p>
  </article>
</template>
