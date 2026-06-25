<script setup>
import { ref } from 'vue'
import { categories, categorySlug } from '../data/tools'

const open = ref(false)
</script>

<template>
  <header class="site-header">
    <div class="container header-inner">
      <RouterLink to="/" class="brand" @click="open = false">
        <span class="brand-icon">🛠️</span>
        <span class="brand-name">Dev<b>Tools</b></span>
      </RouterLink>

      <nav class="cat-tabs" :class="{ open }">
        <RouterLink to="/" class="cat-tab" @click="open = false">All</RouterLink>
        <RouterLink
          v-for="c in categories"
          :key="c"
          class="cat-tab"
          :to="{ path: '/', hash: '#' + categorySlug(c) }"
          @click="open = false"
        >
          {{ c }}
        </RouterLink>
      </nav>

      <button class="nav-toggle" type="button" aria-label="Toggle menu" @click="open = !open">☰</button>
    </div>
  </header>
</template>
