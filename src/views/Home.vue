<script setup>
import { onMounted } from 'vue'
import { categories, categorySlug, categoryIcon, toolsInCategory } from '../data/tools'
import JsonEditor from '../components/JsonEditor.vue'
import { setHead } from '../utils/head'

onMounted(() => {
  setHead({
    title: '',
    description:
      'Free online developer tools that run entirely in your browser: JSON formatter and tree viewer, URL encode/decode, Base64, number base converter, Unix timestamp converter and hash generator.',
    path: '/',
    keywords: 'json formatter online, developer tools, base64, url encode, hash generator, timestamp converter',
  })
})
</script>

<template>
  <div>
    <section class="hero">
      <div class="hero-head">
        <h1>JSON Formatter &amp; Online Developer Tools</h1>
        <p>Paste JSON below — it parses live into a collapsible tree. 100% in your browser.</p>
      </div>
      <JsonEditor />
    </section>

    <section class="directory">
      <h2>All tools</h2>
      <div class="dir-grid">
        <div v-for="c in categories" :key="c" :id="categorySlug(c)" class="dir-cat">
          <div class="dir-cat-title">
            <span class="ic">{{ categoryIcon(c) }}</span>{{ c }}
          </div>
          <div class="dir-links">
            <RouterLink
              v-for="t in toolsInCategory(c)"
              :key="t.slug"
              :to="'/' + t.slug"
              class="dir-link"
            >
              {{ t.name }}
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
